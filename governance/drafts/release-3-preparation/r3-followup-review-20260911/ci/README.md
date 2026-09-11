# Follow-up implementation CI evidence

The tested implementation head is `634abfa0bc4055c7615df433b5942d412fb49747`,
with tree `cd56f1fa3a8211662e4542e963fabc94fcac648b`, in PR #328. Standard CI
completed all five jobs; all four active R3 workflows also succeeded.
INTEGRATION.json records service-reported head, event, timestamps, job/step outcomes
and artifact identity. Its source_inputs list identifies the implementation,
workflow and instruction files preserved by the subsequent archive-only commit.
It is not a claim that the archive commit has the identical full repository tree.

Public-candidate run `34643891925`, artifact `10280939456`, observed Node 22.23.2
returning exit 78 before input access, with zero stdout/stderr, unsupported_host
public refusal, no result forwarding, and all four cleanup observations true.
The actual cgroup suite passed 33 of 33 controls and the existing receipt projection
passed 28 receipts with five original-byte forwards. The unsupported-Node receipt
is additional to those 33 controls and 28 projections. Envelope/public observations
record 82 and 93 controls. This records runtime behavior, not formal support adoption.

public-candidate.zip.base64.txt retains the original compressed bytes. MEMBERS.json
maps all six exact member names to preserved byte-identical .txt files, including
the original temporary/output path components. The original ZIP SHA-256 is
`5cb37a38197b1ae4bd00ac0804995c562b27219f802af9aca7b032fbfcb92737` and matches
GitHub's artifact digest. The same historical-evidence checker reconstructs this
archive and checks the listed source inputs against the current checkout.

Accountable role: repository contributor preserving CI observations using OpenAI
Codex on 2026-09-11. No new human review or independent methodology review of this
implementation patch is claimed. The user's reported joint review of #318–#325 is
recorded in the parent disposition. Service metadata and supervisor observations
remain bounded evidence, not signed independent attestations.
