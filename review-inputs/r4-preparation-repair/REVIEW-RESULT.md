# Release 4 Preparation Repair — Independent Repair-Confirmation Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension                | Result                                                                                                                                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repair (SF-1 / SF-2)     | **`GO`** as a faithful, bounded prose transcription of the numerical review at the exact head only; one wording `SHOULD-FIX` (SF-R1) that changes no number (Section 5)                                                 |
| Editorial N-1 to N-5     | addressed or deliberately preserved as the handoff table states; wording confirmed (Section 6)                                                                                                                          |
| Impact inventory (R4-P5) | **advanced, `NOT_CLOSED`**: fifteen cited existing requirements are correctly identified as unchanged constraints; one governance-agreement `SHOULD-FIX` (SF-R2); final allocations still missing (Section 7)           |
| Source access            | **`SOURCE_ACCESS_INCOMPLETE`** for S1 and S5; the user's Cochran report is recorded as attributed testimony only; every candidate host is blocked from this container; no message sent, no purchase made (Section 8)    |
| Public-opening readiness | **`NOT_READY`**; unchanged by this repair and not claimed otherwise by it (Section 9)                                                                                                                                   |
| Findings                 | 0 `BLOCKER`, 2 `SHOULD-FIX`, 5 `NICE-TO-HAVE` (Section 10); no count, hash, witness or verdict of the preserved reviews is invalidated                                                                                  |
| Independence             | model, provider and work-context independence from the author; same provider and model family as the two preserved reviews (Section 2)                                                                                  |
| Holds                    | programme semantic and numerical `INPUT_INCOMPLETE`, S1–S6, R4-P1 to R4-P6 and the QR supplement's `COMPLETE_ON_PROVIDED_COPIES` disposition are unchanged; SF closure of the numerical review is proposed, not granted |

`GO` here means only that the author-side repair transcribes the numerical review's Sections
5.4–5.5 and SF-1/SF-2 faithfully, that the preserved review blobs and the PR 218 probe inputs
are byte-identical to their sources, and that the new inventory correctly distinguishes existing
constraints from meaning changes. It is not merge approval, method adoption, R4-P5 closure, an
RFC window, identifier allocation or a Release 3 change.

## 2. Independence, roles and boundary

- **Author of the reviewed increment.** The handoff, inventory, supplement repair, draft repair
  and source follow-up record OpenAI Codex assistance in the maintainer's task context. This
  review did not consult that context or any intermediate author material.
- **Reviewer.** An Anthropic model, `claude-fable-5-1`, in a Claude Code remote session
  (`session_01ARmaogDcn1Q1B8XHd9AsRP`), in a fresh container cloned at session start. The
  session service reported `session_context.model` and `last_served_model` as
  `claude-fable-5-1`. This satisfies the separate-model requirement of the research gate in
  `governance/RFC.md` with respect to the author. It is **not** independence from the two
  preserved reviews, which were produced by the same model identifier in a different session
  (`session_013ko6ZfBtBaYEc9kJtVDZRk`); this review therefore checks the author's transcription
  of those reviews and does not re-adjudicate their numerical or editorial verdicts. The
  repository maintainer (GitHub `tasuku-kobayashi`) commissioned the authoring, the earlier
  reviews and this review. No human expert review supplemented this pass.
- **Assistance.** No other model, service or person contributed. External code executed:
  CPython 3.11.15 (pure Python, no NumPy), pnpm, Node and the repository's own tooling. No
  network resource was reached (Section 8).
- **Git metadata.** The commit author field carries the session tooling identity; the
  accountable role, scope and boundary are those stated here.

## 3. Exact identity

All identities were re-derived from Git objects fetched into the session clone on 2026-09-08.

| Field                   | Value                                                                                        | Matches handoff |
| ----------------------- | -------------------------------------------------------------------------------------------- | --------------- |
| Repository              | `licklider-ai/nomue-protocol`                                                                | yes             |
| Branch resolved once    | `research/r4-reviewed-preparation-repair`                                                    | yes             |
| Head                    | `ed7bfeb9f9ca2cee6e8766e90d9ee6a5091cb68b`                                                   | yes             |
| Sole parent             | `bf4004694f68018534e01bde2f2a33214accba19` (PR 219 input; live head of PR 219)               | yes             |
| Tree                    | `03123d4a74b3ec849abc0cdbb0bf36e7b5cdbad0`                                                   | —               |
| Delta vs parent         | 7 files (4 added, 3 modified), 1046 insertions, 12 deletions                                 | yes             |
| Pull request            | 223, draft, open, base `research/r4-rfc-preparation-draft` at `bf400469…`                    | —               |
| Review source commit    | `c8ce35c54397ca05e3a6656f5c98b5e1376e0e14`, sole parent `cd217f88…`                          | yes             |
| Baseline named by input | `cd217f88238a2ecc57b72f5835a813d92270f5ad` = `origin/main` at review time                    | yes             |
| PR 218 input            | `4cf3e12acc77bd38c09d5acd2588ede66ee265b2` = live head of PR 218; sole parent of `bf400469…` | yes             |

Changed blobs at the head (paths under `governance/drafts/release-4-preparation/` unless
stated), with SHA-256 of the file bytes:

| File                                                              | Change   | Blob (parent → head)                                     | SHA-256 at head                                                    |
| ----------------------------------------------------------------- | -------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| `review-repair-handoff.md`                                        | added    | `659d484ac9d29ac912ae32bae69c16fa4c907f9d`               | `763071a8e223adf1be26f187e0a72734297f5d423fb9723ac223dc83b5ba618d` |
| `rfc-impact-inventory.md`                                         | added    | `6f732cd863c250dc5d93ccb7c13ba6549a1aa03a`               | `8cef22dd782e587506b7360a6f2a45f2ab30ec95ea92abfaf56933de0d2c96cc` |
| `rfc-preparation-draft.md`                                        | modified | `31236268…` → `5c7200e2a235f5b9dab5cf284908e57158807542` | `3505e8b6cc9527b48af1ff4b903be279d6f4514c298358bdb0ee49211acb76f5` |
| `source-followup-2026-09-08.md`                                   | modified | `0a6065ae…` → `ccff6f78e6ec8f8efb5400d3af14eb511edfada9` | `ba7e167c23bff758dbadaf2818d52ab1c29be72950dadf70179bef9c1ced2799` |
| `ss-f-propagation-supplement.md`                                  | modified | `2613a182…` → `bcd8aab5f045732a0c9220817b25aea2d59aa171` | `8b8d737c08c3a3efbc04fb21f41d8bd5f75139ee6f7897ad188ec091a10bd458` |
| `review-inputs/r4-public-discussion-preparation/REVIEW-RESULT.md` | added    | `4ee8f5fcff4e042aadd44d9e64f8c6bcb6e7a2d4`               | `1e6d60a3b31632468254dea50c19c18cd9e5a95d3e4508686ce89d76d91d9b1d` |
| `review-inputs/r4-rfc-preparation/REVIEW-RESULT.md`               | added    | `ffd948d7cd2e6d91329acddf91e476104bbcaff4`               | `a1d19ab31cbbc01f8aecba9a672f0ed85ff4cb3058658b763f00dfbf144db435` |

**Preserved review blobs.** Both `REVIEW-RESULT.md` blobs at the head are identical, by blob
identifier and by SHA-256, to the blobs at `c8ce35c…`. The numerical review's verdict applies to
`4cf3e12a…` and the editorial review's verdict applies to `bf400469…`, as the handoff states;
neither applies to `ed7bfeb9…`.

**PR 218 inputs.** `probes/ss-f-propagation.py` (blob `a3f9a9a4…`, SHA-256 `8c68703f…`) and
`probes/ss-f-propagation-result.json` (blob `38bd5d8e…`, SHA-256 `418475dc…`) are byte-identical
at `4cf3e12a…`, `bf400469…` and `ed7bfeb9…`; the SHA-256 values equal those recorded in the
numerical review's Section 3, and the script SHA-256 equals the `script_sha256` field inside the
result file. `public-discussion-readiness.md` (`34db33cd…`) and
`public-discussion-review-prompt.md` (`28ee20ac…`) are likewise unchanged. The result file's
`status` field still reads `AUTHOR_EXPLORATORY_NOT_REVIEWED`, which the repaired supplement
correctly describes as retained historical author-run metadata.

No identity differed from the handoff, so no moving head was followed.

## 4. Governance inputs read

`AGENTS.md` and its ordered prerequisites (`CHARTER.md`, `AUTHORITY.md`,
`authority/authority-manifest.yaml`, `registries/requirements.yaml`, `governance/ID-POLICY.md`,
`governance/RFC.md`), `spec/AGENTS.md`, `conformance/AGENTS.md`, `PROTOCOL-ARCHITECTURE.md`,
ADR-0032, `registries/stability-tiers.yaml`, `registries/public-contract-surfaces.yaml`,
`registries/interpretation-bundles.yaml`, `registries/public-checks.yaml`,
`registries/reason-codes.yaml`, `conformance/manifest.yaml`, `spec/profiles/README.md`, the
Release 4 preparation `README.md`, the pinned readiness document, both review prompts, both
preserved review records in full, and the five changed preparation documents at the head. No
directory-local `AGENTS.md` governs `governance/drafts/` or `review-inputs/`.

## 5. SF-1 / SF-2 transcription review

Compared line by line against the numerical review's Sections 5.3–5.5 and 9.

### 5.1 SF-1 — magnitudes and exact-zero denominators

| Repaired supplement statement                                                         | Numerical review source                             | Faithful |
| ------------------------------------------------------------------------------------- | --------------------------------------------------- | -------- |
| 2835 exact `F` targets: 2415 zero, 420 nonzero                                        | Section 5.4                                         | yes      |
| 945 selected-axis targets: 525 zero                                                   | Section 5.4                                         | yes      |
| Spurious nonzero rates 0/2415, 2134/2415, 2281/2415 (cell, qr, centered)              | Section 5.4                                         | yes      |
| Largest spurious `F` at exact zero: 0 / 1.9e-6 / 7.3e-30                              | Section 5.5 table                                   | yes      |
| Largest relative `SSE` error: 8.9e-17 / 1.25e-6 / 2.2e-16                             | Section 5.5 table                                   | yes      |
| Largest exact `F` returned as zero: 2.0e-31 / 3.2e-31 / 4.2e-31                       | Section 5.5 table                                   | yes      |
| All 105/9/3 lost targets below 5e-31, arising from asymmetric input rounding          | Section 5.5 reading (`e=0`, `k ∈ {52, 53, 54, 60}`) | yes      |
| Uncentered QR residual error largest at offset 2^40                                   | Section 5.5 (`e=40`)                                | yes      |
| Magnitudes attributed to the reviewer, not newly measured                             | correct attribution; no new measurement claimed     | yes      |
| Counts do not establish loss of a practically meaningful effect; no general threshold | Section 5.5 reading and SF-1 intent                 | yes      |
| "Limits" paragraph: 105 lost targets, all below 5e-31 in the reviewed analysis        | SF-1 requested exactly this qualification           | yes      |

The literal count table and probe bytes are unchanged (numerical N-1 left as-is, as the handoff
records). The selected-axis rates 462/525 and 501/525 are not transcribed; the handoff does not
require them and their omission loses nothing (N-R1).

**Independent recount of the denominators.** Because the denominators are exact-arithmetic
facts about the corpus, this review recomputed them without NumPy and without the author's or
the earlier reviewer's code: a pure-Python `fractions.Fraction` script (SHA-256
`baaecab2ad577abb843e681e28f7cf61b317850b39cd8c282c48581f1cc6e550`, reproduced in Section 12)
regenerates the 945 datasets from the corpus formula, lifts each value through binary64, forms
cell means and coded coefficients exactly, and counts zero effect sums of squares. Result: 945
cases, 666 with at least one input changed by conversion, 2835 `F` targets of which 2415 are
exactly zero and 420 nonzero, 945 selected-axis targets of which 525 are exactly zero. All four
numbers equal the review's and the repaired supplement's. No floating rerun was performed: the
handoff does not require one for a transcription and no inconsistency warranting one was found.

### 5.2 SF-2 — interpreter as part of the operation definition

| Repaired supplement statement                                                                                 | Numerical review source | Faithful                   |
| ------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------- |
| "The interpreter is part of the operation definition"                                                         | SF-2 wording            | yes                        |
| Three summation sites named: cell means, contrast coefficients, squared residuals                             | Section 5.3             | yes, but see SF-R1         |
| 10 spurious nonzero `F` for `builtin_cell` on CPython 3.11.15 with NumPy 2.3.5, versus zero on CPython 3.12.3 | Section 5.5 table       | yes                        |
| `SSE` counts changed for every route on 3.11                                                                  | SF-2 text               | yes                        |
| NumPy 2.5.3 / OpenBLAS 0.3.34 changed QR rows and both witnesses; `builtin_cell` unchanged                    | Section 5.5 table, N-3  | yes                        |
| "Neither route has a cross-environment bitwise promise"                                                       | Section 5.5 conclusion  | yes; correctly non-ranking |

Coverage of all three summation sites is present. The attribution is ambiguous: the sentence
"builtin sum aggregates cell means, contrast coefficients, and squared residuals in all three
routes" can be read as saying that all three routes obtain cell means and contrast coefficients
from the builtin sum. Per the review's Section 5.3 and the supplement's own earlier graph
description, cell means and contrast coefficients are builtin-sum sites of `builtin_cell` only;
the QR routes obtain coefficients from NumPy `solve`. Only the squared-residual aggregation is
shared by all three routes (SF-R1). No number is affected.

### 5.3 Status line and disposition

"Exploratory record independently reviewed at `4cf3e12a`; subsequent prose repairs await close
review" is accurate: the numerical `GO` attaches to the input head, and this author-side repair
does not carry its own close review, as the supplement's closing paragraph now says. SF closure
is therefore proposed for independent review and this review is that review for the
transcription only; whether the numerical reviewer regards SF-1/SF-2 as closed is not decided
here, though nothing in the transcription contradicts what those findings asked for.

## 6. Editorial finding dispositions

| Finding         | Handoff disposition                                             | Confirmed at head                                                                                                                                                                                                          |
| --------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editorial N-1   | Attribute unverified Yates leads to the returned review         | The four identifiers are listed as leads attributed to the review, with title/author/edition/page-completeness checks required; not presented as acquisition locations                                                     |
| Editorial N-2   | Plural informative documents                                    | "Current preparation changes are informative documents only"                                                                                                                                                               |
| Editorial N-3   | Exploratory acceptance wording                                  | "Accepted as an accurate exploratory QR cancellation record"                                                                                                                                                               |
| Editorial N-4   | Preserve investigation rather than invent bibliographic entries | Follow-up names "independent investigation of whether other appropriate original methodological sources fully establish the retained claims"; no new bibliographic identity is asserted                                    |
| Editorial N-5   | Link magnitude/interpreter evidence from the draft              | New "Review follow-up" section points readers to the repaired supplement's magnitude table and interpreter dependency; the evidence-map row itself is unchanged, which suffices because the draft carries no counts (N-R2) |
| Numerical N-6   | Index both review lanes                                         | The handoff's first paragraph names both `review-inputs/` paths and the head each verdict applies to                                                                                                                       |
| Numerical N-1   | Leave literal counts and probe bytes unchanged                  | Confirmed byte-identical (Section 3)                                                                                                                                                                                       |
| Numerical N-4/5 | Deferred                                                        | Neither is required for any gate; deferral is recorded, not hidden                                                                                                                                                         |

No new normative keyword, identifier, discussion clock, adoption or Release 3 change appears in
any of the five changed preparation documents. All relative links in the changed documents
resolve at the head.

## 7. Impact inventory review (R4-P5)

Reviewed against the owning specification files, `registries/requirements.yaml`,
`registries/stability-tiers.yaml`, `governance/ID-POLICY.md`, ADR-0032,
`PROTOCOL-ARCHITECTURE.md`, `spec/profiles/README.md`, `conformance/AGENTS.md` and the four
registries named in the inventory.

### 7.1 Existing requirement constraints — verified

Every one of the fifteen cited Requirement IDs exists in the registry with `status: active`, has
exactly one anchor in the owning document the inventory names, and carries the stability tier
the inventory states:

| Owning file                                  | Cited IDs and tiers (verified)                                                                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `spec/versioning/interpretation-bundle.md`   | NRS-VERSION-0003 CORE; NRS-VERSION-0004 STABLE-INTENT                                                                            |
| `spec/versioning/multi-bundle-dispatch.md`   | NRS-VERSION-0005 CORE; NRS-VERSION-0007 CORE; NRS-VERSION-0008 STABLE-INTENT; NRS-CORE-0010 CORE; NRS-VERSION-0006 STABLE-INTENT |
| `spec/versioning/public-check-versioning.md` | NRS-VERSION-0009 CORE                                                                                                            |
| `spec/verification/verifier-refusal.md`      | NRS-CORE-0011 STABLE-INTENT; NRS-VERIFY-0018 STABLE-INTENT; NRS-SEC-0004 CORE; NRS-SEC-0005 EXPERIMENTAL                         |
| `spec/verification/public-checks.md`         | NRS-VERIFY-0005 CORE; NRS-CORE-0012 CORE; NRS-VERIFY-0008 EXPERIMENTAL                                                           |

The "Treatment" column describes each as a constraint preserved by an additive, versioned
factorial proposal; none is a meaning change, and the clauses read at their anchors support that
reading. Two treatments deserve explicit confirmation: NRS-VERIFY-0008 is textually
Welch-specific ("recompute the supported Welch result"), so "stays Welch-specific; new factorial
checks do not generalize it in place" is the correct reading rather than a reinterpretation; and
the statement that any refusal-output change "is evaluated as the verifier output contract, which
is independent of a selected bundle" matches the `verifier_output_contract` block of the
interpretation-bundle registry (`verifier_refusal.bundle_independent: true`).

The tier reasoning (new factorial material as an EXPERIMENTAL candidate; preserving a CORE
constraint does not change its tier; changing CORE meaning invokes the CORE process; final tier
and window follow the complete clause/ID assessment) agrees with `registries/stability-tiers.yaml`
and `governance/RFC.md`, and with the editorial review's Section 5.

### 7.2 Constraints present in the same owning files but not cited

These are not errors: the inventory says it is "not an exhaustive affected-ID certification" and
names strict-input, canonicalization, report and profile requirements as still to inspect. They
are listed so the final assessment does not have to rediscover them:

| Owning file                                        | Uncited active IDs                                                                                 | Why they bear on a factorial slice                                                                                                                                                                                                                                                  |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `spec/verification/public-checks.md`               | NRS-VERIFY-0006, 0007, 0009 (EXPERIMENTAL); NRS-SEC-0002 (CORE); NRS-SEC-0003, 0006 (EXPERIMENTAL) | 0007/0009 are the Phase 1 ITGC precondition and declared-result comparison clauses with the same Welch/Phase 1 scoping question as 0008; SEC-0002 forbids Record-supplied code execution; SEC-0003/0006 are the resource limits the "resource maximum" hold must be reconciled with |
| `spec/core/versioning-principles.md`               | NRS-VERSION-0002 (CORE)                                                                            | unsupported version tuples fail closed; directly constrains any new bundle                                                                                                                                                                                                          |
| `spec/verification/verification-report.md`         | NRS-CORE-0008 (STABLE-INTENT), NRS-VERIFY-0011 (CORE), NRS-VERIFY-0012 (STABLE-INTENT)             | report separation, exact Record reference and reason-code requirement constrain new check results and any new reason code                                                                                                                                                           |
| `spec/profiles/independent-two-group-continuous/*` | 26 `NRS-PROFILE-ITGC-*` anchors                                                                    | none should change; listing them as untouched would make the "no ITGC edit" claim checkable                                                                                                                                                                                         |

### 7.3 Proposed destinations — placement observations

- **Baseline.** `cd217f88…` is `origin/main` at review time; the inventory's baseline claim holds.
- **Contract versus Profile.** The inventory places estimands, calculation and non-claims under
  `spec/profiles/balanced-two-factor/`. `PROTOCOL-ARCHITECTURE.md` assigns operation semantics
  to an Analysis Contract and admissibility context to a Profile ("a Profile is not a Contract,
  not a method"); `spec/profiles/README.md` records for the successor P1-A capabilities that the
  statistical procedure is a separate Analysis Contract from the Profile that supplies design
  context; ADR-0032 makes the Contract identifier the successor analytical identity. The
  inventory labels the paths "conditional on the final scope and successor architecture", so this
  is not a meaning change, but the Contract/Profile split and its consequences (which paths carry
  the procedure, which the design admissibility; which namespace token(s)) are a missing final
  allocation (N-R3).
- **Identity scheme (SF-R2).** "Follow the existing bundle registry's identity scheme" is
  ambiguous. The three registered bundles use legacy `urn:nomue:bundle:*` spellings, while
  `governance/ID-POLICY.md` requires identifiers minted from now on to use
  `https://nomue.ai/id/<family>/<name>/<revision>`, with legacy URNs immutable and never used as
  aliases. Read as "the registry's exact-version binding discipline" the sentence is correct;
  read as "the URN spelling of the existing entries" it conflicts with the ID policy. The final
  inventory should cite the minting grammar explicitly.
- **Requirement namespace token.** Under the ID policy, a `NRS-CONTRACT-<TOKEN>` or
  `NRS-PROFILE-<TOKEN>` prefix must appear in the registry's `namespaces` list before any ID using
  it is issued. The inventory correctly allocates nothing, but the token registration is a
  concrete step that the final assessment must include (part of N-R3).
- **Schema path.** `schemas/profiles/balanced-two-factor.schema.json` omits the version segment
  the existing profile schemas carry (`itgc-guarantee-0.2.schema.json`); the inventory says the
  version is unresolved, which is consistent, but the final path will need one (N-R4).
- **Conformance layout.** Existing fixtures are grouped by behavior family (`structural`,
  `semantic`, `public_checks`, `numerical_contract`, `routing`, …) and expectations by phase; a
  `conformance/fixtures/release-4/` directory would introduce a release-named grouping. The
  inventory makes it conditional on the final layout, which is the right posture (N-R4). The
  requirement that expected judgments come from independent truth, hand-authored before
  verifier execution, matches `conformance/AGENTS.md`.
- **Public contract surfaces.** The inventory's instruction to inspect enclosing Record/report
  surfaces is correct; concretely, existing entries such as NRS-PCS-0001 (Record envelope) carry
  an `applies_to_bundle_ids` list that would gain the new bundle, which is an additive edit to an
  existing surface entry rather than a new surface, and should be named as such (N-R5).

### 7.4 What still prevents R4-P5 closure

The inventory resolves the class-only gap the editorial review identified: concrete proposed
paths exist and the existing constraints most obviously touched are named with tiers. It does
not, and does not claim to, supply: (1) the Contract/Profile split and the registered namespace
token(s); (2) exact new clauses and their IDs; (3) identifier spellings for contract, profile,
schema, check and bundle under the HTTPS minting grammar; (4) schema versions, whether a
successor Record or report schema is needed, and the `applies_to_bundle_ids` edits on existing
surfaces; (5) the complete affected-existing-ID list including Section 7.2; (6) conformance
family placement; (7) reference implementation and generated-view destinations; and (8) the
resulting highest affected tier and window. R4-P5 stays `NOT_CLOSED`; the tier remains open.

## 8. Source access and the Cochran report

**User report.** The follow-up records that the commissioning user checked Cambridge University
Press, CiNii, ResearchGate, ScienceDirect, Wiley and SSRN and found no lawful free original PDF
or individual purchase route, with Cambridge's article purchase temporarily unavailable. This
review treats that as attributed testimony about availability on the date reported. It is not a
full-source review, does not establish that no copy exists, and does not waive S1 or S5. The
follow-up's own wording says the same.

**Access from this container.** Attempted 2026-09-08 (09:08 UTC) by direct HTTPS through the
session's egress proxy; every attempt returned a proxy `403` on `CONNECT` and no bytes were
received: `archive.org` (item `in.ernet.dli.2015.449111`), `doi.org` (DOI
`10.1017/S0305004100016595`), `catalog.hathitrust.org` (record `002016019`),
`repository.rothamsted.ac.uk` (item `98765`), `www.cambridge.org`, and `ndlsearch.ndl.go.jp`
(the National Diet Library catalogue, tried to check holdings for a library-delivery route). No
search circuit was repeated. No message, request or purchase was made.

**Lawful next routes (not executed, none verified from here).** (1) Library document delivery:
an institutional interlibrary or document-supply request for the exact Cochran article (Proc.
Camb. Phil. Soc. 30(2), 1934, pp. 178–191) through a university library, a national library
remote-copy service, or a publisher's institutional access; the holding could not be confirmed
from this container. (2) For Yates 1937, the four identifiers listed by the editorial review
remain leads; note that a 1937 monograph by an author who died in 1994 is unlikely to be out of
copyright in the UK, so a digitised copy must be checked for lawful access terms, and inspection
permission stays separate from redistribution permission as the follow-up already states. (3)
Alternative original-source basis, subject to the follow-up's explicit claim mapping and
independent adjudication before any substitution: for the null distribution of the variance
ratio, the original papers that introduced and tabulated it, and for factorial design the
factorial chapter of Fisher's _The Design of Experiments_ (1935), are candidate originals; their
bibliographic identities are stated here from memory, are unverified, and must be confirmed
before use, as the editorial review's N-4 also required.

Status: **`SOURCE_ACCESS_INCOMPLETE`** for S1 and S5. The `COMPLETE_ON_PROVIDED_COPIES`
disposition of the QR supplement's two documentation pages is preserved and was not reopened.

## 9. Public-opening readiness

**`NOT_READY`**, unchanged. R4-P1 (S1/S5 originals for retained claims), R4-P3 beyond the SS/F
probe, R4-P5 (Section 7.4) and R4-P6 (no assembled proposal exists) remain open. This repair
changes no hold; the source follow-up, supplement and draft each say so. The repair verdict in
Section 1 is recorded independently of R4-P5 and of opening readiness, as the handoff requires.

## 10. Findings

### BLOCKER

None.

### SF-R1 (`SHOULD-FIX`) — attribute the three summation sites precisely

In `ss-f-propagation-supplement.md`, replace "builtin sum aggregates cell means, contrast
coefficients, and squared residuals in all three routes" with wording of the form: "the builtin
sum is used at three sites: `builtin_cell` cell means, `builtin_cell` contrast coefficients, and
the squared-residual aggregation of all three routes." As written the sentence can be read as
attributing builtin-sum coefficients to the QR routes, contradicting the graph description
earlier in the same document and the review's Section 5.3. No number changes.

### SF-R2 (`SHOULD-FIX`) — cite the identifier minting grammar

In `rfc-impact-inventory.md`, replace "Follow the existing bundle registry's identity scheme"
with a statement that new contract, profile, schema, check and bundle identifiers are minted
under the `https://nomue.ai/id/<family>/<name>/<revision>` grammar of `governance/ID-POLICY.md`
and ADR-0032, that existing `urn:nomue:*` identifiers stay immutable and are not aliased, and
that the registry's exact-version binding discipline is what is reused. No identifier is
allocated by this correction.

### N-R1 (`NICE-TO-HAVE`)

Add the selected-axis spurious rates (462/525 and 501/525 for `qr` and `centered_qr`) beside the
all-target rates, since the witnesses are selected-axis values.

### N-R2 (`NICE-TO-HAVE`)

In the draft's evidence map, the "SS, SSE and F ratio" row could name the magnitude table and
interpreter dependency directly rather than relying on the "Review follow-up" pointer.

### N-R3 (`NICE-TO-HAVE`, required before R4-P5 closure)

State in the inventory that the Contract/Profile split, the namespace token registration in the
requirements registry, and the resulting path allocation are open, and list the uncited
constraints of Section 7.2 as inspected or pending.

### N-R4 (`NICE-TO-HAVE`)

Note that the proposed schema path will carry a version segment like the existing profile
schemas, and that a release-named conformance directory would be a new grouping convention.

### N-R5 (`NICE-TO-HAVE`)

Name the `applies_to_bundle_ids` edits to existing surface entries as the concrete form of
"enclosing surfaces also change".

## 11. Bounded verdict

| Determination            | Verdict                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| SF-1 / SF-2 repair       | **`GO`** at `ed7bfeb9…` as faithful bounded transcription; SF-R1 wording correction requested                 |
| Editorial N-items        | addressed or preserved as recorded                                                                            |
| Impact inventory         | correct on every cited constraint; SF-R2 correction requested; R4-P5 **`NOT_CLOSED`**                         |
| Source access            | **`SOURCE_ACCESS_INCOMPLETE`**; Cochran report recorded as attributed testimony; routes listed, none executed |
| Public-opening readiness | **`NOT_READY`**                                                                                               |
| Adoption, opening, merge | none requested; none granted; no identifier allocated; Release 3 untouched                                    |

## 12. Validation record

Executed in the session clone after `pnpm install --frozen-lockfile` (pnpm 11.7.0, Node
22.22.2).

At the reviewed head `ed7bfeb9…` (detached checkout, then restored): `pnpm exec prettier
--check` on the seven changed files, pass; `pnpm format:check`, pass; `pnpm lint:markdown`,
374 files, 0 issues; `pnpm typecheck`, pass; `node --import tsx tooling/src/validate.ts`, all
validators clean; `git diff --check bf400469 ed7bfeb9`, clean. These reproduce the validation
claims in the PR 223 description.

On this review branch (`origin/main` `cd217f88…` plus this file): Prettier check on this file,
`pnpm format:check`, `pnpm lint:markdown`, `pnpm typecheck`, `node --import tsx
tooling/src/validate.ts` and `git diff --check` all pass; Markdown lint reported 365 files,
0 issues. The `pnpm check` test suite was not run: no
authoritative, registry, schema, conformance, reference, generated or evidence path is touched
by this review or by the reviewed increment.

Denominator recount script (`denom.py`, SHA-256 `baaecab2…`), run with CPython 3.11.15 and no
third-party package:

```python
from fractions import Fraction as Q
SIGNS=[(1,-1,-1,1),(1,-1,1,-1),(1,1,-1,-1),(1,1,1,1)]
zero_f=0; total_f=0; sel_zero=0; sel_total=0; rounded=0; cases=0
for n in range(2,17):
  for e in (0,20,40):
    for k in (0,20,40,52,53,54,60):
      for axis in (1,2,3):
        intended=[Q(2)**e+s[axis]*Q(2)**(-k)+Q(2*i-(n-1),4) for s in SIGNS for i in range(n)]
        y=[Q(float(v)) for v in intended]
        rounded += any(a!=b for a,b in zip(y,intended)); cases+=1
        means=[sum(y[c*n:(c+1)*n])/n for c in range(4)]
        beta=[sum(means[c]*SIGNS[c][j] for c in range(4))/4 for j in range(4)]
        W=sum((y[c*n+i]-means[c])**2 for c in range(4) for i in range(n))
        assert W!=0
        for j in (1,2,3):
          ss=4*n*beta[j]**2; total_f+=1; zero_f+=(ss==0)
          if j==axis: sel_total+=1; sel_zero+=(ss==0)
print("cases",cases,"rounded_input_cases",rounded)
print("F targets",total_f,"exact zero",zero_f,"nonzero",total_f-zero_f)
print("selected-axis targets",sel_total,"exact zero",sel_zero)
```

Output: `cases 945 rounded_input_cases 666`, `F targets 2835 exact zero 2415 nonzero 420`,
`selected-axis targets 945 exact zero 525`.

Files created by this review: `review-inputs/r4-preparation-repair/REVIEW-RESULT.md` only. The
reviewed documents and all other artifacts are unchanged.

RELEASE 4 PREPARATION REPAIR REVIEW COMPLETE - REPAIR GO AT ed7bfeb9 WITH TWO WORDING SHOULD-FIX - R4-P5 NOT CLOSED - SOURCE ACCESS INCOMPLETE - NOT READY TO OPEN - MODEL-LEVEL INDEPENDENCE ONLY - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
