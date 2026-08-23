# Public check versioning

**Status: Normative.** This document binds versioning rules for public-check
numerical tolerance and comparison semantics (`NRS-VERSION` namespace).

<a id="NRS-VERSION-0009"></a>
**NRS-VERSION-0009 - Numerical comparison changes require versioning** (stability: CORE, status: active)
A change to a public-check numerical tolerance or comparison semantic MUST
issue a new public-check version and interpretation bundle and MUST NOT
silently alter a previously registered check.

Informative note: the successor bundle
`urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1` carries the hardened p-value
comparison contract while `urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1`
remains immutable (NRS-VERSION-0006, ADR-0021).
