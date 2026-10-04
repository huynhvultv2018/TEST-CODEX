# TV MCQ — vertical options by default

**CLOUD ACCEPTANCE = PASS. WINDOWS/PHYSICAL TV RETEST = PENDING. PRODUCTION READY = NO.**

Every MCQ now has one full-width row per option at every supported TV viewport. Removed the default two-column grid and all 3/4-choice, long-option and responsive column overrides. There is no 3-column or 2+1 MCQ arrangement. Knowledge and other non-MCQ layouts retain their existing behavior.

Option marker and body share a consistent row. Text uses normal word wrapping; mathematical chunks keep operands intact and wrap at binary operators or between adjacent parenthetical factors. Operators remain attached to following operands. The exact formatted expression text is preserved for display/TTS. This applies to both choices and MCQ stems, including narrow panels beside illustrations.

Trailing directives are separate siblings of the option list. The parser supports newline and punctuation-delimited directives and an explicit instruction field for other wording. An option beginning with “Chọn”, such as “Chọn Close”, remains an option. No guessing of arbitrary prose or source lesson rewrite is performed.

MCQ uses the largest font that fits after tightening spacing. The fit loop can reach the existing 30px content floor for five vertical choices; non-MCQ fitting is unchanged. No character-by-character wrapping, clipping, horizontal overflow or vertical scrolling occurred in executed checks. This is a bounded viewport/content claim, not a physical classroom distance measurement.

| Validation | Result |
| --- | --- |
| Vertical MCQ native suite | 40 PASS, 31 screenshots |
| Math/structured-content regression | 29 PASS, 24 screenshots |
| Real Tin/Geometry packages | 171 screens, 342 disclosed states; 15 assertions; 44 screenshots |
| Teacher cockpit | 30 PASS, 15 screenshots |
| Native TTS registry/context/settings | 20 PASS; speech audio UNRUN (native voices=0) |
| Runtime syntax | 33 JavaScript files PASS |
| Parent preservation | 614 parent files unchanged in the original candidate |

TV sizes: 1920×1080, 1600×900, 1366×768, 1280×720. Tests measure equal full panel widths, non-overlapping vertical rows, font floor, panel containment in viewport, content containment in panel, intact no-wrap chunks, exact expression text, instruction separation and Teacher preview/actual popup parity. Cases include QC1/QC2, four explicit options, long choice expressions, long stems with figures, inline/metadata directives, two Geometry choices and five generic choices. Browser page errors=0; tested overflow=0.

Evidence: `TV_VERTICAL_MCQ_EVIDENCE/vertical-results.json`, root screenshots, `AFTER`, `ENGINES`, `COCKPIT`, `TTS`, `scope-audit.json` and `VERTICAL_MCQ_PATCH.diff`. `BEFORE` contains labelled inherited parent captures with horizontal options. Older evidence folders and `HISTORICAL_MATH_PARENT_REPORTS` are historical.

Runtime changes are limited to tv-ui.css, tv-content.js, tv-layout-model.js and tv-layout.js. Teacher, R1 TTS fix/provider, R2 modal fix, pedagogy/disclosure/sync, Geometry Scene, Demo, Launcher, source lesson JSON/ZIP and non-MCQ engines remain unchanged. DATA FIX=0; state protocol changes=0.

The original Algebra8 Bài5 lesson and native Windows/physical TV are unavailable here. The published candidate retains pending Windows/audio/native-app/Launcher acceptance; no Production promotion. Retest the original lesson in a separately extracted candidate, with the prior task-owned server stopped, and verify every choice row and long formula on the actual TV.
