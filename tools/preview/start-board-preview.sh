#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
PLAYABLE_DIR="$ROOT_DIR/game/playable-v0.1"
PORT="${1:-4216}"
HOST="127.0.0.1"
DEFAULT_MAIN_ROOT="$(cd "$ROOT_DIR/.." && pwd)/SilkRoadInn"
MAIN_ROOT="${SILKROAD_MAIN_ROOT:-$DEFAULT_MAIN_ROOT}"

if [[ ! -f "$PLAYABLE_DIR/index.html" ]]; then
  echo "Board preview entry not found: $PLAYABLE_DIR/index.html" >&2
  exit 1
fi

if [[ ! -d "$MAIN_ROOT/design" || ! -d "$MAIN_ROOT/art" ]]; then
  echo "Repair assets not found under: $MAIN_ROOT" >&2
  echo "Set SILKROAD_MAIN_ROOT to the main SilkRoadInn project directory." >&2
  exit 1
fi

echo "Board preview: http://$HOST:$PORT/"
exec node "$SCRIPT_DIR/static-preview-server.mjs" "$PORT" "$HOST" "$PLAYABLE_DIR" "$MAIN_ROOT"
