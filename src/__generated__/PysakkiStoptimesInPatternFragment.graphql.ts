/**
 * @generated SignedSource<<7050fc609aa6db7bf8d61d57e3d4a9c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PysakkiStoptimesInPatternFragment$data = {
  readonly stoptimes: ReadonlyArray<{
    readonly headsign: string | null | undefined;
    readonly realtimeArrival: number | null | undefined;
    readonly serviceDay: any | null | undefined;
    readonly trip: {
      readonly routeShortName: string | null | undefined;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "PysakkiStoptimesInPatternFragment";
};
export type PysakkiStoptimesInPatternFragment$key = {
  readonly " $data"?: PysakkiStoptimesInPatternFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PysakkiStoptimesInPatternFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PysakkiStoptimesInPatternFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Stoptime",
      "kind": "LinkedField",
      "name": "stoptimes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "serviceDay",
          "storageKey": null
        },
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
          "name": "headsign",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Trip",
          "kind": "LinkedField",
          "name": "trip",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "routeShortName",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "StoptimesInPattern",
  "abstractKey": null
};

(node as any).hash = "54c7211d71f545d0b835c7d96fb61bf9";

export default node;
