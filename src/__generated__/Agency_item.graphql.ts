/**
 * @generated SignedSource<<f6ad63a3c4f52919235cc75e2527c4ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Agency_item$data = {
  readonly gtfsId: string;
  readonly name: string;
  readonly " $fragmentType": "Agency_item";
};
export type Agency_item$key = {
  readonly " $data"?: Agency_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"Agency_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Agency_item",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "gtfsId",
      "storageKey": null
    }
  ],
  "type": "Agency",
  "abstractKey": null
};

(node as any).hash = "15a0243bb0f5e2f845b33a6fbee878c5";

export default node;
