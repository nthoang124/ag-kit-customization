---
description: Phân tích ý tưởng cùng user và tạo các tài liệu sơ bộ mức cao (Roadmap, PRD).
type: procedure
risk: none
source: self
required_skills: [Workflows_Tools/researcher, Business/product-manager]
inputs: ["User Idea", "Market Trends"]
outputs: ["docs/010-Planning/Roadmap-*.md", "docs/020-Requirements/PRD-*.md", "task.md"]
context_from: []
context_to: ["/plan", "/documentation", "/implement-feature", "/code"]
context_artifacts:
  receives: []
  produces: ["docs/010-Planning/Roadmap-*.md", "docs/020-Requirements/PRD-*.md", "docs/050-Research/research-insights.md", "task.md"]
---

# Workflow Brainstorm (`/brainstorm`)

> [!IMPORTANT]
> **BẮT BUỘC**: Đọc `.agent/rules/documents.md` trước khi tạo bất kỳ tài liệu nào.

## Khi nào dùng (When to Use)

- Bắt đầu dự án mới, cần Roadmap và PRD.
- User có ý tưởng mới cần phân tích tính khả thi.
- Cần nghiên cứu thị trường/đối thủ trước khi quyết định hướng đi.

## KHÔNG dùng khi (When NOT to Use)

- Đã có PRD/Roadmap rõ ràng → Dùng `/plan` hoặc `/implement-feature`.
- Chỉ cần lên technical plan → Dùng `/plan`.
- Cần code ngay → Dùng `/cook` hoặc `/code`.

---

## Bước 1: Nghiên cứu Chuyên sâu (Deep Research)

// turbo

> 💡 **BẮT BUỘC**: Tuân thủ `.agent/rules/research.md` trước khi bắt đầu lên ý tưởng.

1.  **Adopt `[research]` persona** (via `search_web` + `read_url_content`):
    -   Xác định 5-10 xu hướng chính trong domain dự án.
    -   Tìm các ví dụ "best-in-class" của sản phẩm tương tự.
    -   Nhận diện các cạm bẫy phổ biến và "Wow Factors" hiện đại.
2.  Tạo artifact `research-insights.md` trong `docs/050-Research/`.
3.  **Action**: Gọi `notify_user` để user review kết quả nghiên cứu.

## Bước 2: Làm rõ & Thấu hiểu

> [!NOTE]
> Bước này là **BẮT BUỘC**. KHÔNG ĐƯỢC đi tiếp nếu chưa có xác nhận của user.

1.  **Adopt `[product-manager]` persona**:
    -   Tóm tắt mức độ hiểu.
    -   Tạo câu hỏi làm rõ (clarification questions).
2.  **Action**: Gọi `notify_user` để user review.

## Bước 3: Tạo Roadmap

// turbo

1.  **Adopt `[product-manager]` persona**: Timeline, milestones, deliverables.
2.  Tạo artifact `draft-roadmap.md`.
3.  Sau khi approve → Lưu vào `docs/010-Planning/Roadmap-{ProjectName}.md`.

## Bước 4: Tạo PRD

// turbo

1.  **Adopt `[product-manager]` persona**: Mục tiêu kinh doanh, User personas, MoSCoW prioritization.
2.  Tạo artifact `draft-prd.md`.
3.  Sau khi approve → Lưu vào `docs/020-Requirements/PRD-{ProjectName}.md`.

## Bước 5: Chia nhỏ Task (Break Tasks)

// turbo

1.  **Adopt `[lead-architect]` persona**: Từ PRD vừa tạo, phân rã thành các nhiệm vụ nguyên tử (atomic tasks).
2.  Tạo danh sách task có nhóm component cụ thể. Mỗi task gồm: Mô tả, Acceptance Criteria, Độ phức tạp ước tính.
3.  Lưu vào `task.md` hoặc `docs/045-Tasks/Task-{ProjectName}.md` để chuẩn bị cho giai đoạn triển khai.

## Bước 6: Chuyển tiếp

1.  Trình bày tóm tắt các artifact đã tạo (Roadmap, PRD, Task List).
2.  Đề xuất bước tiếp theo: Chạy `/plan` (nếu cần thiết kế kiến trúc) hoặc `/code` (nếu đã sẵn sàng code).

---

## Ví dụ Copy-Paste

```text
# Brainstorm dự án mới
/brainstorm Ý tưởng: App quản lý trang trại thông minh (IoT sensors, 
tracking vật nuôi, dự báo mùa vụ). Target: Nông dân Việt Nam.

# Brainstorm tính năng mới
/brainstorm Thêm module AI Assistant cho FarmTrace: 
tự động đề xuất lịch chăm sóc dựa trên dữ liệu sensor.
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `{{args}}`**: Ý tưởng sản phẩm, mô tả domain, target user.
- **Đây là workflow đầu chuỗi** — thường không nhận artifact từ workflow khác.

### Truyền Context (Output)
- **Cho `/plan`**: `docs/020-Requirements/PRD-*.md` — PRD để lập kế hoạch kỹ thuật 2 cấp.
- **Cho `/documentation`**: `docs/010-Planning/Roadmap-*.md` — Roadmap để tạo specs.
- **Cho `/implement-feature`**: PRD với User Stories.

### Fallback
- Nếu user không cung cấp đủ ý tưởng → Hỏi clarification questions (Bước 2).

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Bước 1: Research | Retry search 3x | N/A (đầu chuỗi) | Hỏi user cung cấp tài liệu |
| Bước 3: Roadmap | Sửa format/logic 3x | → Bước 2 (re-clarify) | Notify user |
| Bước 4: PRD | Sửa nội dung 3x | → Bước 2 (re-clarify) | Notify user |

---

## Giới hạn (Limitations)

- **Chỉ tạo tài liệu mức cao** — không chi tiết kỹ thuật (dùng `/plan` cho phần đó).
- **Research phụ thuộc kết nối mạng** — nếu offline, bỏ qua Bước 1.
- **Không tự tạo specs kỹ thuật** — dùng `/documentation` sau brainstorm.
- **Không thay thế Product Manager thực** — output cần được validate bởi stakeholder.

---

## Workflow liên quan

- `/plan` — Lập kế hoạch kỹ thuật 2 cấp sau khi có PRD.
- `/documentation` — Tạo specs chi tiết từ PRD.
- `/implement-feature` — Triển khai feature từ PRD.
- `/research` — Nghiên cứu sâu 1 chủ đề cụ thể.
