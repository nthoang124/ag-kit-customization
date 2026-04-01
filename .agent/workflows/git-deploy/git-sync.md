---
description: Cập nhật code mới nhất từ dev về branch hiện tại (Fetch & Rebase)
type: procedure
risk: critical
source: self
required_skills: []
inputs: ["Current Branch"]
outputs: ["Updated Branch"]
context_from: ["/bất_kỳ"]
context_to: ["/bất_kỳ"]
context_artifacts:
  receives: ["task.md"]
  produces: []
---

# Workflow Cập nhật Code (`/git-sync`)

> [!IMPORTANT]
> **Mục tiêu**: Kéo code mới nhất từ `dev` về để tránh conflict sau này, giữ history sạch (Rebase).

## Khi nào dùng (When to Use)

- Trước khi tạo Pull Request.
- Khi team báo có update quan trọng trên `dev`.
- Mỗi sáng trước khi bắt đầu code.
- Khi branch feature đã chạy lâu (> 2 ngày) mà chưa sync.

## KHÔNG dùng khi (When NOT to Use)

- Đang ở trên branch `dev` hoặc `main` → Dùng `git pull` trực tiếp.
- Có uncommitted changes → Stash hoặc commit trước.
- Branch đã được merge → Không cần sync nữa.

---

## Các bước thực hiện

### Bước 1: Fetch dữ liệu mới

// turbo

```bash
git fetch origin
```

### Bước 2: Rebase với dev

> [!CAUTION]
> Chỉ chạy khi đang ở trên branch feature của bạn (KHÔNG PHẢI `dev` hay `main`).

```bash
git rebase origin/dev
```

### Bước 3: Xử lý Conflict (Nếu có)

- Nếu có conflict, git sẽ dừng lại.
- Sửa file conflict → `git add .` → `git rebase --continue`.
- Nếu muốn huỷ: `git rebase --abort`.

### Bước 4: Force Push (Nếu đã push trước đó)

> [!WARNING]
> Vì rebase thay đổi history, bạn cần force push (cẩn thận).

```bash
git push origin <your-branch> --force-with-lease
```

---

## Ví dụ Copy-Paste

```bash
# Sync đơn giản (chưa push branch)
git fetch origin
git rebase origin/dev

# Sync với force push (đã push branch trước đó)
git fetch origin
git rebase origin/dev
git push origin feat/user-auth --force-with-lease

# Xử lý conflict
git rebase origin/dev
# ... sửa file conflict ...
git add .
git rebase --continue

# Huỷ rebase nếu quá phức tạp
git rebase --abort
```

---

## Giới hạn (Limitations)

- **Force push bắt buộc** sau rebase — nếu nhiều người cùng làm trên 1 branch, rebase có thể gây mất code.
- Không tự resolve conflict — yêu cầu kiến thức Git cơ bản.
- `--force-with-lease` an toàn hơn `--force` nhưng vẫn có rủi ro nếu remote đã thay đổi.
- Không hoạt động trên `main` hoặc `dev` — chỉ dùng trên feature branch.

---

## Checklist

- [ ] Đang ở đúng feature branch (không phải dev/main)?
- [ ] Đã commit/stash hết thay đổi chưa?
- [ ] Đã resolve hết conflict chưa?

---

## Workflow liên quan

- `/git-branch` — Tạo branch ban đầu.
- `/git-pr` — Tạo PR sau khi sync xong.
- `/git-merge` — Merge trực tiếp (thay thế cho PR).

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
