# Release 2 authoritative landing outline

Status: **Informative outline — no authoritative change is authorized**.

## Coupled change set

If, and only if, D2 through D6 receive recorded dispositions, the authoritative
landing must be one reviewable change set containing the selected versions of:

| Surface                                  | Required action                                                                                                                                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Normative specifications                 | Add the accepted paired-t Contract, Profile, declarations, numerical/check meaning, and non-claims with registered Requirement anchors.                                                                          |
| Requirement registry                     | Allocate the accepted Requirement IDs and bind each to one anchor, stability tier, schema, conformance, and public-surface references.                                                                           |
| Protocol identifiers and registries      | Register the accepted HTTPS Contract/Profile/schema/Check/Bundle identities, public checks, and reason codes.                                                                                                    |
| Public contract-surface inventory        | Update `registries/public-contract-surfaces.yaml` with the explicit schema-version impact of every changed public surface.                                                                                       |
| Schemas                                  | Add only successor Record, Profile, execution-outcome, and verification-report schema versions; do not reinterpret historical schemas.                                                                           |
| Interpretation Bundle                    | Add an exact new Bundle and ordered allowed Check set; do not alter any existing Bundle's dispatch or allowed checks.                                                                                            |
| Authority assignment and generated views | Assign every new authoritative path in the authority manifest, then run `pnpm generate` and `pnpm check:generated`.                                                                                              |
| Conformance                              | Add hand-authored positive and negative fixtures plus independent-oracle numerical expectations for the selected scope.                                                                                          |
| Reference consumer                       | Advance `reference/SOURCE-PIN.json` to the reviewed shared-verifier source and bind its accepted public behavior to exact Bundle dispatch; shared verifier development belongs in `licklider-ai/nomue-verifier`. |
| Compatibility evidence                   | Re-run Release 1 history, dispatch, report, canonicalization, and conformance regression checks against fixed before/after identities.                                                                           |

## Mandatory landing gates

The landing review must verify all of the following against one exact target:

1. every normative clause, Requirement ID, registry entry, schema, fixture, and
   generated artifact is coupled and consistent;
2. all issued identifiers first appear with their authoritative meaning and have no
   legacy alias;
3. the selected D5 numerical domain and execution predicate are enforced rather
   than merely documented;
4. every expected numerical result is independently oracle-backed;
5. historical Release 1 behavior is unchanged; and
6. unsupported Bundles and out-of-domain inputs fail closed without fallback.

Comparison tolerances belong only in `registries/public-checks.yaml`. Each selected
Check version records its rationale and test vectors there.

## Explicitly out of scope

This landing does not add signed-rank, Mann-Whitney, standardized effects, broader
confidence levels, general platform support, approval, attestation, or an overall
verification verdict. Each requires its own bounded decision.
