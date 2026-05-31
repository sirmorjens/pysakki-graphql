import { graphql, useFragment } from "react-relay";

import type { PysakkiFragment$key } from "./__generated__/PysakkiFragment.graphql";

import Alerts from "./Alerts";
// import StoptimesInPattern from "./StoptimesInPattern"; ei käytössä
import Stoptime from "./Stoptime";
import StoptimesInPattern from "./StoptimesInPattern";
// import Pattern from "./Pattern"; ei käytössä, tarvitaan mahdollisesti bussien sijaintien hakemiseen

export default function Pysakki(props: { pysakki: PysakkiFragment$key; }) 
{
    const data = useFragment<PysakkiFragment$key>(
    graphql`
      fragment PysakkiFragment on Stop
      {
        name # pysäkin nimi
        gtfsId # pysäkin id

        stoptimesForPatterns(numberOfDepartures:  $departures, omitCanceled: $cancel, startTime: $alkuaika)
        {
            ...StoptimesInPatternFragment #StoptimeInsPattern.tsx
        }
        stoptimesWithoutPatterns(numberOfDepartures:  $departures, omitCanceled: $cancel, startTime: $alkuaika) # muuta muuttujia App.tsx 
        {
            ...StoptimeFragment #Stoptime.tsx
        }
        patterns
        {
            ...PatternFragment #Pattern.tsx
        }
        alerts
        {
            ...AlertsFragment #Alerts.tsx
        }
    }
    `,
    props.pysakki
    );

    let stopRows = [];
    let alertRows = [];

    for ( var i = 0; i < data.stoptimesWithoutPatterns!.length; i++ ) 
    { 
        if(i < 2) { stopRows.push(<div className="bigtrip"><Stoptime stoptime={data.stoptimesWithoutPatterns![i]!}/></div>) }
        else { stopRows.push(<Stoptime stoptime={data.stoptimesWithoutPatterns![i]!}/>) }
    }

    // for ( var i = 0; i < data.stoptimesForPatterns!.length; i++ ) 
    // { 
    //     if(i < 2) { stopRows.push(<div className="bigtrip"><StoptimesInPattern stoptimesInPattern={data.stoptimesForPatterns![i]!}/></div>) }
    //     else { stopRows.push(<StoptimesInPattern stoptimesInPattern={data.stoptimesForPatterns![i]!}/>) }
    // }

    for ( var i = 0, l = data.alerts!.length; i < l; i++ ) { alertRows.push(<Alerts alert={data.alerts![i]!}/>) }

    let timeNow = new Date();
    let options:any = { year: "numeric", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit" };

    return ( 
        // Päivämäärä
        // Pysäkin nimi
        // reitit ja niiden koodit ja saapumisajat
        // häiriöt, jos niitä on
        <div>
            <div className="grid-container">
                <div className="header">
                    {timeNow.toLocaleDateString('fi-FI', options)}
                </div>
                {stopRows}
            </div>  
            <footer className="alert">{alertRows}</footer>
        </div>
    )
};