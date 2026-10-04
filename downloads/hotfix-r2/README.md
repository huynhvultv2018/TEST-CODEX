# WEB LIVE — Hotfix R2 Candidate

[TẢI R2 ZIP](./WEB_LIVE_TEACHER_TV_PEDAGOGY_UI_HOTFIX_R2_CANDIDATE.zip?raw=true)

**MODAL FIX = PASS (cloud/local automated). WINDOWS RE-TEST REQUIRED = YES. PRODUCTION READY = NO.**

Only WEB_LIVE/teacher.js changed: remove the lesson guard in hideImporter so Close hides the initial importer/overlay even before a lesson is selected. Original baseline, R1 candidate, R1 ZIP and R1 TTS fix are preserved. Escape modal-close is absent in baseline and remains unchanged.

31 native modal/action/integration checks and 30 cockpit checks passed. ZIP includes source, reports, evidence and internal SHA-256. Windows user must retry START_WEB_LIVE → Teacher → modal → CLOSE on the machine that reproduced the bug. Windows audio/native apps/full Launcher acceptance remains incomplete. No Production deployment.

[Root cause](./HOTFIX_R2_ROOT_CAUSE_REPORT.md) · [Regression](./HOTFIX_R2_REGRESSION_REPORT.md) · [Acceptance](./HOTFIX_R2_ACCEPTANCE_REPORT.md) · [Checksums](./HOTFIX_R2_CHECKSUMS_SHA256.txt)

ZIP SHA-256: `33eb6fa41a339ff134c2e2d4d11e7a759db021e9f91049948d74d91a1b7ce37d`.
