# dbt Patterns & Best Practices

## Cấu Trúc Project

```
dbt_project/
├── models/
│   ├── staging/          # stg_ prefix — 1:1 với source tables
│   │   ├── stg_stripe__payments.sql
│   │   └── _stg_stripe__models.yml
│   ├── intermediate/     # int_ prefix — transformations giữa các layers
│   │   └── int_orders_pivoted.sql
│   └── marts/            # fct_ / dim_ prefix — business entities
│       ├── fct_orders.sql
│       ├── dim_customers.sql
│       └── _marts__models.yml
├── tests/
│   ├── generic/          # Custom generic tests
│   └── singular/         # One-off SQL tests
├── macros/               # Reusable Jinja macros
├── seeds/                # Static CSV data
├── snapshots/            # SCD Type 2 snapshots
└── dbt_project.yml
```

## Materialization Guide

| Strategy | Khi nào dùng | Trade-off |
|:---|:---|:---|
| `view` | Staging models, data nhỏ | Không tốn storage, chậm khi query |
| `table` | Marts, data trung bình | Nhanh query, rebuild toàn bộ |
| `incremental` | Fact tables lớn, append-heavy | Nhanh nhất, phức tạp logic |
| `ephemeral` | CTEs tái sử dụng, không cần persist | Không tạo object trong DB |

## Incremental Model Pattern

```sql
{{ config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge',
    on_schema_change='append_new_columns'
) }}

WITH source AS (
    SELECT * FROM {{ ref('stg_postgres__orders') }}
    {% if is_incremental() %}
    WHERE updated_at >= (SELECT MAX(updated_at) FROM {{ this }})
    {% endif %}
),

final AS (
    SELECT
        order_id,
        customer_id,
        total_amount,
        status,
        updated_at
    FROM source
)

SELECT * FROM final
```

## Testing Pattern

```yaml
# _marts__models.yml
version: 2

models:
  - name: fct_orders
    description: "Bảng fact chứa tất cả orders đã hoàn thành"
    columns:
      - name: order_id
        tests:
          - unique
          - not_null
      - name: customer_id
        tests:
          - not_null
          - relationships:
              to: ref('dim_customers')
              field: customer_id
      - name: total_amount
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
```

## Macro Patterns

```sql
-- macros/generate_surrogate_key.sql
{% macro generate_surrogate_key(field_list) %}
    {{ dbt_utils.generate_surrogate_key(field_list) }}
{% endmacro %}

-- macros/cents_to_dollars.sql
{% macro cents_to_dollars(column_name) %}
    ({{ column_name }} / 100.0)::decimal(10,2)
{% endmacro %}
```

## Anti-Patterns

- ❌ Business logic trong staging → Staging chỉ rename + cast
- ❌ `SELECT *` trong marts → Explicit columns luôn
- ❌ Skip `dbt test` → Testing KHÔNG phải optional
- ❌ Hardcode dates → Dùng `{{ var('start_date') }}`
- ❌ Nested subqueries → Dùng CTEs cho readability
