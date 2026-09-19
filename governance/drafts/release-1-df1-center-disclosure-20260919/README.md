# Release 1 df=1 centre-precision disclosure: bounded steward question

Status: **DRAFT DECISION REQUEST; NOT A PUBLICATION.** This packet prepares a
bounded question for the steward about disclosing a known numerical defect in
the published Release 1 reference verifier. It publishes nothing, changes no
Protocol meaning, alters no registry, gate, bundle or signed release artifact,
and does not by itself constitute an erratum.

Prepared 2026-09-19 UTC against Protocol `main` at
`cbf65da86519359ef6e39a738ccf44bb18ae62cb`.

## What was observed

The published Release 1 reference verifier evaluates the Student-t CDF by
delegating directly to the pinned `@stdlib/stats-base-dists-t-cdf` dependency,
with no special handling at one degree of freedom
(`reference/stats-kernel/src/t-distribution.ts` at tag `release-1`). Near the
distribution centre at `df = 1` that path loses all representable precision: it
returns exactly `0.5`, so the two-sided p-value becomes exactly `1`.

Verifier commit `731d5a4fcd3ee67f7690d8087948e44239cbb165`, consumed into
Protocol `main` by PR #351 (`0536b66`), corrects this by evaluating the exact
Cauchy form for `|t| <= 1`. The correction is recorded in
[`evidence/development/student-t-df1-center-reference-intake.md`](../../../evidence/development/student-t-df1-center-reference-intake.md).

### Reproduction

Independent analytic oracle: for one degree of freedom the Student-t
distribution is the standard Cauchy distribution, so `F(t; 1) = 1/2 + atan(t)/pi`
exactly.

| Quantity at `t = 7.45e-9`, `df = 1` | Published Release 1 | Corrected `main`     | Exact Cauchy identity |
| ----------------------------------- | ------------------- | -------------------- | --------------------- |
| `F(t; 1)`                           | `0.5`               | `0.5000000023714086` | `0.5000000023714086`  |
| two-sided p                         | `1`                 | `0.9999999952571827` | `0.9999999952571827`  |

Relative error of the published result: `4.74e-9`, about 47 times the
`p_value` relative tolerance of `1e-10` that check version
`urn:nomue:check:welch-recompute:0.2.1-draft.1` declares in
`registries/public-checks.yaml`.

### The affected region is inside the supported slice

`df = 1` is reachable within the published ITGC support boundary. Two
observations per group satisfies conformance; `welch-computability` requires
only finite degrees of freedom and a positive standard error. When one group
has zero sample variance the Welch-Satterthwaite denominator reduces to the
other group's term and `df` is exactly `1`. Conformance fixtures
`A2-1-V-004` and `A2-1-P-005` now pin this region; before them the lowest `df`
anywhere in the fixture corpus was `1.4705882352941178`.

## Why this needs a steward decision rather than a silent fix

The defect changes scoped verification outcomes in **both** directions for
Records in the affected region, under the same published bundle identifier
`urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1` and the same published check
identifier:

| Declared `p_value`                            | Published Release 1 verifier | Corrected verifier                    |
| --------------------------------------------- | ---------------------------- | ------------------------------------- |
| `1` (the quantized, incorrect value)          | **pass** - false accept      | fail (`NRS-DECLARED-RESULT-MISMATCH`) |
| `0.9999999952571827` (mathematically correct) | **fail** - false reject      | pass                                  |

The false-reject direction is the one that reaches a third party first: a
producer who computes the p-value correctly is told by the published verifier
that its Record does not verify.

Under the authority model this is an implementation defect, not a
specification defect. The normative p-value definition is mathematical
(`NRS-PROFILE-ITGC-0011`), the reference verifier is non-authoritative, and
`AUTHORITY.md` already states that reference code may expose bugs. No public
check behaviour or tolerance changed, so no check-version change is implied
and none is proposed here. What is at stake is disclosure, not renumbering.

The Charter's Release 1 purpose rests on scoped, offline, independent
verification being practical. A relying party running the published, signed
artifact currently gets a wrong scoped answer in a reachable region, and
nothing in the published material says so. The repository has no errata
surface today.

## Bounded question for the steward

1. **Should a user-facing erratum be published for Release 1 covering this
   defect?** The alternative is to leave the correction recorded only as
   internal implementation-maintenance evidence, which is where it sits now.

2. **If yes, where?** Candidate surfaces, none of which are created by this
   draft:
   - a new `ERRATA.md` at the repository root, linked from `README.md`;
   - a section in `SECURITY.md` (its "Supported release" scope already names
     the Release 1 reference verifier);
   - an annotation on the GitHub Release page for tag `release-1`;
   - a dated record under `evidence/release-1/` only.

3. **What exactly may the erratum assert?** A draft text is proposed below.
   It deliberately does not claim that the published snapshot is withdrawn,
   that any gate is reopened, or that Release 1 is resigned. Confirmation is
   requested that this boundary is the intended one.

4. **Does this require reopening any Release 1 gate?** The assessment here is
   **no**: the signed snapshot, key fingerprint, stored candidate-freeze
   manifest hash and issued registry identifiers are unchanged, and
   `tooling/src/release/release-1-history.ts` passes. Gates R1-01 and R1-08
   concern capability-matrix honesty and independent-oracle control; whether
   a disclosed in-support numerical defect touches either is a steward
   judgement, not an author one.

## Proposed erratum text (for steward review; not published)

> **Release 1 erratum ER-1: Student-t centre precision at one degree of freedom**
>
> The reference verifier distributed with Release 1 computes an incorrect
> two-sided p-value when the Welch-Satterthwaite degrees of freedom equal one
> and the test statistic is near zero. Its Student-t CDF quantizes to `0.5`
> at the distribution centre, producing a p-value of exactly `1` instead of
> the correct value. At `t = 7.45e-9`, `df = 1` the correct two-sided p-value
> is `0.9999999952571827`; Release 1 reports `1`, a relative error of
> `4.74e-9`.
>
> Consequence for `urn:nomue:check:welch-recompute:0.2.1-draft.1`: in this
> region the Release 1 verifier accepts a Record that declares `p = 1`
> incorrectly, and rejects a Record that declares the correct value. All other
> checks, all other regions, the Record semantics, the canonicalization rules
> and the registered identifiers are unaffected.
>
> This is a defect in the non-normative reference implementation, not in the
> specification. The normative p-value is the mathematical definition in
> `NRS-PROFILE-ITGC-0011`; the corrected value is the one the specification
> requires. The published Release 1 snapshot, its signature and its gate
> decisions are unchanged, and no public check version is renumbered.
>
> The correction is available in Protocol `main` and in nomue-verifier
> `731d5a4fcd3ee67f7690d8087948e44239cbb165`. Conformance fixtures
> `A2-1-V-004` (positive) and `A2-1-P-005` (negative) pin the corrected
> behaviour, with the expected value derived from the exact Cauchy identity
> `F(t; 1) = 1/2 + atan(t)/pi` rather than from the reference implementation.

## What this draft already did, and did not do

Done, on the development branch and covered by `pnpm check`:

- added conformance fixtures `A2-1-V-004` and `A2-1-P-005` with hand-authored
  expectations in `conformance/expectations/phase-2a-021-expectations.yaml`;
- derived the positive fixture's declared p-value from the analytic Cauchy
  identity, cross-checked against a pinned binary64 literal, so the fixture
  does not inherit the circularity disclosed in that file's header.

Not done, and reserved to the steward:

- publishing any erratum, on any surface;
- editing `README.md`, `SECURITY.md` or the GitHub Release page;
- any Release 1 gate, signature, snapshot or tag action.

## Independence and process disclosure

Prepared by Claude Opus 5 (configured model identifier `claude-opus-5`; the
serving model for a given turn may differ) running as Claude Code in a remote
Linux container, acting in the author/coordinator role as follow-up to the
2026-09-19 repository audit that identified the conformance-coverage gap. The
same context produced both the audit finding and this packet, so this is not an
independent investigation of its own finding.

Reproduction environment: Node v22.22.2, pnpm 11.7.0, Linux x64, pinned
dependencies via `pnpm install --frozen-lockfile`. The defect and both failure
directions were reproduced against an independent analytic oracle (the exact
Cauchy identity, evaluated through `Math.atan`, which does not share a code
path with the incomplete-beta t-CDF dependency under test), and against the
published Release 1 source at tag `release-1`.

No independent investigator has reviewed this disclosure question, no human
expert review is claimed, and no Research Gate clearance is claimed. An empty
GitHub approval list on any pull request carrying this packet would record only
that no platform approval exists; it would not establish that no human review
occurred.
