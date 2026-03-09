---
description: Tạo tài liệu toàn diện (Kiến trúc, API, Specs) từ Codebase hoặc Requirements.
type: procedure
risk: none
source: self
required_skills: [lead-architect, backend-developer, devops-engineer, business-analysis]
inputs: ["Source Code", "PRD"]
outputs: ["docs/030-Specs/*"]
---

# Workflow Tài liệu (`/documentation`)

> [!IMPORTANT]
> **BẮT BUỘC**: Áp dụng `.agent/rules/documents.md`.

## Khi nào dùng (When to Use)

- Tạo tài liệu thiết kế từ PRD (Forward Engineering).
- Tạo tài liệu từ codebase hiện có (Reverse Engineering).
- Cần OpenAPI specs, ERD, C4 diagrams cho dự án.

## KHÔNG dùng khi (When NOT to Use)

- Chỉ cần update docs sau code → Dùng `/update-docs`.
- Cần tái tạo toàn bộ design docs → Dùng `/rebuild-design-docs`.
- Cần tạo test docs → Dùng `/qa`.

---

## Bước 0: Xác định Chế độ (Mode)

1.  **Mode A (Reverse Engineering)**: Từ Code → Tài liệu.
2.  **Mode B (Forward Engineering)**: Từ PRD → Specs.

## MODE A: Từ Codebase (Reverse)

### Bước A1: Phân tích & Dịch ngược

// turbo

1.  **`[lead-architect]`**: Quét codebase, nhận diện Tech stack, API routes.
2.  **`[backend-developer]`**: Tạo OpenAPI specs, vẽ ERD.

### Bước A2: Tài liệu Vận hành

// turbo

1.  **`[devops-engineer]`**: Document hạ tầng, Env vars, CI/CD.

## MODE B: Từ Requirements (Forward)

### Bước B1: Thiết kế Hệ thống (SDD)

// turbo

1.  **`[lead-architect]`**: C4 diagrams, Sequence Diagrams, Tech Stack.
2.  Lưu `docs/030-Specs/Architecture/SDD-*.md`.

### Bước B2: Chi tiết hóa Specs

// turbo

1.  **`[business-analysis]`**: User Stories, Epics, Use Cases.

## Finalize

1.  **Review**: Kiểm tra tính nhất quán.
2.  **Commit**: `/git-commit`.

---

## Ví dụ Copy-Paste

```text
# Reverse engineering
/documentation Mode A: Tạo tài liệu kiến trúc từ codebase FarmTrace hiện có.
Focus: API docs, ERD, deployment diagram.

# Forward engineering
/documentation Mode B: Tạo SDD và specs từ PRD-FarmTrace.md.
Include: C4 diagram, sequence diagrams, API design.
```

---

## Giới hạn (Limitations)

- **Reverse engineering phụ thuộc code quality** — nếu code lộn xộn, docs cũng khó rõ ràng.
- **Forward engineering cần PRD rõ ràng** — PRD mơ hồ → specs mơ hồ.
- **Không tự vẽ visual diagrams** — chỉ tạo Mermaid/text-based diagrams.
- **Không tự deploy docs** — chỉ tạo file Markdown.

---

## Workflow liên quan

- `/update-docs` — Cập nhật docs sau khi code thay đổi.
- `/rebuild-design-docs` — Tái tạo toàn bộ design docs.
- `/brainstorm` — Tạo PRD trước khi documentation.
