---
name: agents-v2-py
description: "Xây dựng Container-based Foundry Agents sử dụng bộ Azure AI Projects SDK (ImageBasedHostedAgentDefinition). Sử dụng thiết lập này khi cần tạo các hosted agents với images container tùy biến (custom container images) nằm trên máy chủ Azure AI Foundry."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Hosted Agents của Azure AI (Python)

Giúp thiết lập dựng Agent chạy trên nền Container qua Module `ImageBasedHostedAgentDefinition` thuộc Azure AI Projects SDK.

## Lệnh Cài Đặt (Installation)

```bash
pip install azure-ai-projects>=2.0.0b3 azure-identity
```

**Bản SDK Yêu cầu (Minimum SDK Version):** Cần từ bản `2.0.0b3` trở lên thì mới có hỗ trợ container hosted agent.

## Khai Báo Biến Môi Trường (Environment Variables)

```bash
AZURE_AI_PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>
```

## Tiền Đề Cần Chuẩn Bị (Prerequisites)

Trước khi cấu hình cloud hosted agents cần có:

1. **Container Image** - Phải Build và Docker push gói lên trạm Azure Container Registry (ACR).
2. **Quyền Kéo AcrPull** - Identity Manager cho Project phải dc cấp Role `AcrPull` móc vào trên kho ACR đó.
3. **Capability Host** - Host tài khoản account level phải mở lệnh `enablePublicHostingEnvironment=true`
4. **Bản SDK Version** - Tuyệt đối check xài `azure-ai-projects>=2.0.0b3`

## Xác thực Đăng Nhập (Authentication)

Luôn luôn dùng cơ chế pass token hệ thống mặc định `DefaultAzureCredential`:

```python
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

credential = DefaultAzureCredential()
client = AIProjectClient(
    endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    credential=credential
)
```

## Luồng Gọi (Core Workflow)

### 1. Hàm Imports

```python
import os
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import (
    ImageBasedHostedAgentDefinition,
    ProtocolVersionRecord,
    AgentProtocol,
)
```

### 2. Dựng Hosted Agent (Create Hosted Agent)

```python
client = AIProjectClient(
    endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential()
)

agent = client.agents.create_version(
    agent_name="my-hosted-agent",
    definition=ImageBasedHostedAgentDefinition(
        container_protocol_versions=[
            ProtocolVersionRecord(protocol=AgentProtocol.RESPONSES, version="v1")
        ],
        cpu="1",
        memory="2Gi",
        image="myregistry.azurecr.io/my-agent:latest",
        tools=[{"type": "code_interpreter"}],
        environment_variables={
            "AZURE_AI_PROJECT_ENDPOINT": os.environ["AZURE_AI_PROJECT_ENDPOINT"],
            "MODEL_NAME": "gpt-4o-mini"
        }
    )
)

print(f"Created agent: {agent.name} (version: {agent.version})")
```

### 3. Tìm Danh Sách Phiên Bản Agent (List Agent Versions)

```python
versions = client.agents.list_versions(agent_name="my-hosted-agent")
for version in versions:
    print(f"Version: {version.version}, State: {version.state}")
```

### 4. Xóa Hủy Bỏ Từng Phiên Bản Version (Delete Agent Version)

```python
client.agents.delete_version(
    agent_name="my-hosted-agent",
    version=agent.version
)
```

## Các Thuộc Tính ImageBasedHostedAgentDefinition Parameters

| Parameter | Type | Bắt Buộc Không? | Ý Nghĩa (Description) |
|-----------|------|----------|-------------|
| `container_protocol_versions` | `list[ProtocolVersionRecord]` | Yes (Có) | Các giao thức cho agent |
| `image` | `str` | Yes (Có) | Full path tag link container image trên ACR |
| `cpu` | `str` | No (Không) | Xin CPU Core Limit (VD: "1", "2") |
| `memory` | `str` | No (Không) | Cắm Memory Ram (VD: "2Gi", "4Gi") |
| `tools` | `list[dict]` | No (Không) | Mở Khóa Tools list cho Agent thao tác |
| `environment_variables` | `dict[str, str]` | No (Không) | Bơm thêm ENV Môi trường vào trong Container |

## Chẩn Giao Thức (Protocol Versions)

Nhồi `container_protocol_versions` định dạng Giao Thức Mạng Mặc Định mà Container Con Khai Báo Support Dùng:

```python
from azure.ai.projects.models import ProtocolVersionRecord, AgentProtocol

# Giao thức mẫu chuẩn RESPONSES
container_protocol_versions=[
    ProtocolVersionRecord(protocol=AgentProtocol.RESPONSES, version="v1")
]
```

## Xin Phân Kênh Tài Nguyên Scale Cloud (Resource Allocation)

Báo Vị Trí Slot CPU Mạng Chờ Host Run Cứng:

```python
definition=ImageBasedHostedAgentDefinition(
    container_protocol_versions=[...],
    image="myregistry.azurecr.io/my-agent:latest",
    cpu="2",      # 2 CPU cores
    memory="4Gi"  # Cục 4 GiB Ram Memory Mới Chịu Nổi Cache Python
)
```

**Resource Limits:**
| Tên Hardware | Thấp Nhất (Min) | Trần Khóa Max (Max) | Auto Bơm Nền Khởi Đăng (Default)|
|----------|-----|-----|---------|
| CPU | 0.5 | 4 | 1 |
| RAM (Memory) | 1Gi | 8Gi | 2Gi |

## Pass Cổng Cấu Hình Tool Code API

Bút nạp Load Các Quyền Chức Năng Hosted Agent Tools Chạy Support Ở Nội Cục Bộ:

### Code Interpreter (Thực Thi Trình Thông Dịch Python)
```python
tools=[{"type": "code_interpreter"}]
```

### MCP Tools System

```python
tools=[
    {"type": "code_interpreter"},
    {
        "type": "mcp",
        "server_label": "my-mcp-server",
        "server_url": "https://my-mcp-server.example.com"
    }
]
```

## Variables Env Push Nhanh Cấu Hình Nằm Container API Build

```python
environment_variables={
    "AZURE_AI_PROJECT_ENDPOINT": os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    "MODEL_NAME": "gpt-4o-mini",
    "LOG_LEVEL": "INFO",
    "CUSTOM_CONFIG": "value"
}
```

**Thực Hành An Toàn Rất Trọng Tâm (Best Practice):** Cấm Không Bao Giờ Build Chuỗi Khóa Lộ Hardcode Biến Auth API Mật Khẩu Vô Raw Code Chữ Thô Cầm Chặn Đẩy KeyVault Khâu Bảo Mật Cloud Bơm Tầng Bảo Mật API Secret Vô...

## Error Code Cạm Bẫy API Code Thỉnh Thoảng Thường Cút Lỗi

| Lệnh Đọc Rớt API Code Thường Chặn Lại Xử Lý Tầm Thường (Error) | Tại Sao Sự Có Mặt Chọc Bể Đứt Build Container (Cause) | Hồi Phục Băng Báo Fix Vã API Tốc Chiếu Lỗi Cài Tool Code... (Solution) |
|-------|-------|----------|
| `ImagePullBackOff` | Quyền AcrPull cấm tải ACR Image Container | Add Map Roll Thêm Tầng System Cloud Identity Cấp Token Quyền Pass Tag ACR AcrPull Permission Map Pass |
| `InvalidContainerImage` | Tìm image path file không thấy Image Mất Dấu Not Found| Vào ACR Console Web Azure Lấy Tag Lại Tên ACR Path Chờ Tỉ Mỉ. |
| `CapabilityHostNotFound` | Thiếu Root Hub Gốc Cloud Máy Chủ Hub Cấu Hình Thiếu Set Chặn Quản Phễu | Gõ Mở Tag Capability Host Lên Root Cloud Lên True Lại. |
| `ProtocolVersionNotSupported` | Lái Version Tag API Quá Non Kệch Sai Map Request Support Trả Protocol Error Protocol Missing Return... | Viết Cho Cứng Code Vô Object Class `AgentProtocol.RESPONSES` Với version="v1" |

## Thực Hành Code An Toàn Best Practices Mở Rộng
1. **Chia Version Nhánh Cẩn Thận Mảng Image Build Code Bắn Chết Version:** Thay vì Tag Bản `latest` rớt sập hố nguy cơ đập nhau khi Merge Nút Revert Mất File. Dùng tag Cứng Vd Version Hash.
2. **Setup Resource Tối Thiểu Limit Min Thấp:** Thu Thuế Ram Thấp Sập Thắt Rẻ Từ Default Đẩy Nâng Ngước Khi Code Quá Tải Hút Out of Memory Bể Đám Lớn Tràn Cloud CPU Billing Thuộc Nặng Nợ Credit USD Billing Của System. Đánh Quý.  Chạy Theo Đòn Bẩy. Test Nhanh Ở Config Trái Trà Đá Cà Phê Size Thấp Nhất Rồi Load Cao Khi Lực Server Thật Vững Test Thục Code Load Ẹ Đỉnh. API Trace Debug Tool Sợ System Báo Dump Tối... Tóm Cột RAM Thấp Chậm.
