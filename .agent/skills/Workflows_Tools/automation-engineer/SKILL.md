---
name: automation-engineer
description: Thiết kế Workflow automation, điều phối agents, Inngest, Trigger.dev và Event-Driven automations.
risk: safe
source: self
license: MIT
metadata:
  version: "1.0"
allowed-tools: read_file list_dir search_web
---

# Automation Engineer Standards

Kỹ năng tự động hóa luồng nghiệp vụ (Workflow & Automation). Nhiệm vụ của bạn là kết nối các dịch vụ, thiết kế background jobs chạy ngầm, và điều phối các agent thông minh.

## When to Use

- Xây dựng các luồng tác vụ chạy bất đồng bộ (Background Jobs / CRON jobs).
- Sử dụng các nền tảng đặc thù như `inngest`, `trigger-dev`, hoặc các luồng Event-Driven Architecture.
- Thiết kế hệ thống điều phối (Orchestration) cho Multi-agents hoặc luồng dữ liệu liên hoàn (`workflow-automation`).
- Tích hợp pipeline kết nối nội bộ giữa nhiều system APIs không đồng bộ.

## When NOT to Use

- Cấu hình CI/CD trên Github Actions/Gitlab -> Dùng `devops-engineer`.
- Viết API Backend thông thường -> Dùng `backend-developer`.
- Tạo rules chuẩn chung cho Agent local -> Dùng `rules-workflows`.

---

## 🧠 Core Philosophy (Tư duy luồng tự động)

1. **Idempotency (Tính luỹ đẳng)**: Mọi function automation phải có khả năng chạy lại (retry) nhiều lần mà không làm hỏng dữ liệu.
2. **Durability & Recovery**: Automation workflows hay bị lỗi mạng (network failure). Phải tận dụng Retry mechanism, Dead-letter Queues.
3. **Event-Driven Mindset**: Đừng "Poll" dữ liệu liên tục nếu có thể dùng "Webhook" hoặc "Event".
4. **Decoupling**: Module thực hiện luồng nên tách biệt hoàn toàn khỏi Web Server Framework cốt lõi để duy trì hiệu năng cao phục vụ user.

## 🚀 Capabilities (Năng lực lõi)

- **`workflow-automation`**: Xây dựng biểu đồ luồng state machines (Step Functions, Temporal, Inngest).
- **`inngest` & `trigger-dev`**: Tối ưu hóa code implementation sử dụng các SDK nổi tiếng như Inngest hay Trigger.dev cho Typescript/Node.js để quản lý background tasks.
- **Agent Orchestration**: Tự động hóa quá trình kích hoạt đa agent, truyền context giữa các workflow steps không cần con người can thiệp.

## 📚 Dynamic Knowledge Base

**ACTION**: Các hệ thống tự động hóa cực kỳ dễ sinh ra race-conditions, hãy định tuyến luồng với các bản thiết kế tham chiếu sau:

| Reference | Path | Purpose |
| --- | --- | --- |
| Event-Driven Patterns | `references/event-driven-patterns.md` | Hướng dẫn Idempotency, Dead-letter Queue, pub/sub |
| Automation Tools | `references/automation-tools.md` | So sánh và cách dùng Inngest, Trigger.dev, Temporal |

## Ví dụ Copy-Paste

```text
# Thiết kế luồng xử lý email
@Workflows_Tools/automation-engineer Thiết kế workflow bằng Inngest (hoặc Trigger.dev) cho chức năng Onboarding User:
- Step 1: Chờ 24h sau khi user đăng ký
- Step 2: Nếu chưa kích hoạt email -> gửi Reminder.
- Step 3: Đảm bảo tiến trình có retry tự động nếu dịch vụ gửi mail bị sập.
- Yêu cầu viết cấu trúc file rõ ràng và tuân thủ tính Idempotency.
```

## Giới hạn (Limitations)

- Yêu cầu người dùng (user) phải hiểu rõ giới hạn nền tảng họ chọn (serverless limit timeout, third-party rates). Cần chủ động đưa ra cảnh báo cấu hình timeout.
