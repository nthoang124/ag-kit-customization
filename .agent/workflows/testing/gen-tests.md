---
description: Tạo Kiểm thử Đơn vị/Thành phần (Unit/Component), Kiểm thử Hệ thống (System/E2E), security, performance tests.
type: procedure
risk: safe
source: self
required_skills: [Testing_Security/qa-tester]
inputs: ["Source Code", "Docs"]
outputs: ["Test Plan", "Test Cases", "Test Code"]
context_from: ["/bất_kỳ"]
context_to: ["/bất_kỳ"]
context_artifacts:
  receives: ["task.md"]
  produces: ["test-report.md"]
---

# Workflow Sinh Test (`/gen-tests`)

> [!IMPORTANT]
> **BẮT BUỘC**: Test code phải chạy được (Green).
> Workflow này thay thế cả `/unit-test-generation` (đã gộp vào đây).

## Khi nào dùng (When to Use)

- Viết unit tests/component tests cho code mới hoặc code chưa có test.
- Tạo system tests/E2E tests cho user flow quan trọng giả lập môi trường Production.
- Bổ sung test coverage trước khi refactor.
- Cần test plan có cấu trúc cho QA.

## KHÔNG dùng khi (When NOT to Use)

- Chỉ cần chạy test đã có → Dùng `npm test` trực tiếp.
- Cần test plan nhưng không cần code → Dùng `/qa`.
- Code đang broken → Fix bug trước, viết test sau.
- Cần Integration Testing (Component hoặc System Integration) -> Dùng `/integration-test`.

---

## Các bước thực hiện

### Bước 1: Khám phá & Chiến lược

// turbo

1.  **Adopt `[qa-tester]` persona**: Phân tích codebase, xác định loại test cần sinh.
2.  Xác định file/tính năng cụ thể cần test.

### Bước 2: Kế hoạch Test & Sinh Test Case

// turbo

1.  Nhận diện edge cases, boundary conditions.
2.  Lưu vào `docs/035-QA/Test-Cases/TC-{Feature}-{NNN}.md`.
3.  Verify: test case bao phủ đủ Acceptance Criteria.

### Bước 3: Sinh Code Test

// turbo

1.  Sử dụng framework test hiện có (Jest/Vitest/Playwright).
2.  Tạo file test tương ứng (VD: `__tests__/auth.test.ts`).
3.  **QUAN TRỌNG**: Mock đầy đủ dependencies. Test unit KHÔNG phụ thuộc DB thật.

### Bước 4: Validation & Fix-Loop

// turbo

1.  **Auto-Run**:
    ```bash
    npm test path/to/new-test-file
    ```
2.  **Self-healing**: Fail → Đọc lỗi → Sửa → Chạy lại (max 3 lần).
3.  **Final Report**: Pass → Commit. Fail → Báo cáo user.

---

## Ví dụ Copy-Paste

```text
# Tạo unit tests cho auth module
/gen-tests Tạo unit tests cho src/services/auth.service.ts:
- Login (success, wrong password, locked account)
- Register (success, duplicate email, weak password)
- Token refresh (valid, expired, revoked)

# Tạo E2E tests
/gen-tests Tạo E2E tests cho user registration flow:
đăng ký → verify email → đăng nhập → xem profile.
```

---

## Giới hạn (Limitations)

- **Phụ thuộc framework test đã cài** — cần Jest/Vitest/Playwright sẵn trong project.
- **Mock không hoàn hảo** — một số external service khó mock chính xác.
- **Max 3 retries** — nếu test fail liên tục, cần human debugging.
- **Không tạo fixture/seed data phức tạp** — chỉ tạo mock đơn giản.
- **E2E test cần browser** — Playwright phải được cài/config.

---

## Workflow liên quan

- `/qa` — Tạo test plan chi tiết (không code).
- `/integration-test` — Test tích hợp giữa nhiều service.
- `/refactor` — Cần test trước khi refactor.

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
