/**
 * @generated SignedSource<<13dc5a33b7db59d1d9646cda2f506941>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LRHeaderQuery$variables = Record<PropertyKey, never>;
export type LRHeaderQuery$data = {
  readonly stop: {
    readonly name: string;
  } | null | undefined;
};
export type LRHeaderQuery = {
  response: LRHeaderQuery$data;
  variables: LRHeaderQuery$variables;
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
  "args": [
    {
      "kind": "Literal",
      "name": "language",
      "value": "fi"
    }
  ],
  "kind": "ScalarField",
  "name": "name",
  "storageKey": "name(language:\"fi\")"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LRHeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v1/*: any*/)
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
    "name": "LRHeaderQuery",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "stop(id:\"Lahti:104030\")"
      }
    ]
  },
  "params": {
    "cacheID": "ebfd015c1202cf808ac94125ef389293",
    "id": null,
    "metadata": {},
    "name": "LRHeaderQuery",
    "operationKind": "query",
    "text": "query LRHeaderQuery {\n  stop(id: \"Lahti:104030\") {\n    name(language: \"fi\")\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "098f50a3acc665eb006d65b49e835190";

export default node;
