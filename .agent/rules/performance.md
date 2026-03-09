---
trigger: model_decision
description: Áp dụng khi viết code liên quan truy vấn database, API response, rendering, hoặc bất kỳ operation nào cần tối ưu tốc độ và tài nguyên.
---

# Performance Standards

> [!IMPORTANT]
> **BẮT BUỘC**: Mọi code phải được viết với ý thức về performance. Premature optimization là xấu, nhưng ignoring performance cũng xấu không kém.

## 1. Database Performance

### N+1 Query Detection

```typescript
// ❌ N+1: 1 query cho orders + N queries cho users
const orders = await db.order.findMany();
for (const order of orders) {
  order.user = await db.user.findUnique({ where: { id: order.userId } });
}

// ✅ Eager loading: 2 queries total
const orders = await db.order.findMany({
  include: { user: true }
});
```

### Query Optimization Rules

- **MUST** index foreign keys và WHERE clause columns.
- **MUST** dùng `EXPLAIN ANALYZE` cho queries > 100ms.
- **MUST** pagination cho list endpoints (limit/offset hoặc cursor-based).
- **MUST NOT** dùng `SELECT *` — chỉ select columns cần thiết.
- **MUST NOT** query trong loop — dùng batch/bulk operations.

### Caching Strategy

| Data Type | Cache Layer | TTL | Tool |
|:---|:---|:---:|:---|
| Static config | In-memory | App lifetime | Map/Object |
| User sessions | Redis | 24h | Redis |
| API responses | HTTP cache | 5-60min | Cache-Control headers |
| DB queries | Query cache | 1-5min | Redis / in-memory |
| Computed results | Application | Varies | Memoization |

## 2. Frontend Performance

### Web Vitals Budget

| Metric | Target | Measurement |
|:---|:---:|:---|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID/INP** | < 100ms | First Input Delay / Interaction to Next Paint |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **TTFB** | < 800ms | Time to First Byte |

### Bundle Size Budget

| Category | Budget | Action if exceeded |
|:---|:---:|:---|
| Total JS (gzipped) | < 200KB | Code split, lazy load |
| Single chunk | < 50KB | Split into smaller chunks |
| CSS | < 50KB | Purge unused styles |
| Images | < 200KB each | WebP/AVIF, responsive sizes |

### Must-Do Patterns

```typescript
// ✅ Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'));

// ✅ Lazy load heavy components
const Chart = lazy(() => import('./components/Chart'));

// ✅ Image optimization
<Image src={url} width={400} height={300} loading="lazy" alt="..." />

// ✅ Debounce search input
const debouncedSearch = useDebouncedCallback(search, 300);
```

## 3. API Performance

### Response Time Targets

| Endpoint Type | Target | Max |
|:---|:---:|:---:|
| Health check | < 10ms | 50ms |
| CRUD (single record) | < 100ms | 500ms |
| List (paginated) | < 200ms | 1s |
| Search / Filter | < 500ms | 2s |
| Report generation | < 2s | 10s |

### Rules

- **MUST** paginate → default limit=20, max limit=100.
- **MUST** compression → gzip/brotli cho responses > 1KB.
- **MUST** connection pooling cho database.
- **SHOULD** cache-control headers cho static/semi-static data.
- **MUST NOT** return unbounded lists (no limit = potential OOM).

## 4. Decision Flow

```
┌─────────────────────────────────────────────────────────────┐
│ WHEN viết code mới hoặc review code:                        │
├─────────────────────────────────────────────────────────────┤
│ 1. Có database query?                                       │
│    → Check N+1, check indexes, check pagination             │
│ 2. Có list/search endpoint?                                 │
│    → Add pagination (limit/offset), add cache-control       │
│ 3. Có frontend component?                                   │
│    → Lazy load nếu không above-the-fold                     │
│    → Check bundle impact (import cost)                      │
│ 4. Có image/media?                                          │
│    → WebP/AVIF, responsive sizes, lazy loading              │
│ 5. Performance đang chậm?                                   │
│    → Profile first (EXPLAIN ANALYZE, Lighthouse, DevTools)  │
│    → Fix bottleneck cụ thể, không optimize random           │
└─────────────────────────────────────────────────────────────┘
```

## 5. Anti-Patterns

- ❌ `SELECT * FROM table` — Fetch toàn bộ columns
- ❌ Query trong for loop — N+1 queries
- ❌ Unbounded list API — Trả hết records
- ❌ Sync blocking operations — Trên main thread
- ❌ Import cả library — `import _ from 'lodash'` thay vì `import debounce from 'lodash/debounce'`
- ❌ Re-render toàn bộ — React: thiếu memo, key không stable