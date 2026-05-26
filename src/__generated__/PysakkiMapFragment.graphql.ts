/**
 * @generated SignedSource<<4477936cf5e49d58eebff8c9ed096185>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PysakkiMapFragment$data = {
  readonly geometries: {
    readonly geoJson: any | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "PysakkiMapFragment";
};
export type PysakkiMapFragment$key = {
  readonly " $data"?: PysakkiMapFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PysakkiMapFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PysakkiMapFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "StopGeometries",
      "kind": "LinkedField",
      "name": "geometries",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "geoJson",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Stop",
  "abstractKey": null
};

(node as any).hash = "b0f03a6e3ea844e2912f9152eca85af7";

export default node;
