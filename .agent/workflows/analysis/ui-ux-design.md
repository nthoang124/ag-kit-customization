---
description: Chuyển đổi yêu cầu thành các thiết kế UI/UX toàn diện.
type: procedure
risk: none
source: self
required_skills: [Business/designer, Development/frontend-developer]
inputs: ["User Stories", "PRD"]
outputs: ["Design System", "Flows", "Prototypes", "task.md"]
---

# Workflow Thiết kế UI/UX (`/ui-ux-design`)

> [!IMPORTANT]
> **BẮT BUỘC**: Tuân thủ `.agent/rules/nano-banana.md` khi generate ảnh.

## Khi nào dùng (When to Use)

- Thiết kế UI cho feature mới trước khi code frontend.
- Tạo design system (colors, typography, components).
- Tạo wireframe hoặc prototype cho user review.

## KHÔNG dùng khi (When NOT to Use)

- Chỉ cần code UI → Dùng `/cook` hoặc `/implement-feature`.
- Chỉ fix UI bug → Dùng `/bug-fix`.
- Cần research UX trends → Dùng `/research` trước.

---

## Các bước thực hiện

### Bước 1: Nghiên cứu & Concept

// turbo

1.  **Adopt `[designer]` persona**: Nghiên cứu UX Trends, Moodboard, Style, Design System.

### Bước 2: Thiết kế Flow & Wireframe

// turbo

1.  Vẽ User Flows (Mermaid diagrams), mô tả Layout.
2.  **Generate Assets**: Dùng `generate_image` nếu cần concept art/icons.

### Bước 3: Prototyping (Code-First)

// turbo

1.  **Adopt `[frontend-developer]` persona**: Dựng HTML/CSS nhanh (Low-fi prototype).
2.  Sử dụng component library có sẵn.

### Bước 4: Break Tasks Frontend (Phân rã Component)

// turbo

1.  Từ Design/Flows/Prototype vừa tạo, bóc tách ra danh sách các components, screens cần phát triển.
2.  Tạo danh sách task: Mô tả (Props, State, Responsive), Acceptance Criteria, Estimate.
3.  Lưu vào Artifact `task.md` phục vụ cho giai đoạn code.

### Bước 5: Review

1.  Trình bày Design/Prototype và danh sách UI Tasks cho user.
2.  **Action**: `notify_user` để xin feedback.

---

## Ví dụ Copy-Paste

```text
# Thiết kế dashboard
/ui-ux-design Thiết kế dashboard analytics cho FarmTrace:
- Dark mode, glassmorphism, modern SaaS style
- Charts: revenue, crop health, IoT sensor data
- Responsive: desktop + mobile

# Thiết kế landing page
/ui-ux-design Thiết kế landing page cho FarmTrace:
- Hero section với value proposition
- Features showcase
- Pricing table
- CTA sections
```

---

## Giới hạn (Limitations)

- **Text-based design** — tạo Mermaid, HTML/CSS prototype, không phải Figma.
- **Phụ thuộc `generate_image`** — ảnh AI có thể không chính xác 100%.
- **Không responsive testing** — chỉ tạo code, user cần test manual.
- **Không animation phức tạp** — chỉ basic CSS transitions.

---

## Workflow liên quan

- `/implement-feature` — Code frontend sau khi design xong.
- `/research` — Research UX trends trước khi design.
- `/brainstorm` — Brainstorm ý tưởng sản phẩm trước khi design.
