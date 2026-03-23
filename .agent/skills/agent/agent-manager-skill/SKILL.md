---
name: agent-manager-skill
description: "Quản lý nhiều CLI agent tại máy (local) thông qua các tmux sessions (khởi động/dừng/theo dõi/giao việc) hỗ trợ cả thiết lập lịch trình với cron."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Kỹ năng Quản lý Agent (Agent Manager Skill)

## Khi Nào Sử Dụng (When to Use)
Sử dụng kỹ năng này khi bạn cần:

- Chạy nhiều CLI agent ở máy cùng lúc (thông qua các tmux sessions tách biệt).
- Khởi động/dừng (start/stop) agent và đọc log theo thời gian thực (tail logs).
- Phân công nhiệm vụ cho các agent và theo dõi đầu ra.
- Lên lịch các công việc định kỳ mang tính lặp lại cho agent (bằng cron).

## Yêu cầu cài đặt (Prerequisites)

Cài đặt `agent-manager-skill` trong workspace của bạn:

```bash
git clone https://github.com/fractalmind-ai/agent-manager-skill.git
```

## Các lệnh thường dùng (Common commands)

```bash
python3 agent-manager/scripts/main.py doctor
python3 agent-manager/scripts/main.py list
python3 agent-manager/scripts/main.py start EMP_0001
python3 agent-manager/scripts/main.py monitor EMP_0001 --follow
python3 agent-manager/scripts/main.py assign EMP_0002 <<'EOF'
Follow teams/fractalmind-ai-maintenance.md Workflow
EOF
```

## Ghi chú (Notes)

- Yêu cầu phải có `tmux` và `python3` cài sẵn trên môi trường.
- Các Agent được cấu hình bên trong thư mục `agents/` (xem repository ở link git clone để có các file ví dụ cấu hình).
