# Quy trình Điều Phối Bot Ngầm (`/agent-fleet`)

> [!IMPORTANT]
> Workflow này sử dụng `agent-manager-skill` để chạy và điều phối các lệnh nền (background daemon).

## Khi nào dùng (When to Use)

- Khi cần cắm Bot theo dõi log, chạy cron job, hoặc audit liên tục.
- Yêu cầu crawl dữ liệu số lượng lớn không muốn block terminal.
- Khởi động Bot Giám Sát Context & Review.

## Các bước thực hiện

### Bước 1: Khởi động Bot Giám Sát Context & Review (Mặc định)
Lệnh này luôn luôn chạy khi hệ thống bắt đầu dự án lớn:
```bash
python3 .agent/skills/agent/agent-manager-skill/scripts/main.py start CONTEXT_WATCHER
python3 .agent/skills/agent/agent-manager-skill/scripts/main.py assign CONTEXT_WATCHER "Liên tục đọc memory_search từ MCP. Nếu Human dev đi chệch khỏi Big Picture, hãy cảnh báo. Bật tính năng của agent-evaluation để soi lỗi file theo thời gian thực."
```

### Bước 2: Giao việc tùy chỉnh cho các Bot khác
- Khởi động: `python3 .agent/skills/agent/agent-manager-skill/scripts/main.py start <BOT_ID>`
- Giao việc: `python3 .agent/skills/agent/agent-manager-skill/scripts/main.py assign <BOT_ID> "<Task Description>"`
- Theo dõi: `python3 .agent/skills/agent/agent-manager-skill/scripts/main.py monitor <BOT_ID> --follow`

## Hỗ trợ
Sử dụng script Python đi kèm thư viện manager để stop hoặc check status.
