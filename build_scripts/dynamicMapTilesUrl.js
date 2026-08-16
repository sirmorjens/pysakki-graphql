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
import { parseCommandLine } from 'typescript';

const dirPath = path.join('public/Map');
const filePath = path.join(dirPath, 'MapTiles.json');

// Ensure the public directory exists
if (!fs.existsSync(dirPath)) {
  throw "Try running this from project root folder"
}

if (fs.existsSync(filePath)) {
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const MapTilesData = JSON.parse(rawData);
    
    const {devTiles, prodTiles} = MapTilesData;
  
    switch(modeParam) {
      case "dev": 
        MapTilesData.tiles = devTiles;
        break;

      case "prod":
        MapTilesData.tiles = prodTiles;
        break;
    }

    fs.writeFileSync(filePath, JSON.stringify(MapTilesData), 'utf8');
  } catch (error) {
    console.warn('Could not parse MapTiles.json. Sorry.');
  }
}


console.log(`Tiles updated to ${modeParam}`);
