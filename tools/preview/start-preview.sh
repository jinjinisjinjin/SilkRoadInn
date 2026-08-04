#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROTO_DIR="$ROOT_DIR/outputs/丝路食肆_可玩原型_v0.1"
START_PORT="${1:-4173}"
HOST="127.0.0.1"

is_serving() {
  node - "$1" <<'JS' >/dev/null 2>&1
const url = process.argv[2];
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 1500);
try {
  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(timer);
  process.exit(response.ok ? 0 : 1);
} catch {
  clearTimeout(timer);
  process.exit(1);
}
JS
}

can_bind() {
  python3 - "$HOST" "$1" <<'PY' >/dev/null 2>&1
import socket
import sys

host, port = sys.argv[1], int(sys.argv[2])
sock = socket.socket()
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
try:
    sock.bind((host, port))
except OSError:
    raise SystemExit(1)
finally:
    sock.close()
PY
}

start_preview() {
  local port="$1"
  local url="http://$HOST:$port/"
  local pid_file="$ROOT_DIR/work/preview-$port.pid"
  local log_file="$ROOT_DIR/work/preview-$port.log"

  if is_serving "$url"; then
    echo "Preview already running: $url"
    exit 0
  fi

  if ! can_bind "$port"; then
    return 1
  fi

  nohup node "$ROOT_DIR/work/static-preview-server.mjs" "$port" "$HOST" "$PROTO_DIR" >"$log_file" 2>&1 &
  echo "$!" >"$pid_file"

  for _ in 1 2 3 4 5 6 7 8 9 10; do
    if is_serving "$url"; then
      echo "Preview started: $url"
      echo "PID: $(cat "$pid_file")"
      echo "Log: $log_file"
      exit 0
    fi
    sleep 0.5
  done

  if [[ -s "$log_file" ]]; then
    sed -n '1,20p' "$log_file"
  fi
  kill "$(cat "$pid_file" 2>/dev/null || true)" 2>/dev/null || true
  return 1
}

for port in $(seq "$START_PORT" "$((START_PORT + 6))"); do
  if start_preview "$port"; then
    exit 0
  fi
  echo "Port $port unavailable, trying next..."
done

echo "Preview did not respond on ports $START_PORT-$((START_PORT + 6))."
exit 1
