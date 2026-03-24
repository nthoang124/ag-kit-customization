# Unit Testing Insights & Patterns

## Core Philosophy

**"Cô lập & Chứng minh bằng Toán học/Logic" (Isolate & Prove mathematically/logically)**

Kiểm thử Đơn vị (Unit Testing) hay Kiểm thử Thành phần (Component Testing) là tuyến phòng thủ tầng thấp nhất nhưng mang lại hiệu quả chi phí (ROI) cao nhất trong việc diệt trừ khiếm khuyết.
Đơn vị (Unit) là cấu trúc mã nguồn nhỏ nhất có thể chạy độc lập, chẳng hạn như một hàm tính toán thuế, một phương thức gọi dữ liệu, hoặc một thủ tục cục bộ.

- **Mục tiêu cốt lõi**: Cô lập các thành phần và chứng minh bằng toán học/logic rằng các tính toán bên trong hệ thống không chứa rủi ro thuật toán. Việc phát hiện lỗi ngay tại lúc mã vừa được viết ra giúp cải thiện đáng kể tính ổn định trước khi đưa vào thư viện chung.
- **Người thực thi**: Do yêu cầu mức độ truy cập mã nguồn tuyệt đối, Kiểm thử Đơn vị được thực thi trực tiếp bởi các nhà phát triển (Developers) chứ không phải đội ngũ QA.
- **Test Behavior, Not Implementation**: Unit tests should verify _what_ the code does, not _how_ it does it. This makes refactoring safer.

## The AAA Pattern (Arrange, Act, Assert)

This is the gold standard for readability.

1.  **Arrange**: meticulous setup of inputs and mocks.
2.  **Act**: A single line of code triggering the function.
3.  **Assert**: Clear verification of the output.

## Dealing with Dependencies

**Mock Everything External**

- Database calls? Mock them.
- API requests? Mock them.
- File system? Mock it.
  If you touch the database, it's not a unit test (it's integration).

## Best Practices

1.  **Descriptive Naming**: `it('should return 400 if email is invalid')` is better than `it('test error')`.
2.  **One Concept Per Test**: Don't test validation and success in the same `it` block.
3.  **Boundary Value Analysis**: Always test `0`, `1`, `Max`, `Max+1`, `null`, `undefined`.

## Example (Vitest)

```typescript
import { describe, it, expect, vi } from "vitest";
import { calculateDiscount } from "./pricing.utils";

describe("Pricing Utils", () => {
  it("should apply 10% discount for VIP users", () => {
    // Arrange
    const user = { type: "VIP" };
    const price = 100;

    // Act
    const finalPrice = calculateDiscount(user, price);

    // Assert
    expect(finalPrice).toBe(90);
  });
});
```
