# Data Quality Patterns

## Framework: Great Expectations Style

### 5 Loại Quality Checks

| # | Loại | Ví dụ | Khi nào chạy |
|:--|:---|:---|:---|
| 1 | **Completeness** | Không NULL, không empty | Mỗi load |
| 2 | **Uniqueness** | Primary keys unique | Mỗi load |
| 3 | **Validity** | Email format đúng, age > 0 | Mỗi load |
| 4 | **Consistency** | FK references tồn tại | Mỗi load |
| 5 | **Freshness** | Data không quá 24h | Scheduled |

## dbt Tests

```yaml
# Schema tests (dbt)
version: 2

models:
  - name: fct_orders
    tests:
      - dbt_utils.recency:
          datepart: hour
          field: updated_at
          interval: 24  # Alert nếu data > 24h
    columns:
      - name: order_id
        tests:
          - unique
          - not_null
      - name: total_amount
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 1000000
      - name: status
        tests:
          - accepted_values:
              values: ['pending', 'completed', 'cancelled', 'refunded']
      - name: customer_id
        tests:
          - relationships:
              to: ref('dim_customers')
              field: customer_id
```

## Custom SQL Tests

```sql
-- tests/singular/assert_no_orphan_orders.sql
-- Đảm bảo không có orders mà customer không tồn tại
SELECT
    o.order_id,
    o.customer_id
FROM {{ ref('fct_orders') }} o
LEFT JOIN {{ ref('dim_customers') }} c
    ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL
-- Test PASS khi query trả về 0 rows
```

```sql
-- tests/singular/assert_revenue_positive.sql
-- Đảm bảo daily revenue > 0 cho mỗi ngày có orders
SELECT
    order_date,
    SUM(total_amount) AS daily_revenue
FROM {{ ref('fct_orders') }}
GROUP BY order_date
HAVING SUM(total_amount) <= 0
```

## Row Count Monitoring

```python
"""
data_quality_checks.py

Script kiểm tra data quality cho pipeline.
"""
import logging

logger = logging.getLogger(__name__)

def check_row_count(df, table_name, min_rows=1, max_delta_pct=50):
    """Kiểm tra row count nằm trong khoảng chấp nhận."""
    current_count = len(df)
    
    if current_count < min_rows:
        raise ValueError(
            f"❌ {table_name}: chỉ có {current_count} rows "
            f"(tối thiểu: {min_rows})"
        )
    
    logger.info(f"✅ {table_name}: {current_count} rows — OK")
    return True


def check_no_nulls(df, columns, table_name):
    """Kiểm tra không có NULL trong các columns quan trọng."""
    for col in columns:
        null_count = df[col].isnull().sum()
        if null_count > 0:
            raise ValueError(
                f"❌ {table_name}.{col}: {null_count} NULL values"
            )
    
    logger.info(f"✅ {table_name}: no NULLs in {columns} — OK")
    return True


def check_freshness(df, timestamp_col, max_hours=24):
    """Kiểm tra data không quá cũ."""
    from datetime import datetime, timedelta
    
    latest = df[timestamp_col].max()
    threshold = datetime.now() - timedelta(hours=max_hours)
    
    if latest < threshold:
        raise ValueError(
            f"❌ Data quá cũ! Latest: {latest}, "
            f"Threshold: {threshold}"
        )
    
    logger.info(f"✅ Freshness OK — latest: {latest}")
    return True
```

## Alerting Strategy

| Severity | Điều kiện | Hành động |
|:---|:---|:---|
| 🔴 **Critical** | PK duplicate, FK orphan, data loss | PagerDuty + Slack + Email |
| 🟡 **Warning** | Row count delta > 50%, freshness > SLA | Slack channel |
| 🟢 **Info** | Schema change detected, new values | Log only |

## Anti-Patterns

- ❌ Chỉ test ở development → Test PHẢI chạy trong production pipeline
- ❌ Ignore warnings → Warning hôm nay = Critical ngày mai
- ❌ Test sau khi load → Test TRƯỚC khi load vào production tables
- ❌ Hardcode thresholds → Dùng dynamic baselines (rolling average)
- ❌ Chỉ check NULL → Cần check cả format, range, relationships
