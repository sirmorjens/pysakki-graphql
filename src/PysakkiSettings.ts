export type PysakkiSettingsObj = {
    refreshRateSec: number;
    stopId: string;
    loadSettingsFromJSON: () => object,
    loadSettingsClient: () => void,
}

const defaultSettings = {
    refreshRateSec: 30,
    stopId: "Lahti:104167"
}
const settingsFilePath = "/settings.json"

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
    loadSettingsFromJSON: async (): Promise<PysakkiSettingsObj> => {
        const response = await fetch( settingsFilePath )

        if(!response.ok)
        {
            // error, todo...
        }

        // todo... wip...
        return await response.json();
    },

    loadSettingsClient: function (): void {
        const settingsInPathParams = new URL(location.href).searchParams

        const refreshRateSec = parseInt ( settingsInPathParams.get("refreshRateSec") ?? "" ); 
        const stopId = settingsInPathParams.get("id") ?? "";

        if(!refreshRateSec || !stopId) {
            console.log ("Settings missing, using default values. Apply settings using /?id=<STOP_ID>&refreshRateSec=<REFRESH_RATE_IN_SECONDS>")
            this.refreshRateSec = defaultSettings.refreshRateSec * 1000
            this.stopId = defaultSettings.stopId;
            return;
        }

        this.refreshRateSec = refreshRateSec * 1000;
        this.stopId = stopId;

    } 
}