import type { AlertSeverityLevelType } from "./__generated__/AlertsFragment.graphql";

export type RowData = {
    RowType: 'STOPTIME' | 'STOPALERT' | 'ROUTEALERT'
    StopTime?: StopTime /* see above */
    Alert?: AlertText | null;
}

export type AlertText = {
        readonly alertSeverityLevel?: AlertSeverityLevelType;
        readonly alertHeaderText?: string;
        readonly alertDescriptionText?: string;
}

export type StopTime = any /* generate type with graphql codegen */


// max letters before line split
const ALERT_MAX_LETTERS_PER_ROW = {
    'STOPALERT': 60,
    'ROUTEALERT': 54,
};

export const splitAlertTextToRows = (alertObj: AlertText, RowType: 'STOPALERT' | 'ROUTEALERT'): RowData[] => {
    
    
    // Inject test words to test row length
    
    // // @ts-expect-error
    //alertObj.alertDescriptionText = debugWordGenerator(9,15);
    

    // jos alert on alle rivin max pituus, palautetaan se suoraan sitä muuttamatta
    if( alertObj.alertDescriptionText!.length < ALERT_MAX_LETTERS_PER_ROW[RowType] ) return [{RowType: RowType, Alert: alertObj}]

    // luodaan uusi alert objectk
    const BaseAlert: AlertText = {
        alertSeverityLevel: alertObj.alertSeverityLevel,
        alertHeaderText: alertObj.alertHeaderText,
        alertDescriptionText: ''
    }

    const descriptionTxtSegments = alertObj.alertDescriptionText!.split(' ').reduce<Array<string>>(( segments, word ): string[] => {
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

    const alertRows = descriptionTxtSegments.map(segment => ({RowType: RowType, Alert: {...BaseAlert, alertDescriptionText: segment}}))
    console.log(alertRows)
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