import type { AlertSeverityLevelType } from "./__generated__/AlertsFragment.graphql";

// rowdata voi olla joko alertrivi 
// tai stoptime rivi
export type RowData = {
    RowType: 'STOPALERT' | 'ROUTEALERT' | 'STOPTIME'
    Alert?: AlertRowData | null;
    StopTime?: StopTime
}

export type PatternStopTime = {
    serviceDay: number,
    realtimeArrival: number,
    headsign: string;
    trip: {
        routeShortName: string;
    }
}

export type AlertData = {
    readonly alertSeverityLevel?: AlertSeverityLevelType;
    readonly alertHeaderText?: string;
    readonly alertDescriptionText?: string;
}

export type AlertRowData = {
    readonly alertSeverityLevel?: AlertSeverityLevelType;
    readonly displayAlertText?: string;
}

export type StopTime = any /* generate type with graphql codegen */

// max letters limit for destination
export const MAX_DESTINATION_LETTERS = {
    destination: 36,
    viaTxt: 16,
}
// max letters before line split
const ALERT_MAX_LETTERS_PER_ROW = {
    'STOPALERT': 60,
    'ROUTEALERT': 54,
};

export const printAlertDataToRows = (alertObj: AlertData, RowType: 'STOPALERT' | 'ROUTEALERT'): RowData[] => {

    // Inject test words to test row length
    
    // // @ts-expect-error
    //alertObj.alertDescriptionText = debugWordGenerator(9,15);
    
    // EI TIEDETÄ MITEN TOIMIJAT KÄYTTÄÄ ALERTTEJA (laittavatko otsikkoon vai descriptioniin infon)
    // kumpaa tulisi käyttää. Tehdään konditionaalinen formatointi eli jätetään jompi kumpi pois jos tyhjä

    // tässä formatoidaan ehdollisesti alertHeaderText -> alertDescriptionText
    const displayAlertText: string = (() => {
        if ( alertObj!.alertHeaderText && alertObj!.alertDescriptionText ) return `${alertObj!.alertHeaderText}: ${alertObj!.alertDescriptionText}`
        if ( alertObj!.alertHeaderText && alertObj!.alertHeaderText.length ) return `${alertObj!.alertHeaderText}`
        if ( alertObj!.alertDescriptionText && alertObj!.alertDescriptionText.length ) return `${alertObj!.alertDescriptionText}`
        return ""
    })()

    // jos alert on alle rivin max pituus, palautetaan se suoraan sitä muuttamatta
    if( displayAlertText.length < ALERT_MAX_LETTERS_PER_ROW[RowType] ) return [{RowType: RowType, Alert: {...alertObj, displayAlertText: displayAlertText}}]

    // luodaan uusi alert objectk
    const BaseAlertRowData: AlertRowData = {
        alertSeverityLevel: alertObj.alertSeverityLevel,
        displayAlertText: '',
    }

    const descriptionTxtSegments = displayAlertText.split(' ').reduce<Array<string>>(( segments, word ): string[] => {
        if(!segments.length) segments.push('')

        /* todo split long words */

        if( ( segments[segments.length - 1].length + word.length ) > ALERT_MAX_LETTERS_PER_ROW[RowType]) segments.push('')
        
        /*  WIP epätodennäköinen tilanne jos yksi sana on yli ~70 merkkiä
            jaetaan sana monelle riville */
        /*
        if(word.length > ALERT_MAX_LETTERS_PER_ROW[RowType])
        {
            // split word and store multiple rows
        }
        */

        segments[segments.length? segments.length - 1 : 0] += word + " "
        return segments
    }, [])

    const alertRows = descriptionTxtSegments.map(segment => ({RowType: RowType, Alert: {...BaseAlertRowData, displayAlertText: segment}}))
    return alertRows;
}

// @ts-expect-error // debugging use only
const debugWordGenerator = (length: number, wordsQty: number): string => {
    const output: string[] = []
    
    for(let words = 0; words<wordsQty; words++)
    {
        const currentWord: string[] = [];
        for(let wordLength = 0; wordLength < length; wordLength++)
        {
            const randomLetter = String.fromCharCode(65 + Math.random()*25)
            currentWord.push(randomLetter)
        }
        output.push(currentWord.join(""))
    }

    return output.join(" ");
}