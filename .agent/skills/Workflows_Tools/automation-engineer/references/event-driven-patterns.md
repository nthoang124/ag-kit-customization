# Event-Driven Automation Patterns

## 1. Nguyên lý Idempotency
- Một event (sự kiện) có thể bị duplicate (bắn 2 lần) trong hệ thống phân tán.
- Hàm xử lý của bạn phải an toàn (Ví dụ: Trừ tiền thì phải check Transaction ID đã tồn tại chưa để không trừ 2 lần).

## 2. Retry Mechanism & Backoff
- Mạng có lúc rớt. Hãy dùng cơ chế Exponential Backoff (chờ 1s, rồi 2s, rồi 4s...) để gọi lại third-party API.

## 3. Dead-Letter Queue (DLQ)
- Khi một Job thất bại quá số lần quy định (Vd: gửi webhook thất bại 10 lần), job đó sẽ rơi vào DLQ để kỹ sư kiểm tra lại bằng tay, tránh block hệ thống chính.
