---
description: Hỏi đáp về Codebase, Kiến trúc, hoặc Kiến thức chung.
type: read-only
risk: none
source: self
required_skills: []
inputs: ["Question"]
outputs: ["Answer", "Action Suggestion"]
context_from: []
context_to: ["/development", "/debug", "/research"]
context_artifacts:
  receives: []
  produces: []
---

# Quy trình Hỏi đáp (`/ask`)

> [!NOTE]
> Workflow này KHÔNG thay đổi code hoặc tài liệu. Nó chỉ phân tích và trả lời câu hỏi.

## Khi nào dùng (When to Use)

- Câu hỏi về codebase: "Module auth hoạt động thế nào?"
- Câu hỏi kiến trúc: "Tại sao dùng Zustand thay vì Redux?"
- Kiến thức chung: "REST vs GraphQL nên chọn cái nào?"

## KHÔNG dùng khi (When NOT to Use)

- Cần research chuyên sâu với báo cáo → Dùng `/research`.
- Cần sửa code → Dùng `/development` hoặc `/bug-fix`.
- Cần lên kế hoạch → Dùng `/plan`.

---

## Các bước thực hiện

### Bước 1: Phân tích Câu hỏi

1.  Xác định phạm vi (Codebase, Kiến trúc, General Knowledge).
2.  Nếu liên quan code cụ thể, xác định file liên quan.

### Bước 2: Tìm kiếm Context

1.  Dùng `grep_search` hoặc `find_by_name` để tìm file liên quan.
2.  Đọc nội dung file quan trọng (nếu cần).

### Bước 3: Trả lời

1.  Tổng hợp thông tin, trả lời "Trung thực tàn nhẫn".
2.  Nếu phát hiện vấn đề → chỉ ra nguyên nhân và gợi ý.

### Bước 4: Đề xuất Hành động

1.  Gợi ý workflow tiếp theo: "Để sửa lỗi này, dùng `/development`."

---

## Ví dụ Copy-Paste

```text
# Hỏi về codebase
/ask Module auth middleware xử lý JWT token refresh thế nào?

# Hỏi kiến trúc
/ask Tại sao project này dùng Prisma thay vì Drizzle?
Có nên migrate không?

# Hỏi kiến thức
/ask So sánh Server Actions vs API Routes trong Next.js 15
cho project có 50+ endpoints.
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `{{args}}`**: Câu hỏi trực tiếp từ user (kênh duy nhất).

### Truyền Context (Output)
- **Cho `/development`**: Gợi ý action nếu cần sửa code.
- **Cho `/debug`**: Chuyển hướng nếu câu hỏi liên quan bug.
- **Cho `/research`**: Chuyển hướng nếu cần research sâu hơn.

### Fallback
- Nếu `{{args}}` mơ hồ → Hỏi user làm rõ câu hỏi trước khi trả lời.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Bước 2: Tìm kiếm | Retry search 3x, thử từ khóa khác | → Bước 1 (re-analyze) | Notify user: không tìm thấy context |
| Bước 3: Trả lời | Thử approach khác (web search) | → Bước 2 (re-search) | Notify user: ngoài phạm vi hiểu biết |

---

## Giới hạn (Limitations)

- **Read-only** — không thay đổi code, docs, hoặc config.
- **Phụ thuộc context** — câu trả lời dựa trên code/docs hiện tại.
- **Không thay thế research** — cho câu hỏi phức tạp, dùng `/research`.

---

## Workflow liên quan

- `/research` — Nghiên cứu sâu với báo cáo.
- `/development` — Nếu cần action sau khi hỏi.
- `/debug` — Nếu câu hỏi về bug cần debug.