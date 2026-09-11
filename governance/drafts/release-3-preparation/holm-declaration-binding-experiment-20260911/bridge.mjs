// Disposable D0-to-Holm experiment; no public registration or scientific verdict.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execute = promisify(execFile);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../../../..");
const manifest = JSON.parse(fs.readFileSync(path.join(HERE, "INPUTS.json"), "utf8"));
// Manifest and this loader are trusted. Fresh trusted runtime and module paths,
// no concurrent filesystem mutation: this is not an adversarial-code sandbox.
for (const [name, hash] of Object.entries(manifest.runtime)) {
  const bytes = fs.readFileSync(path.resolve(HERE, name));
  if (crypto.createHash("sha256").update(bytes).digest("hex") !== hash)
    throw new Error("dependency hash: " + name);
}
for (const [name, hash] of Object.entries(manifest.packages)) {
  const file = fs.realpathSync(path.resolve(ROOT, name));
  if (!file.startsWith(ROOT + path.sep)) throw new Error("dependency origin: " + name);
  if (crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex") !== hash)
    throw new Error("dependency hash: " + name);
}
const ajvOrigin = fs.realpathSync(fileURLToPath(import.meta.resolve("ajv/dist/2020.js")));
if (ajvOrigin !== path.resolve(ROOT, manifest.ajv_origin))
  throw new Error("dependency origin: ajv");
const { parseStrictJson } = await import("../../../../reference/verifier/src/strict-json.ts");
const { jcsCanonicalize } = await import("../../../../reference/verifier/src/jcs.ts");
const { check: checkD0 } = await import("./d0.mjs");
export const CAPS = Object.freeze({
  bytes: [1048576, 262144, 2097152],
  depth: [32, 32, 34],
  nodes: [24576, 2048, 28672],
});
const ID = /^[A-Za-z0-9_.-]{1,64}$/;
const HEX = /^[0-9a-f]{16}$/;
const INTEGER = /^(?:0|[1-9a-f][0-9a-f]{0,268})$/;
const U = 1n << 1074n;
const EXPECTED_KIND = "unissued-holm-binding-input-v0";
const SUBMITTED_KIND = "unissued-holm-binding-evidence-v0";
const CONTRACT = "example-contract-multiplicity-adjustment-v0";
export class Refusal extends Error {
  constructor(reason, details = null) {
    super(reason);
    this.reason = reason;
    this.details = details;
  }
}
function need(ok, reason, details = null) {
  if (!ok) throw new Refusal(reason, details);
}
export function depthPreflight(text, limit) {
  let depth = 0,
    quoted = false,
    escaped = false;
  for (const ch of text) {
    if (quoted) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') quoted = false;
    } else if (ch === '"') quoted = true;
    else if (ch === "{" || ch === "[") {
      depth++;
      need(depth <= limit, "raw depth");
    } else if (ch === "}" || ch === "]") depth--;
  }
  // Syntax, balanced brackets and escapes remain the strict parser's job.
}
export function boundedNodes(value, cap) {
  const stack = [value];
  let count = 0;
  while (stack.length) {
    const v = stack.pop();
    need(++count <= cap, "document nodes");
    if (typeof v === "string") need(v.length <= 4096, "document string");
    if (typeof v === "number") need(Number.isFinite(v), "nonfinite");
    if (v !== null && typeof v === "object") {
      const entries = Object.entries(v);
      need(entries.length <= 1024, "document container");
      for (const [k, x] of entries) {
        need(k.length <= 4096, "document key");
        stack.push(x);
      }
    }
  }
  return count;
}
function object(v, keys, label) {
  need(v !== null && typeof v === "object" && !Array.isArray(v), "shape " + label);
  const actual = Object.keys(v);
  need(actual.length === keys.length && keys.every((k) => Object.hasOwn(v, k)), "shape " + label);
}
function id(v) {
  return typeof v === "string" && ID.test(v);
}
function inputs(v) {
  object(v, ["kind", "revision", "analysis_id", "family_id", "result_id", "members"], "inputs");
  need(v.kind === EXPECTED_KIND, "input kind");
  need(
    ["revision", "analysis_id", "family_id", "result_id"].every((k) => id(v[k])),
    "input id",
  );
  need(Array.isArray(v.members) && v.members.length >= 3 && v.members.length <= 120, "input count");
  const origins = new Map();
  for (const m of v.members) {
    object(m, ["member_id", "origin", "p_hex"], "input member");
    object(m.origin, ["source_id", "hypothesis_id", "sidedness"], "origin");
    need(id(m.member_id) && id(m.origin.source_id) && id(m.origin.hypothesis_id), "member id");
    need(["one_sided", "two_sided"].includes(m.origin.sidedness), "sidedness");
    need(typeof m.p_hex === "string" && HEX.test(m.p_hex), "p encoding");
    need(BigInt("0x" + m.p_hex) <= 0x3ff0000000000000n, "p domain");
    const old = origins.get(m.origin.source_id) ?? new Set();
    need(!old.has(m.origin.hypothesis_id), "source hypothesis duplicate");
    old.add(m.origin.hypothesis_id);
    origins.set(m.origin.source_id, old);
  }
}
function d0Counts(d) {
  // Counts are size guards before the original recursive schema/relations.
  const arrays = [
    [d?.design?.groups, 16],
    [d?.design?.units, 1024],
    [d?.dataset?.observations, 1024],
    [d?.analyses, 16],
    [d?.families, 16],
    [d?.result_slots, 16],
  ];
  for (const [v, max] of arrays) if (Array.isArray(v)) need(v.length <= max, "D0 count");
  if (Array.isArray(d?.families))
    for (const f of d.families)
      if (Array.isArray(f?.members)) need(f.members.length <= 120, "D0 member count");
}
export function prepare(expectedD0Text, expectedInputsText, submittedText) {
  const texts = [expectedD0Text, expectedInputsText, submittedText];
  texts.forEach((t, i) => {
    need(typeof t === "string", "raw type");
    need(t.length <= CAPS.bytes[i], "raw size");
    need(Buffer.byteLength(t, "utf8") <= CAPS.bytes[i], "raw size");
    depthPreflight(t, CAPS.depth[i]);
  });
  const parsed = texts.map((text, i) => {
    let value;
    try {
      value = parseStrictJson(text);
    } catch (e) {
      throw new Refusal("strict JSON", e.code ?? "JSON_SYNTAX");
    }
    boundedNodes(value, CAPS.nodes[i]);
    return value;
  });
  const [d, e, s] = parsed;
  d0Counts(d);
  const relation = checkD0(expectedD0Text);
  need(relation.stage === "relations" && relation.codes.length === 0, "D0 validation", relation);
  inputs(e);
  object(s, ["kind", "binding", "adjusted"], "submitted");
  need(s.kind === SUBMITTED_KIND, "submitted kind");
  object(s.binding, ["declaration", "inputs"], "binding");
  inputs(s.binding.inputs);
  need(Array.isArray(s.adjusted) && s.adjusted.length === e.members.length, "adjusted count");
  for (const row of s.adjusted) {
    object(row, ["member_id", "adjusted_hex", "display_hex"], "adjusted row");
    need(id(row.member_id), "adjusted member id");
    need(
      typeof row.adjusted_hex === "string" && INTEGER.test(row.adjusted_hex),
      "adjusted encoding",
    );
    need(BigInt("0x" + row.adjusted_hex) <= U, "adjusted domain");
    need(typeof row.display_hex === "string" && HEX.test(row.display_hex), "display encoding");
    need(BigInt("0x" + row.display_hex) <= 0x3ff0000000000000n, "display domain");
  }
  const a = d.analyses.find((x) => x.analysis_id === e.analysis_id);
  const f = d.families.find((x) => x.family_id === e.family_id);
  const r = d.result_slots.find((x) => x.result_id === e.result_id);
  need(
    a &&
      f &&
      r &&
      a.family_id === e.family_id &&
      f.analysis_id === e.analysis_id &&
      r.analysis_id === e.analysis_id &&
      r.family_id === e.family_id,
    "selection binding",
  );
  need(
    a.contract_ref === CONTRACT &&
      r.contract_ref === CONTRACT &&
      r.kind === "multiplicity_adjustment",
    "selection kind",
  );
  need(f.kind === "all_pairs", "family kind");
  const k = d.design.groups.length;
  need(k >= 3 && k <= 16 && f.members.length === (k * (k - 1)) / 2, "family scope");
  need(
    [a.analysis_id, f.family_id, r.result_id, ...f.members.map((x) => x.member_id)].every(id),
    "D0 selected id",
  );
  need(
    e.members.length === f.members.length &&
      e.members.every((m, i) => m.member_id === f.members[i].member_id),
    "member order",
  );
  need(
    jcsCanonicalize(s.binding) === jcsCanonicalize({ declaration: d, inputs: e }),
    "context binding",
  );
  need(
    s.adjusted.every((m, i) => m.member_id === e.members[i].member_id),
    "output member order",
  );
  const carrier = {
    family: e.family_id,
    revision: e.revision,
    members: e.members.map((m) => ({
      hypothesis: m.member_id,
      origin: m.origin.source_id,
      p: m.p_hex,
    })),
  };
  return { carrier, submitted: s.adjusted };
}
let workerPeakRssKiB = 0;
export function resourceMetrics() {
  const nodePeak = process.resourceUsage().maxRSS;
  return {
    node_peak_rss_kib: nodePeak,
    worker_peak_rss_kib: workerPeakRssKiB,
    sum_of_process_peaks_kib: nodePeak + workerPeakRssKiB,
  };
}
export async function runWorker(carrier, optimized = false) {
  const python = process.env.NOMUE_EXPERIMENT_PYTHON ?? manifest.python_executable;
  if (!path.isAbsolute(python)) throw new Error("worker executable must be absolute");
  const message = JSON.stringify(carrier);
  if (Buffer.byteLength(message) > 262144) throw new Error("private request size");
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "holm-worker-"));
  const metrics = path.join(temporary, "metrics.json");
  try {
    // Internal generated message and trusted diagnostic path, never submitted text.
    const promise = execute(python, [...(optimized ? ["-O"] : []), path.join(HERE, "worker.py")], {
      cwd: HERE,
      maxBuffer: 262144,
      timeout: 25000,
      encoding: "utf8",
      killSignal: "SIGKILL",
      env: { ...process.env, NOMUE_EXPERIMENT_METRICS: metrics },
    });
    promise.child.stdin.on("error", () => {});
    promise.child.stdin.end(message);
    let response;
    try {
      response = await promise;
    } catch (e) {
      throw new Error("worker process failure", { cause: e });
    }
    if (response.stderr.length) throw new Error("worker stderr");
    const usage = JSON.parse(fs.readFileSync(metrics, "utf8")).peak_rss_kib;
    if (!Number.isSafeInteger(usage) || usage <= 0) throw new Error("worker resource measurement");
    workerPeakRssKiB = Math.max(workerPeakRssKiB, usage);
    return response.stdout;
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}
export function verifyReply(text, submitted) {
  if (typeof text !== "string" || Buffer.byteLength(text) > 262144)
    throw new Error("worker response size");
  let r;
  try {
    depthPreflight(text, 4);
    r = parseStrictJson(text);
    boundedNodes(r, 1024);
  } catch (e) {
    throw new Error("worker response malformed", { cause: e });
  }
  const keys = r && typeof r === "object" && !Array.isArray(r) ? Object.keys(r) : [];
  if (
    keys.length !== 2 ||
    !Object.hasOwn(r, "adjusted_hex") ||
    !Object.hasOwn(r, "display_hex") ||
    !Array.isArray(r.adjusted_hex) ||
    !Array.isArray(r.display_hex) ||
    r.adjusted_hex.length !== submitted.length ||
    r.display_hex.length !== submitted.length
  )
    throw new Error("worker response shape");
  for (let i = 0; i < submitted.length; i++) {
    const a = r.adjusted_hex[i],
      b = r.display_hex[i];
    if (
      typeof a !== "string" ||
      !INTEGER.test(a) ||
      BigInt("0x" + a) > U ||
      typeof b !== "string" ||
      !HEX.test(b) ||
      BigInt("0x" + b) > 0x3ff0000000000000n
    )
      throw new Error("worker response encoding");
  }
  for (let i = 0; i < submitted.length; i++) {
    need(submitted[i].adjusted_hex === r.adjusted_hex[i], "adjusted mismatch");
    need(submitted[i].display_hex === r.display_hex[i], "display mismatch");
  }
  return {
    outcome: "declaration_bound_supplied_p_arithmetic_consistent",
    declaration_truth: "not_asserted",
    scientific_validity: "not_asserted",
    raw_p_recomputation: "not_run",
  };
}
export async function checkBinding(...texts) {
  const p = prepare(...texts);
  return verifyReply(await runWorker(p.carrier), p.submitted);
}
// Harness-only runner injection for zero-launch and broken-worker controls.
export async function checkWithRunner(texts, runner) {
  const p = prepare(...texts);
  return verifyReply(await runner(p.carrier), p.submitted);
}
