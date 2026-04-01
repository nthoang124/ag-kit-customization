---
description: Đánh giá bảo mật ứng dụng web theo OWASP và best practices.
type: procedure
risk: safe
source: self
required_skills:
  [
    Testing_Security/security-engineer,
    Development/backend-developer,
    Development/devops-engineer,
  ]
inputs: ["Codebase", "API Specs"]
outputs: ["Security Report", "Remediation Plan"]
context_from: ["/bất_kỳ"]
context_to: ["/bất_kỳ"]
context_artifacts:
  receives: ["task.md"]
  produces: []
---

# Quy trình Security Audit (`/security-audit`)

> [!WARNING]
> Workflow này chỉ phát hiện lỗ hổng — **KHÔNG thay thế penetration testing chuyên nghiệp**.

## Khi nào dùng (When to Use)

- Kiểm tra bảo mật trước release (pre-deploy security check).
- Sau khi thêm module auth, payment, hoặc xử lý dữ liệu nhạy cảm.
- Audit định kỳ (mỗi quý).
- Phát hiện suspicious activity trong logs.

## KHÔNG dùng khi (When NOT to Use)

- Cần pentest thực sự → Thuê security firm chuyên nghiệp.
- Review code chung → Dùng `/code-review`.
- Audit toàn bộ dự án (không chỉ security) → Dùng `/project-review`.

## Điều kiện tiên quyết (Prerequisites)

- Có quyền truy cập source code và config files.
- `.env.example` tồn tại (để verify env vars).
- Có API specs hoặc danh sách endpoints.

---

## Các bước thực hiện

### Bước 1: Dependency Audit

// turbo

```bash
# Node.js
npm audit

# Python
pip-audit
```

Ghi lại: số lỗ Critical/High/Medium/Low.

### Bước 2: Secrets Scan

// turbo

1.  Kiểm tra `.gitignore` chứa: `.env`, `*.key`, `*.pem`, `credentials.json`.
2.  Search codebase cho hardcoded secrets:
    ```bash
    grep -rn "password\|secret\|api_key\|private_key" src/ --include="*.ts" --include="*.js"
    ```
3.  Verify `.env.example` KHÔNG chứa giá trị thật.

### Bước 3: Authentication & Authorization Review

1.  **Auth Flow**: JWT expiry hợp lý? Refresh token rotate? CSRF protection?
2.  **Authorization**: RBAC/ABAC đúng? API endpoints có middleware guard?
3.  **Password**: Bcrypt/Argon2? Min length >= 8?

### Bước 4: Input Validation & Injection

1.  **SQLi**: Dùng parameterized queries? ORM escape?
2.  **XSS**: Input sanitized? Output encoded?
3.  **File Upload**: Validate type/size? Không execute uploaded files?
4.  **Rate Limiting**: API có rate limit?

### Bước 5: Infrastructure & Config

1.  **CORS**: Allowlist cụ thể (không `*`)?
2.  **HTTPS**: Enforced?
3.  **Headers**: Helmet.js hoặc security headers cấu hình?
4.  **Docker**: Base image official? Non-root user?

### Bước 6: Reporting

1.  Tạo report: `docs/035-QA/Reports/SecurityAudit-{Date}.md`.
2.  **Phân loại**: `[CRITICAL]`, `[HIGH]`, `[MEDIUM]`, `[LOW]`, `[INFO]`.
3.  Mỗi finding: Description, Impact, Remediation, Evidence.

---

## Ví dụ Copy-Paste

```text
# Security audit trước release
/security-audit Audit bảo mật FarmTrace v2.0 trước khi deploy production.
Focus: auth module, payment API, file upload.

# Security audit cho module cụ thể
/security-audit Kiểm tra bảo mật module auth:
JWT implementation, password hashing, session management.
```

---

## Giới hạn (Limitations)

- **Chỉ static analysis** — không chạy dynamic testing hoặc fuzzing.
- **Không thay thế pentest** — chỉ phát hiện lỗ hổng phổ biến (OWASP Top 10).
- **Phụ thuộc codebase access** — không audit được third-party services.
- **Không test social engineering** — chỉ technical vulnerabilities.
- **npm audit có false positives** — cần verify manually.

---

## Workflow liên quan

- `/project-review` — Audit toàn diện (bao gồm security nhẹ).
- `/deploy` — Deploy sau khi pass security audit.
- `/development` — Fix vulnerabilities phát hiện.

---

## Context Protocol

### Nhận Context (Input)
- **Từ `{{args}}`**: Các tham số inline truyền vào từ lệnh gọi.
- **Từ filesystem (`context_artifacts.receives`)**: Đọc file `task.md` hiện hành để nắm bắt state trước khi chạy.

### Truyền Context (Output)  
- **Cho workflow tiếp theo (`context_artifacts.produces`)**: Không bắt buộc sinh file artifact cấp cao trừ khi workflow ghi rõ. Thay đổi chủ yếu ở cấu trúc dự án.

### Fallback
- Nếu input rỗng hoặc không có context: Tự động xin ý kiến User hoặc quét Git Status hiện hành.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Lệnh CLI/Test fail hoặc Lỗi phân tích | Xem logs, sửa syntax/params và chạy lại (max 3 lần) | Khôi phục trạng thái Git ẩn hoặc undo file | Báo cáo chi tiết bug để User quyết định |
| Đứt gãy Context | Tự đọc lại log hệ thống | Không áp dụng | Hỏi User cấp lại Context |
