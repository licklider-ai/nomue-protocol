// Hand-authored integration expectations. Independent serialization and exact fractions.
import assert from "node:assert/strict";
import fs from "node:fs";
import { artifact } from "./test-artifacts.mjs";
import crypto from "node:crypto";
import canonicalize from "canonicalize";
import { fixture, fromD0, U } from "../holm-declaration-binding-experiment-20260911/fixtures.mjs";
import { check as checkD0 } from "../holm-declaration-binding-experiment-20260911/d0.mjs";
import { verifyRecordText } from "../../../../reference/verifier/src/verify.ts";
import { runConformanceSuite } from "../../../../tooling/src/phase1/conformance.ts";
import {
  IDS,
  CAPS,
  verify,
  validateOutput,
  projectStoredBytes,
  storedDigest,
  legacyTexts,
} from "./envelope.mjs";
const clone = structuredClone;
const digest = (b) =>
  "sha256:" +
  crypto
    .createHash("sha256")
    .update(Buffer.concat([Buffer.from("nomue/record-content/v1\n"), b]))
    .digest("hex");
const bytes = (r) => Buffer.from(canonicalize(r));
function seal(r) {
  const { integrity, ...projection } = r;
  r.integrity.content_digest = digest(bytes(projection));
  return bytes(r);
}
function pair(f = fixture(3, 3, 2)) {
  const declaration = clone(f.d);
  for (const item of [...declaration.analyses, ...declaration.result_slots]) {
    item.operation_kind = item.contract_ref
      .slice("example-contract-".length, -3)
      .replaceAll("-", "_");
    delete item.contract_ref;
  }
  declaration.artifact_kind = "unissued-r3-declaration-body-v1";
  for (const slot of declaration.result_slots) delete slot.payload_status;
  const inputs = clone(f.expected);
  delete inputs.revision;
  inputs.kind = "unissued-holm-envelope-input-v1";
  const record = {
    $schema: IDS.record,
    record_type: "nomue-record",
    record_id: "urn:example:record",
    revision_id: "urn:example:revision-1",
    created_at: "2026-09-11T00:00:00Z",
    interpretation_bundle_id: IDS.bundle,
    profile_id: IDS.profile,
    payload: {
      contract_id: IDS.contract,
      declaration,
      inputs,
      result: {
        analysis_id: inputs.analysis_id,
        family_id: inputs.family_id,
        result_id: inputs.result_id,
        adjusted: clone(f.submitted.adjusted),
      },
    },
    integrity: {
      canonicalization_id: "urn:nomue:canonicalization:jcs:0.2.0-draft.1",
      digest_algorithm: "sha-256",
      digest_scope: "record_without_integrity",
      content_digest: "sha256:" + "0".repeat(64),
    },
  };
  const expected = {
    record_id: record.record_id,
    revision_id: record.revision_id,
    declaration: clone(declaration),
    inputs: clone(inputs),
  };
  seal(record);
  return { record, expected };
}
const baseline = pair();
const exact = [(3n * U) / 64n, U / 16n, U / 8n].map((x) => x.toString(16));
const display = ["3fa8000000000000", "3fb0000000000000", "3fc0000000000000"];
assert.deepEqual(
  baseline.record.payload.result.adjusted.map((x) => x.adjusted_hex),
  exact,
);
assert.deepEqual(
  baseline.record.payload.result.adjusted.map((x) => x.display_hex),
  display,
);
const reply = JSON.stringify({ adjusted_hex: exact, display_hex: display });
let calls = 0;
const runner = async () => {
  calls++;
  return reply;
};
const now = () => "2026-09-11T00:00:00.000Z";
const rows = [];
const stages = ["integrity", "context", "declaration", "admission", "arithmetic"];
async function exercise(group, name, want, edit, config = {}) {
  const p = clone(baseline);
  if (edit) edit(p);
  const input = config.raw ?? (config.noSeal ? bytes(p.record) : seal(p.record));
  const before = calls;
  const e = config.expectedText ?? JSON.stringify(p.expected, null, 2);
  const result = await verify(e, input, { now, runner, ...config.options });
  assert.ok(await validateOutput(result.output), name + " output schema/invariant");
  if (want.startsWith("refusal:")) {
    assert.equal(result.output.kind, IDS.refusal, name);
    assert.equal(result.output.reason, want.slice(8), name);
  } else {
    const [stage, outcome] = want.split(":");
    assert.equal(result.output.kind, IDS.report, name);
    const c = result.output.checks.find((x) => x.stage === stage);
    assert.equal(c.execution, outcome === "error" ? "error" : "completed", name);
    if (outcome !== "error") assert.equal(c.outcome, outcome, name);
  }
  const success =
    result.output.kind === IDS.report && result.output.checks.every((c) => c.outcome === "pass");
  if (success) {
    assert.ok(result.verified_bytes.equals(input), name + " forwarded bytes");
    assert.deepEqual(result.payload, p.record.payload);
  } else {
    assert.equal(Object.hasOwn(result, "verified_bytes"), false, name + " no partial forwarding");
    assert.equal(Object.hasOwn(result, "payload"), false);
  }
  assert.equal(calls - before, config.calls ?? 0, name + " worker calls");
  rows.push({ group, name, expected: want, worker_calls: calls - before });
  return { result, p, input };
}
const ok = await exercise("valid_baseline", "baseline exact fractions", "arithmetic:pass", null, {
  calls: 1,
});
assert.equal(
  ok.result.output.record_reference.content_digest,
  baseline.record.integrity.content_digest,
);
assert.ok(
  projectStoredBytes(ok.input).equals(bytes((({ integrity, ...x }) => x)(baseline.record))),
);
const real = await verify(JSON.stringify(baseline.expected), bytes(baseline.record), { now });
assert.equal(real.output.checks[4].outcome, "pass");
assert.ok(await validateOutput(real.output));
rows.push({
  group: "valid_baseline",
  name: "real isolated Python worker",
  expected: "arithmetic:pass",
});
for (const k of Object.keys(baseline.record))
  await exercise(
    "missing_envelope_member",
    "missing " + k,
    "refusal:" + (k === "interpretation_bundle_id" ? "bundle_missing" : "record_schema"),
    (p) => {
      delete p.record[k];
    },
    { noSeal: true },
  );
for (const k of ["record_id", "revision_id"])
  await exercise("local_instance_label", "local " + k, "refusal:record_schema", (p) => {
    p.record[k] = "local";
  });
assert.ok(IDS.checks.arithmetic.startsWith("https://nomue.ai/id/check/"));
const oldCheck = JSON.parse(
  fs.readFileSync(
    new URL("../../../../schemas/common/execution-outcome-0.2.schema.json", import.meta.url),
  ),
);
assert.equal(
  new RegExp(oldCheck.$defs.checkResult.properties.check_id.pattern).test(IDS.checks.arithmetic),
  false,
);
rows.push({
  group: "future_check_identity",
  name: "unallocated HTTPS sentinel accepted by exercise, rejected by legacy check pattern",
  expected: "version separation",
});
for (const v of [null, 17, "unknown", "urn:nomue:bundle:itgc-minimal:0.1.0-draft.1"])
  await exercise(
    "wrong_bundle",
    "bundle " + v,
    "refusal:" + (typeof v === "string" ? "bundle_unsupported" : "bundle_type"),
    (p) => {
      p.record.interpretation_bundle_id = v;
    },
  );
assert.equal(
  verifyRecordText(bytes(baseline.record).toString()).refusal.refusal_kind,
  "unsupported_bundle",
);
rows.push({
  group: "wrong_bundle",
  name: "supported verifier refuses exercise bundle",
  expected: "unsupported_bundle",
});
for (const k of ["canonicalization_id", "digest_algorithm", "digest_scope"])
  await exercise(
    "wrong_integrity_metadata",
    "integrity metadata " + k,
    "refusal:record_schema",
    (p) => {
      p.record.integrity[k] = "wrong";
    },
  );
for (const [name, edit] of [
  [
    "record_id",
    (p) => {
      p.record.record_id = "urn:example:other";
    },
  ],
  [
    "revision_id",
    (p) => {
      p.record.revision_id = "urn:example:other";
    },
  ],
  [
    "created_at",
    (p) => {
      p.record.created_at = "2026-09-12T00:00:00Z";
    },
  ],
  [
    "declaration",
    (p) => {
      p.record.payload.declaration.dataset.observations[0].value = 15;
    },
  ],
  [
    "inputs",
    (p) => {
      p.record.payload.inputs.members[0].p_hex = "0000000000000000";
    },
  ],
  [
    "result",
    (p) => {
      p.record.payload.result.adjusted[2].adjusted_hex = "0";
    },
  ],
])
  await exercise("digest_tamper", "unchanged digest after " + name, "integrity:fail", edit, {
    noSeal: true,
  });
await exercise(
  "integrity_exclusion",
  "declared digest only changed",
  "integrity:fail",
  (p) => {
    p.record.integrity.content_digest = "sha256:" + "0".repeat(64);
  },
  { noSeal: true },
);
const alternate = clone(baseline.record);
alternate.integrity.content_digest = "sha256:" + "0".repeat(64);
assert.ok(projectStoredBytes(bytes(alternate)).equals(projectStoredBytes(bytes(baseline.record))));
await exercise(
  "untagged_digest",
  "untagged hash",
  "integrity:fail",
  (p) => {
    p.record.integrity.content_digest =
      "sha256:" +
      crypto
        .createHash("sha256")
        .update(projectStoredBytes(bytes(p.record)))
        .digest("hex");
  },
  { noSeal: true },
);
const baselineProjection = projectStoredBytes(bytes(baseline.record)).toString();
await exercise(
  "canonicalizer_fault",
  "faulty projection canonicalizer cannot confirm old digest",
  "refusal:projection_disagreement",
  (p) => {
    p.record.payload.result.adjusted[2].adjusted_hex = "0";
  },
  {
    noSeal: true,
    options: {
      canonicalize: (r) => (Object.hasOwn(r, "integrity") ? canonicalize(r) : baselineProjection),
    },
  },
);
for (const [name, raw, reason] of [
  ["pretty", Buffer.from(JSON.stringify(baseline.record, null, 2)), "stored_bytes_noncanonical"],
  [
    "newline",
    Buffer.concat([bytes(baseline.record), Buffer.from("\n")]),
    "stored_bytes_noncanonical",
  ],
  [
    "BOM",
    Buffer.concat([Buffer.from([239, 187, 191]), bytes(baseline.record)]),
    "record_malformed_json",
  ],
  ["bad UTF8", Buffer.from([255]), "record_utf8"],
])
  await exercise("storage_variants", name, "refusal:" + reason, null, { raw });
for (const [name, raw, reason] of [
  ["syntax before duplicates", '{"x":1,"x":2,', "record_malformed_json"],
  [
    "duplicates before Unicode",
    '{"x":1,"x":2,"y":"\\ud800","z":-0,"interpretation_bundle_id":"unknown"}',
    "record_duplicate_member",
  ],
  [
    "Unicode before negative zero",
    '{"y":"\\ud800","z":-0,"interpretation_bundle_id":"unknown"}',
    "record_invalid_unicode",
  ],
  [
    "negative zero before routing",
    '{"z":-0,"interpretation_bundle_id":"unknown"}',
    "record_negative_zero",
  ],
  [
    "depth before routing",
    '{"x":' +
      "[".repeat(CAPS.depth) +
      "0" +
      "]".repeat(CAPS.depth) +
      ',"interpretation_bundle_id":"unknown"}',
    "record_depth",
  ],
])
  await exercise("raw_priority", name, "refusal:" + reason, null, { raw: Buffer.from(raw) });
for (const [name, edit] of [
  [
    "record URI",
    (p) => {
      p.record.record_id = "urn:example:other";
    },
  ],
  [
    "revision URI",
    (p) => {
      p.record.revision_id = "urn:example:other";
    },
  ],
  [
    "unrelated declaration",
    (p) => {
      p.record.payload.declaration.analyses[1].analysis_id = "other";
    },
  ],
  [
    "member order",
    (p) => {
      p.record.payload.inputs.members.reverse();
    },
  ],
  [
    "origin",
    (p) => {
      p.record.payload.inputs.members[0].origin.source_id = "other";
    },
  ],
])
  await exercise("context_binding", name, "context:fail", edit);
await exercise(
  "revision_alias",
  "both actual revisions would map to same private carrier label",
  "context:fail",
  (p) => {
    p.record.revision_id = "urn:example:revision-2";
  },
);
const relation = await exercise(
  "relation_codes",
  "multiple relation defects",
  "declaration:fail",
  (p) => {
    p.record.payload.declaration.design.units[0].group_id = "missing";
    p.record.payload.declaration.dataset.observations[0].experimental_unit_id = "missing";
    p.expected.declaration = clone(p.record.payload.declaration);
  },
);
const d0 = JSON.parse(legacyTexts(relation.p.record, canonicalize)[0]);
const expectedCodes = checkD0(JSON.stringify(d0));
assert.ok(expectedCodes.codes.length >= 2);
assert.deepEqual(relation.result.output.checks[2].details.codes, expectedCodes.codes);
assert.equal(relation.result.output.checks[2].details.source_stage, expectedCodes.stage);
for (const k of ["analysis_id", "family_id", "result_id"])
  await exercise("ownership", "foreign " + k, "admission:fail", (p) => {
    p.record.payload.result[k] = "other";
  });
for (const k of ["adjusted_hex", "display_hex"])
  await exercise(
    "last_row",
    "last " + k,
    "arithmetic:fail",
    (p) => {
      p.record.payload.result.adjusted[2][k] = k === "adjusted_hex" ? "0" : "0000000000000000";
    },
    { calls: 1 },
  );
for (const [name, v, want] of [
  ["Number", 9007199254740992, "refusal:record_schema"],
  ["uppercase", "A", "refusal:record_schema"],
  ["leading zero", "00", "refusal:record_schema"],
  ["out of range", (U + 1n).toString(16), "admission:fail"],
])
  await exercise("precision", name, want, (p) => {
    p.record.payload.result.adjusted[0].adjusted_hex = v;
  });
for (const n of [CAPS.recordBytes - 1, CAPS.recordBytes, CAPS.recordBytes + 1])
  await exercise(
    "admission_caps",
    "raw record byte boundary " + n,
    "refusal:" + (n > CAPS.recordBytes ? "record_bytes" : "record_malformed_json"),
    null,
    { raw: Buffer.alloc(n, 32) },
  );
for (const n of [CAPS.expectedBytes - 1, CAPS.expectedBytes, CAPS.expectedBytes + 1]) {
  const t = JSON.stringify(baseline.expected);
  await exercise(
    "admission_caps",
    "external expected byte boundary " + n,
    n > CAPS.expectedBytes ? "refusal:expected_bytes" : "arithmetic:pass",
    null,
    {
      expectedText: t + " ".repeat(n - Buffer.byteLength(t)),
      calls: n > CAPS.expectedBytes ? 0 : 1,
    },
  );
}
for (const [k, n, a] of [
  [3, 1024, 1],
  [3, 1024, 16],
  [16, 1024, 16],
]) {
  const p = pair(fixture(k, n, a));
  const result = await verify(JSON.stringify(p.expected), seal(p.record), { now, runner });
  assert.ok(await validateOutput(result.output));
  if (a === 1) assert.equal(result.output.checks[4].outcome, "pass");
  else assert.equal(result.output.refusal_kind, "resource_limit");
  rows.push({
    group: "admission_caps",
    name: "layered dimensions " + [k, n, a].join("/"),
    expected: a === 1 ? "arithmetic:pass" : "resource_limit",
    observed: result.output.reason ?? "pass",
  });
}
for (const [name, run] of [
  ["malformed", async () => "{"],
  ["partial", async () => JSON.stringify({ adjusted_hex: exact.slice(1), display_hex: display })],
  [
    "out of range",
    async () =>
      JSON.stringify({
        adjusted_hex: [(U + 1n).toString(16), ...exact.slice(1)],
        display_hex: display,
      }),
  ],
  [
    "exception",
    async () => {
      throw Error("test");
    },
  ],
])
  await exercise("worker_partial", name, "arithmetic:error", null, { options: { runner: run } });
await exercise("setup_failure", "trusted setup failure", "refusal:setup_failure", null, {
  options: { failSetup: true },
});
const two = await verify(JSON.stringify(baseline.expected), bytes(baseline.record), {
  now: () => "2026-09-12T00:00:00Z",
  runner,
});
const projection = (r) => {
  const { generated_at, verifier, ...p } = r;
  return p;
};
assert.equal(canonicalize(projection(two.output)), canonicalize(projection(ok.result.output)));
assert.ok(two.verified_bytes.equals(ok.input));
rows.push({
  group: "separate_report",
  name: "separate report and stable semantic projection",
  expected: "unchanged bytes and semantics",
});
for (const [name, edit] of [
  [
    "overall",
    (r) => {
      r.overall_status = "VERIFIED";
    },
  ],
  [
    "significance",
    (r) => {
      r.significant = true;
    },
  ],
  [
    "scientific claim",
    (r) => {
      r.guarantee_boundary.scientific_validity = "verified";
    },
  ],
  [
    "errored outcome",
    (r) => {
      r.checks[4].execution = "error";
    },
  ],
  [
    "continued after failure",
    (r) => {
      r.checks[0].outcome = "fail";
      r.checks[0].reasons = ["digest_mismatch"];
    },
  ],
]) {
  const r = clone(ok.result.output);
  edit(r);
  assert.equal(await validateOutput(r), false, name);
  rows.push({ group: "no_aggregate", name, expected: "invalid report" });
}
const suite = runConformanceSuite();
assert.deepEqual(suite.issues, []);
rows.push({
  group: "legacy_regression",
  name: "all existing registered conformance fixtures",
  expected: "no change",
  fixtures: suite.executed,
});
// Snapshot before asynchronous setup: mutation by the caller cannot change this run.
const mutable = bytes(baseline.record);
const frozen = Buffer.from(mutable);
const pending = verify(JSON.stringify(baseline.expected), mutable, { now, runner });
mutable.fill(32);
const snapshot = await pending;
assert.ok(snapshot.verified_bytes.equals(frozen));
rows.push({
  group: "storage_variants",
  name: "caller mutation after invocation cannot change snapshot",
  expected: "original bytes verified",
});
const unicode = pair();
unicode.record.record_id = unicode.expected.record_id = "urn:example:é-𝄞";
const unicodeRun = await verify(JSON.stringify(unicode.expected), seal(unicode.record), {
  now,
  runner,
});
assert.equal(unicodeRun.output.checks[4].outcome, "pass");
assert.ok(
  projectStoredBytes(seal(unicode.record)).equals(
    bytes((({ integrity, ...r }) => r)(unicode.record)),
  ),
);
rows.push({
  group: "valid_baseline",
  name: "UTF-8 byte spans preserve non-ASCII opaque instance identifiers",
  expected: "arithmetic:pass",
});
const maximum = pair(fixture(16, 16, 1));
const maxRun = await verify(JSON.stringify(maximum.expected), seal(maximum.record), { now });
assert.equal(maxRun.output.checks[4].outcome, "pass");
rows.push({ group: "admission_caps", name: "120-member real worker", expected: "arithmetic:pass" });
for (const k of Object.keys(baseline.record).filter((k) => k !== "integrity")) {
  const changed = clone(baseline.record);
  changed[k] = k === "payload" ? { changed: true } : "changed";
  assert.notEqual(
    storedDigest(projectStoredBytes(bytes(changed))),
    baseline.record.integrity.content_digest,
  );
}
rows.push({
  group: "digest_tamper",
  name: "every non-integrity root field participates in stored projection",
  expected: "all eight changes alter digest",
});
const cross = clone(ok.result.output);
cross.checks[4].scope.result_id = "other";
assert.equal(await validateOutput(cross), false);
rows.push({
  group: "no_aggregate",
  name: "different local scopes across one report rejected",
  expected: "invalid report",
});

// The proposal's 24 groups all have executed coverage; labels are not individual fixture counts.
const proposed = JSON.parse(
  fs.readFileSync(new URL("../holm-envelope-coupling-plan-20260911/CASES.json", import.meta.url)),
);
assert.deepEqual(
  [...new Set(rows.map((x) => x.group))].sort(),
  proposed.cases.map((x) => x.case).sort(),
);
await artifact("example-record.jcs", bytes(baseline.record));
for (const [name, data] of [
  ["example-expected.json", baseline.expected],
  ["example-report.json", ok.result.output],
  [
    "RESULTS.json",
    {
      status: "author checks for unissued envelope exercise",
      node: process.version,
      python: process.env.NOMUE_EXPERIMENT_PYTHON,
      groups: 24,
      controls: rows.length,
      legacy_fixtures: suite.executed,
      rows,
    },
  ],
])
  await artifact(name, data);
console.log(
  `${rows.length} controls in 24 groups passed; ${suite.executed} legacy fixtures passed`,
);
