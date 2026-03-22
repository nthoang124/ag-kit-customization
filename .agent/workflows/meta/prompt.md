---
description: Tự động phân tích yêu cầu, tổng hợp kiến thức từ skills liên quan, viết enhanced prompt và chuyển sang workflow phù hợp.
type: meta-orchestrator
risk: none
source: self
required_skills: [prompt-orchestrator]
inputs: ["User Request (natural language)"]
outputs: ["Enhanced Prompt", "Selected Workflow Execution"]
context_from: []
context_to: ["/_routing"]
context_artifacts:
  receives: []
  produces: ["enhanced-prompt (inline)"]
---

**QUAN TRỌNG**: Bạn là Prompt Orchestrator. Bạn **KHÔNG** trực tiếp code. Nhiệm vụ: phân tích yêu cầu → tổng hợp kiến thức từ skills → tạo enhanced prompt → chuyển sang workflow thực thi.

Phân tích yêu cầu sau và thực hiện pipeline:
<request>{{args}}</request>

---

## Khi nào dùng (When to Use)

- User nhập yêu cầu tự nhiên, không chỉ định workflow/skill cụ thể.
- Yêu cầu phức tạp liên quan nhiều domain (backend + frontend + security...).
- Muốn AI tự động "nghĩ" trước khi làm — enriching prompt trước khi thực thi.

## KHÔNG dùng khi (When NOT to Use)

- User đã chỉ định workflow (`/cook`, `/code`) → Chạy thẳng.
- User đã chỉ định skill (`@backend-developer`) → Gọi trực tiếp.
- Task đơn giản chỉ cần trả lời → `/ask`.

---

## Trình tự Workflow

**Quy tắc:** Tuân thủ 5 bước. Mỗi bước yêu cầu output marker.

### Step 1: Intent Analysis (BẮT BUỘC)

Phân tích `{{args}}`:
1. Detect **domain keywords** từ bảng ánh xạ trong `prompt-orchestrator/SKILL.md`.
2. Detect **action type**: tạo mới / sửa / debug / audit / thiết kế / nghiên cứu.
3. Detect **scope**: số file/module dự kiến (nhỏ/vừa/lớn).

**Output:** `✓ Step 1: Intent detected — Domains: [X, Y, Z] | Action: [type] | Scope: [size]`

### Step 2: Skill Mapping & Context Loading

1. Ánh xạ keywords → skills theo bảng trong `prompt-orchestrator/SKILL.md`.
2. Với mỗi skill (priority High/Medium):
   - `view_file` đọc `.agent/skills/{skill-name}/SKILL.md`
   - Trích xuất: Core Responsibilities, Best Practices, Anti-patterns
3. Với rules liên quan (security, performance...):
   - Đọc `.agent/rules/{rule}.md` nếu cần

**Output:** `✓ Step 2: Loaded [N] skills — [skill1, skill2, ...] | [M] rules`

### Step 3: Prompt Synthesis

Tổng hợp **Enhanced Prompt** theo template trong `prompt-orchestrator/SKILL.md`:
- Yêu cầu gốc
- Skills đã tham chiếu + lý do
- Standards bắt buộc (từ skills)
- Anti-patterns cần tránh
- Workflow đề xuất

**Output:** `✓ Step 3: Enhanced Prompt ready — [X] standards | [Y] anti-patterns`

### Step 4: Routing Decision

Áp dụng logic routing:
1. Dựa trên action type + scope → chọn workflow phù hợp (xem bảng trong SKILL.md)
2. Nếu ambiguous → hỏi user 2-3 options
3. Xác nhận workflow được chọn

**Output:** `✓ Step 4: Selected workflow — /[workflow-name] | Reason: [lý do]`

### Step 5: Handoff & Execute

Chuyển enhanced prompt sang workflow đã chọn:
1. Gọi workflow với enhanced prompt làm `{{args}}`
2. Workflow sẽ thực thi theo quy trình riêng của nó

**Output:** `✓ Step 5: Handoff to /[workflow-name] — Executing...`

---

## Ví dụ End-to-End

**Input:** `/prompt Tạo REST API cho products với JWT auth và unit tests`

```
✓ Step 1: Intent detected — Domains: [backend, security, testing] | Action: create | Scope: medium (4-8 files)
✓ Step 2: Loaded 2 skills — [backend-developer, qa-tester] | 1 rules [security.md]
✓ Step 3: Enhanced Prompt ready — 8 standards | 5 anti-patterns
✓ Step 4: Selected workflow — /cook | Reason: end-to-end, cần research + plan + code + test
✓ Step 5: Handoff to /cook — Executing...
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `{{args}}`**: Yêu cầu tự nhiên của user.
- **Từ Knowledge Base**: Nếu có knowledge entries liên quan (brand, code standards...).

### Truyền Context (Output)
- **Cho workflow được chọn**: Enhanced prompt (inline qua `{{args}}`).
- Enhanced prompt chứa đầy đủ context để workflow không cần re-analyze.

### Fallback
- Nếu `{{args}}` quá mơ hồ → Hỏi user làm rõ trước khi tiếp tục.
- Nếu không detect được skill nào → Chuyển thẳng sang `_routing` với prompt gốc.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Step 1: Intent | Retry phân tích với synonyms | N/A | Hỏi user chỉ rõ domain |
| Step 2: Loading | Skip skill không tìm thấy | → Step 1 (re-analyze) | Notify user skill missing |
| Step 3: Synthesis | Giảm bớt context nếu quá lớn | → Step 2 (re-load ít hơn) | Dùng prompt gốc |
| Step 4: Routing | Hỏi user chọn workflow | N/A | Gợi ý `/cook` mặc định |

---

## Giới hạn (Limitations)

- **Không thực thi code** — chỉ orchestrate prompt, delegate sang workflow.
- **Phụ thuộc skill files** — nếu SKILL.md bị thiếu/lỗi, context loading sẽ incomplete.
- **Keyword-based** — có thể miss intent nếu user dùng từ ngữ rất khác biệt.
- **1 lần routing** — không có cycle, nếu workflow fail thì theo error recovery của workflow đó.

---

## Workflow liên quan

- `/_routing` — Bảng routing gốc, `/prompt` bổ sung thêm layer enrichment.
- `/cook` — Workflow thường được chọn nhất cho task end-to-end.
- `/code` — Cho task đã có plan.
- `/plan` — Cho task chỉ cần lên kế hoạch.
