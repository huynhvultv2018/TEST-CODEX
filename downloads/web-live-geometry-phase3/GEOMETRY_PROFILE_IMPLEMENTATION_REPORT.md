# Geometry profile implementation

`WEB_LIVE/geometry-profile.js` và `geometry-profile.css` là implementation Geometry riêng trong cùng WEB LIVE. Không có ứng dụng Hình học độc lập hoặc solver. Profile đăng ký adapter Geometry và lifecycle cleanup; Legacy/Algebra/Informatics không đăng ký feature adapter mới.

## Metadata optional

```json
{
  "subject_engine": "geometry",
  "geometry": {
    "schemaVersion": 1,
    "figures": [{
      "id": "figure-1",
      "sourceScreenId": 6,
      "objects": [
        {"id":"A","type":"point","x":0.2,"y":0.3},
        {"id":"B","type":"point","x":0.7,"y":0.6},
        {"id":"AB","type":"segment","from":"A","to":"B"}
      ]
    }]
  },
  "screens": [{
    "id": 6,
    "geometry": {
      "figureId": "figure-1",
      "givens": ["Dữ kiện do package cung cấp"],
      "goals": ["Mục tiêu do package cung cấp"],
      "proofLinks": [["AB"], ["A"]],
      "analysisLinks": [["A"], ["AB"]]
    }
  }]
}
```

Ví dụ chỉ mô tả schema, không phải lesson đầy đủ; screen nguồn phải có image/geometryImage hợp lệ được importer hiện hữu nạp. sourceScreenId phải explicit (string/finite number), không đoán unnamed screen. Không thêm importer, storage key hoặc wire field mới. Bài cũ không metadata vẫn Legacy.

`figureId` chọn figure hiện hành; các screen sau giữ figure cho đến explicit reset/new figure hoặc existing sceneStart/sceneEnd. `geometry.reset=true` xóa context tại screen đó; nếu kèm figureId sẽ mở lại figure với annotation epoch mới. Timeline được compile theo thứ tự lesson nên Next/Previous/Jump/restore cho cùng kết quả, không phụ thuộc lịch sử click. WeakMap cache không ghi/freeze lesson.

`givens`/`goals` là arrays string. Render GIẢ THIẾT/KẾT LUẬN khi có data, không hard-code dữ kiện. MCQ giữ nguyên renderer options/instruction. `proofLinks[n]` ánh xạ bước n (zero-based, theo liveSteps hiện hành); `analysisLinks[n]` theo analysisSteps. `highlights` optional là các object của current screen khi chưa reveal proof/analysis. Không regex AB=AC hoặc OCR để đoán link. Future index không được dùng để chọn highlight hay proof.

## Object model

| Type | Dữ liệu | Status |
|---|---|---|
| point | x,y chuẩn hóa 0…1 | Highlight ring |
| segment | from,to = point ID hoặc [x,y] | Highlight line |
| line / ray | from,to | Bounded line/ray trong base image |
| angle | points=[arm,vertex,arm], optional radius | Arc ở vertex từ authored coordinates |
| triangle | points=[3 vertices] | Outline + translucent fill |
| circle | center=point ID/[x,y], radius relative to min(image width,height) | Circle highlight |
| label | at, text | SVG text, không HTML |
| mark | at | Marker ring |
| highlight | targets=[object IDs] | Alias expansion bounded/cycle-safe |
| teacher annotation | Existing DrawBoard.Model / cover / smart layers | Kế thừa; không đưa vào base object registry |

ID ≤80 chars; coordinates finite/in range; 100 figures, 500 objects/figure, 80 selected IDs và depth ≤8. Invalid coordinates/unknown objects không render; unknown figure/source không chọn hình khác. Diagnostics bounded 100. Không xác minh tính đúng của theorem/metadata thay GV. Angle rendering dùng tọa độ để vẽ arc, không suy luận chứng minh.

Highlight SVG dùng đúng intrinsic image viewBox, được đặt trong figureInner và cùng zoom/pan transform với ảnh. pointer-events:none, không chặn native annotation, eraser, pan hoặc double-click. Image load callback cập nhật SVG theo current view; dispose xóa SVG/controls/datasets và current view khi đổi profile.

## Core change ledger

| CORE_CHANGE_ID | REASON | FILES | BEFORE | AFTER | IMPACT | LEGACY_TEST | PROFILE_ISOLATION_TEST |
|---|---|---|---|---|---|---|---|
| P3-C01 | Selected-profile extension tại visual/presentation boundary | core-profiles.js | v1 lifecycle + existing mode stubs | v2 trusted registerAdapter/adaptVisuals/present; geometry implemented descriptor | Hooks scalar immutable giữ nguyên; only selected adapter; stubs khác unchanged | paired-comparison, 350 states | geometry-contract descriptor equality; profile-isolation |
| P3-C02 | Giữ hình/scoped annotation khi generic step không có legacy scene hints | common.js | resolveScreenVisuals trả legacy cached result | Optional selected adapter nhận fallback và trả Geometry result | Legacy result unchanged; no lesson mutation | 342 hashes + scene/image metrics | Missing/unknown/algebra/informatics không Geometry visuals |
| P3-C03 | Render sau Teacher paint và trước TV fit/TTS | teacher.js, tv.js | State sync/presentation cũ | present call tại Teacher sync và TV applyState trước rAF | Không đổi packet fields/transport/disclosure commands; Geometry DOM khi selected | cockpit/TTS paired; state keys match | Native other-profile DOM + TTS snapshots match Phase 2 |
| P3-C04 | Cài profile vào cùng WEB LIVE | teacher.html, tv.html | Phase 2 script/style chain | Load geometry-profile.js và scoped CSS | Không launcher/build mới hoặc global redesign | served asset bytes; legacy/MCQ captures | No Geometry class/layer/controls in other profiles |

Sáu file cũ thay đổi; hai runtime files mới. Original CSS, Algebra/Informatics engines, TTS, Launcher, BAT/Python/config và lesson ZIP nguyên byte. `GEOMETRY_TEST_EVIDENCE/RUNTIME_PATCH.diff` chứa full patch để review. Trusted adapters đọc lesson/state và sửa presentation DOM; lifecycle contexts vẫn chỉ scalars. Đây là dispatch isolation, không phải security sandbox.

Zoom/layout/fullscreen không có implementation thứ hai. Teacher controls mới chỉ delegate resetZoom/clearPointer/clearFocus và native annotation model clear; base pixels không bị xóa. DrawBoard movable points/undo/redo được test qua mouse drag và Ctrl+Z/Y. Dynamic base geometry/constraint solver được defer, không refactor Core để làm GeoGebra clone.
