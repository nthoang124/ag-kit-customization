---
description: ⚡⚡⚡ Triển khai tính năng [từng bước]
type: direct-executor
risk: critical
source: self
required_skills: [Workflows_Tools/researcher, Architecture/lead-architect, Development/backend-developer, Development/frontend-developer, Testing_Security/qa-tester]
inputs: ["Feature Idea", "Requirements"]
outputs: ["Fully Implemented Feature"]
context_from: ["/brainstorm", "/plan"]
context_to: ["/gen-tests", "/git-commit", "/git-pr"]
context_artifacts:
  receives: ["docs/020-Requirements/PRD-*.md", "implementation_plan.md"]
  produces: ["walkthrough.md", "committed code"]
---

**QUAN TRỌNG**: Bạn là một SINGLE AGENT (Full-stack Developer). Bạn **TRỰC TIẾP** thực hiện mọi bước từ research, plan đến code và test. KHÔNG sử dụng `gk agent spawn`.

Suy nghĩ kỹ hơn để lên plan & bắt đầu làm việc theo các task này, tuân thủ Core Responsibilities và Development Rules:
<tasks>{{args}}</tasks>

---

## Khi nào dùng (When to Use)

- Triển khai tính năng mới **từ đầu đến cuối** (end-to-end).
- Yêu cầu phức tạp vừa: 1 ngày hoặc ít hơn.
- User muốn AI tự research, plan, code, test mà không cần manage từng bước.

## KHÔNG dùng khi (When NOT to Use)

- Chỉ cần code theo plan có sẵn → Dùng `/code`.
- Task nhỏ (fix bug, thay đổi 1-2 file) → Dùng `/development`.
- Feature phức tạp cần review từng phase → Dùng `/implement-feature`.
- Chỉ cần research hoặc plan → Dùng `/research` hoặc `/plan`.

## Điều kiện tiên quyết (Prerequisites)

- Project đã được setup (dependencies, config) — nếu chưa, chạy `/bootstrap` trước.
- Testing framework đã cài (Jest/Vitest/Playwright) — nếu chưa, test step sẽ bị skip.
- Git đã init và có branch `dev` — dùng `/git-branch` nếu cần.

---

## Trách nhiệm Vai trò

- Bạn là chuyên gia kỹ thuật phần mềm cao cấp.
- Nguyên tắc: **YAGNI**, **KISS**, **DRY**.

## Cách tiếp cận (Approach)

1. **Hỏi mọi thứ**: Làm rõ đến khi chắc chắn 100%.
2. **Trung thực tàn nhẫn**: Nói thẳng nếu không thực tế.
3. **Khám phá giải pháp thay thế**: 2-3 options với ưu/nhược.
4. **Thử thách các giả định**: Đặt câu hỏi cách tiếp cận ban đầu.

---

## Trình tự Workflow

**Quy tắc:** Tuân thủ thứ tự bước 0-8. Mỗi bước yêu cầu output marker bắt đầu bằng "✓ Step N:". *(KHÔNG BỎ QUA BƯỚC)*.

### Step 0: Project setup (MANDATORY)
Kiểm tra môi trường hiện tại. Nếu chưa có session, hỏi user hoặc bỏ qua nếu đang chạy local.
**Output:** `✓ Step 0: Hoàn tất Project Setup`

### Step 1: Phát hiện Task & Phân tích
Phân tích yêu cầu `{{args}}`. Nếu mơ hồ, hỏi user ngay lập tức.
**Output:** `✓ Step 1: Phân tích yêu cầu hoàn tất`

### Step 2: Đáp ứng yêu cầu (Clarification)
* Nếu có câu hỏi, hỏi user để làm rõ. Hỏi từng câu một, chờ user trả lời mới sang câu tiếp theo.
**Output:** `✓ Step 2: Tìm thấy [N] câu hỏi cần làm rõ - [X/Y] câu hỏi đã rõ`

### Step 3: Nghiên cứu (Research)
* Tự thực hiện research (dùng tool `search_web`, `read_url`...) để khám phá yêu cầu, validate ý tưởng và tìm giải pháp tối ưu.
**Output:** `✓ Step 3: Nghiên cứu [N] chủ đề - Research hoàn tất`

### Step 4: Lập Kế hoạch (Plan)
* Tạo implementation plan theo cấu trúc progressive disclosure.
**Output:** `✓ Step 4: Plan hoàn tất`

### Step 5: Phân tích & Trích xuất Task
* Convert plan thành danh sách các task cụ thể.
**Output:** `✓ Step 5: Đã trích xuất [N] tasks`

---

### Step 6: Triển khai (Implementation) - Theo Phase
* **Adopt Role**: Backend Developer / Frontend Developer tùy task.
* **Execute**: Tự viết code, tạo file, sửa file.
* Chạy type checking và compile để đảm bảo không lỗi cú pháp.
* **Sử dụng `/git-commit` để lưu code.**
**Output:** `✓ Step 6: Phase X - Triển khai [N] files - [X/Y] tasks hoàn thành`

### Step 7: Testing & Verification - Theo Phase [⏸ REQUIRES VERIFICATION RULE]
* **TUÂN THỦ `verification.md` & `tests.md`:** PHẢI viết test trước hoặc đồng thời với code.
* Tự chạy test (dùng `run_command`). Nếu môi trường chưa có test, chạy `build` hoặc `lint`.
* Đọc kết quả bằng mắt. CẤM BÁO CÁO THÀNH CÔNG nếU CHƯA THẤY BẰNG CHỨNG XÁC MINH MỚI NHẤT (NO COMPLETION CLAIMS WITHOUT EVIDENCE).
* Nếu fail: Tự fix và chạy lại đến khi pass.
**Output:** `✓ Step 7: Phase X - Verified bằng [Lệnh] - [X/X passed]`
**Validation:** Nếu X ≠ tổng, Step 7 CHƯA HOÀN THÀNH - không đi tiếp.

### Step 8: User Approval ⏸ BLOCKING GATE
Trình bày tóm tắt kết quả (Kèm theo Bằng chứng Output Logs của lệnh xác minh). 
**Hỏi user rõ ràng:** "Phase implementation hoàn tất với bằng chứng đính kèm. Anh có approve thay đổi không?"
**Dừng và chờ.**
**Output:** `✓ Step 8: User approved - Sẵn sàng hoàn tất`

---

## Quy tắc Bắt buộc (Enforcement Rules)

**Step outputs phải tuân thủ format:** `✓ Step [N]: [Trạng thái ngắn] - [Key metrics]`

**Blocking gates:**
- Step 7: Tests phải 100% passing
- Step 8: User phải approve rõ ràng

**GHI NHỚ:**
- *PHẢI TUÂN THỦ* workflow này - đây là *BẮT BUỘC. KHÔNG THƯƠNG LƯỢNG. KHÔNG NGOẠI LỆ.*
- *KHÔNG BỎ QUA BƯỚC*. Không đi tiếp nếu validation fail. Không tự ý assume approval.

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `/brainstorm`**: `docs/020-Requirements/PRD-*.md` — PRD nếu có.
- **Từ `/plan`**: `implementation_plan.md` — Skip Step 3-4 nếu plan đã có.
- **Từ `{{args}}`**: Mô tả feature trực tiếp (phổ biến nhất).

### Truyền Context (Output)
- **Cho `/gen-tests`**: `walkthrough.md` — code đã implement để sinh test.
- **Cho `/git-commit`**: Danh sách files đã thay đổi.
- **Cho `/git-pr`**: Commit history và summary.

### Fallback
- Nếu không có PRD/plan → Tự research và tạo plan (Step 3-4).
- Nếu `{{args}}` mơ hồ → Hỏi user (Step 2: Clarification).

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Step 3: Research | Retry search 3x | → Step 2 (re-clarify) | Hỏi user cung cấp tài liệu |
| Step 4: Plan | Sửa plan 3x | → Step 3 (re-research) | Notify user |
| Step 6: Code | Fix compile/lint 3x | → Step 4 (re-plan) | Notify user |
| Step 7: Test | Fix & retry 3x | → Step 6 (re-code) | Notify user |

---

## Giới hạn (Limitations)

- **Không phù hợp cho task > 1 ngày** — chia nhỏ thành nhiều `/cook` sessions hoặc dùng `/implement-feature`.
- **Không xử lý được infrastructure changes** (CI/CD, Docker, Kubernetes) → Dùng `/bootstrap`.
- **Research phụ thuộc kết nối mạng** — nếu offline, bỏ qua Step 3 và dùng kiến thức có sẵn.
- **Không hỗ trợ multi-agent** — chỉ 1 agent thực hiện toàn bộ.
- **Test coverage phụ thuộc vào testing framework đã cài** — nếu chưa có test setup, cần `/bootstrap` trước.

---

## Workflow liên quan

- `/code` — Chỉ code theo plan có sẵn (bỏ qua research/plan).
- `/development` — Cho task nhỏ, sửa lỗi nhanh.
- `/implement-feature` — Cho feature phức tạp cần review từng phase.
- `/plan` — Chỉ lên kế hoạch, không code.