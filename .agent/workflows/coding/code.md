---
description: ⚡⚡⚡ Bắt đầu code & test theo plan có sẵn
type: direct-executor
risk: critical
source: self
required_skills: [researcher, backend-developer, frontend-developer, qa-tester]
inputs: ["Implementation Plan", "Phase Name"]
outputs: ["Executed Phase", "Test Results"]
context_from: ["/plan", "/cook"]
context_to: ["/gen-tests", "/git-commit"]
context_artifacts:
  receives: ["implementation_plan.md"]
  produces: ["walkthrough.md", "committed code"]
---

**QUAN TRỌNG**: Bạn là một SINGLE AGENT (Full-stack Developer). Bạn **TRỰC TIẾP** thực hiện mọi bước từ code đến test. KHÔNG sử dụng `gk agent spawn`.

**CRITICAL**: You are a DIRECT EXECUTOR. You MUST implement the code yourself using available tools.
**MUST** start working on the following plan:
<plan>{{args}}</plan>

---

## Khi nào dùng (When to Use)

- Đã có implementation plan sẵn (từ `/plan` hoặc `/cook`).
- Cần AI tự code và test theo plan mà không cần lập kế hoạch lại.
- Task rõ ràng, không cần research bổ sung.

## KHÔNG dùng khi (When NOT to Use)

- Chưa có plan → Dùng `/plan` trước, rồi chạy `/code`.
- Cần research + plan + code (end-to-end) → Dùng `/cook`.
- Feature phức tạp cần review từng phase → Dùng `/implement-feature`.
- Task nhỏ (1-2 file) → Dùng `/development`.

---

## Kỹ năng của bạn (SKILLs)

Bạn được trang bị mọi skill cần thiết (Backend, Frontend, QA). Hãy tự tin chuyển đổi vai trò (Persona) linh hoạt để hoàn thành job.

## Trách nhiệm Vai trò
- Bạn là Senior Software Engineer.
- Nghiên cứu kỹ plan trước khi code.
- Feedback loop: Nếu gặp vấn đề, dừng lại hỏi user.

---

## Trình tự Workflow

**Quy tắc:** Tuân thủ thứ tự bước 0-4.

### Step 0: Xác nhận Plan (MANDATORY)
Đọc plan `{{args}}`. Xác định các task cần làm.
**Output:** `✓ Step 0: Đã nhận plan - [N] tasks cần thực hiện`

### Step 1: Chuẩn bị Task List
Phân rã plan thành các task nhỏ (atomic).
**Output:** `✓ Step 1: Task list sẵn sàng - [N] atomic tasks`

### Step 2: Triển khai (Implementation)
* **Code**: Tự thực hiện code logic.
* **Review**: Tự review code của mình trước khi commit.
* **Commit**: Dùng `/git-commit` thường xuyên.
**Output:** `✓ Step 2: Triển khai hoàn tất - [N] files modified`

### Step 3: Testing & Verification [⏸ REQUIRES VERIFICATION RULE]
* **TUÂN THỦ `verification.md`:** Phải chạy lệnh thực tế (`test`, `lint`, `build`) trước khi gáy kết quả.
* **Logic Tự Sửa Lỗi**:
    - Nếu lỗi: Đọc log → Tìm nguyên nhân gốc → Sửa code → Chạy lại.
    - Max Retries: 3 lần.
    - Nếu vẫn lỗi sau 3 lần: **DỪNG & Notify User**.
**Output:** `✓ Step 3: Verified bằng [Lệnh] - Tests [X/X passed]` hoặc `❌ Step 3: Failed sau 3 retries`

### Step 4: User Approval (Blocking Gate)
Báo cáo kết quả bằng CÁC BẰNG CHỨNG XÁC MINH cụ thể (Logs, Screenshot) và chờ user approve.
Triết lý: EVIDENCE BEFORE CLAIMS.
**Output:** `✓ Step 4: User approved`

---

## Ví dụ Copy-Paste

```text
# Chạy code workflow với plan cụ thể
/code Triển khai auth module theo plan trong implementation_plan.md: 
1. Tạo auth middleware
2. Tạo login/register API endpoints  
3. Unit tests cho auth service
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `/plan`**: `implementation_plan.md` — Plan chi tiết để code theo.
- **Từ `/cook`**: Plan từ Step 4 của cook (nếu cook delegate sang /code).
- **Từ `{{args}}`**: Mô tả plan inline nếu không có file.

### Truyền Context (Output)
- **Cho `/gen-tests`**: `walkthrough.md` — Code đã implement để sinh test bổ sung.
- **Cho `/git-commit`**: Danh sách files đã thay đổi + test results.

### Fallback
- Nếu không tìm thấy `implementation_plan.md` → Dùng `{{args}}` làm plan.
- Nếu `{{args}}` cũng không có → **Dừng**, gợi ý user chạy `/plan` trước.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Step 1: Task List | Sửa phân rã 3x | N/A | Hỏi user làm rõ plan |
| Step 2: Code | Fix compile/lint 3x | → Step 1 (re-parse plan) | Notify user |
| Step 3: Test | Fix & retry 3x | → Step 2 (re-code) | Notify user |

---

## Giới hạn (Limitations)

- **Yêu cầu plan đã có** — không tự tạo plan, cần dùng `/plan` hoặc `/cook` trước.
- **Max 3 retries** cho self-healing — nếu vẫn lỗi, sẽ dừng và hỏi user.
- **Không xử lý được nhiều phase phức tạp** — dùng `/implement-feature` cho trường hợp đó.
- **Không tự tạo branch** — dùng `/git-branch` hoặc workflow khác để setup branch trước.

---

## Quy tắc Bắt buộc

**Không dùng `gk agent spawn`**.
**Làm đến đâu chắc đến đó (Atomic)**.
**Hỏi user nếu cần confirm thay đổi lớn**.

---

## Workflow liên quan

- `/plan` — Tạo plan trước khi dùng `/code`.
- `/cook` — Nếu cần cả research + plan + code.
- `/implement-feature` — Cho feature cần review từng phase.
- `/development` — Cho task nhỏ, sửa lỗi nhanh.
- `/git-commit` — Commit code trong quá trình triển khai.