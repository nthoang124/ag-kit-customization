---
description: Bộ quy tắc lập trình tổng quát để tránh các lỗi logic, xung đột hạ tầng và bảo mật thường gặp trong các dự án Fullstack.
---

# Universal Coding Standards & Anti-Patterns

> [!IMPORTANT]
> Đây là bộ quy tắc được đúc kết từ thực tế. **BẮT BUỘC** áp dụng cho mọi dự án để đảm bảo tính ổn định và tốc độ triển khai.

---

## 1. Kết nối Frontend - Backend (API Handling)

### 🔴 Quy tắc trích xuất dữ liệu (Extraction Rule)
Khi làm việc với các API có phân trang (Pagination), dữ liệu thường nằm trong một lớp bọc (wrapper).
- **Anti-Pattern**: Gán trực tiếp `data` (object response) vào `state` (mảng). Gây lỗi `.map() is not a function`.
- **Best Practice**: LUÔN kiểm tra cấu trúc mảng và trích xuất `data.data` hoặc dùng mảng rỗng `[]` làm fallback.

```typescript
// ❌ Tránh
const { data } = await api.get('/items');
setItems(data); 

// ✅ Khuyên dùng
const { data } = await api.get('/items');
setItems(Array.isArray(data) ? data : data.data || []);
```

---

## 2. Quản lý Hạ tầng (Port & Environment)

### 🔴 Quy tắc phân tách Port (Port Separation)
Để tránh lỗi `EADDRINUSE`, tuyệt đối không khai báo Frontend và Backend chạy cùng một giải port mặc định (ví dụ 3000).
- **Standard**: 
  - **Frontend**: Port `3000` (Next.js / Vite).
  - **Backend**: Port `5000` hoặc `8000`.
- **Environment**: LUÔN đặt cấu hình API URL trỏ chính xác về port của Backend trong file môi trường (`.env.local`).

---

## 3. Xác thực & Phân quyền (Auth Strategy)

### 🟡 Quy tắc Đồng bộ Session (Auth Sync Rule)
Trong các framework như Next.js, `Middleware` chạy ở Server không truy cập được dữ liệu Client (như `localStorage`).
- **Best Practice**: Token xác thực PHẢI được đồng bộ ở hai nơi:
  1. **Cookie**: Phục vụ Middleware/Server-side.
  2. **Global Store (Zustand/Redux)**: Phục vụ Web App/Client-side.

---

## 4. Dữ liệu & Database (Seeding & Schema)

### 🟡 Quy tắc "Schema First"
Tránh viết Code Seed dựa trên phán đoán.
- **Strict Rule**: Trước khi tương tác DB hoặc viết Migration, PHẢI đọc lại Schema hiện tại (`schema.prisma`, `init.sql`, v.v.). 
- Tuyệt đối không gán các trường không có trong Schema vào lệnh Insert.

---

## 5. Phát triển Thử nghiệm (Quick Login Demo)

### 🟢 Quy tắc "Fast Access"
Việc nhập login thủ công hằng ngày làm giảm hiệu năng phát triển.
- **Requirement**: LUÔN tích hợp nút **"Quick Login"** tại trang đăng nhập trong môi trường Dev. Dữ liệu này phải khớp tuyệt đối với DB Seed.

---

## checklist Kiểm soát Chất lượng (Universal)

- [ ] API Response đã được trích xuất mảng chưa?
- [ ] Port Backend đã khác Frontend chưa?
- [ ] Token đã hiện diện trong cả Cookie và Store chưa?
- [ ] Dữ liệu Seed đã khớp 100% với Database Schema chưa?
- [ ] Đã có cơ chế đăng nhập nhanh cho các Role phục vụ test chưa?
