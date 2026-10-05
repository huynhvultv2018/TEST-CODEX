# P12.2A — Migration / rollback design (NOT RUN)

Không tạo DB, copy/migrate/xóa dữ liệu, clear storage hoặc implement backend trong P12.2A. Phần dưới là thiết kế để duyệt, chưa bảo đảm bằng implementation/test.

## Approval issue: cross-store atomicity

User section16 requires COPY→VERIFY→COMMIT→CLEANUP and, on any failure, OLD DATA REMAINS / CURRENT REMAINS / MIGRATION NOT COMMITTED. Before cleanup this can hold. localStorage and IndexedDB do not share an atomic transaction: after one removeItem succeeds, a later remove, disk failure or power loss can leave some old keys absent. Restoring LS may fail again at the original quota. No safe algorithm can honestly promise all old LS keys remain after every cleanup failure while also deleting those keys.

Proposed approval gate: permit copy/verify first with original LS unchanged; activate only verified DB generation, then cleanup only on separate approved failure/recovery contract. Until cleanup is complete, mark overall migration NOT_COMPLETED; distinguish DB generation activation from full migration completion. Cleanup failure retains verified DB as authoritative recovery source and unremoved old keys, status CLEANUP_PENDING. This does not satisfy literal ALL_OLD_LS_KEYS_REMAIN; explicit GV approval is needed. If literal requirement is unchanged, keep cleanup disabled; do not claim capacity fix or completed migration. No automatic exception inferred.

## Journal / counts / version

DB control migration job: migrationVersion, dbSchemaVersion, jobId/origin, source generation digest, per-key canonicalId/source SHA/byteLength/revision, sourceCount, copiedCount, targetCount, verifiedCount, rejectedCount, cleanupCount, verifyResult with missing/mismatch lists, writer lock/lease, activeTargetGeneration, completedAt, previousGeneration, rollbackPath.

States: NOT_STARTED→INVENTORIED→COPYING→COPIED→VERIFYING→VERIFIED→ACTIVATED→CLEANUP_PENDING→COMPLETED. Pre-activation failures FAILED_NOT_COMMITTED; cancelled/interrupted stages resumable. ACTIVATED does not mean old data deleted or full migration completed. Copy records belong to a staging generation and are not served as complete library until verified. Store source hash before actions and compare just before activation/cleanup; concurrent changed key invalidates that key verification and stops cleanup.

## COPY → VERIFY → COMMIT → CLEANUP

1. READ/INVENTORY: exact owned lesson keys and index; classify unknown/foreign untouched. Snapshot per-key raw strings and canonical IDs/revisions under writer coordination. Read errors stop; no write/delete. Record missing payload, duplicate metadata, malformed JSON, id/key mismatch, unsupported schema without silently fixing source. Current lesson stays in RAM.
2. VALIDATE: same P12.1 parser/package/subject/profile/mismatch/source checks; validate asset bindings and decode strictly. Corrupt known-owned record remains in LS; optional lossless quarantine copy may require explicit consent if a large amount. Unknown schema/ownership stops that record; overall not full success. No lesson-content edits.
3. COPY: write immutable staging lesson body, raw assets and manifest in bounded atomic DB transactions; dedup raw assets by SHA+byte comparison/length and count per-lesson refs. Abort on error; original untouched. Re-run same source hash idempotently, never double-increment refcount. Hash/decode outside live transaction; persist journal checkpoint only with successful copy transaction.
4. VERIFY: independent readback transaction reconstructs runtime JSON; compare original serialized/canonical semantic digest, ID, sourceKey, profile metadata, screen count and every asset bytes/hash/mime/path/binding. Count source vs target, index entries, unique assets and refcounts; no missing lesson/asset. Verification result is durable. DB open/read/verify error leaves old unchanged and status not committed.
5. COMMIT/ACTIVATE: require all included source records verified, fresh source generation digest, compatible Core storage bridge and no unsafe writer. Atomic IDB control generation pointer + index/ownership validation commit. Promise resolve only txn.complete; abort retains old pointer. Native start/hydrate stays isolated from staging. When GV requires full migration all library records, rejectedCount>0 prevents full completion; do not hide corrupt records.
6. CLEANUP (gated): after activation plus independent DB reopen/readback, remove only exact verified unchanged lesson payload keys and obsolete owned library index if all referenced lessons valid in active target. Journal per item/recheck hash. Never delete first, never clear(), no unknown/vendor/TTS/profile key deletion. No full package in both persistent stores after successful approved cleanup; temporary duplication budgeted. Current RAM remains; read source after close uses verified target, not missing old key. Overall COMPLETED only when approved cleanup completed and target again verified. If cleanup fails, preserve target and remaining old data, CLEANUP_PENDING; stop removals, warn, no false completed state.

## Rollback scope

Before activation: disable staging pointer and use unchanged old LS runtime data, current lesson RAM untouched; staging artifacts can be retained for retry, not automatically destroyed. No data cleanup in audit. Previous DB generation remains until new generation verified; undo pointer possible if compatible reader supports it. Counts/status/verify remain diagnostic evidence.

After activation, before any cleanup: switch back only if source digests still match and old reader compatible; abandon target activation without altering originals. After partial/full cleanup: rollback to previous compatible adapter/verified DB generation or explicit verified export restore, not guaranteed frozen P12.1 downgrade. Rehydrating all full payload into LS can hit confirmed quota and must never evict other data. Restoration needs capacity preflight and explicit user approval; failed restore leaves DB authoritative. Keep recovery/export capability and a compatible rollback build before allowing cleanup. Browser wipe/eviction removes both stores; external backup is required for protection against origin loss. No export/recovery utility implemented here.

## Failure / recovery matrix (design only)

| Failure | Before activation | After activation / cleanup |
| --- | --- | --- |
| Browser closed / power loss | Old unchanged; reopen detects durable COPYING/VERIFYING journal, rehash source, verify copied records, resume idempotently | Read active verified generation; journal reconciliation because LS remove and DB cleanup checkpoint are non-atomic. Missing old key only acceptable if verified target owns exact source revision; CLEANUP_PENDING otherwise stop |
| IDB write/quota/transaction abort | Abort batch, old unchanged, no switch/start; FAILED_NOT_COMMITTED | Keep previous verified committed target/current RAM, refuse new activation; do not fall back to large LS writes |
| IDB unavailable/open/read failure | DB_UNAVAILABLE; legacy read-only view/live RAM can continue if readable; saving/migration blocked | Existing current RAM continues; reopen cannot guarantee lesson without DB access; warn recovery needed, never pretend saved |
| Blocked upgrade/versionchange | Timeout with clear warning, ask close conflicting tabs; no forced destructive upgrade | Close own connection on versionchange; don't serve incompatible schema or downgrade/delete database |
| Corrupt source/target | Source remains, quarantine/report id+reason; verification prevents activate | Reject affected reopen; current remains; use previous verified generation/export, never show partially hydrated lesson |
| Duplicate lesson/id/key/index | Preserve canonical IDs and source revision, reconcile under existing conflict rule; ambiguity requires review | Replace/dedup assets transactionally, distinct lessons remain distinct; don't infer filename identity |
| Old/unknown schema | Versioned compatible upgrade of known schema staged; unsupported refuses with old untouched | Never deleteDB/recreate or mutate unknown stores; require recovery/design review |
| Foreign/unknown legacy data | Inventory labels UNKNOWN, preserve bytes, no copy/delete | Same; app cleanup compares exact owned recorded keys only |
| Concurrent tab import/update | Source generation mismatch stops activation; refresh/reverify | Writer lease/generation gate; changed old key skipped from cleanup, warn/reconcile; no broad snapshot rollback |
| Cleanup remove/journal failure | Cleanup not allowed yet | Stop. Verified target retained; remaining old keys kept; journal reconcilable, NOT_COMPLETED. All-old-remains cannot be promised |
| Partial asset/refcount write | Single batch transaction abort, no lesson missing own assets | Integrity check counts/bindings before read/delete; refuse corrupt operation, keep current |

Storage estimate optional; low free capacity rejects copy before any cleanup. Never solve staging quota with delete-old-first. Migration is restartable versioned work, not on-load uncontrolled bulk task; keep UI responsive and teaching active, permit cancel before activation. No migration/full Windows retest/physical validation performed in P12.2A.
