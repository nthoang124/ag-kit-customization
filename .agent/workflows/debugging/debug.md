---
description: Workflow debug khoa học - Giả thuyết, Đo đạc, Tái hiện, Phân tích, Fix.
type: procedure
risk: safe
source: self
required_skills: [Testing_Security/qa-tester, Development/backend-developer, Development/frontend-developer]
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

## Các bước thực hiện (4-Phase Systematic Debugging)

> [!CAUTION]
> **THE IRON LAW**: KHÔNG ĐƯỢC PHÉP đề xuất biến đổi code (Fix) NẾU CHƯA hoàn thành Phase 1 (Root Cause Investigation). Sửa triệu chứng (Symptom fixes) là thất bại.

### Phase 1: Điều tra Nguyên Nhân Gốc rễ (Root Cause Investigation)

⚠️ **TRƯỚC KHI thử bất kỳ Fix nào:**

1. **Đọc kỹ Error Message**: Xem tất cả lỗi, cảnh báo, dòng báo lỗi. Đừng bỏ sót.
2. **Tái hiện ổn định (Reproduce Consistently)**: Phải tạo ra các bước tái hiện chắc chắn 100%. Nếu không tái hiện được, đừng đoán. Giả lập test-case nếu có thể.
3. **Trace Data Flow (Lập vết dữ liệu)**:
   - Thêm log tại các ranh giới (*boundary*) giữa các component.
   - Trace ngược (backward tracing) từ điểm vỡ lỗi lên nơi giá trị sai xuất phát.
4. **Kiểm tra Thay đổi Gần Đây (Recent Changes)**: Git diff, dependency, config mới.

### Phase 2: Phân Tích Mẫu (Pattern Analysis)

*Nếu bạn định áp dụng một pattern:*
1. **Working Examples**: Tìm đoạn code đang hoạt động tốt làm tham chiếu.
2. **So sánh**: So sánh tìm khác biệt giữa code đang chạy tốt và code bị vỡ lỗi (Dù là khác biệt nhỏ nhất).
3. **Dependencies**: Hiểu rõ các file/tài nguyên mà block code này đang phụ thuộc.

### Phase 3: Giả Thuyết & Kiểm Chứng (Hypothesis & Testing)

1. **Sinh 1 Giả thuyết duy nhất**: "Tôi nghĩ X là cause do Y."
2. **[XAI] Lộ trình Lập luận**: BẮT BUỘC trình bày chuỗi logic cụ thể ("Vì thấy log X ở hàm Y, cộng với việc diff Z mới được thêm vào, nên suy ra lỗi ở biến W").
3. **Test cục bộ/tối thiểu**: Đưa ra 1 thay đổi DUY NHẤT để test giả thuyết này.
4. **Verify**: Cải thiện trạng thái không? Nếu sai, quay lại sinh Giả thuyết mới. KHÔNG đắp thêm thay đổi lộn xộn (spaghetti patches).

### Phase 4: Triển Khai Fix (Implementation)

// turbo

1. **Tạo Failing Test Case**: Test (hoặc script) phải fail để chắc chắn bạn sửa đúng lỗi chứ không sửa nhầm test case không bắt được lỗi.
2. **[XAI] Điểm Đóng Góp (Attribution)**: Khai báo CHÍNH XÁC dòng/tệp (File:Line) đang định sửa và tại sao dòng đó lại là nguyên nhân gốc rễ.
3. **Code Fix**: Sửa 1 lỗi ứng với root cause đã tìm ra. Đảm bảo chạy pass (Green).
4. **Đánh giá lại Kiến trúc (Nếu Fix fail 3+ lần)**: Nếu qua 3 vòng fix vẫn lòi bug nhánh phụ: DỪNG LẠI. Phải thông báo cho User đánh giá hướng đi kiến trúc. Đừng cố đấm ăn xôi ở Fix lần 4.
5. **Cleanup & Commit**: Xóa log debug tạm. Commit message: `fix(scope): ...`.

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
