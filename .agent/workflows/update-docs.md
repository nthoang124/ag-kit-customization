---
description: Đồng bộ tài liệu kỹ thuật sau khi code thay đổi (giảm nợ tài liệu).
type: procedure
risk: none
source: self
required_skills: [lead-architect, backend-developer]
inputs: ["Feature Name", "Branch"]
outputs: ["Updated Docs"]
---

# Workflow Cập nhật Tài liệu (`/update-docs`)

> [!IMPORTANT]
> **Khi nào dùng**: Sau khi merge PR hoặc hoàn thành một feature lớn.

## Khi nào dùng (When to Use)

- Sau khi merge PR/feature branch vào dev.
- Code đã thay đổi nhưng docs chưa cập nhật.
- API specs, ERD, hoặc README bị outdated.

## KHÔNG dùng khi (When NOT to Use)

- Tạo tài liệu mới từ đầu → Dùng `/documentation`.
- Tái tạo toàn bộ design docs → Dùng `/rebuild-design-docs`.
- Review docs → Dùng `/review-docs`.

---

## Các bước thực hiện

1.  **Scan Code Changes**: Đọc diff hoặc user input.
2.  **Identify Docs**: Xác định docs bị ảnh hưởng (PRD, Specs, API, MOCs).
3.  **Update**: Cập nhật `docs/030-Specs/`, đánh dấu "Implemented"/"Done".
4.  **Verify**: Đảm bảo không còn thông tin outdated.
5.  **Commit**: `/git-commit` với type `docs`.

---

## Ví dụ Copy-Paste

```text
# Update docs sau feature
/update-docs Cập nhật docs sau khi merge feat/user-auth:
- API docs cho login/register endpoints
- SDD phần authentication flow
- README cập nhật env variables mới

# Update docs sau refactor
/update-docs Cập nhật docs sau refactor auth module:
- Architecture diagram thay đổi
- API paths thay đổi from /auth/* to /v2/auth/*
```

---

## Giới hạn (Limitations)

- **Chỉ update** — không tạo mới docs từ đầu.
- **Phụ thuộc git diff** — nếu không có diff rõ, khó biết cần update gì.
- **Không auto-detect** tất cả docs cần update — cần user chỉ rõ scope.

---

## Workflow liên quan

- `/documentation` — Tạo mới docs.
- `/review-docs` — Review docs sau khi update.
- `/git-commit` — Commit docs changes.
