# P12.2B — Synthetic scale

12 PASS scenarios: 10/50/100/250 lessons at three distinct unique PNG sizes (32×32, 96×96, 192×192). Total 1230 saves. Each image repeats in three authored bindings; content-address storage preserves exact hydrated JSON and avoids repeated asset bytes. Every saved lesson is read/verified after reload, not only counted. Subject/grade/week filtering asserted; zero full lesson/base64 localStorage keys; zero storage/browser errors.

| Lessons | Image side | Save | List | Filter | Reopen | Storage errors | Raw assets bytes | Source JSON UTF-8 bytes | Approx browser usage bytes | Save ms | List ms | Reopen ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 10 | 32 | PASS | PASS | PASS | PASS | 0 | 32011 | 131645 | 78792 | 944.8 | 0.1 | 398.7 |
| 50 | 32 | PASS | PASS | PASS | PASS | 0 | 160150 | 658810 | 244073 | 3218.2 | 0.4 | 187.1 |
| 100 | 32 | PASS | PASS | PASS | PASS | 0 | 320351 | 1317916 | 435554 | 2825.0 | 0.2 | 541.1 |
| 250 | 32 | PASS | PASS | PASS | PASS | 0 | 800799 | 3295155 | 2137984 | 16372.2 | 0.5 | 969.1 |
| 10 | 96 | PASS | PASS | PASS | PASS | 0 | 274705 | 1102421 | 327322 | 608.3 | 0 | 83.3 |
| 50 | 96 | PASS | PASS | PASS | PASS | 0 | 1373295 | 5511430 | 1458680 | 2827.7 | 0.1 | 399.3 |
| 100 | 96 | PASS | PASS | PASS | PASS | 0 | 2746704 | 11023360 | 2885839 | 7745.4 | 0.1 | 639.6 |
| 250 | 96 | PASS | PASS | PASS | PASS | 0 | 6866645 | 27558579 | 7232188 | 23497.2 | 1.4 | 4212.2 |
| 10 | 192 | PASS | PASS | PASS | PASS | 0 | 1039784 | 4162755 | 1104039 | 2165.2 | 0.1 | 315.9 |
| 50 | 192 | PASS | PASS | PASS | PASS | 0 | 5199061 | 20814516 | 5327073 | 6332.8 | 0.2 | 1911.2 |
| 100 | 192 | PASS | PASS | PASS | PASS | 0 | 10398097 | 41629016 | 10626094 | 12108.2 | 0.2 | 1896 |
| 250 | 192 | PASS | PASS | PASS | PASS | 0 | 25995050 | 104072449 | 26480791 | 34103.6 | 0.5 | 5049.9 |

Raw source: EVIDENCE/SCALE/SCALE_RESULTS.json; Linux Chromium 151.0.7922.173. Largest run stores 25,995,050 raw asset bytes from 104,072,449 serialized input bytes; estimate is browser-reported approximate usage, not a Windows capacity promise. Parallel runner timings measure cloud workload and may vary. No unlimited claim: quota, disk space, eviction, browser profile/origin and private-mode behavior still apply. Old LS payloads remain temporarily for rollback, so migration does not free old LS capacity.
