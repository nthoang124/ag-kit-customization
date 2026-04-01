---
description: Giao thức hệ thống tự động khởi tạo và điều phối các Bot chạy ngầm (Background Daemons).
type: protocol
risk: safe
version: "1.1"
inputs: ["BOT_ID", "Mô tả Task/Prompt"]
outputs: ["Logs", "Artifacts phân tích"]
context_from: ["/code", "/development", "/implement-feature"]
context_to: ["/code-review", "/qa"]
context_artifacts:
  receives: ["task.md", "implementation_plan.md"]
  produces: ["audit-report.md", "context-warning.md"]
---

# 🤖 Giao thức Điều Phối Bot Ngầm (Agent Fleet Protocol)

> [!IMPORTANT]
> Đây là file meta hệ thống (System Protocol). Tương tự như `_workflow-protocol.md`, Agent tự động tuần tự áp dụng các quy tắc này để điều phối đa luồng.
> **Môi trường Windows**: Đặc biệt lưu ý sử dụng `python` thay vì `python3`. Lệnh quản lý script `agent-manager` nguyên bản dùng `tmux`, vì vậy nếu không chạy bằng WSL, hãy sử dụng cơ chế Windows Background Process (hoặc `Start-Process`).

## 1. Mặc định khởi chạy (Context Watcher)

Khi bắt đầu các tác vụ lớn, Agent có quyền (và nên) chủ động bật luồng giám sát ngầm. Nếu kỹ năng `agent-manager` chưa được cài đặt, Agent phải tự động thiết lập.

### 1.1 Khởi tạo công cụ Quản lý Agent
Nếu script quản lý chưa tồn tại tại thư mục công cụ cục bộ:
```bash
git clone https://github.com/fractalmind-ai/agent-manager-skill.git .agent/tools/agent-manager
```

### 1.2 Gán việc cho CONTEXT_WATCHER
Thay vì các dòng lệnh chung chung, bạn PHẢI cấp cho bot ngầm này một Payload đầy đủ 3 nghiệp vụ lõi:

```bash
# Trên Windows Native (không có tmux), có thể khởi tạo tiến trình Python song song thay thế:
Start-Process python -ArgumentList ".agent/tools/agent-manager/scripts/main.py assign CONTEXT_WATCHER '
SYSTEM INSTRUCTION BẮT BUỘC CHO CONTEXT WATCHER:
1. Kiểm soát Context: Phân tích file task.md và implementation_plan.md liên tục. Nếu bot chính đi sai hướng so với Big Picture, hãy ghi vào file context-warning.md.
2. Kiểm tra Logic Chéo (Cross-file Logic Check): Theo dõi file bot chính đang thao tác. Nếu file A thay đổi logic/chữ ký hàm, lập tức kiểm tra file B, C chứa mã phụ thuộc và cảnh báo break change.
3. Main Agent Auditor: Hoạt động như một Senior Reviewer song song. Đánh giá mã bot chính viết ra xem có lỗ hổng bảo mật, lỗi performance, hay vi phạm yêu cầu không.
Ghi mọi cảnh báo/nhận xét vào audit-report.md hoặc terminal output để bot chính theo dõi.
'" -NoNewWindow
```
*(Lưu ý: Nếu hệ thống đang dùng WSL/Linux đầy đủ tính năng, có thể dùng trực tiếp `python3 .agent/tools/agent-manager/scripts/main.py start CONTEXT_WATCHER` theo định dạng tmux mặc định).*

## 2. Lệnh Giao Việc Tùy Chỉnh (Sub-Agents)
Khi Agent cần thao tác song song (crawl data, check log) không làm kẹt (block) terminal chính:
- **Khởi động**: `python .agent/tools/agent-manager/scripts/main.py start <BOT_ID>`
- **Giao việc**: `python .agent/tools/agent-manager/scripts/main.py assign <BOT_ID> "<Mô tả chi tiết Task>"`
- **Monitor log**: `python .agent/tools/agent-manager/scripts/main.py monitor <BOT_ID> --follow`

---

## Context Protocol

### Nhận Context (Input)
- **Từ `{{args}}`**: Command khởi chạy chứa `<BOT_ID>` và Payload/Prompt cực kỳ chi tiết truyền nội tuyến cho Agent Manager.
- **Từ filesystem (`context_artifacts.receives`)**: Bot ngầm luôn bắt đầu bằng việc đọc `task.md` và `implementation_plan.md` của thư mục root workspace để nắm "Big Picture".

### Truyền Context (Output)  
- **Cho workflow hoặc Bot chính (`context_artifacts.produces`)**: Ghi nhận cảnh báo lệch Context vào `context-warning.md` hoặc ghi lỗi review vào `audit-report.md`. Bot chính cần thiết lập check định kỳ hoặc lắng nghe notification từ các file này.

### Fallback
- Nếu không thể spawn được process bot ngầm do sự cố hệ điều hành (thiếu WSL/tmux/môi trường Python ảo chưa kích hoạt): Agent sẽ tự fallback thiết lập task chạy ngầm cơ bản bằng built-in tool, hoặc tiếp tục xử lý ở single-thread mode.

---

## Error Recovery

> Tuân thủ quy tắc 3 cấp độ: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Lệnh `python` lỗi hoặc thiếu môi trường ảo | Thử dùng đường dẫn Python tuyệt đối tới virtual env của dự án. | Xóa thư mục `.agent/tools/agent-manager` clone lại. | Báo User: `Môi trường Python lỗi, không bật được Agent Fleet?` |
| Quên clone repo `agent-manager-skill` | Tự động chạy `git clone` tạo thư mục gốc cho script | → Thử Giao việc lại | Thông báo User |
| Bot bị treo, văng thư mục hoặc tạo file rác | Gửi lệnh `reset`/`stop` ngắt bot | Thu hồi task (kill process) bằng shell | Báo User can thiệp tắt bot |
