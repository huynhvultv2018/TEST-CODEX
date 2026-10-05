# WEB LIVE Multi-Profile — Phase 7

PHASE7_STATUS = PASS (cloud technical integration only).
RC1_CREATED = YES. RELEASE CANDIDATE; no Production.

## Scope and integrity

Authority: AUTHORIZE_PHASE7.txt, resumed by GV instruction “tiep tuc tien trinh Phase 7”. Existing checkouts reused; no worktrees. Cloud environment onboarding skill used for temporary static servers/readiness/testing. Environment Settings were read only: revision 12 unchanged; ENVIRONMENT_STARTUP_INSTRUCTIONS = DRAFT_PENDING_SAVE_PUBLISH.

No application files added, changed or removed relative to frozen Phase6. Entire 1239-file payload byte-identical. Core, HTML/importer, state schema, navigation/sync, shared CSS, pedagogy and all profiles unchanged. External validation helpers/reports only. No feature/refactor/UI/schema redesign/performance rewrite/automatic patch. Frozen references never edited.

GEOMETRY Phase4: BEFORE = AFTER = 9974d9fb4d4e4db023846c0ee42258b3fd193acfe37bd63b8fe6c7d2ee5f9b8e; MUTATED = NO; 1227 files unchanged.
ALGEBRA Phase5: BEFORE = AFTER = 575b466dc839d54c6ad91327bc5a7454ece42cbacfd69ae916eca4aa1bcaf01d; MUTATED = NO; 1233 files unchanged.
INFORMATICS Phase6: BEFORE = AFTER = d67c062b5bd7b431e92918698c3c47b04e71c783cfeeaa8a20f20e909e12ea5e; MUTATED = NO; 1239 files unchanged.

## Integration result

ONE CORE/MULTIPLE PROFILES: existing WEB_LIVE/core-profiles.js resolver and adapter/lifecycle boundaries select Legacy/Geometry/Algebra/Informatics. Existing profile presentation modules supply subject behavior; no duplicate Core or independent engine created. Core Phase2 REGISTERED_STUB descriptor for Algebra/Informatics is retained historical metadata; actual adapter APIs are IMPLEMENTED and dispatch tested.

PROFILE_RESOLVER = PASS: 12 inputs checked on Teacher, embedded Preview and native TV popup. Explicit geometry/algebra/informatics, absent/unknown/null/number/object/array/empty/whitespace engines and normalized Algebra string route without runtime crash.

PROFILE_SWITCHING, STATE_ISOLATION, CSS_ISOLATION, REVEAL_ISOLATION = PASS: required four sequences, 14 entries on continuously open pages. Each profile is dirtied before switching. Geometry figure/annotation/proof/Focus/layout/zoom; Algebra reveal/highlight/Focus/hint/answer; Informatics activity/code/highlight/checkpoint/Focus/answer/sample; Legacy hint/reveal exercised. Fresh next-profile context resets correctly and contains no old profile controls or foreign annotations/reveal. Authored lesson memory remains exact. Own Geometry persisted annotations may restore in their own scene; no cross-profile leakage.

INVALID_DATA_SAFETY = PASS: 10 malformed/missing/empty-screen-object/optional-data cases after dirty Informatics. Unknown profiles additionally covered by resolver cases. Empty screen means a present screen object with no fields; arbitrary corrupt JSON and a completely empty lesson are outside this finite suite. Optional missing media and malformed blocks/code/Algebra/Geometry metadata do not crash or cross-reveal.

LEGACY_COMPATIBILITY = PASS: absent subject_engine runs without migration; fresh frozen-reference regression also passes.

NO_TEACH_AHEAD_GLOBAL = PASS for tested fixtures: authored content unchanged; future proof/math/code/comparison, hidden hints, unapproved sample and private notes protected. Native answer-priority still hides hint while answer is active. Sample requires checkpoint + GV confirmation + explicit reveal. No generation/solver/code execution introduced.

TV_LAYOUT_INTEGRATION = PASS: 12 dirty-profile cases at 1920×1080, 1366×768, 1280×720; additional inherited figure/math/code/table/media/MCQ suites. MCQ remains vertical full-width independent rows with separate instructions. Screenshots reviewed for representative Algebra and Informatics dirty Focus states. Physical/back-row acceptance remains UNRUN.

CROSS_PROFILE_STRESS_TEST = PASS within recorded 8-cycle/48-switch diagnostics. See test evidence and risk register for resource measurements and retained per-activation sample booleans; no production-grade benchmark claim.

## Packaged release validation

Fresh RC1 extraction CRC and all 1239 file hashes match frozen Phase6. RC integration repeated all six groups, 14 requested entries, 10 invalid probes, 48 stress switches and 12 viewport cases. Served 58 runtime/profile/MathJax/media/fixture assets match local package bytes; native importer closes/reopens/closes. Zero collected page runtime errors and external runtime requests in integration runs. RELEASE_GATE.json = PASS.

RC1 SHA256: d09db03f88c065d1167030fa5bd45f6467fc464c31d7a228003a20ac28769fc5

Known accepted G4-F02/F04 deferred, G4-F03 fixed and G4-F05 pending remain unchanged. Real-file validation waived by GV; Windows/physical TV/classroom unrun. New Phase7 open findings P0/P1/P2/P3 = 0/0/0/0, excluding inherited accepted Geometry items.

STOP. Wait GV approval; no automatic patch, next phase, merge or Production.
