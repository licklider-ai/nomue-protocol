# PR #311 fixed-candidate surface review

Date: 2026-09-11 UTC. Disposition: **GO for merger and reuse solely as an unissued research asset and input to subsequent envelope design.** No blocking defect was found in this bounded review. This is not a formal B-2 decision, methodological adoption, public-check registration, supported implementation approval, or release authorization.

## Identity and independence boundary

The inspected candidate is `b0cfe157c22a868c2b45331b5fdbfebea2487bd0`, with sole parent `11921d1ee22eab71c6341bd9e00e9aa25f44dbdf`. Its change set adds precisely the 13 files under `governance/drafts/release-3-preparation/holm-record-surface-20260911/`. `inspected-hashes.json` records SHA-256 identities of all 13 files, governing read-first documents and the surface's 11 explicitly pinned runtime inputs. Scope includes the complete packet and its connection to the unchanged legacy bridge.

A subsequently drafted full-envelope coupling plan and its compatibility observations are outside this fixed-candidate review.

The reviewing role was a separate investigator task, `/root/r3_surface_review`, executed using OpenAI Codex in ChatGPT Work. It received the fixed candidate and bounded review assignment rather than the prior authoring discussion. It inherited the parent model/session environment and shared infrastructure, tools and filesystem. No distinct served model/build attestation, human authorship, human independence or organizational independence is claimed. The reviewer used a separate detached worktree at `/workspace/scratch/367118710fbf/r3-surface-review`; it did not edit the author's branch, commit, push, or merge. Dependencies were copied into the review worktree from the public-repository installation; the bridge's repository-local realpath and content-hash checks passed.

AGENTS.md and the required Charter, Authority Model, authority manifest, requirements registry, identifier policy and RFC process were consulted. The existing bridge, promotion proposal, integration audit and packet's author review were examined as attributed repository evidence. Original methodological papers and IEEE source materials were **not newly reviewed**. This review does not replace the separate primary-source review requirement or independently close source applicability. Any historical source conclusions remain attributed reuse under their original scope and pins.

## Findings

1. **Closed and reversible declaration surface: pass.** An independent structural comparison recursively rebased schema references, changed only the declared artifact-kind constant, and removed `payload_status` from the six legacy slot branches. The resulting schema is deeply equal to the candidate declaration schema. Expected and record declaration definitions and all shared context properties also match. The original mixed declaration exercises `omnibus`, `pairwise`, `many_to_one`, `planned_contrast`, `multiplicity_adjustment`, and `interval` together. Round-trip equality and exact prepared legacy bridge input both hold. Each slot is independently bound and rejects the removed legacy field. Unrelated analysis/family/slot content and array order stay in the context comparison.

2. **Exact input and output binding: pass.** Context equality covers record/revision identity, complete declaration and all supplied inputs. Revision and selected result ownership are additional admission conditions. The trusted external expected context remains a necessary trust boundary; extracting it from a submitted record would defeat the intended binding. Source/hypothesis labels and sidedness are bound without becoming authenticity evidence. Five reviewer-written exact intersection-oracle vectors exercise zero, the smallest subnormals, normal/subnormal transition, ties, near-one clipping and nontrivial binary64 rounding. The real isolated worker agrees with each exact numerator and display. Altering each exact output row produces mismatch. Supplied p encodings outside nonnegative finite [0,1] fail closed. This is arithmetic evidence, not proof that supplied p-values are valid for the declared science.

3. **Strict stored bytes: pass.** Raw expected and record JSON use the existing strict parser. Fatal UTF-8 decoding plus exact stored-byte equality to UTF-8 JCS rejects malformed UTF-8, BOM, newline, duplicate and escaped-duplicate names, unpaired surrogates and noncanonical negative-zero spelling. Expected context may use noncanonical object formatting, as intended. Startup schema loading and trusted helper inputs are outside the submitted-record boundary. Dependency hash checks establish local identity under the stated trusted-host/module assumptions; they do not authenticate a hostile host.

4. **Scoped report classification: pass within its stated coarse scope.** Context and valid ordered value disagreements are mismatches; invalid structure, relations and domain are refusals; malformed worker results are execution failures. All 16 outcome/reason pairings were checked against the report schema. Every actual report retains four `not_asserted` boundaries and `p_generation: not_run`. Successful reports require populated scope. Nullable scope on early refusal/mismatch is supported; populated failure scope names an attempted check. Detailed relation-stage codes remain intentionally absent. No overall Record verification verdict is introduced.

5. **Resource admission conjunction: pass, with the documented promotion hold retained.** The live worker accepts 16 groups/16 observations/1 analysis (120 supplied members), and 3 groups/1,024 observations/1 analysis. A 3-group/1,024-observation/16-analysis record is schema valid and accepted by the outer preparation, yet the reconstructed legacy declaration exceeds its node budget: the bridge returns `document nodes` and the surface correctly reports `input_refused`. A 16-group/1,024-observation/16-analysis combination is refused by the outer node guard. These concrete controls support the stated conjunction of layers and refute any interpretation that all maximum dimensions are simultaneously supported. They establish neither exhaustive boundary coverage nor a whole-call memory bound.

6. **Authority and reuse boundaries: pass.** The addition changes no registered schema, supported bundle, requirement, check version or reference-verifier dispatch. Names and prose consistently identify unissued experimental bodies and reports. The packet preserves the supplied-p-only arithmetic scope and identifies full envelope, lifecycle, integrity, routing and public reason mapping as subsequent work. Its GO therefore permits carrying this reviewed experiment into design exploration, not treating its fields or provisional limits as already adopted Protocol meaning.

## Reproduction and evidence

Environment: Linux, Node `v24.19.0`, Python selected explicitly at `/opt/codex/runtimes/codex-primary-runtime/dependencies/python/bin/python3` (Python 3.12.14 in this environment). The pinned local dependency installation was used. No external network source inspection was performed.

From the detached repository root:

```sh
REVIEW_ROOT="$PWD" NOMUE_EXPERIMENT_PYTHON=/absolute/path/to/python3 node --import tsx /absolute/path/to/independent-tests.mjs
```

When placed in `review-inputs/r3-holm-record-surface-review-20260911/`, the test also resolves the repository root from its location if `REVIEW_ROOT` is omitted. Set Python to a working absolute interpreter path. The script writes only its separate `independent-results.json`.

Result: **67 independent controls passed**, recorded in `independent-results.json`. Several controls contain multiple assertions; counts are controls, not independent statistical datasets. The reviewer oracle uses exhaustive intersections for small families and its own binary64 rounding code; it never calls candidate arithmetic to construct expected values. Test fixture constructors and the original mixed declaration are reused as structural setup, which is disclosed rather than presented as independently sourced data.

The packet's original `test_surface.mjs` also passed all **33 author controls**, recorded in `author-reproduction.txt`. That script intentionally rewrites fixtures; its only working-tree difference was formatting of `example-expected.json`, which was restored to the pinned commit. `RESULTS.json` and `example-record.jcs` remained byte-identical. The review worktree was clean after restoration. No full repository regression suite, current remote CI status, portable execution certification or exhaustive fuzzing is claimed.

## Remaining promotion conditions

- Preserve original source evidence and resolve remaining source-to-claim applicability and provenance questions under the RFC research gate. This report supplies no fresh primary-source pass and does not itself satisfy formal B-2 disposition.
- Design and independently review complete Record envelope coupling: public identity/revision lifecycle, integrity coverage, exact profile/bundle dispatch and failure behavior, retaining the supplied-p guarantee boundary.
- Bind detailed stage/reason/execution outcomes to registered ownership and positive/negative coupled conformance cases. Reassess provisional admission limits with measured whole-call resources and supported termination/execution evidence.
- Prepare the coordinated schema, specification, Requirement IDs, public-contract-surface impact, check versions, conformance and reference implementation changes before supported behavior is adopted. Follow the applicable RFC decisions and named accountable approval requirements; elapsed discussion time is not approval.
- Reopen this bounded review if candidate bytes change in a way affecting schema, adapter, byte admission, binding, classification or caps. Do not generalize the current result to other adjustment procedures, p generation, arbitrary family sizes or scientific validity.

The recommendation is **GO for this fixed research asset**, with these promotion conditions remaining open.
