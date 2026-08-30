# Repository Contribution Instructions - nomue Record Repository

These instructions apply to every contributor and repository process working in
this repository.

## Read first, in this order

1. [CHARTER.md](CHARTER.md) - mission, scope, non-claims
2. [AUTHORITY.md](AUTHORITY.md) - where authority lives, conflict policy
3. [authority/authority-manifest.yaml](authority/authority-manifest.yaml)
4. [registries/requirements.yaml](registries/requirements.yaml)
5. [governance/ID-POLICY.md](governance/ID-POLICY.md)
6. [governance/RFC.md](governance/RFC.md) - change process and research gate
7. The directory-local `AGENTS.md` of whatever directory you are editing
   (`spec/`, `conformance/`, `reference/`)

## Hard rules

- All public artifacts (documents, registries, schemas, code, commit messages)
  are written in English.
- New or materially revised public artifacts use neutral, professional,
  role-based language. This includes filenames, titles, research and review
  commissions, reports, provenance notes, examples, branch names, commit
  messages, and pull-request text. They do not identify or imply the software,
  service, provider, or mechanism used to draft, review, or operate on them.
  They also do not make a false claim of human authorship. When provenance is
  needed, record the contributor role, review scope, independence boundary,
  inspected sources, date, and immutable commit or content hash.
- Any branch that may be pushed to a public remote uses a neutral,
  task-oriented name. Name it after the research topic, review scope,
  governance task, repair, or optional date; never include the identity of the
  software, service, provider, or mechanism used to create or review it.
- Never read, copy from, link to, or depend on private product repositories.
  No private paths, private package dependencies, submodules, subtrees, or
  symlinks outside this repository. The private-dependency audit enforces this.
- Never introduce identifiers from other authority systems and never introduce
  a parallel authority scheme here.
- Never hand-edit files under `generated/` or `bindings/typescript/generated/`.
  Regenerate them with `pnpm generate`.
- Never add a normative keyword (MUST, MUST NOT, SHOULD, SHOULD NOT, MAY) to a
  specification document without binding the clause to exactly one registered
  Requirement ID anchor. The normative lint enforces this.
- Every normative change updates
  [registries/requirements.yaml](registries/requirements.yaml) in the same
  change set. Adding a normative field requires a Requirement ID.
- Before freezing a design or merging implementation behavior that materially
  depends on external methodology, standards, empirical evidence, or community
  consensus, apply the research gate in [governance/RFC.md](governance/RFC.md).
  Disposable exploratory spikes use the RFC carve-out until promoted. Statistical
  and numerical methodology being promoted into design or implementation requires
  an independent primary-source review by a separate investigator first; memory or
  a second pass in the authoring context is not enough.
- A public-surface change records its schema-version impact in
  [registries/public-contract-surfaces.yaml](registries/public-contract-surfaces.yaml);
  breaking changes require a new schema version, and silent reinterpretation
  is prohibited.
- A schema change ships with positive and negative conformance fixtures
  covering it.
- A public-check behavior or tolerance change is a check-version change with a
  recorded rationale and test vectors. Tolerances live only in
  [registries/public-checks.yaml](registries/public-checks.yaml) - never in a
  Record.
- Expected test values are never generated from the reference implementation
  alone; numeric expectations are cross-checked against independent oracles,
  and the reference stats kernel is never normative authority.
- Never emit, define, or imply a single overall "VERIFIED" status for a
  Record; scientific validity stays `not_asserted` outside supported scoped
  procedures.
- An unsupported interpretation bundle fails closed; never guess
  compatibility with a nearby version.
- The verifier never executes Record-supplied code and never implicitly
  dereferences URIs; the code-path audits enforce this.
- Do not add fields for capabilities outside the current phase (attestation,
  approvals, figures/methods/results binding and protected facts (Phase 2B),
  standardized effect sizes, significance booleans, missingness policies,
  extensions, ...). Unresolved questions go into a release gate or an
  explicitly informative reserved section - never into a normative clause as
  a TODO.
- A verifier supporting several bundles dispatches by exact bundle
  identifier only; Phase 1 pinned results are preserved, and any legitimate
  correction records rationale, old value, and new value in a decision
  record.
- Verifier input must be JCS-eligible before anything interprets it:
  duplicate object member names and unpaired-surrogate strings are rejected
  on the raw text before routing, canonicalization, or digest computation
  (NRS-CANON-0007/0008). Never introduce first-wins or last-wins parsing,
  Unicode normalization, or a code path that parses raw verifier input
  outside `parseStrictJson`; the strict-json input audit enforces this.
- Tolerances, the supported confidence level, and the supported estimand are
  owned by check versions - never by Records.
- Phase 2A fixture expectations live in
  [conformance/expectations/phase-2a-expectations.yaml](conformance/expectations/phase-2a-expectations.yaml),
  hand-authored before verifier execution; the authoring script asserts them
  and never overwrites that file.
- Do not change a Release 1 gate state or decision except through an explicit
  steward release-gate decision recorded under the Release Policy. Do not create
  a public release or release tag unless all applicable gates are validly closed
  against the pinned Release Candidate.
- Once a Release 1 candidate-freeze manifest and release-control pin exist,
  candidate-frozen files do not change. Until publication, only
  `authority/release-1-gates.yaml`, `evidence/release-1/**`, and
  `generated/RELEASE-1-GATES.md` may evolve, and gate-registry edits are limited
  to release-state bookkeeping (`updated`, `state`, `decision`, `notes`). Any
  other content or gate-definition change requires a new candidate freeze and
  invalidates dependent evidence. Run
  `pnpm snapshot:manifest --check-candidate` before gate review continues and
  again before release.

## Commands

| Command                                                    | Purpose                                                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `pnpm install`                                             | Install pinned dependencies                                                                                  |
| `pnpm check`                                               | Full suite: format, markdown lint, typecheck, validate, tests, generated diff, Phase 1 suite                 |
| `pnpm check:phase1`                                        | Schema compilation, canonicalization vectors, conformance fixtures, example verification, evidence diff      |
| `pnpm validate`                                            | Registries, traceability, normative lint, authority manifest, links, private-dependency and code-path audits |
| `pnpm generate`                                            | Regenerate `generated/` views and TypeScript bindings                                                        |
| `pnpm check:generated`                                     | Fail on drift in any generated artifact                                                                      |
| `pnpm nomue-record verify <record.json>`                   | Run the reference verifier                                                                                   |
| `pnpm conformance:test` / `pnpm canonicalization:test`     | Run fixture / vector suites individually                                                                     |
| `pnpm evidence:phase1`                                     | Regenerate the deterministic Phase 1 development evidence                                                    |
| `pnpm snapshot:manifest [--hash-only\|--check]`            | Print the content-addressed snapshot manifest/hash of all authoritative files, or sanity-check the mechanism |
| `pnpm test` / `pnpm typecheck`                             | Tests / TypeScript                                                                                           |
| `pnpm format` / `pnpm format:check` / `pnpm lint:markdown` | Formatting and markdown lint                                                                                 |

Additional Release 1 commands:

- `pnpm snapshot:manifest --candidate-freeze` emits the frozen candidate
  inventory from the current candidate content commit.
- `pnpm snapshot:manifest --check-candidate` proves that current frozen content
  and gate definitions still match the stored candidate freeze.

`pnpm check` must be green before any commit that touches authoritative
artifacts.
