/**
 * @generated SignedSource<<5255ed2df425edf751533b294f31e53a>>
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
    readonly " $fragmentSpreads": FragmentRefs<"StoptimeFragment">;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "PysakkiFragment";
};
export type PysakkiFragment$key = {
  readonly " $data"?: PysakkiFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PysakkiFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "numberOfDepartures",
    "variableName": "departures"
  },
  {
    "kind": "Variable",
    "name": "omitCanceled",
    "variableName": "cancel"
  },
  {
    "kind": "Variable",
    "name": "startTime",
    "variableName": "alkuaika"
  }
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "alkuaika"
    },
    {
      "kind": "RootArgument",
      "name": "cancel"
    },
    {
      "kind": "RootArgument",
      "name": "departures"
    }
  ],
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
      "args": (v0/*: any*/),
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
      "args": (v0/*: any*/),
      "concreteType": "Stoptime",
      "kind": "LinkedField",
      "name": "stoptimesWithoutPatterns",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StoptimeFragment"
        }
      ],
      "storageKey": null
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
})();

(node as any).hash = "c20ce6717c55b04b86677a4cd9024b04";

export default node;
