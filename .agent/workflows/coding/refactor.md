---
description: Dọn dẹp code, tối ưu hóa, giảm nợ kỹ thuật (không thay đổi tính năng).
type: procedure
risk: safe
source: self
required_skills:
  [
    Architecture/lead-architect,
    Development/backend-developer,
    Development/frontend-developer,
  ]
inputs: ["Legacy Code", "Deep Nested Logic", "Duplication"]
outputs: ["Refactored Code", "Clean Code"]
---

# Quy trình Refactor (`/refactor`)

> [!IMPORTANT]
> **NGUYÊN TẮC**: "Refactoring không làm thay đổi hành vi bên ngoài của code".
> Phải đảm bảo Test Pass 100% trước và sau khi refactor.

## Khi nào dùng (When to Use)

- Code quá dài (function > 50 dòng), nested quá sâu (> 3 levels).
- Code bị lặp (DRY violation): cùng logic xuất hiện ở 2+ chỗ.
- Naming convention không nhất quán hoặc khó hiểu.
- Tech debt đã được xác định trong project review.

## KHÔNG dùng khi (When NOT to Use)

- Code đang broken (test fail) → Fix bug trước, refactor sau.
- Đang thêm feature mới → Dùng `/cook` hoặc `/implement-feature`.
- Cần thay đổi hành vi (API, output) → Đó là feature change, không phải refactor.
- Chưa có test coverage → Dùng `/gen-tests` trước để có safety net.

## Điều kiện tiên quyết (Prerequisites)

- **Test coverage tối thiểu** cho code cần refactor — nếu chưa có, chạy `/gen-tests` trước.
- Đã commit/push code hiện tại (clean working tree).
- Xác định rõ **MỘT** mục tiêu refactor cụ thể (không refactor nhiều thứ cùng lúc).

---

## Best Practices

- **Micro-commits**: Commit sau mỗi bước nhỏ (rename → commit → extract method → commit).
- **Không trộn refactor với feature**: Nếu phát hiện cần feature mới, tạo task riêng.
- **Chạy test sau MỖI thay đổi**: Đảm bảo không break bất kỳ lúc nào.
- **Ưu tiên readability**: Code dễ đọc > code "thông minh".
- **Dùng IDE refactoring tools** khi có thể (Rename, Extract Method, Move File).

---

## Các bước thực hiện

### Bước 1: Xác định Phạm vi

// turbo

1.  Chọn **MỘT** mục tiêu cụ thể.
2.  **Baseline Check (BẮT BUỘC)**:
    - Chạy test hiện tại: `npm test` (hoặc tương đương).
    - Nếu Fail → **DỪNG LẠI**. Yêu cầu user fix bug trước khi refactor.
    - Nếu Pass → Tiếp tục.
3.  Nếu chưa có test, dùng `/gen-tests` để tạo test cover trước.

### Bước 2: Tạo Branch Refactor

// turbo

1.  Dùng `/git-branch` với prefix `refactor/`.
    - Ví dụ: `refactor/auth-service-split`.

### Bước 3: Thực hiện Refactor

// turbo

**Các kỹ thuật phổ biến**:

1.  **Extract Method**: Tách đoạn code dài thành hàm nhỏ có tên rõ nghĩa.
2.  **Rename Variable**: Đổi tên biến `a`, `b`, `c` thành `userEmail`, `isValidDate`.
3.  **Remove Dead Code**: Xóa code không dùng, comment cũ.
4.  **Apply Design Pattern**: Strategy, Factory, Observer... nếu phù hợp.

> 💡 **Lưu ý**: Commit thường xuyên sau mỗi bước nhỏ (Micro-commits).

### Bước 4: Verification

// turbo

1.  **Chạy Test**: `npm test` (hoặc tương đương).
2.  **So sánh**: Input/Output phải y hệt như trước.
3.  **Performance**: Đảm bảo không làm chậm hệ thống.

### Bước 5: Finalize

1.  Dùng `/git-commit` với type `refactor`.
2.  Tạo PR merge vào `dev`.

---

## Ví dụ Copy-Paste

```text
# Refactor service quá dài
/refactor Tách AuthService thành AuthService + TokenService + PasswordService.
Hiện tại auth.service.ts có 500 dòng, quá nhiều responsibilities.

# Refactor naming
/refactor Chuẩn hóa naming convention trong folder /src/utils:
đổi camelCase ↔ snake_case cho nhất quán.
```

---

## Giới hạn (Limitations)

- **BẮT BUỘC phải có test trước** — nếu không có test, refactor "mù" rất nguy hiểm.
- **Không thay đổi behavior** — nếu output thay đổi, đó KHÔNG phải refactor.
- **Chỉ refactor MỘT mục tiêu mỗi lần** — tránh refactor quá lớn, khó review.
- **Không refactor trong hotfix** — hotfix chỉ fix minimal.
- **Micro-commits bắt buộc** — nếu refactor bị hỏng giữa chừng, cần rollback dễ dàng.

---

## Workflow liên quan

- `/gen-tests` — Tạo test trước khi refactor.
- `/code-review` — Review kết quả refactor.
- `/project-review` — Tìm tech debt cần refactor.
- `/git-branch` — Tạo branch refactor ở Bước 2.
