# Architecture Decision Record (ADR)

**Tiêu đề:** [ADR-001] [Tên của quyết định kiến trúc, ví dụ: Sử dụng Kafka cho Message Broker]

## 1. Context (Bối cảnh)
- Mô tả bối cảnh hiện tại của hệ thống.
- Vấn đề kinh doanh (Business problem) hoặc kỹ thuật (Technical problem) đang cần giải quyết là gì?

## 2. Decision (Quyết định)
- Quyết định công nghệ hoặc giải pháp kiến trúc là gì? (Ví dụ: Chúng tôi quyết định sử dụng Apache Kafka thay vì RabbitMQ).

## 3. Rationale (Lý do cốt lõi)
- Giải thích lý do chọn giải pháp này. Tại sao các giải pháp thay thế (Alternatives) lại bị loại bỏ?
- Gắn liền với các Non-Functional Requirements (NFRs) như: Throughput, Latency, Scalability.

## 4. Consequences (Hệ quả)
- **Tích cực (Positive):** Hệ thống được lợi gì? (VD: High throughput, replayable messages).
- **Tiêu cực (Negative/Trade-offs):** Đánh đổi là gì? (VD: Khó vận hành hơn, cần chi phí maintain Kafka cluster).
