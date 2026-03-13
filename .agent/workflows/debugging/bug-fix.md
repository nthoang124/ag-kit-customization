---
description: Điều tra, tái hiện, sửa lỗi và đảm bảo không tái phát.
type: procedure
risk: safe
source: self
required_skills: [backend-developer, frontend-developer]
inputs: ["Bug Report", "Error Message"]
outputs: ["Fixed Code", "Regression Test"]
context_from: ["/debug"]
context_to: ["/git-commit", "/gen-tests"]
context_artifacts:
  receives: ["debug-findings.md"]
  produces: ["walkthrough.md", "committed code"]
---

# Workflow Sửa Lỗi (`/bug-fix`)

> [!NOTE]
> Workflow tối giản cho bug đã biết nguyên nhân. Nếu cần debug sâu, dùng `/debug`.

## Khi nào dùng (When to Use)

- Bug đã biết nguyên nhân, cần fix nhanh.
- Bug report rõ ràng: steps to reproduce, expected vs actual.
- Bug nhỏ không cần debug phức tạp (1-3 file).

## KHÔNG dùng khi (When NOT to Use)

- Chưa biết root cause → Dùng `/debug` trước.
- Bug production khẩn cấp → Dùng `/hotfix`.
- Cần fix + thêm feature → Dùng `/development`.

---

## Các bước thực hiện

### Bước 1: Tái hiện bug

1.  Đọc mô tả lỗi, xác định bước gây lỗi.
2.  Ghi lại log/error message.

### Bước 2: Phân tích nguyên nhân

1.  Xác định root cause.
2.  Đánh giá phạm vi ảnh hưởng.

### Bước 3: Fix

// turbo

1.  Sửa đúng nguyên nhân, **không workaround**.
2.  Không phá logic liên quan.

### Bước 4: Test lại

// turbo

1.  Test case lỗi cũ (phải pass).
2.  Test regression (đảm bảo không gây bug mới).

### Bước 5: Commit

1.  Commit message: `fix(scope): mô tả lỗi`.

---

## Ví dụ Copy-Paste

```text
# Fix API error
/bug-fix API /api/users/profile trả về 500 khi user chưa có avatar.
Error: Cannot read properties of null (reading 'url').
Root cause: thiếu null check cho avatar field.

# Fix UI bug
/bug-fix Nút "Submit" bị disabled sau lần submit đầu tiên.
Expected: reset state sau khi form submit thành công.
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `/debug`**: `debug-findings.md` — Root cause đã xác định.
- **Từ `{{args}}`**: Bug report trực tiếp nếu đã biết root cause.

### Truyền Context (Output)
- **Cho `/git-commit`**: Fix code + commit message.
- **Cho `/gen-tests`**: Test case tái hiện bug (để sinh thêm regression tests).

### Fallback
- Nếu chưa rõ root cause → Gợi ý user chạy `/debug` trước.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Bước 2: Phân tích | Re-analyze 3x | → Bước 1 (re-reproduce) | Gợi ý `/debug` |
| Bước 3: Fix | Fix & retry 3x | → Bước 2 (re-analyze) | Notify user |
| Bước 4: Test | Fix test 3x | → Bước 3 (re-fix) | Notify user |

---

## Giới hạn (Limitations)

- **Cần bug report rõ ràng** — nếu mơ hồ, dùng `/debug` trước.
- **Chỉ fix, không refactor** — fix xong rồi refactor riêng nếu cần.
- **Không tự tạo PR** — dùng `/git-pr` sau khi fix.
- **Không test E2E** — chỉ unit test/manual test.

---

## Workflow liên quan

- `/debug` — Nếu cần tìm root cause trước.
- `/hotfix` — Nếu là bug production khẩn cấp.
- `/development` — Nếu fix bug + thêm feature cùng lúc.
- `/git-commit` — Commit fix.
