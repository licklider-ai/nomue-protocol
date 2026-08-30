# PR #34 R2-D5 truth-error / projection-boundary evidence — independent adversarial review

**Review date:** 2026-08-30 (UTC)  
**Transport commit:** `80f68ed8f58b9edd98920accad1626f105905b2a`  
**Implementation target:** `973cc01ba666a9b3b5870b1d32849f00502aaa97`  
**Implementation tree:** `ff7207e70b41e4395a6c78f0cae58b76f71c7325`  
**Baseline:** `eb4285bf6df389177904943c0e2aa480dfd9d948`  
**Review scope:** PR #34 の truth-error / projection-boundary evidence increment のみ

## 1. Identity checks

| Check                      | Result                                                            |
| -------------------------- | ----------------------------------------------------------------- |
| transport checkout         | `80f68ed8f58b9edd98920accad1626f105905b2a` — PASS                 |
| transport parent           | `973cc01ba666a9b3b5870b1d32849f00502aaa97` — PASS                 |
| implementation tree        | `ff7207e70b41e4395a6c78f0cae58b76f71c7325` — PASS                 |
| baseline-to-target delta   | exactly 15 files, `+1549/-2` — PASS                               |
| transport-only delta       | confined to `review-inputs/r2-d5-truth-boundary-evidence/` — PASS |
| `REVIEW-INPUTS.sha256`     | all entries verified — PASS                                       |
| evidence `MANIFEST.sha256` | all entries verified — PASS                                       |
| bundled source copies      | all six byte-identical to implementation target — PASS            |
| evidence generator commit  | exact implementation target — PASS                                |
| public review issue #25    | OPEN — PASS                                                       |

Identity is closed. No moving branch or nearby commit was substituted.

## 2. Verdict

### NO-GO

Numerical evidence itself was independently reproduced and no false endpoint or
aggregate was found. However, the supplied validator accepts coherent rewrites that
make material evidence fields false while rebuilding all affected hashes. This is a
fail-open evidence-integrity path and blocks use of this increment as the next D5
decision input. One additional programmatic input-validation repair is required for
the future projection-margin helper.

Required next action: repair the two findings below, regenerate evidence at the new
implementation commit, and perform a close-only independent review. Issue #25 need
not restart or close; PR #34 must remain Draft until that close review returns GO.

## 3. Findings

### BLOCKER-1 — validator accepts materially false, coherently rehashed evidence

#### Paths / relevant code

- `tooling/src/spikes/validate-paired-t-truth-boundary-evidence.ts:211-239`
- `tooling/src/spikes/validate-paired-t-truth-boundary-evidence.ts:274-303`
- `tooling/src/spikes/validate-paired-t-truth-boundary-evidence.ts:386-392`
- `tooling/src/spikes/validate-paired-t-truth-boundary-evidence.ts:478-490`
- `tooling/src/spikes/probe-paired-t-truth-boundary-evidence.ts`

#### Reproducer

Starting from the valid regenerated bundle, each mutation below rewrote the affected
JSON and rebuilt `MANIFEST.sha256`; environment mutations also rebuilt
`environment_hash`. The validator returned an empty error list for every row.

| Coherent mutation                                                                     | Actual   | Expected                                   |
| ------------------------------------------------------------------------------------- | -------- | ------------------------------------------ |
| inverse-beta enclosure `999/1..1000/1`, cell `0/1..0/1`, `strict_containment=false`   | ACCEPTED | reject invalid inverse-beta enclosure/cell |
| graph remainder hex changed to `3ff0000000000000`                                     | ACCEPTED | reject graph mismatch                      |
| truth `precision_history_bits=["not-a-precision"]`                                    | ACCEPTED | reject invalid precision history           |
| graph projection class changed to `fabricated`, agreement and aggregate count updated | ACCEPTED | reject class inconsistent with graph bits  |
| environment FLINT changed from `3.6.0` to `999.0.0`, hashes updated                   | ACCEPTED | reject unpinned dependency identity        |

The validator currently checks only the inverse-beta projection hex and definition,
not its Arb enclosure or rounding cell. It also omits the graph projection class and
remainder from TypeScript graph comparison, checks only that the truth precision
history is a non-empty array, and accepts any string as the FLINT version.

#### Impact

A transported or rewritten bundle can preserve its own manifest consistency and
pass the advertised validator while carrying false numerical provenance or false
graph/oracle metadata. Deterministic regeneration detected these rewrites in this
review, but the validator itself is claimed and used as the fail-closed evidence
boundary. The gap therefore invalidates that claim.

#### Smallest repair

1. Validate the inverse-beta enclosure, exact binary64 rounding cell, strict
   containment, and positive finite projection.
2. Require exact environment keys and the pinned `python-flint==0.9.0` / FLINT
   `3.6.0` identity (and Python 3.12 route).
3. Compare graph projection class and remainder hex to the independently executed
   TypeScript result.
4. Require precision history to be the exact doubling sequence from 128 through at
   most 8192 bits.
5. Add all five coherent mutations to the permanent probe.

**Review-window effect:** no restart. This is non-authoritative candidate tooling and
evidence hardening. A close-only review against the repaired commit is required.

### SHOULD-FIX-1 — projection-margin helper accepts non-bigint bounds as stable

#### Path / relevant code

- `tooling/src/spikes/paired-t-truth-boundary-candidate.ts:154-203`

#### Reproducer

Calling the emitted JavaScript function for `value=0.5` with `0`, `-0`, `NaN`,
`0.5`, `undefined`, `null`, or `"0"` as the second argument returned
`candidate_stable_for_supplied_bound`. `Infinity` returned a margin refusal rather
than `invalid_candidate_input`.

#### Actual versus expected

The TypeScript signature says `bigint`, but the runtime function does not verify the
type. The candidate states that the input is a non-negative integer ULP bound. Any
runtime value outside non-negative `bigint` must return `invalid_candidate_input`.

#### Impact

There is no production caller and `runtimeSupportClaimed` remains false, so this does
not alter current evidence or Release 1. It would nevertheless make the future
predicate form fail open for an untyped/programmatic caller.

#### Smallest repair

Add an explicit `typeof truthErrorBoundUlp === "bigint"` guard before comparison and
add tests for number, `-0`, fractional number, `NaN`, infinities, `undefined`, null,
and string inputs.

**Review-window effect:** no restart; close-only review with BLOCKER-1.

## 4. Transition-search and margin-form closure

| Item                                                                  | Result   | Evidence                                                                                                                       |
| --------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| fixed-df two-sided Student-t monotonicity for non-negative absolute t | PASS     | `x=df/(df+t²)` decreases; regularized beta is increasing in `x` for positive parameters                                        |
| projection-class order                                                | PASS     | `rounded_one > normal > subnormal > zero` follows non-negative binary64 bit order                                              |
| binary-search direction and threshold                                 | PASS     | returns last bit cell with rank at or above the transition threshold                                                           |
| off-by-one / adjacency                                                | PASS     | all 20 pairs have `right_bits=left_bits+1`                                                                                     |
| declared transition classes                                           | PASS     | all 40 endpoints independently land in the declared class                                                                      |
| df seed and ordering                                                  | PASS     | `{1,2,3,10,30,100,200}`, manifest order preserved                                                                              |
| df=1 subnormal-to-zero exclusion                                      | PASS     | at maximum finite binary64 `t`, independent Decimal route gives `p≈3.5413150332597765e-309`, above the zero-rounding threshold |
| rounded-one-to-normal included                                        | PASS     | code and prose consistently use nearest projection-class transition                                                            |
| valid-bound margin sufficiency                                        | PASS     | ordered-cell distance `> B` is sufficient when true graph-to-truth distance is `<=B`                                           |
| strict inequality / boundary cells                                    | PASS     | minimum normal, maximum subnormal, largest normal below one, and exactly one close at one cell as intended                     |
| invalid bound handling                                                | **OPEN** | SHOULD-FIX-1                                                                                                                   |

## 5. Numerical endpoint and aggregate ledger

An independent 256/384-digit Decimal implementation was used for all endpoints. It
evaluated the same exact-input probability identity using explicit positive series
and independently derived integer/half-integer inverse-beta constants, rather than
calling Arb's regularized incomplete-beta implementation.

| Check                                                    | Result                                                     |
| -------------------------------------------------------- | ---------------------------------------------------------- |
| exact statistic rational from binary64 bits              | 40/40 PASS                                                 |
| `I_{df/(df+t²)}(df/2,1/2)` projection                    | 40/40 PASS                                                 |
| independent value strictly inside recorded rounding cell | 40/40 PASS                                                 |
| 256- vs 384-digit agreement at 230 digits                | 40/40 PASS                                                 |
| inverse-beta projection and cell                         | 7/7 df values PASS                                         |
| Python graph versus TypeScript graph                     | 40/40 PASS for fields currently compared                   |
| pointwise ULP distances                                  | 40/40 reproduced                                           |
| reported maximum                                         | 34 ULP — reproduced                                        |
| maximum witness                                          | `df100-positive_normal_to_positive_subnormal` — reproduced |
| projection-class disagreement count                      | 10 endpoints — reproduced                                  |
| global-bound promotion                                   | absent; false/null as required                             |

No endpoint falsehood or silent global truth-bound claim was found.

## 6. Evidence, provenance, and mutation closure

| Check                                                              | Result                                                                                               |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| two fresh generations on same host                                 | byte-identical                                                                                       |
| supplied artifact versus local generation                          | scientific payload exact after excluding environment hash; environment difference correctly recorded |
| local dependency identity                                          | Python 3.12.13, python-flint 0.9.0, FLINT 3.6.0                                                      |
| supplied artifact identity                                         | Python 3.12.14, python-flint 0.9.0, FLINT 3.6.0                                                      |
| overwrite refusal                                                  | PASS, exit 1 `output directory already exists`                                                       |
| missing dependency                                                 | PASS, exit 1 without fallback                                                                        |
| supplied coherent probes                                           | 15/15 rejected                                                                                       |
| malformed JSON                                                     | rejected structurally                                                                                |
| missing / extra files                                              | rejected structurally                                                                                |
| duplicate manifest entry                                           | rejected structurally                                                                                |
| symlink                                                            | rejected structurally                                                                                |
| statistic / truth cell / transition identity / aggregate witnesses | rejected                                                                                             |
| additional coherent evidence mutations                             | **FAIL — BLOCKER-1**                                                                                 |

The original failed GitHub run #6 was independently inspected. It failed while
serializing an exact Arb enclosure rational at an intermediate search point because
Python's 4,300-digit integer-to-string guard fired. The target's
`sys.set_int_max_str_digits(0)` change preserves the trusted internally generated
rational. The repaired workflow and local pinned run complete without truncation or
fallback.

## 7. Authority and Release 1 closure

| Check                                                   | Result                |
| ------------------------------------------------------- | --------------------- |
| new Requirement ID or Protocol identifier               | none                  |
| schema, bundle, Public Check registration               | none                  |
| supported df/domain/tolerance/reason code/table hash    | none selected         |
| runtime support / correct-rounding claim                | false                 |
| R2-D5 closure                                           | absent                |
| issue #25                                               | open                  |
| authoritative/spec/registry/reference/generated changes | none in 15-file delta |
| Release 1 history and candidate guards                  | PASS                  |
| conformance fixtures                                    | 132/132 PASS          |
| Phase 1 / Phase 2A / oracle / generated checks          | PASS                  |

## 8. Reproduced commands and results

```text
sha256sum -c REVIEW-INPUTS.sha256                 PASS
sha256sum -c evidence/MANIFEST.sha256             PASS
corepack pnpm install --frozen-lockfile            PASS
corepack pnpm check                                local tsx IPC EPERM at validate entry
node --import tsx <each check entry point>         PASS
vitest run                                         33 files / 350 tests PASS
conformance-run                                    132 fixtures PASS
generate_truth_boundary_evidence.py (twice)        PASS / deterministic
evidence:r2-paired-t-truth-boundary:validate       PASS on genuine bundle
evidence:r2-paired-t-truth-boundary:probe          15 mutations rejected
independent Decimal endpoint checker               40/40 projections and cells PASS
git status --porcelain                             clean
```

The ordinary `tsx` wrapper failure is the disclosed sandbox-local IPC `EPERM` and
does not reproduce in GitHub CI #108. Every underlying check passed through
`node --import tsx`.

## 9. Confirmed non-findings

- No wrong transition-search direction or off-by-one was found.
- No adjacent-input / adjacent-output confusion was found.
- No missing factor or swapped beta parameter was found.
- No false 34-ULP witness or false disagreement aggregate was found.
- No finite-corpus maximum was promoted to a guarantee.
- No supported df maximum, domain, tolerance, runtime constant table, or platform
  matrix was selected.
- No runtime caller reaches the projection-margin helper.
- Valid `bigint` margin behavior at zero, subnormal/normal, one-minus-ULP, and one is
  correct.
- Exact zero, signed zero, negative, NaN, infinity, and values above one are refused
  for the probability input.
- Release 1 behavior and all 132 conformance fixtures are unchanged.

## 10. External research requirement

`none`

The unresolved items are local implementation-integrity defects, not missing
external methodology or primary-source questions.

## 11. Workspace cleanup confirmation

The implementation fresh clone remained clean after the review. Generated evidence
and mutation directories were created only under `/tmp`; no repository source or
authoritative artifact was edited during the independent review. This report is the
only transport-branch addition.
