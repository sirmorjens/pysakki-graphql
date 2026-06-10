/**
 * @generated SignedSource<<7dc82fd2eeca0623b9053bb59ad366bf>>
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
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "lang"
    }
  ],
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
          "kind": "Variable",
          "name": "language",
          "variableName": "lang"
        }
      ],
      "kind": "ScalarField",
      "name": "alertDescriptionText",
      "storageKey": null
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

(node as any).hash = "39c5f760e0d3270d7a12be1078ae95cd";

export default node;
