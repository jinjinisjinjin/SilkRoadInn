package com.silkroadinn.game;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.charset.CodingErrorAction;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

/** Two independently verified generations. No Android dependency: exercised on the JVM too. */
public final class SaveVaultStore {
    static final int MAGIC = 0x53524931;
    static final int MAX_BYTES = 2 * 1024 * 1024;
    static final long MAX_REVISION = 9007199254740991L;
    private final File directory;

    public SaveVaultStore(File directory) { this.directory = directory; }

    public static final class Snapshot {
        public final long revision;
        public final String payload;
        final File source;
        Snapshot(long revision, String payload, File source) {
            this.revision = revision; this.payload = payload; this.source = source;
        }
    }

    public static final class Result {
        public final List<Snapshot> snapshots;
        public final boolean hasFiles;
        Result(List<Snapshot> snapshots, boolean hasFiles) { this.snapshots = snapshots; this.hasFiles = hasFiles; }
    }

    private void checkKey(String key) throws IOException {
        if (key == null || !key.matches("silkroad_tavern_proto_v02(?:_[a-zA-Z0-9_-]{1,100})?")) throw new IOException("Invalid save key");
    }

    private static byte[] digest(byte[] bytes) {
        try { return MessageDigest.getInstance("SHA-256").digest(bytes); }
        catch (NoSuchAlgorithmException impossible) { throw new IllegalStateException(impossible); }
    }

    private String prefix(String key) {
        StringBuilder value = new StringBuilder();
        for (byte b : digest(key.getBytes(StandardCharsets.UTF_8))) value.append(String.format(Locale.ROOT, "%02x", b & 255));
        return value.toString();
    }

    private File slot(String key, int slot) { return new File(directory, prefix(key) + "." + slot + ".sav"); }
    private File temporary(String key) { return new File(directory, prefix(key) + ".tmp"); }

    private byte[] signedBytes(String key, long revision, byte[] payload) throws IOException {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        DataOutputStream out = new DataOutputStream(bytes);
        out.writeUTF(key); out.writeLong(revision); out.writeInt(payload.length); out.write(payload); out.flush();
        return bytes.toByteArray();
    }

    private Snapshot readSlot(String key, File file) {
        try (DataInputStream in = new DataInputStream(new FileInputStream(file))) {
            if (file.length() > MAX_BYTES + 512 || in.readInt() != MAGIC || !key.equals(in.readUTF())) return null;
            long revision = in.readLong();
            int size = in.readInt();
            if (revision < 1 || revision > MAX_REVISION || size < 1 || size > MAX_BYTES) return null;
            byte[] expected = new byte[32]; in.readFully(expected);
            byte[] payload = new byte[size]; in.readFully(payload);
            if (in.read() != -1 || !MessageDigest.isEqual(expected, digest(signedBytes(key, revision, payload)))) return null;
            String text = StandardCharsets.UTF_8.newDecoder().onMalformedInput(CodingErrorAction.REPORT)
                .onUnmappableCharacter(CodingErrorAction.REPORT).decode(ByteBuffer.wrap(payload)).toString();
            return new Snapshot(revision, text, file);
        } catch (IOException error) { return null; }
    }

    public synchronized Result read(String key) throws IOException {
        checkKey(key);
        if (directory.exists() && (!directory.isDirectory() || !directory.canRead())) throw new IOException("Save directory unreadable");
        List<Snapshot> snapshots = new ArrayList<>();
        boolean hasFiles = temporary(key).exists();
        for (int index = 0; index < 2; index++) {
            File file = slot(key, index);
            hasFiles |= file.exists();
            Snapshot snapshot = readSlot(key, file);
            if (snapshot != null) snapshots.add(snapshot);
        }
        snapshots.sort((a, b) -> Long.compare(b.revision, a.revision));
        return new Result(snapshots, hasFiles);
    }

    public synchronized boolean write(String key, long revision, String payload) throws IOException {
        checkKey(key);
        if (payload == null || revision < 1 || revision > MAX_REVISION) throw new IOException("Invalid save revision");
        byte[] bytes = payload.getBytes(StandardCharsets.UTF_8);
        if (bytes.length == 0 || bytes.length > MAX_BYTES) throw new IOException("Invalid save size");
        Result current = read(key);
        Snapshot latest = current.snapshots.isEmpty() ? null : current.snapshots.get(0);
        if (latest != null && revision <= latest.revision) {
            if (revision == latest.revision && payload.equals(latest.payload)) return false;
            throw new IOException("Stale or conflicting save revision");
        }
        if (!directory.isDirectory() && !directory.mkdirs()) throw new IOException("Save directory unavailable");
        File destination = latest != null && latest.source.equals(slot(key, 0)) ? slot(key, 1) : slot(key, 0);
        File temporary = temporary(key);
        try (FileOutputStream file = new FileOutputStream(temporary); DataOutputStream out = new DataOutputStream(file)) {
            out.writeInt(MAGIC); out.writeUTF(key); out.writeLong(revision); out.writeInt(bytes.length);
            out.write(digest(signedBytes(key, revision, bytes))); out.write(bytes); out.flush(); file.getFD().sync();
        }
        // Same-directory rename commits a fully synced generation on Android/POSIX.
        // Only the older slot is replaced; the latest committed slot is never deleted.
        if (!temporary.renameTo(destination)) throw new IOException("Could not commit save backup");
        return true;
    }

    public synchronized void clearTestKey(String key) throws IOException {
        checkKey(key);
        if (key.equals("silkroad_tavern_proto_v02")) throw new IOException("Normal save cannot be reset");
        for (File file : Arrays.asList(slot(key, 0), slot(key, 1), temporary(key))) {
            if (file.exists() && !file.delete()) throw new IOException("Could not reset test backup");
        }
    }
}
