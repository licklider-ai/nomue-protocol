# Proposed requirement wording and evidence

Generated informative draft. Proposed IDs are unallocated; this is not normative
authority and its merge does not activate any requirement.

## NRS-CONTRACT-HOLM-0001: Scope and direct Contract identity

Only ordinary unweighted supplied-p Holm for one selected all-pairs family of 3..120 members from 3..16 groups is admitted. The payload binds the exact Contract identity.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_public.mjs` — `delete r.payload.contract_id`.

## NRS-CONTRACT-HOLM-0002: Supplied binary64 domain

Inputs use exactly 16 lowercase hexadecimal binary64 bits in [0,1], including positive zero and excluding negative zero, infinities and NaNs. Sidedness is retained without changing p.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_envelope.mjs` — `precision`.

## NRS-CONTRACT-HOLM-0003: Exact adjusted target

Decode on denominator 2^1074, sort by exact p then original position, form each rank product, take the cumulative maximum, clip at one, and restore original member order. Exact numerators use minimal lowercase hexadecimal.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_envelope.mjs` — `120-member real worker`.

## NRS-CONTRACT-HOLM-0004: Single binary64 projection

Project the exact adjusted value once to nearest binary64, ties to even, and compare the complete display bit pattern with zero tolerance. No Record owns a tolerance.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_public.mjs` — `NRS-HOLM-DISPLAY-VALUE-MISMATCH`.

## NRS-CONTRACT-HOLM-0005: Independent complete expected context

The caller provides actual Record/revision identities, full declaration and selected inputs independently. Equality includes unrelated analyses before any private compatibility conversion. No authenticity is inferred.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_envelope.mjs` — `context_binding`.

## NRS-CONTRACT-HOLM-0006: Selected ownership and origin

Selected analysis/family/result ownership and complete member order agree; source-hypothesis tuples are unique. Only the selected multiplicity-adjustment result is executed.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_envelope.mjs` — `ownership`.

## NRS-CONTRACT-HOLM-0007: All-row arithmetic comparison

Compare all exact adjusted numerators and all projected displays. Any mismatch prevents byte forwarding; display equality alone is insufficient.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_public.mjs` — `NRS-HOLM-EXACT-VALUE-MISMATCH`.

## NRS-CONTRACT-HOLM-0008: Five ordered scoped checks

Integrity, context, declaration, admission and arithmetic share the complete scope. A failed prerequisite gates later checks. Error has no pass/fail outcome; there is no aggregate status.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_public.mjs` — `invalid public report rejected`.

## NRS-CONTRACT-HOLM-0009: Complete refusal and resource mapping

Each refusal has its versioned reason, kind and stage. Resource refusals have the matching limit category. Observed outer failure discards inner reports and forwarded bytes.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_public.mjs` — `invalid public refusal rejected`.

## NRS-CONTRACT-HOLM-0010: Canonical ingress and exact routing

Strict UTF-8/JSON admission precedes exact bundle routing. Closed schema precedes canonical-storage admission. The original tagged byte projection and canonical value projection agree before digest acceptance.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_envelope.mjs` — `raw_priority`.

## NRS-CONTRACT-HOLM-0011: Successor report and refusal structure

Closed successor output schemas are used. Reports bind actual scope; refusals contain no Record reference or arithmetic result. Unknown input size is represented explicitly, never invented.

Proposed stability: STABLE-INTENT. Implementation: implemented_pending_output_decision.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_public.mjs` — `input_evidence`.

## NRS-CONTRACT-HOLM-0012: Conjunctive input bounds

Record and expected byte caps, depth, nodes, string/key width, per-container bounds and inherited bridge limits apply together. Individual maxima are not a promise that simultaneous maxima fit.

Proposed stability: EXPERIMENTAL. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_envelope.mjs` — `admission_caps`.

## NRS-CONTRACT-HOLM-0013: No scientific or origin guarantee

Every report leaves scientific validity, declaration truth, FWER and source authenticity not asserted; original p generation is outside scope. No alpha input or significance output is accepted.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_public.mjs` — `familywise_error_control`.

## NRS-CONTRACT-HOLM-0014: Whole-invocation enforcement and cleanup

Trusted execution retains all observed causes, fixed refusal precedence, unconditional descendant cleanup and no partial acceptance. Supervisor loss requires the external owner; no output never means acceptance.

Proposed stability: EXPERIMENTAL. Implementation: implemented_with_declared_host_boundary.

Future document: `spec/profiles/independent-multigroup-continuous/supplied-p-holm.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_receipts.mjs` — `original_byte_forwards`.

## NRS-PROFILE-IMGC-0001: Complete one-way declaration

Retain the complete dataset, represented units, observations, groups, design, analyses, families and result slots with closed fields and valid D0 relationships.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/declarations.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_envelope.mjs` — `relation_codes`.

## NRS-PROFILE-IMGC-0002: Declaration shapes and compatibility

The six closed operation_kind values identify declaration shapes, not executed scientific Contracts. Private one-to-one compatibility conversion occurs only after complete expected-context equality.

Proposed stability: STABLE-INTENT. Implementation: implemented.

Future document: `spec/profiles/independent-multigroup-continuous/declarations.md`.

Candidate evidence locator: `governance/drafts/release-3-preparation/holm-public-candidate-20260911/test_envelope.mjs` — `fromD0`.
