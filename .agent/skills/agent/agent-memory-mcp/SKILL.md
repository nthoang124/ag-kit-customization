---
name: agent-memory-mcp
description: "Một hệ thống bộ nhớ lai ghép cung cấp khả năng lưu trữ tri thức lâu dài, có thể tìm kiếm được dành cho các AI agents (Bao gồm Architecture, Patterns, Decisions)."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Kỹ Năng Bộ Nhớ Agent (Agent Memory Skill)

Kỹ năng này cung cấp một ngân hàng tri thức lưu trữ bền vững, có thể tìm kiếm và tự động đồng bộ hóa với tài liệu của dự án. Nó được chạy dưới dạng một Máy Chủ MCP (MCP server) cho phép đọc/ghi/tìm kiếm các ký ức dài hạn.

## Môi trường Yêu cầu (Prerequisites)

- Node.js (v18+)

## Cài đặt (Setup)

1. **Clone mã nguồn (Clone the Repository)**:
   Clone dự án `agentMemory` vào workspace của agent hoặc thư mục song song:

   ```bash
   git clone https://github.com/webzler/agentMemory.git .agent/skills/agent-memory
   ```

2. **Cài đặt thư viện (Install Dependencies)**:

   ```bash
   cd .agent/skills/agent-memory
   npm install
   npm run compile
   ```

3. **Chạy MCP Server (Start the MCP Server)**:
   Sử dụng script hỗ trợ để kích hoạt ngân hàng trí nhớ cho dự án hiện tại của bạn:

   ```bash
   npm run start-server <project_id> <đường_dẫn_tuyệt_đối_tới_target_workspace>
   ```

   _Ví dụ cho thư mục hiện tại:_

   ```bash
   npm run start-server my-project $(pwd)
   ```

## Năng lực (Capabilities / MCP Tools)

### `memory_search` (Tìm Kiếm Ký Ức)

Tìm kiếm trí nhớ theo câu lệnh (query), thể loại (type), hoặc từ khóa (tags).

- **Biến Args**: `query` (chuỗi string), `type?` (string), `tags?` (mảng string[])
- **Ví dụ Sử dụng**: "Hãy tìm mọi mẫu thiết kế xác thực authentication" -> `memory_search({ query: "authentication", type: "pattern" })`

### `memory_write` (Ghi Nhớ Mới)

Ghi nhận các tri thức hoặc quyết định mới nảy sinh.

- **Biến Args**: `key` (string), `type` (string), `content` (string), `tags?` (string[])
- **Ví dụ Sử dụng**: "Lưu lại quyết định architecture này" -> `memory_write({ key: "auth-v1", type: "decision", content: "..." })`

### `memory_read` (Đọc Ký Ức)

Trích xuất/Kéo nội dung bộ nhớ cụ thể định danh bởi một khóa `key`.

- **Biến Args**: `key` (string)
- **Ví dụ Sử dụng**: "Lấy sơ đồ thiết kế Auth ra xem" -> `memory_read({ key: "auth-v1" })`

### `memory_stats` (Thống kê Trí Nhớ)

Xem phân tích đo lường hiệu suất lưu giữ / đọc nhớ.

- **Ví dụ Sử dụng**: "Cho xem thống kê dung lượng bộ nhớ" -> `memory_stats({})`

## Bảng Điều Khiển (Dashboard)

Kỹ năng này đi kèm với một Dashboard UI chạy độc lập giúp trực quan hóa việc bot đang nhớ gì.

```bash
npm run start-dashboard <đường_dẫn_tuyệt_đối_tới_target_workspace>
```

Vào xem tại: `http://localhost:3333`

## Khi Nào Sử Dụng (When to Use)
Kỹ năng này áp dụng để thực thi các workflow lưu trữ ký ức hoặc các hành động được mô tả trong phần tổng quan.
