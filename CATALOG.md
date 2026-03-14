# Antigravity Agent — Catalog

> Tạo lúc: 2026-03-14T00:46:00+07:00
> Phiên bản: 2.3.1

**Tổng:** 12 Rules · 15 Skills · 42 Workflows

---

## Rules (12)

| Rule | Mô tả | Trigger | Phạm vi |
| --- | --- | --- | --- |
| `clean-code` | SOLID, DRY, KISS, YAGNI, naming conventions, giới hạn dài file | `glob` | `**/*.{ts,tsx,js,jsx,py,go,java,rb,c,cpp,rs,css,html}` |
| `communication` | Bắt buộc tiếng Việt trong mọi tương tác và tài liệu | `model_decision` | Luôn áp dụng |
| `context-retrieval` | Bắt buộc tìm và đọc tài liệu thực tế (qua chub/web) thay vì tự đoán | `model_decision` | Khi dùng external API/SDK |
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

## Skills (15)

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
| `get-api-docs` | Tìm kiếm và lấy tài liệu bằng chub thay vì tự đoán từ model | 1.0 | 1 file |
| `lead-architect` | System design, ADRs/RFCs, cloud infrastructure decisions | 1.0 | 5 files |
| `product-manager` | Product vision, agile roadmapping, RICE/Kano prioritization | 2.1 | 3 files |
| `qa-tester` | Test planning, test cases, bug reporting, E2E/Security/Perf tests | 1.4 | 12 files |
| `researcher` | Technical research, competitive analysis, technology evaluation | 1.0 | 1 ref + 2 templates |
| `rules-workflows` | Tạo/sửa Rules và Workflows, orchestrate skills | 1.0 | 4 files |
| `skill-creator` | Tạo skills mới, packaging, distribution | 1.0 | 1 file |

---

## Workflows (42)

### 🔧 Meta (2)

| Workflow | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `_routing` | [_routing.md](./.agent/workflows/meta/_routing.md) | Bảng chỉ dẫn chọn đúng workflow dựa trên ý định của user. | ⚪ none |
| `_workflow-protocol` | [_workflow-protocol.md](./.agent/workflows/meta/_workflow-protocol.md) | Convention chung cho Context Passing và Error Recovery giữa các workflows. | ⚪ none |

### 💡 Lên Ý Tưởng & Phân Tích (6)

| Workflow | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/ask` | [ask.md](./.agent/workflows/analysis/ask.md) | Hỏi đáp về Codebase, Kiến trúc, hoặc Kiến thức chung. | ⚪ none |
| `/brainstorm` | [brainstorm.md](./.agent/workflows/analysis/brainstorm.md) | Phân tích ý tưởng cùng user và tạo các tài liệu sơ bộ mức cao (Roadmap, PRD). | ⚪ none |
| `/break-tasks` | [break-tasks.md](./.agent/workflows/analysis/break-tasks.md) | Điều phối việc chia nhỏ yêu cầu thành các task khả thi để triển khai. | ⚪ none |
| `/plan` | [plan.md](./.agent/workflows/analysis/plan.md) | Lập kế hoạch kỹ thuật và kiến trúc (không bao gồm code/implement). | ⚪ none |
| `/research` | [research.md](./.agent/workflows/analysis/research.md) | Nghiên cứu sâu về một chủ đề kỹ thuật hoặc thị trường (Technical Spike). | ⚪ none |
| `/ui-ux-design` | [ui-ux-design.md](./.agent/workflows/analysis/ui-ux-design.md) | Chuyển đổi yêu cầu thành các thiết kế UI/UX toàn diện. | ⚪ none |

### 🛠️ Code & Implement (6)

| Workflow | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/bootstrap` | [bootstrap.md](./.agent/workflows/coding/bootstrap.md) | Thiết lập cấu trúc dự án, cài đặt dependencies, và cấu hình môi trường dựa trên spec kiến trúc. | 🔴 critical |
| `/code` | [code.md](./.agent/workflows/coding/code.md) | ⚡⚡⚡ Bắt đầu code & test theo plan có sẵn | 🔴 critical |
| `/cook` | [cook.md](./.agent/workflows/coding/cook.md) | ⚡⚡⚡ Triển khai tính năng [từng bước] | 🔴 critical |
| `/development` | [development.md](./.agent/workflows/coding/development.md) | Workflow coding cơ bản để thực hiện thay đổi, sửa lỗi hoặc tính năng nhỏ. | 🟢 safe |
| `/implement-feature` | [implement-feature.md](./.agent/workflows/coding/implement-feature.md) | Điều phối việc triển khai tính năng từ đặc tả đến khi hoàn thành. | 🔴 critical |
| `/refactor` | [refactor.md](./.agent/workflows/coding/refactor.md) | Dọn dẹp code, tối ưu hóa, giảm nợ kỹ thuật (không thay đổi tính năng). | 🟢 safe |

### 🐛 Debug & Fix (3)

| Workflow | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/bug-fix` | [bug-fix.md](./.agent/workflows/debugging/bug-fix.md) | Điều tra, tái hiện, sửa lỗi và đảm bảo không tái phát. | 🟢 safe |
| `/debug` | [debug.md](./.agent/workflows/debugging/debug.md) | Workflow debug khoa học - Giả thuyết, Đo đạc, Tái hiện, Phân tích, Fix. | 🟢 safe |
| `/hotfix` | [hotfix.md](./.agent/workflows/debugging/hotfix.md) | Sửa lỗi khẩn cấp trên môi trường Production (Hotfix). | 🔴 critical |

### ✅ Quality & Testing (7)

| Workflow | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/code-review` | [code-review.md](./.agent/workflows/testing/code-review.md) | Review nhanh các thay đổi trước khi merge (Diff Review). | ⚪ none |
| `/gen-tests` | [gen-tests.md](./.agent/workflows/testing/gen-tests.md) | Tạo unit, E2E, security, và performance tests sử dụng qa-tester skill. | 🟢 safe |
| `/integration-test` | [integration-test.md](./.agent/workflows/testing/integration-test.md) | Kiểm tra luồng tích hợp giữa nhiều module/service. | 🟢 safe |
| `/lint-format` | [lint-format.md](./.agent/workflows/testing/lint-format.md) | Chuẩn hóa code style bằng lint và formatter. | 🟢 safe |
| `/performance-audit` | [performance-audit.md](./.agent/workflows/testing/performance-audit.md) | Đánh giá hiệu năng ứng dụng và tối ưu hóa bottlenecks. | ⚪ none |
| `/qa` | [qa.md](./.agent/workflows/testing/qa.md) | Tạo tài liệu test case và test plan toàn diện dựa trên yêu cầu dự án. | ⚪ none |
| `/security-audit` | [security-audit.md](./.agent/workflows/testing/security-audit.md) | Đánh giá bảo mật ứng dụng web theo OWASP và best practices. | 🟢 safe |

### 📦 Git & Deploy (6)

| Workflow | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/deploy` | [deploy.md](./.agent/workflows/git-deploy/deploy.md) | Triển khai ứng dụng lên staging/production an toàn với checklist và rollback plan. | 🔴 critical |
| `/git-branch` | [git-branch.md](./.agent/workflows/git-deploy/git-branch.md) | Quản lý việc tạo branch mới từ dev | 🟢 safe |
| `/git-commit` | [git-commit.md](./.agent/workflows/git-deploy/git-commit.md) | Commit code đúng chuẩn Conventional Commits (Tiếng Việt). | 🟢 safe |
| `/git-merge` | [git-merge.md](./.agent/workflows/git-deploy/git-merge.md) | Merge code trực tiếp vào branch chính (Fast Track cho Solo/Small Project). | 🔴 critical |
| `/git-pr` | [git-pr.md](./.agent/workflows/git-deploy/git-pr.md) | Tạo Pull Request (PR) và Merge. | 🟢 safe |
| `/git-sync` | [git-sync.md](./.agent/workflows/git-deploy/git-sync.md) | Cập nhật code mới nhất từ dev về branch hiện tại (Fetch & Rebase) | 🔴 critical |

### 📝 Documentation (5)

| Workflow | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/documentation` | [documentation.md](./.agent/workflows/docs/documentation.md) | Tạo tài liệu toàn diện (Kiến trúc, API, Specs) từ Codebase hoặc Requirements. | ⚪ none |
| `/project-review` | [project-review.md](./.agent/workflows/docs/project-review.md) | Audit toàn diện dự án định kỳ (Architecture, Tech Debt, Security, Tests, Docs). | ⚪ none |
| `/rebuild-design-docs` | [rebuild-design-docs.md](./.agent/workflows/docs/rebuild-design-docs.md) | Phân tích code và tài liệu hiện có để tái tạo toàn bộ tài liệu thiết kế phần mềm. | 🟢 safe |
| `/review-docs` | [review-docs.md](./.agent/workflows/docs/review-docs.md) | Review tài liệu và artifacts về tính Chính xác Kỹ thuật, Logic/Quy trình và Chất lượng Biên tập. | ⚪ none |
| `/update-docs` | [update-docs.md](./.agent/workflows/docs/update-docs.md) | Đồng bộ tài liệu kỹ thuật sau khi code thay đổi (giảm nợ tài liệu). | ⚪ none |

### ⚙️ Agent Management (3)

| Workflow | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/custom-behavior` | [custom-behavior.md](./.agent/workflows/management/custom-behavior.md) | Workflow để tùy chỉnh Rule/Workflow an toàn, có phân tích tác động và xác nhận của user. | 🟢 safe |
| `/parallel-dispatch` | [parallel-dispatch.md](./.agent/workflows/management/parallel-dispatch.md) | Điều phối Subagents chạy song song để giải quyết các lỗi/task hoàn toàn KHÔNG liên quan đến nhau. | 🟢 safe |
| `/subagent-development` | [subagent-development.md](./.agent/workflows/management/subagent-development.md) | Workflow sử dụng Subagent độc lập để thực thi các Plan lớn với 2 vòng review (Spec & Code Quality). | 🟢 safe |

### 👑 Macro Workflows (4)

| Workflow | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/epic-dev` | [epic-dev.md](./.agent/workflows/macro/epic-dev.md) | Tự động hóa phát triển tính năng lớn từ ý tưởng thô đến code hoàn chỉnh (Macro-Workflow). | 🟢 safe |
| `/incident` | [incident.md](./.agent/workflows/macro/incident.md) | Quy trình khoanh vùng, debug và dập lỗi trên mội trường thật hoặc sự cố khẩn cấp (Macro-Workflow). | 🔴 critical |
| `/release` | [release.md](./.agent/workflows/macro/release.md) | Pipeline QA chuẩn bị trước khi release/gộp nhánh (Macro-Workflow). | 🔴 critical |
| `/tech-debt` | [tech-debt.md](./.agent/workflows/macro/tech-debt.md) | Khởi động chiến dịch dọn cỏ toàn hệ thống (Sprint Technical Debt) không đổi tính năng (Macro-Workflow). | 🟢 safe |

## Thống Kê

| Metric | Giá trị |
| --- | --- |
| **Tổng Rules** | 12 |
| **Tổng Skills** | 15 (+ 1 sub-skill: react) |
| **Tổng Workflows** | 42 (2 meta + 4 macro + 36 executable) |
| **Tổng Reference Files** | ~130 files across all skills |
| **Risk Levels** | ⚪ none: 14 · 🟢 safe: 21 · 🔴 critical: 5 |
| **Languages** | Tiếng Việt (primary), English (code/references) |
| **Framework Version** | 2.3.1 |
