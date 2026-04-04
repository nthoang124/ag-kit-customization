---
description: Hướng dẫn thiết kế kiến trúc phần mềm chất lượng dựa trên Clean Architecture và Domain-Driven Design (DDD).
type: skill
risk: safe
version: "1.0"
---

# 🏗️ Kiến trúc Phần mềm & Tư duy Thiết kế (Architecture & Design)

> [!IMPORTANT]
> **Mục tiêu**: Xây dựng hệ thống dễ bảo trì, dễ mở rộng và độc lập với các framework/công cụ bên ngoài. Mọi dòng mã tùy chỉnh (custom code) đều là một gánh nặng bảo trì; hãy ưu tiên sử dụng các giải pháp đã có trước khi tự viết mới.

---

## 📐 Nguyên tắc Triển khai Mã nguồn

1.  **Early Return Pattern**: Luôn ưu tiên trả về sớm (early return) để tránh các khối điều kiện lồng nhau (deep nesting), giúp mã nguồn dễ đọc hơn.
2.  **Phân tách hàm/component**: 
    - Một hàm không nên dài quá **50-80 dòng**. Nếu dài hơn, hãy chia nhỏ.
    - Một file không nên dài quá **200 dòng**. Nếu vượt quá, hãy cân nhắc tách file.
3.  **Hạn chế lồng ghép**: Tránh lồng các khối logic quá 3 cấp (max 3 levels).

---

## 🚀 Chiến lược "Thư viện là trên hết" (Library-First)

**LUÔN LUÔN tìm kiếm giải pháp có sẵn trước khi tự viết code tùy chỉnh.**
- Kiểm tra `npm` hoặc các thư viện phổ biến xử lý vấn đề tương tự.
- Đánh giá các dịch vụ/SaaS/API bên thứ ba.
- *Ví dụ: Dùng `cockatiel` cho logic retry thay vì tự viết vòng lặp `while` phức tạp.*

**Chỉ viết mã tùy chỉnh khi:**
- Logic nghiệp vụ (Business Logic) đặc thù và duy nhất của dự án.
- Yêu cầu hiệu năng cực cao mà thư viện không đáp ứng được.
- Các yêu cầu bảo mật nhạy cảm cần kiểm soát toàn bộ mã nguồn.

---

## 🏛️ Clean Architecture & DDD

1.  **Độc lập Framework**: Giữ logic nghiệp vụ (Domain/Core) không phụ thuộc vào framework (Next.js, Express, v.v.) hoặc cơ sở dữ liệu.
2.  **Ubiquitous Language**: Sử dụng ngôn ngữ thống nhất từ nghiệp vụ vào trong tên hàm, tên biến (Ví dụ: `OrderCalculator`, `InvoiceGenerator`).
3.  **Phân tách trách nhiệm (Separation of Concerns)**:
    - **KHÔNG** trộn lẫn logic nghiệp vụ vào UI components.
    - **KHÔNG** viết truy vấn database trực tiếp trong Controllers/Routes.
    - Giữ ranh giới rõ ràng giữa các Domain Context (Bounded Context).

---

## 🚫 Các Anti-Patterns cần tránh

- **Hội chứng "Not Invented Here" (NIH)**: Đừng tự xây dựng hệ thống Auth nếu đã có Supabase/Auth0; đừng tự viết State Management nếu đã có Redux/Zustand.
- **Generic Naming**: Tránh đặt tên chung chung vô nghĩa như `utils.js`, `helpers.js`, `common/shared.js`. Hãy đặt tên theo chức năng nghiệp vụ cụ thể.
- **Thùng rác Misc**: Tránh tạo các file như `misc.js` để chứa hàng chục hàm không liên quan đến nhau.

---

## 📋 Checklist Kiểm tra Kiến trúc

- [ ] Hàm này có đang làm quá nhiều việc không? (Single Responsibility)
- [ ] Tôi có thể dùng thư viện nào thay thế đoạn mã này không?
- [ ] Tên biến/hàm có phản ánh đúng ngôn ngữ nghiệp vụ không?
- [ ] Logic này có bị dính chặt vào framework hoặc database không?
- [ ] Tôi đã tránh được việc lồng ghép logic quá sâu chưa?

> [!TIP]
> Một kiến trúc tốt là một kiến trúc cho phép bạn trì hoãn các quyết định về công cụ (DB, Framework, UI) càng lâu càng tốt. **Logic nghiệp vụ là trái tim của hệ thống.**
