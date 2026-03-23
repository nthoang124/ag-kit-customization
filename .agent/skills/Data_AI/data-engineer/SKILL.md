---
name: data-engineer
description: Use when designing data pipelines, ETL/ELT, data warehousing, data modeling, or orchestrating data workflows.
risk: safe
source: self
license: MIT
metadata:
  version: "1.0"
  capabilities:
    - ETL/ELT Pipeline Design
    - Data Warehousing
    - Data Modeling
    - Workflow Orchestration
    - Data Quality & Observability
  languages: ["Python", "SQL"]
  tools: ["Apache Airflow", "Dagster", "dbt", "Spark", "Pandas"]
  databases: ["PostgreSQL", "BigQuery", "Snowflake", "Redshift", "ClickHouse"]
allowed-tools: search_web read_url_content run_command read_file list_dir
---

# Data Engineering Standards

This skill provides expert guidelines for building robust, scalable, and reliable data systems — from ingestion to serving.

## When to Use

- Thiết kế ETL/ELT pipelines (batch & streaming).
- Data modeling (Star Schema, Snowflake Schema, Data Vault).
- Data warehouse/lakehouse architecture (BigQuery, Snowflake, Databricks).
- Workflow orchestration (Airflow, Dagster, Prefect).
- Data quality, testing, và observability.
- Python scripting cho data processing (Pandas, Polars, PySpark).
- dbt models và transformations.

## When NOT to Use

- Backend API/web development → Dùng `backend-developer`.
- ML model training/serving → Dùng `ai-engineer`.
- Infrastructure/CI-CD → Dùng `devops-engineer`.
- Business requirements → Dùng `business-analysis`.

---

## 🧠 Core Philosophy

1.  **Idempotency is Non-Negotiable**: Every pipeline must produce the same output given the same input, regardless of how many times it runs.
2.  **Schema as Contract**: Data contracts between producers and consumers must be explicit (schemas, tests, docs).
3.  **Incremental over Full Load**: Process only what changed. Full refreshes are wasteful and dangerous at scale.
4.  **Test Data, Not Just Code**: Data pipelines need data quality tests (not null, unique, accepted values, freshness).
5.  **Lineage & Observability**: If you can't trace where data came from and when it was last updated, your pipeline is broken.

## 🎛️ Decision Engine

### Storage Layer Selection

| Use Case | Recommended | Reasoning |
|:---|:---|:---|
| OLAP / Analytics | **BigQuery / Snowflake** | Columnar, serverless, SQL-native |
| Real-time analytics | **ClickHouse / Apache Druid** | Sub-second queries on billions of rows |
| Data Lake (raw) | **S3 + Parquet / Delta Lake** | Cheap storage, schema evolution |
| Operational DB | **PostgreSQL** | ACID, extensions (TimescaleDB, PostGIS) |
| Key-value / Cache | **Redis / DynamoDB** | Low-latency lookups |

### Orchestration Selection

| Feature | Airflow | Dagster | Prefect |
|:---|:---|:---|:---|
| **Maturity** | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| **Python-native** | DAG-based | Asset-based | Flow/Task |
| **Testing** | Hard | ✅ Built-in | ✅ Easy |
| **UI** | Good | Excellent | Good |
| **Best For** | Production-grade, large teams | Modern teams, data mesh | Small-medium teams |

### Batch vs Streaming

| Scenario | Approach | Tools |
|:---|:---|:---|
| Data freshness > 1 hour OK | **Batch** | Airflow + dbt + BigQuery |
| Need < 5 min latency | **Micro-batch** | Spark Structured Streaming |
| Need real-time (< 1 min) | **Streaming** | Kafka + Flink / Spark Streaming |
| CDC (Change Data Capture) | **Streaming** | Debezium + Kafka |

## 🔄 Workflow

### Phase 1: Data Discovery

1.  **Understand Sources** — What systems produce data? Format? Volume? Frequency?
2.  **Map Data Lineage** — Source → Staging → Transform → Serve.
3.  **Define SLAs** — Freshness (hourly? daily?), quality thresholds.

### Phase 2: Pipeline Design

1.  **Design Layers** — Raw (Bronze) → Cleaned (Silver) → Business (Gold).
2.  **Choose Pattern** — ELT (transform in warehouse) vs ETL (transform before load).
3.  **Incremental Strategy** — Timestamp-based, CDC, or full refresh with reason.

### Phase 3: Implementation

1.  **dbt for Transformations** — SQL-first, version-controlled, tested.
2.  **Python for Complex Logic** — Pandas/Polars for small-medium, PySpark for large.
3.  **Orchestrate** — DAGs in Airflow/Dagster with proper retries, alerts, SLAs.

### Phase 4: Testing & Quality

1.  **Schema Tests** — Not null, unique, accepted_values, relationships.
2.  **Data Tests** — Row counts, freshness, custom SQL assertions.
3.  **Pipeline Tests** — Integration tests with sample data.

## 📚 Data Modeling Patterns

### Star Schema (Recommended for Analytics)

```
fact_orders (grain: 1 row per order line)
├── order_id (PK)
├── customer_key (FK → dim_customers)
├── product_key (FK → dim_products)
├── date_key (FK → dim_dates)
├── quantity
├── unit_price
└── total_amount

dim_customers
├── customer_key (PK, surrogate)
├── customer_id (natural key)
├── name, email, segment
├── valid_from, valid_to (SCD Type 2)
└── is_current
```

### Naming Conventions

| Layer | Prefix | Example |
|:---|:---|:---|
| Raw/Staging | `stg_` | `stg_stripe__payments` |
| Intermediate | `int_` | `int_orders_pivoted` |
| Business/Mart | `fct_` / `dim_` | `fct_orders`, `dim_customers` |
| Metrics | `metric_` | `metric_daily_revenue` |

## ⚠️ Best Practices & Common Pitfalls

### ✅ Do

- **Use dbt for SQL transforms** — Version control, tests, docs in one tool.
- **Partition large tables** — By date, always. Query costs drop 10-100x.
- **Incremental models** — `WHERE updated_at >= (SELECT MAX(updated_at) FROM this)`.
- **Data contracts** — Schema + SLA agreements between producers/consumers.
- **Monitor data freshness** — Alert if table not updated in expected window.
- **Use CTEs over subqueries** — Readability and maintainability.

### ❌ Don't

- **Don't use `SELECT *` in production** — Explicit columns, always.
- **Don't skip testing** — `dbt test` is not optional.
- **Don't full-refresh large tables** — Incremental or you'll burn $$.
- **Don't put business logic in orchestrator** — Business logic in dbt/SQL, not Airflow DAGs.
- **Don't ignore data types** — `VARCHAR(MAX)` vs `INT` matters for performance.
- **Don't hardcode credentials** — Use secrets manager, not `.env` files in code.

## 📝 Python Patterns for Data Engineering

### Pandas Best Practices

```python
# ✅ Good: Chain operations, use vectorized ops
df = (
    pd.read_parquet("data/orders.parquet")
    .query("status == 'completed'")
    .assign(
        total=lambda x: x["quantity"] * x["unit_price"],
        order_date=lambda x: pd.to_datetime(x["created_at"]).dt.date,
    )
    .groupby("order_date")
    .agg(revenue=("total", "sum"), orders=("id", "count"))
    .reset_index()
)

# ❌ Bad: Row-by-row iteration
for i, row in df.iterrows():  # NEVER do this
    df.loc[i, "total"] = row["quantity"] * row["unit_price"]
```

### Polars (for performance)

```python
import polars as pl

df = (
    pl.scan_parquet("data/orders/*.parquet")  # Lazy evaluation
    .filter(pl.col("status") == "completed")
    .with_columns(
        (pl.col("quantity") * pl.col("unit_price")).alias("total")
    )
    .group_by("order_date")
    .agg(
        pl.col("total").sum().alias("revenue"),
        pl.col("id").count().alias("orders"),
    )
    .collect()  # Execute
)
```

## Dynamic Stack Loading

Load references based on task context:

| Detected Stack | Files to Load |
|:---|:---|
| **SQL / dbt** | `references/dbt-patterns.md` |
| **Apache Airflow** | `references/airflow.md` |
| **Dagster** | `references/dagster.md` |
| **PySpark** | `references/pyspark.md` |
| **Data Modeling** | `references/data-modeling.md` |
| **Data Quality** | `references/data-quality.md` |

> [!TIP]
> Create reference files as needed with `search_web` for latest patterns. Data tooling evolves fast.

---

## Ví dụ Copy-Paste

```text
# Thiết kế pipeline
@Data_AI/data-engineer Thiết kế ETL pipeline cho e-commerce analytics:
- Sources: PostgreSQL (orders), Stripe API (payments), Google Analytics
- Warehouse: BigQuery
- Freshness: hourly
- Key metrics: revenue, conversion, LTV

# dbt model
@Data_AI/data-engineer Tạo dbt model cho fct_orders:
- Grain: 1 row per order line
- Dimensions: customer, product, date
- Metrics: quantity, revenue, discount
```

**Expected Output (dbt model):**

```sql
-- models/marts/fct_orders.sql
{{ config(
    materialized='incremental',
    unique_key='order_line_id',
    partition_by={'field': 'order_date', 'data_type': 'date'}
) }}

WITH orders AS (
    SELECT * FROM {{ ref('stg_postgres__orders') }}
    {% if is_incremental() %}
    WHERE updated_at >= (SELECT MAX(updated_at) FROM {{ this }})
    {% endif %}
),

products AS (
    SELECT * FROM {{ ref('dim_products') }}
),

final AS (
    SELECT
        o.id AS order_line_id,
        o.order_id,
        o.customer_id,
        p.product_key,
        {{ dbt_utils.generate_surrogate_key(['o.order_date']) }} AS date_key,
        o.order_date,
        o.quantity,
        o.unit_price,
        o.quantity * o.unit_price AS total_amount,
        o.discount_amount,
        o.updated_at
    FROM orders o
    LEFT JOIN products p ON o.product_id = p.product_id
)

SELECT * FROM final
```

---

## Giới hạn (Limitations)

- **Không deploy pipelines** — Tạo code, không deploy lên Airflow/Cloud Composer.
- **Không access databases** — Cần user provide connection strings/credentials.
- **Không chạy Spark jobs** — Viết code, user tự submit lên cluster.
- **Cloud costs approximate** — BigQuery/Snowflake pricing thay đổi theo usage.
- **Large-scale testing impossible** — Test với sample data, user validate ở scale thật.
- **Streaming limited** — Focus batch/micro-batch, Kafka/Flink cần research thêm.

---

## Related Skills

- `backend-developer` — Khi cần API layer cho data products.
- `ai-engineer` — Khi cần feature engineering cho ML models.
- `devops-engineer` — Khi cần deploy/monitor data infrastructure.
- `lead-architect` — Khi cần data platform architecture decisions.
- `researcher` — Khi cần evaluate data tools/platforms.
