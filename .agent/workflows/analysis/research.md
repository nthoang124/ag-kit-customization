---
description: Nghiên cứu sâu về một chủ đề kỹ thuật hoặc thị trường (Technical Spike).
type: research
risk: none
source: self
required_skills: [Workflows_Tools/researcher]
inputs: ["Topic", "Question"]
outputs: ["Research Report", "task.md"]
context_from: ["/bất_kỳ"]
context_to: ["/bất_kỳ"]
context_artifacts:
  receives: ["task.md"]
  produces: ["research-insights.md"]
---

# Workflow Nghiên cứu (`/research`)

> [!NOTE]
> Mục tiêu: Tìm hiểu sâu, so sánh giải pháp, đánh giá rủi ro trước khi bắt tay vào làm.

## Khi nào dùng (When to Use)

- Cần đánh giá thư viện/framework trước khi chọn (Technical Spike).
- Nghiên cứu best practices cho một domain cụ thể.
- So sánh nhiều giải pháp kỹ thuật (VD: Zustand vs Jotai vs Redux).
- Cần hiểu rõ domain mới trước khi architect.

## KHÔNG dùng khi (When NOT to Use)

- Đã biết giải pháp, cần code ngay → Dùng `/code` hoặc `/development`.
- Cần research + plan + PRD → Dùng `/brainstorm`.
- Câu hỏi đơn giản về codebase → Dùng `/ask`.

---

## Các bước thực hiện

### Bước 1: Nghiên cứu

1.  **Adopt `[research]` persona**:
    -   Sử dụng `search_web` để tìm kiếm thông tin mới nhất (5-10 queries).
    -   Sử dụng `read_url_content` để đọc tài liệu chuyên sâu.

### Bước 2: Phân tích & Tổng hợp

1.  So sánh các phương án (Pros/Cons table).
2.  Tìm các "Best Practices" và "Anti-patterns".
3.  Nhận diện rủi ro tiềm ẩn.

### Bước 3: Báo cáo

1.  Ghi lại kết quả vào file Markdown trong `docs/050-Research/`.
2.  Tên file: `Analysis-{Topic}.md`.
3.  Cấu trúc: Executive Summary → Details → Recommendation.

### Bước 4: Phân rã Công việc (Break Tasks - Tùy chọn)

// turbo

1.  **Adopt `[lead-architect]` persona**: Nếu kết quả research sinh ra actionable items (cần triển khai), phân rã giải pháp thành các nhiệm vụ nguyên tử.
2.  Tạo danh sách task có cấu trúc: Mô tả, Acceptance Criteria.
3.  Lưu vào Artifact `task.md`.

### Bước 5: Kết thúc

1.  Notify user kết quả, link file báo cáo và danh sách task (nếu có).

---

## Ví dụ Copy-Paste

```text
# Research framework
/research So sánh NestJS vs Fastify vs Express cho 
dự án API 50+ endpoints, team 3 người.

# Research pattern
/research Best practices cho real-time notifications 
trong Next.js: SSE vs WebSocket vs Polling.

# Research thị trường
/research Phân tích thị trường AI-powered farm management 
tại Đông Nam Á 2026: đối thủ, pricing, user pain points.
```

---

## Giới hạn (Limitations)

- **Chỉ nghiên cứu, KHÔNG code** — dùng `/cook` hoặc `/code` để implement.
- **Phụ thuộc kết nối mạng** — offline sẽ dùng kiến thức nội bộ (có thể outdated).
- **Không thay thế chuyên gia domain** — output là baseline, cần validate với human expert.
- **Không tự động apply kết quả** — user cần quyết định dùng recommendation nào.
- **Output dưới dạng Markdown** — không tạo slides, dashboards, hay interactive content.

---

## Workflow liên quan

- `/brainstorm` — Nếu cần cả research + PRD/Roadmap.
- `/plan` — Lên kế hoạch sau khi research xong.
- `/ask` — Cho câu hỏi nhanh, không cần báo cáo chi tiết.

---

## Context Protocol

### Nhận Context (Input)
- **Từ `{{args}}`**: Các tham số inline truyền vào từ lệnh gọi.
- **Từ filesystem (`context_artifacts.receives`)**: Đọc file `task.md` hiện hành để nắm bắt state trước khi chạy.

### Truyền Context (Output)  
- **Cho workflow tiếp theo (`context_artifacts.produces`)**: Không bắt buộc sinh file artifact cấp cao trừ khi workflow ghi rõ. Thay đổi chủ yếu ở cấu trúc dự án.

### Fallback
- Nếu input rỗng hoặc không có context: Tự động xin ý kiến User hoặc quét Git Status hiện hành.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Lệnh CLI/Test fail hoặc Lỗi phân tích | Xem logs, sửa syntax/params và chạy lại (max 3 lần) | Khôi phục trạng thái Git ẩn hoặc undo file | Báo cáo chi tiết bug để User quyết định |
| Đứt gãy Context | Tự đọc lại log hệ thống | Không áp dụng | Hỏi User cấp lại Context |
