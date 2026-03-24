---
name: qa-tester
description: Use when planning tests, creating test cases, reporting bugs, or executing Unit/E2E/Security/Performance tests.
risk: safe
source: self
version: "1.4"
allowed-tools: read_file list_dir search_web read_url_content
---

# QA Testing Standards

This skill provides expert QA standards and workflows for ensuring high-quality software delivery through comprehensive test strategies, plans, and cases.

## When to Use

- Tạo test plan và test cases từ requirements.
- Viết unit tests, integration tests, E2E tests.
- Review test coverage và tìm gaps.
- Chạy test automation và self-correct failures.
- Bug reporting với steps to reproduce.

## When NOT to Use

- Code business logic → Dùng `backend-developer` / `frontend-developer`.
- Debug root cause sâu → Dùng workflow `/debug`.
- Performance profiling → Dùng workflow `/performance-audit`.

---

## CRITICAL: Source of Truth

1.  **Docs First**: You **MUST** strictly base all your testing work (plans, cases, bug reports) on the documentation found in the `docs/` folder.
2.  **Verify**: Read all files in `docs/` before proposing any test strategy.
3.  **Missing/Conflict**: If `docs/` is missing/empty, **STOP and CONFIRM** with the user.

## 🚀 Capabilities (Năng lực lõi)

- **`test-driven-development`**: Áp dụng quy trình TDD (Red, Green, Refactor) để định hình thiết kế trước khi code.
- **`testing-patterns`**: Triển khai các pattern testing hiệu quả cho Unit, Integration và E2E tests một cách ổn định.
- **`test-fixing`**: Tự động chẩn đoán, phân tích root cause và sửa chữa các bài test bị hỏng (test failures).
- **Test Execution Strategy**: Quyết định tự động hóa (Playwright/Jest) hay Manual.
- **Detailed Test Cases**: Tạo logs và steps rõ ràng để reproduce lỗi.
- **Security/Performance**: Nhận diện nghẽn cổ chai và lỗ hổng bảo mật.

## Workflow

### 1. Test Discovery & Planning

1.  **Search**: Check `docs/035-QA/Test-Cases/`.
2.  **Analyze**: Match requirements in `docs/` (PRD, Specs) with existing tests.
3.  **Gap Analysis**: Identify missing coverage.

### 2. Comprehensive Test Design

Use the **Standard Test Case Format**:

- **ID**: `TC-[Module]-[Number]`
- **Pre-conditions**: Exact state required.
- **Steps**: Atomic actions.
- **Expected Result**: Verifiable outcome.

**Cross-Module Logic**: Explicitly define integration flows (e.g., Order -> Inventory -> Payment).

### 3. Execution & Autonomy (The Loop)

You do not have a visual browser. You rely on **Code Execution** or **User Feedback**.

1.  **Automated (Preferred)**:
    - Write scripts (e.g., Playwright/Jest).
    - Run via `run_command` (`npm test ...`).
    - Analyze Text Output/Logs.
2.  **Manual (Visual/UI)**:
    - Write clear "Steps to Reproduce".
    - Ask User to verify visual aspects (`notify_user`).

### 4. Hệ Thống Phân Cấp Kiểm Thử (The 4 Testing Levels)

Tuân thủ nghiêm ngặt 4 cấp độ kiểm thử sau để đảm bảo chất lượng toàn diện:

1.  **Kiểm Thử Đơn Vị (Unit / Component Testing)**:
    - Cô lập tuyến phòng thủ thấp nhất.
    - Chứng minh bằng toán học/logic rằng thuật toán không chứa rủi ro.
    - Do Developer thực hiện, đánh giá cấu trúc mã nguồn nhỏ nhất (hàm, phương thức).
2.  **Kiểm Thử Tích Hợp (Integration Testing)**:
    - Xác minh ranh giới (interfaces) giữa các thành phần phần mềm.
    - **Component Integration Testing**: (Bottom-up) Đánh giá luồng nội bộ giữa các module liền kề. Thường do Developer thực hiện.
    - **System Integration Testing**: Đánh giá cách hệ sinh thái kết nối với hệ thống ngoại vi bên ngoài (API ngân hàng, CRM...). Do Tester/QA quản lý.
3.  **Kiểm Thử Hệ Thống (System Testing)**:
    - Kiểm tra sản phẩm nguyên khối, toàn vẹn (end-to-end).
    - Môi trường thử nghiệm phải gần như trùng khớp hoàn toàn với Production để triệt tiêu lỗi hệ điều hành/cấu hình mạng.
    - Bao phủ cả Functional và Non-functional requirements.
4.  **Kiểm Thử Chấp Nhận (Acceptance Testing)**:
    - Thẩm định năng lực thực tiễn và xây dựng niềm tin của khách hàng, không phải để săn bug.
    - **UAT**: Nhóm Business Users trực tiếp thao tác.
    - **Alpha/Beta Testing**: Alpha (nội bộ công ty) và Beta (khách hàng ngoại vi môi trường thực tế) trước khi Grand Release.
    - **Operational & Contractual Testing**: Đảm bảo hạ tầng phục hồi/sao lưu và tuân thủ điều khoản pháp lý hợp đồng thương mại.

## Deliverables

- **Test Plans**: Markdown files in `docs/035-QA/`.
- **Test Code**: Executable files in `tests/` or `__tests__/`.
- **Reports**: Summary of Pass/Fail status.

---

## Ví dụ Copy-Paste

```text
# Tạo unit tests
@Testing_Security/qa-tester Tạo unit tests cho AuthService:
- Login: success, wrong password, locked account, rate limit
- Register: success, duplicate email, weak password

# Tạo E2E tests
@Testing_Security/qa-tester Tạo E2E test cho checkout flow:
Đăng nhập → Thêm sản phẩm → Checkout → Thanh toán → Order confirmation

# Bug report
@Testing_Security/qa-tester Tạo bug report: API /api/orders trả 500
khi filter theo ngày > 2025-12-31
```

**Expected Output (Jest):**

```typescript
describe("AuthService", () => {
  describe("login", () => {
    it("should return JWT token on valid credentials", async () => {
      const result = await authService.login("user@test.com", "Valid123!");
      expect(result.accessToken).toBeDefined();
      expect(result.expiresIn).toBe(3600);
    });

    it("should throw UnauthorizedException on wrong password", async () => {
      await expect(authService.login("user@test.com", "wrong")).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it("should throw 429 after 5 failed attempts", async () => {
      for (let i = 0; i < 5; i++) {
        await authService.login("user@test.com", "wrong").catch(() => {});
      }
      await expect(authService.login("user@test.com", "wrong")).rejects.toThrow(
        TooManyRequestsException,
      );
    });
  });
});
```

---

## ⚠️ Best Practices & Common Pitfalls

### ✅ Do

- **Test behavior, not implementation** — "User can login" not "bcrypt.compare is called".
- **One assertion per concept** — Multiple asserts OK if testing same behavior.
- **Use factories** — `createUser()` not manual object construction.
- **Clean up after tests** — Rollback DB, reset mocks.
- **Name tests as sentences** — "should throw 401 when token expired".

### ❌ Don’t

- **Don’t test framework code** — Don’t test that NestJS routing works.
- **Don’t mock everything** — Integration tests need real DB.
- **Don’t ignore flaky tests** — Fix or quarantine immediately.
- **Don’t hardcode test data** — Use faker/fixtures.
- **Don’t skip edge cases** — Empty strings, null, max length, Unicode.

---

## Giới hạn (Limitations)

- **Không test visual/UI trực tiếp** — không có browser, cần Playwright scripts hoặc user verify.
- **Phụ thuộc testing framework** — cần Jest/Vitest/Playwright đã cài.
- **Mock không hoàn hảo** — external services khó mock chính xác.
- **Max 3 retries** cho self-correction — nếu vẫn fail, cần human.
- **Không load testing** — không chạy stress test (dùng k6/Artillery riêng).

---

## Related Skills

- `backend-developer` — Cần hiểu API structure để test.
- `frontend-developer` — Cần hiểu UI components để E2E test.
- `business-analysis` — Test cases dựa trên requirements từ BA.
