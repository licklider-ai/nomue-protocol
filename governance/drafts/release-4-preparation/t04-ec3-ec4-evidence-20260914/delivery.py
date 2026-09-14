"""Final research outcome: cleanup completion is a prerequisite to delivery."""
def finalize(row):
    report=row.get('report')
    if not row.get('cleanup_ok'):
        row['quarantined_report_sha256']=row.get('report_sha256')
        row['report']=None
        return {'execution':'execution_refusal','reason':'cleanup_failure','result':None}
    if report is None:
        reason=('tree_memory_limit' if row.get('container_final',{}).get('OOMKilled')
                else row.get('outer_failure','missing_report'))
        return {'execution':'execution_refusal','reason':reason,'result':None}
    return {'execution':report['execution'],'reason':report.get('reason'),'result':report['result']}
