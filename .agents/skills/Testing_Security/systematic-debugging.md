---
description: Truy tận gốc rễ nguyên nhân gây lỗi (Root Cause) thay vì chỉ sửa triệu chứng bề mặt.
type: skill
risk: safe
version: "1.0"
---

# 🔍 Truy Tìm Nguyên Nhân Gốc Rễ (Systematic Debugging)

> [!IMPORTANT]
> **Nguyên tắc cốt lõi**: Lỗi thường xuất hiện rất sâu trong chuỗi lời gọi hàm (Call Stack), nhưng nguyên nhân thực sự (Trigger) nằm ở phía trên. Đừng bao giờ chỉ sửa tại nơi lỗi xuất hiện, hãy truy ngược về nguồn gốc.

## 🛠️ Quy trình 5 Bước Truy Tìm

### 1. Quan sát Triệu chứng (Symptom)
Đừng vội sửa ngay. Hãy ghi nhận chính xác lỗi là gì, ở đâu và trong điều kiện nào.
*   *Ví dụ: "Lỗi `git init` thất bại tại thư mục `/project/core`"*

### 2. Tìm Nguyên nhân Trực tiếp (Immediate Cause)
Xác định đoạn mã trực tiếp ném ra lỗi đó.
*   *Ví dụ: `await execFileAsync('git', ['init'], { cwd: directory });`*

### 3. Truy ngược chuỗi lời gọi (Trace Backwards)
Hỏi: "Lệnh này được gọi từ đâu? Với tham số nào?"
*   `WorktreeManager.create()` → gọi bởi `Session.initialize()` → gọi bởi `Test.setup()`.

### 4. Kiểm tra Dữ liệu Đầu vào
Kiểm tra giá trị của các biến tại từng cấp độ.
*   *Ví dụ: Tại sao `directory` lại là chuỗi rỗng `''`? Chuỗi rỗng này bắt đầu từ đâu?*

### 5. Xác định và Sửa tại Nguồn (Original Trigger)
Tìm nơi đầu tiên dữ liệu sai lệch được tạo ra và sửa tại đó. Đồng thời, thêm các lớp phòng thủ (validation) ở các tầng trung gian để lỗi không thể đi sâu như vậy nữa.

---

## 💉 Kỹ thuật Phân tích Stack Trace

Khi không thể truy vết thủ công, hãy thêm mã giám sát (Instrumentation) ngay trước điểm xảy ra lỗi:

```typescript
// Thêm log giám sát trước điểm lỗi
const stack = new Error().stack;
console.error('DEBUG Trace:', {
  expectedDir: directory,
  currentCwd: process.cwd(),
  env: process.env.NODE_ENV,
  stack: stack // Hiển thị toàn bộ chuỗi lời gọi
});

// Chạy lại test và bắt log
// npm test 2>&1 | grep 'DEBUG Trace'
```

> [!TIP]
> Luôn dùng `console.error()` trong môi trường test vì một số hệ thống ghi log (logger) có thể bị chặn hoặc không hiển thị đầy đủ output khi test fail.

---

## 🛡️ Chiến lược Phòng thủ Chiều sâu (Defense-in-Depth)

Sau khi tìm được Root Cause, đừng chỉ sửa 1 dòng. Hãy gia cố hệ thống:
1.  **Tầng Nguồn**: Sửa logic tạo dữ liệu.
2.  **Tầng Trung gian**: Thêm validation (ví dụ: `if (!dir) throw Error`).
3.  **Tầng Thực thi**: Thêm guard check (ví dụ: không cho phép chạy lệnh nguy hiểm ngoài thư mục tạm).

---

## 📋 Checklist Xác nhận (Trước khi Hoàn tất)

- [ ] Tôi đã tìm thấy nơi đầu tiên dữ liệu sai lệch xuất hiện chưa?
- [ ] Tôi đã hiểu tại sao các lớp trung gian lại cho phép dữ liệu sai này đi qua chưa?
- [ ] Tôi đã thêm ít nhất một lớp kiểm tra (validation) mới để ngăn lỗi tương tự chưa?
- [ ] Tôi đã viết một test case tái tạo lại đúng mã lỗi này (Regression Test) chưa?
- [ ] Tôi có đang "sửa triệu chứng" (vá chỗ lỗi hiện ra) thay vì "sửa gốc rễ" không?

> [!WARNING]
> Việc sửa triệu chứng giống như uống thuốc giảm đau cho một vết thương nhiễm trùng. Nó có thể làm bạn thấy ổn lúc này, nhưng hệ thống sẽ sớm hỏng nặng hơn ở nơi khác. **Hãy truy tận gốc.**
