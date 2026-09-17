# T13 F13-01 limited repair evidence

Status: **UNISSUED CANDIDATE**.

This packet records the authority-preserving repair for `F13-01`, discovered by
the independent T13 review of frozen target `752a3ef876f27595cca31c4a106e70ffc7bd04df`.
That target and the original T12 freeze remain immutable historical evidence.

The repaired source is `84627967352206e9d1ecc54c5ca6a735319d9785`.
`REPORT.md` states the closure and scope; `MANIFEST.json` binds the changed source,
authority, execution evidence, and preservation checks; `verify_repair.py` checks
those bindings and can rerun the bounded checks with `--deep`.
