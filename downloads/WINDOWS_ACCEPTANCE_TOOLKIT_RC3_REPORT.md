# WINDOWS ACCEPTANCE TOOLKIT RC3 — observation label validation

ROOT_CAUSE = Canonical RC2 scripts/Run.ps1:28 supplies WINDOWS_REBOOT rather than WINDOWS_REBOOT1 to Read-Choice. Common.ps1:9–12 repeats Read-Host until exact allowed-array membership succeeds. WINDOWS_REBOOT1 is absent, so it is rejected and the prompt repeats without an invalid-input message.
PATCH = Centralize exactly four labels; normalize Trim + ToUpperInvariant; use a dedicated observation reader with clear rejection and a 20-invalid-input limit; replace only the Task 2 phase assignment; add bounded non-interactive self-tests.
FILES_CHANGED = 00_HUONG_DAN.txt, scripts/Common.ps1, scripts/Run.ps1, scripts/SelfTest.ps1, CHECKSUMS.sha256 (regenerated toolkit manifest).
FILES_UNCHANGED = All six BAT; scripts/Identity.py; every pre-existing Common.ps1 function; Task 1/3/4/5/6 statements; CSV schema/append routine; identity uncertainty markers; R4 runtime/candidate/previous test patch.
FILES_ADDED = scripts/LabelValidationSelfTest.ps1; WINDOWS_ACCEPTANCE_TOOLKIT_RC3_REPORT.md; TOOLKIT_RC3_SELF_TEST.txt.
LABEL_VALIDATION_TEST = PASS_INTERNAL; 96 assertions; four required labels accepted, whitespace trimmed, four required invalid inputs rejected, case normalized, retry paths bounded and valid input immediately returned.
BAT_ENCODING_TEST = PASS; 6/6 byte-identical to RC2; ASCII; CRLF only; no BOM; first three bytes 40 65 63.
POWERSHELL_5_1_COMPATIBILITY = PASS_STATIC_REVIEW_ONLY; all PS1 parse under PowerShell 7.4.13; new code uses PS5.1 syntax and compatible .NET APIs; PS1 retain UTF8 BOM + CRLF for Unicode on 5.1; NATIVE_5_1_EXECUTION = NOT_RUN.
REGRESSION = PASS_INTERNAL; RC2 core self-test 28 assertions, RC3 core self-test 140 assertions, additional root-cause/regression probe 43 assertions; Windows-specific execution remains NOT_RUN.
R4_RUNTIME_CHANGED = NO
R4_CANDIDATE_CHANGED = NO
R4_PREVIOUS_TEST_PATCH_CHANGED = NO
R4_EXPECTED_SHA256 = 68219167829986f39d025251bf4681d7298e6c652689420d82cfe8a08d130ec2
TOOLKIT_RC3_STATUS = READY_FOR_WINDOWS_RETEST
TOOLKIT_RC3 = READY_FOR_WINDOWS_RETEST
R4_STATUS = PENDING_WINDOWS_VALIDATION
WINDOWS_VALIDATION = NOT_RUN_IN_THIS_SESSION
PHYSICAL_50_PC = NOT_TESTED_IN_THIS_SESSION

## Input provenance and exact diagnosis

Canonical RC2 was obtained read-only from huynhvultv2018/TEST-CODEX, branch windows-acceptance-toolkit-rc2, commit 571154e9a595c136094a6313b00d15bcff20373d.
RC2 ZIP SHA256: `bca4e7c9df476fa7ca74da4f8e2b356a24522915010a324982b49287a3801d63`. ZIP CRC and every original internal checksum passed before patching. RESULTS in this canonical package is empty. No actual Windows BEFORE/APP_REOPEN CSV was supplied.

The user reports a Windows screen showing WINDOWS_REBOOT1. The canonical GitHub RC2 source actually shows WINDOWS_REBOOT in both the prompt and allowed array. That discrepancy is recorded, not assumed explained: the local Windows script was not available for comparison. The confirmed defect and patch apply to the inspected, checksum-pinned RC2. No claim is made about uninspected local modifications.

The BAT runs powershell.exe with only -Task 2, not the observation label. It uses DisableDelayedExpansion and a quoted relative -File path. Phase input is read inside PowerShell. Common.ps1 already trims and uppercases; there is no label regex, length limit, or BAT parsing of the label. The rejected input remains WINDOWS_REBOOT1 after normalization, which cannot match WINDOWS_REBOOT. The executable reproduction invokes the original Task 2 input assignment with finite inputs WINDOWS_REBOOT1 then BEFORE: two prompts occur and only BEFORE returns. BEFORE/SERVER_REOPEN/APP_REOPEN each return after one prompt. The full BAT → Run.ps1 → Common.ps1 → Identity.py chain was read.

## Patch behavior and self-test

One shared array supplies prompt and validator: BEFORE, SERVER_REOPEN, APP_REOPEN, WINDOWS_REBOOT1. The generic Read-Choice used for license observation and room Y/N is unchanged. A valid observation advances immediately. An invalid observation prints [INVALID] with the four choices and retries. After 20 invalid attempts, Task 2 throws and its existing catch exits nonzero before Save-LicenseRow. Nothing is appended for that failed attempt.

The standalone LabelValidationSelfTest.ps1 uses a finite input queue scoped to toolkit input tests. Queue exhaustion throws instead of blocking. All subprocesses also have a 45-second timeout. No app import, middleware/CSRF bypass, identity override, trial reset, or runtime monkeypatch is used.

On Windows, a non-interactive label-only retest can be run from the extracted toolkit:
`powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\scripts\LabelValidationSelfTest.ps1`
Step 01 also runs the label self-test as part of SelfTest.ps1 after candidate SHA matches. This only tests toolkit handling. After a real reboot, the user must run step 02 with WINDOWS_REBOOT1 and choose PASS/FAIL/UNKNOWN based on the actual application license state.

## Preservation and regression evidence

All original functional self-test assertions remain. Additional checks verify ASCII/CRLF for every BAT, all required labels, historical CSV byte-prefix preservation, appending the new label, and avoiding an automatic license PASS. All production-facing Common.ps1 functions compare identical by AST text and the original bytes remain identical around the inserted label block. Run.ps1 differs at exactly one line in Task 2. All other task statements and six BAT files compare byte-for-byte to RC2.

The additional regression probe validates correct/wrong/missing R4 SHA, UTF8 logging, full 11-column CSV append preserving BEFORE/APP_REOPEN bytes, existing legacy WINDOWS_REBOOT rows, unknown license/identity status, HTTP 200/302/404/500 classification against a local test server, empty evidence rejection, hidden/nested evidence ZIP inclusion, ZIP SHA, packaging without changing evidence, and room login/submit/error verdicts. The non-Windows guard remains effective: Run.ps1 -Task 2 on Linux exits 1 and writes no acceptance evidence. No OS guard is bypassed.

2,276 pre-existing files were hashed before patching and after validation, including R4 runtime/source/candidate and the prior test patch. All matched. No R4 audit/hotfix/build/test suite was rerun; only toolkit tests were executed. No database, EXE, registry, firewall, activation key, machine ID or trial was changed. Identity.py is unchanged. Source algorithm agreement is confirmed against the candidate's machine_id source; APP_MACHINE_ID_SOURCE retains CONFIRMED_R4_SOURCE_ALGORITHM; RUNTIME_EQUIVALENCE_UNCONFIRMED, and no runtime equivalence is claimed.

RC2/RC3 self-tests were executed on private clones. Delivered RESULTS is empty; synthetic rows are never delivered as Windows evidence. To continue real evidence, retain and back up RC2, copy all existing RC2 RESULTS contents into the still-empty RC3 RESULTS before running RC3. Do not modify CSV rows/NOTE labels. If RC3 already contains results, keep the two folders separate to avoid overwrite/duplication. Step 02 appends; other report overwrite behavior is unchanged from RC2. Original RC2 report and TOOLKIT_SELF_TEST.txt are retained unchanged as historical provenance; use this RC3 report and TOOLKIT_RC3_SELF_TEST.txt for current conclusions.

## Execution limits

Host: Linux; PowerShell 7.4.13. Official release archive SHA256 verified against Microsoft's release hashes: 59e5df675dacbfe45374c32c1bf2480168a33243423c9b19252d0476fd1b748c. Temporary process-only cache directories were used; no persistent environment configuration was changed.

Native Windows 10 cmd.exe / Windows PowerShell 5.1, LAN/firewall cmdlets, application license after reboot, and physical 50-PC acceptance were not run in this session. The user reports RC2 native execution, but that does not certify RC3. Static compatibility and Linux PowerShell tests establish readiness for Windows retest only.

## Hashes before/after

| Modified toolkit file | RC2 SHA256 | RC3 SHA256 |
|---|---|---|
| `00_HUONG_DAN.txt` | `ad5c4c08410408f2cbc9d18671c66a25d5207e3c78095e57f4f0e10c1d9a9da1` | `05a60ee37bd196964a44c2ee9930ebbc9055303c823e01358fb12985bcc4ebbe` |
| `scripts/Common.ps1` | `06a779861904b34075b4a3d656173448d263b769e8463a648967a38bc31553c7` | `0e509be0cf644634fcafea1579e8e3ca44bff3ffdd7c5cd4728900d2088217fe` |
| `scripts/Run.ps1` | `95050db1abf055354305389a1e48bd77312ed1fa9a0d10231f6955b7ed98a24a` | `2748c34ba294a44481da0e0139400dc7abbf7ba333a79d877be7834c6f91466e` |
| `scripts/SelfTest.ps1` | `6e8469fb238b69c1a2179e30da00163c8d8a8514e2426b3ddf68673aaf061b59` | `7e39d69be01447a40b0f802ebcb866f3fb8b39acdb27c3eca2cba7236851a71e` |

| Preserved file | SHA256 before = after |
|---|---|
| `01_KIEM_TRA_TRUOC_KHI_CHAY.bat` | `321e25182207f65163cd0a5f84d2aad19781901c4c64feb9ea1d55419569fb04` |
| `02_GHI_NHAN_LICENSE_RESTART.bat` | `8165e075654d4249559b8b32bf35f516442f6777ce5134c8d53292c6cd2ab517` |
| `03_KIEM_TRA_SERVER_LAN.bat` | `4f0bacc3416d4e6ae4b53ed7171fa67f0c17f5358043fe77576c8fd54be7c36d` |
| `04_KIEM_TRA_MAY_CON.bat` | `1b2dae088433171fcf5f9174c549d1d9562ff9e849f135db3d8a5f593170e046` |
| `05_GHI_NHAN_TEST_PHONG_MAY.bat` | `7ed2ccbd798dff923f33dba7b647dda2a8e64f782a8d603cd68aebd4e187e8a5` |
| `06_DONG_GOI_KET_QUA.bat` | `9d2c1498c97afc8851cdf67bd30657a8b33866e10ea88d6153a7409909754125` |
| `TOOLKIT_SELF_TEST.txt` | `88790b5ce81cb67e1cc1c2dfefc855dd417b92c6eed1c6828759840bbc103ae1` |
| `WINDOWS_ACCEPTANCE_TOOLKIT_RC2_REPORT.md` | `714b1aa4c8ed132aa83b52ecd893ebb96adb36b6f019647e6cbc2f4cffec8de5` |
| `scripts/Identity.py` | `2705dc5bd8c1cfa0848f41a54ad08500a475a05af277252592c7232d6c81cf7c` |

Internal CHECKSUMS.sha256 lists every packaged regular file except the manifest itself (avoids self-reference), including BAT/PS1/Python, report and self-test. The ZIP's hash is supplied separately in RC3_CHECKSUMS.sha256 and its .zip.sha256 sidecar. ZIP hash is a delivery hash, not a source change. The release gate re-extracts the completed ZIP, verifies CRC/file count/checksums/BAT encoding and reruns the packaged label self-test before publication. Verification of that immutable ZIP is recorded in RC3_PACKAGE_VERIFICATION.json outside the ZIP.
