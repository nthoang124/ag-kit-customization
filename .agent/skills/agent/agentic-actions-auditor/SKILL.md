---
name: agentic-actions-auditor
description: >
  Kiểm duyệt (Audit) các workflow Github Actions để tìm lỗ hổng bảo mật 
  trong các phần tích hợp AI agent bao gồm Claude Code Action, 
  Gemini CLI, OpenAI Codex, và GitHub AI Inference.
  Phát hiện đường dẫn tấn công (attack vectors) nơi dữ liệu đầu vào bị kẻ xấu 
  kiểm soát lọt vào AI Agents đang chạy trong CI/CD pipelines.
risk: safe
source: community
date_added: 2026-03-18
---

# Kiểm Duyệt Hành Động Của Agent (Agentic Actions Auditor)

Tài liệu hướng dẫn phân tích bảo mật tĩnh tay cho các workflow GitHub Actions gọi trực tiếp AI coding agents. Kỹ năng này dạy bạn cách duyệt file workflow tại repo, tìm các action dùng AI, lần theo dấu vết tham chiếu giữa các file (composite actions, reusable workflows), và đặc biệt là phát hiện xem liệu một attacker có thể tuồn mã độc (Prompt Injection) vào prompt của AI agent thông qua CI/CD pipeline hay không.

## Khi Nào Sử Dụng (When to Use)
- Audit (kiểm tra an toàn) Github Actions workflow xem có rủi ro về AI agent bảo mật không.
- Review cấu hình CI/CD khi có dùng Claude Code Action, Gemini CLI, hoặc OpenAI Codex.
- Kiểm tra xem dữ liệu do attacker kiểm soát có bị lọt vào Prompt hay không.
- Đánh giá các Cấu hình sandbox, tool permissions, danh sách user allowlists.
- Rà soát các Trigger events dễ bị lộ (pull_request_target, issue_comment, v.v.).

## Khi Nào KHÔNG Sử Dụng
- Đánh giá workflow không dính dáng đến AI.
- Sửa lỗi workflow (Kỹ năng này chỉ tạo Report, không sửa code).

## Các Lỗi Lập Luận Chết Người Cần Bác Bỏ (Rationalizations to Reject)

**1. "Nó chỉ chạy qua PRs từ người maintainer nội bộ"**
Sai, vì những trigger lỏng lẻo như `pull_request_target` lại chạy trên ngữ cảnh của branch gốc thay vì branch PR, tức là **bất kỳ ai** tạo PR đều có thể trigger và cướp quyền secrets.

**2. "Chúng ta dùng allowed_tools để giới hạn rồi"**
Sai. Giới hạn tool giảm thiểu bề mặt tấn công chứ không diệt tận gốc. Chỉ cần tool `echo` thôi cũng đủ để truyền mã (data exfiltration) rò rỉ secret ra bên ngoài.

**3. "Không có `${{ }}` trong đoạn prompt, thế là an toàn"**
Sai. Attacker hoàn toàn có thể lợi dụng block `env:`. Dữ liệu sẽ chảy qua trung gian biến môi trường (env var) và ngấm vào prompt mà không cần bộc lộ biểu thức chèn mã ngay trên mặt chữ YAML.

**4. "Hệ thống hộp cát (Sandbox) chặn mọi thứ"**
Sai. Sandbox nếu lỡ bị cấu hình sai (`danger-full-access`, `--yolo`) thì vô dụng hoàn toàn.

## Phương Pháp Audit (Audit Methodology)

### Bước 0: Xác định phân tích Local hay Remote
- Dùng `gh api` để kéo các file `.yaml` về đọc nếu xét duyệt trên kho Github từ xa.

### Bước 1: Khám phá file Workflow
Quét toàn bộ repo ở nhánh `.github/workflows/*.yml`.

### Bước 2: Nhận diện bước Hành động AI (Identify AI Action)
Quét tìm trong `uses:` xem các chuỗi có chứa:
- `anthropics/claude-code-action`
- `google-github-actions/run-gemini-cli`
- `openai/codex-action`
- `actions/ai-inference`

### Bước 3: Đóng Kéo Dữ Liệu Security Context
Lưu trữ toàn bộ thông tin môi trường của các Action AI đó bao gồm `with: [prompt, settings, models, sandbox-mode]`.

### Bước 4: Phân Tích Đường Dẫn Tấn Công (Attack Vectors)
| Trục (Vector) | Tên Phổ Biến | Cách Kiểm Tra Nhanh |
|--------|------|-------------|
| A | Env Var Intermediary | Có biến `env:` chứa giá trị `${{ }}` và prompt lại đọc biến đó |
| B | Direct Expression Injection | `${{ github.event.* }}` nằm thẳng trong prompt text |
| C | CLI Data Fetch | Chứa lệnh `gh issue view`, `gh pr view` trong prompt text |
| D | PR Target + Checkout | Có trigger `pull_request_target` + checkout sang mã nguồn PR head |
| E | Error Log Injection | CI logs, đầu ra build đưa vào prompt AI |
| F | Subshell Expansion | Tool cho phép chạy lệnh mở rộng dạng `$()` |
| G | Eval of AI Output | Dùng hàm eval, exec hay `$()` ở bước run để tiêu thụ kết quả output của AI |
| H | Dangerous Sandbox | Các cấu hình Sandbox vô tổ chức `danger-full-access`, `--yolo` |
| I | Wildcard Allowlists | Cấp phép user gọi tùy ý `allow-users: "*"` |

### Bước 5: Báo Cáo Findings (Báo Cáo Điểm Sai Phạm)
Sau khi quét, lập danh sách cảnh báo chi tiết từng điểm lỗi, mức độ nguy hiểm, minh chứng YAML để security team dễ dàng đọc và vá.

## Tham Khảo
Luôn cẩn trọng trước CI/CD Pipeline Agent. Hướng dẫn chi tiết mã rẽ nhánh đọc ở `references/cross-file-resolution.md`.
