# Multi-Bundle Dispatch

**Status: Normative.** This document binds how a verifier supporting several
interpretation bundles selects behavior (`NRS-VERSION`, `NRS-CORE`
namespaces, continued).

## Exact dispatch

<a id="NRS-VERSION-0005"></a>
**NRS-VERSION-0005 - Explicit bundle dispatch** (stability: CORE, status: active)
A verifier supporting multiple bundles MUST select behavior by exact
registered bundle identifier and MUST NOT infer compatibility from version
proximity.

Informative note: a Record declaring `itgc-guarantee:0.2.1`,
`itgc-guarantee:0.3.0-draft.1`, or any identifier outside the implemented
set is refused with `NRS-UNSUPPORTED-BUNDLE` - never routed to a "nearby"
bundle. Dispatch requires the identifier to be both implemented and
registered: the reference verifier refuses to load if an implemented bundle
is absent from the interpretation-bundle registry.

## Routing

<a id="NRS-VERSION-0007"></a>
**NRS-VERSION-0007 - No default bundle fallback** (stability: CORE, status: active)
A verifier MUST select a Record interpretation bundle solely by exact
registered identifier equality and MUST NOT select a default bundle from
registry order, insertion order, version proximity, or any other implicit
fallback.

<a id="NRS-VERSION-0008"></a>
**NRS-VERSION-0008 - Bundle-independent routing validation** (stability: STABLE-INTENT, status: active)
Before an interpretation bundle is selected, a verifier MUST validate only
the bundle-independent routing information required for exact bundle
dispatch and MUST NOT apply a bundle-specific Record Schema.

Informative note: routing validation is bundle-independent and is bound by
the routing-envelope schema
([../../schemas/routing/routing-envelope-0.2.schema.json](../../schemas/routing/routing-envelope-0.2.schema.json)):
the JSON root must be an object carrying a string
`interpretation_bundle_id`, and no other content is interpreted before
dispatch (strict JCS input eligibility and bundle-independent resource
limits run earlier in the pipeline and may traverse the input without
interpreting it). Exact registered identifier equality selects the bundle.
An input that declares any object member name more than once - including
`interpretation_bundle_id`, in any order, with any values, or via an
escaped-equivalent spelling - is rejected BEFORE routing with
`NRS-DUPLICATE-JSON-MEMBER`
([../../canonicalization/record-canonicalization.md#NRS-CANON-0007](../../canonicalization/record-canonicalization.md#NRS-CANON-0007)):
no first-wins or last-wins semantics exist, and no bundle is ever selected
from an ambiguous declaration (ADR-0018). A missing or
invalid (non-string) bundle declaration produces a routing refusal
(`routing_error`, reason codes `NRS-BUNDLE-ID-MISSING` /
`NRS-BUNDLE-ID-INVALID`); an unknown bundle produces an unsupported-bundle
refusal (`NRS-UNSUPPORTED-BUNDLE`). In every such case no bundle is
selected, no bundle-specific Record schema runs, no verification report is
produced, and no Record or revision identifier is inferred (a Record must
declare its bundle, NRS-VERSION-0003). Registry order has no semantic
meaning: the interpretation-bundle registry declares
`entry_order_semantics: none`, and conformance fixtures ROUTE-007 and
ROUTE-008 replay routing against permuted registry orders and require
identical outcomes. The earlier reference-verifier behavior of evaluating a
bundle-less Record against the first registered bundle's schema was removed
as a pre-release correction (see
[../../governance/decisions/ADR-0017-bundle-independent-routing.md](../../governance/decisions/ADR-0017-bundle-independent-routing.md)).

## Preservation

<a id="NRS-CORE-0010"></a>
**NRS-CORE-0010 - Versioned surface preservation** (stability: CORE, status: active)
A new interpretation bundle MUST NOT silently alter the meaning of a
previously registered bundle or its covered public contract surface.

<a id="NRS-VERSION-0006"></a>
**NRS-VERSION-0006 - Prior bundle regression preservation** (stability: STABLE-INTENT, status: active)
Adding a new bundle implementation MUST NOT alter pinned conformance results
for a previously supported bundle without an explicit, documented
correction.

Informative note: the Phase 1 fixture manifest pins the 0.1 bundle's
behavior; the regression suite replays it on every run, and a legitimate
correction (for example a refusal-artifact improvement) records its
rationale, old value, and new value in a decision record (see
[../../governance/decisions/ADR-0015-versioned-verifier-refusal-artifact.md](../../governance/decisions/ADR-0015-versioned-verifier-refusal-artifact.md)).
