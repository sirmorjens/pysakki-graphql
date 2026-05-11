/**
 * @generated SignedSource<<6a8750d6ae6eface860aa04dbfabd7e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PatternFragment$data = {
  readonly headsign: string | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "PatternFragment";
};
export type PatternFragment$key = {
  readonly " $data"?: PatternFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PatternFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PatternFragment",
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
      "name": "headsign",
      "storageKey": null
    }
  ],
  "type": "Pattern",
  "abstractKey": null
};

(node as any).hash = "5cd81238edf05384b28e556e78e62633";

export default node;
