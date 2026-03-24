---
description: Gọi workflow /plan để lập kế hoạch, sau đó đi sâu chi tiết Low-Level Design (LLD) ở mức Unit và lưu thành artifact.
type: procedure
risk: none
source: self
required_skills:
  [
    Architecture/technical-architect,
    Development/backend-developer,
    Development/frontend-developer,
  ]
inputs: ["Requirements", "PRD"]
outputs: ["high_level_plan.md", "implementation_plan.md", "lld_unit_plan.md"]
context_from: ["/plan", "/brainstorm", "/research"]
context_to: ["/code", "/cook", "/implement-feature"]
---

# Workflow Lập Kế Hoạch Chi Tiết Mức Unit (`/plan-detail`)

> [!IMPORTANT]
> Workflow này có tính kế thừa. Nó sẽ kích hoạt `/plan` để lấy khung sườn, sau đó mở rộng bằng cách thiết kế chi tiết (LLD) đến từng hàm/method/component (mức Unit).
> **BẮT BUỘC**: Mọi kế hoạch sinh ra đều phải được lưu dưới dạng **Artifact** (sử dụng cờ `IsArtifact: true` khi ghi file) để User dễ dàng review và hệ thống đính kèm vào GUI.

## Khi nào dùng (When to Use)

- Khi cần thiết kế hệ thống cực kỳ chi tiết trước khi code (xuống tới lớp thuật toán của từng hàm).
- Khi hệ thống phức tạp đòi hỏi Technical Architect phải làm rõ mọi interface, input/output, và exception handling ở cấp độ Unit.

## Các bước thực hiện

### Bước 1: Khởi nguồn từ `/plan` (High-Level & Mid-Level)

// turbo

1. Thực hiện đầy đủ các logic của workflow `/plan` dựa trên yêu cầu của người dùng.
2. Chờ quy trình `/plan` hoàn tất việc phân tích và phác thảo ra `high_level_plan.md` (Chiến lược & Kiến trúc) và `implementation_plan.md` (Phân rã file).
3. Đảm bảo 2 bản kế hoạch trên đã được ghi lại bằng công cụ tạo **Artifact**.

### Bước 2: Phân tích Low-Level Design (LLD) cấp độ Unit

// turbo

1. Gắn persona `[technical-architect]`.
2. Duyệt qua từng tệp (file) được đề xuất trong bản `implementation_plan.md`.
3. Cho mỗi file/module, tiến hành định nghĩa chi tiết vi mô:
   - **Tên Class / Component**.
   - **Danh sách hàm (Methods)**: Định nghĩa rõ Signature (Tên hàm, tham số Arguments/Types, kết quả trả về Return/Types).
   - **Luồng thuật toán (Logic)**: Mô tả logic cốt lõi bên trong hàm đó.
   - **Exception Handling**: Các trường hợp lỗi (Edge cases) và cách ném/xử lý ngoại lệ.
   - **Unit Test Cases**: Cần viết test để cover những luồng nào trong hàm này?

### Bước 3: Đóng gói Artifact LLD

// turbo

1. Tổng hợp toàn bộ bản thiết kế vi mô mức Unit vào một tài liệu mới: `lld_unit_plan.md`.
2. **QUAN TRỌNG**: Sử dụng công cụ `write_to_file` với thuộc tính `IsArtifact: true` (kèm ArtifactMetadata) để lưu `lld_unit_plan.md` thành một Artifact chính thức.
3. Đảm bảo Markdown rõ ràng, dùng formatting bảng (Tables) cho các API contracts và Code blocks cho pseudo-code.

### Bước 4: Handover & Review

1. Kiểm tra lại tính đồng nhất giữa `hd_level_plan`, `implementation_plan` và `lld_unit_plan`.
2. `notify_user` với yêu cầu đánh giá (Review) các Artifacts vừa được tạo.
3. Chỉ bắt đầu bước vào `/code` hoặc `/cook` sau khi người dùng đã duyệt toàn bộ thiết kế Unit này.

---

## Output mong đợi

- [x] Artifact: `high_level_plan.md` (Kế thừa từ `/plan`).
- [x] Artifact: `implementation_plan.md` (Kế thừa từ `/plan`).
- [x] Artifact: `lld_unit_plan.md` (Bản thiết kế mức Unit chi tiết, Low-Level Design).
