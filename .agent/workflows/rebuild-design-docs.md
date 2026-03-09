---
description: Phân tích code và tài liệu hiện có để tái tạo toàn bộ tài liệu thiết kế phần mềm.
type: procedure
risk: safe
source: self
required_skills: [lead-architect, backend-developer]
inputs: ["Codebase", "Existing Docs"]
outputs: ["docs/040-Design/*"]
---

# Workflow Tái tạo Design Docs (`/rebuild-design-docs`)

## Khi nào dùng (When to Use)

- Tài liệu thiết kế hiện có bị lỗi thời hoặc mâu thuẫn nghiêm trọng.
- Cần onboarding tài liệu cho team mới.
- Chuẩn bị audit kiến trúc hoặc review dự án lớn.

## KHÔNG dùng khi (When NOT to Use)

- Chỉ cần update vài file docs → Dùng `/update-docs`.
- Tạo docs cho code mới → Dùng `/documentation`.
- Chỉ cần review docs → Dùng `/review-docs`.

---

## Các bước thực hiện

### Bước 1: Phân tích hiện trạng

1.  Quét cấu trúc thư mục, xác định modules chính.
2.  Đọc code ở mức kiến trúc (không đi quá chi tiết implementation).
3.  Phát hiện mâu thuẫn, nội dung lỗi thời, phần thiếu.

### Bước 2: Xác định nguồn thông tin

1.  Tổng hợp từ: Code + Docs cũ + Cấu trúc project + Naming/flow patterns.
2.  Nếu thiếu → Đánh dấu "Giả định / TODO".

### Bước 3: Đề xuất cấu trúc mới

1.  Tạo thư mục mới: `docs/040-Design/` (nếu chưa tồn tại).
2.  KHÔNG chỉnh sửa tài liệu cũ.

### Bước 4: Tạo tài liệu

Bắt buộc:
- `00-overview.md`, `01-architecture.md`, `02-module-design.md`, `03-api-design.md`
- `04-database-design.md`, `05-business-flow.md`, `06-non-functional.md`, `07-assumptions-and-limits.md`

### Bước 5: Viết nội dung chi tiết

Mỗi file: Mục đích → Phạm vi → Nội dung chính. Ưu tiên tư duy thiết kế.

---

## Ví dụ Copy-Paste

```text
# Rebuild toàn bộ design docs
/rebuild-design-docs Tái tạo toàn bộ tài liệu thiết kế cho FarmTrace.
Code hiện tại đã phát triển xa hơn docs cũ, cần chuẩn hóa lại.

# Rebuild cho onboarding
/rebuild-design-docs Tạo lại design docs phục vụ onboarding 2 dev mới.
Focus: architecture overview, API design, database schema.
```

---

## Giới hạn (Limitations)

- **Không suy đoán nghiệp vụ** nếu không có bằng chứng → ghi rõ.
- **Không chỉnh sửa docs cũ** — tạo bộ mới hoàn toàn.
- **Phụ thuộc code quality** — code lộn xộn = docs khó mô tả.
- **Không tự verify** — cần human review sau khi hoàn thành.

---

## Workflow liên quan

- `/documentation` — Tạo docs mode forward/reverse.
- `/update-docs` — Cập nhật nhanh docs.
- `/project-review` — Audit dự án trước khi rebuild.
