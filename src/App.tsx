import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useEffect, useState } from 'react';
import './styles/grid.css'
// import Pysakki from "./Pysakki.tsx";

export default function App() {

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

  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery($id: String!, $inPatternDepartures: Int!, $departures: Int!, $kieli: String!, $cancel: Boolean!, $alkuaika: Long!) {
        stop(id: $id) 
        {
          name # pysäkin nimi
          gtfsId # pysäkin id

          stoptimesForPatterns (numberOfDepartures: $inPatternDepartures)
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
          stoptimesWithoutPatterns(numberOfDepartures:  $departures, omitCanceled: $cancel, startTime: $alkuaika)
          {
            headsign # määränpää
            realtimeArrival # reaaliaikainen saapumisaika sekunteina
            scheduledArrival # suunniteltu saapumisaika sekunteina
            realtimeState # ADDED, CANCELED, MODIFIED, SCHEDULED, UPDATED

            trip 
            {
                routeShortName # reittikoodi
            }
          }
          patterns
          {
              ...PatternFragment #Pattern.tsx
          }
          alerts
          {
              alertDescriptionText(language: $kieli) # häiriön selitys, argumenttina kieli ("fi", "sv", "en")
          }
        }
      }
    `,
    // tähän pysäkin gtfsID (eg. "Lahti:103641", "Lahti:104167") lähtöjen määrä, häiriöiden kieli (fi, en, sv), näytetäänkö perutut vuorot (false = näytetään) ja mistä asti vuorot haetaan (testaamiseen, pitäisi aina olla 0 eli nykyinen)
    {"id": "Lahti:104167", "departures": 10, "kieli": "en", "cancel": false, "alkuaika": 0, "inPatternDepartures": 5},
    refreshedQueryOptions ?? {}
  );
  const pysakki = data.stop;
  const stoptime = pysakki?.stoptimesWithoutPatterns;
  const inPatternStoptime = pysakki?.stoptimesForPatterns;
  
  let timeNow = new Date();
  let options:any = { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" };
  let stopRows:any[] = [];

  stoptime!.forEach(element => {
    // aikojen käsittely
    const realSeconds = element!.realtimeArrival!.valueOf();
    const scheduledSeconds = element!.scheduledArrival!.valueOf();

    let shownTime = "~" + new Date(scheduledSeconds * 1000).toISOString().slice(11, 16); // hh:mm


    let cancelState= "";
    let arrivalState= "";
    let aikaClass = "aika"
    let nextStoptimes:String[] = [];
    
    inPatternStoptime!.forEach(pattern => {
      if(pattern!.stoptimes![0]!.trip?.routeShortName == element?.trip?.routeShortName) {
        pattern!.stoptimes!.forEach(time => {
          nextStoptimes.push(new Date(time!.realtimeArrival!*1000).toISOString().slice(11, 16)+" ")
        });
      }
    });
    nextStoptimes = nextStoptimes.toReversed().slice(1)

    if(shownTime.substring(1)==nextStoptimes[0].substring(0,5)) { nextStoptimes = nextStoptimes.slice(1)}

    let d = new Date();
    let secondsNow = Math.round(d.getTime() / 1000)%86400;

    // merkitään bussi saapuvaksi jos saapumisaika lähestyy
    if((realSeconds-3600*3)-secondsNow <= 30) { arrivalState = "Saapuu" }

    if(element!.realtimeState != "SCHEDULED") {
        aikaClass = "oikeaaika"
        // pyöristää ylös lähimpään minuuttiin
        if(realSeconds%60>30) { shownTime = new Date((realSeconds + 60-realSeconds%60) * 1000).toISOString().slice(11, 16); }

        else { shownTime = new Date(realSeconds * 1000).toISOString().slice(11, 16); }

        if(element!.realtimeState == "CANCELED") { cancelState = "Peruttu"; aikaClass = "peruttuaika"; arrivalState = "" }
    } 

    stopRows.push( // reittikoodi, määränpää, aika (suunniteltu), onko vuoro peruttu
        <div className="trip">
            <p className="reittikoodi">{element!.trip!.routeShortName}</p>
            <p className={aikaClass}>{shownTime} </p>
            <p className="tulevatajat">{nextStoptimes.slice(0,2)}</p> <br />
            <p className="paikka">{element!.headsign}</p>

            <b className="reittihäiriö">{cancelState}</b>
            <b className="saapumistilanne">{arrivalState}</b> 
        </div>
    ) 
  });
  for ( var i = 0; i < 2; i++) {stopRows[i] = <div className="bigtrip">{stopRows[i]}</div>}

  let alertRows: any[] = [];
  pysakki!.alerts?.forEach(element => {
    alertRows.push(element?.alertDescriptionText)
  });


  if(pysakki != null) {
    return (
        <div>

            <div className="grid-container">
                <div className="header">
                    {timeNow.toLocaleDateString('fi-FI', options)}
                </div>
                {stopRows}
            </div>  
            <footer className="alert">{alertRows}</footer>
        </div>
    );
  } else return (
    <h1>Virhe haettaessa dataa</h1>
  )

}