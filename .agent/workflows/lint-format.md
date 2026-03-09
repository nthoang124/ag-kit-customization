---
description: Chuẩn hóa code style bằng lint và formatter.
type: procedure
risk: safe
source: self
required_skills: []
inputs: ["Source Files"]
outputs: ["Formatted Code"]
context_from: ["/git-commit"]
context_to: ["/git-commit"]
context_artifacts:
  receives: []
  produces: ["formatted code"]
---

# Workflow Lint & Format (`/lint-format`)

## Khi nào dùng (When to Use)

- Trước khi commit (đảm bảo code style nhất quán).
- Sau khi merge nhiều branch (fix style inconsistency).
- Setup lint/format cho dự án mới.

## KHÔNG dùng khi (When NOT to Use)

- Chỉ cần commit → `/git-commit` đã bao gồm lint check.
- Cần fix logic/bug → Dùng `/bug-fix` hoặc `/development`.
- Setup dự án từ đầu → Dùng `/bootstrap`.

---

## Các bước thực hiện

### Bước 1: Kiểm tra cấu hình

// turbo

1.  Xác định tools: eslint / prettier / flake8 / black...
2.  Kiểm tra config file tồn tại (.eslintrc, .prettierrc...).

### Bước 2: Chạy lint (safe mode)

// turbo

```bash
npm run lint
```

> Chạy ở chế độ check trước, không auto-fix.

### Bước 3: Format code

// turbo

```bash
npm run format
# hoặc
npx prettier --write "src/**/*.{ts,tsx,js,jsx}"
```

### Bước 4: Verify

// turbo

```bash
npm run lint  # Đảm bảo không còn warning nghiêm trọng
```

### Bước 5: Commit

```bash
git add . && git commit -m "chore: lint & format code"
```

---

## Ví dụ Copy-Paste

```text
# Lint toàn bộ project
/lint-format Chạy lint và format toàn bộ src/ folder.
Fix tất cả auto-fixable issues.

# Lint một module cụ thể
/lint-format Lint và format module auth: src/modules/auth/**
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `{{args}}`**: Scope files/folders cần lint (phổ biến nhất).
- **Từ `/git-commit`**: Thường chạy lint trước commit.

### Truyền Context (Output)
- **Cho `/git-commit`**: Code đã format, sẵn sàng commit.

### Fallback
- Nếu không tìm thấy lint config → Hỏi user stack đang dùng, tạo config mặc định.
- Nếu `{{args}}` trống → Lint toàn bộ project (`src/`).

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Bước 1: Config | Tạo config mặc định 3x | N/A | Hỏi user cung cấp config |
| Bước 2: Lint | Retry với relaxed rules 3x | → Bước 1 (re-check config) | Notify user: lint errors quá nhiều |
| Bước 3: Format | Retry trên từng file 3x | → Bước 2 (re-lint) | Notify user: format conflict |

---

## Giới hạn (Limitations)

- **Phụ thuộc config** — nếu chưa có .eslintrc/.prettierrc, cần setup trước.
- **Auto-fix có thể break code** — nên review diff sau khi format.
- **Không fix logic errors** — chỉ style/formatting.
- **Conflict giữa ESLint và Prettier** — cần config tương thích.

---

## Workflow liên quan

- `/git-commit` — Commit code sau khi lint.
- `/bootstrap` — Setup lint/format cho dự án mới.
- `/code-review` — Review code đã lint.
