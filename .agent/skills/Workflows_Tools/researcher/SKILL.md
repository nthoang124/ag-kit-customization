---
name: researcher
description: Use when conducting deep technical research, competitive analysis, or technology evaluation before making decisions.
risk: none
source: self
license: MIT
metadata:
  version: "1.0"
allowed-tools: search_web read_url_content
---

# Research & Discovery Standards

This skill provides systematic research methodology for gathering evidence-based insights before architectural decisions, feature implementation, or technology selection.

## When to Use

- Nghiên cứu công nghệ mới trước khi áp dụng.
- Phân tích đối thủ cạnh tranh (competitive analysis).
- Tìm best practices và patterns cho domain cụ thể.
- So sánh libraries/frameworks trước khi chọn.
- Technical spike để validate feasibility.

## When NOT to Use

- Đã biết rõ giải pháp → Code trực tiếp với `backend-developer` / `frontend-developer`.
- Cần architectural decision → Dùng `lead-architect`.
- Cần business requirements → Dùng `business-analysis`.

---

## Core Philosophy

1.  **Evidence over Intuition**: Mọi kết luận phải có nguồn tham chiếu (URL, paper, benchmark).
2.  **Multiple Sources**: Tối thiểu 3 sources cho mỗi topic quan trọng.
3.  **Recency Bias Aware**: Ưu tiên nguồn 2024-2026, mark rõ nếu dùng nguồn cũ hơn.
4.  **Structured Output**: Kết quả luôn dạng bảng/so sánh, không wall-of-text.

## Workflow

### Phase 1: Define Research Questions

1.  Xác định **3-5 câu hỏi cụ thể** cần trả lời.
    - ❌ Bad: "React vs Vue?"
    - ✅ Good: "React vs Vue cho team 3 người, SaaS B2B, cần SSR, timeline 3 tháng?"

### Phase 2: Gather Evidence

1.  **Official Docs**: Luôn bắt đầu từ documentation chính thức.
2.  **`search_web`**: Tìm benchmarks, case studies, comparisons.
3.  **`read_url_content`**: Đọc chi tiết các bài phân tích sâu.
4.  **GitHub**: Stars, issues, last commit, contributors cho library evaluation.

### Phase 3: Synthesize & Present

1.  Tạo **Comparison Table** cho mỗi câu hỏi.
2.  Ghi rõ **Trade-offs và Recommendations**.
3.  Liệt kê **Sources** với URLs.

## 📚 Reference Library

| Reference | Path | Purpose |
|:---|:---|:---|
| Research Methodology | `references/research-methodology.md` | Evidence quality, anti-patterns, search strategies |

## 📝 Templates

| Template | Path | Purpose |
|:---|:---|:---|
| Technology Comparison | `templates/tech-comparison.md` | Structured framework evaluation |
| Competitive Analysis | `templates/competitive-analysis.md` | Market & competitor profiling |

## ⚠️ Best Practices & Common Pitfalls

### ✅ Do

- **Define questions first** — Research without questions = wasted effort.
- **3+ sources minimum** — Never conclude from a single source.
- **Check publish date** — Mark outdated sources explicitly.
- **Quantify claims** — "Faster" → "2.3x faster on benchmark X".
- **Steelman alternatives** — Argue FOR options you’re leaning AGAINST.

### ❌ Don’t

- **Don’t confirmation bias** — Search "[tech] problems" not just benefits.
- **Don’t authority fallacy** — Big company ≠ best practice for your use case.
- **Don’t wall-of-text** — Tables & bullets, not paragraphs.
- **Don’t skip GitHub** — Stars, issues, last commit = real health signal.
- **Don’t present without recommendation** — Research without conclusion = useless.


---

## Ví dụ Copy-Paste

```text
# Technical research
@Workflows_Tools/researcher So sánh Supabase vs Firebase vs Neon cho SaaS:
- Cần PostgreSQL, Auth, Realtime
- Budget: $50/month
- Team: 2 devs

# Competitive analysis
@Workflows_Tools/researcher Phân tích 5 đối thủ chính trong thị trường 
Farm Management Software tại Việt Nam.

# Library evaluation
@Workflows_Tools/researcher Đánh giá 3 animation libraries cho React:
Framer Motion vs React Spring vs GSAP.
Focus: bundle size, performance, DX.
```

**Expected Output (Technology Comparison):**

```markdown
## Supabase vs Firebase vs Neon

| Criteria | Supabase | Firebase | Neon |
|:---|:---|:---|:---|
| Database | PostgreSQL ✅ | Firestore (NoSQL) | PostgreSQL ✅ |
| Auth | Built-in | Built-in | None (BYO) |
| Realtime | Realtime subscriptions | Realtime DB | None |
| Pricing ($50/mo) | Pro plan ✅ | Blaze (pay-as-go) | Scale plan |
| **Recommendation** | **✅ Best fit** | Good for mobile | DB-only |

**Recommendation**: Supabase — PostgreSQL + Auth + Realtime trong 1 platform.

Sources:
- supabase.com/pricing (Mar 2026)
- firebase.google.com/pricing (Mar 2026)
```

---

## Giới hạn (Limitations)

- **Không code** — chỉ nghiên cứu và report, không implement.
- **Web search limitations** — không truy cập được paywalled content.
- **Bias possible** — kết quả phụ thuộc search quality, cần user validate.
- **No hands-on testing** — chỉ desk research, không benchmark trực tiếp.
- **Outdated info risk** — luôn verify publish date của sources.

---

## Related Skills

- `lead-architect` — Dùng research results cho architecture decisions.
- `product-manager` — Market research cho product strategy.
- `business-analysis` — Domain research cho requirements.
- `ai-engineer` — AI/ML technology evaluation.
