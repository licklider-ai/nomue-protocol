/** Draft minting validator for ADR-0031/ADR-0032 HTTPS identifiers. */

export const RECOGNIZED_PROTOCOL_IDENTIFIER_FAMILIES = [
  "schema",
  "bundle",
  "profile",
  "method",
  "check",
  "canonicalization",
  "signature-suite",
  "attestation-statement",
  "approval-statement",
  "attestation-key",
  "release-key",
  "unidentified",
  "contract",
] as const;

export type ProtocolIdentifierFamily = (typeof RECOGNIZED_PROTOCOL_IDENTIFIER_FAMILIES)[number];

export type HttpsIdentifierErrorCode =
  | "NOT_STRING"
  | "NON_CANONICAL_BASE"
  | "FORBIDDEN_URI_COMPONENT"
  | "INVALID_SEGMENT_COUNT"
  | "INVALID_FAMILY"
  | "UNRECOGNIZED_FAMILY"
  | "INVALID_NAME"
  | "INVALID_REVISION";

export interface ParsedProtocolIdentifier {
  value: string;
  family: ProtocolIdentifierFamily;
  name: string;
  revision: string;
}

export type HttpsIdentifierValidation =
  | { ok: true; parsed: ParsedProtocolIdentifier; errors: [] }
  | { ok: false; errors: HttpsIdentifierErrorCode[] };

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VISIBLE_ASCII_SEGMENT = /^[\x21-\x7e]+$/;

/**
 * Validate the canonical lexical form fixed by ADR-0031 and the recognized
 * family set extended by ADR-0032. Revision-family policy remains separate;
 * this function only enforces a non-empty visible-ASCII path token.
 */
export function validateProtocolHttpsIdentifier(value: unknown): HttpsIdentifierValidation {
  if (typeof value !== "string") return { ok: false, errors: ["NOT_STRING"] };

  const errors: HttpsIdentifierErrorCode[] = [];
  if (!value.startsWith("https://nomue.ai/id/")) errors.push("NON_CANONICAL_BASE");
  if (/[?#%]/.test(value)) {
    errors.push("FORBIDDEN_URI_COMPONENT");
  }

  const segments = value.split("/");
  if (segments.length !== 7 || segments[0] !== "https:" || segments[1] !== "") {
    errors.push("INVALID_SEGMENT_COUNT");
  }
  const family = segments[4] ?? "";
  const name = segments[5] ?? "";
  const revision = segments[6] ?? "";

  if (!KEBAB_CASE.test(family)) errors.push("INVALID_FAMILY");
  const recognized = (RECOGNIZED_PROTOCOL_IDENTIFIER_FAMILIES as readonly string[]).includes(
    family,
  );
  if (KEBAB_CASE.test(family) && !recognized) errors.push("UNRECOGNIZED_FAMILY");
  if (!KEBAB_CASE.test(name)) errors.push("INVALID_NAME");
  if (
    !VISIBLE_ASCII_SEGMENT.test(revision) ||
    revision === "." ||
    revision === ".." ||
    /[/?#%]/.test(revision)
  ) {
    errors.push("INVALID_REVISION");
  }

  const uniqueErrors = [...new Set(errors)];
  if (uniqueErrors.length > 0 || !recognized) return { ok: false, errors: uniqueErrors };
  return {
    ok: true,
    parsed: {
      value,
      family: family as ProtocolIdentifierFamily,
      name,
      revision,
    },
    errors: [],
  };
}

export function isProtocolHttpsIdentifier(value: unknown): value is string {
  return validateProtocolHttpsIdentifier(value).ok;
}
