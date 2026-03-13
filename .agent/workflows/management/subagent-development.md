---
description: Workflow sử dụng Subagent độc lập để thực thi các Plan lớn với 2 vòng review (Spec & Code Quality).
type: procedure
risk: safe
source: self
required_skills: [qa-tester, backend-developer, frontend-developer]
inputs: ["Implementation Plan", "Task List"]
outputs: ["Completed Tasks", "Reviewed Code"]
context_from: ["/plan", "/break-tasks"]
context_to: ["/git-commit"]
context_artifacts:
  receives: ["implementation_plan.md", "task.md"]
  produces: ["walkthrough.md"]
---

# Workflow Phát Triển Bằng Subagent (`/subagent-development`)

> [!NOTE]
> Workflow giúp xử lý các implementation plan lớn bằng cách chia nhỏ thành các task, mỗi task được giao cho một Subagent độc lập thực thi và review chéo.

## Khi nào dùng (When to Use)

- Đã có Implementation Plan chi tiết.
- Các task hoàn toàn độc lập hoặc ít phụ thuộc chồng chéo.
- Muốn duy trì context gốc sạch sẽ, nhường phần code chi tiết cho Subagent.

## KHÔNG dùng khi (When NOT to Use)

- Chưa có Plan rành mạch.
- Các task dính chặt líu tới nhau (tightly coupled), đổi một file ảnh hưởng đến nhiều chức năng đồng thời cần theo dõi trạng thái.

---

## Các bước thực hiện

### Bước 1: Trích xuất Task (Extract Tasks)

1. Đọc file kế hoạch (`implementation_plan.md` hoặc `task.md`).
2. Tách các task độc lập để lên danh sách phân quyền.

### Bước 2: Dispatch Implementer Subagent

Mở 1 session Subagent mới (Context hoàn toàn mới) và giao 1 task:
1. Đưa toàn bộ context cần thiết (text của task).
2. Trả lời câu hỏi của Subagent nếu nó bị thiếu bối cảnh.
3. Subagent tiến hành TDD tuân thủ RED-GREEN-REFACTOR, code, self-review và commit.

### Bước 3: Review Vòng 1 - Spec Compliance

1. Mở 1 session Spec Reviewer Subagent.
2. Kiểm tra xem code của Implementer đã đúng với Requirement chưa (không thừa tính năng (YAGNI), không thiếu scope).
3. Nếu Fail -> Yêu cầu Implementer sửa lại trước khi sang vòng 2.

### Bước 4: Review Vòng 2 - Code Quality

1. Mở 1 session Code Quality Reviewer Subagent.
2. Đánh giá chất lượng (Clean Code nguyên tắc SOLID, xóa duplicate, Performance).
3. Nếu Fail -> Yêu cầu Implementer sửa.

### Bước 5: Đánh dấu Hoàn Thành và Lặp Lại

1. Tick `[x]` vào `task.md`.
2. Lặp lại Bước 2 cho Task tiếp theo. Khi hết Task, thông báo user duyệt để Merge/Commit.
