# Thẩm Định Quy Tắc: Agent Mode Selection

> [!IMPORTANT]
> Bản thẩm định này được thực hiện theo yêu cầu "khắt khe" từ người dùng, áp dụng bộ tiêu chí của `evaluation-framework.md`.

## 1. Bảng Điểm Chi Tiết

| # | Tiêu chí | Điểm | Trọng số | Điểm × TS | Bằng chứng | Ghi chú |
|:--|:---|:---:|:---:|:---:|:---|:---|
| 1 | Tính Khả Thi | 9 | 15% | 1.35 | Logic dựa trên metadata (Complexity, Scope) dễ parse. | Rất khả thi để Agent tự thực thi. |
| 2 | Rủi Ro Hệ Thống | 6 | 15% | 0.90 | Ngưỡng ">3 files" là "magic number" tùy tiện. | Có rủi ro chọn sai mode ở vùng xám. |
| 4 | Chất Lượng Kiến Trúc | 7 | 15% | 1.05 | Phân định rõ PLANNING/EXECUTION theo nguyên tắc SRP. | Tuy nhiên thiếu định nghĩa "Counterfactual Risk Assessment". |
| 5 | Độ Bao Phủ Kiểm Thử | 4 | 10% | 0.40 | Không có cơ chế tự kiểm tra (self-check) độ chính xác khi chọn mode. | Khó đo lường tỷ lệ chọn sai mode (False Positive/Negative). |
| 7 | Trải Nghiệm Người Dùng | 8 | 5% | 0.40 | Có cơ chế nhắc nhở (răn đe) khi người dùng dùng sai mode UI. | UX tốt, minh bạch. |
| 8 | Chất Lượng Tài Liệu | 7 | 5% | 0.35 | File rule ngắn gọn, dễ hiểu, trình bày sạch. | Thiếu template cho các artifact liên quan. |
| 9 | Khả Năng Vận Hành | 5 | 10% | 0.50 | Thiếu cơ chế thu thập feedback để điều chỉnh ngưỡng selection. | Vận hành tĩnh (Static), không tự tiến hóa. |
| | **TỔNG** | | **75%** | **6.6/10** | | |

*Ghi chú: Một số tiêu chí (Tài chính, Bảo mật, Bền vững) được gộp hoặc điều chỉnh trọng số cho phù hợp với đặc thù của một "Rule/Protocol".*

## 2. Phân Loại: 🟡 Trung bình (Cần refactor có kế hoạch)

---

## 3. Phản Biện Khắt Khe

### Điểm yếu #1: Ngưỡng "Magic Number" (>3 files)
- **Bằng chứng**: Mục 1, ý 3 (`agent-mode-selection.md:L19`).
- **Tác động**: Một sự thay đổi ở 2 file cực kỳ nhạy cảm (ví dụ: `auth.py` và `db.sql`) có thể bị đẩy vào `EXECUTION` và chạy thẳng mà không qua Planning, gây thảm họa bảo mật/data. Ngược lại, việc đổi tên biến ở 5 file CSS sẽ bị ép vào `PLANNING` gây lãng phí thời gian (overhead).
- **Đề xuất**: Chuyển từ "đếm số file" sang đánh giá "Trọng số File" (File Sensitivity). File core/infra/security luôn trigger `PLANNING` dù chỉ sửa 1 dòng.
- [x] Research & Analysis
    - [x] Read `_routing.md` to understand current selection logic
    - [x] Read `evaluation-framework.md` for assessment criteria
    - [x] Read `agent-mode-selection.md` (Selection Mode core rule)
    - [x] Analyze logic and identify weaknesses
- [x] Evaluation
    - [x] Draft evaluation report using the framework
    - [x] Identify gaps, weaknesses, and potential "edge cases"
- [ ] Proposal & Refining

### Điểm yếu #2: Khái niệm "Counterfactual Risk Assessment" mơ hồ
- **Bằng chứng**: Mục 3 (`agent-mode-selection.md:L45`).
- **Tác động**: Đây là một thuật ngữ kỹ thuật cao nhưng không có định nghĩa cụ thể hay workflow đi kèm. Agent sẽ "chém gió" hoặc bỏ qua bước này vì không biết format chuẩn là gì.
- **Đề xuất**: Tạo `TEMPLATE_RISK_ASSESSMENT.md` hoặc bổ sung phụ lục giải thích cụ thể các bước cần thực hiện.

### Điểm yếu #3: Thiếu "Vùng Xám" (Intermediate Mode)
- **Bằng chứng**: Chỉ có 2 cực PLANNING (chờ duyệt) và EXECUTION (chạy thẳng).
- **Tác động**: Hệ thống thiếu sự linh hoạt. Có những task "Vừa" mà Agent tự tin nhưng vẫn cần draft plan để User xem *trong lúc đang code* (không block), thay vì bắt User click Approve cực đoan.
- **Đề xuất**: Bổ sung `DRAFT-AND-EXECUTE` mode: Agent tạo plan và làm luôn, User có quyền can thiệp (Interrupt) nếu thấy sai.

### Điểm yếu #4: Ngôn ngữ "Răn đe" (Deterrence)
- **Bằng chứng**: Ý 4.2 (`agent-mode-selection.md:L52`).
- **Tác động**: Việc dùng từ "BẮT BUỘC phải răn đe" có thể tạo trải nghiệm Agent "cứng nhắc" hoặc "dạy đời" thái quá nếu trigger nhầm.
- **Đề xuất**: Chỉnh sửa tone & voice thành "Cảnh báo & Gợi ý" (Advisory/Warning) thay vì "Răn đe".

---
**Độ tin cậy của bản đánh giá**: 0.90
(Đầy đủ dữ liệu từ file rule hiện tại và framework thẩm định).
