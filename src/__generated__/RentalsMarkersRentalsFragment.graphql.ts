/**
 * @generated SignedSource<<b2c95285bc8d3caeaf43bcb9f498ef6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RentalsMarkersRentalsFragment$data = ReadonlyArray<{
  readonly lat: number | null | undefined;
  readonly lon: number | null | undefined;
  readonly " $fragmentType": "RentalsMarkersRentalsFragment";
}>;
export type RentalsMarkersRentalsFragment$key = ReadonlyArray<{
  readonly " $data"?: RentalsMarkersRentalsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RentalsMarkersRentalsFragment">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "RentalsMarkersRentalsFragment",
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

(node as any).hash = "54bee53b1033781d75de9e7a770bfc63";

export default node;
