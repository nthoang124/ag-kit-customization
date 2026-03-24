# Acceptance Testing Insights & Patterns

## Core Philosophy

**"Thẩm Định Năng Lực Thực Tiễn" (Validating Practical Capability)**

Đây là cánh cổng cuối cùng trước khi phần mềm được phép đưa ra thị trường. Điểm khác biệt cốt lõi của Acceptance Testing so với các cấp độ kiểm thử trước là nó **không nhằm mục đích săn tìm lỗi (bug hunting)**. Thay vào đó, nó là quá trình giúp **xây dựng niềm tin của khách hàng** vào sản phẩm, xác nhận hệ thống đã thực sự sẵn sàng để phục vụ mục đích kinh doanh.

## Các Loại Hình Kiểm Thử Chấp Nhận

Quá trình này được chia thành các loại hình chuyên sâu nhằm thỏa mãn đa dạng yêu cầu của các bên liên quan:

### 1. User Acceptance Testing (UAT)

- **Đối tượng**: Nhóm người dùng nội bộ (Business Users, Product Owners).
- **Mục tiêu**: Trực tiếp thao tác trên ứng dụng để xác minh hệ thống giải quyết các bài toán kinh doanh hằng ngày một cách mượt mà và đúng luồng nghiệp vụ.
- **Output**: Quyết định Sign-off chấp nhận hệ thống.

### 2. Alpha và Beta Testing

- **Alpha Testing**: Giai đoạn dùng thử ở quy mô nội bộ bởi nhân viên công ty trong môi trường kiểm soát. Mục tiêu là phát hiện ra những lỗi hành vi cực kỳ tinh vi mà QA có thể đã sơ suất lọt qua.
- **Beta Testing**: Triển khai phần mềm cho một tập khách hàng đối tượng (ngoại vi) ở môi trường hoạt động thực tế. Việc này giúp thu thập các dữ liệu hành vi vô giá và đo lường trải nghiệm người dùng thực trước thời điểm phát hành chính thức (Grand Release).

### 3. Operational & Contractual Testing

- **Operational Testing (Kiểm thử Vận hành)**: Đảm bảo khả năng quản trị hệ thống của đội ngũ IT/SysAdmin, ví dụ: quy trình sao lưu (backup), phục hồi (disaster recovery) có hoạt động đúng ở tầng hạ tầng hay không.
- **Contractual Testing (Kiểm thử Hợp đồng/Quy chuẩn)**: Đảm bảo phần mềm tuân thủ khắt khe các điều khoản pháp lý, bộ quy chuẩn bảo mật dữ liệu công nghiệp (như GDPR, HIPAA, PCI-DSS) đã cam kết trong cấu trúc của hợp đồng thương mại.
