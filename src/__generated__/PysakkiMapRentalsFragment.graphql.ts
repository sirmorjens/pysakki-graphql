/**
 * @generated SignedSource<<ac4e1186abd1165ad7a49d3a0bd674b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PysakkiMapRentalsFragment$data = ReadonlyArray<{
  readonly lat: number | null | undefined;
  readonly lon: number | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "PysakkiMapRentalsFragment";
}>;
export type PysakkiMapRentalsFragment$key = ReadonlyArray<{
  readonly " $data"?: PysakkiMapRentalsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PysakkiMapRentalsFragment">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PysakkiMapRentalsFragment",
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
      "name": "lat",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lon",
      "storageKey": null
    }
  ],
  "type": "VehicleRentalStation",
  "abstractKey": null
};

(node as any).hash = "0be3bcaed6f8a7fe7ba34f9e9463c725";

export default node;
