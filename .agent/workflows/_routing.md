---
description: Bảng chỉ dẫn chọn đúng workflow dựa trên ý định của user.
type: routing
risk: none
version: "2.1"
last_updated: "2026-03-10"
---

# 🗺️ Workflow Router — Chọn đúng workflow

> [!TIP]
> Agent sử dụng bảng này để tự động chọn workflow phù hợp dựa trên input của user.
> **Protocol**: Tất cả workflows tuân thủ `_workflow-protocol.md` (Context Passing + Error Recovery).

---

## Risk Level Definitions

| Level | Ký hiệu | Định nghĩa | Hành vi Agent |
|:---|:---:|:---|:---|
| **none** | ⚪ | Chỉ đọc/phân tích, không thay đổi code hoặc data | Chạy ngay, không cần confirm |
| **safe** | 🟢 | Thay đổi code nhưng revertable dễ dàng (`git checkout`) | Chạy, auto-commit checkpoint |
| **critical** | 🔴 | Thay đổi khó revert (deploy, merge main, xóa data, setup project) | **BẮT BUỘC** user confirm trước khi chạy |

---

## Bảng Routing Nhanh

### 💬 "Tôi muốn..."

| Ý định | Workflow | Risk | Keywords (VI / EN) |
|:---|:---|:---:|:---|
| **Hỏi câu hỏi** về code/kiến trúc | `/ask` | ⚪ | hỏi, giải thích, tại sao / ask, explain, why, how |
| **Nghiên cứu** chủ đề kỹ thuật/thị trường | `/research` | ⚪ | nghiên cứu, tìm hiểu, so sánh / research, explore, compare |
| **Brainstorm** ý tưởng sản phẩm, tạo PRD/Roadmap | `/brainstorm` | ⚪ | ý tưởng, brainstorm, PRD / idea, roadmap, vision |
| **Lên kế hoạch** kỹ thuật (không code) | `/plan` | ⚪ | kế hoạch, thiết kế, kiến trúc / plan, design, architecture |
| **Chia nhỏ** yêu cầu thành tasks | `/break-tasks` | ⚪ | chia nhỏ, break, task list / breakdown, split, decompose |
| **Thiết kế UI/UX** | `/ui-ux-design` | ⚪ | UI, UX, wireframe, mockup / design, layout, prototype |

---

### 💻 "Tôi muốn CODE..."

| Tình huống | Workflow | Risk | Keywords (VI / EN) |
|:---|:---|:---:|:---|
| Feature end-to-end (research → plan → code → test) | `/cook` | 🔴 | cook, feature mới, triển khai / build, implement, ship |
| Code theo plan có sẵn | `/code` | 🔴 | code theo plan, triển khai plan / implement plan, execute |
| Task nhỏ (1-3 file, fix nhanh) | `/development` | 🟢 | sửa nhanh, thay đổi nhỏ / quick fix, small change, tweak |
| Feature phức tạp, cần review từng phase | `/implement-feature` | 🔴 | feature phức tạp, nhiều module / complex feature, multi-phase |
| Refactor code (không đổi behavior) | `/refactor` | 🟢 | refactor, dọn dẹp, tối ưu / clean up, optimize, restructure |
| Setup dự án từ đầu | `/bootstrap` | 🔴 | setup, khởi tạo, init / scaffold, initialize, create project |

---

### 🐛 "Tôi muốn FIX..."

| Tình huống | Workflow | Risk | Keywords (VI / EN) |
|:---|:---|:---:|:---|
| Bug đã biết root cause, fix nhanh | `/bug-fix` | 🟢 | fix bug, sửa lỗi / fix, patch, known bug |
| Bug chưa biết root cause, cần debug | `/debug` | 🟢 | debug, tìm nguyên nhân / investigate, trace, root cause |
| Bug production khẩn cấp | `/hotfix` | 🔴 | hotfix, production, khẩn cấp / urgent, critical, outage |

---

### 🧪 "Tôi muốn TEST..."

| Tình huống | Workflow | Risk | Keywords (VI / EN) |
|:---|:---|:---:|:---|
| Viết code test (unit/E2E) | `/gen-tests` | 🟢 | viết test, unit test / write tests, coverage |
| Test tích hợp giữa nhiều service | `/integration-test` | 🟢 | test tích hợp / integration test, cross-service |
| Tạo test plan/cases (tài liệu, không code) | `/qa` | ⚪ | test plan, test cases / QA plan, acceptance criteria |

---

### 🔍 "Tôi muốn REVIEW/AUDIT..."

| Tình huống | Workflow | Risk | Keywords (VI / EN) |
|:---|:---|:---:|:---|
| Review code từ PR/diff | `/code-review` | ⚪ | review code, PR review / code review, diff review |
| Review tài liệu/artifacts | `/review-docs` | ⚪ | review tài liệu / review docs, check docs |
| Audit toàn diện dự án | `/project-review` | ⚪ | audit, đánh giá dự án / project audit, health check |
| Audit bảo mật (OWASP) | `/security-audit` | ⚪ | bảo mật, OWASP / security, vulnerability, pen-test |
| Audit hiệu năng (performance) | `/performance-audit` | ⚪ | hiệu năng, tốc độ / performance, bottleneck, latency |

---

### 📚 "Tôi muốn DOCS..."

| Tình huống | Workflow | Risk | Keywords (VI / EN) |
|:---|:---|:---:|:---|
| Tạo tài liệu mới (OpenAPI, SDD, ERD) | `/documentation` | ⚪ | tạo tài liệu, API docs / create docs, OpenAPI, ERD |
| Cập nhật docs sau khi code thay đổi | `/update-docs` | ⚪ | đồng bộ tài liệu / sync docs, update docs |
| Tái tạo toàn bộ design docs | `/rebuild-design-docs` | 🟢 | tái tạo tài liệu / rebuild docs, regenerate |

---

### 🔀 "Tôi muốn GIT..."

| Tình huống | Workflow | Risk | Keywords (VI / EN) |
|:---|:---|:---:|:---|
| Tạo branch | `/git-branch` | 🟢 | tạo branch / new branch, checkout |
| Commit code | `/git-commit` | 🟢 | commit, lưu / save, commit |
| Sync code từ dev (rebase) | `/git-sync` | 🔴 | sync, rebase / pull, fetch, update |
| Merge trực tiếp (solo/gấp) | `/git-merge` | 🔴 | merge, gộp code / merge, squash |
| Tạo Pull Request | `/git-pr` | 🟢 | PR, pull request / PR, merge request |

---

### 🚀 "Tôi muốn DEPLOY..."

| Tình huống | Workflow | Risk | Keywords (VI / EN) |
|:---|:---|:---:|:---|
| Deploy staging/production | `/deploy` | 🔴 | deploy, release / deploy, ship, publish |
| Fix production gấp (tự deploy) | `/hotfix` | 🔴 | hotfix, khẩn cấp / urgent fix, production crash |

---

### ⚙️ "Tôi muốn TÙY CHỈNH..."

| Tình huống | Workflow | Risk | Keywords (VI / EN) |
|:---|:---|:---:|:---|
| Thêm/sửa rule hoặc workflow | `/custom-behavior` | 🟢 | rule, workflow, tùy chỉnh / customize, config |
| Lint & format code | `/lint-format` | 🟢 | lint, format / prettier, eslint, style |

---

## Disambiguation — Xử lý Intent Nhập nhằng

> [!IMPORTANT]
> Khi user input match **nhiều hơn 1 workflow**, Agent PHẢI dùng logic dưới đây.

### Quy tắc ưu tiên (Priority Rules)

```
1. URGENCY FIRST — Nếu có từ khóa khẩn cấp → Chọn workflow critical
   "production lỗi" → /hotfix (không phải /debug)

2. SCOPE NEXT — Đánh giá quy mô thay đổi
   1-3 files     → /development hoặc /bug-fix
   4-10 files    → /cook hoặc /code
   > 10 files    → /implement-feature

3. KNOWLEDGE LEVEL — Đánh giá mức độ hiểu biết
   Đã biết cách fix    → /bug-fix, /code, /development
   Chưa biết root cause → /debug, /research
   Chưa có plan         → /plan, /brainstorm

4. ASK IF STILL AMBIGUOUS — Nếu vẫn match > 1 workflow
   → Hỏi user: "Tôi thấy request này có thể dùng [A] hoặc [B].
      Anh muốn [mô tả A] hay [mô tả B]?"
```

### Bảng Compound Intent (Intent kết hợp)

| User nói... | Rule áp dụng | Chọn |
|:---|:---|:---|
| "Fix bug + thêm validation" | Scope: 1-3 files | `/development` |
| "Nghiên cứu rồi code luôn" / "Research then build" | Scope: end-to-end | `/cook` |
| "Debug xong fix luôn" / "Investigate and fix" | Knowledge: chưa rõ cause | `/debug` (tự bao gồm fix ở Bước 3) |
| "Review code rồi fix" / "Review then patch" | Sequence: 2 workflows | `/code-review` → `/bug-fix` (chain) |
| "Lên plan rồi chia task" / "Plan and break down" | Knowledge: chưa có plan | `/plan` (tự output `task.md`) |
| "Fix production crash" / "Prod is down" | **Urgency First** | `/hotfix` (Rule 1) |
| "Refactor + viết test" / "Refactor with tests" | Sequence: test first | `/gen-tests` → `/refactor` (chain) |
| "Tạo project từ đầu" / "Start from scratch" | Scope: full project | `/bootstrap` → `/cook` (chain) |
| "Deploy sau khi fix xong" / "Fix then deploy" | Urgency + sequence | `/bug-fix` → `/git-commit` → `/deploy` (chain) |
| "Audit rồi release" / "Audit before release" | Sequence: review first | `/project-review` → `/deploy` (chain) |

---

## Workflow Chains — với Context Flow

### 🚀 Ship Feature mới
```
/brainstorm ──[PRD.md]──→ /plan ──[implementation_plan.md]──→ /git-branch → /cook ──[walkthrough.md]──→ /gen-tests ──[test-report.md]──→ /git-commit → /git-pr → /deploy
```

### 🐛 Fix Bug
```
/debug ──[debug-findings.md]──→ /bug-fix ──[walkthrough.md]──→ /gen-tests ──[test-report.md]──→ /git-commit → /git-pr
```

### 🔁 Refactor
```
/gen-tests ──[test-report.md]──→ /refactor ──[walkthrough.md]──→ /git-commit → /git-pr
```

### 📚 Documentation
```
/documentation ──[docs/*.md]──→ /review-docs → /git-commit
```

### 🔒 Production Hotfix
```
/hotfix ──[hotfix-branch]──→ /git-commit → /git-pr (to main) → /git-merge (to dev)
```

### 🛡️ Pre-Release Audit
```
/project-review ──[audit-report.md]──→ /security-audit → /performance-audit → /deploy
```

### 🔬 Research → Plan (không code)
```
/research ──[research-insights.md]──→ /plan ──[implementation_plan.md]──→ /break-tasks ──[task.md]──→ (chờ user chọn /code hoặc /cook)
```

### 🏗️ Bootstrap → Develop
```
/bootstrap ──[project scaffold]──→ /cook ──[walkthrough.md]──→ /gen-tests → /git-commit → /deploy
```

### 🧪 QA → Fix → Retest
```
/qa ──[test-plan.md]──→ /debug ──[debug-findings.md]──→ /bug-fix ──[walkthrough.md]──→ /gen-tests → /git-commit
```

### 🔄 Fix → Deploy (nhanh)
```
/bug-fix ──[walkthrough.md]──→ /git-commit → /git-pr → /deploy
```

---

## Checklist: Thêm Workflow Mới

Khi tạo workflow mới, cập nhật file này theo thứ tự:

- [ ] Thêm row vào **Bảng Routing Nhanh** (đúng category)
- [ ] Thêm **Keywords** song ngữ (VI / EN)
- [ ] Gán **Risk Level** đúng định nghĩa (⚪/🟢/🔴)
- [ ] Nếu workflow nằm trong chain → cập nhật **Workflow Chains**
- [ ] Nếu có overlap với workflow khác → thêm vào **Compound Intent**
- [ ] Bump `version` và `last_updated` trong frontmatter
- [ ] Workflow file PHẢI có `## Context Protocol` + `## Error Recovery` (theo `_workflow-protocol.md`)

---

## Protocol Reference

> [!IMPORTANT]
> Tất cả workflows tuân thủ **`_workflow-protocol.md`** bao gồm:
> - **Context Passing**: 3 kênh (`{{args}}`, artifact file, frontmatter metadata)
> - **Error Recovery**: 3 cấp (Self-Heal → Rollback Step → Escalate)
> - **Recovery Map**: Mỗi workflow có bảng recovery riêng cho từng step
