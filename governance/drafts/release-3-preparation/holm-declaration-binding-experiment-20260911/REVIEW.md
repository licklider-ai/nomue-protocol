# Bounded external implementation review request

Target: the immutable commit containing this packet, its sole PR #299 parent,
`INPUTS.json`, `NODE-CONFIRMATION.json`, and `SHA256SUMS`.

The node correction has only author-side confirmation. No new scientific review
or complete design review is requested here. Report provenance, inspected commit,
actual commands, limitations and findings without implying an unperformed
independent primary-source review.

1. Check pre-parse byte/depth and post-parse node/type guards, including the
   42,450-node refusal and the 27,108 submitted-node embedding bound.
2. Try cross-analysis/family/member substitutions, p provenance or sidedness
   changes and pair reversal. Confirm the caller's expected arguments select the
   context and full JCS comparison binds what the worker carrier omits.
3. Check the private worker channel, response caps, source pins and runtime trust
   assumptions. Crashes or malformed output are experiment failures, not evidence
   refusals. Diagnostics never belong to the evidence identity.
4. Try exact/display collisions, false final rows and duplicate/missing rows;
   acceptance requires complete matching output. No scientific validity follows.
5. Assess the resource deviation explicitly: process-reported peak sums replace
   unavailable live RSS sampling in this environment. Determine what evidence is
   still needed before promotion; do not label the live-memory gate passed.

Use small, named-reason negative controls. Numerical expectations need a distinct
oracle. If repairs are made, preserve prior evidence and record changed scope and
reproduction results. A clean review can close this experimental round without
merging, registering a public check, adopting a method or releasing software.
