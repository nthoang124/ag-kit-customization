---
name: analyze-project
description: Chuyên gia phân tích nguyên nhân cốt lõi (Root cause analyzer) cho các phiên làm việc của Antigravity. Phân loại thay đổi phạm vi (scope deltas), các mẫu làm lại (rework patterns), nguyên nhân gốc rễ, điểm nóng và tự động cải thiện prompt/sức khỏe dự án.
risk: unknown
source: community
version: "1.0"
tags: [analysis, diagnostics, meta, root-cause, project-health, session-review]
---

# /analyze-project — Workflow Phân Tích Nguyên Nhân Cốt Lõi

Phân tích các phiên lập trình (coding sessions) có sự hỗ trợ của AI trong thư mục `~/.gemini/antigravity/brain/` và đưa ra báo cáo giải thích không chỉ **những gì đã xảy ra**, mà còn **tại sao lại xảy ra**, **ai/cái gì gây ra**, và **cần thay đổi gì cho lần sau**.

## Mục Tiêu (Goal)

Đối với mỗi phiên, cần xác định:

1. Những gì đã thay đổi từ yêu cầu ban đầu cho đến khi công việc hoàn thành.
2. Nguyên nhân chính là do:
   - User/Đặc tả yêu cầu (spec)
   - Agent (trợ lý AI)
   - Codebase/Repo hiện tại
   - Quá trình Verify/Testing
   - Hay do độ phức tạp thực tế của task
3. Prompt mở đầu (opening prompt) có đủ rõ ràng và chi tiết không.
4. Những file/hệ thống con nào liên tục gây khó khăn (struggle).
5. Những thay đổi nào sẽ giúp cải thiện nhiều nhất cho các phiên làm việc trong tương lai.

## Các Quy Tắc Chung (Global Rules)

- Coi số lượng các file `.resolved.N` như **tín hiệu lặp lại/thử lại (iteration signals)**, chứ không hẳn là bằng chứng của việc thất bại.
- Phân biệt rõ **Phạm vi do con người thêm vào (human-added scope)**, **Phạm vi phát sinh bắt buộc (necessary discovered scope)**, và **Phạm vi do Agent tự ý thêm vào (agent-introduced scope)**.
- Phân biệt **Lỗi do Agent (agent error)** với **Sự cồng kềnh/dễ vỡ của Repo (repo friction)**.
- Mọi chẩn đoán đều phải đi kèm **bằng chứng (evidence)** và **mức độ tự tin (confidence)**.
- Mức độ tự tin (Confidence levels):
  - **High (Cao)** = Có bằng chứng trực tiếp từ artifact/timestamp.
  - **Medium (Trung bình)** = Có nhiều tín hiệu hỗ trợ.
  - **Low (Thấp)** = Chỉ là suy luận hợp lý, không có chứng minh trực tiếp.
- Mức độ ưu tiên của bằng chứng:
  - Nội dung artifact > Timestamps > Metadata summaries > Suy luận.
- Nếu bằng chứng yếu, hãy nói rõ.

---

## Bước 0.5: Phân Loại Mục Đích Phiên Phân Tích (Session Intent Classification)

Phân loại mục đích chính của phiên phân tích từ objective + artifacts:

- `DELIVERY` (Giao hàng / Hoàn thiện tính năng)
- `DEBUGGING` (Sửa lỗi)
- `REFACTOR` (Tái cấu trúc)
- `RESEARCH` (Nghiên cứu)
- `EXPLORATION` (Khám phá)
- `AUDIT_ANALYSIS` (Kiểm toán/Phân tích)

Lưu lại:
- `session_intent`
- `session_intent_confidence`

Sử dụng `intent` để làm bối cảnh đánh giá mức độ nghiêm trọng và thói quen làm lại công việc (rework shape). Không áp dụng tiêu chuẩn của một session "Giao hàng (delivery)" khắt khe cho một session khám phá hoặc nghiên cứu.

---

## Bước 1: Khám Phá Các Cuộc Hội Thoại (Discover Conversations)

1. Đọc các bản tóm tắt hội thoại hiện có từ hệ thống (system context).
2. Lấy danh sách các thư mục hội thoại trong thư mục `brain/` của tài khoản Antigravity.
3. Xây dựng index chứa:
   - `conversation_id`
   - `title`
   - `objective`
   - `created`
   - `last_modified`
4. Nếu user cung cấp từ khóa/đường dẫn, hãy lọc các hội thoại khớp; nếu không, hãy phân tích tất cả.

Đầu ra: Danh sách đã index của các hội thoại để phân tích.

---

## Bước 2: Trích Xuất Bằng Chứng Của Phiên Làm Việc (Extract Session Evidence)

Với mỗi cuộc hội thoại, hãy đọc (nếu có):

### Các Artifact Nòng Cốt (Core artifacts)
- `task.md`
- `implementation_plan.md`
- `walkthrough.md`

### Siêu Dữ Liệu (Metadata)
- `*.metadata.json`

### Snapshots Phiên Bản (Version snapshots)
- `task.md.resolved.0 ... N`
- `implementation_plan.md.resolved.0 ... N`
- `walkthrough.md.resolved.0 ... N`

### Các Tín Hiệu Khác (Additional signals)
- Các file `.md` artifacts khác
- Timestamps giữa các lần cập nhật artifact
- Tên các tập tin/thư mục/hệ thống con được đề cập trong bản kế hoạch (plans) hoặc walkthroughs.
- Ngôn ngữ dùng để verify/testing
- Các tiêu chí nghiệm thu (acceptance criteria), ràng buộc (constraints), những điều không làm (non-goals), và tệp mục tiêu (file targets).

Ghi lại cho từng hội thoại:

#### Vòng Đời (Lifecycle)
- `has_task`
- `has_plan`
- `has_walkthrough`
- `is_completed`
- `is_abandoned_candidate` = có task nhưng không có walkthrough

#### Mức Độ Chỉnh Sửa (Revision / change volume)
- `task_versions`
- `plan_versions`
- `walkthrough_versions`
- `extra_artifacts`

#### Phạm vi (Scope)
- `task_items_initial`
- `task_items_final`
- `task_completed_pct`
- `scope_delta_raw`
- `scope_creep_pct_raw`

#### Timing
- `created_at`
- `completed_at`
- `duration_minutes`

#### Content / quality
- `objective_text`
- `initial_plan_summary`
- `final_plan_summary`
- `initial_task_excerpt`
- `final_task_excerpt`
- `walkthrough_summary`
- `mentioned_files_or_subsystems`
- `validation_requirements_present`
- `acceptance_criteria_present`
- `non_goals_present`
- `scope_boundaries_present`
- `file_targets_present`
- `constraints_present`

---

## Bước 3: Đánh Giá Prompt Ban Đầu (Prompt Sufficiency)

Chấm điểm request ban đầu từ 0–2 cho các mục:

- **Clarity (Độ rõ ràng)**
- **Boundedness (Tính giới hạn)**
- **Testability (Khả năng kiểm chứng/test)**
- **Architectural specificity (Độ chi tiết về kiến trúc)**
- **Constraint awareness (Nhận thức về ràng buộc)**
- **Dependency awareness (Nhận thức về tính phụ thuộc)**

Tạo ra:
- `prompt_sufficiency_score`
- `prompt_sufficiency_band` = High / Medium / Low

Sau đó, ghi chú những điểm thiếu sót trong prompt mà rất có thể đã góp phần gây ra khó khăn về sau.

*Lưu ý: Đừng trừ điểm tự động chỉ vì prompt quá ngắn; một task hẹp, rõ ràng thì prompt ngắn vẫn có "sufficiency" cao.*

---

## Bước 4: Phân Loại Thay Đổi Phạm Vi (Scope Change Classification)

Phân loại những thay đổi về scope:

- **Human-added scope** — User yêu cầu thêm ngoài task ban đầu.
- **Necessary discovered scope** — Công việc bắt buộc phát sinh để hoàn thành đúng task gốc.
- **Agent-introduced scope** — Những việc không cần thiết bị Agent tự đưa vào.

Ghi lại:
- `scope_change_type_primary`
- `scope_change_type_secondary` (optional)
- `scope_change_confidence`
- evidence

Mẹo cân chỉnh (Calibration):
- Human-added: "sẵn tiện thì refactor luôn đoạn code gần đó nhé"
- Necessary discovered: Cần phải sửa một logic phụ thuộc (dependency) bị ẩn thì tính năng mới hoạt động.
- Agent-introduced: Agent tự dưng cleanup dọn dẹp thêm mã mà không có yêu cầu hay sự bắt buộc.

---

## Bước 5: Phân Loại Hình Dáng Rework (Rework Shape)

Phân loại mỗi session vào một dạng (pattern) chính:

- **Clean execution** (Chạy 1 lèo xong luôn)
- **Early replan then stable finish** (Lập kế hoạch lại ở đầu rồi chốt mượt mà)
- **Progressive scope expansion** (Phạm vi cứ nở ra dần dần)
- **Reopen/reclose churn** (Đóng mở issue/bug liên tục)
- **Late-stage verification churn** (Gặp rắc rối khi test/verify ở cuối)
- **Abandoned mid-flight** (Bỏ dở giữa chừng)
- **Exploratory / research session** (Phiên nghiên cứu khám phá)

Ghi lại:
- `rework_shape`
- `rework_shape_confidence`
- evidence

---

## Bước 6: Phân Tích Nguyên Nhân Cốt Lõi (Root Cause Analysis)

Đối với những session không phải là "Clean execution", hãy gán:

### Nguyên nhân cốt lõi chính (Primary root cause)
Chọn một trong:
- `SPEC_AMBIGUITY` (Đặc tả không rõ)
- `HUMAN_SCOPE_CHANGE` (User đổi scope)
- `REPO_FRAGILITY` (Codebase quá cồng kềnh/dễ gãy)
- `AGENT_ARCHITECTURAL_ERROR` (Agent sai định hướng kiến trúc)
- `VERIFICATION_CHURN` (Lỗi trong test/verify)
- `LEGITIMATE_TASK_COMPLEXITY` (Độ khó task chính đáng)

### Nguyên nhân phụ (Secondary root cause)
(Tùy chọn, nếu có liên quan mật thiết)

### Hướng Dẫn Kéo Dữ Liệu:
- **SPEC_AMBIGUITY**: Yêu cầu thiếu ranh giới, không có target files rõ ràng, hoặc thiếu constraints.
- **HUMAN_SCOPE_CHANGE**: Khi user mở rộng quy mô task.
- **REPO_FRAGILITY**: Tính coupling ẩn, file dễ gãy, architecture khó hiểu ép thêm việc.
- **AGENT_ARCHITECTURAL_ERROR**: Nhầm file, sai assumption, cách tiếp cận sai lệch, vẽ kiến trúc vớ vẩn.
- **VERIFICATION_CHURN**: Việc làm thì đúng, nhưng việc test/validate lại quay vòng lặp lại nhiều lần.
- **LEGITIMATE_TASK_COMPLEXITY**: Task vốn khó nên việc đập đi xây lại là có thể đoán trước.

Mỗi gán ghép nguyên nhân phải bao gồm:
- evidence (Bằng chứng)
- Giải thích vì sao loại bỏ các nguyên nhân khác
- confidence (Độ chắc chắn)

---

## Bước 6.5: Chấm Điểm Mức Độ Nghiêm Trọng (0–100)

Đánh giá mức ưu tiên của session thông qua severity score.

Các tham số cộng (tổng max kịch trần 100):
- **Completion failure**: 0–25 (`abandoned = 25`)
- **Replanning intensity**: 0–15
- **Scope instability**: 0–15
- **Rework shape severity**: 0–15
- **Prompt sufficiency deficit**: 0–10 (`low = 10`)
- **Root cause impact**: 0–10 (`REPO_FRAGILITY` / `AGENT_ARCHITECTURAL_ERROR` cao nhất)
- **Hotspot recurrence**: 0–10

Các dải quy ra:
- **0–19 Low**
- **20–39 Moderate**
- **40–59 Significant**
- **60–79 High**
- **80–100 Critical**

Ghi chú:
- `session_severity_score`
- `severity_band`
- `severity_drivers` = top 2–4 nguyên nhân gây tốn thời gian.
- `severity_confidence`

(Biết context để chấm điểm Research session cho chính xác, không dùng công thức ép KPI cho session Exploration).

---

## Bước 7: Phân Cụm Điểm Nóng Hệ Thống Con / File (Subsystem / File Clustering)

Tổng hợp các trục trặc liên quan trên một Subsystem / Folder / File.
Tính toán điểm nóng:
- số lượng conversations liên quan đến file đó.
- số revisions trung bình.
- tỷ lệ hoàn thành
- tỷ lệ bỏ ngang
- nguyên nhân phổ biến.
- severity trung bình.

-> Để định giá do Prompt fail, Agent ngáo hay do Repo đó nát.

---

## Bước 8: Các Nhóm So Sánh (Comparative Cohorts)

Thực hiện So sánh:
- Thành công ngay shot đầu (First-shot) vs Phải Replan.
- Đã hoàn thành (completed) vs bỏ dở (abandoned).
- Prompt đủ thông tin (High sufficiency) vs Prompt sơ sài (Low sufficiency).
- Scope hẹp vs Scope bị phình to.
- Sessions ngắn vs Sessions siêu dài.
- Hệ thống con trơn tru vs Hệ thống con đau khổ.

Rút ra: Điều gì khác biệt? Cái gì correlate (tương quan tuyến tính) với việc thực thi mượt/đổ vỡ.

---

## Bước 9: Các Phát Hiện Chuyên Sâu (Non-Obvious Findings)

Trích xuất 3-7 insights KHÔNG CHỈ là báo cáo Metric.
Phải kèm: Observation, Tại sao nó qtrọng, Evidence, Confidence.

Ví dụ: "Scope phình to thường xuất hiện SAU khi đã fix xong bug ban đầu, gợi ý rằng là do user bôi thêm chứ không phải Agent ngáo."

---

## Bước 10: Khởi Tạo Báo Cáo (Report Generation)

Tạo file `session_analysis_report.md`:

# 📊 Session Analysis Report — [Project Name]

**Được Tạo Vào**: [timestamp]  
**Số Trò Chuyện Phân Tích**: [N]  
**Range Giai Đoạn**: [earliest] → [latest]

## Tóm Tắt (Executive Summary)

| Chỉ số | Giá trị | Đánh giá |
|:---|:---|:---|
| First-Shot Success Rate (Ăn ngay nhát đầu) | X% | 🟢/🟡/🔴 |
| Completion Rate (Tỷ lệ hoàn thành) | X% | 🟢/🟡/🔴 |
| Avg Scope Growth (Độ phình Scope tb) | X% | 🟢/🟡/🔴 |
| Replan Rate (Tỷ lệ Replan) | X% | 🟢/🟡/🔴 |
| Median Duration (Thời gian Giữa) | Xm | — |
| Avg Session Severity | X | 🟢/🟡/🔴 |
| High-Severity Sessions | X / N | 🟢/🟡/🔴 |

Kèm theo các giải thích định lượng/định tính.

## Thống Kê Nguyên Nhân (Root Cause Breakdown)
...
## Phân Tích Độ Đủ của Prompt (Prompt Sufficiency)
...
## Phân Tích Thay Đổi Scope
...
## Phân Tích Cục Diện Rework
...
## Điểm Cản Trở (Friction Hotspots)
...
## Phiên Suôn Sẻ Đầu Tiên (First-Shot Successes)
...
## Phát Hiện Đáng Chú Ý (Non-Obvious Findings)
...
## Phân Loại Severity Triage
...
## Khuyến Nghị (Recommendations)
...
## Thông Tin Theo Từng Cuộc Trò Chuyện (Per-Conversation Breakdown)
...

---

## Bước 11: (Tùy Chọn) Cải Tiến Hậu Phân Tích
Cập nhật memory/artifact hoặc tạo `prompt_improvement_tips.md` dựa vào báo cáo để agent hoặc team cải thiện kỹ năng.

---

## Final Output Standard
Workflow NÀY BẮT BUỘC PHẢI gen ra được:
1. Tổng hợp Metrics.
2. Chẩn đoán Root-cause.
3. Chấm điểm Prompt.
4. Friction map.
5. Severity triage.
6. Evidence-backed Recommend.
7. Các Insights chuyên sâu.
