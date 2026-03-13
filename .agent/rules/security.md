---
trigger: model_decision
description: Luôn áp dụng khi viết code liên quan xử lý dữ liệu, xác thực, đầu vào người dùng, hoặc tích hợp bên ngoài.
---

# Quy Tắc Bảo Mật (Security Rules)

> [!IMPORTANT]
> **BẮT BUỘC**: Bảo mật KHÔNG phải là việc bổ sung sau. Phải được tích hợp ngay từ thiết kế.

## 1. Quản Lý Bí Mật (CRITICAL)

- **TUYỆT ĐỐI KHÔNG** hardcode secrets (API keys, passwords, tokens) trong code.
- **LUÔN LUÔN** sử dụng Environment Variables (`process.env.VARIABLE`).
- **BẮT BUỘC** thêm `.env` vào `.gitignore`.
- **KIỂM TRA** `package.json` scripts đảm bảo không lộ secrets trong commands.
- **[XAI GUARDRAIL]**: **TUYỆT ĐỐI KHÔNG** in ra nguyên bản các credentials/secrets khi đang giải thích lý do lỗi cho người dùng (Xem chi tiết tại `explainability.md`). Bắt buộc dùng ký tự che lấp (masking).

```typescript
// ❌ TUYỆT ĐỐI KHÔNG
const API_KEY = 'sk-1234567890abcdef';

// ✅ LUÔN LUÔN
const API_KEY = process.env.API_KEY;
if (!API_KEY) throw new Error('API_KEY environment variable is required');
```

```python
# ❌ TUYỆT ĐỐI KHÔNG
DATABASE_URL = "postgresql://user:password@localhost/db"

# ✅ LUÔN LUÔN
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    api_key: str
    
    class Config:
        env_file = ".env"
```

## 2. Kiểm Tra Đầu Vào (OWASP A03:2021-Injection)

- **TUYỆT ĐỐI KHÔNG** tin tưởng input từ người dùng (params, body, headers, cookies).
- **LUÔN LUÔN** validate input bằng thư viện schema nghiêm ngặt (Zod, Valibot, Joi).
- **SANITIZE** dữ liệu trước khi render trong HTML để ngăn XSS.
- **PARAMETERIZE** SQL queries để ngăn SQL Injection (dùng ORM hoặc Prepared Statements).

```typescript
// ✅ Zod validation tại API boundary
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  age: z.number().int().min(13).max(150),
});

app.post('/users', (req, res) => {
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }
  // result.data đã được typed và validated
});
```

```python
# ✅ Pydantic validation
from pydantic import BaseModel, EmailStr, conint

class CreateUser(BaseModel):
    email: EmailStr
    name: str = Field(min_length=2, max_length=100)
    age: conint(ge=13, le=150)

@app.post("/users")
async def create_user(user: CreateUser):  # Tự động validated
    ...
```

## 3. Xác Thực & Phân Quyền

- **KIỂM TRA** xác thực (authentication) trên TẤT CẢ private routes/endpoints.
- **KIỂM TRA** phân quyền (authorization) *sau* xác thực (VD: "User này có thực sự được truy cập resource này không?").
- **TUYỆT ĐỐI KHÔNG** tự implement crypto. Dùng thư viện chuẩn (bcrypt, argon2, web-crypto).

## 4. Dependencies

- **TRÁNH** thêm dependencies không cần thiết.
- **AUDIT** dependencies thường xuyên để phát hiện lỗ hổng.

## 5. Phòng Thủ Chủ Động (Defensive Coding)

- **FAIL SAFE**: Hệ thống phải fail đóng (từ chối truy cập) thay vì mở.
- **THÔNG BÁO LỖI**: KHÔNG lộ stack traces hoặc internal paths cho end-users (phân biệt Production vs Dev).

## Quy Trình Quyết Định

```
┌─────────────────────────────────────────────────────────────┐
│ KHI viết function xử lý dữ liệu:                            │
│ 1. Có nhận input từ bên ngoài?                               │
│    CÓ → Thêm Zod validation schema.                         │
│ 2. Có truy cập database?                                     │
│    CÓ → Dùng ORM/Parameterized query. Kiểm tra phân quyền. │
│ 3. Có gọi API bên ngoài?                                     │
│    CÓ → Dùng env vars cho keys. Xử lý timeouts/errors.      │
└─────────────────────────────────────────────────────────────┘
```
