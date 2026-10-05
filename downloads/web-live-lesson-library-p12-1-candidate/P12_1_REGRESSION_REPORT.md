# P12.1 — Regression and source integrity

| Runtime | Groups | Result | Phase12 semantic JSON normalization |
|---|---:|---|---|
| GEOMETRY | 14 | PASS | Only random per-run lessonActivation UUID; within-run identity exact |
| ALGEBRA | 20 | PASS | NONE |
| INFORMATICS | 26 | PASS | Only manual video currentTime; playback >0 assertions executed |
| LEGACY | 15 | PASS | NONE |

75regression groups compare exact semantic output to completed frozen Phase12 baseline. Legacy/Algebra no normalization; Geometry only across-run random activationUUID (within-run Teacher/TV/preview identity asserted), Informatics only manual video currentTime (playback>0 assertions still run). No pixel-hash or physical-equivalence claim. Existing question/hint/answer/proof/sample/checkpoint/Teacher-note gates remain checked; no-teach-ahead PASS. Vertical full-width MCQ and separate instructions retained; no adaptive columns.

Source files1241 unchanged path set. Only WEB_LIVE/subject-loader.js changed;1240files including css, Core, Profile Resolver, Geometry/Algebra/Informatics, teacher.js/tv.js/common.js/zip.js, assets and lesson packages byte-exact. No added/removed runtime file. Original Phase12 frozen unpacked1241file baseline and ZIP SHA before=after 329dca2256104ef5d9ccca18a2dad2e9c921324260f31249b165683128a2d5e9. SOURCE_SCOPE.json records exact unchanged engine/essential asset-stage-transaction-quota segment and relevant filter/quick functions.

Engine validation/frozen resolver unchanged: missing subject_engine/default/legacy runtime still Legacy; unknown/empty/nonstring engine blocked; matching modernexplicit routes unchanged. Newsubject conflict/mismatch gate preserves current. Grade/week/period numeric/cascade behavior unchanged. Recent originalnamespace/version/max5/fields/8192bound remain; only lastSubject successful-write value now resolvedsubject. Old optional records not rewritten on read.

Storage: filter0writes, no new persistent key/index/cache, no payload/assets duplicated, no automatic user-package deletion/quota increase/IndexedDB. P11-F01=P2 OPEN_DEFERRED. Current preservation, rollback, warnings and optional write failures PASS. Original essential transaction code exact.

Native accepted-session restore retained on reload; remembered subject alone does not trigger new load. Reset explicit activation/Focus/hint/answer/zoom/oldprofile overlays remains PASS across Geometry→Algebra→Informatics→Legacy→Geometry. Source lesson JSON property/content preservation and absent-engine assertion demonstrate no inferred profile.

Fresh extracted candidate same1241hashes;80targeted/filter/quick/safeguardgroups repeated plus60HTTPassets exact +modal check. All reports/fixtures/helpers external to runtime ZIP. Embedded prior reports/checksums are historical unchanged records; external P12.1 manifest/checksums are release authority.

Environment draft revision12 unchanged/no write/Save/Publish; DRAFT_PENDING_SAVE_PUBLISH. ExistingPython3/Node/Playwright/Chromium reused, no npm build/install. Windows afterpatch/TVphysical/classroom UNRUN. Production/main/old branches preserved; artifact delivery only new isolated P12.1 branch, no PR/merge.
