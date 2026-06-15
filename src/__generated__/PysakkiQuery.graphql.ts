/**
 * @generated SignedSource<<04f7ab6236ef6a779ed9b3fac2e126d5>>
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
export type PysakkiQuery$variables = {
  departureQty: number;
  id: string;
  inPatternDeparturesQty: number;
  lang: string;
  omitCanceled: boolean;
};
export type PysakkiQuery$data = {
  readonly stop: {
    readonly alerts: ReadonlyArray<{
      readonly alertDescriptionText: string;
      readonly alertHeaderText: string | null | undefined;
      readonly alertSeverityLevel: AlertSeverityLevelType | null | undefined;
    } | null | undefined> | null | undefined;
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
};
export type PysakkiQuery = {
  response: PysakkiQuery$data;
  variables: PysakkiQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "departureQty"
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
    "name": "numberOfDepartures",
    "variableName": "inPatternDeparturesQty"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alertSeverityLevel",
  "storageKey": null
},
v8 = [
  {
    "kind": "Variable",
    "name": "language",
    "variableName": "lang"
  }
],
v9 = {
  "alias": null,
  "args": (v8/*: any*/),
  "kind": "ScalarField",
  "name": "alertHeaderText",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": (v8/*: any*/),
  "kind": "ScalarField",
  "name": "alertDescriptionText",
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
    (v7/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/)
  ],
  "storageKey": null
},
v12 = [
  {
    "kind": "Variable",
    "name": "numberOfDepartures",
    "variableName": "departureQty"
  },
  {
    "kind": "Variable",
    "name": "omitCanceled",
    "variableName": "omitCanceled"
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headsign",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtime",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtimeArrival",
  "storageKey": null
},
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
  "name": "serviceDay",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "realtimeState",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "routeShortName",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "concreteType": "Alert",
  "kind": "LinkedField",
  "name": "alerts",
  "plural": true,
  "selections": [
    (v7/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/),
    (v20/*: any*/)
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
    "name": "PysakkiQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
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
          (v11/*: any*/),
          {
            "alias": "stoprows",
            "args": (v12/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  (v19/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              }
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
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "PysakkiQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
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
                  (v17/*: any*/),
                  (v15/*: any*/),
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Trip",
                    "kind": "LinkedField",
                    "name": "trip",
                    "plural": false,
                    "selections": [
                      (v19/*: any*/),
                      (v20/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v21/*: any*/),
          {
            "alias": "stoprows",
            "args": (v12/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": [
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Trip",
                "kind": "LinkedField",
                "name": "trip",
                "plural": false,
                "selections": [
                  (v19/*: any*/),
                  (v21/*: any*/),
                  (v20/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v20/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "982217bbf036bf4bf811695db9359372",
    "id": null,
    "metadata": {},
    "name": "PysakkiQuery",
    "operationKind": "query",
    "text": "query PysakkiQuery(\n  $id: String!\n  $departureQty: Int!\n  $lang: String!\n  $omitCanceled: Boolean!\n  $inPatternDeparturesQty: Int!\n) {\n  stop(id: $id) {\n    stoptimesForPatterns(numberOfDepartures: $inPatternDeparturesQty) {\n      ...PysakkiTimesInPatternFragment\n    }\n    alerts {\n      alertSeverityLevel\n      alertHeaderText(language: $lang)\n      alertDescriptionText(language: $lang)\n      id\n    }\n    stoprows: stoptimesWithoutPatterns(numberOfDepartures: $departureQty, omitCanceled: $omitCanceled) {\n      headsign\n      realtime\n      realtimeArrival\n      scheduledArrival\n      serviceDay\n      realtimeState\n      trip {\n        routeShortName\n        alerts {\n          alertSeverityLevel\n          alertHeaderText(language: $lang)\n          alertDescriptionText(language: $lang)\n          id\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment PysakkiTimesInPatternFragment on StoptimesInPattern {\n  stoptimes {\n    serviceDay\n    realtimeArrival\n    headsign\n    trip {\n      routeShortName\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f2616f8a026b2aa6a3529b0b1bc7d1fb";

export default node;
