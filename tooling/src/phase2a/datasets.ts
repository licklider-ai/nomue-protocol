/**
 * Single source of the Phase 2A numeric datasets, shared by the fixture
 * authoring (fixture inputs) and the oracle comparison (oracle inputs) so
 * the two can never drift apart silently. The same values are captured in
 * evidence/development/phase-2a/oracle/python-output.json.
 */

export interface Dataset {
  groupA: number[];
  groupB: number[];
}

export const A2_DATASETS: Record<string, Dataset> = {
  "A2-V-001": { groupA: [1.1, 2.3, 3.7, 4.1], groupB: [5.2, 7.9, 8.1] },
  "A2-V-002": { groupA: [1, 2, 3], groupB: [4, 5, 6] },
  "A2-V-003": { groupA: [10.2, 9.6, 10.9, 10.1, 9.8], groupB: [10.5, 10.9, 9.9, 10.4, 10.7] },
  "A2-V-004": { groupA: [5, 5, 5], groupB: [6, 7, 8] },
  "A2-V-005": { groupA: [1.0, 2.0], groupB: [3.5, 5.5] },
  "A2-V-006": {
    groupA: [1000000001, 1000000003, 1000000002],
    groupB: [1000000002.5, 1000000004.5, 1000000003.5],
  },
};

export const EXAMPLE_2A_DATASET: Dataset = {
  groupA: [7.9, 8.4, 8.1, 8.6, 8.2],
  groupB: [9.1, 9.6, 8.9, 9.4, 9.2],
};

/** Mapping from captured-oracle row names to the shared datasets. */
export const ORACLE_DATASETS: Record<string, Dataset> = {
  A2V001_unequal_n_var: A2_DATASETS["A2-V-001"] as Dataset,
  A2V002_negative_diff: A2_DATASETS["A2-V-002"] as Dataset,
  A2V003_ci_crosses_zero_equal_n: A2_DATASETS["A2-V-003"] as Dataset,
  A2V004_one_variance_zero: A2_DATASETS["A2-V-004"] as Dataset,
  A2V005_min_n2: A2_DATASETS["A2-V-005"] as Dataset,
  A2V006_large_magnitude: A2_DATASETS["A2-V-006"] as Dataset,
  EX2_example: EXAMPLE_2A_DATASET,
};
