# Quy trình Tự Tối Ưu (`/optimize`)

> [!NOTE]
> Workflow này kích hoạt các kỹ năng `agent-orchestration-improve-agent` và `agent-orchestration-multi-agent-optimize`.

## Khi nào dùng (When to Use)

- Khi Agent chạy quá tốn Token.
- Khi Agent bị vướng vào loop (vòng lặp) hoặc context window bị quá tải.
- Khi cần tối ưu luồng gọi API đa Agent để tiết kiệm chi phí.

## Các bước thực hiện

### Bước 1: Quét Log Hội Thoại
Hệ thống tự động sử dụng `agent-orchestration-improve-agent` đọc lại toàn bộ file log hoặc session hiện tại.

### Bước 2: Phân tích Điểm Nghẽn (Bottlenecks)
Đánh giá Token Cost, thời gian phản hồi (Timeout), và số lượng truy vấn thừa.

### Bước 3: Áp dụng Tối Ưu
- Báo cáo cho người dùng cách rút gọn Prompt.
- Chuyển cấu trúc gọi tool sang dạng Schema nghiêm ngặt nhất (dựa trên tư duy của `agent-tool-builder`).
