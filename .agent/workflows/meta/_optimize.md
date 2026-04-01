---
description: Giao thức hệ thống tự động quy hoạch, rèn luyện cấu trúc Prompt và tối ưu Token Cost.
type: protocol
risk: none
version: "1.1"
inputs: ["Tín hiệu timeout", "Cảnh báo token limit", "Lặp code (Context Loop)"]
outputs: ["Lịch sử đã nén", "Thông báo dọn dẹp"]
context_from: ["/code", "/debug", "/development"]
context_to: ["/ask", "Bất kỳ luồng hiện tại"]
context_artifacts:
  receives: ["task.md", "walkthrough.md"]
  produces: ["memory_compress.md"]
---

# ⚡ Giao thức Tự Tối Ưu (Auto-Optimize Protocol)

> [!NOTE]
> File meta hệ thống này cấp quyền cho Agent tự dọn dẹp và tối ưu hóa luồng suy nghĩ / luồng tools nếu bị quá tải hoặc rơi vào vòng lặp sửa lỗi vô tận.

## 1. Điều kiện kích hoạt tự cảm ứng
Agent NGAY LẬP TỨC chuyển sang chạy các bước dưới đây khi:
- Phát hiện Token Cost chạy quá cao (dư thừa dữ liệu).
- Bị rủi ro Timeout API liên tục (do mảng dữ liệu trả về từ tools quá dài).
- Gặp "Context Loop" (Ví dụ: vòng lặp sửa 1 file 3 lần mà vẫn fail, hoặc AI tự xin lỗi lặp đi lặp lại).

## 2. Quy trình Thực thi Tối ưu ngầm (Actionable Self-Healing)

### Bước 2.1: Quét Log & Nén Context (Memory Downsizing)
Thay vì đọc toàn bộ file hoặc tải log khổng lồ bằng `view_file`, Agent PHẢI:
- Bật `task_boundary`, rút ngắn trường `TaskSummary` còn tối đa 1 câu, loại bỏ các chi tiết của việc đã làm quá lâu.
- Dùng `run_command` (với các lệnh rút gọn như `head`, `tail`, `grep`) hoặc giới hạn `StartLine`/`EndLine` của `view_file` trong khoảng 50 dòng thay vì 800 dòng.
- Tạo file `.agent/tools/memory_compress.md` để ghi nhận tóm tắt 3 lỗi lớn nhất vừa gặp và Xóa sạch các giả định cũ trong bộ nhớ bằng cách reload luồng (hoặc notify_user xin xác nhận nén memory).

### Bước 2.2: Siết Tool (Strict Schema Enforcement)
Dựa theo khuyến nghị của `agent-tool-builder` SKILL:
- Nếu nguyên nhân vòng lặp đến từ việc gọi tool thất bại (Function Calling failed), Agent bắt buộc phải tạo/gọi tool với JSON Schema cực kỳ khắt khe có mô tả (description) rõ ràng.
- Chặn đứng mọi cơ chế "Silent Fail" (Lỗi ngầm): Agent phải code cho tool trả về thông điệp lỗi dạng text để AI đọc được, thay vì chỉ dập lỗi (catch block rỗng).

### Bước 2.3: Phá vỡ Vòng Lặp (Break Context Loop)
- Nếu Agent nhận thấy mình đã edit/sửa 1 hàm quá 3 lần mà test vẫn báo lỗi: **BẮT BUỘC DỪNG LẠI**.
- Sử dụng ngay công cụ `notify_user` để viết một thông báo cực ngắn mô tả lỗi và xin ý kiến định hướng từ User, tuyệt đối không tự "đoán mò" sửa bừa để đốt token.

---

## Context Protocol

### Nhận Context (Input)
- **Từ Tool Errors hoặc Context Limits**: Khi thấy cảnh báo token warning từ hệ thống chat, hoặc khi tự đếm số lần fail (try/catch logic) > 3.
- **Từ filesystem**: Đọc file `task.md` hiện tại để xem mình đang kẹt ở bước số mấy.

### Truyền Context (Output)  
- **Cho các bước sau**: Ghi đè vào `task.md` một nhãn `[BLOCKED]` hoặc tạo file `memory_compress.md` tổng kết ngắn gọn chặng đường.

### Fallback
- Nếu Agent không thể nén Token bằng các lệnh tự động, nó sẽ tự xin quyền User bằng `notify_user` với message: `Hệ thống có vẻ đã lặp/quá tải, anh có muốn em tổng hợp lại Context và mở session mới không?`

---

## Error Recovery

> Các cấp độ xử lý khi ngay cả quá trình dọn dẹp Optimize cũng gặp lỗi.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| File rút gọn (memory_compress) không sinh được | Dùng terminal/shell viết trực tiếp 1 file txt nhẹ | Revert thao tác, không tạo file nén nữa | Dừng xử lý logic, báo ngay cho User |
| Tool báo lỗi sai cú pháp lúc Siết Tool | Đọc lại `SKILL.md` của `agent-tool-builder` để tạo đúng schema | Gọi thẳng tool Native không thông qua code trung gian | Hỏi User cách dùng tool |
