---
description: Lập kế hoạch kỹ thuật và kiến trúc (không bao gồm code/implement).
type: procedure
risk: none
source: self
required_skills: [researcher, lead-architect, product-manager]
inputs: ["Requirements", "Idea", "PRD"]
outputs: ["Implementation Plan", "Task List", "Architecture Specs"]
context_from: ["/brainstorm", "/research"]
context_to: ["/code", "/cook", "/implement-feature"]
context_artifacts:
  receives: ["docs/020-Requirements/PRD-*.md", "docs/050-Research/*.md"]
  produces: ["implementation_plan.md", "task.md", "docs/030-Specs/*.md"]
---

# Workflow Lập Kế Hoạch (`/plan`)

> [!NOTE]
> Workflow này chỉ tập trung vào giai đoạn **Thinking & Planning**.
> Đầu ra sẽ là các tài liệu kế hoạch chi tiết để User review/approve trước khi code.

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

### Bước 3: Lập Kế hoạch Triển khai (Planning)

1.  **Create Artifact `implementation_plan.md`**:
    -   Mô tả mục tiêu.
    -   Danh sách thay đổi (New/Modify/Delete).
    -   **[XAI] File Importance Scores:** Đánh giá mức độ quan trọng/rủi ro cho từng tệp thay đổi (VD: High, Medium, Low) cốt lõi hay phụ trợ, giúp người dùng tập trung review đúng chỗ.
    -   Kế hoạch kiểm thử (Test Plan).
    -   **[XAI] Rule Compliance Report:** Báo cáo ngắn (tóm tắt) việc kế hoạch thiết kế có đang tuân thủ các quy định tại `.agent/rules/` (bao gồm `explainability.md`, `security.md`, v.v.) hay không.

### Bước 4: Phân rã Task (Break Tasks)

// turbo

1.  Dựa trên Implementation Plan vừa tạo, chia nhỏ thành các nhiệm vụ nguyên tử (atomic tasks).
2.  Nhóm theo component hoặc giai đoạn hoạt động (backend/frontend/QA).
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

- [ ] `implementation_plan.md`: Chi tiết kỹ thuật.
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
- **Cho `/code`**: `implementation_plan.md` — Plan chi tiết để code theo.
- **Cho `/implement-feature`**: `implementation_plan.md` + `task.md`.

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
| Bước 3: Planning | Sửa plan 3x | → Bước 2 (re-architect) | Notify user |

---

## Giới hạn (Limitations)

- **Chỉ tạo plan, KHÔNG code** — dùng `/code` hoặc `/cook` để implement.
- **Plan chỉ tốt bằng input** — nếu requirements mơ hồ, plan cũng sẽ mơ hồ.
- **Không validate plan bằng code** — cần implement để kiểm chứng tính khả thi.
- **Research phụ thuộc network** — offline sẽ dùng kiến thức có sẵn.

---

## Workflow liên quan

> **Tiếp theo làm gì?**
> Sau khi Plan được approve, bạn có thể chạy `/code` (tự làm) hoặc `/implement-feature` (từng bước).

- `/code` — Code theo plan đã tạo.
- `/cook` — Nếu muốn cả plan + code trong 1 session.
- `/brainstorm` — Nếu cần PRD trước khi plan.
