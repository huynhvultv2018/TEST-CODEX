# Profile interface

**PROFILE_INTERFACE_STATUS = PASS**; **PROFILE_RESOLVER_STATUS = PASS**.

Global API immutable `WebLiveProfiles`, version 1. `profiles` chứa descriptor immutable cho legacy/geometry/algebra/informatics. Ba subject descriptors có `status=REGISTERED_STUB`, `featuresImplemented=false`, `adapter=existing-runtime`. Không có solver, công cụ môn học, authoring hay pedagogical rule mới.

## Metadata contract

Chỉ đọc **own property `lesson.subject_engine`**, optional string. Trim + lowercase. Không đọc screen.subject_engine, subject/title/content/type để đoán profile; các trường đó tiếp tục được legacy renderer xử lý như trước.

| Metadata | Profile | Diagnostic / Adapter |
|---|---|---|
| Missing | legacy | PROFILE_MISSING / info; không override renderer |
| Empty/whitespace | legacy | PROFILE_EMPTY / warning |
| Non-string, kể cả null/object/array/number/bool | legacy | PROFILE_INVALID_TYPE / warning |
| Unknown string | legacy | PROFILE_UNKNOWN / warning |
| legacy | legacy | EXPLICIT; không override renderer |
| geometry | geometry | Existing GEOMETRY presentation |
| algebra | algebra | Existing ALGEBRA presentation |
| informatics | informatics | Existing COMPUTER_SCIENCE presentation |

Canonical metadata hợp lệ ưu tiên trước old subjectMode/layoutEngine/labels. Fallback Legacy không ép GENERIC: nó giữ resolver cũ nguyên vẹn, bao gồm old explicit fields và heuristic đã tồn tại. Teacher stage đọc cùng canonical adapter với TV. Đây là routing/interface change của metadata mới, không phải triển khai subject feature.

## API và lifecycle

| API | Contract |
|---|---|
| resolve(lesson) | Frozen result: profileId, reason, severity, profile; không mutation |
| layoutMode(lesson) | Existing mode hoặc null cho Legacy |
| subscribe(profileId, hooks) | Chỉ known ID và function của bốn hook; trả unsubscribe; copy/freeze hook map |
| observe(role, lesson, state) | Internal runtime entry, role teacher/tv/preview; scalar frozen context |
| tvRendered(state) | Dispatch sau render; false nếu stale activation/source/index/version hoặc role Teacher |
| getContext()/getDiagnostics() | Read-only snapshots; diagnostic ring tối đa 100 records |

Bốn hook: `onLessonLoad`, `onStepChange`, `onTVRender`, `onDispose`. Stubs mặc định không có hook handler. Dispatch chọn đúng profile, không multicast sang Legacy hay profile khác. Lỗi handler được giữ thành HOOK_ERROR, không dừng renderer; không đưa stack/message chứa dữ liệu riêng vào diagnostic. Diagnostics ghi khi activation/profile đổi, không spam ở mỗi repaint.

Context: role, profileId, resolutionReason, lessonId, lessonActivation, lessonSourceKey, index, stateVersion. `onDispose` nhận context cũ khi chuyển lesson/activation/source/profile/role. Reload page tạo API instance mới; subscribers cần được đăng ký lại bằng script của feature tương lai. Không cam kết cleanup riêng trước page unload vì browser hủy document và subscribers cùng lúc.

Ví dụ điểm gắn sau phê duyệt Phase 3:

```js
const unsubscribe = WebLiveProfiles.subscribe('geometry', {
  onLessonLoad(context) { /* initialize an approved extension */ },
  onStepChange(context) { /* respond to current screen */ },
  onTVRender(context) { /* observe current fitted TV DOM */ },
  onDispose(context) { /* clean up that extension */ }
});
```

Ví dụ chỉ minh họa interface; không có Geometry implementation trong candidate. Bằng chứng: 6 Node check groups và 8 native browser cases trong `profile-contract.json`, `profile-runtime.json`; canonical profile chống metadata mâu thuẫn, other-profile hook count bằng 0 ở mỗi activation, stale callbacks bị loại.
