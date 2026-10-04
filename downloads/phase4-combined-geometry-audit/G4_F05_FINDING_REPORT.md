# G4-F05 — source audit; new real-file test pending

**FINDING_ID =** G4-F05

**CLASSIFICATION =** P2 — HISTORICAL VALIDATION_GAP

**KIND =** VALIDATION_PENDING

**AFFECTED_COMPONENT =** Real SOẠN_TRƯỚC→PREP_PACKET/packager→LIVE provenance and completeness

**TEST_STEP =** Inventory all four uploads and attempt authorized transfers; compare earlier source/enrichment evidence separately

**EXPECTED_BEHAVIOR =** Prove pairing by grade/week/lesson/topic; trace every real source activity to LIVE/runtime; run producer only if artifacts suffice.

**ACTUAL_BEHAVIOR =** All four transfers fail at32MiB limit. No uploaded content/hash/pairing/producer artifact can be verified. Earlier auxiliary source selects Legacy and Geometry enrichment has representative authored links; those facts do not prove a fault in the new packets.

**REPRODUCIBLE =** Input transfer blocker YES; new packet/producer defect UNKNOWN

**ROOT_CAUSE_CONFIRMED =** NO

**ROOT_CAUSE =** No root cause for a SOẠN_TRƯỚC/packager/LIVE defect established. Transfer limit is an external access blocker, not evidence of data or engine error.

**OWNER =** UNKNOWN

**AFFECTED_FILES =** HINH8_W05_TIET09_WEB_LIVE_PREP_PACKET_REVIEW.zip [file_00000000b9b4820990f0cb11472b53e1] — unread · HINH8_W05_TIET10_WEB_LIVE_PREP_PACKET_REVIEW.zip [file_00000000990c8206bb06d0f22d27b1c4] — unread · HINH8_W05_TIET09_WEB_LIVE_PREP_PACKET_REVIEW.zip [file_000000004aa4820988936ad6445aa522] — unread · HINH8_W05_TIET10_WEB_LIVE_PREP_PACKET_REVIEW.zip [file_00000000d8ec82098a57b98c09947b32] — unread

**CLASSROOM_IMPACT =** Cannot certify content/timing/no-teach-ahead/figures/answers/full workflow for Tiết09/10.

**MINIMAL_PATCH_POSSIBLE =** UNKNOWN

**CORE_CHANGE_REQUIRED =** UNKNOWN — no engine change justified by unread packets

**RECOMMENDED_PATCH_SCOPE =** None yet. Obtain original bytes, verify SHA/CRC and pairing, inspect source/producer/live artifacts, trace and classify proven differences before proposing a data or engine patch.

**RECOMMENDATION =** VALIDATION_PENDING

**REPRODUCED_REAL_FILE =** UNRUN_INPUT_TRANSFER_BLOCKED

**EVIDENCE =** INPUT_INVENTORY.json · CLASSROOM_VALIDATION.json#/originalImport · CLASSROOM_VALIDATION.json#/proofCoverage · SOURCE_AUDIT_EVIDENCE.json

Previous representative enrichment had authored links on4/49 answer/proof blocks. This is coverage, not a claim that all49 answers require links. The previous source selecting Legacy for absent subject_engine is contract behavior. New uploads may contain additional artifacts; unread bytes cannot establish absence, corruption, authoring cost or a producer failure. Historical P2 gap is retained without turning it into a proven current technical bug.
