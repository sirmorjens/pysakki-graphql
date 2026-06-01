/**
 * @generated SignedSource<<c53a15ca3f22fe186dbccfe7ab8fc493>>
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
      readonly directionId: number | null | undefined;
      readonly name: string | null | undefined;
      readonly patternGeometry: {
        readonly points: any | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly shortName: string | null | undefined;
    readonly stops: ReadonlyArray<{
      readonly geometries: {
        readonly geoJson: any | null | undefined;
      } | null | undefined;
      readonly name: string;
    } | null | undefined> | null | undefined;
  }> | null | undefined;
  readonly " $fragmentType": "PysakkiMapFragment";
};
export type PysakkiMapFragment$key = {
  readonly " $data"?: PysakkiMapFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PysakkiMapFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PysakkiMapFragment",
  "selections": [
    (v0/*: any*/),
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
          "concreteType": "Stop",
          "kind": "LinkedField",
          "name": "stops",
          "plural": true,
          "selections": [
            (v1/*: any*/),
            (v0/*: any*/)
          ],
          "storageKey": null
        },
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
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "directionId",
              "storageKey": null
            },
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
})();

(node as any).hash = "9b5d7661669ab6460f483b2e801788f9";

export default node;
