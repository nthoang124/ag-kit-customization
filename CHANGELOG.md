# Changelog

Tất cả thay đổi đáng chú ý của Antigravity Agent Framework được ghi lại tại đây.

Format tuân theo [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
