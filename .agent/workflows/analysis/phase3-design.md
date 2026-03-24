---
description: Giai Đoạn 3 - Thiết Kế Kiến Trúc (Design).
type: procedure
risk: medium
source: self
required_skills:
  [Architecture/solution-architect, Architecture/technical-architect]
inputs: ["Software Requirement Specification (SRS)"]
outputs:
  ["Software Design Document (SDD)", "ERD Diagrams", "Architecture Flows"]
---

# Workflow Thiết Kế Kiến Trúc (Phase 3: Design) `/phase3-design`

> [!IMPORTANT]
> Giai đoạn thiết kế giải quyết câu hỏi cốt lõi "Làm thế nào để phần mềm thực thi các yêu cầu đã đặt ra?". Sản lượng quan trọng nhất của quá trình tư duy này là một bản Blueprint kỹ thuật hoàn chỉnh (SDD) làm cơ sở cho đội ngũ lập trình bắt đầu quá trình mã hóa chuẩn xác, triệt tiêu những sai lệch kiến trúc đắt đỏ về sau.

## 🎯 Mục Tiêu

Tiến hành định hình cấu trúc tổng thể và vi mô của hệ thống lấy tài liệu Đặc tả (SRS) làm kim chỉ nam. Chia nhỏ thiết kế thành hai cấp độ phân tích: High-Level Design (HLD) và Low-Level Design (LLD) nhằm đảm bảo mọi ranh giới module, mô hình dữ liệu và thuật toán nhỏ nhất đều được vạch sẵn rõ ràng.

## 👥 Các Bên Liên Quan (Roles/Skills)

- `solution-architect` (Kiến trúc sư giải pháp): Phụ trách mảng Thiết kế Cấp cao (HLD), định tuyến hệ sinh thái.
- `technical-architect` (Kỹ sư thiết kế): Phụ trách Thiết kế Cấp thấp (LLD), đi sâu vào chi tiết module nội tại, cấu trúc dữ liệu và API interface.

---

## Các Bước Thực Hiện

### Bước 1: Phân Tích & Xác Nhận Input

// turbo

1. Import và phân tích tài liệu SRS chuyên sâu nhất.
2. Gắn persona `[solution-architect]`: Giải quyết các điểm mù về luồng kỹ thuật hoặc các giới hạn viễn cảnh (ví dụ: giới hạn chịu tải, giới hạn tài nguyên tính toán).

### Bước 2: Thiết Kế Cấp Cao (High-Level Design - HLD)

// turbo

1. Gắn persona `[solution-architect]`: Tập trung vào kiến trúc tổng thể toàn hệ thống.
2. Phác thảo Sơ đồ thực thể liên kết (ERD) cho Database, lựa chọn kho lưu trữ tối ưu (SQL vs NoSQL).
3. Thiết lập bản đồ luồng giao tiếp (Communication Flows) giữa các Module lớn và các dịch vụ ngoại vi (Third-party integrations).

### Bước 3: Thiết Kế Cấp Thấp (Low-Level Design - LLD)

// turbo

1. Gắn persona `[technical-architect]`: Chuyển quyền xử lý để thiết kế vi mô từng khối xây dựng (building blocks).
2. Xây dựng chi tiết Giao diện Lập trình Ứng dụng (API Contracts, gRPC/REST specs).
3. Thiết kế luồng thuật toán cốt lõi cho từng hàm phức tạp, mô tả chi tiết dạng dữ liệu ở từng tầng dịch vụ và xử lý Exception.

### Bước 4: Soạn Thảo Bản Thiết Kế (Documentation)

// turbo

1. Tập hợp mọi sơ đồ, bảng biểu kiến trúc (Mermaid diagrams, PlantUML) và đặc tả API thành tài liệu trung tâm.
2. Bàn giao kết quả dưới định dạng **Tài Liệu Thiết Kế Phần Mềm (Software Design Document - SDD)** chuẩn (tại file/folder `docs/020-Architecture/`).
3. Chờ Approval & Sign-off từ Technical Lead hoặc CTO trước khi giải ngân công việc cho đội ngũ Coder (Phase 4).

---

## 🚫 Lỗi Cần Tránh (Pitfalls)

- Thiết kế LLD hời hợt, dồn trách nhiệm tự suy đoán logic chi tiết (thuật toán nhỏ) xuống cho Developers.
- Sơ đồ Data Flow và ERD không phản ánh đúng với số lượng ràng buộc được liệt kê trong Non-Functional Requirements của bản SRS.
