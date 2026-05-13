/**
 * @generated SignedSource<<9a60dbb503088caa39dfaaf111b3b7cf>>
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
    readonly " $fragmentSpreads": FragmentRefs<"PysakkiFragment">;
  } | null | undefined;
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
    "value": "Lahti:104030"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headsign",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = [
  (v2/*: any*/),
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
      (v3/*: any*/)
    ],
    "storageKey": null
  }
];
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
          }
        ],
        "storageKey": "stop(id:\"Lahti:104030\")"
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
          (v1/*: any*/),
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
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Stoptime",
                "kind": "LinkedField",
                "name": "stoptimes",
                "plural": true,
                "selections": (v5/*: any*/),
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
                "value": 15
              }
            ],
            "concreteType": "Stoptime",
            "kind": "LinkedField",
            "name": "stoptimesWithoutPatterns",
            "plural": true,
            "selections": (v5/*: any*/),
            "storageKey": "stoptimesWithoutPatterns(numberOfDepartures:15)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Pattern",
            "kind": "LinkedField",
            "name": "patterns",
            "plural": true,
            "selections": (v4/*: any*/),
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
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "stop(id:\"Lahti:104030\")"
      }
    ]
  },
  "params": {
    "cacheID": "2197813e7297381a15d29d4c6f8446bd",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  stop(id: \"Lahti:104030\") {\n    ...PysakkiFragment\n    id\n  }\n}\n\nfragment AlertsFragment on Alert {\n  alertCause\n  alertDescriptionText(language: \"fi\")\n  alertEffect\n  alertSeverityLevel\n}\n\nfragment PatternFragment on Pattern {\n  name\n  headsign\n}\n\nfragment PysakkiFragment on Stop {\n  name\n  gtfsId\n  stoptimesForPatterns {\n    ...StoptimesInPatternFragment\n  }\n  stoptimesWithoutPatterns(numberOfDepartures: 15) {\n    ...StoptimeFragment\n  }\n  patterns {\n    ...PatternFragment\n    id\n  }\n  alerts {\n    ...AlertsFragment\n    id\n  }\n}\n\nfragment StoptimeFragment on Stoptime {\n  headsign\n  realtimeArrival\n  scheduledArrival\n  trip {\n    routeShortName\n    id\n  }\n}\n\nfragment StoptimesInPatternFragment on StoptimesInPattern {\n  pattern {\n    ...PatternFragment\n    id\n  }\n  stoptimes {\n    ...StoptimeFragment\n  }\n}\n"
  }
};
})();

(node as any).hash = "65ba7fe1bbd98f1b6aed4e6afa2a5d07";

export default node;
