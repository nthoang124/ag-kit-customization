---
description: Workflow để tùy chỉnh Rule/Workflow an toàn, có phân tích tác động và xác nhận của user.
type: procedure
risk: safe
source: self
required_skills: [Workflows_Tools/rules-workflows]
inputs: ["User Requirement", "Existing Rules"]
outputs: ["Updated Rule/Workflow"]
---

# Workflow Tùy chỉnh Hành vi (`/custom-behavior`)

## Khi nào dùng (When to Use)

- Thêm rule mới cho agent (VD: "Luôn dùng TypeScript strict mode").
- Sửa đổi workflow hiện có.
- Tạo workflow mới cho use case cụ thể.

## KHÔNG dùng khi (When NOT to Use)

- Chỉ cần hỏi về rules → Dùng `/ask`.
- Cần code feature → Dùng `/cook` hoặc `/development`.
- Cần research trước khi quyết định rule → Dùng `/research` trước.

---

## Các bước thực hiện

### Bước 1: Nhận diện & Tìm kiếm

// turbo

1.  Phân tích ý định user.
2.  Tìm Rule/Workflow hiện có: `find_by_name` trong `.agent/rules/` và `.agent/workflows/`.

### Bước 2: Phân tích Tác động

**Mới** → Draft nội dung mới.
**Đã tồn tại** → Đọc, so sánh, nhận diện xung đột, đưa ra khuyến nghị.

### Bước 3: User Xác nhận

1.  Thông báo tóm tắt phân tích.
2.  **CHỜ** user approve.

### Bước 4: Thực thi

1.  Tạo/sửa file.
2.  **Validate**: Đọc lại đảm bảo đúng cú pháp (Markdown/YAML frontmatter).

### Bước 5: Verification

1.  Kiểm tra tùy chỉnh hoạt động như mong đợi.

---

## Ví dụ Copy-Paste

```text
# Thêm rule mới
/custom-behavior Thêm rule: mọi API endpoint phải có 
rate limiting middleware. File: .agent/rules/api-security.md

# Sửa workflow
/custom-behavior Sửa /git-commit: thêm bước chạy 
`npm run test:affected` trước khi commit.
```

---

## Giới hạn (Limitations)

- **Cần user approve** — không tự ý thay đổi rules/workflows.
- **Không undo tự động** — nếu rule mới gây vấn đề, cần sửa thủ công.
- **Phụ thuộc cấu trúc .agent/** — rule/workflow phải đúng format frontmatter.

---

## Workflow liên quan

- `/ask` — Hỏi về rules hiện tại.
- `/review-docs` — Review rule/workflow sau khi tạo.
