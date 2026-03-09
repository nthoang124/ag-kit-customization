# Antigravity Agent — Catalog

> Tạo lúc: 2026-03-10T02:08:00+07:00
> Phiên bản: 2.2.0

**Tổng:** 11 Rules · 14 Skills · 36 Workflows

---

## Rules (11)

| Rule | Mô tả | Trigger | Phạm vi |
| --- | --- | --- | --- |
| `clean-code` | SOLID, DRY, KISS, YAGNI, naming conventions, giới hạn dài file | `glob` | `**/*.{ts,tsx,js,jsx,py,go,java,rb,c,cpp,rs,css,html}` |
| `communication` | Bắt buộc tiếng Việt trong mọi tương tác và tài liệu | `model_decision` | Luôn áp dụng |
| `documents` | Cấu trúc docs/ Dewey Decimal, YAML frontmatter, wiki-linking | `model_decision` | Khi tạo/chỉnh sửa tài liệu |
| `error-handling` | Structured error responses, retry patterns, recovery protocols | `model_decision` | Khi viết code gọi API hoặc DB |
| `evaluation-framework` | Rubric đánh giá 10 tiêu chí, scoring, decision flow | `model_decision` | Khi đánh giá dự án hoặc audit |
| `git-conventions` | Branch naming, Conventional Commits (tiếng Việt), merge strategies | `model_decision` | Khi làm việc với Git |
| `nano-banana` | Hướng dẫn prompting cho `generate_image` tool | `model_decision` | Khi tạo hình ảnh/icon |
| `performance` | Database N+1, Web Vitals, bundle size, API response targets | `model_decision` | Khi viết code cần tối ưu |
| `research` | Proactive web search, multi-dimensional keywords, research docs | `model_decision` | Khi bắt đầu task mới |
| `security` | Secrets management, input validation (Zod/Pydantic), auth/authz | `model_decision` | Khi xử lý dữ liệu/xác thực |
| `tests` | Baseline tests, regression tests, test result reporting | `model_decision` | Khi thêm tính năng hoặc sửa lỗi |

---

## Skills (14)

| Skill | Mô tả | Version | References |
| --- | --- | --- | --- |
| `ai-engineer` | GenAI, Agentic Systems, Advanced RAG, Evaluation pipelines | 2.0 | 5 files: agentic-patterns, rag-advanced, evaluation, serving-optimization, llm |
| `backend-developer` | API Design, System Architecture, Security, Polyglot Dev (Node/Python/Go/Java) | 2.0 | 4 files |
| `blockchain-engineer` | Smart contracts, protocol architecture, security auditing | 2.0 | 4 files: deployment, evm, mechanisms, solidity |
| `business-analysis` | Requirements analysis, technical specifications, agile docs | 1.0 | 14 files |
| `data-engineer` | ETL/ELT, data warehousing, modeling, orchestration, quality | 1.0 | 6 files: dbt-patterns, airflow, dagster, pyspark, data-modeling, data-quality |
| `designer` | UI design, branding, design systems, accessibility auditing | 1.0 | 13 files |
| `devops-engineer` | CI/CD, Multi-Cloud Infrastructure, Observability | 2.0 | 4 files |
| `frontend-developer` | React 19+, Next.js 15+, performance, accessibility | 3.1 | 54 files (incl. React sub-skill) |
| `lead-architect` | System design, ADRs/RFCs, cloud infrastructure decisions | 1.0 | 5 files |
| `product-manager` | Product vision, agile roadmapping, RICE/Kano prioritization | 2.1 | 3 files |
| `qa-tester` | Test planning, test cases, bug reporting, E2E/Security/Perf tests | 1.4 | 12 files |
| `researcher` | Technical research, competitive analysis, technology evaluation | 1.0 | 1 ref + 2 templates |
| `rules-workflows` | Tạo/sửa Rules và Workflows, orchestrate skills | 1.0 | 4 files |
| `skill-creator` | Tạo skills mới, packaging, distribution | 1.0 | 1 file |

---

## Workflows (36)

### 🔧 Meta (2)

| Workflow | Mô tả | Risk |
| --- | --- | --- |
| `_routing` | Bảng chỉ dẫn chọn đúng workflow dựa trên ý định của user (v2.1) | — |
| `_workflow-protocol` | Convention chung cho Context Passing (3 kênh) và Error Recovery (3 cấp) | — |

### 💡 Lên Ý Tưởng & Phân Tích (5)

| Workflow | Mô tả | Risk |
| --- | --- | --- |
| `/ask` | Hỏi đáp về Codebase, Kiến trúc, hoặc Kiến thức chung | ⚪ none |
| `/brainstorm` | Phân tích ý tưởng cùng user, tạo tài liệu sơ bộ (Roadmap, PRD) | ⚪ none |
| `/plan` | Lập kế hoạch kỹ thuật và kiến trúc (không code) | ⚪ none |
| `/research` | Nghiên cứu sâu về chủ đề kỹ thuật hoặc thị trường (Technical Spike) | ⚪ none |
| `/break-tasks` | Điều phối việc chia nhỏ yêu cầu thành các task khả thi | ⚪ none |

### 🛠️ Code & Implement (7)

| Workflow | Mô tả | Risk |
| --- | --- | --- |
| `/code` | ⚡⚡⚡ Code & test theo plan có sẵn | 🟢 safe |
| `/cook` | ⚡⚡⚡ Triển khai tính năng end-to-end (research → plan → code → test) | 🟢 safe |
| `/development` | Workflow coding cơ bản: thay đổi nhỏ, sửa lỗi, tính năng nhỏ | 🟢 safe |
| `/implement-feature` | Điều phối triển khai tính năng từ đặc tả đến hoàn thành | 🟢 safe |
| `/bootstrap` | Thiết lập cấu trúc dự án, cài đặt dependencies, cấu hình môi trường | 🟢 safe |
| `/refactor` | Dọn dẹp code, tối ưu hóa, giảm nợ kỹ thuật (không đổi tính năng) | 🟢 safe |
| `/ui-ux-design` | Chuyển đổi yêu cầu thành thiết kế UI/UX toàn diện | 🟢 safe |

### 🐛 Debug & Fix (3)

| Workflow | Mô tả | Risk |
| --- | --- | --- |
| `/bug-fix` | Điều tra, tái hiện, sửa lỗi và đảm bảo không tái phát | 🟢 safe |
| `/debug` | Debug khoa học: Giả thuyết → Đo đạc → Tái hiện → Phân tích → Fix | 🟢 safe |
| `/hotfix` | Sửa lỗi khẩn cấp trên Production | 🔴 critical |

### ✅ Quality & Testing (6)

| Workflow | Mô tả | Risk |
| --- | --- | --- |
| `/gen-tests` | Tạo unit, E2E, security, performance tests (dùng qa-tester skill) | 🟢 safe |
| `/qa` | Tạo tài liệu test case và test plan toàn diện | ⚪ none |
| `/integration-test` | Kiểm tra luồng tích hợp giữa nhiều module/service | 🟢 safe |
| `/code-review` | Review nhanh các thay đổi trước khi merge (Diff Review) | ⚪ none |
| `/lint-format` | Chuẩn hóa code style bằng lint và formatter | 🟢 safe |
| `/performance-audit` | Đánh giá hiệu năng ứng dụng và tối ưu hóa bottlenecks | ⚪ none |
| `/security-audit` | Đánh giá bảo mật ứng dụng web theo OWASP | ⚪ none |

### 📦 Git & Deploy (7)

| Workflow | Mô tả | Risk |
| --- | --- | --- |
| `/git-branch` | Quản lý việc tạo branch mới từ dev | 🟢 safe |
| `/git-commit` | Commit code đúng chuẩn Conventional Commits (tiếng Việt) | 🟢 safe |
| `/git-sync` | Cập nhật code mới nhất từ dev về branch hiện tại (Fetch & Rebase) | 🟢 safe |
| `/git-merge` | Merge code trực tiếp vào branch chính (Fast Track Solo/Small) | 🔴 critical |
| `/git-pr` | Tạo Pull Request (PR) và Merge | 🟢 safe |
| `/deploy` | Triển khai ứng dụng lên staging/production an toàn | 🔴 critical |

### 📝 Documentation (5)

| Workflow | Mô tả | Risk |
| --- | --- | --- |
| `/documentation` | Tạo tài liệu toàn diện (Kiến trúc, API, Specs) | ⚪ none |
| `/update-docs` | Đồng bộ tài liệu kỹ thuật sau khi code thay đổi | ⚪ none |
| `/review-docs` | Review tài liệu: chính xác kỹ thuật, logic, chất lượng biên tập | ⚪ none |
| `/rebuild-design-docs` | Tái tạo toàn bộ tài liệu thiết kế từ code hiện có | ⚪ none |
| `/project-review` | Audit toàn diện dự án (Architecture, Tech Debt, Security, Tests, Docs) | ⚪ none |

### ⚙️ Agent Management (1)

| Workflow | Mô tả | Risk |
| --- | --- | --- |
| `/custom-behavior` | Tùy chỉnh Rule/Workflow an toàn, có phân tích tác động và xác nhận user | 🟢 safe |

---

## Thống Kê

| Metric | Giá trị |
| --- | --- |
| **Tổng Rules** | 11 |
| **Tổng Skills** | 14 (+ 1 sub-skill: react) |
| **Tổng Workflows** | 36 (2 meta + 34 executable) |
| **Tổng Reference Files** | ~130 files across all skills |
| **Risk Levels** | ⚪ none: 14 · 🟢 safe: 17 · 🔴 critical: 3 |
| **Languages** | Tiếng Việt (primary), English (code/references) |
| **Framework Version** | 2.2.0 |
