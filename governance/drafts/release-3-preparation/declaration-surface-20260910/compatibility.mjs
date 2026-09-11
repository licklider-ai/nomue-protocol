import assert from "node:assert/strict";
import fs from "node:fs";
import { parseStrictJson } from "../../../../reference/verifier/src/strict-json.ts";
import { jcsCanonicalize } from "../../../../reference/verifier/src/jcs.ts";
import { ingressAcceptCanonicalBytes } from "../../../../reference/verifier/src/ingress.ts";
import { routeParsedInput } from "../../../../reference/verifier/src/verify.ts";
import { loadVerifierResources } from "../../../../reference/verifier/src/resources.ts";
const example = fs.readFileSync(new URL("./example.json", import.meta.url), "utf8");
const d = parseStrictJson(example),
  canonical = jcsCanonicalize(d),
  results = [];
function test(name, fn) {
  fn();
  results.push({ name, passed: true });
}
test("existing-ingress-rejects-pretty-exercise-bytes", () =>
  assert.equal(ingressAcceptCanonicalBytes(example).reason, "not_canonical_bytes"));
test("existing-ingress-preserves-canonical-bytes", () =>
  assert.deepEqual(ingressAcceptCanonicalBytes(canonical), { accepted: true, bytes: canonical }));
test("existing-jcs-idempotent", () =>
  assert.equal(jcsCanonicalize(parseStrictJson(canonical)), canonical));
test("jcs-does-not-sort-arrays", () => {
  const changed = structuredClone(d);
  changed.design.groups.reverse();
  assert.notEqual(jcsCanonicalize(changed), canonical);
});
const resources = loadVerifierResources();
test("exercise-does-not-route-as-a-Record", () =>
  assert.deepEqual(routeParsedInput(d, resources).reasonCodes, ["NRS-BUNDLE-ID-MISSING"]));
const bundle = "unissued-d0-declaration-exercise";
test("exercise-label-is-not-a-supported-bundle", () =>
  assert.deepEqual(routeParsedInput({ interpretation_bundle_id: bundle }, resources).reasonCodes, [
    "NRS-UNSUPPORTED-BUNDLE",
  ]));
for (const id of resources.bundles.keys()) {
  test("existing-exact-bundle-" + id, () =>
    assert.equal(
      routeParsedInput({ interpretation_bundle_id: id }, resources).decision,
      "selected",
    ),
  );
  test("nearby-bundle-refused-" + id, () =>
    assert.equal(
      routeParsedInput({ interpretation_bundle_id: id + "-nearby" }, resources).kind,
      "unsupported_bundle",
    ),
  );
}
console.log(
  JSON.stringify(
    {
      scope: "unchanged ingress, canonicalization and routing; not full numerical regression",
      total: results.length,
      results,
    },
    null,
    2,
  ),
);
