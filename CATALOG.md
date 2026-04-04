# Workflow & Skill Catalog

Tài liệu liệt kê tất cả các khả năng (Workflows & Skills) của hệ thống.

## Workflows (40)

### 🔧 Meta (4)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `_agent-fleet` | [_agent-fleet.md](./.agent/workflows/meta/_agent-fleet.md) | Giao thức hệ thống tự động khởi tạo và điều phối các Bot chạy ngầm (Background Daemons). | 🟢 safe |
| `_optimize` | [_optimize.md](./.agent/workflows/meta/_optimize.md) | Giao thức hệ thống tự động quy hoạch, rèn luyện cấu trúc Prompt và tối ưu Token Cost. | ⚪ none |
| `_routing` | [_routing.md](./.agent/workflows/meta/_routing.md) | Bảng chỉ dẫn chọn đúng workflow dựa trên ý định của user. | ⚪ none |
| `_workflow-protocol` | [_workflow-protocol.md](./.agent/workflows/meta/_workflow-protocol.md) | Convention chung cho Context Passing và Error Recovery giữa các workflows. | ⚪ none |

### 💡 Lên Ý Tưởng & Phân Tích (8)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/ask` | [ask.md](./.agent/workflows/analysis/ask.md) | Hỏi đáp về Codebase, Kiến trúc, hoặc Kiến thức chung. | ⚪ none |
| `/brainstorm` | [brainstorm.md](./.agent/workflows/analysis/brainstorm.md) | Phân tích ý tưởng cùng user và tạo các tài liệu sơ bộ mức cao (Roadmap, PRD). | ⚪ none |
| `/phase2-requirements` | [phase2-requirements.md](./.agent/workflows/analysis/phase2-requirements.md) | Giai Đoạn 2 - Phân Tích Yêu Cầu (Requirements Analysis). | ⚪ low |
| `/phase3-design` | [phase3-design.md](./.agent/workflows/analysis/phase3-design.md) | Giai Đoạn 3 - Thiết Kế Kiến Trúc (Design). | ⚪ medium |
| `/plan` | [plan.md](./.agent/workflows/analysis/plan.md) | Lập kế hoạch kỹ thuật 2 cấp — High-Level (chiến lược) & Low-Level (chi tiết) — không bao gồm code/implement. | ⚪ none |
| `/plan-detail` | [plan-detail.md](./.agent/workflows/analysis/plan-detail.md) | Gọi workflow /plan để lập kế hoạch, sau đó đi sâu chi tiết Low-Level Design (LLD) ở mức Unit và lưu thành artifact. | ⚪ none |
| `/research` | [research.md](./.agent/workflows/analysis/research.md) | Nghiên cứu sâu về một chủ đề kỹ thuật hoặc thị trường (Technical Spike). | ⚪ none |
| `/ui-ux-design` | [ui-ux-design.md](./.agent/workflows/analysis/ui-ux-design.md) | Chuyển đổi yêu cầu thành các thiết kế UI/UX toàn diện. | ⚪ none |

### 🛠️ Code & Implement (6)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/bootstrap` | [bootstrap.md](./.agent/workflows/coding/bootstrap.md) | Thiết lập cấu trúc dự án, cài đặt dependencies, và cấu hình môi trường dựa trên spec kiến trúc. | 🔴 critical |
| `/code` | [code.md](./.agent/workflows/coding/code.md) | ⚡⚡⚡ Bắt đầu code & test theo plan có sẵn | 🔴 critical |
| `/cook` | [cook.md](./.agent/workflows/coding/cook.md) | ⚡⚡⚡ Triển khai tính năng [từng bước] | 🔴 critical |
| `/development` | [development.md](./.agent/workflows/coding/development.md) | Workflow coding cơ bản để thực hiện thay đổi, sửa lỗi hoặc tính năng nhỏ. | 🟢 safe |
| `/implement-feature` | [implement-feature.md](./.agent/workflows/coding/implement-feature.md) | Điều phối việc triển khai tính năng từ đặc tả đến khi hoàn thành. | 🔴 critical |
| `/refactor` | [refactor.md](./.agent/workflows/coding/refactor.md) | Dọn dẹp code, tối ưu hóa, giảm nợ kỹ thuật (không thay đổi tính năng). | 🟢 safe |

### 🐛 Debug & Fix (3)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/bug-fix` | [bug-fix.md](./.agent/workflows/debugging/bug-fix.md) | Điều tra, tái hiện, sửa lỗi và đảm bảo không tái phát. | 🟢 safe |
| `/debug` | [debug.md](./.agent/workflows/debugging/debug.md) | Workflow debug khoa học - Giả thuyết, Đo đạc, Tái hiện, Phân tích, Fix. | 🟢 safe |
| `/hotfix` | [hotfix.md](./.agent/workflows/debugging/hotfix.md) | Sửa lỗi khẩn cấp trên môi trường Production (Hotfix). | 🔴 critical |

### ✅ Quality & Testing (7)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/code-review` | [code-review.md](./.agent/workflows/testing/code-review.md) | Review nhanh các thay đổi trước khi merge (Diff Review). | ⚪ none |
| `/gen-tests` | [gen-tests.md](./.agent/workflows/testing/gen-tests.md) | Tạo Kiểm thử Đơn vị/Thành phần (Unit/Component), Kiểm thử Hệ thống (System/E2E), security, performance tests. | 🟢 safe |
| `/integration-test` | [integration-test.md](./.agent/workflows/testing/integration-test.md) | Kiểm tra luồng tích hợp giữa nhiều module/service (Tích hợp Thành phần và Tích hợp Hệ thống). | 🟢 safe |
| `/lint-format` | [lint-format.md](./.agent/workflows/testing/lint-format.md) | Chuẩn hóa code style bằng lint và formatter. | 🟢 safe |
| `/performance-audit` | [performance-audit.md](./.agent/workflows/testing/performance-audit.md) | Đánh giá hiệu năng ứng dụng và tối ưu hóa bottlenecks. | ⚪ none |
| `/qa` | [qa.md](./.agent/workflows/testing/qa.md) | Tạo tài liệu test case và test plan toàn diện dựa trên yêu cầu dự án. | ⚪ none |
| `/security-audit` | [security-audit.md](./.agent/workflows/testing/security-audit.md) | Đánh giá bảo mật ứng dụng web theo OWASP và best practices. | 🟢 safe |

### 📦 Git & Deploy (6)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/deploy` | [deploy.md](./.agent/workflows/git-deploy/deploy.md) | Triển khai ứng dụng lên staging/production an toàn với checklist và rollback plan. | 🔴 critical |
| `/git-branch` | [git-branch.md](./.agent/workflows/git-deploy/git-branch.md) | Quản lý việc tạo branch mới từ dev | 🟢 safe |
| `/git-commit` | [git-commit.md](./.agent/workflows/git-deploy/git-commit.md) | Commit code đúng chuẩn Conventional Commits (Tiếng Việt). | 🟢 safe |
| `/git-merge` | [git-merge.md](./.agent/workflows/git-deploy/git-merge.md) | Merge code trực tiếp vào branch chính (Fast Track cho Solo/Small Project). | 🔴 critical |
| `/git-pr` | [git-pr.md](./.agent/workflows/git-deploy/git-pr.md) | Tạo Pull Request (PR) và Merge. | 🟢 safe |
| `/git-sync` | [git-sync.md](./.agent/workflows/git-deploy/git-sync.md) | Cập nhật code mới nhất từ dev về branch hiện tại (Fetch & Rebase) | 🔴 critical |

### ⚙️ Agent Management (2)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/custom-behavior` | [custom-behavior.md](./.agent/workflows/management/custom-behavior.md) | Workflow để tùy chỉnh Rule/Workflow an toàn, có phân tích tác động và xác nhận của user. | 🟢 safe |
| `/phase1-planning` | [phase1-planning.md](./.agent/workflows/management/phase1-planning.md) | Giai Đoạn 1 - Lập Kế Hoạch Và Khởi Tạo Dự Án (Planning). | ⚪ low |

### 👑 Macro Workflows (4)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `/epic-dev` | [epic-dev.md](./.agent/workflows/macro/epic-dev.md) | Phát triển tính năng lớn đầu cuối (Brainstorm -> Plan -> Break Tasks -> Subagent Development). | 🔴 critical |
| `/incident` | [incident.md](./.agent/workflows/macro/incident.md) | Quy trình khoanh vùng, debug và dập lỗi trên mội trường thật hoặc sự cố khẩn cấp (Macro-Workflow). | 🔴 critical |
| `/release` | [release.md](./.agent/workflows/macro/release.md) | Hệ thống phòng thủ trước thềm Merge Code/Deploy (Lint -> Integration Test -> Security -> Code Review -> PR -> Deploy). | 🔴 critical |
| `/tech-debt` | [tech-debt.md](./.agent/workflows/macro/tech-debt.md) | Dọn dẹp nợ kĩ thuật bằng cách bọc lưới test (Project Review -> Refactor -> Gen Tests -> Commit). | 🟢 safe |


## Skills (57)

### 🐛 Debug & Fix (1)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `SKILL` | [SKILL.md](./.agent/skills/AnalysisImpact/debugging/SKILL.md) | Kỹ năng sử dụng GitNexus để tìm và fix bug dựa trên luồng thực thi (execution flows). | ⚪ none |

### 🏗️ Architecture (1)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `clean-architecture` | [clean-architecture.md](./.agent/skills/Architecture/clean-architecture.md) | Hướng dẫn thiết kế kiến trúc phần mềm chất lượng dựa trên Clean Architecture và Domain-Driven Design (DDD). | 🟢 safe |

### 🛡️ Testing & Security (2)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `systematic-debugging` | [systematic-debugging.md](./.agent/skills/Testing_Security/systematic-debugging.md) | Truy tận gốc rễ nguyên nhân gây lỗi (Root Cause) thay vì chỉ sửa triệu chứng bề mặt. | 🟢 safe |
| `tdd` | [tdd.md](./.agent/skills/Testing_Security/tdd.md) | Sử dụng khi triển khai bất kỳ tính năng hoặc sửa lỗi nào, TRƯỚC KHI viết mã thực thi. | 🟢 safe |

### 🤖 System Agent (1)

| Tên | Tham chiếu (File) | Mô tả | Risk |
| --- | --- | --- | --- |
| `sadd` | [sadd.md](./.agent/skills/agent/sadd.md) | Điều phối đa nhân vật (Multi-Agent/Subagents) để thực hiện các task độc lập hoặc song song, kèm theo Code Review nghiêm ngặt giữa mỗi bước. | 🟢 safe |


## Thống Kê
- Tổng số workflows: 40
- Tổng số skills: 57
- Cập nhật lần cuối: 2026-04-04

---
*Tài liệu này được tạo tự động bởi `build-catalog.js`*