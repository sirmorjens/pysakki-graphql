/**
 * @generated SignedSource<<a6f089b29707e2b7b4c97fdcce269c02>>
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
  readonly gtfsId: string;
  readonly name: string;
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
      "kind": "ScalarField",
      "name": "name",
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
          "value": 15
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
      "storageKey": "stoptimesWithoutPatterns(numberOfDepartures:15)"
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

(node as any).hash = "3b4414f6aaff17e12eab6bdf364c7f7f";

export default node;
