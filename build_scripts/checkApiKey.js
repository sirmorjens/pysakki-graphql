import fs from 'fs'
import path from 'node:path'
import { loadEnvFile } from 'node:process'

const apiKeyCheckFail = () => {
    console.error('\x1b[33m%s\x1b[0m', "Digitransit API key missing :-(")
    console.error("Get your Digitransit API key from https://portal-api.digitransit.fi/")
    console.error("Create .env.local file with VITE_DIGITANSIT_SUBSCRIPTION_KEY=<your key here>")
    process.exit(-1)
}

try {
    loadEnvFile(".env.local");
}
catch(e)
{
    apiKeyCheckFail();
} 

const apiKey = process.env.VITE_DIGITRANSIT_SUBSCRIPTION_KEY

if(!apiKey) {
    apiKeyCheckFail()
}