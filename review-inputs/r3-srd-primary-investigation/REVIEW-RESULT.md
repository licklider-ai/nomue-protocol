# Release 3 Semantic Source Acquisition — Independent Primary-Source Investigation of SR-D (Closed Testing, Fixed Sequence, Fallback, Serial and Parallel Gatekeeping, Graphical Weighted Bonferroni)

**Status: informative independent investigation record; non-normative; not adopted;
not a steward decision.** This record is the separate-context primary-source
investigation of hold SR-D (catalogue entries CLS-01 through CLS-06; claims C-D1,
C-D2, C-D3) commissioned in the body of pull request #231 under the substantive work
order of Part N Section N.4. It feeds a later author synthesis; it is not an independent
review of an author result, because no author-side SR-D result exists in the fixed
inputs. It was performed against a fixed repository state and four lawfully supplied
source PDFs. It selects no procedure, Contract, identifier, schema, Public Check,
implementation, or release outcome; it does not open public discussion, change the fixed
semantic result, adopt its catalogue, or authorize implementation; it accepts no hold,
changes no ledger, and merges nothing. Attribution is role-based only.

**Outcome in one paragraph.** The four supplied originals (Marcus, Peritz and Gabriel
1976; Wiens 2003; Dmitrienko, Offen and Westfall 2003; Bretz, Maurer, Brannath and
Posch 2009) were identity-matched, read in full, and checked page by page against
rendered page images for every decision-bearing formula, algorithm, table and figure.
They directly support the closed testing construction and its familywise guarantee
(C-D1), the fallback procedure (C-D2, CLS-03), parallel Bonferroni gatekeeping
(C-D2, CLS-05) and the graphical weighted-Bonferroni representation (C-D3, CLS-06),
each with narrowings recorded below. The fixed-sequence procedure (CLS-02) and serial
gatekeeping (CLS-04) are described, and their strong familywise guarantee is derivable,
from the supplied originals, but their assigned source Maurer, Hothorn and Lehmacher
(1995) is not in custody and was not inspected, so the attribution claims that name that
text remain unsupported. Under the commission's disposition rule the candidate
disposition for SR-D therefore stays `INPUT_INCOMPLETE`, with the supported and
unsupported partitions named exactly (Section 15) and an alternative-primary-basis
proposal offered for steward decision, not enacted. Three source-level issues need an
author-side decision before any dependent proposal: an attribution mismatch for CLS-04,
a source-internal ambiguity in the parallel-gatekeeping adjusted p-values for singleton
gatekeeper intersections, and a scope narrowing of the "unifying representation"
wording for CLS-06 (Section 14). Fifty-five deterministic reproduction checks pass
(Section 13). The 7 `CLOSED` / 1 `PARTIAL` / 6 `INPUT_INCOMPLETE` ledger, overall
`INPUT_INCOMPLETE`, `SOURCE_SET_READY=false`, `NARROW`, the SR-I acceptance, all other
holds and the separate R4 state are preserved unchanged.

## 1. Investigation identity

| Field                            | Value                                                                                                                                                                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                       | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                     |
| Fixed starting commit            | `1c013a6bc07f7d066fa43c692abe2be91241b384` (head of pull request #231, branch `research/r3-sri-acceptance-20260909`)                                                                                                                                                       |
| Its tree                         | `0f8b6baa728099dc21880016fbace8c44166e088`                                                                                                                                                                                                                                 |
| Its sole parent                  | `3a8bc0d86718a2cf47ce12089a9030a02e41a297` (exactly one `parent` line)                                                                                                                                                                                                     |
| Result path                      | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                            |
| Result blob / bytes / SHA-256    | `34ee7f83368462a4782d86eff02b72cf5c18a0a0` / 426114 / `736c6484f12d0e59330ae257e23e597b868f9c5930ff86809ba8cf8d4c97b044`                                                                                                                                                   |
| Commission path / blob / bytes   | `governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md` / `3c7ddcc696f0c284213f7efe0da68e747bc238d7` / 8158 (SHA-256 `9bbb22f6002692baa5e1e341b5998cc71c1937d99c0ee4babcefca8bd79a9418`)                                                       |
| Fixed semantic input commit      | `7bd9c5ab854777c3e99e624d9d2ed62731228852`                                                                                                                                                                                                                                 |
| Fixed semantic input path / blob | `governance/drafts/release-3-preparation/semantic-research-result.md` / `8f21526040924b891f64724c2d0fde9ea94eff92` / 102312 bytes (SHA-256 `61b20c9b5e4c43ed54e67c74630fb1d5f87f0b972af76f3876ad09340dd9d06f`)                                                             |
| Live state at start              | `research/r3-sri-acceptance-20260909` at `1c013a6b…`; `research/r3-sri-author-synthesis-20260909` at `3a8bc0d8…`; `origin/main` at `cd217f88238a2ecc57b72f5835a813d92270f5ad` at clone time and at `fa82ccc174f33c4e68658a6b279034fd8399e055` when re-fetched at 01:31 UTC |
| Investigation date               | 2026-09-09 (01:16–02:00 UTC approximately)                                                                                                                                                                                                                                 |
| Investigator role                | separate-context primary-source investigator for SR-D                                                                                                                                                                                                                      |
| Investigation branch             | `review/r3-srd-primary-investigation-20260909`, created from the fixed starting commit as sole parent (name confirmed unused on the remote before creation)                                                                                                                |
| Files added                      | this file and `reproduce-sr-d.py` (same directory)                                                                                                                                                                                                                         |
| Files changed                    | none                                                                                                                                                                                                                                                                       |
| Comment on any pull request      | none posted                                                                                                                                                                                                                                                                |

### 1.1 Identity gate

Every value was re-derived from Git objects in the working clone before source work
began; nothing was taken on trust from the pull-request body.

| Check                                           | Expected                  | Observed                                                                                                                                          | Result |
| ----------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Fixed starting commit object                    | commit `1c013a6b…`        | `git cat-file -t` → commit; `git rev-parse …^{tree}` → `0f8b6baa…`                                                                                | match  |
| Sole parent                                     | `3a8bc0d8…`               | `git log -1 --format=%P` → exactly `3a8bc0d8…`                                                                                                    | match  |
| Result blob at the fixed commit                 | `34ee7f83…`               | `git ls-tree` → `34ee7f83…` at the result path                                                                                                    | match  |
| Result bytes / SHA-256                          | 426114 / `736c6484…`      | `git cat-file -p … \| wc -c` → 426114; `\| sha256sum` → `736c6484…`                                                                               | match  |
| Commission blob at the fixed commit             | `3c7ddcc6…`               | `git ls-tree` → `3c7ddcc6…` at the commission path                                                                                                | match  |
| Semantic input commit and blob                  | `7bd9c5ab…` / `8f215260…` | `git cat-file -t` → commit; `git ls-tree 7bd9c5ab…` → `8f215260…`; the same blob is present unchanged at `1c013a6b…`                              | match  |
| Snapshot `7bd9c5ab…` lacks the acquisition file | absent                    | its `release-3-preparation/` listing has four files and no acquisition commission or result                                                       | match  |
| Base branch position                            | `1c013a6b…`               | `git ls-remote origin refs/heads/research/r3-sri-acceptance-20260909` → `1c013a6b…` (re-checked before the commit; Section 16)                    | match  |
| Investigation branch name unused                | absent on the remote      | `git ls-remote origin 'refs/heads/review/r3-srd*'` → empty                                                                                        | match  |
| Read first documents at head versus `main`      | identical                 | `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, authority manifest, requirements registry, ID policy, RFC → no diff against `cd217f88…` or `fa82ccc1…` | match  |

## 2. Independence, prior involvement, reading order and model testimony

**Prior involvement (disclosed).** This investigator has no earlier role in SR-D: it did
not author any Part of the source-acquisition result, either commission, the fixed
semantic result, any preserved review, pull request #226, #230 or #233, or any
implementation. No private repository, work-item system or product implementation was
read.

**Not blind (disclosed).** Before opening the PDFs this investigator read the pull
request #231 body; the fixed catalogue rows for CLS-01 through CLS-06 and Section 9,
17, 18 and 19 of the fixed semantic result; the Pass 1 claim table and impact rows for
SR-D (Sections 3, 5, 6, 8 and 11 of the acquisition result); Part C Section C.3 row 15
and C.7 (the earlier author reading of supplier 15 for C-D1); Part D Section D.4;
Part N Sections N.3 and N.4; Part S; and continuation Sections 18 and 19 at commit
`b405512111699f262440d0b819dfa0977ad7b72a`. Blindness to prior summaries is therefore
not claimed. The source findings below were written from the originals, and where a
prior summary is agreed with or corrected, that is said explicitly (Sections 4.7 and
14).

**Model and context basis (disclosed).** The session-description service reports
configured model `claude-fable-5-1` and last-served model `claude-fable-5-1` for this
session, created fresh on 2026-09-09 at 01:16 UTC from a clean clone. The same
service-reported model is recorded by the investigators and reviewers of pull requests
226, 230 and 233; the fixed result records OpenAI-assisted author and coordinator work.
The scoped independent-pass determination recorded in Part S Section S.4 covers SR-I
only and is not extended to SR-D by this record. Separate-context independence from
every author Part is claimed; same-model-family independence from the earlier
Claude-based reviews is not claimed and is not needed for an investigation that precedes
the author synthesis.

**Reading order (exact).** (1) `AGENTS.md`; (2) `CHARTER.md`; (3) `AUTHORITY.md`;
(4) the authority manifest and requirements registry (opened, confirmed identical to
`main`, not studied in full because no authoritative artifact is touched);
(5) `governance/ID-POLICY.md`; (6) `governance/RFC.md` research-gate section; (7) the
pull request #231 body; (8) identity gate; (9) the acquisition commission; (10) the
fixed-result and acquisition-result passages listed above; (11) PDF hashing, page
counts and text extraction with PyMuPDF 1.28.2; (12) supplier 15 in full; (13) supplier
43 in full; (14) supplier 41 in full; (15) supplier 40 in full; (16) page images at
110 dpi for every page carrying a decision-bearing formula, algorithm, table, graph or
proof (supplier 15 printed pp. 656–659; 43 p. 213; 41 pp. 2389–2392 and 2394; 40 pp.
587–588, 591–593, 595–598, 602–603); (17) the reproduction script; (18) this record.

## 3. Source identity, custody and inspection boundary

### 3.1 Identity of the four supplied originals

All four files matched the byte counts, page counts and SHA-256 values recorded in
Part N Section N.3 and in the pull request #231 instruction. Hashes were recomputed
here with `sha256sum`; page counts with PyMuPDF.

| Supplier | File                     |  Bytes | PDF pages | SHA-256 (recomputed)                                               | Bibliographic identity (read from the first page)                                                                                                                                                                                                            | Printed page = PDF page +           | Catalogue route            |
| -------- | ------------------------ | -----: | --------: | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | -------------------------- |
| 15       | `15_Marcus_1976.pdf`     | 446500 |         7 | `7b81e37b502d885658249196f25db32e1682d6461f3c15f7a3d56e3732899a24` | Ruth Marcus, Eric Peritz and K. R. Gabriel, "On closed testing procedures with special reference to ordered analysis of variance", Biometrika 63(3):655–660 (Dec. 1976); JSTOR 2335748                                                                       | 653 (PDF page 1 is the JSTOR cover) | SRC-18 / C-D1 / CLS-01     |
| 40       | `40_Bretz_2009.pdf`      | 439933 |        19 | `87041fa4b4d17e6a2832536d586cc26b253422255df59cd00a86344f6b0a5664` | Frank Bretz, Willi Maurer, Werner Brannath and Martin Posch, "A graphical approach to sequentially rejective multiple test procedures", Statistics in Medicine 28:586–604; DOI 10.1002/sim.3495; online 2 December 2008; Wiley stamp identifies issue 4      | 585                                 | SRC-26 / C-D3 / CLS-06     |
| 41       | `41_Dmitrienko_2003.pdf` | 106251 |        14 | `c1df1453c5001cfeae4bd3d52d31e46f7248cd7b3524ec7d46e2d47ef0a07ed4` | Alexei Dmitrienko, Walter W. Offen and Peter H. Westfall, "Gatekeeping strategies for clinical trials that do not require all primary effects to be significant", Statistics in Medicine 22:2387–2400; DOI 10.1002/sim.1526; Wiley stamp identifies issue 15 | 2386                                | SRC-27 (a) / C-D2 / CLS-05 |
| 43       | `43_Wiens_2003.pdf`      | 120883 |         5 | `f9634c824d637b2f1e262d226c8bd3d7d01f540501facdaead9c1e802eed5bd7` | Brian L. Wiens, "A fixed sequence Bonferroni procedure for testing multiple endpoints", Pharmaceutical Statistics 2:211–215; printed DOI `10.1002/pst.064`; the Wiley download stamp on every page uses `10.1002/pst.64`                                     | 210                                 | SRC-27 (c) / C-D2 / CLS-03 |

Supplier 15 is the three-author Marcus–Peritz–Gabriel closed-testing paper, as required.
Its reference list (printed p. 660) cites a separate single-author paper, Marcus (1976),
"The powers of some tests of the equality of normal means against an ordered
alternative", Biometrika 63, 177–183, and printed p. 659 uses that paper's "modified
Williams's statistic". This confirms the existence of the distinct text noted in Part C
Section C.7 and does not settle X-8 (whether SRC-28's "Marcus (1976)" means SRC-18 or
that text); X-8 stays open for SR-J and nothing is added to the catalogue.

### 3.2 Custody of the assigned SR-D sources

The fixed semantic result assigns SR-D to SRC-18, SRC-26 and SRC-27; Section 11 of the
acquisition result splits SRC-27 into (a) Dmitrienko, Offen and Westfall (2003),
(b) Maurer, Hothorn and Lehmacher (1995) and (c) Wiens (2003).

| Assigned text | Custody in the fixed records                                                                                                                                                                                                                                         | This investigation                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SRC-18        | supplier 15, received 2026-09-07 (Part C Section C.2); read for C-D1 in C.3                                                                                                                                                                                          | same bytes; read in full                                                                                                                                                                                                                                                                                                                                                                             |
| SRC-26        | supplier 40, received 2026-09-08 (Part N Section N.3; continuation Section 18); bibliographic intake only                                                                                                                                                            | same bytes; read in full                                                                                                                                                                                                                                                                                                                                                                             |
| SRC-27 (a)    | supplier 41, received 2026-09-08 (Part N Section N.3; continuation Section 19); bibliographic intake only                                                                                                                                                            | same bytes; read in full                                                                                                                                                                                                                                                                                                                                                                             |
| SRC-27 (c)    | supplier 43, received 2026-09-08 (Part N Section N.3; continuation Section 19); bibliographic intake only                                                                                                                                                            | same bytes; read in full                                                                                                                                                                                                                                                                                                                                                                             |
| SRC-27 (b)    | no supplier number; acquisition route "library" (Section 11); X-5 records a German-language edited-volume chapter; not among suppliers 01–37, 39–43; not among the four reported-unavailable items 38, 44, 45, 46; supplier 47's outcome unreported and outside SR-D | **not in custody; not inspected.** A search of every file at the fixed commit and of the continuation record at `b4055121…` found no receipt, hash, or page for this text. Bretz et al. reference 2 (printed p. 604) supplies the fullest bibliographic identity seen so far: in _Biometrie in der chemisch-pharmazeutischen Industrie_, Vollmar J (ed.), Fischer Verlag, Stuttgart, 1995, pp. 3–18. |

No acquisition attempt was made for SRC-27 (b): the instruction is to check custody
first and, if unavailable, to partition the claims (Section 8). This record does not
equate that unavailability with failure of every SR-D claim.

### 3.3 Inspection boundary

Read in full: all 45 PDF pages of the four originals, including reference lists and
publisher stamps. Verified on page images: every formula, algorithm, table, graph and
proof step cited by printed page below. Not verified: Dmitrienko et al. Table VI
(simulated power, 1,000,000 samples) and the resampling columns of Table V
(N = 50,000,000 parametric resamples) — these are simulation outputs and no automatic
Monte Carlo programme was run; Wiens's power figures for the heart-failure illustration
(printed p. 214), which depend on unstated test details; the Bretz et al. case-study
graphs (Figures 13–15, printed pp. 599–600), which are strategy illustrations without
numerical claims. No source outside the four originals and the fixed repository records
was consulted; every statement attributed to an uninspected text (Hommel, Bretz and
Maurer 2007; Westfall and Krishen 2001; Bauer et al. 1998; Wiens and Dmitrienko 2005;
Sarkar 1998; Strassburger and Bretz 2008; Guilbaud 2007, 2008; Bartholomew 1959;
Barlow et al. 1972; Gabriel 1969) is recorded as a citation seen in a supplied original,
not as an inspected fact.

## 4. Marcus, Peritz and Gabriel (1976) — direct findings (C-D1, CLS-01)

### 4.1 Construction and the local level condition (printed pp. 655–656)

- Setting (p. 655, Section 2): a random variable X with distribution P_θ, θ ∈ Ω, and a
  set W of null hypotheses (subsets of Ω) that is closed under intersection.
- Local test condition (p. 656, first line): for each ω_β ∈ W a test φ_β(X) "of level
  α, that is, pr_θ{φ_β(X) = 1} ≤ α for all θ ∈ ω_β".
- Procedure (p. 656): "Any null hypothesis ω_β is tested by means of φ_β(X) if and only
  if all hypotheses ω that are included in ω_β (ω ⊂ ω_β) and belonging to W (ω ∈ W)
  have been tested and rejected." Inclusion is set inclusion in Ω, so "included in ω_β"
  means every hypothesis implying ω_β, i.e., every intersection hypothesis containing
  it in the modern phrasing.
- The paper's own vocabulary is "experimentwise error rate" and "probability of making
  no type I error … at least 1 − α" (pp. 655–656). The words "familywise", "strong" and
  "FWER" do not occur.

### 4.2 The guarantee and its proof (printed p. 656)

Source statement, verbatim in substance: a type I error is committed if and only if the
intersection of all true hypotheses, ω_τ, is tested and rejected by φ_τ; with A the event
that any true ω_β is rejected and B the event that φ_τ(X) = 1, pr(A ∩ B) =
pr(B) pr(A | B) ≤ α, and since A ∩ B = A, pr(A) ≤ α.

Investigator restatement (not in the source's words): ω_τ ∈ W by closure and ω_τ ⊂ ω_β
for every true ω_β, so rejecting any true ω_β requires ω_τ to have been rejected first;
hence A ⊆ B and pr(A) ≤ pr(B) ≤ α because ω_τ is true and φ_τ has level α on ω_τ. The
argument holds for every θ ∈ Ω, so the bound is on the probability of at least one false
rejection under an arbitrary configuration of true and false hypotheses. This is what the
catalogue calls strong familywise error control; the translation is the investigator's,
the quantifier structure is the source's. When no hypothesis in W is true, no type I
error is possible and the bound is trivial. Verified as a finite set-inclusion check in
the reproduction script.

### 4.3 Dependence and distributional assumptions

No dependence, joint-distribution or independence condition appears anywhere in the
argument; only the level condition on each local test is used. Part C Section C.3's
reading ("dependence between valid local tests is not an extra condition") is agreed
with. The source does not say and does not need that the local tests be Bonferroni,
likelihood-ratio or any particular kind.

### 4.4 Consonance, shortcut form, and the two-sided limitation (printed pp. 656–657)

- The Dunnett-type example (p. 656) is consonant in Gabriel's (1969) sense; the source
  then writes it as a shortcut ("simplified form") ordering the treatment means and
  using the critical point d_{k−i+1,ν,α}. This is the earliest statement in the
  supplied originals that consonance yields a stepwise shortcut; it is stated for that
  example, not proved in general.
- The example loses Dunnett's one-sided confidence bounds and makes each inference
  depend on the "irrelevant" other means (p. 656): closed testing gives rejections, not
  intervals, in this source.
- Two-sided alternatives (pp. 656–657): rejecting μ_{i1} = μ_{i2} in favour of one
  direction raises the directional-error question; the source says it "seems natural" to
  require the probability of no false non-directional rejection and no false directional
  acceptance to be at least 1 − α and states: "Until now no closed testing procedure has
  been shown to have this property." The guarantee in 4.2 therefore covers false
  rejections of true null hypotheses only; directional claims are outside what this
  source establishes.

### 4.5 Ordered analysis of variance application (printed pp. 657–659)

- Model (p. 657): k independent sample means X̄_i ~ N(μ_i, σ²/n_i), σ² known and set to
  one, and an a priori ordering Ω: μ_1 ≤ … ≤ μ_k assumed known.
- Closed family: ω_g for every partition g of {1, …, k} into consecutive blocks; the
  overall null ω_0 is the intersection of all ω_g (p. 657).
- Statistic D²_g (p. 657) with block-wise amalgamation (pool-adjacent-violators) and
  the null distribution as a mixture of chi-square tails over level counts (p. 658);
  singleton blocks contribute nothing (p. 658).
- Table 1 (p. 658): upper 5 % and 1 % points for 4 to 10 means, equal n.
- Stepwise construction (p. 658): test ω_0 with D²; if rejected, test all two-block
  ω_g; then three-block partitions that are not sub-partitions of an unrejected
  two-block ω_g; and so on — the closed procedure of Section 2 in explicit stepwise form.
- Unknown variance (pp. 658–659): replace D²_g by Ē²_g with a chi-square variance
  estimate on ν degrees of freedom, whose null distribution uses beta variables; tables
  exist for the overall null and equal n_i only (Barlow et al. 1972), not for partitions.
- Numerical example (p. 659, Tables 2 and 3): six means 8, 10, 16, 12, 8, 8. All ten
  D²_g values and all amalgamated estimates were reproduced exactly (Section 13).

### 4.6 Printed doubts and internal inconsistencies

- **Table 1 (p. 658), six cells.** Recomputing every printed point from the paper's own
  formula (p. 658, equal n) with level probabilities |s(λ, m)|/λ! (Stirling numbers of
  the first kind, the equal-weights form) reproduces 58 of the 64 printed points to
  within 0.001 (most to within 0.0005). The six exceptions are the 5 % point for
  (2, 3, 4), printed 7.394, computed 7.397; the 5 % points of every four-block row,
  printed 6.322, 6.966, 7.440, 7.585, computed 6.498, 7.185, 7.688, 7.840; and both
  points of the five-block row (2, 2, 2, 2, 2), printed 7.248 and 11.001, computed
  7.480 and 11.183. The printed four- and five-block 5 % points give upper-tail
  probabilities of roughly 0.054 rather than 0.05, i.e., they are anti-conservative if
  used. The 1 % points of the same four-block rows agree with the formula, which
  supports the reading that the discrepancy is a computational or transcription error in
  those cells rather than a different definition. No erratum search was possible; this
  is an investigator observation, not a claim of an acknowledged error.
- **"Taken from Table 1" (p. 659).** Table 3's single-block critical points 5.460,
  5.049, 4.528 and 3.820 (for k = 6, 5, 4, 3) are not in Table 1, which lists only
  multi-block partitions; they are the standard equal-n chi-bar-square points and were
  reproduced from the same formula.
- The catalogue does not use Table 1, so neither doubt touches CLS-01's
  characterization; both matter for anyone who later cites the table as an oracle.

### 4.7 Catalogue comparison for CLS-01 and C-D1

The fixed entry ("closed testing principle … `R3-CAND`† (as framework) — foundational
strong-FWER construction") and the C-D1 claim ("construction and strong-FWER argument;
local level-α test condition") are supported by pp. 655–656 in every component. The
Section 9 cross-matrix row for CLS-01 ("valid local level-α tests (pending SR-D)";
"intersection-test evaluations (up to 2^m − 1)") is supported. Two narrowings are
recorded, not as contradictions: the guarantee excludes directional errors (4.4), and
the source's ordered-ANOVA machinery (Section 3 of the paper) is a separate procedure
with its own known-variance and a-priori-ordering assumptions and is not part of the
CLS-01 framework claim. Part C Section C.3 row 15 is agreed with in full.

## 5. Wiens (2003) — direct findings (C-D2: CLS-03; CLS-02 as its special case)

### 5.1 Definitions and the fixed testing sequence procedure (printed pp. 211–212)

- FWE definitions follow Hochberg and Tamhane (p. 212): weak control under the global
  null; strong control "under any parameter configuration".
- Fixed testing sequence procedure (p. 212, Section 2.2): hypotheses prospectively
  ordered H_0^(1), …; each tested at level α "as long as all H_0^(j), j < i, have been
  rejected. Once an H_0^(i) is not rejected, all testing stops, with H_0^(k), k > i, not
  rejected." The source calls the order "of the utmost importance" and notes (p. 213)
  that the method "is often called a 'closed testing' procedure, but 'fixed sequence'
  may be more appropriate terminology", citing Westfall and Krishen.

### 5.2 The proposed (fallback) procedure (printed p. 213, Section 2.3)

- Prespecified order H_0^(1), …, H_0^(I) and prespecified α'_i with Σ α'_i = α.
- H_0^(1) is tested at α_1 = α'_1; H_0^(i) at α_i = α'_i if H_0^(i−1) was not rejected,
  or α_i = α'_i + α_{i−1} if it was rejected. Testing never stops early: every hypothesis
  is tested.
- The fixed sequence procedure "is a special case of the proposed method, with
  α_1 = α and α_i = 0 for i > 1" (p. 213).

### 5.3 Error criterion, strength and proof basis (printed p. 213)

Source claim: "This method will control the FWE in the strong sense." Proof given for
I = 2 by four cases: no true null (no error possible); both true, P(A ∪ B) =
P(A) + P(A^c B) ≤ α'_1 + α'_2 = α; only H^(1) true, error probability α'_1; only H^(2)
true, error probability α_2 ≤ α'_1 + α'_2 with equality only when H^(1) is always
rejected. For I > 2 the source says "A proof for I > 2 would be analogous, requiring
consideration of 2^I possibilities" — asserted, not written out.

Investigator derivation for general I (not in the source). Let t_1 < t_2 < … index the
true null hypotheses and let F_j be the (possibly empty) set of false hypotheses that
sit between t_{j−1} and t_j in the sequence (with F_1 the false hypotheses before t_1).
If no true hypothesis before t_j has been rejected, the level at which H^(t_j) is tested
is at most α'_{t_j} + Σ_{l ∈ F_j} α'_l, whatever the rejections among F_j. Hence
P(some true hypothesis rejected) = Σ_j P(H^(t_j) is the first true hypothesis rejected)
≤ Σ_j (α'_{t_j} + Σ_{l ∈ F_j} α'_l) ≤ Σ_i α'_i = α, using only P(p_i ≤ c) ≤ c for each
true H_i. No dependence assumption is used. Exact worst-case values for I = 3 under
independent uniform null p-values are listed by the script (all ≤ α). The fixed-sequence
special case inherits the bound. Separately, Section 7 shows that the fallback is a
consonant weighted-Bonferroni closed procedure (Bretz et al. chain graph), which gives
a second, independent route to the same guarantee via Section 4.

### 5.4 Member set, order, weights, outputs

- Member set: a prespecified finite ordered family of null hypotheses (endpoints in the
  source's application). Order and the α'_i are design inputs, "in contrast to the other
  Bonferroni-like procedures, in which the magnitude of the observed p-values defines
  α_i" (p. 214).
- Outputs: rejection decisions only. No adjusted p-value, no confidence interval and no
  directional claim is defined in this source.
- Power statements (pp. 213–214) are qualitative or illustrative; no simulation is
  reported. The sample-size remark (48 % and 6 % increases) is reproduced to 48.8 % and
  6.8 % by the standard two-sided normal approximation at 80 % power; the small
  differences are presentation rounding or an unstated formula and are not
  decision-bearing.

### 5.5 Printed doubts

- Two DOI forms appear in the same PDF: `10.1002/pst.064` printed on p. 211 and
  `10.1002/pst.64` in the Wiley download stamp; the intake note in continuation
  Section 19 is confirmed.
- "Greater than" and "increased power" statements are unproved comparisons; the source
  itself says the method "will not be uniformly more or less powerful" than Holm,
  Simes, Hommel or Hochberg (p. 214).

### 5.6 Catalogue comparison for CLS-03 and CLS-02

- CLS-03 ("Fallback procedure (Wiens 2003) `RES-ONLY`†") is supported: the procedure,
  its inputs and its strong-FWE claim are on p. 213, with the I > 2 proof gap closed by
  the derivation in 5.3 and by Section 7. The later fallback variants — the improvement
  of Wiens and Dmitrienko (2005) drawn as Bretz et al. Figure 7 and the modified fallback
  of Bretz et al. Figure 11 — are different procedures and are reopen triggers, not part
  of CLS-03.
- CLS-02 ("Fixed-sequence (hierarchical) testing", assigned to SRC-27 Maurer et al.
  1995): the procedure is described on p. 212 and is a stated special case of the
  fallback on p. 213, so its description and strong-FWE guarantee are directly supported
  by this original (and by Bretz et al. Section 2.3 with the Appendix). What is not
  supported by any supplied original is the attribution to, and the exact original
  formulation in, Maurer, Hothorn and Lehmacher (1995); see Section 8.

## 6. Dmitrienko, Offen and Westfall (2003) — direct findings (C-D2: CLS-05 and CLS-04)

### 6.1 Framework (printed pp. 2388–2390)

- Serial versus parallel (p. 2388): gatekeeping procedures "proposed in the literature"
  pass the gatekeeper family only if all its hypotheses are rejected ("serial"); the
  paper's contribution is "parallel" gatekeeping, passing when at least one gatekeeper
  hypothesis is rejected. The literature cited for gatekeeping is Bauer et al. [5]
  (1998), Westfall and Krishen [6] (2001) and Gong et al. [7] (2000). Maurer, Hothorn
  and Lehmacher (1995) is not cited anywhere in this paper.
- Two families F_1 = {H_1, …, H_k} (gatekeeper) and F_2 = {H_{k+1}, …, H_m}; target:
  FWE "with respect to both families of hypotheses in the strong sense (Hochberg and
  Tamhane)" (p. 2389).
- Closed testing principle credited to Marcus et al. (p. 2389): with p_H from a test
  "whose size is no more than α when H is true", the adjusted p-value is
  p̃_i = max_{H ∈ ℋ_i} p_H and the procedure rejecting H_i when p̃_i ≤ α "strongly
  controls the FWE at the α level".
- Weighted Bonferroni intersection test (p. 2389): weights v_i(H) with 0 ≤ v_i ≤ 1,
  v_i(H) = 0 for i ∉ H, Σ v_i(H) ≤ 1; p_H = min_i δ_i(H) p_i / v_i(H) with the convention
  that a zero weight contributes 1. "By the Bonferroni inequality, the size of this test
  is no greater than α. Therefore, the resulting closed testing procedure … controls the
  FWE in the strong sense for any set of weight vectors" (pp. 2389–2390). No dependence
  assumption is used for the Bonferroni version.

### 6.2 Parallel gatekeeping: Algorithm 1, conditions and properties (printed pp. 2390–2392)

- Conditions (p. 2390): (1) gatekeeper adjusted p-values do not depend on the
  significance of the secondary p-values; (2) secondary adjusted p-values are greater
  than min(p̃_1, …, p̃_k).
- Algorithm 1 (p. 2390) with prespecified importance weights w_1 + … + w_k = 1 and
  w_{k+1} + … + w_m = 1: Case 1 (H contains all k gatekeepers) v_i = w_i for gatekeepers,
  0 for secondaries; Case 2 (H contains 1 ≤ r ≤ k − 1 gatekeepers) v_i = w_i for the
  gatekeepers in H and v_i = w_i (1 − Σ_{gatekeepers in H} w_j) / Σ_{secondaries in H}
  w_j for the secondaries in H; Case 3 (no gatekeeper) v_i = w_i / Σ_{secondaries in H}
  w_j.
- Stated properties (p. 2392): p̃_i = p_i / w_i for the gatekeepers; Condition 2 is
  "easy to demonstrate".
- Investigator derivations: (a) under Algorithm 1 every H containing gatekeeper i has
  v_i(H) = w_i, so p_H ≤ p_i / w_i for all such H, and the singleton H = {H_i} attains
  it; hence p̃_i = p_i / w_i exactly. (b) With H = F_1 ∪ {H_s} (Case 1) the secondary
  weight is 0, so p_H = min_i p_i / w_i and p̃_s ≥ min_i p̃_i; equality is possible, so
  "greater than" reads as "at least". (c) When H contains some but not all gatekeepers
  and no secondary, the secondary formula is vacuous and the weights sum to
  Σ_{gatekeepers in H} w_j < 1 — a valid but non-exhaustive test; Table I's rows for
  H_1 and H_2 (0.5, 0, 0, 0) and (0, 0.5, 0, 0) follow this reading.

### 6.3 Serial gatekeeping: Algorithm 2 (printed p. 2391)

Credited to Westfall and Krishen: "serial gatekeeping strategies can be set up by
sequentially carrying out two weighted Holm tests". Algorithm 2: Case 1 (H contains at
least one gatekeeper) v_i = w_i / Σ_{gatekeepers in H} w_j for gatekeepers, 0 for
secondaries; Case 2 (no gatekeeper) v_i = w_i / Σ_{secondaries in H} w_j. Stated: "One
can verify" that secondary adjusted p-values exceed max(p̃_1, …, p̃_k). Investigator
derivation: for any H containing gatekeeper i, H ∪ {H_s} has the same gatekeeper set and
therefore the same non-zero weights, so p_{H ∪ {s}} = p_H and p̃_s ≥ p̃_i for every i;
equality is again possible. Verified on a 625-point grid in the script.

### 6.4 Simes and resampling extensions (printed pp. 2392–2393)

- Unweighted Simes p_H = t min_j p_(j)H / j: "exact type I error control was proven
  under independence by Simes and conservative type I error control was established
  under positive dependency among p-values by Sarkar" (p. 2392).
- Weighted Simes p_H = min_l p_(l)H / Σ_{i ≤ l} v_(i)H (p. 2393): "Proof of type I
  error control for this procedure under positive regression dependency is given by
  Kling and Benjamini (unpublished manuscript, 2002)". The weighted-Simes gatekeeping
  guarantee therefore rests, in this source, on an unpublished manuscript and a
  positive-dependence condition; it is not the dependence-free Bonferroni guarantee.
- Parametric resampling (p. 2393): plug-in estimate of the true correlation under
  multivariate normal (MANOVA) assumptions, B simulated data sets, empirical p-value;
  large-sample, simulation-based, and normality-dependent by construction.

### 6.5 Examples and tables (printed pp. 2394–2397) and a source-internal ambiguity

- Table I (equal weights, k = 2, m = 4): all 15 weight rows reproduced from
  Algorithm 1.
- Table III (weights 0.9, 0.1, 0.5, 0.5; three scenarios): the Bonferroni column is
  reproduced exactly by Algorithm 1 as printed (singleton gatekeeper intersection at
  weight w_i). The Simes column is reproduced only if the weights of each intersection
  are rescaled to sum to one over H (the Benjamini–Hochberg 1997 form), equivalently —
  for k = 2 — if a singleton gatekeeper intersection is tested at level α. The printed
  weighted-Simes formula (p. 2393) with unrescaled Algorithm 1 weights gives 0.0267
  instead of the printed 0.0260 for the first scenario's primary endpoint.
- Table II (p. 2394) lists p_1000 = p_1 and p_0100 = p_2 for the singleton gatekeeper
  intersections, i.e., level α, while stating that its p-values "are based on the
  weighted Bonferroni rule". Under that convention the Bonferroni-adjusted p-value for
  mortality in scenario 1 would be 0.0289, not the printed 0.0300, and the stated
  property p̃_i = p_i / w_i can fail (script counterexample: p = (0.024, 0.001, 0.001,
  0.001) gives p̃_1 = 0.024 < 0.0267).
- Consequence: the source is internally consistent about the error guarantee (any
  weight vector with Σ v ≤ 1 is valid) but not about which of two conventions defines
  the singleton (more generally, gatekeeper-only proper subset) intersection tests. The
  two conventions give different adjusted p-values and, in the Table II convention,
  different rejection sets. The parallel-gatekeeping "procedure" is therefore a family
  of two variants in this text unless one convention is declared. Both variants satisfy
  Condition 2; only the Algorithm 1 convention satisfies Condition 1 literally.
- Dose-finding example (Section 5, Table V): four families F_1 … F_4 are tested "in
  parallel fashion", but the paper defines Algorithm 1 for two families only and states
  no weighting rule for the four-family case. Investigator reconstruction: a graph with
  initial levels (α/2, α/2, 0, 0, 0, 0), each F_1 member passing half its level to each
  F_2 member, F_2 members passing to F_3, and F_3 to F_4, reproduces every Bonferroni
  adjusted p-value of Table V (0.0203, 0.0011, 0.0573, 0.0064, 0.0348, 0.0848) to the
  printed precision under Bretz et al. Algorithm 2. This is consistent with, not stated
  by, the source; the multi-family extension remains undefined in the text.
- Section 6 power comparisons (pp. 2397–2399): simulation with 1,000,000 samples,
  normal data with common correlation, equal weights within families; PAAS results
  analytic. Not reproduced; recorded as simulation evidence.

### 6.6 Printed doubts

- Reference 12 (p. 2400) gives Simes (1986) as "Biometrika 1986; 63:655–660" — the
  page range of Marcus et al. — instead of 73:751–754 (the identity recorded for SRC-15).
- "Greater than" in Conditions 2 and in the Algorithm 2 property is "at least" (6.2, 6.3).
- The singleton-intersection ambiguity of 6.5.

### 6.7 Catalogue comparison for CLS-05 and CLS-04

- CLS-05 ("Parallel gatekeeping (Dmitrienko-Offen-Westfall 2003) `RES-ONLY`†"):
  supported for the Bonferroni version — two-family structure, prespecified importance
  weights, closed weighted-Bonferroni construction, strong FWE without dependence
  assumptions, Conditions 1 and 2. Narrowings: the Simes and resampling versions carry
  their own dependence and normality conditions and an unpublished-manuscript
  dependency (6.4); the singleton convention has to be declared (6.5); the multi-family
  extension is not defined in the source (6.5).
- CLS-04 ("Serial gatekeeping (Maurer-Hothorn-Lehmacher 1995 lineage) `RES-ONLY`†"):
  the serial Bonferroni procedure is stated (Algorithm 2) with its guarantee following
  from 6.1, and the Section 8 ε-graph representation reproduces it. The catalogue's
  lineage label is not supported by this source, which credits serial gatekeeping to
  Bauer et al. (1998), Westfall and Krishen (2001) and Gong et al. (2000) and never
  cites the 1995 chapter; Bretz et al. cite the 1995 chapter only for fixed-sequence
  tests (Section 7.3). Whether the 1995 chapter itself contains a serial gatekeeping
  formulation cannot be established without that text.

## 7. Bretz, Maurer, Brannath and Posch (2009) — direct findings (C-D3, CLS-06)

### 7.1 Objects and Algorithm 1 (printed pp. 589–591)

- Inputs: m elementary hypotheses; initial levels α = (α_1, …, α_m) with
  Σ α_i ≤ α; a transition matrix G = (g_ij) with 0 ≤ g_ij ≤ 1, g_ii = 0, Σ_k g_ik ≤ 1
  (regularity conditions (1), p. 590); unadjusted p-values p_i.
- Algorithm 1 (p. 591): choose j = argmin_{i ∈ I} p_i / α_i; if p_j ≤ α_j reject H_j,
  else stop; update I → I \ {j}, α_l → α_l + α_j g_jl for l ∈ I, and
  g_lk → (g_lk + g_lj g_jk) / (1 − g_lj g_jl) for l, k ∈ I, l ≠ k; repeat while
  hypotheses remain.
- Semantics of an edge (p. 587): the fraction of the tail's local level that is added to
  the head's level when the tail hypothesis is rejected.

### 7.2 What the Appendix proves and what it imports (printed pp. 601–603)

- Imported from Hommel, Bretz and Maurer (2007) [9], not proved here: for local
  levels satisfying Σ_{i ∈ I} α_i(I) ≤ α (A1) and the monotonicity α_i(I) ≤ α_i(J) for
  i ∈ J ⊂ I (A2), the weighted-Bonferroni closed test is consonant and equals the
  shortcut "reject any H_j with p_j ≤ α_j(I), remove j, repeat" ([9, Theorem 1], quoted
  on p. 602). The paper describes [9]'s condition as necessary and sufficient; the
  necessity direction is not used by anything below.
- Proved here (Appendix (ii), pp. 602–603): the update rules (A3)/(A4) applied to
  subsets of vertices generate a unique family of levels α(J) for every non-empty
  J ⊆ M — uniqueness by the symmetry of (A5) in the two removed indices, so the levels
  and matrices do not depend on removal order — and by induction (A1), (A2) and the
  regularity conditions hold for every J.
- Proved here (Appendix (iii), p. 603): the [9] shortcut applied to those levels is
  exactly Algorithm 1; therefore the graph procedure "protects the FWER".
- Investigator derivation replacing the [9] dependency for the direction that matters.
  Under (A1) and (A2) with weighted-Bonferroni local tests: (a) if the shortcut rejects
  j_1, j_2, … in that order with I_u = M \ {j_1, …, j_{u−1}} and p_{j_u} ≤ α_{j_u}(I_u),
  then for any J ∋ j_u either J contains some earlier j_v — take the smallest such v, so
  J ⊆ I_v and p_{j_v} ≤ α_{j_v}(I_v) ≤ α_{j_v}(J) by (A2) — or J contains none, so
  J ⊆ I_u and p_{j_u} ≤ α_{j_u}(I_u) ≤ α_{j_u}(J); in both cases the local test of H_J
  rejects, so the closed test rejects H_{j_u}; (b) if the shortcut stops at I with
  p_i > α_i(I) for all i ∈ I, the local test of H_I does not reject and no H_i, i ∈ I,
  is rejected by the closed test. Hence the shortcut's rejection set equals the closed
  test's, the closed test's set does not depend on any selection order (Remark (iii)),
  and strong FWER control follows from Section 4 because Σ_{i ∈ I} α_i(I) ≤ α makes each
  local Bonferroni test level α under only marginal validity of the p-values. This
  derivation is the investigator's; the source relies on [9] for it.

### 7.3 Representation and equivalence claims, exactly as the source states them

| Claim in the source                                                                                                                                                                                                      | Where               | Status in the source                                                             | Checked here                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "all these procedures [weighted/unweighted Holm, fixed sequence, fallback, Bonferroni gatekeeping] belong to a subclass of weighted Bonferroni-based closed test procedures which fulfill a mild monotonicity condition" | p. 587              | attributed to [9], uninspected                                                   | not checkable from the packet                                                                                                                                                           |
| Figure 1 = weighted Bonferroni–Holm, m = 2; Figure 3 = Holm, m = 3                                                                                                                                                       | pp. 587, 589, 594   | stated, with the G matrix                                                        | Figure 4 example reproduced: rejects H_3 then H_1, not H_2; closure with graph weights gives the same set                                                                               |
| Figure 2 "fully specifies the sequentially rejective procedure from [7]" (Dmitrienko et al. parallel gatekeeping, k = 2, m = 4)                                                                                          | p. 588              | stated for that example                                                          | verified: the graph's intersection levels equal Algorithm 1 weights × α for all 15 intersections, for equal weights and for (0.9, 0.1, 0.5, 0.5) with initial levels (0.9α, 0.1α, 0, 0) |
| Fixed sequence test = graph with a = (α, 0, 0) and chain edges of weight 1                                                                                                                                               | p. 593, Figure 6    | stated                                                                           | verified on a 1000-point grid against the sequential rule of Wiens Section 2.2                                                                                                          |
| Fallback (Wiens) = graph with a = (α_1, α_2, α_3) and chain edges of weight 1                                                                                                                                            | p. 593              | stated                                                                           | verified on a 1000-point grid against Wiens's rule, both by Algorithm 1 and by full closure                                                                                             |
| Figure 7 = the improved fallback of [5] with r = α_2 / (α_1 + α_2)                                                                                                                                                       | p. 593              | "It can be shown", not shown                                                     | not checked ([5] uninspected)                                                                                                                                                           |
| Figure 8 = step-down test of Bauer et al. (2001) Section 3                                                                                                                                                               | p. 594              | stated                                                                           | not checked ([13] uninspected)                                                                                                                                                          |
| Serial family structure via ε-edges: level leaves F_k only when all of F_k is rejected; choice of ε-edge origin immaterial                                                                                               | pp. 596–597         | stated with the ε calculation rules; equivalence of origins asserted, not proved | ε-graph reproduces Dmitrienko Algorithm 2 weights for all 15 intersections (k = 2, m = 4); Figures 9 and 10 examples reproduced                                                         |
| Figure 12 uniformly improves Figure 2 by ε-edges; the improvement "has been described previously in [9, 18]"                                                                                                             | p. 598              | stated with one numerical example                                                | example reproduced: Figure 2 rejects H_1, H_3, H_4; Figure 12 rejects all four                                                                                                          |
| Graphs specify m² weights; consonant Bonferroni closed tests exist for m ≥ 4 that "are not covered by the graphs proposed so far"                                                                                        | p. 592, Remark (iv) | stated                                                                           | limits every "unification" reading; see 7.8                                                                                                                                             |
| Algorithm 2 adjusted p-values equal those of the algorithm in [14]; decisions equal Algorithm 1                                                                                                                          | p. 595              | stated with one example                                                          | example reproduced (0.036, 0.04, 0.055); [14] uninspected                                                                                                                               |
| Simultaneous one-sided lower bounds via [15, 16]                                                                                                                                                                         | pp. 595–596         | formula stated; proofs in [15, 16]                                               | not checked; one-sided hypotheses only                                                                                                                                                  |
| Other intersection tests (weighted Simes, Dunnett, resampling max-t, Šidák) may be used but consonance may be lost and the full closure needed                                                                           | p. 601              | stated                                                                           | agrees with 6.4: the shortcut and its dependence-free guarantee are Bonferroni-specific                                                                                                 |

### 7.4 Weight transfer, graph updates and edge cases

- Loops (p. 592, Figure 5 bottom): with edges H_1 → H_2 and H_2 → H_1 of weight 1/2,
  rejecting H_2 gives levels (α_1 + α_2/2, 0, α_3 + α_2/2) and the renormalized edge
  g_13 = 1. Reproduced exactly.
- Level lost when a rejected vertex has no remaining outgoing edge (fallback with the
  last hypothesis rejected first; parallel-gatekeeping singleton intersections): the
  update assigns nothing, which is what makes such graphs non-exhaustive and is exactly
  what Figure 12's ε-edges repair.
- Zero initial level: a hypothesis with α_i = 0 cannot be rejected until level arrives;
  the argmin p_i / α_i in Algorithm 1 is undefined for α_i = 0 and the text does not say
  how to treat it — an implementation convention, not a source statement (the script
  excludes zero-level hypotheses from the argmin).
- Ties and selection rule: Remark (iii) states the final rejection set is independent
  of which rejectable hypothesis is chosen; the investigator derivation in 7.2 proves it.
- ε-edges (p. 596): ε is a fixed positive real in the transition updates and is sent to
  zero when levels are read, with the stated rules x + ε = x, xε = 0, ε⁰ = 1 and
  ε^k/ε^l ∈ {0, 1, ∞}. The script uses an exact rational ε = 10⁻⁹ and drops O(ε)
  contributions from levels; all four printed ε examples reproduce.
- Completeness (p. 597): a graph "cannot be improved by adding additional edges" if
  outgoing weights sum to one at each vertex and the graph is irreducible; stated as a
  rule, not proved.

### 7.5 Outputs

Rejection set (Algorithm 1); adjusted p-values (Algorithm 2, p. 595, defined as the
smallest α at which the hypothesis is rejected by the procedure); one-sided simultaneous
lower confidence bounds (p. 595) under the compatible-interval results of [15, 16];
tabulated intersection weights for decision tables (Remark (v)). The Markov-chain
interpretation (p. 601) is expository.

### 7.6 Printed doubts

- p. 598, last sentence of the improved-gatekeeping example: "but only H_1, H_2, and H_3
  with the original procedure displayed in Figure 2" contradicts the same paragraph's
  own trace (H_1, then H_3, then H_4 rejected; H_2 not rejected because
  p_2 = 0.04 > α/2) and the reproduction; the intended set is H_1, H_3, H_4.
- p. 599, Strategy 2: F_2 is printed as {H_21, H_22, H_33}; the case study has no H_33
  and the intended element is H_23.
- p. 592, Remark (i) refers to "Figure 3" for the loop example; the loop example is the
  bottom graph of Figure 5 (Figure 3 is Holm with m = 3, which does contain cycles, so
  the reference is defensible either way).

### 7.7 Assumptions

Only: valid unadjusted p-values for the elementary hypotheses (marginal level), a
prespecified graph (α, G) satisfying (1), and weighted-Bonferroni intersection tests.
No distributional, dependence or sample-size assumption is used for the FWER claim.
Confidence-bound claims add one-sided hypotheses and the [15, 16] results.

### 7.8 Catalogue comparison for CLS-06 and C-D3

CLS-06 ("Graphical weighted-Bonferroni procedures (Bretz et al. 2009) `RES-ONLY`† —
unifying representation; candidate future framework") and C-D3 ("representation and
equivalence claims") are supported for the representation (7.1), the strong-FWER
guarantee of every graph procedure (7.2, with the [9] dependency replaced by the
investigator derivation), and the named equivalences in 7.3 that were checked. The
SRC-26 "needed for" text in the fixed result ("gatekeeping unification") and the Section
9 cross-matrix row ("graph/weight bookkeeping"; "prespecified order/weights") are
supported only with this narrowing: the source shows that several common Bonferroni
gatekeeping, fixed-sequence and fallback procedures are graph-representable and proves
that every graph is a valid consonant closed procedure; it does not prove that every
gatekeeping or every Bonferroni closed procedure is a graph (Remark (iv) says the
opposite for m ≥ 4), and its general subclass statement rests on the uninspected [9].
Nothing contradicts `RES-ONLY`†.

## 8. Maurer, Hothorn and Lehmacher (1995): exact dependency partition

The chapter is assigned to SR-D as SRC-27 (b), is not in custody (3.2), and was not read.
The commission's rule makes SR-D `INPUT_INCOMPLETE` while a required text is uninspected.
The claims that need that text are separated below from claims the four supplied
originals support directly; no silent substitution is made.

| Claim                                                                                                                                                          | Entry  | Needs SRC-27 (b)?                                                                                                           | Directly supported by the supplied originals?                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Definition of the fixed-sequence procedure (prespecified order, each hypothesis at level α, stop at the first non-rejection)                                   | CLS-02 | no, as a definition                                                                                                         | yes: Wiens p. 212 Section 2.2; Bretz et al. p. 593 with citations [2, 3]                                                                                                                   |
| Strong FWER control of the fixed-sequence procedure                                                                                                            | CLS-02 | no                                                                                                                          | yes: Wiens p. 213 (special case of the fallback, I = 2 proof; I > 2 asserted) + the derivation in 5.3; independently, Bretz et al. Appendix for the Figure 6 graph + the derivation in 7.2 |
| Attribution of the fixed-sequence procedure to the 1995 chapter; its original formulation, stated assumptions, any one-sided/two-sided or continuation variant | CLS-02 | **yes**                                                                                                                     | no; the supplied originals only cite it (Bretz et al. reference 2; Wiens cites Westfall and Krishen instead)                                                                               |
| Definition of serial (Bonferroni) gatekeeping and its strong FWER control                                                                                      | CLS-04 | no                                                                                                                          | yes: Dmitrienko et al. p. 2391 Algorithm 2 with the closed weighted-Bonferroni guarantee of pp. 2389–2390; Bretz et al. pp. 596–597 ε-graph families; reproduced equivalence in Section 13 |
| "Maurer–Hothorn–Lehmacher 1995 lineage" of serial gatekeeping                                                                                                  | CLS-04 | **yes** to confirm; the supplied originals point elsewhere (Bauer et al. 1998; Westfall and Krishen 2001; Gong et al. 2000) | no; contradicted as an attribution by the citation structure of both 2003 and 2009 texts                                                                                                   |
| Fallback procedure and its guarantee                                                                                                                           | CLS-03 | no                                                                                                                          | yes: Wiens p. 213                                                                                                                                                                          |
| Parallel gatekeeping and its guarantee                                                                                                                         | CLS-05 | no                                                                                                                          | yes: Dmitrienko et al. pp. 2389–2392                                                                                                                                                       |
| Closed testing principle                                                                                                                                       | CLS-01 | no                                                                                                                          | yes: Marcus et al. pp. 655–656                                                                                                                                                             |
| Graphical representation and its guarantee                                                                                                                     | CLS-06 | no                                                                                                                          | yes: Bretz et al. pp. 589–591, 601–603 (with the 7.2 derivation in place of [9])                                                                                                           |

**Alternative-primary-basis proposal (for steward decision; not enacted).** If the steward
decides that CLS-02's decision-bearing basis is the procedure and its guarantee rather
than its historical attribution, Wiens (2003) Sections 2.2–2.3 together with Bretz et
al. (2009) Section 2.3 and Appendix are a sufficient primary basis, and the 1995
attribution can be carried as an unverified bibliographic note (like the SR-E
attribution residual). If the steward decides likewise for CLS-04, Dmitrienko et al.
(2003) Section 2.2 with Bretz et al. Section 3.3 is a sufficient primary basis, with the
lineage label replaced by "as formulated by Dmitrienko et al. (2003) after Westfall and
Krishen (2001)" or left as an unverified note. Either decision is a commission change
for those two entries and is not made here. A reduced-scope alternative is to keep
SRC-27 (b) required and treat CLS-02 and CLS-04 as the named gaps of a `PARTIAL`
disposition. Section 18 gives the executable prompt for the remaining reading if the
chapter is obtained.

## 9. Cross-source comparison

### 9.1 Relations established by the sources or verified here

- Fixed sequence ⊂ fallback (Wiens p. 213: α_1 = α, other α'_i = 0).
- Fallback = chain graph (Bretz p. 593; verified by exhaustive grid and by full closure).
- Dmitrienko parallel gatekeeping (k = 2, m = 4) = Figure 2 graph (Bretz p. 588;
  verified for both weight sets). Investigator extension: the proportional graph
  reproduces Algorithm 1 for k = 3, m = 6 with unequal weights (all 63 intersections),
  so the two-family Bonferroni parallel procedure is graph-representable in general;
  this is the investigator's result, not a source statement.
- Dmitrienko serial gatekeeping (Algorithm 2) = Bretz ε-graph with the gatekeeper
  family closed under positive edges (verified, k = 2, m = 4).
- Every procedure above is a consonant closed weighted-Bonferroni procedure and inherits
  the Marcus et al. guarantee through the Bonferroni inequality with no dependence
  assumption.

### 9.2 What must stay distinct

- Bonferroni-based gatekeeping (dependence-free) versus Simes-based or resampling-based
  gatekeeping (positive dependence, unpublished proof, normality, large sample).
- Original fallback (Wiens 2003) versus the improved fallback (Wiens and Dmitrienko
  2005, Bretz Figure 7) versus the modified fallback (Bretz Figure 11): three procedures.
- Original parallel gatekeeping (Figure 2) versus the ε-improved version (Figure 12,
  attributed to [9, 18]): different rejection sets in the source's own example.
- The two singleton-intersection conventions inside Dmitrienko et al. (6.5).
- Two-family versus multi-family gatekeeping: the latter is used but not defined in
  Dmitrienko et al.
- Closed testing as a construction (any level-α local tests, CLS-01) versus the
  Bonferroni-shortcut subclass (CLS-06); consonance and the shortcut belong to the
  subclass.
- Non-directional false rejection (all four sources) versus directional error (open in
  Marcus et al. p. 657; not addressed by the other three).

## 10. Facts, inferences and decisions kept separate

**Source-established facts (with pinpoints).**

- F-D-01. Closed testing: closed family, level-α local tests, test-only-after-all-implied-rejected rule, and the bound pr(A) ≤ α for every parameter point (Marcus et al. pp. 655–656).
- F-D-02. No dependence condition is used in that proof (p. 656).
- F-D-03. No closed procedure had been shown to control directional errors under two-sided alternatives as of that text (p. 657).
- F-D-04. Fixed sequence procedure: definition (Wiens p. 212); special case of the fallback (p. 213); graph (α, 0, 0) with chain edges (Bretz p. 593).
- F-D-05. Fallback: definition, prespecified order and α'_i with Σ α'_i = α, strong-FWE claim, proof for I = 2, "analogous" for I > 2 (Wiens p. 213).
- F-D-06. Weighted Bonferroni closed testing controls the FWE strongly for any admissible weight vectors, by the Bonferroni inequality (Dmitrienko et al. pp. 2389–2390).
- F-D-07. Parallel gatekeeping Algorithm 1, Conditions 1–2, and the claimed p̃_i = p_i/w_i (pp. 2390–2392); serial Algorithm 2 credited to Westfall and Krishen (p. 2391).
- F-D-08. Simes-based gatekeeping needs positive dependence (Sarkar 1998 for the unweighted test; an unpublished 2002 manuscript for the weighted test); resampling is parametric, plug-in, multivariate normal (pp. 2392–2393).
- F-D-09. Dmitrienko et al. attribute gatekeeping to Bauer et al. 1998, Westfall and Krishen 2001, Gong et al. 2000 (p. 2388) and do not cite Maurer et al. 1995; Bretz et al. cite Maurer et al. 1995 (pp. 3–18) for fixed-sequence tests only (pp. 587, 604).
- F-D-10. Graph procedure: regularity conditions (1), Algorithm 1, Algorithm 2, ε calculation rules, and the Appendix results (ii)–(iii) (Bretz pp. 590–591, 595–596, 602–603); the closed-test/shortcut equivalence is imported from [9].
- F-D-11. Graphs specify m² weights and do not cover every consonant Bonferroni closed test for m ≥ 4 (p. 592).
- F-D-12. Printed values reproduced: Dmitrienko Tables I, III (both columns under the conventions of 6.5), Table V Bonferroni column (under the 6.5 reconstruction); Bretz Figures 4, 5, 9, 10, 12 examples and Algorithm 2 example; Marcus Tables 2, 3 and 58 of 64 Table 1 points.

**Investigator inferences.**

- I-D-01. The closed-testing bound is strong FWER control in the catalogue's vocabulary (4.2).
- I-D-02. The fallback controls the FWER strongly for every I under marginal p-value validity only (5.3).
- I-D-03. Under (A1)–(A2) the shortcut equals the closed test, so Remark (iii) and strong FWER for every graph follow without [9] (7.2).
- I-D-04. p̃_i = p_i/w_i holds exactly under the Algorithm 1 convention and can fail under the Table II convention; Conditions hold with "at least" (6.2, 6.5).
- I-D-05. The proportional graph represents two-family parallel Bonferroni gatekeeping for general k, m and weights; the ε-graph represents serial gatekeeping (9.1).
- I-D-06. Six Table 1 cells in Marcus et al. do not follow the paper's own formula (4.6).
- I-D-07. The four-family example in Dmitrienko et al. is consistent with a chain-of-families graph (6.5).

**Decisions that belong to the steward or the author synthesis (none made here).**

- D-D-01. Whether CLS-02 and CLS-04 keep SRC-27 (b) as a required text or adopt the alternative primary basis of Section 8.
- D-D-02. Which singleton-intersection convention (or both, as variants) defines CLS-05 for any adjusted-p output.
- D-D-03. Whether CLS-06's wording is narrowed as in 7.8.
- D-D-04. Whether Simes-based and resampling-based gatekeeping are recorded as separate research-only variants outside CLS-05.
- D-D-05. Whether the fallback and gatekeeping variants of 9.2 become reopen triggers only or future variant-split entries.

## 11. Claim-to-source table

| Claim  | Component                                                                                 | Source and printed pinpoint                                                              | Directly supports                                     | Investigator addition                                    |
| ------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------- |
| C-D1   | closed family; local level-α condition; procedure                                         | Marcus et al. pp. 655–656 (Section 2, first paragraph and displayed condition)           | construction                                          | none                                                     |
| C-D1   | strong-FWER argument                                                                      | Marcus et al. p. 656 (pr(A ∩ B) = pr(B) pr(A \| B) ≤ α; A ∩ B = A)                       | bound under every parameter point                     | I-D-01 vocabulary translation; directional exclusion     |
| C-D2 a | fixed-sequence definition and guarantee                                                   | Wiens p. 212 Section 2.2; p. 213 special case; Bretz et al. p. 593 Figure 6, Appendix    | definition; guarantee via fallback and via graph      | I-D-02, I-D-03                                           |
| C-D2 a | fixed-sequence attribution to Maurer et al. 1995                                          | not inspected; Bretz et al. p. 604 reference 2 (citation only)                           | nothing                                               | Section 8 partition                                      |
| C-D2 b | fallback definition and guarantee                                                         | Wiens p. 213 Section 2.3 and proof                                                       | definition; strong FWE for I = 2; assertion for I > 2 | I-D-02 general proof                                     |
| C-D2 c | serial gatekeeping definition and guarantee                                               | Dmitrienko et al. p. 2391 Algorithm 2; pp. 2389–2390 guarantee; Bretz et al. pp. 596–597 | definition; guarantee                                 | ε-graph equivalence; "at least" reading                  |
| C-D2 c | serial gatekeeping "1995 lineage"                                                         | not inspected; Dmitrienko et al. p. 2388 and Bretz et al. p. 587 cite other origins      | nothing; attribution pointed elsewhere                | Finding S-1                                              |
| C-D2 d | parallel gatekeeping definition, conditions, guarantee                                    | Dmitrienko et al. pp. 2389–2392 (Algorithm 1, Conditions 1–2, Bonferroni guarantee)      | definition; guarantee for any weights; conditions     | I-D-04 convention ambiguity; Simes/resampling exclusions |
| C-D3   | graph representation; Algorithm 1; regularity conditions                                  | Bretz et al. pp. 590–591                                                                 | representation                                        | zero-level argmin convention                             |
| C-D3   | every graph is a valid consonant closed weighted-Bonferroni procedure                     | Bretz et al. pp. 602–603 (Appendix (ii)–(iii)), importing [9, Theorem 1]                 | guarantee, given [9]                                  | I-D-03 replaces the [9] dependency                       |
| C-D3   | named equivalences (Holm, fixed sequence, fallback, Dmitrienko k = 2 m = 4, serial via ε) | Bretz et al. pp. 587–588, 593–594, 596–598                                               | stated; reproduced here where checkable               | I-D-05 general two-family result                         |
| C-D3   | "unification" of all gatekeeping / Bonferroni closed tests                                | Bretz et al. p. 587 (via [9]); p. 592 Remark (iv)                                        | not established; explicitly limited for m ≥ 4         | Finding S-3                                              |

## 12. Entry-by-entry impact table

| Entry  | Technique                             | Fixed disposition (blob `8f215260…`) | Assigned source | Source outcome here                                                              | Support for the catalogue characterization                                                                                                 | Impact on the fixed entry                                       | Completion condition                                           |
| ------ | ------------------------------------- | ------------------------------------ | --------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------- |
| CLS-01 | Closed testing principle (1976)       | `R3-CAND`† (as framework)            | SRC-18          | read in full; formulas and tables verified on page images                        | supported; narrowings: non-directional errors only; ordered-ANOVA machinery separate                                                       | none (classification unchanged; dagger stays until SR-D closes) | author synthesis records 4.7; no further source needed         |
| CLS-02 | Fixed-sequence (hierarchical) testing | `RES-ONLY`†                          | SRC-27 (b)      | assigned text not in custody; procedure and guarantee read in 43 and 40          | procedure and guarantee supported by supplied originals; attribution and original formulation unsupported                                  | none                                                            | inspect SRC-27 (b) (Section 18) or steward decision D-D-01     |
| CLS-03 | Fallback procedure (Wiens 2003)       | `RES-ONLY`†                          | SRC-27 (c)      | read in full; proof page verified on image                                       | supported; I > 2 proof supplied by investigator; later variants are separate procedures                                                    | none                                                            | author synthesis records 5.6                                   |
| CLS-04 | Serial gatekeeping (1995 lineage)     | `RES-ONLY`†                          | SRC-27          | assigned 1995 text not in custody; serial procedure read in 41 and 40            | procedure and guarantee supported; lineage label unsupported and pointed elsewhere by both supplied 2003/2009 texts                        | none; attribution label is a reopen trigger (S-1)               | inspect SRC-27 (b) or steward decision D-D-01 with relabelling |
| CLS-05 | Parallel gatekeeping (2003)           | `RES-ONLY`†                          | SRC-27 (a)      | read in full; algorithms and tables verified on images and reproduced            | supported for the Bonferroni version; singleton convention ambiguous in the source (S-2); Simes/resampling versions carry extra conditions | none                                                            | author synthesis records 6.7 and decides D-D-02, D-D-04        |
| CLS-06 | Graphical weighted-Bonferroni (2009)  | `RES-ONLY`†                          | SRC-26          | read in full; algorithms, figures and appendix verified on images and reproduced | supported with the narrowing of 7.8 (S-3); [9] dependency replaced by derivation for the used direction                                    | none                                                            | author synthesis records 7.8 and decides D-D-03                |

Every fixed classification, dagger and `NARROW`/`TRANSFER` token is unchanged by this
record.

## 13. Reproductions

`reproduce-sr-d.py` (same directory; Python 3 standard library only; no random
numbers; exact rational arithmetic except the chi-square tails, which use closed forms
for integer degrees of freedom) ran on 2026-09-09 with Python 3 in this session and
printed `all checks passed` with 55 `[ok]` lines and 2 `[info]` lines; exit status 0.
Expected values are transcribed from the printed originals and cited above; the script
does not generate them.

| Group                                           | What is checked                                                                                                                                                                                                                          | Result                                               |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Dmitrienko Table I (p. 2391)                    | all 15 weight rows from Algorithm 1                                                                                                                                                                                                      | match                                                |
| Dmitrienko Table II/III (pp. 2394–2395)         | Bonferroni column for three scenarios (Algorithm 1 convention); Simes column (rescaled or singleton-at-α convention); the printed formula with unrescaled weights and the Table II convention for Bonferroni do not reproduce scenario 1 | match / match / mismatch as recorded in 6.5          |
| Dmitrienko properties                           | p̃_i = p_i/w_i; Condition 2 (≥); Algorithm 2 ordering on a 625-point grid; vacuous Case 2; counterexample to p̃_i = p_i/w_i under the Table II convention                                                                                  | as stated in 6.2–6.5                                 |
| Bretz Figure 2 versus Dmitrienko Algorithm 1    | all 15 intersections, equal and (0.9, 0.1, 0.5, 0.5) weights; k = 3, m = 6 generalization (63 intersections); removal-order independence (all orders, three subsets)                                                                     | match                                                |
| Bretz Figures 4, 5, 9, 10, 12 and Algorithm 2   | rejection sets, updated levels, loop renormalization, ε examples, adjusted p (0.036, 0.04, 0.055); closure equals shortcut for Figure 4                                                                                                  | match; p. 598 printed set corrected to H_1, H_3, H_4 |
| Serial gatekeeping as ε-graph                   | all 15 intersections equal Algorithm 2 weights                                                                                                                                                                                           | match                                                |
| Wiens fallback and fixed sequence               | sequential rule = chain-graph Algorithm 1 = full closure on a 1000-point grid; fixed sequence as (α, 0, 0); exact worst-case FWER for seven true/false configurations ≤ α; efficiency remark 48.8 %/6.8 % versus printed 48 %/6 %        | match; bound holds; illustrative difference recorded |
| Marcus Tables 2 and 3 (p. 659)                  | amalgamated estimates and all ten D²_g statistics                                                                                                                                                                                        | exact match                                          |
| Marcus Table 1 (p. 658) and single-block points | all 64 printed points recomputed from the p. 658 formula; 58 agree within 0.001; six differ as listed in 4.6; single-block points 3.820, 4.528, 5.049, 5.460 reproduced; singleton blocks inert                                          | as recorded in 4.6                                   |
| Marcus proof structure                          | finite set-inclusion check that the intersection of all true hypotheses is implied by each true hypothesis                                                                                                                               | holds                                                |

## 14. Findings

### BLOCKER

None. No inspected text materially contradicts the catalogue treatment of any SR-D
entry; `NO_GO` is not indicated.

### SHOULD-FIX (decisions the author synthesis or steward has to take before any dependent proposal)

- **S-1 — CLS-04 attribution.** The label "Serial gatekeeping (Maurer-Hothorn-Lehmacher
  1995 lineage)" is not supported by any supplied original; the two supplied texts that
  discuss gatekeeping attribute it to Bauer et al. (1998), Westfall and Krishen (2001)
  and Gong et al. (2000), and cite the 1995 chapter only for fixed-sequence tests. Until
  the chapter is read, the lineage is an unverified bibliographic claim and is to be
  carried as such (Section 8), not as a source fact. Reopen trigger, not a new entry.
- **S-2 — CLS-05 variant ambiguity.** Dmitrienko et al. (2003) define the singleton
  gatekeeper intersection tests inconsistently (Algorithm 1/Table I at weight w_i versus
  Table II at level α), and their Simes column follows the rescaled convention while
  their Bonferroni column follows Algorithm 1 (6.5). Error control is unaffected;
  adjusted p-values and, in the Table II convention, rejection sets differ. Any
  dependent proposal that outputs adjusted p-values or rejection sets for parallel
  gatekeeping needs to declare the convention. Variant-split candidate; not a new
  catalogue ID.
- **S-3 — CLS-06 wording.** "Unifying representation" and SRC-26's "gatekeeping
  unification" are supported only as: every graph is a valid consonant
  weighted-Bonferroni closed procedure, and several named procedures are graphs. The
  source itself limits coverage for m ≥ 4 (Remark (iv)) and rests the general subclass
  statement on the uninspected Hommel, Bretz and Maurer (2007). The entry's wording is
  to be narrowed accordingly before it is used as a framework claim.
- **S-4 — CLS-02 evidence basis.** Within the supplied originals the fixed-sequence
  guarantee rests on Wiens's special-case statement (proof written for I = 2 only) plus
  the graph theorem plus investigator derivations. The author synthesis has to record
  that basis explicitly and either keep SRC-27 (b) as a required text or adopt the
  Section 8 alternative by steward decision; neither is done here.

### NICE-TO-HAVE

- N-1. Marcus et al. Table 1: six printed points do not follow the paper's own formula
  (4.6); not used by the catalogue; record for any later oracle use.
- N-2. Bretz et al. p. 598 printed rejection set "H_1, H_2, and H_3" should read
  H_1, H_3, H_4; p. 599 "H_33" should read H_23.
- N-3. Dmitrienko et al. reference 12 misprints Simes (1986) with Marcus et al.'s
  volume and pages; Wiens's two DOI spellings; Marcus et al. p. 659 "taken from
  Table 1" for single-block points that Table 1 does not list.
- N-4. "Greater than" in Dmitrienko et al.'s Condition 2 and Algorithm 2 property is
  "at least"; Wiens's 48 %/6 % efficiency figures recompute to 48.8 %/6.8 %.
- N-5. Zero-level hypotheses make Bretz Algorithm 1's argmin undefined; an
  implementation convention is needed and should be stated wherever the algorithm is
  transcribed.

## 15. Candidate disposition, missing dependencies and reopen conditions

**Candidate disposition for SR-D: `INPUT_INCOMPLETE`** — proposed, not enacted. Reason:
SRC-27 (b) is an assigned, required source (fixed result Sections 2.2 and 17;
acquisition result Section 11) whose text could not be identified in custody or
inspected, and the commission assigns `INPUT_INCOMPLETE` in exactly that case. This is
not a finding against the other five entries: CLS-01, CLS-03, CLS-05 and CLS-06 have
every decision-bearing claim directly supported with pinpoints (with the narrowings of
Sections 4.7, 5.6, 6.7 and 7.8), and CLS-02's and CLS-04's procedures and guarantees
are supported; only the claims naming the 1995 chapter are not.

**Conditional candidates, for steward choice (not enacted).** (a) If the steward adopts
the Section 8 alternative primary basis for CLS-02 and CLS-04 and treats the 1995
attribution as an unverified note, every SR-D claim is directly supported and the
candidate becomes `CLOSED` in the commission's sense (source obstacle removed; no
procedure selected), subject to the S-2 and S-3 narrowings being recorded and to the
usual exact-head independent review of the author result. (b) If the steward keeps
SRC-27 (b) required but accepts that some claims are supported, the candidate is
`PARTIAL` with the named gaps "CLS-02 attribution and original formulation" and "CLS-04
lineage". (c) If the chapter is obtained and read under Section 18, the disposition is
re-derived from its content.

**Missing dependencies (exact).**

- SRC-27 (b): Maurer W, Hothorn L, Lehmacher W (1995), "Multiple comparisons in drug
  clinical trials and preclinical assays: a-priori ordered hypotheses", in _Biometrie in
  der chemisch-pharmazeutischen Industrie_, Vollmar J (ed.), Fischer Verlag, Stuttgart,
  pp. 3–18 (identity from Bretz et al. reference 2; German-language edited volume per
  X-5). Needed for the attribution claims of CLS-02 and CLS-04 only.
- Not assigned, cited by the supplied originals for results relied on: Hommel, Bretz and
  Maurer (2007) (shortcut theorem — replaced by the 7.2 derivation for the used
  direction; still needed for any necessity or general-subclass claim); Westfall and
  Krishen (2001) (serial gatekeeping origin per Dmitrienko et al.); Wiens and
  Dmitrienko (2005) (improved fallback); Sarkar (1998) and the unpublished Kling and
  Benjamini (2002) manuscript (Simes-based gatekeeping); Strassburger and Bretz (2008)
  and Guilbaud (2008) (compatible confidence bounds). None is added to the commission by
  this record.

**Exact reopen conditions.**

- R-D1. SRC-27 (b) becomes inspectable → execute Section 18; re-derive CLS-02 and
  CLS-04 attribution rows and this disposition.
- R-D2. A dependent proposal uses Simes-based or resampling-based intersection tests in
  any gatekeeping or graph procedure → separate source work on the dependence and
  normality conditions (F-D-08) before the guarantee is claimed.
- R-D3. A dependent proposal outputs adjusted p-values or rejection sets for parallel
  gatekeeping → declare the singleton convention (S-2); the two conventions are distinct
  variants.
- R-D4. A dependent proposal claims that every Bonferroni closed test or every
  gatekeeping procedure is graph-representable, or relies on the necessity direction of
  the monotonicity condition → inspect Hommel, Bretz and Maurer (2007).
- R-D5. A dependent proposal reports simultaneous confidence bounds from a graph
  procedure → inspect Strassburger and Bretz (2008) and Guilbaud (2008); one-sided only
  in the source.
- R-D6. A dependent proposal uses an improved or modified fallback, the ε-improved
  gatekeeping graph, or a multi-family gatekeeping rule → these are different procedures
  from CLS-03/CLS-05 and need their own texts (Section 9.2).
- R-D7. A dependent proposal cites Marcus et al. Table 1 for a four- or five-block
  partition or for (2, 3, 4) at 5 % → recompute from the p. 658 formula (N-1).
- R-D8. A dependent proposal makes directional (two-sided sign) claims under closed
  testing → F-D-03 applies; separate evidence required.
- R-D9. X-8 (identity of SRC-28's "Marcus (1976)") is resolved in SR-J → nothing changes
  for SR-D; recorded only to keep the question separate.
- R-D10. An implementation of Bretz Algorithm 1 or 2 → define the zero-level and tie
  conventions (N-5) and record them; they are not source content.

**Preserved unchanged.** Ledger 7 `CLOSED` / 1 `PARTIAL` / 6 `INPUT_INCOMPLETE`; overall
`INPUT_INCOMPLETE`; `SOURCE_SET_READY=false`; `NARROW`; `TRANSFER`; every `R3-CAND`† and
`RES-ONLY`† token; the SR-I acceptance of Part S; the SR-H `PARTIAL`; all historical
`PENDING` statements; the separate R4 state; custody of 42 numbered originals plus one
corrigendum.

## 16. Validation record and unverified scope

Commands run on the investigation branch with the two added files staged (outputs as
printed by the tools):

- `pnpm install --frozen-lockfile`: exit 0 (dependencies from the pinned lockfile; the
  clone had no `node_modules`).
- `pnpm format:check` (after `pnpm prettier --write` on this file): "Checking
  formatting... All matched files use Prettier code style!"; exit 0.
- `pnpm lint:markdown`: "Linting: 356 files … Summary: 0 issues in 0 files"; exit 0. A
  first run reported one MD018 issue in this file caused by a wrapped line beginning
  with a pull-request number; the sentence was reworded and the lint re-run.
- `node --import tsx tooling/src/validate.ts`: "validate: OK - registries, traceability,
  normative lint, authority, gates, conformance manifest, links, private-dependency and
  language audits, phase-1 schemas, cross-checks, code-path audits, and the snapshot
  manifest mechanism are clean."; exit 0.
- `git diff --cached --check`: no output; exit 0.
- `python3 review-inputs/r3-srd-primary-investigation/reproduce-sr-d.py`: "all checks
  passed"; 55 `[ok]` lines, 2 `[info]` lines; exit 0.
- Base branch re-check immediately before committing:
  `git ls-remote origin refs/heads/research/r3-sri-acceptance-20260909` → `1c013a6b…`
  (unchanged; the base has not moved).

Not run: full `pnpm check`, `pnpm test`, `pnpm typecheck`, `pnpm check:generated`, the
Phase 1 suite. No authoritative artifact, registry, schema, fixture, reference code,
generated file or Release 2 material is touched, so those suites are outside this
change's scope; their omission is disclosed, not excused.

Unverified scope: everything listed in 3.3; the contents of every uninspected text named
in 3.3, 8 and 15; the identity of the 1995 chapter beyond the citation seen in Bretz et
al.; whether any erratum exists for the printed doubts in 4.6, 5.5, 6.6 and 7.6.

## 17. Public-artifact self-check

- English throughout; role-based attribution only; the drafting model and execution
  context are disclosed in Section 2 as required provenance, not as decoration.
- No PDF, page image, or full-text extraction is committed; quotations are short and
  attributed by printed page.
- No private repository, path, dependency or product implementation is referenced.
- No normative keyword is introduced; no Requirement ID, identifier, schema, fixture,
  registry, generated file or authoritative artifact is touched.
- No hold is accepted or closed, no ledger count is changed, no method is adopted, no
  discussion is opened, nothing is merged or released.
- The two added files are the only change; the fixed result, both commissions and every
  preserved review are byte-identical to the fixed starting commit.

## 18. Additional-investigation prompt (remaining source) and author-synthesis handoff

### 18.1 Executable prompt for the remaining SR-D reading (SRC-27 (b))

```text
Role: separate-context primary-source investigator completing the SR-D source reading in
licklider-ai/nomue-protocol. Disclose prior SR-D involvement and model/context basis.

Fixed inputs: starting commit 1c013a6bc07f7d066fa43c692abe2be91241b384 (tree
0f8b6baa728099dc21880016fbace8c44166e088, sole parent
3a8bc0d86718a2cf47ce12089a9030a02e41a297); result blob
34ee7f83368462a4782d86eff02b72cf5c18a0a0 at
governance/drafts/release-3-preparation/semantic-source-acquisition-result.md; commission
blob 3c7ddcc696f0c284213f7efe0da68e747bc238d7; semantic input
7bd9c5ab854777c3e99e624d9d2ed62731228852 / blob 8f21526040924b891f64724c2d0fde9ea94eff92;
and this investigation record at review-inputs/r3-srd-primary-investigation/ on branch
review/r3-srd-primary-investigation-20260909 (verify its commit, tree and blob identities
from the draft pull request). Read AGENTS.md and its ordered Read first documents.

Required supplied file: Maurer W, Hothorn L, Lehmacher W (1995), "Multiple comparisons in
drug clinical trials and preclinical assays: a-priori ordered hypotheses", in Biometrie in
der chemisch-pharmazeutischen Industrie, Vollmar J (ed.), Fischer Verlag, Stuttgart,
pp. 3-18 (German-language; SRC-27 (b); no supplier number yet). Record bytes, page count,
SHA-256, printed-to-PDF page mapping and language. If the file cannot be lawfully
supplied, stop after recording the access outcome and do not substitute another text.

Scope, exactly: (1) the fixed-sequence (a-priori ordered) procedure as the chapter states
it - order source, level per hypothesis, stopping rule, one-sided/two-sided treatment, any
continuation or partial-alpha variant, and whether the chapter proves strong familywise
control or cites it; (2) whether the chapter defines a serial gatekeeping (family-level)
procedure at all, and if so its exact rule; (3) any statement that conflicts with Wiens
(2003) Section 2.2, Dmitrienko et al. (2003) Section 2, or Bretz et al. (2009) Section 2.3
as recorded in Sections 5-7 of the investigation record. Do not read or summarize other
chapters of the volume. Do not reopen CLS-01, CLS-03, CLS-05 or CLS-06.

Output: an English supplement at
review-inputs/r3-srd-primary-investigation/SUPPLEMENT-SRC-27B.md on a fresh neutral
branch from the investigation commit as sole parent, containing exact identities, access
log, claim-to-source rows for CLS-02 and CLS-04 attribution and formulation, a statement
of whether the Section 8 partition of the investigation record changes, any variant
differences as reopen triggers, actual checks (format:check, lint:markdown, the direct
validator, git diff --check) and a candidate SR-D disposition with reasons. Open a separate
draft pull request against research/r3-sri-acceptance-20260909. Do not modify existing
results or reviews, commit the PDF or extracts, merge, accept a hold, adopt a method, open
discussion or release. Completion condition: every row for CLS-02 and CLS-04 in Section 8
of the investigation record has a pinpoint or a documented "not in this text". Stopping
condition: the chapter is unavailable, or the two entries' rows are complete.
```

### 18.2 Author-synthesis handoff for the accessible partitions

The author result for SR-D can be written now for CLS-01, CLS-03, CLS-05 and CLS-06 and
for the procedure-and-guarantee components of CLS-02 and CLS-04 from Sections 4–7 and
11–12 of this record, reusing `reproduce-sr-d.py` explicitly rather than re-deriving.
It needs to (i) record the narrowings of 4.7, 5.6, 6.7 and 7.8; (ii) put S-1 through
S-4 to the steward as decisions D-D-01 through D-D-05, in particular the Section 8
choice; (iii) keep the candidate disposition `INPUT_INCOMPLETE` unless the steward makes
the Section 8 decision or the Section 18.1 reading completes; (iv) preserve 7/1/6,
overall `INPUT_INCOMPLETE`, `SOURCE_SET_READY=false`, `NARROW`, the SR-I acceptance and
all other holds and R4; and (v) commission the exact-head independent review of that
author result with the four supplier hashes of 3.1 attached. No further research
requirement is invented by this record.
