---
description: Review nhanh các thay đổi trước khi merge (Diff Review).
type: procedure
risk: none
source: self
required_skills:
  [
    Architecture/lead-architect,
    Development/backend-developer,
    Development/frontend-developer,
  ]
inputs: ["Git Diff", "Branch Name", "PR"]
outputs: ["Review Comments", "Approval/Rejection"]
context_from: ["/bất_kỳ"]
context_to: ["/bất_kỳ"]
context_artifacts:
  receives: ["task.md"]
  produces: []
---

# Workflow Code Review (`/code-review`)

> [!IMPORTANT]
> **TIÊU CHÍ**: Clean Code, Security, Performance, và Tuân thủ Rules.

## Khi nào dùng (When to Use)

- Review code từ PR trước khi merge.
- Self-review code trước khi commit.
- Review code từ AI hoặc junior developer.

## KHÔNG dùng khi (When NOT to Use)

- Review toàn bộ dự án (architecture, docs, tests) → Dùng `/project-review`.
- Review tài liệu → Dùng `/review-docs`.
- Debug code → Dùng `/debug`.

---

## Các bước thực hiện

### Bước 1: Diff & Context Analysis

// turbo

1.  **Lấy Diff**:
    - Review local: `git diff dev...HEAD`.
    - Review file: `view_file`.
2.  **Adopt `[lead-architect]`**: Đánh giá cấu trúc, phát hiện Code Smell.

### Bước 2: Deep Dive (Logic & Security)

// turbo

1.  **Logic**: Kiểm tra nghiệp vụ, edge cases, null safety, error handling.
2.  **Security**: SQLi, XSS, lộ secrets, permission/auth check.
3.  **[XAI] Lộ trình Lập luận & Điểm Đóng góp (Reasoning & Attribution)**:
    - Nếu có Code Smell, Lỗi hoặc Lỗ hổng, **BẮT BUỘC** chỉ định cụ thể _dòng mã_ (File:Line) hoặc hàm làm phát sinh lỗi.
    - Cung cấp ngữ cảnh tại sao dòng code này có nguy cơ hỏng hóc hoặc vi phạm bảo mật.

### Bước 3: Report & Verdict

1.  **Phân loại Comments**: `[CRITICAL]`, `[MAJOR]`, `[MINOR]`, `[NITPICK]`.
2.  **Đề xuất**:
    - Reject: Nếu có lỗi Critical/Major.
    - Approve: Nếu chỉ có Minor/Nitpick.
3.  **Action**: Notify kết quả review cho user.

---

## Ví dụ Copy-Paste

```text
# Review PR
/code-review Review PR #42: feat/user-auth.
Focus: security (JWT implementation), performance (query optimization).

# Self-review
/code-review Review code hiện tại trên branch feat/dashboard
trước khi tạo PR.
```

---

## Giới hạn (Limitations)

- **Chỉ review code** — không review docs, tests, hoặc architecture.
- **Không sửa code** — chỉ đưa ra comments, user tự fix.
- **Phụ thuộc vào diff** — nếu diff quá lớn (> 500 dòng), review sẽ bị sơ sài.
- **Không thay thế human reviewer** — AI review bổ sung, không thay thế.

---

## Workflow liên quan

- `/project-review` — Review toàn diện dự án.
- `/review-docs` — Review tài liệu.
- `/git-pr` — Tạo PR sau khi code đã review.

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
