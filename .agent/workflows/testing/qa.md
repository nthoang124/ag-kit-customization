---
description: Tạo tài liệu test case và test plan toàn diện dựa trên yêu cầu dự án.
type: procedure
risk: none
source: self
required_skills: [Testing_Security/qa-tester]
inputs: ["Requirements Docs", "Source Code"]
outputs: ["Test Plan", "Test Cases"]
---

# Workflow QA (`/qa`)

> [!IMPORTANT]
> **BẮT BUỘC**: Áp dụng `.agent/rules/documents.md`. Mọi tài liệu QA PHẢI lưu dưới `docs/035-QA/`.

## Khi nào dùng (When to Use)

- Tạo test plan cho feature/release mới.
- Viết test cases (tài liệu, không phải code) cho QA team.
- Cần review coverage trước khi release.

## KHÔNG dùng khi (When NOT to Use)

- Cần viết code test → Dùng `/gen-tests`.
- Cần chạy integration test → Dùng `/integration-test`.
- Chỉ cần kiểm tra 1 bug cụ thể → Dùng `/bug-fix` hoặc `/debug`.

---

## Các bước thực hiện

### Bước 1: Khám phá Yêu cầu

// turbo

1.  **Adopt `[qa-tester]` persona**: Phân tích folder `docs/`.
2.  Đề xuất Test Plan (`docs/035-QA/Test-Plans/MTP-{Name}.md`).
3.  Viết Test Cases (`docs/035-QA/Test-Cases/TC-{Feature}-{NNN}.md`).
4.  Tạo artifact `draft-qa-docs.md` để review.

### Bước 2: Hoàn tất và Tổ chức

// turbo

1.  Sau khi approve, lưu tất cả file vào `docs/035-QA/`.
2.  Cập nhật `docs/035-QA/QA-MOC.md` và `docs/000-Index.md`.
3.  Đảm bảo frontmatter đúng chuẩn.

---

## Ví dụ Copy-Paste

```text
# Tạo test plan cho release
/qa Tạo test plan cho FarmTrace v2.0 release:
- Module Auth (login, register, OAuth)
- Module Dashboard (analytics, reports)
- Module Inventory (CRUD, alerts)

# Tạo test cases cho feature
/qa Viết test cases cho tính năng quên mật khẩu:
happy path, invalid email, expired link, rate limiting.
```

---

## Giới hạn (Limitations)

- **Chỉ tạo tài liệu test** — không viết code test (dùng `/gen-tests`).
- **Phụ thuộc vào docs/** — nếu requirements mơ hồ, test cases cũng mơ hồ.
- **Không thực thi test** — chỉ tạo plan/cases, không chạy.
- **Format cố định** — theo template `MTP-{Name}.md` và `TC-{Feature}-{NNN}.md`.

---

## Workflow liên quan

- `/gen-tests` — Viết code test từ test cases.
- `/integration-test` — Test tích hợp.
- `/code-review` — Review code trước khi QA.
