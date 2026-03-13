---
description: Điều phối Subagents chạy song song để giải quyết các lỗi/task hoàn toàn KHÔNG liên quan đến nhau.
type: procedure
risk: safe
source: self
required_skills: [backend-developer, frontend-developer]
inputs: ["Multiple Bugs", "Multiple independent tests failing"]
outputs: ["Fixed Code"]
context_from: ["/qa", "/gen-tests", "/debug"]
context_to: ["/git-commit"]
context_artifacts:
  receives: []
  produces: ["walkthrough.md"]
---

# Workflow Điều Phối Subagent Song Song (`/parallel-dispatch`)

> [!IMPORTANT]
> Workflow giúp đẩy nhanh tiến độ fix bug/test fail bằng cách phái đi nhiều agents cùng lúc để xử lý các tệp không dính líu đến nhau.

## Khi nào dùng (When to Use)

- Có >= 2 test files fail hoặc module hỏng với nguyên nhân khác biệt.
- Các hỏng hóc KHÔNG dùng chung state, chung file hay file phụ thuộc. (Independent domains).

## KHÔNG dùng khi (When NOT to Use)

- Lỗi có nguyên nhân chung (Sửa 1 chỗ được tất cả).
- Cần thay đổi kiến trúc/state chung (Các agents sẽ dẫm chân lên nhau tạo ra conflict commit).

---

## Các bước thực hiện

### Bước 1: Phân Loại Thành Các Vùng Độc Lập (Identify Domains)

1. Nhóm các lỗi theo module hoặc file. 
2. Đảm bảo chắc chắn chúng độc lập (vd: lỗi UI button A không làm ảnh hưởng lỗi API fetch B).

### Bước 2: Tạo Lệnh Nhỏ Khép Kín (Create Focused Tasks)

1. Cấp quyền + Context vừa đủ cho Agent từng vùng. Bắt buộc giới hạn scope (ví dụ: "Chỉ được sửa trong file auth.ts").
2. Đặt Output mục tiêu rõ ràng: "Trả về tóm tắt root cause và fix". Tuyệt đối không để agent sửa lan man các file.

### Bước 3: Dispatch Song Song (Parallel Dispatch)

1. Gọi N Subagent cùng lúc.

### Bước 4: Review Tránh Conflict (Review & Integrate)

1. Đợi tất cả agents trả về báo cáo.
2. Review xem có đụng chạm file chéo (conflict) không.
3. Chạy tổng thể Test Suite (Regression Test) xem sửa có break chéo file khác không.
4. Tích hợp và Commit kết quả từ các Subagents.
