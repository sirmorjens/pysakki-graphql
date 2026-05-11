/**
 * @generated SignedSource<<304c4b5b4e3ab91b4904037cc2c5526e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StoptimeFragment$data = {
  readonly realtimeArrival: number | null | undefined;
  readonly scheduledArrival: number | null | undefined;
  readonly " $fragmentType": "StoptimeFragment";
};
export type StoptimeFragment$key = {
  readonly " $data"?: StoptimeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StoptimeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StoptimeFragment",
  "selections": [
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
    }
  ],
  "type": "Stoptime",
  "abstractKey": null
};

(node as any).hash = "00413a317d7f4876d5e3d33068735726";

export default node;
