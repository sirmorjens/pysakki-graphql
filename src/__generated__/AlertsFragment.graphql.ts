/**
 * @generated SignedSource<<d2093ab272dfa9080c75e476410da26f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AlertCauseType = "ACCIDENT" | "CONSTRUCTION" | "DEMONSTRATION" | "HOLIDAY" | "MAINTENANCE" | "MEDICAL_EMERGENCY" | "OTHER_CAUSE" | "POLICE_ACTIVITY" | "STRIKE" | "TECHNICAL_PROBLEM" | "UNKNOWN_CAUSE" | "WEATHER" | "%future added value";
export type AlertEffectType = "ACCESSIBILITY_ISSUE" | "ADDITIONAL_SERVICE" | "DETOUR" | "MODIFIED_SERVICE" | "NO_EFFECT" | "NO_SERVICE" | "OTHER_EFFECT" | "REDUCED_SERVICE" | "SIGNIFICANT_DELAYS" | "STOP_MOVED" | "UNKNOWN_EFFECT" | "%future added value";
export type AlertSeverityLevelType = "INFO" | "SEVERE" | "UNKNOWN_SEVERITY" | "WARNING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AlertsFragment$data = {
  readonly alertCause: AlertCauseType | null | undefined;
  readonly alertDescriptionText: string;
  readonly alertEffect: AlertEffectType | null | undefined;
  readonly alertSeverityLevel: AlertSeverityLevelType | null | undefined;
  readonly " $fragmentType": "AlertsFragment";
};
export type AlertsFragment$key = {
  readonly " $data"?: AlertsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AlertsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlertsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "alertCause",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "language",
          "value": "fi"
        }
      ],
      "kind": "ScalarField",
      "name": "alertDescriptionText",
      "storageKey": "alertDescriptionText(language:\"fi\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "alertEffect",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "alertSeverityLevel",
      "storageKey": null
    }
  ],
  "type": "Alert",
  "abstractKey": null
};

(node as any).hash = "191c81c21e7956f7e257f1aa02e8f520";

export default node;
