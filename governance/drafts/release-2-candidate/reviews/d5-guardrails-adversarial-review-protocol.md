# Release 2 paired-t D5 numerical guardrails adversarial review protocol

## Assignment

Act as an adversarial numerical-software reviewer. Review the non-authoritative
Release 2 paired-t D5 candidate guardrails introduced between the exact commits
below:

- repository: `licklider-ai/nomue-protocol`
- base: `f626fcc1f81cace73569739f3c26f7a544b3c417`
- head: `c935611523bac4b85578fd8eddef74056b6b53cc`
- pull request: `#27`

This is a **diff-scoped review**, not another full review of Release 1 or the
completed D2-D4 candidate surface. Inspect adjacent material only when necessary to
test a boundary or resolve an inconsistency.

The question is not whether the D5 numerical contract is complete. It is
deliberately incomplete. The question is whether the new guardrails truthfully and
fail-closedly describe that state and provide a sound base for generating the
remaining evidence.

Do not edit the repository. Do not turn intentionally open D5 decisions into
findings merely because they are not yet decided.

## Materials and authority

The supplied review bundle is self-contained. Start with:

1. `MANIFEST.sha256` and `REVIEW-SCOPE.md`;
2. `diff/f626fcc-to-c935611.patch`;
3. the exact head files under `repository/`;
4. the research reports and prototypes under `research-inputs/` when checking
   whether an implementation statement is supported.

The governing context is:

- `repository/governance/drafts/release-2-foundation-and-paired-t-rfc.md`;
- `repository/governance/drafts/p1a-paired-t-l1-design.md`;
- `repository/governance/drafts/release-2-steward-ratification-package.md`;
- `repository/governance/drafts/release-2-candidate/numerical/README.md`; and
- `repository/governance/drafts/release-2-candidate/numerical/evidence-readiness.json`.

Research artifacts are evidence inputs, not Protocol authority. Prototype success
must not be treated as a completed certificate unless the exact closure conditions
are actually met.

## Intended stop boundary

The head may select a candidate operation graph and candidate evidence format. It
must not:

- issue an identifier or Requirement ID;
- register a supported bundle or Public Check;
- freeze a supported domain, df maximum, tolerance, critical-value table, or runtime
  Student-t-tail procedure;
- claim that a prototype result is a rigorous oracle certificate;
- claim cross-library agreement as an oracle; or
- change Release 1 meaning or dispatch.

Candidate development may continue during public review. Authoritative landing is
still prohibited.

## Required review work

### A. Reproduce the scope and baseline

1. Confirm the supplied base/head identifiers and changed-file list.
2. Run `pnpm install --frozen-lockfile` and `pnpm check` in a clean checkout if the
   execution environment permits it.
3. Confirm that the run leaves tracked files unchanged.
4. Confirm that the new candidate spellings or D5 claims do not leak into
   authoritative registries, schemas, conformance artifacts, specification clauses,
   generated output, or the reference verifier.

An environment-only failure must be separated from a product failure and reproduced
in a clean checkout before it becomes a finding.

### B. Attack the readiness record and governance boundary

Try in-memory mutations of `evidence-readiness.json` and its validator. At minimum,
attempt to make the validator accept:

- `closure: complete` without a complete evidence bundle;
- non-null supported-domain or tolerance claims;
- a supported df/value/statistic bound;
- cross-runtime square-root bit identity;
- cross-library agreement as an oracle;
- zero as the value of a positive mathematical tail;
- an issued or authoritative state; and
- a certificate-validator path different from the declared candidate validator.

Check that documentation, JSON state, code, and tests agree about what has and has
not been approved. Look specifically for language that silently upgrades
“approved for candidate development” into final R2-D5 approval.

### C. Attack the G4 algebraic candidate

Inspect `reference/spikes/paired-t.ts` and its tests against the P1-A mathematical
target and the supplied binary64 investigation. Construct counterexamples covering:

- canonical pair ordering and pairwise-tree shape;
- odd and non-power-of-two pair counts;
- finite input subtraction overflow;
- unequal exact dyadic differences that round to one binary64 value;
- exact equal-difference zero variance versus variance erased by rounding;
- centering, squaring, accumulation, division, square-root, and later-intermediate
  overflow or underflow;
- signed zero and subnormal inputs;
- non-finite inputs and runtime-only type violations; and
- whether FMA or an implicit left fold can accidentally replace the declared graph.

The exact dyadic mathematical difference and the one-step binary64 difference must
remain distinct. Check for both false success and false refusal. Do not require p
values, confidence intervals, tolerances, or support bounds from this feasibility
spike.

### D. Attack the certificate-bundle validator

Treat every certificate field as hostile input. Demonstrate whether the structural
validator can be made to accept a semantically false certificate. At minimum test:

- malformed, non-reduced, signed, zero-denominator, and extremely large rationals;
- reversed, empty, or touching enclosure and rounding-cell intervals;
- an enclosure that overlaps but is not strictly contained in its rounding cell;
- a fabricated secondary-path overlap;
- a declared df=1/df=2 closed-form path that was not actually executed;
- missing or duplicated required boundary cases;
- non-increasing precision history, repeated precision, inconsistent result history,
  or a precision ceiling lower than an attempted precision;
- critical-value midpoint order reversal, gaps, equality instead of strict
  bracketing, wrong tail target, or wrong rounding cell;
- table cells with duplicate/missing df or inconsistent ordering;
- provenance hashes with correct syntax but no binding to the supplied files;
- generator path traversal, absent files, environment drift, and dependency omission;
  and
- JSON values that exploit JavaScript number coercion, `-0`, unsafe integers,
  Unicode lookalikes, or object-key ambiguity.

Distinguish clearly between:

1. what this validator promises to verify now;
2. what a later evidence runner or manifest verifier must verify; and
3. what is intentionally still open.

A finding is warranted when the present code claims to check something but does not,
or when a false certificate can satisfy the present acceptance contract. The mere
absence of the future complete Arb bundle is not itself a defect.

### E. Attack the tests

Determine whether the tests independently establish the claimed properties or only
repeat constants and helper behavior from the implementation. For every successful
attack above, add a minimal standalone probe in the review environment and report
the exact observed result. Pay particular attention to:

- self-fulfilling interval-overlap flags;
- validation of labels without evidence;
- mutation tests that fail for an unintended reason;
- unchecked cross-artifact bindings; and
- branches that are unreachable from the public validator entry point.

### F. Check fidelity to the supplied investigations

Verify only the claims actually carried into the candidate. In particular:

- `2 * (1 - CDF)` must not be endorsed for deep tails;
- intermediate overflow and representational underflow must not be conflated;
- a positive mathematical p value must not silently become an accepted zero;
- support must not be represented by one rectangular `|t|` bound;
- SciPy/R/Boost agreement must not be treated as independent oracle evidence;
- Arb exact-rational enclosure and the method-distinct secondary path must remain
  separate; and
- zero table-lookup reproduction error must remain separate from critical-value
  truth error of at most half an ULP after correct-rounding certification.

Do not re-adjudicate the literature or demand new broad research unless a specific
candidate decision lacks evidence. If targeted external research is necessary,
state the exact question and why the supplied evidence cannot answer it.

## Severity and decision rules

- **BLOCKER**: false authority/support claim, Release 1 regression, a false
  certificate accepted within the validator's stated contract, or a fundamental
  contradiction in the selected G4 graph.
- **SHOULD-FIX**: a reproducible guardrail gap likely to make later evidence appear
  complete incorrectly, or a material mismatch between documentation, data, code,
  and tests.
- **NICE-TO-HAVE**: localized clarity or defense-in-depth improvement with no current
  false acceptance or misleading decision effect.

Verdict:

- **GO** means the candidate may remain in PR #27 and evidence generation may begin.
- **NO-GO** means evidence generation should pause until listed BLOCKER findings are
  repaired.

Do not recommend restarting the public review window for test, validator, evidence,
or editorial fixes that do not change the RFC's semantic scope. If a finding would
change semantic scope, say so explicitly.

## Required report format

1. **Verdict** — GO or NO-GO.
2. **Findings** — ordered by severity. For each finding include:
   - title and severity;
   - exact file/function/field;
   - minimal reproducer;
   - actual versus expected result;
   - why it violates the candidate's stated purpose;
   - smallest sufficient repair;
   - whether it changes RFC semantic scope; and
   - whether the public review window must restart.
3. **Closure table** — readiness/governance boundary, G4 algebra, failure
   classification, p-value certificate validation, critical-value certificate
   validation, provenance binding, test quality, authority stop boundary, and
   Release 1 invariance.
4. **Reproduced checks** — exact commands, versions, probe counts, and outcomes.
5. **Scope classification** — candidate defects versus evidence work already marked
   open versus matters reserved for final R2-D5 ratification.
6. **Confirmed non-findings** — important attacked boundaries that held.
7. **Targeted research request**, only if indispensable. Give a standalone research
   question; otherwise state “none.”

End by confirming whether the review workspace remained clean and whether temporary
probes were removed.
