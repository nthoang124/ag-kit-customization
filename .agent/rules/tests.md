---
trigger: model_decision
description: Luôn chạy tests để đảm bảo không có regression khi thêm tính năng hoặc sửa lỗi
---

# Quy Tắc Kiểm Thử & Chống Regression

> [!IMPORTANT]
> **BẮT BUỘC** khi triển khai tính năng mới, sửa lỗi, hoặc refactor lớn. Đảm bảo ổn định hệ thống là ưu tiên hàng đầu.

## Quy Tắc Nghiêm Ngặt (PHẢI Tuân Thủ)

1. **PHẢI** chạy tests hiện có trước khi bắt đầu bất kỳ công việc nào để thiết lập baseline.
2. **PHẢI** chạy tests sau khi hoàn thành thay đổi để đảm bảo không gây regression.
3. **PHẢI** thêm tests mới cho mọi tính năng mới được triển khai.
4. **PHẢI** thêm reproduction tests cho mọi bug fix để đảm bảo bug không tái phát.
5. **PHẢI** báo cáo kết quả test (pass/fail) trong task summary và walkthrough.
6. **KHÔNG ĐƯỢC** finalize task nếu tests đang fail, trừ khi user chỉ đạo rõ ràng sau khi đã giải thích failure và tác động.

## Quy Trình Quyết Định

```
┌─────────────────────────────────────────────────────────────┐
│ KHI triển khai tính năng hoặc sửa lỗi:                      │
├─────────────────────────────────────────────────────────────┤
│ 1. Chạy baseline tests.                                     │
│    Có pass không?                                            │
│    KHÔNG → Thông báo user về failures hiện có trước khi tiếp.│
│    CÓ    → Tiếp tục.                                        │
├─────────────────────────────────────────────────────────────┤
│ 2. Triển khai thay đổi (Feature/Fix/Refactor).              │
├─────────────────────────────────────────────────────────────┤
│ 3. Thêm/Cập nhật tests cho code mới.                        │
├─────────────────────────────────────────────────────────────┤
│ 4. Chạy TẤT CẢ tests liên quan.                             │
│    Có pass không?                                            │
│    KHÔNG → Phân tích failures, sửa code/tests, lặp lại.     │
│    CÓ    → Tiếp tục.                                        │
├─────────────────────────────────────────────────────────────┤
│ 5. Ghi chép kết quả test trong Walkthrough/Task Summary.     │
└─────────────────────────────────────────────────────────────┘
```

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
