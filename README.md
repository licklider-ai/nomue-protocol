# nomue Protocol

This repository contains the **nomue Protocol**, the Layer 1 public specification
system for nomue Records. A nomue Record is a machine-readable evidence object that
binds scientific-analysis declarations, analytical decisions, inputs, results, and
other finalized evidence so that covered properties can be checked independently.

The **nomue Record Specification (NRS)** is the Protocol sub-specification that owns
Record structure and Record-level semantics. Other Protocol authority covers
canonicalization, verification, versioning, Profiles, Contracts, conformance, and
related public infrastructure.

nomue is developed by Licklider. The initial domain is the life sciences.

## Release 1 Public Draft scope

Release 1 is the first experimental Public Draft. This document intentionally does
not duplicate mutable release status: candidate pinning, gate state, and final
publication state are recorded in release-control artifacts and published release
metadata rather than frozen into this public-facing overview.

The **sole Record interpretation support target declared for Release 1** is:

```text
urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1
```

That exact bundle remains `EXPERIMENTAL` because Release 1 is a Public Draft, and is
marked `public_release: true` to identify it as the Release 1 public support target.
The flag is a candidate-content support declaration, not evidence that publication or
gate closure has already happened. The 0.2.1 bundle is the numerical-contract-hardened
successor of the ITGC guarantee slice and supports only the registered independent
two-group continuous Welch path. It binds:

- explicit ITGC Profile admissibility declarations and a separate computability
  check;
- the two-sided Welch two-sample t procedure only;
- the unstandardized arithmetic mean difference, Welch standard error, and two-sided
  95% Welch-Satterthwaite confidence interval;
- local/offline Record conformance, integrity, and numerical recomputation under the
  exact registered check versions;
- exact bundle dispatch and versioned refusal/report behavior.

The older registered `0.1` minimal bundle and `0.2.0` guarantee bundle remain immutable
historical/development interpretation surfaces. They are not Release 1 public support
targets and are never treated as aliases or fallbacks for `0.2.1`.

Paired t, Wilcoxon signed-rank, Mann-Whitney, and other successor statistical
capabilities are intentionally outside Release 1 public support even where private
research or informative design work exists. Private research material is not part of
the public Protocol repository or Release 1 candidate boundary.

Every currently registered bundle declares `attestation_support: none`; Release 1
therefore includes no production `nomue-attested` claim or production attestation
identity. Experimental approval/attestation specification material can exist in the
repository without becoming supported by the Release 1 bundle.

The public support declaration above does **not** establish release readiness or
close any Release 1 gate. Candidate selection, gate review, release signing, and the
final release decision are governed by
[authority/release-1-gates.yaml](authority/release-1-gates.yaml),
[evidence/release-1/gate-index.json](evidence/release-1/gate-index.json), and
[governance/RELEASE-POLICY.md](governance/RELEASE-POLICY.md).

## What the Protocol does and does not guarantee

The Protocol aims to make specific, scoped properties of a Record checkable by
independent, offline verification. It does **not** guarantee:

- the overall correctness of a research project;
- the truth of scientific conclusions;
- the truthfulness of input data or researcher declarations;
- causal claims;
- publication acceptance;
- complete regulatory compliance;
- the validity of arbitrary statistical methods; or
- scientific validity outside an explicitly supported, scoped procedure.

A conforming verifier never emits a single overall "VERIFIED" status. Every
verification result is bound to an explicit scope, and scientific validity outside a
supported procedure is represented as _not asserted_. See
[spec/core/verification-principles.md](spec/core/verification-principles.md).

## Where authority lives

Authority in this repository is assigned per target, not to a single document. The
entry points are:

| Document                                                                         | Role                                      |
| -------------------------------------------------------------------------------- | ----------------------------------------- |
| [CHARTER.md](CHARTER.md)                                                         | Mission, scope, non-goals, non-claims     |
| [AUTHORITY.md](AUTHORITY.md)                                                     | Authority model and conflict policy       |
| [authority/authority-manifest.yaml](authority/authority-manifest.yaml)           | Machine-readable authority classification |
| [authority/release-1-gates.yaml](authority/release-1-gates.yaml)                 | Release 1 gate registry (R1-01 to R1-14)  |
| [registries/requirements.yaml](registries/requirements.yaml)                     | Requirement ID registry                   |
| [registries/interpretation-bundles.yaml](registries/interpretation-bundles.yaml) | Exact supported version combinations      |
| [spec/](spec/README.md)                                                          | Normative specification documents         |
| [governance/](governance/RELEASE-POLICY.md)                                      | Governance, release policy, ADRs          |

Everything under [generated/](generated/README.md) is **generated and
non-authoritative**. Do not edit generated files by hand; regenerate them with
`pnpm generate`.

## Layer boundary

This repository is Layer 1 only. It defines the public semantics of finalized Records
and the public machinery needed to interpret and verify them. It does not define agent
session state, interactive clarification protocols, MCP transport, user-interface
behavior, or product workflow orchestration, and it has no normative or operational
dependency on any private product or research repository. See
[spec/core/layer-boundary.md](spec/core/layer-boundary.md).

## Development

Requirements: Node.js >= 20 and pnpm.

```bash
git clone https://github.com/licklider-ai/nomue-protocol.git
cd nomue-protocol
corepack enable
pnpm install
```

## Quick start

Verify the canonical Release 1 example with the bundled non-normative reference
verifier:

```bash
pnpm nomue-record verify examples/canonical-case-release1-wetlab-01/record.json
```

Exit code `0` means the verifier produced a report whose completed checks passed;
it is not a claim of overall scientific correctness. Consumers must inspect each
scoped result and the guarantee boundary in the report.

For a separately packaged verifier pinned to a Protocol source commit, see the
[nomue verifier repository](https://github.com/licklider-ai/nomue-verifier). The
reference implementation in this repository remains non-normative.

| Command                                  | Purpose                                                                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `pnpm check`                             | Run the full verification suite (format, lint, typecheck, validate, test, generated diff, Phase 1 + 2A suites)         |
| `pnpm check:phase1`                      | Phase 1 suite: schema compilation, canonicalization vectors, conformance fixtures, example verification, evidence diff |
| `pnpm check:phase2a`                     | Phase 2A suite: Phase 1 regression, guarantee fixtures, example, refusal tests, oracle comparison, evidence diff       |
| `pnpm validate`                          | Registries, traceability, normative language, authority manifest, links, private-dependency and code-path audits       |
| `pnpm generate`                          | Regenerate `generated/` views and TypeScript bindings                                                                  |
| `pnpm check:generated`                   | Fail on drift in any generated artifact                                                                                |
| `pnpm nomue-record verify <record.json>` | Verify a Record with the reference verifier                                                                            |
| `pnpm test`                              | Run the test suite                                                                                                     |
| `pnpm typecheck`                         | Typecheck the tooling and reference implementation                                                                     |
| `pnpm format` / `pnpm format:check`      | Prettier write / check                                                                                                 |
| `pnpm lint:markdown`                     | Markdown lint                                                                                                          |

## License

The adopted Release 1 legal terms are in [LICENSE.md](LICENSE.md): Protocol Prose is
licensed under CC BY 4.0, software and machine-readable materials under Apache-2.0,
and Licklider separately provides the Essential-Claims-limited Protocol Patent Grant
defined there. External normative contributions are not accepted without a separate
written Contributor Agreement already in effect for that contribution.

The governance rationale and adoption record are in
[governance/LICENSING-PLAN.md](governance/LICENSING-PLAN.md). Current R1-12 gate
state is recorded only in the Release 1 gate registry and gate index; this overview
does not duplicate mutable legal-gate bookkeeping.

## Security

Report suspected vulnerabilities privately as described in
[SECURITY.md](SECURITY.md). Do not disclose a suspected vulnerability in a public
issue before maintainers have had an opportunity to triage it.
