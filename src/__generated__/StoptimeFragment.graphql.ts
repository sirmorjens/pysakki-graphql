/**
 * @generated SignedSource<<ba48224d50d00911a72df3aa57ced801>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StoptimeFragment$data = {
  readonly headsign: string | null | undefined;
  readonly realtimeArrival: number | null | undefined;
  readonly scheduledArrival: number | null | undefined;
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

(node as any).hash = "132094c406dd9de455d64451bb75a58d";

export default node;
