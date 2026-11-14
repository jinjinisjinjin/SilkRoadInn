#!/usr/bin/env python3
# coding: utf-8
"""Open the local game, starting its preview service when needed."""
import pathlib
import shutil
import socket
import subprocess
import time
import urllib.parse
import urllib.request
import webbrowser

ROOT = pathlib.Path(__file__).resolve().parents[2]
GAME = ROOT / "game/playable-v0.1"
URL = "http://127.0.0.1:4197/"
OUTPUT = ROOT / "output/preview"

def ready():
    try:
        with urllib.request.urlopen(URL, timeout=2) as response:
            return urllib.parse.unquote(response.headers.get("X-SilkRoadInn-Preview-Root", "")) == str(GAME)
    except Exception:
        return False

def main():
    if not ready():
        with socket.socket() as probe:
            occupied = probe.connect_ex(("127.0.0.1", 4197)) == 0
        if occupied:
            raise RuntimeError("4197端口已有其他服务，请联系检查；未关闭或覆盖该服务。")
        node = shutil.which("node")
        if not node:
            raise RuntimeError("未找到Node.js，无法启动试玩服务。")
        OUTPUT.mkdir(parents=True, exist_ok=True)
        with (OUTPUT / "server.log").open("ab") as log:
            process = subprocess.Popen(
                [node, str(ROOT / "tools/preview/static-preview-server.mjs"), "4197", "127.0.0.1", str(GAME)],
                stdin=subprocess.DEVNULL, stdout=log, stderr=log, start_new_session=True,
            )
        (OUTPUT / "server.pid").write_text(str(process.pid))
        for _ in range(30):
            if ready():
                break
            if process.poll() is not None:
                raise RuntimeError("试玩服务启动失败，请查看output/preview/server.log。")
            time.sleep(0.2)
        else:
            raise RuntimeError("试玩服务尚未就绪，请查看output/preview/server.log。")
    webbrowser.open(URL)
    print("试玩已打开：" + URL)

if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(str(error))
        input("按回车关闭窗口。")
        raise SystemExit(1)
