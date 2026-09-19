# Repair validation and self-review

Date: 2026-09-19 UTC. This is contributor self-review, not independent clearance.
Local environment: Linux x64, Node 24.19.0, Python 3.12.14, pinned pnpm lockfile.

The source-generation test baseline and all 16 mutations pass. The historical
checker retains its original bytes and rejects corruption in both source and
archive inputs. The guard for instructions is unchanged. Current execution and
historical archive validation are separate checks; neither substitutes for the
other.

## Local results

| Check                          | Result                                                                                        |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| Existing instruction-pin tests | 4/4 pass; no pin or guard change                                                              |
| Adoption-map replay            | 16 proposed requirements, 531 properties, 424 pins, six rejected mutations                    |
| Candidate suites               | 82 envelope controls, 134 legacy fixtures, 93 public controls, 38 checkpoint controls         |
| Repair, identity, source audit | Pass; five identity mutations and four source violations rejected                             |
| Generation checks              | 17/17 tests pass (baseline plus 16 mutations)                                                 |
| Historical archives            | Three original archives / ten member mappings plus the follow-up integration archive verified |
| Full check leaf commands       | 20/20 pass, including 55 Vitest files / 525 tests                                             |

[LOCAL-CHECKS.json](LOCAL-CHECKS.json) records every package-defined leaf command
and the executed launcher. The ordinary `pnpm check` invocation stopped at the
`tsx` CLI's IPC socket creation (`listen EPERM`). Only that launcher was replaced
with `node --import tsx` for local verification. The complete set of 20 checks
passed before push; no check or assertion was omitted and package.json remained
unchanged. Hosted CI must additionally confirm the unchanged ordinary invocation.

Fresh candidate observations and the generation-check result are retained under
`current/`; files ending in `.json.txt` preserve their observed bytes. They are
local author-side observations, not hosted or independent-review receipts.

## Self-review dispositions

- Checked the extra transitive pin and the workflow's own historical pin. Both
  are explicitly bound to preserved bytes before reconstruction. Changing a
  preserved input and merely updating its transition hash is rejected against
  the original archive's source identity.
- Checked that a changed current snapshot cannot be accepted just by repinning
  the transition: its inventory binding is still required. The existing map
  replay checks the full current 424-file source inventory.
- Added exact transition/control membership checks so omission cannot silently
  remove a required check. The mutation suite exercises these failure paths.
- Verified unchanged code in the original checker, instruction guard, old review
  receipts and archives. The checker is executed, not reimplemented, and its
  assertions cannot be disabled through `PYTHONOPTIMIZE` because it runs with
  `python -I`.
- Checked all outgoing changes against the A/B authorization. No public
  semantics, schema, tolerance, registry identifier, supported dispatch,
  Release 1 gate, signature, SOURCE-PIN or erratum content changes.

No unresolved implementation defect was found in this self-review. Hosted
ordinary full-suite and cgroup results are pending at this commit; no green main
is claimed in this local record. The PR and its exact-head Actions runs carry
the subsequent integration status. This repair does not need a new statistical
primary-source investigation and does not grant any Research Gate clearance.

The original work-order proposal remains a historical investigation. This repair
implements only its subsequently approved A/B scope. C and D are not adopted.
