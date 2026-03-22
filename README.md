# 🚀 AG-Kit — Agent Framework

> Bộ **Skills + Workflows + Rules** biến AI thành đồng đội phát triển phần mềm. Copy thư mục `.agent/` vào bất kỳ workspace nào là dùng được.

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

```
🚀 Ship Feature:  /brainstorm → /plan → /git-branch → /cook → /gen-tests → /git-commit → /git-pr
🐛 Fix Bug:       /debug → /bug-fix → /gen-tests → /git-commit → /git-pr
🔒 Hotfix:        /hotfix → /git-commit → /git-pr (main) → /git-merge (dev)
🛡️ Pre-Release:   /code-review → /security-audit → /performance-audit → /deploy
🧹 Tech Debt:     /refactor → /gen-tests → /lint-format → /git-commit
```

---

## Danh sách Workflow

### 💬 Hỏi & Nghiên cứu

| Workflow | Mô tả |
|:---|:---|
| [`/ask`](./agent/workflows/analysis/ask.md) | Hỏi đáp về code/kiến trúc (read-only) |
| [`/research`](./.agent/workflows/analysis/research.md) | Nghiên cứu chuyên sâu với báo cáo |
| [`/brainstorm`](./.agent/workflows/analysis/brainstorm.md) | Brainstorm ý tưởng → PRD + Roadmap |
| [`/plan`](./.agent/workflows/analysis/plan.md) | Lên kế hoạch kỹ thuật (không code) |
| [`/ui-ux-design`](./.agent/workflows/analysis/ui-ux-design.md) | Thiết kế UI/UX |

### 💻 Phát triển

| Workflow | Mô tả |
|:---|:---|
| [`/cook`](./.agent/workflows/coding/cook.md) | ⚡ End-to-end: research → plan → code → test |
| [`/code`](./.agent/workflows/coding/code.md) | ⚡ Code theo plan có sẵn |
| [`/development`](./.agent/workflows/coding/development.md) | Task nhỏ (1-3 file), fix nhanh |
| [`/implement-feature`](./.agent/workflows/coding/implement-feature.md) | Feature phức tạp, review từng phase |
| [`/bootstrap`](./.agent/workflows/coding/bootstrap.md) | Setup dự án mới từ đầu |
| [`/refactor`](./.agent/workflows/coding/refactor.md) | Dọn dẹp code, không đổi behavior |

### 🐛 Debug & Fix

| Workflow | Mô tả |
|:---|:---|
| [`/debug`](./.agent/workflows/debugging/debug.md) | Debug khoa học: giả thuyết → chứng minh → fix |
| [`/bug-fix`](./.agent/workflows/debugging/bug-fix.md) | Fix bug đã biết root cause |
| [`/hotfix`](./.agent/workflows/debugging/hotfix.md) | Fix khẩn cấp production |

### 🧪 Testing & QA

| Workflow | Mô tả |
|:---|:---|
| [`/gen-tests`](./.agent/workflows/testing/gen-tests.md) | Sinh test tự động (unit/E2E) |
| [`/qa`](./.agent/workflows/testing/qa.md) | Tạo test plan/cases (tài liệu) |
| [`/integration-test`](./.agent/workflows/testing/integration-test.md) | Test tích hợp cross-service |
| [`/code-review`](./.agent/workflows/testing/code-review.md) | Review code/diff |
| [`/security-audit`](./.agent/workflows/testing/security-audit.md) | Audit bảo mật OWASP |
| [`/performance-audit`](./.agent/workflows/testing/performance-audit.md) | Audit hiệu năng |
| [`/lint-format`](./.agent/workflows/testing/lint-format.md) | Lint & format code |

### 🔀 Git & Deploy

| Workflow | Mô tả |
|:---|:---|
| [`/git-branch`](./.agent/workflows/git-deploy/git-branch.md) | Tạo branch |
| [`/git-commit`](./.agent/workflows/git-deploy/git-commit.md) | Commit chuẩn Conventional Commits (tiếng Việt) |
| [`/git-sync`](./.agent/workflows/git-deploy/git-sync.md) | Sync code từ dev (fetch & rebase) |
| [`/git-merge`](./.agent/workflows/git-deploy/git-merge.md) | Merge trực tiếp (solo/gấp) |
| [`/git-pr`](./.agent/workflows/git-deploy/git-pr.md) | Tạo Pull Request |
| [`/deploy`](./.agent/workflows/git-deploy/deploy.md) | Deploy staging/production |

### ⚙️ Quản lý Agent

| Workflow | Mô tả |
|:---|:---|
| [`/custom-behavior`](./.agent/workflows/management/custom-behavior.md) | Thêm/sửa rule hoặc workflow |
| [`/prompt`](./.agent/workflows/meta/prompt.md) | Tổng hợp skills → enhanced prompt |

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
├── skills/         # 16 persona chuyên biệt
│   ├── backend-developer/
│   ├── frontend-developer/
│   ├── lead-architect/
│   ├── qa-tester/
│   ├── designer/
│   └── ...
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
