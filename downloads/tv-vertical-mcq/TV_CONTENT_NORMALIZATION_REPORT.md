# Normalization and instruction separation — current candidate

The parent math/prose/zero normalization and conservative identifier/version handling are retained. No lesson JSON/ZIP or shared common.js/MathAtomic/Classroom data pipeline changes. Original parent documentation is in HISTORICAL_MATH_PARENT_REPORTS.

MCQ interpretation accepts raw marker strings and explicit option arrays. Consecutive A–E labels and nonempty choices remain mandatory. The instruction field, when an exact trailing source match, is separated before marker parsing. Recognized newline or punctuation-delimited trailing directives are removed from the last choice and rendered as a sibling tvInstruction. A choice starting “Chọn” remains intact. Unknown wording can use metadata; the parser does not classify every sentence as an instruction.

Math text is normalized by the unchanged Algebra tokenizer. Within MCQ only, binary operator boundaries and adjacent parenthetical factors allow line breaks; chunks remain nowrap and exact textContent is preserved. Spaces and zero-width breaks do not modify mathematical meaning or the unchanged TTS provider/registry protocol. Non-MCQ math behavior is retained.

Tests cover newline/inline Chọn, Hãy chọn, Giải thích, unfamiliar explicit instruction metadata, imperative choice text, long expressions and stems, zero/operators/identifiers/versions, explicit choices and repeated knowledge pages. Current results are in TV_VERTICAL_MCQ_EVIDENCE. DATA FIX=0. No actual Algebra8 Bài5 source provenance claim.
