---
description: Review tài liệu và artifacts về tính Chính xác Kỹ thuật, Logic/Quy trình và Chất lượng Biên tập.
type: procedure
risk: none
source: self
required_skills: [lead-architect, business-analysis, qa-tester]
inputs: ["Documentation Files", "Agent Artifacts"]
outputs: ["Review Report", "Fixed Documents"]
---

# Quy trình Review Tài liệu & Artifacts (`/review-docs`)

## Khi nào dùng (When to Use)

- Review implementation plan trước khi bắt đầu code.
- Kiểm tra tài liệu kỹ thuật (API docs, specs) sau khi code thay đổi.
- Review walkthrough hoặc task.md để đảm bảo chất lượng.

## KHÔNG dùng khi (When NOT to Use)

- Review code → Dùng `/code-review`.
- Review toàn bộ dự án → Dùng `/project-review`.
- Tạo tài liệu mới → Dùng `/documentation`.

---

## Các bước thực hiện

### 1. Phân tích Yêu cầu & Phạm vi

- **Artifacts (Plan/Task/Walkthrough)**: Bắt buộc **Review Quy trình & Logic** trước.
- **Tài liệu Kỹ thuật**: Cần **Review Kỹ thuật** + **Review Biên tập**.

### 2. Review Quy trình & Logic

- **Implementation Plan**: Mô tả rõ? Thay đổi đề xuất sắp xếp logic? Kế hoạch test cụ thể?
- **Walkthrough**: Có bằng chứng cụ thể (screenshots, logs)?
- **Task List**: Granular đủ? Trạng thái chính xác?

### 3. Review Kỹ thuật

- Code snippets/đường dẫn khớp codebase thực tế?
- Thông tin có bị outdated?
- Tuân thủ `documents.md`?
- Có lộ secrets không?

### 4. Review Biên tập

- Tiếng Việt (tuân thủ `communication.md`).
- Rõ ràng, dễ hiểu, formatting chuẩn Markdown.
- Link không bị gãy.

### 5. Báo cáo & Sửa lỗi

- Lỗi nhỏ (typo, format): **Tự động sửa**.
- Lỗi logic/kỹ thuật: **Báo cáo** user.

---

## Ví dụ Copy-Paste

```text
# Review plan
/review-docs Review implementation_plan.md xem logic ok chưa

# Review tài liệu kỹ thuật
/review-docs Review docs/030-Specs/Architecture/SDD-FarmTrace.md 
kiểm tra tính chính xác so với code hiện tại
```

---

## Giới hạn (Limitations)

- **Chỉ review tài liệu** — không review code trực tiếp.
- **Không tự tạo tài liệu mới** — chỉ review/fix tài liệu có sẵn.
- **Review biên tập giới hạn** — sửa typo, format; không rewrite toàn bộ.
- **Phụ thuộc context** — nếu codebase quá lớn, khó verify 100% accuracy.

---

## Workflow liên quan

- `/code-review` — Review code.
- `/project-review` — Review toàn diện dự án.
- `/update-docs` — Cập nhật docs sau review.