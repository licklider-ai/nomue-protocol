# Release 3 Numerical Result — Independent Reproduction and Repair Review

**Status: informative review and corrective proposal; non-normative; not adopted.**

## 1. Verdict and scope

**`NO_GO` for intake of PR #174 at `9f39eafd4b0a676e6615956b5a7899f195fc0358`
without the corrections recorded here.** The mandatory incomplete-input posture and
the 49-entry / 50-scope count are correctly repaired. The remaining provenance
obligation and the certification overstatements below require correction.

At that fixed head, one BLOCKER (B-3) and one new SHOULD-FIX (S-2) remain. The original
optional N-1 is not an intake requirement.

This successor proposes a corrected `INPUT_INCOMPLETE` record. It grants no numerical
disposition, source readiness, method adoption, implementation authority, public
opening, merge, or release authorization. No primary-source PDF inspection is claimed.

## 2. Reviewer involvement and independence

The reviewer context did not author the original numerical investigation, its probes,
the first review, or the September 4 repair. It is independent of future Release 3
numerical implementation. Before this task it performed the separate SR-J acceptance
record check and read numerical-review status while answering a release-progress
question. This review is therefore not blind or free of prior familiarity.

The work was performed with AI assistance in the current Codex conversation. No separate
human reviewer, separate agent, or history-free fresh session is asserted. Independence
here concerns authorship of the inspected numerical candidate and its implementation,
not a claim about different model providers. Git metadata identifies the repository
intake actor, rather than proving reviewer independence.

This context authored the parallel replay driver, the present review, and the proposed
record corrections. Their local verification is not an independent review of those new
artifacts. A subsequent intake check can focus on the disclosed changes and their byte
bindings; it must not treat this report as an independent endorsement of its own edits
or repeat the approved SR-J acceptance decision.

## 3. Immutable inputs

| Item                              | Identity                                                        |
| --------------------------------- | --------------------------------------------------------------- |
| Repository                        | `licklider-ai/nomue-protocol`                                   |
| Reviewed PR                       | [#174](https://github.com/licklider-ai/nomue-protocol/pull/174) |
| Reviewed head                     | `9f39eafd4b0a676e6615956b5a7899f195fc0358`                      |
| Reviewed tree                     | `9079e4ff5977f62b2bd275d92ca68a1f7ce3e524`                      |
| Sole parent                       | `0eb388e11c240795282b6b17d7718501757d1e43`                      |
| Reviewed result blob              | `fae44794e35fc57407b73056e4c3bf3c4336b492`                      |
| Parent diff                       | One added result path; 2,684 lines                              |
| Original result commit            | `18563ccf8cb50a7cf1c9d74718b2adf3e2cf0537`                      |
| Original result blob              | `2feb9c9b6b362000e5a46aa985ce19c825e5f7fa`                      |
| Original review commit            | `32e9f3c599eb40e9bd25a33a8595ee07bda6be28`                      |
| Original review blob              | `7a27fe441ad784f1edf1de019240838a0434262d`                      |
| Numerical commission blob         | `5125d5411f398269660a7a3428be733a0fcc6f30`                      |
| Commissioned semantic result blob | `8f21526040924b891f64724c2d0fde9ea94eff92`                      |
| Successor main base               | `0abdca8f822d0de3faf35f218f762a951fd75e9e`                      |
| Successor base tree               | `8b69ad630a8bf6247a9cc3405bbb84d4e3e58d51`                      |

The controlling instruction is [issue #171](https://github.com/licklider-ai/nomue-protocol/issues/171),
the [numerical commission](../../governance/drafts/release-3-preparation/numerical-research-commission.md),
and the successor instructions in the
[original review](../r3-multiplicity-numerical-oracles/REVIEW-RESULT.md).
The [September 6 audit](../../governance/drafts/release-3-preparation/readiness-audit-2026-09-06.md)
correctly identifies the incomplete Probe B replay; it is not itself a reproduction review.

## 4. Finding disposition

| Finding                                      | Independent assessment of the reviewed head                                                                                                                                 | Corrective action in this successor                                                                                       |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| B-1, mandatory source stop                   | Closed within the record-conformance scope: `INPUT_INCOMPLETE` is explicit and no numerical disposition is assigned                                                         | Preserve that posture, all missing numerical-source requirements, and all numerical holds                                 |
| B-2, environment-specific imports and output | Closed for portable reproduction: the absolute paths are removed; G and C-2 use sibling imports and complete successfully                                                   | Reproduce the affected calls in a neutral directory and preserve their actual output                                      |
| B-3, output integrity and regeneration       | Remains open at the reviewed head: 8/8 stored hashes match, but B retains its unreplayed original transcript; C also loses one output byte to formatting                    | Replace every output with newly captured evidence; disclose parallel composition and verify fenced bytes after formatting |
| S-1, scope counts                            | Closed: 49 unique catalogue IDs, 50 scope assignments; only MTO-01 occurs twice                                                                                             | Preserve the classifications and their distinct balanced/grid versus arbitrary-size scopes                                |
| S-2, certificate claims exceed the output    | New SHOULD-FIX: the follow-up table calls the Dunnett bracket certified despite two `UNDECIDED` signs; N-26 infers correct rounding from evaluations at neighbouring values | Withdraw those certification claims and distinguish a value bracket from a rounding-cell certificate                      |
| N-1, generalized neutral-path audit          | Optional; not required for this record                                                                                                                                      | No repository-wide tooling change                                                                                         |

### B-3: stored-byte integrity is not execution provenance

All eight script digests and all eight output digests at the reviewed head match their
fenced bytes, including each final newline. The B output is nevertheless byte-identical
to the original candidate's output. Section 19 admits that only the eleven enclosure
cases, monotonicity checks, and first critical value were rerun in the September 4 repair.
Correcting a digest does not establish execution of the remaining cases.

Probe C's statement `print('=== C1 vs C3 (Arb rigorous) ')` emits a space before the
newline. The reviewed transcript omits that byte. A direct formatting experiment
confirmed that Prettier strips it from an ordinary Markdown text fence. This explains
a concrete way an internally consistent digest can bind a non-verbatim transcript.
The successor protects that one raw output fence from whitespace formatting and checks
the final rendered-source bytes against the captured transcript.
The reviewed Appendix B already disclosed the formatter's removal of line-end spaces;
the problem is its simultaneous verbatim-output claim, not an undisclosed path leak.

### S-2: certification requires the claimed boundaries to be decided

Both displayed C3 evaluations around `2.568338876031627` report `UNDECIDED` against
`0.95`. Section 6.1 therefore cannot say a Dunnett bracket was certified. The correction
reports the unresolved signs and leaves the existing numerical hold in force.

For the `k = 2`, `nu = 10` range constant, the B script evaluates the lower neighbour,
the nearest candidate, and the upper neighbour. It does not evaluate the exact
rounding-cell midpoints. A sign change between neighbouring values brackets a root;
it does not by itself prove the nearest binary64 rounding cell. N-26 is narrowed to
the bracket actually demonstrated. The analogous description of the F-quantile
experiment is clarified without changing any evaluated number or algorithm.

Two nearby transcription details are also corrected: the displayed normal-range
integral conditions on the maximum, and B's eleven cases include `q = 20`.
No new primary-source or global mathematical claim is inferred from these edits.

## 5. Reproduction method and environment

The eight Appendix A scripts were extracted byte-for-byte and parsed before execution.
They import no repository numerical implementation. Five scripts (A, C-2, D, E, F)
completed as unmodified serial programs. G was restarted after the scheduling change
and is separately captured. Initial incomplete B/C serial attempts are not completion
evidence and their partial output is not substituted for the final replay.

The [parallel driver](parallel_replay.py) replays B and C in 41 independent tasks.
It retains their function definitions, initial precision settings, numerical bodies,
case lists, and within-case operation order. It divides at existing section banners,
and splits a final independent loop into singleton cases. It does not substitute
SciPy values, alter an integrator, change a tolerance, or omit a slow case.
Each task runs in a separate process. Its stdout, stderr, selected source section,
executed-code hash, exit status, and timing are preserved in the replay evidence.
The B/C output blocks concatenate those raw stdout streams in original section and
case order. They are explicitly not claimed to be one serial-process transcript.

| Probe       | Complete task coverage                                                                                                                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B: 24 tasks | Six `k=2` anchors; one normal-range/large-df section; eleven enclosures; one three-direction monotonicity section; all four critical values; the full boundary section including non-integer df and `k=100`                                                                           |
| C: 17 tasks | Three one-treatment anchors; four direct-integral comparisons; four enclosures including eight treatments; three one-sided critical values; the two-sided critical value and both neighbouring evaluations; the correlation/dimension/monotonicity section; the full boundary section |

G and C-2 reuse the B and C functions respectively. Their reruns establish portability
and reproduction of those calls, not a new implementation-independent mathematical route.

| Component         | Actual reproduction environment               |
| ----------------- | --------------------------------------------- |
| Date              | 2026-09-09 UTC                                |
| Platform          | Linux x86_64                                  |
| Python            | CPython 3.12.14                               |
| mpmath            | 1.4.1; `libmp.BACKEND = python`               |
| python-flint      | 0.9.0                                         |
| NumPy             | 2.4.6                                         |
| SciPy             | 1.17.1                                        |
| gmpy2             | Not installed in the reproduction environment |
| Process hash seed | `PYTHONHASHSEED=0` for the capture driver     |

The four downloaded wheels were independently hashed and match the September 4
CPython 3.12 package identities in the candidate. Python itself differs by one patch
version. Library versions alone do not establish mathematical authority. In particular,
mpmath automatically detects an installed gmpy2 backend; the original investigation's
claim that an installed gmpy2 was unused is not an independently attested backend record.
This reproduction explicitly records the actual backend instead of inferring it from
whether the probe directly imports gmpy2.

The [requirements file](requirements.txt) pins the four actual wheel hashes for Linux
x86_64 and CPython 3.12. The separate G shell capture did not set the hash seed or
instrument whole-process elapsed time; its evidence metadata says so, and its inline
timings remain unaltered.

## 6. Completed evidence and comparison

All six serial scripts and all 41 parallel tasks completed with exit 0 and empty stderr.
All eight complete output sets match the reviewed observations under the explicit
comparison convention below. This includes every formerly unreplayed B critical
value and boundary case. It is reproduction of finite observations, not numerical
research-gate closure.

| Probe | Execution              | Stdout bytes | New stdout SHA-256                                                 | Comparison |
| ----- | ---------------------- | ------------ | ------------------------------------------------------------------ | ---------- |
| A     | complete serial script | 4656         | `8bf03d5a7093396fde0c12a0819f0ff2a1b5c5321e115876f95f6bb090e5cc00` | Match      |
| B     | 24 tasks               | 5016         | `5abc6d7b7afa2a53a2a2dcda3f2097fe197ce41a395db9063a342432e68cb521` | Match      |
| G     | complete serial script | 782          | `afaaa7a84acd864a1da40949f420dce1d0c06b5c3e7b371ea97448106db64d6b` | Match      |
| C     | 17 tasks               | 3420         | `ff7f3c578d1d121c8c350800ea4d3a92fd983eae445db37d827a5eda5339ac66` | Match      |
| C2    | complete serial script | 610          | `2aa1b24f9a7bbc85ac8e890241125d404a16b1e2fc8323900f9eee993e1e240b` | Match      |
| D     | complete serial script | 8279         | `96ded693141121376c0b3a39276da5cbbf2fb73badfdd60f555a326761075daa` | Match      |
| E     | complete serial script | 4052         | `f0d7bdabe27bb6b58423c96cafce45ba0fb7da6c70e0ace4f7bdb979e25bcc1e` | Match      |
| F     | complete serial script | 3365         | `75b50a38699922e64eb4b412131c3036088c7d9fe6095d4678fb2961d0e2678d` | Match      |

The [replay evidence](replay-evidence.json) preserves all eight raw outputs, all
41 executed task sources and their hashes, task stdout/stderr, exit statuses,
timings, source hashes, and wheel hashes. The [verification script](verify_replay.py)
checks the 8/8 script hashes, 8/8 output hashes, 8/8 capture bindings, full 41/41
task coverage, and the 49/50 catalogue accounting after formatting.

The original known-bad report at `18563ccf8cb50a7cf1c9d74718b2adf3e2cf0537` was
also checked directly: only D and F have matching recorded output hashes, and the
new verifier rejects it on a fenced-byte digest mismatch. This independently
reproduces the historical integrity finding; a matching repaired hash alone was
not used as a substitute for execution.

To check the submitted record and raw evidence from the repository root:

```sh
python review-inputs/r3-numerical-reproduction/verify_replay.py \
  governance/drafts/release-3-preparation/numerical-research-result.md \
  --evidence review-inputs/r3-numerical-reproduction/replay-evidence.json
```

For a fresh numerical replay, create an isolated CPython 3.12 environment on Linux
x86_64 and install the hashed requirements with `pip install --require-hashes -r`
and the requirements path above. Use `verify_replay.py RECORD --extract-to DIRECTORY`
to create a new neutral directory containing the unchanged scripts. Copy
`parallel_replay.py` into it. Run `python -u parallel_replay.py` there for B/C;
run each of the other six scripts directly with stdout and stderr captured separately.
Retain every raw task file and its metadata. `--compare-to` accepts the original record
extracted from reviewed commit `9f39eafd4b0a676e6615956b5a7899f195fc0358`.

The comparison helper excludes only displayed elapsed times, the recorded Python
3.12.13/3.12.14 patch-version line, and the one identified historical C trailing-space
deletion. These exclusions are for comparison only: hashes and raw evidence preserve
all bytes. No numerical tolerance, rounding, truncation, or replacement of a result is
applied. A reported difference requires review; an exit status alone is not evidence
that numerical observations match.

## 7. Validation and preservation

At the reviewed head, format checking, Markdown lint (351 files), TypeScript checking,
and direct registry/authority/link/audit validation all passed. These repository checks
do not execute the numerical probes and did not establish B-3 closure.

The successor passed `pnpm format:check`, `pnpm lint:markdown` (400 files),
`pnpm typecheck`, and `node --import tsx tooling/src/validate.ts`. The check environment
used Node 24.19.0 and pnpm 11.19.0 with the frozen repository lockfile; the repository
package-manager declaration is pnpm 11.7.0. The evidence verifier also passed after
formatting: script hashes 8/8, output hashes 8/8, raw-capture bindings 8/8, task coverage
41/41, catalogue IDs 49, scope assignments 50, and all eight observation comparisons.

The exact corrected result blob is `e0ab5d224c7b2e2c155d611cc3f7a2ae63336c99`
(SHA-256 `e56238ecacab2670320f6508d3cda8871f4b1d01d38cd0eb00a553d45eb2d01e`).
The replay-evidence blob is `449cbea788e0c2c49f10728ffa9d0c1c12724fba`
(SHA-256 `bbf23d9280fb15c4caf7917a45aa27ca7f7be9eba7071002a05105534c252516`).
These content identities avoid a self-referential report-commit claim. The draft PR
identifies the containing commit and tree.

The generic Git whitespace diagnostic reports the one intentionally preserved trailing
space in Probe C stdout. It is retained to satisfy the raw-byte evidence requirement,
with a local Markdown formatting/lint annotation; the four required repository checks
and the byte-integrity verifier pass. It is not silently stripped or represented as a
clean generic whitespace diagnostic.

The successor is based on the recorded main tree and adds the corrected numerical
result and its review evidence. It does not replace the cumulative semantic source
record, alter any accepted SR-J decision, change the original semantic catalogue, or
edit authoritative Protocol, Release 2, or Release 4 artifacts. Historical SR-L-only
statements in the numerical investigation are dated explicitly; they are not a claim
that later accepted source work was undone. The separate SR-J record work at PR #258
and its acceptance review at PR #259 are not reopened by this numerical review.

## 8. Intake boundary and remaining work

The fixed reviewed head should not be merged unchanged. This proposed successor
supplies regenerated evidence and narrower claims for review as an informative
`INPUT_INCOMPLETE` record. The original PR and original review remain immutable
historical inputs; no merge or public-opening action is performed here.

An intake reviewer should confirm the corrected record and evidence bindings at the
successor's final head, including the disclosed replay scheduling and certificate
wording. Successful intake would close record-repair work only. NSR-01 through NSR-17,
NB-01 through NB-10, current semantic source dependencies, and the integrated R3-H1
through R3-H7 process remain subject to their own recorded requirements. A fresh
numerical disposition requires the missing primary-source review; source-complete
SR-J acceptance does not establish a numerical implementation or authorize Release 3
public discussion.
