# Algebra Profile contract — Phase 5

`subject_engine: "algebra"` selects this profile through the unchanged Core registry. Missing/empty/unknown values keep Legacy fallback. Geometry and Informatics implementations/contracts/fixtures remain frozen. This is a presentation adapter, not an independent Algebra engine or solver.

## Integration and ownership

- Entry point: the already-loaded `WEB_LIVE/tv-layout-algebra.js`. Its existing `TVAlgebraEngine` code stays byte-identical as a prefix; the new profile uses `WebLiveProfiles.registerAdapter('algebra', {presentation})` and `subscribe('algebra', {onDispose})`.
- Core lifecycle, navigation, state serialization/sync, importer, lesson storage, disclosure, Teacher commands and HTML wiring do not change.
- Runtime roles: `tv` and the native Teacher `tv.html?preview=1` student preview. Teacher controls and the teacher-only source/answer panels are the existing Core UI. No new Teacher button or second state controller.
- Assets: scoped `algebra-profile.css`, pinned local MathJax 3.2.2 SVG bundle/license. No CDN, remote font or automatic typesetting of other profiles.
- Actual implementation state: `WebLiveAlgebra.status === 'IMPLEMENTED'`. The immutable Phase2 registry descriptor is historical scaffold metadata and is not rewritten; it can still say `REGISTERED_STUB`. Dispatch uses registered adapter/hooks, not that descriptor's status.

## Native lesson/state contract

The existing `content`, `steps: string[]`, `analysisSteps: string[]`, `hint`, `answer`, `conclusion`, `options`, `instruction` fields remain authoritative. `liveSteps`, `liveAnswerText`, native `answerMode`, `answerStep`, `analysisStep`, `showHint`, pedagogy state and `classroom.focus` control disclosure. No package/schema migration or persisted profile state is introduced.

Math is authored using `\(...\)` for inline formulas, `\[...\]` or `$$...$$` for displayed formulas. Supported pinned TeX packages are base, AMS, newcommand, noundefined. Use `\frac`/`\dfrac`, powers, `\sqrt`, polynomial/equation/inequality notation, `cases`/`aligned` for systems. Plain unmarked text remains authored text; this profile does not infer or solve math from prose. Unsupported/invalid TeX retains its authored source and records a local diagnostic rather than silently inventing a correction.

Use one native string per proof/transformation step. A system may be authored as a single explicit TeX `cases` or `aligned` formula; equations remain separate rows inside that mathematical structure. Avoid unmarked/multiline TeX which the unchanged Core text normalizer can reinterpret as prose. TeX currency `$...$` and arbitrary HTML/remote package loading are outside this contract.

## Optional Algebra metadata

Metadata is a profile-local addition. It never changes how Core counts steps or when a hint/answer is authorized. Every optional item is associated by index with an existing native `steps` item and is mounted only after that item is revealed.

```json
{
  "subject_engine": "algebra",
  "screens": [{
    "id": "test-transformation",
    "content": "Giải \\(2(x+3)=10\\).",
    "steps": ["\\(2x+6=10\\)", "\\(2x=4\\)", "\\(x=2\\)"],
    "hint": "Quan sát hai vế.",
    "conclusion": "\\(x=2\\)",
    "algebra": {
      "kind": "TRANSFORMATION",
      "stage": "TRANSFORM",
      "transformations": [
        {"original": "\\(2(x+3)=10\\)", "reason": "Phân phối."},
        {"reason": "Trừ 6 ở hai vế."},
        {"reason": "Chia hai vế cho 2.", "result": "\\(x=2\\)"}
      ]
    }
  }]
}
```

`kind` may be EXPRESSION, FRACTION, TRANSFORMATION, EQUATION, INEQUALITY, SYSTEM, ERROR_COMPARISON. It is authored classification, not automatic curriculum inference. Each native step is the transformation expression; optional `original`, `reason`, `result` provide supplied supporting fields. Empty or non-string supporting fields are omitted. No method/reason/result is generated.

`stage` may be PROBLEM, OBSERVE, REMARK, TRANSFORM, EXPLAIN, CONCLUDE, PRACTICE, APPLY. These map to UI labels for the eight requested pedagogical stages. Authors may omit any stage, omit metadata entirely, or choose a subset/order suitable for their lesson. No screens or sequence are generated/forced by the profile.

`algebra.errorComparisons[index]` may contain `{student: string, correct: string, explanation?: string}`. Both student/correct must be supplied. The comparison appears only when the associated native step is disclosed. Before that reveal, correction/supporting metadata are absent from the TV DOM. The profile never generates a student mistake.

These examples are synthetic interface data, not SGK/curriculum/source validation.

## Reveal, progress, emphasis

Read-only `getState().stepStates` separates two dimensions:

| Condition | disclosure | progress | TV DOM |
|---|---|---|---|
| Step index is beyond current native reveal count | UNREVEALED | UNREVEALED | Absent, including supporting metadata |
| Earlier disclosed step | REVEALED | COMPLETED | Visible, de-emphasized |
| Latest step in native steps mode | REVEALED | CURRENT | Strong emphasis |
| Native full-answer command | REVEALED | COMPLETED | All native steps visible |

Focus is a separate `focused` flag. It changes emphasis only. A selected previously disclosed step gets emphasis without becoming the native latest proof step; other disclosed steps remain visible/dimmed. Invalid/future Focus indices are ignored. `getState()` exposes indices/states, not text for unrevealed steps.

The native **XÓA TẬP TRUNG** command clears active focus; native Focus toggle controls picking mode. Clear restores the reveal-based presentation exactly. Previous Step removes later proof/metadata from DOM; Hide Answer removes all proof/answer/metadata. No profile command changes proof count, lesson, navigation, hints, figure/board or state.

An authored final answer/conclusion appears only when the native full-answer mode or final native reveal includes it. Hint visibility follows existing Core policy, including hiding hint/analysis when an answer takes precedence. Concealed hint text is removed from TV DOM locally; teacher-only authored panels remain unchanged.

## Rendering/lifecycle safety

Only visible content/focus leaves, analysis, hints and revealed answer nodes are converted to SVG. Full-width vertical MCQ cards and separate instructions remain the existing structure. No character wrapping or formula clipping is introduced. Accessibility uses `role=math` and the author's TeX aria-label; duplicate visible assistive MathML is disabled in this conversion path.

Conversion jobs are serialized and guarded by profile, role/lifecycle context, lesson activation/source key, index, state version, epoch and attached DOM. A queued render for an older screen/lesson cannot insert into the current screen or another profile. `onDispose` clears owned presentation context and marker state. Other profile lesson/state/figures are not written or recomputed by Algebra.

Diagnostics are read-only through `WebLiveAlgebra.getDiagnostics()`. `whenReady()` awaits the current conversion job for tests; it is not a student control. MathJax source failures remain visible and diagnosable. Rendering does not certify math correctness, classroom readability, SGK alignment, physical TV, native Windows or audible TTS.
