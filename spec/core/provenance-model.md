# Provenance Model

**Status: Normative (EXPERIMENTAL).** This document defines the minimal
provenance contract this specification actually makes: what "input,
execution, output, and relationships" mean for a nomue Record today, bound
to structure that already exists in the Phase 1/2A payload schemas, and
what those same words do **not** cover yet. `CHARTER.md` and
`registries/vocabulary.yaml` already use "provenance references" as
in-scope vocabulary; this document is the missing binding for that
vocabulary, not new scope.

## Why this document exists

Prior to this document, "provenance" appeared only as an unbound noun in
scope-listing prose ([scope-and-non-claims.md](scope-and-non-claims.md),
[layer-boundary.md](layer-boundary.md)), with no `NRS-PROV-*` namespace, no
dedicated document, and no Requirement ID - a gap between claimed scope and
actual normative content. This document closes that gap by doing exactly
two things: naming what is already enforced as the provenance chain, and
explicitly declaring what remains out of phase, so the absence is a stated
boundary rather than a silent one.

## Requirements

<a id="NRS-PROV-0001"></a>
**NRS-PROV-0001 - Intra-Record provenance chain** (stability: EXPERIMENTAL, status: active)
A Record's payload MUST bind its output to the execution that produced it
and the input that execution consumed, through resolvable local references:
a result MUST reference the analysis that produced it, an analysis MUST
reference the design and (through it) the dataset it was run against, and
every observation MUST reference the dataset that contains it. This chain -
already required by the profile schemas and NRS-CORE-0003 - is this
specification's provenance model for Phase 1 and Phase 2A: dataset is
input, analysis (identified by its `method_id`) is execution, result is
output, and the reference chain between them is the relationship.

Informative note: this clause names existing structure; it does not add a
new field. The chain is already mechanically enforced (an unresolved
reference at any link is a semantic conformance failure) and already
exercised by conformance fixtures M-012 ("the design references an unknown
dataset") and M-013 ("the analysis references an unknown design").

<a id="NRS-PROV-0002"></a>
**NRS-PROV-0002 - Extra-Record provenance is out of phase** (stability: EXPERIMENTAL, status: active)
This specification MUST NOT be read as making any claim about: the
provenance of a dataset's observations before their inclusion in the Record
(their original source, collection process, instrumentation, or chain of
custody outside this Record); the identity, version, or execution
environment of the software that performed the declared analysis; or
relationships between this Record and any other Record (a prior revision
lineage beyond `revision_id`'s own immutability, a citation, a derivation,
or a shared-dataset link). These are explicitly deferred - not silently
absent - until a future phase defines them, in the same posture as
attestation ([../attestation/README.md](../attestation/README.md)) and
extensions ([../extensions/README.md](../extensions/README.md)).

Informative note: a Record's `dataset` payload carries observation values,
not a claim about where those values physically came from. A relying party
that needs assurance about extra-Record provenance today must obtain it
through some channel outside this specification; NRS-VERIFY-0022's
"absence of evidence, not a verdict" principle
([relying-party-interface.md](../verification/relying-party-interface.md))
applies here too.

## Non-goal

This document does not define a provenance _format_ for the deferred
elements above (no field names, no schema). Defining one is future work,
tracked as an open question for whichever phase takes it on - not
something this EXPERIMENTAL-tier document should pre-decide.
