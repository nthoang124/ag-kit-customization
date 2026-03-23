---
name: agentmail
description: Hạ tầng Email dành cho các tác nhân AI (AI agents). Tạo tài khoản, gửi/nhận email, quản lý webhooks, và kiểm tra số dư karma (điểm uy tín) qua AgentMail API.
risk: safe
source: community
---

# AgentMail — Email dành cho AI Agents

AgentMail cung cấp cho các AI agent một địa chỉ email thật (đuôi `@theagentmail.net`) thông qua REST API. Các agent có thể gửi và nhận email, đăng ký tài khoản các dịch vụ (như GitHub, AWS, Slack, v.v.), và lấy mã xác thực. Hệ thống Karma (điểm uy tín) giúp ngăn chặn spam và giữ cho danh tiếng của tên miền chung luôn ở mức cao.

Base URL: `https://api.theagentmail.net`

## Hướng dẫn Bắt đầu (Quick start)

Tất cả các request đều yêu cầu truyền header `Authorization: Bearer am_...` (API key lấy từ trang dashboard).

### Tạo tài khoản email (-10 karma)

```bash
curl -X POST https://api.theagentmail.net/v1/accounts \
  -H "Authorization: Bearer am_..." \
  -H "Content-Type: application/json" \
  -d '{"address": "my-agent@theagentmail.net"}'
```

Kết quả trả về: `{"data": {"id": "...", "address": "my-agent@theagentmail.net", "displayName": null, "createdAt": 123}}`

### Gửi email (-1 karma)

```bash
curl -X POST https://api.theagentmail.net/v1/accounts/{accountId}/messages \
  -H "Authorization: Bearer am_..." \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["recipient@example.com"],
    "subject": "Hello from my agent",
    "text": "Plain text body",
    "html": "<p>Optional HTML body</p>"
  }'
```

Các trường tùy chọn: `cc`, `bcc` (mảng string), `inReplyTo`, `references` (dùng cho threading email), `attachments` (mảng `{filename, contentType, content}` trong đó content là chuỗi base64).

### Đọc hòm thư (Read inbox)

```bash
# Lấy danh sách tin nhắn
curl https://api.theagentmail.net/v1/accounts/{accountId}/messages \
  -H "Authorization: Bearer am_..."

# Lấy tin nhắn chi tiết (bao gồm cả nội dung body và file đính kèm)
curl https://api.theagentmail.net/v1/accounts/{accountId}/messages/{messageId} \
  -H "Authorization: Bearer am_..."
```

### Kiểm tra điểm Karma

```bash
curl https://api.theagentmail.net/v1/karma \
  -H "Authorization: Bearer am_..."
```

Kết quả: `{"data": {"balance": 90, "events": [...]}}`

### Đăng ký Webhook (Để nhận email Inbound thời gian thực)

```bash
curl -X POST https://api.theagentmail.net/v1/accounts/{accountId}/webhooks \
  -H "Authorization: Bearer am_..." \
  -H "Content-Type: application/json" \
  -d '{"url": "https://my-agent.example.com/inbox"}'
```

Dữ liệu webhook bắn về sẽ chứa 2 header bảo mật:
- `X-AgentMail-Signature` -- Mã băm HMAC-SHA256 hex của body request, mã hóa bằng webhook secret.
- `X-AgentMail-Timestamp` -- Timestamp milisecond ghi nhận thời điểm bắn webhook.

Cần Verify chữ ký và chặn các request có timestamp trễ quá 5 phút để tránh replay attacks:

```typescript
import { createHmac } from "crypto";

const verifyWebhook = (body: string, signature: string, timestamp: string, secret: string) => {
  if (Date.now() - Number(timestamp) > 5 * 60 * 1000) return false;
  return createHmac("sha256", secret).update(body).digest("hex") === signature;
};
```

### Tải File đính kèm

```bash
curl https://api.theagentmail.net/v1/accounts/{accountId}/messages/{messageId}/attachments/{attachmentId} \
  -H "Authorization: Bearer am_..."
```

Trả về URL để tải: `{"data": {"url": "https://signed-download-url..."}}`.

## Chi tiết Bảng API (API reference)

| Method | Path | Mô Tả | Karma |
|--------|------|-------------|-------|
| POST | `/v1/accounts` | Tạo account email | -10 |
| GET | `/v1/accounts` | List mọi accounts | |
| GET | `/v1/accounts/:id` | Xem chi tiết account | |
| DELETE | `/v1/accounts/:id` | Xóa account | +10 |
| POST | `/v1/accounts/:id/messages` | Gửi email | -1 |
| GET | `/v1/accounts/:id/messages` | List tin nhắn | |
| GET | `/v1/accounts/:id/messages/:msgId` | Xem full tin nhắn | |
| GET | `/v1/accounts/:id/messages/:msgId/attachments/:attId` | Lấy URL tải file đính kèm | |
| POST | `/v1/accounts/:id/webhooks` | Khai báo webhook | |
| GET | `/v1/accounts/:id/webhooks` | List webhooks | |
| DELETE | `/v1/accounts/:id/webhooks/:whId` | Xóa webhook | |
| GET | `/v1/karma` | Xem điểm balance + events | |

## Hệ thống Điểm Karma

Mỗi hành động sẽ tiêu tốn hoặc thưởng điểm karma:

| Sự kiện (Event) | Karma | Lý Do |
|---|---|---|
| `money_paid` | +100 | Mua credits bằng tiền |
| `email_received` | +2 | Ai đó reply từ một domain uy tín |
| `account_deleted` | +10 | Trả lại Karma khi bạn xóa một địa chỉ email |
| `email_sent` | -1 | Mất điểm khi gửi mail |
| `account_created` | -10 | Trừ điểm khi cắm account mới |

**Luật Kính Bắt Buộc:**
- Chỉ thưởng Karma khi nhận mail Inbound từ các nhà cung cấp tin cậy (Gmail, Outlook, Yahoo, iCloud, ProtonMail, Fastmail, Hey, v.v.). Email từ các domain rác/throwaway không được nhận điểm karma.
- Bạn chỉ kiếm được karma MỘT LẦN cho mỗi người gửi liên tiếp, cho tới khi agent có Phản hồi (Reply). Nếu người gửi X gửi cho bạn 5 email mà bạn không reply, chỉ tính điểm cho email đầu tiên. Bạn reply lại X, thì mail tiếp theo của họ mới lại được điểm.
- Khi điểm Karma về 0, hành động Send và Create Account sẽ báo lỗi HTTP 402. Luôn check balance.

## SDK TypeScript

```typescript
import { createClient } from "@agentmail/sdk";

const mail = createClient({ apiKey: "am_..." });

// Create account
const account = await mail.accounts.create({
  address: "my-agent@theagentmail.net",
});

// Send email
await mail.messages.send(account.id, {
  to: ["human@example.com"],
  subject: "Hello",
  text: "Sent by an AI agent.",
});

// Read inbox
const messages = await mail.messages.list(account.id);
const detail = await mail.messages.get(account.id, messages[0].id);

// Attachments
const att = await mail.attachments.getUrl(accountId, messageId, attachmentId);
// att.url là một đường link tải về hợp lệ đã dc ký

// Webhooks
await mail.webhooks.create(account.id, {
  url: "https://my-agent.example.com/inbox",
});

// Karma
const karma = await mail.karma.getBalance();
console.log(karma.balance);
```

## Các Mẫu Phổ Biến (Common patterns)

### Đăng ký tài khoản hệ thống và đọc Email Verification (Lấy mã xác thực)

```typescript
const account = await mail.accounts.create({
  address: "signup-bot@theagentmail.net",
});

// Dùng cái địa chỉ trên để đi sign up (bằng browser automation, API,...)

// Poll/lặp lại để đợi mail verify 
for (let i = 0; i < 30; i++) {
  const messages = await mail.messages.list(account.id);
  const verification = messages.find(m =>
    m.subject.toLowerCase().includes("verify") ||
    m.subject.toLowerCase().includes("confirm")
  );
  if (verification) {
    const detail = await mail.messages.get(account.id, verification.id);
    // Parse moi cái link/code từ detail.bodyText hoặc detail.bodyHtml ra
    break;
  }
  await new Promise(r => setTimeout(r, 2000));
}
```

### Gửi mail và đợi họ Rep

```typescript
const sent = await mail.messages.send(account.id, {
  to: ["human@company.com"],
  subject: "Question about order #12345",
  text: "Can you check the status?",
});

for (let i = 0; i < 60; i++) {
  const messages = await mail.messages.list(account.id);
  const reply = messages.find(m =>
    m.direction === "inbound" && m.timestamp > sent.timestamp
  );
  if (reply) {
    const detail = await mail.messages.get(account.id, reply.id);
    // Code xử lý reply ở đây...
    break;
  }
  await new Promise(r => setTimeout(r, 5000));
}
```
