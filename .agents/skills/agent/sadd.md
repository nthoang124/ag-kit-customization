---
description: Điều phối đa nhân vật (Multi-Agent/Subagents) để thực hiện các task độc lập hoặc song song, kèm theo Code Review nghiêm ngặt giữa mỗi bước.
type: skill
risk: safe
version: "1.0"
---

# 🤖 Phát triển dựa trên Subagent (Subagent-Driven Development - SADD)

> [!IMPORTANT]
> **Nguyên tắc cốt lõi**: Mỗi task là một Subagent mới + Review chéo sau mỗi task = Chất lượng cao, tốc độ lặp (iteration) nhanh và không bị nhiễm độc ngữ cảnh (Context Pollution).

## 💡 Khi nào nên dùng

1.  **Dự án phức tạp**: Có bản kế hoạch (Implementation Plan) với nhiều task độc lập.
2.  **Xử lý song song**: Cần crawl dữ liệu, fix bug ở nhiều module khác nhau hoặc chạy các chuỗi test độc lập.
3.  **Context Window đầy**: Khi session hiện tại quá dài, việc tạo subagent mới giúp bắt đầu với ngữ cảnh sạch sẽ.

---

## 🛠️ Quy trình thực hiện (Workflow)

### 1. Tải Kế hoạch (Load Plan)
Đọc file `implementation_plan.md` và khởi tạo danh sách Todo.

### 2. Giao việc cho Subagent (Dispatch)
Với mỗi task, khởi tạo một Subagent mới với chỉ thị (Prompt) cực kỳ chi tiết:
- **Nhiệm vụ**: Thực hiện chính xác Task N.
- **Tiêu chuẩn**: Viết test (TDD) + Verify mã nguồn.
- **Báo cáo**: Kết quả pass/fail, những file đã đổi, rủi ro phát sinh.

### 3. Review kết quả (Code Review)
**BẮT BUỘC**: Khởi tạo một Subagent chuyên biệt làm Code Reviewer để đánh giá mã của Subagent thực thi:
- Kiểm tra tính đúng đắn so với yêu cầu Task N.
- Đánh giá kiến trúc, bảo mật và hiệu năng.
- Phân loại lỗi: Nghiêm trọng (Critical) / Quan trọng (Important) / Nhỏ (Minor).

### 4. Xử lý Phản hồi (Feedback Loop)
- Nếu có lỗi **Nghiêm trọng**: Sửa ngay lập tức trước khi sang task sau.
- Nếu có lỗi **Quan trọng**: Ghi chú và sửa trước khi kết thúc batch.
- Nếu **Xanh (Ready)**: Đánh dấu hoàn thành và sang task tiếp theo.

---

## 🚀 Chế độ Chạy Song song (Parallel Execution)

Khi có nhiều lỗi không liên quan đến nhau hoặc các task ở các subsystem khác nhau:
- Chia nhóm task theo vùng ảnh hưởng.
- Dispatch nhiều Subagent cùng lúc.
- Người điều phối (Orchestrator) tổng hợp kết quả và chạy full test suite cuối cùng.

---

## 📋 Checklist Xác nhận (Trước khi Hoàn tất)

- [ ] Mỗi task đều được thực hiện bởi một Subagent có ngữ cảnh riêng?
- [ ] Đã có bước Code Review độc lập cho từng task?
- [ ] Các lỗi "Nghiêm trọng" từ review đã được xử lý triệt để?
- [ ] Toàn bộ hệ thống (Full Suite) vẫn xanh sau khi tích hợp mã từ các Subagent?
- [ ] Task list trong `implementation_plan.md` đã được cập nhật trạng thái?

> [!WARNING]
> Đừng bao giờ bỏ qua bước Code Review giữa các task. Việc tích hợp mã từ nhiều Subagent mà không kiểm tra chéo sẽ dẫn đến xung đột logic và nợ kỹ thuật khó kiểm soát.
