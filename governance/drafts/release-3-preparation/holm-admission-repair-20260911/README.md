# Admission provenance repair

The paired-start method is unchanged from PR #319. This successor records the
measurement script, preparation script, input example, checked-out commit and tree,
event name, event head and run ID. PR event head and synthetic merge checkout are
separate fields. The job allows 35 minutes to retain the bounded worst-case trial
sequence; an infrastructure job timeout can still prevent complete observations.

The local path is entry-only evidence and does not exercise the supervisor,
controller pins or cache reset. Actual admission evidence comes from the explicit
disposable-host workflow. Historical CI values and review snapshots are preserved
in their original archive, with limitations in the central repair disposition.
