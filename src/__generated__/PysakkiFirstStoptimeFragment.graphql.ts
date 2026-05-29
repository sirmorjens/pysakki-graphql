/**
 * @generated SignedSource<<2df264569eaad50553a1484265dc5bc5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PysakkiFirstStoptimeFragment$data = {
  readonly headsign: string | null | undefined;
  readonly realtimeArrival: number | null | undefined;
  readonly scheduledArrival: number | null | undefined;
  readonly serviceDay: any | null | undefined;
  readonly trip: {
    readonly alerts: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"AlertsFragment">;
    } | null | undefined> | null | undefined;
    readonly routeShortName: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "PysakkiFirstStoptimeFragment";
};
export type PysakkiFirstStoptimeFragment$key = {
  readonly " $data"?: PysakkiFirstStoptimeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PysakkiFirstStoptimeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PysakkiFirstStoptimeFragment",
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
      "name": "serviceDay",
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

(node as any).hash = "1effd284c4baf4a534316fa99a674936";

export default node;
