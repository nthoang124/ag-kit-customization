---
trigger: model_decision
description: Áp dụng khi tạo branch, viết commit message, tạo PR, hoặc quản lý git workflow.
---

# Git Conventions

> [!IMPORTANT]
> **BẮT BUỘC**: Mọi git operations phải tuân theo chuẩn dưới đây để đảm bảo traceability và clean history.

## 1. Branch Naming

**Format**: `{type}/{ticket-or-short-description}`

| Type | Khi nào dùng | Ví dụ |
|:---|:---|:---|
| `feat/` | Tính năng mới | `feat/user-authentication` |
| `fix/` | Sửa bug | `fix/login-redirect-loop` |
| `hotfix/` | Fix khẩn cấp production | `hotfix/payment-crash` |
| `refactor/` | Cải thiện code, không đổi behavior | `refactor/extract-auth-service` |
| `docs/` | Chỉ thay đổi documentation | `docs/api-endpoints` |
| `chore/` | Config, dependencies, tooling | `chore/upgrade-nestjs-10` |
| `test/` | Chỉ thêm/sửa tests | `test/auth-e2e` |

**Rules:**
- Dùng kebab-case (lowercase, dấu gạch ngang)
- ❌ `Feature/UserAuth`, `fix_login`, `my-branch`
- ✅ `feat/user-auth`, `fix/login-redirect`

## 2. Commit Messages

**Format**: Conventional Commits, **Tiếng Việt** (theo rule communication.md)

```
{type}({scope}): {mô tả ngắn}

{body - giải thích chi tiết nếu cần}

{footer - breaking changes, references}
```

| Type | Mô tả |
|:---|:---|
| `feat` | Tính năng mới |
| `fix` | Sửa bug |
| `refactor` | Refactor code |
| `docs` | Thay đổi documentation |
| `test` | Thêm/sửa tests |
| `chore` | Config, build, deps |
| `style` | Format, whitespace (không đổi logic) |
| `perf` | Cải thiện performance |
| `ci` | CI/CD changes |

**Ví dụ:**

```
feat(auth): thêm chức năng đăng nhập bằng Google OAuth

- Tích hợp Google OAuth2 strategy
- Thêm callback endpoint /auth/google/callback
- Lưu refresh token vào secure cookie

Closes #42
```

```
fix(orders): sửa lỗi tính tổng đơn hàng khi có discount

Discount không được áp dụng cho items có quantity > 10.
Root cause: điều kiện so sánh sai trong calculateTotal().
```

## 3. Merge Strategy

```
main (production)
  ├── dev (integration)
  │   ├── feat/user-auth
  │   ├── feat/payment
  │   └── fix/cart-bug
  └── hotfix/critical-fix → merge to main + dev
```

- **Feature → dev**: Squash merge (1 clean commit)
- **dev → main**: Merge commit (giữ history)
- **hotfix → main**: Merge commit (khẩn cấp, merge vào dev sau)

## 4. .gitignore Essentials

```gitignore
# Dependencies
node_modules/
.venv/
__pycache__/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/settings.json
.idea/

# Build
dist/
build/
.next/
*.pyc

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

## 5. Decision Flow

```
┌─────────────────────────────────────────────────────────────┐
│ WHEN thực hiện git operations:                              │
├─────────────────────────────────────────────────────────────┤
│ 1. Tạo branch mới?                                         │
│    → Dùng format: {type}/{description} từ bảng trên        │
│ 2. Viết commit message?                                     │
│    → Conventional Commits + Tiếng Việt                      │
│    → Subject < 72 ký tự                                     │
│ 3. Merge PR?                                                │
│    → Feature → dev: Squash merge                            │
│    → dev → main: Merge commit                               │
│ 4. Tạo file mới?                                            │
│    → Kiểm tra .gitignore có bao gồm chưa                   │
└─────────────────────────────────────────────────────────────┘
```