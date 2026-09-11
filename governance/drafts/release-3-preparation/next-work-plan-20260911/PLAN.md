# R3 next work and closure plan

2026-09-11. Informative author-side work planning by OpenAI Codex in the
continuing implementation context. No new independent review, source reading,
implementation approval, classification change or gate decision is claimed.
R4 PR #297 is in external review; this packet only organizes R3 work in parallel.
Historical packets remain unchanged. Fixed sources are inventoried in INPUTS.json.

## Current evidence versus unfinished work

| Area                        | Evidence already available                                                                                                            | Remaining boundary                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ordinary Holm source        | PR #289 supplies the missing separate-model original-source connection for unweighted Scheme 1 and its conditional strong FWER result | Does not establish validity of supplied p-values or approve a numerical implementation                                                                       |
| Supplied-p arithmetic       | PR #292, repaired commit `c4ad231471deba354bd018550b2378f2d740b944`; 9499 checks recorded and external adversarial review receipt     | Local in-memory experiment; comparison-budget observations are not a portable worst-case proof; evidence ingress is not hardened for arbitrary object graphs |
| IEEE format/rounding source | PR #294 at `864766232988181e72ae18c235dbc815466b3a1d` supplies clause review and explicit R3 author applicability                     | No longer an unavailable-paper task; not independent approval of Holm code, policy or scientific inputs                                                      |
| D0 declaration structure    | PR #276 plus review #280, fixed `25de2d2b97934476dc2ae49eeb3fa5143a74e131`                                                            | Structure and relationships only; result payloads explicitly deferred; no p origin-to-number binding                                                         |
| Candidate map               | PR #277 plus review #282, fixed `a5213b446df0ec1de09d557c0c6933320f470452`                                                            | Historical priorities remain useful, but B-1 and IEEE pending prose have later successors; do not repeat already completed source work                       |
| Whole R3                    | Opening scope and 49 entries remain preserved                                                                                         | One executable transform does not complete 15 candidates, scientific validity, public Contract/check integration or release gates                            |

B-1's missing ordinary-Holm source-review connection has a bounded successor in
PR #289. B-2 has design and implementation evidence in PR #290/#292 plus the
IEEE supplement. This planning document does not formally close B-2: independent
review applicability and promotion remain separate decisions. Preserve the old
reports as dated records and cite successors rather than rewriting their findings.

## Recommended bounded sequence

| Order | Task and owner role                                                  | Concrete deliverable / stopping point                                                                                                             | Dependency                                                                                |
| ----- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1     | Preparation implementer: D0-to-Holm binding design                   | One sidecar design, exact identity/byte mapping and positive/negative acceptance table; no numerical formula changes                              | Fixed D0 and Holm packets only; no new paper, Naik, R2 callback or R4 completion required |
| 2     | External reviewer: narrow design review                              | Check analysis/family/member/origin confusion, representation loss, false scientific claims and size/refusal rules; record exact reviewed commit  | Task 1; request review once the design is concrete                                        |
| 3     | Preparation implementer: bounded bridge experiment                   | Validate expected D0 context and supplied-p sidecar, call pinned Holm, verify exact output; preserve historical schemas and code                  | Reviewed design plus any small repairs                                                    |
| 4     | External reviewer and author intake: implementation review and close | Reproduce binding mutations, normal/-O, dependency origins and whole-call resource bounds; fix concrete findings and close the experimental round | Task 3                                                                                    |
| Later | Method/gate owners: scientific and public promotion work             | Choose p-producing procedure and its validity evidence, supported domain/platform, official schema/check/version and required decisions           | Separate scope and evidence; not implied by tasks 1-4                                     |

The first closure target is **one reviewed declaration-to-transform connection**,
with scientific validity still not asserted. Do not add a second method, an alpha
API, confidence intervals or R4 integration merely to complete this round.

## Actual connection gaps

| D0 surface                                                           | Holm experiment                                               | Required next design decision                                                                                                                                        |
| -------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `analyses[].analysis_id`, dataset/design/population references       | No analysis, dataset, design or population field              | Bind the complete expected analysis context separately; family label alone is insufficient                                                                           |
| `families[].family_id` and `analysis_id`                             | One `family` ASCII label                                      | Exact cross-reference plus analysis binding; no concatenation that can collide                                                                                       |
| `families[].members[].member_id`                                     | Unique `hypothesis` per carrier                               | Explicit one-to-one coverage in a chosen declared order; IDs can recur across different families, so never use member ID globally                                    |
| D0 IDs are nonempty strings without Holm's ASCII/64-byte restriction | Labels use bounded ASCII                                      | Specify a narrower bridge admission or separately reviewed encoding; never truncate, normalize or silently rename                                                    |
| Result slot `result_id`, `contract_ref`, kind and member coverage    | Transform copies carrier but no result-slot/Contract identity | Bind an explicitly selected multiplicity-adjustment slot and unissued method descriptor; example Contract IDs are not issued Contracts                               |
| `payload_status=method_payload_deferred`                             | Supplied p bytes and exact adjusted lattice values            | Use a separate exploratory sidecar, not an added property that the frozen D0 schema rejects                                                                          |
| No numerical raw-p origin payload                                    | `origin` is a label, repeatable across hypotheses             | Sidecar needs explicit expected origin/member/byte associations. A label does not prove p-generation or marginal validity                                            |
| Family/member/procedure selection declarations                       | No selection interpretation                                   | Preserve and bind declarations; do not certify chronology or infer FWER eligibility from `before`                                                                    |
| Strict JSON/JCS ingress in D0                                        | Eight binary64 bytes in Python                                | Specify exact represented-value transport and signed-zero/domain handling; use existing strict ingress for any future raw JSON entry, no permissive alternate parser |
| Fixed family sets and result member coverage                         | Original ordering affects trace and identity                  | Record the order mapping; sorting p-values is numerical order, not permission to reorder or drop submitted members                                                   |

The expected D0 context and expected p association should be supplied independently
of the evidence being checked. A submitter cannot choose both its own target and
the evidence for that target. An experimental binding of the full context should
reuse existing canonicalization where needed without claiming a new official
Record identity. The next design must choose and document the exact mechanism;
this plan does not freeze a digest or wire format.

Minimum tests for that design: two analyses with identical member names and p
values; swapped family or origin; changed population/design/selection with the
same numerical p; missing/duplicate member; reversed pair direction; ASCII label
boundary; changed raw p; changed exact adjusted value with unchanged display;
diagnostic-only comparison changes; wrong slot kind; extra payload fields;
malformed/oversized structures before expensive work; dependency mutation/origin;
and no partial acceptance. The bridge includes no probability generator. Ordinary
Holm does not require an omnibus test to have run first.

## Work that should remain separate

- Valid marginal p-values and selection: numbers in [0,1], exact arithmetic and
  labels do not prove super-uniformity. Rounding an ideal p-variable can change
  that property. Select and review an upstream scientific procedure before any
  FWER acceptance; the first bridge remains arithmetic/identity-only.
- R2 reuse: conditional on the selected producing procedure and released/approved
  identities. Supplied-p Holm itself needs no t, range or multivariate-t kernel.
- R4 reuse: its two-factor experiment is not the R3 independent one-way k>=3
  scope. Do not wire it into R3 merely because both produce probability values.
- Method queue: retain PR #277's historical order after Holm: PVL-01, PVL-07,
  PVL-02, PVL-04, FDR-02, FDR-01, CLS-01, OMN-01, OMN-02, APR-09, APR-01,
  APR-02, MTO-01, HET-01. This is a backlog, not concurrent authorization.
  Different dependence, variance and distribution requirements need their own
  claims and review; Bonferroni is a fallback, not necessary for the Holm bridge.
- OMN-02, APR-09/SR-G and SR-K enabling-premise exclusions remain effective.
  The Welch source supplement does not itself authorize reentry of those claims.
- Naik/MTO-02 is a separate source follow-up described in NAIK-INTAKE.md. MTO-02
  remains RES-ONLY; obtaining a paper does not add it to the 15 R3-CAND entries.

## Validation and close of this planning task

Inspected pinned reports, source acceptance, code, schema and example; recorded
commit/blob/SHA-256 identities in INPUTS.json. This is no new numerical test run
or PDF rereading. Formatting, Markdown lint and repository validation are run on
this addition. No change to R4, existing candidate files, registry, public opening
state, 15/27/5/2 classification, formal acceptance, merge or release is made.

The planning task can close once this packet is saved. Next substantive work is
task 1, while the R4 review can continue independently. If Naik arrives first,
perform its bounded intake without expanding the Holm bridge's dependencies.
