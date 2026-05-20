/**
 * @generated SignedSource<<7b3f02afd06d63d4e8328328bf1087dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type RealtimeState = "ADDED" | "CANCELED" | "MODIFIED" | "SCHEDULED" | "UPDATED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StoptimeFragment$data = {
  readonly headsign: string | null | undefined;
  readonly realtimeArrival: number | null | undefined;
  readonly realtimeState: RealtimeState | null | undefined;
  readonly scheduledArrival: number | null | undefined;
  readonly trip: {
    readonly routeShortName: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "StoptimeFragment";
};
export type StoptimeFragment$key = {
  readonly " $data"?: StoptimeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StoptimeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StoptimeFragment",
  "selections": [
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
      "kind": "ScalarField",
      "name": "realtimeArrival",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "scheduledArrival",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "realtimeState",
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
  "type": "Stoptime",
  "abstractKey": null
};

(node as any).hash = "37edf4322b289f8d1ce49eb6084ec98f";

export default node;
