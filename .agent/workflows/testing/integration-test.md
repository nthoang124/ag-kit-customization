---
description: Kiểm tra luồng tích hợp giữa nhiều module/service (Tích hợp Thành phần và Tích hợp Hệ thống).
type: procedure
risk: safe
source: self
required_skills: [Testing_Security/qa-tester, Development/backend-developer]
inputs: ["API Endpoints", "Service Topology", "Test Data"]
outputs: ["Integration Test Report", "Test Code"]
context_from: ["/bất_kỳ"]
context_to: ["/bất_kỳ"]
context_artifacts:
  receives: ["task.md"]
  produces: []
---

# Workflow Integration Test (`/integration-test`)

> [!NOTE]
> Kiểm tra sự phối hợp ranh giới giữa các module/service theo hai cấp độ: Tích hợp Thành phần (Component Integration - ví dụ Controller với Service) và Tích hợp Hệ thống (System Integration - nền tảng nội bộ với API bên ngoài).

## Khi nào dùng (When to Use)

- Kiểm tra luồng dữ liệu end-to-end: API → Service → DB.
- Sau khi thêm/sửa endpoint hoặc thay đổi schema DB.
- Kiểm tra tích hợp với service bên ngoài (payment, email, SMS).
- Trước khi release/deploy lên staging.

## KHÔNG dùng khi (When NOT to Use)

- Chỉ test 1 function/class → Dùng `/gen-tests` (unit test).
- Test UI/UX flow → Dùng E2E test trong `/gen-tests`.
- Chưa có test infrastructure → Setup `/bootstrap` trước.

---

## Các bước thực hiện

### Bước 1: Xác định Flow

// turbo

1.  Xác định các luồng cần test:
    - API → Service → DB (CRUD operations)
    - FE → BE → External API
    - Event → Queue → Handler

### Bước 2: Chuẩn bị dữ liệu test

// turbo

1.  Seed data cho database test.
2.  Mock service ngoài nếu cần (Stripe, SendGrid...).
3.  Setup test environment variables.

### Bước 3: Viết test

// turbo

1.  Test theo kịch bản người dùng (User Scenario).
2.  Test cả happy path và error path.
3.  Test timeout, retry, và circuit breaker (nếu có).

```typescript
// Ví dụ integration test
describe("User Registration Flow", () => {
  it("should create user, send email, and return JWT", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "Str0ng!Pass" });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();

    const user = await db.user.findByEmail("test@example.com");
    expect(user).toBeTruthy();
  });
});
```

### Bước 4: Chạy test

// turbo

```bash
npm run test:integration
```

### Bước 5: Báo cáo

1.  Ghi lại case fail nếu có.
2.  Tạo report: `docs/035-QA/Reports/IntegrationTest-{Date}.md`.

---

## Ví dụ Copy-Paste

```text
# Test luồng đăng ký
/integration-test Test flow: Register → Verify Email → Login → Get Profile.
Verify JWT tokens, DB records, và email service mock.

# Test payment flow
/integration-test Test flow: Tạo order → Thanh toán Stripe →
Update order status → Send confirmation email.
```

---

## Giới hạn (Limitations)

- **Cần test database** — không chạy được trên production DB, cần DB riêng.
- **External service phải mock** — test không gọi Stripe/SendGrid thật.
- **Chậm hơn unit test** — integration test thường mất 10-30s mỗi suite.
- **Không thay thế E2E test** — integration test focus vào backend, không test UI.
- **Environment-dependent** — nếu env khác prod, kết quả có thể sai lệch.

---

## Workflow liên quan

- `/gen-tests` — Tạo unit tests và E2E tests.
- `/qa` — Tạo test plan toàn diện.
- `/development` — Fix bug phát hiện từ integration test.

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
