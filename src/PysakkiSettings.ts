// import build-time build number to be set as initial build number
// this import will not run again in production so it will be 
// a hard coded value to compare future version/build numbers against
import currentBuild from '../public/build.json' 


export type PysakkiSettingsObj = {
    refreshRateSec: number;
    stopId: string;
    offsetMinutes: number;
    lastBuildNo: number;
    aspect: number;
    rowQty: number;
    d13: number;
    d13rowQty: number; // amount of rows in smaller, 13 inch screen
    distanceFromStop: number;
    versionLoadIntervalId: number;
    loadVersionInfo: () => Promise<void>;
    loadSettingsFromJSON: () => object,
    loadSettingsClient: () => void,
}

const defaultSettings = {
    refreshRateSec: 30,
    stopId: "Lahti:504826",
    distanceFromStop: 8.5,
    offsetMinutes: 1,
    aspect: 0,
    d13: 0,
    d13rowQty: 9,
    rowQty: 11,
}
const settingsFilePath = "./settings.json" // WIP
const versionIdPath = "./build.json" // WIP
const versionCheckIntervalSeconds = 10 * 60 // how often check for new build version

/*
    UPDATE: mita jos settingit osoiteriviltä, huomattavasti vaivattomampi muuttaa clientsidessä
*/

/*
    implementoidaan joku tällainen joka lukee settings json fileestä 
    pysäkin yms relevantit tiedot ja sitten lähtee rendaamaan
    äppiä

    (pitää olla public kansiossa ja noutaa fetchillä muuten joutuu bundleksi eikä asiakas voi enää muokata)

*/

export const PysakkiSettings: PysakkiSettingsObj = {
    refreshRateSec: 30,
    stopId: "",
    lastBuildNo: currentBuild.build,
    offsetMinutes: 1,
    versionLoadIntervalId: 0,
    aspect: 0,
    d13: 0,
    d13rowQty: 7,
    rowQty: 11,
    distanceFromStop: 8.5,
    loadSettingsFromJSON: async (): Promise<PysakkiSettingsObj> => {
        const response = await fetch( settingsFilePath )

        if(!response.ok)
        {
            // error, todo...
        }

        // todo... wip...
        return await response.json();
    },
    loadVersionInfo: async function loadVersionInfo () {
        const response = await fetch( versionIdPath )

        if(!response.ok)
        {
            throw new Error ("Unable to get build number")
            return
            // error, todo...
        }

        // todo... wip...
        try {
            const versionInfo = await response.json();

            if(!versionInfo || !versionInfo.build) throw new Error("Unable to get build number")
            
            // mismatch, newer version available, reload app
            if(versionInfo.build !== this.lastBuildNo)
            {   
                return location.reload()
            }
        }
        catch (e)
        {
            console.log(e)
        }
    },

    loadSettingsClient: function (): void {
        const settingsInPathParams = new URL(location.href).searchParams

        const refreshRateSec = parseInt ( settingsInPathParams.get("refreshRateSec") ?? "" ); 
        const stopId = settingsInPathParams.get("id") ?? "";
        const distanceFromStop = Number( settingsInPathParams.get("distanceFromStop")) ?? "";
        const offsetMinutes = Number( settingsInPathParams.get("offsetMinutes")) ?? "";
        const aspect = Number( settingsInPathParams.get("aspect") ) ?? 0;
        const rowQty = Number( settingsInPathParams.get("rowQty") ) ?? 0;
        const d13 = Number( settingsInPathParams.get("d13") ) ?? 0;  


        this.stopId = stopId ? stopId : defaultSettings.stopId;
        this.refreshRateSec = refreshRateSec ? refreshRateSec*1000 : defaultSettings.refreshRateSec*1000
        this.distanceFromStop = distanceFromStop ? distanceFromStop : defaultSettings.distanceFromStop
        this.offsetMinutes = offsetMinutes ? offsetMinutes : defaultSettings.offsetMinutes
        this.aspect = aspect == 1 ? 1 : defaultSettings.aspect
        this.rowQty = rowQty ? rowQty : defaultSettings.rowQty
        this.d13 = d13 == 1 ? 1 : defaultSettings.d13

        // jos d13 == 1, eli 13 tuuman näyttö, asetetaan muitakin asetuksia
        if(d13) {
            this.aspect = 1;
            this.rowQty = this.d13rowQty;
        }

        if(!refreshRateSec && !stopId) {
            console.log ("Settings missing, using default values. Apply settings using /?id=<STOP_ID>&refreshRateSec=<REFRESH_RATE_IN_SECONDS>")
            this.refreshRateSec = defaultSettings.refreshRateSec * 1000
            this.stopId = defaultSettings.stopId;
            return;
        }
    } 
}

PysakkiSettings.versionLoadIntervalId = window.setInterval(() => PysakkiSettings.loadVersionInfo(), versionCheckIntervalSeconds * 1000)