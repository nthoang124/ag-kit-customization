---
description: Điều phối việc chia nhỏ yêu cầu thành các task khả thi để triển khai.
type: procedure
risk: none
source: self
required_skills: [business-analysis, lead-architect]
inputs: ["PRD", "User Stories", "SDD"]
outputs: ["docs/045-Tasks/Task-*.md", "task.md"]
---

# Workflow Chia nhỏ Task (`/break-tasks`)

> [!IMPORTANT]
> **BẮT BUỘC**: Tuân thủ `.agent/rules/documents.md`.

## Khi nào dùng (When to Use)

- Yêu cầu phức tạp cần chia thành nhiều task nhỏ.
- Lên task list từ PRD/User Stories cho sprint.
- Estimate effort cho từng task.

## KHÔNG dùng khi (When NOT to Use)

- Task đã đủ nhỏ → Bắt tay code luôn (`/cook` hoặc `/development`).
- Cần lên plan kỹ thuật → Dùng `/plan` (bao trùm hơn).
- Chưa có PRD → Dùng `/brainstorm` trước.

---

## Các bước thực hiện

### Bước 1: Xác định Tài liệu Nguồn

1.  Xác định tài liệu: PRD, User Story, Feature Spec, SDD.
2.  Check: `docs/020-Requirements/`, `docs/022-User-Stories/`, `docs/030-Specs/`.

### Bước 2: Phân tích Yêu cầu

// turbo

1.  **Adopt `[business-analysis]` persona**: Trích xuất tính năng chính + acceptance criteria.
2.  Nhận diện dependencies, tách backend/frontend/QA.
3.  Liệt kê câu hỏi cần làm rõ, notify user nếu cần.

### Bước 3: Phân rã Atomic Task

// turbo

1.  **Adopt `[lead-architect]` persona**: Tạo danh sách task có cấu trúc.
2.  Nhóm theo component/giai đoạn.
3.  Mỗi task: Mô tả, Acceptance Criteria, Độ phức tạp ước tính.
4.  Tạo artifact `task-breakdown.md`.

### Bước 4: Hoàn tất Tài liệu

// turbo

1.  Sau approve: Cập nhật `task.md` hoặc tạo `docs/045-Tasks/Task-{FeatureName}.md`.
2.  Cập nhật MOC.

---

## Ví dụ Copy-Paste

```text
# Break tasks từ PRD
/break-tasks Chia nhỏ PRD-FarmTrace-Auth.md thành các task 
triển khai cho sprint 1. Estimate effort mỗi task.

# Break tasks từ feature
/break-tasks Chia tính năng "Dashboard Analytics" thành 
các atomic tasks: backend API, frontend components, tests.
```

---

## Giới hạn (Limitations)

- **Chỉ chia task, KHÔNG code** — dùng `/cook` hoặc `/code` để implement.
- **Estimate là ước tính** — chỉ mang tính tham khảo.
- **Phụ thuộc chất lượng source docs** — PRD mơ hồ = tasks mơ hồ.
- **Không tự assign** — chỉ tạo list, user tự assign.

---

## Workflow liên quan

- `/plan` — Lên plan kỹ thuật chi tiết hơn.
- `/cook` / `/code` — Implement task sau khi chia.
- `/brainstorm` — Tạo PRD trước khi break tasks.
