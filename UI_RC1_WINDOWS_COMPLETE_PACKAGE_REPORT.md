# UI RC1 — Windows complete build package

PACKAGE_TYPE = FULL_SOURCE_PLUS_APPROVED_TEST_ONLY_OVERLAY
BASE_CANDIDATE_SHA256 = d9765ac36c954190a63ac56fa55088a8b4e3eed9c9316a87a4246ff6a705b21f
TEST_OVERLAY_SHA256 = 5d4fef6b1455e8d02c827d136f71d9c8f7e48cf39ddffe9f5f79bcc6f93b1ff9
ORIGINAL_CANDIDATE_MUTATED = NO
ORIGINAL_SOURCE_FILES = 64
CHANGED_TEST_FILES = 4
UNCHANGED_SOURCE_FILES = 60
RUNTIME_TEMPLATES_STATIC_UNCHANGED = YES
NEW_TEST_RUN = NOT_RUN (packaging only; previous exact combination 6/6 standalone PASS)
EXE_BUILD = NOT_RUN
WINDOWS_RUNTIME = PENDING_WINDOWS_VALIDATION
PHYSICAL_50_PC = NOT_RUN
PRODUCTION = NO

This is a separate complete source package, not RC2 and not a replacement for the
immutable candidate ZIP. It includes all original source files with only the four
previously approved test scripts overlaid. Each is byte-identical to the approved
test copy validated against UI RC1. Runtime, UI, build_exe.bat and requirements.txt
remain unchanged. No business assertion is removed or weakened.

Changed tests: kiem_tra_v22.py, kiem_tra_v221.py, kiem_tra_v222.py,
kiem_tra_v23_integration.py. All before/after hashes are in
VALIDATION/SOURCE_HASH_MANIFEST.json. All payload hashes are in SHA256SUMS.txt.

Extract into a new working folder; open PHAN_MEM and run build_exe.bat.
No manual overlay is needed. The old historical report dates/statuses are preserved
under REPORTS and PRIOR_VALIDATION; they do not claim new Windows acceptance.
