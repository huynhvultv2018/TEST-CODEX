# P12.2B — Implementation report

Technical gates PASS on Linux Chromium 151.0.7922.173. Candidate only; Windows, physical TV and classroom UNRUN. P11-F01 = PATCHED_AWAITING_WINDOWS_RETEST, not FIXED. Authority: APPROVE_P12_2B.txt; runtime source only frozen P12.1, SHA256 39c0955f1c4a9371187dff791b5eeb1e4a9041335cfc235b577ac14c14c94a49. Separate working copy; all 1241 frozen files unchanged. No Production, P12.2C or Phase 13.

The Loader now owns WEB_LIVE/subject-storage.js. New full lesson JSON and inline images persist in IndexedDB. Canonical inline images become SHA-256 addressed ArrayBuffers; exact original data URI strings are rehydrated in RAM. COPY → independent read-back VERIFY → atomic COMMIT. The old lesson keys and old library index remain byte-exact. No automatic localStorage cleanup or temporary full-payload localStorage copy.

Eight existing files changed, one added. Seven changes are the minimal Core bridge below; subject-loader.js is the Loader owner. 1233 original payload files unchanged. All profile scripts, profile resolver, CSS, launcher, authored packages and media are unchanged. Native Teacher start/render/go/state, scene/math helper block, entire TV applyState renderer and ZIP parsing/preparation are byte-exact (SOURCE_SCOPE.json). Storage status is minimal; no Loader redesign. TV fallback status is a small notice outside the cognitive panel (approval section 33), without altering renderer/layout functions or CSS files.

## Core change accounting

Line numbers are candidate lines; STORAGE_ONLY = YES and BEHAVIOR_OUTSIDE_STORAGE_CHANGED = NO for every entry.

| FILE | LINES / FUNCTIONS | WHY REQUIRED | STORAGE_ONLY | BEHAVIOR_OUTSIDE_STORAGE_CHANGED |
| --- | --- | --- | --- | --- |
| WEB_LIVE/common.js | 5–6: readState/storeState | Durable small session mirror in IDB when native localStorage is full; same state schema | YES | NO |
| WEB_LIVE/pedagogy-teacher.js | 51–58: restorePedagogySession | Await bootstrap/readLesson before original accepted-id/source/index validation and disclosure reset | YES | NO |
| WEB_LIVE/teacher.html | 242: one subject-storage.js script insertion | Adapter bootstrap before storage consumers | YES | NO |
| WEB_LIVE/teacher.js | 23–25 JSON/sample write; 54 saved-read/delete handlers | Await adapter commit before native start, async retrieval/delete, storage errors | YES | NO |
| WEB_LIVE/tv.html | 54: one subject-storage.js script insertion | Adapter bootstrap before TV payload retrieval | YES | NO |
| WEB_LIVE/tv.js | 8–29 getLesson/read guards/status; 149 receive; 173 bootstrap | Async retrieval guarded by source/activation, RAM-only peer copy, verified fallback notice; no full LS backwrite | YES | NO |
| WEB_LIVE/zip.js | 32–40 getLibrary/getLesson/saveLesson/deleteLesson; 66 importZip | Metadata projection/cache bridge and awaited adapter writes | YES | NO |

The Loader commit waits for verified persistence, takes the current-lesson snapshot immediately before native activation, and guards stale async selections. A valid saved lesson may remain in IDB if selection changes or activation fails afterward: UI states saved-but-not-loaded; no false Recent success. Native activation failure restores the latest pre-start index/disclosures/activation; failure of restoration itself reports incomplete UI recovery. Development defects in this guard and snapshot were reproduced, fixed and retested; their history is retained. These are cloud development findings, not a claimed new Windows diagnosis.

The full nine-suite run passed; only Loader code changed afterward. Post-change storage/extended/snapshot/library tests passed. Inherited P12.1 reload assertion ran before async restoration completed; copied harness now waits for exact accepted lesson id AND expected profile, retaining every original assertion (28 PASS). Original source suite is untouched; failed run preserved. Profiles, scale and all Core runtime hashes match their full-run seal. TECHNICAL_GATE.json ties these results to the final runtime hashes.

Required reports, review source copies, diff, tests, evidence and backup/retest guide accompany the complete runtime ZIP. ZIP identity is external CHECKSUMS.sha256/PACKAGE_IDENTITY.json; historical documents retained inside runtime are not current-release acceptance. Browser quota is finite; no unlimited capacity claim.
