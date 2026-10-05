# P12.1 — Loader-local subject / engine contract

Discovery subject and runtime engine are separate. resolveSubject returns {id,engine,known,source}; id is a filter category, not a package write or Core profile. known=false with id=legacy means compatibility bucket, not assigned lesson subject “Legacy”. engine() and frozen WebLiveProfiles resolver unchanged.

| Existing official metadata | Discovery selection | Runtime |
|---|---|---|
| subject Tin học / Tin học6 / Tin học8, engine absent/legacy/default | informatics | legacy |
| subject Hình học8, engine absent/legacy/default | geometry | legacy |
| subject Đại số8, engine absent/legacy/default | algebra | legacy |
| explicit recognized subject and matching modern explicit engine | that subject | exact supplied modern engine |
| generic/unrecognized subject, valid explicit modern engine | existing engine compatibility category | supplied modern engine |
| unknown/missing subject, absent/legacy/default engine | unknown Legacy compatibility bucket | legacy |
| recognized subject different from nonlegacy explicit engine | BLOCK / clear metadata-conflict warning | no commit |
| true subject mismatch with selected subject | BLOCK | no commit |
| invalid/empty/unsupported explicit engine | BLOCK | no fallback bypass |

Actual source inventory found top-level subject and subject_engine; no other existing subject-related structured fields. Use those fields only, do not invent nested metadata keys/contracts. Mapping priority: recognized official subject; if unknown, retain existing explicit-modern-engine compatibility; else unknown Legacy bucket. The safe Legacy mapping interprets official subject labels only, never pedagogy.

Safe map is anchored full-string: Hình học/Đại số/Tin học, optionally grade6–9 or “lớp6–9”, plus canonical geometry/algebra/informatics tokens. Unicode NFKC, case/whitespace normalization only, max160characters. Additional unknown suffixes/mixed labels/Toán8/misleading title or filename are not substring-matched. Unknown packages remain accessible in Legacy bucket with “Môn chưa xác định”/“Chưa đủ thông tin: MÔN”, not guessed. No filename/content/question/PPCT/SGK/SBT heuristic. Subject numeral never writes grade or engine.

Recognized subject with engine absent remains property-absent after load/save; explicit legacy/default raw value stays unchanged. No engine inference, new profile, Core resolver edit, package source rewrite, pedagogy generation or subject metadata insertion. Standard native sourceKey/ZIP image preparation behavior unchanged.

Preview shows actual raw subject if supplied, present grade/week/period/title and separate Chế độ chạy including absent-engine Legacy status. Mismatch labels subject independently of engine; never “Môn của bài: Legacy” for a known Tin/Hình/Đại subject. Library and Recent show source metadata plus runtime mode. Indicator labels resolved subject or unknown, plus actual runtime mode.

Library Môn → Lớp → Tuần → Tiết uses subjectId and native grade/week/period fields. Numeric sort/cascade/clear-pending unchanged. Missing grade/week/period remains incomplete; unknown-subject packages use Legacy compatibility bucket, with an unknown note even if G/W/P are present. Invalid contradictory cache rows remain visibly invalid and stage-blocked, not relabeled or repaired. All/unknown options use actual data only. No grade inferred from Tin học6.

Recent keeps original namespace/version, fields and max5/8192character bound. subjectEngine remains actual engine; lastSubject is discovery subject after successful commit. Cached lesson is revalidated on every reopen; original existing optional entries read unchanged. Old lastSubject values are not automatically migrated/reinterpreted; next successful explicit load updates correctly. No read-time writes, duplicated package/assets, storage architecture migration or IndexedDB/quota changes.

Transaction stage/validation/assets/profile routing/explicit commit/current rollback unchanged in code except subject validation and compatibility conflict gate. Essential quota guard exact; optional quick-access failure remains nonfatal to successful load. Grade/week/period change cancels pending preview without changing current Teacher/TV. Native accepted-session restore on reload retained, quick subject memory does not initiate new load.

Scope only subject-loader.js plus external tests/reports. subject-loader.css unchanged. Physical Windows retest/TV/classroom UNRUN. P11-F01 P2 OPEN_DEFERRED, capacity limit not removed. No Phase13/Production.
