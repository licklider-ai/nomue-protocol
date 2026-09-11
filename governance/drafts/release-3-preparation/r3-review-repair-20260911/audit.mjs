// Focused source lint plus mutation controls. This is not a proof against aliased code.
import fs from "node:fs";
import assert from "node:assert/strict";
import { parsers } from "prettier/plugins/babel";
const here = new URL("../holm-repaired-candidate-20260911/", import.meta.url);
const approved = new Set([
  'JSON.parse(fs.readFileSync(local("./identities.json"), "utf8"))',
  'JSON.parse(fs.readFileSync(local("./diagnostics.json"), "utf8"))',
  'JSON.parse(fs.readFileSync(local("./declaration-shapes.json"), "utf8"))',
  'JSON.parse(fs.readFileSync(local("./INPUTS.json"), "utf8"))',
  "JSON.parse(b)",
  'JSON.parse(fs.readFileSync(new URL(n, import.meta.url), "utf8"))',
]);
const compact = (s) => s.replace(/\s/g, "").replaceAll(",)", ")");
const allowed = new Set([...approved].map(compact));
function audit(text) {
  const errors = [];
  const file = parsers.babel.parse(text, {});
  function walk(n) {
    if (!n || typeof n !== "object") return;
    if (n.type === "CallExpression") {
      const target = text.slice(n.callee.start, n.callee.end);
      if (target === "JSON.parse" && !allowed.has(compact(text.slice(n.start, n.end))))
        errors.push("unsanctioned raw parse");
      if (["eval", "Function", "fetch"].includes(target)) errors.push("execution or dereference");
    }
    if (
      n.type === "ObjectProperty" &&
      ["overall_status", "is_valid", "VERIFIED"].includes(n.key.name ?? n.key.value)
    )
      errors.push("aggregate status");
    for (const [k, v] of Object.entries(n))
      if (!["loc", "tokens", "comments"].includes(k)) {
        if (Array.isArray(v)) v.forEach(walk);
        else if (v && typeof v === "object") walk(v);
      }
  }
  walk(file);
  return errors;
}
for (const n of ["envelope.mjs", "entry.mjs", "public.mjs", "present.mjs", "budget.mjs"]) {
  const source = fs.readFileSync(new URL(n, here), "utf8");
  assert.deepEqual(audit(source), [], n);
}
for (const code of [
  "JSON.parse(recordText);",
  "fetch(record.url);",
  "eval(record.code);",
  'const x={overall_status:"pass"};',
])
  assert.ok(audit(code).length);
console.log("candidate source lint passed; four inserted violations rejected");
