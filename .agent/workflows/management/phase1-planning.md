---
description: Giai Đoạn 1 - Lập Kế Hoạch Và Khởi Tạo Dự Án (Planning).
type: procedure
risk: low
source: self
required_skills: [Business/product-manager, Business/business-analysis]
inputs: ["Ý tưởng dự án", "Yêu cầu sơ bộ"]
outputs: ["Initial Project Plan", "Milestones", "Budget"]
---

# Workflow Khởi Tạo Dự Án (Phase 1: Planning) `/phase1-planning`

> [!IMPORTANT]
> Giai đoạn khởi tạo đóng vai trò là la bàn định hướng chiến lược. Sự thất bại trong khâu lập kế hoạch thường dẫn đến hội chứng "phình to phạm vi" (scope creep) và cạn kiệt nguồn lực.

## 🎯 Mục Tiêu

Định vị rõ ràng phạm vi dự án, đánh giá tính khả thi, phân tích rủi ro, tối ưu hóa ROI và thiết lập một lịch trình tổng thể hiệu quả để chuẩn bị bước vào thực thi.

## 👥 Các Bên Liên Quan (Roles/Skills)

- `product-manager`: Xác định mục tiêu kinh doanh, phạm vi chức năng, lập chiến lược.
- `business-analysis`: Thực hiện nghiên cứu thị trường, đánh giá khả thi lập hồ sơ nghiệp vụ.
- **Project Manager**: Quản lý lịch trình, rủi ro, nguồn lực.

---

## Các Bước Thực Hiện

### Bước 1: Xác Định Phạm Vi & Mục Tiêu

// turbo

1. Gắn persona `[product-manager]`: Tổ chức họp cùng các bên liên quan để tìm hiểu bối cảnh.
2. Xác định chi tiết **Scope** (Phạm vi) và **Business Goals** (Mục tiêu kinh doanh).
3. Biên soạn các tài liệu Tầm nhìn và Tuyên bố sứ mệnh của dự án.

### Bước 2: Đánh Giá Khả Thi & Phân Tích ROI

// turbo

1. Gắn persona `[business-analysis]`: Đào sâu vào tính khả thi kỹ thuật và tài chính.
2. Thực hiện **Cost-Benefit Analysis** (Phân tích chi phí - Lợi ích) để đảm bảo tỷ suất hoàn vốn (ROI) hợp lý.
3. Xác nhận rằng hệ thống không dại dột tiêu thụ nguồn lực vượt quá giá trị mà nó mang lại.

### Bước 3: Đánh Giá Rủi Ro (Risk Assessment)

// turbo

1. Nhận diện sớm các rủi ro phát sinh (công nghệ, tài nguyên, timeline).
2. Xây dựng kế hoạch phòng ngừa và các giải pháp Backup (Plan B).
3. Mã hóa rủi ro thành các thẻ theo dõi trên issue tracker để kiểm soát.

### Bước 4: Lập Kế Hoạch Kỹ Thuật Ban Đầu & Ngân Sách

// turbo

1. Ước tính và phân bổ nguồn nhân lực, công nghệ, hệ thống.
2. Xây dựng một lịch trình tổng quan (Total Schedule).
3. Định nghĩa các Cột mốc quan trọng (Milestones) cần đạt được trong các Phase tiếp theo.

### Bước 5: Bàn Giao (Deliverables)

// turbo

1. Tổng hợp toàn bộ dữ liệu vào **Bản Kế hoạch Dự án Ban đầu (Initial Project Plan)**.
2. Lưu trữ tài liệu dưới đường dẫn `docs/010-Business/` (theo chuẩn thiết kế).
3. Yêu cầu Sign-off từ các stakeholders trước khi tiếp tục Phase 2.

---

## 🚫 Lỗi Cần Tránh (Pitfalls)

- Bỏ qua rủi ro tiền ẩn hoặc phân tích ROI hời hợt.
- Không có ranh giới Scope rõ ràng dễ dẫn đến "scope creep".
