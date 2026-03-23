# Automation & Orchestration Tools

## 1. Inngest
- Là nền tảng dựa trên luồng sự kiện (Event-driven background jobs) không cần Serverless queue phức tạp.
- Sử dụng hàm `inngest.createFunction`, định nghĩa sự kiện kích hoạt (e.g. `user.created`).
- Support các hàm built-in mạnh như `step.sleep('2 days')`, `step.waitForEvent`.

## 2. Trigger.dev
- Nền tảng Background Job chú trọng vào Long-running tasks và Webhooks cho môi trường Typescript.
- Thích hợp các Job kết nối với Shopify, Stripe, GitHub mà không lo Serverless timeout.

## 3. Temporal
- Chuẩn công nghiệp cho Stateful Workflows.
- Mọi biến số trong function đều được lưu state lại vào Database. 
- Học curve cao, cần setup backend riêng (Go, Java, TS). Thích hợp hệ thống cực lớn như Uber, Netflix.
