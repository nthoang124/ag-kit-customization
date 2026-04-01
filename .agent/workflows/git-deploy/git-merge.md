---
description: Merge code trực tiếp vào branch chính (Fast Track cho Solo/Small Project).
type: procedure
risk: critical
source: self
required_skills: []
inputs: ["Feature Branch", "Target Branch (default: dev)"]
outputs: ["Merged Code"]
context_from: ["/bất_kỳ"]
context_to: ["/bất_kỳ"]
context_artifacts:
  receives: ["task.md"]
  produces: []
---

# Workflow Merge Trực Tiếp (`/git-merge`)

> [!WARNING]
> **NGUY CƠ CAO**: Workflow này bỏ qua bước Code Review của người khác.
> Bạn phải TỰ chịu trách nhiệm về chất lượng code.

## Khi nào dùng (When to Use)

- Dự án cá nhân (solo developer) không cần PR review.
- Cần deploy gấp và không có reviewer online.
- Branch nhỏ (< 5 commits) đã tự review kỹ.

## KHÔNG dùng khi (When NOT to Use)

- Team > 2 người → Dùng `/git-pr` để có code review.
- Branch có > 10 commits chưa review → Cần review trước.
- Merge vào `main` (production) → Dùng `/hotfix` hoặc PR chính thức.
- Code chưa qua test → Chạy test trước.

---

## Các bước thực hiện

### 1. Safety Check (BẮT BUỘC)

// turbo

Trước khi merge, phải đảm bảo code đạt chuẩn.

```bash
# 1. Kiểm tra linter
npm run lint

# 2. Chạy test (nếu có)
npm test
```

> **STOP**: Nếu lệnh trên thất bại, **KHÔNG ĐƯỢC MERGE**. Hãy sửa lỗi trước.

### 2. Chuẩn bị Branch Đích

```bash
# Chuyển sang branch đích (thường là dev)
git checkout dev

# Cập nhật code mới nhất từ server
git pull origin dev
```

### 3. Thực hiện Merge

```bash
# Merge branch tính năng vào dev
git merge <feature-branch-name>
```

**Xử lý Conflict (Nếu có):**
1.  Nếu có conflict, Git sẽ báo lỗi.
2.  Mở editor, sửa các file bị conflict.
3.  Chạy `git add .` và `git commit` để hoàn tất merge.

### 4. Đẩy code & Cleanup

```bash
# Push lên server
git push origin dev

# (Tùy chọn) Xóa branch feature sau khi merge xong
git branch -d <feature-branch-name>
```

---

## Ví dụ Copy-Paste

```bash
# Full flow merge feature vào dev
npm run lint && npm test
git checkout dev && git pull origin dev
git merge feat/user-login
git push origin dev
git branch -d feat/user-login
```

---

## Giới hạn (Limitations)

- **Không có code review** — toàn bộ rủi ro chất lượng nằm trên dev duy nhất.
- **Không hỗ trợ merge vào `main`** — dùng `/hotfix` hoặc `/git-pr` cho production.
- **Không tự resolve conflict** — yêu cầu xử lý thủ công.
- **Không tạo merge commit message chuẩn** — Git tự generate message.
- **Không revert được dễ dàng** nếu merge sai — cân nhắc backup branch trước.

---

## Checklist Tự Review

- [ ] Đã chạy `npm run lint` chưa?
- [ ] Đã chạy `npm test` chưa?
- [ ] Đã kiểm tra lại logic lần cuối chưa?
- [ ] Đã chắc chắn không làm hỏng tính năng cũ không?

---

## Workflow liên quan

- `/git-pr` — Thay thế an toàn hơn (có code review).
- `/git-sync` — Sync code trước khi merge.
- `/hotfix` — Merge vào production (main).

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
