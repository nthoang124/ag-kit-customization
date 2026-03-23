---
name: analytics-product
description: "Phân tích Sản phẩm (Product Analytics) — PostHog, Mixpanel, thiết lập sự kiện (events), phễu (funnels), tập dữ liệu (cohorts), tỷ lệ giữ chân (retention), North Star metric, OKRs và bảng điều khiển sản phẩm."
risk: none
source: community
date_added: '2026-03-06'
tags:
- analytics
- product
- metrics
- posthog
- mixpanel
---

# ANALYTICS-PRODUCT — Ra Quyết Định Phụ Thuộc Vào Dữ Liệu

## Tổng quan (Overview)

Chuyên gia Phân tích Sản phẩm — Xử lý PostHog, Mixpanel, theo dõi sự kiện (events), biểu đồ phễu (funnels), phân tích cohort, tỷ lệ giữ chân (retention), North Star metric, OKRs và dashboard.
Kích hoạt agent này để: cấu hình event tracking, tạo phễu chuyển đổi, phân tích tập người dùng, giữ chân (DAU/MAU), quản lý feature flags, A/B testing, thiết lập North Star metric và OKRs.

## Khi Nào Sử Dụng (When to Use)

- Khi cần sự trợ giúp chuyên sâu về phân tích dữ liệu sản phẩm.
- Khi cần quyết định các event taxonomy, setup PostHog/Mixpanel.

## Khi Nào KHÔNG Sử Dụng

- Tác vụ không liên quan đến phân tích sản phẩm.
- Cần dev backend/frontend thông thường thay vì thiết kế hệ thống theo dõi dữ liệu.

## Quy tắc Đặt Tên Sự Kiện (How It Works)

```
[đối_tượng]_[động_từ_thể_quá_khứ]

✅ Chuẩn:   user_signed_up, conversation_started, upgrade_completed
❌ Sai:     signup, click, conversion
```

## Phân Tích Thông Minh — Decida Com Dados

> "In God we trust. All others must bring data." — W. Edwards Deming
> (Chúng ta tin vào Chúa. Tất cả những người khác phải mang dữ liệu đến đây minh chứng.)

---

## Từ Điển Sự Kiện Thiết Yếu (Essential Events)

```python
AURI_EVENTS = {
    # Thu hút (Acquisition)
    "user_signed_up":        {"props": ["source", "medium", "campaign"]},
    "onboarding_started":    {"props": ["step_count"]},
    "onboarding_completed":  {"props": ["time_to_complete", "steps_skipped"]},

    # Kích hoạt (Activation)
    "first_conversation":    {"props": ["intent", "response_time"]},
    "aha_moment_reached":    {"props": ["trigger", "session_number"]},
    "feature_discovered":    {"props": ["feature_name", "discovery_method"]},

    # Giữ chân (Retention)
    "conversation_started":  {"props": ["intent", "user_tier", "device"]},
    "conversation_completed":{"props": ["messages_count", "duration", "rating"]},
    "session_started":       {"props": ["days_since_last", "platform"]},

    # Doanh thu (Revenue)
    "upgrade_viewed":        {"props": ["trigger", "current_tier"]},
    "upgrade_started":       {"props": ["target_tier", "trigger"]},
    "upgrade_completed":     {"props": ["tier", "plan", "revenue"]},
    "subscription_canceled": {"props": ["reason", "tier", "tenure_days"]},
    "payment_failed":        {"props": ["attempt_count", "error_code"]},
}
```

## Triển khai Posthog (Python)

```python
from posthog import Posthog
import os

posthog = Posthog(
    project_api_key=os.environ["POSTHOG_API_KEY"],
    host=os.environ.get("POSTHOG_HOST", "https://app.posthog.com")
)

def track(user_id: str, event: str, properties: dict = None):
    posthog.capture(
        distinct_id=user_id,
        event=event,
        properties=properties or {}
    )

def identify(user_id: str, traits: dict):
    posthog.identify(
        distinct_id=user_id,
        properties=traits
    )

## Cách sử dụng:

track("user_123", "conversation_started", {
    "intent": "business_advice",
    "device": "alexa",
    "user_tier": "pro"
})
```

---

## Phễu Kích Hoạt (Activation Funnel)

```
Truy cập Landing Page          (100%)
    | [Mục tiêu: 40%]
Nhấn nút "Dùng Thử"            (40%)
    | [Mục tiêu: 70%]
Hoàn thành Đăng Ký             (28%)
    | [Mục tiêu: 60%]
Trò chuyện lần đầu             (17%)  <- AHA MOMENT
    | [Mục tiêu: 50%]
Quay lại vào ngày hôm sau      (8.5%)
    | [Mục tiêu: 40%]
Sử dụng 3+ ngày trong tuần     (3.4%)
    | [Mục tiêu: 20%]
Nâng cấp bản Pro               (0.7%)
```

## Tối Ưu Hóa Phễu (Funnel Optimization)

```
Đối với mỗi điểm rớt dốc (drop-off) > Mức chuẩn (benchmark):
1. Nhận diện: User đang rớt chính xác ở đâu?
2. Thấu hiểu: Tại sao? (dùng session recordings, khảo sát)
3. Giả thuyết: Giải pháp/thay đổi nào có thể cải thiện?
4. Thử nghiệm: A/B test với tập mẫu đáng tin cậy.
5. Đo lường: Cần ít nhất 2 tuần, p-value < 0.05
6. Học hỏi: Khắc phục và lặp lại dù thử nghiệm thất bại.
```

---

## Phân Tích Cohort (Tỷ Lệ Giữ Chân Hàng Tuần)

```python
def calculate_cohort_retention(events_df):
    """
    events_df: DataFrame với các cột [user_id, event_date, event_name]
    Return: Ma trận tỷ lệ giữ chân (cohort matrix) [cohort_week x week_number]
    """
    import pandas as pd

    first_session = events_df[events_df.event_name == "session_started"] \
        .groupby("user_id")["event_date"].min() \
        .dt.to_period("W")

    sessions = events_df[events_df.event_name == "session_started"].copy()
    sessions["cohort"] = sessions["user_id"].map(first_session)
    sessions["weeks_since"] = (
        sessions["event_date"].dt.to_period("W") - sessions["cohort"]
    ).apply(lambda x: x.n)

    cohort_data = sessions.groupby(["cohort", "weeks_since"])["user_id"].nunique()
    cohort_sizes = cohort_data.unstack().iloc[:, 0]
    retention = cohort_data.unstack().divide(cohort_sizes, axis=0) * 100

    return retention
```

## Benchmarks Giữ Chân (Retention Benchmarks)

| Tuần | Kém (<) | Tạm Ổn | Tốt | Xuất Sắc (>) |
|--------|---------|-----|-----|-----------|
| W1 | 20% | 20-35% | 35-50% | 50% |
| W4 | 10% | 10-20% | 20-30% | 30% |
| W8 | 5% | 5-12% | 12-20% | 20% |

---

## Thiết Lập North Star Metric

```
Khuôn khổ (Framework):
1. Điều gì tạo ra giá trị cốt lõi cho người dùng? -> Tương tác/Action ý nghĩa.
2. Điều gì dự báo tăng trưởng dài hạn? -> User giữ thói quen sử dụng lặp lại.
3. Đo lường ntn? -> Ví dụ: "Weekly Active Conversationalists" (WAC)

North Star: WAC (Weekly Active Conversationalists)
Định nghĩa: Số user có >= 3 phiên hoạt động mỗi tuần, kéo dài ít nhất 2 phút.

Mục tiêu năm 1: 10.000 WAC
Mục tiêu năm 2: 100.000 WAC
```

## Bảng Xếp Hạng North Star

```python
def calculate_north_star(db):
    wac = db.query("""
        SELECT COUNT(DISTINCT user_id) as wac
        FROM conversations
        WHERE
            created_at >= NOW() - INTERVAL '7 days'
            AND duration_seconds >= 120
        GROUP BY user_id
        HAVING COUNT(*) >= 3
    """).scalar()

    return {
        "wac": wac,
        "wow_growth": calculate_wow_growth(db, "wac"),
        "target": 10000,
        "progress": f"{wac/10000*100:.1f}%"
    }
```

---

## Quản lý Tính Năng Bằng Feature Flags (PostHog)

```python
def is_feature_enabled(user_id: str, feature: str) -> bool:
    return posthog.feature_enabled(feature, user_id)

if is_feature_enabled(user_id, "new-onboarding-v2"):
    show_new_onboarding()
else:
    show_old_onboarding()
```

## Máy tính Mức Độ Đáng Tin Cậy Thống Kê (A/B Test)

```python
from scipy import stats
import numpy as np

def ab_test_significance(
    control_conversions: int,
    control_visitors: int,
    variant_conversions: int,
    variant_visitors: int,
    confidence: float = 0.95
) -> dict:
    control_rate = control_conversions / control_visitors
    variant_rate = variant_conversions / variant_visitors
    lift = (variant_rate - control_rate) / control_rate * 100

    _, p_value = stats.chi2_contingency([
        [control_conversions, control_visitors - control_conversions],
        [variant_conversions, variant_visitors - variant_conversions]
    ])[:2]

    significant = p_value < (1 - confidence)

    return {
        "control_rate": f"{control_rate*100:.2f}%",
        "variant_rate": f"{variant_rate*100:.2f}%",
        "lift": f"{lift:+.1f}%",
        "p_value": round(p_value, 4),
        "significant": significant,
        "recommendation": "Phát hành Variant (Phiên bản mới)" if significant and lift > 0 else "Giữ nguyên Control (Bản cũ)"
    }
```

---

## 6. Lệnh Thường Dùng (Commands)

| Lệnh | Hành Động |
|---------|------|
| `/event-taxonomy` | Định nghĩa kho sự kiện (taxonomy) |
| `/funnel-analysis` | Phân tích phễu chuyển đổi |
| `/cohort-retention` | Tính toán tỷ lệ giữ chân theo cohort |
| `/north-star` | Thiết lập hoặc xem xét North Star Metric |
| `/ab-test` | Tính độ tin cậy kết quả A/B Test |
| `/dashboard-setup` | Sinh biểu đồ và Bảng Dashboard đo lường |
| `/okr-template` | Lên mẫu OKRs cho Product Team |

## Thực Hành Tốt (Best Practices)

- Cung cấp ngữ cảnh rõ ràng, bối cảnh thực tế của sản phẩm trước khi phân tích.
- Xem xét lại tệp code cẩn thận trước khi deploy tracking code vào production.

## Cạm Bẫy Phổ Biến (Common Pitfalls)

- Tracker rác (đẩy events vô tội vạ) thay vì đo lường sâu có chủ định.
- Chạy A/B Testing mà không đủ traffic dẫn tới P-value không chính xác.
- Nhầm lẫn tỷ lệ theo công thức "Vanity Metric" thay vì thực sự tác động tới Actionable Metric.

## Kỹ Năng Liên Quan

- `growth-marketer` - Phân tích marketing data và SEO.
- `data-engineer` - Lo phần pipeline (ETL) đưa data vào DB trước khi phân tích.
- `backend-developer` - Triển khai tracking event từ phía Server Side.
