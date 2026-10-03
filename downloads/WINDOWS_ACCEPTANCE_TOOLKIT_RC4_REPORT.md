# WINDOWS ACCEPTANCE TOOLKIT RC4 — PowerShell 5.1 collection safety

REPORT_VARIANT = EXTERNAL_FINAL
ROOT_CAUSE = RC3 Run.ps1:53 assigns unwrapped function output to $ips, then line 54 reads $ips.Count. Common.ps1:52–57 returns @(...) through the function's success pipeline, which enumerates the array: zero results become null, one result becomes a scalar/CIM object. Under StrictMode 2, Count on that receiver is not guaranteed. The exact reported Count exception was reproduced for zero results using the original RC3 assignment/helper.
FILES_CHANGED = 00_HUONG_DAN.txt; scripts/Common.ps1; scripts/Run.ps1; scripts/SelfTest.ps1; CHECKSUMS.sha256 (new RC4 manifest only).
FILES_ADDED = scripts/NetworkInspection.ps1; scripts/CollectionSafetySelfTest.ps1; RC4_WINDOWS_RETEST.txt; WINDOWS_ACCEPTANCE_TOOLKIT_RC4_REPORT.md; TOOLKIT_SELF_TEST_RC4.txt.
COLLECTION_SAFETY_FIX = Normalize non-null records to object[]; preserve empty/single arrays at function boundaries; use explicit discovery Items/RecordCount; access optional fields safely; count parser errors safely; normalize CSV and result-file discovery. Safe typed arrays/collections and explicit Count fields were retained after semantic audit.
POWERSHELL_5_1_COMPATIBILITY_AUDIT = PASS_STATIC_INTERNAL; PS5.1 syntax/.NET APIs; Windows-only cmdlets capability-checked and errors classified. Native execution remains NOT_RUN.
STEP03_TEST_RESULT = PASS_INTERNAL; synthetic Windows-read fixtures and actual Linux helper execution with absent Windows APIs; this does not certify Windows LAN.
COLLECTION_TEST_RESULT = PASS_INTERNAL; 268 collection/step03 assertions, including all eight required shapes across all required groups.
LABEL_TEST_RESULT = PASS; 96 assertions; original RC3 label script and validator/reader retained.
REGRESSION_RESULT = PASS_INTERNAL; 73 additional regression/root-cause assertions; original RC3 core self-test 140 and RC4 core self-test 411 assertions.
BAT_ENCODING_RESULT = PASS; all six BAT byte-identical, ASCII, CRLF, no UTF8 BOM, first bytes 40 65 63.
WINDOWS_POWERSHELL_5_1_EXECUTION = NOT_RUN
R4_CANDIDATE_SHA256 = 68219167829986f39d025251bf4681d7298e6c652689420d82cfe8a08d130ec2
R4_RUNTIME_CHANGED = NO
R4_CANDIDATE_CHANGED = NO
MACHINE_ID_LICENSE_ALGORITHM_CHANGED = NO
R4_PREVIOUS_TEST_PATCH_CHANGED = NO
RC4_ZIP_SHA256 = 15774863999e9b019838c135ab80527ee2f96e338bad059bc7df146ad2cff643
TOOLKIT_RC4_STATUS = READY_FOR_WINDOWS_RETEST
R4_STATUS = PENDING_WINDOWS_VALIDATION
R4_LAN_STATUS = NOT_YET_DETERMINED

## Baseline and root cause evidence

RC3 pinned to GitHub commit 74a16e57a62fbba011b4e03fdc23f31257b9ede6; input ZIP SHA256 a4bd6dd336069a8b757461ff99c4399e045fe3167f73a4c3a268620de4a99e8d. Original CRC and every internal checksum verified before patching. All original RC3 artifacts are preserved.

03_KIEM_TRA_SERVER_LAN.bat only dispatches Windows powershell.exe -Task 3 to Run.ps1. The BAT does not parse discovery results. Common.ps1 enables StrictMode 2. Of the Count accesses reachable in the original Task 3, the listener count uses an explicit @(...), while the unprotected $ips.Count uses enumerated Get-LanAddresses output. Zero discovery output, including output filtered down to zero, produces the exact error: "The property 'Count' cannot be found on this object. Verify that the property exists."

This session reproduced that failure with original RC3 code and a finite zero-result Get-NetIPAddress fixture under PowerShell 7.4.13/Linux. It identifies the unsafe expression by source audit and demonstrates the reported failure class. The supplied Windows console message has no stack trace or discovered IP cardinality, so this report does not invent which zero/singleton input occurred on the user's machine. PowerShell 7 accepts some singleton Count cases that differ from legacy PowerShell; that behavior is not used as proof of PS5.1 safety. RC4 removes dependence on both zero and singleton adaptation. This is a toolkit error, not evidence of an R4 LAN defect.

## Audit coverage and collection semantics

The AST inventory covers every Count and Length member in every RC3 and RC4 executable PS1: 19 original occurrences (15 Count, 4 Length) and 38 RC4 occurrences (20 Count, 18 Length). The increase in Count includes explicit expected-count fields on test fixtures; those are not assumptions about a pipeline receiver. No blind replacement was used. The complete classified inventory appears below.

ConvertTo-Records filters only null entries, preserving false/empty strings as actual records, casts to object[], and uses unary comma to preserve array identity through a function return. Discovery results are explicit objects with Status, Items (object[]) and RecordCount. Get-LanAddresses now returns a preserved array. Scalar strings or objects without network fields are counted as records but treated as unavailable network data; they never manufacture IPs, process IDs, or HTTP success. IPv4 parsing, loopback/link-local exclusion and Preferred state filtering remain enforced. Missing fields use UNAVAILABLE.

CSV/result helpers preserve schema and append behavior. Save-LicenseRow is unchanged. Original history is not rewritten; full 11-column fixture tests verify that BEFORE/APP_REOPEN bytes remain a prefix after appending normalized WINDOWS_REBOOT1 with UNKNOWN license observation. Legacy WINDOWS_REBOOT rows are retained. Original real RESULTS was empty; none was supplied from the user's Windows machine. Delivered RESULTS remains empty. Keep and back up the old toolkit; before running RC4, copy its RESULTS into RC4's still-empty RESULTS. If RC4 already has results, retain separate folders to avoid overwriting or duplicate merging.

## Step 03 read-only contract

Task 3 still requires the exact R4 candidate before asking the port or running discovery; an incorrect/missing candidate stops with the original failure report/exit 2. A valid candidate report now includes actual and expected SHA, Windows/PowerShell information, valid IPv4 LAN addresses, TCP listeners, available process names, local/LAN-IP HTTP headers, firewall profiles/inbound rules/port-filter inventory and connection profiles. All read operations are isolated from unavailable data.

Get-ReadOnlyData accepts only Get-NetIPAddress, Get-NetTCPConnection, Get-NetFirewallProfile, Get-NetFirewallRule, Get-NetFirewallPortFilter, Get-NetConnectionProfile, Get-CimInstance, Get-Process, Test-Connection and Test-NetConnection. No write cmdlet is accepted. Existing logging/CSV/ZIP writes target toolkit RESULTS or isolated self-test directories only. There is no firewall rule creation/removal, profile switch, registry write, IP change, process kill, server restart or application import.

Missing cmdlet → NOT_APPLICABLE; zero results or an object-not-found query → NOT_FOUND; unauthorized/permission-denied reads → ACCESS_DENIED; other read failures or unusable fields → UNAVAILABLE. Discovery failures do not crash the whole report. Local HTTP probing continues even when LAN IP discovery is unavailable. Process names are read only for valid available PIDs; process command lines, credentials and license files are not collected.

Firewall rules and port filters are separate read-only inventories. TCP/6/Any-protocol filter matching handles port 5000, Any, port arrays, comma lists and numeric ranges safely. Matching does not prove that an inbound rule allows/blocks traffic, and no unsupported rule/filter association is assumed. Firewall block status and R4 LAN status remain unconfirmed; a real client test is required.

The same capability/error boundary protects optional CIM information in steps 01/02 and ping/TCP cmdlets in step 04. Valid boot timestamps keep the original ISO formatting; missing boot information records availability status. License/identity algorithms are unchanged. Task 5/6 bodies are identical to RC3, and evidence packaging differs only at its collection capture. This is toolkit compatibility work, not a software version change or R5.

## Compatibility audit

Target: Windows 10 with Windows PowerShell 5.1, called by the existing powershell.exe BAT dispatch. Core constructs used by new code (arrays, unary comma, hashtable splatting, PSCustomObject, PSObject.Properties, TryParse, foreach, functions and -in/-notin) are available in PS5.1. No PowerShell 7-only operators, parallel processing or pwsh dependency is introduced. PS1 retain UTF8 BOM/CRLF so Windows 5.1 reads Unicode correctly; BAT remain ASCII without BOM.

NetTCPIP/NetSecurity/NetConnection/CimCmdlets availability is checked before invocation. Windows SKU/module/permission differences are represented as statuses. Get-Process and Get-Command are standard Windows PowerShell commands. HttpWebRequest, SHA256, List/Queue and Compression APIs are compatible with the Windows .NET Framework used by PS5.1. All PS1 parse internally under PowerShell 7.4.13; native Windows cmd.exe and Windows PowerShell 5.1 are not present in this Linux workspace and were not executed.

## Tests executed

Eight required shapes: null, zero-result array, one ordinary .NET object, two objects, many objects, scalar string, one PSCustomObject and PSCustomObject array. Every shape exercises IP discovery, TCP discovery, firewall rule discovery, firewall port-filter discovery, HTTP result formatting, CSV/result-file collection and the actual server-report helper. Additional cases retain false booleans, filter null entries, ignore an object's misleading Count=999 property, handle denied/missing/failed/not-found reads, invalid IPs and overflowing port ranges, preserve timestamp format, and refuse a write command before invocation.

Complete synthetic step03 fixtures verify port 5000, Windows/PowerShell fields, one listener/process, one LAN IP, both HTTP target URLs, firewall profiles/rules/filters and no invented R4 verdict. Separate live helper execution on Linux verifies absent Windows cmdlets degrade safely while an owned loopback HTTP server responds. Real HTTP 200/302/404/500 probes retain RC3 classifications and redirect handling. Synthetic fixtures are explicitly TEST_ONLY; no actual Windows acceptance evidence or license PASS is generated.

Label tests retain BEFORE/SERVER_REOPEN/APP_REOPEN/WINDOWS_REBOOT1, Trim, uppercase, clear invalid messages and the 20-attempt stop. The label script is byte-identical to RC3. Existing core tests retain their functional assertions; the parser-error count and CSV read boundary are made safe rather than weakening assertions. Every process has a 60-second timeout, and input self-tests use finite queues.

Additional regression checks original functions/identity/source uncertainty markers, candidate SHA positive/negative behavior, UTF8 log, CSV history, hidden/nested ZIP contents and hashes, preservation of evidence bytes, room verdicts and the unmodified non-Windows OS guard. Self-tests ran on private clones; original RESULTS and candidate source were not touched. 2,392 pre-existing files, including R4, previous test patch and all RC3 outputs, retain their SHA256. No R4 audit/hotfix/build suite was rerun.

## Windows retest (short)

1. Extract RC4 separately; do not copy it into R4 runtime.
2. Keep the R4 server running.
3. Run 03_KIEM_TRA_SERVER_LAN.bat.
4. Select the exact R4 CANDIDATE ZIP.
5. Enter PORT 5000.
6. Capture the entire output; retain RESULTS/03_LAN_SERVER.txt.

No rebuild, license reset or Windows restart is required. Internal tests establish readiness only. R4 remains PENDING_WINDOWS_VALIDATION and R4_LAN_STATUS remains NOT_YET_DETERMINED until actual Windows/client evidence is reviewed.

## File hashes

| Changed toolkit file | RC3 SHA256 | RC4 SHA256 |
|---|---|---|
| `00_HUONG_DAN.txt` | `05a60ee37bd196964a44c2ee9930ebbc9055303c823e01358fb12985bcc4ebbe` | `07cfd4a912e1ccd8c0602ebc21e950b34467d937c580c216dff9d45329503797` |
| `scripts/Common.ps1` | `0e509be0cf644634fcafea1579e8e3ca44bff3ffdd7c5cd4728900d2088217fe` | `c816e46d471baaf3631774c3199f374bfcc644262ffa668afdac94c6707a4bfb` |
| `scripts/Run.ps1` | `2748c34ba294a44481da0e0139400dc7abbf7ba333a79d877be7834c6f91466e` | `20030259b79caf0315893ae79ea39f3ca8afec480abb246dd0422d6719152fb3` |
| `scripts/SelfTest.ps1` | `7e39d69be01447a40b0f802ebcb866f3fb8b39acdb27c3eca2cba7236851a71e` | `496174e57f2f0c73c0b6840446151b43b15fd6cabb3c8bec11dd3b38a73bf122` |

| New script | SHA256 |
|---|---|
| `scripts/NetworkInspection.ps1` | `340151ffa16e62579264023c2a2b1fb94a2938dfb51ad70c8287c3ce9af5ebcf` |
| `scripts/CollectionSafetySelfTest.ps1` | `b705e41e45b264a28c25c37f3391c9d0e4d1e75577833e780378d1ef331eb71d` |

All six BAT, Identity.py, LabelValidationSelfTest.ps1 and historical RC2/RC3 reports/self-test files remain byte-identical. The internal CHECKSUMS.sha256 hashes every packaged regular file except itself, including scripts/BAT/report/self-test; it does not include a cyclic self-hash. The final ZIP SHA256 is written to the external final variant of this report, RC4_CHECKSUMS.sha256 and the ZIP .sha256 sidecar. The internal report cannot embed the hash of the ZIP that contains it; the two variants explicitly identify this difference, and both are checksummed independently.

The release gate re-extracts the completed ZIP, checks readability/CRC/member count and all manifest entries/BAT bytes, then executes the delivered collection, label and core self-tests on isolated extracted copies. RC4_PACKAGE_VERIFICATION.json records completed checks outside the immutable ZIP. Historical RC2/RC3 reports are provenance only; this report and TOOLKIT_SELF_TEST_RC4.txt state the RC4 result.

## Complete Count/Length inventory

| Version | File:line | Expression | Semantic assessment |
|---|---|---|---|
| RC3 | `scripts/Common.ps1:89` | `$parts.Count` | Array captured with @($value); exact two-line identity contract retained. |
| RC3 | `scripts/Common.ps1:107` | `$files.Count` | RC3 uses @(Get-ChildItem); RC4 uses Get-ResultFiles with non-null object[] and preserved array boundary. |
| RC3 | `scripts/Common.ps1:114` | `$files.Count` | RC3 uses @(Get-ChildItem); RC4 uses Get-ResultFiles with non-null object[] and preserved array boundary. |
| RC3 | `scripts/LabelValidationSelfTest.ps1:26` | `$queue.Count` | Concrete Queue[string]/List[string], initialized before use. |
| RC3 | `scripts/LabelValidationSelfTest.ps1:38` | `$queue.Count` | Concrete Queue[string]/List[string], initialized before use. |
| RC3 | `scripts/LabelValidationSelfTest.ps1:39` | `$prompts.Count` | Concrete Queue[string]/List[string], initialized before use. |
| RC3 | `scripts/LabelValidationSelfTest.ps1:39` | `$Inputs.Count` | Typed string[] parameter; every self-test call supplies a non-null finite array. Original label script preserved byte-for-byte. |
| RC3 | `scripts/LabelValidationSelfTest.ps1:40` | `$messages.Count` | Concrete Queue[string]/List[string], initialized before use. |
| RC3 | `scripts/Run.ps1:50` | `@($listeners \| Where-Object { $_.LocalAddress -ne '127.0.0.1' -and $_.LocalAddress -ne '::1' }).Count` | Explicit array subexpression; zero/one/many count is safe. |
| RC3 | `scripts/Run.ps1:54` | `$ips.Count` | UNSAFE: function output may collapse to null/singleton; replaced by a discovery object with typed Items and RecordCount. |
| RC3 | `scripts/Run.ps1:109` | `$package.Count` | Explicit numeric Count field returned by Package-Results, not count of the response object. |
| RC3 | `scripts/SelfTest.ps1:16` | `$bytes.Length` | Typed byte[] returned by File.ReadAllBytes; not pipeline output. |
| RC3 | `scripts/SelfTest.ps1:20` | `@($bytes \| Where-Object { $_ -gt 127 }).Count` | Explicit array subexpression; zero/one/many count is safe. |
| RC3 | `scripts/SelfTest.ps1:29` | `$err.Count` | DEFENSIVE FIX: count parser errors with Get-RecordCount; null means zero. |
| RC3 | `scripts/SelfTest.ps1:47` | `$rows.Count` | RC3 captures Import-Csv with @(...); RC4 Read-ResultCsv returns a normalized object[] without singleton collapse. |
| RC3 | `scripts/SelfTest.ps1:52` | `$newCsv.Length` | Typed byte[] returned by File.ReadAllBytes; not pipeline output. |
| RC3 | `scripts/SelfTest.ps1:52` | `$oldCsv.Length` | Typed byte[] returned by File.ReadAllBytes; not pipeline output. |
| RC3 | `scripts/SelfTest.ps1:52` | `$oldCsv.Length` | Typed byte[] returned by File.ReadAllBytes; not pipeline output. |
| RC3 | `scripts/SelfTest.ps1:54` | `$rows.Count` | RC3 captures Import-Csv with @(...); RC4 Read-ResultCsv returns a normalized object[] without singleton collapse. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:63` | `$records.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:63` | `$case.Count` | Explicit expected-count fixture field, not a pipeline count. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:64` | `$case.Count` | Explicit expected-count fixture field, not a pipeline count. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:67` | `$case.Count` | Explicit expected-count fixture field, not a pipeline count. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:68` | `$case.Count` | Explicit expected-count fixture field, not a pipeline count. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:72` | `$addresses.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:74` | `$case.Count` | Explicit expected-count fixture field, not a pipeline count. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:75` | `$http.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:77` | `$csv.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:77` | `$case.Count` | Explicit expected-count fixture field, not a pipeline count. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:78` | `$files.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:78` | `$case.Count` | Explicit expected-count fixture field, not a pipeline count. |
| RC4 | `scripts/CollectionSafetySelfTest.ps1:81` | `$case.Count` | Explicit expected-count fixture field, not a pipeline count. |
| RC4 | `scripts/Common.ps1:59` | `$records.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/Common.ps1:78` | `$items.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/Common.ps1:86` | `$items.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/Common.ps1:103` | `$valid.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/Common.ps1:106` | `$valid.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/Common.ps1:144` | `$parts.Count` | Array captured with @($value); exact two-line identity contract retained. |
| RC4 | `scripts/Common.ps1:162` | `$files.Count` | RC3 uses @(Get-ChildItem); RC4 uses Get-ResultFiles with non-null object[] and preserved array boundary. |
| RC4 | `scripts/Common.ps1:169` | `$files.Count` | RC3 uses @(Get-ChildItem); RC4 uses Get-ResultFiles with non-null object[] and preserved array boundary. |
| RC4 | `scripts/LabelValidationSelfTest.ps1:26` | `$queue.Count` | Concrete Queue[string]/List[string], initialized before use. |
| RC4 | `scripts/LabelValidationSelfTest.ps1:38` | `$queue.Count` | Concrete Queue[string]/List[string], initialized before use. |
| RC4 | `scripts/LabelValidationSelfTest.ps1:39` | `$prompts.Count` | Concrete Queue[string]/List[string], initialized before use. |
| RC4 | `scripts/LabelValidationSelfTest.ps1:39` | `$Inputs.Count` | Typed string[] parameter; every self-test call supplies a non-null finite array. Original label script preserved byte-for-byte. |
| RC4 | `scripts/LabelValidationSelfTest.ps1:40` | `$messages.Count` | Concrete Queue[string]/List[string], initialized before use. |
| RC4 | `scripts/NetworkInspection.ps1:10` | `$lines.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/Run.ps1:15` | `$cpuNames.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/Run.ps1:66` | `$http.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/Run.ps1:66` | `$http.Length` | Explicit object[]/string[] or helper-guaranteed array; return uses unary comma or typed Items property. |
| RC4 | `scripts/Run.ps1:97` | `$package.Count` | Explicit numeric Count field returned by Package-Results, not count of the response object. |
| RC4 | `scripts/SelfTest.ps1:16` | `$bytes.Length` | Typed byte[] returned by File.ReadAllBytes; not pipeline output. |
| RC4 | `scripts/SelfTest.ps1:20` | `@($bytes \| Where-Object { $_ -gt 127 }).Count` | Explicit array subexpression; zero/one/many count is safe. |
| RC4 | `scripts/SelfTest.ps1:50` | `$rows.Count` | RC3 captures Import-Csv with @(...); RC4 Read-ResultCsv returns a normalized object[] without singleton collapse. |
| RC4 | `scripts/SelfTest.ps1:55` | `$newCsv.Length` | Typed byte[] returned by File.ReadAllBytes; not pipeline output. |
| RC4 | `scripts/SelfTest.ps1:55` | `$oldCsv.Length` | Typed byte[] returned by File.ReadAllBytes; not pipeline output. |
| RC4 | `scripts/SelfTest.ps1:55` | `$oldCsv.Length` | Typed byte[] returned by File.ReadAllBytes; not pipeline output. |
| RC4 | `scripts/SelfTest.ps1:57` | `$rows.Count` | RC3 captures Import-Csv with @(...); RC4 Read-ResultCsv returns a normalized object[] without singleton collapse. |
