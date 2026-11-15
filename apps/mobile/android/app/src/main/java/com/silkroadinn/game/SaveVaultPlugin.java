package com.silkroadinn.game;

import com.getcapacitor.*;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import org.json.*;

@CapacitorPlugin(name = "SaveVault")
public class SaveVaultPlugin extends Plugin {
    private SaveVaultStore store;

    @Override public void load() { store = new SaveVaultStore(new File(getContext().getFilesDir(), "save-vault")); }

    @PluginMethod public void read(PluginCall call) {
        try {
            SaveVaultStore.Result result = store.read(call.getString("key"));
            JSArray snapshots = new JSArray();
            for (SaveVaultStore.Snapshot snapshot : result.snapshots) {
                JSObject value = new JSObject(); value.put("revision", snapshot.revision); value.put("payload", snapshot.payload);
                snapshots.put(value);
            }
            JSObject value = new JSObject(); value.put("snapshots", snapshots); value.put("hasFiles", result.hasFiles); call.resolve(value);
        } catch (Exception error) { call.reject("Cannot read native save backup", error); }
    }

    @PluginMethod public void write(PluginCall call) {
        try {
            String payload = call.getString("payload");
            if (payload == null || payload.length() > SaveVaultStore.MAX_BYTES) throw new IllegalArgumentException("Invalid save size");
            JSONObject data = new JSONObject(payload);
            JSONObject meta = data.getJSONObject("_saveVault");
            long revision = meta.getLong("revision");
            if (!(meta.opt("revision") instanceof Number) || meta.getDouble("revision") != revision
                || !meta.optString("checksum").matches("[a-f0-9]{8}")) throw new IllegalArgumentException("Invalid save revision");
            if (meta.getInt("version") != 1 || data.getJSONArray("board").length() == 0
                || data.getJSONArray("board").length() > 256) throw new IllegalArgumentException("Invalid save format");
            for (String field : new String[] { "coins", "gems", "stamina", "completedOrders", "generationCount" }) {
                double number = data.getDouble(field);
                if (!(data.opt(field) instanceof Number) || !Double.isFinite(number) || number < 0 || number != Math.floor(number)) throw new IllegalArgumentException("Invalid game resource");
            }
            boolean written = store.write(call.getString("key"), revision, payload);
            JSObject value = new JSObject(); value.put("written", written); value.put("revision", revision); call.resolve(value);
        } catch (Exception error) { call.reject("Cannot write native save backup", error); }
    }

    @PluginMethod public void clear(PluginCall call) {
        try { store.clearTestKey(call.getString("key")); call.resolve(); }
        catch (Exception error) { call.reject("Cannot reset test save backup", error); }
    }
}
