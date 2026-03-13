---
description: Bắt buộc cung cấp khả năng giải thích (Explainability/XAI) cho các quyết định kiến trúc, thay đổi mã nguồn và đề xuất kỹ thuật.
type: mandatory
risk: critical
---

# Explainability (XAI) Rules

> [!IMPORTANT]
> Agent **PHẢI LUÔN** cung cấp ngữ cảnh, lý do và giải thích rõ ràng cho mọi hành động thay đổi mã, cấu hình hệ thống hoặc đưa ra các lựa chọn thiết kế kỹ thuật. Sự minh bạch là chìa khóa để duy trì lòng tin của User và đảm bảo hệ thống an toàn (Human-in-the-loop).

## 1. Yêu cầu Giải thích theo Lộ trình Suy luận (Reasoning Path)

Khi đề xuất một giải pháp kiến trúc, xây dựng kế hoạch triển khai (Workflow `/plan`), hoặc xử lý lỗi phức tạp:
*   **KHÔNG** chỉ đưa ra kết quả cuối cùng.
*   **PHẢI** trình bày rõ các bước suy luận trung gian (Chain-of-Thought) dẫn đến kết luận đó. Liệt kê các yếu tố đã được xem xét và tại sao chúng được chọn hoặc loại bỏ.

## 2. Gán Tầm Quan Trọng (Feature Attribution)

Khi thực hiện thay đổi mã nguồn, đặc biệt là trong các thao tác tái cấu trúc, tối ưu hiệu năng hoặc vá lỗi bảo mật (Workflow `/code-review`, `/fix`):
*   **PHẢI** chỉ rõ cụ thể dòng mã (line of code), hàm (function) hoặc tệp (file) nào là nguyên nhân chính dẫn đến vấn đề hoặc thay đổi. Tránh các nhận xét chung chung như "Có lỗi cơ sở dữ liệu ở đây". Hãy nói "Dòng 145 ở tệp `db.py` thiếu kiểm tra NULL gây ra lỗi crash".
*   Trong các kế hoạch (Implementation Plan), **PHẢI** đính kèm chỉ số/đánh giá Tầm Quan Trọng của Tệp (File Importance Score/Level) để User tập trung đánh giá các tệp lõi, rủi ro cao trước tiên.

## 3. Explanations Phản Kịch Bản (Counterfactual Thinking)

Khi đưa ra một sự lựa chọn về công nghệ, thư viện, hoặc hướng đi (ví dụ: chọn Frontend Framework hoặc Model AI):
*   **PHẢI** cung cấp phân tích đối nghịch (Counterfactual Explanation). Trả lời câu hỏi: *"Điều gì sẽ xảy ra nếu chúng ta chọn phương án B thay vì phương án A?"*
*   Phân tích này phải đi kèm với đánh giá về sự đánh đổi (Trade-offs) liên quan đến Chi phí (Cost), Hiệu năng (Performance) và Độ phức tạp bảo trì (Maintainability).

## 4. Báo cáo Tuân Thủ & Truy Vết Gốc (Lineage/Traceability)

*   **Báo cáo Tuân thủ**: Bất kỳ Artifact Kế hoạch Kỹ thuật (`implementation_plan.md`) nào cũng phải liệt kê xem kế hoạch này có tuân thủ đúng các nguyên tắc trong thư mục `.agent/rules/` hiện hành hay không.
*   **Truy vết Lỗi**: Khi tóm tắt công việc (Walkthrough) hoặc sửa lỗi, **PHẢI** đính kèm liên kết truy vết (Traceability Links) chỉ ngược lại yêu cầu gốc của User hoặc log lỗi (Stacktrace) đã dẫn đến hành động sửa đổi đó. Tối đa hóa khả năng kiểm toán mã nguồn.

## 5. Cảnh báo Chống Rò Rỉ Dữ Liệu (XAI Secret Leakage Guardrail)

*   **[RỦI RO CAO]**: Khi Agent quá "thật thà" giải thích nguyên nhân gốc rễ, nó có thể vô tình tiết lộ các secret keys (ví dụ: in ra mật khẩu DB trong stacktrace hoặc trích dẫn file `.env`).
*   **BẮT BUỘC**: XAI Context **KHÔNG ĐƯỢC PHÉP** chứa bất kỳ thông tin nhạy cảm nào dưới dạng văn bản rõ (plaintext). Nếu bắt buộc phải trích dẫn dòng code chứa secret để làm bằng chứng, **PHẢI DÙNG KÝ TỰ CHE LẤP (Masking)**.
    *   ❌ *Sai:* "Nguyên nhân lỗi là do DB_PASSWORD=mySecretPass123 trong tệp config.js không đúng."
    *   ✅ *Đúng:* "Nguyên nhân lỗi là do biến `DB_PASSWORD` (giá trị đã bị che) trong tệp config.js cấu hình sai."
