# Release 5 declared-design selection research result

**Status: informative independent Research Gate result; non-normative; not adopted.**
This report answers the
[Release 5 research commission](research-commission.md) against one fixed
repository target. It issues no Protocol meaning, identifier, Requirement ID,
schema field, check, bundle, supported capability, or release decision. A coherent
research report is not steward acceptance and does not open public discussion.

**Recommendation: `PROCEED_AFTER_REPAIR`** (Section 13).

## 1. Repository target and identity check

| Field                | Value                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Repository           | `licklider-ai/nomue-protocol` (public)                                                                                            |
| Draft PR             | #342, head branch `proposal/r5-selection-evidence`, base `main`                                                                   |
| Reviewed head commit | `dffbcc87bdd2471ca3cb6dc77cfb5cff04add8fe`                                                                                        |
| Parent commit        | `28eb0d308f25eac6480a3fe817aa2e146fe9437f`                                                                                        |
| Head tree            | `eb587fa1fbe9723754cd0d6e461c601f15fae7a0`                                                                                        |
| PR base at creation  | `07b373655110afb34ab4bcc3933f83c69fba6f2c` (also `origin/main` on read)                                                           |
| Identity check       | PR head resolved through the GitHub API equals the expected commit; parent, tree, and base match; no `TARGET_DRIFT`               |
| Investigation date   | 2026-09-16 (UTC)                                                                                                                  |
| Investigator role    | independent primary-source investigator and pre-opening reviewer; did not author the proposal, the horizon, or any implementation |

Blobs at the reviewed head:

| Path                                                                     | Blob                                       |
| ------------------------------------------------------------------------ | ------------------------------------------ |
| `governance/drafts/release-5-preparation/README.md`                      | `dbee83598e0a775f8eb12057fefab95f396ee149` |
| `governance/drafts/release-5-preparation/opening-rfc-candidate.md`       | `652fed84a5dcf9ce57ce730c845cc5e4aad093d3` |
| `governance/drafts/release-5-preparation/research-commission.md`         | `198335483ed79004169e24f957e14cd933e4ac11` |
| `governance/drafts/release-5-preparation/public-discussion-readiness.md` | `0087549cb40649a94dc13932947f93e98d094a22` |
| `governance/drafts/release-5-preparation/opening-review-handoff.md`      | `4bd6662c6c43231ef880235628d9797191b6bbf7` |
| `governance/drafts/release-horizon-r3-r20.md`                            | `e1619f1e843d131c087b651b336a74c6c25a6285` |
| `CHARTER.md`                                                             | `1dead95488bae31f80f25424bb3a5515fda119fb` |
| `AUTHORITY.md`                                                           | `7b55e8ba6698d69431d952945a9253c2331122d0` |
| `authority/authority-manifest.yaml`                                      | `66e88f8322defd12e9a5f9ce34b576a87110fdce` |
| `governance/RFC.md`                                                      | `9fa3bdd2e273ed9569385e34bce0bbef2559b131` |
| `governance/ID-POLICY.md`                                                | `2bb2fe4613d156bb7ddab81d9a24a2e29f4ccdce` |
| `registries/requirements.yaml`                                           | `52bdd7483c7f043376e30d2e78028ff749f49528` |
| `spec/versioning/multi-bundle-dispatch.md`                               | `1b47376c20fca765b1ee39a7d13f739f2bbfe6e0` |
| `spec/core/record-envelope.md`                                           | `56929b15f181b20bc0b23b458ce8ce80c1c8094b` |
| `spec/verification/verification-report.md`                               | `b76ad0f11027f91afb725ae1b815bdbcace6ab97` |

Other repository inputs read at the same head: `AGENTS.md`, `spec/AGENTS.md`,
`spec/core/layer-boundary.md`, `spec/core/verification-principles.md`,
`spec/core/record-lifecycle.md`, `spec/core/scope-and-non-claims.md`,
`spec/verification/profile-admissibility-check.md`,
`spec/profiles/independent-two-group-continuous/{phase-1-minimal-profile,admissibility,non-claims}.md`,
`registries/{stability-tiers,interpretation-bundles,public-checks,vocabulary}.yaml`,
`schemas/profiles/itgc-guarantee-0.2.schema.json`, ADR-0014, ADR-0016, ADR-0032,
`governance/drafts/RELEASE-STATUS.md`, `governance/drafts/p1a-paired-t-l1-design.md`,
`governance/drafts/release-2-foundation-and-paired-t-rfc.md`,
`governance/drafts/release-2-candidate/schemas/*.json`,
`governance/drafts/release-3-independent-multigroup-rfc.md`,
`governance/drafts/release-3-preparation/semantic-research-result.md`,
`governance/drafts/capability-evolution-roadmap.md`, `spec/profiles/README.md`, and
the accepted foundation-identity records under `evidence/research/foundation-identity/`
named in Section 3.

The parent-to-head diff is formatting only (table alignment in two Release 5 files
and the horizon). The base-to-head diff adds five Release 5 files and changes two
rows of the horizon table. No authoritative artifact changes.

## 2. Independence and access disclosure

- **Independence.** This pass was performed in a fresh session with no access to the
  proposal author's working context, conversation summaries, or unpublished notes.
  Only the fixed repository target and the sources listed in Section 3 were used. The
  author-side documents disclose that they are coordinator synthesis with no new
  primary-source investigation; this report does not rely on their conclusions.
- **Mechanism.** The investigator is an Anthropic language model (`claude-fable-5-1`)
  operating through a Claude Code remote session. This is disclosed because it is
  material to reproducibility and to the RFC.md requirement for a separate model to
  perform the independent statistical pass. It is not human-expert review and does not
  substitute for one where the Research Gate calls for it.
- **Access limitation (material).** In this session every direct page or PDF fetch was
  refused by the execution environment's network egress policy, for all hosts tried
  (ich.org, ema.europa.eu, fda.gov, pnas.org, sagepub.com, biomedcentral.com,
  plos.org, bmj.com, nist.gov, york.ac.uk, jstor.org, ncbi.nlm.nih.gov, europepmc.org,
  archive.org, w3.org, doi.org, api.crossref.org, sjsu.edu, uvm.edu). A web-search
  tool did work and returned publisher metadata and short excerpts. Under the
  commission's source rules those excerpts are discovery aids, not evidence.
  Consequently:
  - claims marked `REPO_INSPECTED` below reuse full-text inspections already recorded
    in accepted repository research records, within their recorded scope only;
  - claims marked `SNIPPET` rest on search excerpts and require full-text confirmation
    before design freeze (hold `R5-RH-1`, Section 11);
  - claims marked `INFERENCE` are logical or structural arguments that do not depend on
    an external source, with constructed counterexamples;
  - claims marked `CONVENTION` are proposed Protocol conventions, not scientific facts.
- No private repository, private work-item system, or non-public product material was
  read or used.

## 3. Source-access record and primary-source inventory

### 3.1 Repository-recorded full-text inspections reused within recorded scope

| ID     | Source                                                                                                                                                         | Stable identity                                                           | Inspected location (as recorded)                                                                                                                | Recording repository record                                                                                                                                                                           |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SRC-R1 | ICH E9(R1), _Addendum on Estimands and Sensitivity Analysis in Clinical Trials_, Step 4 (20 Nov 2019)                                                          | EMA/CHMP/ICH/436221/2017                                                  | §A.1, §A.3, §A.3.1, §A.3.2, §A.3.3 (five estimand attributes); Glossary                                                                         | `evidence/research/foundation-identity/fnd-1/2026-08-31-nonclinical-estimand-primary-source-result.md` (S1, claims C1–C9, C24); `fnd-1/2026-08-30-independent-research-result.md` (SRC-01, CLM-01/02) |
| SRC-R2 | Percie du Sert et al. (2020), _The ARRIVE guidelines 2.0_, PLOS Biology 18(7):e3000410                                                                         | DOI `10.1371/journal.pbio.3000410`                                        | Article body in full (tables as images not read)                                                                                                | same FND-1 result (S4, claims C16–C18)                                                                                                                                                                |
| SRC-R3 | FDA guidance, _Multiple Endpoints in Clinical Trials_; ASA statement on p-values (Wasserstein and Lazar 2016); Gelman and Loken, _The garden of forking paths_ | as recorded in that result                                                | FDA §II.B, §III, §IV (analysis plan not changed after unmasking); ASA Principle 4; Gelman and Loken working paper                               | `fnd-1/2026-08-30-independent-research-result.md` (SRC-02, SRC-05, SRC-09; accepted dual-pass input, disposition `NARROW`)                                                                            |
| SRC-R4 | W3C PROV-O and PROV-CONSTRAINTS Recommendations (30 April 2013 snapshots)                                                                                      | `https://www.w3.org/TR/2013/REC-prov-o-20130430/` and the CONSTRAINTS REC | full text as recorded                                                                                                                           | `fnd-2/2026-08-30-independent-research-result.md`, accepted by `fnd-2/2026-08-30-source-bounded-steward-disposition.md`                                                                               |
| SRC-R5 | Release 3 semantic research result (independent investigator, pinned commit `3137b904…`)                                                                       | repository research input, not a primary source                           | §11 required declarations; §13 refusal classes; §14 attack 6 (selection timing is declaration plus provenance, with a permanent verifier limit) | `governance/drafts/release-3-preparation/semantic-research-result.md`                                                                                                                                 |

Reuse boundary: each reused claim is used only within the section and claim scope the
recording result states. No reused claim is extended to a newer standard version.

### 3.2 Sources reached only through search excerpts in this pass

| ID      | Source                                                                                                                                                                                                                                                 | Stable identity                                                 | Access in this pass                                                                                               | What the excerpt supports (discovery only)                                                                                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SRC-S1  | Hurlbert (1984), _Pseudoreplication and the Design of Ecological Field Experiments_, Ecological Monographs 54(2):187–211                                                                                                                               | DOI `10.2307/1942661`                                           | `SNIPPET` (abstract)                                                                                              | pseudoreplication defined as inferential testing where treatments are not replicated or replicates are not statistically independent; simple, temporal, sacrificial types                                               |
| SRC-S2  | Lazic (2010), _The problem of pseudoreplication in neuroscientific studies_, BMC Neuroscience 11:5                                                                                                                                                     | DOI `10.1186/1471-2202-11-5`                                    | `SNIPPET`                                                                                                         | non-independent observations treated as independent; the experimental unit is the smallest unit to which a treatment is independently applied                                                                           |
| SRC-S3  | Percie du Sert et al. (2020), ARRIVE 2.0 _Explanation and Elaboration_, PLOS Biology 18(7):e3000411                                                                                                                                                    | DOI `10.1371/journal.pbio.3000411`                              | `SNIPPET`                                                                                                         | experimental unit: "biological entity subjected to an intervention independently of all other units, such that it is possible to assign any two experimental units to different treatment groups"; subsamples inflate n |
| SRC-S4  | Altman and Bland (1997), _Statistics notes: Units of analysis_, BMJ 314:1874                                                                                                                                                                           | DOI `10.1136/bmj.314.7098.1874`                                 | identity only                                                                                                     | unit of analysis must match the unit of allocation                                                                                                                                                                      |
| SRC-S5  | Student (1908), _The probable error of a mean_, Biometrika 6(1):1–25                                                                                                                                                                                   | DOI `10.1093/biomet/6.1.1`                                      | `SNIPPET` (secondary description)                                                                                 | Cushny–Peebles illustration: the same patients received each drug and the control on alternate nights; the analysis uses per-patient differences                                                                        |
| SRC-S6  | Fisher (1935), _The Design of Experiments_, Chapter III                                                                                                                                                                                                | Oliver and Boyd, Edinburgh                                      | `SNIPPET` (secondary description)                                                                                 | Darwin's Zea mays pairs: cross- and self-fertilised seedlings paired within pots; analysis on paired differences; sign-randomisation test                                                                               |
| SRC-S7  | Zimmerman (1997), _A note on interpretation of the paired-samples t test_, JEBS 22(3):349–360                                                                                                                                                          | DOI `10.3102/10769986022003349`                                 | `SNIPPET` (abstract)                                                                                              | an independent-samples t test on correlated observations alters the Type I error probability, even for small correlation; undetected correlation in supposedly independent samples is under-considered                  |
| SRC-S8  | Zimmerman (2004), _A note on preliminary tests of equality of variances_, Br J Math Stat Psychol 57(1):173–181; Rasch, Kubinger and Moder (2011), _The two-sample t test: pre-testing its assumptions does not pay off_, Statistical Papers 52:219–231 | DOI `10.1348/000711004849222`; DOI `10.1007/s00362-009-0224-x`  | `SNIPPET` (abstracts)                                                                                             | a two-stage procedure that selects the test from a preliminary test on the same data fails to protect the significance level; unknown final risks                                                                       |
| SRC-S9  | Nosek, Ebersole, DeHaven and Mellor (2018), _The preregistration revolution_, PNAS 115(11):2600–2606                                                                                                                                                   | DOI `10.1073/pnas.1708274114`                                   | `SNIPPET` (abstract)                                                                                              | preregistration is a time-stamped plan, registered with an independent party, made before data collection or analysis; distinguishes prediction from postdiction                                                        |
| SRC-S10 | Simmons, Nelson and Simonsohn (2011), _False-positive psychology_, Psychological Science 22(11):1359–1366                                                                                                                                              | DOI `10.1177/0956797611417632`                                  | `SNIPPET`                                                                                                         | undisclosed flexibility in analysis choices inflates false-positive rates; decision rules fixed before data collection                                                                                                  |
| SRC-S11 | Kerr (1998), _HARKing_, Personality and Social Psychology Review 2(3):196–217                                                                                                                                                                          | DOI `10.1207/s15327957pspr0203_4`                               | `SNIPPET`                                                                                                         | presenting a post hoc hypothesis as a priori                                                                                                                                                                            |
| SRC-S12 | Chan et al. (2004), _Empirical evidence for selective reporting of outcomes in randomized trials_, JAMA 291(20):2457–2465                                                                                                                              | DOI `10.1001/jama.291.20.2457`                                  | `SNIPPET`                                                                                                         | protocol-to-publication comparison shows outcome switching                                                                                                                                                              |
| SRC-S13 | ICH E9 (1998), _Statistical Principles for Clinical Trials_, §2.2, §3.2, §5.2, §7                                                                                                                                                                      | CPMP/ICH/363/96                                                 | `BLOCKED` (host refused; snippets are from secondary statistical-analysis-plan documents, not the guideline text) | analysis sets (§5.2), analysis specified in the protocol before unblinding; changes documented and justified                                                                                                            |
| SRC-S14 | SPIRIT 2013 statement, Item 20a                                                                                                                                                                                                                        | DOI `10.7326/0003-4819-158-3-201302050-00583`                   | `SNIPPET`                                                                                                         | protocol states the statistical methods and where the analysis plan is found                                                                                                                                            |
| SRC-S15 | Welch (1947), Biometrika 34(1–2):28–35; Welch (1951), Biometrika 38(3–4):330–336                                                                                                                                                                       | DOI `10.1093/biomet/34.1-2.28`; DOI `10.1093/biomet/38.3-4.330` | identity only                                                                                                     | separate-variance two-sample and k-sample procedures exist as distinct procedures under the same designs                                                                                                                |
| SRC-S16 | IETF RFC 3161, _Time-Stamp Protocol_                                                                                                                                                                                                                   | `https://www.rfc-editor.org/rfc/rfc3161`                        | `SNIPPET`                                                                                                         | a trusted third party can evidence that a datum existed before a time                                                                                                                                                   |
| SRC-S17 | Cochran and Cox (1957), _Experimental Designs_, 2nd ed.; NIST/SEMATECH e-Handbook §7.3.1                                                                                                                                                               | Wiley; `https://www.itl.nist.gov/div898/handbook/`              | `BLOCKED`                                                                                                         | not used for any claim                                                                                                                                                                                                  |

No `SNIPPET` or `BLOCKED` item carries a decision-bearing claim on its own. Where a
conclusion below would depend on one of them, it is stated as `INFERENCE` with a
constructed counterexample or reduced to a hold.

## 4. Answers to the commissioned questions

The commission's ten questions (research-commission.md) and the review task's ten
determinations overlap; both numberings are given.

### Q1 (task 1). Which explicit facts distinguish the three designs?

`INFERENCE`, supported by SRC-R2/SRC-S3 (experimental unit), SRC-S1/SRC-S2
(independence of replicates), SRC-S5/SRC-S6 (pairing is a property of how the data
were obtained), and consistent with the repository's own Profile precedents
(NRS-PROFILE-ITGC-0001/0003/0005/0019–0021, Release 2 candidate declarations, Release
3 result §11).

The three families are distinguished by three design relations, none of which is a
property of the outcome values:

| Relation                   | Independent two-group                                                                     | Paired two-condition                                                                                                                           | Independent multi-group                                               |
| -------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Condition set              | exactly two declared conditions                                                           | exactly two declared conditions, with a declared order                                                                                         | at least three declared conditions                                    |
| Unit-to-condition relation | a function: each experimental unit is in exactly one condition                            | a pairing: each pair has exactly one observation per condition; pair members are the same unit (repeated) or explicitly matched distinct units | a function as for two groups                                          |
| Independence structure     | experimental units independent; no pairing, blocking, clustering, or repeated measurement | pairs independent of each other; dependence inside a pair is by design                                                                         | as for two groups, plus an explicit one-way (non-flattened) assertion |

The experimental unit itself is a design fact: the entity to which a condition is
applied independently of all other entities (SRC-S3 wording; SRC-S2 equivalent). Which
entity that is (animal, cage, litter, plate, patient) is decided by how the study was
run, not by the table of values.

### Q2 (task 2). Which facts cannot be inferred from values, row order, timestamps, labels, or the absence of a pairing column?

`INFERENCE` with constructed counterexamples; SRC-S7 corroborates the consequence.

None of the following is recoverable from a table of `(observation, condition,
outcome)` values, because every statement below holds for two datasets whose value
tables are byte-identical:

1. **Unit identity.** Two rows with different observation identifiers may be the same
   experimental unit (technical replicates, repeated measures) or different units.
   Value tables cannot say which.
2. **Pairing.** Absence of a pairing column does not establish independence. A
   matched-pairs design pairs _distinct_ units; if the producer omits the pair
   identifier, the table is indistinguishable from an independent design, yet an
   independent-samples analysis is the wrong analysis (SRC-S7: the Type I error change
   from undetected correlation can be extreme).
3. **Row order.** Sorting rows by pair versus shuffling them leaves the multiset of
   values unchanged; row order carries no design meaning and must not be read as
   pairing.
4. **Timestamps.** In the Cushny–Peebles design (SRC-S5) drug and control nights
   alternate within each patient; pairing is by patient, not by time. Timestamps could
   equally arise from batch processing of independent units. Time is not a pairing key.
5. **Labels.** Condition labels (`A`/`B`, `control`/`treated`) say nothing about whether
   units under them are independent, clustered, or paired. Group counts do not say
   whether a four-group table is one-way or a 2-by-2 factorial arrangement.
6. **Independence.** Units housed, processed, or bred together may be dependent
   (SRC-S1 sacrificial and simple pseudoreplication). No value-level test establishes
   independence; a declaration is the only representable fact.
7. **Analysis population.** Whether the supplied rows are all admitted units or a
   post-exclusion subset is a provenance fact, not a value fact.
8. **Selection timing.** Whether the Contract was fixed before or after outcome
   inspection leaves no trace in the values (SRC-R5 §14 attack 6 records the same
   limit).

### Q3 (task 3). Minimal declaration set for a reviewable successful selection

See Section 5. `INFERENCE` plus `CONVENTION`. Every element already exists in an
issued Profile (ITGC 0.2) or in a Release 2 or Release 3 candidate declaration set,
with two exceptions noted there (selection-timing declaration; flattened-design
assertion outside Release 3).

### Q4 (task 4). How should contradictory declarations be treated?

`CONVENTION`, consistent with existing authority (AUTHORITY.md conflict policy; ADR-0014;
NRS-VERIFY-0013/0017; ADR-0016). Refuse; never resolve by precedence, defaulting, or
re-selection. Three contradiction classes have three existing owners:

| Class                                | Example                                                                                                  | Existing owner                                       | Release 5 addition needed?                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| Declaration versus declaration       | `grouping_structure: independent_groups` with `pairing: present`                                         | schema (closed enums) and Profile admissibility      | no                                                             |
| Declaration versus structure         | `pairing: none` with an experimental unit in two observations; a pair with both members in one condition | conformance (NRS-PROFILE-ITGC-0003) or admissibility | no                                                             |
| Declaration versus selected Contract | paired declared, independent two-group Contract selected                                                 | admissibility (NRS-PROFILE-ITGC-0019)                | only the explicit statement that this failure is not re-routed |
| Missing declaration                  | a required declaration absent                                                                            | conformance (required properties), never a default   | only the explicit non-defaulting statement                     |

A contradiction never produces a "successful selection" and never causes the verifier
to select a different Contract. That is already how exact dispatch and admissibility
behave; Release 5 needs to say so once, not to add a competing rule.

### Q5 (task 5). Can the selection be checked without claiming that declarations are true?

Yes. `INFERENCE`, using the existing judgment basis `declared_record_structure`
(NRS-CORE-0009 informative note). The checkable content is:

- the declarations required by the selected Contract's Profile are present, closed,
  and not defaulted;
- the Record structure is consistent with them (unit uniqueness, pair completeness,
  group count);
- exactly one Contract, Profile, and bundle triple is named and it equals the identities
  the Record already carries (`analysis.contract_id`, `profile_id`,
  `interpretation_bundle_id`);
- the selected Contract's Profile admits those declarations.

None of this asserts that the declared units are the true experimental units, that
pairs are the right pairs, that independence holds, or that the Contract is
scientifically appropriate. The existing report field `declaration_truth:
not_asserted` covers the first three; a new non-claim is needed for appropriateness
(Section 8).

**Consequence for the proposal.** In the first slice, with one issued Contract per
family, a "successful selection" is _entailed_ by record conformance plus Profile
admissibility of the single selected Contract. The additional checkable content that
Release 5 contributes is small: (a) explicit completeness and non-defaulting of the
selection basis, (b) the identity binding between the declaration set and the selected
Contract, (c) the attributed selection-timing declaration, and (d) the non-claims. The
opening text should say this plainly. Anything larger, in particular a claim that the
Protocol certifies _why_ this Contract rather than another was chosen, requires a
registered selection policy and becomes fragile as soon as a second Contract per family
exists (Section 4, Q10). This is finding `B-1` in the opening review.

### Q6 (task 6). Timing or provenance evidence against silent outcome-dependent family selection

`REPO_INSPECTED` for the principle (SRC-R3: analysis plan not changed after unmasking;
ASA Principle 4; forking paths), `SNIPPET` for the historical attributions (SRC-S8,
SRC-S9, SRC-S10, SRC-S11, SRC-S12, SRC-S13), `INFERENCE` for the verifier limit.

Source-established: choosing the procedure after inspecting the same data, including
by a preliminary test on those data, invalidates the nominal error rate (SRC-S8
abstracts; SRC-R3). Preregistration and statistical-analysis-plan practice fix the
analysis before outcome inspection and record the time (SRC-S9, SRC-S13, SRC-R3).

Verifier limit: no offline value-level check can establish when a declaration was
made. Three representable options, in increasing assurance:

1. **Attributed timing declaration** (first slice, recommended): a declared statement
   that the Contract, Profile, and declaration set were fixed before outcome
   inspection, with `not_asserted` truth. Checkable only for presence and consistency.
   The Release 3 result reached the same conclusion and recorded it as a permanent
   residual risk under open hold `FND1-H07`.
2. **Revision lineage**: a prior immutable revision carrying declarations and the
   selected Contract without results, referenced by the results revision. The Protocol
   has revision identity (NRS-CORE-0005) but Phase 1 represents no parent lineage
   (record-envelope.md, informative). This is a new surface and a candidate successor
   increment, not a first-slice requirement.
3. **External time evidence**: an RFC 3161 token or equivalent (SRC-S16). The
   repository holds this only in the EXPERIMENTAL draft.3 attestation report schema,
   bound by no bundle. AGENTS.md forbids adding attestation fields ahead of their
   phase; this remains out of the first slice.

Recommendation: option 1 with an explicit non-claim, and an explicit statement that
options 2 and 3 are named successors, not hidden assumptions.

### Q7 (task 7). Is principal-attribution evidence necessary in the first slice?

No. `INFERENCE` plus `CONVENTION`. Checkability of a declaration does not depend on
who made it; attribution changes accountability, not verifiability. The repository
already places attribution in the approval and attestation phases (`NRS-APPROVE-0002`
carries an `approver_id`; attestation is EXPERIMENTAL and unbound). Importing an
attribution reference into a Record surface would (a) duplicate an existing owner and
(b) add an out-of-phase field. The first slice should carry a finalized declaration
bound to the revision digest and a non-claim that the Protocol does not authenticate
the declarant. Reopen when an approval or attestation bundle becomes supported.

### Q8 (task 8). Does the family boundary create ambiguous overlap cases?

`INFERENCE`; the boundary is a `CONVENTION`. Cases in Section 6. Summary:

- **Two-group versus multi-group at k = 2.** Mathematically an omnibus F on two groups
  equals the square of the pooled t; the Release 3 Profile excludes it by requiring
  k ≥ 3 and ITGC requires exactly two. The boundary is therefore disjoint by count, but
  by convention, not by science. The opening text should say that a two-condition
  dataset is not a multi-group Record and that this is a Protocol convention.
- **Four groups versus 2-by-2 factorial.** A balanced 2-by-2 factorial table is
  structurally four independent groups. Declaring it one-way and selecting a Release 3
  omnibus Contract hides the factorial structure. The Release 3 result requires a
  flattened-design assertion (§11); Release 5 must carry it for the multi-group family
  and must not import Release 4 meaning to check it.
- **Paired versus independent with the same units.** Disjoint when declared;
  undetectable when the pairing declaration is omitted (Q2 item 2). Non-claim, not a
  check.
- **Matched distinct units versus repeated measures on one unit.** Both are paired
  two-condition; the Release 2 candidate distinguishes them with
  `repeated_measurements = none | within_pair_only` and consistency rules. Covered.
- **Pre/post, crossover, and matched pairs** all map to the paired family. Whether
  period or carry-over effects make the paired t inappropriate is a Contract assumption,
  not a family fact; covered by the Contract's non-claims, not by selection.

No case requires a fourth family or a precedence rule in the first slice.

### Q9 (task 9). Is a separate portable negative-selection artifact necessary now?

No. `INFERENCE` plus `CONVENTION`. The verifier already produces scoped, reason-coded
failures for conformance and admissibility (NRS-VERIFY-0012, NRS-VERIFY-0017), and the
lifecycle model already defines the stored form of a finalized ask
(`needs_clarification`, NRS-CORE-0015/0018). A producer-side "no Contract could be
selected" state that exists before any Record exists is Layer 2 by NRS-CORE-0002.
The one portable negative fact, a Record whose declarations contradict its selected
Contract, is already a report outcome. Reopen if a future release wants a Record to
portably assert that no supported Contract exists for a design, which is a different
question.

### Q10 (task 10). Which conclusions must be reopened when other families are added?

| Family added                       | Conclusion that must be reopened                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rank-based (signed-rank, rank-sum) | Selection stops being a design-to-family map: paired t and signed-rank share a design and differ in estimand and assumptions (spec/profiles/README.md P1-A disposition). "One Contract per declared design" collapses; the selection basis must add an explicit declared procedure choice, and any uniqueness reading of "successful selection" fails. Same for Welch versus pooled t and Welch versus classical ANOVA (SRC-S15). |
| Repeated or clustered              | Unit structure becomes hierarchical (unit within cluster; unit over time). Declarations of nesting, time index, and covariance structure are new selection facts; `clustering: present` stops being a refusal and becomes a family key.                                                                                                                                                                                           |
| Regression and covariates          | Selection is no longer a finite family map; model and covariate choice are data-adjacent choices (forking paths, SRC-R3). The timing declaration must cover model specification, not only family.                                                                                                                                                                                                                                 |
| Categorical or count outcomes      | Outcome type becomes an explicit selection fact; today "continuous" is implicit in the Profiles.                                                                                                                                                                                                                                                                                                                                  |
| Survival or time-to-event          | Censoring and event-time facts (FND-2 holds `HOLD-04`) become selection facts.                                                                                                                                                                                                                                                                                                                                                    |
| Factorial (Release 4)              | The flattened-design assertion becomes a positive declaration of factor structure; the four-group overlap (Q8) must be re-adjudicated across the two Profiles.                                                                                                                                                                                                                                                                    |
| Any second Contract in a family    | Same as the rank-based row; this is the earliest reopen trigger and applies inside the first slice's own families.                                                                                                                                                                                                                                                                                                                |

## 5. Minimal declaration set

`INFERENCE` plus `CONVENTION`. The set is stated as facts, not fields; field spelling
and placement belong to the owning Profile schemas.

Common to all three families:

1. the design family (one of the three tokens), stated explicitly;
2. the experimental-unit definition in force (type or description), and per
   observation an experimental-unit identifier;
3. the declared condition set with its count, and per observation a condition
   identifier drawn from that set;
4. the independence declaration for the analysis unit (units, or pairs);
5. explicit absence declarations for structures that would change the family:
   repeated measurement, clustering, blocking or pairing (for independent families),
   and a flattened-design (not a hidden factorial, blocked, or nested design)
   assertion;
6. the admitted analysis population relative to the supplied observations (all record
   observations, or a refusal);
7. one outcome definition on a continuous scale with finite values;
8. the selected Contract, Profile, and bundle identities, each exactly once, referenced
   from the fields that already carry them rather than restated;
9. the selection-timing declaration: family, Contract, and declarations were fixed
   before outcome inspection (attributed, truth not asserted).

Paired two-condition adds:

- item 10: a pair identifier per observation, separate from the experimental-unit
  identifier;
- item 11: the declared condition order (direction of the difference);
- item 12: whether pair members are the same experimental unit or matched distinct
  units.

Independent multi-group adds:

- item 13: the group count k ≥ 3 and per-group membership; comparison-family and
  procedure declarations remain Contract-level (Release 3), not selection-level.

Items 1–8 and 10–13 exist in ITGC 0.2, the Release 2 candidate schema, or the Release 3
result §11. Item 9 is new to every family. Item 5's flattened-design assertion exists
only in the Release 3 result and would be new for the two-group and paired families.

## 6. Counterexamples and ambiguity cases

Each case fixes the value table and varies only design facts.

| Case | Construction                                                                                                                                                                  | Family outcome                                                                                        | Where it is decided                                           |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| C-1  | 20 rows, conditions A/B, 10 each, unique observation ids; dataset X declares unique units, dataset Y declares `pair_id` matching rows 1–10 to 11–20 as distinct matched units | X: independent two-group; Y: paired two-condition                                                     | declaration only; values identical                            |
| C-2  | Same as C-1 with no pair column and no pairing declaration, but the pairs were real                                                                                           | conforms as independent; wrong analysis undetectable                                                  | non-claim (`declaration_truth`); not a check                  |
| C-3  | Rows sorted so paired members are adjacent, `pairing: none` declared                                                                                                          | independent; adjacency carries no meaning                                                             | invariant 2 (no inference from row order)                     |
| C-4  | Timestamps alternate A,B,A,B per unit (Cushny–Peebles pattern), `pairing: none`, unit ids unique per row                                                                      | conformance refusal only if the same unit id recurs; otherwise independent by declaration             | structure check versus declaration; timestamps ignored        |
| C-5  | Four conditions, balanced, actually a 2-by-2 factorial; declared one-way k = 4                                                                                                | multi-group by declaration; factorial meaning hidden                                                  | flattened-design assertion (attributed, unproved)             |
| C-6  | Two conditions, `grouping_structure: independent_groups`, selected Contract is a k ≥ 3 omnibus Contract                                                                       | admissibility refusal; not re-routed to two-group                                                     | Release 3 Profile boundary; Release 5 no-fallback statement   |
| C-7  | Paired declared, ITGC Contract selected                                                                                                                                       | admissibility refusal (NRS-PROFILE-ITGC-0019); not re-routed                                          | existing rule                                                 |
| C-8  | `pairing: none` declared, one experimental-unit id in two rows of different conditions                                                                                        | refusal (NRS-PROFILE-ITGC-0003 or successor)                                                          | structure versus declaration                                  |
| C-9  | Paired: a pair with both observations in condition A                                                                                                                          | refusal (pair completeness)                                                                           | Release 2 candidate rule 4                                    |
| C-10 | Paired: `repeated_measurements: none` but both pair members carry the same experimental-unit id                                                                               | refusal (Release 2 consistency rule)                                                                  | Release 2 candidate                                           |
| C-11 | 25 rows supplied, `analysis_population: subset_or_exclusions_present`                                                                                                         | admissibility refusal; no smaller dataset is formed                                                   | NRS-PROFILE-ITGC-0024 and successors                          |
| C-12 | Multi-group k = 3 declared, but one group is empty after the producer's upstream exclusion                                                                                    | refusal, not re-selection as two-group                                                                | no-fallback statement                                         |
| C-13 | Independent two-group where the two groups are two litters (all units in A are siblings)                                                                                      | conforms; clustering undeclared and undetectable                                                      | non-claim; reopen when clustered family exists                |
| C-14 | Same design and data; producer A selects Welch, producer B (future) selects pooled t                                                                                          | today: B is unsupported and fails dispatch; later: selection is a procedure choice, not a design fact | reopen trigger (Q10)                                          |
| C-15 | Two Records with identical declarations and Contract, one made before and one after seeing the outcomes                                                                       | indistinguishable offline                                                                             | timing declaration plus non-claim; lineage or timestamp later |

## 7. Separation matrix

Rows are the questions a relying party might ask; columns say who answers and with
what claim posture.

| Question                                                                                | Declaration (producer) | Selection evidence (Release 5)                             | Conformance                       | Admissibility                     | Computability | Numerical verification | Real-world truth |
| --------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------- | --------------------------------- | --------------------------------- | ------------- | ---------------------- | ---------------- |
| Which experimental unit, condition set, pairing, and independence apply?                | states them            | checks presence, closure, non-defaulting, identity binding | checks structure and closed enums | not its question                  | no            | no                     | not asserted     |
| Is the Record shaped as its schema requires?                                            | no                     | no                                                         | yes                               | no                                | no            | no                     | n/a              |
| Do the declarations lie inside the selected Contract's guarantee boundary?              | no                     | references the result; does not re-judge                   | no                                | yes (`declared_record_structure`) | no            | no                     | not asserted     |
| Was exactly one Contract, Profile, bundle triple selected and is it the dispatched one? | names them             | yes (identity equality)                                    | partly (required fields)          | no                                | no            | no                     | n/a              |
| Was the selection fixed before outcome inspection?                                      | attests                | checks that the attestation is present                     | no                                | no                                | no            | no                     | not asserted     |
| Can the supported quantities be computed as finite numbers?                             | no                     | no                                                         | no                                | no                                | yes           | no                     | n/a              |
| Do the declared results equal recomputation within check tolerance?                     | declares results       | no                                                         | no                                | no                                | no            | yes                    | n/a              |
| Is this the scientifically appropriate procedure for the study?                         | may believe so         | no                                                         | no                                | no                                | no            | no                     | not asserted     |
| Is the research valid as a whole?                                                       | no                     | no                                                         | no                                | no                                | no            | no                     | never asserted   |

## 8. Recommended non-claims

A passing selection-evidence result must not be read as establishing:

1. that any declaration is true (existing `declaration_truth: not_asserted`);
2. that the selected Contract is the scientifically appropriate, optimal, or only
   defensible procedure for the study (new; not covered by NRS-CORE-0009, which is
   scoped to conformance and admissibility results);
3. that the selection was made before outcome inspection (new: the timing declaration
   is attributed, not verified);
4. that the declarant is authenticated, authorized, or identified (new);
5. that no unrepresented structure (clustering, matching, period effects, upstream
   exclusion) exists (existing informative list in ITGC non-claims; restate for
   successor families);
6. any overall verification status (existing NRS-VERIFY-0001);
7. that the family boundary is a scientific classification rather than a Protocol
   convention (new; needed because of the k = 2 and four-group cases).

## 9. Reuse across families versus Contract-specific content

Reusable across the three families: the declaration-versus-inference boundary (Q2),
the contradiction treatment (Q4), the identity-binding check content (Q5), the timing
declaration and its non-claim (Q6), the attribution exclusion (Q7), the non-claims
(Section 8), and items 1–9 of Section 5.

Contract- or Profile-specific: the exact declaration vocabulary and enumerations,
pair-structure rules, group-count bounds, the flattened-design assertion's wording,
variance and estimand assumptions, and every numerical or admissibility rule. Release 5
should reference these by Profile identity and must not define a cross-family
declaration enum in the first slice (finding `B-2` in the opening review).

## 10. Assessment of the RFC candidate

The candidate's problem statement, layer boundary, invariants 1–8, exclusions, and
non-claims are supportable. Two parts need narrowing before the question is fair to
discuss:

- "a versioned selection-policy identity" and "why a producer selected one scientific
  Contract rather than another" imply a registered policy that the proposal neither
  places under an owner nor needs for the first slice. Narrow to identity binding and
  completeness, with the bundle identity serving as the policy identity.
- the family table's first row implies an issued independent-two-group Contract; none
  exists in any registry, schema, or bundle at the reviewed head. All three families
  are conditional.

Disposition of the candidate: proceed after narrowing; do not reject.

## 11. Unresolved holds

| Hold       | Question                                                                                                                                      | Required to close                                                                            | Blocks                                               |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `R5-RH-1`  | Full-text confirmation of the `SNIPPET` sources whose wording is quoted (SRC-S1, SRC-S2, SRC-S3, SRC-S7, SRC-S8, SRC-S9, SRC-S13 §5.2 and §7) | a pass with page-level access recording SHA-256 and pinpoints, or steward-supplied originals | design freeze; not public opening if named as a hold |
| `R5-RH-2`  | Which of the three timing options (Section 4, Q6) the first slice adopts, and its non-claim wording                                           | steward decision after public discussion                                                     | design freeze                                        |
| `R5-RH-3`  | Whether the first slice states that successful selection is entailed by conformance plus admissibility for one-Contract families              | proposal text repair (`B-1`)                                                                 | public opening                                       |
| `R5-RH-4`  | Owner of the cross-family declaration vocabulary, or the decision that none exists in the first slice                                         | proposal text repair (`B-2`)                                                                 | public opening                                       |
| `R5-RH-5`  | Existence and issuing path of an independent-two-group successor Contract                                                                     | horizon or Release 2 disposition statement                                                   | R5-P3                                                |
| `FND1-H07` | Attestation and provenance for procedure-selection assurance (inherited)                                                                      | its own research line                                                                        | option 3 of Q6 only                                  |

## 12. Reopen conditions

Reopen this research when: a second Contract is issued in any of the three families;
a family listed in Q10 is proposed; a source under `R5-RH-1` turns out to contradict
the excerpt relied on; the Release 2 or Release 3 disposition changes the declaration
vocabulary or the bundle model; revision lineage or attestation becomes a supported
surface; or the proposal moves from identity binding to a registered selection policy.

## 13. Recommendation

`PROCEED_AFTER_REPAIR`.

The proposed question is scientifically supportable: the facts that distinguish the
three designs are design facts, they cannot be inferred from values, contradictory or
missing declarations must fail closed, and the selection can be checked against
declared structure without asserting truth. The repairs are textual and narrow the
claim; none adds a scientific premise. The first slice's checkable content beyond
existing admissibility is small and must be described as such. The primary-source
basis for the load-bearing structural claims is either repository-inspected or
logical; the historical attributions rest on excerpts and carry hold `R5-RH-1`.

This report does not allocate a Requirement ID, design a schema field, close a
readiness gate, or authorize opening.
