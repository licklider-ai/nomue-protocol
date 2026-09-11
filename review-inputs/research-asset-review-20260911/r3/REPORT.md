# Independent bounded review of the R3 Holm research asset stack

Date: 2026-09-11 UTC

## Disposition

**PASS for preservation as explicitly experimental research. No archive blocker was found.**

The fixed R3 stack ending at
`cc87234d27b7a0d51bc172d0e661845a3b1f9b15` can be integrated as a dated
research record under `governance/drafts`. The numerical candidate, declaration
bridge, tests, measured observations, corrections, and review receipts are useful
and internally consistent within their stated bounds.

This determination does not make the code a supported reference implementation,
freeze a design, issue an identifier, register a Contract or Public Check, change
a release gate, adopt Holm as Protocol behavior, establish scientific FWER for
supplied inputs, or authorize a release. It also does not formally close B-2.
The clean nonauthor implementation inspection in this report supplies the narrow
technical evidence that the external promotion review said was missing; any
formal disposition remains a separate governance action.

The stack changes only informative draft research assets. It does not change
`spec/`, `reference/`, an authority assignment, a requirement or public-surface
registry, conformance expectations, generated views, or release-gate state.
Under the repository authority model, these unclassified draft artifacts do not
define Protocol meaning.

## Reviewer identity, independence, and source boundary

Accountable role: bounded nonauthor asset reviewer. The requested and used model
configuration was `gpt-5.6-sol`. No served model-build attestation was available.
No human reviewer or additional agent participated. I did not author or repair
the reviewed candidate packets.

I inspected the exact Git objects, code, reports, manifests, and executable
evidence in an independent detached checkout. The original Holm, Welch, and IEEE
PDF bytes were not available in this workspace and were not read. Accordingly,
this is not a new primary-source pass. I directly read and verified the exact
repository reports at:

| Role                                                          | Fixed report                                                                                                | SHA-256 of inspected report bytes                                  |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Holm/Welch bounded primary-source report, attributed reuse    | `9793fd2f1540c26491651ff02bf51d0bd292f821:review-inputs/r3-holm-welch-source-connection-20260911/REPORT.md` | `ebc01dc3022456eea66472b842d9dbd987bf86df75b64c8995ff0ae20ba160c8` |
| IEEE clause report present in the #294 tree, attributed reuse | `864766232988181e72ae18c235dbc815466b3a1d:review-inputs/r4-ieee-clause-confirmation-20260911/REPORT.md`     | `c4714d7a0f8881712886fa72ab9da633bdf532134e5e7c458b0bebd0561cae64` |
| External promotion review and prior-involvement disclosure    | `3d071195234179b0c1ed2dddadd3481e01953c50:review-inputs/r3-holm-promotion-20c8e3b/REPORT.md`                | `88fc2ccf8b9eb9bf61cb5a26baf684b4a2635a909086aec07422d67727d47c98` |

The #289 report attributes direct inspection of Holm's Scheme 1, inclusive
thresholding, its strong family-wise result under valid marginal obtained
levels, and the absence of a joint-independence premise in that proof. The #294
report attributes direct clause inspection for the binary64 field map and
nearest/ties-to-even rule; its author intake applies those source facts to the
R3 encoding while keeping negative-zero refusal and the `[0,1]` admission rule
as project policies. I use those claims only within those stated scopes.

The #301 external reviewer honestly records that the same reviewer session later
repaired candidate packets and therefore did not issue an implementation-level
B-2 close. I did not treat that receipt as independent closure.

## Exact arithmetic and input-domain assessment

The reviewed numerical bytes are `candidate.py` at
`c4ad231471deba354bd018550b2378f2d740b944`, SHA-256
`70924d2b7ac40367e9ae4abaee624dd6c0b85796a62c5445b0694f2240fac606`.
The same blob is copied into the bridge at `cc87234`.

I independently inspected and exercised `decode`, `transform`, and `project`:

- `decode` accepts exactly eight primitive bytes whose unsigned binary64
  encoding is between positive zero and positive one inclusive. For subnormal
  fraction field `f`, it returns `f`; for normal biased exponent `e` and
  fraction `f`, it returns `(2^52+f)2^(e-1)`. Dividing by `U=2^1074` therefore
  recovers the exact represented value. Negative zero, every negative encoding,
  values above one, infinities, NaNs, malformed lengths, and non-`bytes`
  carriers fail closed.
- `transform` sorts by exact lattice integer and original index, uses the rank
  multiplier `m-rank+1`, takes the prefix maximum, caps at `U`, and maps results
  back through the stored permutation. The retained products, order, inverse,
  exact adjusted integers, and displays agree with a separate all-subsets
  Bonferroni closed-testing oracle for the tested small families.
- Equal p-values receive equal adjusted values because the first product in a
  tie block dominates later products and the prefix maximum is retained. Early
  capping cannot decrease later values. Zero, one, the smallest subnormal,
  normal/subnormal transitions, binade carries, all-zero/all-one families, and
  exact midpoint parity behaved as specified.
- `project` performs one integer nearest/ties-to-even projection after the exact
  cap. It matched an independent `Fraction` to CPython binary64 conversion
  oracle on boundary points, every constructed exact midpoint across the
  supported binades, and random lattice integers. Exact values remain the
  comparison target; the known distinct-exact/same-display collision was
  reproduced and refused by evidence comparison.
- The transform takes no alpha and emits no rejection decision. Exact adjusted
  comparison agrees with inclusive sequential Holm on the claimed
  `0 < alpha < 1` domain. The disclosed `alpha=1` counterexample
  `(3/4,1) -> (1,1)` was reproduced: clipping makes adjusted-value comparison
  differ from the sequential stop rule. I also checked the zero endpoint; the
  proposal conservatively makes no equivalence claim there. Binary64 `0.05`
  remains distinct from exact rational `1/20`.

The standalone candidate still has known experimental boundaries: its
10,240-comparison guard depends on the runtime sort, its observations do not
prove a portable worst case, and `check_evidence` is not a hostile arbitrary
cyclic/deep object-graph ingress. Those limits are already disclosed and are not
blockers to preserving the code as research.

## Declaration binding and fail-closed behavior

The bridge takes expected declaration and input context from separate caller
arguments, strictly parses all three raw JSON texts, applies byte/depth/node
bounds, validates D0 before use, and compares the full JCS value of
`{declaration, inputs}` before launching the numerical worker. The submitted
evidence cannot choose its own expected analysis, family, result, members,
origin association, sidedness, p bytes, or unrelated declaration context.

The smaller worker carrier omits source hypothesis and sidedness, but those
values remain covered by the full pre-worker binding. Result-slot `member_ids`
has set-coverage meaning in D0 relations while its actual array order remains
bound by the full declaration comparison. Adjusted rows must have the exact
expected count and member order. Every exact integer and display encoding is
checked after the single worker response; an early matching row never produces
partial success.

Twenty-three focused reviewer controls passed. They covered a real worker
baseline; canonical key/whitespace changes; unrelated declaration, pair
direction, result-member-array order, revision, origin, hypothesis, sidedness,
and p-byte substitutions; duplicate source/hypothesis pairs; negative zero and
above-one p encodings; missing/duplicate output rows; an exact mismatch with the
same display; a false final row; duplicate JSON members; negative-zero JSON
numbers; and malformed, partial, or extra-field worker responses. All context
and ingress failures occurred with zero worker launches. Arithmetic mismatches
launched one worker and returned no success. Broken worker replies remained
experiment errors rather than ordinary evidence refusals.

## Resource and integrity assessment

The resource limits are conjunctive. The corrected materialized all-count-max D0
document contains 42,450 nodes and is deliberately refused by the 24,576-node
D0 cap. The calculated submitted-document upper bound for any separately
admitted D0 and sidecar is 27,108 nodes, below the 28,672 cap. This does not mean
all individual count maxima can be combined in one admitted document.

The bridge retains 3..16 groups, 3..120 all-pairs members, 256 KiB private worker
request/response caps, a 256 MiB Python address-space limit, a 256 MiB Node
old-space setting in the harness, and a 30-second outer probe deadline. The
committed 512 MiB process-tree RSS observations are one reviewer-host sample,
not a hard limit or portable support bound. This review environment could not
map process sessions through `/proc`; `live_rss.py` failed before its probes as
designed. I therefore did not claim a new live-RSS run or reinterpret the
committed measurements.

The private worker executes the exact hash-checked candidate bytes, uses Python
isolated mode, receives only a freshly constructed closed message, caps output,
and separates resource diagnostics from the numerical channel. The manifest,
loader, trusted runtimes, built-ins, installed dependency resolution, process
environment, and no-concurrent-mutation premise remain explicit trust roots.

## Reproduction evidence

| Check                                                | Result                                                                                                                                                                                                                                              |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewer arithmetic script, normal and `-O`          | Byte-identical pass; 110,668 checks: 50,000 random decode-domain encodings, 50,000 random projections, 5,364 projection boundaries, 4,084 exact midpoints, 600 closed-testing families, 600 step-down levels, and focused endpoint/refusal controls |
| Existing standalone Holm harness, normal and `-O`    | 9,499 assertions per mode; assertion maps identical                                                                                                                                                                                                 |
| Reviewer binding script                              | 23 focused checks passed                                                                                                                                                                                                                            |
| Existing bridge harness, normal and optimized worker | 157 checks per mode; labels/results identical                                                                                                                                                                                                       |
| D0 copied corpus                                     | 70/70 matched                                                                                                                                                                                                                                       |
| Bridge integrity suite                               | 15/15 controls passed                                                                                                                                                                                                                               |
| Isolated bridge probes                               | 12 decisions reproduced; the count-max cases refused at `document nodes`                                                                                                                                                                            |
| Design node witness, normal and `-O`                 | Identical; 42,450 count-max nodes and 27,108 submitted upper bound                                                                                                                                                                                  |
| Packet `SHA256SUMS`                                  | 25/25 entries passed                                                                                                                                                                                                                                |
| Manifest/Git pin verification                        | 65 entries, 40 unique commit/path pairs, matched fixed blobs/byte counts/hashes                                                                                                                                                                     |
| #301 derivation script, normal and `-O`              | Identical pass for closed testing, step-down domain, alpha=1, collision, level identity, vector, and width                                                                                                                                          |
| #294 independent and author applicability scripts    | Passed; normal and `-O` independent output identical                                                                                                                                                                                                |
| `git diff --check`                                   | Passed for the full R3 stack                                                                                                                                                                                                                        |
| Markdown and formatting                              | 412 Markdown files reported with zero issues; Prettier check passed                                                                                                                                                                                 |

`pnpm validate` did not run to completion in this reviewer container because
`tsx` could not create its IPC pipe (`EPERM`). A direct Node invocation could not
replace `tsx` because the source imports rely on its TypeScript `.js` mapping.
This is an environment limitation, not a passing validation attestation or a
content failure. The bounded tests above and formatting checks did run.

Detailed machine-readable evidence is in `EVIDENCE.json`. The independent
reviewer scripts are `reviewer_arithmetic_checks.py` and
`reviewer_binding_checks.mjs`.

## Integration guidance

Preserve the complete linear R3 history rather than applying only the named
repair commits:

`9bfddcc -> f203eb1 -> b4b80de -> c4ad231 -> 4eb3173 -> 517cb7d -> e170ced -> 1e6c4be -> 45bd42f -> cf6ae85 -> cc87234`.

For #294, `8647662` adds the author-intake files; the independent report,
source inventory, results, and independent check script are inherited from
parent `bfe7d230`. Merging the original PR history preserves both. The PR #289 and
PR #301 review records may be retained additively under `review-inputs` without
turning them into authority.

The external proposal review's SHOULD-FIX wording items and all promotion
conditions remain useful future work. They do not block exact preservation of
this historical experimental stack. Before any later promotion, the project
still needs a formal B-2 disposition, scientific input-validity evidence for
any FWER claim, public schema/ownership/losslessness work, supported-execution
and outcome-mapping decisions, coupled conformance artifacts, the applicable
RFC decision, and separate release conditions.
