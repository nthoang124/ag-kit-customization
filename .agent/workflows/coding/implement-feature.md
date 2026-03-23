---
description: Điều phối việc triển khai tính năng từ đặc tả đến khi hoàn thành.
type: procedure
risk: critical
source: self
required_skills: [Workflows_Tools/researcher, Business/product-manager, Architecture/lead-architect, Development/backend-developer, Development/frontend-developer, Testing_Security/qa-tester]
inputs: ["docs/020-Requirements/PRD-*.md"]
outputs: ["Source Code", "QA Report", "Updated Specs"]
context_from: ["/brainstorm", "/plan", "/research"]
context_to: ["/git-pr", "/deploy"]
context_artifacts:
  receives: ["docs/020-Requirements/PRD-*.md", "docs/022-User-Stories/*.md", "high_level_plan.md", "implementation_plan.md"]
  produces: ["walkthrough.md", "qa-report.md", "committed code"]
---

# Quy trình Triển khai Tính năng (`/implement-feature`)

> [!IMPORTANT]
> **BẮT BUỘC**: Đọc `.agent/rules/documents.md` trước khi tạo bất kỳ tài liệu nào.

## Khi nào dùng (When to Use)

- Feature phức tạp cần **nhiều phase review** từ user (research → spec → plan → backend → frontend → QA).
- Feature liên quan đến nhiều module (backend + frontend + database).
- Cần tài liệu đặc tả (specs) trước khi code.
- Feature có PRD/User Stories sẵn trong `docs/`.

## KHÔNG dùng khi (When NOT to Use)

- Task nhỏ (1-3 file) → Dùng `/development`.
- Muốn AI tự chạy end-to-end nhanh → Dùng `/cook`.
- Chỉ cần code theo plan có sẵn → Dùng `/code`.
- Chỉ cần lên kế hoạch → Dùng `/plan`.

## Điều kiện tiên quyết (Prerequisites)

- PRD hoặc User Stories tồn tại trong `docs/020-Requirements/` hoặc `docs/022-User-Stories/`.
- Project đã được bootstrap (dependencies, DB, config sẵn sàng).
- Git đã init, đang trên branch `dev` hoặc sẵn sàng tạo feature branch.

---

## Bước 1: Nghiên cứu Chuyên sâu (Deep Research)

// turbo

> 💡 **BẮT BUỘC**: Tuân thủ `.agent/rules/research.md` để đảm bảo tính năng hiện đại.

1.  **Adopt `[researcher]` persona** để tìm patterns hiệu quả/hiện đại nhất.
2.  Cập nhật/Tạo tài liệu nghiên cứu trong `docs/050-Research/`.
3.  **Action**: Gọi tool `notify_user(BlockedOnUser: true)` để user review.

## Bước 2: Đặc tả Nhanh (Optional)

**Bỏ qua nếu**: Đã có User Stories hoặc Specs trong `docs/`.

1.  **Adopt `[product-manager]` persona** để làm rõ yêu cầu.
2.  Tạo artifact `feature-spec.md` gồm: Goal, User, Acceptance Criteria.
3.  **Action**: Gọi tool `notify_user(BlockedOnUser: true)` để user review.

## Bước 3: Định vị Artifacts Hiện có

// turbo

1.  Tìm kiếm trong `docs/` các tài liệu liên quan.
2.  **Adopt `[lead-architect]` persona** để xác định phạm vi và dependencies.
3.  **CHỜ** user xác nhận phạm vi.

## Bước 4a: Lập Kế hoạch Cấp Cao (High-Level Plan)

// turbo

1.  **Adopt `[lead-architect]` persona** để chia nhỏ lộ trình & chiến lược.
2.  Tạo artifact `high_level_plan.md` với kiến trúc và phân pha.
3.  **Action**: Gọi tool `notify_user(BlockedOnUser: true)` để user review và thông qua.

## Bước 4b: Lập Kế hoạch Chi tiết (Low-Level Plan)

// turbo

1.  Dựa trên High-Level Plan, tạo artifact `implementation_plan.md` chi tiết từng hàm, DB, API.
2.  **Action**: Gọi tool `notify_user(BlockedOnUser: true)` để user review.

## Bước 5: Khởi tạo Branch

// turbo

1.  Sử dụng workflow `/git-branch` để tạo branch tính năng mới (`feature/...`).

## Bước 6: Implement Backend

// turbo

1.  **Adopt `[backend-developer]` persona**: Data models, API endpoints, Unit tests (TDD).
2.  Chạy test và verify. Sử dụng `/git-commit` sau khi hoàn thành.
3.  **Action**: Gọi tool `notify_user(BlockedOnUser: true)` để user review.

## Bước 7: Implement Frontend

// turbo

1.  **Adopt `[frontend-developer]` persona**: Components, State management, Component tests.
2.  Sử dụng `/git-commit` sau khi hoàn thành.
3.  **Action**: Gọi tool `notify_user(BlockedOnUser: true)` để user review.

## Bước 8: Integration & QA

// turbo

1.  **Adopt `[qa-tester]` persona**: E2E test, Verify Acceptance Criteria, Test Edge case.
2.  Tạo artifact `qa-report.md`.
3.  **CHỜ** user xác nhận sẵn sàng.

## Bước 9: Finalize

// turbo

1.  Cập nhật các file MOC, di chuyển task vào `docs/045-Tasks/Completed/`.
2.  Trình bày tóm tắt hoàn thành.
3.  Nhắc user sử dụng `/git-pr` để tạo Pull Request.

---

## Ví dụ Copy-Paste

```text
# Triển khai tính năng authentication
/implement-feature Triển khai module xác thực người dùng theo PRD-FarmTrace.md:
- Đăng ký, đăng nhập, quên mật khẩu
- JWT + refresh token
- Middleware bảo mật

# Triển khai dashboard analytics
/implement-feature Triển khai dashboard analytics theo docs/022-User-Stories/US-Dashboard.md
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `/brainstorm`**: `docs/020-Requirements/PRD-*.md` — PRD với User Stories.
- **Từ `/plan`**: `high_level_plan.md` + `implementation_plan.md` — Skip Bước 4a/4b nếu plan đã có.
- **Từ `/research`**: `docs/050-Research/*.md` — Kết quả nghiên cứu.

### Truyền Context (Output)
- **Cho `/git-pr`**: Commit history + `qa-report.md`.
- **Cho `/deploy`**: Code đã merge, sẵn sàng release.

### Fallback
- Nếu không tìm thấy PRD → Chạy Bước 2 (Đặc tả Nhanh) để tạo.
- Nếu không có User Stories → Gợi ý user chạy `/brainstorm` trước.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Bước 1: Research | Retry search 3x | N/A | Hỏi user cung cấp tài liệu |
| Bước 4a/4b: Plan| Sửa plan 3x | → Bước 1 (re-research) | Notify user |
| Bước 6: Backend | Fix compile 3x | → Bước 4a/4b (re-plan) | Notify user |
| Bước 7: Frontend | Fix build 3x | → Bước 4a/4b (re-plan) | Notify user |
| Bước 8: QA | Fix failed tests 3x | → Bước 6/7 (re-code) | Notify user |

---

## Giới hạn (Limitations)

- **Chạy nhiều phase review** — mỗi bước chờ user approve, tốn thời gian nếu user không online.
- **Không tự skip phase** — phải chờ approval ở mỗi blocking gate.
- **Yêu cầu docs/ đã có** — nếu chưa có PRD/User Stories, dùng `/brainstorm` trước.
- **Không hỗ trợ infrastructure** — CI/CD, Docker cần `/bootstrap` riêng.
- **MCP tools có thể không khả dụng** — fallback sang manual research nếu cần.

---

## Workflow liên quan

- `/cook` — Chạy nhanh end-to-end, ít review checkpoint.
- `/code` — Chỉ code theo plan.
- `/plan` — Chỉ tạo plan, không code.
- `/brainstorm` — Tạo PRD/Roadmap trước khi implement.
- `/git-branch` — Tạo branch ở Bước 5.
- `/git-pr` — Tạo PR ở Bước 9.
