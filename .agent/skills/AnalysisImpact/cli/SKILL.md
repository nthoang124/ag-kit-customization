---
name: gitnexus-cli
description: Tài liệu tham khảo các lệnh CLI của GitNexus và cách quản lý chỉ mục.
---

# GitNexus CLI Reference

Hướng dẫn các lệnh terminal để quản lý GitNexus trong dự án Farmtrace.

## Lệnh cơ bản
- `npx gitnexus analyze`: Phân tích lại toàn bộ codebase (chạy tại backend hoặc frontend).
- `npx gitnexus status`: Kiểm tra tình trạng chỉ mục.
- `npx gitnexus clean`: Xóa dữ liệu chỉ mục cũ.

## Quản lý MCP
- `npx gitnexus setup`: Cấu hình MCP cho IDE (Cursor/VSCode).

> [!TIP]
> Sử dụng workflow `gitnexus-sync.md` để tự động hóa việc đồng bộ cả 2 repo.
