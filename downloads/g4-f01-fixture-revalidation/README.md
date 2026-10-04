# G4-F01 fixture revalidation delivery

**Fixture-only patch targeted PASS; full Phase4 NOT_PASS. G4-F01 is not formally CLOSED.**

Import `HINH8_VD2_GEOMETRY_PROFILE_TEST_G4F01_PATCHED.zip` into the **unchanged approved Phase3 runtime**. This ZIP is a lesson test fixture, not an engine/candidate replacement. Original fixture is retained under ORIGINAL_FIXTURE. Only `screens[19].sceneEnd=true` differs.

Read G4_F01_FIXTURE_PATCH_REPORT.md, FINAL_STATUS.txt and FINDINGS_REVALIDATED.json. Audit ZIP contains fresh raw results, native captures, helpers, exact latest approval, source manifests, original/patched lessons/fixtures and immutable previous Phase4 finding history. Source engine files are not repackaged as a new candidate.

Screens in UI are 1-based; JSON indices and final SCREEN_20/23/26/29 keys are 0-based per request. Native tests run Linux Chromium; Windows/physical TV/classroom acceptance remains unrun. Retain source Phase3 candidate SHA256 8817889abb9e98e9e3c60e191be510215e02030d309c2aacaaad1e1f663dd23c.

External scripts require retained source roots and local servers8773 (Phase3) /8771 (Phase2), Python3, Node, /usr/bin/chromium and Playwright with NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules. Do not run inherited scripts with their default evidence paths inside immutable candidate. All outputs must remain external. No worktrees needed.

STOP after report; further changes/phase/Production require a new explicit GV request.
