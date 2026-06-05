/**
 * @generated SignedSource<<b93624219099bc38b3e05603ff10e88b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RealtimeState = "ADDED" | "CANCELED" | "MODIFIED" | "SCHEDULED" | "UPDATED" | "%future added value";
export type TimetableQuery$variables = {
  alkuaika: any;
  cancel: boolean;
  departures: number;
  id: string;
  inPatternDepartures: number;
  kieli: string;
};
export type TimetableQuery$data = {
  readonly stop: {
    readonly alerts: ReadonlyArray<{
      readonly alertDescriptionText: string;
    } | null | undefined> | null | undefined;
    readonly gtfsId: string;
    readonly name: string;
    readonly patterns: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"PatternFragment">;
    } | null | undefined> | null | undefined;
    readonly stoptimesForPatterns: ReadonlyArray<{
      readonly stoptimes: ReadonlyArray<{
        readonly headsign: string | null | undefined;
        readonly realtimeArrival: number | null | undefined;
        readonly serviceDay: any | null | undefined;
        readonly trip: {
          readonly routeShortName: string | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined> | null | undefined;
    readonly stoptimesWithoutPatterns: ReadonlyArray<{
      readonly headsign: string | null | undefined;
      readonly realtimeArrival: number | null | undefined;
      readonly realtimeState: RealtimeState | null | undefined;
      readonly scheduledArrival: number | null | undefined;
      readonly trip: {
        readonly routeShortName: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type TimetableQuery = {
  response: TimetableQuery$data;
  variables: TimetableQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "alkuaika"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cancel"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "departures"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "inPatternDepartures"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "kieli"
},
v6 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gtfsId",
  "storageKey": null
},
v9 = [
  {
    "kind": "Variable",
    "name": "numberOfDepartures",
    "variableName": "inPatternDepartures"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "serviceDay",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtimeArrival",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headsign",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "routeShortName",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Trip",
  "kind": "LinkedField",
  "name": "trip",
  "plural": false,
  "selections": [
    (v13/*: any*/)
  ],
  "storageKey": null
},
v15 = [
  {
    "kind": "Variable",
    "name": "numberOfDepartures",
    "variableName": "departures"
  },
  {
    "kind": "Variable",
    "name": "omitCanceled",
    "variableName": "cancel"
  },
  {
    "kind": "Variable",
    "name": "startTime",
    "variableName": "alkuaika"
  }
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "scheduledArrival",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtimeState",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "language",
      "variableName": "kieli"
    }
  ],
  "kind": "ScalarField",
  "name": "alertDescriptionText",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "Trip",
  "kind": "LinkedField",
  "name": "trip",
  "plural": false,
  "selections": [
    (v13/*: any*/),
    (v19/*: any*/)
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
    "name": "TimetableQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v7/*: any*/),
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
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v14/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v15/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v12/*: any*/),
              (v11/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v14/*: any*/)
            ],
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PatternFragment"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Alert",
            "kind": "LinkedField",
            "name": "alerts",
            "plural": true,
            "selections": [
              (v18/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "QueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/),
      (v5/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "TimetableQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v7/*: any*/),
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
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v20/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v15/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v12/*: any*/),
              (v11/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v20/*: any*/)
            ],
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
              (v7/*: any*/),
              (v12/*: any*/),
              (v19/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Alert",
            "kind": "LinkedField",
            "name": "alerts",
            "plural": true,
            "selections": [
              (v18/*: any*/),
              (v19/*: any*/)
            ],
            "storageKey": null
          },
          (v19/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "440a7ff5e5fe9cf1a301a61289b610ac",
    "id": null,
    "metadata": {},
    "name": "TimetableQuery",
    "operationKind": "query",
    "text": "query TimetableQuery(\n  $id: String!\n  $inPatternDepartures: Int!\n  $departures: Int!\n  $kieli: String!\n  $cancel: Boolean!\n  $alkuaika: Long!\n) {\n  stop(id: $id) {\n    name\n    gtfsId\n    stoptimesForPatterns(numberOfDepartures: $inPatternDepartures) {\n      stoptimes {\n        serviceDay\n        realtimeArrival\n        headsign\n        trip {\n          routeShortName\n          id\n        }\n      }\n    }\n    stoptimesWithoutPatterns(numberOfDepartures: $departures, omitCanceled: $cancel, startTime: $alkuaika) {\n      headsign\n      realtimeArrival\n      scheduledArrival\n      realtimeState\n      trip {\n        routeShortName\n        id\n      }\n    }\n    patterns {\n      ...PatternFragment\n      id\n    }\n    alerts {\n      alertDescriptionText(language: $kieli)\n      id\n    }\n    id\n  }\n}\n\nfragment PatternFragment on Pattern {\n  name\n  headsign\n}\n"
  }
};
})();

(node as any).hash = "aef7d5c18b222a38fb8f0fe6d499e351";

export default node;
