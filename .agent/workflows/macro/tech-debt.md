---
description: Khởi động chiến dịch dọn cỏ toàn hệ thống (Sprint Technical Debt) không đổi tính năng (Macro-Workflow).
type: procedure
risk: safe
source: self
required_skills: [lead-architect, backend-developer, frontend-developer]
inputs: ["Source code", "Known bad practices"]
outputs: ["Clean Code", "Optimized Performance", "Refactored Components"]
context_from: []
context_to: ["/git-pr"]
context_artifacts:
  receives: []
  produces: ["walkthrough.md"]
---

# Macro-Workflow Dọn Nợ Kỹ Thuật Định Kỳ (`/tech-debt`)

> [!NOTE]
> Macro-Workflow chuyên xới tung những vùng mã nguồn tệ hại, có smell lạ, chưa được test đàng hoàng để giảm rủi ro bảo trì sau này, mà cực kì đảm bảo không làm gãy Logic Hệ Thống.

## Khi nào dùng (When to Use)

- Sau một chặng Epic dài với nhiều "Code bẩn" (Spaghetti Code) đi tắt đón đầu bị tạo ra.
- Khi rảnh rỗi và muốn tăng tốc độ bảo trì mã nguồn (Maintainability).

---

## Chuỗi Hành Động Liên Tiếp (Pipeline)

### Bước 1: Lên Danh Sách Đen (`/project-review`)

1. Quét tìm kiếm File quá 500 dòng, function quá phức tạp, logic bị lặp vô số nơi, thiếu abstraction.
2. Xuất một báo cáo (Audit) các vùng nguy hiểm nhất của codebase.

### Bước 2: Trấn Áp Bằng Test (`/gen-tests`)

1. Trước khi chạm vào logic yếu, hệ thống sẽ thả qa-tester vào các vùng đen này. 
2. Tác dụng: Căng một tấm lưới Test chạy song song bảo vệ hệ thống trước khi bắt tay làm sạch.

### Bước 3: Phẫu Thuật Mã Nguồn (`/refactor`)

1. Trích xuất thành các Pure Component nhỏ gọn (KISS/DRY). 
2. Đảm nhiệm Design Patterns cho phù hợp với bài toán (ví dụ Facade, Strategy để cấu trúc hóa).
3. Đảm bảo toàn bộ lưới Test ở Bước 2 Xanh (Green) trong lúc tái cấu trúc. Không Green CẤM CATCH thay đổi.

### Bước 4: Commit Theo Định Cự (`/git-commit`)

1. Đóng băng sự thay đổi này và commit sạch dưới dạng `refactor: dọn code smell tại abc/xyz...`.
2. Tạo Walkthrough tóm tắt cho Product Owner.
