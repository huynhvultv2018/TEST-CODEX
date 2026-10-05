# P12.2B — Migration and failure evidence

Native Chromium IndexedDB and localStorage in disposable contexts, not a RAM-only storage mock. Linux cloud only. Baseline real image-heavy TIN6 W04 package and old small lesson were seeded; actual native localStorage QuotaExceededError was reached. Old payload/index and foreign-key hashes remained unchanged during migration and new image-heavy import. Test seeds/injections never touch a GV profile.

28 storage checks + 13 extended checks + one snapshot failure-injection scenario PASS. Failure injection is test-only: open denial, five-second blocked timeout, quota/write/commit failures, transaction abort, pending read failure, checksum mismatch and both-copy corruption. Closing the browser page with verification completion held leaves durable uncommitted stage/journal; reopening and resuming verifies and commits without duplicate committed lessons. Each failure checks current preservation and no false commit/success; every browser error list is empty.

| Test | Result | Raw evidence under EVIDENCE |
| --- | --- | --- |
| EMPTY_DATABASE | PASS | STORAGE/STORAGE_RESULTS.json |
| FIRST_LESSON_SAVE_READBACK_COMMIT | PASS | STORAGE/STORAGE_RESULTS.json |
| MULTIPLE_LESSON_SAVE | PASS | STORAGE/STORAGE_RESULTS.json |
| SAME_LESSON_DUPLICATE_IMPORT | PASS | STORAGE/STORAGE_RESULTS.json |
| LESSON_UPDATE_EXISTING_ID_CONFLICT_POLICY | PASS | STORAGE/STORAGE_RESULTS.json |
| INDEXEDDB_REOPEN | PASS | STORAGE/STORAGE_RESULTS.json |
| DELETE_INDEXEDDB_LESSON_RECENT_REFERENCE_SAFE | PASS | STORAGE/STORAGE_RESULTS.json |
| EXISTING_LOCALSTORAGE_NEAR_FULL_NATIVE_QUOTA | PASS | STORAGE/STORAGE_RESULTS.json |
| LEGACY_LESSON_MIGRATION_READBACK_VERIFY_COMMIT_OLD_PRESERVED | PASS | STORAGE/STORAGE_RESULTS.json |
| MIGRATION_IDEMPOTENT | PASS | STORAGE/STORAGE_RESULTS.json |
| LARGE_IMAGE_MULTIPLE_LARGE_LESSONS_DEDUP_NO_NEW_FULL_PAYLOAD_OR_BASE64_IN_LOCALSTORAGE | PASS | STORAGE/STORAGE_RESULTS.json |
| FULL_QUOTA_SESSION_REOPEN_USES_INDEXEDDB_STORAGE_BRIDGE | PASS | STORAGE/STORAGE_RESULTS.json |
| TV_STANDALONE_REOPEN_NO_LOCALSTORAGE_BACKWRITE | PASS | STORAGE/STORAGE_RESULTS.json |
| INDEXEDDB_CORRUPTED_RECORD_VERIFIED_LEGACY_FALLBACK | PASS | STORAGE/STORAGE_RESULTS.json |
| TV_VISIBLE_VERIFIED_LEGACY_FALLBACK_WARNING | PASS | STORAGE/STORAGE_RESULTS.json |
| INDEXEDDB_READ_FAILURE_VERIFIED_LEGACY_FALLBACK | PASS | STORAGE/STORAGE_RESULTS.json |
| CORRUPTED_TARGET_AND_LEGACY_FAIL_NO_CURRENT_LESSON_LOSS | PASS | STORAGE/STORAGE_RESULTS.json |
| NEW_LESSON_CORRUPTION_NO_SILENT_FALLBACK | PASS | STORAGE/STORAGE_RESULTS.json |
| MIGRATION_WRITE_QUOTA_FAILURE_OLD_CURRENT_PRESERVED | PASS | STORAGE/STORAGE_RESULTS.json |
| NEW_IMPORT_WRITE_FAILURE_NO_FALSE_SUCCESS | PASS | STORAGE/STORAGE_RESULTS.json |
| MIGRATION_READ_FAILURE_NO_COMMIT | PASS | STORAGE/STORAGE_RESULTS.json |
| TARGET_PARTIAL_REWRITE_WITHOUT_DUPLICATE_STAGE | PASS | STORAGE/STORAGE_RESULTS.json |
| TRANSACTION_ABORT_DATA_LOSS_TEST | PASS | STORAGE/STORAGE_RESULTS.json |
| DELETE_MIGRATED_IDB_LESSON_TOMBSTONE_OLD_COPY_RETAINED | PASS | STORAGE/STORAGE_RESULTS.json |
| BROWSER_CLOSE_DURING_MIGRATION_INTERRUPTION_RECOVERY | PASS | STORAGE/STORAGE_RESULTS.json |
| INDEXEDDB_OPEN_FAILURE_CONTROLLED_LEGACY_FALLBACK_NO_FALSE_SAVE | PASS | STORAGE/STORAGE_RESULTS.json |
| INDEXEDDB_BLOCKED_TIMEOUT_NO_CRASH | PASS | STORAGE/STORAGE_RESULTS.json |
| ZERO_UNHANDLED_BROWSER_ERRORS | PASS | STORAGE/STORAGE_RESULTS.json |
| LEGACY_WITHOUT_SOURCEKEY_LOSSLESS_MIGRATION | PASS | EXTENDED/EXTENDED_RESULTS.json |
| SAME_ID_METADATA_UPDATE_NO_DUPLICATE_OLD_RETAINED | PASS | EXTENDED/EXTENDED_RESULTS.json |
| UPDATED_LESSON_REJECTS_STALE_LEGACY_FALLBACK | PASS | EXTENDED/EXTENDED_RESULTS.json |
| SHARED_ASSET_DELETE_OWNERSHIP_SAFE_AND_FINAL_ZERO_REFERENCE_DELETE | PASS | EXTENDED/EXTENDED_RESULTS.json |
| COMMIT_WRITE_FAILURE_ABORT_NO_FALSE_COMMIT_NO_PAGEERROR | PASS | EXTENDED/EXTENDED_RESULTS.json |
| READBACK_HASH_MISMATCH_PREVENTS_COMMIT | PASS | EXTENDED/EXTENDED_RESULTS.json |
| FAILURE_RETRY_IDEMPOTENT_TARGET_REWRITE | PASS | EXTENDED/EXTENDED_RESULTS.json |
| CORRUPT_SOURCE_NO_FALSE_LIBRARY_MIGRATION_SUCCESS_FOREIGN_PRESERVED | PASS | EXTENDED/EXTENDED_RESULTS.json |
| CORRUPT_LIBRARY_INDEX_BLOCKS_MIGRATION_NO_SILENT_OMISSION | PASS | EXTENDED/EXTENDED_RESULTS.json |
| ASYNC_SELECTION_CHANGE_PRESERVES_CURRENT_NO_LATE_START | PASS | EXTENDED/EXTENDED_RESULTS.json |
| CROSS_TAB_LIBRARY_METADATA_REFRESH_SAVE_DELETE | PASS | EXTENDED/EXTENDED_RESULTS.json |
| SAVED_REFERENCE_SUBJECT_MISMATCH_BLOCK_PRESERVED | PASS | EXTENDED/EXTENDED_RESULTS.json |
| UNSUPPORTED_SCHEMA_NO_DOWNGRADE_OR_DELETE_DATABASE | PASS | EXTENDED/EXTENDED_RESULTS.json |
| Latest-current snapshot preserved after native activation failure | PASS | LOAD_SNAPSHOT/LOAD_SNAPSHOT_RESULTS.json |

The snapshot scenario changes current index and answerStep from 0 to 1 while new storage I/O is held, then injects a throw after native start. Restored id/index/answerStep/activation exactly match the latest pre-start state. Raw pre-fix failures and test harness corrections remain under HARNESS_HISTORY, not suppressed or counted as acceptance PASS.

Harness corrections: visible importer prerequisite; inherited port binding; async fixture retrieval; geometry dimensions captured together in the same browser frame after fonts readiness (unchanged vertical/width assertions); P12.1 reload waits for exact accepted id and profile instead of asserting before asynchronous retrieval. No profile/layout runtime change was made to accommodate these tests. Owner final batch's P12.1 timing failure is preserved; subsequent 28-assertion async-aware retest is authoritative.

Cloud near/full quota scenario is prepared for the GV case, not reported as Windows acceptance. Mandatory Windows guide checks backup, same profile/origin, migration, old images, active lesson, new image-heavy import and close/restart. No cleanup.
