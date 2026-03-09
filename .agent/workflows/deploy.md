---
description: Triển khai ứng dụng lên staging/production an toàn với checklist và rollback plan.
type: procedure
risk: critical
source: self
required_skills: [devops-engineer, backend-developer]
inputs: ["Release Branch", "Changelog"]
outputs: ["Deployed Application", "Health Check Report"]
context_from: ["/implement-feature", "/git-pr", "/project-review"]
context_to: []
context_artifacts:
  receives: ["qa-report.md", "changelog.md"]
  produces: ["deploy-report.md"]
---

# Quy trình Deployment (`/deploy`)

> [!CAUTION]
> **NGUY CƠ CAO**: Workflow này thay đổi trạng thái production.
> Phải có rollback plan trước khi deploy.

## Khi nào dùng (When to Use)

- Deploy code lên staging để test trước release.
- Release version mới lên production.
- Rollback khi phát hiện lỗi sau deploy.

## KHÔNG dùng khi (When NOT to Use)

- Chỉ cần fix bug production gấp → Dùng `/hotfix` (tự deploy).
- Setup dự án lần đầu → Dùng `/bootstrap`.
- Chỉ cần merge code → Dùng `/git-merge` hoặc `/git-pr`.

## Điều kiện tiên quyết (Prerequisites)

- Tất cả tests pass (unit + integration + E2E).
- Code đã được review (via `/code-review` hoặc `/git-pr`).
- Changelog/Release Notes đã sẵn sàng.
- Rollback plan đã xác định.

---

## Best Practices

- **Luôn deploy staging trước production** — không bao giờ deploy thẳng prod.
- **Smoke test sau deploy** — verify 3-5 critical flows ngay sau khi deploy.
- **Tag version**: `git tag v1.2.0` trước khi deploy production.
- **Blue-Green hoặc Canary** nếu có — giảm rủi ro downtime.
- **Monitor 30 phút** sau deploy — check error rate, latency, memory.

---

## Các bước thực hiện

### Bước 1: Pre-Deploy Checklist

// turbo

```bash
# 1. Verify tests
npm test && npm run test:e2e

# 2. Build production
npm run build

# 3. Check env variables
cat .env.production.example
```

### Bước 2: Deploy Staging

1.  Deploy lên staging environment.
2.  **Smoke Test**: Kiểm tra 3-5 critical user flows.
3.  **Performance Check**: Không có regression so với version trước.

### Bước 3: Deploy Production

> [!WARNING]
> Chỉ deploy production sau khi staging pass 100%.

1.  **Tag version**:
    ```bash
    git tag v1.x.x
    git push origin v1.x.x
    ```
2.  Deploy lên production.
3.  **Health Check**: Verify endpoints critical response 200.

### Bước 4: Post-Deploy Monitoring

1.  Monitor error rate (30 phút).
2.  Check logs cho anomalies.
3.  Nếu phát hiện lỗi → **Rollback ngay** (revert to previous tag).

### Bước 5: Rollback (Nếu cần)

```bash
# Rollback về version trước
git checkout v1.x.x  # version trước đó
# Re-deploy
```

---

## Ví dụ Copy-Paste

```text
# Deploy lên staging
/deploy Deploy FarmTrace v2.1 lên staging.
Changelog: thêm module analytics, fix 3 bugs auth.

# Deploy lên production
/deploy Release FarmTrace v2.1 lên production.
Staging đã pass. Tag: v2.1.0.
```

---

## Context Protocol

> Tuân thủ `_workflow-protocol.md`.

### Nhận Context (Input)
- **Từ `/implement-feature`**: Code đã merge, `qa-report.md`.
- **Từ `/git-pr`**: PR đã merge vào branch chính.
- **Từ `/project-review`**: Audit report (nếu có).
- **Từ `{{args}}`**: Release info, version tag.

### Truyền Context (Output)
- **Đây là workflow cuối chuỗi** — không truyền artifact cho workflow khác.
- Tạo `deploy-report.md` làm tài liệu lưu trữ.

### Fallback
- Nếu thiếu changelog → Tự generate từ git log.
- Nếu tests chưa pass → **Dừng**, không deploy.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Bước 1: Pre-Deploy | Retry build 3x | N/A | Notify user (build issue) |
| Bước 2: Staging | Retry deploy 3x | → Bước 1 (re-build) | Notify user |
| Bước 3: Production | N/A (không retry prod) | → Bước 5 (Rollback) | **KHẨN**: Notify user ngay |
| Bước 4: Monitoring | N/A | → Bước 5 (Rollback) | Notify user |

---

## Giới hạn (Limitations)

- **Không hỗ trợ zero-downtime** mặc định — cần cấu hình Blue-Green/Canary riêng.
- **Rollback chỉ code** — database migrations không tự rollback.
- **Phụ thuộc CI/CD pipeline** — nếu chưa setup, cần deploy thủ công.
- **Không monitoring dài hạn** — chỉ check 30 phút, cần alerting riêng.
- **Env variables phải cấu hình trước** — deploy sẽ fail nếu thiếu env.

---

## Workflow liên quan

- `/hotfix` — Fix production gấp (tự bao gồm deploy).
- `/bootstrap` — Setup CI/CD pipeline ban đầu.
- `/git-pr` — Tạo PR trước khi deploy.
- `/project-review` — Audit trước release.
