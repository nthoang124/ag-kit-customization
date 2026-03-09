---
description: Thiết lập cấu trúc dự án, cài đặt dependencies, và cấu hình môi trường dựa trên spec kiến trúc.
type: procedure
risk: critical
source: self
required_skills: [lead-architect, devops-engineer, frontend-developer, backend-developer, product-manager]
inputs: ["docs/030-Specs/Architecture/SDD-*.md"]
outputs: ["Initialized Project", "CI/CD Config", "Env Config"]
---

# Workflow Khởi tạo Dự án (`/bootstrap`)

> [!IMPORTANT]
> **Điều kiện tiên quyết**: Đảm bảo SDD đã tồn tại trong `docs/030-Specs/Architecture/`.

## Khi nào dùng (When to Use)

- Dự án mới cần setup từ đầu (framework, deps, config).
- Thêm stack mới vào dự án hiện có (VD: thêm backend vào project frontend-only).
- Setup lại môi trường phát triển (CI/CD, linting, hooks).

## KHÔNG dùng khi (When NOT to Use)

- Dự án đã chạy ổn định → Không cần bootstrap lại.
- Chỉ cần install 1-2 thư viện → Dùng `npm install` trực tiếp.
- Chỉ cần update deps → Dùng `/development` với task update.
- Chưa có SDD/Architecture docs → Dùng `/brainstorm` + `/documentation` trước.

---

## Các bước thực hiện

### Bước 1: Khởi tạo Framework & Cấu trúc

// turbo

1.  **Adopt `[lead-architect]` persona**: Monorepo vs Polyrepo, init project, tạo khung thư mục.
2.  **Verify**: Đảm bảo quá trình khởi tạo hoàn tất.

### Bước 2: Công cụ Maintenance & Chất lượng

// turbo

1.  **Adopt `[devops-engineer]` persona**: ESLint, Prettier, TypeScript, Husky, Lint-staged, CI/CD.
2.  Verify: Chạy `npm run lint` và đảm bảo hooks hoạt động.

### Bước 3: Setup Frontend

// turbo

1.  **Adopt `[frontend-developer]` persona**: UI framework, State manager, Structure, Assets.
2.  **Verify**: `package.json` đã có đầy đủ deps.

### Bước 4: Setup Backend

// turbo

1.  **Adopt `[backend-developer]` persona**: Database, API, Validation, Environment.
2.  **Verify**: Kết nối database thành công.

### Bước 5: Validation Cuối cùng

// turbo

1.  Chạy full build `npm run build` + Type-checking `tsc --noEmit`.

---

## Ví dụ Copy-Paste

```text
# Bootstrap dự án Next.js mới
/bootstrap Thiết lập dự án Next.js 15 + Supabase + TailwindCSS + Shadcn UI 
theo SDD-FarmTrace.md. Monorepo với Turborepo.

# Bootstrap thêm backend cho dự án frontend
/bootstrap Thêm FastAPI backend vào dự án React hiện có: 
PostgreSQL + Prisma + JWT auth + Docker.
```

---

## Giới hạn (Limitations)

- **Yêu cầu SDD/Architecture trước** — nếu chưa có, dùng `/brainstorm` + `/documentation`.
- **Chỉ setup, KHÔNG code business logic** — dùng `/cook` hoặc `/implement-feature` sau.
- **Framework-specific** — quy trình thay đổi tuỳ tech stack (Next.js vs FastAPI vs Go).
- **Không setup production deployment** — chỉ dev environment.
- **Cần quyền admin** để install global tools (nếu cần).

---

## Workflow liên quan

- `/brainstorm` — Tạo PRD/Roadmap trước bootstrap.
- `/documentation` — Tạo SDD trước bootstrap.
- `/cook` / `/implement-feature` — Code feature sau khi bootstrap xong.
