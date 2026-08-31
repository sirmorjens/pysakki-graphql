/*
    Changing style json pointing to maptiles source from prod to dev url
    and vice versa

    WHY? Tiles need absolute url to work (at least atm) and
    using tiles for prod in dev doesn't work
*/

import fs from 'fs'
import path from 'node:path'
import { loadEnvFile } from 'node:process';
import readline from 'node:readline';

 const askAndSaveUrl = async () => {
    return new Promise((resolve, reject) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout})

    rl.question("To build, enter deployment path (eg. https//www.sivu.com/kansio/pysakki/):",
        (s) => {
            try {
                rl.close();
                const url = new URL(s)
                fs.writeFileSync(".env.deploymentUrl", `
                    DEPLOY_URL=${s}\n
                    DEPLOY_PATH=${url.pathname}
                `)
                resolve()
            }
            catch(e) {
                console.log("Invalid path :-(")
                console.log(s)
                rl.close();
                process.exit(-1)
            }
        }
    )
    })
}

try {
    loadEnvFile(".env.deploymentUrl");
    if(!process.env.DEPLOY_URL) throw Error
    if(!process.env.DEPLOY_PATH) throw Error
    console.log(`Deploying to \x1b[33m${process.env.DEPLOY_PATH}\x1b[0m`)
    console.log("Edit .env.deploymentUrl to change this")
}
catch(e)
{
    await askAndSaveUrl()
} 
