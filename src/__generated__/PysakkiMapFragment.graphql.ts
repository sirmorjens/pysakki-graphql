/**
 * @generated SignedSource<<9a8aea41a5fcc9e9314ac58d90f32f52>>
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

  readonly routes: ReadonlyArray<{
    readonly gtfsId: string;
    readonly patterns: ReadonlyArray<{
      readonly patternGeometry: {
        readonly points: any | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly shortName: string | null | undefined;
  }> | null | undefined;

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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Route",
      "kind": "LinkedField",
      "name": "routes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "shortName",
          "storageKey": null
        },
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
          "concreteType": "Pattern",
          "kind": "LinkedField",
          "name": "patterns",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Geometry",
              "kind": "LinkedField",
              "name": "patternGeometry",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "points",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null

    }
  ],
  "type": "Stop",
  "abstractKey": null
};

(node as any).hash = "8fe7efa77dbc37872f2baec108cabd3a";

export default node;
