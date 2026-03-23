---
name: agents-md
description: Kỹ năng này được kích hoạt khi người dùng yêu cầu "tạo AGENTS.md", "cập nhật AGENTS.md", "bảo trì tài liệu của agent", "thiết lập CLAUDE.md", hoặc khi cần giữ cho các hướng dẫn dành cho agent thật ngắn gọn. Bắt buộc áp dụng các best practice đã được nghiên cứu nhằm tạo ra bộ tài liệu agent tối giản, mang lại tín hiệu/ngữ cảnh (high-signal) tốt nhất.
risk: unknown
source: community
---

# Bảo Trì AGENTS.md (Maintaining AGENTS.md)

`AGENTS.md` là tài liệu chính quy (canonical docs) hướng thẳng đến mặt đọc hiểu của agent. Hãy giữ nó thật tối giản—các agent rất thông minh và không cần phải "cầm tay chỉ việc". Mục tiêu tối ưu là dưới 60 dòng; không bao giờ được vượt quá 100 dòng. Chất lượng tuân thủ yêu cầu của bot sẽ tỷ lệ nghịch với độ dài của file văn bản. File càng dài, bot càng bị sao nhãng ngớ ngẩn.

## Cài đặt Tệp

1. Tạo file `AGENTS.md` ở ngay gốc thư mục dự án (project root).
2. Tạo symlink trỏ song song (tùy chọn): `ln -s AGENTS.md CLAUDE.md`

## Trước Khi Viết Docs

Phân tích project để hiểu cái gì mới ĐÁNG đưa vào file:

1. **Trình quản lý Gói (Package manager)** — Nhìn các lock files (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, `uv.lock`, `poetry.lock`)
2. **Cấu hình Linter/Formatter** — Quét qua coi có file `.eslintrc`, `biome.json`, `ruff.toml`, `.prettierrc`, v.v. (Tuyệt đối ĐỪNG bê bộ rules này viết lại vào AGENTS.md kẻo thừa thãi)
3. **Các Lệnh Build/CI** — Kiểm tra `Makefile`, mục scripts trong `package.json`, và CI configs xem lệnh chuẩn nào đang dùng build là gì.
4. **Dấu hiệu Monorepo (Monorepo indicators)** — Tìm `pnpm-workspace.yaml`, `nx.json`, Cargo workspace, hoặc đống `package.json` nằm vương vãi ở thư mục con.
5. **Các quy ước hiện hành (Conventions)** — Quét xem có file CONTRIBUTING.md, docs/, hoặc README nào trước đó chưa.

## Các Quy Tắc Viết Format

- **Headers + Bullets (Dùng Tiêu đề + Gạch đầu dòng)** — KHÔNG viết văn thành đoạn dài thòng lòng (No paragraphs).
- **Code blocks** — Gói Cú pháp Lệnh (commands) và Mẫu code (templates) vào Box.
- **Reference, don't embed (Trỏ tới, Chứ đừng Bê Vô)** — Tái định tuyến sang file docs hiện có: "See `CONTRIBUTING.md` for setup" hoặc "Phía theo pattern ở `src/api/routes/`".
- **No filler (Cấm Văn Mẫu đọn lót)** — KHÔNG BƯỞNG (No intros), không mở bài thân bài kết bài cởi mở thân thiện làm gì.
- **Trust capabilities (Tin Tưởng Năng Lực)** — Lược bỏ những dặn dò bối cảnh AI vốn dĩ dư sức biết.
- **Thích các Lệnh Tác Động Từng File Hơn (Prefer file-scoped commands)** — Lệnh test/lint/typecheck trên Từng File sẽ chạy Nhanh hơn Mở build Full Project.
- **Đừng lặp lại Linter** — Code style (phong cách thụt dòng) đã được Linter Config lo, đừng viết nó vào AGENTS.md.

## Bắt Buộc Có Các Bảng Sau (Required Sections)

### Package Manager
Dùng Tool gì và vài Lệnh mấu chốt:
```markdown
## Package Manager
Sử Dụng **pnpm**: `pnpm install`, `pnpm dev`, `pnpm test`
```

### Các Lệnh Tính Trên Từng File (File-Scoped Commands)
Các câu lệnh build chay này rẻ & nhanh. Luôn luôn kèm nó vào:
```markdown
## Các lệnh Scope The File
| Nhiệm Vụ | Mã Lệnh (Command) |
|------|---------|
| Kiểm tra kiểu (Typecheck) | `pnpm tsc --noEmit path/to/file.ts` |
| Bắt lỗi Lint | `pnpm eslint path/to/file.ts` |
| Test file | `pnpm jest path/to/file.test.ts` |
```

### Đóng Dấu Bản Quyền Ghi Nhận Commit (Commit Attribution)
Luôn luôn nhúng cái này. Bắt AI bot tôn trọng Identity gốc của nó:
```markdown
## Tín Dụng Commit (Commit Attribution)
Mỗi lúc AI đụng tay Commit BẮT BUỘC ghi vào:
```
Co-Authored-By: (Tên agent model và byline author)
```
Ví Dụ Hát Máu: `Co-Authored-By: Claude Sonnet 4 <noreply@example.com>`
```

### Đặc Tả Chỉ Tiêu Dành Riêng Cho Repository (Key Conventions)
Quy chuẩn đặc tả cho một pattern riêng biệt của bộ Project. Ngắn gọn thôi nha.

## Biểu Mẫu Tùy Chọn Thêm (Optional Sections)

Chỉ thêm nếu Thực Sự Cần Thiết:
- Mẫu code khai cấu trúc URL API routes (chỉ show Mẫu code, không Văn giải nghĩa vòng vo)
- Lệnh Terminal CLI phụ (Dạng Table Bảng biểu)
- Convention Đặt File Naming
- Tủ Cấu Trúc File dự án (chỉ trỏ đến File quan trọng, nhắc bot Né Code cũ - legacy)
- Quy chế Nới Rộng Monorepo.

## Những Cấm Kỵ Phun Viết Rác (Anti-Patterns)
CẮT XÉN / BỎ GỌN những loại câu sau:
- "Chào Mừng đến Tệp..." / "Tài Liệu Này sẽ Giải Thích Rằng..."
- "Bạn Cần Phải Có Trách nhiệm Thiết Lập..."
- Tuôn lặp Rules của Biome, ESLint, Prettier. Ngay cả plugin cũng vậy.
- Những Căn Dặn Hiển Nhiên Vớ Vẩn ("Hãy Chạy Bug Fix Đi", "Nhớ Viết Code Sạch Nhé").
- Toàn Đoạn Văn Xuôi Lảm Nhảm Không Trọng Điểm.

## Cấu Trúc Khung Mẫu Chuẩn Ví Dụ (Example Structure)

```markdown
# Agent Instructions

## Quản Lý Gói Package (Package Manager)
Sử Dụng **pnpm**: `pnpm install`, `pnpm dev`

## Commit Attribution
Mỗi Commit BOT Sinh Ra PHẢI chứa:
```
Co-Authored-By: (tên agent model và mail nguồn author)
```

## Các lệnh File Scope (File-Scoped Commands)
| Task | Lệnh |
|------|---------|
| Typecheck | `pnpm tsc --noEmit path/to/file.ts` |
| Lint | `pnpm eslint path/to/file.ts` |
| Test | `pnpm jest path/to/file.test.ts` |

## API Routes
[Template code block]

## CLI
| Command | Ý Nghĩa (Description) |
|---------|-------------|
| `pnpm cli sync` | Kích Đồng Bộ Hóa Data |
```
