---
description: Convention chung cho Context Passing và Error Recovery giữa các workflows.
type: protocol
risk: none
---

# 📋 Workflow Protocol — Context Passing & Error Recovery

> [!NOTE]
> File này là **convention chuẩn** cho toàn bộ workflow system.
> Mỗi workflow PHẢI tuân thủ các quy tắc dưới đây.

---

## 1. Context Passing Protocol

### 1.1 Ba kênh truyền Context

| # | Kênh | Khi nào dùng | Format |
|:---:|:---|:---|:---|
| 1 | **`{{args}}` (Inline)** | Data nhỏ, mô tả ngắn gọn | Text trực tiếp trong lời gọi workflow |
| 2 | **Artifact File** | Data có cấu trúc, cần persist | `.md` file trong artifact dir hoặc `docs/` |
| 3 | **Frontmatter metadata** | Khai báo dependency giữa workflows | `context_from`, `context_to`, `context_artifacts` |

### 1.2 Frontmatter Fields

Mỗi workflow PHẢI khai báo trong frontmatter:

```yaml
---
# Fields hiện có (giữ nguyên)
inputs: ["..."]
outputs: ["..."]

# Fields mới — Context Protocol
context_from: ["/workflow-a"]        # Workflows cung cấp input cho tôi
context_to: ["/workflow-b"]          # Workflows nhận output từ tôi
context_artifacts:                   # Artifact trung gian
  receives: ["plan.md"]             # File tôi cần đọc
  produces: ["result.md"]           # File tôi tạo ra
---
```

### 1.3 Section `## Context Protocol` trong body

Mỗi workflow PHẢI có section sau:

```markdown
## Context Protocol

### Nhận Context (Input)
- **Từ `/workflow-trước`**: Mô tả artifact/data nhận được và cách sử dụng.
- **Từ `{{args}}`**: Mô tả inline input nếu không có artifact.

### Truyền Context (Output)  
- **Cho `/workflow-sau`**: Mô tả artifact/data truyền đi.

### Fallback
- Nếu không tìm thấy context → [hành động cụ thể: hỏi user / skip / dùng default].
```

### 1.4 Quy tắc Resolve Context

Thứ tự ưu tiên khi workflow cần input:

1. **Artifact file** tồn tại trên disk → Đọc trực tiếp
2. **`{{args}}`** có nội dung → Parse inline
3. **Hỏi user** → Fallback cuối cùng

### 1.5 Contract giữa Workflows trong Chains

Khi workflow A → workflow B trong chain:
- Output artifact của A **PHẢI match** `context_artifacts.receives` của B
- Nếu không match → Workflow B phải trigger Fallback (hỏi user)

---

## 2. Error Recovery Protocol

### 2.1 Ba cấp độ Recovery

| Cấp | Tên | Khi nào | Hành động | Ai quyết định |
|:---:|:---|:---|:---|:---|
| **1** | **Self-Heal** | Lỗi kỹ thuật đơn giản (compile, test fail, lint) | Đọc log → Sửa → Retry (max 3x) | Agent tự xử lý |
| **2** | **Rollback Step** | Approach sai hướng, logic lỗi nặng | Revert changes → Quay lại step trước | Agent tự quyết |
| **3** | **Escalate** | Self-heal fail 3x HOẶC quyết định ngoài scope | Notify user kèm: lỗi gì, đã thử gì, đề xuất gì | User quyết định |

### 2.2 Section `## Error Recovery` trong body

Mỗi workflow PHẢI có section sau:

```markdown
## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Step N: Tên | Retry 3x | → Step M | Notify user |
```

### 2.3 Quy tắc bắt buộc

1. **Self-Heal LUÔN thử trước** — không escalate ngay
2. **Max 3 retries** cho Self-Heal — sau đó chuyển cấp 2 hoặc 3
3. **Rollback PHẢI revert changes** — dùng `git checkout` hoặc undo manual
4. **Escalate PHẢI cung cấp context đầy đủ**:
   - Lỗi gì (error message / log)
   - Đã thử gì (các retry đã làm)
   - Đề xuất gì (2-3 options cho user)
5. **Không bao giờ silent fail** — mọi lỗi phải được log hoặc báo cáo

### 2.4 Recovery Flow

```
Lỗi xảy ra
│
├─ Lỗi kỹ thuật đơn giản?
│  └─ CÓ → Self-Heal (retry max 3x)
│         ├─ Pass → Tiếp tục step tiếp theo
│         └─ Fail 3x → Cấp 2 hoặc 3
│
├─ Approach sai hướng?
│  └─ CÓ → Rollback Step (quay lại step N theo Recovery Map)
│         └─ Thử lại approach khác
│
└─ Ngoài khả năng xử lý?
   └─ CÓ → Escalate (notify_user + context đầy đủ)
          └─ Chờ user chỉ định
```

---

## 3. Quick Reference — Context Flow cho các Chains phổ biến

### 🚀 Ship Feature Chain
```
/brainstorm ──[Roadmap.md, PRD.md]──→ /plan ──[implementation_plan.md]──→ /code ──[walkthrough.md]──→ /gen-tests ──[test-report.md]──→ /git-commit
```

### 🐛 Fix Bug Chain
```
/debug ──[debug-findings.md]──→ /bug-fix ──[walkthrough.md]──→ /gen-tests ──[test-report.md]──→ /git-commit
```

### 🔁 Refactor Chain
```
/gen-tests ──[test-report.md]──→ /refactor ──[walkthrough.md]──→ /git-commit
```

### 🔒 Hotfix Chain
```
/hotfix ──[hotfix-branch]──→ /git-commit ──[commit-hash]──→ /git-pr
```

---

## 4. Checklist cho workflow mới

Khi tạo workflow mới, đảm bảo:

- [ ] Frontmatter có `context_from`, `context_to`, `context_artifacts`
- [ ] Body có section `## Context Protocol` (Input/Output/Fallback)
- [ ] Body có section `## Error Recovery` (Recovery Map)
- [ ] Context artifacts khớp với workflows liên quan
- [ ] Đã cập nhật `_routing.md` nếu thêm workflow mới
