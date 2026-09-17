# Release 4 T12 whole-candidate freeze

Status: **UNISSUED CANDIDATE**.

This directory freezes the Release 4 research candidate assembled through T11. It
does not issue a Requirement, register a schema or bundle, connect a dispatcher, or
admit the candidate to the public CLI.

- `REPORT.md` describes the freeze boundary and evidence disposition.
- `FREEZE-MANIFEST.json` binds candidate components and evidence by commit, path,
  SHA-256, and provenance.
- `REPRODUCIBILITY.md` gives the bounded reproduction procedure.
- `REPRODUCTION-RECEIPT.json` records the T12 verification run.
- `verify_freeze.py` checks the immutable bindings and can run the existing packet
  checkers with `--deep`.

The candidate content commit is
`5478f30981da04faded03eaa0d15419a6665210d`. The containing Git commit binds this
freeze package and is the exact T13 review target.
