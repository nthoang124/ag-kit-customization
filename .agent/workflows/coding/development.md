---
description: Workflow coding cơ bản để thực hiện thay đổi, sửa lỗi hoặc tính năng nhỏ.
type: procedure
risk: safe
source: self
required_skills: [Development/backend-developer, Development/frontend-developer]
inputs: ["Bug Report", "Small Task"]
outputs: ["Committed Code"]
context_from: ["/debug"]
context_to: ["/git-commit", "/git-pr"]
context_artifacts:
  receives: ["debug-findings.md"]
  produces: ["walkthrough.md", "committed code"]
---

# Quy trình Phát triển (`/development`)

> [!IMPORTANT]
> **BẮT BUỘC**: Luôn đọc `.agent/rules/documents.md` trước khi tạo hoặc sửa đổi tài liệu liên quan.

## Khi nào dùng (When to Use)

- Task nhỏ: sửa lỗi nhỏ, thay đổi logic 1-3 file, update config.
- Thay đổi không cần research chuyên sâu hoặc plan phức tạp.
- Fix nhanh bug đã biết nguyên nhân.

## KHÔNG dùng khi (When NOT to Use)

- Feature mới cần research → Dùng `/cook` hoặc `/implement-feature`.
- Bug production khẩn cấp → Dùng `/hotfix`.
- Cần debug sâu để tìm root cause → Dùng `/debug`.
- Task phức tạp cần plan → Dùng `/plan` trước.

---

## Các bước thực hiện

### Bước 1: Đồng bộ & Phân tích

// turbo

1.  **Sync Code**: Chạy workflow `/git-sync` để đảm bảo code mới nhất.
2.  Hiểu rõ yêu cầu hoặc báo cáo lỗi.

### Bước 2: Khởi tạo Branch

// turbo

1.  Sử dụng workflow `/git-branch` để tạo branch mới.
    -   Ví dụ: `fix/bug-login` hoặc `chore/update-deps`.

### Bước 3: Thực hiện Code

// turbo

1.  Thực hiện thay đổi code.
2.  **Backend/Frontend**: Cập nhật logic/UI.
3.  Đảm bảo tuân thủ Clean Code.

### Bước 4: Kiểm thử & Tự sửa (Fix-Loop)

// turbo

1.  Chạy test liên quan.
2.  **Self-Correction**:
    - Nếu Test Fail → **Đọc lỗi** → **Sửa code** → **Chạy lại**.
    - Lặp lại tối đa 3 lần. Nếu vẫn fail → Dừng và báo cáo User.
3.  Ghi lại bằng chứng vào `walkthrough.md`.

### Bước 5: Commit & Finalize

// turbo

1.  Sử dụng workflow `/git-commit` để commit code (Tiếng Việt).
2.  Cập nhật tài liệu liên quan (nếu có).
3.  Báo cáo tóm tắt các thay đổi và kết quả verification.

---

## Ví dụ Copy-Paste

```text
# Task nhỏ: sửa lỗi API timeout
/development Sửa lỗi API /api/users trả về 504 timeout khi record > 1000. 
Root cause: thiếu pagination.

# Task nhỏ: thêm env variable
/development Thêm env variable REDIS_URL vào config và update .env.example
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `/debug`**: `debug-findings.md` — Root cause đã xác định.
- **Từ `{{args}}`**: Mô tả task/bug trực tiếp (phổ biến nhất).

### Truyền Context (Output)
- **Cho `/git-commit`**: Files đã thay đổi + test results.
- **Cho `/git-pr`**: Commit summary.

### Fallback
- Nếu `{{args}}` mơ hồ → Hỏi user làm rõ yêu cầu.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Bước 3: Code | Fix compile/lint 3x | → Bước 1 (re-analyze) | Notify user |
| Bước 4: Test | Fix & retry 3x | → Bước 3 (re-code) | Notify user |

---

## Giới hạn (Limitations)

- **Chỉ phù hợp cho task 1-3 file** — nếu cần sửa > 5 file, dùng `/cook` hoặc `/implement-feature`.
- **Không có bước research** — nếu cần tìm hiểu trước, dùng `/research` riêng.
- **Max 3 retries** cho self-correction — nếu vẫn lỗi, dừng và hỏi user.
- **Không tự tạo test plan** — chỉ chạy test đã có. Nếu cần tạo test mới → `/gen-tests`.

---

## Workflow liên quan

- `/cook` — Cho task lớn hơn cần research + plan.
- `/code` — Cho task cần code theo plan có sẵn.
- `/debug` — Khi cần tìm root cause trước khi fix.
- `/bug-fix` — Workflow tối giản nhất cho bug đơn giản (ít bước hơn).
- `/git-branch` — Tạo branch ở Bước 2.
- `/git-commit` — Commit ở Bước 5.
