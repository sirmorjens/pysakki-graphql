/*
    Changing map tiles from prod to dev url
    and vice versa

    WHY? Tiles need absolute url to work (at least atm) and
    using tiles for prod in dev doesn't work
*/

const [,, modeParam] = process.argv;

if(!modeParam || !(modeParam == "dev" || modeParam == "prod")) throw("This is not a good situation :-(\nParams are wrong or missing")

import fs from 'fs'
import path from 'node:path'
import { loadEnvFile } from 'node:process';

const tilesFilename = "MapTiles.json"
const tilesDirPath = 'public/Map';
const tilesFilePath = path.join(tilesDirPath, tilesFilename);

const styleFilename = "pysakki_mapstyle.json"
const styleDirPath = 'src/Map';
const styleFilePath = path.join(styleDirPath, styleFilename);

// Ensure the public directory exists
if (!fs.existsSync(tilesDirPath) || !fs.existsSync(styleDirPath)) {
  throw "Try running this from project root folder"
  process.exit(-1)
}

if (fs.existsSync(tilesFilePath) && fs.existsSync(styleFilePath)) {
  try {
    const tilesData = fs.readFileSync(tilesFilePath, 'utf8');
    const MapTilesData = JSON.parse(tilesData);
    const styleData = fs.readFileSync(styleFilePath, 'utf8');
    const MapStyleData = JSON.parse(styleData);
    
    const {devTiles} = MapTilesData;
    const {devUrl} = MapStyleData.sources.openmaptiles;

    switch(modeParam) {
      case "dev": 
        MapStyleData.sources.openmaptiles.url = devUrl;
        MapTilesData.tiles = devTiles;
        break;

      case "prod":

        try {
          loadEnvFile(".env.deploymentUrl")
        }
        catch (e) {
          console.log("Try running ./upload.sh to build")
          process.exit(-1)
        }
        
        const {DEPLOY_PATH, DEPLOY_URL} = process.env
        const tilesFolderPath = "Tiles/20260520_001001_pt/{z}/{x}/{y}.pbf"
        const deployTilesUrl = path.join(DEPLOY_URL, "Map", tilesFolderPath)
        const deployStyleUrl = path.join(DEPLOY_PATH, "Map", tilesFilename)
        
        MapStyleData.sources.openmaptiles.prodUrl = deployStyleUrl;
        MapStyleData.sources.openmaptiles.url = deployStyleUrl;
        MapTilesData.prodTiles = deployTilesUrl
        MapTilesData.tiles = [deployTilesUrl];
        break;
    }

    fs.writeFileSync(tilesFilePath, JSON.stringify(MapTilesData), 'utf8');
    fs.writeFileSync(styleFilePath, JSON.stringify(MapStyleData), 'utf8');
  } catch (error) {
    console.log(error)
    console.warn('Could not parse MapTiles.json or style.json. Sorry.');
    process.exit(-1)
  }
}


console.log(`Tiles updated to ${modeParam}`);
