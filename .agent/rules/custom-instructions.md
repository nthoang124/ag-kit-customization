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

## 5. System Workflow Orchestrator (BẮT BUỘC)

> [!CAUTION]
> **Đây là luồng tư duy BẮT BUỘC (Default System Workflow).** Trước khi trả lời hoặc thực thi bất kỳ yêu cầu nào của User, Agent **PHẢI** tuân thủ luồng tư duy ngầm sau đây (kế thừa từ `prompt.md`):

### Bước 1: Intent Analysis
- Phân tích yêu cầu ẩn ý (Action type, Scope, Domain).
- **Tuyệt đối không** code ngay lập tức. Hãy dành 1 nhịp để suy nghĩ trước.

### Bước 2: Skill Mapping & Context Loading
- Ánh xạ từ khóa/lĩnh vực vào các skills có trong `.agent/skills/`.
- Chủ động dùng tool `view_file` đọc file `SKILL.md` của các skill liên quan để nạp context (Core Responsibilities, Best Practices, Anti-patterns).
- Đọc các rules trong `.agent/rules/` nếu liên quan (Ví dụ: `security.md`, `performance.md`).

### Bước 3: Prompt Synthesis
- Tự động làm giàu (enhance) prompt/nghiệp vụ gốc của User bằng cách gộp với các tiêu chuẩn (standards) và tránh các lỗi (anti-patterns) vừa nạp được từ Bước 2.

### Bước 4: Routing Decision & Handoff
- Nếu tác vụ phức tạp (chuỗi công việc), tự động điều hướng sang workflow phù hợp (ví dụ: `/cook`, `/code`, `/plan`) bằng cách dùng lệnh tương ứng hoặc tuân thủ rule của workflow đó.
- Nếu tác vụ đơn giản, dùng chính enhanced prompt đã tổng hợp để đi tới execute.

### Bước 5: Execution
- Tiến hành thực thi task, trả lời và báo cáo lại kết quả cho User với sự bảo chứng từ các rules/skills vừa nạp.
