# Steward Review Record: Release 1 Pre-Candidate Final Content Review (2026-08-20)

**Status:** evidence record; pre-candidate review only  
**Review target:** current `main` plus draft PR #28 (`agent/release1-candidate-finalization`)  
**Founder legal-review communication:** recorded separately under `evidence/release-1/gates/R1-12/founder-legal-approval.md`

## Verdict

### FEATURE / STATISTICAL SCOPE CONFIRMED — CANDIDATE CONTENT NOT YET FREEZE-READY

No additional analytical capability is required for Release 1. The final intended support surface remains the exact 0.2.1 ITGC Welch bundle and the existing non-claims / no-production-attestation boundary.

Candidate freeze is blocked only by pre-candidate content-completion work listed below. None of these items requires reopening the statistical scope decision.

## Scope confirmed

The sole intended Release 1 public support target remains:

```text
urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1
```

Confirmed boundaries:

- status remains `EXPERIMENTAL` for the Public Draft;
- 0.1 and 0.2.0 remain historical/development surfaces, not Release 1 public support targets;
- exact bundle dispatch remains required; no default, alias, or version-proximity fallback;
- independent two-group continuous / two-sided Welch only;
- paired t, signed-rank, Mann-Whitney, and other successor methods remain outside Release 1 support;
- production attestation remains unsupported (`attestation_support: none`);
- no `nomue-attested` production claim is introduced;
- private research remains outside the public Protocol candidate boundary.

The public `nomue-verifier` is already aligned at package version `0.2.1-rc.0` to the same planned bundle and explicitly marks its Protocol pin as pre-candidate. Its final exact re-pin to candidate C is intentionally post-candidate-selection work.

## R1-12 legal review disposition

The Founder/CEO reported the Release 1 legal check as **OK / PASS** on 2026-08-20 and approved recording that disposition.

That approval is now preserved as evidence. However, the authoritative R1-12 definition also requires the adopted legal instruments themselves. At review time the repository still contains only `governance/LICENSING-PLAN.md`, whose own status says it is a plan and not a grant.

Therefore the legal-review outcome is accepted as PASS, but the candidate is not freeze-ready until the adopted legal materials are present or stably referenced in the repository.

## Required repairs before candidate C can be selected

### P0-1 — Adopt the actual legal instruments

The Release 1 repository/publication package must contain or stably reference the approved:

1. specification license;
2. verifier/code license;
3. patent implementation / non-assert or royalty-free terms;
4. contribution terms.

The Founder legal-review record supplies the approval evidence; it does not substitute for these instruments.

### P0-2 — Remove pre-adoption licensing language from the frozen public surface

After the instruments are added, update every current-state source that still says licensing is pending or points to the planning document as the operative license source. At minimum review and update:

- `CHARTER.md` (`Open specification` licensing sentence);
- `README.md` candidate License section;
- `package.json` `license` field;
- `governance/CONTRIBUTING.md`;
- `governance/LICENSING-PLAN.md` (retire/replace/update so it no longer asserts `plan, not a grant` as current state);
- `authority/authority-manifest.yaml` governance-process assignments and artifact classifications;
- `governance/NAME-USAGE-POLICY.md` references to the licensing plan;
- R1-12 current-state notes / pre-publication checklist as appropriate;
- generated authority/gate views after source changes.

Do not freeze a candidate containing both adopted legal terms and authoritative prose saying those terms are still unadopted.

### P0-3 — Update PR #28 onto the actual final main state and revalidate

PR #28 is the correct technical promotion delta (`public_release: true` only for 0.2.1), but at review time its branch is behind `main` by two commits: the candidate internal-evidence runner and the preregistered Release 1 canonical case.

After the legal-adoption batch is merged, update/rebase the candidate-finalization branch onto that new `main`, regenerate all derived artifacts, and require a fresh green `pnpm check` / public-boundary validation on the combined tree. The older green CI run on the pre-legal, pre-latest-main branch is not sufficient evidence for candidate C.

### P1-1 — Remove branch-dependent wording before freeze

`spec/consuming-layer-1.md` currently says `This branch prepares the exact 0.2.1 public support declaration.` That becomes false or misleading once merged to `main`. Replace with repository/candidate-state wording and refresh/remove the dated `2026-08-19` status heading.

### P1-2 — Repair stale attestation wording in `governance/NAME-USAGE-POLICY.md`

The informative draft currently says `No attestation format exists yet`. That is stale: an EXPERIMENTAL normative attestation contract now exists. The correct Release 1 boundary is that no registered Release 1 bundle supports attestation and the trust-root registry has no production key, so production `nomue-attested` output is not supported.

This is informative rather than normative, but it is still public prose and should not ship with a known false current-state statement.

## Checks that passed this review

- No Release 1 statistical-method expansion is needed.
- PR #28 promotes only the exact 0.2.1 bundle and leaves older bundles non-public.
- `attestation_support: none` remains intact.
- The candidate wording distinguishes candidate support declaration from actual publication.
- Public verifier packaging is already aligned to the same 0.2.1 target and preserves pre-candidate / pre-release qualifiers.
- No additional open PR introduces a competing Release 1 candidate-content delta; PR #28 is the only open PR at review time.

## Candidate selection rule

Do not select candidate content commit C until all P0 items above are complete and the combined final tree is green. P1 wording repairs should be completed in the same pre-freeze batch so the Public Draft does not publish known stale statements.

Once complete, the next operation is candidate freeze/pin under `governance/RELEASE-POLICY.md`; fresh gate evidence is then generated against that exact C.
