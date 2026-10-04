# Root cause — vertical MCQ revision

The parent intentionally adapted MCQ to 2/3 columns and a 2×2 four-choice grid. The user's current design requirement supersedes that policy: every option must be a full-width row. CSS/LAYOUT change removes all count/width-dependent MCQ columns.

The parent's inherited overflow-wrap:break-word could split plain choice text at characters; MCQ body now explicitly uses overflow-wrap:normal and word-break:normal. Its math wrapper selected nowrap using a character-count heuristic, which ignores actual available width. RENDER change uses intact chunks with breaks at operators/parenthetical-factor boundaries for MCQ stems and choices.

The parent separated only newline directives after the last choice. Inline punctuation-delimited directives and explicit instruction metadata now form a separate semantic sibling. Choices beginning with imperative words are retained; unknown prose is not guessed. PARSER change, DATA FIX=0.

During the new five-choice generic regression, the parent's three fit factors stopped before reaching the existing readable floor and left vertical overflow. MCQ-only fitting now seeks the largest font that fits, down to 30px. Non-MCQ fit factors remain unchanged.

Current results: 40 vertical checks + 29 parent acceptance checks + 342 real states + 30 cockpit checks + 20 native registry checks PASS; no tested clipping/scroll/JS errors. Current Windows/physical TV/original Algebra lesson acceptance remains pending. See TV_VERTICAL_MCQ_REPORT.md. The parent's original RCA is preserved in HISTORICAL_MATH_PARENT_REPORTS.
