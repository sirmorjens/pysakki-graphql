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
        stoptimesWithoutPatterns(numberOfDepartures: 15) # tähän haluttu määrä saapuvien bussien aikoja - muutoksen jälkeen npx relay-compiler 
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
    for(var i = 0; i < data.stoptimesWithoutPatterns.length; i++) {
        stopRows.push(<Stoptime stoptime={data.stoptimesWithoutPatterns[i]}/>)
    }

    for(var i = 0, l = data.alerts.length; i < l; i++) {
        alertRows.push(<Alerts alert={data.alerts[i]}/>)
    }
    return ( 
        // Pysäkin nimi, pysäkin gtfsID-tunniste
        // häiriöt, jos niitä on
        // reitit ja niiden koodit ja saapumisajat
        <div>
            <b>{data.name}</b> - <i>{data.gtfsId}</i> <br />
            {alertRows}
            {stopRows} <br />
        </div>    
    )
};