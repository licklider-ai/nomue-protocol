import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}
function write(path, value) {
  fs.writeFileSync(path, value);
}
function replaceOne(path, before, after) {
  const source = read(path);
  const count = source.split(before).length - 1;
  if (count !== 1) throw new Error(`${path}: expected one match for ${JSON.stringify(before)}, got ${count}`);
  write(path, source.replace(before, after));
}
function replaceAllChecked(path, before, after, minimum = 1) {
  const source = read(path);
  const count = source.split(before).length - 1;
  if (count < minimum) throw new Error(`${path}: expected at least ${minimum} matches for ${JSON.stringify(before)}, got ${count}`);
  write(path, source.split(before).join(after));
}
function updateJson(path, mutate) {
  const value = JSON.parse(read(path));
  mutate(value);
  write(path, `${JSON.stringify(value, null, 2)}\n`);
}

const tailJson = "governance/drafts/release-2-candidate/numerical/tail-numerical-selection-candidate.json";
const tailTs = "tooling/src/spikes/paired-t-tail-numerical-selection-candidate.ts";
const tailTest = "tooling/tests/paired-t-tail-numerical-selection-candidate.test.ts";
const pJson = "governance/drafts/release-2-candidate/numerical/p-value-enclosure-evidence-closure-candidate.json";
const pTs = "tooling/src/spikes/paired-t-p-value-enclosure-evidence-closure-candidate.ts";
const pTest = "tooling/tests/paired-t-p-value-enclosure-evidence-closure-candidate.test.ts";
const readinessJson = "governance/drafts/release-2-candidate/numerical/evidence-readiness.json";
const readinessTs = "tooling/src/spikes/paired-t-numerical-readiness.ts";
const readinessTest = "tooling/tests/paired-t-numerical-readiness.test.ts";

updateJson(tailJson, (value) => {
  value.decision_state = "independently_reviewed_input_specific_bound_selection";
  value.m2_closed = true;
  value.closure_state.independent_selection_review = "complete";
});
replaceOne(tailTs, 'decision_state: "input_specific_bound_selection_candidate_pending_independent_review",', 'decision_state: "independently_reviewed_input_specific_bound_selection",');
replaceOne(tailTs, "  m2_closed: false,", "  m2_closed: true,");
replaceOne(tailTs, '    independent_selection_review: "pending",', '    independent_selection_review: "complete",');
replaceAllChecked(tailTs, "tail numerical selection checkpoint differs from the pending-review candidate", "tail numerical selection checkpoint differs from the reviewed M2 candidate", 2);
replaceOne(tailTest, '      decision_state: "input_specific_bound_selection_candidate_pending_independent_review",', '      decision_state: "independently_reviewed_input_specific_bound_selection",');
replaceOne(tailTest, "      m2_closed: false,", "      m2_closed: true,");
replaceOne(tailTest, '        independent_selection_review: "pending",', '        independent_selection_review: "complete",');

updateJson(pJson, (value) => {
  value.decision_state = "independently_reviewed_p_value_enclosure_evidence";
  value.p_value_enclosure_evidence_closed = true;
  value.m2_closed = true;
  for (const item of Object.values(value.closure_items)) item.evidence_status = "reviewed_closed";
  value.closure_state.independent_numerical_review = "complete";
  value.closure_state.readiness_admission = "admitted";
  value.closure_state.p_value_enclosure_evidence = "reviewed_complete";
});
replaceOne(pTs, 'decision_state: "fixed_evidence_artifact_pending_independent_numerical_review",', 'decision_state: "independently_reviewed_p_value_enclosure_evidence",');
replaceOne(pTs, "  p_value_enclosure_evidence_closed: false,", "  p_value_enclosure_evidence_closed: true,");
replaceOne(pTs, "  m2_closed: false,", "  m2_closed: true,");
replaceAllChecked(pTs, 'evidence_status: "present_pending_independent_review",', 'evidence_status: "reviewed_closed",', 5);
replaceOne(pTs, 'evidence_status: "source_and_negative_reproduction_pending_independent_review",', 'evidence_status: "reviewed_closed",');
replaceOne(pTs, '    independent_numerical_review: "pending",', '    independent_numerical_review: "complete",');
replaceOne(pTs, '    readiness_admission: "held_pending_independent_numerical_review",', '    readiness_admission: "admitted",');
replaceOne(pTs, '    p_value_enclosure_evidence: "closure_candidate_not_closed",', '    p_value_enclosure_evidence: "reviewed_complete",');
replaceAllChecked(pTs, "p-value evidence closure checkpoint differs from the pending-review candidate", "p-value evidence closure checkpoint differs from the reviewed M2 candidate", 2);
replaceOne(pTest, '  it("pins one unissued artifact receipt while keeping p evidence and M2 open", () => {', '  it("records reviewed p evidence and M2 closure without selecting support", () => {');
replaceOne(pTest, '      decision_state: "fixed_evidence_artifact_pending_independent_numerical_review",', '      decision_state: "independently_reviewed_p_value_enclosure_evidence",');
replaceOne(pTest, "      p_value_enclosure_evidence_closed: false,", "      p_value_enclosure_evidence_closed: true,");
replaceOne(pTest, "      m2_closed: false,", "      m2_closed: true,");
replaceOne(pTest, '        independent_numerical_review: "pending",', '        independent_numerical_review: "complete",');
replaceOne(pTest, '        readiness_admission: "held_pending_independent_numerical_review",', '        readiness_admission: "admitted",');
replaceOne(pTest, '  it("does not alter the current numerical-readiness incompleteness", () => {', '  it("matches the aggregate reviewed M2 readiness state", () => {');
replaceOne(pTest, '    expect(readiness.p_value_enclosure_evidence.closure).toBe("incomplete");', '    expect(readiness.p_value_enclosure_evidence.closure).toBe("reviewed_complete");');
replaceOne(pTest, "    expect(readiness.tail_numerical_selection_candidate.m2_closed).toBe(false);", "    expect(readiness.tail_numerical_selection_candidate.m2_closed).toBe(true);");

updateJson(readinessJson, (value) => {
  value.tail_numerical_selection_candidate.closure = "reviewed_input_specific_selection";
  value.tail_numerical_selection_candidate.independent_selection_review_complete = true;
  value.tail_numerical_selection_candidate.m2_closed = true;
  value.p_value_enclosure_evidence.closure = "reviewed_complete";
});
replaceOne(readinessTs, '    closure: "selection_candidate_pending_independent_review";', '    closure: "reviewed_input_specific_selection";');
replaceOne(readinessTs, "    independent_selection_review_complete: false;", "    independent_selection_review_complete: true;");
replaceOne(readinessTs, "    m2_closed: false;", "    m2_closed: true;");
replaceOne(readinessTs, '  p_value_enclosure_evidence: {\n    closure: "incomplete";', '  p_value_enclosure_evidence: {\n    closure: "reviewed_complete";');
replaceOne(readinessTs, '    tailNumericalSelectionCandidate.closure !== "selection_candidate_pending_independent_review" ||', '    tailNumericalSelectionCandidate.closure !== "reviewed_input_specific_selection" ||');
replaceOne(readinessTs, "    tailNumericalSelectionCandidate.independent_selection_review_complete !== false ||", "    tailNumericalSelectionCandidate.independent_selection_review_complete !== true ||");
replaceOne(readinessTs, "    tailNumericalSelectionCandidate.m2_closed !== false ||", "    tailNumericalSelectionCandidate.m2_closed !== true ||");
replaceAllChecked(readinessTs, "tail numerical selection must remain input-specific, pending independent review, and non-runtime", "tail numerical selection must remain reviewed input-specific M2 closure and non-runtime", 1);
replaceOne(readinessTs, '    candidate.p_value_enclosure_evidence.closure !== "incomplete" ||\n    candidate.fixed_95_critical_value_evidence.closure !== "incomplete"', '    candidate.p_value_enclosure_evidence.closure !== "reviewed_complete" ||\n    candidate.fixed_95_critical_value_evidence.closure !== "incomplete"');
replaceOne(readinessTs, '    errors.push("certificate evidence cannot be marked closed by this readiness increment");', '    errors.push("p-value evidence must remain reviewed complete while critical-value evidence remains incomplete");');

const oldEvidenceTest = `  it("rejects a premature evidence-closure claim", () => {\n    const candidate = loadReadiness();\n    candidate.p_value_enclosure_evidence.closure = "closed" as never;\n    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(\n      "certificate evidence cannot be marked closed by this readiness increment",\n    );\n  });`;
const newEvidenceTest = `  it("keeps p-value evidence reviewed while critical-value evidence remains open", () => {\n    const demoted = loadReadiness();\n    demoted.p_value_enclosure_evidence.closure = "incomplete" as never;\n    expect(validatePairedTNumericalReadinessCandidate(demoted)).toContain(\n      "p-value evidence must remain reviewed complete while critical-value evidence remains incomplete",\n    );\n\n    const promoted = loadReadiness();\n    promoted.fixed_95_critical_value_evidence.closure = "closed" as never;\n    expect(validatePairedTNumericalReadinessCandidate(promoted)).toContain(\n      "p-value evidence must remain reviewed complete while critical-value evidence remains incomplete",\n    );\n  });`;
replaceOne(readinessTest, oldEvidenceTest, newEvidenceTest);
replaceOne(readinessTest, '  it("records the tail numerical selection as input-specific and pending review", () => {', '  it("records the independently reviewed input-specific tail selection as M2 closed", () => {');
replaceOne(readinessTest, '      closure: "selection_candidate_pending_independent_review",', '      closure: "reviewed_input_specific_selection",');
replaceOne(readinessTest, "      independent_selection_review_complete: false,", "      independent_selection_review_complete: true,");
replaceOne(readinessTest, "      m2_closed: false,", "      m2_closed: true,");
replaceAllChecked(readinessTest, "tail numerical selection must remain input-specific, pending independent review, and non-runtime", "tail numerical selection must remain reviewed input-specific M2 closure and non-runtime", 2);

console.log("M2 integration materialization complete");
