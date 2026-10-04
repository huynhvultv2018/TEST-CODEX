# G4-F01 — fixture-only patch and full revalidation

Targeted correction **PASS**. Full Phase4 **NOT_PASS**, therefore G4-F01 is **TARGETED_PASS_PENDING_FULL_PHASE4_PASS**, not CLOSED. The user explicitly requires full Phase4 PASS for closure. Historical finding is preserved in HISTORY; original fixture remains unchanged.

## Approved change

Only `lesson.json /screens/19/sceneEnd` (screen20, “Chốt ý b”) is added as `true`, using the existing contract. `geometry-profile.js:32` already clears the previous figure on the next screen when the previous screen ends. Original fixture reproduces LT2 at all four targets; changing this one metadata field in a new fixture removes that override with the same runtime. Root cause **CONFIRMED — LESSON_PACKAGE**. No engine, Core, visual resolution, proof or other scene changes.

- Candidate before/after SHA256: `8817889abb9e98e9e3c60e191be510215e02030d309c2aacaaad1e1f663dd23c`; all 1,227 files equal approved ZIP.
- Original fixture SHA256: `b502802ab694aa4ee2cc57bb7e053a06fd534580d8d7285f8a55d91428945bd7`.
- Patched fixture SHA256: `4488b1997e416fa634a577900af76fff1dbf17de1eb4bd62eee3a772df7bcab8`.
- JSON deep difference: one field. Manifest and all 15 images are byte-identical. CRC PASS. Content/question/answer/hint/proof/GT/KL/text unchanged.

## Image and boundary evidence

| JSON index | UI screen | Exact expected/actual PNG SHA256 |
|---|---|---|
|20|21|TT2_H333.png — b59beaa64e5521a2d5fa46a15c6caf9172e0e52beadd5831f645a4e613cb5cb7|
|23|24|VD3_H334.png — 56f16f50c03069ebf19780f42704eaf216b01f4915f1499eb49aa3193a073c62|
|26|27|LT3_Hinh.png — df741e56c51d49a3055189d4342a97e60cb753baf211a34b52d4f41c89bd5740|
|29|30|VDU_H327.png — 12e1f76365535da45ecebf10ad3306b499b7e008f10b411faafa0d57ecbfd81d|

`TARGETED_G4F01.json` includes original-control actual hash f2dabdd956f7499d913e222756f161243799c295747768188f8bb073076c75b4 and new actual decoded PNG hashes. Nine screenshots compare original/patched and boundary. Index18 BEFORE, index19 AT sceneEnd retain LT2; index20 AFTER clears Geometry figureId/sceneId, restores actual TT2 image and hides/reset proof/analysis; index23 NEXT exercise has correct own image. No annotation/highlight/context leaks. Returning to LT2 restores its own annotation. Teacher preview/actual TV image parity PASS.

Full walk additionally verifies VD2, LT2, TT2, VD3, LT3 and VDU base images/scopes across hidden and all disclosed states. No other missing boundary observed, and no other scene was patched.

## Full Phase4 and fresh regression

Native Linux Chromium 151.0.7922.173; actual Teacher popup TV and native UI/keyboard/drawing. 35 screens, 49 answer/proof blocks, 4 analysis steps, 140 whole-lesson TV states, 24 layout/viewport cases. 13/15 native assertions PASS; the two failed assertions are retained, not bypassed. The browser helper process completion code 0 means the capture run completed; full acceptance is evaluated separately and fails.

| Gate | Result |
|---|---|
|REAL_LESSON_LOAD|PASS|
|PREP_TO_LIVE_FLOW|PARTIAL — authored ZIP import PASS; SOẠN_TRƯỚC producer UNRUN|
|PERSISTENT_GEOMETRY_REAL_LESSON|PASS|
|PROOF_FIGURE_LINK|PARTIAL — authored VD2 links PASS; full-lesson authoring not certified|
|GT_KL_READABILITY|PASS — tested equivalent viewports/contrast|
|LAYOUT_70_30|PASS|
|LAYOUT_60_40|PASS|
|FIGURE_FULLSCREEN|PASS|
|GEOMETRY_FOCUS_REAL_LESSON|FAIL — G4-F03|
|FIGURE_ZOOM_REAL_LESSON|FAIL — G4-F02 navigation; zoom/return PASS|
|ANNOTATION_REAL_LESSON|PASS|
|TV_READABILITY|PARTIAL — viewport fit PASS; physical/last-row acceptance UNRUN|
|TEACHER_OPERABILITY|PARTIAL — native controls PASS; G4-F02/F03 remain|
|CLASSROOM_FLOW|PARTIAL — 35-screen software flow PASS; actual class UNRUN|

Authored proof links pass where supplied: 4 of 49 answer/proof blocks have links. This is coverage evidence; it does not assume every short answer needs highlight. Other real proof authoring has not been accepted. Import/use of the already-authored patched ZIP requires zero runtime data edits; the end-to-end SOẠN_TRƯỚC authoring intervention count remains UNRUN. Original real lesson lacks subject_engine and correctly resolves Legacy.

Legacy regression is a fresh paired Phase2/Phase3 run: 5 real original packages, 171 screens/342 states per runtime; Demo adds 4 screens/8 states. All real states, 44 visual metrics and 15 assertions per runtime match exactly. Zero overflow, runtime exceptions and external requests. 14 isolation/negative groups PASS, including Geometry cleanup when switching to Algebra/Informatics/Legacy. Interface probes are regression fixtures, distinct from real lesson pedagogy evidence. No historical test output is claimed as a new run.

## Remaining findings and acceptance

- G4-F02 **P3/MINOR**: same VD2 figure index9→10 resets zoom 1.15→1; base and annotations persist. Existing teacher.js:39→10 confirms resetView. Zoom/return itself PASS.
- G4-F03 **P2/DISRUPTIVE**: opening two proof steps then focusing step1 hides disclosed step2 (`display:none`, opacity .52), despite answerStep=2. Existing geometry-profile.css:7–8 confirms cause. Focus current objects PASS; proof context FAIL.
- G4-F04 **P3/MINOR, controlled risk**: 4K DPR1 fonts42–52px; viewport fit PASS, physical/scaling/last-row readability not confirmed.
- G4-F05 **P2/DISRUPTIVE validation gap**: full SOẠN_TRƯỚC producer/provenance and whole-lesson link authoring remain unverified. This is not a proven engine bug. No root cause for a producer failure is invented.

P0=0/P1=0 counts current reproduced runtime blockers on **patched fixture**, not the unchanged original control. G4-F01 retains its historical P1 record and remains pending formal closure because full acceptance is NOT_PASS. Existing DISRUPTIVE→P2 and MINOR→P3 mapping yields P2=2/P3=2; counts include the stated validation gap. Remaining risk ledger is 3 Geometry + 6 inherited =9. BlockingRiskCount=0 retains the prior technical P0/P1 scheme; Focus/zoom failures and partial/unrun acceptance still prevent full PASS. These are different measures.

Windows runtime, physical TV, audible TTS, actual GV45-minute class and students at the back are UNRUN. No claim of production/classroom certification. Source scope violation NO, Production modified NO. No Phase3 RC2, new engine candidate or next phase.

STOP. GV reviews G4-F02–F05 and separately authorizes any remediation or native acceptance.
