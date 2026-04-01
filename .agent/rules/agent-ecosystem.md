# Hệ Sinh Thái Agent (Agent Ecosystem Rules)

> [!IMPORTANT]
> Các quy tắc này **BẮT BUỘC** áp dụng cho mọi tương tác trong dự án để kết nối 14 Agent Skills nâng cao.

## 1. Auto-Discovery & Orchestration
Mỗi khi khởi động một tác vụ phức tạp (như `/cook` hay `/implement-feature`), bạn **BẮT BUỘC** phải chạy script quét mã sau để tìm công cụ hỗ trợ:
```bash
python .agent/skills/agent/agent-orchestrator/scripts/scan_registry.py --status
```
Đọc kết quả trả về trong Terminal để nhận biết những Skill nào đang có sẵn để gọi.

## 2. Kỹ Sư Thiết Kế Tool (`agent-tool-builder`)
Khi thiết kế hàm / tool ngoại vi mới (JSON Schema), AI **BẮT BUỘC** phải sử dụng tư duy của `agent-tool-builder` (Chống ảo giác, Xử lý lỗi ngầm, Có ví dụ minh họa). Cấp quyền gọi file `.agent/skills/agent/agent-tool-builder/SKILL.md` để tự review lại thiết kế công cụ.

## 3. Quản Trị Hệ Thống (`mcp-memory` & `auditor`)
- **Trí nhớ MCP**: Chủ động dùng `memory_search` và `memory_write` để lưu và truy xuất Architectural Decisions. Tránh hỏi lại User 2 lần cùng một nội dung.
- **Bảo Mật Kịch Bản**: Gọi tư duy của `agentic-actions-auditor` để chống Prompt Injection bất cứ khi nào bạn edit Github Actions Workflow (`.github/workflows/*.yml`).
- **Dọn Dẹp Tư Liệu**: Tự gọi module `agents-md` khi kết thúc task để bảo trì tài liệu dự án mà không cần user nhắc nhở.
