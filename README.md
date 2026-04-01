# 🚀 AG-Kit — Trợ lý Agent Toàn Diện (Agent Operating System)

> AG-Kit không đơn thuần là một file `.cursorrules`. Đây là một **Hệ điều hành vi mô (Micro OS)** — một bộ **Rules + Workflows + Skills** tiêu chuẩn giúp biến mọi hệ thống AI (Cursor, Windsurf, RooCode, Aider...) thành một kỹ sư phần mềm thực thụ. Copy thư mục `.agent/` vào cấu trúc dự án của bạn là dùng được lập tức.

## 🌟 Giá Trị Cốt Lõi

1. **Phân tách rõ ràng (Separation of Concerns)**: Không dồn nén mọi thứ vào một file Prompt/Rules khổng lồ. AG-Kit tách biệt độc lập Luật chung (`rules`), Chuyên môn (`skills`) và Chuỗi công việc (`workflows`).
2. **Chống Ảo giác (Anti-Hallucination)**: Hơn 38+ Workflow đóng vai trò như các "đường ray" tiêu chuẩn, ép AI đi theo đúng quy trình phát triển chuyên nghiệp thay vì tự phỏng đoán (ví dụ: bắt buộc lập plan, bắt buộc sinh test, báo cáo rõ ràng).
3. **Độc lập Nền tảng (Portable & Tool-Agnostic)**: Hoạt động trơn tru trên mọi IDE hoặc CLI (Cursor, Cline/RooCode, Aider, OpenHands) hỗ trợ tính năng đọc thẻ Context thông qua chuẩn thư mục `.agent/`.

---

## Cách sử dụng

### Cách 1: Nói tự nhiên (Khuyên dùng)

Agent tự tra `_routing.md` để chọn workflow phù hợp:

```
"Tôi muốn thêm tính năng đăng nhập Google"  → /cook
"Sửa lỗi API trả về 500"                    → /debug
"Production bị crash"                         → /hotfix
```

### Cách 2: Gọi trực tiếp Workflow

```
/cook     Thêm tính năng thanh toán VNPAY
/plan     Thiết kế kiến trúc module báo cáo
/debug    Tại sao hàm checkout trả về null?
/ask      Module auth xử lý JWT refresh thế nào?
```

---

## Luồng làm việc phổ biến

Dưới đây là các luồng phối hợp workflow được khuyến nghị cho từng kịch bản cụ thể:

**1. Khởi tạo Dự Án Mới (Full Lifecycle)**
`/phase1-planning` → `/phase2-requirements` → `/phase3-design` → `/bootstrap` → `/implement-feature`

**2. Phát triển Tính Năng / Epic Lớn**
`/plan` → `/plan-detail` → `/git-branch` → `/implement-feature` (hoặc `/cook`) → `/qa` → `/git-commit` → `/git-pr`

**3. Ship Nhanh Tính Năng (Agile)**
`/brainstorm` → `/code` (hoặc `/cook`) → `/gen-tests` → `/git-commit` → `/git-pr`

**4. Sửa Lỗi (Bug Fix & Hotfix)**

- **Bug Fix**: `/debug` → `/bug-fix` → `/gen-tests` → `/git-commit` → `/git-pr`
- **Hotfix (Production)**: `/hotfix` → `/git-commit` → `/git-pr` (vào main) → `/git-sync` (từ main về dev)

**5. Tối ưu & Dọn dẹp Code (Tech Debt)**
`/ask` (Đánh giá impact) → `/refactor` → `/gen-tests` → `/lint-format` → `/git-commit`

**6. Release & Giao Hàng**
`/code-review` → `/security-audit` → `/performance-audit` → `/deploy`

---

## 💡 Đề xuất & Best Practices Sử Dụng AG-Kit Hiệu Quả

Để AI thực sự biến thành "đồng đội", hãy tuân thủ các nguyên tắc sau:

1. **Cung cấp đủ Context (Ngữ Cảnh):** Trước khi yêu cầu Agent làm việc, hãy mở sẵn các file liên quan (như file kiến trúc, file code cần sửa, file docs). Điều này giúp Agent nắm bắt ngữ cảnh dự án nhanh chóng mà không cần tốn nhiều step để tìm kiếm.
2. **Lập Kế Hoạch & Chia Nhỏ (Micro-Tasking):** Tuyệt đối không giao cho Agent một task khổng lồ (ví dụ: "Code hoàn chỉnh app A"). Hãy tiếp cận qua các bước:
   - Sử dụng phần mềm tư duy: Chạy `/brainstorm` để tạo PRD và Roadmap sơ bộ.
   - Giai đoạn Thiết Kế: Hãy chạy `/plan` để lên bản thiết kế phần mềm ở cấp độ tổng thể (High-Level và Low-Level Design).
   - Giai đoạn Chi Tiết: Chạy `/plan-detail` nếu logic quá phức tạp, Agent sẽ tự động đi sâu vào mức Unit (class, function, schema) và chốt lại bản LLD chặt chẽ nhất.
   - Giai đoạn Coded: Sau khi có Plan rõ ràng, hãy dùng nhánh workflow `/code` (chỉ code) hoặc `/cook` (triển khai end-to-end từng tính năng một).
3. **Dùng đúng Workflow chuyên biệt:** Thay vì prompt chung chung, hãy gọi đúng command (ví dụ: `/debug` khi sửa lỗi, hoặc `/refactor` khi tái cấu trúc code). Mỗi workflow đã được tinh chỉnh prompt chuyên sâu cho từng nhiệm vụ.
4. **Kiểm soát & Review:** Bất kỳ thay đổi do AI tạo ra đều cần con người phê duyệt. Hãy dùng workflow `/code-review` để review các thay đổi mới trước khi tạo Pull Request, và đừng bao giờ bỏ qua bước chạy test tự động.
5. **Chủ động phát triển Agent:** Framework (AG-Kit) được thiết kế mở. Nếu dự án có coding convention riêng, hoặc một quy trình lặp đi lặp lại, hãy gọi `/custom-behavior` để dạy Agent quy tắc đó, giúp đồng bộ tiêu chuẩn cho mọi thành viên.

---

## Danh sách Workflow

### 💬 Hỏi & Nghiên cứu

| Workflow                                                       | Mô tả                                 |
| :------------------------------------------------------------- | :------------------------------------ |
| [`/ask`](./agent/workflows/analysis/ask.md)                    | Hỏi đáp về code/kiến trúc (read-only) |
| [`/research`](./.agent/workflows/analysis/research.md)         | Nghiên cứu chuyên sâu với báo cáo     |
| [`/brainstorm`](./.agent/workflows/analysis/brainstorm.md)     | Brainstorm ý tưởng → PRD + Roadmap    |
| [`/plan`](./.agent/workflows/analysis/plan.md)                 | Lên kế hoạch kỹ thuật (không code)    |
| [`/ui-ux-design`](./.agent/workflows/analysis/ui-ux-design.md) | Thiết kế UI/UX                        |

### 💻 Phát triển

| Workflow                                                               | Mô tả                                        |
| :--------------------------------------------------------------------- | :------------------------------------------- |
| [`/cook`](./.agent/workflows/coding/cook.md)                           | ⚡ End-to-end: research → plan → code → test |
| [`/code`](./.agent/workflows/coding/code.md)                           | ⚡ Code theo plan có sẵn                     |
| [`/development`](./.agent/workflows/coding/development.md)             | Task nhỏ (1-3 file), fix nhanh               |
| [`/implement-feature`](./.agent/workflows/coding/implement-feature.md) | Feature phức tạp, review từng phase          |
| [`/bootstrap`](./.agent/workflows/coding/bootstrap.md)                 | Setup dự án mới từ đầu                       |
| [`/refactor`](./.agent/workflows/coding/refactor.md)                   | Dọn dẹp code, không đổi behavior             |

### 🐛 Debug & Fix

| Workflow                                              | Mô tả                                         |
| :---------------------------------------------------- | :-------------------------------------------- |
| [`/debug`](./.agent/workflows/debugging/debug.md)     | Debug khoa học: giả thuyết → chứng minh → fix |
| [`/bug-fix`](./.agent/workflows/debugging/bug-fix.md) | Fix bug đã biết root cause                    |
| [`/hotfix`](./.agent/workflows/debugging/hotfix.md)   | Fix khẩn cấp production                       |

### 🧪 Testing & QA

| Workflow                                                                | Mô tả                          |
| :---------------------------------------------------------------------- | :----------------------------- |
| [`/gen-tests`](./.agent/workflows/testing/gen-tests.md)                 | Sinh test tự động (unit/E2E)   |
| [`/qa`](./.agent/workflows/testing/qa.md)                               | Tạo test plan/cases (tài liệu) |
| [`/integration-test`](./.agent/workflows/testing/integration-test.md)   | Test tích hợp cross-service    |
| [`/code-review`](./.agent/workflows/testing/code-review.md)             | Review code/diff               |
| [`/security-audit`](./.agent/workflows/testing/security-audit.md)       | Audit bảo mật OWASP            |
| [`/performance-audit`](./.agent/workflows/testing/performance-audit.md) | Audit hiệu năng                |
| [`/lint-format`](./.agent/workflows/testing/lint-format.md)             | Lint & format code             |

### 🔀 Git & Deploy

| Workflow                                                     | Mô tả                                          |
| :----------------------------------------------------------- | :--------------------------------------------- |
| [`/git-branch`](./.agent/workflows/git-deploy/git-branch.md) | Tạo branch                                     |
| [`/git-commit`](./.agent/workflows/git-deploy/git-commit.md) | Commit chuẩn Conventional Commits (tiếng Việt) |
| [`/git-sync`](./.agent/workflows/git-deploy/git-sync.md)     | Sync code từ dev (fetch & rebase)              |
| [`/git-merge`](./.agent/workflows/git-deploy/git-merge.md)   | Merge trực tiếp (solo/gấp)                     |
| [`/git-pr`](./.agent/workflows/git-deploy/git-pr.md)         | Tạo Pull Request                               |
| [`/deploy`](./.agent/workflows/git-deploy/deploy.md)         | Deploy staging/production                      |

### ⚙️ Quản lý Agent

| Workflow                                                               | Mô tả                             |
| :--------------------------------------------------------------------- | :-------------------------------- |
| [`/custom-behavior`](./.agent/workflows/management/custom-behavior.md) | Thêm/sửa rule hoặc workflow       |
| [`/prompt`](./.agent/workflows/meta/prompt.md)                         | Tổng hợp skills → enhanced prompt |

---

## Cấu trúc thư mục

```
.agent/
├── rules/          # 14 quy tắc (security, verification, git, clean-code...)
├── workflows/      # 38 workflows phân theo nhóm
│   ├── meta/       # Router + Protocol
│   ├── analysis/   # Hỏi, nghiên cứu, lên plan
│   ├── coding/     # Code, cook, refactor
│   ├── debugging/  # Debug, bug-fix, hotfix
│   ├── testing/    # Tests, review, audit
│   ├── git-deploy/ # Git operations, deploy
│   ├── macro/      # Chuỗi workflow tự động
│   └── management/ # Quản lý agent
├── skills/         # Kho kỹ năng được phân loại logic
│   ├── Architecture/    # lead-architect, solution-architect...
│   ├── Data_AI/         # prompt-orchestrator, ai-engineer...
│   ├── Development/     # backend-developer, frontend-developer...
│   ├── Business/        # product-manager, designer...
│   ├── Testing_Security/# qa-tester, security-engineer...
│   ├── Workflows_Tools/ # automation, skill-creator...
│   ├── agent/           # agent framework skills
│   └── analyze/         # project analytics
└── scripts/        # build-catalog.js, lint-agent.js
```

---

## Tùy chỉnh

### Thêm Rule mới

Tạo file `.agent/rules/<tên-rule>.md` với frontmatter:

```yaml
---
description: Mô tả ngắn
type: mandatory | conditional
trigger: glob | model_decision
risk: low | medium | high | critical
---
```

### Thêm Workflow mới

Tạo file `.agent/workflows/<nhóm>/<tên>.md` với frontmatter:

```yaml
---
description: Mô tả workflow
---
# Các bước thực hiện...
```

Sau đó chạy `/custom-behavior` để agent tự cập nhật routing.

---

## Nguyên tắc thiết kế

1. **Convention over Configuration** — Tuân thủ protocol chung, giảm quyết định ad-hoc
2. **Fail Safe** — Mọi workflow có Error Recovery Map; không fail im lặng
3. **Context First** — Luôn kiểm tra context có sẵn trước khi hỏi user
4. **Tiếng Việt First** — Mọi giao tiếp bằng tiếng Việt, code/technical terms giữ nguyên

---

> **Version**: 4.0.0 | **Last Updated**: 2026-03-22
