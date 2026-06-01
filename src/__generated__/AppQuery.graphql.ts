/**
 * @generated SignedSource<<cba610d48a171a4c3605c3dc209d1161>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AppQuery$variables = Record<PropertyKey, never>;
export type AppQuery$data = {
  readonly stop: {
    readonly " $fragmentSpreads": FragmentRefs<"PysakkiFragment" | "PysakkiMapFragment">;
  } | null | undefined;
  readonly vehicleRentalsByBbox: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"PysakkiMapRentalsFragment">;
  }>;
};
export type AppQuery = {
  response: AppQuery$data;
  variables: AppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "Lahti:104167"
  }
],
v1 = [
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headsign",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtime",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtimeArrival",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "scheduledArrival",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "serviceDay",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "routeShortName",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Alert",
  "kind": "LinkedField",
  "name": "alerts",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "alertCause",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "language",
          "value": "fi"
        }
      ],
      "kind": "ScalarField",
      "name": "alertDescriptionText",
      "storageKey": "alertDescriptionText(language:\"fi\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "alertEffect",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "alertSeverityLevel",
      "storageKey": null
    },
    (v4/*: any*/)
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "directionId",
  "storageKey": null
},
v13 = {
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
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lat",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lon",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PysakkiFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PysakkiMapFragment"
          }
        ],
        "storageKey": "stop(id:\"Lahti:104167\")"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                "name": "PysakkiMapRentalsFragment"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "StoptimesInPattern",
            "kind": "LinkedField",
            "name": "stoptimesForPatterns",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Pattern",
                "kind": "LinkedField",
                "name": "pattern",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Stoptime",
                "kind": "LinkedField",
                "name": "stoptimes",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Trip",
                    "kind": "LinkedField",
                    "name": "trip",
                    "plural": false,
                    "selections": [
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "numberOfDepartures",
                "value": 12
              }
            ],
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v4/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "stoptimesWithoutPatterns(numberOfDepartures:12)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Pattern",
            "kind": "LinkedField",
            "name": "patterns",
            "plural": true,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          (v11/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Route",
            "kind": "LinkedField",
            "name": "routes",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Stop",
                "kind": "LinkedField",
                "name": "stops",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v13/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shortName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "gtfsId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Pattern",
                "kind": "LinkedField",
                "name": "patterns",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v12/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Stop",
                    "kind": "LinkedField",
                    "name": "stops",
                    "plural": true,
                    "selections": [
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Geometry",
                    "kind": "LinkedField",
                    "name": "patternGeometry",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "points",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "stop(id:\"Lahti:104167\")"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/)
            ],
            "type": "VehicleRentalStation",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/)
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
    "cacheID": "02377e1402e0fbb58fa7da93ed84c712",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  stop(id: \"Lahti:104167\") {\n    ...PysakkiFragment\n    ...PysakkiMapFragment\n    id\n  }\n  vehicleRentalsByBbox(maximumLongitude: 25.7972, minimumLongitude: 25.5428, maximumLatitude: 61.0374, minimumLatitude: 60.9208) {\n    __typename\n    ... on VehicleRentalStation {\n      ...PysakkiMapRentalsFragment\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment AlertsFragment on Alert {\n  alertCause\n  alertDescriptionText(language: \"fi\")\n  alertEffect\n  alertSeverityLevel\n}\n\nfragment PatternFragment on Pattern {\n  name\n  headsign\n}\n\nfragment PysakkiFirstStoptimeFragment on Stoptime {\n  headsign\n  realtimeArrival\n  scheduledArrival\n  serviceDay\n  trip {\n    routeShortName\n    directionId\n    alerts {\n      ...AlertsFragment\n      id\n    }\n    id\n  }\n}\n\nfragment PysakkiFragment on Stop {\n  stoptimesForPatterns {\n    ...StoptimesInPatternFragment\n  }\n  stoptimesWithoutPatterns(numberOfDepartures: 12) {\n    ...StoptimeFragment\n    ...PysakkiFirstStoptimeFragment\n  }\n  patterns {\n    ...PatternFragment\n    id\n  }\n  alerts {\n    ...AlertsFragment\n    id\n  }\n}\n\nfragment PysakkiMapFragment on Stop {\n  geometries {\n    geoJson\n  }\n  routes {\n    stops {\n      name\n      geometries {\n        geoJson\n      }\n      id\n    }\n    shortName\n    gtfsId\n    patterns {\n      name\n      directionId\n      stops {\n        lat\n        lon\n        id\n      }\n      patternGeometry {\n        points\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment PysakkiMapRentalsFragment on VehicleRentalStation {\n  name\n  lat\n  lon\n}\n\nfragment StoptimeFragment on Stoptime {\n  headsign\n  realtime\n  realtimeArrival\n  scheduledArrival\n  serviceDay\n  trip {\n    routeShortName\n    alerts {\n      ...AlertsFragment\n      id\n    }\n    id\n  }\n}\n\nfragment StoptimesInPatternFragment on StoptimesInPattern {\n  pattern {\n    ...PatternFragment\n    id\n  }\n  stoptimes {\n    ...StoptimeFragment\n  }\n}\n"
  }
};
})();

(node as any).hash = "95eb9162418774aef326da5ad6025073";

export default node;
