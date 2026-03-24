---
name: gitnexus-debugging
description: Kỹ năng sử dụng GitNexus để tìm và fix bug dựa trên luồng thực thi (execution flows).
---

# GitNexus Debugging Skill

Kỹ năng này giúp bạn sử dụng Knowledge Graph của GitNexus để truy vết lỗi, hiểu tại sao một state thay đổi không mong muốn hoặc tại sao một exception xảy ra.

## Khi nào sử dụng
- Khi gặp lỗi logic khó tìm nguyên nhân bằng cách đọc code thông thường.
- Khi cần hiểu luồng dữ liệu đi qua nhiều module.
- Khi một giá trị trong database bị thay đổi sai chỗ.

## Quy trình xử lý lỗi
1. **Tìm luồng liên quan**: `gitnexus_query({query: "tên_lỗi hoặc triệu_chứng"})`
2. **Kiểm tra ngữ cảnh**: `gitnexus_context({name: "hàm_nghi_vấn"})` để xem ai gọi nó.
3. **Truy vết chi tiết**: Đọc process tương ứng `READ gitnexus://repo/repo-name/process/process-name`.

## Các công cụ quan trọng
- `gitnexus_query`: Tìm kiếm theo concept lỗi.
- `gitnexus_context`: Xem 360 độ xung quanh một hàm/class.
