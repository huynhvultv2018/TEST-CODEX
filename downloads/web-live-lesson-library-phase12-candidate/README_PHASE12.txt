WEB LIVE LESSON LIBRARY PHASE12 CANDIDATE
Runtime ZIP: WEB_LIVE_LESSON_LIBRARY_PHASE12_CANDIDATE.zip
SHA256: 329dca2256104ef5d9ccca18a2dad2e9c921324260f31249b165683128a2d5e9
Extract all, keep directory structure. Existing full Windows launch scripts/dependencies remain inherited and unchanged. Windows physical start not executed in this cloud task.
Required5reports are beside ZIP. Evidence ZIP contains tests/results/screenshots/fixtures, not runtime lessons. Embedded older reports/checksums are historical; CANDIDATE_PAYLOAD_MANIFEST.json + external current CHECKSUMS identify Phase12.

Cloud reproduction: Python3 static server on selected root, no build/install:
python3 -B -m http.server 8788 --bind 127.0.0.1 --directory /workspace/phase12-lesson-library/packaged-smoke/WEB_LIVE_LESSON_LIBRARY_PHASE12_CANDIDATE
NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules
P12_ROOT=<extracted candidate> P12_BASE=http://127.0.0.1:8788 P12_LIBRARY_OUT=<external evidence> node library-tests.cjs
Quick regression uses P12_QUICK_OUT; safeguards uses P12_SAFEGUARD_OUT. Scripts need SYNTHETIC_LARGE_LIBRARY.json/NEGATIVE_FIXTURES next to them; existing external G4-F01 ZIP path documented in evidence. Never write test outputs into candidate. Inspect occupied ports before starting; do not stop unrelated servers. These are local reproduction instructions, not remote classroom links.

No Environment Settings write/Save/Publish. Draft revision12 unchanged; DRAFT_PENDING_SAVE_PUBLISH. Current runtime reused; fresh managed-task restore unverified. No secret requirements added. Full download link delivered after Git verification on isolated Phase12 branch; no main/Production.

Common interaction target5meaningful/6modeled clicks, qualified scenario only. P11-F01 P2 OPEN_DEFERRED. Windows/physicalTV/classroom UNRUN. STOP/chờ GV.
