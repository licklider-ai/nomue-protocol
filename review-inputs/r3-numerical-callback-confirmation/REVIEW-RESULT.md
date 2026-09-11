# Release 3 Numerical Successor — Independent Callback and Evidence Confirmation

**Status: informative independent review and corrective proposal; non-normative; not adopted.**

## 1. Verdict

**`NO_GO` for intake of PR #263 at
`a133707a0c09008a26709318c8cc54e000b3bd36` unchanged.**

- `BLOCKER`: 1 — the B2/C3 nested callbacks do not establish the analytic
  extension required for their claimed rigorous quadrature bounds. Probe G
  inherits B2, so its declared-resolution certificate claim is also unsupported.
- `SHOULD-FIX`: 0 additional.
- `NICE-TO-HAVE`: 0 additional.

The replay transport and finite task coverage check out. The new blocker is
about mathematical certification, not evidence tampering or a demonstrated
incorrect real-axis probability. Repeating an uncertified computation does not
establish a rigorous bound.

This change proposes a narrower informative record. It preserves the scripts,
raw transcripts, previous review, source decisions, and historical classifications;
it withdraws unsupported B2/C3/G guarantees and records their dependencies in
NB-01. It does not repair the numerical algorithm or independently approve its
own corrective wording.

## 2. Scope and independence

The current review context did not author the fixed PR #263 candidate, its
parallel driver, PR #174's original investigation, or its earlier repairs.
It inspected the fixed Git objects, controlling issue #171, numerical commission,
original review, PR #263's report, corrected result, driver, verifier, requirements,
and raw evidence. Repository contribution instructions and Read-first authority
documents were consulted; the full registries were parsed and their scope checked.

The work was performed with AI assistance in a separate Codex conversation.
User-supplied memory summaries include previous project status, so this is not
a blind review. No separate human reviewer or different model provider is
asserted. A local Git object cache and the shared installed numerical environment
were reused; execution used fresh processes and a new neutral probe directory.
This is authorship independence, not independent hardware or package-build
provenance. Git metadata identifies the repository intake actor.

The present context authored the added checks, this report, and the proposed
claim corrections. Their successful local checks are self-verification; they
are not a separate independent acceptance of those new edits. No source-complete
numerical approval is claimed, and approved SR-J acceptance is not reopened.

## 3. Immutable identities

| Item                                   | Identity                                                        |
| -------------------------------------- | --------------------------------------------------------------- |
| Reviewed PR                            | [#263](https://github.com/licklider-ai/nomue-protocol/pull/263) |
| Reviewed commit                        | `a133707a0c09008a26709318c8cc54e000b3bd36`                      |
| Reviewed tree                          | `6df6404b4bc893832d187296937b52122d065387`                      |
| Sole parent                            | `0abdca8f822d0de3faf35f218f762a951fd75e9e`                      |
| Corrected result blob at reviewed head | `e0ab5d224c7b2e2c155d611cc3f7a2ae63336c99`                      |
| Replay evidence blob                   | `449cbea788e0c2c49f10728ffa9d0c1c12724fba`                      |
| Prior review report blob               | `9e4a43ba62e6fd5b34ffc634b9267e40ad42ff10`                      |
| Prior PR #174 repaired head            | `9f39eafd4b0a676e6615956b5a7899f195fc0358`                      |
| Original known-bad result commit       | `18563ccf8cb50a7cf1c9d74718b2adf3e2cf0537`                      |

The commit's Git object SHA-1 was independently recomputed. Its sole parent,
tree, result/evidence blobs, and six added paths match the PR description.
All pre-existing parent files remain unchanged at the reviewed commit. The
original one-result-path instruction governed the research submission; this
subsequent review proposal carries its separate informative evidence. No
authoritative or implementation path is changed by either increment.

## 4. Evidence bindings and preserved corrections

The submitted verifier was rerun, and [check_bindings.py](check_bindings.py)
additionally re-derived every task body from the original source syntax tree
without importing the submitted parallel driver. The [binding output](binding-check.json)
records:

- All eight script hashes and eight output hashes match their fenced bytes.
- All eight raw capture bindings match, including Probe C's trailing space.
- All 24 B and 17 C executed sources match the original definitions, initialization,
  selected statements, literal case inputs, and within-case operations.
- The actual driver digest matches its evidence field.
- The case partitions have no cross-case numerical state dependence in these
  fixed sources. Each task resets `mp.dps`, `ctx.prec`, and `SQ2`; the retained
  functions do not mutate those settings. Library caching and timings may differ.
- All eight scripts match PR #174's repaired head byte-for-byte. All eight output
  comparisons match with the already disclosed timing, Python patch-version,
  and one historical trailing-space comparison adjustments.
- The coverage matrix has 49 unique catalogue IDs and 50 historical scope
  assignments, with only MTO-01 assigned twice.
- The original known-bad report is rejected on a fenced-byte digest mismatch.

The submitted verifier hashes each stored task body, but does not itself derive
that body from the original source. The additional source derivation here closes
that review question for these 41 fixed task bodies; it is not a general-purpose
verification guarantee for arbitrary drivers.

Five complete unchanged scripts — A, D, E, F, and C-2 — were also executed in fresh
processes. All exited 0 with empty stderr and matching observations. The raw
outputs, source/output hashes, timings, and comparisons are in
[selected-replay.json](selected-replay.json). The exact capture procedure is
[replay_selected.py](replay_selected.py); it fixes `PYTHONHASHSEED=0` and invokes
the selected interpreter for each complete script.

This review did not repeat all expensive B/C cases or the complete G script.
Their submitted evidence was checked structurally; the fresh numerical work
instead targets the newly identified callback defect below. No claim of eight
complete fresh reruns, full B-3 execution closure, or certified numerical truth
is made by this confirmation.

The earlier correction distinguishing neighbouring binary64 values from exact
rounding-cell midpoints is sound. The k=2 incomplete-beta signs support the stated
value bracket, not a correctly rounded cell. The displayed Dunnett signs remain
undecided. Correcting the normal-range conditioning variable to the maximum and
the largest enclosure-case input to q=20 also matches the preserved source.

## 5. Blocker — nested callbacks discard the analytic extension

### Contract and exact code locations

The installed python-flint 0.9.0 `acb.integral` documentation and the upstream
[python-flint integration reference](https://python-flint.readthedocs.io/en/latest/acb.html#flint.acb.integral)
explain the callback's analytic flag. When that flag requests an analytic-domain
evaluation, the callback needs a valid complex analytic enclosure or a non-finite
result if the domain is unsuitable. The
[FLINT integration reference](https://flintlib.org/doc/acb_calc.html#c.acb_calc_integrate)
connects those evaluations to quadrature error control. These references were
inspected on 2026-09-09; the online FLINT page identifies itself as 3.7.0-dev.
The installed 0.9.0 docstring has SHA-256
`77fd76a462ce36a2b5dfcb466c2e50aa9976aa6c03ffc1a75106837b6c8a3858`.

This is a limited documentation check, not a full NSR-17 or numerical-source
completion pass. The historical source-access ledger remains historical.

At the fixed head:

- Appendix A.2, `range_cdf_arb`, applies `.real` to the inner `acb.integral`.
  `srange_cdf_arb` calls it with an outer complex argument `q_a * s`.
- Appendix A.4, `inner_arb`, likewise applies `.real` before its result enters
  the outer `dunnett_arb` callback.
- Those outer callbacks ignore `analytic`. For non-integer degrees of freedom,
  `s_density_acb` also evaluates `s ** (nu - 1)` without branch-domain checking.
- Appendix A.3, Probe G, reuses B2. Its output word `certified` does not repair
  the callback contract.

Taking a real part after the completed outer integral is a different operation.
Here the imaginary component is discarded while evaluating the function on
complex domains needed by the outer integrator. A nonconstant real-valued
projection does not supply that function's holomorphic extension. The real-axis
omitted-probability masses also do not supply the missing complex-domain bound.

### Executed counterexamples

[check_callbacks.py](check_callbacks.py) uses the unchanged B/C definitions at
96-bit Arb precision; [callback-check.json](callback-check.json) contains the
raw observations and input script hashes.

| Fixed function          | Complex input | Returned imaginary part | Closed-form imaginary part | Enclosures overlap |
| ----------------------- | ------------- | ----------------------- | -------------------------- | ------------------ |
| B `range_cdf_arb`, k=2  | w = 3 + 0.01i | exactly 0               | about 0.0005946341021      | No                 |
| C `inner_arb`, p=1, d=2 | s = 1 + 0.01i | exactly 0               | about 0.001079603359       | No                 |

The identities are independently derived from the definitions: the difference
of two independent standard normals has variance 2, giving the normal-range
function `erf(w/2)` for k=2; one normalized normal treatment reduces the inner
convolution to `Phi(d*s)`. Their entire continuations have the nonzero imaginary
components shown above. The current callbacks instead return finite, purely
real values at these inputs. These point witnesses expose the lost analytic
information; they are not asserted to be the exact internal domains visited in
every submitted quadrature run.

The same check evaluates the density's fractional-power operation at nu=73/10
on a complex box crossing the negative real axis. The ordinary power returns
a finite ball, whereas `pow(..., analytic=True)` returns non-finite. This is a
second missing callback-contract obligation, not proof of a wrong recorded
real-axis result.

Consequently N-26, N-28, I-03/I-04, the NF-C/NF-D evidence and strategy tables,
and NB-01 cannot say that the nested outputs establish rigorous enclosures or
certified brackets. The finite real-axis observations may still be useful;
their mathematical error guarantee is unestablished.

## 6. Proposed repair and remaining boundary

The accompanying result correction:

1. Prominently withdraws B2/C3/G guarantees and marks their numbers as uncertified
   observations, including reported radii and sign labels.
2. Corrects the affected narrative, family/follow-up/strategy/claim tables, and
   NB-01. Future certification requires valid complex callbacks, branch handling,
   real-axis truncation bounds, and fresh independently reviewed evidence.
3. Preserves the 49/50 historical assessment accounting but removes any inference
   that the NF-C/NF-D labels establish present oracle or table feasibility.
4. Retains all eight script bodies, all eight raw output fences, the entire prior
   replay evidence, and the prior review report byte-for-byte. Historical script
   labels remain raw evidence, not current mathematical endorsements.
5. Retains `INPUT_INCOMPLETE`, no numerical disposition, all missing-source holds,
   the approved SR-J record and source-requirement changes, and all release holds.

This is a correction to the strength of the record's claims, not a replacement
numerical algorithm. A future numerical repair needs separate primary-source
and numerical review before certification or implementation. Successful review
of this wording alone cannot establish source readiness, public-discussion
readiness, method adoption, or Release 3 authorization. No merge is performed.

## 7. Reproduction and validation

From the repository root, with the earlier hash-pinned requirements installed in
the selected CPython 3.12 environment:

```sh
python review-inputs/r3-numerical-reproduction/verify_replay.py \
  governance/drafts/release-3-preparation/numerical-research-result.md \
  --evidence review-inputs/r3-numerical-reproduction/replay-evidence.json \
  --extract-to /tmp/r3-confirmation-probes
python review-inputs/r3-numerical-callback-confirmation/check_bindings.py
python review-inputs/r3-numerical-callback-confirmation/check_callbacks.py \
  /tmp/r3-confirmation-probes
python review-inputs/r3-numerical-callback-confirmation/replay_selected.py \
  /tmp/r3-confirmation-probes /tmp/r3-confirmation-replay
```

The temporary directories need to be new. The runtime is CPython 3.12.14,
mpmath 1.4.1 with the Python backend, python-flint 0.9.0, NumPy 2.4.6, and
SciPy 1.17.1; gmpy2 is absent. Package versions match the recorded environment;
no fresh independent wheel acquisition is asserted.

The fixed candidate's hosted CI run
[34322281984](https://github.com/licklider-ai/nomue-protocol/actions/runs/34322281984)
completed successfully. It does not execute or certify the mathematical callback
contract. Local correction validation is recorded in [validation.json](validation.json).
The generic Git whitespace diagnostic retains exactly the known historical
trailing space in Probe C stdout; the correction introduces none.
