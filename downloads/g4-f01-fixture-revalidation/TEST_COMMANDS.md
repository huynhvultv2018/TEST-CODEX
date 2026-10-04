# Reproduction commands (external evidence only)

These commands repeat capture runs and overwrite output in the external audit folder. Preserve a dated copy before any later authorized rerun. Do not patch candidate or recreate the fixture. STOP applies after current report.

Start servers only if absent; inspect occupied ports without stopping another process:

```bash
python3 -B -m http.server 8773 --bind 127.0.0.1 --directory /workspace/TEST-CODEX/WEB_LIVE_GEOMETRY_PHASE3_CANDIDATE
python3 -B -m http.server 8771 --bind 127.0.0.1 --directory /workspace/TEST-CODEX/WEB_LIVE_MULTI_CORE_PHASE2_CANDIDATE
```

Execute scripts from `/workspace/g4-f01-fixture-revalidation`, with separate shells for servers; scripts require Playwright through the existing Node runtime:

```bash
cd /workspace/g4-f01-fixture-revalidation
NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules node targeted-g4f01.cjs
NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules node classroom-validation.cjs
NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules node whole-lesson-tv.cjs
NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules node contrast-probe.cjs
NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules WEB_LIVE_TEST_ROOT=/workspace/TEST-CODEX/WEB_LIVE_MULTI_CORE_PHASE2_CANDIDATE WEB_LIVE_BROWSER_BASE=http://127.0.0.1:8771 PHASE2_EVIDENCE=/workspace/g4-f01-fixture-revalidation/REGRESSION/PHASE2 node /workspace/TEST-CODEX/WEB_LIVE_GEOMETRY_PHASE3_CANDIDATE/GEOMETRY_PHASE3_TESTS/engines.cjs
NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules WEB_LIVE_TEST_ROOT=/workspace/TEST-CODEX/WEB_LIVE_GEOMETRY_PHASE3_CANDIDATE WEB_LIVE_BROWSER_BASE=http://127.0.0.1:8773 PHASE2_EVIDENCE=/workspace/g4-f01-fixture-revalidation/REGRESSION/PHASE3 node /workspace/TEST-CODEX/WEB_LIVE_GEOMETRY_PHASE3_CANDIDATE/GEOMETRY_PHASE3_TESTS/engines.cjs
NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules node profile-isolation.cjs
node compare-regression.cjs
python3 build-report.py
node phase4-gate.cjs
```

`phase4-gate.cjs` correctly returns exit1 for the current NOT_PASS result; capture helper completion exit0 is not full acceptance PASS. Immutable-source verification was performed separately by comparing all1,227 files against both initial manifest and approved source archive; SOURCE_IMMUTABILITY.json records that result. Check these hashes again before later validation.

Current fresh outcomes: targeted PASS, 13/15 native checks PASS with two preserved failures, 140 TV states/24 layout cases zero overflow, paired171screen/342state real regression plus4screen/8state Demo PASS, 14 isolation groups PASS. No full SOẠN_TRƯỚC producer/Windows/physical TV/actual GV class run.
