# System Testing Insights & Patterns

## Core Philosophy

**"Mô Phỏng Trải Nghiệm Nguyên Khối" (Simulating the Monolithic Experience)**

Ở cấp độ này, phần mềm không còn là các đoạn mã rời rạc mà đã được biên dịch thành một sản phẩm nguyên khối, toàn vẹn (end-to-end).
Đội ngũ QA độc lập bắt đầu tiến hành hàng loạt các kịch bản kiểm thử nhằm đánh giá toàn diện hành vi hiện hành của hệ thống đối chiếu với toàn bộ yêu cầu trong tài liệu SRS (Software Requirements Specification).

## Môi Trường Kiểm Thử (The Environment)

Đây là phân đoạn đặc biệt quan trọng vì nó giả lập hành vi người dùng thực, đòi hỏi môi trường thử nghiệm (staging/testing env) phải được thiết lập sao cho gần như trùng khớp hoàn toàn với môi trường vận hành thực tế (production environment).

- **Mục tiêu**: Triệt tiêu các lỗi rủi ro ẩn bị cấu thành do sự khác biệt về hệ điều hành, cấu hình mạng, cơ sở dữ liệu, hoặc kiến trúc phần cứng.

## Các Khía Cạnh Bao Phủ (Coverage Scope)

Giai đoạn này bao phủ cả hai mảng chức năng lớn một cách triệt để:

1.  **Kiểm tra tính đúng đắn chức năng (Functional Testing)**:
    - Kiểm thử hành vi End-to-End (E2E) qua giao diện (UI) hoặc các workflow lớn.
    - Xác thực các Use Cases và User Stories từ gốc đến ngọn.
2.  **Khía cạnh phi chức năng (Non-Functional Testing)**:
    - **Performance Testing**: Đánh giá hiệu năng, sức chịu tải (Load/Stress).
    - **Security Testing**: Kiểm tra lỗ hổng bảo mật, xác thực người dùng, bảo vệ dữ liệu.
    - **Reliability & Usability**: Kiểm tra khả năng phục hồi khi lỗi, khả năng tiếp cận (Accessibility), và giao diện hiển thị trên các thiết bị.

## Mối Quan Hệ Khác

Tự động hóa hệ thống (E2E testing tools như Playwright/Cypress) là phương tiện phổ biến và cốt lõi để triển khai System Testing ở quy mô tự động. Tuy nhiên, System Testing cũng bao gồm cả việc thực thi thủ công nếu kịch bản đòi hỏi đánh giá cảm quan quá lớn.
