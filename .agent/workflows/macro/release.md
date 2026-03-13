---
description: Pipeline QA chuẩn bị trước khi release/gộp nhánh (Macro-Workflow).
type: checklist
risk: critical
source: self
required_skills: [devops-engineer, qa-tester, lead-architect]
inputs: ["Tên nhánh hiện tại", "Source code"]
outputs: ["Vượt toàn bộ CI Local", "Pull Request", "Deployment status"]
context_from: ["/git-commit"]
context_to: []
context_artifacts:
  receives: ["walkthrough.md", "test-reports"]
  produces: ["release-checklist.md"]
---

# Macro-Workflow Bàn Giao & Phát Hành (`/release`)

> [!IMPORTANT]
> Đây là cửa ngõ cuối cùng của chất lượng code trước khi nhánh `feature/xxx` rời khỏi vòng phòng thủ để tiếp tốn Production. Phải pass 100% các vòng này.

## Khi nào dùng (When to Use)

- Chuẩn bị merge một branch tính năng lớn lên môi trường `dev` hoặc `main`.
- Đủ tự tin chất lượng mã nguồn trên nhánh và muốn lên sóng (Deployment).

---

## Chuỗi Hành Động Liên Tiếp (Pipeline)

Cứ mỗi bước chạy, hệ thống sẽ log ra `release-checklist.md`. Nếu fail bất kì bước nào, DỪNG LẠI và không đi tiếp.

### Bước 1: Dọn Rác & Chuẩn Hóa (`/lint-format`)

// turbo

1. Trigger: Chạy auto-formatter và check linters.
2. Fail -> Fix lỗi lint. Pass -> Qua Bước 2.

### Bước 2: Kiểm Định Chất Lượng Toàn Trọn Vẹn (`/integration-test`)

// turbo

1. Trigger: Chạy kiểm thử tích hợp, unit tests diện rộng trên codebase. (Lệnh `npm test` / `pytest`).
2. Sáng đèn Xanh (Pass 100%) -> Qua Bước 3.

### Bước 3: Rà Soát Bảo Mật (`/security-audit`)

1. Trigger: Quét Auth, Zod Validation, Secrets leaks theo chuẩn OWASP.
2. Không bắt được lỗi Lỗ Hồng Thảm Họa (Critical Vulnerability) -> Qua Bước 4.

### Bước 4: Tạo Pull Request (`/git-pr`)

1. Trigger: Soạn thảo nội dung xin gộp mã nguồn (Pull Request).
2. Tóm tắt Change Logs dựa trên lịch sử commit.
3. User ấn Approve -> Qua Bước 5.

### Bước 5: Đưa Lên Môi Trường Thật (`/deploy`)

1. Bấm nút CI/Deploy hoặc call APIs hệ thống Cloud/Server để đưa mã nguồn lên.
2. Xác minh website hoạt động trơn tru.
