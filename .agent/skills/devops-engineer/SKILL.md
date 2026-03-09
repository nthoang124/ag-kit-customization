---
name: devops-engineer
description: Use when designing Universal CI/CD, Multi-Cloud Infrastructure, or Observability systems.
risk: critical
source: self
license: MIT
metadata:
  version: "2.0"
  capabilities: [Multi-Cloud, IaC, CI/CD, SRE, Security]
---

# DevOps Architecture & Standards

## When to Use

- Setup CI/CD pipelines (GitHub Actions, GitLab CI).
- Thiết kế cloud infrastructure (AWS, GCP, Azure).
- Containerization (Docker, Kubernetes).
- Monitoring & Observability (logs, metrics, traces).
- IaC (Terraform, Pulumi, Ansible).
- Codebase normalization (Husky, lint-staged, Biome).

## When NOT to Use

- Code business logic → Dùng `backend-developer` / `frontend-developer`.
- Architecture decisions → Dùng `lead-architect`.
- Security audit chuyên sâu → Dùng workflow `/security-audit`.

---

## 🧠 Core Philosophy

1.  **Automate Everything**: If it's done twice, script it.
2.  **Infrastructure as Code (IaC)**: No click-ops. All infra must be defined in code (Terraform, Pulumi, Ansible).
3.  **Security First**: Shift security left. Manage secrets via Vault/KMS, not env vars.
4.  **Observability**: You can't fix what you can't see. Logs, Metrics, and Traces are mandatory.

## 🎛️ Decision Engine & Routing

**STEP 1: Context Analysis**
Before acting, determine the stack components using the **Comparison Tables** below.

### 1. Cloud Provider Selection

| Feature      | AWS                                  | GCP                           | Azure                             | Vercel/Supabase              |
| :----------- | :----------------------------------- | :---------------------------- | :-------------------------------- | :--------------------------- |
| **Best For** | Enterprise, complex granular control | Data/AI, K8s (GKE)            | Enterprise Windows/AD integration | Frontend/Jamstack, Quick MVP |
| **Compute**  | EC2, Lambda, ECS/EKS                 | GCE, Cloud Run, GKE           | Azure VM, Functions, AKS          | Edge Functions               |
| **Storage**  | S3, EBS, EFS                         | GCS, Persistent Disk          | Blob Storage, Files               | Storage Bucket               |
| **Database** | RDS, DynamoDB, Aurora                | Cloud SQL, Firestore, Spanner | SQL Database, CosmosDB            | Postgres (Supabase)          |

### 2. Codebase Normalization Tools

| Feature      | Husky + Lint-staged     | Lefthook             | Biome                | ESLint + Prettier      |
| :----------- | :---------------------- | :------------------- | :------------------- | :--------------------- |
| **Type**     | Git Hooks (Node.js)     | Git Hooks (Go)       | All-in-one Toolchain | Linter + Formatter     |
| **Speed**    | Standard                | Fast                 | Extremely Fast       | Standard               |
| **Best For** | Standard JS/TS Projects | Monorepos / Polyglot | Greenfields / Speed  | Legacy / Complex Rules |

### 3. IaC Tool Selection

| Feature      | Terraform                                   | Pulumi                          | Ansible                       | CDK (AWS/TF)              |
| :----------- | :------------------------------------------ | :------------------------------ | :---------------------------- | :------------------------ |
| **Language** | HCL (Declarative)                           | TS/Python/Go (Imperative)       | YAML (Configuration)          | TS/Python (Imperative)    |
| **State**    | Remote state file (S3/GCS)                  | Pulumi Service / S3             | No state (Idempotent scripts) | CloudFormation / TF State |
| **Use Case** | Industry Standard, Multi-cloud provisioning | Dev-friendly, Logic-heavy infra | Config Mgmt, Mutable infra    | AWS-centric, Type-safety  |

### 4. CI/CD Platform Selection

| Feature         | GitHub Actions               | GitLab CI               | Jenkins                           | CircleCI                      |
| :-------------- | :--------------------------- | :---------------------- | :-------------------------------- | :---------------------------- |
| **Integration** | Native to GitHub             | Native to GitLab        | Self-hosted, Plugins              | Fast, SaaS-first              |
| **Config**      | YAML (`.github/workflows`)   | YAML (`.gitlab-ci.yml`) | Groovy (Jenkinsfile)              | YAML (`.circleci/config.yml`) |
| **Best For**    | Open Source, Integrated flow | Integrated DevSecOps    | Legacy / Highly Custom Enterprise | High Performance              |

## 📚 Dynamic Knowledge Base

**ACTION**: Load the specific reference based on your decision above.

- **Cloud Infrastructure** (AWS/GCP/Azure): [Load `cloud-providers.md`](references/cloud-providers.md)
- **Infrastructure as Code** (Terraform/Pulumi): [Load `iac-tools.md`](references/iac-tools.md)
- **CI/CD Pipelines** (GHA/GitLab): [Load `ci-cd-pipelines.md`](references/ci-cd-pipelines.md)
- **Containers & Orchestration** (Docker/K8s: [Load `container-orchestration.md`](references/container-orchestration.md)
- **Observability & Security** (Monitoring/Logging): [Load `observability-security.md`](references/observability-security.md)
- **Codebase Normalization** (Husky/Linting): [Load `codebase-normalization.md`](references/codebase-normalization.md)

> [!TIP]
> **Long-tail Tools**: If a user asks for a tool NOT listed above (e.g., DigitalOcean, TravisCI), use `search_web` to find the official "Quick Start" and "Best Practices" documentation.

## 🛡️ Security & Compliance Standards

- **Least Privilege**: IAM roles must be scoped strictly.
- **Encryption**: At rest (KMS) and in transit (TLS 1.2+).
- **Scanning**: SAST (SonarQube), DAST (OWASP ZAP), Container Scanning (Trivy).

## 📝 Templates

| Template      | Path                         | Purpose                                                                         |
| ------------- | ---------------------------- | ------------------------------------------------------------------------------- |
| Release Notes | `templates/release-notes.md` | Release Notes - features, fixes, improvements. Use when publishing new releases |

---

## ⚠️ Best Practices & Common Pitfalls

### ✅ Do

- **Pin versions** — `node:20.11-alpine` not `node:latest`.
- **Multi-stage builds** — Build in one stage, run in another (smaller images).
- **Health checks** — Every service needs `/health` endpoint.
- **Rollback plan** — Every deploy must have documented rollback.
- **Secrets in vault** — HashiCorp Vault / AWS Secrets Manager, not `.env`.

### ❌ Don’t

- **Don’t run as root** — Containers should use non-root user.
- **Don’t skip staging** — Never deploy directly to production.
- **Don’t ignore alerts** — Alert fatigue = real incidents missed.
- **Don’t SSH into production** — If you need to, your automation is broken.
- **Don’t store state in containers** — Containers are ephemeral.

---

## Ví dụ Copy-Paste

```text
# Setup CI/CD
@devops-engineer Setup GitHub Actions CI/CD cho Next.js + Supabase:
- Lint + Type check → Build → Test → Deploy to Vercel
- Preview deployment cho PR, Production cho main

# Setup monitoring
@devops-engineer Thiết kế observability stack cho microservices:
- Structured logging (JSON), Metrics (Prometheus), Traces (OpenTelemetry)
- Alert rules cho error rate > 1% và p99 latency > 2s
```

**Expected Output (GitHub Actions):**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test -- --coverage

  deploy-preview:
    if: github.event_name == 'pull_request'
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## Giới hạn (Limitations)

- **Không manage cloud billing** — chỉ thiết kế, user tự manage costs.
- **Không có cloud credentials** — user cần provide API keys/tokens.
- **IaC chỉ generate code** — không tự `terraform apply`.
- **Monitoring cần external tools** — Grafana, Datadog, etc. phải setup riêng.
- **Không cover on-premise** — focus cloud-native.

---

## Related Skills

- `lead-architect` — Infrastructure architecture decisions.
- `backend-developer` — Khi cần containerize application.
- `qa-tester` — Khi cần CI test automation.
