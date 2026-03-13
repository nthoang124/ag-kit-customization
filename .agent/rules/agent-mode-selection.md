---
description: Tiêu chuẩn tự động quyết định việc Tác nhân (Agent) chuyển đổi giữa chế độ PLANNING (kỹ lưỡng) và EXECUTION (nhanh chóng).
type: protocol
risk: none
---

# Lựa chọn Chế độ Tác nhân (Agent Mode Selection)

Bất cứ khi nào Agent nhận được một yêu cầu từ người dùng, Agent phải tự động quyết định xem nên ưu tiên tốc độ (Fast/EXECUTION mode) hay sự cẩn thận (PLANNING mode) dựa trên Độ Phức Tạp (Complexity) của yêu cầu.

Quy tắc này nhằm tối đa hóa hiệu suất: Làm việc nhỏ thì làm ngay, làm việc lớn thì phải xin phép và lập kế hoạch kỹ lưỡng.

## 1. Khi nào KHỞI ĐỘNG CHẾ ĐỘ `PLANNING` (Lập Kế Hoạch)

Chế độ `PLANNING` là bắt buộc đối với các tác vụ rủi ro cao hoặc quy mô lớn. 
**Dấu hiệu nhận biết:**
- Yêu cầu tạo ra một tính năng hoàn toàn mới.
- Chạm vào cấu trúc Database Schema, kiến trúc API, hoặc cơ chế Bảo mật/Xác thực.
- Ảnh hưởng đến nhiều hơn 3 files trong các module khác nhau.
- Yêu cầu tái cấu trúc (Refactoring) quy mô lớn.

**Hành vi bắt buộc ở chế độ PLANNING:**
1. Agent **KHÔNG ĐƯỢC PHÉP** thay đổi bất kỳ file code nào.
2. Agent tạo file `implementation_plan.md` ở khoang chứa dữ liệu Artifacts.
3. Đại diện hệ thống gọi `notify_user` để trình bày chiến lược thiết kế (Design Strategy) cho Người dùng.
4. Agent dừng lại và BẮT BUỘC CHỜ SỰ CHẤP THUẬN (Approval) từ Người dùng trước khi chuyển sang `EXECUTION`.

## 2. Khi nào KHỞI ĐỘNG CHẾ ĐỘ `EXECUTION` (Chế độ Nhanh - Fast Mode)

Chế độ `EXECUTION` bỏ qua giai đoạn duyệt bản vẽ, ưu tiên giải quyết ngay lập tức.
**Dấu hiệu nhận biết:**
- "Fix cho tôi lỗi CSS ở nút này".
- "Sửa lỗi chính tả trong file X".
- Các tasks cực kỳ biệt lập (Isolated Tasks), chỉ thay đổi trong phạm vi từ 1 đến 2 file hiện tại, không gây ảnh hưởng dây chuyền.
- Hành động thực thi các Script cục bộ rõ ràng (Ví dụ: Chạy linter, format).

**Hành vi bắt buộc ở chế độ EXECUTION (Fast):**
1. Bỏ qua việc tạo `implementation_plan.md`.
2. Bỏ qua việc xin phép thông qua `notify_user`.
3. Agent trực tiếp tiến hành sửa code bằng lệnh `replace_file_content` hoặc `multi_replace_file_content`.
4. Nếu task phức tạp một chút (nhưng vẫn cục bộ), quản lý qua `task.md`. Sau khi hoàn tất tự động thông báo kết quả.

## 3. Disambiguation - Khi nhập nhằng (Giao thoa)

- Nếu User yêu cầu "Fix nhanh lỗi sập màn hình đăng nhập (Crash)", Agent đối chiếu với Workflow Rule `_routing.md` (`Urgency First`). Yêu cầu này Khẩn cấp (Critical) -> Ưu tiên xử lý nhanh nhưng vì rủi ro cực cao, phải gọi `hotfix` và vẫn phải trình bày Counterfactual Risk Assessment trước khi Push. 
- Mọi giới hạn An toàn và Security vẫn luôn được ưu tiên hơn Tốc độ.

## 4. Chủ động Đề xuất Chuyển đổi Mode (Proactive Mode Advice)

Agent nhận thức được rằng người dùng có một nút chuyển đổi (Toggle) giữa **Planning Mode** và **Fast Mode** trên giao diện IDE.

Nếu Agent phát hiện sự "lệch pha" giữa Độ phức tạp của Task và Chế độ UI hiện tại, Agent **BẮT BUỘC** phải răn đe hoặc gợi ý người dùng đổi Mode:
- **Nếu user đang bật [Fast Mode] nhưng yêu cầu tạo cả một ứng dụng mới / sửa architecture:** Agent phải cảnh báo: *"Task này quá lớn và rủi ro để chạy Fast Mode. Vui lòng bật **Planning Mode** trên giao diện để tôi có thể thiết kế kiến trúc và viết Document đàng hoàng trước khi code."*
- **Nếu user đang bật [Planning Mode] nhưng yêu cầu sửa đúng 1 chữ / 1 file:** Agent có thể thực thi ngay, nhưng nên nhắc khéo: *"Ví dụ này quá nhỏ để phải lập Plan. Lần sau bạn có thể gạt sang **Fast Mode** để tôi sửa thẳng code không cần tạo task list rườm rà nhé."*
