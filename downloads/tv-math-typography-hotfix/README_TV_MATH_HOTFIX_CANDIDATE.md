# Current candidate — TV math typography and structured content

PRODUCTION READY=NO. Read TV_VISUAL_ACCEPTANCE_REPORT.md for cloud PASS scope and pending Windows/actual lesson checks. This candidate includes the R1 TTS and R2 modal fixes, with a TV-only typography/semantic layout extension.

Windows: extract the complete ZIP separately, preferably under C:\WEB_LIVE to keep paths short. Stop the previous task-owned service, run START_WEB_LIVE.bat, and import your original Algebra8 Bài5 ZIP in Teacher. Check QC1/Answer1/QC2/KnowledgeClose/Question14 on TV fullscreen. Do not test the new bundle against a server still serving R2.

Knowledge Close remains hidden until the teacher reveals it. Content is grouped into complete cards and list items. For long knowledge with multiple pages, turn on the existing Teacher Focus tool and click an item in the annotation editor; that item's page appears in preview and actual TV. Clear Focus returns to the first page. No automatic advance, new lesson timing or schema is introduced.

Use CHECKSUMS_SHA256.txt for current extracted-file integrity. The top-level delivery manifest covers ZIP integrity. Historical RC/R1/R2 reports/checksums inside the package are reference only. User-example fixtures are tests, not a validated SGK Algebra lesson.

Cloud startup: in this directory run `python3 -m http.server 8765 --bind 127.0.0.1`. Native browser tests: `node TV_MATH_TYPOGRAPHY_TESTS/acceptance.cjs`, `engines.cjs`, `cockpit.cjs`, `native-tts.cjs` (use the same directory prefix). Runtime needs no npm build or external web dependencies. Test workflow uses installed Node/Playwright/Chromium. Linux cannot certify Win32/audio/physical TV.
