import { graphql, useFragment } from "react-relay";

import type { PysakkiFragment$key } from "./__generated__/PysakkiFragment.graphql";
import type { PysakkiTimesInPatternFragment$key } from "./__generated__/PysakkiTimesInPatternFragment.graphql"
import Alerts from "./Alerts";
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

        stoptimesForPatterns (numberOfDepartures: $inPatternDepartures)
        {
            ...PysakkiTimesInPatternFragment
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

    let alertRows = [];



    type PatternStopTime = {
        serviceDay: number,
        realtimeArrival: number,
        headsign: string;
        trip: {
            routeShortName: string;
        }
    }
    const nextDeparturesInPattern: {
        [routename: string]: PatternStopTime[]
    } = {}

    data.stoptimesForPatterns?.forEach(stoptimeForPattern => {

        const stoptimesInPattern = useFragment<PysakkiTimesInPatternFragment$key>(
            graphql`
                fragment PysakkiTimesInPatternFragment on StoptimesInPattern
                {
                    stoptimes {
                        serviceDay
                        realtimeArrival
                        headsign
                        trip {
                            routeShortName
                        }
                    }
        
                }
                `, stoptimeForPattern!
                )
        
        stoptimesInPattern?.stoptimes?.toReversed().forEach((stoptime) => 
        {
            // routen nimi avaimeksi objektille
            const routeName = stoptime?.trip!.routeShortName!
            
            // jos route ei jo listalla, alustetaan uusi taulukko
            if( !nextDeparturesInPattern.hasOwnProperty( routeName ) )
            {
                nextDeparturesInPattern[routeName] = []
            }
            // routen taulukkoon uusi stoptime
            nextDeparturesInPattern[routeName].push( stoptime as PatternStopTime)
        })
    })

    for ( var i = 0, l = data.alerts!.length; i < l; i++ ) { alertRows.push(<Alerts alert={data.alerts![i]!}/>) }

    let timeNow = new Date();
    let options:any = { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" };
    let stoptimesMap = data!.stoptimesWithoutPatterns!.map(stoptime => <Stoptime stoptime={stoptime!} patternsLookUp={nextDeparturesInPattern}/>)
    for ( var i = 0; i < 2; i++) {stoptimesMap[i] = <div className="bigtrip">{stoptimesMap[i]}</div>}

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
                {stoptimesMap}
            </div>  
            <footer className="alert">{alertRows}</footer>
        </div>
    )
};