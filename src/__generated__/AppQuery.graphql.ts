/**
 * @generated SignedSource<<4bf5245ed149f8f9efa46e1b3385a79c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AppQuery$variables = {
  alkuaika: any;
  cancel: boolean;
  departures: number;
  id: string;
  kieli: string;
};
export type AppQuery$data = {
  readonly stop: {
    readonly " $fragmentSpreads": FragmentRefs<"PysakkiFragment">;
  } | null | undefined;
};
export type AppQuery = {
  response: AppQuery$data;
  variables: AppQuery$variables;
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
  "name": "kieli"
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headsign",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = [
  (v6/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/)
],
v11 = [
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "realtimeArrival",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "scheduledArrival",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "realtimeState",
    "storageKey": null
  },
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
        "kind": "ScalarField",
        "name": "routeShortName",
        "storageKey": null
      },
      (v9/*: any*/)
    ],
    "storageKey": null
  }
];
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PysakkiFragment"
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
      (v2/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
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
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "gtfsId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
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
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Stoptime",
                "kind": "LinkedField",
                "name": "stoptimes",
                "plural": true,
                "selections": (v11/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": (v11/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Pattern",
            "kind": "LinkedField",
            "name": "patterns",
            "plural": true,
            "selections": (v10/*: any*/),
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
                    "kind": "Variable",
                    "name": "language",
                    "variableName": "kieli"
                  }
                ],
                "kind": "ScalarField",
                "name": "alertDescriptionText",
                "storageKey": null
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
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dafd07baea85f207a0a7ece3095fc0ee",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery(\n  $id: String!\n  $departures: Int!\n  $kieli: String!\n  $cancel: Boolean!\n  $alkuaika: Long!\n) {\n  stop(id: $id) {\n    ...PysakkiFragment\n    id\n  }\n}\n\nfragment AlertsFragment on Alert {\n  alertCause\n  alertDescriptionText(language: $kieli)\n  alertEffect\n  alertSeverityLevel\n}\n\nfragment PatternFragment on Pattern {\n  name\n  headsign\n}\n\nfragment PysakkiFragment on Stop {\n  name\n  gtfsId\n  stoptimesForPatterns(numberOfDepartures: $departures, omitCanceled: $cancel, startTime: $alkuaika) {\n    ...StoptimesInPatternFragment\n  }\n  stoptimesWithoutPatterns(numberOfDepartures: $departures, omitCanceled: $cancel, startTime: $alkuaika) {\n    ...StoptimeFragment\n  }\n  patterns {\n    ...PatternFragment\n    id\n  }\n  alerts {\n    ...AlertsFragment\n    id\n  }\n}\n\nfragment StoptimeFragment on Stoptime {\n  headsign\n  realtimeArrival\n  scheduledArrival\n  realtimeState\n  trip {\n    routeShortName\n    id\n  }\n}\n\nfragment StoptimesInPatternFragment on StoptimesInPattern {\n  pattern {\n    ...PatternFragment\n    id\n  }\n  stoptimes {\n    ...StoptimeFragment\n  }\n}\n"
  }
};
})();

(node as any).hash = "58c4ed1950c9691550df0356ddffac89";

export default node;
