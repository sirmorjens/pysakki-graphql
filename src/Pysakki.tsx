import { graphql, useFragment } from "react-relay";
import type { PysakkiFragment$key } from "./__generated__/PysakkiFragment.graphql";
import type { PysakkiTimesInPatternFragment$key } from "./__generated__/PysakkiTimesInPatternFragment.graphql"
import { useState, useEffect } from 'react'
import { useLazyLoadQuery } from "react-relay";
import type { PysakkiQuery } from "./__generated__/PysakkiQuery.graphql"
import Stoptime from "./Stoptime";
// import Pattern from "./Pattern"; ei käytössä, tarvitaan mahdollisesti bussien sijaintien hakemiseen

type PatternStopTime = {
    serviceDay: number,
    realtimeArrival: number,
    headsign: string;
    trip: {
        routeShortName: string;
    }
}

export default function Pysakki() 
{


    const nextDeparturesInPattern: {
        [routename: string]: PatternStopTime[]
    } = {}
    const [refreshedQueryOptions, setRefreshedQueryOptions] = useState({fetchKey: 0});
 
    const refreshRate = 60 * 1000;
 
    const refresh = () => {
        setRefreshedQueryOptions(prev => ({
        fetchKey: (prev?.fetchKey ?? 0) + 1,
        fetchPolicy: 'network-only',
        }));
    };
 
    useEffect(() => {
 
        const timerId = setInterval(() => {
        console.log("refresh")
        refresh()
        }, refreshRate)
    
        return () => clearTimeout(timerId)
    }, []);
 
    const data = useLazyLoadQuery<PysakkiQuery>(
        graphql`
        query PysakkiQuery($id: String!, $departureQty: Int!, $lang: String!, $omitCanceled: Boolean!, $inPatternDeparturesQty: Int!) {
            stop(id: $id) 
            {
                stoptimesForPatterns (numberOfDepartures: $inPatternDeparturesQty)
                {
                    ...PysakkiTimesInPatternFragment
                }
                stoptimesWithoutPatterns(numberOfDepartures:  $departureQty, omitCanceled: $omitCanceled)
                {
                    ...StoptimeFragment
                }
            }
        }
        `,
        // tähän pysäkin gtfsID (eg. "Lahti:103641", "Lahti:104167") lähtöjen määrä, häiriöiden kieli (fi, en, sv), näytetäänkö perutut vuorot (false = näytetään) ja mistä asti vuorot haetaan (testaamiseen, pitäisi aina olla 0 eli nykyinen)
        {"id": "Lahti:104167", "departureQty": 12, "omitCanceled": false, "inPatternDeparturesQty": 3, "lang": "fi"},
        refreshedQueryOptions ?? {}
    );
    console.log(data)
    data.stop!.stoptimesForPatterns?.forEach(stoptimeForPattern => {

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
        
            }`, 
            stoptimeForPattern
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

    return ( 
        <div className="stopRows">
            {data!.stop!.stoptimesWithoutPatterns!.map(
                stoptime => 
                <Stoptime stoptime={stoptime!} patternsLookUp={nextDeparturesInPattern}/>
            )}
        </div>   
    )
};