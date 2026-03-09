---
description: Workflow debug khoa học - Giả thuyết, Đo đạc, Tái hiện, Phân tích, Fix.
type: procedure
risk: safe
source: self
required_skills: [qa-tester, backend-developer, frontend-developer]
inputs: ["Bug Report", "Logs"]
outputs: ["Proof of Fix", "Regression Test"]
context_from: []
context_to: ["/bug-fix", "/development", "/git-commit"]
context_artifacts:
  receives: []
  produces: ["debug-findings.md", "walkthrough.md"]
---

# Workflow Debug & Fix (`/debug`)

> [!IMPORTANT]
> **MỤC TIÊU**: Tuân thủ quy trình khoa học để tìm root cause với BẰNG CHỨNG trước khi fix.
> **Tuyệt đối không**: Fix mò (Shotgun debugging).

## Khi nào dùng (When to Use)

- Bug khó tái hiện hoặc chưa biết root cause.
- Lỗi bí ẩn: "nó hoạt động trên máy em mà!"
- Cần phân tích log/stack trace phức tạp.

## KHÔNG dùng khi (When NOT to Use)

- Bug đã biết root cause → Dùng `/bug-fix` (nhanh hơn).
- Bug production khẩn cấp → Dùng `/hotfix`.
- Lỗi build/lint → Dùng `/lint-format`.

## Điều kiện tiên quyết (Prerequisites)

- Có error message, stack trace, hoặc bug report cụ thể.
- Có khả năng reproduce bug (local hoặc test environment).
- Log truy cập khả dụng (console, server logs, CI logs).

---

## Best Practices

- **Luôn tạo giả thuyết TRƯỚC khi debug** — tránh "shotgun debugging".
- **Thêm log tạm có prefix `[DEBUG]`** để dễ cleanup sau.
- **Viết test case tái hiện bug** trước khi fix — đảm bảo bug không quay lại.
- **Chỉ thay đổi 1 biến tại 1 thời điểm** — debug isolate, không sửa nhiều cùng lúc.

---

## Các bước thực hiện

### Bước 1: Tạo Giả thuyết (Hypothesis)

1.  **Adopt `[qa-tester]` persona**: Liệt kê các nguyên nhân có thể.
    -   *Ví dụ*: "H1: FE gửi sai format date", "H2: DB chưa index", "H3: Logic validate ngược".
2.  Sắp xếp theo khả năng (Likelihood).

### Bước 2: Đo đạc & Tái hiện (Measure & Reproduce)

1.  Thêm log vào các điểm nghi vấn.
2.  Viết script/test case minimal để tái hiện.
3.  Chạy script, thu thập log.
4.  Log chứng minh giả thuyết → Bước 3. Không → Quay lại Bước 1.

### Bước 3: Triển khai Fix

// turbo

1.  **Code Fix**: Sửa dựa trên nguyên nhân đã tìm ra.
2.  **Cleanup**: Xóa log debug tạm.
3.  Chạy test case tái hiện + regression test → Phải Pass.

### Bước 4: Finalize

1.  **Adopt `[qa-tester]`**: Confirm fix.
2.  Commit: `fix(scope): ...`.

---

## Ví dụ Copy-Paste

```text
# Debug API intermittent failure
/debug API /api/orders intermittent 500 error.
Chỉ xảy ra khi concurrent requests > 10.
Log: "Connection pool exhausted".

# Debug UI rendering issue
/debug Component Dashboard không render data sau khi login.
Console: No errors. Network tab: 200 OK nhưng response empty.
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `{{args}}`**: Bug report, error message, stack trace.
- **Đây là workflow đầu chuỗi bug** — thường không nhận artifact từ workflow khác.

### Truyền Context (Output)
- **Cho `/bug-fix`**: Root cause đã xác định + bằng chứng.
- **Cho `/development`**: `debug-findings.md` nếu cần fix kèm thay đổi khác.
- **Cho `/git-commit`**: Fix code + regression test.

### Fallback
- Nếu không có error message rõ ràng → Hỏi user cung cấp log/steps to reproduce.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Bước 1: Hypothesis | Tạo giả thuyết mới | N/A (đầu chuỗi) | Hỏi user cung cấp thêm log |
| Bước 2: Reproduce | Thử approach khác 3x | → Bước 1 (new hypothesis) | Notify user |
| Bước 3: Fix | Fix & retry 3x | → Bước 1 (re-hypothesize) | Notify user |

---

## Giới hạn (Limitations)

- **Tốn thời gian** — debug khoa học kỹ lưỡng hơn fix mò.
- **Cần log truy cập** — nếu không có log, khó debug.
- **Không debug production trực tiếp** — cần reproduce locally.
- **Có thể cần nhiều iteration** (Bước 1 ↔ Bước 2) nếu giả thuyết đầu sai.

---

## Workflow liên quan

- `/bug-fix` — Fix nhanh bug đã biết root cause.
- `/hotfix` — Fix khẩn cấp production.
- `/development` — Fix + code mới.
