# OWASP Top 10 Giảm thiểu rủi ro

1. **Broken Access Control**: Đảm bảo mọi Endpoint đều được kiểm tra phân quyền (RBAC/ABAC). Không dùng Parameter ID trực tiếp.
2. **Cryptographic Failures**: Luôn dùng HTTPS. Salt và Hash mật khẩu với bcrypt/Argon2. Không tự code thuật toán mã hóa.
3. **Injection**: Kiểm soát input đầu vào. Dùng Prepared Statements/ORM cho SQL. Escape data trước khi render lên UI (XSS).
4. **Insecure Design**: Threat modeling ngay từ lúc thiết kế hệ thống.
5. **Security Misconfiguration**: Vô hiệu hóa tính năng default của third-party, update môi trường Production xóa bỏ debug messages.
