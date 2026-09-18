# RFC 261 D01/D07 delta map

Status: **DRAFT — informative preparation only**.

## Fixed inputs

| Role                          | Identity                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| RFC 261 opening issue         | `https://github.com/licklider-ai/nomue-protocol/issues/261`                                                                                 |
| Opening proposal commit       | `21453d82109106e9e811571383228dcef8f60fac`                                                                                                  |
| Opening proposal blob         | `807e4bf0c22e5270b8fc15824329d04b5c37b146`                                                                                                  |
| Opening issue timestamp       | `2026-09-09T05:59:47Z`                                                                                                                      |
| Later candidate-policy source | `governance/drafts/release-4-preparation/t03-candidate-numerical-policy-decision-20260914.md` at `96da41fe4e7667e6bd60fd5e5fd01efc2d3ea8e3` |
| Existing CLI contract         | `spec/verification/relying-party-interface.md#NRS-VERIFY-0025` at `96da41fe4e7667e6bd60fd5e5fd01efc2d3ea8e3`                                |
| Existing indeterminate rule   | `spec/verification/relying-party-interface.md#NRS-VERIFY-0028` at `96da41fe4e7667e6bd60fd5e5fd01efc2d3ea8e3`                                |

The opening proposal intentionally left projection/error bounds, comparison rules,
reason/check entries, and CLI implementation unresolved. D01/D07 were therefore
not part of the fixed public-discussion input. They must not be described as if
they had been discussed since the opening timestamp.

## Delta inventory

| Delta | Later candidate meaning                                                                                                                                                     | Effect absent from opening input                                                                                | Potential affected public surface                                                                                                                                  | Unresolved adoption question                                                                                                   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| D01   | Each eligible public arithmetic value is nearest-ties-to-even binary64 projection of its exact target; comparison is strict value equality, without an empirical tolerance. | The opening proposal did not select projection/comparison semantics or a producer-visible strict equality rule. | Release 4 Contract/Profile, recompute Public Check, quantity evidence, check version and Bundle.                                                                   | Whether the selected rule can be issued as an additive Release 4 check-owned contract without changing any existing meaning.   |
| D07   | A sound possible-projection set can prove pass, mismatch, or indeterminate; mismatch has priority over indeterminate. No value is invented for unresolved projection.       | The opening proposal did not select the completed-indeterminate aggregation or its report and CLI consequences. | Release 4 recompute Public Check, verification-report evidence, reason codes, and Bundle. The shared CLI exit-code contract is excluded from this Release 4 scope. | Whether Release 4 exposes completed `indeterminate` in its detailed report without changing or reinterpreting NRS-VERIFY-0025. |

## Preserved boundaries

- The balanced replicated 2-by-2 scope, model assumptions, three marginal
  quantities, exclusions, and all Release 1/Phase 2A identities stay unchanged.
- No producer probability interval or optional carrier is introduced (D05/D06
  remain outside this delta).
- No internal algorithm, host promise, resource limit, production implementation,
  identifier, schema, registry entry, Public Check, or Bundle is issued here.
- Existing bundles and the current five-bucket CLI behavior remain unchanged until
  an authorized coupled change is separately implemented and reviewed.
- This document neither treats a Record as overall VERIFIED nor changes a
  declaration-truth boundary.

## Required adoption choices

The final decision may not leave these points implicit:

1. Does Release 4 issue D01 as a new, check-owned comparison rule with an exact
   successor Public Check and Bundle?
2. Does Release 4 permit a completed `indeterminate` outcome in its public
   supported procedure, or does it constrain the adopted Release 4 procedure to
   terminal outcomes only?
3. The selected amendment scope excludes CLI exit-code semantics from Release 4.
   The current five-code contract remains unchanged; relying parties that need the
   D07 distinction use the detailed verification report.
4. For each choice, what is the highest affected stability tier, and what is the
   corresponding minimum discussion window?

These are governance and public-interface questions. The existing numerical
evidence is reused only within its fixed scope; this map makes no new numerical
or scientific claim.
