# Research Methodology Reference

## Evidence Quality Framework

### Source Reliability Tiers

| Tier | Source Type | Trust Level | Examples |
|:---:|:---|:---:|:---|
| **S** | Official Documentation | 🟢 High | docs.python.org, react.dev |
| **A** | Peer-Reviewed / Reputable | 🟢 High | ACM papers, ThoughtWorks Radar |
| **B** | Industry Blogs | 🟡 Medium | Engineering blogs (Netflix, Stripe) |
| **C** | Community Content | 🟡 Medium | Dev.to, Medium, Stack Overflow |
| **D** | AI-Generated / Unverified | 🔴 Low | ChatGPT outputs, unnamed sources |

### Recency Rules

- **Technology comparisons**: Sources must be < 12 months old
- **Best practices**: Sources < 24 months acceptable
- **Fundamental concepts**: Any age acceptable (e.g., ACID properties)
- **Always mark date**: `(Source: blog.example.com, Jan 2026)`

## Research Anti-Patterns

### ❌ Don't

1. **Confirmation Bias** — Don't search only for evidence supporting your hypothesis
2. **Single Source** — Never conclude from 1 source alone
3. **Authority Fallacy** — Big company ≠ best practice for your use case
4. **Recency Bias** — Newest ≠ best (stable > bleeding edge)
5. **Survivorship Bias** — Only seeing success stories, not failures

### ✅ Do

1. **Steelman Alternatives** — Argue FOR options you're leaning AGAINST
2. **Seek Disconfirmation** — Search "[technology] problems" not just "[technology] benefits"
3. **Check GitHub Issues** — Real-world pain points live there
4. **Compare Apples to Apples** — Same scale, same team size, same constraints
5. **Quantify When Possible** — "Faster" → "2.3x faster on benchmark X"

## Search Strategy Templates

### Technology Evaluation

```
Search 1: "[tech A] vs [tech B] benchmark 2025"
Search 2: "[tech A] production issues"
Search 3: "[tech B] migration guide from [tech A]"
Search 4: "[tech A] github stars issues contributors"
Search 5: "[tech A] case study [similar industry]"
```

### Competitive Analysis

```
Search 1: "[competitor] pricing plans 2025"
Search 2: "[competitor] reviews G2 Capterra"
Search 3: "[competitor] vs [your product category]"
Search 4: "[competitor] API documentation"
Search 5: "[industry] market size forecast"
```
