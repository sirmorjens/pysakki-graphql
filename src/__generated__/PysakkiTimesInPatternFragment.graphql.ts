/**
 * @generated SignedSource<<befa60e47e541debb482c527fac45bc7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PysakkiTimesInPatternFragment$data = {
  readonly stoptimes: ReadonlyArray<{
    readonly headsign: string | null | undefined;
    readonly realtimeArrival: number | null | undefined;
    readonly serviceDay: any | null | undefined;
    readonly trip: {
      readonly routeShortName: string | null | undefined;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "PysakkiTimesInPatternFragment";
};
export type PysakkiTimesInPatternFragment$key = {
  readonly " $data"?: PysakkiTimesInPatternFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PysakkiTimesInPatternFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PysakkiTimesInPatternFragment",
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

(node as any).hash = "e329574aefd046931960504483faafdd";

export default node;
