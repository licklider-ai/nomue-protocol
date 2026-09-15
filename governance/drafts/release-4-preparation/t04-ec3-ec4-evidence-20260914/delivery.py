"""Execution failures are sticky and authoritative over any arriving report."""
def finalize(row):
    report = row.get('report')
    reasons = list(row.get('execution_failure_reasons', []))

    def failed(reason):
        if reason and reason not in reasons:
            reasons.append(reason)

    outer = row.get('outer_failure')
    state = row.get('container_final', {})
    # Retain the original failure; refine a generic container exit to known OOM.
    if outer != 'container_exit':
        failed(outer)
    if state.get('OOMKilled'):
        failed('tree_memory_limit')
    failed(outer)
    if 'harness_error' in row:
        failed(row['harness_error'] or 'execution_error')
    if state.get('Error') or state.get('ExitCode', 0) != 0:
        failed('container_exit')
    if isinstance(report, dict):
        receipts = report.get('receipts', {})
        if not isinstance(receipts, dict):
            failed('invalid_worker_output')
            receipts = {}
        for phase, receipt in receipts.items():
            if not isinstance(receipt, dict):
                failed('invalid_worker_output')
                continue
            category = receipt.get('category')
            if category and category != 'completed_transport':
                failed(str(phase)+':'+str(category))
            causes = receipt.get('causes', [])
            if not isinstance(causes, list):
                failed('invalid_worker_output')
                causes = []
            for cause in causes:
                failed(str(phase)+':'+str(cause))
        if report.get('execution') == 'execution_refusal':
            failed(report.get('reason') or 'invalid_worker_output')
    if not row.get('cleanup_ok') or state.get('Running') or state.get('Pid', 0) != 0:
        failed('cleanup_failure')
    if report is None:
        if not reasons:
            failed('missing_report')
    elif (not isinstance(report, dict) or 'result' not in report
          or report.get('execution') not in ('completed_candidate', 'completed_candidate_gate', 'execution_refusal')
          or (report['execution'] != 'execution_refusal' and not isinstance(report['result'], dict))):
        failed('invalid_worker_output')
    if reasons:
        row['execution_failure_reasons'] = reasons
        # Keep an already-safe refusal receipt for diagnostics, but never a
        # completed/partial numerical report. The hash preserves its binding.
        if report is not None and (not isinstance(report, dict)
                or report.get('execution') != 'execution_refusal' or report.get('result') is not None):
            row['quarantined_report_sha256'] = row.get('report_sha256')
            row['report'] = None
        return {'execution': 'execution_refusal', 'reason': reasons[0], 'result': None}
    return {'execution': report['execution'], 'reason': report.get('reason'), 'result': report['result']}
