# Student-t df=1 center reference intake

Status: informative implementation-maintenance evidence; no Protocol authority.

## Scope

This intake adopts nomue-verifier commit
`731d5a4fcd3ee67f7690d8087948e44239cbb165`, which corrects loss of
representable precision in the Student-t CDF near zero when the degrees of
freedom equal one. The affected path can otherwise quantize a nonzero test
statistic to CDF `0.5` and a two-sided p-value to `1`.

The independent oracle is the exact Cauchy identity for one degree of freedom:

`F(t; 1) = 1/2 + atan(t) / pi`.

For `t = 7.45e-9`, binary64 evaluation of that identity gives CDF
`0.5000000023714086` and two-sided p-value `0.9999999952571827`. The regression
also confirms that the existing 0.2.1 relative-only p-value comparison rejects
a declared value of `1` at relative tolerance `1e-10`.

## Correction ledger

| Item                        | Old value                                                          | New value                                                          | Rationale                                                             |
| --------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Upstream source pin         | `ebcb3a37ef721dd8c350a451d65381098757ef44`                         | `731d5a4fcd3ee67f7690d8087948e44239cbb165`                         | Consume the reviewed and merged verifier correction.                  |
| `t-distribution.ts` SHA-256 | `dea980acb7687382305d5467ece7db0758041f41f2cd1f3daa33f69bf6177089` | `696a92c6c7aa433647f0d2968c6e60eb3f9c648865965b2c622424a9998718d7` | Bind the exact corrected source bytes.                                |
| df=1 center evaluation      | External dependency path                                           | Exact Cauchy form for `abs(t) <= 1`                                | Avoid center cancellation while retaining the dependency's tail path. |

## Protocol and release impact

- No specification, registry, schema, conformance fixture, tolerance, reason
  code, bundle, or Public Check identifier changes.
- Existing signed Release 1 artifacts and historical fixture bytes remain
  unchanged. This is maintenance of the Release 1 Welch implementation path
  and refreshes implementation evidence associated with numerical assurance.
- Release 2 may consume the corrected shared Student-t primitive during its open
  M2/R2-D5 numerical work, but this intake does not approve or freeze any
  Release 2 candidate meaning.
- Releases 3, 4, and 5 have no direct responsibility for this correction; their
  candidate work must continue to preserve historical exact dispatch.

Because neither comparison semantics nor tolerance changes, Public Check
versioning is unchanged.
