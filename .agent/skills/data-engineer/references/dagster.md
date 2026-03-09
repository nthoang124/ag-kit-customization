# Dagster Patterns

## Asset-Based Approach

```python
"""
assets/orders.py

Dagster assets cho orders pipeline — asset-based thay vì task-based.
"""
import dagster as dg
import pandas as pd

@dg.asset(
    description="Raw orders từ PostgreSQL",
    group_name="staging",
    metadata={"source": "postgres", "freshness": "hourly"},
)
def stg_orders(context: dg.AssetExecutionContext) -> pd.DataFrame:
    """Extract raw orders từ source database."""
    query = "SELECT * FROM orders WHERE updated_at >= NOW() - INTERVAL '1 day'"
    df = pd.read_sql(query, context.resources.postgres)
    context.log.info(f"Extracted {len(df)} orders")
    return df


@dg.asset(
    description="Orders đã transform, sẵn sàng cho analytics",
    group_name="marts",
    deps=[stg_orders],
)
def fct_orders(context: dg.AssetExecutionContext, stg_orders: pd.DataFrame) -> pd.DataFrame:
    """Transform orders: tính total, filter completed."""
    df = (
        stg_orders
        .query("status == 'completed'")
        .assign(total=lambda x: x["quantity"] * x["unit_price"])
    )
    context.log.info(f"Transformed {len(df)} completed orders")
    return df
```

## Resources & Configuration

```python
# resources.py
from dagster import ConfigurableResource
import sqlalchemy

class PostgresResource(ConfigurableResource):
    host: str
    port: int = 5432
    database: str
    username: str
    password: str

    def get_engine(self):
        url = f"postgresql://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}"
        return sqlalchemy.create_engine(url)
```

## Definitions

```python
# definitions.py
import dagster as dg
from .assets import stg_orders, fct_orders
from .resources import PostgresResource

defs = dg.Definitions(
    assets=[stg_orders, fct_orders],
    resources={
        "postgres": PostgresResource(
            host=dg.EnvVar("DB_HOST"),
            database=dg.EnvVar("DB_NAME"),
            username=dg.EnvVar("DB_USER"),
            password=dg.EnvVar("DB_PASS"),
        ),
    },
    schedules=[
        dg.ScheduleDefinition(
            name="daily_orders",
            cron_schedule="0 6 * * *",
            target=dg.AssetSelection.groups("staging", "marts"),
        ),
    ],
)
```

## So Sánh Dagster vs Airflow

| Feature | Dagster | Airflow |
|:---|:---|:---|
| **Mental model** | Assets (data-centric) | Tasks (process-centric) |
| **Testing** | Built-in, local | Khó test locally |
| **Type safety** | Python types + IO Managers | Không có |
| **UI** | Asset lineage graph | Task dependency graph |
| **Best for** | Modern data teams, data mesh | Enterprise, large-scale |

## Anti-Patterns

- ❌ Dùng `op` thay vì `asset` khi data-centric → Asset model mạnh hơn
- ❌ Hardcode connections → Dùng `EnvVar` + Resources
- ❌ Skip IO Managers → Mất lineage tracking
- ❌ Monolithic assets → Chia nhỏ theo business domain
