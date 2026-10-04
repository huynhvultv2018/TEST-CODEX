# Patch decision matrix — proposals only

| FINDING | SEVERITY | REPRODUCED_REAL_FILE | ROOT_CAUSE | OWNER | CLASSROOM_IMPACT | MINIMAL_PATCH | CORE_CHANGE_REQUIRED | RECOMMENDATION |
|---|---|---|---|---|---|---|---|---|
|G4-F02|P3|UNRUN|YES|WEB_LIVE_CORE|Teacher must repeat zoom while navigating the same figure. Actual impact on Tiết09/10 not yet tested.|YES — proposal only|YES — existing navigation owner; no supported profile state override hook|VALIDATION_PENDING|
|G4-F03|P2|UNRUN|YES|GEOMETRY_PROFILE|Students cannot simultaneously see already disclosed proof context. Actual Tiết09/10 proof structure unverified.|YES — proposal only|NO|VALIDATION_PENDING|
|G4-F04|P3|UNRUN|YES — font cap source only; physical readability impact unconfirmed|CSS/UI|Potential small relative text on physical4K display; last-row readability not proven.|UNCONFIRMED — target acceptance threshold missing|NO for a later justified CSS-only correction|VALIDATION_PENDING|
|G4-F05|P2 — HISTORICAL VALIDATION_GAP|UNRUN|NO|UNKNOWN|Cannot certify content/timing/no-teach-ahead/figures/answers/full workflow for Tiết09/10.|UNKNOWN|UNKNOWN — no engine change justified by unread packets|VALIDATION_PENDING|

All four recommendations are VALIDATION_PENDING because requested new-real-file reproduction/provenance cannot run. Two source/auxiliary technical findings have a possible minimal correction, but none is implemented. PATCHABLE count2 is engineering possibility; it is not approval or a completed real-file test. Deferred count0. Pending count5 includes the four matrix items and external input access.

Priority after real-file evidence: P0/P1 if detected, then P2 Focus classroom context, then P3 zoom/readability. Do not fix P3 solely to zero a count.
