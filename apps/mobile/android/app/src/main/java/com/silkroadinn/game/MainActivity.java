package com.silkroadinn.game;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
    @Override public void onCreate(Bundle savedInstanceState) {
        registerPlugin(SaveVaultPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
