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
    readonly headingContinued?: boolean; // if split into multiple rows
}

export type StopTime = any /* generate type with graphql codegen */

// max letters limit for destination
export const MAX_DESTINATION_LETTERS = {
    destination: 30,
    withViaTxt: 12,
    viaTxt: 18,
}

// max letters before line split
const ALERT_MAX_LETTERS_PER_ROW = {
    'STOPALERT': 60,
    'STOPALERT_HEADING': 54,
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

    // luodaan uusi alert objecti
    const BaseAlertRowData: AlertRowData = {
        alertSeverityLevel: alertObj.alertSeverityLevel,
        displayAlertText: '',
    }
    const splitLongWord = (word: string, segmentMaxLength: number): string[] => {
        const longWordSegments = ['']
        const longWordLetters = word.split("")

        while(longWordLetters.length > segmentMaxLength)
        {
            longWordSegments[longWordSegments.length-1] += longWordLetters.shift();
            if(longWordSegments[longWordSegments.length-1].length >= segmentMaxLength) longWordSegments.push("")
        }
        
        return [...longWordSegments, /* loput kirjaimet */ longWordLetters.join(""), " "]
    }

    const splitIntoSegments = ( segments: string[], word: string, segmentMaxLength: number ): string[] => {
        if(!segments.length) segments.push('')

        /* split long words */
        if(word.length > segmentMaxLength) {
            const longWordSegments = splitLongWord(word, segmentMaxLength);
            
            segments.push(...longWordSegments)
            return segments
        }

        if( ( segments[segments.length - 1].length + word.length ) > segmentMaxLength) segments.push('')
        

        segments[segments.length - 1] += word + " "
        return segments
    }

    const splitDescriptionTextIntoSegments = ( segments: string[], word: string ) => {
        return splitIntoSegments(segments, word, ALERT_MAX_LETTERS_PER_ROW['STOPALERT'])
    }

    const splitHeaderIntoSegments = ( segments: string[], word: string ) => {
        return splitIntoSegments(segments, word, ALERT_MAX_LETTERS_PER_ROW['STOPALERT_HEADING'])
    }

    const descriptionTxtSegments = displayAlertText.split(' ').reduce<Array<string>>(splitDescriptionTextIntoSegments, [])
    
    // jos kuvausteksti on, lisätään se, jos ei, ei lisätä (nerokasta)
    const alertRows = displayAlertText.length ? descriptionTxtSegments.map(segment => ({RowType: RowType, Alert: {...BaseAlertRowData, displayAlertText: segment}})) : []
    
    // jos ei heading-tekstiä saatavilla, palautetaan pelkät alertrowit
    if (!(alertObj!.alertHeaderText)) return alertRows

    // jos header on saataville, lisätään se omana rivinään (omina riveinään) ensimmäiseksi
    // pätkitään riveille jos liian pitkä
    const headingTxtSegments = alertObj.alertHeaderText.split(' ').reduce<Array<string>>(splitHeaderIntoSegments, [])
    
    const alertHeadingRows = headingTxtSegments.map(headingSegment => ({RowType: RowType, Alert: {...BaseAlertRowData, isHeading: true, headingContinued: true, displayAlertText: headingSegment}}))

    // ekalle riville headingContinued = false, jotta symboli näytetään
    alertHeadingRows[0].Alert.headingContinued = false;

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