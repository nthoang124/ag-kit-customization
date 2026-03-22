---
trigger: model_decision
description: Áp dụng bắt buộc khi chuẩn bị báo cáo hoàn thành một Task, Phase hoặc xin PR/Commit. Yêu cầu phải có Bằng Chứng Xác Minh (Verification Evidence).
---

# Quy Tắc Xác Minh Trước Khi Hoàn Thành (Verification Before Completion)

> [!IMPORTANT]
> **MỤC TIÊU**: Việc tuyên bố hoàn thành task mà không có bước xác minh (chạy lệnh) là sự lừa dối, không phải tối ưu tiến độ. Quy tắc này tạo bằng chứng khách quan trước mọi tuyên bố.
>
> **THE IRON LAW**: `NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE` (KHÔNG báo cáo hoàn thành nếu chưa có bằng chứng xác minh MỚI NHẤT).

## 1. Mệnh Lệnh Chặn (The Gate Function)

**TRƯỚC KHI** báo cáo bất kỳ trạng thái nào hoặc thể hiện sự hài lòng ("Done", "Perfect", "Pass"):

1. **IDENTIFY**: Lệnh terminal nào chứng minh được claim này? (VD: chạy test, chạy linter, chạy build).
2. **RUN**: Execute TOÀN BỘ lệnh đó (phải chạy lệnh trực tiếp, không dựa trên mường tượng).
3. **READ**: Đọc kĩ output của lệnh, kiểm tra exit code.
4. **VERIFY**: Output có thực sự khớp với claim không?
   - Nếu KHÔNG: Báo cáo trạng thái thực tế cùng bằng chứng.
   - Nếu CÓ: Báo cáo claim cùng CÙNG BẰNG CHỨNG (Evidence).
5. **CHỈ SAU ĐÓ**: Mới được tiến hành sang bước tiếp theo (Commit code, Sang feature mới).

`Việc bỏ qua bất kỳ bước nào trong khâu này = Hành vi báo cáo láo, vi phạm cốt lõi.`

## 2. Red Flags - BẮT BUỘC DỪNG LẠI

Xóa bỏ ngay các dòng suy nghĩ/lời nói sau nếu chưa chạy lệnh xác minh:
- "Nó chắc chắn chạy được rồi."
- "Tôi khá tự tin vào đoạn code này."
- "Vừa nãy linter pass rồi." (Linter không chứng minh compiler pass).
- "Chỉ cần 1 sửa đổi nhỏ này thôi, không cần test lại đâu."
- *Bất kỳ cụm từ nào mang hàm ý đã hoàn thành nhưng không gọi công cụ Terminal/Run.*

## 3. Các Minh Họa Thực Tế (Patterns)

| Scenarios | Đạt (Có Bằng Chứng) | Trượt (Không Đạt Yêu Cầu) |
|:---|:---|:---|
| **Chạy Test** | Chạy `npm test`. Lấy output -> "15/15 test passed. File đã hoàn thiện." | "Em đã update code, chắc chắn hết lỗi rồi anh ạ." |
| **Sửa Bug** | Chạy Script Tái hiện Lỗi -> Xác nhận Pass -> "Đã verified lỗi không còn." | "Đã fix ở dòng 15, nhìn bằng mắt là đúng." |
| **Xong Task Phase** | Compile/Build thử -> Pass exit(0) -> "Build thành công, xin phép chuyển phase." | "Code viết xong không có gạch đỏ syntax, đi tiếp thôi." |

## 4. Why This Matters? (Tầm Quan Trọng)

- Nếu báo cáo láo (báo xong nhưng code lỗi syntax chưa kiểm tra), User sẽ mất niềm tin hoàn toàn vào Agent.
- Lỗi gãy hệ thống trên Production cực kỳ tốn chi phí để debug sửa lại.
- **Tiêu chuẩn Cao nhất**: Evidence Over Confidence. (Luôn trọng chứng hơn trọng niềm tin).
