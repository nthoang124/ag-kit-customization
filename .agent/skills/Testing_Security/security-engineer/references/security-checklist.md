# Security Audit Checklist

## Kiểm tra Authentication
- [ ] Không cho phép email/password dễ đoán.
- [ ] Có cơ chế giới hạn thử nghiệm Mật khẩu (Rate Limit đăng nhập sai).
- [ ] Xử lý Forgot Password không tiết lộ email có tồn tại hay không.

## Kiểm tra Authorization
- [ ] Mọi Resource (Edit, Delete) đều kiểm tra User ID truy cập có khớp với chủ sở hữu (Owner) hay không.
- [ ] Verify JWT bao gồm Expiration và Audience hợp lệ.

## Data Validation
- [ ] Dùng thư viện schema validation (Zod, Joi, Pydantic).
- [ ] Không tin tưởng Header (ví dụ x-forwarded-for dễ bị spoof).
