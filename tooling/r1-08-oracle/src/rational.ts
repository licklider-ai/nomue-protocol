/**
 * Exact rational arithmetic for Welch summary quantities (no sqrt).
 */

export interface Rational {
  n: bigint;
  d: bigint;
}

export function rat(n: bigint | number | string, d: bigint | number | string = 1): Rational {
  return { n: BigInt(n), d: BigInt(d) };
}

export function ratFromStrings(n: string, d: string): Rational {
  return { n: BigInt(n), d: BigInt(d) };
}

function gcd(a: bigint, b: bigint): bigint {
  let x = a < BigInt(0) ? -a : a;
  let y = b < BigInt(0) ? -b : b;
  while (y !== BigInt(0)) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

function normalize(r: Rational): Rational {
  if (r.n === BigInt(0)) return { n: BigInt(0), d: BigInt(1) };
  const g = gcd(r.n, r.d);
  const n = r.n / g;
  const d = r.d / g;
  if (d < BigInt(0)) return { n: -n, d: -d };
  return { n, d };
}

export function ratAdd(a: Rational, b: Rational): Rational {
  return normalize({ n: a.n * b.d + b.n * a.d, d: a.d * b.d });
}

export function ratSub(a: Rational, b: Rational): Rational {
  return normalize({ n: a.n * b.d - b.n * a.d, d: a.d * b.d });
}

export function ratMul(a: Rational, b: Rational): Rational {
  return normalize({ n: a.n * b.n, d: a.d * b.d });
}

export function ratDiv(a: Rational, b: Rational): Rational {
  if (b.n === BigInt(0)) throw new Error("division by zero rational");
  return normalize({ n: a.n * b.d, d: a.d * b.n });
}

export function ratNeg(a: Rational): Rational {
  return { n: -a.n, d: a.d };
}

export function ratCmp(a: Rational, b: Rational): number {
  const left = a.n * b.d;
  const right = b.n * a.d;
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

export function ratIsZero(a: Rational): boolean {
  return a.n === BigInt(0);
}

export function ratToString(a: Rational): string {
  return `${a.n}/${a.d}`;
}

export function meanRational(values: Rational[]): Rational {
  if (values.length === 0) throw new Error("empty values");
  let sum = rat(0);
  for (const v of values) sum = ratAdd(sum, v);
  return ratDiv(sum, rat(values.length));
}

export function sampleVarianceRational(values: Rational[]): Rational {
  if (values.length < 2) throw new Error("need at least two values");
  const m = meanRational(values);
  let acc = rat(0);
  for (const v of values) {
    const d = ratSub(v, m);
    acc = ratAdd(acc, ratMul(d, d));
  }
  return ratDiv(acc, rat(values.length - 1));
}

export function ratStrToNumber(s: string): number {
  if (s === "SE_ZERO" || s === "INSUFFICIENT_OBSERVATIONS" || s === "DF_UNDEFINED") {
    throw new Error(`degenerate rational: ${s}`);
  }
  if (!s.includes("/")) return Number(s);
  const [ns, ds] = s.split("/", 2);
  if (ns === undefined || ds === undefined) {
    throw new Error(`invalid rational string: ${s}`);
  }
  let n = BigInt(ns);
  let d = BigInt(ds);
  if (d === BigInt(0)) return NaN;
  if (n === BigInt(0)) return 0;
  const limit = BigInt(9007199254740991);
  while (n > limit || d > limit) {
    n >>= BigInt(1);
    d >>= BigInt(1);
  }
  return Number(n) / Number(d);
}

export function rationalValuesFromSpecs(
  specs: Array<{ rational_n: string; rational_d: string }>,
): Rational[] {
  return specs.map((s) => ratFromStrings(s.rational_n, s.rational_d));
}
