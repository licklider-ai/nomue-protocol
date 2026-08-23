import canonicalizeModule from "canonicalize";
import { describe, expect, it } from "vitest";
import { digestProjection, recomputeContentDigest } from "../../reference/verifier/src/digest.js";
import { CanonicalizationError, jcsCanonicalize } from "../../reference/verifier/src/jcs.js";

const independentJcs: (value: unknown) => string | undefined =
  (canonicalizeModule as unknown as { default?: (value: unknown) => string | undefined }).default ??
  (canonicalizeModule as unknown as (value: unknown) => string | undefined);

const SAMPLES: unknown[] = [
  { b: 1, a: 2, A: 3 },
  { nested: { z: [1, 2, { y: true, x: null }] }, s: '€ Ω Unicode \n\t  quote" back\\' },
  { numbers: [1e30, 100, 0.001, 5e-324, 1e21, 0.1 + 0.2, -0, 4.5] },
  [],
  {},
  [null, true, false, "", 0],
  { "": "empty key", " ": "space key" },
];

describe("JCS canonicalization", () => {
  it("agrees with the independent implementation on structured samples", () => {
    for (const sample of SAMPLES) {
      expect(jcsCanonicalize(sample)).toBe(independentJcs(sample));
    }
  });

  it("normalizes negative zero to 0", () => {
    expect(jcsCanonicalize(-0)).toBe("0");
    expect(jcsCanonicalize({ v: -0 })).toBe('{"v":0}');
  });

  it("fails closed on non-finite numbers", () => {
    expect(() => jcsCanonicalize(Number.NaN)).toThrowError(CanonicalizationError);
    expect(() => jcsCanonicalize({ v: Number.POSITIVE_INFINITY })).toThrowError(
      CanonicalizationError,
    );
  });

  it("rejects non-JSON values", () => {
    expect(() => jcsCanonicalize(undefined)).toThrowError(CanonicalizationError);
    expect(() => jcsCanonicalize(new Date(0))).toThrowError(CanonicalizationError);
  });
});

describe("digest projection", () => {
  it("excludes exactly the integrity member", () => {
    const record = { b: 1, integrity: { content_digest: "x" }, a: 2 };
    expect(digestProjection(record)).toEqual({ a: 2, b: 1 });
  });

  it("produces a sha256-prefixed lowercase digest independent of member order", () => {
    const one = recomputeContentDigest({ a: 1, b: [1, 2], integrity: { d: 1 } });
    const two = recomputeContentDigest({ b: [1, 2], integrity: { other: true }, a: 1 });
    expect(one).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(one).toBe(two);
  });
});
