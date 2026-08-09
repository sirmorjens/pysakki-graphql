import currentBuild from '../public/build.json'

export type PysakkiSettingsObj = {
    refreshRateSec: number;
    stopId: string;
    lastBuildNo: number;
    versionLoadIntervalId: number;
    loadVersionInfo: () => Promise<void>;
    loadSettingsFromJSON: () => object,
    loadSettingsClient: () => void,
}

const defaultSettings = {
    refreshRateSec: 30,
    stopId: "Lahti:104167"
}
const settingsFilePath = "./settings.json" // WIP
const versionIdPath = "./build.json" // WIP
const versionCheckIntervalSeconds = 10 // 5 * 60 // how often check for new build version

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
    versionLoadIntervalId: 0,
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
            console.log("Versions match")
        }
        catch (e: any)
        {
            console.log(e)
        }
    },

    loadSettingsClient: function (): void {
        const settingsInPathParams = new URL(location.href).searchParams

        const refreshRateSec = parseInt ( settingsInPathParams.get("refreshRateSec") ?? "" ); 
        const stopId = settingsInPathParams.get("id") ?? "";

        if(!refreshRateSec || !stopId) {
            console.log ("Settings missing, using default values. Apply settings using /?id=<STOP_ID>&refreshRateSec=<REFRESH_RATE_IN_SECONDS>")
            this.refreshRateSec = defaultSettings.refreshRateSec * 1000
            this.stopId = defaultSettings.stopId;
            return;
        }

        this.refreshRateSec = refreshRateSec * 1000;
        this.stopId = stopId;

    } 
}

PysakkiSettings.versionLoadIntervalId = window.setInterval(() => PysakkiSettings.loadVersionInfo(), versionCheckIntervalSeconds * 1000)