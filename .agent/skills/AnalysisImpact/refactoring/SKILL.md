---
name: gitnexus-refactoring
description: Kỹ năng sử dụng GitNexus để tái cấu trúc mã nguồn an toàn (Rename, Extract, Split).
---

# GitNexus Refactoring Skill

Sử dụng Knowledge Graph để đảm bảo việc thay đổi cấu trúc code không phá vỡ các phần khác của hệ thống.

## Các quy tắc an toàn
- **Đổi tên (Rename)**: Luôn sử dụng `gitnexus_rename` thay vì tìm-và-thay-thế thủ công.
- **Trích xuất (Extract/Split)**: Kiểm tra `gitnexus_impact` trước khi tách một hàm lớn.

## Quy trình thực hiện
1. **Phân tích**: Xem `gitnexus_context` để hiểu sự phụ thuộc.
2. **Chạy thử**: `gitnexus_rename(..., dry_run: true)`.
3. **Thực thi**: `gitnexus_rename(..., dry_run: false)`.
4. **Xác minh**: `gitnexus_detect_changes()` để kiểm tra phạm vi ảnh hưởng.
