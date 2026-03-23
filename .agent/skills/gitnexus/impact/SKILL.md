---
name: gitnexus-impact
description: Sử dụng khi cần biết những gì sẽ bị ảnh hưởng nếu thay đổi một phần code, hoặc phân tích độ an toàn trước khi edit.
---

# Phân tích ảnh hưởng với GitNexus

Kỹ năng này giúp xác định "Blast Radius" (vùng ảnh hưởng) của một thay đổi để tránh gây ra lỗi hệ thống (regressions).

## Khi nào nên dùng

- "Thay đổi hàm này có an toàn không?"
- "Những gì phụ thuộc vào module X?"
- "Nếu sửa logic này thì những flow nào bị ảnh hưởng?"
- Trước khi thực hiện các thay đổi lớn (non-trivial changes).
- Trước khi commit code để kiểm tra tác động cuối cùng.

## Quy trình làm việc (Workflow)

1. **Phân tích ngược (Upstream)**: `gitnexus_impact({target: "X", direction: "upstream"})` để xem ai đang gọi/phụ thuộc vào X.
2. **Kiểm tra luồng thực thi**: `READ gitnexus://repo/{name}/processes` để xác định các flow bị ảnh hưởng.
3. **Phân tích thay đổi hiện tại**: `gitnexus_detect_changes()` để map trực tiếp các file đang sửa với các symbols và processes.

## Đánh giá rủi ro (Risk Levels)

| Độ sâu (Depth) | Mức rủi ro | Ý nghĩa |
| :--- | :--- | :--- |
| **d=1** | **CỰC CAO** | Các hàm gọi trực tiếp (Chắc chắn bị ảnh hưởng) |
| **d=2** | CAO | Các hàm gián tiếp (Rất dễ bị lỗi) |
| **d=3** | TRUNG BÌNH | Ảnh hưởng bắc cầu (Cần test kỹ) |

## Công cụ quan trọng

- **gitnexus_impact**: Công cụ chính để xem "blast radius" của một symbol.
- **gitnexus_detect_changes**: So sánh git diff hiện tại với Knowledge Graph để báo cáo rủi ro commit.
