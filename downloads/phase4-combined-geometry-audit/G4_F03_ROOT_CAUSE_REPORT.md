# G4-F03 — source audit; new real-file test pending

**FINDING_ID =** G4-F03

**CLASSIFICATION =** P2

**KIND =** TECHNICAL

**AFFECTED_COMPONENT =** Geometry proof Focus visibility

**TEST_STEP =** Auxiliary fixture index9: disclose proof1 and proof2, enable Focus and focus previously disclosed step1

**EXPECTED_BEHAVIOR =** Current focused step emphasized; other disclosed steps remain visible but de-emphasized; undisclosed steps hidden.

**ACTUAL_BEHAVIOR =** answerStep stays2; step1 visible, step2 display:none despite opacity.52. Matching step1 objects work.

**REPRODUCIBLE =** YES — source/auxiliary; uploaded real files UNRUN

**ROOT_CAUSE_CONFIRMED =** YES

**ROOT_CAUSE =** geometry-profile.css:7 hides previous proof blocks unless focused; :8 hides all nonfocused answer blocks during Geometry Focus. classroom.css:12 already dims to.52 but display:none overrides visibility. Core tv.js:101–104 slices to disclosed proof before rendering.

**OWNER =** GEOMETRY_PROFILE

**AFFECTED_FILES =** WEB_LIVE/geometry-profile.css

**CLASSROOM_IMPACT =** Students cannot simultaneously see already disclosed proof context. Actual Tiết09/10 proof structure unverified.

**MINIMAL_PATCH_POSSIBLE =** YES — proposal only

**CORE_CHANGE_REQUIRED =** NO

**RECOMMENDED_PATCH_SCOPE =** Only the two Geometry scoped hiding rules; keep disclosed blocks visible with dimming. Preserve Core reveal slice and valid Focus/object selection. Future steps remain absent; verify long real proof fit before acceptance.

**RECOMMENDATION =** VALIDATION_PENDING

**REPRODUCED_REAL_FILE =** UNRUN_INPUT_TRANSFER_BLOCKED

**EVIDENCE =** CLASSROOM_VALIDATION.json#/focus · CAPTURES/FOCUS_PROOF_1.png · SOURCE_AUDIT_EVIDENCE.json

Proof reveal and Focus state remain separate: Core keeps answerStep=2 and renders only slice(0,answerStep); Geometry linkedIds selects a valid disclosed focused step. Failure is CSS visibility, not destroyed proof data. Minimal proposal touches Geometry CSS only and retains undisclosed-step exclusion.
