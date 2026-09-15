# Requirement and surface binding

Status: **UNISSUED CANDIDATE**. Each clause is bound to every surface it constrains.
Repeated clause rows represent different surfaces, not duplicate authority anchors.
The executable transcription is CANDIDATE.json; no implementation is created here.

## Primary responsibility matrix

| Requirement clause    | Public surface | Validation responsibility                                                 | Downstream task | Status             |
| --------------------- | -------------- | ------------------------------------------------------------------------- | --------------- | ------------------ |
| NRS-CONTRACT-BTF-0001 | input          | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-CONTRACT-BTF-0002 | input          | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-CONTRACT-BTF-0002 | declarations   | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-CONTRACT-BTF-0003 | input          | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-CONTRACT-BTF-0003 | admissibility  | Evaluate the frozen scoped procedure; return typed results                | T08             | UNISSUED CANDIDATE |
| NRS-CONTRACT-BTF-0004 | input          | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-CONTRACT-BTF-0004 | admissibility  | Evaluate the frozen scoped procedure; return typed results                | T08             | UNISSUED CANDIDATE |
| NRS-CONTRACT-BTF-0004 | guarantee      | Represent and deliver scoped results without changing numerical judgments | T09             | UNISSUED CANDIDATE |
| NRS-CONTRACT-BTF-0005 | declarations   | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-CONTRACT-BTF-0005 | comparison     | Evaluate the frozen scoped procedure; return typed results                | T08             | UNISSUED CANDIDATE |
| NRS-PROFILE-BTF-0001  | input          | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-PROFILE-BTF-0001  | admissibility  | Evaluate the frozen scoped procedure; return typed results                | T08             | UNISSUED CANDIDATE |
| NRS-PROFILE-BTF-0002  | guarantee      | Represent and deliver scoped results without changing numerical judgments | T09             | UNISSUED CANDIDATE |
| NRS-PROFILE-BTF-0003  | declarations   | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-PROFILE-BTF-0003  | conformance    | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-PROFILE-BTF-0004  | input          | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-PROFILE-BTF-0004  | conformance    | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-VERIFY-0029       | comparison     | Evaluate the frozen scoped procedure; return typed results                | T08             | UNISSUED CANDIDATE |
| NRS-VERIFY-0029       | evidence       | Represent and deliver scoped results without changing numerical judgments | T09             | UNISSUED CANDIDATE |
| NRS-VERIFY-0030       | computability  | Evaluate the frozen scoped procedure; return typed results                | T08             | UNISSUED CANDIDATE |
| NRS-VERIFY-0030       | comparison     | Evaluate the frozen scoped procedure; return typed results                | T08             | UNISSUED CANDIDATE |
| NRS-VERIFY-0031       | evidence       | Represent and deliver scoped results without changing numerical judgments | T09             | UNISSUED CANDIDATE |
| NRS-VERIFY-0031       | outcomes       | Represent and deliver scoped results without changing numerical judgments | T09             | UNISSUED CANDIDATE |
| NRS-VERIFY-0032       | conformance    | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-VERIFY-0032       | integrity      | Evaluate the frozen scoped procedure; return typed results                | T08             | UNISSUED CANDIDATE |
| NRS-VERIFY-0032       | outcomes       | Represent and deliver scoped results without changing numerical judgments | T09             | UNISSUED CANDIDATE |
| NRS-CORE-0020         | envelope       | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-CORE-0020         | input          | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-CORE-0021         | envelope       | Shape and local relationships; no numerical evaluation                    | T07             | UNISSUED CANDIDATE |
| NRS-CORE-0021         | integrity      | Evaluate the frozen scoped procedure; return typed results                | T08             | UNISSUED CANDIDATE |
| NRS-CORE-0022         | admissibility  | Evaluate the frozen scoped procedure; return typed results                | T08             | UNISSUED CANDIDATE |
| NRS-CORE-0022         | outcomes       | Represent and deliver scoped results without changing numerical judgments | T09             | UNISSUED CANDIDATE |

## Non-overlapping handoff

- T07 owns candidate schema grammar, exact constants, structural constraints, local
  references/Cartesian cover, conditional report fields and relational validation.
  It encodes public numerical categories without choosing new numerical policies.
- T08 owns a limited adapter to the frozen numeric procedure and typed judgments.
  It evaluates model/design admissibility, computability/domain/representation,
  exact comparisons and independent integrity; it does not publish final CLI/report
  delivery or redefine T07 structural rules. Shared numerical development belongs
  in the public verifier repository, not copied into another runtime development home.
- T09 owns lifecycle/eligibility mapping, report/evidence binding, blocking propagation,
  transactional delivery and candidate CLI mapping, including indeterminate-only
  behavior. It consumes T08 judgments; it does not recompute or change them.
- T10 owns independent expected candidate corpus and regression vectors for every
  binding row, including malformed input, each refusal class, each one-slot mismatch,
  exact/signed/rounded zero, positive subnormal p, aggregation and execution suppression.
  It verifies T07-T09 responsibilities rather than becoming a second implementation.

T07/T08 share data definitions, not competing validators. T08 consumes T07 validated
associations; T09 validates envelope/evidence completeness against T07 schemas and
T08 result identity. T10 is cross-cutting evidence ownership, so every primary row
also has a T10 corpus obligation. None of these tasks begins in T06.

## Traceability

RFC owns input/member/identity inventory and candidate Requirement allocation.
T03 D01-D07 owns strict comparison and projection/output boundary. T04 Architecture
owns same-version decisions and execution separation; G4/G5 fixes J-cost/B/S-C/Z-B,
all 22 quantities, ordered gates and bounded witness. Repaired EC3/EC4 owns reference
support and failure delivery. T05 closes reuse sufficiency without adding meaning.
INPUTS.json pins each of these sources. T07 representation changes cannot silently
alter membership, projections, eligibility, outcomes, guarantees or reference support.
