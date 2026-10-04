# TV content normalization

ENGINE FIX, not DATA FIX. `tv-content.js` is loaded only by TV and the existing Teacher TV preview. `common.js`, `math-atomic.js`, Classroom, lesson JSON/ZIP and Teacher editing source remain unchanged.

Pipeline: raw disclosed content → MCQ / knowledge parser → subject composer → TEXT/MATH tokens and OPTION/LIST_ITEM/KNOWLEDGE nodes. HINT/ANSWER roles format only content already disclosed by the existing runtime. No answer is calculated.

- MCQ accepts consecutive A–E markers with optional post-marker space, including inline A after a stem and semicolon-separated options. Missing/repeated labels or empty choices fall back. Explicit string/text-object options use the same marker/body composer. Choice punctuation is trimmed only at a terminal separator; decimals and ellipses are preserved.
- Math prose uses recognized Vietnamese operator/quantity lexemes before numbers, only in ALGEBRA. This is a generic grammatical rule for khác/bằng/mũ/chia/nhân/cộng/trừ, not per-lesson replacement. `mũ0` → `mũ 0`; an existing `số mũ` remains intact. No blanket letter-digit insertion.
- MATH spans recognize bounded algebra operands, powers, parentheses and binary relations. Operator spacing supports =, +, −, ×, :, ·, <, >, ≤, ≥. ASCII unary/binary minus has consistent mathematical minus glyphs. `•` changes to `·` only between recognized math operands. List bullets remain bullets.
- Bare identifiers, words, numeric digits, decimal/version tails and time strings are protected by conservative token boundaries. Non-Algebra prose is literal. Geometry scene/labels are untouched.
- Question 14 remains `−15x²y² chia 3x²y`: two no-wrap math atoms and the original division verb. No inferred colon rewrite or invented instruction/answer.
- Knowledge parses raw lines before soft-line normalization. Uppercase/Markdown headings form blocks; numbered/bullet markers and their content share a list item. Standalone numbered markers join a following unambiguous body. Whole items retain source ordering.

Knowledge uses up to three cards per page; long groups partition only at complete item boundaries (260-character grouping budget). Additional pages use the existing Teacher Focus index, synchronized through the unchanged state protocol. Default shows page 1; selecting a later source item in Teacher Focus shows its page on both displays. Source offset mapping distinguishes repeated item text. Hidden pages do not enter the existing TTS registry. No automatic page/stage advancement, condensation or metadata permissions are invented.

Required digit-0/operator/identifier cases and exact outputs are in `TV_MATH_TYPOGRAPHY_EVIDENCE/AFTER/acceptance-results.json`, check “Digit 0/operator/unary minus/identifier/version/time regression”. It covers khác0, bằng0, mũ0, A=0, x=0, 0x, 10, 100, x^0, chia3x²y, B•Q=A and every required operator, plus x2/H2O/A1/HTML5/IPv6/v1.2.3/12:30. PASS. Malformed MCQ, explicit four-choice data, ellipsis, pure tables and repeated knowledge text also PASS.

Confidence limits: unsupported notation is retained; this is typography, not a symbolic algebra system. No source correction or original Algebra lesson validation is claimed. A single oversized unstructured item is not silently truncated or condensed; the inherited overflow diagnostic remains available for authoring/acceptance. No universal fit claim is made for arbitrary inputs or viewports below 1280×720.
