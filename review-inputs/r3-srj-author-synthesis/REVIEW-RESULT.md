# Limited integration review of the approved SR-J source synthesis

**2026-09-09. Verdict: GO for Part W's integration at
`4d61db593510466f34ca546430d7796ea42d22e1` only. BLOCKER: 0;
SHOULD-FIX: 0; NICE-TO-HAVE: 0.** The approved Part V.5 exception is
faithfully recorded. The three-entry synthesis, six-note treatment, retained
conditions and effective/prospective ledger distinction are supported by the
pinned evidence. This is not formal SR-J acceptance or merge authorization.

## 1. Commission, role and evidence boundary

This report executes Part W.7 of
`governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`
at PR #254's fixed head. The current execution instruction explicitly confirms
that Part V.5's limited change was already approved and requests this review and
a separate draft PR. No renewed approval was sought or inferred.

The reviewer is an OpenAI Codex-assisted integration-review context, separate
from the author/coordinator context identified in W.1. This conversation did not
author PR #248, #250, #253 or #254 or conduct the earlier source investigations.
It did receive historical conversation summaries, including the prior approval,
and read the author and reviewer records before judging the integration. Thus
this is not a blind or history-free review. It uses the same provider family as
the disclosed author context; no different-model-family independence from that
author, independently verified model build, unaided human authorship or formal
Research Gate independence determination is claimed.

The prior source-review record, PR #250 Section 2, reports a separate context and
service-reported `claude-fable-5-1`, distinct from the author provider family.
Those are attributed process disclosures, not model-build attestations verified
here. The later steward decision still needs a scoped independence account.
This report supplies a separate integration assessment; it does not replace or
silently upgrade the prior primary-source review.

Read: AGENTS.md and all six ordered Read-first documents; the acquisition
commission; Parts V and W; PR #253's proposal and PR #254's approval account;
the complete pinned author and independent reports; and the diagnostic source.
Targeted historical checks covered T.3's Marcus statement and framework row,
and the fixed semantic catalogue's source, entry and hold rows. No nested
AGENTS.md applies to this report path.

The two original-source readings in PR #248 and #250 are explicitly reused.
No original PDF was acquired, re-hashed, rendered or read in this pass. No
statistical program or simulation was run. No changed or disputed scientific
claim requiring a new original-page inspection emerged from the integration
comparison, so W.7 item 5's conditional PDF step was not triggered. The proof
conditions below were checked for faithful representation, not claimed as a
third primary-source proof audit.

## 2. Fixed identities and preservation

Git objects were obtained in an isolated clone from an existing local public
repository object store. The connected GitHub interface independently confirmed
the live PR head, fixed commit, file content and PR metadata. Direct Git network
access was not used successfully; no network fetch success is claimed. Git
object IDs, raw bytes and SHA-256 values below were recomputed locally.

| Object                           | Verified identity                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| Reviewed head                    | `4d61db593510466f34ca546430d7796ea42d22e1`                                              |
| Sole parent, PR #253             | `55a073525ec685278cf40731d61b1b17ec0882aa`                                              |
| Reviewed tree                    | `63345297c0c8e17a46bad0d53d6e1d7cdbce2738`                                              |
| Parent's sole parent / tree      | `2ba1f1672af6846414439cb3db9524828d0ac8ac` / `31283beac9d9235fb696163b2815d72f4726833f` |
| Reviewed result blob             | `00bb45c9b59bb8989e870c74e982bdabbea35821`                                              |
| Reviewed result bytes / SHA-256  | 512073 / `aec2c605204539e8a5c5b935017e8fa810d2303683c8cb8904ee92e9aecea27d`             |
| Preserved Parts A-V blob         | `5f4b136bfaa76a2942e112e1e3776b247f148152`                                              |
| Preserved prefix bytes / SHA-256 | 487459 / `7f3fc1361a8605651b4771d2949e94634e050ce94cf57200f2f026bfd917cdc6`             |
| Acquisition commission blob      | `3c7ddcc696f0c284213f7efe0da68e747bc238d7`                                              |
| Commission bytes / SHA-256       | 8158 / `9bbb22f6002692baa5e1e341b5998cc71c1937d99c0ee4babcefca8bd79a9418`               |
| Fixed semantic comparison / tree | `7bd9c5ab854777c3e99e624d9d2ed62731228852` / `f0436f5784dbe34d4c150893c20a60f0431c5d90` |
| Fixed semantic result blob       | `8f21526040924b891f64724c2d0fde9ea94eff92`                                              |

The complete parent result is exactly the first 487459 bytes of the reviewed
result. The diff is one file, 243 inserted lines and zero deletions. Every other
tracked path, including every prior report, script, commission, catalogue,
authoritative artifact and R4 file, is unchanged against the sole parent.
The commission blob also matches at PR #248, #250 and #253.

| Reused packet  | Recomputed commit / sole parent / tree                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| PR #248 author | `cbbc51143b82d97b29afaa0902ee2a42456d3166` / `95683fc99403dc614e4722fb2ee7ab2760afed37` / `027e6f895664180fc12db7af76043a1fdbdc2853` |
| PR #250 review | `2ba1f1672af6846414439cb3db9524828d0ac8ac` / `cbbc51143b82d97b29afaa0902ee2a42456d3166` / `405354f691b7dd23c562fa8c2007d36db2500959` |

The author commit adds only its report and diagnostic (394 + 120 lines).
The independent-review commit adds only its report (356 lines). The following
artifacts also match their original commits byte for byte at the reviewed head:

| Path                                                          | Blob                                       | Bytes | SHA-256                                                            |
| ------------------------------------------------------------- | ------------------------------------------ | ----: | ------------------------------------------------------------------ |
| `review-inputs/r3-srj-primary-followup/REVIEW-RESULT.md`      | `572ffb3763a48b57ad77cbde30179728d8a8d5c3` | 27075 | `2c89bd1d153c5f79467aa14009dfa962aff929466ef67cbed34e75b8872a8fbc` |
| `review-inputs/r3-srj-primary-followup/check-srj.py`          | `7cec5f5bc1e31d0075ba1b6cc9184b677a44ffd2` |  5008 | `30c450d417828171a54900d34010945f20c282e779785be6beb22e92f11280d2` |
| `review-inputs/r3-srj-primary-followup/INDEPENDENT-REVIEW.md` | `87fcc45f8a9185884cc2428b83c814629523d7fc` | 28010 | `bb0db4ea2c51b83f545568debd11739a2d0a77e0fdda227e474817e9aa99fbf8` |
| `review-inputs/r3-srd-acceptance/REVIEW-RESULT.md`            | `da6172063d72b3799e1cd47884c496901a6843c7` | 17531 | `d50ad6fb2fce7c2f399c27230da400d2912f59d8ce048c19b7e27be7efdbe882` |

The GitHub-resolved main comparison snapshot was
`0abdca8f822d0de3faf35f218f762a951fd75e9e`. The seven Read-first blobs match
that named snapshot; this is not a claim about a future main tip.

| Read-first path                     | Matching blob at input and main snapshot   |
| ----------------------------------- | ------------------------------------------ |
| `AGENTS.md`                         | `3ed723a20931b70284ea96cb33872bd0b60923fb` |
| `CHARTER.md`                        | `1dead95488bae31f80f25424bb3a5515fda119fb` |
| `AUTHORITY.md`                      | `7b55e8ba6698d69431d952945a9253c2331122d0` |
| `authority/authority-manifest.yaml` | `66e88f8322defd12e9a5f9ce34b576a87110fdce` |
| `registries/requirements.yaml`      | `52bdd7483c7f043376e30d2e78028ff749f49528` |
| `governance/ID-POLICY.md`           | `2bb2fe4613d156bb7ddab81d9a24a2e29f4ccdce` |
| `governance/RFC.md`                 | `9fa3bdd2e273ed9569385e34bce0bbef2559b131` |

PR #254's body names the same fixed head, parent, tree, changed path, blob, byte
count, hash and prefix. PR #253's four-point proposal matches V.5. Metadata for
PR #248 and PR #250 match the packet identities above. The connected workflow lookup
also confirms Part V run `34313909808` and Part W run `34314429603` completed
successfully for their respective queried commits. These are upstream CI facts,
distinct from this review's local checks.

## 3. Approved exception: four-point comparison

| V.5 point                                        | W.2 application and integration check                                                                                                                                                                                                                                                  | Result   |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1: bounded MTO-02 primary basis                  | W.2.1 uses inspected Dunnett-Tamhane 1991 pp.940-947 for specified-control step-down characterization, with V.3/V.4 and author Sections 4.1-4.4 limits. W.4 retains the model, labelled subset and output limits.                                                                      | Faithful |
| 2: Naik exception only for that characterization | W.2.2 removes precisely that mandatory input while preserving the unread 1975 formulation, attribution, priority and variant relationship. It explicitly denies a verified reconstruction or absence of a distinct relevant Naik variant. W.6 retains acquisition and reopen triggers. | Faithful |
| 3: all other obligations and evidence boundaries | W.2.3, W.4-W.6 retain MTO-03, MCB-01, other holds, 1992 calibration/existence/imported-proof/conjecture limits and author-versus-source attribution. No additional assigned original is waived.                                                                                        | Faithful |
| 4: synthesis/review authorization only           | W's status and W.2.4 authorize the synthesis and review; W.6 leaves acceptance and scoped independence pending, keeps the effective ledger and makes 9/1/4 conditional. No method, implementation, merge, opening or release is authorized.                                            | Faithful |

W.2's approval account agrees with the approval available in the supplied
conversation context and the user's present explicit confirmation. It identifies
an English account of one conversation decision, not a signed GitHub vote or
additional approval derived from PR #250's GO. This review verifies faithful
recording; it does not attest the unseen full conversation transcript or create
a new approval. Historical NOT YET APPROVED language in V.5 remains correctly
preserved and is explicitly superseded for current use by W.2. It is not an
unresolved request for approval.

## 4. Three-entry source and claim comparison

The following PDF identities and printed-page mappings agree between W.3,
author Section 2 and independent-review Section 3. They are reused custody
evidence, not new measurements of PDFs in this pass.

| Original                          | Bytes / pages / SHA-256                                                           | Reused claim pinpoints                                                                             |
| --------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Supplier 42, Dunnett-Tamhane 1991 | 634124 / 9 / `ed93660e9e8286f1ff2e0026f972c783ac523ac96465e1689e17b4f99a960161`   | pp.940-943, 945-947; author Section 4 and review Section 4; printed page = one-based PDF page +938 |
| Supplier 29, Dunnett-Tamhane 1992 | 1099979 / 10 / `f1144f4ca64d874d1d812cfc6b0b8f9d275d2251619796805d5ac955594386f6` | pp.163-165, 168-170; author Section 5 and review Section 5; PDF pages 2-10 +160, page 1 cover      |
| Supplier 05, Hsu 1984             | 649578 / 9 / `ac190ceeb614141b64da413248d94e3a3cfe050ab42be31ef7b4dc8db089065b`   | pp.1137-1141; author Section 6 and review Section 6; printed page = one-based PDF page +1135       |

| Entry  | Assumptions, family and target checked against the pinned reports                                                                                                                                                                                               | Rule, guarantee and output retained by W.4                                                                                                                                                                                                                                                                                       | Limitation assessment                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MTO-02 | Fixed treatment-versus-specified-control family; independent normal groups, common unknown variance, independent pooled chi-square scale and fixed df; unequal sizes allowed; one-sided margin null or two-sided point null.                                    | Observed ordering carries sample sizes and correlation labels with it. Step-down uses labelled remaining-subset maximum quantiles and stops at first nonrejection. Adjusted p is the suffix maximum of local joint tails. Source strong-FWER statement and the separately attributed sufficient author argument remain distinct. | No unequal-variance robustness, average-correlation guarantee or across-family/endpoints guarantee. Strict critical-value versus inclusive p-value endpoint convention remains unresolved for implementation. Table IV confidence limits stay single-step, not step-down-compatible. Naik lineage remains unverified.                                                                                                                    |
| MTO-03 | Fixed common-variance, common-correlation normal family with independent chi-square scale; equal treatment sizes with possibly different control size in the many-to-one example.                                                                               | First crossing in increasing order rejects it and all larger statistics. Nondecreasing constants require ordered-event calibration for every subset size. Adjusted p uses implicit local calibrations and a prefix minimum. The author argument gives a conditional strong-FWER bound given valid calibration and monotonicity.  | This is not step-down maximum recursion. General finite monotone-solution existence is not certified. The m=2 existence proof, m=2 superiority inequality proof and least-favourable theorem proof remain in the unread 1990 report. Larger-m superiority remains conjectural. Unequal/average-correlation extensions and liberal replacement constants are not supported. Finite-df zero correlation is not independence of t variates. |
| MCB-01 | Fixed treatment set; independent equal-size samples from a common absolutely continuous location family; translation-equivariant statistics and the calibrated event with the theorem's region premises. Target is each location minus the best other location. | Simultaneous coverage is at least P*, where P* is at least 1/k. The simple parametric interval is `[min(Delta_i-d,0), max(Delta_i+d,0)]`, with Delta using the observed best other treatment and d calibrated to the model/scale. The source theorem and author event-inclusion argument stay separate.                          | Best-other is neither specified-control nor best-including-self. Every interval contains zero, so the source's subset/indifference-zone selection interpretation is retained. No exact-everywhere coverage, unique-best, arbitrary univariate cutoff, all-pairs or broader nonparametric/best-t guarantee is inferred.                                                                                                                   |

The fixed semantic catalogue places all three entries under SR-J and RES-ONLY.
W.4 explicitly narrows its former joint shrinking-subset description for MTO-03
without editing the catalogue or allocating/redefining an ID. The narrowing is
supported by both pinned readings. No observed result is used to establish
prospective family membership or model validity.

The acquisition commission's CLOSED criterion concerns decision-bearing claims
within the supported characterization. The author report's Section 7 explicitly
does not make every cited proof a new mandatory commission input: stronger
claims require those sources, while the conditional characterization remains.
Accordingly, W.6's candidate does not silently waive the 1990 report or certify
its proofs. The sole approved mandatory-input exception is the bounded Naik
exception. A stronger existence, superiority or variant claim would require
reopening; it cannot inherit this GO.

## 5. Six-note disposition and numerical evidence

| PR #250 note | Checked treatment in V.3 and W.5                                                                                                                                                                                | Assessment                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| N-1          | Explicit Table-II-only scope, hard-coded control size 11, treatment-size argument only, and Table IV's different control size. Static inspection confirms the diagnostic still contains `11 + np.array(sizes)`. | Documentation option fulfilled; no generic API or code repair is claimed.                               |
| N-2          | Both m=2 proofs are explicitly cited to the unread 1990 report; larger-m superiority remains conjectural.                                                                                                       | No inspected-proof or unconditional-superiority upgrade.                                                |
| N-3          | Conditional bound for every configuration given valid calibration and nondecreasing constants; least-favourable theorem not needed for this sufficient bound.                                                   | No general existence or unequal-correlation proof inferred.                                             |
| N-4          | .108618427 is the marginal Bonferroni bound; .170334133 is the suffix-maximum Holm bound.                                                                                                                       | Correct successor terminology; original report and printed diagnostic label remain historical evidence. |
| N-5          | Author and reviewer main hashes are dated comparison snapshots.                                                                                                                                                 | Correct; this review independently names its own main snapshot in Section 2.                            |
| N-6          | Table IV printed p is already adjusted; local versus adjusted example is explicitly attributed to PR #250.                                                                                                      | No attribution to the Table-II-only diagnostic or new computation.                                      |

W.5 accurately separates the p.942 bound's target error from numerical errata.
The local-tail union bound and its cumulative adjusted counterpart are distinct;
the correction does not invalidate the stopped step-down rule. Its numerical
values are carried from the pinned reports, not recalculated here.

The author evidence is one quadrature construction with orders 64/96 and a .001
rounded-input diagnostic, not a certified error bound. PR #250 adds separately
attributed adaptive quadrature, cell-count dynamic programming and a Genz
cross-check for selected settings. Its coverage is 1991 Tables II/III and the
reported Table IV quantities; 1992 Table 1 at two settings, Table 6 and part of
Table 7. V.2/W.5 do not claim a full-table audit, full step-up adjusted-p results,
two-sided step-up constants or Hsu coverage simulation. The 594 author cases and
14,417 reviewer randomized configurations are event checks, not coverage proofs.

The rounding-envelope account does not identify the exact unprinted data.
Reviewer auxiliary programs were not committed in its one-file change; W.5
correctly avoids claiming a complete independently executable oracle packet.
Supplier 29's archive hash, the author's image-viewing process, publisher failure
and Naik DOI are not independently established by PR #250. W.3 and V.2 retain
those acquisition/process limits; this review does not upgrade them.

## 6. Bibliography and historical correction

Author Section 7 and independent-review Section 7 agree that the inspected
1991 p.947 and 1992 p.170 lists identify Naik (1975), volume 4, pp.519-535,
and Marcus, Peritz and Gabriel (1976), Biometrika 63:655-660. The Naik page count
is 535 - 519 + 1 = 17. X-3 is bibliographic identity only; content, formulation,
priority and lineage remain unverified.

The positive reference-list evidence supports X-8 mapping to the existing
SRC-18. Neither report claims to establish every Marcus publication or an unseen
drafter's intent. T.3 really did characterize X-8 as a separate single-author
paper. V.4 explicitly corrects that overstatement, and W.5 carries the correction
forward while preserving the original bytes. T.3's SRC-18 framework row is already
the three-author source. The correction therefore introduces no duplicate custody
item and no expansion or reversal of the accepted SR-D scope. Its use here is
framework context, not evidence that Naik was read.

## 7. Candidate, ledgers and retained conditions

The candidate is eligible to be presented for a separate bounded formal
acceptance decision. W's opening status, W.2.4 and W.6 consistently distinguish
that recommendation from an effective SR-J decision. The two ledgers are:

| Disposition      | Effective members                              | Effective count | Conditional count after separate SR-J acceptance |
| ---------------- | ---------------------------------------------- | --------------: | -----------------------------------------------: |
| CLOSED           | SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-K, SR-L |               8 |                              9, adding only SR-J |
| PARTIAL          | SR-H                                           |               1 |                                                1 |
| INPUT_INCOMPLETE | SR-A, SR-E, SR-J, RSM-01, RSM-02               |               5 |                            4, removing only SR-J |

The rows contain 14 unique entries. Current 8/1/5 and prospective 9/1/4 each
sum to 14. The carried SR-J status records pending governance, not a pending
V.5 source-basis approval. Neither PR #250's record-only GO nor this integration
GO moves that row. Formal acceptance and the scoped independence determination
remain pending.

Overall INPUT_INCOMPLETE, SOURCE_SET_READY=false, NARROW, TRANSFER, all
R3-CAND/RES-ONLY tokens, the scoped SR-D/SR-I acceptances, all other holds,
custody 42+1 and R4 remain unchanged. Even prospective SR-J acceptance leaves
four incomplete entries and SR-H partial; it cannot establish comprehensive
public-opening readiness.

All five W.6 reopen conditions are retained and meaningful:

1. Acquire Naik pp.519-535 if it becomes available or its original formulation,
   priority, lineage or a distinct relevant variant becomes decision-bearing.
2. Obtain the relevant proof sources for stronger 1992 existence,
   least-favourable, superiority or unequal-correlation claims; the 1990 report
   remains unread and is not waived for such claims.
3. Before using numerical results as implementation evidence, supply an
   independently reproducible method and explicit error, rounding, parameter
   and endpoint conventions. The .001 diagnostic is not a Public Check tolerance.
4. Inspect the primary basis for step-down-compatible intervals, directional
   error, heteroscedasticity, cross-family control, average-correlation or broader
   Hsu variants/outputs.
5. Reopen on contradictory source evidence, a distinct material in-scope variant
   or a defect in a relied-upon proof/calibration, preserving historical findings.

## 8. Validation and delivery

Environment: Linux; Git 2.51.1; Node v24.19.0; pnpm 11.19.0; Prettier 3.9.6;
markdownlint-cli2 0.23.2; tsx 4.23.11. Python 3.12.14 was used for byte/hash and
Git-object checks only. Dependencies were copied locally from an existing public
repository checkout after byte-comparing its lockfile. The pnpm launcher then
performed its automatic install check and reported the lockfile and dependencies
already up to date. No fresh network installation is claimed. The package
declares pnpm 11.7.0; the actual launcher is disclosed above. No tracked
dependency or lockfile was changed.

Only `review-inputs/r3-srj-author-synthesis/REVIEW-RESULT.md` is added on the
neutral review branch from the fixed input. It changes no authoritative artifact,
public contract, schema version or check behavior; no registry edit is needed.

| Check on the resulting review tree          | Actual outcome                                                                                                                                                                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                         | Exit 0; All matched files use Prettier code style!                                                                                                                                                                               |
| `pnpm lint:markdown`                        | Exit 0; 363 files; Summary: 0 issues in 0 files.                                                                                                                                                                                 |
| `node --import tsx tooling/src/validate.ts` | Exit 0; validate: OK; registries, traceability, normative lint, authority, gates, conformance manifest, links, private-dependency/language audits, phase-1 schemas, cross-checks, code-path audits and snapshot mechanism clean. |
| `git diff --cached --check`                 | Exit 0; no output.                                                                                                                                                                                                               |

The first markdown-lint pass found MD018 on a wrapped line beginning with a PR
number. The sentence in this new report was reworded, then all four checks were
rerun on the resulting tree; the table records the final results.

Not run: full pnpm check, tests, typecheck, generated checks, Phase 1/2 suites,
the author statistical diagnostic, independent statistical recalculations,
coverage simulation or any new original-source acquisition/inspection.

The delivery PR records the full review commit, sole parent, tree, report blob,
bytes and SHA-256, plus the final live-head recheck. Its base is
`research/r3-srj-author-synthesis-20260909`. No historical report, source file,
script, ledger or authoritative artifact is edited.

## 9. Findings and bounded verdict

| Severity     | Count | Disposition |
| ------------ | ----: | ----------- |
| BLOCKER      |     0 | None        |
| SHOULD-FIX   |     0 | None        |
| NICE-TO-HAVE |     0 | None        |

**GO for the limited integration at the fixed Part W head.** No bounded repair
or additional primary-source investigation is required before the coordinator
presents a separate concrete formal SR-J acceptance proposal with the scoped
independence account and the preserved limits above. That decision is not
automatic. This review does not accept SR-J, merge any PR, adopt a method,
implement a procedure, open public discussion or release anything.
