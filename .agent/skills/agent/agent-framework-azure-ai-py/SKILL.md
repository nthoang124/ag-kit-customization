---
name: agent-framework-azure-ai-py
description: "Xây dựng các agent có tính bền bỉ (persistent agents) trên nền tảng Azure AI Foundry bằng Microsoft Agent Framework Python SDK."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Agent Framework Azure Hosted Agents

Xây dựng các agent lưu trạng thái (vượt ra khỏi 1 session chat) trên Azure AI Foundry bằng bộ SDK Python Microsoft Agent Framework.

## Sơ Đồ Kiến Trúc (Architecture)

```
User Query (Câu Hỏi) → AzureAIAgentsProvider → Azure AI Agent Service (Dịch Vụ Nòng Cốt)
                     ↓
               Agent.run() / Agent.run_stream()
                     ↓
               Công Cụ (Tools): Hàm Code | Lưu trữ đám mây (Code/Search/Web) | MCP
                     ↓
               Luồng Ký ức (AgentThread)
```

## Cài Đặt (Installation)

```bash
# Cài bản framework đầy đủ (Khuyên dùng)
pip install agent-framework --pre

# Hoặc cài bản tinh gọn chỉ riêng hàm Azure-specific package
pip install agent-framework-azure-ai --pre
```

## Các Biến Của Môi Trường (Environment Variables)

```bash
export AZURE_AI_PROJECT_ENDPOINT="https://<project>.services.ai.azure.com/api/projects/<project-id>"
export AZURE_AI_MODEL_DEPLOYMENT_NAME="gpt-4o-mini"
export BING_CONNECTION_ID="your-bing-connection-id"  # Dành cho tìm kiếm web Bing
```

## Xác Thực Đăng Nhập Hệ Thống (Authentication)

```python
from azure.identity.aio import AzureCliCredential, DefaultAzureCredential

# Môi trường Dev (Development)
credential = AzureCliCredential()

# Môi trường Chạy Thật Trên Chuyền (Production)
credential = DefaultAzureCredential()
```

## Quy Trình Cốt Lõi (Core Workflow)

### Agent Căn Bản (Basic Agent)

```python
import asyncio
from agent_framework.azure import AzureAIAgentsProvider
from azure.identity.aio import AzureCliCredential

async def main():
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentsProvider(credential=credential) as provider,
    ):
        agent = await provider.create_agent(
            name="MyAgent",
            instructions="Bạn là một trợ lý ảo siêu hữu ích.",
        )
        
        result = await agent.run("Xin chào!")
        print(result.text)

asyncio.run(main())
```

### Chạy Agent Có Thể Gọi Hàm Cục Bộ (Agent with Function Tools)

```python
from typing import Annotated
from pydantic import Field
from agent_framework.azure import AzureAIAgentsProvider
from azure.identity.aio import AzureCliCredential

def get_weather(
    location: Annotated[str, Field(description="Tên Thành Phố")],
) -> str:
    """Chức Năng lấy thời tiết gốc."""
    return f"Thời Tiết Ở Nơi Đó Là {location}: 25 độ C, nắng ấm."

def get_current_time() -> str:
    """Lấy Múi Giờ UTC Chuẩn."""
    from datetime import datetime, timezone
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

async def main():
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentsProvider(credential=credential) as provider,
    ):
        agent = await provider.create_agent(
            name="WeatherAgent",
            instructions="Bạn giải quyết các câu hỏi về thời tiết và thời gian.",
            tools=[get_weather, get_current_time],  # Đưa thẳng các hàm Code Local Vào List Tools
        )
        
        result = await agent.run("Thời tiết Seattle thế nào?")
        print(result.text)
```

### Agent Với Các Tool Chạy Trên Server (Agent with Hosted Tools)

```python
from agent_framework import (
    HostedCodeInterpreterTool,
    HostedFileSearchTool,
    HostedWebSearchTool,
)
from agent_framework.azure import AzureAIAgentsProvider
from azure.identity.aio import AzureCliCredential

async def main():
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentsProvider(credential=credential) as provider,
    ):
        agent = await provider.create_agent(
            name="MultiToolAgent",
            instructions="Bạn có thể chạy lệnh code, search web linh tinh.",
            tools=[
                HostedCodeInterpreterTool(),
                HostedWebSearchTool(name="Bing"),
            ],
        )
        
        result = await agent.run("Dùng python tính giai thừa của 20")
        print(result.text)
```

### Phóng Text (Streaming Responses) Rơi Chữ Vào Consoles

```python
async def main():
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentsProvider(credential=credential) as provider,
    ):
        agent = await provider.create_agent(
            name="StreamingAgent",
            instructions="Bạn là trợ lý thân thiết.",
        )
        
        print("Agent: ", end="", flush=True)
        async for chunk in agent.run_stream("Kể 1 câu chuyện vui xem nào"):
            if chunk.text:
                print(chunk.text, end="", flush=True)
        print()
```

### Các Luồng Trí Nhớ Lưu Cuộc Hội Thoại Dài (Conversation Threads)

```python
from agent_framework.azure import AzureAIAgentsProvider
from azure.identity.aio import AzureCliCredential

async def main():
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentsProvider(credential=credential) as provider,
    ):
        agent = await provider.create_agent(
            name="ChatAgent",
            instructions="Bạn là trợ lý giải đáp.",
            tools=[get_weather],
        )
        
        # Cấp luồng ID Mới Cứng (Khởi Tạo Hội Thoại Lắng Nghe Trí Nhớ)
        thread = agent.get_new_thread()
        
        # Turn Đầu
        result1 = await agent.run("Thời tiết Seattle sao?", thread=thread)
        print(f"Agent: {result1.text}")
        
        # Turn 2 - Bot vẫn Tự Hiểu (Context được nhớ)
        result2 = await agent.run("Thế còn Portland?", thread=thread)
        print(f"Agent: {result2.text}")
        
        # Ghi Lại Cái Thread ID để Khi Chạy File Lần Sau Thả vào Lại Nhớ Từ Đầu Tiếp
        print(f"Conversation ID: {thread.conversation_id}")
```

### Cấu Trúc Trả JSON Chặt Chẽ (Structured Outputs)

```python
from pydantic import BaseModel, ConfigDict
from agent_framework.azure import AzureAIAgentsProvider
from azure.identity.aio import AzureCliCredential

class WeatherResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")
    
    location: str
    temperature: float
    unit: str
    conditions: str

async def main():
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentsProvider(credential=credential) as provider,
    ):
        agent = await provider.create_agent(
            name="StructuredAgent",
            instructions="Nôn Ra Form Weather Mẫu Code Chặt Chẽ JSON Base.",
            response_format=WeatherResponse,
        )
        
        result = await agent.run("Nhiệt Độ Seattle?")
        # Force Èn Đít Validation Json Trả Về Khớp Nhanh
        weather = WeatherResponse.model_validate_json(result.text)
        print(f"{weather.location}: {weather.temperature}°{weather.unit}")
```

## Bảng Cấu Hình Trỏ Tắt Tool Ở Azure
| Tool | Lệnh Đăng Ký Viết Tắt (Import) | Bản Lề Chức Năng (Purpose) |
|------|--------|---------|
| `HostedCodeInterpreterTool` | `from agent_framework import HostedCodeInterpreterTool` | Chạy Lệnh Thực Thi Code Dịch Code Python Ra Terminal |
| `HostedFileSearchTool` | `from agent_framework import HostedFileSearchTool` | Tìm File Index CSDL Vectơ Lõi Search |
| `HostedWebSearchTool` | `from agent_framework import HostedWebSearchTool` | Cầm Chìa Khóa Quét Tìm Web Search |
| `HostedMCPTool` | `from agent_framework import HostedMCPTool` | MCP Máy Chủ Microsoft Service Quản. |

## Quy Ước Bắt Buộc (Conventions)

- Thấm Code Vào Bó Context Manager Mở Dấu Rẽ Nhánh Asyn: `async with provider:`
- Gắn Lệnh Cứng Method Vào List mảng Gọi `tools=[]` parameter (Library tự Độn Máng Sang Schema API Call).
- Phải xài Cú Pháp Mẫu Chủng Python Hint: `Annotated[type, Field(description=...)]` để máy hiểu Hàm Đầu Vào Type Gì .
- Gọi Check Khởi Động: `get_new_thread()` Để Đăng Ký Turn Giao Tiếp Qua Lại Không Quên Não Lớp Context Hội Thoại.

## Khi Nào Cân Vận Dụng Đọc SKILL (When to Use)
Kỹ năng này áp dụng để thực thi các workflow hoặc hành động dựng hạ tầng LLM Framework được mô tả trong phần tổng quan.
