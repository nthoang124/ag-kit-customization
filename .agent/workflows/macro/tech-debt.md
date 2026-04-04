---
description: Dọn dẹp nợ kĩ thuật bằng cách bọc lưới test (Project Review -> Refactor -> Gen Tests -> Commit).
type: macro
risk: safe
source: self
inputs: ["Tín hiệu nợ kỹ thuật (lặp code, thiếu test)"]
outputs: ["Hệ thống đã refactor"]
context_to: ["/git-commit"]
---

# 👑 Macro Workflow: Technical Debt Cleanup (`/tech-debt`)

> [!IMPORTANT]
> Đây là quy trình phục vụ mục tiêu "Dọn dẹp nhà cửa" để mã nguồn luôn trong trạng thái tốt nhất.

## Trình tự Logic (Chain)

1. **Step 1: Audit** ──→ `/project-review` (Tìm nợ kỹ thuật)
2. **Step 2: Redundant Code** ──→ `/lint-format`
3. **Step 3: Stabilization** ──→ `/gen-tests` (Thêm test suite trước khi sửa)
4. **Step 4: Refactor** ──→ `/refactor`
5. **Step 5: Verifying** ──→ `/integration-test`
6. **Step 6: Committing** ──→ `/git-commit`

---

## Context Protocol

### Nhận Context (Input)
- **Từ `{{args}}`**: Module hoặc component cần dọn dẹp.

---

## Error Recovery

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Refactor gãy hệ thống | Fix nhanh (Self-Heal) | Revert Git | Notify Architecture Team |
| Missing test | Tự viết test bổ sung | Báo cáo lỗi | Cảnh báo nợ kỹ thuật tồn đọng |
