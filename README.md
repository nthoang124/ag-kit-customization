# 🚀 Antigravity Agent — 10/10 Architecture Framework

> Hệ thống Agent thông minh hỗ trợ toàn bộ vòng đời phát triển phần mềm — tích hợp XAI Guardrails, tự động bảo vệ (Agent Defense) và tự kiểm toán (Linter).

---

## Giới thiệu

**Antigravity Agent** là một framework xây dựng trên kiến trúc **Skills + Workflows + Rules**, cho phép AI hoạt động như một đồng đội phát triển phần mềm thực thụ.

### Kiến trúc 3 lớp

```
┌─────────────────────────────────────────────────┐
│                    USER INPUT                    │
│         "Tôi muốn thêm tính năng X"             │
└──────────────────────┬──────────────────────────┘
                       │
              ┌────────▼────────┐
              │  _routing.md    │  ← Router tự động chọn workflow
              └────────┬────────┘
                       │
    ┌──────────────────▼──────────────────┐
    │           WORKFLOWS (34+)            │
    │  /cook, /plan, /debug, /deploy ...   │
    │                                      │
    │  ┌──────────────────────────────┐   │
    │  │   _workflow-protocol.md      │   │  ← Convention chung
    │  │   • Context Passing (3 kênh) │   │
    │  │   • Error Recovery (3 cấp)   │   │
    │  └──────────────────────────────┘   │
    └──────────────────┬──────────────────┘
                       │
    ┌──────────────────▼──────────────────┐
    │          SKILLS (14 personas)        │
    │  backend, frontend, qa, architect... │
    └──────────────────┬──────────────────┘
                       │
    ┌──────────────────▼──────────────────┐
    │          RULES (11 mandatory)        │
    │  security, performance, git, docs... │
    └─────────────────────────────────────┘
```

### Thành phần

| Thành phần | Vị trí | Mô tả |
|:---|:---|:---|
| **Workflows** | `.agent/workflows/` | 34+ quy trình làm việc có cấu trúc |
| **Skills** | `.agent/skills/` | 14 persona chuyên biệt (backend, frontend, QA...) |
| **Rules** | `.agent/rules/` | 11 quy tắc bắt buộc (security, docs, git, clean-code...) |
| **Router** | `.agent/workflows/_routing.md` | Bảng định tuyến tự động v2.1 |
| **Protocol** | `.agent/workflows/_workflow-protocol.md` | Convention chung cho context passing & error recovery |

---

## Cách sử dụng

### Cách 1: Nói tự nhiên (Khuyên dùng)

Agent tự động tra `_routing.md` để chọn workflow phù hợp:

```
"Tôi muốn thêm tính năng đăng nhập Google"
→ Agent chọn /cook (end-to-end)

"Sửa lỗi API trả về 500"
→ Agent chọn /debug (chưa biết root cause)

"Production bị crash"
→ Agent chọn /hotfix (khẩn cấp)
```

### Cách 2: Gọi trực tiếp Workflow

Khi biết rõ mình muốn gì:

```
/cook Thêm tính năng thanh toán VNPAY
/plan Thiết kế kiến trúc module báo cáo
/debug Tại sao hàm checkout trả về null?
/ask Module auth xử lý JWT refresh thế nào?
```

### Bảng Workflow theo mục đích

#### 💬 Hỏi & Nghiên cứu
| Workflow | Mô tả | Risk |
|:---|:---|:---:|
| `/ask` | Hỏi đáp về code/kiến trúc (read-only) | ⚪ |
| `/research` | Nghiên cứu chuyên sâu với báo cáo | ⚪ |
| `/brainstorm` | Brainstorm ý tưởng → PRD + Roadmap | ⚪ |

#### 💻 Phát triển
| Workflow | Mô tả | Risk |
|:---|:---|:---:|
| `/cook` | End-to-end: research → plan → code → test | 🔴 |
| `/code` | Code theo plan có sẵn (tự động) | 🔴 |
| `/development` | Task nhỏ (1-3 file), fix nhanh | 🟢 |
| `/implement-feature` | Feature phức tạp, review từng phase | 🔴 |
| `/plan` | Lên kế hoạch kỹ thuật (không code) | ⚪ |
| `/bootstrap` | Setup dự án từ đầu | 🔴 |
| `/refactor` | Dọn dẹp code, không đổi behavior | 🟢 |

#### 🐛 Debug & Fix
| Workflow | Mô tả | Risk |
|:---|:---|:---:|
| `/debug` | Debug khoa học: giả thuyết → chứng minh → fix | 🟢 |
| `/bug-fix` | Fix bug đã biết root cause | 🟢 |
| `/hotfix` | Fix khẩn cấp production | 🔴 |

#### 🧪 Testing & QA
| Workflow | Mô tả | Risk |
|:---|:---|:---:|
| `/gen-tests` | Sinh code test tự động (unit/E2E) | 🟢 |
| `/qa` | Tạo test plan/cases (tài liệu) | ⚪ |
| `/integration-test` | Test tích hợp cross-service | 🟢 |

#### 🔍 Review & Audit
| Workflow | Mô tả | Risk |
|:---|:---|:---:|
| `/code-review` | Review code/diff | ⚪ |
| `/project-review` | Audit toàn diện dự án | ⚪ |
| `/security-audit` | Audit bảo mật OWASP | ⚪ |
| `/performance-audit` | Audit hiệu năng | ⚪ |

#### 📚 Tài liệu
| Workflow | Mô tả | Risk |
|:---|:---|:---:|
| `/documentation` | Tạo tài liệu (OpenAPI, SDD, ERD) | ⚪ |
| `/update-docs` | Đồng bộ docs sau code changes | ⚪ |
| `/rebuild-design-docs` | Tái tạo design docs từ code | 🟢 |

#### 🔀 Git & Deploy
| Workflow | Mô tả | Risk |
|:---|:---|:---:|
| `/git-branch` | Tạo branch | 🟢 |
| `/git-commit` | Commit chuẩn Conventional Commits | 🟢 |
| `/git-sync` | Sync code từ dev (fetch & rebase) | 🔴 |
| `/git-merge` | Merge trực tiếp (solo/gấp) | 🔴 |
| `/git-pr` | Tạo Pull Request | 🟢 |
| `/deploy` | Deploy staging/production | 🔴 |

#### ⚙️ Khác
| Workflow | Mô tả | Risk |
|:---|:---|:---:|
| `/custom-behavior` | Thêm/sửa rule hoặc workflow | 🟢 |
| `/lint-format` | Lint & format code | 🟢 |
| `/break-tasks` | Chia nhỏ yêu cầu thành tasks | ⚪ |
| `/ui-ux-design` | Thiết kế UI/UX | ⚪ |
| `/review-docs` | Review tài liệu/artifacts | ⚪ |

### Risk Levels

| Icon | Level | Ý nghĩa |
|:---:|:---|:---|
| ⚪ | none | Chỉ đọc/phân tích, không thay đổi gì |
| 🟢 | safe | Thay đổi code, revertable dễ (`git checkout`) |
| 🔴 | critical | Thay đổi khó revert — Agent hỏi xác nhận trước |

### Workflow Chains (Chuỗi phổ biến)

```
🚀 Ship Feature:    /brainstorm → /plan → /git-branch → /cook → /gen-tests → /git-commit → /git-pr → /deploy
🐛 Fix Bug:         /debug → /bug-fix → /gen-tests → /git-commit → /git-pr
🔒 Hotfix:          /hotfix → /git-commit → /git-pr (main) → /git-merge (dev)
🛡️ Pre-Release:     /project-review → /security-audit → /performance-audit → /deploy
```

---

## Protocols

### Context Passing — Truyền dữ liệu giữa workflows

3 kênh truyền context (quy định trong `_workflow-protocol.md`):

| Kênh | Khi nào dùng | Ví dụ |
|:---|:---|:---|
| `{{args}}` | Data nhỏ, inline | `/cook Thêm nút Login` |
| Artifact file | Data có cấu trúc | `PRD.md`, `implementation_plan.md` |
| Frontmatter metadata | Khai báo dependency | `context_from`, `context_to` |

### Error Recovery — Xử lý lỗi tự động

3 cấp recovery (mỗi workflow có Recovery Map riêng):

| Cấp | Hành động | Ví dụ |
|:---|:---|:---|
| **Self-Heal** | Retry/fix tự động 3 lần | Lint error, test fail, compile error |
| **Rollback Step** | Quay lại bước trước | Approach sai → quay lại research |
| **Escalate** | Thông báo user | Bug ngoài khả năng agent |

---

## Cấu trúc thư mục

```
Agent/
├── .agent/
│   ├── rules/                  # Các quy tắc cốt lõi (12+ mandatory)
│   │   ├── agent-defense.md    # Chống Prompt Injection & Jailbreak (Zero-Trust)
│   │   ├── agent-mode-selection.md # Auto-Routing: PLANNING vs EXECUTION mode
│   │   ├── explainability.md   # Yêu cầu [XAI] Explainability Guardrails
│   │   ├── clean-code.md       # SOLID, DRY, KISS, YAGNI
│   │   ├── communication.md    # Luôn dùng tiếng Việt
│   │   ├── documents.md        # Cấu trúc docs/ Dewey Decimal
│   │   ├── security.md         # Security best practices
│   │   ├── performance.md      # Performance optimization
│   │   ├── error-handling.md   # Error handling patterns
│   │   ├── git-conventions.md  # Git workflow conventions
│   │   ├── tests.md            # Testing requirements
│   │   ├── research.md         # Research protocol 
│   │   ├── evaluation-framework.md  # Đánh giá khách quan
│   │   └── nano-banana.md      # Image generation
│   │
│   ├── scripts/                # Tự động hóa hệ thống Agent
│   │   ├── build-catalog.js    # Tự động scan đệ quy và build CATALOG.md
│   │   └── lint-agent.js       # CI/CD Agent Linter (Check YAML & XAI rules)
│   │
│   ├── workflows/              # 42+ quy trình có phân cấp thư mục
│   │   ├── _routing.md         # Router tự động (v2.1)
│   │   ├── _workflow-protocol.md  # Convention chung
│   │   ├── cook.md, code.md, plan.md ...
│   │   └── ...
│   │
│   └── skills/                 # 14 persona chuyên biệt
│       ├── backend-developer/
│       ├── frontend-developer/
│       ├── qa-tester/
│       ├── lead-architect/
│       ├── devops-engineer/
│       ├── designer/
│       ├── product-manager/
│       ├── researcher/
│       ├── business-analysis/
│       ├── ai-engineer/
│       ├── blockchain-engineer/
│       ├── data-engineer/
│       ├── rules-workflows/
│       └── skill-creator/
│
├── README.md                   # ← Bạn đang đây
└── .gitignore
```

---

## Định hướng phát triển

### Đã hoàn thành (10/10 Architecture) ✅

- [x] **XAI Guardrails**: Tính minh bạch AI ở mọi module rủi ro cao (Counterfactual Risk Assessment).
- [x] **Self-Defending System**: Rule `agent-defense.md` chống Prompt Injection & cách ly dữ liệu log rác.
- [x] **Self-Auditing System**: CI Linter `lint-agent.js` bắt lỗi YAML và XAI.
- [x] **Self-Documenting**: Script `build-catalog.js` tự động thiết kế lại Bảng `CATALOG.md` bằng cách quét `workflows/**/*.md`.
- [x] **Agent Mode Selection**: Tự động rẽ nhánh giữa `PLANNING` (Thiết kế) và `EXECUTION` (Thực thi nhanh).
- [x] 42+ workflows với cấu trúc rõ ràng (frontmatter, steps, limitations) và gom nhóm thành các Subdirectories.
- [x] Context Passing Protocol (3 kênh truyền dữ liệu giữa workflows)
- [x] Error Recovery Protocol (3 cấp: Self-Heal → Rollback → Escalate)

### Có thể mở rộng 🔮

- [ ] **Workflow cho AI/ML**: Tích hợp `ai-engineer` skill vào training/inference workflows
- [ ] **Workflow cho Data Pipeline**: Tích hợp `data-engineer` skill vào ETL workflows
- [ ] **Workflow cho Blockchain**: Tích hợp `blockchain-engineer` skill vào smart contract workflows
- [ ] **Multi-agent orchestration**: Cho phép nhiều agent cộng tác trên cùng 1 task
- [ ] **Metrics & Analytics**: Đo lường hiệu quả từng workflow (thời gian, success rate)
- [ ] **Custom skill creation**: Workflow hóa việc tạo skill mới từ template

---

## Nguyên tắc thiết kế

1. **Convention over Configuration** — Tuân thủ protocol chung, giảm quyết định ad-hoc
2. **Fail Safe** — Mọi workflow có Error Recovery Map; không bao giờ fail im lặng
3. **Context First** — Luôn kiểm tra context có sẵn trước khi hỏi user
4. **Tiếng Việt First** — Mọi giao tiếp bằng tiếng Việt, code/technical terms giữ nguyên
5. **Evidence-Based** — Đánh giá dựa trên bằng chứng, không cảm tính

---

> **Version**: 3.0.0 (10/10 Optimized Edition) | **Last Updated**: 2026-03-14
