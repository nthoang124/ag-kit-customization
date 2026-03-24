# Integration Testing Insights & Patterns

## Core Philosophy

**"Verify the Handshake" (Xác minh cái bắt tay)**

Ngay cả khi mọi hàm tính toán đơn lẻ đều hoàn hảo, hệ thống vẫn có thể đổ vỡ khi chúng được ghép nối với nhau do các rủi ro về xung đột giao thức, lỗi định dạng dữ liệu truyền tải, hoặc nghẽn cổ chai giao tiếp.
Kiểm thử tích hợp nhắm trực tiếp vào ranh giới (interfaces) giữa các thành phần phần mềm để xác minh chúng hoạt động hài hòa như mong đợi.

## Hai Cấp Độ Tích Hợp (The Scope of Integration)

Cấp độ này được phân giải thành hai phương thức:

1.  **Tích hợp Thành phần (Component Integration Testing)**:
    - Thường do Developers thực hiện.
    - Đánh giá luồng giao tiếp nội bộ giữa các module liền kề (ví dụ: xác nhận module "giỏ hàng" chuyển đúng tổng giá tiền sang module "cổng thanh toán").
    - Có thể áp dụng phương pháp "Từ dưới lên" (Bottom-up), trong đó các module cấp thấp được kiểm tra và ghép nối trước, làm nền tảng dần lên các hệ thống quản trị cấp cao hơn (ví dụ: Service + Database hoặc Controller + Service).
2.  **Tích hợp Hệ thống (System Integration Testing)**:
    - Được quản lý bởi đội ngũ QA/Testers.
    - Đánh giá cách một hệ sinh thái (ecosystem) nội bộ kết nối với các hệ thống đồ sộ khác bên ngoài (ví dụ: Service + External API như cổng thanh toán quốc tế, dịch vụ gửi email).

## Testing Strategy

1.  **Real Database (Containerized)**: Use a real Postgres/MySQL container. Mocks can lie; databases don't.
2.  **Transactional Rollbacks**: If possible, wrap tests in transactions that rollback, or truncate tables between tests.
3.  **Seed Data**: Use factories (e.g., `UserFactory.create()`) to set up complex states quickly.

## Example (API + DB)

```typescript
describe("POST /api/register", () => {
  it("should persist user and return 201", () => {
    // Arrange
    const payload = { email: "test@example.com" };

    // Act
    const response = await api.post("/register", payload);

    // Assert (Response)
    expect(response.status).toBe(201);

    // Assert (Persistence)
    const dbUser = await db.users.find({ email: payload.email });
    expect(dbUser).not.toBeNull();
  });
});
```
