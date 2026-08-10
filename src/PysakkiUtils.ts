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
    readonly isHeading?: boolean;
}

export type StopTime = any /* generate type with graphql codegen */

// max letters limit for destination
export const MAX_DESTINATION_LETTERS = {
    destination: 30,
    withViaTxt: 10,
    viaTxt: 24,
}

// max letters before line split
const ALERT_MAX_LETTERS_PER_ROW = {
    'STOPALERT': 65,
    'ROUTEALERT': 48,
};

export const printAlertDataToRows = (alertObj: AlertData, RowType: 'STOPALERT' | 'ROUTEALERT'): RowData[] => {

    // Inject test words to test row length
    
    // // @ts-expect-error
    //alertObj.alertDescriptionText = debugWordGenerator(9,15);
    
    // EI TIEDETÄ MITEN TOIMIJAT KÄYTTÄÄ ALERTTEJA (laittavatko otsikkoon vai descriptioniin infon)
    // kumpaa tulisi käyttää. Tehdään konditionaalinen formatointi eli jätetään jompi kumpi pois jos tyhjä

    // tässä formatoidaan ehdollisesti alertHeaderText -> alertDescriptionText
    const displayAlertText: string = (() => {
        /*
            Aluksi formatoitiin otsikko ja description yhdeksi tekstiblokiksi,
            nyt tällä hetkellä lisätään otsikko (jos on) omaksi rivikseen alkuun,
            jolloin se erottuu selkeämmin
        */
        // if ( alertObj!.alertHeaderText && alertObj!.alertDescriptionText ) return `${alertObj!.alertHeaderText} ${alertObj!.alertDescriptionText}`
        // if ( alertObj!.alertHeaderText && alertObj!.alertHeaderText.length ) return `${alertObj!.alertHeaderText}`
        
        if ( alertObj!.alertDescriptionText && alertObj!.alertDescriptionText.length ) return `${alertObj!.alertDescriptionText}`
        return ""
    })()

    // jos alert on alle rivin max pituus, palautetaan se suoraan sitä muuttamatta
    if( displayAlertText.length < ALERT_MAX_LETTERS_PER_ROW[RowType] ) return [{RowType: RowType, Alert: {...alertObj, displayAlertText: displayAlertText}}]

    // luodaan uusi alert objecti
    const BaseAlertRowData: AlertRowData = {
        alertSeverityLevel: alertObj.alertSeverityLevel,
        displayAlertText: '',
    }
    const splitLongWord = (word: string): string[] => {
        const longWordSegments = ['']
        const longWordLetters = word.split("")
        while(longWordLetters.length > ALERT_MAX_LETTERS_PER_ROW[RowType])
        {
            longWordSegments[longWordSegments.length-1] += longWordLetters.shift();
            if(longWordSegments[longWordSegments.length-1].length >= ALERT_MAX_LETTERS_PER_ROW[RowType]) longWordSegments.push("")
        }
        
        return [...longWordSegments, /* loput kirjaimet */ longWordLetters.join(""), " "]
    }

    const splitIntoSegments = ( segments: string[], word: string ): string[] => {
        if(!segments.length) segments.push('')

        /* split long words */
        if(word.length > ALERT_MAX_LETTERS_PER_ROW[RowType]) {
            const longWordSegments = splitLongWord(word);
            
            segments.push(...longWordSegments)
            return segments
        }

        if( ( segments[segments.length - 1].length + word.length ) > ALERT_MAX_LETTERS_PER_ROW[RowType]) segments.push('')
        

        segments[segments.length - 1] += word + " "
        return segments
    }

    const descriptionTxtSegments = displayAlertText.split(' ').reduce<Array<string>>(splitIntoSegments, [])
    
    const alertRows = descriptionTxtSegments.map(segment => ({RowType: RowType, Alert: {...BaseAlertRowData, displayAlertText: segment}}))
    
    // jos ei heading-tekstiä saatavilla, palautetaan pelkät alertrowit
    if (!(alertObj!.alertHeaderText)) return alertRows

    // jos header on saataville, lisätään se omana rivinään (omina riveinään) ensimmäiseksi
    // pätkitään riveille jos liian pitkä

    const headingTxtSegments = alertObj.alertHeaderText.split(' ').reduce<Array<string>>(splitIntoSegments, [])
    
    const alertHeadingRows = headingTxtSegments.map(headingSegment => ({RowType: RowType, Alert: {...BaseAlertRowData, isHeading: true, displayAlertText: headingSegment}}))
    
    return [...alertHeadingRows, ...alertRows]
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