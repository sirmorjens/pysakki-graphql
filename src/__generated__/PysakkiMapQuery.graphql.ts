/**
 * @generated SignedSource<<a2d849311f1a24591208529ad380a658>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PysakkiMapQuery$variables = {
  departuresQty: number;
  id: string;
  omitCanceled: boolean;
};
export type PysakkiMapQuery$data = {
  readonly stop: {
    readonly geometries: {
      readonly geoJson: any | null | undefined;
    } | null | undefined;
    readonly routes: ReadonlyArray<{
      readonly gtfsId: string;
      readonly patterns: ReadonlyArray<{
        readonly directionId: number | null | undefined;
        readonly patternGeometry: {
          readonly points: any | null | undefined;
        } | null | undefined;
        readonly stops: ReadonlyArray<{
          readonly lat: number | null | undefined;
          readonly lon: number | null | undefined;
        }> | null | undefined;
      } | null | undefined> | null | undefined;
      readonly shortName: string | null | undefined;
      readonly stops: ReadonlyArray<{
        readonly geometries: {
          readonly geoJson: any | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    }> | null | undefined;
    readonly stoptimesWithoutPatterns: ReadonlyArray<{
      readonly headsign: string | null | undefined;
      readonly trip: {
        readonly directionId: number;
        readonly geometry: ReadonlyArray<ReadonlyArray<number | null | undefined> | null | undefined> | null | undefined;
        readonly routeShortName: string | null | undefined;
        readonly stops: ReadonlyArray<{
          readonly geometries: {
            readonly geoJson: any | null | undefined;
          } | null | undefined;
        }>;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly vehicleRentalsByBbox: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"RentalsMarkersRentalsFragment">;
  }>;
};
export type PysakkiMapQuery = {
  response: PysakkiMapQuery$data;
  variables: PysakkiMapQuery$variables;
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
  "name": "omitCanceled"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v4 = {
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
v5 = [
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headsign",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "directionId",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "geometry",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "routeShortName",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Stop",
  "kind": "LinkedField",
  "name": "stops",
  "plural": true,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shortName",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gtfsId",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lat",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lon",
  "storageKey": null
},
v15 = [
  (v13/*: any*/),
  (v14/*: any*/)
],
v16 = {
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
v17 = [
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
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "Stop",
  "kind": "LinkedField",
  "name": "stops",
  "plural": true,
  "selections": [
    (v4/*: any*/),
    (v18/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PysakkiMapQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Route",
            "kind": "LinkedField",
            "name": "routes",
            "plural": true,
            "selections": [
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Pattern",
                "kind": "LinkedField",
                "name": "patterns",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Stop",
                    "kind": "LinkedField",
                    "name": "stops",
                    "plural": true,
                    "selections": (v15/*: any*/),
                    "storageKey": null
                  },
                  (v16/*: any*/)
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
        "args": (v17/*: any*/),
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
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "PysakkiMapQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v19/*: any*/),
                  (v18/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Route",
            "kind": "LinkedField",
            "name": "routes",
            "plural": true,
            "selections": [
              (v19/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Pattern",
                "kind": "LinkedField",
                "name": "patterns",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Stop",
                    "kind": "LinkedField",
                    "name": "stops",
                    "plural": true,
                    "selections": [
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v18/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  (v18/*: any*/)
                ],
                "storageKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          },
          (v18/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v17/*: any*/),
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
            "selections": (v15/*: any*/),
            "type": "VehicleRentalStation",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v18/*: any*/)
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
    "cacheID": "72dce98db3c66ce3d449f75fd1335f04",
    "id": null,
    "metadata": {},
    "name": "PysakkiMapQuery",
    "operationKind": "query",
    "text": "query PysakkiMapQuery(\n  $id: String!\n  $omitCanceled: Boolean!\n  $departuresQty: Int!\n) {\n  stop(id: $id) {\n    geometries {\n      geoJson\n    }\n    stoptimesWithoutPatterns(numberOfDepartures: $departuresQty, omitCanceled: $omitCanceled) {\n      headsign\n      trip {\n        directionId\n        geometry\n        routeShortName\n        stops {\n          geometries {\n            geoJson\n          }\n          id\n        }\n        id\n      }\n    }\n    routes {\n      stops {\n        geometries {\n          geoJson\n        }\n        id\n      }\n      shortName\n      gtfsId\n      patterns {\n        directionId\n        stops {\n          lat\n          lon\n          id\n        }\n        patternGeometry {\n          points\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n  vehicleRentalsByBbox(maximumLongitude: 25.7972, minimumLongitude: 25.5428, maximumLatitude: 61.0374, minimumLatitude: 60.9208) {\n    __typename\n    ... on VehicleRentalStation {\n      ...RentalsMarkersRentalsFragment\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment RentalsMarkersRentalsFragment on VehicleRentalStation {\n  lat\n  lon\n}\n"
  }
};
})();

(node as any).hash = "1f3c3c8842cf2830ad8cd30f7e09ec23";

export default node;
