# Bounded implementation review handoff

Review the published commit and tree containing this packet, keeping design
`1ae29058f44dce65ba3a3ef0d018bdbea0d9f940` and reused dependency commit
`c61e734a1f19f6572100f2594dd24b1e01ea4d49` fixed. Record the target identity,
reviewer/model actually used, prior involvement, findings and dispositions.
A new thread alone is not independent scientific review evidence.

The requested review is limited to whether this disposable complete-output
experiment is internally correct and faithfully implements the reviewed design.
Do not repeat the whole F-distribution or IEEE source investigation unless a
specific inconsistency is found. Do not merge, adopt a method, register a public
check, certify the runtime or claim R4 release readiness.

Priority checks:

- Mandatory quantity/contrast mapping and 13-real-output completeness; exact F
  drives the tail even when the F display is zero.
- Refusal ordering and all-contrast preflight, especially zero A with over-budget
  B; no expensive tail work before a later mandatory failure is known.
- Pin verification, original dependency byte equality and honest loader/runtime
  trust boundary; scientific identity remains separate from arithmetic zero signs.
- Runtime candidate enclosures versus test-only probability oracle, and correct
  partial-result handling without an implicit complete result.
- Exact-zero versus rounded-zero SSE, finite SS/SSE with unrepresentable F,
  positive probability rounded to zero, and the conservative finite-domain policy.
- Full-call resource tests: ordinary data and admitted frontier, forced precision
  schedule identified as instrumentation, no timeout or crash counted as refusal.

Normal and optimized tests should yield identical parsed results. Results and
benchmarks are author evidence; independently challenge the new wrapper rather
than treating green tests as its proof. Small fixes may be made on a separate
review branch with original target identity and changes recorded. A material
scope or output-policy change returns to bounded design discussion. A successful
review closes this experimental round only, leaving public support decisions open.
