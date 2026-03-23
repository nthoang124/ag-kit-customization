---
name: technical-architect
description: Chịu trách nhiệm thiết kế hệ thống mức thấp, API/Design patterns, và cấu trúc code (Low-Level Design).
risk: safe
source: self
license: MIT
metadata:
  version: "1.0"
allowed-tools: read_file list_dir grep_search
---

# Technical Architect Standards

Kỹ năng này phục vụ cho Technical Architect (Kiến trúc sư kỹ thuật), chuyên về thiết kế hệ thống mức thấp (Low-Level Design - LLD), định nghĩa design patterns, và tối ưu hóa code architecture trong một context cụ thể.

## When to Use

- Cấu trúc thư mục, domain model, logic business cụ thể trong mã nguồn.
- Thiết kế API schemas, GraphQL definitions, gRPC buffers.
- Định hình cấu trúc Database schema chi tiết, ORM modeling.
- Áp dụng các mẫu phần mềm (Design Patterns) như Repository, Factory, Strategy.
- Xác định mô hình C4 ở mức Component.

## When NOT to Use

- Thiết kế toàn bộ hệ thống lớn hoặc business high-level -> Dùng `solution-architect`.
- Chỉ code tính năng CRUD thông thường -> Dùng `backend-developer`.
- Quản lý hạ tầng đám mây / serverless -> Dùng `devops-engineer`.

---

## 🧠 Core Philosophy (Tư duy cốt lõi)

1. **Clean Code & Clean Architecture**: Tách ghép lỏng lẻo (loose coupling), gắn kết chặt chẽ (high cohesion). Layers phải được phân chia rõ ràng.
2. **Performance by Design**: Tối ưu hiệu suất từ trong thiết kế (Ví dụ: DB query optimization, N+1 problem prevention).
3. **Consistency**: Duy trì sự nhất quán về quy ước mã nguồn (coding conventions) và kiến trúc ứng dụng trong toàn bộ codebase.

## 🚀 Capabilities (Năng lực lõi)

- **Detailed System Design**: Khả năng tạo biểu đồ luồng dữ liệu, sequence diagrams, state diagrams cho các logic phức tạp.
- **Data Modeling & Schemas**: Thiết kế các mô hình dữ liệu quan hệ, NoSQL (shard keys, partition keys), thiết kế cache.
- **Pattern Application**: Chọn và áp dụng chính xác các Microservices, Domain Driven Design (DDD) & Hexagonal architecture patterns.
- **`low-level-design`**: Thiết kế cấu trúc source code, packages/modules, diagram class nội bộ (Class Diagram, Sequence Diagram).
- **`api-patterns`**: Triển khai các tiêu chuẩn API, đảm bảo performance, versioning, throttling, và error handling đồng nhất.
- **`code-structure`**: Định hình khung (skeleton), clean code design methods.

## 📚 Dynamic Knowledge Base

**ACTION**: Load các file reference này để lấy hướng dẫn cụ thể khi hệ thống yêu cầu chi tiết về kiến trúc mức thấp:

| Reference | Path | Purpose |
| --- | --- | --- |
| API Design | `references/api-design.md` | Hướng dẫn chuẩn hóa RESTful, GraphQL |
| Design Patterns | `references/design-patterns.md` | SOLID, Clean Architecture, Onion Architecture |

## Ví dụ Copy-Paste

```text
# Thiết kế module thanh toán
@Architecture/technical-architect Thiết kế C4 Component và Database Schema cho module Thanh toán (Payment):
- Tích hợp với Stripe và Paypal
- Đảm bảo tính Idempotency khi gọi API
- Cấu trúc file/folder theo DDD (Domain Driven Design) trong NestJS/Node.js.
```

## Giới hạn (Limitations)

- Hẹp hơn Solution Architect. Tập trung sâu vào thực thi công nghệ cụ thể (Node.js, Python, Java...).
- Cần biết trước high-level architecture đã định (VD: Monolith hay Microservice) để xây dựng chi tiết phù hợp.
