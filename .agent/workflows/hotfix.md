---
description: Sửa lỗi khẩn cấp trên môi trường Production (Hotfix).
type: procedure
risk: critical
source: self
required_skills: [backend-developer, devops-engineer, qa-tester]
inputs: ["Production Incident", "Critical Bug"]
outputs: ["Hotfix Branch", "PR to Main"]
context_from: []
context_to: ["/git-commit", "/git-pr", "/git-merge"]
context_artifacts:
  receives: []
  produces: ["hotfix-branch", "committed code"]
---

# Quy trình Hotfix (`/hotfix`)

> [!WARNING]
> **CHỈ DÙNG CHO**: Lỗi nghiêm trọng ảnh hưởng trực tiếp đến người dùng hoặc dữ liệu trên Production.
> Không dùng cho bug thường, feature request.

## Khi nào dùng (When to Use)

- Lỗi khiến hệ thống **downtime** hoặc **mất dữ liệu** trên production.
- Lỗ hổng bảo mật nghiêm trọng đang bị khai thác.
- Lỗi ảnh hưởng trực tiếp đến doanh thu/người dùng cuối.

## KHÔNG dùng khi (When NOT to Use)

- Bug không ảnh hưởng production → Dùng `/bug-fix` hoặc `/debug`.
- Feature request → Dùng `/implement-feature`.
- Lỗi chỉ trên staging/dev → Dùng `/development`.
- Lỗi UI nhỏ không ảnh hưởng chức năng → Dùng `/bug-fix`.

## Điều kiện tiên quyết (Prerequisites)

- Xác nhận lỗi xảy ra trên **production thực tế** (không phải staging/dev).
- Có quyền push vào `main` (hoặc admin approve nhanh).
- Working tree sạch (không có uncommitted changes).

---

## Best Practices

- **"Minimal Change Only"**: Chỉ sửa đúng root cause. KHÔNG refactor, KHÔNG format code khác.
- **LUÔN merge ngược lại `dev`**: Quên bước này = regression 100%.
- **Viết test tái hiện** trước khi fix — chứng minh bug tồn tại, verify fix hoạt động.
- **Thông báo team** trước khi hotfix — tránh conflict với feature branches đang chạy.
- **Tag version** sau merge vào main để dễ rollback: `git tag v1.2.1-hotfix`.

---

## Các bước thực hiện

### Bước 1: Kiểm tra An toàn & Chuẩn bị

// turbo

1.  **Safety Check**:
    ```bash
    git status
    ```
    - Nếu có file chưa commit (dirty) → **DỪNG LẠI**. Yêu cầu user stash hoặc commit.

2.  **Sync Main**:
    ```bash
    git fetch origin main
    ```
    - Đảm bảo hotfix được tạo từ code production mới nhất.

### Bước 2: Khởi tạo Hotfix Branch

// turbo

1.  **Checkout & Reset**:
    ```bash
    git checkout main
    git reset --hard origin/main
    ```
2.  **Tạo Branch**:
    ```bash
    git checkout -b hotfix/<ticket-id>-<description>
    ```

### Bước 3: Minimal Fix

// turbo

1.  **Nguyên tắc**: "Change ít nhất có thể". Không refactor, không format code thừa.
2.  **Logic fix**: Sửa đúng chỗ gây lỗi.
3.  **Test**: Viết test case tái hiện lỗi và verify fix.

### Bước 4: Validation Kép

// turbo

1.  **Local Test**: Chạy unit test liên quan.
2.  **Pre-prod Check**: Nhờ user kiểm tra logic fix (nếu có thể).

### Bước 5: Release & Merge Back

1.  **Commit**: `/git-commit` với message `hotfix: ...`.
2.  **Merge to Main**: Tạo PR vào `main`.
3.  **Merge to Dev**: **QUAN TRỌNG** — phải merge ngược lại vào `dev` để đồng bộ code.
    ```bash
    git checkout dev
    git merge hotfix/...
    git push origin dev
    ```

---

## Ví dụ Copy-Paste

```bash
# Full hotfix flow
git fetch origin main
git checkout main && git reset --hard origin/main
git checkout -b hotfix/PROD-123-fix-payment-crash

# ... sửa code minimal ...
npm test
git add . && git commit -m "hotfix: sửa lỗi crash khi thanh toán vượt giới hạn"
git push origin hotfix/PROD-123-fix-payment-crash

# Tạo PR vào main
gh pr create --base main --title "hotfix: sửa lỗi crash thanh toán" --body "Root cause: integer overflow khi amount > MAX_INT"

# Sau khi merge main, đồng bộ lại dev
git checkout dev && git merge hotfix/PROD-123-fix-payment-crash && git push origin dev
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `{{args}}`**: Mô tả incident, error message, impact.
- **Đây là workflow khẩn cấp** — không chờ artifact từ workflow khác.

### Truyền Context (Output)
- **Cho `/git-commit`**: Hotfix commit message.
- **Cho `/git-pr`**: PR vào `main`.
- **Cho `/git-merge`**: Merge ngược lại vào `dev`.

### Fallback
- Nếu không rõ root cause → Dùng logic debug nhanh (không chạy full `/debug`).

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Bước 1: Safety Check | Retry git 3x | N/A | Notify user (git issue) |
| Bước 3: Fix | Fix & retry 3x | → Bước 2 (new branch) | **KHẨN**: Notify user ngay |
| Bước 4: Validation | Retry test 3x | → Bước 3 (re-fix) | **KHẨN**: Notify user ngay |
| Bước 5: Merge Back | Retry merge 3x | Manual merge | Notify user |

---

## Giới hạn (Limitations)

- **PHẢI merge ngược lại `dev`** — nếu quên, dev sẽ bị thiếu fix và regression xảy ra.
- **Không được refactor** trong hotfix — chỉ sửa đúng root cause.
- **Yêu cầu quyền push vào `main`** — nếu branch protected, cần admin approve.
- **Không hỗ trợ rollback** — nếu fix sai, cần tạo hotfix mới để revert.
- **Không test E2E** — chỉ unit test local, user cần verify trên staging nếu có.

---

## Checklist

- [ ] Đã xác nhận đây là lỗi production thực sự?
- [ ] Branch tạo từ `main` mới nhất?
- [ ] Fix minimal, không refactor?
- [ ] Test pass?
- [ ] Đã merge ngược lại `dev`?

---

## Workflow liên quan

- `/bug-fix` — Cho bug thường (không phải production).
- `/debug` — Khi cần debug sâu trước khi fix.
- `/git-pr` — Tạo PR cho hotfix.
