import subprocess
import os

downloadPath = "./public/Map/Tiles/20260520_001001_pt/"

def downloadTiles(tiles):
    z, x, y = tiles

    if not os.path.isdir(downloadPath + z):
        os.mkdir(downloadPath + z)
    
    if not os.path.isdir(downloadPath + z + "/" + x):
        os.mkdir(downloadPath + z + "/" + x)

    subprocess.run(["curl", f"https://tiles.openfreemap.org/planet/20260520_001001_pt/{z}/{x}/{y}.pbf", "-o", f"{downloadPath}{z}/{x}/{y}.pbf"])


while(True):
    cmd = input("Tilen numero tai X: lopeta: ")

    if cmd == "x":
        break

    tiles = cmd.split("-")

    if len(tiles) != 3:
        continue

    downloadTiles(tiles)