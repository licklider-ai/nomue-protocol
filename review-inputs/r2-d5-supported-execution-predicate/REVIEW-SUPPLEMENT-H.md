# R2-D5 Supported-Execution Candidate Review - Section H Supplement (Close-Only)

Verdict: **H-CLOSED**

Section H (per-runner execution-trace identity and digest retention with cold
and hot exercise, and cross-runner comparison of the numerical and proof trace
bytes) is now closed on the required five-runner set. With Section H closed,
the existing candidate-scoped GO recorded in
[REVIEW-RESULT.md](REVIEW-RESULT.md) remains valid. This supplement does NOT
claim that the supported-platform matrix or the supported-execution predicate
is complete: the exact runtime allowlist remains empty and unselected, the
controlled-process execution profile remains unenforced, the resource-bound
constant remains unselected, and no runtime, platform, or domain support is
claimed by the candidate or by this review.

## 1. Fixed identity

| Item                                        | Value                                                           |
| ------------------------------------------- | --------------------------------------------------------------- |
| Implementation commit (unchanged)           | `cb4bfbc9417d0b837972acf7c2c45c6e54d888e1`                      |
| Review-input commit (evaluation target)     | `e8fd88e2f9a421274fc1644d8b4b0f03fe303f6b`                      |
| Existing candidate review result            | commit `db26ad4` (`REVIEW-RESULT.md`, verdict GO)               |
| Evidence-tooling commit for this supplement | `0bc988701d84683f147a652acc39adb535d58dc7`                      |
| Evidence workflow run                       | run id `33344920611` (run number 1, push event, head `0bc9887`) |

The implementation was not changed. Every runner job independently verified,
before executing anything, that
`git diff --name-only e8fd88e2..HEAD` contains only paths under
`review-inputs/` plus the review-only workflow file itself, so the
implementation bytes evaluated on every runner are exactly those of the
review-input commit.

## 2. Reviewer-owned evidence tooling

All Section H tooling is reviewer-owned, lives under
`review-inputs/r2-d5-supported-execution-predicate/supplement-h/`, and selects
no support, platform, allowlist, profile, or resource bound. Committed bytes:

| File                                        | sha256                                                             |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `supplement-h/harness.mts`                  | `eb5dace09bfec628fb7acc58d6c8f6b7dafdf431b017e2997cbf786c8c94cb9b` |
| `supplement-h/compare.mjs`                  | `7f6564eb7090e71c4163e312aad6656b1404f9d42b7170f843af4f424413b5c9` |
| `.github/workflows/review-supplement-h.yml` | `b0bde77dfb64a212d9da7c5cfdef21746e3c2e452661c400fac582171b0f42b1` |

The comparator was validated negatively before use: it accepts a clean
two-runner fixture and rejects (a) a mutated platform-neutral field, (b) a
runtime-identity line changed without a matching raw-digest change, and (c) a
non-deterministic post-warm-up pass.

## 3. Corpus (631 deterministic cases)

The corpus is fixed, enumerated in `harness.mts` with no randomness, and covers
every item required by the protocol:

- every degrees-of-freedom value 1..200 with a central-branch input
  (`t = 0.5`), a tail-branch input (`t = 5`), and the branch boundary
  (`t = 1`) - 600 cases;
- both adjacent binary64 values around `|t| = 1` at df 1, 2, 3, 5, 72, 100,
  197, 199, 200 (odd/even, df 1/2 closed forms, extreme df) - 18 cases;
- `t = +0` at df 1 and df 5; the minimum subnormal (`5e-324`) and minimum
  normal (`2.2250738585072014e-308`) magnitudes at df 10; `t = 20` at df 10;
  the df=197 `t = 50.4` witness; the df=200 long-series neighbourhood
  (`nextUp(nextUp(1))`); the maximum finite value at df 5 - 8 cases;
- representative refusals: negative zero, NaN, df 0, df 201, df 1.5 - 5 cases.

Outcome split (identical on every runner): 623 evaluated with a full frozen
execution trace, 8 refusals. Three of the eight are fail-closed refusals of
extreme magnitudes, each with a deterministic recorded reason retained in the
manifests and bound into the platform-neutral hash:

- `t = 5e-324` and `t = 2.2250738585072014e-308` (df 10):
  `execution_trace_verification_failed` with trace error
  "trace node 11 fails exact primitive verification" (an intermediate result
  leaves the exactly-verifiable range, so the candidate refuses rather than
  claims);
- `t = MAX_VALUE` (df 5): `truth_error_proof_precondition_failed` with 16
  recorded precondition failures (overflow of the squared statistic breaks the
  proof preconditions).

These refusals claim nothing and are consistent with the candidate's
fail-closed posture; their classifications and reasons are part of the
cross-runner comparison and agree byte-for-byte on all runners.

## 4. Retained per-case fields

For every evaluated case the manifests retain: input bits (df and binary64 hex
of `t`), branch, p-value bits, iterations and iteration cap, node count, raw
trace digest, normalization-table identity and content hash
(`sha256:ba1f9921...76c08`) with the inverse-beta cell bits, the five proof
indices, the exact truncation and relative error bound
numerators/denominators, the p-value and remainder source sequences, and the
runtime identity line bound into the trace. For every refusal: the
classification and the recorded refusal reasons. Each row also carries a
platform-neutral projection hash and, for evaluated cases, an on-runner
recomputation flag (section 6).

## 5. Execution procedure and runner set

Modes, both fresh processes per the protocol:

- **cold**: one captured pass; the first evaluation of every case in that
  process;
- **hot**: two full uncaptured warm-up passes over the whole corpus, then
  three captured passes, in a fresh process started with the engine's
  natives-syntax flag so tiering evidence can be sampled.

Optimization evidence is recorded, not assumed: after warm-up the harness
samples the engine's optimization-status intrinsic for the exported entry
function. On every Node 22 runner the recorded status is
`0b1000000000000001` (is-function + baseline tier): the entry function reached
the baseline tier and the passes are accurately described as repeated
post-warm-up hot-path executions, not as proven top-tier-optimized executions.
On the Node 24 runner the recorded status is `0b110001` (is-function +
optimized + mid-tier compiler), i.e. the entry function was verifiably
optimized. Deeper per-helper tiering was not individually sampled; this
limitation is stated rather than papered over, and the equality results below
hold regardless of tier.

Five runner tuples were exercised at commit `0bc9887` (implementation bytes =
review-input commit), run id `33344920611`:

| Runner label       | Trace runtime-identity line                              | Image                         | Executable sha256  |
| ------------------ | -------------------------------------------------------- | ----------------------------- | ------------------ |
| linux-x64-node22   | `node\|v22.23.2\|v8\|12.4.254.21-node.56\|linux\|x64`    | ubuntu24 20260823.283.1       | `3517c2df...a327`  |
| linux-x64-node24   | `node\|v24.19.0\|v8\|13.6.233.17-node.51\|linux\|x64`    | ubuntu24 20260823.283.1       | `bc17c508...5e12`  |
| windows-x64-node22 | `node\|v22.23.2\|v8\|12.4.254.21-node.56\|win32\|x64`    | win25-vs2026 20260824.214.3   | `0d0f5e39...5fad4` |
| macos-arm64-node22 | `node\|v22.23.1\|v8\|12.4.254.21-node.56\|darwin\|arm64` | macos26 20260728.0273.1       | `2e3f1286...b99d`  |
| linux-arm64-node22 | `node\|v22.23.2\|v8\|12.4.254.21-node.56\|linux\|arm64`  | ubuntu24-arm64 20260823.101.1 | `1a638b0f...b876`  |

A sixth environment (the local review environment, Linux x64, Node v22.22.2,
V8 `12.4.254.21-node.39`) ran the same harness; its full cold and hot
manifests are committed as the per-case reference record
(`local-linux-x64-node22-cold.json`, `local-linux-x64-node22-hot.json`).

## 6. Platform-neutral projection and on-runner digest binding

The platform-neutral projection is the implementation's trace-digest byte
grammar minus exactly the declared runtime-identity line and the
identity-bound `sha256` field - nothing else is excluded. On every runner, for
every evaluated case, the harness recomputed the raw digest as
`sha256(neutral lines with the runtime-identity line re-inserted)` and
asserted equality with the implementation-reported trace digest
(`raw_digest_recomputed_ok: true` on all 623 evaluated rows of every
manifest). This proves on each runner that the raw digest binds precisely the
platform-neutral content plus the recorded runtime identity, so - given the
cross-runner equality of the neutral projections - raw-digest differences
between runners are explained only by the recorded runtime-identity line.

The harness also asserted per case that no support is claimed:
`supportedExecutionPredicateSatisfied`, `supportedPlatformClaimed`,
`runtimeSupportClaimed`, and `supportedDomainClaimed` are `false` for every
case on every runner, and for evaluated cases
`exactRuntimeAllowlistSelected`, `controlledProcessProfileEnforced`, and
`crossPlatformAdmissionEvidenceComplete` are `false` (allowlist empty, profile
unenforced, admission evidence incomplete). Any deviation would have failed
the run.

## 7. Comparisons and results

The aggregation job (committed `compare.mjs` over the five uploaded manifest
pairs) reported zero problems: `section_h_comparisons_satisfied: true`,
`neutral_field_mismatches: 0`.

- **Cold versus hot within each runner**: byte-identical - every runner's cold
  rollups equal its three hot-pass rollups, and the full per-case row arrays
  are identical between the cold and hot manifests.
- **Post-warm-up determinism**: the three captured hot passes are identical on
  every runner.
- **Cross-runner platform-neutral equality**: the ordered 631-case list, every
  platform-neutral per-case field (branch, p-value bits, iterations, node
  count, table hash, proof indices, exact bounds, source sequences, refusal
  classifications and reasons), and every per-case neutral projection hash are
  identical on all five runners. Shared neutral rollup (sha256 over the 631
  ordered per-case neutral hashes):
  `e93ff4d17f406afd333c1731a001f46757234e6a6ffc9046ff6ff7a51a8edba7`.
  The local reference environment reproduces the same rollup, extending the
  agreement to a sixth engine build (V8 `-node.39` vs `-node.56` vs Node 24's
  major-version engine).
- **Raw digests**: per-runner raw rollups differ exactly where the
  runtime-identity lines differ and nowhere else; with the on-runner
  recomputation of section 6 this establishes that raw differences are
  explained only by the bound runtime identity. df=197 witness raw digests per
  runner: linux-x64-node22 `sha256:f0bf9b0c...6542`, linux-x64-node24
  `sha256:a9dac6d9...53cf`, windows-x64-node22 `sha256:4609e138...bde7`,
  macos-arm64-node22 `sha256:d3ad1749...cd5d`, linux-arm64-node22
  `sha256:975afff6...71e4`, local reference `sha256:4800a5ba...ed2a`; all six
  share the witness neutral hash `1dd6e2fc...5322`.

Independent verification of the same claim: in the local review environment,
recomputing `sha256(neutral projection + runner identity line)` for all 631
cases from the local reference rows alone reproduced, for each of the five
runners, both the runner's full 631-case raw rollup and its witness digest
exactly as logged on that runner. The cross-runner raw digests are therefore a
pure function of the shared neutral content and the recorded identity line.

## 8. Machine-readable records

Workflow artifacts of run `33344920611` (per-runner `cold.json` + `hot.json`,
zip digests from the upload records):

| Artifact                        | ID         | zip sha256                                                         | bytes  |
| ------------------------------- | ---------- | ------------------------------------------------------------------ | ------ |
| supplement-h-linux-x64-node22   | 9741731442 | `39944fd487149cd8c5cc32645aaab19f611c910495191fc145b272ff2cdd74e3` | 308038 |
| supplement-h-linux-x64-node24   | 9741736621 | `459e01f86d6ed0e48e2221270f9df4967bae142977b310dab799a008fd24d164` | 308020 |
| supplement-h-windows-x64-node22 | 9741741827 | `01f436407a8fc3671dd04e1c0393beb2126eecfb78ead5cbb9fd75912e01630d` | 307901 |
| supplement-h-macos-arm64-node22 | 9741736020 | `9b9c40f45c77d509a00d99b21d17236f632206898d2bdbe2883176eb8f8cd1c4` | 307679 |
| supplement-h-linux-arm64-node22 | 9741735269 | `614131038abf610928d7cd831c0bae49de6ef19eee546249d0f35f87bd702986` | 307677 |
| supplement-h-comparison         | 9741744489 | `76b320fdbf9f706574305385e3db5b8e9e68d397bdcab75a9c8be8f5b46f4f35` | 144857 |

Committed under `supplement-h/`:

- `local-linux-x64-node22-cold.json` / `-hot.json`: the full per-case
  reference manifests (harness-emitted bytes
  `9685ac02...62b8` / `8c925d1a...6339`, committed as formatter-normalized
  re-serializations with identical JSON semantics). Because the per-case
  neutral fields are proven identical on all runners, these rows plus each
  runner's recorded identity line constitute the full per-runner per-case
  retention.
- `comparison.json`: the Section H comparison manifest, including per-runner
  runtime metadata, rollups, checks, the shared per-case neutral hash array,
  and the complete ordered per-case raw digest array for each of the five
  runners. The aggregation job printed the same manifest into its log and
  uploaded it as the `supplement-h-comparison` artifact; the committed copy
  was regenerated with the committed comparator from runner records rebuilt
  out of the logged runner facts plus the shared neutral rows, and accepted
  only after the rebuilt raw rollups and witness digests matched every
  runner's logged values exactly.

## 9. Authority and non-interference

No implementation, governance checkpoint, readiness, authority, registry, or
existing CI file was changed; the implementation commit is unchanged. The only
additions are review-owned files under
`review-inputs/r2-d5-supported-execution-predicate/` and one NEW review-only
workflow file that triggers exclusively on this reviewer branch. Adding that
file is disclosed here as the mechanism for exercising the five runner tuples;
it modifies no existing workflow, evaluates no gate, and can be deleted with
the reviewer branch without touching anything else. This supplement selects no
supported platform, no runtime allowlist entry, no execution profile
enforcement, and no resource-bound constant, and it does not complete the
cross-platform admission evidence: it closes only the Section H evidence
requirement.

## 10. Limitations

- Optimization evidence covers the exported entry function's recorded tier
  (baseline on the Node 22 runners, optimized mid-tier on Node 24); inner
  helpers were not individually sampled. Hot passes are therefore documented
  as repeated post-warm-up executions with recorded tiering evidence, not as
  proven top-tier executions throughout.
- The five runner tuples are hosted images with recorded versions; the results
  pin these tuples only and support no claim about other environments.
- Workflow artifacts have a bounded retention window; the committed manifests
  and the digests in this report are the durable record.

## 11. Verdict

**H-CLOSED.** All Section H requirements are met on the required five-runner
set: per-case trace identities and digests are retained on every tested
runner, cold and hot behaviour is byte-identical and deterministic within each
runner, the platform-neutral semantic projections agree exactly across all
five runners (and a sixth local reference environment), raw digest differences
are fully explained by the bound runtime identity, no support claims appear
anywhere, the allowlist remains empty, the profile remains unenforced, and the
admission evidence remains incomplete as required. The candidate-scoped GO of
`REVIEW-RESULT.md` remains valid. No claim of supported-platform-matrix or
supported-execution-predicate completeness is made.
