# Exact repair CI observations

Implementation [PR #326](https://github.com/licklider-ai/nomue-protocol/pull/326)
was tested at `0c8c6d9db4e192c050b6ecf4cbd84b03dd5db9bc` and merged as
`2535cb8420b36455d4e3a3dfe0a5416fa4125d1a`. INTEGRATION records identical trees,
the empty diff, five successful standard jobs and four successful dedicated jobs.
It includes GitHub-reported head, event, timestamps and artifact identity.

The candidate passed 33/33 real-host controls, validated 28 public receipts and
forwarded original bytes five times. Admission passed 36/36 trials and recorded
harness, preparation and source-input hashes together with the event head and
synthetic merge checkout/tree. Checkpoint controls passed 38/38; public controls
93/93; envelope controls 82/82 and legacy fixtures 132/132. The adoption checker
verified 531 explicit property pointers and 420 source pins, and rejected six
mutated inputs. The focused source audit rejected four inserted violations.

The raw artifact members are unchanged bytes with .json.txt suffixes. The source
ZIPs are also retained as base64 for offline digest reproduction. INTEGRATION maps
original ZIP member paths to archive names. SHA256SUMS covers all files here except
itself. Run sha256sum -c SHA256SUMS here; decode the base64 files and compare their
ZIP digests with INTEGRATION to reproduce the full check offline.

These are observations of the tested commit. No independent reviewer identity,
remote receipt attestation, continuous heap-peak guarantee or formal research-gate
closure is asserted. No candidate runtime changes in this archive-only follow-up.
