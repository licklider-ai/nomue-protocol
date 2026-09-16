# Release 5 historical-preservation plan

Status: informative pre-opening plan. R5-P6 remains `OPEN`. This plan identifies the
evidence required to prepare and eventually close the gate; it is not that evidence.

## Preservation claims to prove

1. Release 1 historical fixtures, canonical bytes and pinned results remain
   unchanged.
2. Every existing interpretation bundle retains its exact `allowed_check_ids` and
   dispatch meaning.
3. Existing verification-report schemas, statuses and reason-code meanings remain
   unchanged.
4. A legacy Record without Release 5 selection evidence validates and verifies
   exactly as it did under its historical bundle.
5. A successor Record that names selection evidence under a bundle that does not
   support it fails exact dispatch or applicability; it does not receive fallback
   interpretation.
6. Release 2 and Release 3 historical pins, once issued, remain unchanged when R5
   support is later added through new bundle identities.

## Fixed evidence plan

| Evidence                            | Required comparison                                                                                                                             |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository drift checks             | Generated artifacts and registries before and after the additive R5 change                                                                      |
| Historical conformance suite        | Byte-for-byte or pinned semantic results for every pre-R5 fixture                                                                               |
| Existing bundle inventory           | Exact identifier, schema, Contract/Profile references and `allowed_check_ids`                                                                   |
| Legacy Record verification          | Same bundle dispatch, checks, report schema and result as the historical pin                                                                    |
| Unsupported R5 combination fixtures | Deterministic failure before bundle-specific interpretation, with no fallback                                                                   |
| R5 successor fixtures               | Positive exact-one tuple binding plus missing declaration, duplicate tuple identity, inadmissibility dependency and identity-mismatch negatives |
| Cross-version report fixtures       | Old reports remain valid under their schema; new reason codes occur only in the successor report schema                                         |

Each comparison must name immutable before/after commits, the invoked command, the
fixture identity and the expected result. A newly generated snapshot without a
reviewed historical reference is insufficient.

The Release 1 preservation run must include `release-1-history.ts` and
`pnpm regression:phase1`, with their exact historical pins recorded. A negative
fixture with zero or two selected tuple identities must fail the successor schema or
binding check. No policy registry or test-only policy fixture is introduced.

## Required implementation constraints

- Use new identifiers for R5-aware bundles, checks, schemas and reason codes.
- Do not add the new check to an existing bundle's allowed-check set.
- Do not default absent projection inputs, selected-tuple binding or timing status
  into a legacy Record.
- Do not reinterpret a Release 1 method identifier as an independent-two-group
  Analysis Contract.
- Do not edit historical expected outputs merely to make the new implementation
  pass; any intentional historical change requires its own governance decision.

## Gate progression

R5-P6 may move from `OPEN` to `PREPARED` when an independent reviewer confirms that
this plan covers every affected historical surface and the exact fixture inventory
is attached. It may close only after the fixed tests exist, pass at the reviewed
implementation commit and demonstrate all six preservation claims.

Before then, any statement that Release 5 preserves historical meaning is a design
intent, not established evidence.
