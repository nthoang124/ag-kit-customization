---
name: prompt-orchestrator
description: Use when building production-grade prompts by auto-detecting relevant skills (backend, frontend, security, etc.), loading their knowledge, and synthesizing an enriched prompt for execution via _routing.
risk: safe
source: self
license: MIT
metadata:
  version: "1.0"
  capabilities:
    - intent-analysis
    - multi-skill-synthesis
    - prompt-enrichment
    - automatic-routing
allowed-tools: read_file list_dir view_file
---

# Prompt Orchestrator — Tổng hợp Prompt Thông minh

Skill này tự động phân tích yêu cầu user, nhận diện các skills liên quan, tổng hợp kiến thức chuyên sâu từ chúng, và tạo ra một **enhanced prompt** để thực thi qua `_routing`.

## When to Use

- User nhập yêu cầu tự nhiên (không chỉ định skill/workflow cụ thể).
- Yêu cầu liên quan đến **nhiều domain** cùng lúc (backend + security + testing...).
- Cần tự động enrichment prompt trước khi thực thi.

## When NOT to Use

- User đã chỉ định rõ workflow (`/cook`, `/code`, `/plan`...) → Chạy thẳng workflow đó.
- Chỉ cần 1 skill đơn lẻ (`@Development/backend-developer`) → Gọi skill trực tiếp.
- Task thuần hỏi đáp / không cần code → Dùng `/ask`.

---

## Luồng Hoạt động (Pipeline)

```
User Input: "tạo REST API cho products với authentication"
        ↓
┌── Step 1: Intent Analysis ──────────────────────┐
│  Detect keywords: API, REST, auth, products     │
│  Detect action: tạo mới (create/implement)      │
└──────────────────────────────────────────────────┘
        ↓
┌── Step 2: Skill Mapping ────────────────────────┐
│  API + REST → backend-developer                 │
│  auth → backend-developer + security (rule)     │
│  tạo mới → qa-tester (cần test)                 │
│  Result: [backend-developer, qa-tester]         │
└──────────────────────────────────────────────────┘
        ↓
┌── Step 3: Context Loading ──────────────────────┐
│  Load backend-developer/SKILL.md → trích xuất:  │
│    • API Design standards                       │
│    • Security (Zero Trust)                      │
│    • Testing requirements                       │
│  Load qa-tester/SKILL.md → trích xuất:          │
│    • Unit test patterns                         │
│    • Coverage requirements                      │
└──────────────────────────────────────────────────┘
        ↓
┌── Step 4: Prompt Synthesis ─────────────────────┐
│  Tổng hợp Enhanced Prompt với:                  │
│    • Yêu cầu gốc của user                       │
│    • Standards từ skills đã load                 │
│    • Checklist phải tuân thủ                     │
│    • Suggested workflow                          │
└──────────────────────────────────────────────────┘
        ↓
┌── Step 5: Routing Handoff ──────────────────────┐
│  Phân tích scope → chọn workflow phù hợp        │
│  Chuyển enhanced prompt → workflow thực thi      │
└──────────────────────────────────────────────────┘
```

---

## Step 1: Intent Analysis — Bảng Ánh xạ Keyword → Skill

| Domain Keywords (VI / EN) | Skill | Priority |
|---|---|---|
| API, REST, GraphQL, database, server, backend, CRUD, migration | `backend-developer` | High |
| UI, component, responsive, animation, CSS, React, Vue, frontend | `frontend-developer` | High |
| bảo mật, OWASP, vulnerability, auth, JWT, encryption, security | `backend-developer` + rule `security.md` | High |
| test, coverage, QA, unit test, E2E, acceptance | `qa-tester` | Medium |
| CI/CD, deploy, Docker, Kubernetes, pipeline, infrastructure | `devops-engineer` | Medium |
| wireframe, design, UX, UI design, mockup, prototype, figma | `designer` | Medium |
| kiến trúc, microservice, monolith, scalability, system design | `lead-architect` | High |
| AI, ML, RAG, LLM, embedding, agent, prompt engineering | `ai-engineer` | High |
| data pipeline, ETL, warehouse, data lake, analytics | `data-engineer` | Medium |
| smart contract, blockchain, solidity, web3 | `blockchain-engineer` | Medium |
| PRD, roadmap, user story, epic, product, stakeholder | `product-manager` | Low |
| nghiên cứu, research, compare, evaluate, spike | `researcher` | Low |

**Quy tắc ưu tiên:**
- **High**: Load đầy đủ sections quan trọng từ SKILL.md.
- **Medium**: Load phần "Core Responsibilities" / "When to Use".
- **Low**: Chỉ note trong prompt, không load toàn bộ skill.

---

## Step 2: Context Loading — Trích xuất gì từ mỗi Skill

Khi load SKILL.md, chỉ trích xuất các sections **thực sự cần thiết** (tránh nhồi context):

| Section trong SKILL.md | Trích khi... |
|---|---|
| "Core Responsibilities" / "Core Philosophy" | **Luôn trích** — đây là standards chính |
| "When to Use" / "When NOT to Use" | Luôn trích — giúp xác nhận skill đúng |
| "Best Practices & Common Pitfalls" | Trích khi task là implementation |
| "Project Structure" | Trích khi task là tạo mới project/module |
| "Ví dụ Copy-Paste" | Trích khi task tương tự ví dụ |
| "Related Skills" | Trích để phát hiện thêm skills cần load |

---

## Step 3: Prompt Synthesis — Template Enhanced Prompt

```markdown
## 🎯 Yêu cầu
[Yêu cầu gốc của user, giữ nguyên]

## 📚 Skills đã tham chiếu
[Danh sách skills đã load, kèm lý do chọn]

## ✅ Standards phải tuân thủ
[Trích xuất từ skills — chỉ liệt kê rules bắt buộc]

### Từ `backend-developer`:
- [Rule 1]
- [Rule 2]

### Từ `qa-tester`:
- [Rule 1]

## ⚠️ Anti-patterns cần tránh
[Trích "Common Pitfalls" từ skills]

## 🔀 Đề xuất Workflow
- Workflow phù hợp: `/cook` (end-to-end implementation)
- Lý do: Task phức tạp vừa, cần research + plan + code + test
```

---

## Step 4: Routing Handoff — Logic chọn Workflow

| Tín hiệu từ phân tích | Workflow đề xuất |
|---|---|
| Task tạo mới end-to-end, cần research | `/cook` |
| Đã có plan, chỉ cần code | `/code` |
| Task nhỏ (1-3 file) | `/development` |
| Chỉ cần plan/kiến trúc | `/plan` |
| Cần debug/fix | `/debug` hoặc `/bug-fix` |
| Cần audit | `/security-audit` hoặc `/performance-audit` |

> [!IMPORTANT]
> Nếu không chắc chắn workflow nào → **hỏi user** với 2-3 options kèm mô tả.

---

## Ví dụ Copy-Paste

```text
# Phân tích và thực thi tự động
/prompt Tạo REST API cho module Products:
- CRUD endpoints với pagination
- JWT authentication
- Unit tests
- Deploy lên Vercel

# Prompt complex multi-domain
/prompt Thiết kế và triển khai dashboard analytics:
- Backend: data aggregation API
- Frontend: responsive charts (D3.js)
- Performance: caching strategy
- Security: rate limiting
```

---

## Giới hạn (Limitations)

- **Không thay thế workflow** — chỉ enrich prompt rồi delegate sang workflow.
- **Keyword-based detection** — có thể miss intent nếu user dùng từ ngữ không chuẩn.
- **Context budget** — chỉ load sections cần thiết, không nhồi toàn bộ SKILL.md.
- **Một chiều** — không có feedback loop, nếu workflow fail thì xử lý theo workflow's error recovery.

---

## Related Skills

- `skill-creator` — Tạo skills mới nếu thiếu skill cho domain cụ thể.
- `researcher` — Bổ sung research khi prompt cần thêm context.
- `rules-workflows` — Tạo workflow mới nếu cần custom flow.
