import { format } from "prettier";
// Explicit authoring only; no candidate import or expected-value computation from it.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import canonicalize from "canonicalize";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const destination = path.join(here, "conformance");
fs.mkdirSync(destination, { recursive: true });
const original = JSON.parse(
  fs.readFileSync(
    new URL("../holm-separated-candidate-20260912/example-record.jcs", import.meta.url),
  ),
);
const U = 1n << 1074n;
const hash = (b) => crypto.createHash("sha256").update(b).digest("hex");
function fixture(p, adjusted, display) {
  const r = structuredClone(original);
  p.forEach((x, i) => (r.payload.inputs.members[i].p_hex = x));
  adjusted.forEach((x, i) => {
    r.payload.result.adjusted[i].adjusted_hex = x.toString(16);
    r.payload.result.adjusted[i].display_hex = display[i];
  });
  return r;
}
function expected(r) {
  return {
    record_id: r.record_id,
    revision_id: r.revision_id,
    declaration: structuredClone(r.payload.declaration),
    inputs: structuredClone(r.payload.inputs),
  };
}
function bytes(r) {
  const { integrity, ...body } = r;
  integrity.content_digest =
    "sha256:" + hash(Buffer.from("nomue/record-content/v1\n" + canonicalize(body)));
  return Buffer.from(canonicalize(r));
}
// Independently stated small-family expectations:
// (0, 1/4, 1) -> (0, 1/2, 1); tied 1/8 -> all 3/8;
// lattice inputs (1,2,3) -> (3,4,4), representable exactly as subnormals.
const base = () =>
  fixture(
    ["0000000000000000", "3fd0000000000000", "3ff0000000000000"],
    [0n, U / 2n, U],
    ["0000000000000000", "3fe0000000000000", "3ff0000000000000"],
  );
const pass = {
  kind: "report",
  stages: ["pass", "pass", "pass", "pass", "pass"],
  reasons: [[], [], [], [], []],
  forward: true,
};
const rows = [];
function add(id, r, e, want, raw) {
  const data = raw ?? bytes(r);
  const context = Buffer.from(JSON.stringify(e, null, 2) + "\n");
  fs.writeFileSync(path.join(destination, id + ".jcs"), data);
  fs.writeFileSync(path.join(destination, id + "-expected.json"), context);
  rows.push({
    fixture_id: id,
    record: "conformance/" + id + ".jcs",
    expected_context: "conformance/" + id + "-expected.json",
    record_sha256: hash(data),
    expected_context_sha256: hash(context),
    expected: want,
  });
}
let r = base();
add("R3-HOLM-P001", r, expected(r), pass);
r = fixture(
  Array(3).fill("3fc0000000000000"),
  Array(3).fill((3n * U) / 8n),
  Array(3).fill("3fd8000000000000"),
);
add("R3-HOLM-P002", r, expected(r), pass);
r = fixture(
  ["0000000000000001", "0000000000000002", "0000000000000003"],
  [3n, 4n, 4n],
  ["0000000000000003", "0000000000000004", "0000000000000004"],
);
add("R3-HOLM-P003", r, expected(r), pass);
r = base();
r.payload.result.adjusted[1].adjusted_hex = (U / 2n + 1n).toString(16);
add("R3-HOLM-N001", r, expected(r), {
  kind: "report",
  stages: ["pass", "pass", "pass", "pass", "fail"],
  reasons: [[], [], [], [], ["candidate:holm:exact_value_mismatch"]],
  forward: false,
});
r = base();
let e = expected(r);
e.record_id = "urn:other:record";
add("R3-HOLM-N002", r, e, {
  kind: "report",
  stages: ["pass", "fail", "not_run", "not_run", "not_run"],
  reasons: [
    [],
    ["candidate:holm:context_mismatch"],
    ...Array(3).fill(["candidate:holm:prerequisite_failed"]),
  ],
  forward: false,
});
r = base();
r.payload.declaration.dataset.observations[0].experimental_unit_id = "missing-unit";
add("R3-HOLM-N003", r, expected(r), {
  kind: "report",
  stages: ["pass", "pass", "fail", "not_run", "not_run"],
  reasons: [
    [],
    [],
    ["candidate:holm:declaration_invalid"],
    ...Array(2).fill(["candidate:holm:prerequisite_failed"]),
  ],
  forward: false,
});
r = base();
r.payload.inputs.members[0].p_hex = "8000000000000000";
add("R3-HOLM-N004", r, expected(r), {
  kind: "report",
  stages: ["pass", "pass", "pass", "fail", "not_run"],
  reasons: [
    [],
    [],
    [],
    ["candidate:holm:holm_input_invalid"],
    ["candidate:holm:prerequisite_failed"],
  ],
  forward: false,
});
r = base();
r.interpretation_bundle_id = r.interpretation_bundle_id.replace("candidate.4", "candidate.3");
add("R3-HOLM-N005", r, expected(r), {
  kind: "refusal",
  reason: "candidate:holm:bundle_unsupported",
  forward: false,
});
r = base();
add(
  "R3-HOLM-N006",
  r,
  expected(r),
  { kind: "refusal", reason: "candidate:holm:record_duplicate_member", forward: false },
  Buffer.from('{"x":1,"x":2}'),
);
for (const row of rows) {
  const f = path.join(here, row.expected_context);
  const formatted = await format(fs.readFileSync(f, "utf8"), { filepath: f, printWidth: 100 });
  fs.writeFileSync(f, formatted);
  row.expected_context_sha256 = hash(Buffer.from(formatted));
}
fs.writeFileSync(
  path.join(here, "FIXTURES.json"),
  JSON.stringify(
    {
      status:
        "unissued proposed fixture IDs; expectations authored before candidate execution; not conformance registry authority",
      numerical_basis:
        "Fixed rational families and exact lattice integers, independently stated in author_fixtures.mjs. Existing declaration shape reused, numerical result overwritten without candidate execution.",
      fixtures: rows,
    },
    null,
    2,
  ) + "\n",
);

const manifestPath = path.join(here, "FIXTURES.json");
fs.writeFileSync(
  manifestPath,
  await format(fs.readFileSync(manifestPath, "utf8"), { filepath: manifestPath, printWidth: 100 }),
);
