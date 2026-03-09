# Data Modeling Patterns

## Star Schema (Khuyên dùng cho Analytics)

```
                    ┌─────────────┐
                    │ dim_dates   │
                    │─────────────│
                    │ date_key PK │
                    │ full_date   │
                    │ year        │
                    │ quarter     │
                    │ month       │
                    │ day_of_week │
                    └──────┬──────┘
                           │
┌──────────────┐    ┌──────┴──────┐    ┌───────────────┐
│ dim_customers│    │ fct_orders  │    │ dim_products   │
│──────────────│    │─────────────│    │───────────────│
│ customer_key │◄───│ customer_key│    │ product_key PK│
│ customer_id  │    │ product_key │───►│ product_id     │
│ name         │    │ date_key    │    │ name           │
│ segment      │    │ quantity    │    │ category       │
│ valid_from   │    │ unit_price  │    │ price          │
│ valid_to     │    │ total       │    └───────────────┘
│ is_current   │    │ discount    │
└──────────────┘    └─────────────┘
```

## SCD Type 2 — Slowly Changing Dimensions

```sql
-- Dimension table với history tracking
CREATE TABLE dim_customers (
    customer_key    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id     VARCHAR(50) NOT NULL,  -- Natural key
    name            VARCHAR(200),
    email           VARCHAR(200),
    segment         VARCHAR(50),
    -- SCD Type 2 fields
    valid_from      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valid_to        TIMESTAMP DEFAULT '9999-12-31',
    is_current      BOOLEAN DEFAULT TRUE
);

-- Khi customer thay đổi segment:
-- 1. Close record cũ
UPDATE dim_customers
SET valid_to = CURRENT_TIMESTAMP, is_current = FALSE
WHERE customer_id = 'C001' AND is_current = TRUE;

-- 2. Insert record mới
INSERT INTO dim_customers (customer_id, name, email, segment)
VALUES ('C001', 'Nguyễn Văn A', 'a@mail.com', 'premium');
```

## Naming Conventions

| Layer | Prefix | Ví dụ | Mô tả |
|:---|:---|:---|:---|
| **Raw/Staging** | `stg_` | `stg_stripe__payments` | 1:1 với source, chỉ rename + cast |
| **Intermediate** | `int_` | `int_orders_pivoted` | Transform trung gian |
| **Fact** | `fct_` | `fct_orders` | Event/transaction tables |
| **Dimension** | `dim_` | `dim_customers` | Entity/lookup tables |
| **Metrics** | `metric_` | `metric_daily_revenue` | Pre-aggregated metrics |
| **Bridge** | `bridge_` | `bridge_order_products` | Many-to-many relationships |

## Grain Definition — Câu hỏi bắt buộc

Trước khi tạo fact table, PHẢI trả lời:

1. **Grain là gì?** — 1 row đại diện cho cái gì? (VD: 1 order line, 1 click, 1 transaction)
2. **Dimensions nào?** — Phân tích theo các chiều nào? (time, customer, product, geography)
3. **Measures nào?** — Metric cần tính? (SUM, COUNT, AVG)
4. **Frequency?** — Data cập nhật tần suất nào? (realtime, hourly, daily)

## Data Vault (Cho Enterprise)

```
Hub (Business Key)     Link (Relationship)     Satellite (Attributes)
┌──────────────┐       ┌──────────────┐        ┌──────────────────┐
│ hub_customer │       │ link_order   │        │ sat_customer     │
│──────────────│       │──────────────│        │──────────────────│
│ hash_key  PK │       │ hash_key  PK │        │ hash_key      PK │
│ customer_id  │       │ hub_cust_hk  │        │ load_date     PK │
│ load_date    │       │ hub_prod_hk  │        │ name             │
│ record_src   │       │ load_date    │        │ email            │
└──────────────┘       │ record_src   │        │ segment          │
                       └──────────────┘        │ record_src       │
                                               └──────────────────┘
```

## Anti-Patterns

- ❌ Fact table không có grain rõ ràng → Aggregation sai
- ❌ Snowflake quá sâu (> 3 levels) → Query performance giảm
- ❌ Dùng natural keys làm foreign keys → Dùng surrogate keys
- ❌ Bỏ qua SCD → Mất lịch sử thay đổi dimensions
- ❌ Quá nhiều NULLs trong facts → Thiết kế grain sai
