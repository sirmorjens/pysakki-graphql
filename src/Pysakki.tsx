import { graphql, useFragment } from "react-relay";
import type { PysakkiTimesInPatternFragment$key } from "./__generated__/PysakkiTimesInPatternFragment.graphql"
import Stoptime from "./Stoptime";
import { printAlertDataToRows, type AlertData, type RowData, type StopTime, type PatternStopTime } from "./PysakkiUtils";
import type { QueryParentQuery$data } from "./__generated__/QueryParentQuery.graphql";

const StopNotFound = () => {

    const errorRow: RowData = {
        RowType: "ROUTEALERT",
        Alert: {
            alertSeverityLevel: "SEVERE",
            displayAlertText: "Stop not found",
        }
    } 
    return ( 
        <div className="stopRows">
            <Stoptime rowdata={errorRow} />
        </div>   
    )
}

type Props = {
    queryData: QueryParentQuery$data | null | undefined;
}

export default function Pysakki( {queryData}: Props ) 
{
    if(!queryData) return StopNotFound()

    const data = queryData

    const nextDeparturesInPattern: {
        [routename: string]: PatternStopTime[]
    } = {}
    
    /*
    // fake alerts for debugging
    const fakeAlerts: AlertData[] = [
    {
        alertSeverityLevel: 'INFO',
        alertHeaderText: 'Lahdenkadun pysäkki on siirretty',
        alertDescriptionText: 'Pysakki on siirtynyt 300 metriä pohjoiseen Saimaankadun ja Myyntimiehenkadun kulmaan ihan lähelle',
    },
    {
        alertSeverityLevel: 'WARNING',
        alertHeaderText: 'Liikenne ruuhkautunut',
        alertDescriptionText: ''
    },
    {
        alertSeverityLevel: 'SEVERE',
        alertHeaderText: 'Maailmanlopun ongelma',
        alertDescriptionText: ''
    },
    ]
    */
    // @ts-ignore   
    const fakeTimeTables: StopTime[] = JSON.parse('[{"headsign":"Myyntimiehenkatu via Paavola - Kiveriö","realtime":true,"realtimeArrival":52667,"scheduledArrival":52576,"serviceDay":1781470800,"realtimeState":"UPDATED","trip":{"routeShortName":"5","alerts":[{"alertDescriptionText":"Reitin/lähdön häiriötiedote, pitkä häiriöteksti rivittyy useammalle riville (työn alla)","alertHeaderText":"","alertSeverityLevel":"INFO"}]}},{"headsign":"Myyntimiehenkadunvierre via Paavola","realtime":true,"realtimeArrival":52915,"scheduledArrival":52876,"serviceDay":1781470800,"realtimeState":"UPDATED","trip":{"routeShortName":"32","alerts":[]}},{"headsign":"Aivan jäätävän pitkä paikannimi via Yliopisto - Mukkula","realtime":true,"realtimeArrival":53122,"scheduledArrival":53098,"serviceDay":1781470800,"realtimeState":"UPDATED","trip":{"routeShortName":"1","alerts":[]}},{"headsign":"Pisin mahdollinen paikannimi mitä voi ihminen kuvitella via Niemi","realtime":false,"realtimeArrival":53758,"scheduledArrival":53758,"serviceDay":1781470800,"realtimeState":"SCHEDULED","trip":{"routeShortName":"2","alerts":[]}},{"headsign":"Kytölä via Paavola","realtime":true,"realtimeArrival":53849,"scheduledArrival":53394,"serviceDay":1781470800,"realtimeState":"UPDATED","trip":{"routeShortName":"10K","alerts":[{"alertDescriptionText":"Vakava häiriötiedote, nyt on todella iso ongelma","alertHeaderText":"","alertSeverityLevel":"SEVERE"}]}},{"headsign":"Karjusaari via Yliopisto - Mukkula","realtime":false,"realtimeArrival":53998,"scheduledArrival":53998,"serviceDay":1781470800,"realtimeState":"SCHEDULED","trip":{"routeShortName":"1K","alerts":[]}},{"headsign":"Hörölä via Paavola - Kiveriö","realtime":false,"realtimeArrival":54376,"scheduledArrival":54376,"serviceDay":1781470800,"realtimeState":"SCHEDULED","trip":{"routeShortName":"5","alerts":[]}},{"headsign":"Mukkula via Paavola","realtime":false,"realtimeArrival":54676,"scheduledArrival":54676,"serviceDay":1781470800,"realtimeState":"SCHEDULED","trip":{"routeShortName":"32","alerts":[{"alertDescriptionText":"","alertHeaderText":"Pelkkä häiriön otsikkodata, ei tiedetä syötetäänkö nämä reittihäiriöt \'header\' vai \'description\' kohtaan vai sekä-että","alertSeverityLevel":"INFO"}]}},{"headsign":"Soltti via Yliopisto - Mukkula","realtime":false,"realtimeArrival":54898,"scheduledArrival":54898,"serviceDay":1781470800,"realtimeState":"SCHEDULED","trip":{"routeShortName":"1","alerts":[]}},{"headsign":"Kytölä via Paavola","realtime":false,"realtimeArrival":55314,"scheduledArrival":55314,"serviceDay":1781470800,"realtimeState":"SCHEDULED","trip":{"routeShortName":"11","alerts":[]}},{"headsign":"Mukkula via Niemi","realtime":false,"realtimeArrival":55558,"scheduledArrival":55558,"serviceDay":1781470800,"realtimeState":"SCHEDULED","trip":{"routeShortName":"2","alerts":[]}},{"headsign":"Karjusaari via Yliopisto - Mukkula","realtime":false,"realtimeArrival":55798,"scheduledArrival":55798,"serviceDay":1781470800,"realtimeState":"SCHEDULED","trip":{"routeShortName":"1K","alerts":[]}}]')

    // wip: lähtöjen iterointi tässä ja alerttien yms. syöttö joukkoon jolloin rendataan rivit sisällön mukaan
    const displayTimetableRows: RowData[] = [];
    
    if(!data || !data.stop ) return StopNotFound();

    /* debug */
    /*
        add fake stoptimes 
    */

    /*
    displayTimetableRows.push({
    "RowType": "STOPTIME",
    "StopTime": {
        "headsign": "Viuha via Ahtiala",
        "realtime": false,
        "realtimeArrival": 221651,
        "scheduledArrival": 221651,
        "serviceDay": 1788469200,
        "realtimeState": "SCHEDULED",
        "trip": {
            "routeShortName": "14",
            "alerts": []
        }
    }},
    {
        "RowType": "STOPTIME",
        "StopTime": {
            "headsign": "Hiekkanummi via Tonttila - Ahtiala",
            "realtime": false,
            "realtimeArrival": 284990,
            "scheduledArrival": 284990,
            "serviceDay": 1788382800,
            "realtimeState": "SCHEDULED",
            "trip": {
                "routeShortName": "93",
                "alerts": []
            }
        }
    }
    )   
    */

    data.stop!.stoprows!.forEach(stoptime => {
     ///* debug with fake data */ fakeTimeTables.forEach(stoptime => { 
        
        displayTimetableRows.push({RowType: 'STOPTIME', StopTime: stoptime})

        // jos rivillä myös alertteja
        if(stoptime?.trip?.alerts)
        {
            (stoptime?.trip?.alerts as AlertData[]).forEach(alert => 
                displayTimetableRows.push(...printAlertDataToRows(alert as AlertData, 'ROUTEALERT'))
            )
        }
    })

    // jos pysäkillä alle 13 lähtöä (tyypillistä kaukaisilla pysäkeillä) täytetään tyhjillä riveillä
    
    // nyt hard coded numbers, muista joskus tehdä asialle jotain
    if(displayTimetableRows.length < 13)
    {
        const rowsToAddQty = 13-displayTimetableRows.length
        
        for(let i = 0; i<rowsToAddQty; i++)
        {
            displayTimetableRows.push({RowType: "EMPTY"})
        }
    }

    // pysäkin häiriöt
    if(data.stop?.alerts) 
    {
        const StopAlerts: RowData[] = []

        /*
        // debug 
        fakeAlerts.forEach(fakeAlert => 
            StopAlerts.push(...printAlertDataToRows(fakeAlert as AlertData, 'STOPALERT'))       
        )
        */

        data.stop!.alerts!.map(alert => 
            StopAlerts.push(...printAlertDataToRows(alert as AlertData, 'STOPALERT'))
        )

        // syödään stopin riveistä vikat
        StopAlerts.forEach((stopalertrow, index) => 
            displayTimetableRows[
                displayTimetableRows.length - StopAlerts.length + index
            ] = stopalertrow
        )
    }


    console.log(displayTimetableRows)

    // iteroidaan patternit lookup-taulukkoon josta haku linjan nimellä tms
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
            nextDeparturesInPattern[routeName].push( stoptime as PatternStopTime )
        })
    })



    return ( 
        <div className="stopRows">
            {displayTimetableRows.slice(0,13 /* arbitrary magic number, fix this someday*/).map(
                (rowdata, index) => 
                (<Stoptime key={index} rowNo={index} rowdata={rowdata!} patternsLookUp={nextDeparturesInPattern}/>)
            )}
        </div>   
    )

};