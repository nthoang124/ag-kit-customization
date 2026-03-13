---
description: Commit code đúng chuẩn Conventional Commits (Tiếng Việt).
type: procedure
risk: safe
source: self
required_skills: []
inputs: ["Staged Files"]
outputs: ["Git Commit"]
---

# Workflow Commit Code (`/git-commit`)

> [!IMPORTANT]
> **Atomic Workflow**: Chỉ thực hiện thao tác Commit (Add + Commit).

## Khi nào dùng (When to Use)

- Sau khi hoàn thành một đơn vị công việc nhỏ (atomic unit).
- Được gọi bởi các workflow khác (`/development`, `/cook`, `/implement-feature`, `/refactor`).
- Khi user yêu cầu commit thủ công.

## KHÔNG dùng khi (When NOT to Use)

- Code chưa qua linter → Chạy lint trước.
- Chưa review staged changes → Xem `git diff --staged` trước.
- Cần commit + push + tạo PR → Dùng `/git-pr`.

---

## Các bước thực hiện

### Bước 1: Pre-check (CRITICAL)

// turbo

- Chạy linter: `npm run lint` (hoặc tương đương).
- **TUYỆT ĐỐI KHÔNG** tự ý thêm `// eslint-disable` để bypass lỗi. Phải sửa code gốc.
- Nếu dự án có Husky, đảm bảo hooks không bị bypass (không dùng `--no-verify`).

### Bước 2: Kiểm tra trạng thái

```bash
git status
```

### Bước 3: Stage & Review

```bash
git add .
git diff --staged # REVIEW KỸ TRƯỚC KHI COMMIT!
```

### Bước 4: Commit

- **BẮT BUỘC**: Dùng Tiếng Việt.
- **Format**: `type(scope): description`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

```bash
git commit -m "feat: mô tả công việc bằng tiếng Việt"
```

---

## Ví dụ Copy-Paste

```bash
# Feature mới
git add .
git commit -m "feat(auth): thêm api đăng ký tài khoản"

# Sửa lỗi
git add .
git commit -m "fix(db): sửa lỗi connect timeout khi pool cạn"

# Cập nhật dependencies
git add .
git commit -m "chore: cập nhật dependencies lên phiên bản mới nhất"

# Refactor
git add .
git commit -m "refactor(auth): tách service xác thực thành module riêng"

# Tài liệu
git add .
git commit -m "docs: cập nhật api docs cho endpoint đăng nhập"
```

---

## Giới hạn (Limitations)

- Không tự push code lên remote — dùng `/git-pr` hoặc `git push` thủ công.
- Không hỗ trợ interactive staging (`git add -p`) — phải stage thủ công trước.
- Commit message Tiếng Việt có thể gặp issue với một số CI/CD tool cũ — kiểm tra compatibility.
- Không tự detect type phù hợp — user cần xác định `feat`/`fix`/`refactor` trước.

---

## Checklist

- [ ] Đã chạy linter/formatter trước khi commit chưa?
- [ ] Message có đúng format Conventional Commits không?
- [ ] Message có phải Tiếng Việt không?
- [ ] Đã review staged changes chưa?

---

## Workflow liên quan

- `/git-branch` — Tạo branch trước khi bắt đầu code.
- `/git-pr` — Tạo PR sau khi commit xong.
- `/lint-format` — Chạy lint & format trước khi commit.
