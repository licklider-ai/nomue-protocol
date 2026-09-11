# Author validation and provenance

The repository assistant authored this packet in OpenAI Codex / ChatGPT Work on
2026-09-11. It builds on PR #311's separately reviewed body and PR #312's author
coupling plan. This is an author self-check, not independent review of the new
byte scanner, schemas, stage mapping or runtime integration. Prior primary-source
and numerical reviews are reused within their existing scope; no original paper
or external standard was newly inspected for this packet.

Environment: Linux, Node v24.19.0, Python 3.12.14 selected by absolute path. Source
and reused runtime identities are in INPUTS.json. The expected arithmetic uses
hand-authored exact fractions 3/64, 1/16 and 1/8 and the earlier fixture's distinct
closed-testing construction. Test serialization uses the separately installed
`canonicalize` package, not the production canonicalizer. SHA-256 expectations
follow the already adopted domain-separated formula.

RESULTS.json records **82 controls across the 24 proposed categories**, plus
replay of **132 existing registered conformance fixtures**. Real isolated workers
run the baseline and 120-member family. Controls cover every envelope field,
actual URI binding, raw-byte and strict-parser priority, unchanged digest after
metadata/payload tampering, untagged hashes, deliberately faulty canonicalization,
complete relation codes, result ownership, every exact/display mismatch, layered
admission, worker failures, separate reports and non-claims. The 24 labels are
coverage categories, not 24 formal conformance approvals. Future identity coverage
uses an unallocated example.invalid sentinel.

Author adversarial inspection produced these repairs before candidate review:

- Copy the bounded input Buffer before asynchronous setup. A caller-mutation
  control proves that changing the original buffer after invocation cannot
  substitute a different Record into the pending run.
- Compare local scope across all report checks and enforce stage-specific reason
  and prerequisite relationships, beyond JSON field shape alone.
- Treat unknown bridge failure reasons as internal failure; do not infer that an
  unfamiliar failure is a known unsupported scientific input.
- Wrap serializer callbacks explicitly rather than passing them directly to
  Array.map, whose extra callback arguments can change a serializer's behavior.

The test rewrites this packet's generated examples/results, followed by repository
formatting of JSON. It does not alter original bridge/body inputs or registered
expectations. Fixed-head review and CI results are recorded separately once the
candidate is committed. No formal gate is closed by these author observations.
