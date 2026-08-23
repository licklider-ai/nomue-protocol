/**
 * Schema-guided JSON mutation fuzzer, time-bounded (Batch 2 U5).
 *
 * Mutates valid seed Records (structural JSON mutations informed by the
 * schema's own field names/types, not a blind byte fuzzer) and classifies
 * every outcome as one of exactly two buckets:
 *
 *   - safe: the verifier returned a VerifyOutcome (a report or a refusal)
 *     without throwing, hanging past the time budget, or crashing the
 *     process. This includes every documented refusal_kind and every
 *     report outcome (pass or fail) - a mutation that happens to still
 *     verify cleanly, or one that fails a check, is exactly as "safe" as
 *     one that is explicitly refused.
 *   - unsafe: verifyRecordText threw past its own internal try/catch
 *     (reference/verifier/src/verify.ts already wraps verifyInner and
 *     converts any caught error into an internal_error refusal, so this
 *     would indicate something escaping that wrapper - for example a
 *     synchronous stack overflow the parsed-limit check's iterative
 *     traversal does not fully prevent, or a genuine unhandled path this
 *     fuzzer is specifically trying to find).
 *
 * A run that finds zero unsafe outcomes is not "nothing to report" - it is
 * the actual result, stated as such (see the run's own report file).
 */

import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { readText, repoRoot } from "../lib/repo.js";

type Json = unknown;

interface MutationResult {
  strategy: string;
  seed: string;
  input_sha256: string;
  classification: "safe" | "unsafe";
  outcome_summary: string;
  input_excerpt: string;
}

// Deterministic PRNG (mulberry32) instead of Math.random(), so a fuzz run
// - including any unsafe finding - is reproducible from its logged
// seed_value alone (see this run's own report and the reflow procedure in
// evidence/development/fuzz-runs/README.md).
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function randomPaths(value: Json, prefix: (string | number)[] = []): (string | number)[][] {
  const paths: (string | number)[][] = [prefix];
  if (Array.isArray(value)) {
    value.forEach((v, i) => paths.push(...randomPaths(v, [...prefix, i])));
  } else if (value !== null && typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      paths.push(...randomPaths(v, [...prefix, k]));
    }
  }
  return paths;
}

function getAt(value: Json, keyPath: (string | number)[]): Json {
  let cur = value;
  for (const key of keyPath) cur = (cur as Record<string | number, Json>)[key];
  return cur;
}

function setAt(value: Json, keyPath: (string | number)[], newValue: Json): void {
  if (keyPath.length === 0) return;
  let cur = value as Record<string | number, Json>;
  for (let i = 0; i < keyPath.length - 1; i += 1)
    cur = cur[keyPath[i]!] as Record<string | number, Json>;
  cur[keyPath[keyPath.length - 1]!] = newValue;
}

function deleteAt(value: Json, keyPath: (string | number)[]): void {
  if (keyPath.length === 0) return;
  let cur = value as Record<string | number, Json>;
  for (let i = 0; i < keyPath.length - 1; i += 1)
    cur = cur[keyPath[i]!] as Record<string | number, Json>;
  const lastKey = keyPath[keyPath.length - 1]!;
  if (Array.isArray(cur)) (cur as Json[]).splice(Number(lastKey), 1);
  else delete cur[lastKey];
}

type MutationStrategy = (seed: Json, rng: () => number) => { name: string; text: string };

const STRATEGIES: MutationStrategy[] = [
  (seed, rng) => {
    const clone = deepClone(seed);
    const paths = randomPaths(clone).filter((p) => p.length > 0);
    const target = paths[Math.floor(rng() * paths.length)]!;
    deleteAt(clone, target);
    return { name: "delete_random_field", text: JSON.stringify(clone) };
  },
  (seed, rng) => {
    const clone = deepClone(seed) as Record<string, unknown>;
    clone[`fuzz_unknown_${Math.floor(rng() * 1e6)}`] = { nested: true, value: rng() };
    return { name: "add_unknown_field", text: JSON.stringify(clone) };
  },
  (seed, rng) => {
    const clone = deepClone(seed);
    const paths = randomPaths(clone).filter((p) => p.length > 0);
    const target = paths[Math.floor(rng() * paths.length)]!;
    const replacements: Json[] = [
      null,
      true,
      false,
      0,
      -1,
      "",
      [],
      {},
      "🔥unicode🔥",
      1e308,
      -1e308,
    ];
    setAt(clone, target, replacements[Math.floor(rng() * replacements.length)]!);
    return { name: "type_confusion", text: JSON.stringify(clone) };
  },
  (seed, rng) => {
    const clone = deepClone(seed);
    const paths = randomPaths(clone).filter((p) => {
      const v = getAt(clone, p);
      return typeof v === "number";
    });
    if (paths.length === 0) return { name: "extreme_numeric_noop", text: JSON.stringify(clone) };
    const target = paths[Math.floor(rng() * paths.length)]!;
    const extremes = [
      Number.MAX_SAFE_INTEGER,
      -Number.MAX_SAFE_INTEGER,
      Number.MAX_VALUE,
      -Number.MAX_VALUE,
      Number.MIN_VALUE,
      1e300,
      -1e300,
    ];
    setAt(clone, target, extremes[Math.floor(rng() * extremes.length)]!);
    return { name: "extreme_numeric_value", text: JSON.stringify(clone) };
  },
  (seed, rng) => {
    const clone = deepClone(seed);
    const paths = randomPaths(clone).filter((p) => typeof getAt(clone, p) === "string");
    if (paths.length === 0) return { name: "huge_string_noop", text: JSON.stringify(clone) };
    const target = paths[Math.floor(rng() * paths.length)]!;
    setAt(clone, target, "x".repeat(1 + Math.floor(rng() * 200_000)));
    return { name: "huge_string", text: JSON.stringify(clone) };
  },
  (seed, rng) => {
    const clone = deepClone(seed);
    let nested: Json = "leaf";
    const depth = 60 + Math.floor(rng() * 40);
    for (let i = 0; i < depth; i += 1) nested = { a: nested };
    const paths = randomPaths(clone).filter((p) => p.length > 0);
    const target = paths[Math.floor(rng() * paths.length)]!;
    setAt(clone, target, nested);
    return { name: "deep_nesting_injection", text: JSON.stringify(clone) };
  },
  (seed) => {
    // Raw-text mutation: duplicate the first top-level member name
    // (JCS-ineligible input, not expressible via JSON.stringify on an
    // object - object keys are already unique in a JS object).
    const text = JSON.stringify(seed);
    const firstKeyMatch = /"([^"]+)":/.exec(text);
    if (firstKeyMatch === null) return { name: "duplicate_member_noop", text };
    const key = firstKeyMatch[1]!;
    const injected = text.replace("{", `{"${key}":null,`);
    return { name: "duplicate_member_name", text: injected };
  },
  (seed) => {
    const text = JSON.stringify(seed);
    // Raw-text mutation: an unescaped raw NaN/Infinity token where a
    // number was expected (not producible via JSON.stringify, which never
    // emits these - by design, per the finite-binary64 numeric model).
    return { name: "raw_nan_token", text: text.replace(/:\s*-?\d+(\.\d+)?/, ":NaN") };
  },
];

function classify(text: string): { classification: "safe" | "unsafe"; summary: string } {
  try {
    const outcome = verifyRecordText(text);
    if (outcome.report !== undefined) {
      return {
        classification: "safe",
        summary: `report: conformance=${outcome.report.conformance.outcome ?? outcome.report.conformance.execution}`,
      };
    }
    if (outcome.refusal !== undefined) {
      return {
        classification: "safe",
        summary: `refusal: ${outcome.refusal.refusal_kind} (exit ${outcome.exitCode})`,
      };
    }
    return { classification: "unsafe", summary: "VerifyOutcome had neither report nor refusal" };
  } catch (err) {
    return {
      classification: "unsafe",
      summary: `uncaught exception escaped verifyRecordText: ${err instanceof Error ? `${err.name}: ${err.message}` : String(err)}`,
    };
  }
}

function main(): void {
  const budgetMs = Number(process.env["FUZZ_BUDGET_MS"] ?? 10_000);
  const seedValue = Number(process.env["FUZZ_SEED"] ?? 42);
  const rng = mulberry32(seedValue);

  const seeds: Array<{ name: string; text: string }> = [
    { name: "V-001", text: readText("conformance/fixtures/public_checks/V-001.json") },
    { name: "A2-V-001", text: readText("conformance/fixtures/public_checks/A2-V-001.json") },
  ];
  const parsedSeeds = seeds.map((s) => ({ name: s.name, value: JSON.parse(s.text) as Json }));

  const results: MutationResult[] = [];
  const unsafe: MutationResult[] = [];
  const strategyCounts: Record<string, number> = {};
  const start = Date.now();
  let iterations = 0;

  while (Date.now() - start < budgetMs) {
    iterations += 1;
    const seed = parsedSeeds[Math.floor(rng() * parsedSeeds.length)]!;
    const strategy = STRATEGIES[Math.floor(rng() * STRATEGIES.length)]!;
    const { name, text } = strategy(seed.value, rng);
    strategyCounts[name] = (strategyCounts[name] ?? 0) + 1;
    const { classification, summary } = classify(text);
    const result: MutationResult = {
      strategy: name,
      seed: seed.name,
      input_sha256: createHash("sha256").update(text, "utf8").digest("hex"),
      classification,
      outcome_summary: summary,
      input_excerpt: text.slice(0, 300),
    };
    if (classification === "unsafe") {
      unsafe.push(result);
      results.push(result);
    } else if (iterations % 50 === 0) {
      // Sample safe outcomes into the report rather than recording all of
      // them (thousands of iterations in the time budget) - every unsafe
      // outcome is always kept in full.
      results.push(result);
    }
  }

  const report = {
    schema: "nrs-fuzz-run-report",
    schema_version: "0.1.0",
    budget_ms: budgetMs,
    seed_value: seedValue,
    iterations,
    unsafe_count: unsafe.length,
    result: unsafe.length === 0 ? "no_unsafe_outcomes_found" : "unsafe_outcomes_found",
    unsafe_findings: unsafe,
    sampled_safe_outcomes: results.filter((r) => r.classification === "safe"),
    strategy_counts: strategyCounts,
  };

  const dir = path.join(repoRoot, "evidence", "development", "fuzz-runs");
  fs.mkdirSync(dir, { recursive: true });
  const outPath = path.join(dir, `run-seed-${seedValue}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(
    `schema-guided-fuzzer: ${iterations} iterations in ${budgetMs}ms, ${unsafe.length} unsafe outcome(s). Wrote ${path.relative(repoRoot, outPath)}`,
  );
  if (unsafe.length > 0) {
    process.exitCode = 1;
  }
}

main();
