# G4-F02 — source audit; new real-file test pending

**FINDING_ID =** G4-F02

**CLASSIFICATION =** P3

**KIND =** TECHNICAL

**AFFECTED_COMPONENT =** Teacher navigation authoritative zoom/pan state

**TEST_STEP =** Auxiliary approved fixture: index9→zoom1.15→index10 same VD2; separately index10→zoom1.15→index11 LT2

**EXPECTED_BEHAVIOR =** Classroom: retain zoom for same authored geometry context; new scene may reset. Existing runtime contract instead resets every screen.

**ACTUAL_BEHAVIOR =** Both transitions reset1.15→1. Same figure/base/annotation persist. TV receives authoritative zoom1.

**REPRODUCIBLE =** YES — source/auxiliary; uploaded real files UNRUN

**ROOT_CAUSE_CONFIRMED =** YES

**ROOT_CAUSE =** teacher.js:39 go() updates i and unconditionally calls resetView(); teacher.js:10 resets zoom=1 and pan={x:0,y:0}. state():37 serializes those values; tv.js:25 consumes lastState.zoom. No figure/scene zoom store.

**OWNER =** WEB_LIVE_CORE

**AFFECTED_FILES =** WEB_LIVE/teacher.js

**CLASSROOM_IMPACT =** Teacher must repeat zoom while navigating the same figure. Actual impact on Tiết09/10 not yet tested.

**MINIMAL_PATCH_POSSIBLE =** YES — proposal only

**CORE_CHANGE_REQUIRED =** YES — existing navigation owner; no supported profile state override hook

**RECOMMENDED_PATCH_SCOPE =** Small optional Geometry policy at go/resetView using existing nonempty authored sceneId plus lesson activation/source identity; preserve only zoom/pan on identical context. Retain all other reset behavior and legacy/algebra/informatics semantics. No schema or command redesign.

**RECOMMENDATION =** VALIDATION_PENDING

**REPRODUCED_REAL_FILE =** UNRUN_INPUT_TRANSFER_BLOCKED

**EVIDENCE =** CLASSROOM_VALIDATION.json#/stateTests · SOURCE_AUDIT_EVIDENCE.json · CAPTURES/ZOOM_PROOF.png

State ownership is **SCREEN STATE / WEB_LIVE_CORE**, not a figure/scene zoom store. Geometry adapters offer only visuals/presentation; lifecycle contexts are immutable scalar snapshots with no writable zoom policy. CSS or packet metadata cannot restore the authoritative zoom reset. Core change required refers only to a future supported fix, not authorization to implement it. New-scene reset passes existing contract; same-scene preservation is the classroom expectation to be evaluated on the actual files.
