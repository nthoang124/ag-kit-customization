---
trigger: glob
globs: "**/*.{ts,tsx,js,jsx,py,go,java,rb,c,cpp,h,hpp,rs,css,html}"
---

# Chuẩn Clean Code

Bạn PHẢI tuân thủ các nguyên tắc clean code dưới đây khi tạo hoặc chỉnh sửa code.

## Nguyên Tắc Cốt Lõi

- **SOLID**: Tuân thủ Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, và Dependency Inversion.
- **DRY (Don't Repeat Yourself)**: Trích xuất logic chung thành functions hoặc constants.
- **KISS (Keep It Simple, Stupid)**: Tránh over-engineering. Code phải dễ hiểu.
- **YAGNI (You Aren't Gonna Need It)**: Không implement tính năng hoặc abstraction "phòng khi cần".

## Quy Tắc Liên Quan

- **Giao tiếp**: Xem `.agent/rules/communication.md` cho quy tắc ngôn ngữ (bắt buộc tiếng Việt).
- **Git Workflow**: Xem `.agent/rules/git-conventions.md` cho chuẩn branching và commit.

## Quy Ước Đặt Tên

- Biến và hàm phải mô tả rõ ràng (VD: `isUserLoggedIn` thay vì `flag`).
- Dùng casing phù hợp với ngôn ngữ (VD: camelCase cho JS/TS, snake_case cho Python).
- Biến boolean phải bắt đầu bằng `is`, `has`, `should`, hoặc `can`.

## Functions

- Functions nên thực hiện **một việc duy nhất** và làm tốt việc đó.
- Giữ functions ngắn gọn. Nếu quá dài, chia nhỏ.
- Giới hạn số lượng tham số (lý tưởng: 3 hoặc ít hơn).

## Comments

- Comments nên giải thích "tại sao" chứ không phải "cái gì" (trừ khi logic phức tạp/khó hiểu).
- Xóa code đã comment-out.

## Xử Lý Lỗi

- Xử lý lỗi phải nhận biết context. Không được nuốt lỗi im lặng.
- Dùng error types cụ thể khi có thể.

## Testing

- Viết code dễ test. Tránh global state và side effects khi có thể.

## Giới Hạn Độ Dài File

Giữ file ngắn gọn và tập trung. Nếu file vượt giới hạn, cân nhắc chia nhỏ:

| Loại file | Tối đa (dòng) | Ghi chú |
|:---|:---:|:---|
| Components (`.tsx`, `.jsx`) | 200-300 | Chia thành components nhỏ hơn hoặc extract hooks |
| Utility/Helper | 150-200 | Nhóm theo domain, chia nhỏ |
| API Routes/Handlers | 100-150 | Extract business logic vào services |
| Test files | 300-400 | Nhóm theo feature, dùng describe blocks |
| Styles (`.css`) | 200-300 | Dùng CSS modules hoặc chia theo component |
| Config files | 100 | Giữ tối thiểu, dùng config files riêng |

**Khi nào nên chia file:**

- Khi file có nhiều trách nhiệm (vi phạm SRP)
- Khi cuộn code khó theo dõi logic
- Khi phần imports quá dài (> 15 imports)
- Khi file có nhiều hàm lớn có thể độc lập

## Header Comment Bắt Buộc

Mỗi file mới PHẢI có header comment mô tả mục đích:

**Format cho TypeScript/JavaScript:**

```typescript
/**
 * @file [filename]
 * @description [Mô tả ngắn gọn nội dung và mục đích file]
 *
 * @example (tùy chọn — cho utilities/hooks)
 * // Ví dụ sử dụng
 */
```

**Format cho CSS:**

```css
/**
 * @file [filename]
 * @description [Mô tả ngắn gọn các styles]
 * 
 * Sections:
 * - [Liệt kê các sections chính nếu có]
 */
```

**Format cho Python:**

```python
"""
[filename]

[Mô tả ngắn gọn nội dung và mục đích module]

Example (tùy chọn):
    >>> usage_example()
"""
```

**Yêu cầu:**

- `@file`: Tên file (VD: `user.service.ts`)
- `@description`: 1-3 câu giải thích mục đích file
- Giữ headers ngắn gọn nhưng đầy đủ thông tin
- Cập nhật headers khi mục đích file thay đổi đáng kể
