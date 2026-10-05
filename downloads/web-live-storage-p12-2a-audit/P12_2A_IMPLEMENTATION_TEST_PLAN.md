# P12.2A — P12.2B implementation test plan

All tests below PLANNED / NOT_RUN. P12.2A ran source audit and RAM measurement/trace only. Authorize P12.2B explicitly before writing IDB or Core bridge. Cleanup contract and compatible rollback path must be approved first; if not, only copy/verify may be implemented, no completed-migration/capacity-fixed claim.

## Gates / instrumentation

Separate disposable origins/profiles for destructive test scenarios; never operate GV data. Preserve source P12.1 fixture hashes. Baseline capture raw key digests, selected lesson/activation/sourceKey/index/clock/disclosures, DB store counts/hashes, cross-tab state. Capture actual browser operations/errors/txn complete and IDB assets; native quota tests must not be labelled injection, injection cases separate. Verify no profile/lesson content change, no foreign writes/delete and no full persistent package dual-store after approved completion. Integrity pass is required alongside function behavior.

| ID | Case / action | Expected acceptance |
| --- | --- | --- |
| B01 | Empty DB / no old library, initialize twice | Schema compatible; empty list; no migration prompt loop, no unintended LS payload write |
| B02 | First lesson save | txn complete before native start; valid metadata/body/assets; reopen matches source |
| B03 | Multiple saves / overwrite | Distinct canonical IDs; sorted library accurate; no duplicated metadata/refcounts on same revision |
| B04 | One large image lesson incl repeated same screenshot | One raw asset per hash, all bindings hydrate exact image fields; no clipping/render regression |
| B05 | Multiple large lessons sharing/unique images | Shared refcount correct, unique bytes retained; no full base64 LS payload |
| B06 | Teacher reload, TV alone reopen, Teacher+TV reconnect | Async readiness accepted source/index/clock; disclose reset; matching activation; TV never full LS backwrite |
| B07 | Delete one lesson, shared asset, unique asset, active lesson | Atomic lesson/index removal; shared asset kept; unique removed only safe zero-ref; current RAM behavior documented; reopen deleted id unavailable |
| B08 | Recent / remember last subject / stale recent after delete | Limit5, metadata only, success-only updates; remember subject no autoload; stale refs reconciled |
| B09 | Subject/grade/week/period filters / unknown Legacy subjects | Same P12.1 resolver grouping, numeric sort and missing grouping; thin metadata query no eager blobs |
| B10 | Legacy unknown/missing/valid subject + mismatch package | Subject separate from runtime; allowed compatibility preserved; invalid/mismatch blocked before persistent commit; current unchanged |
| B11 | Geometry / Algebra / Informatics / Legacy profiles | Existing suites mandatory; same fields/activation/resets, vertical MCQ, math/structured content/draw/checkpoints/TTS unaffected |
| B12 | Migration success, readback then reload before cleanup | Source/target counts/hash/asset bindings exact, journal version/result durable; no delete before independent verify |
| B13 | Browser close / simulated process kill / restart at every state | Old unchanged pre-activation; idempotent resume, no double refs; post-cleanup recovery as approved contract, never false full-old claim |
| B14 | Copy write/quota/txn fail, verify mismatch/read fail | Abort/fail not committed; original key bytes and current context unchanged, explicit error |
| B15 | IDB unsupported/denied/blocked/open upgrade fail | No crash, current remains, bounded timeout and DB_UNAVAILABLE; no deleteDB/recreate or large LS fallback |
| B16 | Duplicate source, recompressed ZIP, altered metadata/screens with same id | Existing identity conflict rule; source/hash comparison; duplicate idempotent, distinct source collision preserved |
| B17 | Corrupt source JSON, missing lesson/index, invalid ID, asset corruption | Reject/quarantine report, no silent drop/content fix, original intact, no full migration success |
| B18 | Current preservation at parse/validate/store/preflight/start failure | Lesson, activation, sourceKey, index, clock and profile disclosure snapshots preserved; rollback failures explicitly surfaced |
| B19 | Rollback before/after activation; partial cleanup; LS restoration quota | Verified previous generation/current survives; restore never evicts foreign/user data; frozen downgrade not promised |
| B20 | Unknown keys/vendor prefs/cross-tab changes | Exact digests intact; no broad rollback writes; concurrent source update stops/reverifies activation/cleanup |
| B21 | DB transaction abort after request success | No success UI/Recent/native start until transaction complete; asset/index/package all-or-nothing |
| B22 | Optional local prefs/session hint write failure | Saved lesson valid, current shown; optional warning; no DB rollback from nonessential failure |
| B23 | Media references/dataURI type/path/blocked remote/blob URL | Approved P12.1 contract unchanged; local media remains playable; unavailable asset blocks appropriate preflight; blob video conversion NOT silently enabled |
| B24 | Old schema/versionchange/unknown schema | Compatible upgrade atomic/versioned; unsupported preserves DB/LS and prompts recovery, no destructive fallback |
| B25 | Cancellation/quick repeated selections while async save/read | Staging token and revision prevent stale async result replacing current; importer close restores expected focus/modal behavior |
| B26 | Actual LS quota with preexisting full library | Verified DB path permits large save only after approved migration; guard still safe for retained small keys; native error trace captured |
| B27 | Low disk/private mode/persistence denied/eviction | Warn truthfully, no unlimited/guaranteed storage claim; after origin eviction recovery requires external backup |
| B28 | Local origin/port change / two TV tabs | Clearly separate origins; no implicit migration; same-origin events broadcast compatible refs and activation |
| B29 | Cleanup remove succeeds then journal fails | Reopen reconciles exact verified source digest; target retained, CLEANUP_PENDING, no false all-old-preserved |
| B30 | Stable index metadata after delete/replacement/transaction fail | No stale index or dangling assets, reference-count recompute verifies journal counts |

## Synthetic scale matrix (NOT_RUN)

Cartesian grid: 10/50/100/250 lessons × 0/0.25/1/4 MiB unique raw assets per lesson × sharing0%/50%/90%, with small(~10KiB) and structured(~100KiB) JSON bodies. Include one image near supported entry limit and many smaller screenshots, repeated screen bindings, large vector state as separate retained-key scenario. Respect frozen importer file limits unless explicitly testing rejection; synthetic fixtures outside candidate and tagged TEST_ONLY, not SGK packages.

| Lessons | Raw 0.25MiB each | Raw1MiB each | Raw4MiB each |
| --- | --- | --- | --- |
| 10 | 2.5MiB | 10MiB | 40MiB |
| 50 | 12.5MiB | 50MiB | 200MiB |
| 100 | 25MiB | 100MiB | 400MiB |
| 250 | 62.5MiB | 250MiB | 1000MiB |

These are calculated no-sharing raw totals, not measured usable browser capacity. Add body/bindings/index/journal/backup+temporary LS copy and RAM decode peak; base64 would add4/3 character factor and UTF16 approx8/3, with duplication if repeated fields. Large-grid quota abort is valid expected result if consistent/current preserved; no requirement browser stores1GB blindly. Synthetic copied data must not inflate journal reference counts on retry.

Record open/list/save/read/hydrate/delete/migration p50/p95 latency, main-thread long tasks, peak RAM, estimated storage usage/quota when API available, unique assets/refs, key/body/hash counts. Suggested responsiveness budget for metadata/filter p95<200ms on chosen reference hardware after warmup; hardware-specific and must be reviewed, not claimed already achieved. Cold lesson opening budget based on measured assets, never start partial scene to meet latency. Repeat same grid after reopen and interrupted migration; compare exact metadata+content, not just count.

P12.2B release gate: required functional/regression/native failure cases pass; scale successes/failures precisely reported; candidate immutable after packaging. Windows full retest required later to close real-use P11-F01 and unblock P12.1 full retest. Physical TV and classroom remain separate UNRUN until GV performs them; P12.2A does not authorize them or Phase13.
