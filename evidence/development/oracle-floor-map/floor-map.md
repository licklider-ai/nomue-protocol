# Degradation-Onset Map (P_floor rule application, Batch 3 V2)

Kernel vs 60-digit mpmath oracle over the tail + floor corpora, ordered
by true p magnitude. **Rule (fixed in advance)**: P_floor = smallest p
with max relative error over all quantities `<= 1e-11` (10x margin under
the `1e-10` contract p tolerance), rounded up to a power of ten.
**Applying the rule is done here; adopting the value is a steward
decision.** Regenerate: `pnpm evidence:oracle-floor-map`.

| Dataset | True p (60-digit oracle) | Kernel p | p rel_diff | Max rel_diff (all quantities) | Worst quantity | Meets criterion |
| --- | --- | --- | --- | --- | --- | --- |
| TAIL_P_1E8 | 0.00000000968189340756478420188368496803 | 9.682e-9 | 1.709e-15 | 1.709e-15 | p_value_vs_mpmath | yes |
| TAIL_P_1E12 | 1.00125638928654478396225230371e-12 | 1.001e-12 | 4.034e-15 | 4.034e-15 | p_value_vs_mpmath | yes |
| TAIL_P_1E19 | 1.0050338303267336766289977143e-19 | 1.005e-19 | 8.743e-15 | 8.743e-15 | p_value_vs_mpmath | yes |
| FLOOR_P_1E30 | 1.00323903414864885870191757314e-30 | 1.003e-30 | 5.238e-16 | 1.083e-14 | p_value_vs_scipy | yes |
| FLOOR_P_1E50 | 9.94644465807829935235487689056e-51 | 9.946e-51 | 2.315e-14 | 2.315e-14 | p_value_vs_mpmath | yes |
| FLOOR_P_1E100 | 1.00528917367824545790101597974e-100 | 1.005e-100 | 2.512e-14 | 2.512e-14 | p_value_vs_mpmath | yes |
| FLOOR_P_1E150 | 9.99583506872138637215314731642e-151 | 9.996e-151 | 0 | 8.143e-16 | p_value_vs_scipy | yes |
| FLOOR_P_1E200 | 1.02452018304760773851872202622e-200 | 1.025e-200 | 2.831e-16 | 4.247e-16 | p_value_vs_scipy | yes |
| FLOOR_P_1E250 | 9.99583506872138180114861960626e-251 | 9.996e-251 | 1.551e-16 | 3.103e-16 | p_value_vs_scipy | yes |
| FLOOR_P_1E300 | 1.02452018304760763496268636002e-300 | 1.025e-300 | 4.854e-16 | 4.854e-16 | p_value_vs_mpmath | yes |
| TAIL_UNDERFLOW | 1.10254477919468211161526880508e-308 | 0 | 1.000e+0 | 1.000e+0 | p_value_vs_mpmath | **no** |

## Rule application result

- Smallest point meeting the criterion: `FLOOR_P_1E300` (true p 1.02452018304760763496268636002e-300).
- First point failing the criterion: `TAIL_UNDERFLOW` (true p 1.10254477919468211161526880508e-308, max rel_diff 1.000e+0 in p_value_vs_mpmath).
- **P_floor: `1e-300`** - rule-derived value, adopted by the steward on 2026-08-13 (ADR-0025 adoption record); this file itself only applies the rule and decides nothing.
