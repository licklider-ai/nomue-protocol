# TypeScript Bindings

[generated/](generated/record.ts) holds TypeScript types generated from the
Phase 1 JSON Schemas by `pnpm schema:generate-types` (also run by
`pnpm generate`).

The bindings are **generated and non-authoritative**: the JSON Schemas under
[../../schemas/](../../schemas/README.md) govern, and each generated file's
header pins the source schema hashes. Never edit generated files by hand; CI
fails on drift via `pnpm check:generated`.

Python bindings are deliberately not generated in Phase 1.
