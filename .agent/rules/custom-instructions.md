---
trigger: model_decision
description: Áp dụng khi cần xác định global preferences, coding standards, framework preferences, hoặc phong cách làm việc bất biến của agent.
type: recommended
risk: low
---

# Custom Instructions — Chỉ Dẫn Cá Nhân Toàn Cục

> [!IMPORTANT]
> Custom Instructions chứa các **quy tắc bất biến** — những gì agent **LUÔN** phải tuân thủ bất kể task cụ thể. Đây là Layer 3 trong kiến trúc đa tầng (xem `layered-prompt-architecture.md`).

## 1. Phạm vi áp dụng

Custom Instructions **NÊN** chứa:
- Ngôn ngữ ưu tiên (đã cover bởi `communication.md`)
- Phong cách viết / tone (chuyên nghiệp, súc tích, kỹ thuật)
- Tiêu chuẩn kỹ thuật: coding standards, framework preferences
- Quy tắc output: luôn có source, luôn có chart, format cụ thể

Custom Instructions **KHÔNG NÊN** chứa:
- Yêu cầu cho một task cụ thể → Dùng User Prompt (Layer 7)
- Thông tin thay đổi thường xuyên → Dùng Knowledge Base (Layer 4, `knowledge-base.md`)
- Quy trình multi-step → Dùng Workflows (`workflows/`)

## 2. Cấu trúc khuyến nghị

Khi user cần định nghĩa Custom Instructions, hướng dẫn theo template:

```markdown
## Coding Standards
- Language: TypeScript strict mode
- Framework: Next.js + React (functional components + hooks)
- State Management: Zustand
- Styling: Tailwind CSS / Vanilla CSS
- Testing: Vitest + React Testing Library

## Output Standards
- Luôn cung cấp sources cho kết luận quan trọng
- Luôn đi kèm visualization (chart/diagram) khi phân tích data
- Code response phải đi kèm unit test example

## Tone & Style
- Chuyên nghiệp, súc tích (kỹ sư nói chuyện với kỹ sư)
- Ưu tiên ROI, scalability, MVP
```

## 3. Ví dụ theo vai trò

| Vai trò | Custom Instruction mẫu |
|---|---|
| Dev Python | Focus on Python best practices. Use type hints. Follow PEP 8. |
| Startup Founder | Think like a founder. Focus on ROI, scalability, MVP. |
| Data Analyst | Prioritize data-driven insights. Always include charts. |
| Content Creator | Write engaging, SEO-optimized content. Use storytelling. |

## 4. Mối liên hệ với các Rule khác

- `communication.md` — Cover ngôn ngữ (subset của Custom Instructions)
- `clean-code.md` — Cover coding standards chi tiết
- `layered-prompt-architecture.md` — Custom Instructions là Layer 3
