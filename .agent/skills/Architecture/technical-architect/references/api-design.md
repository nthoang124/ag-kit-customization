# API Design Guidelines

## 1. RESTful Nguyên Bản
- Sử dụng Resource làm trung tâm: User (`/users`), Post (`/posts`).
- HTTP Methods đúng chuẩn: GEt (Read), POST (Create), PUT/PATCH (Update), DELETE (Delete).
- Response Status Code: 
  - 200 OK, 201 Created, 204 No Content.
  - 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found.
  - 500 Internal Server Error.

## 2. GraphQL vs REST
- Chọn REST cho các luồng đơn giản, server-to-server.
- Chọn GraphQL cho UI-driven, khi client cần thiết kế data linh hoạt hoặc giải quyết over-fetching/under-fetching.

## 3. Rate Limiting & Throttling
- Phải có logic giới hạn lượt Request để chống DDoS và Abuse API (ví dụ 100 req/phút/IP).
