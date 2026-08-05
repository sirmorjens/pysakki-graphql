/**
 * @generated SignedSource<<0d7bcf587f078feee0aa00e149d37195>>
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
export type AppQuery$variables = {
  departuresQty: number;
  id: string;
  inPatternDeparturesQty: number;
  lang: string;
  omitCanceled: boolean;
};
export type AppQuery$data = {
  readonly stop: {
    readonly alerts: ReadonlyArray<{
      readonly alertDescriptionText: string;
      readonly alertHeaderText: string | null | undefined;
      readonly alertSeverityLevel: AlertSeverityLevelType | null | undefined;
    } | null | undefined> | null | undefined;
    readonly geometries: {
      readonly geoJson: any | null | undefined;
    } | null | undefined;
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
export type AppQuery = {
  response: AppQuery$data;
  variables: AppQuery$variables;
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
  "name": "omitCanceled"
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v6 = [
  {
    "kind": "Variable",
    "name": "language",
    "variableName": "lang"
  }
],
v7 = {
  "alias": null,
  "args": (v6/*: any*/),
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = [
  {
    "kind": "Variable",
    "name": "numberOfDepartures",
    "variableName": "inPatternDeparturesQty"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alertSeverityLevel",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": (v6/*: any*/),
  "kind": "ScalarField",
  "name": "alertHeaderText",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": (v6/*: any*/),
  "kind": "ScalarField",
  "name": "alertDescriptionText",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "Alert",
  "kind": "LinkedField",
  "name": "alerts",
  "plural": true,
  "selections": [
    (v9/*: any*/),
    (v10/*: any*/),
    (v11/*: any*/)
  ],
  "storageKey": null
},
v13 = [
  {
    "kind": "Variable",
    "name": "numberOfDepartures",
    "variableName": "departuresQty"
  },
  {
    "kind": "Variable",
    "name": "omitCanceled",
    "variableName": "omitCanceled"
  }
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headsign",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtime",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtimeArrival",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "scheduledArrival",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "serviceDay",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtimeState",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "routeShortName",
  "storageKey": null
},
v21 = {
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
v22 = [
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
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "Alert",
  "kind": "LinkedField",
  "name": "alerts",
  "plural": true,
  "selections": [
    (v9/*: any*/),
    (v10/*: any*/),
    (v11/*: any*/),
    (v23/*: any*/)
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
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": (v8/*: any*/),
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
          (v12/*: any*/),
          {
            "alias": "stoprows",
            "args": (v13/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  (v20/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v21/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v22/*: any*/),
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
      (v0/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": (v8/*: any*/),
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
                  (v18/*: any*/),
                  (v16/*: any*/),
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Trip",
                    "kind": "LinkedField",
                    "name": "trip",
                    "plural": false,
                    "selections": [
                      (v20/*: any*/),
                      (v23/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v24/*: any*/),
          {
            "alias": "stoprows",
            "args": (v13/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  (v20/*: any*/),
                  (v24/*: any*/),
                  (v23/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v21/*: any*/),
          (v23/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v22/*: any*/),
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
              (v23/*: any*/)
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
    "cacheID": "26b696b0699ae57ef12466331b00e1b3",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery(\n  $id: String!\n  $departuresQty: Int!\n  $lang: String!\n  $omitCanceled: Boolean!\n  $inPatternDeparturesQty: Int!\n) {\n  stop(id: $id) {\n    name(language: $lang)\n    stoptimesForPatterns(numberOfDepartures: $inPatternDeparturesQty) {\n      ...PysakkiTimesInPatternFragment\n    }\n    alerts {\n      alertSeverityLevel\n      alertHeaderText(language: $lang)\n      alertDescriptionText(language: $lang)\n      id\n    }\n    stoprows: stoptimesWithoutPatterns(numberOfDepartures: $departuresQty, omitCanceled: $omitCanceled) {\n      headsign\n      realtime\n      realtimeArrival\n      scheduledArrival\n      serviceDay\n      realtimeState\n      trip {\n        routeShortName\n        alerts {\n          alertSeverityLevel\n          alertHeaderText(language: $lang)\n          alertDescriptionText(language: $lang)\n          id\n        }\n        id\n      }\n    }\n    geometries {\n      geoJson\n    }\n    id\n  }\n  vehicleRentalsByBbox(maximumLongitude: 25.7972, minimumLongitude: 25.5428, maximumLatitude: 61.0374, minimumLatitude: 60.9208) {\n    __typename\n    ... on VehicleRentalStation {\n      ...RentalsMarkersRentalsFragment\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment PysakkiTimesInPatternFragment on StoptimesInPattern {\n  stoptimes {\n    serviceDay\n    realtimeArrival\n    headsign\n    trip {\n      routeShortName\n      id\n    }\n  }\n}\n\nfragment RentalsMarkersRentalsFragment on VehicleRentalStation {\n  lat\n  lon\n}\n"
  }
};
})();

(node as any).hash = "7d73cd8a976796146f7f0cccd8caf717";

export default node;
