/**
 * @generated SignedSource<<6f65c36082cde6e54658dfd0a761aa09>>
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

(node as any).hash = "f5d75672ed0e37cebe16fee0851e3b40";

export default node;
