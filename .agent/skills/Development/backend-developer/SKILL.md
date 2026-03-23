---
name: backend-developer
description: Use when designing APIs, Architecture, Security, or Scalability for Node, Python, Go, or Java backend systems.
risk: critical
source: self
license: MIT
metadata:
  version: "2.0"
  capabilities:
    ["API Design", "System Architecture", "Security", "Polyglot Development"]
  languages: ["Node.js", "Python", "Go", "Java", "Kotlin"]
  databases: ["PostgreSQL", "MongoDB", "Redis"]
---

# Backend Development Standards

This skill provides expert guidelines for building robust, scalable, and secure distributed systems.

## When to Use

- Thiết kế REST/GraphQL APIs.
- Database schema design và migrations.
- Authentication/Authorization (JWT, OAuth2, RBAC).
- Viết backend code (Node.js, Python, Go, Java).
- Input validation, error handling, security hardening.

## When NOT to Use

- Frontend/UI code → Dùng `frontend-developer`.
- System architecture decisions → Dùng `lead-architect`.
- CI/CD/Deploy → Dùng `devops-engineer`.
- Test planning → Dùng `qa-tester`.

---

## Core Philosophy

1.  **Documentation is Truth**: Never guess syntax or patterns. If unsure, use `search_web` to find official docs.
2.  **Security First**: Every input is malicious until validated. Every endpoint needs explicit AuthN/AuthZ.
3.  **Simplicity**: Prefer boring technology that works. Complexity must be justified.

## 1. Dynamic Context Loading

**CRITICAL STEP**: Before helping the user, you MUST identify the specific technology stack.

**Logic:**

1.  Check the user's request and open files.
2.  **Load the relevant references** using `view_file`.

| Detected Stack                | Files to Load                    |
| :---------------------------- | :------------------------------- |
| **Architectural / DB Design** | `references/general-patterns.md` |
| **PostgreSQL Database**       | `postgres/SKILL.md`              |
| **Node.js (Express)**         | `references/node-express.md`     |
| **Node.js (NestJS)**          | `references/node-nestjs.md`      |
| **Python (Django)**           | `references/python-django.md`    |
| **Python (FastAPI)**          | `references/python-fastapi.md`   |
| **Python (Flask)**            | `references/python-flask.md`     |
| **Python (General/Scripts)**  | `references/python-patterns.md`  |
| **Go (Gin)**                  | `references/go-gin.md`           |
| **Go (Echo)**                 | `references/go-echo.md`          |
| **Java (Spring Boot)**        | `references/java-springboot.md`  |

> [!NOTE]
> If the user asks a general question (e.g., "How do I secure my API?"), load `references/general-patterns.md`.

### Awesome-Skills Architecture Base

Tài liệu nền tảng Backend chuyên sâu từ `awesome-skills`:

| Core Domain | Reference File |
| :--- | :--- |
| **Architecture Fundamentals** | `references/architecture-overview.md` |
| **Async & Error Handling** | `references/async-and-errors.md` |
| **Complete Examples** | `references/complete-examples.md` |
| **Configuration** | `references/configuration.md` |
| **Database Patterns** | `references/database-patterns.md` |
| **Middleware & Guards** | `references/middleware-guide.md` |
| **Routing & Controllers** | `references/routing-and-controllers.md` |
| **Observability (Sentry)** | `references/sentry-and-monitoring.md` |
| **Services & Repo** | `references/services-and-repositories.md` |
| **Testing Practices** | `references/testing-guide.md` |
| **Data Validation** | `references/validation-patterns.md` |

## 2. 🚀 Capabilities (Năng lực lõi)

- **`typescript-expert`**: Áp dụng TypeScript chuyên sâu, strict typing, và architecture patterns cao cấp cho Backend Node.js.
- **`python-patterns`**: Code Python theo chuẩn idiomatic, tối ưu performance FastAPI/Django và xử lý async/await.
- **API Design (Contract First)**: Use clear resource naming (Plural nouns), OpenAPI/Swagger documentation.

- **REST**: Use clear resource naming (Plural nouns), standard status codes.
- **GraphQL**: Schema-first design.
- **Documentation**: All APIs must be documented (OpenAPI/Swagger).

### B. Database Design

- **Schema**: 3rd Normal Form for Relational. Access-pattern driven for NoSQL.
- **Indexes**: Mandatory for foreign keys and query predicates.
- **Migrations**: Database changes must be versioned and reversible.

### C. Security (Zero Trust)

- **Validation**: Use strict schema validation (Zod, Pydantic, Joi) at the entry point.
- **Auth**: JWT for stateless, Sessions for stateful. Always validate scopes/permissions.
- **Secrets**: NEVER hardcode secrets. Use Environment Variables.

### D. Testing (Confidence)

- **Unit**: Test logic in isolation. Mock dependencies.
- **Integration**: Test DB interactions and API endpoints.

## 3. Collaboration with Lead Architect

**CRITICAL**: For high-stakes Architectural, Security, or Database Design decisions, you **MUST Adopt the `[lead-architect]` persona** to validate the approach.

**When to consult Lead Architect References:**

1.  **System Design**: Deciding between Monolith vs. Microservices.
2.  **Complex Security**: Implementing Zero Trust, complex OAuth2/OIDC flows, or Threat Modeling.
3.  **Process**: Defining CI/CD standards or DORA metrics.

**Action**: If the user asks for these, **Adopt the `[lead-architect]` persona** (load `.agent/skills/Architecture/lead-architect/SKILL.md`) to make the decision. Do not ask the user to switch agents manually.

## 4. Interaction Rules

- **Code Reviews**: Be pedantic about security, performance (N+1 queries), and readability.
- **Explanations**: Explain _WHY_ an architectural decision was made (Trade-offs).
- **Unknowns**: If you encounter a library or tool you don't know detailed syntax for, use `search_web` immediately.

## 5. Python-Specific Patterns

### Project Structure (FastAPI)

```
app/
├── main.py              # FastAPI app instance
├── api/
│   ├── v1/
│   │   ├── routes/      # Endpoint definitions
│   │   └── deps.py      # Dependencies (auth, db session)
├── core/
│   ├── config.py        # Pydantic Settings
│   └── security.py      # JWT, hashing
├── models/              # SQLAlchemy / SQLModel
├── schemas/             # Pydantic request/response
├── services/            # Business logic
└── repositories/        # DB queries
```

### Python Best Practices

- **Type hints everywhere** — `def get_user(user_id: int) -> User:`
- **Pydantic for validation** — Never trust raw dicts from API input.
- **Async where it matters** — I/O-bound (DB, HTTP) = async. CPU-bound = sync.
- **Virtual envs** — Always `python -m venv .venv` or use Poetry/uv.
- **Requirements pinned** — `requirements.txt` with exact versions or `poetry.lock`.

### Python Anti-Patterns

- ❌ `import *` — Never. Always explicit imports.
- ❌ Bare `except:` — Always catch specific exceptions.
- ❌ Mutable default args — `def f(items=[])` → `def f(items=None)`.
- ❌ Global state — Use dependency injection (FastAPI `Depends()`).
- ❌ `print()` for logging — Use `logging` module or `structlog`.

---

## Ví dụ Copy-Paste

```text
# Tạo REST API
@Development/backend-developer Tạo CRUD API cho module Products:
- GET /api/products (list, pagination, filter)
- POST /api/products (create, validation)
- PATCH /api/products/:id (partial update)
- DELETE /api/products/:id (soft delete)
Stack: NestJS + Prisma + PostgreSQL

# Database design
@Development/backend-developer Thiết kế schema cho multi-tenant SaaS:
- Tenant isolation: row-level security
- Users, Roles, Permissions
- Audit log
```

**Expected Output (NestJS):**

```typescript
// products.controller.ts
@Controller('products')
export class ProductsController {
  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResult<Product>> {
    return this.productsService.findAll(query);
  }

  @Post()
  async create(
    @Body() dto: CreateProductDto, // Zod validated
  ): Promise<Product> {
    return this.productsService.create(dto);
  }
}
```

---

## ⚠️ Best Practices & Common Pitfalls

### ✅ Do

- **Validate inputs at boundary** — Zod/Joi/Pydantic at controller level.
- **Use transactions** — Multi-table writes MUST be atomic.
- **Index foreign keys** — Always. No exceptions.
- **Return consistent error format** — `{ error: string, code: string, details?: any }`.
- **Log structured JSON** — Not `console.log('error happened')`.

### ❌ Don’t

- **Don’t expose internal errors** — Never send stack traces to clients.
- **Don’t trust client data** — Re-validate even if frontend validates.
- **Don’t use `SELECT *`** — Explicit columns always.
- **Don’t skip migrations** — Never ALTER TABLE manually in production.
- **Don’t hardcode secrets** — Use `.env` + validation at startup.

---

## Giới hạn (Limitations)

- **Cần stack cụ thể** — phải biết framework trước khi generate code.
- **Không deploy** — chỉ code, không deploy lên server.
- **Không manage infrastructure** — dùng `devops-engineer` cho infra.
- **Limited testing** — viết unit/integration tests nhưng không full coverage.
- **Search web cho libraries mới** — training data có thể outdated.

---

## Related Skills

- `lead-architect` — Architectural decisions trước khi implement.
- `frontend-developer` — API contract handoff.
- `qa-tester` — Test APIs và business logic.
- `devops-engineer` — Deploy và containerize.
- `data-engineer` — Khi cần data pipelines và ETL.
