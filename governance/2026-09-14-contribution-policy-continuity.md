# Contribution-policy continuity — 2026-09-14

The steward approved the publication-boundary and adversarial-review preparation
instructions and their integration. They append to the existing AGENTS.md;
no earlier instruction, scientific source, input contract or numerical method is
changed. This is operating maintenance, not a new R3 review, adoption or release.

Two R3 historical-source checks also pin AGENTS.md. Current checking now validates
this exact approved append while preserving the original historical source pins:

- Historical AGENTS.md SHA-256:
  `059d84ddbd634f42178810a53d9db1e9886a8a07ae15d5269b6090191dca68ed`.
- Current approved AGENTS.md SHA-256:
  `09c531ae764648caffd186970d5d9a5c5080aad7311f0644827f6ca4230abb19`.
- The original bytes must remain an exact prefix, ending before the new
  publication-boundary section. The entire new file must match the approved hash.
- The adoption-map checker also pins itself. Its exact delegation-only edit is
  bound to SHA-256
  `9496bd89cbfa4b32082f9ed1a19ea35efbd26a59fec8243f67f908b28e123970`;
  reversing that edit must reconstruct its historical SHA-256
  `a68d1e995e07c99fb7c7eadd32f661ec21ce1079a2485578b4d0fa331692dfd5`.
- Every other pinned source remains subject to exact hash equality. No wildcard,
  ignored-file class or runtime exemption is added. Unknown revisions fail.

The shared checker is
`tooling/maintenance/pinned-contribution-source.mjs`. Its regression tests reject
old-body edits, suffix edits/removal, unknown pins and changes to unrelated source.
The adoption-map and follow-up evidence checkers call it; their previous versions
remain available at repository commit
`b0946163aed30a39119336434e2029b96096fd57`. Historical INPUTS.json, INTEGRATION.json,
service metadata, archived outputs and review conclusions are unchanged.

The follow-up directory's SHA256SUMS.txt is updated only for the maintained
check_evidence.py script. Its previous script digest was
`bdbdb29892510f71f1667277bc79982f0ab3143e0525fd7cc2378ae844eaa7db`;
the original checksum list remains at that same immutable commit. The updated
digest describes the current checker, not a rerun or replacement of old evidence.

Passing these checks establishes preserved inputs plus the declared operating
transition. It does not extend an old independent review to a new scientific
candidate. Future changes still need their own explicit scope and evidence.
