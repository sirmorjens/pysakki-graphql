/**
 * @generated SignedSource<<da0d3c3e2ba48ce7d70e853fa847482f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LRHeaderQuery$variables = {
  id: string;
};
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LRHeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "QueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LRHeaderQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Stop",
        "kind": "LinkedField",
        "name": "stop",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dae9cb592f8eb520268bf7b989a99fcf",
    "id": null,
    "metadata": {},
    "name": "LRHeaderQuery",
    "operationKind": "query",
    "text": "query LRHeaderQuery(\n  $id: String!\n) {\n  stop(id: $id) {\n    name(language: \"fi\")\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a95955034ca15f791d811f46e41ca169";

export default node;
