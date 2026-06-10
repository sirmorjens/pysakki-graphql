export type PysakkiSettingsObj = {
    refreshRateSec: number;
    stopId: string;
}

const settingsFilePath = "/settings.json"

/*
    implementoidaan joku tällainen joka lukee settings json fileestä 
    pysäkin yms relevantit tiedot ja sitten lähtee rendaamaan
    äppiä

    (pitää olla public kansiossa ja noutaa fetchillä muuten joutuu bundleksi eikä asiakas voi enää muokata)

*/

export const GetPysakkiSettings = async (): Promise<PysakkiSettingsObj> => {
    const response = await fetch( settingsFilePath )

    if(!response.ok)
    {
        // error, todo...
    }

    return await response.json();
}