# ADR-0004: Public Language Is English

**Status: Accepted** (Phase 0, 2026-08-10)

## Context

The specification targets international scientific and engineering audiences.
The project's steward organization works partly in Japanese.

## Decision

- **All public normative artifacts are written in English** (bound by
  NRS-GOV-0007): specification documents, registries, schemas, governance
  documents, code, and commit messages.
- **Machine identifiers are English** (requirement IDs, registry keys, field
  names, file names).
- **Internal execution reports and working notes may be in Japanese** (or any
  language); they are never public artifacts and never carry authority.

## Consequences

- Normative wording is reviewed as English text; the normative lint and
  requirement-keyword conventions assume English keywords.
- Translations, if ever published, are explicitly informative and
  non-authoritative.

## Rejected alternatives

- **Bilingual normative text**: rejected; two normative languages create a
  translation-equivalence problem indistinguishable from an authority
  conflict.
- **Japanese-first with English translation**: rejected for the same reason,
  plus reduced reviewability for the target audience.
