# G4-F04 — source audit; new real-file test pending

**FINDING_ID =** G4-F04

**CLASSIFICATION =** P3

**KIND =** CONTROLLED_READABILITY_RISK

**AFFECTED_COMPONENT =** Shared subject TV typography caps at4K DPR1

**TEST_STEP =** Auxiliary authored GT/KL/analysis/proof at1920×1080 and3840×2160; read actual computed styles and active CSS declarations without altering them

**EXPECTED_BEHAVIOR =** Text size should support the target physical TV/scaling/distance. That physical threshold is unmeasured.

**ACTUAL_BEHAVIOR =** At4K GT/KL52px; analysis/proof42px, no overflow; inline font size empty. Equivalent at1080 height is26/21px.

**REPRODUCIBLE =** YES — CSS cap measurement on auxiliary; physical/new real files UNRUN

**ROOT_CAUSE_CONFIRMED =** YES — font cap source only; physical readability impact unconfirmed

**ROOT_CAUSE =** tv-ui.css:181 defines --tv-main-size:clamp(32px,2.65vw,52px); :185 applies it to subject content; :186 caps subject reveal at42px. Subject selectors override earlier general high-resolution rules by specificity/source order. CSSOM/computed ancestors confirm52/42 without inline fit reduction.

**OWNER =** CSS/UI

**AFFECTED_FILES =** WEB_LIVE/tv-ui.css

**CLASSROOM_IMPACT =** Potential small relative text on physical4K display; last-row readability not proven.

**MINIMAL_PATCH_POSSIBLE =** UNCONFIRMED — target acceptance threshold missing

**CORE_CHANGE_REQUIRED =** NO for a later justified CSS-only correction

**RECOMMENDED_PATCH_SCOPE =** First test exact TV/resolution/Windows scaling/distance with real lesson; only then propose a narrowly scoped typography correction. Do not change shared caps across subjects to force finding count0.

**RECOMMENDATION =** VALIDATION_PENDING

**REPRODUCED_REAL_FILE =** UNRUN_INPUT_TRANSFER_BLOCKED

**EVIDENCE =** TYPOGRAPHY_ROOT_CAUSE.json · TYPOGRAPHY_CAUSAL_EVIDENCE.json · CAPTURES/TV_3840x2160_S10_60.png · SOURCE_AUDIT_EVIDENCE.json

Earlier high-resolution rules exist, but the more specific selected-subject selectors still cap content/reveal. Final CSSOM walker records active media rules plus inherited variable and computed fonts; initial external probe attempts did not collect parent/matched-rule information and are retained as diagnostic history, not root-cause proof. No CSS overrides or browser zoom were applied. Physical legibility is not inferred from CSS pixel size.
