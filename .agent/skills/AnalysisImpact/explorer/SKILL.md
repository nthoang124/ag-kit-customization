---
name: gitnexus-explorer
description: Sử dụng khi cần hiểu cách code hoạt động, kiến trúc hệ thống, hoặc truy vết luồng thực thi (execution flows) bằng GitNexus Knowledge Graph.
---

# Khám phá Codebase với GitNexus

Sử dụng kỹ năng này để thay thế cho `grep` truyền thống khi cần tìm hiểu các mối quan hệ phức tạp giữa các hàm và module.

## Khi nào nên dùng

- "Cơ chế authentication hoạt động như thế nào?"
- "Cấu trúc project này ra sao?"
- "Các component chính nằm ở đâu?"
- "Logic database được xử lý ở đâu?"
- Tìm hiểu code lạ hoặc code phức tạp.

## Quy trình làm việc (Workflow)

1. **Kiểm tra trạng thái**: `READ gitnexus://repo/{name}/context` để xem index có bị cũ (stale) không.
2. **Truy vấn ý tưởng**: `gitnexus_query({query: "<nội dung cần hiểu>"})` để tìm các luồng thực thi liên quan.
3. **Xem ngữ cảnh chi tiết**: `gitnexus_context({name: "<symbol>"})` để xem callers/callees (ai gọi nó, nó gọi ai).
4. **Truy vết luồng chạy**: `READ gitnexus://repo/{name}/process/{name}` để xem từng bước thực thi.

## Checklist

- [ ] Đọc `gitnexus://repo/{name}/context` để lấy tổng quan.
- [ ] Dùng `gitnexus_query` cho khái niệm cần tìm hiểu.
- [ ] Review các execution flows (processes) trả về.
- [ ] Dùng `gitnexus_context` cho các symbols quan trọng.
- [ ] Đọc source code thực tế để xác nhận logic.

## Công cụ quan trọng

- **gitnexus_query**: Tìm các execution flows liên quan đến một từ khóa (ví dụ: "payment processing").
- **gitnexus_context**: Xem cái nhìn 360 độ về một Function/Class (gồm incoming/outgoing calls).
