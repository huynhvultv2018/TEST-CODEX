WEB_LIVE_LESSON_LIBRARY_P12_1_CANDIDATE.zip
SHA256 39c0955f1c4a9371187dff791b5eeb1e4a9041335cfc235b577ac14c14c94a49
Full runtime1241files, extract all and retain structure. ExistingWindows launch scripts preserved unchanged; cloud has not re-tested them on Windows. Phase12 original candidate is not overwritten. Onlysubject-loader.js changed, no Core/Profile/package-source edits.

GV Windows retest: use full extracted P12.1. Select TIN HỌC, import original TIN6W05 package / provided originalfinding package; preview subjectTin học6 and runtimeLegacy; explicitNẠP BÀI should be enabled. Confirm subject/Grade6/Week5/Period5 libraryvisibility aftersave. Test mismatched Đại sốpackage underTin học must block; contradictory subjectTin học+enginealgebra must block and preservecurrent. Do not rewrite source lesson engine to make testpass. Windows/physicalTV/classroom status staysUNRUN until actual GVresults; STOP/no Production.

Required5reports/FINAL_STATUS/manifest/checksums besideZIP are currentreleaseauthority. Embeddedolder documents/checksums historical unchanged. EvidenceZIP is test-only helpers/fixtures/rawresults/screens, not teachingcontent. P11-F01P2OPEN_DEFERRED, capacity limit remains.

Cloud reproduction no npm build/install: Python3staticserver on selected working/candidate root, Node+Playwright /usr/bin/chromium.
python3 -B -m http.server 8790 --bind 127.0.0.1 --directory /workspace/p12-1-legacy-subject/packaged-smoke/WEB_LIVE_LESSON_LIBRARY_P12_1_CANDIDATE
NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules
P121_ROOT=<extractedcandidate> P121_BASE=http://127.0.0.1:8790 P121_OUT=<outsideevidence> node targeted.cjs
Inheritedhelpers use P12_ROOT/P12_BASE with P12_LIBRARY_OUT/P12_QUICK_OUT/P12_SAFEGUARD_OUT. Keep FINDING_EQUIVALENT.json/SYNTHETIC_LARGE_LIBRARY.json/NEGATIVE_FIXTURES beside scripts. ExistingG4F01 externalfixture path inhelpers is preserved; evidenceincludes original testZIP forreproduction. Beforehelper needs frozenPhase12server8788, notpatchedruntime. Never writeevidence into frozen/candidate roots. Inspectoccupiedports; do notstop unrelatedservers.

Environmentdraftrevision12 unchanged; DRAFT_PENDING_SAVE_PUBLISH; no configurationSave/Publish, freshmanaged-task restoration unverified. OnlyisolatedGitHubdeliverybranch, no main/PR/merge.
