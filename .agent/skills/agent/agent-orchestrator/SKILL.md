---
name: agent-orchestrator
description: Siêu kỹ năng (Meta-skill) đóng vai trò điều phối (orchestration) tất cả các agent trong hệ sinh thái. Quét tự động (auto scan) các kỹ năng, nối ghép dựa trên năng lực (capabilities match), điều phối quy trình làm việc đa kỹ năng (multi-skill workflows) và quản lý cơ sở đăng ký (registry management).
risk: safe
source: community
date_added: '2026-03-06'
author: renat
tags:
- orchestration
- multi-agent
- workflow
- automation
tools:
- claude-code
- antigravity
- cursor
- gemini-cli
- codex-cli
---

# Điều Phối Agent (Agent Orchestrator)

## Tổng quan (Overview)

Meta-skill điều phối tất cả các AI Agents trong cùng một hệ sinh thái. Tự động tìm quét (Scan) các skills mới, nhận diện việc bắt cặp qua năng lực cốt lõi, điều phối workflow giữa nhiều skill với nhau và duy trì quản lý hệ thống lưu trữ registry.

## Khi Nào Sử Dụng (When to Use This Skill)

- Khi cần sự hỗ trợ chuyên môn kết nối giữa nhiều module agent khác nhau.

## Khi Nào KHÔNG Sử Dụng

- Nhiệm vụ rời rạc không liên quan đến điều phối.
- Một file cụ thể hay tool đơn lẻ đã giải quyết được yêu cầu mà không cần bận tâm đến agent khác.
- User đang cần giúp đỡ trực tiếp làm việc một thứ gì đó chung chung (General-purpose) mà không cần chuyên gia điều phối.

## Phương thức Hoạt Động (How It Works)

Đây là chức năng trung tâm đóng vai trò ra quyết định để định hướng hệ sinh thái tổng Các Agent-Skills. Tự động khám phá (auto-discovery), xác thực các Agent có tính liên đới liên quan, và chỉ huy đa agent để thực hiện các task cực kì phức tạp.

## Nguyên Tắc Can Thiệp Không Chạm (Zero Manual Intervention)

- **LUÔN quét (scan)** định kỳ trước để xử lý tất cả các truy vấn request.
- Skill file mới được tạo luôn **tự động detect và kéo ngầm** khi tạo file SKILL.md trong bất kỳ thư mục con nào.
- Skill nào xóa đi sẽ **tự động tháo bỏ khỏi** sổ đăng ký Registry.
- Hoàn toàn KHÔNG cần lệnh tay manual nào để kích hoạt thêm thẻ mới.

---

## Luồng Công Việc Bắt Buộc (Mandatory Workflow)

Chạy các bước này TRƯỚC khi xử lý yêu cầu của user.
Các Script Python dùng relative paths (đường dẫn tương đối) để có thể hoạt động ở bất kỳ folder nào.

## Bước 1: Auto-Discovery (Khám Phá Quét Tìm)

```bash
python agent-orchestrator/scripts/scan_registry.py
```

Siêu nhanh (<100ms) nhờ lưu MD5 hashes caching. Chỉ chạy lại trên những file vừa sửa lỗi.
Trả về dữ liệu định dạng JSON chứa trạng tóm tắt của tất cả các skill file hiện hữu vừa quét được.

## Bước 2: Bắt Cặp Kỹ Năng (Match De Skills)

```bash
python agent-orchestrator/scripts/match_skills.py "<yêu cầu của user>"
```

Sẽ trả lại kết quả dạng JSON biểu thị cấp độ Relevance rank list (Bảng xếp hạng khớp lệnh).
Đọc kết quả theo công thức:

| Kết quả                | Hành động cần triển khai                                 |
|:-----------------------|:--------------------------------------------------------|
| `matched: 0`          | Không bắt khớp với Skill nào. Tiếp tục chạy không Skill.|
| `matched: 1`          | Bắt 1 khớp. Đọc SKILL.md tương ứng và chạy theo skill đó.|
| `matched: 2+`         | Đa kênh bắt khớp. Sử dụng Bước 3 (Chạy lệnh Điều Phối). |

## Bước 3: Điều Phối Phức Hợp (Khi Matched >= 2)

```bash
python agent-orchestrator/scripts/orchestrate.py --skills skill1,skill2 --query "<yêu cầu>"
```

Sẽ output ra bản kế hoạch Execution, vạch rõ chi tiết thứ tự Steps chạy luồng data flow trao đổi giữa chúng.

## Bước Nhanh Tích Hợp (Shortcut)

Đối với các query đơn lẻ, Bước 1+2 có thể ghép chạy song song:
```bash
python agent-orchestrator/scripts/scan_registry.py && python agent-orchestrator/scripts/match_skills.py "<yêu_cầu_user>"
```

---

## Quản Trị Hệ Thống Sổ Kỹ Năng (Skill Registry)

Registry lưu giữ tồn tại tại:
```
agent-orchestrator/data/registry.json
```

## Vùng Tìm Kiếm Quét (Locais De Busca)

Scanner thường xuyên dò xét SKILL.md bao gồm các vùng:
1. `.claude/skills/*/` (Đăng ký kỹ năng Claude Code platform trực tiếp)
2. `*/` (Đứng độc lập Standalone mức cao nhất Top-level)
3. `*/*\` (Nằm sâu trong Sub-files đệ quy tới mức Level depth = 3)

## Trường Đặc Tả Siêu Dữ Liệu Từng Kỹ Năng (Metadata Por Skill)

Mỗi một tệp định danh trên Data Registry bao gồm nội dung:

| Cột Data        | Mô Tả Định Dạng Khai Báo                               |
|:---------------|:---------------------------------------------------|
| name           | Đặt tên Name theo key frontmatter (YAML)           |
| description    | Rút gọn Mô Tả kèm câu lệnh trigger inclusos        |
| location       | Đường dẫn gốc cố định tuyệt đối Local              |
| skill_md       | Trỏ root path Absolute đến file SKILL.md           |
| registered     | Tính hợp lệ true/false do tool quản lý sinh ra     |
| capabilities   | Gắn Tag định chuẩn Auto (Tự Động) + Khai tay (Ngoại Cấp) |
| triggers       | Các Keywords khởi động Trigger nằm nội hàm ở description |
| language       | Core Script Python, NodeJS, Bash hay None API      |
| status         | Hiển thị đang "active" hay đứt đoạn "incomplete/missing". |

## Call Lệnh Registry Command

```bash

## Quét Siêu Tốc Bằng Hash Cache Dữ Liệu Cũ

python agent-orchestrator/scripts/scan_registry.py

## XEM TRẠNG THÁI STATUS TỔNG TABLE SẢN PHẨM HOÀN CHỈNH

python agent-orchestrator/scripts/scan_registry.py --status

## LỆNH QUÉT THÁO BỎ BỘ NHỚ ĐỆM BUỘC KIỂM SOÁT LẠI

python agent-orchestrator/scripts/scan_registry.py --force
```

---

## Thuật Toán Bắt Cặp (Algoritmo De Matching)

Đối với mỗi request nhận vào, Watcher sẽ tính điểm qua barem:

| Tiêu Chí                    | Điểm Thưởng | Giải Nghĩa Khớp Lệnh                      |
|:-----------------------------|:-------|:--------------------------------------|
| Khớp ngay tên ở Query Name   | +15    | Yêu cầu: "Dùng web-scraper"...            |
| Từ khóa khớp trực tiếp       | +10    | Ví dụ có text: "scrape" => Trỏ về web-scraper. |
| Phạm Trù Group Danh Sách Cáp  | +5     | Trích xuất data => Ánh xạ tới web-scraper |
| Đè lặp mô tả bằng tần suất chữ | +1     | Lọc chữ từ yêu cầu User chạy vô Description Text. |
| Mức Bonus Ưu Tiên Core Dự Án  | +20    | Được Project List Active ấn định mặc định. |

Cột mốc Sàn Minimum: 5 điểm. Skill nào < 5 Auto Skip/Ignore.

## Map Bắt Cặp Ở Project Riêng

```bash
python agent-orchestrator/scripts/match_skills.py --project my-project "truy_cập_câu_lệnh"
```

Skill cố định của riêng dự án sẽ nhận thêm Base Score Modifier +20đ mặc định.

---

## Các Khuôn Mẫu Điều Phối (Padroes De Orquestracao)

Khi gom đa kênh chạy cùng lúc, Orchestrator chia chặng Model:

## 1. Flow Định Tuyến Chéo Song Hệ (Sequential Pipeline)

Ngõ ra output của Skill này đóng nhiệm vụ mồi Input Base Data cho con tiếp theo Pipeline.

**Hoàn cảnh:** Các kỹ năng Mix kết hợp "Tiết Xuất" (Produce Data - Extract Data/Government Data) và "Tiêu Thụ Data" (Consume API - Messaging).

**Ví Dụ Cụ Thể:** Bot Crawler thu gom giá Sale Off (Scrapper) => API ZNS Send Zalo gửi chốt đơn.

```
user_query -> web-scraper -> whatsapp-cloud-api -> result
```

## 2. Truy Gọi Hệ Song Hành Cùng Lúc (Parallel Processing)

Tuy có xuất phát từ 1 Job chính nhưng hệ thống được tách ngắt 2 job chạy tiến trình độc lập ko đợi nhau.

**Hoàn Cảnh Khi Dùng:** Do các agent đều độc lập luồng API riêng lẻ cùng lúc (2 Produter, Consume...)

**Ví Dụ Mảnh Ghép:** Auto đẩy Post Bài Lướt Face + Bắn Notification nhắc lịch ở Telegram App Bot. Tức 2 App Consume API Push cắm chạy tách file.

```
user_query -> [instagram, telegram-push-api] -> aggregated_result
```

## 3. Một Chính Và Nhiều Chuyên Gia Hỗ Trợ Data (Primario + Suporte)

1 Leader cầm cái đầu não và giao khoán lệnh Request đến những Bot Support Backend cung cấp Data tham khảo thông số lẻ tẻ ráp chắp vá.

**Khi Điều Nhịp Call Lệnh:** Chênh lệch Matching Score của 1 skill bỏ xa x2 đối tượng còn lại.

**Ví Dụ Mapping Call:** Trigger Auto Message Broadcast Bot (Primary Tool) + Đằng sau lưng có Bot DB Check Mail Support Cào Data Danh Sách Push.

```
user_query -> whatsapp-cloud-api (primary) + web-scraper (support) -> result
```

---

## Quản Trị Kho Dự Án (Gerenciamento De Projetos)

Bằng việc map một skill nào đó trọn vẹn dính cố định bám sát cho 1 tập folder dự án. Sẽ tăng độ chính xác của Relevence matching score context cho Project File Path.

## Tài Liệu List Danh Mục Khởi Tạo Projects
```
agent-orchestrator/data/projects.json
```

## Phương Thức Thao Tác (Operacoes)

**Cách Tạo Object Project Mới:**
File `projects.json`:
```json
{
  "name": "dự-án-mới",
  "created_at": "2026-02-25T12:00:00",
  "skills": ["web-scraper", "whatsapp-cloud-api"],
  "description": "Nội Dung Miêu Tả Tác Vụ Công Cụ Cho Team Dự Án..."
}
```

**Thêm Thẻ Bài Vô Cố Định Template:** Sửa Value ở list Array `"skills"`.
**Xóa Tag Remove Skill Ở Template Project Khỏi:** Xóa Value của mảng `"skills"`.
**Đọc Truy Tìm Kho Kỹ Năng Tool Được Nạp Khởi Lệnh Của 1 Team Template List:** Gọi đọc ở array file `projects.json`.

---

## Chỉ Dẫn Mở Tính Năng Bot Mới Thêm List (Adicionando Novas Skills)

Hướng Dẫn 4 steps Tạo Skill Profile:

1. Thiết tạo folder nằm trong ngách Node Parent Tree System Directory gốc Local Repo...
2. Xây Build bộ Khung Template Frame Root File Base Căn Bản Đầu Thỏa Mãn YAML Code Info Frontmatter Code Header Code MetaData Code Header :
```yaml
---
name: my-new-tweak-profile-agent
description: "Sức Mệnh Profile Định Tên Keywords Code Triggers Function Task..."
---

## Tài Liệu Lập Trình Module Kỹ Năng Agent Custom Bot Base...

```
3. Done (Pronto!!). Code Base Scanner Sẽ Kéo Khung Profile Map Quét Load Mapping Cache Auto 100%.

Muốn ép tương thích App SDK Claude API Mức Độ Cục Bộ:
4. Copy Paste Bồi Paste Push File Base File Skill.MD đó sang ổ Base Map `/.claude/skills/<thư_mục_name>/SKILL.md`

## Thêm Keyword Custom Capabilities Fix Bắt Lệnh Buộc

Fix Lỗi Nếu Mapping Engine Đi Nhầm Skill Đè Bằng Khai Nhập Mảng Chéo Cho Đích Đáng File YAML Front-meta-code...:
```yaml
capabilities: [data-extraction, web-automation]
```

---

## Giám Sát Trace Monitor Kiểm Tuyến Trạng Thái Chức Năng Total

```bash
python agent-orchestrator/scripts/scan_registry.py --status
```

## Bảng Từ Điển Dịch Giải Phân Tích Hiện Trạng Đánh Dấu Cột Check Tool Cứu Báo Trạng Thái Dữ Liệu Tool System Cột Status.

| Code Màn Hình Trả Tình Trạng | Code Dịch Nghĩa Error State Khai Báo Fix Error Lỗi Thiếu Sót Data  |
|:-----------|:---------------------------------------------------|
| active     | Tốt (100% Chạy Đủ Cột Trục). File Metadata có Name+Desc Đủ Cấu Trúc Khung Khai |
| incomplete | Trống Cấu Trúc Text Code Meta File SKILL.md Dư Cột Title Trống Thông Tin |
| missing    | Tách Directory File Không Thấy Cầu Nối Component Template Document Trống Lõi Root Cắm Path |

---

## Thực Hành Tốt (Best Practices)

- Phải cung cấp toàn cảnh bức tranh (Context Clear Scope Explicitly) để Module Tách Việc Chia Việc Xử Trí Đích Đáng Không Đi Lệch Hướng Baza...
- Review kiểm đếm Code Push Log Kiểm Soát Script Suggest Suggestion Đưa Đẩy Môi Trường Chạy Cấm Có Đẩy Đi Khi Chưa Rõ Lịch Đẩy Trace Bug Code Đủ Kỹ...
- Combo kết nối mix pha quyện nhiều chức năng để mang lại Output Phân Tích Logic Mượt Nhất Có Thể Giúp Bổ Trợ Tréo System Lẫn Nhau...

## Những Cạm Bẫy Tránh Sai Sót Thường Bắt Mắc Lúc Cấu Hình

- Sai Vùng Việc Cắm Nạp API Xong Đem Build Bừa Lệch Ranh System Mảng Ngành Không Map Skill Chuẩn. Phá Sụp Rào Cảng Error Tràn Map Memory Build Module Kỹ Năng Code Core Không Đáng Bị Phá Hỏng Khử Code.
- Cứ Áp Mã System Output Trả Code Chạy Vô Trách Nhiệm Chẳng Cần Hiểu Gốc Baza Vấn Đề Context...
- Vất Thùng Rác System Error Error Thiếu Gốc Baza Gạch Lớp Scope Context Tác Nghiệp Hệ Quả Phân Tích Code Cài Bot Run Vấp Lác Bỏ Cầu Code Code Nát Tràn System Error Không Ngắt Error Build Code Load Data Hở Check Tool Cứu Fix Lỗi System Bug Cấu Trúc Load Cache Chấm Mảng Báo Lỗi Module Data Bug Cache Không Tải Cứ Đè Gắn Mảng Rỗng Map Cập Thông Số Khuya Không Lọc.

## Các Mã Agent Tool Bổ Trợ Code Phức Hợp (Related Skills)

- `multi-advisor` - Agent Meta Module Nháy Support Trace Build Phụ Bổ Khuyết Đẩy Output Module Function Code Data Fix Cập Đủ Output Function Flow Module Chặn Đẩy...
- `task-intelligence` - Module Tính Build Điểm Đi Log Metric Code Report Check Fix Code Flow Data Fix Output Code Chạy Chữa Log System Tắt Tràn Data Trace Output Báo Cache Code Code Load Mượt Error Bug Trả Trace Tắt.
