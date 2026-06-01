/**
 * @generated SignedSource<<1b0cdd599f747b8f3b2926423eb2d3a3>>
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
    readonly " $fragmentSpreads": FragmentRefs<"PysakkiTimesInPatternFragment">;
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

const node: ReaderFragment = {
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
    },
    {
      "kind": "RootArgument",
      "name": "inPatternDepartures"
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
      "args": [
        {
          "kind": "Variable",
          "name": "numberOfDepartures",
          "variableName": "inPatternDepartures"
        }
      ],
      "concreteType": "StoptimesInPattern",
      "kind": "LinkedField",
      "name": "stoptimesForPatterns",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PysakkiTimesInPatternFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
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

(node as any).hash = "46aad67367d86babbef4715d06449679";

export default node;
