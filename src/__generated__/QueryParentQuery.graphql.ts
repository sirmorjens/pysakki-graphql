/**
 * @generated SignedSource<<1704e35453b12b40a58cb449a2ecd924>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AlertSeverityLevelType = "INFO" | "SEVERE" | "UNKNOWN_SEVERITY" | "WARNING" | "%future added value";
export type RealtimeState = "ADDED" | "CANCELED" | "MODIFIED" | "SCHEDULED" | "UPDATED" | "%future added value";
export type QueryParentQuery$variables = {
  departuresQty: number;
  id: string;
  inPatternDeparturesQty: number;
  lang: string;
  mapDeparturesQty: number;
  omitCanceled: boolean;
};
export type QueryParentQuery$data = {
  readonly stop: {
    readonly alerts: ReadonlyArray<{
      readonly alertDescriptionText: string;
      readonly alertHeaderText: string | null | undefined;
      readonly alertSeverityLevel: AlertSeverityLevelType | null | undefined;
    } | null | undefined> | null | undefined;
    readonly geometries: {
      readonly geoJson: any | null | undefined;
    } | null | undefined;
    readonly maprows: ReadonlyArray<{
      readonly headsign: string | null | undefined;
      readonly trip: {
        readonly directionId: number;
        readonly geometry: ReadonlyArray<ReadonlyArray<number | null | undefined> | null | undefined> | null | undefined;
        readonly route: {
          readonly gtfsId: string;
        };
        readonly routeShortName: string | null | undefined;
        readonly stops: ReadonlyArray<{
          readonly geometries: {
            readonly geoJson: any | null | undefined;
          } | null | undefined;
        }>;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly name: string;
    readonly stoprows: ReadonlyArray<{
      readonly headsign: string | null | undefined;
      readonly realtime: boolean | null | undefined;
      readonly realtimeArrival: number | null | undefined;
      readonly realtimeState: RealtimeState | null | undefined;
      readonly scheduledArrival: number | null | undefined;
      readonly serviceDay: any | null | undefined;
      readonly trip: {
        readonly alerts: ReadonlyArray<{
          readonly alertDescriptionText: string;
          readonly alertHeaderText: string | null | undefined;
          readonly alertSeverityLevel: AlertSeverityLevelType | null | undefined;
        } | null | undefined> | null | undefined;
        readonly routeShortName: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly stoptimesForPatterns: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"PysakkiTimesInPatternFragment">;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly vehicleRentalsByBbox: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"RentalsMarkersRentalsFragment">;
  }>;
};
export type QueryParentQuery = {
  response: QueryParentQuery$data;
  variables: QueryParentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "departuresQty"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "inPatternDeparturesQty"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lang"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "mapDeparturesQty"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "omitCanceled"
},
v6 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v7 = [
  {
    "kind": "Variable",
    "name": "language",
    "variableName": "lang"
  }
],
v8 = {
  "alias": null,
  "args": (v7/*: any*/),
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = [
  {
    "kind": "Variable",
    "name": "numberOfDepartures",
    "variableName": "inPatternDeparturesQty"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alertSeverityLevel",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": (v7/*: any*/),
  "kind": "ScalarField",
  "name": "alertHeaderText",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": (v7/*: any*/),
  "kind": "ScalarField",
  "name": "alertDescriptionText",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Alert",
  "kind": "LinkedField",
  "name": "alerts",
  "plural": true,
  "selections": [
    (v10/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/)
  ],
  "storageKey": null
},
v14 = {
  "kind": "Variable",
  "name": "omitCanceled",
  "variableName": "omitCanceled"
},
v15 = [
  {
    "kind": "Variable",
    "name": "numberOfDepartures",
    "variableName": "departuresQty"
  },
  (v14/*: any*/)
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headsign",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtime",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtimeArrival",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "scheduledArrival",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "serviceDay",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtimeState",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "routeShortName",
  "storageKey": null
},
v23 = [
  {
    "kind": "Variable",
    "name": "numberOfDepartures",
    "variableName": "mapDeparturesQty"
  },
  (v14/*: any*/)
],
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gtfsId",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "directionId",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "geometry",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "StopGeometries",
  "kind": "LinkedField",
  "name": "geometries",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "geoJson",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v28 = [
  {
    "kind": "Literal",
    "name": "maximumLatitude",
    "value": 61.0374
  },
  {
    "kind": "Literal",
    "name": "maximumLongitude",
    "value": 25.7972
  },
  {
    "kind": "Literal",
    "name": "minimumLatitude",
    "value": 60.9208
  },
  {
    "kind": "Literal",
    "name": "minimumLongitude",
    "value": 25.5428
  }
],
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "concreteType": "Alert",
  "kind": "LinkedField",
  "name": "alerts",
  "plural": true,
  "selections": [
    (v10/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    (v29/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueryParentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          {
            "alias": null,
            "args": (v9/*: any*/),
            "concreteType": "StoptimesInPattern",
            "kind": "LinkedField",
            "name": "stoptimesForPatterns",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PysakkiTimesInPatternFragment"
              }
            ],
            "storageKey": null
          },
          (v13/*: any*/),
          {
            "alias": "stoprows",
            "args": (v15/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  (v22/*: any*/),
                  (v13/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "maprows",
            "args": (v23/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v16/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Route",
                    "kind": "LinkedField",
                    "name": "route",
                    "plural": false,
                    "selections": [
                      (v24/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v25/*: any*/),
                  (v26/*: any*/),
                  (v22/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Stop",
                    "kind": "LinkedField",
                    "name": "stops",
                    "plural": true,
                    "selections": [
                      (v27/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v27/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v28/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "vehicleRentalsByBbox",
        "plural": true,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RentalsMarkersRentalsFragment"
              }
            ],
            "type": "VehicleRentalStation",
            "abstractKey": null
          }
        ],
        "storageKey": "vehicleRentalsByBbox(maximumLatitude:61.0374,maximumLongitude:25.7972,minimumLatitude:60.9208,minimumLongitude:25.5428)"
      }
    ],
    "type": "QueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v5/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "QueryParentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          {
            "alias": null,
            "args": (v9/*: any*/),
            "concreteType": "StoptimesInPattern",
            "kind": "LinkedField",
            "name": "stoptimesForPatterns",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Stoptime",
                "kind": "LinkedField",
                "name": "stoptimes",
                "plural": true,
                "selections": [
                  (v20/*: any*/),
                  (v18/*: any*/),
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Trip",
                    "kind": "LinkedField",
                    "name": "trip",
                    "plural": false,
                    "selections": [
                      (v22/*: any*/),
                      (v29/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v30/*: any*/),
          {
            "alias": "stoprows",
            "args": (v15/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  (v22/*: any*/),
                  (v30/*: any*/),
                  (v29/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "maprows",
            "args": (v23/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v16/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Route",
                    "kind": "LinkedField",
                    "name": "route",
                    "plural": false,
                    "selections": [
                      (v24/*: any*/),
                      (v29/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v25/*: any*/),
                  (v26/*: any*/),
                  (v22/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Stop",
                    "kind": "LinkedField",
                    "name": "stops",
                    "plural": true,
                    "selections": [
                      (v27/*: any*/),
                      (v29/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v29/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v27/*: any*/),
          (v29/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v28/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "vehicleRentalsByBbox",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lat",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lon",
                "storageKey": null
              }
            ],
            "type": "VehicleRentalStation",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v29/*: any*/)
            ],
            "type": "Node",
            "abstractKey": "__isNode"
          }
        ],
        "storageKey": "vehicleRentalsByBbox(maximumLatitude:61.0374,maximumLongitude:25.7972,minimumLatitude:60.9208,minimumLongitude:25.5428)"
      }
    ]
  },
  "params": {
    "cacheID": "d253432e12d34dfa2f8a7e1578948a45",
    "id": null,
    "metadata": {},
    "name": "QueryParentQuery",
    "operationKind": "query",
    "text": "query QueryParentQuery(\n  $id: String!\n  $mapDeparturesQty: Int!\n  $departuresQty: Int!\n  $lang: String!\n  $omitCanceled: Boolean!\n  $inPatternDeparturesQty: Int!\n) {\n  stop(id: $id) {\n    name(language: $lang)\n    stoptimesForPatterns(numberOfDepartures: $inPatternDeparturesQty) {\n      ...PysakkiTimesInPatternFragment\n    }\n    alerts {\n      alertSeverityLevel\n      alertHeaderText(language: $lang)\n      alertDescriptionText(language: $lang)\n      id\n    }\n    stoprows: stoptimesWithoutPatterns(numberOfDepartures: $departuresQty, omitCanceled: $omitCanceled) {\n      headsign\n      realtime\n      realtimeArrival\n      scheduledArrival\n      serviceDay\n      realtimeState\n      trip {\n        routeShortName\n        alerts {\n          alertSeverityLevel\n          alertHeaderText(language: $lang)\n          alertDescriptionText(language: $lang)\n          id\n        }\n        id\n      }\n    }\n    maprows: stoptimesWithoutPatterns(numberOfDepartures: $mapDeparturesQty, omitCanceled: $omitCanceled) {\n      headsign\n      trip {\n        route {\n          gtfsId\n          id\n        }\n        directionId\n        geometry\n        routeShortName\n        stops {\n          geometries {\n            geoJson\n          }\n          id\n        }\n        id\n      }\n    }\n    geometries {\n      geoJson\n    }\n    id\n  }\n  vehicleRentalsByBbox(maximumLongitude: 25.7972, minimumLongitude: 25.5428, maximumLatitude: 61.0374, minimumLatitude: 60.9208) {\n    __typename\n    ... on VehicleRentalStation {\n      ...RentalsMarkersRentalsFragment\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment PysakkiTimesInPatternFragment on StoptimesInPattern {\n  stoptimes {\n    serviceDay\n    realtimeArrival\n    headsign\n    trip {\n      routeShortName\n      id\n    }\n  }\n}\n\nfragment RentalsMarkersRentalsFragment on VehicleRentalStation {\n  lat\n  lon\n}\n"
  }
};
})();

(node as any).hash = "2de6533344a8c8d60086ca24acbbda3e";

export default node;
