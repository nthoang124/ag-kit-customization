---
description: Bắt buộc tìm kiếm và tham chiếu tài liệu API/SDK thực tế (thông qua chub hoặc search web) thay vì tự đoán dựa trên dữ liệu huấn luyện.
type: mandatory
risk: high
---

# Context Retrieval & Knowledge Feedback Rules

> [!IMPORTANT]
> Agent **PHẢI LUÔN** tìm kiếm, tải về và đọc tài liệu (Documentation) chính thức của bất kỳ thư viện, API hay SDK bên thứ 3 nào trước khi viết mã (code). Việc tự đoán hoặc sử dụng trí nhớ từ dữ liệu huấn luyện (hallucination/training data assumption) là **BỊ NGHIÊM CẤM** vì có thể dẫn đến sử dụng sai phiên bản hoặc API đã bị deprecate.

## 1. Ưu tiên sử dụng Context Hub (`chub`)

Khi làm việc với các thành phần không thuộc standard library (ví dụ: `openai`, `stripe`, `anthropic`, `supabase`...):
*   **BƯỚC 1**: Sử dụng CLI `chub search <tên_thu_vien>` để tìm ID tài liệu.
*   **BƯỚC 2**: Sử dụng CLI `chub get <id>` để tải nguyên văn tài liệu mới nhất về làm Context.
*   **BƯỚC 3**: Chỉ được phép viết code DỰA TRÊN những gì tài liệu (DOC.md) vừa trả về mổ tả. Không tự sáng tạo thêm tham số (parameters) không có trong docs.

## 2. Tìm kiếm trên Web (Web Search Fallback)

Trong trường hợp `chub search` **không** tìm thấy bất kỳ tài liệu nào:
*   **BẮT BUỘC** phải cung cấp một từ khóa tìm kiếm (Search Query) qua công cụ Web Search để tìm đến trang tài liệu chính thức (Official Docs) của thư viện đó trước khi tiếp tục.

## 3. Cơ chế Tự hoàn thiện (Self-Improvement via Annotations)

Một trong những hạn chế lớn nhất của tài liệu là không bao giờ bao phủ hết 100% các tình huống thực tế (edge cases). Khi một phiên làm việc (session) giúp bạn phát hiện ra một vấn đề mới:
*   Nếu bạn tìm ra một **lỗi sai trong tài liệu** (ví dụ: api trả về structure khác với docs).
*   Nếu bạn hoặc User tìm ra một **giải pháp vòng (workaround)** cho một bug cụ thể của môi trường.
*   Nếu có một **lưu ý phiên bản** đặc biệt (version quirk) làm dự án bị đứng (crash).
*   **HÀNH ĐỘNG**: Bạn **PHẢI** lưu lại kiến thức đó bằng cú pháp `chub annotate <id> "<Ghi_chú_của_bạn>"`.
*   *Lý do:* Hệ thống Annotation sẽ lưu vết chú thích này ở máy tính (local). Các phiên làm việc hoặc Agent khác sau này khi gọi lại `chub get <id>` sẽ TỰ ĐỘNG nhận được lời dặn dò của bạn ở dưới cùng tài liệu. Điều này giúp hệ thống Agent thông minh hơn theo thời gian (Self-Improving Agents).

## 4. Góp ý Trực tiếp (Feedback Loop)

Nếu tài liệu của `chub` bị sai hoàn toàn định dạng hoặc quá cũ:
*   Bạn có thể đề nghị User cho phép gửi đánh giá phản hồi (`chub feedback <id> down --label outdated`) để tác giả tài liệu có thể cập nhật cho cộng đồng.

## Báo cáo Tuân Thủ

*   Bất kỳ kế hoạch kiến trúc (Implementation Plan) nào có tương tác với External API, **PHẢI** liệt kê bước "Tải tài liệu bằng chub/web search" lên làm một trong các bước đầu tiên.
