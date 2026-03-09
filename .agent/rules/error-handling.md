---
trigger: model_decision
description: Áp dụng khi viết code có gọi API, thao tác database, dịch vụ bên ngoài, hoặc bất kỳ operation nào có thể fail.
---

# Error Handling Standards

> [!IMPORTANT]
> **BẮT BUỘC**: Mọi operation có thể fail PHẢI có error handling rõ ràng. Silent failures là bugs.

## 1. Nguyên tắc cốt lõi

1.  **Fail Fast, Fail Loud**: Phát hiện lỗi sớm, thông báo rõ ràng.
2.  **Never Swallow Errors**: Không bao giờ catch mà không xử lý.
3.  **Structured Errors**: Dùng error codes, không chỉ message strings.
4.  **Graceful Degradation**: Hệ thống phải hoạt động (hạn chế) khi dependency fail.

## 2. Error Response Format

Mọi API error PHẢI theo format thống nhất:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email không hợp lệ",
    "details": [
      { "field": "email", "reason": "invalid_format" }
    ]
  }
}
```

**HTTP Status Codes:**

| Code | Khi nào dùng |
|:---:|:---|
| 400 | Input validation failed |
| 401 | Chưa authenticated |
| 403 | Không có quyền (authenticated nhưng forbidden) |
| 404 | Resource không tồn tại |
| 409 | Conflict (duplicate, concurrent edit) |
| 422 | Business logic error (valid input nhưng logic sai) |
| 429 | Rate limit exceeded |
| 500 | Server error (unexpected) |
| 503 | Service unavailable (dependency down) |

## 3. Patterns Bắt Buộc

### TypeScript/JavaScript

```typescript
// ✅ Correct: Specific error types + structured response
try {
  const user = await userService.findById(id);
  if (!user) throw new NotFoundException('User', id);
  return user;
} catch (error) {
  if (error instanceof NotFoundException) {
    throw error; // Let framework handle
  }
  logger.error('Failed to fetch user', { userId: id, error });
  throw new InternalServerError('Unable to process request');
}

// ❌ Wrong: Swallowing errors
try {
  await sendEmail(user.email);
} catch (e) {
  // Silent fail — email never sent, no one knows
}
```

### Python

```python
# ✅ Correct: Specific exceptions + logging
try:
    user = await user_repo.get_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
except HTTPException:
    raise  # Re-raise HTTP exceptions
except Exception as e:
    logger.error(f"Failed to fetch user {user_id}", exc_info=True)
    raise HTTPException(status_code=500, detail="Internal server error")

# ❌ Wrong: Bare except
try:
    result = process_data(raw)
except:  # NEVER do this
    pass
```

## 4. Retry Pattern

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  options: { maxRetries: number; delayMs: number; backoff: number }
): Promise<T> {
  let lastError: Error;
  for (let i = 0; i <= options.maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < options.maxRetries) {
        await sleep(options.delayMs * Math.pow(options.backoff, i));
      }
    }
  }
  throw lastError!;
}

// Usage
const data = await withRetry(() => fetchFromAPI(url), {
  maxRetries: 3, delayMs: 1000, backoff: 2
});
```

## 5. Decision Flow

```
┌─────────────────────────────────────────────────────────────┐
│ WHEN viết code có operation có thể fail:                    │
├─────────────────────────────────────────────────────────────┤
│ 1. Có external call (API, DB, File I/O)?                    │
│    YES → Wrap trong try/catch + specific error types        │
│ 2. Có thể retry?                                            │
│    YES → Dùng retry pattern (max 3, exponential backoff)    │
│    NO  → Fail fast, log error, return clear message         │
│ 3. Error có cần user biết?                                  │
│    YES → Return structured error response                   │
│    NO  → Log + alert, return generic message                │
│ 4. Critical dependency down?                                │
│    YES → Circuit breaker / fallback / graceful degradation  │
└─────────────────────────────────────────────────────────────┘
```

## 6. Anti-Patterns

- ❌ `catch (e) {}` — Silent swallow
- ❌ `catch (e) { console.log(e) }` — Log nhưng không handle
- ❌ `throw new Error('Something went wrong')` — Vague message
- ❌ `throw error.message` — Mất stack trace
- ❌ Return `null` thay vì throw — Caller không biết có lỗi
