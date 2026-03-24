---
description: Giai Đoạn 2 - Phân Tích Yêu Cầu (Requirements Analysis).
type: procedure
risk: low
source: self
required_skills: [Business/business-analysis]
inputs: ["Initial Project Plan", "Phản hồi từ Khách hàng & Stakeholders"]
outputs: ["Software Requirement Specification (SRS)"]
---

# Workflow Phân Tích Yêu Cầu (Phase 2: Requirements Analysis) `/phase2-requirements`

> [!IMPORTANT]
> Đây là giai đoạn cốt lõi để thu hẹp khoảng cách giữa ngôn ngữ kinh doanh của khách hàng và ngôn ngữ kỹ thuật của lập trình viên. Tài liệu SRS được sinh ra từ đây sẽ đóng vai trò như một "bản hợp đồng kỹ thuật bất di bất dịch" trước khi đội ngũ thiết kế và phát triển bắt tay vào việc.

## 🎯 Mục Tiêu

Tiến hành nghiên cứu, thu thập và phân tích chi tiết toàn bộ các kỳ vọng của người dùng. Từ những dữ liệu thô này, tinh chỉnh và tổng hợp lại thành các yêu cầu hệ thống rõ ràng, có tính khả thi kỹ thuật cao, bao phủ trọn vẹn yêu cầu chức năng (Functional) và phi chức năng (Non-Functional).

## 👥 Các Bên Liên Quan (Roles/Skills)

- `business-analysis`: Đóng vai trò cầu nối, tổ chức khảo sát, phỏng vấn, thu thập dữ liệu và biên soạn SRS.
- **Client / Users**: Cung cấp phản hồi thực tế và kỳ vọng nghiệp vụ.
- **Tech Lead / Architecture**: Review SRS để đảm bảo tính khả thi về mặt kỹ thuật trước khi chốt hạ.

---

## Các Bước Thực Hiện

### Bước 1: Thu Thập Kỳ Vọng Người Dùng (Elicitation)

// turbo

1. Gắn persona `[business-analysis]`: Bước vào giai đoạn đi sâu chi tiết nghiệp vụ sau khi dự án đã được phê duyệt chiến lược.
2. Thiết kế và tiến hành các phiên phỏng vấn (Interviews), khảo sát (Surveys), và nghiên cứu hành vi (Behavioral research).
3. Đặt các câu hỏi mở để làm rõ chính xác nhu cầu ẩn và hiển ngôn của khách hàng.

### Bước 2: Phân Tích & Đối Chiếu Dữ Liệu (Analysis)

// turbo

1. Tổng hợp dữ liệu thô thu được từ tập người dùng tham gia khảo sát.
2. Phân tích các mô hình nghiệp vụ hiện tại, đối chiếu với các ràng buộc ngân sách và thời gian đã chốt ở Giai Đoạn 1.
3. Giải quyết mọi mâu thuẫn trong các yêu cầu được cung cấp bởi các Stakeholders khác nhau.

### Bước 3: Định Nghĩa Yêu Cầu Kỹ Thuật (Definition)

// turbo

1. Chuyển ngữ "ngôn ngữ kinh doanh" sang cơ sở "ngôn ngữ kỹ thuật" (ví dụ: chia cắt luồng nghiệp vụ thành các User Stories).
2. Phác thảo các giới hạn hệ thống rõ ràng:
   - **Functional Requirements**: Mô tả chi tiết hệ thống sẽ làm gì (API list, các luồng tương tác, xử lý dữ liệu).
   - **Non-Functional Requirements**: Mô tả cách hệ thống hoạt động (Hiệu năng, bảo mật, thời gian phản hồi, giới hạn đồng thời).

### Bước 4: Soạn Thảo & Chốt Hạ Tài Liệu SRS (Documentation)

// turbo

1. Biên soạn nội dung hoàn chỉnh vào **Tài liệu Đặc tả Yêu cầu Phần mềm (Software Requirement Specification - SRS)**.
2. Đánh giá lại SRS như một "hợp đồng kỹ thuật", đảm bảo không còn sự sai lệch hoặc hiểu nhầm định hướng nào trước khi tiến hành bước thiết kế kiến trúc.
3. Lưu trữ tài liệu vào kho lưu trữ chuyên biệt (thường là `docs/010-Business/` hoặc `docs/020-Architecture/`) và xin ý kiến xác nhận (sign-off).

---

## 🚫 Lỗi Cần Tránh (Pitfalls)

- Lược bỏ Non-functional requirements (như bảo mật và chịu tải) khiến hệ thống chết bất đắc kỳ tử khi vận hành thật.
- Giao tiếp một chiều, bỏ qua việc xác nhận đối chiếu lại những gì đã hiểu cùng với Stakeholders.
