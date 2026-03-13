---
description: Tự động hóa phát triển tính năng lớn từ ý tưởng thô đến code hoàn chỉnh (Macro-Workflow).
type: procedure
risk: safe
source: self
required_skills: [product-manager, lead-architect, backend-developer, frontend-developer]
inputs: ["User Idea", "High-level goal"]
outputs: ["Implementation Plan", "Task List", "Completed Code"]
context_from: []
context_to: ["/git-commit", "/git-pr"]
context_artifacts:
  receives: []
  produces: ["prd.md", "implementation_plan.md", "task.md", "walkthrough.md"]
---

# Macro-Workflow Phát Triển Đầu Cuối (`/epic-dev`)

> [!NOTE]
> Đây là một Macro-Workflow có tính tổ hợp. Agent sẽ tự động chuyển trạng thái để gọi chuỗi các luồng nhỏ liên tiếp, tối ưu quá trình làm một Epic lớn mà không bắt user phải gõ lắt nhắt.

## Khi nào dùng (When to Use)

- Bắt đầu làm một tính năng hoàn toàn mới và rất to (Epic).
- Chưa có Requirement rõ ràng, chỉ có một "ý nghĩ" ban đầu.
- Muốn tự động hóa toàn bộ luồng "từ A đến Z".

---

## Chuỗi Hành Động Liên Tiếp (Pipeline)

Quy trình này sẽ gọi lần lượt 4 workflow nội tại. Hết mỗi vòng, vui lòng gọi user để xác nhận trước khi đẩy sang vòng tiếp.

### Bước 1: Ý Tưởng -> Sơ đồ (`/brainstorm`)

1. Trigger ý định: Phân tích Product Manager & Lead Architect.
2. Hỏi dồn user lấy context.
3. Sinh ra tài liệu yêu cầu (PRD/Roadmap). Nếu ok → Bước 2.

### Bước 2: Lập Kế Hoạch Hiện Thực Hóa (`/plan`)

1. Nhận Đầu vào: `prd.md` hoặc thiết kế sơ bộ.
2. Sinh ra Base Architecture và file `implementation_plan.md`.
3. Nếu xin ý kiến user OK → Bước 3.

### Bước 3: Đập Nhỏ Thành Task (`/break-tasks`)

1. Nhận Đầu vào: `implementation_plan.md`.
2. Bóc tách ra file `task.md` với check `[ ]` phân định rõ quyền trách nhiệm Subagent.
3. Không cần break hỏi user → auto chuyển Bước 4.

### Bước 4: Code bằng Subagent (`/subagent-development`)

1. Nhận Đầu vào: `task.md` chứa danh sách lệnh đã bóc nhỏ.
2. Phái Subagent ra thực hiện theo tư tưởng Fresh Context, trải qua Spec Review và Code Quality Review The Iron Law of TDD.
3. Khi tất cả Tasks `[x]` tick xong → Output `walkthrough.md` thành quả và gọi cho User.
