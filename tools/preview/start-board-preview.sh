#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/outputs/丝路食肆_可玩原型_v0.1"
echo "Board preview: http://127.0.0.1:4201/"
python3 -m http.server 4201 --bind 127.0.0.1
