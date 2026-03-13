---
description: Đánh giá hiệu năng ứng dụng và tối ưu hóa bottlenecks.
type: procedure
risk: none
source: self
required_skills: [backend-developer, frontend-developer, devops-engineer]
inputs: ["Application URL", "Slow Endpoints", "Performance Complaints"]
outputs: ["Performance Report", "Optimization Plan"]
---

# Quy trình Performance Audit (`/performance-audit`)

> [!NOTE]
> Mục tiêu: Tìm bottleneck, đo đạc metric, đề xuất optimization plan.

## Khi nào dùng (When to Use)

- Ứng dụng chậm, user phàn nàn về response time.
- Trước release lớn cần verify performance baseline.
- Sau khi thêm feature nặng (analytics, file processing, reports).
- Database queries chậm (> 1s).

## KHÔNG dùng khi (When NOT to Use)

- Chỉ cần fix 1 API chậm → Dùng `/debug` hoặc `/development`.
- Cần security review → Dùng `/security-audit`.
- Cần audit toàn diện → Dùng `/project-review`.

## Điều kiện tiên quyết (Prerequisites)

- Ứng dụng chạy được (local hoặc staging).
- Có benchmark baseline (hoặc sẽ tạo trong quá trình audit).
- DevTools/Profiler khả dụng.

---

## Các bước thực hiện

### Bước 1: Frontend Performance

// turbo

1.  **Lighthouse Audit** (via Chrome DevTools hoặc CLI):
    ```bash
    npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html
    ```
2.  **Metrics cần đo**: LCP, FID, CLS, TTFB, Bundle Size.
3.  **Checklist**:
    - [ ] Images optimized (WebP, lazy loading)?
    - [ ] Bundle < 300KB gzipped?
    - [ ] Code splitting implemented?
    - [ ] Fonts preloaded?

### Bước 2: API Performance

// turbo

1.  **Endpoint profiling**: Đo response time cho mỗi API endpoint.
2.  **Slow queries**: Identify queries > 500ms.
3.  **N+1 queries**: Check ORM eager/lazy loading.
4.  **Caching**: Redis/Memcached cho data ít thay đổi?

### Bước 3: Database Performance

// turbo

1.  **Index analysis**: Tìm missing indexes từ slow query log.
2.  **Query optimization**: EXPLAIN ANALYZE cho queries chậm.
3.  **Connection pooling**: Pool size phù hợp?

### Bước 4: Infrastructure

1.  **Memory/CPU monitoring**: Có memory leak?
2.  **Scaling**: Auto-scaling configured?
3.  **CDN**: Static assets served qua CDN?

### Bước 5: Reporting & Action Plan

1.  Tạo report: `docs/035-QA/Reports/PerfAudit-{Date}.md`.
2.  Bao gồm:
    - Before/After metrics.
    - Top 5 bottlenecks theo impact.
    - Optimization recommendations (ưu tiên theo effort/impact).

---

## Ví dụ Copy-Paste

```text
# Full performance audit
/performance-audit Audit performance FarmTrace:
- Frontend: Lighthouse scores, bundle size
- Backend: API response times, DB queries
- Infrastructure: Memory usage, scaling config

# Audit API specific
/performance-audit API /api/reports/analytics 
response time > 5s. Cần tìm bottleneck.
```

---

## Giới hạn (Limitations)

- **Local != Production** — kết quả local có thể khác production (network, load).
- **Không load testing** — workflow này không chạy stress test (dùng k6/Artillery riêng).
- **Lighthouse chỉ đo frontend** — backend cần profiling riêng.
- **Database profiling cần DBA access** — nếu cloud DB, cần dashboard access.
- **Không tự implement fixes** — chỉ tạo report + plan, user fix thủ công hoặc dùng `/development`.

---

## Workflow liên quan

- `/development` — Fix performance issues phát hiện.
- `/refactor` — Nếu bottleneck do code structure.
- `/project-review` — Audit toàn diện (bao gồm performance nhẹ).
- `/deploy` — Re-deploy sau optimization.
