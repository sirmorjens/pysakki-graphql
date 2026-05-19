import { graphql, useFragment } from "react-relay";

import type { PysakkiFragment$key } from "./__generated__/PysakkiFragment.graphql";

import Alerts from "./Alerts";
// import StoptimesInPattern from "./StoptimesInPattern"; ei käytössä
import Stoptime from "./Stoptime";
// import Pattern from "./Pattern"; ei käytössä, tarvitaan mahdollisesti bussien sijaintien hakemiseen

export default function Pysakki(props: { pysakki: PysakkiFragment$key; }) 
{
    const data = useFragment<PysakkiFragment$key>(
    graphql`
      fragment PysakkiFragment on Stop
      {
        name # pysäkin nimi
        gtfsId # pysäkin id
        stoptimesForPatterns
        {
            ...StoptimesInPatternFragment #StoptimeInsPattern.tsx
        }
        stoptimesWithoutPatterns(numberOfDepartures:  $departures) # tähän haluttu määrä saapuvien bussien aikoja - muutoksen jälkeen npx relay-compiler 
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
    )
    let stopRows = [];
    let alertRows = [];
    for(var i = 0; i < data.stoptimesWithoutPatterns!.length; i++) {
        stopRows.push(<Stoptime stoptime={data.stoptimesWithoutPatterns![i]!}/>)
    }

    for(var i = 0, l = data.alerts!.length; i < l; i++) {
        alertRows.push(<Alerts alert={data.alerts![i]!}/>)
    }

    let timeNow = new Date();
    return ( 
        // Pysäkin nimi, pysäkin gtfsID-tunniste
        // häiriöt, jos niitä on
        // reitit ja niiden koodit ja saapumisajat
        <div>
            <div className="grid-container">
                <div className="header">
                    {timeNow.toLocaleString('fi-FI').slice(0,19)} <br /> <br />
                    <b>{data.name}</b> <br />
                </div>
                {stopRows}
            </div>  
            <footer>{alertRows}</footer>
        </div>
    )
};