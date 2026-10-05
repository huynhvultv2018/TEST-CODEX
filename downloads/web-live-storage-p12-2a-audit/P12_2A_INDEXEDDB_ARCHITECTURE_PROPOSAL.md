# P12.2A — IndexedDB architecture proposal (NOT IMPLEMENTED)

Đề xuất dựa trên P12.1 frozen; không có DB/backend/module mới được triển khai. Loader là owner logic storage; Core chỉ giữ plumbing đọc/ghi và bootstrap khi được GV duyệt riêng. Không đổi UI/pedagogy/navigation/profiles.

## Boundary assessment

LOADER_LOCAL_STORAGE_ADAPTER_FEASIBLE=YES as owner; pure Loader-only durable migration/cleanup end-to-end=NO with frozen Core. zip.js:32–53 expose synchronous library/package API; Teacher consumers dùng API này. tv.js:7–15 tự getItem full lesson; tv.js:138 receive lesson reply lại setItem full JSON. TV không load subject-loader, vì vậy Loader-only IDB không phục vụ standalone/reopen TV và backwrite tái tạo quota/full-data dual store. Teacher RAM needLesson reply chỉ hỗ trợ Teacher đang sống, không thay persistent read.

pedagogy-teacher.js:51–58 gọi restore ngay với getLesson đồng bộ; teacher.html:242 load pedagogy trước subject-loader.js:245. Hydrate async sau Loader không giữ accepted-session startup contract nếu không storage-ready hook.

Core changes required in future, design only:

| Proposed dependency | Purpose / bounded scope |
| --- | --- |
| zip.js storage API | Route list/get/save/delete via shared owner adapter; audit all callers, keep native validation/import helpers |
| tv.js | Await lesson hydrate, verify id/sourceKey/activation, no persistent full localStorage backwrite |
| teacher.html / tv.html | Shared Loader-owned storage bootstrap loaded before consumers, same origin |
| pedagogy-teacher.js | Gate accepted-session restore on storageReady; preserve index/clock validation and disclosure reset |
| common.js if session grows | Thin refs + async control hydration; maintain state/broadcast events and clock/reset behavior |
| teacher.js only as needed | Await commit/readiness at existing call boundaries; no change start semantics |

Pure Loader IDB with full current lesson LS bridge is rejected: current large package still hits quota and completed migration keeps full payload in two persistent places. Copy-only IDB is a temporary safety stage, not capacity fix. Core dependency must be explicit in P12.2B authorization; no patch now.

## Storage placement / schema version1 proposal

DB name proposed WEB_LIVE_DB; not assumed to exist. Same origin required; hostname/port/protocol changes select different DB+LS. Keep stable Windows launch origin or design separate export/import later.

| Store | Key / fields | Role / invariants |
| --- | --- | --- |
| lessons | canonicalId; schemaVersion, contentRevisionSHA256, originalId/packageId, _runtimeSourceKey, sourceFingerprint, rawSubject, runtimeEngine, derived subjectCategory/grade/week/period, savedAt/title; body sans inline bytes; bindings[] | One persistent payload representation + query metadata, preserve all authored fields semantically; no second full library metadata blob |
| assets | rawByteSHA256; Blob or ArrayBuffer, byteLength, verifiedSHA256, refCount, encoding metadata where necessary | Shared raw bytes; bindings preserve exact MIME/dataURI prefix, JSON path and encoding/roundtrip hash |
| control | explicit key: schema/version, active generation, migration job/journal, health; current session record if required | Durable statuses/counts/verification and session refs; separate from authored package |
| quarantine | known-owned key+raw SHA/reason, optional verified raw bytes | Only authorized corrupt WEB LIVE copies for manual recovery; never destroy original, unknown records never copied/deleted automatically |

Query indexes on derived subjectCategory/runtimeEngine where validated; optional compound grade/week/period only with valid IndexedDB key values. Keep absent values explicit, do not index undefined/NaN. Use P12.1 resolver and numeric week/period sort/filter semantics for all Legacy/modern packages. Query metadata without reading asset blobs; then apply existing Loader predicates/collator/missing-field grouping. Recent metadata stays bounded local refs, reconcile against committed lessons. Index metadata rebuilt from valid records, not filenames.

## Identity source contract

zip.js:39–50 selects x.id || x.packageId || subject_week_period, stores _runtimeSourceKey (ZIP raw bytes or JSON stringify FNV1a64). Different source key and changed screens/title/subject create original~source suffix; same those fields overwrite canonical id. This is existing behavior, not SHA256 identity. Recompressed ZIP/metadata edits can change source fingerprint without necessarily new canonical id.

Migration copies actual existing lesson key suffix and canonical id exactly; verify ID mismatch rather than normalize silently. Preserve packageId, raw subject, engine and source key. Add SHA256 original serialized bytes + canonical reconstructed-content revision for integrity, not silent renaming. New imports reuse P12.1 conflict resolution after lookup; duplicate same source/revision is idempotent, source collisions require comparison. Never dedup two lesson ids solely on same image/content hash. Filename only display hint. FNV1a is not cryptographic collision proof; SHA256 is additive verification.

## Adapter API contracts (design, no code)

| Async interface | Contract |
| --- | --- |
| initialize / storageReady | Open compatible schema, resume journal, return health; never auto-delete LS |
| listMetadata(filters) | Committed records only, thin metadata, same subject/grade/week/period grouping |
| readLesson(id, expectedRevision/sourceKey) | Read body+assets, validate SHA/counts/paths, reconstruct exact runtime JSON in RAM |
| savePrepared(prepared, expectedCurrentRevision) | Stage validation first, atomic lessons/assets/refcount/control commit; success only on transaction complete |
| deleteLesson(id, expectedRevision) | One transaction lesson+index+asset references, never delete shared asset or active RAM lesson implicitly |
| getControl / saveControl | Owned prefs/session records, explicit size/race policy |
| planLegacyMigration / copy / verify / activate / resume | Journal-backed, explicit approval gates, exact ownership and revisions |
| getStorageHealth | Available/warning/migration required/failed/DB unavailable and actionable reason |

request.onsuccess is not durable transaction completion. Validate/decode/hash before write transaction to avoid idle transaction auto-close; avoid unrelated awaits inside transaction. Hash binding/reconstruction check after readback in independent transaction. Serialize import/cutover/delete with per-origin writer coordination + durable lease/generation check; feature-detect locks with timeout fallback. Late async results use staging token+current activation/source revision so old selections cannot replace the live lesson.

## Payload/assets compatibility

Store decoded images as Blob/ArrayBuffer, not base64 in localStorage. Blob avoids ~4/3 encoded text growth and raw dedup avoids repeated screenshots; decode/hydrate cost and RAM peak remain. Preserve each original dataURI byte representation for reconstruction verification (prefix, mime, original encoded digest/normalization rules). Unsupported/unroundtrippable dataURI stays lossless in body/quarantine; never drop field. During rendering reconstruct same dataURI strings in RAM; not a new persisted full payload. Maintain imageData vs geometryImageData both bindings to one raw asset, without changing screen structure.

Informatics tv-layout-computer.js:34–44 accepts data:image or approved same-origin pathname types. blob: URLs are currently rejected (video too). Initial scope keeps static/local video/path references and verifies availability; no media blob-URL contract patch. Embedded images may reconstruct dataURI. General large video DB blob storage is feasible only after separately approving media-serving/profile contract; proposal does not claim offline video conversion already supported. Keep local media references/path/checksum metadata when binaries belong to distributed runtime assets. Broken reference blocks selected lesson preflight with current preserved, never fabricate content.

## LocalStorage target and transitional exceptions

Keep small synchronous TTS/user prefs, last subject, Recent refs ≤5, thin session/generation refs and cross-tab coordination. Full lesson JSON and inline bytes move out only after verified/gated cleanup. Library index becomes DB query; small index hints never full data. Existing vectors/checkpoints/vendor settings initially remain untouched to preserve profile isolation; no guarantee of indefinite smallness. An audit size-warning can flag large dependent records later, but moving them needs separate authorization. Do not claim initial migration eliminates every future LS quota source.

## Load/delete/health contracts

Parse→validate subject/profile/mismatch/assets→stage→DB transaction complete→verified hydration/preflight→native start once→reset profile disclosures→Recent/last-subject optional. Any essential error preserves current lesson/activation/session/clock and saved library; optional prefs error warns after successful load. Subject mismatch, remember-last-subject without autoload, cancellation, importer close/reopen, Legacy unknown subject grouping, grade/week/period filters all unchanged. Four profiles receive the same runtime object/activation and reset contract; no profile changes.

Future delete confirms precise id/revision; atomically removes lesson+its metadata and decrements per-lesson unique asset refs; asset only removed at refCount0 after checking bindings. Replacement adjusts old/new refs in one transaction. DB abort preserves all three. Deleting active persisted lesson does not forcibly clear live RAM: document explicit UX/reopen consequences before implementation. Recent refs reconciled after delete; optional LS failure cannot rollback a committed DB deletion into inconsistent full-data restore. Annotation/checkpoint cleanup not part of initial payload migration; report retained orphan risk rather than broad-delete user work.

Health states: AVAILABLE (compatibleDB/validrecords), WARNING (capacity near measured estimate, optional prefs/cleanup pending), MIGRATION_REQUIRED (valid oldpayload), FAILED (migration/verify failure, old preserved before cleanup), DB_UNAVAILABLE (unsupported/blocked/open/read failure). Use current status/toast surface, no UI redesign. A healthy active RAM lesson stays teaching even if DB later unavailable; no silent save to full LS fallback.

IndexedDB also has browser storage limits. storage.estimate/persist optional with feature detection and no promise of unlimited/guaranteed retention. Account disk capacity, double-storage staging, private mode, origin eviction, policy denial, stable-origin upgrades and RAM for hydration. Persistent browser storage is not a backup.
