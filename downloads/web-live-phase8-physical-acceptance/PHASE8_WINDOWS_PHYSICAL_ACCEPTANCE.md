# Phase8 — Windows physical acceptance

Status: UNRUN — pending actual GV Windows/TV testing. No physical evidence supplied; cloud Linux has no access to those devices. Phase7 Linux/browser evidence is not Phase8 acceptance. UNRUN is a recording state, not PASS, FAIL or NOT_APPLICABLE. Assign requested verdicts only after testing; do not use NOT_APPLICABLE for inaccessible devices.

RC1 FROZEN; SHA256 d09db03f88c065d1167030fa5bd45f6467fc464c31d7a228003a20ac28769fc5. Cloud preparation hash/CRC/extraction verified; not a physical-machine before/after result. No application executed or changed during Phase8 preparation. No development/refactor/redesign/patch/Production.

## Runtime checklist

| Test item | Result | Evidence |
|---|---|---|
| APPLICATION_STARTUP | UNRUN | Pending |
| LESSON_LOAD | UNRUN | Pending |
| LEGACY_PROFILE | UNRUN | Pending |
| GEOMETRY_PROFILE | UNRUN | Pending |
| ALGEBRA_PROFILE | UNRUN | Pending |
| INFORMATICS_PROFILE | UNRUN | Pending |
| PROFILE_SWITCHING | UNRUN | Pending |
| FULLSCREEN | UNRUN | Pending |
| KEYBOARD_CONTROL | UNRUN | Pending |
| TEACHER_CONTROL | UNRUN | Pending |
| MEDIA_LOAD | UNRUN | Pending |
| MATHJAX | UNRUN | Pending |
| FIGURE_RENDERING | UNRUN | Pending |
| CODE_RENDERING | UNRUN | Pending |
| TABLE_RENDERING | UNRUN | Pending |
| ANSWER_REVEAL | UNRUN | Pending |
| HINT_REVEAL | UNRUN | Pending |
| FOCUS | UNRUN | Pending |
| NAVIGATION | UNRUN | Pending |

After execution use PASS / FAIL / NOT_APPLICABLE and justify every NOT_APPLICABLE.

## Error checks

| Test item | Result | Evidence |
|---|---|---|
| STARTUP_ERROR | UNRUN | Pending |
| CONSOLE_ERROR | UNRUN | Pending |
| MISSING_FILE | UNRUN | Pending |
| BROKEN_PATH | UNRUN | Pending |
| BROKEN_ASSET | UNRUN | Pending |
| FONT_FAILURE | UNRUN | Pending |
| MATHJAX_FAILURE | UNRUN | Pending |
| MEDIA_FAILURE | UNRUN | Pending |
| PROFILE_LOAD_FAILURE | UNRUN | Pending |
| RUNTIME_CRASH | UNRUN | Pending |

PASS on an error-check row means the symptom was checked and absent; FAIL means observed with evidence. No errors monitored yet, so absence is not established.

## Real Windows profile switching

Run LEGACY → GEOMETRY → ALGEBRA → INFORMATICS → LEGACY for at least3cycles on continuously open Teacher/TV. Dirty reveal, hint, Focus, zoom, annotations and sample before switch. All three cycles currently UNRUN; record NO_CRASH/NO_CSS_LEAK/NO_STATE_LEAK/NO_REVEAL_LEAK/NO_CONTROL_LEAK for each in PHASE8_RESULT_FORM.csv.

Configuration, exact fixtures, startup/console logs, screenshots/videos and ZIP hashes must be supplied from actual GV device.
