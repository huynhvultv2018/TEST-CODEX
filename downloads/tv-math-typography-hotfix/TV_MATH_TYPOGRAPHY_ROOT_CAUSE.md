# RCA — recorded before runtime changes

Baseline: HOTFIX R2, Linux Chromium, 1280×720. Reproduction uses the exact defective strings from the user's request plus explicitly labelled knowledge headings/list fixtures. The actual Windows `Đại số 8 • Bài 5` package was not supplied in this workspace. No DATA FIX is asserted or made.

Evidence: `TV_MATH_TYPOGRAPHY_EVIDENCE/BEFORE/results.json` and four screenshots; rerun `TV_MATH_TYPOGRAPHY_TESTS/before.cjs` against an unchanged R2 server on port 8767.

| Symptom | Verified layer | Evidence / implication |
| --- | --- | --- |
| A.-6 / B.6 / C.5 stay in paragraphs | PARSER ERROR | `TVMultiEngine.options` requires whitespace after the marker. Both user MCQs return null, zero option cards. |
| Algebra lacks option layout even for parsed choices | RENDER ERROR | Only Computer Science consumes `vm.options`. Algebra renderer has no MCQ branch. |
| khác0 / bằng0 / mũ0 / chia3x²y persist | NORMALIZATION GAP | `normalizeLiveText` retains those input strings. It does not delete pre-existing spaces within these lines. Original lesson DATA origin remains unverified. |
| A=0 and B•Q=A remain cramped | RENDER / TYPOGRAPHY GAP | `renderMathAtomic` keeps source spacing and operators. Its scope is only no-wrap short relations. |
| Knowledge headings merge into prose; 2. / 3. stand alone | NORMALIZATION + PARSER ERROR | Soft-line joining combines headings with subsequent prose; `Classroom.parts` creates standalone marker focus blocks. No semantic knowledge/list model exists. |
| Knowledge scrollbar | CSS/LAYOUT ERROR | Reproduction has `data-tv-overflow=true`. Existing fit falls back to vertical scrolling after bounded font reduction; paragraphs lack hierarchy/columns. |
| Question 14 `chia3x²y` | NORMALIZATION / TYPOGRAPHY GAP | Output retains the joined division verb. Its intent cannot justify replacing prose with an inferred algebra operation. |

Presentation changes will parse raw lines before generic soft-line joining, normalize only recognized algebra prose/math tokens, render all option cards through one composer, and structure knowledge headings/lists. No answer calculation, lesson rewriting, stage changes or source whitespace attribution is needed.

DATA ERROR: unresolved for the actual lesson; source package is unavailable. The fixture intentionally contains the reported strings. ENGINE FIX and LAYOUT FIX can be verified independently. Native Windows/physical TV/audio acceptance remains unrun.
