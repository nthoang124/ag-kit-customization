---
name: agent-orchestration-multi-agent-optimize
description: "Tối ưu hóa hệ thống máy học đa cấu trúc (multi-agent systems) với phương pháp phối hợp định profile luồng, chia tải công việc trơn tru, dàn xếp giá cước API Rẻ (cost-aware). Dùng khi bạn thấy bầy Agent chạy bị ngập, báo Error sập Server, hay Lề mề Chậm Nhịp Timeout."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Bô Công Cụ Tối Ưu Nhiều Tác Nhân Agent Cùng Lúc (Multi-Agent Optimization Toolkit)

## Sử Dụng Kỹ Năng Này Khi

- Cải Thiện Quản Lý Chuỗi Dây Chuyền Multi-Agent, Nhấn Ga Tăng Năng Suất System Chạy Xong Việc Gấp (throughput), hay Giảm trễ Giật (latency).
- Phân luồng Cấn Code Bottleneck Ùn Tắc Bốc Khói (Identify bottlenecks).
- Thiết Kế Bản Vẽ Sơ Đồ Gọi Data Giúp Máy Quản Lý.
- Ép Chi Phí (Cost down) Rút Dài Vốn Tokens Context.

## ĐỪNG GỌI NÓ VÀO NẾU

- Cần Fix Chỉ 1 Đứa Agent Lẻ Lẻ Cùn Mụn Nằm Lì Cãi Mảng Prompt.
- Chả Cầm Thống Kê Điểm Benchmark Báo Lỗi Chỗ Nào Để Bóc Tách.
- Đang Code Xây Gốc Database Cơ Sở Server Lệch Nhịp.

## Sổ Chỉ Nam Hướng Dẫn Kẹp Trục Mép Phễu Bơm (Instructions)

1. Ghim Cột Mốc Đo Data Tín Hiệu Nền Target KPIs Điểm Quota Báo Nhanh.
2. Vạch Luồng Băm Tải Xem Core Logic Bottleneck Đè Khúc Giao Lộ Ở Nút Nào? 
3. Kê Chiếu Chỉnh Điểm Call Giá Rẻ API Cân Lại Khâu Đọc Code Bơm Prompt Limit Dần. 
4. Xác Thực Đo Sập Bug Có Reverts Hay Trôi Hoàn Thành (Validate Improvements).

## Hàng Rào Trục Lõi Bảo Vệ Tẩy Trắng Lệnh Hỏng (Safety)

- Cấm Đè Prompt Băng Hỏng Build Khúc Phối Hợp Trạm Giao Thức Tụ Chuyển Orchestrator Không Đỉnh Nhịp Regression Test Kể.
- Kỹ Thuật Roll Back 1% Nhích Chút Test Xem Bot Trả Loi Thủng Database. 

## Vai Trò Bot Máy: Chuyên Viên Thiết Kế Điểm Tụ Multi-Agent AI (AI-Powered Multi-Agent Performance Engineering Specialist)

Sức Năng Lực Trụ Build System:
- Tinh Ranh Trong Khoản Gọi Lệnh Móc Ngoặc Hệ Bầy Đàn Nhiều LLMs Nước Trôi (Intelligent multi-agent coordination).
- Cân Phễu Lọc Nghẽn Chấn Trục Quản Load Balancing Mạng Code Quanh Nhau. 

### Argument Truyền Tới Model Nằm Chờ Đo Chỉ Lệnh (Arguments Handling)

Hệ Đỡ Kênh Đọc Kéo Tool Giải Mã Context Vào Data Rộng Cửa Rào Data Bơm Lệ.
- `$TARGET`: Mục Tiêu Đích API Project Focus Tới Gõ Mép Tường Khúc.
- `$PERFORMANCE_GOALS`: Check Danh Điểm Số Nhắm Target Báo Xong Màn.
- `$OPTIMIZATION_SCOPE`: Vực Lỗ Rà Trúng (Bắt Quick-Win Hack Chớp Hay Xoáy Sâu Viết Lại Code System) 
- `$BUDGET_CONSTRAINTS`: Budget Tiền Cắn API Credit Dollar Phễu.
- `$QUALITY_METRICS`: Giá Nhỏ Đứt Rủi Tác Khúc Hoàn Kiếm Nghĩa Nghèo Trội Báo Phép (Performance Quality threshold Limit Line Drop).

## 1. Điểm Tụ Dò Kênh Quét Máy Nhịp Profile Agents (Multi-Agent Performance Profiling)

- Khám Máy Mảng Tuyến: Mảng 1 Data Database Nhai Dữ Liệu SQL Chậm Quá Không Limit - Agent FrontEnd Rớt Code Xây Code Phế Dump Cây...

### Code Cắm Lưới Tỏa Nhiệt Phân Luồng:
```python
def multi_agent_profiler(target_system):
    agents = [
        DatabasePerformanceAgent(target_system),
        ApplicationPerformanceAgent(target_system),
        FrontendPerformanceAgent(target_system)
    ]

    performance_profile = {}
    for agent in agents:
        performance_profile[agent.__class__.__name__] = agent.profile()

    return aggregate_performance_metrics(performance_profile)
```

## 2. Tiết Kiệm Tokens Ép Vòng Nhớ (Context Window Optimization)

- Biện Pháp Ngắt (Heuristic Truncate) - Bóp Mềm Nghĩa Không Rách Dữ Kiện.
- Dynamic Resizing Lùi Bớt Khoảng Context Khi Trôi Hội Thoại.

### Code Khóa Mép Text Code Nghĩa:
```python
def compress_context(context, max_tokens=4000):
    # Nén nghĩa bằng Trục Semantic Mốc Bẻ Lái Vector
    compressed_context = semantic_truncate(
        context,
        max_tokens=max_tokens,
        importance_threshold=0.7 # Cắt Bọn Trọng Lượng Từ Cặn < 0.7 Vớt Dần Token Gửi
    )
    return compressed_context
```

## 3. Kiến Trúc Gọi Rào Chia Lái Lệnh Luồng Xếp Phân Nguồn Cấp (Parallel Execution Optimization)

### Code Khay Máng Trục Thả Parallel Ném Lệnh Cho Queue Chấp Móc Nhờ Nhau Gọi Nước Song Song Không Trói Kéo Thread Nhấp Block Lệnh Lỗi Gốc:
```python
class MultiAgentOrchestrator:
    def __init__(self, agents):
        self.agents = agents
        self.execution_queue = PriorityQueue()
        self.performance_tracker = PerformanceTracker()

    def optimize(self, target_system):
        # Trải Song Song Cho Gọi Lệnh Cứ Lấy Về Chứ Éo Đợi Một Đứa Hoàn Mới Dịch Mốc Con Sau... Thống Nhất Quản Lý Trôi Dồn Vào AsCompleted Xong Phút Nhanh Rẻ.
        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = {
                executor.submit(agent.optimize, target_system): agent
                for agent in self.agents
            }

            for future in concurrent.futures.as_completed(futures):
                agent = futures[future]
                result = future.result()
                self.performance_tracker.log(agent, result)
```

## 4. Quản Phím Mức Cước Hút Máu API Bơm Thắp Dấu Vay Trả Theo Budget LLMS (Cost Optimization Strategies & LLM Mix Models Router)

- Tracking Tính Nước Cước Tính Tiền Token Rate Usage LLMs. 
- Chia Router Gọi Lệnh Không Gian Tự Kéo. Thằng Làm Tool Nhẹ Như Trích Data Cầm Phím Cho Chạy Mô Hình Claude-Haiku Rẻ Nhất Gấp Trăm So Với Óc Chứa Sonnet Đẩy Tiền Đóng Trảm Token... Cache Lưu Của Query Gấp Dấu Xếp Về Database Dùng Lại Rẻ Ngon Trọn... Nước Vành Nghĩa Dữ Dằn Giảm Nước Chói Code Nhau.

Cục Trắng Logic API Rẻ Cost Code Nhỏ Đọc Hiểu Múa Nhóm Kèo Bóp Sạch Nền
```python
class CostOptimizer:
    def __init__(self):
        self.token_budget = 100000  # Ngân Sách Quota Limit Trôi Build Thả Túi
        self.token_usage = 0
        self.model_costs = {
            'gpt-5': 0.03,
            'claude-4-sonnet': 0.015,
            'claude-4-haiku': 0.0025
        }

    def select_optimal_model(self, complexity):
        # Hệ Thống Vệ Tinh Đo Mức Gọi Phế Nút Thắt - Chớp Xoáy Độ Khó Vớt Code Router Code Mẫu Size Chạy Cho Cost Rẻ Token Hợp LLM Khớp (Dynamic Model Call Limit Thresholds).
        pass
```

## Khi Nào Cần Gõ Khai Mở SKILL Vô Luồng Code Lấy Reference Dọc Trục Ánh Sáng Data (When to Use)
Kỹ năng này áp dụng để thực thi các workflow hoặc hành động mô tả tổng quát trên. Target Tới Lấy Object Arguments Khúc Đầu Trỏ Dầu Mép.

Cọc Đọc Variables Data Ghi Kèo Cho Phễu Trục: $ARGUMENTS
