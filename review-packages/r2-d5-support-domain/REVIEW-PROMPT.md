# Release 2 D5 Operation-Stage Support-Domain Candidate — Independent Adversarial Review

## Assignment

Perform a targeted independent adversarial review of the non-authoritative Release 2
paired-t operation-stage support-domain candidate. Review the exact delta below:

- repository: `licklider-ai/nomue-protocol`
- base: `73a2479d9ffd543effc05c29dbeee29ee068458d`
- head: `dde1a8964943d3156cd6e91d7176de7f48227d83`
- expected delta: exactly 8 files, `+982/-0`

This is not a new literature review, a redesign of G4, or a final R2-D5
ratification. The question is whether the new machine-readable predicate structure,
boundary corpus, validator, and tests truthfully capture the currently executable G4
failure boundary without freezing runtime support or any remaining numerical policy.

Report in Japanese. Do not edit tracked files. Use temporary probes outside the
reviewed tree and finish with a clean worktree.

## Bundle identity — do this first

The repository transport stores the ZIP as lexicographically ordered files named
`review-bundle.zip.part-*`. Concatenate those files byte-for-byte into
`review-bundle.zip`, then verify it with the adjacent
`review-bundle.zip.sha256`. Do not decode, normalize, or otherwise transform the
parts.

The bundle contains:

- `repository/`: tracked files from the exact reviewed head;
- `repository.gitbundle`: portable Git history containing the reviewed head;
- `REPOSITORY-COMMIT.txt` and `BASE-COMMIT.txt`;
- `research-inputs/`: the adjudication and selected support-domain research probes;
- `REVIEW-PROMPT.md`; and
- `MANIFEST.sha256`.

Before reviewing:

1. verify every entry in `MANIFEST.sha256`;
2. reject missing, added, duplicate, absolute, parent-traversal, or symlink entries;
3. clone `repository.gitbundle` and confirm its head equals
   `REPOSITORY-COMMIT.txt`;
4. compare the cloned tracked tree byte-for-byte with `repository/`;
5. confirm the base-to-head delta is exactly the declared eight files and line count;
6. confirm the research inputs are evidence only and are not presented as Protocol
   authority.

Stop with a BLOCKER if identity cannot be established. Do not substitute a nearby
branch, current worktree, or later main commit.

## Exact files under review

1. `governance/drafts/release-2-candidate/numerical/README.md`
2. `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`
3. `governance/drafts/release-2-candidate/numerical/support-domain-boundary-cases.json`
4. `governance/drafts/release-2-candidate/numerical/support-domain-candidate.json`
5. `tooling/src/spikes/paired-t-numerical-readiness.ts`
6. `tooling/src/spikes/paired-t-support-domain-candidate.ts`
7. `tooling/tests/paired-t-numerical-readiness.test.ts`
8. `tooling/tests/paired-t-support-domain-candidate.test.ts`

Inspect `reference/spikes/paired-t.ts` as the execution surface, but it is unchanged
in this delta. Reopen other D5 evidence or prior reviewed candidate surfaces only if
this increment creates a concrete contradiction or regression.

## Intended stop boundary

The head may:

- record an ordered candidate predicate structure;
- bind active predicates to current spike errors and boundary cases;
- execute boundary examples through the non-authoritative feasibility spike; and
- record unresolved predicates, policies, and diagnostics explicitly.

It must not:

- claim a supported domain or enable runtime support;
- issue or freeze final reason-code spellings;
- select a `df` or pair-count ceiling, statistic bound, or final table extent;
- select a runtime Student-t tail algorithm or branch boundary;
- select any comparison tolerance;
- adopt a blanket subnormal rejection;
- turn condition number or cross-graph disagreement into a runtime gate;
- mark corpus or oracle scope complete;
- issue an identifier, register a Public Check or bundle, or change Release 1.

An intentionally deferred decision is not a finding merely because it remains open.

## A. Authority and maturity attack

Verify all candidate/readiness states and prose agree that:

- status is `non_authoritative_candidate` and issuance is `unissued`;
- `supported_domain_claimed`, `runtime_support_enabled`, and
  `final_reason_codes_frozen` are false;
- the support composition leaves corpus and oracle predicates `incomplete`;
- the existing top-level `supported_domain` and `comparison_tolerances` remain null;
- public review issue #25 remains the governing open review; and
- the ordinary passing fixture is not described as supported behavior.

Search authoritative registries, schemas, conformance artifacts, specification,
reference verifier, and generated output for leaked candidate claims. Any authority
leak or premature support/closure claim is a BLOCKER.

## B. Predicate order and first-failure attack

Compare every active predicate with the exact execution order in
`computePairedTSpike`. Verify:

1. minimum canonical pair count;
2. finite one-subtraction binary64 differences;
3. exact dyadic differences not all equal;
4. binary64 difference spread not erased;
5. finite pairwise difference sum;
6. finite centered differences;
7. finite squared centered differences;
8. finite pairwise squared-deviation sum;
9. finite positive sample variance; and
10. finite positive standard-error-squared.

Attack both false success and wrong first-failure classification. Pay particular
attention to:

- exact zero variance versus unequal exact differences erased by subtraction;
- variance underflow versus standard-error-squared underflow;
- odd and non-power-of-two pair counts under the floor-half recursive tree;
- signed zero and subnormal operands;
- a case that could fail at more than one later stage; and
- whether the generic later-intermediate defensive postcondition is honestly
  described and whether `separate_boundary_fixture_required: false` is justified by
  the preceding invariants.

Do not demand p-value or confidence-interval execution from the active algebraic
predicate list. Those paths are intentionally deferred.

## C. Boundary corpus attack

Run every case in `support-domain-boundary-cases.json` through the public spike entry
point and confirm its exact declared first outcome. Independently reconstruct or
replace each numerical witness rather than trusting the test helper.

At minimum probe:

- finite-input difference overflow;
- mean-reduction overflow;
- centering overflow;
- squared-deviation overflow;
- variance-reduction overflow;
- unequal exact differences whose computed variance becomes zero;
- a positive sample variance whose division by pair count becomes zero; and
- an ordinary passing algebra example.

Try mutations of pair order, case order, one operand, expected error, duplicate key,
missing case, extra case, non-finite in-memory operand, and signed zero. Determine
whether a case can stay green by failing for an unintended reason.

## D. Validator mutation attack

Starting from valid artifacts, attempt at least the following in-memory mutations:

- authoritative or issued state;
- support claim, runtime enablement, or final reason-code freeze;
- corpus/oracle closure;
- active predicate deletion, insertion, reordering, duplicate ordinal, stage drift,
  pass-condition drift, reclassification, spike-error drift, and fixture-key drift;
- activation of a deferred confidence-interval or p-value predicate;
- removal or activation of the unresolved subnormal policy;
- a `df_max`, pair-count bound, statistic bound, tolerance, branch threshold, or
  final table hash added at any nesting level;
- promotion of kappa or cross-graph disagreement to a runtime gate;
- missing/extra object keys and JSON object-key reordering; and
- corpus source drift and a fixture that is structurally valid but bound to the
  wrong active predicate.

Record which layer rejects each mutation. Object-key order alone must not alter
meaning; array order for active predicates must remain meaningful. A mutation that
creates a hidden support claim or silently changes first-failure semantics is at
least SHOULD-FIX and may be BLOCKER depending on impact.

## E. Fidelity to the adjudicated research boundary

Use `research-inputs/adjudication-report.md` and the selected probes to verify only
the conclusions carried into this increment:

- support is not represented as one rectangular tuple or `|t|` bound;
- mathematical exact zero and representational zero remain distinct;
- non-finite failures are tied to operation stages;
- subnormal values are not rejected categorically;
- corpus examples are not treated as neighborhoods or complete support;
- kappa and cross-graph disagreement remain diagnostics;
- target-format p projection, CI endpoint representability, validated corpus scope,
  and oracle coverage remain deferred; and
- no prototype default such as `df_max=200` or diagnostic threshold such as
  `2^-46` is imported into the candidate.

Do not require new external research unless a specific statement in the candidate
cannot be resolved from the bundled code and evidence. If research is necessary,
name the exact question and why it blocks the verdict.

## F. Regression and repository hygiene

From a clean checkout run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
git status --porcelain
```

If the environment prevents the `tsx` CLI from opening its IPC pipe, separate that
environment failure from a product failure and run the equivalent scripts with
`node --import tsx`. Confirm:

- all unit tests and candidate mutation tests pass;
- Release 1 history, schema, conformance, oracle, and generated-file guards pass;
- the worktree remains clean;
- no secret, credential, machine-local absolute path, unsafe archive entry, symlink,
  generated build output, or unrelated change is present.

## Severity and verdict

- **BLOCKER**: false support/authority claim, incorrect first-failure semantics that
  can accept an unsupported computation, Release 1 regression, or identity failure.
- **SHOULD-FIX**: reproducible predicate/corpus/validator gap likely to corrupt later
  support ratification or misclassify a meaningful refusal.
- **NICE-TO-HAVE**: localized clarity or defense-in-depth improvement with no present
  false acceptance, authority leak, or ratification impact.

Return one verdict:

- **GO**: the candidate may remain in its draft PR and the next D5 candidate work may
  proceed;
- **GO WITH REPAIRS**: no withdrawal is needed, but named repairs are required before
  this increment closes; or
- **NO-GO**: candidate work depending on this predicate structure must pause until
  BLOCKER repairs close.

Test-only, validator-only, evidence-only, and editorial repairs do not restart the
public review window unless they materially change the RFC semantic scope. State the
window impact for every finding.

## Required report structure

1. Identity checks
2. Verdict
3. Findings ordered by severity, each with exact path/function, reproducer, actual
   versus expected result, impact, smallest repair, semantic-scope classification,
   and public-review-window impact
4. Predicate closure table for all active, defensive, and deferred entries
5. Closure table for A through F, authority boundary, and Release 1 invariance
6. Reproduced commands, versions, probe/mutation counts, and observed results
7. Confirmed non-findings for important attacked boundaries
8. External research requirement: `none` unless a specific unresolved claim blocks
   judgment
9. Workspace cleanup confirmation

Avoid generic design preferences and broad re-review. Judge the exact candidate,
its first-failure behavior, its fail-closed bindings, and the truthfulness of its
remaining-open claims.
