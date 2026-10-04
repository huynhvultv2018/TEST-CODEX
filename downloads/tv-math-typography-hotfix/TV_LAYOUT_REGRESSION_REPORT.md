# Layout regression

Native Chromium 151.0.7922.173 on Linux. No speech/provider/application mocks certify these results. Suites run against the selected candidate HTTP root on port 8765; logs/results are under `TV_MATH_TYPOGRAPHY_EVIDENCE`.

| Suite | Executed result |
| --- | --- |
| acceptance.cjs | 29 PASS, 24 screenshots; four TV viewports: 1920×1080, 1600×900, 1366×768, 1280×720 |
| engines.cjs | 171 real screens, 342 disclosed states, 15 assertions, 44 screenshots; zero vertical/horizontal overflow |
| cockpit.cjs | 30 PASS, 15 screenshots; native buttons, fullscreen, focus and actual popup/preview synchronization |
| native-tts.cjs | 20 PASS for registry/context/settings/transports; audible speech UNRUN (native voices=0) |
| Runtime syntax | 33 JavaScript files PASS |
| Scope audit | R2 parent 489 files unchanged; five existing TV runtime files modified, one module added |

Real packages: Tin6 W04/W05, Tin8 W04, Geometry8 T04–T07 single/dual visual. Algebra cases are explicit presentation fixtures and user-provided strings. The original Đại số 8 Bài 5 package is unavailable. Tests do not establish its source provenance or a DATA FIX.

Regression covers MCQ cards and explicit options, standalone knowledge markers, protected identifiers/versions/digit 0, operator glyphs/spacing, whole-equation and monomial wrapping, pure Algebra tables, progressive hint/analysis/proof, future-answer secrecy, exclusive answer display, Knowledge Close waiting/reveal, Focus selecting knowledge pages, offline navigation, reload, reconnect, overlays/labels/pointer/zoom, whiteboard, timer, Demo presentation and no unintended launch request. Source lesson remains unchanged in memory and on disk. No browser page errors or external dependency requests in engine regression.

`scope-audit.json` and `PRESENTATION_PATCH.diff` distinguish ENGINE FIX/LAYOUT FIX from DATA FIX=0. Teacher/modal R2, pedagogy, TTS R1/provider, cockpit, Classroom, Geometry Scene, Demo, Launcher, BAT files and lesson ZIP/JSON are byte-identical to R2. Existing sync/disclosure state fields and lesson order are unchanged.

Native Windows, physical TV distance/readability, audible Vietnamese TTS, native applications and full Launcher acceptance are UNRUN. No Production promotion. Historical reports inside the inherited parent folders are not current validation; use this task's reports, evidence and current CHECKSUMS_SHA256.txt.
