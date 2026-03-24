---
trigger: model_decision
description: Luôn áp dụng khi tạo, tổ chức, đọc hoặc chỉnh sửa tài liệu
---

# Quy Tắc Cấu Trúc Tài Liệu

> [!IMPORTANT]
> Quy tắc này **BẮT BUỘC** cho mọi thao tác tài liệu.

## Quy Tắc Bắt Buộc

1. Lưu tài liệu vào `docs/` — KHÔNG tạo ở thư mục gốc hoặc nơi khác
2. Dùng cấu trúc Dewey Decimal (000, 010, 020, ...)
3. Có YAML frontmatter trong mọi tài liệu
4. Viết nội dung bằng **tiếng Việt** (trừ thuật ngữ kỹ thuật)
5. Cập nhật MOC sau khi tạo tài liệu mới
6. Dùng wiki-links `[[Tên-Tài-Liệu]]` để tham chiếu chéo
7. **CẤM** tạo cấu trúc tùy ý ngoài cấu trúc đã định

## Quy Trình

```
1. Thư mục docs/ chưa có? → Tạo TOÀN BỘ cấu trúc (mkdir -p)
2. Tra Bảng Phân Loại → Xác định thư mục đích + tên file
3. Tạo tài liệu với frontmatter + wiki-links
4. Cập nhật MOC thư mục cha + 000-Index.md nếu cần
```

## Mẫu Frontmatter

```yaml
---
id: {LOẠI}-{NNN}
type: {loại_tài_liệu}
status: draft|review|approved|deprecated
project: {tên_dự_án}            # Tùy chọn
owner: "@{người_phụ_trách}"     # Tùy chọn
tags: [tag1, tag2]               # Tùy chọn
linked-to: [[Tài-Liệu-Liên-Quan]]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

## Quy Tắc Liên Kết

- **PRD** → `[[Epic-*]]` | **Epic** → `[[PRD-*]]` | **Use Case** → `[[Epic-*]]`
- **SDD** → `[[PRD-*]]` | **ADR** → `[[SDD-*]]`

## Danh Sách Kiểm Tra

- [ ] Đúng thư mục `docs/XXX-*/`
- [ ] Tên file đúng quy ước
- [ ] Frontmatter đầy đủ (id, type, status, created)
- [ ] Wiki-links + MOC đã cập nhật

---

## Bảng Phân Loại Tài Liệu Kỹ Thuật

### 000-overview — Tổng quan

| Tên file              | Mô tả               |
| --------------------- | ------------------- |
| `product-overview.md` | Tổng quan sản phẩm  |
| `vision-goals.md`     | Tầm nhìn & mục tiêu |
| `glossary.md`         | Bảng thuật ngữ      |

### 010-requirements — Yêu cầu

| Tên file          | Mô tả                  |
| ----------------- | ---------------------- |
| `prd.md`          | Yêu cầu sản phẩm (PRD) |
| `user-stories.md` | User stories           |
| `use-cases.md`    | Use cases chi tiết     |

### 020-architecture — Kiến trúc

| Tên file                    | Mô tả              |
| --------------------------- | ------------------ |
| `system-overview.md`        | Kiến trúc tổng thể |
| `tech-stack.md`             | Công nghệ sử dụng  |
| `architecture-decisions.md` | ADR                |
| `diagrams/*.png`            | Sơ đồ hệ thống     |

### 030-design — Thiết kế

**database/**

| Tên file           | Mô tả           |
| ------------------ | --------------- |
| `erd.md`           | Sơ đồ ERD       |
| `schema-design.md` | Thiết kế schema |

**api/**

| Tên file             | Mô tả         |
| -------------------- | ------------- |
| `api-overview.md`    | Tổng quan API |
| `authentication.md`  | Xác thực      |
| `assets.md`          | API tài sản   |
| `transactions.md`    | API giao dịch |
| `{resource-name}.md` | Resource mới  |

**system-design/**

| Tên file     | Mô tả            |
| ------------ | ---------------- |
| `scaling.md` | Mở rộng hệ thống |
| `caching.md` | Chiến lược cache |

### 040-implementation — Triển khai mã nguồn

| Tên file                 | Mô tả            |
| ------------------------ | ---------------- |
| `folder-structure.md`    | Cấu trúc thư mục |
| `coding-guidelines.md`   | Quy tắc coding   |
| `modules/auth.md`        | Module xác thực  |
| `modules/asset.md`       | Module tài sản   |
| `modules/transaction.md` | Module giao dịch |

### 050-testing — Kiểm thử

| Tên file           | Mô tả                |
| ------------------ | -------------------- |
| `test-strategy.md` | Chiến lược kiểm thử  |
| `test-cases.md`    | Danh sách test cases |
| `api-testing.md`   | Kiểm thử API         |

### 060-deployment — Triển khai

| Tên file              | Mô tả               |
| --------------------- | ------------------- |
| `deployment-guide.md` | Hướng dẫn deploy    |
| `environments.md`     | Cấu hình môi trường |
| `ci-cd.md`            | Pipeline CI/CD      |

### 070-security — Bảo mật

| Tên file             | Mô tả              |
| -------------------- | ------------------ |
| `security-policy.md` | Chính sách bảo mật |
| `auth-flow.md`       | Luồng xác thực     |
| `threat-model.md`    | Mô hình mối đe dọa |

### 080-operations — Vận hành

| Tên file                    | Mô tả           |
| --------------------------- | --------------- |
| `monitoring.md`             | Giám sát        |
| `logging.md`                | Ghi log         |
| `incident-response.md`      | Xử lý sự cố     |
| `runbooks/{tên-runbook}.md` | Sổ tay vận hành |

### 090-product — Sản phẩm

| Tên file       | Mô tả               |
| -------------- | ------------------- |
| `roadmap.md`   | Lộ trình phát triển |
| `changelog.md` | Nhật ký thay đổi    |

### 100-guides — Hướng dẫn

| Tên file            | Mô tả                  |
| ------------------- | ---------------------- |
| `dev-onboarding.md` | Onboarding cho dev mới |
| `api-usage.md`      | Hướng dẫn dùng API     |
| `user-guide.md`     | Hướng dẫn người dùng   |

### 900-archive — Lưu trữ

Tài liệu ngưng sử dụng → chuyển vào `docs/900-archive/`

---

## Cấu Trúc Thư Mục

```
docs/
├── 000-overview/
│   ├── product-overview.md
│   ├── vision-goals.md
│   └── glossary.md
├── 010-requirements/
│   ├── prd.md
│   ├── user-stories.md
│   └── use-cases.md
├── 020-architecture/
│   ├── system-overview.md
│   ├── tech-stack.md
│   ├── architecture-decisions.md
│   └── diagrams/
├── 030-design/
│   ├── database/
│   ├── api/
│   └── system-design/
├── 040-implementation/
│   ├── folder-structure.md
│   ├── coding-guidelines.md
│   └── modules/
├── 050-testing/
│   ├── test-strategy.md
│   ├── test-cases.md
│   └── api-testing.md
├── 060-deployment/
│   ├── deployment-guide.md
│   ├── environments.md
│   └── ci-cd.md
├── 070-security/
│   ├── security-policy.md
│   ├── auth-flow.md
│   └── threat-model.md
├── 080-operations/
│   ├── monitoring.md
│   ├── logging.md
│   ├── incident-response.md
│   └── runbooks/
├── 090-product/
│   ├── roadmap.md
│   └── changelog.md
├── 100-guides/
│   ├── dev-onboarding.md
│   ├── api-usage.md
│   └── user-guide.md
├── 900-archive/
└── README.md
```
