# Current candidate — vertical TV MCQ

MCQ always uses one full-width row per choice. No adaptive 3-column, two-column or 2+1 MCQ layout. Normal words wrap at word boundaries; mathematical terms remain intact with breaks at operators. Instructions stay outside the option list.

Read TV_VERTICAL_MCQ_REPORT.md and TV_VISUAL_ACCEPTANCE_REPORT.md for current evidence. CHECKSUMS_SHA256.txt is the active extracted-file manifest. The checksum beside the ZIP covers delivery integrity. Math parent reports are preserved under HISTORICAL_MATH_PARENT_REPORTS; older RC/R1/R2 and parent evidence describe historical builds.

Windows: extract the entire new ZIP separately into a short path, stop the previous task-owned server and run START_WEB_LIVE.bat. Import your original Algebra8 Bài5 package, use TV fullscreen, and inspect QC1/Answer1/QC2/KnowledgeClose/Question14 plus Geometry/Tin. Test long options and formulas, Hint/Answer and Teacher-TV parity. Existing Windows TTS/Demo/Launcher prerequisites and pending gates remain in effect. PRODUCTION READY=NO.

Cloud: use this directory and `python3 -m http.server 8768 --bind 127.0.0.1`. Run `node TV_VERTICAL_MCQ_TESTS/vertical.cjs`, followed by acceptance.cjs, engines.cjs, cockpit.cjs and native-tts.cjs with the same directory prefix. No npm build is needed for runtime. Native Chromium/Node/Playwright are installed for tests. Saved start_skill is a draft; environment publication/restoration is separate from current-instance validation.
