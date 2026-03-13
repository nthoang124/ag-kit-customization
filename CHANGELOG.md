# Changelog

Tất cả thay đổi đáng chú ý của Antigravity Agent Framework được ghi lại tại đây.

Format tuân theo [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [3.0.0] - 2026-03-14 (10/10 Optimized Architecture)

### Thêm mới (Added)
- **Auto-Cataloging** (`build-catalog.js`) — Tự động quét và sinh thư mục `CATALOG.md` với đường dẫn tương đối hoàn hảo cho tất cả workflows.
- **Agent Linter** (`lint-agent.js`) — Script Audit CI/CD đầu tiên của Agent. Tự động kiểm tra YAML lỗi, cấu trúc tệp, và thiếu sót XAI.
- **Agent Defense System** (`agent-defense.md`) — Tăng cường phòng thủ Prompt Injection, Zero-Trust môi trường shell, và cách ly log lỗi.
- **Agent Mode Selection** (`agent-mode-selection.md`) — Cho phép AI có tư duy chọn Fast mode (Code ngay) hoặc Planning mode (Xin phép trước), tự động tối ưu token.
- **XAI Guardrails Security** — Nguyên tắc bắt buộc Masking Secret Data trong mọi câu trả lời.

### Nâng cấp (Changed)
- Tổ chức lại toàn bộ 42 Workflows thành 9 thư mục con (ví dụ: `coding/`, `debugging/`, `meta/`) để dọn dẹp hệ thống.
- Ép buộc XAI trong nhánh High-Risk (`/debug`, `/hotfix`) bắt buộc Agent đưa ra "Lộ trình lập luận" và "Counterfactual Risk Assessment".

---

## [2.3.1] - 2026-03-14

### Thêm mới (Added)
- **Macro-Workflows (Tổ hợp)**: Giới thiệu khái niệm Chuỗi hành động tự động hóa, liên kết các workflow nguyên tử thành chu trình khép kín. Bổ sung 4 Macro-Workflows mới:
  - `/epic-dev`: Phát triển tính năng lớn đầu cuối (Brainstorm -> Plan -> Break Tasks -> Subagent Development).
  - `/incident`: Phản ứng và xử lý sự cố môi trường khẩn cấp (Debug -> Bug Fix -> Hotfix -> Update Docs).
  - `/release`: Hệ thống phòng thủ trước thềm Merge Code/Deploy (Lint -> Integration Test -> Security -> Code Review -> PR -> Deploy).
  - `/tech-debt`: Dọn dẹp nợ kĩ thuật bằng cách bọc lưới test (Project Review -> Refactor -> Gen Tests -> Commit).

---

## [2.3.0] - 2026-03-14

### Thêm mới (Added)
- **Subagent-Driven Development Workflow** (`/subagent-development`) — Hỗ trợ code với context hoàn toàn sạch (fresh context) thông qua Subagents, cùng hệ thống review chéo liên hoàn (Spec Compliance & Code Quality).
- **Parallel Dispatch Workflow** (`/parallel-dispatch`) — Phái N subagents chạy song song để giải quyết các lỗi và test gãy hoàn toàn độc lập với nhau (đẩy nhanh tốc độ xử lý bugs diện rộng).

### Nâng cấp (Changed)
- Đưa **The Iron Law of TDD** bọc thép vào quy tắc `tests.md` cùng chu trình RED-GREEN-REFACTOR khắt khe, xoá tư duy viết test sau.
- Trấn chỉnh lại **`debug.md`** sang phương pháp **4-Phase Systematic Debugging** cực kỳ hệ thống, thay vì lối code Shotgun Debugging (thử mò mẫm).

---

## [2.2.0] - 2026-03-10

### Thêm mới (Added)
- **Context Protocol + Error Recovery** cho `ask.md` và `lint-format.md` — tuân thủ đầy đủ `_workflow-protocol.md`
- **CHANGELOG.md** — theo dõi lịch sử thay đổi framework
- **`data-engineer` references** — 6 reference files: `dbt-patterns.md`, `airflow.md`, `dagster.md`, `pyspark.md`, `data-modeling.md`, `data-quality.md`
- Thêm `metadata.version` nhất quán cho tất cả 14 skills

### Sửa lỗi (Fixed)
- Fix typo `performance.md`: "p dụng" → "Áp dụng"
- Fix link sai `clean-code.md`: `commit-branch-management.md` → `git-conventions.md`
- Fix README.md: "10 rules" → "11 rules", thêm `clean-code.md` vào directory listing

### Cải thiện (Changed)
- Chuyển `security.md`, `tests.md`, `clean-code.md` sang tiếng Việt (tuân thủ `communication.md`)
- Thêm context frontmatter (`context_from`, `context_to`, `context_artifacts`) cho `ask.md`, `lint-format.md`

---

## [2.1.0] - 2026-03-09

### Thêm mới (Added)
- Router tự động v2.1 với disambiguation rules, bilingual keywords, risk levels
- `_workflow-protocol.md` — Convention chung cho Context Passing (3 kênh) + Error Recovery (3 cấp)
- `evaluation-framework.md` rule — Đánh giá khách quan dựa trên rubric
- 34+ workflows với cấu trúc chuẩn
- 14 skills/personas chuyên biệt
- 11 rules bắt buộc

---

## [1.0.0] - 2026-02-01

### Thêm mới (Added)
- Khởi tạo framework Agent với kiến trúc 3 lớp: Rules → Skills → Workflows
- README.md với hướng dẫn sử dụng
- `.gitignore` cấu hình cho agent system
