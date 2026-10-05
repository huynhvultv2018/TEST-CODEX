# P12.2B — Risk register

Technical blocking gates: P0=0, P1=0. Remaining total tracked classified findings: P2=1, P3=3 (one new storage limitation + two inherited Geometry deferrals). Candidate is ready for controlled Windows retest, not Production.

| ID | Class | Status | Impact / disposition |
| --- | --- | --- | --- |
| P11-F01 | P2 | PATCHED_AWAITING_WINDOWS_RETEST | New large lesson persistence now IDB; cloud full-LS test passes. Do not mark FIXED until GV Windows retest. Old LS full payload intentionally retained, so small preference/tool-state writes may still hit old quota; no P12.2C cleanup authorized. |
| P12.2B-STAGE-01 | P3 | OPEN_DEFERRED | Interrupted/failed different revisions may retain hidden pending records/assets and consume finite IDB quota. Same-revision retry idempotent; deleted id's stages removed; no automatic staging eviction. Does not expose unverified target or delete source. Future maintenance requires separate scope. |
| G4-F02 | P3 | OPEN_DEFERRED (inherited) | Preserve approved Geometry deferral; profile patch outside scope. |
| G4-F04 | P3 | OPEN_DEFERRED (inherited) | Preserve approved Geometry deferral; profile patch outside scope. |

G4-F01 targeted PASS and G4-F03 FIXED are historical. G4-F05 VALIDATION_PENDING remains unclassified. Real Ti09/Ti10 file validation = NOT_RUN_BY_GV_DECISION; no retry, no fabricated acceptance. P12-F01 subject compatibility is technically preserved; new storage Windows reacceptance remains unrun.

Operational limits: browser storage quota/eviction or disk exhaustion; private mode/profile/origin separation; crypto.subtle requires trusted loopback/HTTPS; full-LS old data remains until approved P12.2C. DB-unavailable fresh process cannot confirm latest DB revision/tombstones, so warns when using structurally verified historical legacy copy. After updating a migrated lesson, stale legacy fallback is rejected when provenance is available. New lesson with no valid legacy cannot fallback; active RAM lesson is preserved and user warned. If storage is available but native activation fails, saved target may remain valid in library; activation is not falsely reported successful. If restoration itself fails, UI reports incomplete display restoration instead of guaranteeing it.

Backup must include actual Chrome profile and original package files, with Chrome closed. This cloud task never accesses real GV browser data. All cloud failure tests used disposable origins. No automatic cleanup, DB downgrade/reset, localStorage.clear, foreign key deletion or Production modification. Windows, physical TV, classroom and audible TTS UNRUN.
