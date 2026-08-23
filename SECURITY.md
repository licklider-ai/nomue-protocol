# Security Policy

## Supported release

Security reports are accepted for the current Release 1 Public Draft and for the
reference verifier distributed with it. The reference verifier is non-normative;
issues that affect Protocol semantics, release artifacts, or independent
verification remain in scope.

## Reporting a vulnerability

Use GitHub's **Report a vulnerability** flow for this repository. It creates a
private security advisory visible to the maintainers. Do not open a public issue
for a suspected vulnerability and do not include secrets, personal data, or
unnecessary third-party confidential information in a report.

Include, when available:

- the affected commit, tag, bundle identifier, or verifier version;
- a minimal reproducer or malformed Record;
- the observed and expected behavior; and
- any known impact on integrity, signature verification, resource limits, or
  scoped verification outcomes.

Maintainers will acknowledge the report, assess whether it is a defect within an
existing guarantee or a request for a new guarantee, and coordinate disclosure
through the private advisory.

The threat model and residual-risk boundary are documented in
[security/threat-model.md](security/threat-model.md).
