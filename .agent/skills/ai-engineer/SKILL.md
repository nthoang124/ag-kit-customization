---
name: ai-engineer
description: Use when building production-grade GenAI, Agentic Systems, Advanced RAG, or setting up rigorous Evaluation pipelines.
risk: safe
source: self
license: MIT
metadata:
  version: "2.0"
allowed-tools: search_web read_url_content run_command
---

# AI Engineering Standards

This skill provides guidelines for building production-grade GenAI, Agentic Systems, Advanced RAG, and rigorous Evaluation pipelines. Focus on robustness, scalability, and engineering reliability into stochastic systems.

## When to Use

- Xây dựng hệ thống AI Agent (tool use, planning, multi-agent).
- Thiết kế RAG pipeline (chunking, embedding, retrieval, re-ranking).
- Setup evaluation pipeline (LLM-as-judge, regression testing, guardrails).
- Tối ưu model serving (caching, batching, cost management).
- Prompt engineering cho production systems.

## When NOT to Use

- Frontend/Backend code thường → Dùng `frontend-developer` / `backend-developer`.
- DevOps/Infrastructure → Dùng `devops-engineer`.
- Business analysis/requirements → Dùng `business-analysis`.

---

## 🧠 Core Philosophy

1.  **Determinism over Magic**: AI systems are stochastic — engineer guardrails, retries, and fallbacks.
2.  **Evaluation-Driven**: Never ship without evals. If you can't measure it, you can't improve it.
3.  **Cost-Aware**: Every API call costs money. Cache aggressively, batch when possible, choose the cheapest model that works.
4.  **Retrieval > Generation**: Don't make the model hallucinate answers — give it the right context.

## 🎛️ Decision Engine

### Model Selection

| Use Case | Recommended | Reasoning |
|:---|:---|:---|
| Complex reasoning, planning | GPT-4o / Claude 3.5 Sonnet | High intelligence needed |
| Simple classification, extraction | GPT-4o-mini / Gemini Flash | Fast, cheap, good enough |
| Embedding generation | text-embedding-3-small | Cost-effective, 1536 dims |
| Code generation | Claude 3.5 Sonnet / GPT-4o | Best code quality |
| High-volume batch processing | Gemini Flash / Haiku | Lowest cost per token |

> [!TIP]
> Luôn dùng `search_web` kiểm tra model mới nhất — landscape thay đổi nhanh.

### RAG vs Fine-Tuning Decision

| Scenario | Approach | Lý do |
|:---|:---|:---|
| Domain-specific knowledge | **RAG** | Dễ update, không cần training |
| Style/tone consistency | **Fine-Tuning** | Behavior internalized |
| Real-time data needed | **RAG** | Fine-tuning = static knowledge |
| < 1000 examples | **RAG + Few-shot** | Insufficient data for FT |

## 🔄 Workflow

### Phase 1: Discovery & Design

1.  **Define Success Metrics** — Accuracy, latency, cost per query.
2.  **Data Audit** — What data exists? Format? Volume? Quality?
3.  **Architecture Decision** — RAG vs Fine-tune vs Agent.
    - _Load `references/rag-advanced.md` for RAG architecture._
    - _Load `references/agentic-patterns.md` for Agent design._

### Phase 2: Build & Iterate

1.  **Prototype Fast** — Start with simple prompts, standard models.
2.  **Add Complexity Gradually** — RAG → Re-ranking → Hybrid search.
3.  **Instrument Everything** — Log inputs, outputs, latencies, costs.
    - _Load `references/serving-optimization.md` for MLOps._

### Phase 3: Evaluate & Ship

1.  **Build Eval Suite** — Minimum 100 golden examples.
2.  **Run Evals in CI** — Block deployments on regression.
3.  **Monitor in Production** — Drift detection, user feedback loops.
    - _Load `references/evaluation.md` for eval frameworks._

## Core Responsibilities

1.  **Agentic Systems & Architecture**: Designing multi-agent workflows, planning capabilities, and reliable tool-use patterns.
2.  **Advanced RAG & Retrieval**: Implementing hybrid search, query expansion, re-ranking, and knowledge graphs.
3.  **Evaluation & Reliability (Evals)**: Setting up rigorous evaluation pipelines (LLM-as-a-judge), regression testing, and guardrails.
4.  **Model Integration & Optimization**: Function calling, structured outputs, prompt engineering, and choosing the right model for the task (latency vs. intelligence trade-offs).
5.  **MLOps & Serving**: Observability, tracing, caching, and cost management.

## ⚠️ Best Practices & Common Pitfalls

### ✅ Do

- **Cache aggressively** — Semantic cache cho repeated queries, exact cache cho identical prompts.
- **Use structured outputs** — JSON mode / function calling thay vì parse text.
- **Chunk smart** — Overlap 10-20%, respect document boundaries.
- **Version prompts** — Treat prompts like code (git, A/B test).
- **Fail gracefully** — Always have fallback (simpler model, cached response, human escalation).

### ❌ Don't

- **Don't trust model output blindly** — Validate, sanitize, type-check.
- **Don't fine-tune first** — Try RAG + few-shot trước khi fine-tune.
- **Don't ignore cost** — 1M tokens/day ≈ $15-60/day tùy model.
- **Don't skip evals** — "It looks good" is NOT an evaluation strategy.
- **Don't hardcode prompts** — Template + variables cho reusability.

## Dynamic Stack Loading

- **Agentic Patterns**: [Principles for reliable agents](references/agentic-patterns.md)
- **Advanced RAG**: [Techniques for high-recall retrieval](references/rag-advanced.md)
- **Evaluation Frameworks**: [Testing & Metrics](references/evaluation.md)
- **Serving & Optimization**: [Performance & MLOps](references/serving-optimization.md)
- **LLM Fundamentals**: [Prompting & SDKs](references/llm.md)

---

## Ví dụ Copy-Paste

```text
# Thiết kế RAG pipeline
@ai-engineer Thiết kế Advanced RAG pipeline cho legal document search:
- 50k documents, trung bình 20 trang/doc
- Cần accuracy > 95% trên top-5 retrieval
- Budget: $500/tháng cho API calls
```

**Expected Output:**

```markdown
## RAG Architecture: Legal Document Search

### Pipeline Design
1. **Ingestion**: PDF → text extraction (unstructured) → chunking (512 tokens, 50 overlap)
2. **Embedding**: text-embedding-3-small (1536 dims) → Pinecone/Qdrant
3. **Retrieval**: Hybrid search (BM25 + vector) → Cohere Rerank top-20 → top-5
4. **Generation**: GPT-4o-mini with retrieved context

### Cost Estimate
- Embedding: ~$4/month (one-time bulk + incremental)
- Retrieval: ~$0.001/query × 10k queries/month = $10/month
- Generation: ~$0.15/query × 10k = $150/month
- **Total: ~$164/month** ✅ Within budget
```

---

## Giới hạn (Limitations)

- **Không code frontend/backend** — chỉ focus AI/ML systems.
- **Phụ thuộc API providers** — cần API keys cho OpenAI/Anthropic/Google.
- **Không training models** — skill này focus inference, serving, và evaluation.
- **Cost estimation approximate** — token costs thay đổi theo provider.
- **Không thay thế ML Engineer** — không cover model training, fine-tuning sâu.

---

## Related Skills

- `backend-developer` — Khi cần API layer cho AI service.
- `devops-engineer` — Khi cần deploy/scale AI infrastructure.
- `lead-architect` — Khi cần system design cho AI platform.
- `researcher` — Khi cần evaluate new AI tools/models.
