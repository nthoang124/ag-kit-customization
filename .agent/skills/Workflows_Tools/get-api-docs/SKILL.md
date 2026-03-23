---
name: get-api-docs
description: >
  Sử dụng kỹ năng này khi bạn cần lấy tài liệu tham khảo cho một thư viện bên thứ ba,
  SDK, hoặc API trước khi viết mã (code) dựa trên chúng.
  Ví dụ: "sử dụng OpenAI API", "gọi Stripe API", "dùng Anthropic SDK", v.v.
  Hãy TÌM KIẾM và LẤY tài liệu bằng công cụ `chub` thay vì dựa vào trí nhớ huấn luyện (training data),
  để đảm bảo mã bạn viết luôn chính xác theo phiên bản mới nhất.
---

# Lấy Tài Liệu API qua chub

Khi bạn cần tài liệu cho một thư viện hay API, hãy dùng `chub` CLI để lấy thông tin thay vì "đoán" dựa trên dữ liệu bạn được huấn luyện.

## Bước 1 — Tìm ID tài liệu chính xác

```bash
chub search "<tên_thư_viện_hoặc_api>" --json
```

Hãy chọn `id` phù hợp nhất từ kết quả tìm kiếm (ví dụ: `openai/chat`, `anthropic/sdk`, `stripe/api`). Nếu không có kết quả, hãy thử một từ khóa tìm kiếm rộng hơn.

## Bước 2 — Tải tài liệu về

```bash
chub get <id> --lang py    # hoặc --lang js, --lang ts
```

Nếu tài liệu chỉ hỗ trợ một ngôn ngữ duy nhất, bạn có thể bỏ tham số `--lang`, `chub` sẽ tự động chọn đúng ngôn ngữ.

## Bước 3 — Sử dụng tài liệu

Hãy đọc kỹ tài liệu bạn vừa tải về và lấy nó làm cơ sở để viết mã hoặc trả lời câu hỏi của người dùng.
TUYỆT ĐỐI KHÔNG dựa vào cấu trúc API bạn nhớ — hãy tôn trọng những gì tài liệu mới nhất hướng dẫn.

## Bước 4 — Ghi chú (Annotate) lại những điều mới học được

Sau khi hoàn thành công việc, nếu bạn phát hiện ra một chi tiết KHÔNG CÓ trong tài liệu — như một lỗi hay gặp (gotcha), cách workaround, lỗi do khác biệt phiên bản, hay các cài đặt đặc thù cho dự án — HÃY LƯU CHÚNG LẠI. Điều này giúp các phiên làm việc tiếp theo của bạn (hoặc Agent khác) trở nên thông minh hơn:

```bash
chub annotate <id> "Quá trình xác thực Webhook cần raw body — không được parse JSON trước khi xác thực"
```

Các bản ghi chú (annotations) sẽ lưu trữ cục bộ, tồn tại xuyên suốt các phiên làm việc và tự động xuất hiện mỗi khi bạn gọi `chub get` trong tương lai. 
- Giữ ghi chú ngắn gọn, đi vào trọng tâm, dễ thực thi.
- KHÔNG lặp lại những gì ĐÃ CÓ MẶT trong tài liệu gốc.

## Bước 5 — Cung cấp phản hồi (Feedback)

Đánh giá chất lượng của tài liệu giúp tác giả có thể cải thiện nó. Hãy hỏi ý kiến người dùng trước khi gửi phản hồi:

```bash
chub feedback <id> up                        # tài liệu rất tốt/chuẩn
chub feedback <id> down --label outdated     # tài liệu đã lỗi thời
```

Danh sách nhãn trợ giúp đánh giá (`label`): `outdated`, `inaccurate`, `incomplete`, `wrong-examples`, `wrong-version`, `poorly-structured`, `accurate`, `well-structured`, `helpful`, `good-examples`.

## Bảng tra cứu nhanh lệnh

| Mục đích | Câu lệnh |
|------|---------|
| Liệt kê toàn bộ | `chub search` |
| Tìm một tài liệu | `chub search "stripe"` |
| Xem chi tiết một ID | `chub search stripe/api` |
| Tải tài liệu Python | `chub get stripe/api --lang py` |
| Tải tài liệu JS | `chub get openai/chat --lang js` |
| Lưu thành file | `chub get anthropic/sdk --lang py -o docs.md` |
| Tải nhiều tài liệu cùng lúc | `chub get openai/chat stripe/api --lang py` |
| Ghi chú bổ sung | `chub annotate stripe/api "needs raw body"` |
| Liệt kê ghi chú hiện có | `chub annotate --list` |
| Đánh giá tài liệu | `chub feedback stripe/api up` |

## Lưu ý thêm

- Lệnh `chub search` không có từ khóa sẽ liệt kê MỌI thứ đang có.
- Định dạng của ID là `<author>/<name>` — hãy kiểm tra lại ID bằng lệnh search trước khi gọi lệnh `get`.
- Nếu thư viện có nhiều ngôn ngữ mà bạn không truyền tham số `--lang`, `chub` sẽ liệt kê cho bạn biết những ngôn ngữ nào đang khả dụng.
