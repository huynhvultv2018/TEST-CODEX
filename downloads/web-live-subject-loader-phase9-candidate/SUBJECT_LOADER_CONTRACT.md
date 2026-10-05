# Subject loader contract

## Responsibility and routing

SELECT → VALIDATE → ROUTE → LOAD only. Teacher-only UI. subject_engine top-level lesson metadata is authoritative. geometry→Geometry, algebra→Algebra, informatics→Informatics, absent/legacy/default→Legacy. Trim/case normalization matches native resolver; present empty/null/nonstring/unsupported values block. subject/file/folder/content keywords never select the profile. Manifest fields do not override lesson subject_engine. New subjects require registry plus existing Core support; no heuristic fallback to a subject-specific profile.

Preview shows only scalar values actually present on lesson metadata: subject, grade or class, week, period, title, subject_engine. Zero values displayed; no inferred grade/week/period and no curriculum content generated. Strings inserted with textContent; no HTML execution. Active-profile indicator updates only after successful native load. Unknown staged profile cannot alter current indicator.

## Inputs and validation

Native ZIP/JSON picker, existing sample and saved-library selections all stage and require explicit NẠP BÀI. ZIP requires exactly one lesson.json; native manifest JSON must parse when present. Nonempty screens must contain objects. Image files referenced by native screen visual fields must be embedded or present in ZIP and decode. Native existing ZIP size/path/compression limits retained, entry CRC checked. Required files means lesson.json and actual referenced assets; no new mandatory schema or manifest structure introduced.

Informatics declared MEDIA src must satisfy existing local/data-image renderer contract and have a usable asset. ZIP-contained images become supported data-image on the detached staged lesson; original package untouched. Packaged video remains manual-play with existing local supported URL; if ZIP supplies video at that URL, served bytes must match. No blob/data-video engine extension. Existing intentionally absent optional metadata stays optional.

## Commit and failed-load behavior

Validation and preview never call saveLesson/start. Changing selection revalidates pending subject; cancel/close invalidates async tickets; later stale completion cannot publish. Failure preserves active lesson, activation/index/hint/answer/proof/Focus/zoom/annotations/sample and saved library. Subject mismatch blocks immediate load; GV may change selected subject to match pending metadata and explicitly commit.

Commit order: final metadata/subject recheck → detached lesson copy → existing persistence → saved-library UI preflight → native start/reset/render/sync. Loader keeps original storage/native controller values for exception rollback. Native start assigns fresh lessonActivation and original profile/scene lifecycle; it resets foreground disclosure/Focus/zoom/layout. Geometry own-scene persisted annotations retain existing frozen semantics; never transfer into another profile/lesson scope. Internal importZip remains its historical persisting API; public Teacher import controls use staged preparation.

Native sync counters and TTS transport status can advance independently while a modal is open or during rollback; semantic lesson/state remains protected. No claim of distributed ACID across multiple simultaneous Teacher tabs; one active Teacher import transaction tested. No state schema/Core/profile change, no new synchronization channel.

Error text records failed read/validation/commit; native lesson stays active. Exceptional preflight/persistence errors reopen/retain importer with visible error. Unexpected native start exceptions restore native controller maps/state and old indicator and re-sync. Failed loading is never solved by modifying lesson pedagogy or profile engine.

Source boundary: teacher.html, importer helper zip.js, new subject-loader.js/css only. No alteration of Core routing/default fallback used by internal runtime callers; new public Loader is stricter about malformed engine metadata before calling Core.
