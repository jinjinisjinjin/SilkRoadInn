#!/bin/zsh
SCRIPT_DIR="${0:A:h}"
exec /usr/bin/env python3 "$SCRIPT_DIR/tools/preview/start-local-preview.py"
