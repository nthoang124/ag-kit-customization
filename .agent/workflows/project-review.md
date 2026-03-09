---
description: Audit toàn diện dự án định kỳ (Architecture, Tech Debt, Security, Tests, Docs).
type: procedure
risk: none
source: self
required_skills: [lead-architect, qa-tester, backend-developer, devops-engineer]
inputs: ["Codebase", "Docs", "CI Logs"]
outputs: ["Audit Report", "Refactoring Plan"]
---

# Workflow Audit Dự án (`/project-review`)

> [!NOTE]
> Nhìn **bức tranh toàn cảnh** (Holistic View): code, docs, tests, architecture, security.

## Khi nào dùng (When to Use)

- Audit kiến trúc định kỳ (mỗi quý hoặc trước release lớn).
- Đánh giá tech debt và lập kế hoạch refactor.
- Security audit cơ bản (npm audit, secrets check).
- Chuẩn bị release lớn cần review toàn diện.
- Onboarding reviewer mới vào dự án.

## KHÔNG dùng khi (When NOT to Use)

- Review code từ PR/diff cụ thể → Dùng `/code-review`.
- Review tài liệu → Dùng `/review-docs`.
- Cần pentest chuyên nghiệp → Dùng `/security-audit` hoặc outsource.

---

## Các bước thực hiện

### 1. Xác định Scope

1.  Hỏi user phần cần review (toàn bộ hay focus module cụ thể?).
2.  Thu thập artifacts: PR, docs, test plans, CI logs.

### 2. Architecture Audit

1.  **`[lead-architect]`**: Scan cấu trúc, dependencies, Design Patterns (SOLID, Clean Arch).
2.  Phát hiện Dead Code, module coupling quá cao.

### 3. Code Quality Review

1.  Coding standards, readability, maintainability.
2.  Logic & kiến trúc: Edge cases, duplicated code, anti-patterns.
3.  Test coverage: Unit + Integration tests đầy đủ?

### 4. Security & Dependencies

// turbo

1.  `npm audit`, review `.env.example`, `.gitignore`.
2.  Review CI/CD configs, Dockerfile.

### 5. Documentation Audit

1.  API docs khớp code? README setup guide đúng? `docs/` outdated?

### 6. Reporting

1.  **Phân loại findings**: `[CRITICAL]`, `[MAJOR]`, `[MINOR]`, `[NITPICK]`.
2.  Tạo Audit Report: `docs/035-QA/Reports/Audit-{Date}.md`.
3.  **Tổng kết**: What's good, risky, must change.
4.  **Đề xuất next steps**: Tasks list fix/improve.

---

## Ví dụ Copy-Paste

```text
# Full audit định kỳ
/project-review Audit Q1 2026 cho FarmTrace: 
architecture, tech debt, security, test coverage, docs.

# Audit trước release
/project-review Audit trước release v3.0:
focus security vulnerabilities, test coverage, và performance.

# Audit module cụ thể
/project-review Review module payment: security, edge cases, test coverage.
```

---

## Giới hạn (Limitations)

- **Rất tốn thời gian** — dự án lớn cần nhiều giờ review.
- **Không sửa code** — chỉ tạo report, user tự fix.
- **Không thay thế pentest chuyên nghiệp** — chỉ basic npm audit + secret scan.
- **Phụ thuộc CI/CD logs** — nếu không có CI, bỏ qua security automation.
- **Chỉ kiểm tra static** — không chạy dynamic analysis.

---

## Workflow liên quan

- `/code-review` — Review code cụ thể từ PR.
- `/review-docs` — Review tài liệu cụ thể.
- `/refactor` — Fix tech debt từ report.
- `/update-docs` — Cập nhật docs outdated.
- `/security-audit` — Security review chuyên sâu.
