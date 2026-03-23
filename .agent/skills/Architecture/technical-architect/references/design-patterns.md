# Clean Architecture & Design Patterns

## 1. Clean Architecture (Hexagonal / Onion)
Nguyên tắc:
- Mọi Interface, Frameworks (Web, UI) nằm ở vòng ngoài cùng.
- Business Logic (Entities, Use Cases) nằm ở vòng trong cùng (Core).
- Dependencies chỉ trỏ vào trong (từ ngoài vào trong). Cốt lõi hệ thống không được phụ thuộc vào external libraries.

## 2. SOLID Principles
- **S**ingle Responsibility: Một class/hàm chỉ làm một việc.
- **O**pen/Closed: Class có thể mở rộng nhưng không được sửa code cũ (dùng Interface/Polymorphism).
- **L**iskov Substitution: Class con luôn có thể thay thế class cha mà không phá vỡ tính đúng đắn.
- **I**nterface Segregation: Tạo nhiều Interface nhỏ thay vì một Interface lớn đa năng.
- **D**ependency Inversion: High-level modules không nên phụ thuộc Low-level modules. Cả hai nên phụ thuộc vào abstractions.
