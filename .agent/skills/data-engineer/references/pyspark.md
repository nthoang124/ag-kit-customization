# PySpark Patterns

## SparkSession Setup

```python
"""
spark_app.py

Khởi tạo SparkSession với cấu hình tối ưu cho batch processing.
"""
from pyspark.sql import SparkSession

spark = (
    SparkSession.builder
    .appName("orders-pipeline")
    .config("spark.sql.adaptive.enabled", "true")
    .config("spark.sql.adaptive.coalescePartitions.enabled", "true")
    .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
    .config("spark.sql.parquet.compression.codec", "snappy")
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")
```

## DataFrame Operations

```python
from pyspark.sql import functions as F
from pyspark.sql.window import Window

# ✅ Đọc dữ liệu
orders = spark.read.parquet("s3a://data-lake/raw/orders/")

# ✅ Transformations (lazy evaluation)
result = (
    orders
    .filter(F.col("status") == "completed")
    .withColumn("total", F.col("quantity") * F.col("unit_price"))
    .withColumn("order_date", F.to_date("created_at"))
    .groupBy("order_date")
    .agg(
        F.sum("total").alias("revenue"),
        F.count("order_id").alias("order_count"),
        F.avg("total").alias("avg_order_value"),
    )
    .orderBy("order_date")
)

# ✅ Window functions
window_spec = Window.partitionBy("customer_id").orderBy("order_date")
orders_with_rank = orders.withColumn(
    "order_rank", F.row_number().over(window_spec)
)
```

## Partitioning & Write

```python
# ✅ Ghi với partitioning
result.write \
    .mode("overwrite") \
    .partitionBy("order_date") \
    .parquet("s3a://data-lake/processed/orders/")

# ✅ Repartition trước khi ghi (tránh small files)
result \
    .repartition(10) \
    .write \
    .mode("overwrite") \
    .parquet("s3a://data-lake/processed/orders/")
```

## Performance Tips

| Vấn đề | Giải pháp |
|:---|:---|
| Data skew | `spark.sql.adaptive.skewJoin.enabled=true` hoặc salt key |
| Small files | `repartition()` hoặc `coalesce()` trước write |
| Shuffle quá nhiều | `broadcast()` cho bảng nhỏ (< 100MB) |
| OOM | Tăng `spark.executor.memory`, giảm partition size |
| Slow joins | Broadcast join cho dim tables nhỏ |

```python
from pyspark.sql.functions import broadcast

# ✅ Broadcast join cho bảng nhỏ
result = orders.join(broadcast(dim_products), "product_id")
```

## Anti-Patterns

- ❌ `collect()` trên dataset lớn → OOM driver
- ❌ UDFs Python → Chậm, dùng built-in functions
- ❌ `repartition(1)` → Single file = bottleneck
- ❌ Cache mọi thứ → Chỉ cache khi reuse > 1 lần
- ❌ `toPandas()` trên big data → Chỉ dùng cho data nhỏ sau aggregation
