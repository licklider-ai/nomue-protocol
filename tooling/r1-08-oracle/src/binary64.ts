/**
 * IEEE 754 binary64 bit-pattern authority helpers for R1-08 oracle corpus.
 */

import { createHash } from "node:crypto";
import canonicalize from "canonicalize";

export interface Binary64Spec {
  hex: string;
  decimal_label: string;
  rational_n: string;
  rational_d: string;
  value: number;
}

function rationalFromFloat64Bits(bits: bigint): { n: bigint; d: bigint; value: number } {
  const sign = bits >> BigInt(63);
  const expField = Number((bits >> BigInt(52)) & BigInt(0x7ff));
  const frac = bits & BigInt(0xfffffffffffff);

  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, bits, false);
  const value = view.getFloat64(0, false);

  if (expField === 0x7ff) {
    throw new Error("non-finite binary64");
  }

  let mant: bigint;
  let exp: number;
  if (expField === 0) {
    if (frac === BigInt(0)) {
      return { n: BigInt(0), d: BigInt(1), value };
    }
    mant = frac;
    exp = -1023 - 52;
  } else {
    mant = frac | (BigInt(1) << BigInt(52));
    exp = expField - 1023 - 52;
  }

  const signFactor = sign === BigInt(0) ? BigInt(1) : BigInt(-1);
  if (exp >= 0) {
    return { n: signFactor * mant * (BigInt(1) << BigInt(exp)), d: BigInt(1), value };
  }
  return { n: signFactor * mant, d: BigInt(1) << BigInt(-exp), value };
}

/** Parse 16-char lowercase hex IEEE 754 binary64 bit pattern. */
export function binary64FromHex(hex: string): Binary64Spec {
  const normalized = hex.toLowerCase().padStart(16, "0");
  if (!/^[0-9a-f]{16}$/.test(normalized)) {
    throw new Error(`invalid binary64 hex: ${hex}`);
  }
  const hi = BigInt(Number.parseInt(normalized.slice(0, 8), 16));
  const lo = BigInt(Number.parseInt(normalized.slice(8, 16), 16));
  const bits = (hi << BigInt(32)) | lo;
  const { n, d, value } = rationalFromFloat64Bits(bits);
  return {
    hex: normalized,
    decimal_label: String(value),
    rational_n: n.toString(),
    rational_d: d.toString(),
    value,
  };
}

export function binary64FromNumber(value: number): Binary64Spec {
  if (!Number.isFinite(value)) {
    throw new Error(`non-finite value cannot be encoded: ${value}`);
  }
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, value, false);
  const bits = view.getBigUint64(0, false);
  const hi = Number((bits >> BigInt(32)) & BigInt(0xffffffff));
  const lo = Number(bits & BigInt(0xffffffff));
  const hex = hi.toString(16).padStart(8, "0") + lo.toString(16).padStart(8, "0");
  return binary64FromHex(hex);
}

export function hashCanonicalJson(obj: unknown): string {
  const text = canonicalize(obj);
  if (text === undefined) throw new Error("canonicalize returned undefined");
  return createHash("sha256").update(text, "utf8").digest("hex");
}

export function hashBytesSha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}
