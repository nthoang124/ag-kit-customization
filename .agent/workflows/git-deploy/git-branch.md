---
description: Quản lý việc tạo branch mới từ dev
type: procedure
risk: safe
source: self
required_skills: []
inputs: ["Task Name", "Ticket ID"]
outputs: ["New Git Branch"]
context_from: ["/bất_kỳ"]
context_to: ["/bất_kỳ"]
context_artifacts:
  receives: ["task.md"]
  produces: []
---

# Workflow Tạo Branch (`/git-branch`)

> [!IMPORTANT]
> **Atomic Workflow**: Chỉ thực hiện thao tác tạo Branch.

## Khi nào dùng (When to Use)

- Bắt đầu một task/feature/fix mới cần branch riêng.
- Được gọi bởi workflow khác (`/development`, `/implement-feature`, `/refactor`, `/hotfix`).
- Khi user yêu cầu tạo branch thủ công.

## KHÔNG dùng khi (When NOT to Use)

- Đang có thay đổi chưa commit (dirty working tree) → Stash hoặc commit trước.
- Task quá nhỏ, chỉ sửa 1 dòng config → commit trực tiếp trên branch hiện tại.
- Cần tạo hotfix branch → Dùng `/hotfix` (branch từ `main`, không phải `dev`).

---

## Các bước thực hiện

### Bước 1: Kiểm tra & Cập nhật

// turbo

```bash
git status # Check dirty!
git checkout dev
git pull origin dev
```

> [!WARNING]
> Nếu `git status` báo có file thay đổi, hãy Stash hoặc Commit trước khi switch branch!

### Bước 2: Đặt tên Branch

- **Quy tắc**: `type/short-description`
- **Types**: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`.
- **Ví dụ**: `feat/user-auth`, `fix/login-bug`, `refactor/auth-service-split`.

### Bước 3: Tạo & Switch

// turbo

```bash
git checkout -b <branch-name>
```

---

## Ví dụ Copy-Paste

```bash
# Tạo branch cho tính năng đăng nhập
git checkout dev && git pull origin dev
git checkout -b feat/user-login

# Tạo branch sửa lỗi
git checkout dev && git pull origin dev
git checkout -b fix/api-timeout-error
```

---

## Giới hạn (Limitations)

- Không tự động resolve conflict nếu `dev` đã thay đổi xa — cần `/git-sync` trước.
- Không hỗ trợ tạo branch từ `main` — dùng `/hotfix` cho trường hợp đó.
- Naming convention giả định team dùng Git Flow đơn giản (dev → main).

---

## Checklist

- [ ] Đã pull code mới nhất từ `dev` chưa?
- [ ] Tên branch có đúng chuẩn `type/short-description` không?
- [ ] Working tree có sạch (clean) không?

---

## Workflow liên quan

- `/git-commit` — Commit code sau khi phát triển xong.
- `/git-sync` — Cập nhật code từ dev khi branch chạy lâu.
- `/git-pr` — Tạo PR sau khi hoàn thành.
- `/hotfix` — Nếu cần tạo branch từ `main`.

---

## Context Protocol

### Nhận Context (Input)
- **Từ `{{args}}`**: Các tham số inline truyền vào từ lệnh gọi.
- **Từ filesystem (`context_artifacts.receives`)**: Đọc file `task.md` hiện hành để nắm bắt state trước khi chạy.

### Truyền Context (Output)  
- **Cho workflow tiếp theo (`context_artifacts.produces`)**: Không bắt buộc sinh file artifact cấp cao trừ khi workflow ghi rõ. Thay đổi chủ yếu ở cấu trúc dự án.

### Fallback
- Nếu input rỗng hoặc không có context: Tự động xin ý kiến User hoặc quét Git Status hiện hành.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Lệnh CLI/Test fail hoặc Lỗi phân tích | Xem logs, sửa syntax/params và chạy lại (max 3 lần) | Khôi phục trạng thái Git ẩn hoặc undo file | Báo cáo chi tiết bug để User quyết định |
| Đứt gãy Context | Tự đọc lại log hệ thống | Không áp dụng | Hỏi User cấp lại Context |
