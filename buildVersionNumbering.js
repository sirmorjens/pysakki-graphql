/*
	Build version check every x minutes,
	when building and deploying a new version 
	running app instances should refresh themselves 

*/

import fs from 'fs'
import path from 'node:path'

const dirPath = path.join(import.meta.dirname, 'public');
const filePath = path.join(dirPath, 'build.json');

// Ensure the public directory exists
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

let buildData = { build: 1 };

if (fs.existsSync(filePath)) {
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(rawData);
    
    // Increment existing build number or set to 1 if build property is missing/invalid
    const currentBuild = typeof parsedData.build === 'number' ? parsedData.build : 0;
    buildData.build = currentBuild + 1;
  } catch (error) {
    console.warn('Could not parse build.json. Resetting build counter to 1.');
  }
}

fs.writeFileSync(filePath, JSON.stringify(buildData), 'utf8');
console.log(`build.json updated. Current build: ${buildData.build}`);
