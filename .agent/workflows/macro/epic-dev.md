---
description: Phát triển tính năng lớn đầu cuối (Brainstorm -> Plan -> Break Tasks -> Subagent Development).
type: macro
risk: critical
source: self
inputs: ["Sáng kiến/Ý tưởng tính năng lớn"]
outputs: ["Hệ thống Module hoàn chỉnh"]
context_to: ["/code-review", "/qa"]
---

# 👑 Macro Workflow: Epic Development (`/epic-dev`)

> [!IMPORTANT]
> Workflow này dùng cho các tính năng quy mô lớn, cần phối hợp nhiều giai đoạn và có thể sử dụng Subagents để song song hóa việc triển khai.

## Trình tự Logic (Chain)

1. **Phase 1: Concept** ──→ `/brainstorm` (Tạo PRD/SDD)
2. **Phase 2: Strategy** ──→ `/plan` (High-level & Low-level)
3. **Phase 3: Decomposition** ──→ `/break-tasks` (Tạo `task.md`)
4. **Phase 4: Execution** ──→ `/subagent-development` hoặc chuỗi `/cook` liên hoàn.
5. **Phase 5: Quality Gate** ──→ `/release` (Chuyển sang macro release)

---

## Context Protocol

### Nhận Context (Input)
- **Từ `{{args}}`**: Mô tả vĩ mô về Epic.

### Truyền Context (Output)  
- **Cho các bước sau**: `task.md` chứa danh sách toàn bộ các task con.

---

## Error Recovery

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Lên plan sai | Sửa plan | Quay lại brainstorm | Hỏi user |
| Triển khai fail | Debug cục bộ | Reset branch | Báo cáo sự cố (Incident) |
