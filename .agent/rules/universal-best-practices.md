---
description: Bộ quy tắc lập trình tổng quát để tránh các lỗi logic, xung đột hạ tầng và bảo mật thường gặp trong các dự án Fullstack.
---

# Universal Coding Standards & Anti-Patterns

> [!IMPORTANT]
> Đây là bộ quy tắc được đúc kết từ thực tế, được rút gọn để tra cứu nhanh. **BẮT BUỘC** áp dụng cho mọi dự án để đảm bảo tính ổn định và tốc độ triển khai.

---

## 🚀 1. Frontend (React / Next.js)

### 1.1. Xử lý Dữ liệu Mảng & Hydration

- **Ngữ cảnh**: Gọi API trả về danh sách, đôi khi API rớt mạng hoặc trả về Pagination Object. Quên bọc Array check gây sập UI.
- ❌ **Anti-Pattern**: Gán trực tiếp `setItems(data)` hoặc dùng `.map()` khi chưa chắc là mảng. Không bọc `suppressHydrationWarning` ở Next.js layout.
- ✅ **Best Practice**:
  - **API Fallback**: Kiểm tra `Array.isArray(data)` hoặc `data.data` (phân trang). Luôn có fallback mảng rỗng `[]`.
  - **Component Fallback**: Ở Table/List UI, dùng `const safeData = Array.isArray(propsData) ? propsData : []`.
  - **Hydration Warning**: LUÔN thêm `suppressHydrationWarning` vào thẻ `<html>` trong `layout.tsx` để extension không làm rớt React.

### 1.2. Mạng & Lỗi Cú Pháp

- **Ngữ cảnh**: Định tuyến API Local và gặp lỗi compile liên quan Regex.
- ❌ **Anti-Pattern**: Đặt host chết (hardcode `localhost:3000/api`) trong request hay Next proxy. Bỏ qua thẻ đóng JSX.
- ✅ **Best Practice**:
  - **Next.js API Proxy**: Dùng biến môi trường `process.env.BACKEND_URL` kèm cổng dự phòng (khác cổng 3000 của frontend).
  - **Syntax Panic**: Gặp lỗi báo cú pháp `Unterminated RegExp`, kiểm tra ngay có mở thẻ quên đóng `</TrongJSX>` không.

### 1.3. Lỗi Build / Cache Hỏng (Turbopack)

- **Ngữ cảnh**: Cấu trúc thư mục `.next` bị hỏng gây ra báo lỗi "backend error" hoặc "corrupted database" ảo.
- ✅ **Best Practice**: Dừng Next.js Dev Server -> Xóa sạch (`rm -rf .next`) -> Chạy lại. Không đi dò tìm ở Database hay phía Backend.

---

## ⚙️ 2. Backend & Middleware (NestJS / Express)

### 2.1. Xác thực & Phân quyền (Auth / Guard)

- **Ngữ cảnh**: Middleware/Guards yêu cầu kiểm tra token và logic bảo mật sâu xuống DB truy vấn.
- ❌ **Anti-Pattern**: Viết Guard đâm thẳng xuống DB mà không bọc Optional (ép `user.organizationId!`). Lờ đi cờ `isSuperAdmin`. Lặp lặp redirect ở frontend khi Auth store chưa tải xong.
- ✅ **Best Practice**:
  - **Super Admin Bypass**: Trong Guard, phải kiểm tra nhánh ưu tiên `if (user.isSuperAdmin) return true;` ngay từ đầu.
  - **Safe Context**: Phải Null check các tham số context trước khi đưa Query vào ORM.
  - **NestJS Passport Guard**: Gỡ bỏ Validation pipe `@Body() loginDto` nếu đang dùng `LocalAuthGuard` (vì Passport tự parse payload).

### 2.2. WebSockets & Real-time

- **Ngữ cảnh**: Client gửi tin và nhận trả về từ Server qua WebSocket.
- ❌ **Anti-Pattern**: Dùng `server.to(room).emit()` (bắn cho cả người vừa gửi thông tin), khiến giao diện bị lặp 2 cục dữ liệu tự sinh.
- ✅ **Best Practice**: Dùng `socket.to(room).emit()` chỉ gửi cho NGƯỜI KHÁC. Phía client LUÔN kiểm tra trùng lặp ID (Duplicate Check).

### 2.3. Upload File qua HTTP

- **Ngữ cảnh**: Client FormData upload file bị lỗi Backend từ chối do khuyết Multi-part boundary.
- ❌ **Anti-Pattern**: Tự gán header `Content-Type: multipart/form-data` thủ công ở thiết lập Axios.
- ✅ **Best Practice**: Để TRỐNG rỗng cấu hình header `Content-Type` khi gửi gói FormData. Trình duyệt tự sinh chuỗi Token Boundary chống hỏng file gốc.

---

## 🗄️ 3. Database & Schema (Prisma)

### 3.1. Đồng bộ Schema & Push Code

- **Ngữ cảnh**: Sửa đổi bảng DB (`schema.prisma`) nhưng không tuân thủ luồng, dẫn tới Crash Windows Lock hoặc Schema Drift lúc lệnh Push chạy.
- ❌ **Anti-Pattern**: Chạy `db push` trong khi Dev server đang start. Lạm dụng `db push` ở dự án đã có thư mục Migrations.
- ✅ **Best Practice**:
  - **(Windows) Lock**: TẮT Terminal Server -> Chạy `db push` hoặc `generate` -> Mở server lại. Tránh lỗi đứt gãy EPERM Lock.
  - **Schema Drift**: TUYỆT ĐỐI không push file migrations (`migration.sql`) trống rỗng lên Git. Luôn cập nhật Schema bằng lệnh `prisma migrate dev --name <feature>`.

### 3.2. Dữ liệu Đầu vào (DTO & Seeding)

- **Ngữ cảnh**: DTO gửi rác dư thừa xuống Prisma và DB Seed tự sập app.
- ❌ **Anti-Pattern**: DTO Frontend lồng nhau sâu (Nested object) thả thẳng vô Prisma Query phẳng. API Seed cài Data trùng đâm khóa Unique.
- ✅ **Best Practice**:
  - **Flattening DTO**: "Làm phẳng" DTO trước khi gọi lưu qua Prisma, bảo đảm khớp 1:1 định dạng của Schema ORM.
  - **Seed deduplication**: Dữ liệu đưa vào vòng lặp Upsert/Insert phải được sàng lọc Deduplicated và gắn Try-Catch để in log dạng JSON lỗi cho TỪNG bản ghi thay vì in chung ở hàm gốc.
  - **Root Account**: File Seed LUÔN phải tạo sẵn ít nhất 1 account mang Role `SUPER_ADMIN`.
  - **ID Types**: Đảm bảo kiểu định dạng Mock Dữ liệu Frontend (`string UUID` hay `number`) tuân thủ tuyệt đối Types của Database/DTO.

---

## 🐳 4. Dev Flow & Infrastructure (Quy trình)

### 4.1. Mạng lưới, Post & Môi trường Container

- **Ngữ cảnh**: Lỗi treo tĩnh EADDRINUSE, Docker Backend không tìm được host DB vì nhầm chéo Gateway hay ứng dụng frontend tự kỷ vòng lặp trên local.
- ❌ **Anti-Pattern**: Cả Frontend/Backend cài xài chung cổng `3000`. Gọi proxy API vào thẳng hardcode DB localhost.
- ✅ **Best Practice**:
  - **Tách Cổng**: Mặc định Next.js/Vite (3000), NestJS/Express (5000/8000). Luôn đi kèm Env chéo: Frontend trỏ biến `BACKEND_URL` sang cổng Backend.
  - **Tích hợp Internal Docker Env**: Trong cấu hình Compose `docker-compose.yml`, khai báo trực tiếp service hostname vào Env biến `BACKEND_URL: http://backend:5000` thay vì map local. Tách biệt `.env` chạy host máy tính và trên Container.
  - **Auth Sync**: Token xác thực đăng nhập PHẢI nằm mặt định ở hai môi trường: Cookie (Server-side/Middleware) và Global Store (Client-side Web App). Tích hợp "Quick Login" thẳng ở màn Dev.

### 4.2. TypeScript & Cấu Hình Thư Viện (NPM)

- **Ngữ cảnh**: Cài thư viện sụp npm ERR tree, Typescript bắn lỗi undefined lúc Runtime. Eslint ngắt biên dịch do lời hứa Promies ảo.
- ❌ **Anti-Pattern**: Quét chạy bừa cờ `--force` hoặc `--legacy-peer-deps`. Dùng bừa `any` để tắt dòng kẻ đỏ. Tranh cãi floating promise.
- ✅ **Best Practice**:
  - **Giải mã NPM Conflict**: Đọc Log, fix đúng Version Major của Peer Dependency thay vì bypass. Nhớ xóa lock file rồi Install lại sạch.
  - **Typing Code Chặt (Type Guard)**: Thêm Optional Chaining (`?.`). Cấm dùng thư giãn kiểu `any`, hãy cast bằng `unknown` nếu muốn an toàn biến thiên hoặc nhận Type Built-in (VD `Prisma.UserWhereInput`).
  - **Xóa Nợ Lời Hứa**: Bọc Function call có trả promise nổi mà không dùng await/catch vào loại tag `void ` (VD: `void runCodeAsync()`).
  - **Docker Alpine Check**: Code Heathcheck nên rũ bỏ tool thừa, hãy thay `curl` bằng test command Node.js `node -e "require('http').get(...)"`

---

## ✅ Checklist Kiểm soát Nhanh (Q/A Gate)

- [ ] (Front) Kết quả Data gọi API ra đã được bọc `Array.isArray()` hay làm Fallback mảng rỗng phòng sập UI chưa?
- [ ] (Front) Các Object nullable có được bọc `?.` optional chaining không?
- [ ] (Front) Frontend `layout.tsx` thiết lập `suppressHydrationWarning` chống vỡ DOM extension chưa?
- [ ] (Front) Frontend Router/RBAC đã dùng trạng thái chờ (`isLoading`) trước khi ném ra lệnh chuyển hướng đăng nhập chưa?
- [ ] (Mạng) Ở `.env`, port Backend có trùng Frontend không (phải khác giải)?
- [ ] (Mạng) Axios multipart form gửi request được để trống (không thiết lập config `Content-Type`) để nhường trình tự xử lý sinh Boundary của Request tích hợp chưa?
- [ ] (Sys) File Docker compose đã khai biến `BACKEND_URL` mang mặt chữ Container backend chuẩn thay vì localhost rỗng chưa?
- [ ] (Sys) Token đăng xuất/đăng nhập đã được Sync thả Cookie và Store chung bộ nhớ cục bộ chưa?
- [ ] (Auth) Cấu trúc Guard (VD `RolesGuard`) có nhánh cờ bypass check Pass dành cho user mang Role `Super Admin` chưa?
- [ ] (Auth) NestJS Auth đã gỡ bỏ `@Body() Dto` cục bộ khi xài cùng chung hàng phòng vệ với Passport `LocalAuthGuard` chưa?
- [ ] (WebSockets) Event bắn đi Broadcast đã loại trừ người nói thông qua dòng `.to()` (`socket.to`) tránh duplicate message ở UI chưa?
- [ ] (DB) Mọi file `.sql` xuất trình trong thư mục migrations đã chắc chắn mang xác minh lệnh không bị rỗng chưa?
- [ ] (DB) Cập nhật Data Seed, Object ném vô list đã gỡ bỏ trùng lặp Duplicate và khóa cứng Try-Catch in log chưa?
- [ ] (DB) Gọi Terminal update Database Schema (`db push`) đã ngắt Server App Backend trước khi chạy để khỏi EPERM lỗi khoá Windows DLL chưa?
- [ ] (Tech) Nợ Floating promises ở code TSX/JSX (không có `await` và không có `.catch`) đã được gán nhãn `void` để loại trừ error log của ESLint chưa?
