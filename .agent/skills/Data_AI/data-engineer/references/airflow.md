# Apache Airflow Patterns

## DAG Structure

```python
"""
dag_daily_orders.py

DAG xử lý orders hàng ngày: extract → transform → load → notify.
"""
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.postgres.operators.postgres import PostgresOperator
from airflow.operators.email import EmailOperator

default_args = {
    "owner": "data-team",
    "depends_on_past": False,
    "email_on_failure": True,
    "email_on_retry": False,
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
    "retry_exponential_backoff": True,
    "execution_timeout": timedelta(hours=1),
}

with DAG(
    dag_id="daily_orders_pipeline",
    default_args=default_args,
    description="Pipeline xử lý orders hàng ngày",
    schedule="0 6 * * *",  # 6 AM daily
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=["production", "orders"],
    max_active_runs=1,
) as dag:
    
    extract = PythonOperator(
        task_id="extract_orders",
        python_callable=extract_orders_fn,
        op_kwargs={"date": "{{ ds }}"},
    )
    
    transform = PythonOperator(
        task_id="transform_orders",
        python_callable=transform_orders_fn,
    )
    
    load = PostgresOperator(
        task_id="load_to_warehouse",
        postgres_conn_id="warehouse_conn",
        sql="sql/load_orders.sql",
        parameters={"run_date": "{{ ds }}"},
    )
    
    notify = EmailOperator(
        task_id="notify_completion",
        to="data-team@company.com",
        subject="Orders Pipeline {{ ds }} Complete",
        html_content="Pipeline hoàn thành: {{ ds }}",
    )
    
    extract >> transform >> load >> notify
```

## Best Practices

### Idempotency
```python
# ✅ Idempotent: DELETE + INSERT
def load_orders(ds, **kwargs):
    engine.execute(f"DELETE FROM orders WHERE date = '{ds}'")
    engine.execute(f"INSERT INTO orders SELECT * FROM staging_orders WHERE date = '{ds}'")

# ❌ Non-idempotent: chỉ INSERT (chạy lại = duplicate)
def load_orders(ds, **kwargs):
    engine.execute(f"INSERT INTO orders SELECT * FROM staging_orders WHERE date = '{ds}'")
```

### XCom Pattern
```python
# Push: trả giá trị nhỏ (< 48KB)
def extract(**kwargs):
    count = fetch_records()
    return {"record_count": count}  # Tự động push lên XCom

# Pull: nhận từ task trước
def transform(**kwargs):
    ti = kwargs["ti"]
    data = ti.xcom_pull(task_ids="extract")
    count = data["record_count"]
```

### Connection & Secrets
```python
# ✅ Dùng Airflow Connections — KHÔNG hardcode
from airflow.hooks.base import BaseHook

conn = BaseHook.get_connection("my_postgres")
engine = create_engine(conn.get_uri())
```

## Monitoring

| Metric | Ngưỡng cảnh báo | Hành động |
|:---|:---|:---|
| DAG duration | > 2x trung bình | Investigate slow tasks |
| Task failures | > 0 trong 24h | Check logs, fix root cause |
| SLA misses | Bất kỳ | Escalate ngay |
| Pool slots | > 80% utilization | Scale worker hoặc tối ưu DAGs |

## Anti-Patterns

- ❌ Business logic trong DAG → Tách vào modules riêng
- ❌ Hardcode connections → Dùng Airflow Connections
- ❌ Large XCom → Dùng S3/GCS cho data lớn
- ❌ `catchup=True` mà không cần → Chạy lại toàn bộ history
- ❌ Tight coupling giữa DAGs → Dùng Sensors hoặc Datasets
