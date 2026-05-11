/**
 * @generated SignedSource<<84c537afba7843c83ca079782e887ac5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StoptimesInPatternFragment$data = {
  readonly pattern: {
    readonly " $fragmentSpreads": FragmentRefs<"PatternFragment">;
  } | null | undefined;
  readonly stoptimes: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"StoptimeFragment">;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "StoptimesInPatternFragment";
};
export type StoptimesInPatternFragment$key = {
  readonly " $data"?: StoptimesInPatternFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StoptimesInPatternFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StoptimesInPatternFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Pattern",
      "kind": "LinkedField",
      "name": "pattern",
      "plural": false,
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
      "concreteType": "Stoptime",
      "kind": "LinkedField",
      "name": "stoptimes",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StoptimeFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "StoptimesInPattern",
  "abstractKey": null
};

(node as any).hash = "92f28f801e48862cec10dfb8d8ae1aca";

export default node;
