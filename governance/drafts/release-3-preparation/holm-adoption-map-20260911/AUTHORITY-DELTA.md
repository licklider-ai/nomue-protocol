# Proposed authority and implementation destinations

Informative destination plan. Existing authority targets are reused; no new
authority system or operative registry is created in this packet.

| Authority target or artifact class | Coupled destination                                                | Content and remaining work                                                                                                                                        |
| ---------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| normative-meaning                  | spec/profiles/independent-multigroup-continuous/supplied-p-holm.md | Contract wording in WORDING.md; allocate one Requirement anchor per eventual normative clause                                                                     |
| normative-meaning                  | spec/profiles/independent-multigroup-continuous/declarations.md    | Complete D0 Profile and shape-only declarations; link shared exact relation rules                                                                                 |
| requirement-ids                    | registries/requirements.yaml                                       | Proposed CONTRACT-HOLM and PROFILE-IMGC namespaces and 16 rows; REGISTRY-PREVIEW.json is non-operative                                                            |
| json-structure                     | Four successor schemas listed in SURFACES.json                     | Copy reviewed final schema bytes after checkpoint/output changes; no rewrite of legacy schemas                                                                    |
| public-contract-surfaces           | registries/public-contract-surfaces.yaml                           | Allocate surface IDs, resolve instance paths and connect requirements; FIELD-INVENTORY.json enumerates schema-property declarations, not final instance-path rows |
| interpretation-bundles             | registries/interpretation-bundles.yaml                             | Bind the exact final Contract/Profile/schema/check identities; no nearby-version fallback                                                                         |
| public-checks                      | registries/public-checks.yaml                                      | Five check versions; arithmetic owns exact numerator and display equality policy; candidate policy is evidence only                                               |
| reason-codes                       | registries/reason-codes.yaml                                       | Allocate all reviewed public reasons and checkpoint additions under their final revision                                                                          |
| conformance-judgment               | conformance/manifest.yaml and independent expectations             | Assign permanent fixture IDs and positive/negative expectations before reference execution; candidate test strings are locators, not fixture allocations          |
| reference implementation           | reference/verifier and selected launcher                           | Integrate strict ingress, independent expected input, complete-invocation budget, exact dispatch, output invariants and controlled execution after decisions      |
| generated views                    | generated/ and bindings/typescript/generated/                      | Regenerate through repository commands only after the complete adopted source set exists                                                                          |

REGISTRY-PREVIEW.json checks the future row shape against the existing registry
meta-schema, including the adopted capability namespace grammar. Its intended
post-decision status active is not an actual allocation. Empty conformance_refs
and public_surface_refs are disclosed remaining coupling work, not a claim that
those references are unnecessary. This preview is deliberately not an apply-ready
authoritative patch: applying only its rows would create a partial change set.

The actual four candidate schemas contain 357 property declarations, including
definitions and alternative branches. FIELD-INVENTORY.json assigns exactly one
proposed structural owner to each declaration. Several semantic requirements
apply to relationships or calculations rather than to a new field; they remain
explicit in REQUIREMENTS.json even without a structural owner row. Structural
coverage cannot establish full semantic or conformance coverage.
