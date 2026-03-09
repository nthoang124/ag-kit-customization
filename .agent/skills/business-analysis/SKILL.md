---
name: business-analysis
description: Use for deep requirements analysis, technical specifications, agile documentation, or architecture/design reviews.
risk: none
source: self
metadata:
  version: "1.0"
allowed-tools: read_file list_dir search_web read_url_content
---

# Business Analysis Standards

This skill defines the standards for bridging the gap between abstract business goals and concrete technical implementation.

## When to Use

- Viết PRD, BRD, Technical Specs, User Stories.
- Phân tích requirements và gap analysis.
- Vẽ diagrams (Sequence, State, Class, ERD).
- Review và critique business documents.
- Tạo use cases với happy/negative/edge paths.

## When NOT to Use

- Code implementation → Dùng `backend-developer` / `frontend-developer`.
- Product strategy/roadmap → Dùng `product-manager`.
- Architecture design → Dùng `lead-architect`.
- Test planning → Dùng `qa-tester`.

---

## 🧠 Core Mindset & Philosophy

> [!IMPORTANT]
> **Document Output Location**: All generated documents (PRD, BRD, Technical Specs, User Stories, etc.) **MUST** be saved to the `docs/` folder in the project root. Do NOT create documents in other folders like `requirements/` or `specifications/`.

1.  **Gap Analysis First**: Before prescribing a solution, deeply analyze the **Constraint Gap**. Ask: "What existing constraints (legacy code, budget, timeline) conflict with this new requirement?"
2.  **Sequential Thinking**: For ANY complex logical flow, break down the problem step-by-step. Do not guess; derive.
3.  **Visuals First**: Text is ambiguous. Code is implementation details. **Diagrams are truth.**
    - Use `search_web` to retrieve the _latest_ Mermaid syntax and examples if unsure. Do not rely on internal training data.
4.  **Obsidian Native**: Documentation should be **Graph-Ready**.
    - Use `[[Wiki-links]]` for internal references.
    - Create **MOCs (Maps of Content)** for major topics.
    - Use YAML frontmatter for tags and aliases.
5.  **Agile Orthodoxy**: We speak in **User Stories** (INVEST criteria). We define **Acceptance Criteria** (Gherkin).
6.  **Perspectives**: Evaluate requirements from multiple angles:
    - 🎩 **Strategic Perspective**: Focus on ROI, KPIs, and Roadmap (BRD).
    - 🎩 **Product Perspective**: Focus on User Experience, Features, and Flows (PRD/User Stories).
    - 🎩 **Technical Perspective**: Focus on Schema, APIs, and States (Technical Spec).

## 🚀 Workflows

### 1. The "Complete Overhaul" Workflow (Default)

When a user asks for a new feature or system:

1.  **Phase 1: Market & Domain Research**
    - Use `search_web` to validate assumptions.
    - _Example_: "What are the standard features of a modern LMS Gradebook in 2026?"
    - _Example_: "Competitor analysis for [Product X]".
2.  **Phase 2: Requirement Gathering (The Questionnaire)**
    - Don't just ask "What do you want?". Ask specific constraints.
    - Use the `requirements_questionnaire.md` pattern if the scope is large.
3.  **Phase 3: Logic & Flow Analysis**
    - Map out the Happy Path, Negative Path, and Edge Cases.
4.  **Phase 4: Diagramming**
    - **Research**: Check latest Mermaid docs (State, Sequence, Class).
    - **Generate**: Create Mermaid diagrams to visualize the flow.
    - **Verify**: Run `scripts/verify_mermaid.py` (if available) or review syntax carefully.
5.  **Phase 5: Documentation**
    - Generate the appropriate artifacts (PRD, Technical Spec, User Stories) using `references/templates/`.
    - **Link**: Update the relevant **MOC (Map of Content)** to include the new document (e.g., `docs/030-Specs/Specs-MOC.md`).

### 2. Cross-Skill Collaboration

Act as the conductor. Coordinate specialized skills when needed.

- **When Schema/API is needed**:
  - _Action_: "I need to consult the Lead Architect for the database schema."
  - _Simulation_: "As acting Lead Architect, I propose the following schema..."
- **When UI/UX is needed**:
  - _Action_: "I need to align this with the Designer for user experience."
  - _Simulation_: "From a UX perspective, we need a loading state here..."

## 📚 Reference Library

### Templates

| Template              | Path                               | Purpose                                                                                                        |
| --------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| PRD (Functional)      | `templates/prd-functional.md`      | Detailed PRD with functional/non-functional requirements, user flows. Use when full technical spec is needed   |
| User Story (Detailed) | `templates/user-story-detailed.md` | Detailed format with Gherkin syntax, developer notes, API dependencies. Use for handoff to dev team            |
| BRD                   | `templates/brd.md`                 | Business Requirements Document - stakeholder analysis, ROI, KPIs. Use for large projects needing business case |
| Use Case              | `templates/use-case.md`            | Use Case Specification - actor flows, alternative paths, exceptions. Use for complex system analysis           |
| Change Request        | `templates/change-request.md`      | Change Request - impact analysis, effort estimate, approval workflow. Use when scope change is requested       |

### Domain Knowledge

| Domain          | Path                                    | Focus                              |
| --------------- | --------------------------------------- | ---------------------------------- |
| SaaS            | `references/domains/saas.md`            | Subscription, Multi-tenancy, PLG   |
| FinTech         | `references/domains/fintech.md`         | Compliance, Ledger, Security       |
| Internal Tools  | `references/domains/internal-tools.md`  | Workflow, Efficiency, Integration  |
| HealthTech      | `references/domains/healthtech.md`      | HIPAA, Patient Outcomes            |
| E-Commerce      | `references/domains/ecommerce.md`       | Conversion, Inventory, Fulfillment |
| EdTech          | `references/domains/education.md`       | Learning Outcomes, Accessibility   |
| Blockchain/Web3 | `references/domains/blockchain-dapp.md` | Smart Contracts, Wallets           |
| F&B             | `references/domains/fnb.md`             | POS, Orders, Inventory             |
| AI/ML Products  | `references/domains/ai-agent.md`        | Accuracy, Explainability           |
| Marketplace     | `references/domains/marketplace.md`     | Liquidity, Trust, Disputes         |

### Best Practices

- [Diagramming Guide](references/best-practices/diagrams.md) - **Read before drawing**
- [Gap Analysis Checklist](references/best-practices/gap-analysis.md)

## 🛠️ Tools & Scripts

- `scripts/verify_mermaid.py`: Validates syntax of generated diagram code.

---

## Example: Education Domain (LMS)

If asked for a "Student Gradebook":

1.  **Research**: Search for "standard grading scales GPA vs Percentage".
2.  **Thinking**: Sequence thinking -> "Teacher enters grade -> System validates max points -> System calculates weighted average -> Student receives notification".
3.  **Diagram**: Sequence diagram showing `Teacher` -> `UI` -> `GradeService` -> `Database`.
4.  **Spec**: Define `grades` table (student_id, assignment_id, score, weight).

---

## Ví dụ Copy-Paste

```text
# Viết PRD
@business-analysis Viết PRD chi tiết cho tính năng Gradebook:
- Domain: EdTech LMS
- Users: Teachers, Students, Parents
- Core flows: Enter grades, View report, Export PDF

# Gap analysis
@business-analysis Phân tích gap giữa requirements và current implementation
cho module Inventory Management.

# Vẽ diagram
@business-analysis Tạo Sequence Diagram cho flow:
User login → MFA verify → Dashboard load → Data fetch
```

**Expected Output (Sequence Diagram):**

```mermaid
sequenceDiagram
    actor U as User
    participant FE as Frontend
    participant Auth as AuthService
    participant MFA as MFA Provider
    participant API as API Gateway
    participant DB as Database

    U->>FE: Enter credentials
    FE->>Auth: POST /auth/login
    Auth->>DB: Validate user
    Auth-->>FE: 200 (MFA required)
    FE->>U: Show MFA input
    U->>FE: Enter OTP
    FE->>Auth: POST /auth/mfa/verify
    Auth->>MFA: Verify OTP
    MFA-->>Auth: Valid
    Auth-->>FE: 200 + JWT token
    FE->>API: GET /dashboard (Bearer token)
    API->>DB: Fetch user data
    DB-->>API: Data
    API-->>FE: 200 + Dashboard data
```

---

## Giới hạn (Limitations)

- **Không code** — chỉ tạo documents và diagrams, không implement.
- **Mermaid syntax có thể outdated** — luôn `search_web` verify syntax trước.
- **Cần domain knowledge** — câu hỏi domain-specific cần user input.
- **Diagrams không render** — tạo Mermaid code, user tự render.
- **Obsidian-specific features** — wiki-links chỉ hoạt động trong Obsidian.

---

## Related Skills

- `product-manager` — Strategy và prioritization input.
- `lead-architect` — Technical architecture alignment.
- `qa-tester` — Test cases từ requirements.
- `designer` — UI/UX alignment cho user flows.
