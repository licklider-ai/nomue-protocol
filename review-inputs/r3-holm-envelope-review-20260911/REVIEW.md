# Fixed-candidate Holm envelope review

Decision: **GO for merger as an unissued research asset only.** No blocking defect
was found in the fixed candidate. This is not formal B-2 acceptance, a new
primary-source review, numerical-method adoption, public identity allocation,
supported public-check approval, or release authorization.

Candidate: PR #313, head `180d6551a48c7d2f8018c21ccbab1fcf33ab6a02`, sole
parent `6116ea1e4ff21c312a904ccf461f59554819c848`, tree
`ce6b85a5984f1b071bd858d3ed0f113411584ca7`. The change adds exactly 17 files
under `governance/drafts/release-3-preparation/holm-envelope-experiment-20260911/`.
No supported verifier, registry, authoritative schema, numerical implementation,
or earlier bridge changes are in this candidate.

## Investigator and independence boundary

The accountable review role is a separate repository review investigator in an
OpenAI Codex / ChatGPT Work subagent context, on 2026-09-11. The investigator
used the same inherited model and shared execution infrastructure as the parent
assistant. This is separation of investigation context, not evidence of a human
reviewer, a different served model, provider independence, or independent
infrastructure. No additional agents were spawned. Only the public repository
and its copied local dependency installation were used; no dependency symlink
outside the detached repository was introduced.

The review followed the repository AGENTS.md read-first authority and RFC research
gate discipline. Local authority was inspected, including canonicalization,
integrity projection, identifier policy, requirement ownership, and the research
carve-out/promotion boundary. No new original paper or external standard was
inspected. Earlier numerical and source work is reused only within its recorded
scope. The original numerical method is unchanged; these observations cannot
replace the separate primary-source review required for future promotion.

## Findings and independent challenges

| Area                          | Observation and evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Stored-byte integrity         | The scanner copies top-level byte spans after strict parsing, closed schema admission and full-byte canonicality comparison. It removes exactly `integrity`, preserves all other fields, and hashes the stored projection with `nomue/record-content/v1` plus LF. The parsed projection is a separate equality check. This matches the proposed reuse of NRS-CORE-0006 and NRS-CANON-0016/0017/0022. Unicode, escaped quote/backslash/container text, opaque URI spellings and author canonicalizer-fault controls pass. The exported scanner is a trusted helper with admitted-input preconditions, not a standalone raw-input validator. |
| Snapshot and priority         | A cold-start caller mutation control confirms synchronous Buffer copying before setup awaits. Independent escaped-member duplicates, malformed syntax, surrogate, negative-zero underflow, parsed size limits and unsupported-bundle/nonfinite priority controls pass. Expected context is parsed only after successful stored integrity, as documented.                                                                                                                                                                                                                                                                                   |
| URI and association           | Actual record/revision identities use the existing opaque URI-shaped constraints. Exact spelling differences fail context binding before worker launch. Full declaration and inputs are bound using the pinned canonicalizer before the private reverse adapter supplies its internal revision label. The label cannot substitute for actual report scope.                                                                                                                                                                                                                                                                                 |
| D0 preservation               | The complete original six-slot declaration round-trips through the reverse adapter without a change other than the documented forward/reverse field restoration. A relation defect in each of six slots, including nonselected slots, fails declaration before execution. Complete relation codes match the prior checker; a separate hand-predicted simultaneous defect expects exactly `OBS_UNIT_REF`, `UNIT_COVERAGE`, `UNIT_GROUP_REF` and passes.                                                                                                                                                                                     |
| Arithmetic and worker failure | Hand-authored exact fractions run through the real isolated Python worker. Independent mismatch controls cover each of three rows and both exact/display fields. Duplicate, malformed, extra-field, invalid-domain and partial worker replies produce arithmetic execution errors, with no outcome or forwarded subset. Inherited worker timeout, stdout cap and isolated Python startup are unchanged.                                                                                                                                                                                                                                    |
| Output contracts              | Report stage ordering, check identity, consistent scope, pass reasons, stage-specific failure reasons and prerequisite gating reject independent mutations. Every declared refusal tuple validates, and a changed stage fails. Closed output contracts reject an aggregate status. Failed/refused controls return only the output artifact.                                                                                                                                                                                                                                                                                                |
| Bounds                        | Independent controls reach record string/key/container/node/depth and expected string limits. Author controls additionally reproduce byte boundaries, layered reconstructed bridge limits and the 120-member real worker. These establish observed admission behavior, not a portable whole-call memory ceiling or exhaustive boundary proof.                                                                                                                                                                                                                                                                                              |
| Supported isolation           | The supported verifier independently refuses the exercise bundle. All 132 registered legacy fixtures pass on author replay. Candidate diff contains no supported implementation changes.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Reproducibility               | Author tests report 82 controls in 24 groups and 132 legacy fixtures. Rebuilding schemas and applying the explicit repository Prettier configuration leaves the detached candidate with an empty tracked diff. Independent tests pass 93 of 93 controls.                                                                                                                                                                                                                                                                                                                                                                                   |

## Coverage interpretation and remaining limits

The 24-category/82-control claim is numerically accurate: 82 result rows cover
exactly the 24 proposed category labels. It is not 24 accepted conformance
requirements, 82 independent scientific expectations, or proof that every subcase
in a category was exhausted. Several rows aggregate checks and many use an
injected runner. The author suite's regular fixtures do not exercise all six D0
slot variants together; this review adds that full-carrier check and six
per-variant relation challenges. The original D0 checker is reused for some
comparison expectations and is not an independent semantic oracle; the stated
three-code expectation is hand-predicted separately.

The future-check-identity category uses an unallocated example.invalid sentinel,
not the plan's future allocated successor identity. That limitation is explicitly
disclosed by the candidate and does not block retention as research. Its public
mapping, refusal assignments, authoritative requirements and surface ownership,
independent conformance expectations, supported-runtime evidence and coupled
registry/reference changes remain future work. Local report-schema rejection of
legacy forms does not decide migration.

No blocker reproduction is attached because no blocker was found. Executable
negative challenges are retained in `independent-tests.mjs`; successful execution
records are in `independent-results.json`. Trusted setup, harness injections and
concurrent trusted-file hot replacement are not treated as hostile-host
attestation. Neither testing nor digest consistency establishes scientific truth,
source authenticity, familywise-error control or original p-value generation.

## Reproduction

From the repository root after placing this packet at
`review-inputs/r3-holm-envelope-review-20260911/`:

```sh
NOMUE_EXPERIMENT_PYTHON=/absolute/path/to/python3 node --import tsx review-inputs/r3-holm-envelope-review-20260911/independent-tests.mjs
```

The script defaults to the repository two directories above itself. `REVIEW_ROOT`
overrides that root for a detached candidate. It writes only
`independent-results.json` beside itself. Dependencies resolve inside that root.
The reviewed execution used Node v24.19.0 and Python 3.12.14. See INPUTS.json for
candidate and inspected-file hashes and AUTHOR-REPRODUCTION.md for the author
replay. Final files were formatted using the explicit configuration
`/workspace/scratch/367118710fbf/nomue-protocol/.prettierrc.json`.
