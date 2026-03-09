---
name: rules-workflows
description: Use to standardize project context (Rules) or automate complex multi-step tasks (Workflows).
risk: safe
source: self
license: MIT
metadata:
  version: "1.0"
compatibility: Requires Antigravity CLI
allowed-tools: read_file write_to_file run_command
---

# Rules & Workflows Orchestrator

This skill outlines the standards for acting as an **Autonomous Process Orchestrator**, managing behavior and workflows to align with Agile best practices and project constraints.

## When to Use

- Tạo rules mới cho project (coding standards, naming conventions).
- Tạo/sửa workflows (quy trình dev, deploy, review).
- Orchestrate nhiều skills cho 1 task phức tạp.
- User yêu cầu tùy chỉnh agent behavior.

## When NOT to Use

- Tạo/nâng cấp skills → Dùng `skill-creator`.
- Code business logic → Dùng `backend-developer` / `frontend-developer`.
- Lên kế hoạch sản phẩm → Dùng `product-manager`.

---

## 🧠 Core Philosophy: Autonomy & Reasoning

**"Think before you Act"**

Before creating any rule or workflow, the Agent MUST:

1.  **Analyze the Goal**: What is the user trying to achieve?
2.  **Orchestrate Capabilities**: Identify which _other_ skills (Frontend, Backend, QA) are needed.
3.  **Separate Concerns**:
    - **Workflows** = Process (Steps, Sequences)
    - **Skills** = Knowledge (Standards, Implementation)

## 📚 Reference Library

This skill relies on specialized guides located in the `references/` directory. **You MUST consult these files for specific tasks.**

| Task                          | Reference File                         | Purpose                                                                         |
| :---------------------------- | :------------------------------------- | :------------------------------------------------------------------------------ |
| **Creating & Managing Rules** | `references/rules-guide.md`            | Standard Operating Procedures (SOPs), Context Injection, Rule Activation Types. |
| **Building Workflows**        | `references/workflows-guide.md`        | High-Performance Workflow Design, "Turbo" Execution, Checkpoints.               |
| **Orchestrating Skills**      | `references/orchestration-patterns.md` | Skill Chaining Patterns (e.g., Spec-First, TDD), Conflict Resolution.           |

---

## 1. Orchestration Strategy

**👉 For best practices on sequencing skills, refer to `references/orchestration-patterns.md`**.

Key principles:

1.  **Never Silo Skills**: Code requires Architecture; Design requires Requirements.
2.  **Sequential Thinking**: Use `sequential-thinking` for complex problems before acting.
3.  **Process vs. Knowledge**: Ensure workflows delegate "how-to" knowledge to the appropriate Skill.

---

## 2. Self-Correction & Learning

The Agent can modify its own rules (Meta-Programming).

- **User Correction**: "Don't do X anymore" -> Trigger `workflow-rule-from-feedback.md`.
- **New Project**: "Read this codebase" -> Trigger `workflow-rule-from-codebase.md`.

---

## 3. Orchestration Example

Khi user nói: "Tạo tính năng Payment cho SaaS":

```
Step 1: [product-manager]  → Tạo PRD (What & Why)
Step 2: [business-analysis] → Detailed specs + diagrams
Step 3: [lead-architect]    → Architecture decision (Stripe vs custom)
Step 4: [backend-developer] → API implementation
Step 5: [frontend-developer]→ UI implementation
Step 6: [qa-tester]         → Test cases + automation
Step 7: [devops-engineer]   → Deploy pipeline
```

**Key**: Workflow định nghĩa SEQUENCE, Skill định nghĩa HOW. Workflow KBAO gì code — chỉ delegate.

---

## ⚠️ Best Practices & Common Pitfalls

### ✅ Do

- **Keep workflows < 10 steps** — Quá dài = không ai theo.
- **1 rule = 1 concern** — Đừng gộp nhiều rules vào 1 file.
- **Mark risk level** — `risk: critical` cho workflows đụng production.
- **Use `// turbo` wisely** — Chỉ cho safe steps (lint, format, test).
- **Describe WHEN, not just HOW** — `description` field là routing key.

### ❌ Don’t

- **Don’t put code in workflows** — Workflows = process, Skills = knowledge.
- **Don’t skip KBAO dùng khi** — User cần biết boundary rõ ràng.
- **Don’t duplicate logic** — Nếu 2 workflows làm giống nhau, merge.
- **Don’t auto-run destructive ops** — `git push --force`, `rm -rf` = NEVER turbo.
- **Don’t forget router** — Mọi workflow mới phải được thêm vào `_routing.md`.

## Ví dụ Copy-Paste

```text
# Tạo rule mới
@rules-workflows Tạo rule enforce Vietnamese commit messages
cho tất cả git commits trong project.

# Tạo workflow mới
@rules-workflows Tạo workflow cho database migration:
backup → migrate → verify → rollback if fail.

# Tùy chỉnh behavior
@rules-workflows Sửa workflow /cook để thêm bước 
security check trước khi commit.
```

**Expected Output (Workflow file):**

```markdown
---
description: Database migration an toàn với backup và rollback.
type: procedure
risk: critical
source: self
required_skills: [backend-developer, devops-engineer]
---

## Bước 1: Backup Database
1. Chạy `pg_dump` tạo backup file.
// turbo
2. Verify backup file size > 0.

## Bước 2: Apply Migration
1. Chạy `npx prisma migrate deploy`.
2. Verify schema changes applied.

## Bước 3: Rollback (nếu fail)
1. Restore từ backup: `psql < backup.sql`.
```

---

## Giới hạn (Limitations)

- **Chỉ tạo files** — rules/workflows là Markdown files, không phải executable code.
- **Không validate tự động** — rule/workflow mới cần user test thủ công.
- **Phụ thuộc agent runtime** — rules chỉ hoạt động trong Antigravity/Gemini CLI.
- **Không version control** — không tự git commit rules mới.

---

## Related Skills

- `skill-creator` — Tạo skills (Knowledge), không phải workflows (Process).
- `lead-architect` — Khi cần architectural decision trước khi tạo workflow.
