/**
 * @generated SignedSource<<13ff63bef71f268f89dcdd26af9c6c4a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PysakkiFragment$data = {
  readonly alerts: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"AlertsFragment">;
  } | null | undefined> | null | undefined;
  readonly patterns: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"PatternFragment">;
  } | null | undefined> | null | undefined;
  readonly stoptimesForPatterns: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"StoptimesInPatternFragment">;
  } | null | undefined> | null | undefined;
  readonly stoptimesWithoutPatterns: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"PysakkiFirstStoptimeFragment" | "StoptimeFragment">;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "PysakkiFragment";
};
export type PysakkiFragment$key = {
  readonly " $data"?: PysakkiFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PysakkiFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PysakkiFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "StoptimesInPattern",
      "kind": "LinkedField",
      "name": "stoptimesForPatterns",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StoptimesInPatternFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "numberOfDepartures",
          "value": 12
        }
      ],
      "concreteType": "Stoptime",
      "kind": "LinkedField",
      "name": "stoptimesWithoutPatterns",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StoptimeFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PysakkiFirstStoptimeFragment"
        }
      ],
      "storageKey": "stoptimesWithoutPatterns(numberOfDepartures:12)"
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "PatternFragment"
        }
      ],
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
  "type": "Stop",
  "abstractKey": null
};

(node as any).hash = "50418c79bb1dd30962f132c4d87f6baf";

export default node;
