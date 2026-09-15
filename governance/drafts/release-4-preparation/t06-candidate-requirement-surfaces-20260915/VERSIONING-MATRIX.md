# Candidate versioning matrix

Status: **UNISSUED CANDIDATE**. This is future change management, not issuance.

Requirement IDs have no mutable per-ID version. In the column requested as
"Requirement version?", a meaning-breaking issued clause requires a new ID plus
supersedes/superseded_by links; editorial equivalent wording retains its ID. Before
issuance these candidates can be revised transparently without pretending they were
already allocated. Each Public Check ID includes its exact revision. A bundle pins
the exact check, schema, Contract, Profile and canonicalization combination.

| Change                               | Requirement version?                                                 | Public Check version?                                 | Bundle implication?                                                  | Reference-profile only?                                    |
| ------------------------------------ | -------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| Scientific model                     | New affected Contract/Profile ID if meaning changes                  | Yes, affected admissibility/recompute                 | New Contract/Profile/check bindings; successor bundle                | No                                                         |
| Mandatory quantity set               | New affected PROFILE-BTF-0003 / VERIFY-0029 meaning IDs              | Yes, conformance/recompute as affected                | Schema and bundle successors as affected                             | No                                                         |
| J-cost predicate                     | New affected VERIFY-0030 meaning ID                                  | Yes, computability/recompute as affected              | Successor bundle                                                     | No                                                         |
| B                                    | New affected VERIFY-0030 meaning ID when domain changes              | Yes                                                   | Successor bundle                                                     | No                                                         |
| S-C decision procedure               | New affected VERIFY-0030 meaning ID when observable semantics change | Yes for decision capability or membership changes     | Successor bundle; reassess coupled cost                              | No                                                         |
| Z-B                                  | New affected VERIFY-0030 meaning ID                                  | Yes                                                   | Successor bundle                                                     | No                                                         |
| Projection semantics                 | New affected numerical/representation meaning ID                     | Yes                                                   | Successor bundle; schema if shape changes                            | No                                                         |
| Aggregation                          | New affected VERIFY-0031 meaning ID                                  | Yes for check outcome change                          | Successor bundle/report/CLI impact as applicable                     | No                                                         |
| Reference CPU/wall/memory/output cap | No public numerical Requirement change if decisions unchanged        | Not automatically                                     | No automatic numerical bundle change; assess public interface impact | Yes, profile revision and security/evidence change control |
| Host validation expansion            | No if public meanings unchanged                                      | Not automatically                                     | No automatic numerical bundle change                                 | Yes, qualified new evidence; no whole-domain inference     |
| Equivalent implementation technique  | No if meaning identical                                              | No if all same-version observable decisions preserved | No identity reinterpretation                                         | Implementation/evidence only                               |
| Report/refusal/CLI wire change       | New affected interface ID if issued meaning breaks                   | Assess affected procedure behavior                    | Schema/interface version and bundle impact separately                | Not necessarily                                            |

Version dependencies flow from issued clause meanings and schemas to check bindings,
then into the bundle. Runtime support consumes that bundle; it does not define its
meaning. Cross-links documenting the bundle selected by a check are not authority
cycles. Altered S-C parameters cannot assume unchanged J-cost membership: the two
are coupled. Stronger private calculations cannot upgrade a prescribed indeterminate
under the same version. Reference profile labels cannot hide public semantic changes.

Requirement updates, registry grammar, schema fixtures and reason applicability remain
future coupled candidate/issuance work. Public discussion impact is assessed under
existing RFC highest-tier and release policy for the actual delta; no unadopted rule
that automatically resets a discussion clock is assumed.
