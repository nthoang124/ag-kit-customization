---
name: agent-orchestration-improve-agent
description: "Quy trình cải tiến triệt để, có hệ thống các agents hiện có thông qua việc phân tích điểm hiệu năng, tùy biến prompt, và lặp lại liên tục."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Quy Trình Tối Ưu Hóa Hiệu Suất Của Agent (Agent Performance Optimization)

Mục tiêu: Nâng Cấp Hệ Thống Các Mô Hình agents hiện có bằng cách lấy dữ liệu đo đạc chỉ số benchmark thực, chỉnh sửa prompt logic và đánh giá liên tục (A/B Test).

[Tư duy chuyên sâu (Extended thinking): Việc tối ưu Agent cần phối hợp data tracking từ trải nghiệm user tới khâu đánh giá A/B Testing Prompts. Không chỉ là sửa chữ prompt mà là sửa Workflow, sửa logic, có cơ chế rollback phiên bản an toàn].

## Dùng kỹ năng này khi (Use this skill when)

- Cải thiện/Nâng cấp các Performance/Độ Lì (Reliability) của 1 agent đã đẻ từ trước.
- Phân tích các Ca Lỗi Khó (Failure modes), chất lượng Prompts, hoặc Tần suất/Cách bot xài Tools.
- Chạy hệ thống đo đánh giá A/B Cấu Test Suit.
- Thiết kế luồng tối ưu hóa tuần hoàn (Iterative Workflow) cho agents.

## KHÔNG được dùng kỹ năng này khi (Do NOT use)

- Bạn xây agent tinh khôi từ Đầu / Từ Con Số Không (Scratch).
- Éo có một mẩu Metrics, data, Feedback báo lỗi của User, hay Test case nào (Chẳng có gì để đo lường).
- Tác vụ / Nhiệm vụ ko dính dáng gì tới Tối Đa Chất Lượng LLM/Agents.

## Hướng dẫn (Instructions)

1. Thiết lập cột mốc/chỉ số gốc (Baseline) và thu thập các mẫu hội thoại.
2. Xác định các hố đen lỗi (Failure Modes) và sửa theo Độ ưu tiên Impact cao.
3. Apply kỹ năng độ prompt/dịch workflow lên cao tầng và ghi KPI cụ thể.
4. Chạy xác thực bằng Môi Trường Test, Triển Khai theo Nấc có kiểm soát.

## An Toàn Tuyệt Đối (Safety)

- CẤM TRỰC TIẾP thả Prompt Mới lên Production mà không chạy (Regression testing - Hồi Quy Test) bộ test.
- Lên Phương án Rollback quay đầu xe siêu tốc nếu Lệnh Prompt mới bỗng láo nháo/Kéo Down Rate Xuống.

## Phase 1: Phân Tích Hiệu Suất Và Lấy Base (Performance Analysis)

### 1.1 Khai Thác Data (Gather Performance Data)

Gom Tụ Phễu:
- Tỷ Lệ Giải Quyết (Task Completion Rate) Báo Done / Fail.
- Sai Số Ảo Giác (Hallucination) vs Độ Truth (Sự thật Fact).
- Năng năng xài Tool (Bot có dùng ko hay bị ngoan cố).
- Thất Bại Kể Cả Tốn Tiền Tốn Phút (Latency delay + Token Burned).
- Rối Loạn Tín Hiệu (User dằn mặt/Chửi/Chỉnh Bot).

### 1.2 Nhận Định Kiểu Phàn Nàn Của User (User Feedback)
Đánh Trúng Vấn Đề (Painpoints):
- Lỗi bị Sửa Kháng (Corrections).
- Hỏi ngu (Clarification request).
- Bỏ Ngang Bỏ Xó.

### 1.3 Nhóm Các Nhánh Phá Bot (Failure Modes)
- Lệch Hướng Hiểu Trệch Prompt Mệnh Lệnh.
- Lỗi Văng Output JSON bị sai cấu trúc.
- Tuột Dây Cương (Lạc Mất Context trong hội thoại dài).
- Loạn Tools Bốc sai hàm gọi.

## Phase 2: Nâng Cấp Kỹ Nhập Lệnh Prompt (Prompt Engineering Improvements)

### 2.1 Mở Luồng Trí Não (Chain-of-Thought Enhancement)
Bắt Cầu Tư Duy Rõ Cho Máy ("Hãy đi Từng Bước Giải Đoán ...", "Khoan Đã Check Lại Xem ...").

### 2.2 Tối Ưu Mẫu Demo (Few-Shot Example Optimization)
Bơm Thật Nhiều VD Gốc Thực Tiễn Vào: VD Sai thì Kèm Kèm Theo Mô Đoán Lỗi / VD Đúng thì Rọi Thẳng Rằng Nó Rất Đẹp Về Nước Nào!!. 

### 2.3 Ráp Lõi Hiến Pháp (Constitutional AI Integration)
Tiêm Cho Agent Bộ Quy Ước Bất Khả Xâm Phạm (Tự Check Lại: Liệu Output Trả Có Mất Dạy Láo Không / Có Phịa Fake Cục Dữ Liệu Này Ra Bịp Ko ?).

## Phase 3: Đánh Giá Ẩn Mù (A/B Testing & Validation)

### 3.1 Khung Chấm A/B (A/B Testing Framework)
Chạy Trực Diện Bản Mới Với Phiên Bản Stable (Old). Vút 100 Bộ Mẫu Prompt Dò và Chốt Tỷ Lệ Nhanh Hay Thắng Kèo.

### 3.2 Chuẩn Chấm KPI (Evaluation Metrics)
Định Tính và Định Lượng. Tính Toán Lỗi Phịa Đóng (Hallucination Rate), Tốc độ Nhả Token vs Chi Phí Build Trả GPT/Claude Về API.

## Phase 4: Quản Lý Phiên Bản Rẽ Trái Đẩy Lên PR (Version Control/Deployment)

Đẩy Lên Production bằng Cây Phiên Bản Chuẩn:
`agent-name-v[MAJOR].[MINOR].[PATCH]` (Ví dụ *customer-support-v2.3.1*).
Lẩy Lên Trội Nhịp: (Nhả Bot vào 5% Data Test... 20%...100%).

## Cột Mốc Đo Thắng Lợi (Success Criteria)
Quy Trình Hoàn Thành Thành Cực Tốt Khi: 
- Task pass Rate Tăng ít nhất >=15%.
- Token Báo lỗi / User cằn nhằn bắt chỉnh sửa giảm ≥25%...

## Vòng Lặp Vô Tận (Continuous Cycle)
Cái Này Không Phải Fix Xong Rồi Bỏ. Nó Là Iterative Process (Vòng Lặp): Hàng Tuần - Tháng - Quý. Lệnh Prompt/Agents là Sản phẩm Software, Nó Sẽ Bị Lỗi Dần / Chệch Ray và Cần Fix Lại Sau Thời Gian!.

## Khi Nào Sử Dụng (When to Use)
Kỹ năng này áp dụng để thực thi các workflow hoặc hành động được mô tả trong phần tổng quan.
