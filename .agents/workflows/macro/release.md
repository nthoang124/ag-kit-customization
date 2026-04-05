---
description: Hệ thống phòng thủ trước thềm Merge Code/Deploy (Lint -> Integration Test -> Security -> Code Review -> PR -> Deploy).
type: macro
risk: critical
source: self
inputs: ["Mã nguồn đã hoàn tất"]
outputs: ["Hệ thống đã deploy Staging/Production"]
context_from: ["/cook", "/bug-fix"]
context_to: ["/deploy"]
---

# 🛡️ Macro Workflow: Release Pre-flight (`/release`)

> [!IMPORTANT]
> Đây là chốt chặn cuối cùng đảm bảo code không gây lỗi phá vỡ hệ thống trước khi ra mắt.

## Trình tự Logic (Chain)

1. **Step 1: Code Integrity** ──→ `/lint-format`
2. **Step 2: Security Audit** ──→ `/security-audit`
3. **Step 3: Integration Test** ──→ `/integration-test`
4. **Step 4: Quality Review** ──→ `/code-review`
5. **Step 5: Pull Request** ──→ `/git-pr`
6. **Step 6: Deployment** ──→ (Sau khi user merge) ──→ `/deploy`

---

## Context Protocol

### Nhận Context (Input)
- **Từ `{{args}}`**: Target branch (main/dev/staging).

---

## Error Recovery

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Lỗi security | Fix code ngay | Revert commit | Notify Security Team |
| Lỗi testing | /debug và /bug-fix | Revert commit | Notify Dev Lead |
