# P12.2B — Storage contract

Owner: WebLiveSubjectStorage in subject-storage.js. WEB_LIVE_DB version 1, same browser profile and same origin. Loopback HTTP or HTTPS required for crypto.subtle integrity checks. No external service, npm build or new launcher requirement.

| Store | Key | Purpose |
| --- | --- | --- |
| lessons | id | Only committed records: stripped JSON body, metadata, source identity, payload hash/UTF-8 size, image bindings, schemaVersion, legacyHash, savedAt |
| assets | hash | SHA-256 content-addressed image ArrayBuffer and byteLength |
| pending | jobId | Hidden staged target; deterministic JSON([id,payloadHash]) makes same-revision retry idempotent |
| journal | id | MIGRATION_VERSION, LESSON_ID, SOURCE_PRESENT, TARGET_WRITTEN, TARGET_VERIFIED, COMMITTED, CLEANUP_PENDING plus source/payload hash, counts, verification result/deletion tombstone |
| control | key | Small native session mirror for full-localStorage reopen; no full lesson |

API: ready/initialize/refresh; saveLesson/readLesson/listLessons/deleteLesson; getMetadata(id), peekLesson(id), getStorageHealth; migrateLegacyLesson/migrateLegacyStorage/readJournal; saveMetadata/getMetadataPreference; readSession/saveSession. Writes/reads/migration are async; metadata catalog is RAM projection; cache holds at most three full lessons. Native current lesson is retained independently in RAM. Metadata includes only existing supported fields, with no inferred subject/grade/week/period.

Identity reuses id/packageId/current fallback rule and existing JSON/ZIP FNV source-key conflict policy, never filename. Different content under the same authored id follows the original source suffix policy. Updates and duplicate imports are tested. Migration preserves original JSON including missing source key; it records the legacy raw hash instead of adding authored fields.

COPY transaction writes pending/assets/journal (COMMITTED false). A separate transaction reads back and verifies id, metadata, asset count/paths/hash/size and exact hydrated JSON SHA-256/UTF-8 length. Legacy source is reread before commit and must remain identical. COMMIT transaction atomically writes lesson, verified committed journal and removes its pending entry; success is transaction completion, not individual request success. Failed/aborted targets remain invisible; valid old source is never removed. Global migration reports incomplete if any old payload or old index is corrupt. Partial successful lessons can resume idempotently. Explicit migration button only; no automatic copy/cleanup on startup.

Web Locks serialize same-origin writers; local queue plus prior committed hash comparison protects conflict commits when Web Locks is unavailable. Save/delete broadcast catalog refresh to peer tabs. Schema/open/blocked failure never deletes/recreates/downgrades DB. Version changes close the connection. Open timeout is five seconds; retry requires an explicit operation.

Read committed IDB first and verify all bytes. With known committed target, legacy fallback must match recorded raw legacy hash and committed payload hash; updated/new targets without matching legacy provenance reject stale fallback. If DB cannot open on fresh startup and its provenance cannot be read, only stable-read, shape/metadata and image encoding/hash checks of the old copy are possible: warn that it is the historical copy, never claim the latest DB revision was proven. Both copies invalid => fail, warn, preserve current. Tombstones prevent deleted legacy entries from reappearing while DB is accessible; unavailable DB on a fresh process cannot prove tombstones (backup copy remains by design).

Shared image deletion checks all remaining committed and pending references atomically. Pending entries of the deleted id are removed; another lesson's assets are preserved. Legacy payload/index and foreign keys are never deleted. Different failed revisions can leave hidden stages and unused assets consuming IDB capacity; no unapproved staging eviction. Advanced dedup is deferred. Noncanonical data-URI encodings stay losslessly in IDB JSON body. External paths/media remain authored and unconverted.

New lesson-related localStorage writes contain small session/preferences/Recent references only, never full new lesson/base64. Old full payloads, old index and pre-existing tool/profile state remain untouched; therefore LOCALSTORAGE_SMALL_DATA_ONLY is not a global claim about all existing keys. Optional small preference writes can still warn/fail at full old quota. Session control mirror is used only while native LS state exactly matches the captured mirror, preventing overwrite of newer peer state. No localStorage.clear(). No old payload cleanup; P12.2C approval after physical Windows retest is required.
