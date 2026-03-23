---
description: Lập kế hoạch kỹ thuật 2 cấp — High-Level (chiến lược) & Low-Level (chi tiết) — không bao gồm code/implement.
type: procedure
risk: none
source: self
required_skills: [Workflows_Tools/researcher, Architecture/lead-architect, Business/product-manager]
inputs: ["Requirements", "Idea", "PRD"]
outputs: ["High-Level Plan", "Implementation Plan", "Task List", "Architecture Specs"]
context_from: ["/brainstorm", "/research"]
context_to: ["/code", "/cook", "/implement-feature"]
context_artifacts:
  receives: ["docs/020-Requirements/PRD-*.md", "docs/050-Research/*.md"]
  produces: ["high_level_plan.md", "implementation_plan.md", "task.md", "docs/030-Specs/*.md"]
---

# Workflow Lập Kế Hoạch 2 Cấp (`/plan`)

> [!IMPORTANT]
> Workflow này **BẮT BUỘC** tạo ra **2 cấp kế hoạch riêng biệt**:
> 1. **High-Level Plan** (`high_level_plan.md`) — Chiến lược, kiến trúc, phân pha → User approve trước.
> 2. **Low-Level Plan** (`implementation_plan.md`) — Chi tiết file, hàm, test → Developer/Agent thực thi.

## Khi nào dùng (When to Use)

- Cần lên kế hoạch kỹ thuật chi tiết trước khi bắt code.
- Feature phức tạp cần chia nhỏ thành task, xác định dependencies.
- Cần kiến trúc giải pháp (architecture design) trước khi implement.

## KHÔNG dùng khi (When NOT to Use)

- Cần cả plan + code → Dùng `/cook`.
- Đã có plan, cần code → Dùng `/code`.
- Cần tài liệu PRD/Roadmap mức cao → Dùng `/brainstorm`.
- Task nhỏ, không cần plan → Dùng `/development`.

---

## Các bước thực hiện

### Bước 1: Nghiên cứu & Phân tích (Research)

1.  **Adopt `[research]` persona**.
2.  Nếu yêu cầu chưa rõ, dùng `search_web` hoặc `grep_search` codebase để lấy context.
3.  Xác định các rủi ro kỹ thuật, các thư viện cần dùng, hoặc pattern thiết kế phù hợp.

### Bước 2: Thiết kế Kiến trúc (Architecture)

1.  **Adopt `[lead-architect]` persona**.
2.  Xác định các file cần thay đổi/tạo mới.
3.  Vẽ sơ đồ luồng (nếu phức tạp).
4.  Cập nhật/Tạo các file Specs trong `docs/030-Specs/` (nếu cần).

---

### Bước 3a: Lập Kế hoạch Cấp Cao (HIGH-LEVEL PLAN) ⏸ BLOCKING GATE

> [!IMPORTANT]
> **BẮT BUỘC** tạo artifact `high_level_plan.md` **TRƯỚC** khi đi vào chi tiết.
> User PHẢI approve cấp cao trước khi agent được phép soạn Low-Level Plan.

1.  **Create Artifact `high_level_plan.md`** gồm các mục sau:

    #### a) Mục tiêu & Phạm vi (Goal & Scope)
    - Bài toán cần giải quyết là gì?
    - Những gì NẰM TRONG và NGOÀI phạm vi?

    #### b) Kiến trúc Tổng quan (Architecture Overview)
    - Sơ đồ kiến trúc (dùng Mermaid diagram nếu cần).
    - Các thành phần chính (components) và cách chúng giao tiếp.
    - Pattern thiết kế đã chọn (MVC, Event-Driven, Microservice, v.v.).

    #### c) Quyết định Công nghệ (Technology Decisions)
    - Ngôn ngữ, framework, thư viện chính.
    - Lý do chọn (trade-offs).

    #### d) Phân pha Giai đoạn (Phases / Milestones)
    - Chia thành các Phase lớn (VD: Phase 1: Backend Core → Phase 2: Frontend → Phase 3: Integration).
    - Mỗi Phase ghi rõ: Mục tiêu, Deliverables, Dependencies.

    #### e) Phân tích Rủi ro (Risk Analysis)
    - Các rủi ro kỹ thuật và cách giảm thiểu.
    - Các giả định (assumptions).

2.  **Notify User**: `notify_user(BlockedOnUser: true)` — Chờ user approve High-Level Plan.
3.  **KHÔNG ĐI TIẾP** nếu user chưa approve.

---

### Bước 3b: Lập Kế hoạch Chi tiết (LOW-LEVEL PLAN)

> [!NOTE]
> Chỉ chạy bước này **SAU KHI** user đã approve `high_level_plan.md`.

1.  **Create Artifact `implementation_plan.md`** gồm các mục sau:

    #### a) Danh sách Thay đổi Cụ thể (Proposed Changes)
    - Liệt kê từng file: `[NEW]`, `[MODIFY]`, `[DELETE]`.
    - Với mỗi file: mô tả hàm/class/interface cần tạo hoặc sửa.

    #### b) File Importance Scores
    - Đánh giá mức độ quan trọng/rủi ro cho từng file (High/Medium/Low).

    #### c) Chi tiết Kỹ thuật
    - DB Schema / Migrations (nếu có).
    - API Contracts: endpoint, method, request/response shape.
    - Code snippets mẫu cho các phần phức tạp.

    #### d) Kế hoạch Kiểm thử (Test Plan)
    - Unit tests: hàm nào cần test?
    - Integration tests: luồng nào cần kiểm tra end-to-end?
    - Edge cases cần cover.

    #### e) Rule Compliance Report
    - Kiểm tra kế hoạch có tuân thủ `.agent/rules/` (security, performance, v.v.) không.

---

### Bước 4: Phân rã Task (Break Tasks)

// turbo

1.  Dựa trên **cả 2 artifacts** (`high_level_plan.md` + `implementation_plan.md`), chia nhỏ thành các nhiệm vụ nguyên tử (atomic tasks).
2.  Nhóm theo Phase (từ High-Level Plan) → rồi chia nhỏ theo component.
3.  Cập nhật/Tạo Artifact `task.md`. Mỗi task phải gồm: Mô tả, Acceptance Criteria, Độ phức tạp ước tính.

### Bước 5: Review & Handover

1.  **Review lại Plan & Tasks**: Đảm bảo logic chặt chẽ, không bỏ sót dependencies.
2.  **Notify User**: Báo cáo plan và task list đã sẵn sàng.

---

## Ví dụ Copy-Paste

```text
# Lên plan cho feature mới
/plan Lên kế hoạch triển khai module quản lý kho hàng: 
CRUD sản phẩm, nhập/xuất kho, báo cáo tồn kho, alert hết hàng.

# Lên plan cho refactor
/plan Lập kế hoạch refactor auth module: tách monolith auth 
thành 3 service nhỏ (AuthService, TokenService, PermissionService).
```

---

## Output mong đợi

- [ ] `high_level_plan.md`: Chiến lược, kiến trúc, phân pha, rủi ro.
- [ ] `implementation_plan.md`: Chi tiết kỹ thuật từng file.
- [ ] `task.md`: Checklist công việc.
- [ ] (Optional) `docs/030-Specs/*.md`: Tài liệu thiết kế mới.

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `/brainstorm`**: `docs/020-Requirements/PRD-*.md` — PRD để hiểu yêu cầu.
- **Từ `/research`**: `docs/050-Research/*.md` — Kết quả nghiên cứu kỹ thuật.
- **Từ `{{args}}`**: Mô tả yêu cầu inline nếu không có PRD.

### Truyền Context (Output)
- **Cho `/code`**: `high_level_plan.md` + `implementation_plan.md` — Cả 2 cấp.
- **Cho `/implement-feature`**: `high_level_plan.md` + `implementation_plan.md` + `task.md`.

### Fallback
- Nếu không tìm thấy PRD/Research → Dùng `{{args}}` làm input chính.
- Nếu `{{args}}` cũng mơ hồ → Hỏi user clarification trước khi plan.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Bước 1: Research | Retry search 3x | N/A | Hỏi user cung cấp context |
| Bước 2: Architecture | Sửa thiết kế 3x | → Bước 1 (re-research) | Notify user |
| Bước 3a: High-Level | Sửa plan 3x | → Bước 2 (re-architect) | Notify user |
| Bước 3b: Low-Level | Sửa plan 3x | → Bước 3a (re-approve) | Notify user |

---

## Giới hạn (Limitations)

- **Chỉ tạo plan, KHÔNG code** — dùng `/code` hoặc `/cook` để implement.
- **Plan chỉ tốt bằng input** — nếu requirements mơ hồ, plan cũng sẽ mơ hồ.
- **Không validate plan bằng code** — cần implement để kiểm chứng tính khả thi.
- **Research phụ thuộc network** — offline sẽ dùng kiến thức có sẵn.

---

## Workflow liên quan

> **Tiếp theo làm gì?**
> Sau khi cả 2 cấp Plan được approve, bạn có thể chạy `/code` hoặc `/implement-feature`.

- `/code` — Code theo plan đã tạo.
- `/cook` — Nếu muốn cả plan + code trong 1 session.
- `/brainstorm` — Nếu cần PRD trước khi plan.
