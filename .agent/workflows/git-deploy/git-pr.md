---
description: Tạo Pull Request (PR) và Merge.
type: procedure
risk: safe
source: self
required_skills: []
inputs: ["Current Branch"]
outputs: ["Pull Request URL"]
context_from: ["/bất_kỳ"]
context_to: ["/bất_kỳ"]
context_artifacts:
  receives: ["task.md"]
  produces: []
---

# Workflow Tạo PR (`/git-pr`)

> [!IMPORTANT]
> **Atomic Workflow**: Đẩy code và tạo PR.

## Khi nào dùng (When to Use)

- Code đã hoàn thành và sẵn sàng review.
- Cần tạo PR để team review trước khi merge.
- Sau khi `/git-sync` để đảm bảo không conflict.

## KHÔNG dùng khi (When NOT to Use)

- Code chưa hoàn thành hoặc chưa test → Hoàn thành trước.
- Dự án solo cần merge nhanh → Dùng `/git-merge`.
- Chưa có GitHub CLI (`gh`) và không muốn cài → Tạo PR thủ công trên GitHub.

---

## Các bước thực hiện

### Bước 0: Check Auth

```bash
gh auth status
```

*(Nếu chưa login, dùng `gh auth login` hoặc tạo PR thủ công)*

### Bước 1: Push Branch

// turbo

```bash
git push origin <current-branch>
```

### Bước 2: Tạo PR bằng GH CLI

```bash
gh pr create --base dev --title "feat: mô tả tính năng" --body "## Mô tả thay đổi
- Thay đổi 1
- Thay đổi 2

## Checklist
- [ ] Đã test local
- [ ] Đã review code
- [ ] Đã update docs (nếu cần)"
```

*(Hoặc hướng dẫn user mở link GitHub để tạo PR)*

### Bước 3: Merge (Nếu được approve)

- Không tự merge nếu không có quyền.
- Nhắc user review và merge.

---

## Ví dụ Copy-Paste

```bash
# Flow đầy đủ: push + tạo PR
git push origin feat/user-auth
gh pr create --base dev \
  --title "feat(auth): thêm chức năng đăng nhập" \
  --body "Thêm API đăng nhập, middleware xác thực JWT, và unit tests."

# PR cho bugfix
git push origin fix/login-timeout
gh pr create --base dev \
  --title "fix(auth): sửa lỗi timeout khi đăng nhập" \
  --body "Root cause: connection pool exhausted. Fix: tăng pool size và thêm retry."
```

---

## Giới hạn (Limitations)

- Yêu cầu `gh` CLI đã cài và authenticated — nếu không có, phải tạo PR trên web.
- PR title phải tuân thủ Conventional Commits Tiếng Việt.
- Không tự merge — cần approval từ reviewer (hoặc user tự merge nếu solo).
- Không hỗ trợ tạo PR vào `main` — chỉ target `dev` theo mặc định.

---

## Checklist

- [ ] Đã push hết commit chưa?
- [ ] Title PR có theo chuẩn Conventional Commits không?
- [ ] Đã sync code mới nhất từ dev chưa (để tránh conflict)?
- [ ] Body PR có mô tả rõ ràng thay đổi không?

---

## Workflow liên quan

- `/git-commit` — Commit code trước khi tạo PR.
- `/git-sync` — Sync code trước khi tạo PR.
- `/git-merge` — Thay thế cho PR khi dự án solo.
- `/code-review` — Review code từ PR.

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
