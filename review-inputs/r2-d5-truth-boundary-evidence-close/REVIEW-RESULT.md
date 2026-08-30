# PR #34 truth-boundary evidence repair — close-only review result

**Review date:** 2026-08-30 (UTC)  
**Transport commit:** `278174854340bae311a51930a8cb2f439e57d746`  
**Repaired implementation:** `78c96328aeeee153aa6df92e01ee45bc1111fe4f`  
**Repaired tree:** `7bdd03fb6b1ce65f82c765274d485bbd41ff4546`  
**Original reviewed implementation:** `973cc01ba666a9b3b5870b1d32849f00502aaa97`  
**Scope:** BLOCKER-1 と SHOULD-FIX-1 のclose確認のみ

## 1. Identity checks

| Check                      | Result                                                                  |
| -------------------------- | ----------------------------------------------------------------------- |
| transport checkout         | `278174854340bae311a51930a8cb2f439e57d746` — PASS                       |
| transport parent           | repaired implementation exact — PASS                                    |
| repaired tree              | `7bdd03fb6b1ce65f82c765274d485bbd41ff4546` — PASS                       |
| original-to-repair delta   | exactly four files, `+203/-28` — PASS                                   |
| transport-only delta       | confined to `review-inputs/r2-d5-truth-boundary-evidence-close/` — PASS |
| `REVIEW-INPUTS.sha256`     | all entries verified — PASS                                             |
| evidence `MANIFEST.sha256` | all entries verified — PASS                                             |
| bundled source copies      | all six byte-identical to repaired target — PASS                        |
| evidence generator commit  | repaired implementation exact — PASS                                    |
| PR #34                     | OPEN / Draft / repaired head exact — PASS                               |
| public review issue #25    | OPEN — PASS                                                             |

No moving branch, nearby commit, or regenerated substitute was used for the supplied
artifact.

## 2. Verdict

### GO

BLOCKER-1 and SHOULD-FIX-1 are both closed. The repaired increment may be marked
Ready and merged as non-authoritative Release 2 candidate evidence. This verdict
does not approve or complete R2-D5, select a truth-error bound, activate a runtime
margin, or authorize paired-t Protocol support.

## 3. Finding closure table

| Finding                                            | Result | Closure basis                                                                                                   |
| -------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| BLOCKER-1 — coherent false evidence accepted       | CLOSED | genuine bundle accepted; all five original coherent rewrites rejected; permanent probe now rejects 20 mutations |
| SHOULD-FIX-1 — non-bigint bound accepted as stable | CLOSED | every requested non-bigint and negative-bigint input returns `candidate_refusal / invalid_candidate_input`      |

No new finding was introduced by the four-file repair.

## 4. Mutation closure table

Each mutation rebuilt every affected JSON hash, `environment_hash` where relevant,
and `MANIFEST.sha256`.

| Original accepted mutation                    | Repaired result | Rejecting layer / message                                                                     |
| --------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------- |
| false inverse-beta enclosure/cell             | REJECTED        | enclosure/cell certification: `inverse beta: enclosure or projection cell is invalid`         |
| false graph remainder hex                     | REJECTED        | TypeScript graph replay: `TypeScript graph differs from the evidence mirror`                  |
| non-numeric precision history                 | REJECTED        | truth metadata: `truth method, class, or precision history is invalid`                        |
| fabricated graph class with aggregate rewrite | REJECTED        | TypeScript graph replay: `TypeScript graph differs from the evidence mirror`                  |
| FLINT `999.0.0` with hashes rebuilt           | REJECTED        | environment identity: `environment does not contain the pinned candidate dependency identity` |

Additional malformed nested structures were attacked for `left`, `truth`,
`enclosure`, inverse-beta, inverse-beta projection, and truth projection hex. All
returned structured validation errors; none threw an unstructured exception.

The genuine target-head artifact returned:

```text
paired-t truth-boundary evidence bundle: valid
paired-t truth-boundary evidence mutations rejected: 20
```

## 5. Valid-bound and invalid-bound regression

### Invalid supplied bounds

For `value=0.5`, all of the following returned
`candidate_refusal / invalid_candidate_input`:

- number `0`;
- number `-0`;
- number `0.5`;
- `NaN`;
- positive infinity;
- negative infinity;
- `undefined`;
- null;
- string `"0"`; and
- bigint `-1n`.

### Valid bigint and projection boundaries

| Value                    | Bound | Result                                     |
| ------------------------ | ----: | ------------------------------------------ |
| minimum normal           |  `0n` | stable, one cell to transition             |
| minimum normal           |  `1n` | margin refusal                             |
| largest normal below one |  `0n` | stable, one cell to transition             |
| largest normal below one |  `1n` | margin refusal                             |
| exactly one              |  `0n` | stable rounded-one, one cell to transition |
| exactly one              |  `1n` | margin refusal                             |
| zero                     |  `0n` | projection-class refusal                   |
| minimum subnormal        |  `0n` | projection-class refusal                   |
| maximum subnormal        |  `0n` | projection-class refusal                   |

The valid-bigint margin form and strict inequality are unchanged.

## 6. Repository regression and authority table

Checks were run from the exact repaired implementation commit, not the transport
commit.

| Check                                                       | Result                    |
| ----------------------------------------------------------- | ------------------------- |
| Prettier / Markdown lint / typecheck                        | PASS                      |
| repository validation                                       | PASS                      |
| Vitest                                                      | 33 files / 351 tests PASS |
| generated files                                             | 19/19 PASS                |
| canonicalization                                            | 16 vectors PASS           |
| conformance                                                 | 132 fixtures PASS         |
| Phase 1                                                     | PASS                      |
| Phase 2A                                                    | PASS                      |
| oracle                                                      | PASS                      |
| history / authority / private dependency / code-path audits | PASS                      |
| repaired worktree status                                    | clean                     |

The repair changes only:

- `tooling/src/spikes/paired-t-truth-boundary-candidate.ts`;
- `tooling/src/spikes/probe-paired-t-truth-boundary-evidence.ts`;
- `tooling/src/spikes/validate-paired-t-truth-boundary-evidence.ts`; and
- `tooling/tests/paired-t-truth-boundary-candidate.test.ts`.

The evidence generator, manifest seed, runtime-series candidate, candidate JSON,
specification, registries, schemas, conformance fixtures, reference verifier,
generated artifacts, and Release 1 files are unchanged. The repaired artifact's
scientific payload is byte-for-byte JSON-equivalent to the original after removing
only `generator_commit` and `environment_hash`.

No identifier, Requirement ID, Public Check, schema, bundle, support domain,
supported df maximum, tolerance, truth-error bound, reason-code spelling, runtime
constant table, runtime margin, correct-rounding claim, or R2-D5 closure was added.

## 7. Reproduced commands and results

```text
sha256sum -c REVIEW-INPUTS.sha256                 PASS
sha256sum -c evidence/MANIFEST.sha256             PASS
corepack pnpm install --frozen-lockfile            PASS
corepack pnpm check                                local tsx IPC EPERM at validate entry
node --import tsx <each check entry point>         PASS
vitest run                                         33 files / 351 tests PASS
conformance-run                                    132 fixtures PASS
evidence:r2-paired-t-truth-boundary:validate       PASS
evidence:r2-paired-t-truth-boundary:probe          20 mutations rejected
five original coherent mutation reproducers       5/5 rejected
malformed nested structure attacks                 6/6 structured rejection
programmatic invalid-bound attacks                 10/10 rejected
valid-bound boundary regression                    9/9 expected outcomes
git status --porcelain at repaired target          clean
```

The normal local `tsx` CLI wrapper encountered the already disclosed sandbox IPC
`EPERM`. Every underlying entry point passed through `node --import tsx`, and GitHub
CI #111 plus both target-head evidence workflows completed successfully.

## 8. External research requirement

`none`

The two findings were local validator and runtime-type integrity defects. Their
closure introduces no new external methodology claim.

## 9. Workspace cleanup confirmation

The exact repaired implementation worktree remained clean. Review-generated
mutation directories were confined to `/tmp`. No implementation, authoritative,
Release 1, or evidence source file was edited during the close review. This report
is the only review-branch addition.
