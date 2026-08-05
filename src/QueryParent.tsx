import Pysakki from "./Pysakki";
import LR_Header from './LR_components/LR_Header'
import { PysakkiSettings } from "./PysakkiSettings";
import type { AppQuery } from "./__generated__/AppQuery.graphql.ts";
import PysakkiMap from "./PysakkiMap.tsx"
import { graphql, useLazyLoadQuery } from "react-relay";
import type { AppQuery$data } from "./__generated__/AppQuery.graphql.ts";
import { useEffect, useState } from "react";

const queryData: {
  data?: AppQuery$data | null
} = {
  data: null,
}

export default function QueryParent () {

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

return (
    <>
        <LR_Header queryData={queryData.data}/>
        <Pysakki queryData={queryData.data} />
        <PysakkiMap />
    </>
);


}