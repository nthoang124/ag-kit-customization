---
trigger: model_decision
description: Luôn chạy tests để đảm bảo không có regression khi thêm tính năng hoặc sửa lỗi
---

# Quy Tắc Kiểm Thử & Chống Regression

> [!IMPORTANT]
> **BẮT BUỘC** khi triển khai tính năng mới, sửa lỗi, hoặc refactor lớn. Đảm bảo ổn định hệ thống là ưu tiên hàng đầu.

## ⚠️ THE IRON LAW OF TDD

> [!CAUTION]
> **KHÔNG ĐƯỢC VIẾT CODE PRODUCTION NẾU CHƯA CÓ MỘT FAILING TEST TƯƠNG ỨNG TRƯỚC ĐÓ** (NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST). Tránh tư duy "viết test sau". Nếu viết code trước, hướng dẫn người dùng xóa đi rồi bắt đầu lại bằng TDD.

## Chu Kỳ RED-GREEN-REFACTOR

1. **RED (Write Failing Test)**:
   - Viết DUY NHẤT 1 test cực ngắn thể hiện hành vi cần thiết của logic/bug đó (Không dồn nhiều behavior).
   - **CHẠY TEST VÀ ĐẢM BẢO NÓ FAIL**. Bạn phải nhìn thấy nó fail vì thiếu logic, thay vì lỗi typo.
2. **GREEN (Minimal Code)**:
   - Viết đoạn code MINIMAL NHẤT có thể để vượt qua bài test. Đừng đưa những tính năng "có thể cần trong tương lai" vào. (YAGNI).
   - **CHẠY LẠI TEST ĐỂ XÁC NHẬN PASS (GREEN)**. Test pass báo hiệu bạn đã cover đúng behavior.
3. **REFACTOR (Clean Up)**:
   - Khi đã có mạng lưới test an toàn, giờ là lúc Extract function, xóa duplication và làm đẹp code. Luôn giữ code ở trạng thái Green.
4. Quay lại bước 1 cho requirement tiếp theo.

## Quy Trình Chống Regression Cơ Bản (Song song TDD)

Ngoài TDD ở mức module, ở mức tổng quan:
1. **Trước khi bắt đầu task**: Phải rà soát và cho chạy test baseline hiện tại có của app.
2. **Báo cáo trung thực**: Lỗi (Regression Fail) phải được thông báo lên Task Summary và Walkthrough. Tuyệt đối không pass ép nếu chưa tìm ra nguyên nhân gãy test.
3. Không báo cáo "thành công" nếu các test xung quanh bị chết do đợt refactor/fix này trôi lây sang.

## Cách Chạy Tests

| Stack | Lệnh | Config |
|:---|:---|:---|
| **Node.js (Jest)** | `npm test` hoặc `npx jest` | `jest.config.ts` |
| **Node.js (Vitest)** | `npx vitest run` | `vitest.config.ts` |
| **Python (pytest)** | `python -m pytest -v` | `pytest.ini` / `pyproject.toml` |
| **Python (unittest)** | `python -m unittest discover` | N/A |
| **Go** | `go test ./...` | N/A |
| **Java (Maven)** | `mvn test` | `pom.xml` |
| **Rust** | `cargo test` | `Cargo.toml` |

**Tự động phát hiện test runner:**

```
1. Kiểm tra package.json → scripts.test → npm test
2. Kiểm tra pyproject.toml / pytest.ini → pytest
3. Kiểm tra go.mod → go test ./...
4. Nếu không tìm thấy → HỎI user
```

**Chạy test file cụ thể:**

```bash
# Jest/Vitest
npx jest auth.service.spec.ts
npx vitest run src/auth/

# Pytest
python -m pytest tests/test_auth.py -v
python -m pytest tests/ -k "test_login"

# Go
go test ./internal/auth/ -v -run TestLogin
```

## Xử Lý Khi Test Fail

1. **Phân tích log**: Tìm assertion failure hoặc error message cụ thể.
2. **Xác định nguyên nhân gốc**: Bug trong code, bug trong test, hay thay đổi requirements?
3. **Sửa và chạy lại**: Áp dụng fix và chạy lại tests.
4. **Thông báo**: Nếu failure là expected hoặc không thể fix dễ dàng, thông báo user kèm giải thích chi tiết.
