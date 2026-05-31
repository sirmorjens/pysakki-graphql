import { graphql, useFragment } from "react-relay";
import { useEffect, useState } from 'react'
import type { PysakkiFragment$key } from "./__generated__/PysakkiFragment.graphql";
import type { PysakkiFirstStoptimeFragment$key } from "./__generated__/PysakkiFirstStoptimeFragment.graphql";
import Alerts from "./Alerts";
// import StoptimesInPattern from "./StoptimesInPattern"; ei käytössä
import Stoptime from "./Stoptime";
// import Pattern from "./Pattern"; ei käytössä, tarvitaan mahdollisesti bussien sijaintien hakemiseen

export default function Pysakki(props: { pysakki: PysakkiFragment$key; setRouteShortName: (routeShortName: string) => void }) 
{
    const data = useFragment<PysakkiFragment$key>(
    graphql`
      fragment PysakkiFragment on Stop
      {
        stoptimesForPatterns
        {
            ...StoptimesInPatternFragment #StoptimeInsPattern.tsx
        }
        stoptimesWithoutPatterns(numberOfDepartures: 12) # tähän haluttu määrä saapuvien bussien aikoja - muutoksen jälkeen npx relay-compiler 
        {
            ...StoptimeFragment #Stoptime.tsx
            ...PysakkiFirstStoptimeFragment #---
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
    
    const firstArrivalData = useFragment<PysakkiFirstStoptimeFragment$key>(
            
            // haetaan kaikki pysähdykset tässä
            // tehdään listat ja passataan ylös ja alas

            graphql`
                fragment PysakkiFirstStoptimeFragment on Stoptime
                {
                    headsign # määränpää
                    realtimeArrival # reaaliaikainen saapumisaika sekunneissa
                    scheduledArrival # suunniteltu saapumisaika sekunneissa
                    serviceDay # helpompi mätsätä timestamppeja kun on päivä
                    trip {
                        routeShortName # reittikoodi
                        alerts {
                            ...AlertsFragment
                        }
                    }
                }
        `, data.stoptimesWithoutPatterns![0]
    )

    useEffect(() => {
        console.log("Setting new route")
        props.setRouteShortName(firstArrivalData?.trip?.routeShortName?.valueOf() ?? "")
    }/*,[] set for manual control*/) 
    
    for(var i = 0; i < data.stoptimesWithoutPatterns!.length; i++) {
        stopRows.push(<Stoptime stoptime={data.stoptimesWithoutPatterns![i]!}/>)
    }

    for(var i = 0, l = data.alerts!.length; i < l; i++) {
        alertRows.push(<Alerts alert={data.alerts![i]!}/>)
    }
    


    return ( 
        // Pysäkin nimi, pysäkin gtfsID-tunniste
        // häiriöt, jos niitä on
        // reitit ja niiden koodit ja saapumisajat
        <div className="stopRows">
            {alertRows}
            {stopRows} <br />
        </div>    
    )
};