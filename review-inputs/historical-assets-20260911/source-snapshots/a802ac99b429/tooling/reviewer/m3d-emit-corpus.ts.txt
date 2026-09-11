import { writeFileSync } from "node:fs";
import { evaluatePairedTCIEndpointTruthCandidate } from "../src/spikes/paired-t-ci-endpoint-truth-error-candidate.js";

function inputFromDifferences(differences: readonly number[]) {
  return {
    conditionOrder: ["first", "second"] as const,
    repeatedMeasurements: "none" as const,
    observations: differences.flatMap((difference, index) => [
      {
        observationId: `oracle-${index}-first`,
        experimentalUnitId: `oracle-unit-${index}-first`,
        pairId: `oracle-p${index.toString().padStart(3, "0")}`,
        conditionId: "first",
        outcomeValue: difference,
      },
      {
        observationId: `oracle-${index}-second`,
        experimentalUnitId: `oracle-unit-${index}-second`,
        pairId: `oracle-p${index.toString().padStart(3, "0")}`,
        conditionId: "second",
        outcomeValue: 0,
      },
    ]),
  };
}

function binary64Hex(value: number): string {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, value, false);
  return view.getBigUint64(0, false).toString(16).padStart(16, "0");
}

const cases: Array<{ label: string; differences: number[] }> = [
  { label: "df1", differences: [1, 3] },
  { label: "df2", differences: [1, 2, 3] },
  {
    label: "df30",
    differences: Array.from({ length: 31 }, (_, index) => 1 + (index % 7)),
  },
  {
    label: "df100",
    differences: Array.from({ length: 101 }, (_, index) => 2 + (index % 9)),
  },
  {
    label: "df200",
    differences: Array.from({ length: 201 }, (_, index) => 3 + (index % 11)),
  },
  { label: "negative", differences: [-1, -2, -4] },
  { label: "zero-cross", differences: [-1, 0, 1] },
  { label: "large-finite", differences: [0.9e150, 1e150, 1.05e150, 1.1e150] },
  {
    label: "small-se-noncollapse",
    differences: [1, 1 + 2 ** -40, 1 + 2 * 2 ** -40, 1 + 3 * 2 ** -40],
  },
];

const successes = cases.map(({ label, differences }) => {
  const result = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences(differences));
  if (!result.ok) throw new Error(`${label}: unexpected refusal ${result.classification}`);
  return {
    label,
    difference_binary64_hex: differences.map(binary64Hex),
    envelope: result.envelope,
  };
});

const nextAfterOne = 1 + Number.EPSILON;
const collapseDifferences = Array.from({ length: 201 }, (_, index) =>
  index % 2 === 0 ? nextAfterOne : 1,
);
const collapse = evaluatePairedTCIEndpointTruthCandidate(inputFromDifferences(collapseDifferences));
if (collapse.ok) throw new Error("endpoint-collapse witness unexpectedly succeeded");

const output = process.argv[2];
if (output === undefined) throw new Error("output path required");
writeFileSync(
  output,
  `${JSON.stringify(
    {
      successes,
      collapse: {
        difference_binary64_hex: collapseDifferences.map(binary64Hex),
        result: collapse,
      },
    },
    null,
    2,
  )}\n`,
);
