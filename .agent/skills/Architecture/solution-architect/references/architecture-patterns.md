# Architecture Patterns Reference

Tài liệu này cung cấp các pattern kiến trúc hệ thống ở mức High-Level dành cho Solution Architect.

## 1. Microservices Architecture
- **Ưu điểm**: Khả năng scale độc lập, tách biệt vòng đời phát triển (independent deployment), linh hoạt công nghệ.
- **Nhược điểm**: Phức tạp trong vận hành (ops), data consistency khó khăn (phân tán), debug khó.
- **Khi nào dùng**: Hệ thống lớn, team lớn (>= 20 người), yêu cầu scale độc lập từng module.

## 2. Event-Driven Architecture (EDA)
- **Ưu điểm**: Loose coupling, dễ dàng mở rộng chức năng mà không ảnh hưởng luồng chính (choreography).
- **Nhược điểm**: Khó tracking logic flow, Eventually Consistent.
- **Khi nào dùng**: Các hệ thống cần xử lý background liên tục, tích hợp third-party, hệ thống booking/payment.

## 3. Modular Monolith
- **Ưu điểm**: Đơn giản lúc đầu, dễ deploy, có ranh giới module rõ ràng. Cân bằng giữa Monolith và Microservices.
- **Khi nào dùng**: Bắt đầu dự án mới, chưa rõ bound contexts, team dưới 10 người.
