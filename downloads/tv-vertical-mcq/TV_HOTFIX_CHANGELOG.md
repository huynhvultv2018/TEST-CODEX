# Vertical MCQ candidate — changelog

Separate child of the math typography/structured-content candidate; original candidate/ZIP/download branch remain unchanged.

- tv-ui.css: one-column option list at every width/count; full cognitive-panel width; consistent row styling; normal word wrapping and intact math chunks.
- tv-content.js: separate newline/inline/metadata instructions; preserve imperative choices; operator/factor breaks in MCQ choices/stems without altering exact expression text.
- tv-layout-model.js: pass explicit instruction metadata to the presentation parser.
- tv-layout.js: MCQ-only font fitting to the existing 30px floor; choose the largest size that fits.

Four runtime files changed. Teacher, R1 TTS/R2 modal fixes, pedagogy, sync/state schema, Geometry Scene, Demo, Launcher, lessons and non-MCQ layouts remain unchanged. DATA FIX=0.

Add TV_VERTICAL_MCQ_TESTS/EVIDENCE, current reports/README and CHECKSUMS_SHA256.txt. Parent same-name reports/checksum are copied to clearly historical locations. Existing older reports/evidence remain history, not current runtime certification.

Cloud checks PASS within documented scope. Windows/physical TV/original Algebra lesson/audio/native application acceptance remains pending. PRODUCTION READY=NO.
