/**
 * @generated SignedSource<<dc9ff8a738dbe31637f68e195f7d1c8c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Map10NextEndpointsFragment$data = {
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
  readonly " $fragmentType": "Map10NextEndpointsFragment";
};
export type Map10NextEndpointsFragment$key = {
  readonly " $data"?: Map10NextEndpointsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"Map10NextEndpointsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Map10NextEndpointsFragment",
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

(node as any).hash = "48a572340065c096f87635915dc563cf";

export default node;
