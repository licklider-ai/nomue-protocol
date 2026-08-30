# R2-D5 fixed-95 critical-value table candidate — independent adversarial review result

## 1. Verdict

**GO.**

Pull request [#47](https://github.com/licklider-ai/nomue-protocol/pull/47) may be merged as
non-authoritative Release 2 R2-D5 candidate evidence for a contiguous fixed-95 critical-value
table. Zero `BLOCKER` and zero `SHOULD-FIX` findings. One `NICE-TO-HAVE` finding is recorded.

This verdict approves only that merge. Section 15 lists what it deliberately does not approve.

## 2. Exact review target

| Item                       | Value                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| Repository                 | `https://github.com/licklider-ai/nomue-protocol`                                           |
| Pull request               | #47 (state open, draft, mergeable_state clean, 1 commit)                                   |
| Base commit                | `612d0b943e34b55d8bd8cfe284d8dcdfbd3820a2`                                                 |
| Target commit              | `19139d51aad108125ef9854c304c698ce9b15ade`                                                 |
| Target tree                | `e90992e188bf2f8ddbc1ba8f7b895dbaa6de6b87`                                                 |
| CI workflow run            | `33323884790` (conclusion success, attempt 1, head at the target commit)                   |
| Table artifact             | id `9735667748`, `sha256:bebf3e84edcb5e9b5aa63882d80f105e823786aec1dd155334483ca71b1826bd` |
| Pilot artifact             | id `9735667526`, `sha256:932b485e4b6b6938dc712304fa7931f013cee56917ac5c7d39dabe9352523923` |
| Expected ordered-cell hash | `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`                  |
| Review type                | Independent, adversarial; fresh clone at a detached exact-hash checkout                    |

The review used a genuine fresh clone. The implementation branch and implementation files were
not modified; all probes ran outside the repository.

## 3. Identity and diff result

From the fresh clone, `git checkout --detach 19139d51…` was verified with
`git rev-parse HEAD` and `git rev-parse HEAD^{tree}` equal to the pinned commit and tree, and
`git cat-file -p HEAD` shows the parent equal to the pinned base commit.

`git diff --name-status 612d0b94… 19139d51…` returns exactly the ten declared paths — six
modified (`.github/workflows/release2-paired-t-evidence.yml`, the numerical README,
`package.json`, the evidence-tooling README, `generate_certificates.py`, and no others) and four
added (`fixed-95-critical-value-table-candidate.json`,
`generate_critical_value_table_evidence.py`, the dedicated validator, probe, and test file
counted among them). Totals: 10 files, 1,844 insertions, 25 deletions — matching the expected
counts exactly. `git diff --check` across the delta reports no whitespace errors. No unexpected
path, rename, deletion, or mode change is present.

The `package.json` delta adds only the two new evidence script entries. The workflow delta adds
the table generation/validation/probe steps and the second artifact upload, renames the job, and
extends path triggers; it grants no new permissions (`contents: read` unchanged).

## 4. Independent numerical reproduction

All mathematics was re-derived and re-computed with reviewer-owned code, not by calling the
implementation's search or certification functions. Two rigorous routes were used, both
evaluating the two-sided Student-t tail at exact rational points in ball arithmetic with
escalating precision until the ball strictly separates from `1/20`:

- Route A: the regularized incomplete beta function (method-shared with the implementation's
  primary route);
- Route B: the classical finite closed form for integer df in terms of `atan(t/sqrt(df))`
  (a different function family; method-distinct from the implementation's primary and
  quadrature routes).

Every reported inequality below required **both** routes to independently prove the same strict
side. Agreement among ordinary-precision statistics libraries was not used anywhere.

### Search-logic verification

The generator's predicate — "the upper rounding-cell midpoint of this binary64 value lies above
the mathematical quantile", proved via a strict ball comparison of the tail at that midpoint
against `1/20` — was re-derived: the two-sided tail is strictly decreasing in the positive
statistic, upper midpoints are strictly increasing in the ordered-bits index, so the predicate
is monotone false-to-true and the bisection over bit indices returns the first-true cell. Since
adjacent cells share a midpoint (`upper_midpoint(v-1) = lower_midpoint(v)`), the final
re-verification `predicate(candidate) ∧ ¬predicate(candidate − 1)` proves
`lower_midpoint < t* < upper_midpoint` strictly — exactly the correctly rounded binary64 under
roundTiesToEven, with the possible tie case unreachable because a tie would make both strict
ball separations impossible at every precision, and the precision ceiling (4,096 bits) then
fails the run closed. An exhausted escalation raises; no code path treats an unresolved
predicate as success. The initial interval `[1.0, 16.0]` was independently proved a strict
bracket for every df (below). Search traces are pinned deterministically: the bit distance from
`1.0` to `16.0` is `2^54`, so exactly 54 bisection steps and 58 predicate evaluations occur, and
the validator enforces those exact values, the endpoint hexes, the candidate/predecessor
adjacency, and a maximum-precision value from the escalation set not exceeding the ceiling.
Non-finite, negative, zero, subnormal, and non-canonical-hex candidates cannot enter the table:
the certificate core refuses non-`[0-9a-f]{16}` hex and non-positive values, and the validator
independently re-checks hex shape and positivity.

### Results

- **Primary midpoint bracket, all 200 cells:** for every df from 1 through 200, with the exact
  rational rounding-cell midpoints of the candidate recomputed from the hex by reviewer code,
  `tail(cell_lower) > 1/20` and `tail(cell_upper) < 1/20` were strictly proved by both routes —
  **400/400 inequalities, zero failures**. Every cell is therefore the correctly rounded
  binary64 of its true quantile.
- **Search bracket:** `tail(upper_midpoint(1.0)) > 1/20` and `tail(upper_midpoint(16.0)) < 1/20`
  strictly, for every df from 1 through 200 — 400/400.
- **Low-df closed forms, independently re-derived:** for df=1, the quantile is `cot(π/40)`
  (from `2/π · atan(1/t) = 1/20`), whose correctly rounded binary64 is `40296993aacc4d24` —
  equal to the table cell. For df=2, the quantile is `sqrt(722/39)`; the algebraic identity
  `(19/20)^2 · (800/39) = 722/39` was verified exactly, and the correctly rounded binary64 is
  `401135ea98e146bb` — equal to the table cell. Both closed-form enclosures lie strictly inside
  their rounding cells, so they project to the same candidates.
- **Recorded-claim cross-check:** all 400 recorded primary tail enclosures contain the
  independently computed truth; all 396 recorded quadrature test-point enclosures (198 df > 2
  cells × 2 points) contain the truth and bracket `1/20` strictly; all 396 recorded inset test
  points equal the exact rational recomputation; the recorded `candidate_exact` rationals match.
- **Secondary-route algebra:** the analytic tail bound was re-derived — for `x ≥ L`,
  `(1 + x²/df)^-(df+1)/2 ≤ df^((df+1)/2) · x^-(df+1)`, so the one-sided tail beyond `L` is at
  most `C_df · df^((df-1)/2) · L^-df`, and the doubled form matches the implementation's
  `2 · normalizer · exp((df−1)/2 · ln df) · L^-df` exactly. Dropping the tail from the lower
  bound is conservative. The finite-interval doubling stops only when the bound is below the
  ceiling and fails closed after 64 expansions; the quadrature requires its imaginary enclosure
  to contain zero and its final inequalities are strict on both sides. The
  `tail_bound_ceiling = secondary_margin / 4` value is a termination-feasibility device only:
  the final bracket rests on the quadrature's own strict inequalities, which were re-proved in
  ground truth at every recorded test point.
- **Search precision:** all 200 search predicates resolved at 192 bits (histogram: `{192: 200}`),
  all with 54 steps and 58 evaluations; all primary certification escalations completed at
  192 bits.
- **Determinism:** a second full local generation was byte-identical to the first
  (`diff -r` empty), including `MANIFEST.sha256`.

## 5. 200-cell coverage result

From the fresh regeneration at the exact target commit:

- exactly 200 cells; df sequence equals `1, 2, …, 200` with no gap, duplicate, or reorder;
- every cell is lowercase 16-digit binary64 hex, positive and finite;
- the 200 values are **strictly decreasing** in df (verified independently; note the validator
  itself does not enforce cross-df monotonicity — see Finding N1);
- df/hex agree across `raw-evidence.json`, `certificates.json`, and the table manifest for every
  cell; case ids are `critical-df<df>` throughout;
- every per-cell `certificate_sha256`, the `certificate_bundle_sha256`, and the
  `table_content_sha256` were recomputed and match (the repository validator recomputes them
  all; the reviewer's independent rebuild of the same formats agrees byte-for-byte, proved by an
  accepted no-op control in the mutation battery);
- all eight research-seed cells inside the range (df 1, 2, 4, 5, 6, 10, 30, 100) are exactly
  equal to the contiguous candidate's cells; df=1000 is outside the 200-cell table and was
  covered by the pilot regression below;
- secondary-route distribution: df=1 and df=2 by executed closed forms; 197 cells at inset
  divisor 1024; exactly one cell (df=72) at 2048; none above 2048.

## 6. df=72 adaptive-inset result

The adaptive change was verified in ground truth, not from the implementation's own trace:

- With the exact rounding cell of the df=72 candidate and width `w`, the reviewer bisected the
  true quantile's position: it sits at approximately **0.999234** of the cell width above the
  lower midpoint — within `w/1024` of the upper midpoint.
- At divisor 1024 the upper test point `cell_upper − w/1024` (≈ 0.999023 of the width) lies
  **below** the quantile, so `tail(upper_test_point) > 1/20`: the inset bracket genuinely fails
  in exact mathematics, at any precision. The original fixed-`1/1024` code could not certify
  df=72; the repair is necessary, not cosmetic.
- At divisor 2048 the upper test point (≈ 0.999512 of the width) lies above the quantile and
  both strict inequalities hold: the bracket closes, as recorded.
- Direction and ordering: doubling the divisor shrinks the inset, moving both test points toward
  the cell boundaries — the correct direction when the quantile is near a boundary — and since
  the inset is at most `w/1024 < w/2`, the lower test point always stays strictly below the
  upper test point.
- Fail-closed behavior: the loop exits successfully only on a strictly positive margin; if the
  divisor exceeds `2^40` the margin is still non-positive and the generator raises. The margin
  feeds only the tail-bound ceiling; certification soundness rests on the quadrature's own
  strict inequalities re-proved above.
- The recorded divisor closes in ground truth for **all** 198 df > 2 cells (198/198 verified),
  and the validator rejects divisors below 1024, above `2^40`, non-power-of-two, string, float,
  and negative (all six rejected in the reviewer battery).

## 7. Existing pilot regression result

The pilot was regenerated twice: once from the base commit `612d0b94…` (pre-change certificate
core, fixed `1/1024` inset) and once from the target commit. Comparing the two:

- all certificates are identical modulo provenance (which binds different generator bytes and
  commits by design);
- all raw traces are identical modulo the single added `rounding_cell_inset_divisor` field;
- all nine critical-value certificates (df 1, 2, 4, 5, 6, 10, 30, 100, **1000**) are
  semantically unchanged — zero differences beyond provenance;
- the pilot's `table_content_sha256` is identical between base and target generations, and the
  pilot cells are identical;
- in the target-commit pilot, every df > 2 case certifies at divisor 1024 and df=1/2 use the
  executed closed forms — the adaptive change is a strict generalization that alters no pilot
  meaning or proof.

The target-commit pilot bundle also passed the repository pilot validator against the target
commit.

## 8. Ordered-cell hash recomputation

The byte format was rebuilt from scratch by reviewer code (header line, target line, one
`df=<df>;binary64=<hex>` line per cell in df order, `\n` separators, trailing newline) from the
regenerated cells:

```text
sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0
```

This equals the expected review-identity hash and the regenerated manifest's
`table_content_sha256`. The match is evidence identity only; it is not a final table selection,
and the checkpoint's `table_content_hash` correctly remains `null`.

## 9. Artifact and provenance result

**Environmental limitation (recorded, not waived):** this review environment's egress policy
denies the storage host behind GitHub's artifact download redirect, and unauthenticated API
artifact downloads are refused, so the CI zip bytes could not be fetched here. The comparison
was completed through three independent anchors instead:

1. GitHub's artifact API metadata for run `33323884790` reports, for the table artifact
   (id `9735667748`, 291,176 bytes, 10 files) the digest
   `sha256:bebf3e84edcb5e9b5aa63882d80f105e823786aec1dd155334483ca71b1826bd` and for the pilot
   artifact (id `9735667526`, 32,882 bytes, 8 files) the digest
   `sha256:932b485e4b6b6938dc712304fa7931f013cee56917ac5c7d39dabe9352523923` — both equal to the
   pinned expected digests, at the pinned head commit;
2. the CI job log independently prints the same two zip digests at upload time, and every
   generation, validation, and mutation-probe step in that run concluded success on
   `ubuntu-24.04` with Python 3.12.14;
3. the deterministic content was reproduced locally: the fresh regeneration yields the identical
   ordered-cell hash, and the local bundle passes the same validator and 20-probe suite bound to
   the same commit.

Deterministic-by-design values (ordered cells and their hash, raw traces, source copies,
checkpoint bytes, certificate structure, generator commit binding) all agree across the local
regenerations; environment-dependent values (platform strings, environment hash, and hashes
downstream of it: provenance, certificate-bundle hash, MANIFEST lines for those files) are
expected to differ between hosts and are pinned semantically by the validator (CPython 3.12,
python-flint 0.9.0, FLINT 3.6.0, single-threaded). The GitHub archive digest was not confused
with any bundle-internal hash.

Provenance and file bindings in the regenerated bundle are complete: the five copied sources are
byte-bound to the checkout, `source_hashes`, `environment_sha256`, `raw_evidence_sha256`,
per-certificate provenance, per-cell certificate hashes, the certificate-bundle hash, and the
closed `MANIFEST.sha256` file set all verify, and the checked-in checkpoint equals the closed
expected surface byte-for-byte.

## 10. Mutation results

**Repository probe suite:** the bundled probe rejected **20/20** mutations against the fresh
regeneration, with no uncaught exception, and the probe itself refuses to run against an invalid
baseline.

**Reviewer battery:** 70 additional mutations were applied, each followed by a full coherent
rebuild of every derivable hash (source hashes, environment/raw bindings, per-certificate
provenance, per-cell certificate hashes, ordered table hash, certificate-bundle hash, MANIFEST),
so rejections measure semantic checks rather than stale hashes. A no-op control with the
identical rebuild pipeline was **accepted**, proving rebuild fidelity. All 70 mutations were
rejected with structured error lists and exit code 1 — zero uncaught exceptions. By class:

- _Table structure:_ dropped cell, duplicated cell, head/tail reorders, df = 0 / 201 / 1.5 /
  string / boolean, uppercase, short and long hex, NaN, Infinity, negative, negative zero, zero,
  subnormal, and a table-only adjacent-cell swap at seed df=30 — all rejected by index/shape
  checks, not merely hash mismatches.
- _Certificates:_ midpoint inequality forced to `[1/20, 1/20]` (rejected by the exact-rational
  strictness check), lower/upper tail swap, rounding-cell endpoint off by one denominator unit
  (rejected by exact endpoint recomputation from the hex), secondary enclosure moved outside the
  cell, deleted df=1 closed form, fake closed form on df=51, non-increasing and
  ceiling-exceeding precision histories, all six invalid inset-divisor encodings, tampered
  `candidate_exact`, undeclared fields at certificate and trace level, wrong search step count,
  and out-of-set search precision — all rejected semantically after full rehash.
- _Provenance and bundle:_ coherent commit forgery across all four layers, forged generator and
  certificate-core sources with rebuilt hashes (rejected against the checkout bytes), changed
  requirements pin, changed environment FLINT/Python identity, search-proof flag flipped with
  full provenance rehash, malformed JSON, JSON roots of `null`/array/string, a duplicate JSON
  member whose last value promotes support (rejected — last-wins parsing surfaces the promoted
  value to the semantic check), missing file, extra file, symlinked source inside the bundle,
  symlink pointing outside the bundle, and a directory in place of a file — all rejected; the
  directory case is reported as a structured "must be a regular non-symlink file" error rather
  than a crash.

**Hash-only versus semantic rejection:** every reviewer mutation above was rebuilt to full hash
coherence, so none of the rejections is a stale-hash accident; the quoted error for each class
is the semantic or byte-binding check that caught it.

**Documented boundary probe:** one additional reviewer construction — an adjacent-cell forgery
at non-seed df=150 that also rewrites the projection cell endpoints, fabricates canonical
tail-enclosure rationals satisfying the strict inequalities, rewrites the search endpoints,
test points, and `candidate_exact`, and rebuilds every hash — **is accepted** by the TypeScript
validator. This is the inherent boundary of a validator that cannot execute rigorous
arithmetic: recorded enclosures are attestations whose truth is established by regeneration
from the pinned commit (as CI does, validating only the bundle it just generated) and by
independent recomputation (performed here for all 200 cells). The nine seed cells are
additionally pinned byte-for-byte against the checkout. See Finding N1 and Section 14.

Hostile direct invocations (nonexistent directory, a file path as the bundle argument, an empty
directory, all-zero / uppercase / short commit arguments, missing arguments) all return
structured errors with non-zero exit codes and no uncaught exception.

## 11. Authority-boundary result

Promotion attacks were run at all four layers with full coherent rehashing; every one was
rejected:

- checkpoint: `runtime_support_enabled=true`, `final_table_selected=true`,
  `supported_maximum=200`, `independent_review_complete=true`, `table_content_hash` set to the
  generated hash, `prohibited_claims` emptied — all rejected (byte binding against the checkout
  plus the closed checkpoint surface);
- table manifest: `runtime_support_claimed=true`, `final_table_selected=true`,
  `scope=protocol_support`, `supported_degrees_of_freedom_max=200`, undeclared
  `r2_d5_complete` — all rejected by the closed-surface checks;
- certificate bundle: `supported_degrees_of_freedom_max=200`, undeclared `public_check` — both
  rejected;
- raw evidence: `runtime_support_claimed=true` — rejected.

Mechanically, the delta touches no authoritative surface: no path under `registries/`,
`schemas/`, `conformance/`, `reference/`, `spec/`, `authority/`, `bindings/`, `generated/`, or
`evidence/`, and the content-addressed authoritative snapshot hash is byte-identical at the base
and target commits
(`sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`).

Documentation was reviewed for conflation: the READMEs, checkpoint, workflow, and PR description
consistently separate evidence coverage from Protocol support ("evidence-evaluation target, not
contiguous Protocol support"), the generated hash from a final selected hash ("the candidate
checkpoint deliberately leaves its table hash null"; "the contiguous candidate hash remains
evidence-local"), the correctly rounded cell from a confidence-interval truth bound (endpoint
truth explicitly open), mergeability from R2-D5 completion, and candidate artifacts from
authoritative issuance. The checkpoint keeps all six held decisions and all five prohibited
claims; `supported_maximum`, `supported_degrees_of_freedom_max`, and `table_content_hash` remain
null throughout; `independent_review_complete` remains false. RFC issue #25 remains open with
its review window running, and nothing in this delta closes or restarts it.

## 12. Full test result

From the fresh clone at the exact target commit:

- `pnpm install --frozen-lockfile`: success;
- fresh Python 3.12 virtual environment with only the pinned requirement
  (`python-flint==0.9.0`, `--only-binary=:all:`): success;
- pilot generation (3 p-value certificates, 9 critical-value certificates, 6 boundary probes)
  and contiguous table generation (200/200 certificates): success, no uncaught exception;
- `pnpm evidence:r2-paired-t:validate` on the pilot: OK;
- `pnpm evidence:r2-paired-t-critical-value-table:validate` on the table bundle: valid;
- `pnpm evidence:r2-paired-t-critical-value-table:probe`: rejected 20/20;
- `pnpm check`: exit 0 — 37 test files / 388 tests passed, 132 conformance fixtures match,
  registries, traceability, normative lint, authority manifest, links, private-dependency,
  language, and code-path audits clean, generated artifacts drift-free;
- `git status --porcelain` after all of the above: empty;
- the aggregate `pnpm`/`tsx` commands ran without the IPC limitation mentioned in the PR body,
  so no substitution was needed; every check ran through its normal entry point.

| Component        | Version                                                        |
| ---------------- | -------------------------------------------------------------- |
| Node.js          | v22.22.2                                                       |
| pnpm (corepack)  | 11.7.0                                                         |
| Python           | 3.12.3 (CPython)                                               |
| python-flint     | 0.9.0                                                          |
| FLINT            | 3.6.0 (bundled in the pinned wheel; Arb integrated in FLINT 3) |
| Operating system | Ubuntu 24.04.4 LTS, Linux 6.18.44, x86_64                      |

CI ran the same pipeline on `ubuntu-24.04` with CPython 3.12.14; the validator pins the
dependency identity (CPython 3.12, python-flint 0.9.0, FLINT 3.6.0, single-threaded) in every
accepted bundle.

## 13. Findings

```text
ID: N1
Severity: NICE-TO-HAVE
Title: The structural validator's semantic boundary is one sentence away from being
  precisely documented, and cross-df monotonicity is not checked
Affected files:
  tooling/r2-paired-t-evidence/README.md (the sentence "The dedicated validator also
  rejects coherently rehashed promotion, cell, inequality, provenance, source, and
  dependency mutations");
  tooling/src/spikes/validate-paired-t-critical-value-table-evidence.ts
Evidence: A reviewer-constructed forgery of the non-seed df=150 cell to its adjacent
  binary64 value — rewriting the projection cell endpoints exactly, fabricating
  canonical-rational tail enclosures that satisfy the strict inequalities, updating the
  search endpoints, test points, and candidate_exact, and rebuilding every hash — is
  accepted by the TypeScript validator. Every mutation class the README sentence names
  is genuinely rejected (demonstrated by the 20 bundled probes and the reviewer's 70
  rejected mutations), but a reader could take the sentence as a universal claim that
  cell substitutions are always caught. The validator also does not check that the 200
  cells are strictly decreasing in df, which is an exact ordered-bits comparison
  available without rigorous arithmetic (it would catch coarse rewrites, though not
  one-ULP forgeries).
Independent reproduction: Copy a freshly generated bundle; apply the df=150 rewrite
  described above with canonical fractions; recompute source, environment, raw,
  provenance, certificate, table, and MANIFEST hashes in the generator's byte formats;
  run the dedicated validator with the exact target commit. It reports the bundle as
  valid. A no-op control through the identical rebuild pipeline is also accepted,
  isolating the acceptance to the fabricated content rather than the rebuild.
Why it matters: The mathematical truth of a bundle rests on regeneration from the
  pinned commit and on independent recomputation, not on the TypeScript validator
  alone. That is the design (CI validates only the bundle it just generated, the nine
  seed cells are byte-pinned, and the README already states that independent review of
  the generated artifact is still required), but the boundary deserves one explicit
  sentence so no later consumer treats standalone validation of an externally supplied
  bundle as proof of cell correctness.
Required repair (smallest sufficient): Add one clarifying sentence to the tooling
  README stating that the validator proves byte binding, structure, authority posture,
  and internal exact-rational consistency of recorded claims, and that cell-level
  mathematical truth is established only by regeneration and independent review.
  Optionally add a strict cross-df monotonicity check over the 200 cells to the
  validator as cheap hardening.
Retest conditions: README sentence present; if the monotonicity check is added, a
  shuffled-cell bundle with full rehash must be rejected by that check and the 20-probe
  suite must still pass.
```

No `BLOCKER` findings. No `SHOULD-FIX` findings.

## 14. Residual limitations

- **Shared ball-arithmetic library.** The implementation's primary route, quadrature route, and
  low-df closed forms all execute in the same Arb/FLINT library, and this review's route A
  shares that method family. The review's route B (finite trigonometric closed form) is
  function-family-distinct but still evaluated in the same library. Method distinctness is
  real; complete independence from a shared library defect is **not** established, and this GO
  explicitly does not claim it. A future platform/toolchain matrix decision should treat
  library-level independence as an open question.
- **Validator semantic boundary.** As Finding N1 records, standalone TypeScript validation of an
  externally supplied bundle proves binding, structure, authority posture, and consistency of
  recorded claims — not cell-level mathematical truth. Truth is carried by regeneration at the
  pinned commit plus independent recomputation, both performed in this review.
- **CI zip bytes.** The CI archive bytes were not re-hashed locally (egress policy); identity
  rests on GitHub's API-reported digests, the upload-step log lines, and full local
  reproduction of every deterministic value, as detailed in Section 9.
- **Finite evidence.** The 200-cell verification is exhaustive for the declared evaluation
  range but is evidence about those 200 inputs only; it implies nothing about any other df, any
  other confidence level, or confidence-interval endpoint truth.

## 15. Explicitly unapproved claims

This GO does not approve, and nothing in the reviewed delta claims:

- final critical-value table selection;
- adoption of any final table content hash (the evidence-local ordered-cell hash match is
  identity confirmation only);
- Protocol support for `df = 1..200`;
- any supported df maximum;
- runtime support activation;
- confidence-interval endpoint truth-error closure;
- a supported platform matrix;
- issuance of any Public Check or bundle;
- R2-D5 completion;
- Release 2 publication.

RFC issue #25's public discussion and final decision remain open and unaffected.

## 16. Recommended next action

Merge PR #47 as non-authoritative candidate evidence. Keep the checkpoint's
`independent_review_complete` false until the steward records this review's disposition through
the repository's own process; the one `NICE-TO-HAVE` documentation sentence (and optional
monotonicity hardening) can ride any later increment. Final table selection, a selected content
hash, supported df, endpoint truth, platform matrix, and issuance remain for later, separately
reviewed decisions inside the open RFC #25 window.

## Provenance

- Contributor role: independent adversarial reviewer, separate from the implementation author.
- Review scope: PR #47, delta `612d0b943e34b55d8bd8cfe284d8dcdfbd3820a2` →
  `19139d51aad108125ef9854c304c698ce9b15ade` (tree
  `e90992e188bf2f8ddbc1ba8f7b895dbaa6de6b87`), plus the unchanged certificate-candidate
  validator module, pilot case manifest, and prior pilot behavior as dependencies.
- Independence boundary: all quantile and tail computations, cell-midpoint arithmetic, hash
  reconstructions, the mutation battery, and the pilot comparison were produced from
  reviewer-owned code without calling the implementation's search or certification functions;
  no ordinary-precision statistics library served as an oracle; the implementation's recorded
  traces were treated as claims to verify, not as evidence.
- Inspected sources: the ten changed paths; `tooling/src/spikes/paired-t-certificate-candidate.ts`;
  `tooling/r2-paired-t-evidence/cases.json`; CI run `33323884790` metadata, job steps, and logs;
  PR #47 metadata; RFC issue #25 state.
- Authoritative snapshot hash, unchanged across the delta:
  `sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`.
- Date: 2026-08-30.
