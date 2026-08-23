<!--
GENERATED FILE - DO NOT EDIT.

Source artifacts:
- registries/public-contract-surfaces.yaml (sha256:362f12e80ca5826c105e7a475ddb3ca9242505c7363dfa21b25774a46a9c168a)

Generation command: pnpm generate
-->

# Public Contract Surfaces Index

Non-authoritative view of the public contract surface registry. Phase 1
surfaces are candidates; none is frozen.

| Surface | Title | Stability | Status | Paths |
| --- | --- | --- | --- | --- |
| NRS-PCS-0001 | Record envelope | STABLE-INTENT | candidate | `$schema`, `record_type`, `record_id`, `revision_id`, `created_at`, `interpretation_bundle_id`, `profile_id`, `payload`, `integrity` |
| NRS-PCS-0002 | Dataset and observation structure | STABLE-INTENT | candidate | `payload.dataset.dataset_id`, `payload.dataset.observations[].observation_id`, `payload.dataset.observations[].experimental_unit_id`, `payload.dataset.observations[].group_id`, `payload.dataset.observations[].outcome_value` |
| NRS-PCS-0003 | ITGC design declaration (Phase 1) | STABLE-INTENT | candidate | `payload.design.design_id`, `payload.design.dataset_id`, `payload.design.experimental_unit_type`, `payload.design.groups[].group_id`, `payload.design.groups[].label`, `payload.design.group_order`, `payload.design.outcome`, `payload.design.independence_declared` |
| NRS-PCS-0004 | Welch analysis declaration | STABLE-INTENT | candidate | `payload.analysis.analysis_id`, `payload.analysis.design_id`, `payload.analysis.method_id`, `payload.analysis.alternative` |
| NRS-PCS-0005 | Declared Welch result (Phase 1) | STABLE-INTENT | candidate | `payload.result.result_id`, `payload.result.analysis_id`, `payload.result.group_summaries[].group_id`, `payload.result.group_summaries[].n`, `payload.result.group_summaries[].mean`, `payload.result.group_summaries[].sample_variance`, `payload.result.mean_difference`, `payload.result.test_statistic`, `payload.result.degrees_of_freedom`, `payload.result.p_value` |
| NRS-PCS-0006 | Integrity metadata | STABLE-INTENT | candidate | `integrity.canonicalization_id`, `integrity.digest_algorithm`, `integrity.digest_scope`, `integrity.content_digest` |
| NRS-PCS-0007 | Verification report (Phase 1) | STABLE-INTENT | candidate | `$schema`, `report_type`, `record_reference`, `interpretation_bundle_id`, `verifier`, `generated_at`, `conformance`, `verification_results`, `guarantee_boundary` |
| NRS-PCS-0008 | Public-check result object (Phase 1) | STABLE-INTENT | candidate | `verification_results[].check_id`, `verification_results[].check_version`, `verification_results[].execution`, `verification_results[].outcome`, `verification_results[].scope`, `verification_results[].reason_codes`, `verification_results[].evidence`, `verification_results[].error` |
| NRS-PCS-0009 | ITGC admissibility declarations | STABLE-INTENT | candidate | `payload.design.declarations.grouping_structure`, `payload.design.declarations.pairing`, `payload.design.declarations.repeated_measurements`, `payload.design.declarations.clustering`, `payload.design.data_handling.analysis_population`, `payload.design.data_handling.missing_outcomes`, `payload.design.data_handling.transformation`, `payload.design.data_handling.weighting` |
| NRS-PCS-0010 | Mean-difference effect estimate and confidence interval | STABLE-INTENT | candidate | `payload.analysis.estimand.kind`, `payload.analysis.estimand.direction`, `payload.analysis.confidence_level`, `payload.result.effect_estimate.kind`, `payload.result.effect_estimate.estimate`, `payload.result.effect_estimate.standard_error`, `payload.result.effect_estimate.confidence_interval.method_id`, `payload.result.effect_estimate.confidence_interval.confidence_level`, `payload.result.effect_estimate.confidence_interval.lower`, `payload.result.effect_estimate.confidence_interval.upper`, `payload.result.test.test_statistic`, `payload.result.test.degrees_of_freedom`, `payload.result.test.p_value` |
| NRS-PCS-0011 | Profile-admissibility and computability check results | STABLE-INTENT | candidate | `$schema`, `report_type`, `record_reference`, `interpretation_bundle_id`, `conformance`, `verification_results[].check_id`, `verification_results[].check_version`, `verification_results[].execution`, `verification_results[].outcome`, `verification_results[].scope`, `verification_results[].reason_codes`, `verification_results[].evidence.unsupported_declarations`, `guarantee_boundary.scientific_validity`, `guarantee_boundary.declaration_truth`, `guarantee_boundary.distributional_model_validity`, `guarantee_boundary.causal_interpretation`, `guarantee_boundary.standardized_effect_size` |
| NRS-PCS-0012 | Verifier refusal artifact | STABLE-INTENT | candidate | `$schema`, `output_type`, `refusal_kind`, `reason_codes`, `message`, `verifier`, `input_evidence`, `generated_at` |
| NRS-PCS-0013 | Verifier routing envelope | STABLE-INTENT | candidate | `interpretation_bundle_id` |
