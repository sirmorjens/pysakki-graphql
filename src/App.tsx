import Pysakki from "./Pysakki";
import LR_Header from './LR_components/LR_Header'
import LR_Footer from './LR_components/LR_Footer'
import PysakkiMap from "./PysakkiMap.tsx"
import { PysakkiSettings } from "./PysakkiSettings";
import { useEffect, useState } from 'react';
import type { AppQuery } from "./__generated__/AppQuery.graphql.ts";

import '@fontsource/barlow-semi-condensed/100.css';
import '@fontsource/barlow-semi-condensed/200.css';
import '@fontsource/barlow-semi-condensed/300.css';
import '@fontsource/barlow-semi-condensed/400.css';
import '@fontsource/barlow-semi-condensed/500.css';
import '@fontsource/barlow-semi-condensed/600.css';
import '@fontsource/barlow-semi-condensed/700.css';
import '@fontsource/barlow-semi-condensed/800.css';
import '@fontsource/barlow-semi-condensed/900.css';

import '@fontsource-variable/inter/wght.css';
import '@fontsource/barlow/100.css';
import '@fontsource/barlow/200.css';
import '@fontsource/barlow/300.css';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/800.css';
import '@fontsource/barlow/900.css';


import * as React from 'react';
import { graphql, useLazyLoadQuery } from "react-relay";
import type { AppQuery$data } from "./__generated__/AppQuery.graphql.ts";
type Props = {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}
type State = {
  hasError: boolean
}

function ErrorMsg () {
  // error, let's give up and refresh after 30 sec
  setTimeout(() => {location.reload()}, 30 * 1000);

  return (
    <div className="mapContainer error noBorder">
      <svg xmlns="http://www.w3.org/2000/svg" width="30%" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <g fill="none" stroke="black" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" strokeWidth="1" />
          <path strokeWidth="1" d="M7.881 16.244c.493-.427 1.142-.735 1.842-.937A8.3 8.3 0 0 1 12 15c.786 0 1.57.103 2.277.307c.7.202 1.35.51 1.842.937" />
          <circle cx="9" cy="10" r="1.25" fill="black" strokeWidth=".1" />
          <circle cx="15" cy="10" r="1.25" fill="black" strokeWidth=".1" />
        </g>
      </svg>
    </div>
  )
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {hasError: false}

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // @ts-ignore
  componentDidCatch(error: any, info: any) {
    //
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const queryData: {
  data?: AppQuery$data | null
} = {
  data: null,
}


export default function App() {

  // initiate pysäkkisettings
  PysakkiSettings.loadSettingsClient();

  const [refreshedQueryOptions, setRefreshedQueryOptions] = useState({fetchKey: 0});

  const refreshRate = PysakkiSettings.refreshRateSec;

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

  queryData.data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery($id: String!, $departuresQty: Int!, $lang: String!, $omitCanceled: Boolean!, $inPatternDeparturesQty: Int!) {
        stop(id: $id) 
        {
          name(language: $lang)
          stoptimesForPatterns (numberOfDepartures: $inPatternDeparturesQty)
          {
              ...PysakkiTimesInPatternFragment
          }

          # WIP: noudetaan stoprowit tässä ja iteroidaan

          alerts {
              alertSeverityLevel
              alertHeaderText(language: $lang)
              alertDescriptionText(language: $lang)
          }
      
          stoprows: stoptimesWithoutPatterns(numberOfDepartures:  $departuresQty, omitCanceled: $omitCanceled)
          {
              headsign # määränpää
              realtime
              realtimeArrival # reaaliaikainen saapumisaika sekunneissa
              scheduledArrival # suunniteltu saapumisaika sekunneissa
              serviceDay # helpompi mätsätä timestamppeja kun on päivä
              realtimeState
              trip {
                  routeShortName # reittikoodi
                  alerts
                  {
                      alertSeverityLevel
                      alertHeaderText(language: $lang)
                      alertDescriptionText(language: $lang)
                  }
              }
          }

          geometries {
            geoJson
          }

                
                }
                vehicleRentalsByBbox (
                  maximumLongitude: 25.7972,
                  minimumLongitude: 25.5428,
                  maximumLatitude: 61.0374,
                  minimumLatitude: 60.9208
                )
                {
                  ... on VehicleRentalStation{
                    ...RentalsMarkersRentalsFragment
                }
                  
                }
              }
    `,
    // tähän pysäkin gtfsID (eg. "Lahti:103641", "Lahti:104167") lähtöjen määrä, häiriöiden kieli (fi, en, sv), näytetäänkö perutut vuorot (false = näytetään) ja mistä asti vuorot haetaan (testaamiseen, pitäisi aina olla 0 eli nykyinen)
    {"id": PysakkiSettings.stopId, "departuresQty": 13, "omitCanceled": false, "inPatternDeparturesQty": 3, "lang": "fi"},
    refreshedQueryOptions ?? {}
  );

  useEffect(() => {

    // error handleri
    /*
      jos jostain tulee throw mikävaan error
      voidaan esim asettaa pieni viive ja refreshata sivu
      niin pitäisi toimia kentällä
    */
    const onError = (event: Event) => { setTimeout(() => location.reload(), 30 * 1000)};
      
    window.addEventListener('error', onError);
    
    
    return () => {
      window.removeEventListener('error', onError);
    }
  }, []);
  return (

    <div className="LR_mainContainer">
      <ErrorBoundary fallback={<ErrorMsg />}>
        <LR_Header queryData={queryData.data}/>
        <Pysakki queryData={queryData.data} />
        <PysakkiMap />
      </ErrorBoundary>    
  
      <LR_Footer />
    </div>

  );

}