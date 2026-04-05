---
description: Sử dụng khi triển khai bất kỳ tính năng hoặc sửa lỗi nào, TRƯỚC KHI viết mã thực thi.
type: skill
risk: safe
version: "1.0"
---

# 🧪 Quy trình Phát triển Hướng Kiểm thử (Test-Driven Development - TDD)

> [!IMPORTANT]
> **Nguyên tắc cốt lõi**: Viết test trước. Quan sát nó fail. Viết mã tối thiểu để pass.
> Nếu bạn không thấy test fail, bạn không biết liệu nó có đang kiểm tra đúng thứ cần thiết hay không.

## ⚖️ Luật Sắt (The Iron Law)

```text
KHÔNG CÓ MÃ NGUỒN (PRODUCTION CODE) NẾU KHÔNG CÓ TEST FAIL TRƯỚC ĐÓ
```

Nếu bạn lỡ viết mã trước khi có test? **Xóa nó đi. Bắt đầu lại.** 
Không giữ lại làm "tham khảo", không "điều chỉnh" khi đang viết test. Xóa nghĩa là xóa sạch và xây dựng lại từ đầu dựa trên test.

---

## 🔄 Chu trình Red-Green-Refactor

1.  🔴 **RED (Đỏ)**: Viết một unit test nhỏ nhất mô tả hành vi mong muốn. Chạy test và xác nhận nó **FAIL** đúng như dự kiến.
2.  🟢 **GREEN (Xanh)**: Viết mã nguồn đơn giản nhất có thể để làm cho test đó pass. Đừng quan tâm đến tối ưu hay clean code lúc này.
3.  🔵 **REFACTOR (Tối ưu)**: Sau khi test đã xanh, hãy dọn dẹp mã nguồn, xóa bỏ trùng lặp, cải thiện tên biến... mà vẫn đảm bảo test luôn **XANH**.

---

## 🛠️ Cách thực hiện chi tiết

### Bước 1: RED - Viết Test Fail
Viết một test minimal nhất có thể.

**Yêu cầu:**
- Chỉ kiểm tra một hành vi duy nhất.
- Tên test rõ ràng (Ví dụ: `nên từ chối email trống`).
- Sử dụng mã thực tế (tránh dùng mock trừ khi không thể thay thế).

**Xác nhận (BẮT BUỘC):**
- Chạy lệnh test (ví dụ: `npm test path/to/file`).
- Xác nhận test **FAIL** (không phải lỗi cú pháp/crash).
- Thông báo lỗi phải khớp với kỳ vọng (ví dụ: `expected X but got Y`).

### Bước 2: GREEN - Mã tối thiểu
Viết mã vừa đủ để vượt qua bài test.

**Lưu ý:**
- Không thêm tính năng chưa có test.
- Không tối ưu hóa sớm (YAGNI - You Ain't Gonna Need It).
- Không sửa các phần mã không liên quan.

### Bước 3: REFACTOR - Dọn dẹp
Chỉ thực hiện sau khi test đã Green.

**Mục tiêu:**
- Loại bỏ mã trùng lặp.
- Cải thiện tính dễ đọc.
- Tách hàm/helper nếu cần.
- **BẮT BUỘC**: Chạy lại bộ test sau mỗi thay đổi nhỏ để đảm bảo vẫn Xanh.

---

## ⚠️ Các tín hiệu "Báo động đỏ" (Dừng lại và Làm lại)

- [ ] Viết mã trước khi viết test.
- [ ] Test vừa viết xong đã Pass ngay lập tức (không thấy nó Red).
- [ ] Không giải thích được tại sao test lại fail.
- [ ] Thêm test "sau này" hoặc "sau khi xong xuôi".
- [ ] Ngụy biện: "Cái này đơn giản quá không cần test" hoặc "Tôi đã test tay rồi".

---

## 📋 Checklist Xác nhận (Trước khi Hoàn tất)

- [ ] Mọi function/method mới đều có test đi kèm.
- [ ] Đã tận mắt thấy từng test fail trước khi triển khai mã.
- [ ] Test fail đúng lý do (thiếu tính năng, không phải do lỗi gõ máy).
- [ ] Mã nguồn được viết tối thiểu nhất để pass.
- [ ] Toàn bộ bộ test (test suite) hiện tại đều Xanh.
- [ ] Không có lỗi/cảnh báo rác trong output của test.

> [!TIP]
> TDD không làm bạn chậm lại. TDD giúp bạn nhanh hơn bằng cách giảm thời gian debug và ngăn chặn lỗi quay trở lại (regression).
