---
trigger: model_decision
description: Áp dụng khi đánh giá dự án, review deliverables, audit codebase, hoặc thực hiện đánh giá chất lượng cần chấm điểm khách quan.
---

# Khung Thẩm Định Dự Án (Project Evaluation Framework)

> [!IMPORTANT]
> **BẮT BUỘC**: Khi đánh giá bất kỳ dự án, deliverable, hoặc hệ thống nào, Agent PHẢI sử dụng bộ tiêu chí dưới đây để đảm bảo tính khách quan, có bằng chứng, và không cảm tính.

## 1. Nguyên tắc Thẩm định

1.  **Evidence-Based**: Mỗi điểm số PHẢI kèm bằng chứng cụ thể (trích dẫn code, tài liệu, metric).
2.  **Không Suy Diễn**: Nếu thiếu dữ liệu → ghi "Không đủ dữ liệu", KHÔNG đoán mò.
3.  **Phản Biện Bắt Buộc**: Sau mỗi đánh giá, PHẢI đưa ra phản biện khắt khe.
4.  **Tự Kiểm Tra**: Trước khi xuất kết quả, kiểm tra lại toàn bộ lập luận.

## 2. Bộ Tiêu Chí Đánh Giá Đa Chiều

### Bảng Rubric Chuẩn

| # | Tiêu chí chính | Định nghĩa chi tiết | Điểm 1 | Điểm 5 | Điểm 10 | Trọng số |
|:--|:---|:---|:---|:---|:---|:---:|
| 1 | **Tính Khả Thi Kỹ Thuật** | Khả năng triển khai thực tế dựa trên công nghệ, nguồn lực, và trình độ team hiện tại | Công nghệ chưa tồn tại hoặc team không có năng lực | Khả thi nhưng cần training/hiring đáng kể | Hoàn toàn khả thi với team và tech stack hiện có | **15%** |
| 2 | **Rủi Ro Hệ Thống** | Mức độ đe dọa từ single point of failure, vendor lock-in, scalability bottleneck | Nhiều SPOF, không có fallback, vendor lock-in 100% | Có một số SPOF nhưng đã nhận diện, mitigation plan sơ bộ | Zero SPOF, multi-vendor, horizontal scaling, DR plan đầy đủ | **15%** |
| 3 | **Hiệu Quả Tài Chính** | Tỷ lệ chi phí/lợi ích (ROI), burn rate, và tính bền vững tài chính | ROI âm, burn rate > runway, không có revenue model | ROI dương nhưng timeline > 12 tháng, unit economics chưa rõ | ROI > 3x, unit economics proven, payback < 6 tháng | **10%** |
| 4 | **Chất Lượng Kiến Trúc** | Tính module hóa, separation of concerns, khả năng mở rộng, và tuân thủ SOLID | Monolithic spaghetti, coupling cao, không có abstraction | Có structure nhưng vi phạm SRP, coupling trung bình | Clean Architecture, DDD, loosely coupled, well-documented ADRs | **15%** |
| 5 | **Độ Bao Phủ Kiểm Thử** | Coverage %, loại test (unit/integration/E2E), và CI pass rate | 0% coverage, không có test, không CI | 40-60% unit tests, CI chạy nhưng flaky | >80% coverage, unit+integration+E2E, CI green 99%+ | **10%** |
| 6 | **Bảo Mật Ứng Dụng** | OWASP compliance, secrets management, input validation, AuthN/AuthZ | Hardcode secrets, SQL injection möglich, no AuthZ | Cơ bản (validation, env vars) nhưng thiếu audit trail | OWASP Top 10 mitigated, secret rotation, RBAC, audit log, pen-test | **10%** |
| 7 | **Trải Nghiệm Người Dùng** | UI/UX quality, accessibility (WCAG), performance (Web Vitals), responsive design | Không responsive, LCP > 6s, không accessibility | Responsive, LCP < 4s, cơ bản accessibility | LCP < 2.5s, CLS < 0.1, WCAG AA, micro-animations, dark mode | **5%** |
| 8 | **Chất Lượng Tài Liệu** | Mức độ đầy đủ, cập nhật, và truy vấn được của documentation | Không có docs, README trống | README + API docs cơ bản, outdated | Docs folder đầy đủ (PRD, SDD, API, Test Plans), MOC, up-to-date | **5%** |
| 9 | **Khả Năng Vận Hành** | CI/CD, monitoring, logging, alerting, rollback, và incident response | Manual deploy, no monitoring, no logging | CI/CD cơ bản, logging nhưng không alerting | Full CI/CD, observability (logs+metrics+traces), auto-rollback | **10%** |
| 10 | **Tính Bền Vững Kỹ Thuật** | Tech debt ratio, dependency health, upgrade path, code churn | Legacy stack, nhiều deprecated deps, no upgrade path | Modernizing, một số tech debt nhưng có plan | Latest stable versions, zero CVEs, tech debt < 5% per sprint | **5%** |

**Tổng Trọng Số: 100%**

## 3. Quy Trình Đánh Giá (Decision Flow)

```
┌─────────────────────────────────────────────────────────────┐
│ WHEN đánh giá dự án / code / deliverable:                   │
├─────────────────────────────────────────────────────────────┤
│ 1. THU THẬP DỮ LIỆU                                        │
│    → Đọc code, docs, config, tests, CI logs                │
│    → Chạy lệnh: npm test, coverage report, lighthouse       │
│    → List dependencies, check versions                      │
├─────────────────────────────────────────────────────────────┤
│ 2. CHẤM ĐIỂM TỪNG TIÊU CHÍ (1-10)                         │
│    → Mỗi điểm PHẢI có bằng chứng cụ thể                   │
│    → Ghi "Không đủ dữ liệu" nếu không thể đánh giá        │
├─────────────────────────────────────────────────────────────┤
│ 3. TÍNH TỔNG ĐIỂM CÓ TRỌNG SỐ                             │
│    → Σ (Điểm × Trọng số) / 100                             │
├─────────────────────────────────────────────────────────────┤
│ 4. PHẢN BIỆN KHẮT KHE                                      │
│    → Xác định 3 điểm yếu lớn nhất                          │
│    → Đề xuất cải thiện cụ thể                               │
├─────────────────────────────────────────────────────────────┤
│ 5. TÍNH ĐỘ TIN CẬY (0-1)                                   │
│    → Bao nhiêu tiêu chí có đủ dữ liệu?                    │
│    → Confidence = tiêu chí có dữ liệu / tổng tiêu chí     │
└─────────────────────────────────────────────────────────────┘
```

## 4. Bảng Kết Quả Mẫu (Output Format)

### Bảng Điểm Chi Tiết

| # | Tiêu chí | Điểm | Trọng số | Điểm × TS | Bằng chứng | Ghi chú |
|:--|:---|:---:|:---:|:---:|:---|:---|
| 1 | Tính Khả Thi | 8 | 15% | 1.20 | Team có 3 senior devs, stack NestJS + PostgreSQL | Khả thi cao |
| 2 | Rủi Ro Hệ Thống | 5 | 15% | 0.75 | Single DB, không replica, không DR plan | Cần cải thiện |
| ... | ... | ... | ... | ... | ... | ... |
| | **TỔNG** | | 100% | **7.2/10** | | |

### Thang Phân Loại

| Tổng điểm | Phân loại | Hành động |
|:---:|:---|:---|
| 9.0 - 10.0 | 🟢 **Xuất sắc** | Tiếp tục, optimize |
| 7.0 - 8.9 | 🔵 **Tốt** | Cải thiện điểm yếu |
| 5.0 - 6.9 | 🟡 **Trung bình** | Cần refactor có kế hoạch |
| 3.0 - 4.9 | 🟠 **Yếu** | Cần đánh giá lại kiến trúc |
| 1.0 - 2.9 | 🔴 **Nguy kịch** | Cân nhắc viết lại |

### Phản Biện Chuyên Sâu

```markdown
## Phản Biện Khắt Khe

### Điểm yếu #1: [Tên tiêu chí]
- **Bằng chứng**: [Trích dẫn cụ thể]
- **Tác động**: [Hậu quả nếu không sửa]
- **Đề xuất**: [Giải pháp cụ thể, actionable]

### Điểm yếu #2: ...

### Điểm yếu #3: ...

---
**Độ tin cậy của bản đánh giá**: 0.85
(8/10 tiêu chí có đủ dữ liệu, 2 tiêu chí "Không đủ dữ liệu")
```

## 5. Ví dụ Kích Hoạt

```text
# Đánh giá dự án
Hãy thẩm định dự án FarmTrace dựa trên bộ tiêu chí evaluation-framework.

# Đánh giá code quality
Đánh giá chất lượng kiến trúc của backend API hiện tại.

# Review trước release
Thẩm định toàn bộ hệ thống trước khi release v1.0.
```

## 6. Lưu Ý Quan Trọng

- **Không thiên vị**: Agent KHÔNG được ưu ái code do chính mình tạo ra.
- **Thang điểm nhất quán**: Dùng mốc 1/5/10 trong rubric, không nội suy chủ quan.
- **Cập nhật rubric**: Nếu dự án có domain đặc thù (FinTech, HealthTech), bổ sung tiêu chí compliance tương ứng.
- **Output location**: Kết quả thẩm định lưu tại `docs/050-Research/Evaluation-{ProjectName}.md`.