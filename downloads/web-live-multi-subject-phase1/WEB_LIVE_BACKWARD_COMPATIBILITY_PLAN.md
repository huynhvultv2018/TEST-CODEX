# WEB LIVE — kế hoạch tương thích gói LIVE cũ

Baseline `TV_VERTICAL_MCQ_CANDIDATE`, SHA-256 `1ccce4f35bf807e498bdf13ca3275e660faa7b50842298ffdeb825e8a3ed917f`. Phase 1 chỉ thiết kế; không migration bài hoặc đổi validator/schema/runtime.

## Kết luận và phạm vi

`BACKWARD_COMPATIBILITY = RISK` cho kiến trúc đích chưa implement. Baseline mới kiểm chạy được 6 gói hiện có: 5 gói Tin/Hình 171 màn/342 trạng thái và Demo 4 màn. Không dùng kết quả này để gọi CORE mới PASS hoặc mọi bài cũ trên máy GV PASS. Không có package Algebra thật trong source.

Giữ gói cũ nguyên ZIP/JSON và checksum. Adapter tạo view model trong memory, không ghi ngược lesson. Một CORE tiếp tục load format cũ; môn không rõ vẫn chạy legacy/default.

## Những contract cần giữ

| Contract hiện hành | Bằng chứng | Chiến lược |
|---|---|---|
| Một lesson.json tại root/subfolder, optional manifest | `zip.js:54–60`, inventory 6 ZIP | Loader path behavior giữ nguyên; không yêu cầu đổi ZIP layout |
| `screens[]`, title/content/question/hint/answer/steps/conclusion/analysisSteps | `validateLesson`, common linear helpers, TV model | Legacy permissive validator giữ; normalizer không bắt mọi optional field trở thành required |
| PNG/JPG/JPEG/SVG + bốn visual field/embedded data | `zip.js:61–73`, teacher JSON gate | Preserve asset roles; không phải chuyển ảnh thành semantic SVG để bài cũ chạy |
| Runtime ID/source key collision | `saveLesson:38–50` | Preserve `_runtimeSourceKey` semantics/FNV legacy; SHA mới để integrity riêng, không thay identity khiến storage mất liên kết |
| Tin preparedContract/Flow/Locks/Policy/Stage/Hint1/2/guidance/trace | `pedagogy.js`, `pedagogy-teacher.js`, 3 Tin packages | Adapter giữ close gate/Teacher-only content; không repackage hoặc sửa stage order |
| Hình sceneId/start/end/imageMode/role + naming heuristic cũ | `common.js:9–97`, DrawBoard.sceneScope | Explicit current fields ưu tiên; thiếu fields thì legacy resolver byte-compatible về behavior |
| subjectMode/layoutEngine/presentation.subjectMode/labels/type | `resolveSubjectLayout`, probes | Nếu thiếu subject_engine, adapter giữ priority và kết quả baseline |
| Wire state version/activation/source/indices; BC/storage keys | `teacher.js:37–38`, `common.js:1`, `tv.js:74,136` | Phase 2 không đổi tên/channel/packet; profile selection là private view context |
| Annotation keys/scope/revisions/snapshot/drag preview | DrawBoard/Cover/Smart helpers + viewers | Không chuyển đổi record hoặc đổi scope khiến mất bài vẽ; profile không đọc namespace môn khác |
| Hint/answer/analysis/knowledge/TTS visibility | `TVLayout.apply`, `tts-tv.collect`, engine assertions | Adapter không render future proof/analysis nodes hay đưa hidden blocks vào registry |
| Native Demo appId/file, demos/ alias, origins/ports/pairing | `demo-teacher`, Launcher handler, HTTP/start source | Giữ launch bằng click+confirm, file whitelist và package config đi cùng |
| Teacher/TV HTML handlers/DOM IDs/CSS/script order | Entry dependencies + 46 served-asset hash checks | Bridge giữ entry paths/handler compatibility; modularization tuần tự |
| MCQ vertical full width, typography/instruction split | `tv-content:138–148`, `tv-ui.css:205,262–268` | Common formatter một bản cho mọi profile, default và legacy |

## Adapter resolution dự kiến

```text
OLD LIVE PACKAGE (không subject_engine)
    → loader hiện hành
    → raw data + source identity giữ nguyên
    → LEGACY/DEFAULT ADAPTER
    → legacySubjectMode / legacy scene / RC3 policy
    → WEB_LIVE_CORE common shell/commands
    → vẫn có presentation như baseline
```

Explicit metadata mới chỉ bật profile khi được hỗ trợ trong candidate đã duyệt. Môn lạ/không metadata không khiến loader crash. Để giữ compatibility, legacy/default **không có nghĩa xóa nhánh Hình/Tin/Algebra cũ**: adapter tái dùng presentation/hình/policy đã audit. Không đoán nội dung trên đường explicit mới, còn heuristics cũ chỉ giữ trong adapter cho legacy.

Unknown fields phải được preserve trong raw object. Normalized view dùng các field đã biết; warnings chỉ ở Teacher. Validator/schema mới nếu cần chỉ dành gói có phiên bản contract mới opt-in, không áp strict rules lên bài cũ. Một manifest mới thiếu profile cũng phải fail/fallback có diagnostic, không sửa ZIP tự động.

## Migration tùy chọn, chưa thực hiện

1. Phần mềm authoring ở workflow SOẠN_TRƯỚC có thể thêm subject_engine cho **bản gói mới** sau contract review. Gói cũ tiếp tục adapter, không yêu cầu giáo viên đóng gói lại toàn bộ.
2. Nếu bổ sung TeX/semantic geometry refs/code blocks, giữ trường source cũ và optional structured representation có version/capability declaration. Adapter không suy diễn tọa độ hoặc solver steps từ text cũ.
3. Công cụ migration tương lai phải là explicit offline command, xuất ZIP mới và diff/hash report; không chạy trong import/present/restore của LIVE. Không overwrite original.
4. Nếu storage record cần version mới, đọc v1 vẫn được, write v2 chỉ khi feature yêu cầu và có consent trong task implementation. Không bulk rewriting library/annotations.

Không có migration hoặc schema file mới được tạo ở Phase 1; chỉ báo cáo đề xuất.

## Origin, rollout và rollback

LocalStorage theo origin: đổi port/hostname giữa candidate và bản hiện dùng tạo thư viện khác. Preserve origin chính 47382 cho bản dùng thực tế. Không chạy hai server trên cùng port; launcher identity check là path-based, không content hash. Quy trình acceptance phải stop đúng server candidate, xác minh bytes/build/source trước kiểm. Không tắt service không thuộc task.

Phase 1 audit dùng port 8770 và browser context trống để không ghi vào library bản dùng; đó không phải migration production origin. Bản freeze giữ read-only. Profile tương lai deploy chung một installation, không chia app config theo ba môn.

Rollout future: candidate riêng → cross-subject tests → native acceptance → GV review → chỉ promote khi có lệnh cụ thể. Rollback giữ original ZIP/hash và compatible storage keys; trở lại entry baseline trên cùng origin, không tự xóa library/annotations. Nếu có storage-version change sau này phải chứng minh baseline đọc được hoặc backup/restore ngoài runtime trước rollout.

## Compatibility risks và điều kiện đóng

| ID | Phân loại / bằng chứng | Tác động | Khuyến nghị / gate |
|---|---|---|---|
| B01 | Globals/scene/Tin policy mixed | Extract có thể đổi reset/commands/overlay order | Bridge + contract parity tests trước chuyển từng trách nhiệm |
| B02 | subject_engine chưa được đọc | Metadata mới có thể im lặng bỏ qua | Shared resolver, diagnostic, baseline route characterization |
| B03 | Teacher ANSWER / TV PROOF tái hiện | Stage parity sai với explicit Geometry/generic label | One resolver/context, test both entries; chưa patch |
| B04 | Không package Algebra thật | Chưa chứng nhận legacy Algebra | Thu thập gói thực khi Phase 5/6 được triển khai; không giả fixtures là SGK |
| B05 | Windows/TV/apps/audio UNRUN | Linux không chứng minh native acceptance | Run máy GV Windows+TV và voices/device thật trước release |
| B06 | MathJax/semantic objects/player chưa có | New capability có thể gây offline/layout/TTS regression | Opt-in local assets, generation guard, fallback nguyên text |
| B07 | Minimal validator/FNV/origin/quota/CSS globals | Fail import/storage, mất records hoặc ảnh hưởng môn khác | Giữ legacy validator/keys/origin; thử collision/quota/scoped CSS |

Không blocker bắt giáo viên sửa bài cũ để hoàn tất Phase 1. Các gate trên là việc của candidate phase sau khi được duyệt. Không kết luận compatibility PASS chỉ từ thiết kế.
