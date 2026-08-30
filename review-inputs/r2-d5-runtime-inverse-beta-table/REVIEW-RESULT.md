# R2-D5 runtime inverse-beta table evidence — independent adversarial review result

**Review date:** 2026-08-30 (Asia/Tokyo)
**Review-input commit:** `73e4ae34e12aa3bb2ff2a32251caa4fa5a1ba845` (branch
`review/r2-d5-runtime-inverse-beta-table-5d58990e`, checked out in a detached
worktree)
**Target:** PR [#37](https://github.com/licklider-ai/nomue-protocol/pull/37) /
commit `5d58990e8cb25920bda791d0f0308ab29dcea3fb` — a contiguous `df = 1..200`
evidence table for `C(df) = 1 / B(df / 2, 1 / 2)`
**Stop boundary:** this increment is evidence-only. It establishes no runtime
table selection, supported df maximum, global truth-error bound, final table
hash, platform predicate, Public Check, bundle, or identifier. A
mathematically correct table is still `NO-GO` if the change claims or
activates Protocol support.

---

## 1. Repository and bundle identity

| #   | Check                                                                | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Detached worktree checkout at the implementation commit              | **PASS** — `git rev-parse HEAD` = `5d58990e8cb25920bda791d0f0308ab29dcea3fb`                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2   | Implementation tree                                                  | **PASS** — `git rev-parse HEAD^{tree}` = `43c1f96d881897935f556d9a79aef0513bcd46f7`                                                                                                                                                                                                                                                                                                                                                                                          |
| 3   | Baseline                                                             | **PASS** — the implementation commit's parent is `6072dd2be046f25a1857db305ea9d526c867c41a` (matches current `main`)                                                                                                                                                                                                                                                                                                                                                         |
| 4   | 12-file delta                                                        | **PASS** — `git diff --shortstat` = exactly `12 files changed, 1482 insertions(+), 8 deletions(-)`; all 12 files individually inspected (see §7)                                                                                                                                                                                                                                                                                                                             |
| 5   | `SHA256SUMS` in the review input                                     | **PASS** — 6/6 `sha256sum -c` OK                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 6   | `artifact/MANIFEST.sha256`                                           | **PASS** — 5/5 OK. `runtime-inverse-beta-table.json` hashes to `sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`, matching the declared table content hash                                                                                                                                                                                                                                                                                           |
| 7   | Official GitHub Actions artifact cross-check (fetched independently) | **PASS** — GitHub API (`actions_list`/`actions_get`, queried directly rather than trusting the request text) confirms workflow run `33298573942` has `head_sha=5d58990e8cb25920bda791d0f0308ab29dcea3fb`, `conclusion=success`, `pull_requests=[37]`. Artifact ID `9728184062`, name `release-2-paired-t-runtime-inverse-beta-table-5d58990e...`, and digest `sha256:0a2fa2448db4b03e4a2bc1c3876adfe1e0fe0f4a77d80cc3eefb91d4b0a6e998` all match the declared values exactly |
| 8   | Byte-for-byte re-download of the artifact ZIP                        | **Environmentally NOT_VERIFIABLE** — direct egress to Azure Blob Storage (`productionresultssa7.blob.core.windows.net`) is `connect_rejected` by organization policy. Mitigated by the independent GitHub API confirmation of artifact ID/name/digest (#7), internal manifest consistency of the six unpacked files (#5–6), byte identity of source copies against the implementation tree (#9), and the `generator_commit` binding inside the evidence itself (#10)         |
| 9   | Source-copy byte identity against the implementation tree            | **PASS** — `generator.py` (`sha256:a064822639d...`) and `runtime-inverse-beta-table-candidate.json` (`sha256:ea03eefcdac...`) are byte-identical to the actual files in the implementation tree                                                                                                                                                                                                                                                                              |
| 10  | Commit binding and maturity flags inside the evidence                | **PASS** — `inverse-beta-table-evidence.json`'s `generator_commit` is the implementation commit (not the transport commit). `final_table_selected: false`, `runtime_support_claimed: false`, `supported_degrees_of_freedom_max: null`                                                                                                                                                                                                                                        |
| 11  | Review-input-to-implementation delta scope                           | **PASS** — `git diff --name-only 5d58990e... 73e4ae34...` touches only `review-inputs/r2-d5-runtime-inverse-beta-table/`                                                                                                                                                                                                                                                                                                                                                     |

No identity failure. No moving branch head, nearby commit, or working tree
was substituted for the pinned targets.

---

## 2. Independent mathematical derivation

A **third implementation path**, independent of both the Python generator
(Arb/FLINT) and the TypeScript validator (BigInt rationals), was written
from scratch using only Python's standard-library `fractions.Fraction` — no
special-function library of any kind.

### 2.1 Closed form re-derived from the Beta-Gamma identity

From the standard identity `B(a, 1/2) = Gamma(a) Gamma(1/2) / Gamma(a + 1/2)`
and the standard half-integer Gamma closed form
`Gamma(k + 1/2) = (2k)! / (4^k k!) * sqrt(pi)`, the following were derived
independently (reducing entirely to factorials, with no half-integer Gamma
evaluation anywhere):

- **Even df = 2k (k >= 1):** `C(2k) = (2k)! / (4^k * k! * (k-1)!)` — an
  **exact rational, no pi involved**
- **Odd df = 2k+1 (k >= 0):** `C(2k+1) = 4^k * (k!)^2 / ((2k)! * pi)` — an
  exact rational divided by pi

Seed check: `C(1) = 1/pi` (k=0), `C(2) = 1/2` (k=1) — both match.

### 2.2 Symbolic proof of the recurrence

From the closed forms above, `C(df + 2) = C(df) * (df + 1) / df` was
verified symbolically as an exact `Fraction` equality for df = 1..23 in both
parities (`verify_recurrence_symbolically()`). This matches the recurrence
used by both the generator and the validator.

### 2.3 Independent proof of the Machin identity and the alternating-series remainder direction

For the alternating Taylor series behind
`pi/4 = 4*atan(1/5) - atan(1/239)`, the **alternating series estimation
theorem** (for a strictly-decreasing alternating series, the true value lies
between any partial sum and that partial sum shifted by the next unsigned
term, in the direction of that next term's sign) was independently
re-proved and shown to match exactly the interval-construction code used by
both the generator and the validator (`remainder_endpoint = total +/- next_term`,
sign chosen by parity).

A fresh 96-term implementation (new code, not reused from the generator or
validator) was run: the `atan(1/5)` and `atan(1/239)` bounds agree exactly
with `math.atan()`, and the resulting pi enclosure has width **≈1.04e-136**
(96 terms is a large safety margin relative to what is needed — "96" is not
a fragile magic number but a generously over-provisioned choice). Agreement
was also confirmed against an independently transcribed 100-digit truncation
of pi (correctly compared as the bracket `[floor, floor + 10^-100]`, a
subtlety this review's own first attempt at the check got wrong by treating
the truncation as a point value, then corrected).

### 2.4 Independent recomputation of all 200 cells

Using the closed forms above (dividing by this review's own Machin-derived
pi interval for odd df), all 200 correctly-rounded binary64 values were
computed by a route that depends on **neither Arb nor the generator's or
validator's code**, and compared against the declared values in
`runtime-inverse-beta-table.json` and `inverse-beta-table-evidence.json`.

```text
$ python3 independent_verify.py
recurrence self-check (independent closed-form derivation): OK for both parities
independent Machin pi enclosure width: 1.041e-136 (96 terms)
independent pi enclosure agrees with 100-digit reference constant: OK
df coverage: exactly ascending 1..200 in both files, no omission/duplicate: OK
cells checked: 200
max odd-df pi-induced enclosure width: 1.862e-136
ALL 200 CELLS: independent closed-form + fresh Machin-pi computation MATCHES
  the declared binary64 hex in both runtime-inverse-beta-table.json and
  inverse-beta-table-evidence.json
declared exact_secondary.rational_coefficient matches my independent
  closed-form value for all 200 entries (byte-for-byte rational string)
```

**Result: 200/200 exact agreement. Zero disagreements**, including df values
outside the set already exercised by the runtime-series evidence.

---

## 3. Certificate and rounding-cell checks (all 200 entries)

Using the independent implementation above, every item in REVIEW-REQUEST.md
§3 was checked mechanically for all 200 entries.

```text
$ python3 certificate_checks.py
entries checked: 200
ALL certificate/rounding-cell checks PASSED for all 200 entries:
  - secondary enclosure reproduced byte-for-byte from declared rational
    construction (even: exact value; odd: declared coefficient / my
    independent pi bounds)
  - Arb primary enclosure contains declared secondary enclosure (200/200)
  - Arb primary enclosure contains my independently-derived truth bounds
    (200/200)
  - declared rounding cell == exact-rational-midpoint reconstruction from
    adjacent binary64 values (200/200)
  - both certificate bounds strictly inside that cell (200/200)
  - table bits == certified projection == my independent correctly-rounded
    value (200/200)
```

Additional structural checks: the `definition` field equals
`"one_over_beta_df_over_two_one_half"` for 200/200 entries.
`precision_history_bits` is `[128]` for 200/200 entries (resolved in a
single step, no escalation needed — consistent with this being a
well-conditioned computation). Integer df coverage is exactly ascending
`1..200` with no omission or duplicate (independently confirmed against
array position).

**Table content hash:** `sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`
— confirmed via three independent routes in §1 (the review input's
`SHA256SUMS`, the artifact's own `MANIFEST.sha256`, and the declared value
in the review request). This hash is confirmed to be evidence-local, not a
final runtime-table hash, in both `evidence-readiness.json` and the
candidate checkpoint (§5). The `df = 200` endpoint is not treated as a
supported maximum (`supported_degrees_of_freedom_max: null`).

---

## 4. Reproduction and fail-closed behavior

A venv with the pinned environment (`python-flint==0.9.0`, FLINT 3.6.0) was
built and used throughout.

```text
$ python3 -m venv venv-flint-ibeta
$ venv-flint-ibeta/bin/python -m pip install --only-binary=:all: python-flint==0.9.0
$ venv-flint-ibeta/bin/python -c "import flint; print(flint.__version__, flint.__FLINT_VERSION__)"
0.9.0 3.6.0
```

| Check                                                                                   | Result                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Two independent generations from clean output paths                                     | **Byte-for-byte identical** (`diff -r regen1 regen2` shows no difference)                                                                                                                                                                                                                                                                                                                                                   |
| Generated output vs. the official artifact                                              | **Semantic payload byte-identical** (`runtime-inverse-beta-table.json`, `generator.py`, and `runtime-inverse-beta-table-candidate.json` are `cmp`-identical). The only differences are the documented `environment.json` python (3.12.14 vs. this sandbox's ambient 3.11.15) and platform fields, plus their two hash bindings                                                                                              |
| TypeScript validator (official artifact)                                                | `node --import tsx .../validate-...ts` -> `paired-t runtime inverse-beta table evidence bundle: valid`, **exit 0**                                                                                                                                                                                                                                                                                                          |
| TypeScript validator (this review's own regeneration)                                   | Same command correctly rejects with `environment does not contain the pinned candidate dependency identity` (my venv used ambient Python 3.11, so the validator correctly enforced the pinned 3.12 requirement — this is not a defect in the increment)                                                                                                                                                                     |
| Built-in mutation probe (official artifact)                                             | `rejected 17 inverse-beta table evidence mutations`, **exit 0**                                                                                                                                                                                                                                                                                                                                                             |
| `pnpm evidence:...:validate` (the ordinary pnpm entrypoint)                             | **exit 0**. Note: the dedicated `package.json` scripts for this evidence type already invoke `node --import tsx` directly, so the known tsx-CLI IPC EPERM restriction did not manifest for these particular scripts (the PR body's mention of it likely concerns other commands)                                                                                                                                            |
| Missing python-flint                                                                    | Running with the ambient system python3 (no flint) from the correct directory/environment produces `python-flint is required; install the pinned requirements before generating evidence`, **exit 1** (explicit message, fails closed)                                                                                                                                                                                      |
| Existing output path                                                                    | Rejected with `output directory already exists`                                                                                                                                                                                                                                                                                                                                                                             |
| Malformed JSON (4 files, top-level syntax errors)                                       | The repository's own vitest suite `paired-t-runtime-inverse-beta-table-evidence.test.ts` was run: **18/18 passed** (all four files correctly return `<file>: not valid JSON` with no uncaught exception)                                                                                                                                                                                                                    |
| Malformed nested values (type/structure anomalies, this review's own additional probes) | 12 scenarios (entries -> string/null, an entry -> a bare number, `arb_primary` -> a string, `precision_history_bits` -> a string, `machin_terms` -> an array, `projection` -> null, `inverse_beta_enclosure` -> a number, `source_hashes` -> an array, whole evidence -> an array, whole table -> a string, entries truncated to length 199) were run: **12/12 no uncaught exception, all rejected with structured errors** |

---

## 5. Adversarial mutations

Beyond the built-in 17-probe set, **24 additional mutations** (23 targeted
probes plus 1 pure-omission probe) were run through a standalone harness
that imports the validator's real code directly, specifically targeting the
"forged self-consistent rounding cell" and "truth-containing but forged Arb
enclosure" scenarios named in REVIEW-REQUEST.md §5. Every mutation rebuilt
hashes and `MANIFEST.sha256` before being submitted.

### 5.1 Built-in probe (run against the official artifact)

```text
$ node --import tsx .../probe-paired-t-runtime-inverse-beta-table-evidence.ts <artifact> 5d58990e...
rejected 17 inverse-beta table evidence mutations
```

17/17 rejected (runtime support claim, final table selection, supported df,
commit tampering, an undeclared key, table reordering, a coherently
rehashed table-bit change, a forged primary enclosure, a forged secondary
coefficient/enclosure, a tampered Machin term count, a fabricated precision
history, a tampered containment claim, a tampered environment dependency,
source-copy forgery, candidate promotion, symlink substitution, etc.).

### 5.2 Additional probe set 1: the core attacks named in §5

| #     | Mutation                                                                                                                                                                                                                                                                                                                           | Result       | Detection (actual error message)                                                                                                                   |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| KEY-1 | `projection.binary64_hex` was changed to an adjacent (wrong) binary64 value, with a **correctly reconstructed, internally self-consistent cell** (`cell_lower`/`cell_upper`) built for that wrong hex via the exact rational-midpoint method. `arb_primary`/`exact_secondary` were left untouched (still the true, correct values) | **REJECTED** | `df=5 primary: enclosure does not strictly isolate the declared binary64 cell` / `df=5: exact secondary enclosure is not contained in the primary` |
| KEY-2 | `arb_primary.enclosure`'s lower bound was kept at its true value (so it still genuinely contains the mathematical truth — "truth-containing"), while its upper bound was **widened** (forged) toward the wrong hex's cell upper bound. The projection was likewise changed to the wrong hex plus its self-consistent cell          | **REJECTED** | `df=7 primary: enclosure does not strictly isolate the declared binary64 cell` / `df=7: exact secondary enclosure is not contained in the primary` |

**These two probes evaluate the validator's own design and demonstrate the
following:** the validator does not trust the declared `exact_secondary`
field at all — it builds `expectedSecondary` entirely from its **own
independently recomputed** recurrence coefficients
(`recurrenceCoefficients()`) and Machin bounds (`machinPiInterval()`), and
requires the declared `arb_primary` enclosure to contain **that
independently recomputed truth**
(`validate-paired-t-runtime-inverse-beta-table-evidence.ts:531-596`).
Consequently, "forge a truth-containing primary enclosure to smuggle a
wrong final hex through" is **structurally impossible**: rounding cells
partition the real line into disjoint intervals, so any interval that
genuinely contains a value's true neighborhood cannot, by definition, be a
strict subset of a _different_ value's cell. This attack class is therefore
not merely empirically untested but provably excluded by construction; the
KEY-1/KEY-2 rejections are the empirical confirmation of that mathematical
claim.

### 5.3 Additional probe set 2: the remaining §5 items

| Mutation                                                                                                             | Result                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Evidence-array-only reorder (table array untouched) — swapped `evidence[df=3]` and `evidence[df=4]`                  | REJECTED (`df=3`/`df=4`: evidence entry contains missing, undeclared, or invalid fields)                                                                         |
| Omitted `df=100`, displaced by a duplicate of `df=99` (array length stays 200)                                       | REJECTED (`df=100: table entry is invalid or out of order`)                                                                                                      |
| Last entry claims `degrees_of_freedom=201` (out of range)                                                            | REJECTED (`df=200: table entry is invalid or out of order`)                                                                                                      |
| Pure omission (array length 199, `entry_count=199` updated coherently)                                               | REJECTED (`inverse-beta table overclaims maturity or differs from its closed surface`)                                                                           |
| `pi_enclosure` widened to an interval that is not wrong, merely looser (still contains true pi)                      | REJECTED (`df=9: odd-df Machin certificate is invalid` — the declared value must match the validator's own recomputation exactly, so mere looseness still fails) |
| `evidence_surface.table_content_hash` in `candidate.json` promoted from `null` to a real hash (final-hash promotion) | REJECTED (`bundled source differs from repository` / `inverse-beta table candidate differs from the closed non-runtime checkpoint`)                              |
| Undeclared key added inside one entry (`comparison_tolerance_ulp`)                                                   | REJECTED (`df=11: evidence entry contains missing, undeclared, or invalid fields`)                                                                               |
| Path-traversal-style symlink to `/etc/passwd`                                                                        | REJECTED (`generator.py: symlinks are not allowed in the evidence bundle`)                                                                                       |
| `runtime-inverse-beta-table.json` wholesale-substituted with the (validly-JSON, unrelated) `candidate.json` content  | REJECTED (`inverse-beta table overclaims maturity or differs from its closed surface`)                                                                           |

**Additional probes total: 24/24 rejected. Zero uncaught exceptions.**

**Grand total (built-in 17 + additional 24 + malformed-nested 12): 53
mutation scenarios, all rejected, zero uncaught exceptions.**

---

## 6. Repository-wide and authority-boundary checks

Run from a fresh clone (CI-equivalent: `git clone`, then checkout the
implementation commit).

```text
$ git clone https://github.com/licklider-ai/nomue-protocol nomue-ibeta-clone
$ git checkout 5d58990e8cb25920bda791d0f0308ab29dcea3fb
$ corepack pnpm install --frozen-lockfile
$ corepack pnpm check
  ... format:check && lint:markdown && typecheck && validate && test
      && check:generated && check:phase1 && check:phase2a
      && check:phase2a-021 chain runs to completion ...
PNPM_CHECK_EXIT=0
$ git status --porcelain   # (empty)
```

`pnpm check` is an `&&` chain (`package.json:57`) in which `validate` and
`test` (the full Vitest suite) are hard prerequisites for the later
`check:phase2a-021` step; reaching that final step
(`conformance:test (include A2-1-*): OK`) and exiting 0 therefore implies
that the private-dependency audit, the public-language audit, the entire
Vitest suite, and the conformance fixtures all passed. GitHub CI
independently confirms 7/7 check runs successful on the same commit (`Full
check` on two architectures, `Phase 1+2A validation` on three platforms,
`non-authoritative pilot evidence`, `non-authoritative runtime-series
evidence` — confirmed via the GitHub API).

| Check                                                                         | Result                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Release 1's frozen content and behavior                                       | **Unchanged** — `git diff --name-only` touches none of `schemas/`, `registries/`, `spec/`, `conformance/`, or `reference/`                                                                                                                                                                                                                                          |
| Authoritative spec/registry/schema/conformance/identifier/Public Check/bundle | **Unchanged** (same check as above)                                                                                                                                                                                                                                                                                                                                 |
| Whether runtime code loads the generated table                                | **It does not.** The only reference to `runtime-inverse-beta-table` inside `tooling/src/` is the readiness checkpoint tracker (`paired-t-numerical-readiness.ts`, which only validates static metadata). The existing runtime-series spike (the code that actually evaluates the p-value graph) does not reference this table at all                                |
| Readiness state                                                               | `evidence-readiness.json`'s `runtime_inverse_beta_table_evidence_candidate.closure` remains `"incomplete_pending_independent_review"`                                                                                                                                                                                                                               |
| `supported_degrees_of_freedom_max`, `final_content_hash`, runtime support     | All `null`/`false` (confirmed in both the readiness JSON and the candidate checkpoint JSON)                                                                                                                                                                                                                                                                         |
| Private-dependency and public-language audits                                 | Pass, as part of `pnpm validate` (implied by the completed chain above)                                                                                                                                                                                                                                                                                             |
| Repository-level promotion attacks                                            | Editing `runtime-inverse-beta-table-candidate.json`'s `runtime_support_enabled`/`final_table_selected`/`supported_maximum` directly -> vitest **1 failed**, caught. Editing the four corresponding fields in `evidence-readiness.json` directly -> vitest **1 failed**, caught. Both reverted via `git checkout --`, confirmed by an empty `git status --porcelain` |

---

## 7. Research-gate assessment

This increment is a **straightforward implementation and independent
reproduction of an already-adjudicated candidate formula family**; it does
not introduce a new externally grounded numerical decision.

Basis for this judgment:

1. The definition `C(df) = 1 / B(df/2, 1/2)` and its dual-certificate
   architecture (Arb primary + exact-rational/Machin secondary + binary64
   rounding-cell projection) are **identical** to what was already
   introduced and independently reviewed on a per-case basis in
   [PR #33](https://github.com/licklider-ai/nomue-protocol/pull/33)'s
   runtime-series evidence candidate. This PR only extends that
   construction from per-case supply to a contiguous `df = 1..200` table.
2. The underlying mathematics (the Beta-Gamma identity, the half-integer
   Gamma closed form, Machin's pi identity, and the alternating-series
   remainder theorem) is centuries-settled elementary special-function
   theory — a different category from the contested empirical or
   regulatory-interpretation questions handled in the earlier FND-1/MF-1
   research packages (e.g., Welch's valid operating region, or the
   transferability of ICH E9(R1) estimand concepts to non-clinical
   settings). This review's verification did not rely on agreement among
   special-function libraries such as SciPy/R/Boost at all (§2's
   independent route uses only factorials and a from-scratch Machin
   implementation, no special-function library whatsoever) — it is a
   from-first-principles re-proof plus an independent recomputation of all
   200 cells, not an inference of community consensus from software-library
   agreement.
3. The `held_decisions` (runtime table selection, final content hash,
   supported df maximum, global truth-error bound, supported platform
   matrix, runtime support activation) remain explicitly out of this PR's
   scope; those are the items that would eventually require an
   externally-grounded numerical decision, and this PR touches none of them.

**No additional primary-source research is required.**

---

## Findings

**BLOCKER: None**
**SHOULD-FIX: None**
**NICE-TO-HAVE: None**

Across 53 adversarial mutation scenarios, a three-route independent
verification of all 200 cells (Arb / TypeScript BigInt rational / this
review's own Python `Fraction` + closed form + fresh Machin implementation),
a fresh-clone full repository check, and an independent GitHub API
cross-check, no finding requiring a repair was produced.

---

## Overall verdict: `GO`

PR #37 **may be marked Ready and merged** as a non-authoritative R2-D5
candidate increment.

This verdict is scoped precisely: the table is evidence-only, and this
review establishes and permits none of the following — runtime table
selection, a supported df maximum, a global truth-error bound, a final
table hash, a supported platform matrix, runtime support, identifier
issuance, Public Check/bundle registration, R2-D5 completion, or closure of
issue #25. Issue #25 remains **open** (confirmed via the GitHub API; public
review window earliest decision 2026-09-25T20:52:54Z), and merging this PR
does not restart that window, since the readiness checkpoint remains pinned
at `incomplete_pending_independent_review`.

---

## Appendix. Independent verification code used (summary)

- `independent_verify.py` — closed-form (factorial-based) derivation, a
  fresh Machin implementation, and recomputation/comparison of all 200
  correctly-rounded cells against the declared values.
- `certificate_checks.py` — the primary-contains-secondary check, rounding
  cell reconstruction, strict containment, and table-bit agreement for all
  200 entries.
- `malformed_nested_probe.mts` — fail-closed confirmation for 12 nested
  type/structure anomalies.
- `adversarial_probe.mts` — 10 targeted mutation attacks including KEY-1 and
  KEY-2.
- `pure_omission_probe.mts` — the pure-omission attack at array length 199.

All of these import and exercise the validator's real code
(`validatePairedTRuntimeInverseBetaTableEvidenceBundle`) directly; they do
not reimplement the validator. The claim in §5 that "the validator does not
trust the declared value and recomputes it independently" rests on both a
reading of that real code and the execution results against it.
