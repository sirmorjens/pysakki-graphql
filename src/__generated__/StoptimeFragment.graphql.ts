/**
 * @generated SignedSource<<9311b648d76a99d38695139543582eec>>
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
  readonly realtime: boolean | null | undefined;
  readonly realtimeArrival: number | null | undefined;
  readonly realtimeState: RealtimeState | null | undefined;
  readonly scheduledArrival: number | null | undefined;
  readonly serviceDay: any | null | undefined;
  readonly trip: {
    readonly alerts: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"AlertsFragment">;
    } | null | undefined> | null | undefined;
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
      "name": "realtime",
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
      "name": "serviceDay",
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Alert",
          "kind": "LinkedField",
          "name": "alerts",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "AlertsFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Stoptime",
  "abstractKey": null
};

(node as any).hash = "ca1a4a15c0cd5ea1ede185256a998e95";

export default node;
