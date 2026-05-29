/**
 * @generated SignedSource<<c50e006e959f0501ca881c2c6dfe7460>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StoptimeTimesInPatternFragment$data = {
  readonly stoptimes: ReadonlyArray<{
    readonly headsign: string | null | undefined;
    readonly realtimeArrival: number | null | undefined;
    readonly serviceDay: any | null | undefined;
    readonly trip: {
      readonly routeShortName: string | null | undefined;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "StoptimeTimesInPatternFragment";
};
export type StoptimeTimesInPatternFragment$key = {
  readonly " $data"?: StoptimeTimesInPatternFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StoptimeTimesInPatternFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StoptimeTimesInPatternFragment",
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

(node as any).hash = "b3ecf3ab03a60afc7688cd35767c6602";

export default node;
