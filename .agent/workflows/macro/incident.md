---
description: Quy trình khoanh vùng, debug và dập lỗi trên mội trường thật hoặc sự cố khẩn cấp (Macro-Workflow).
type: procedure
risk: critical
source: self
required_skills: [backend-developer, devops-engineer, qa-tester]
inputs: ["Production Bug Report", "Logs/Trace"]
outputs: ["Root Cause Fix", "Hotfix Commit", "Post-mortem Docs"]
context_from: []
context_to: ["/update-docs"]
context_artifacts:
  receives: []
  produces: ["debug-findings.md", "walkthrough.md"]
---

# Macro-Workflow Xử Lý Sự Cố Khẩn Cấp (`/incident`)

> [!CAUTION]
> Tốc độ không có nghĩa là cẩu thả. Macro-Workflow này tập trung xử lý dập cháy khẩn cấp cho môi trường thật (Production) nhưng vẫn bảo kê bởi 4-Phase System Debug để cấm đoán triệt để ngõ cụt code mò.

## Khi nào dùng (When to Use)

- Có báo động đỏ (Alert) từ hệ thống giám sát.
- Bug ngớ ngẩn hoặc hỏng API trên nhánh main/production bị người dùng Report.

---

## Chuỗi Hành Động Liên Tiếp (Pipeline)

Luồng làm việc không dừng lại cho đến khi file log được xuất bản. 

### Bước 1: Truy Tìm Nước Thượng Nguồn (`/debug`)

1. Bật hệ thống 4-Phase Systematic Debug.
2. Truy xuất Log + Trace ngược hệ thống qua ranh giới Component để tìm đúng Component hỏng hóc.
3. Xác minh Root Cause. Xây giả thuyết. Cấm tuyệt đối đụng tay Fix. Đầu ra là `debug-findings.md`.

### Bước 2: Vá Lỗi Chớp Nhoáng mà Vững Chắc (`/bug-fix`)

1. Kế thừa context nguyên nhân của Bước 1. 
2. Viết Failing Reproduction Test -> Code pass test -> Verify. (TDD The Iron Law).

### Bước 3: Triển Khai Nóng (`/hotfix`)

1. Vượt luồng rườm rà (Bỏ qua branch features), đẩy ngược code đã fix trực tiếp vào Fast Lane để merge thẳng qua Dev -> Main.
2. Nâng version vá lỗi (`vx.y.z+1`).
3. Deploy ngay lập tức sự thay đổi này.

### Bước 4: Hậu Kiểm Sự Cố (`/update-docs`)

1. Tóm tắt nguyên nhân và bài học từ Bước 1 vào `docs/` để sau này không vấp chân lại kịch bản hỏng hóc này.
2. Cập nhật Readme hoặc Specs nếu thay đổi có độ phủ lớn.
