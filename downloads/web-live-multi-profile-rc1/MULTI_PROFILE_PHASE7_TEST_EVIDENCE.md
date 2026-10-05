# Phase 7 — Evidence

## Raw evidence and targets

INTEGRATION_RESULTS.json + INTEGRATION_RUN.log: PASS; 6 groups, 12 resolver inputs, 14 sequence entries, 10 invalid cases, 8 cycles/48 stress switches, 12 TV layout cases, 4 captures. Linux Chromium 151.0.7922.173 via Playwright; static Python HTTP. All evidence/helpers outside frozen/runtime payload.

Final source/ports: Geometry Phase4 8775, Algebra Phase5 8777, frozen Informatics Phase6 8781, Phase7 byte-copy 8780, fresh extracted RC1 8782. These loopback endpoints are internal tests, not public previews. No npm build/install needed for the existing static application. Existing Chromium/Node/Playwright reused.

Commands from /workspace (NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules):
- node /workspace/phase7-multi-profile-integration/integration.cjs
- node /workspace/phase7-multi-profile-integration/REGRESSION/FROZEN_GEOMETRY/geometry-runtime.cjs and corresponding PHASE7 helper
- node /workspace/phase7-multi-profile-integration/REGRESSION/FROZEN_ALGEBRA/targeted-algebra.cjs and corresponding PHASE7 helper
- Informatics helper with INFORMATICS_ROOT/INFORMATICS_BASE/INFORMATICS_EVIDENCE selecting explicit frozen root:8781 or Phase7 root:8780
- Frozen GEOMETRY_PHASE3_TESTS/engines.cjs with WEB_LIVE_TEST_ROOT/WEB_LIVE_BROWSER_BASE/PHASE2_EVIDENCE selecting those same roots and external evidence
- python3 /workspace/phase7-multi-profile-integration/gate-and-package.py (one-shot; refuses existing RC1 overwrite)
- node /workspace/phase7-multi-profile-integration/rc-integration.cjs
- node /workspace/phase7-multi-profile-integration/rc-assets.cjs

All final processes exit 0 with populated fresh result files. Native Teacher popup plus embedded Preview and TV stay open during switching/stress; no page reload resets each transition.

## Stress measurements

Warmed baseline and final CDP process/renderer counters (Teacher/TV sessions may share one renderer; these are not independent page-owned leak totals):
{
  "before": {
    "round": 0,
    "pages": [
      {
        "dom": {
          "documents": 3,
          "nodes": 2065,
          "jsEventListeners": 797
        },
        "heapUsed": 16296556
      },
      {
        "dom": {
          "documents": 3,
          "nodes": 2065,
          "jsEventListeners": 797
        },
        "heapUsed": 16296556
      }
    ],
    "profileStorage": {
      "keys": 15,
      "chars": 1845
    },
    "styles": 2,
    "mathScripts": 1,
    "teacherPanels": 0
  },
  "after": {
    "round": 8,
    "pages": [
      {
        "dom": {
          "documents": 3,
          "nodes": 2064,
          "jsEventListeners": 797
        },
        "heapUsed": 16930096
      },
      {
        "dom": {
          "documents": 3,
          "nodes": 2064,
          "jsEventListeners": 797
        },
        "heapUsed": 16930096
      }
    ],
    "profileStorage": {
      "keys": 23,
      "chars": 2829
    },
    "styles": 2,
    "mathScripts": 1,
    "teacherPanels": 0
  }
}

Event listeners: 797 → 797; nodes 2065 → 2064; measured heap 16,296,556 → 16,930,096 bytes (~3.9%). Two profile style links and one MathJax script remain; inactive Teacher panels absent. Guards: listeners baseline+30, nodes baseline+500, final GC heap ≤ baseline×1.5+4MiB. All rounds recorded. These finite diagnostics do not prove indefinite runtime flatness.

Informatics persistence keys 15→23 and chars 1845→2829: eight distinct activation-scoped sample/checkpoint boolean entries retained. Re-import starts with hidden/unconfirmed sample; no active state collision. This deliberate persistence growth is reported, not described as zero growth. No engine patch or expiration feature added.

## Harness/setup failures preserved

HARNESS_HISTORY/ATTEMPT1: wrong external selector .geometryProofStep; frozen rendered proof class is .proofStep. Selector corrected only in external helper; expected two proof steps then verified.

HARNESS_HISTORY/ATTEMPT2: wrong expectation that hint stays visible after answer reveal. Existing cognitive-tv.css native answer-priority hides hint; profile removes concealed hint source. Corrected helper asserts dirty showHint flag=true and hint invisible, then flag resets on next profile. No product patch.

HARNESS_HISTORY/REFERENCE_SERVER_8779: stale reference server returned ERR_EMPTY_RESPONSE before app load. Preserved logs, started fresh read-only frozen-reference server 8781 with redirected output and verified GET readiness. Both affected reference suites reran and passed. Not an engine/profile defect; no speculative product root cause.

## Package, scope and evidence

RC_VALIDATION/INTEGRATION_RESULTS.json: full fresh packaged integration PASS; RC_VALIDATION/PACKAGED_ASSETS.json: 58 assets + modal lifecycle PASS.
SOURCE_INTEGRITY.json and before/after manifests: all three frozen ZIPs/directories unchanged.
SOURCE_SCOPE.json: 0 changed/added/removed payload files.
REGRESSION_COMPARISON.json: all four fresh reference comparisons PASS.
PREPACKAGE_GATE.json and RELEASE_GATE.json: PASS.
ENVIRONMENT_SETTINGS_EVIDENCE.json: full draft unchanged, revision12, no write/publish.
RC1_PAYLOAD_MANIFEST.json and PACKAGE_IDENTITY.json: all1239files, CRC/hash identity.

REAL_FILE_VALIDATION = NOT_RUN_BY_GV_DECISION. WINDOWS_PHYSICAL_RUNTIME = UNRUN. PHYSICAL_TV_VALIDATION = UNRUN. REAL_CLASSROOM_TRIAL = UNRUN. Audible native Windows TTS and classroom back-row readability unrun. Test fixtures are not certified real lesson/package acceptance.
