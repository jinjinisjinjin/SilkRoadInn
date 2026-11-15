package com.silkroadinn.game;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;

public class SaveVaultStoreTest {
    static final String KEY = "silkroad_tavern_proto_v02";
    static void check(boolean value, String message) { if (!value) throw new AssertionError(message); }
    interface IOAction { void run() throws Exception; }
    static void fails(IOAction action) throws Exception {
        try { action.run(); throw new AssertionError("Expected I/O rejection"); } catch (IOException expected) {}
    }
    public static void main(String[] args) throws Exception {
        Path root = Files.createTempDirectory("sri-vault-unit-");
        try {
            SaveVaultStore store = new SaveVaultStore(root.toFile());
            check(!store.read(KEY).hasFiles, "New save must not look corrupt");
            store.write(KEY, 1, "one 丝路 🐫");
            store.write(KEY, 2, "two");
            store.write(KEY, 3, "three");
            SaveVaultStore.Result result = store.read(KEY);
            check(result.snapshots.size() == 2 && result.snapshots.get(0).revision == 3 && result.snapshots.get(1).revision == 2, "Keep two latest complete generations");
            check(!store.write(KEY, 3, "three"), "Identical retry is idempotent");
            fails(() -> store.write(KEY, 3, "conflict")); fails(() -> store.write(KEY, 2, "old"));
            fails(() -> store.clearTestKey(KEY)); fails(() -> store.write("../../foreign", 1, "bad"));
            File latest = result.snapshots.get(0).source;
            byte[] intact = Files.readAllBytes(latest.toPath());
            byte[] flipped = intact.clone(); flipped[flipped.length-1] ^= 1;
            Files.write(latest.toPath(), flipped);
            check(store.read(KEY).snapshots.get(0).revision == 2, "Checksum damage must fall back to previous");
            Files.write(latest.toPath(), Arrays.copyOf(intact, 9));
            check(store.read(KEY).snapshots.get(0).revision == 2, "Truncated write must fall back");
            Files.write(latest.toPath(), intact);
            String prefix = latest.getName().substring(0,64);
            File temporary = root.resolve(prefix+".tmp").toFile();
            Files.write(temporary.toPath(), new byte[] {1,2,3});
            check(store.read(KEY).snapshots.get(0).revision == 3, "Interrupted temp must not replace committed save");
            Files.delete(temporary.toPath()); Files.createDirectory(temporary.toPath());
            fails(() -> store.write(KEY,4,"cannot-write-temp"));
            check(store.read(KEY).snapshots.get(0).revision == 3, "Write failure preserves committed latest");
            Files.delete(temporary.toPath());
            // Multiple callers may arrive out of order; stale writes cannot rewind progress.
            ExecutorService pool = Executors.newFixedThreadPool(4);
            List<Future<?>> futures = new ArrayList<>();
            for(int i=4;i<=40;i++){ final int revision=i; futures.add(pool.submit(()->{try{store.write(KEY,revision,"save-"+revision);}catch(IOException stale){}})); }
            for(Future<?> f:futures)f.get();pool.shutdown();
            check(store.read(KEY).snapshots.get(0).revision == 40, "Concurrent old writes cannot win");
            String qa=KEY+"_qa_test";store.write(qa,1,"independent");
            File qaFile=store.read(qa).snapshots.get(0).source;
            Files.copy(store.read(KEY).snapshots.get(0).source.toPath(),qaFile.toPath(),StandardCopyOption.REPLACE_EXISTING);
            check(store.read(qa).hasFiles && store.read(qa).snapshots.isEmpty(), "File from another key cannot be restored");
            store.clearTestKey(qa);check(!store.read(qa).hasFiles,"QA reset only clears its own files");check(store.read(KEY).snapshots.get(0).revision==40,"Normal save survives QA reset");
            fails(()->store.write(KEY,41,"x".repeat(SaveVaultStore.MAX_BYTES+1)));
            for(SaveVaultStore.Snapshot snapshot:store.read(KEY).snapshots)Files.write(snapshot.source.toPath(),new byte[]{0});
            check(store.read(KEY).hasFiles && store.read(KEY).snapshots.isEmpty(),"All corrupt is distinct from never saved");
            System.out.println("Native file vault: rotation, SHA damage, truncation, interrupted temp, I/O failure, stale/concurrent writes, key isolation and fail-closed state passed.");
        } finally {
            try(var paths=Files.walk(root)){for(Path path:paths.sorted(Comparator.reverseOrder()).toList())Files.deleteIfExists(path);}
        }
    }
}
