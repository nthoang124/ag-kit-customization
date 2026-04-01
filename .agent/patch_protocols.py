import os
import glob

# Ensure we're in the workflows directory
base_dir = r"c:\Users\NITRO\Documents\AI-agent\ag-kit-customization\.agent\workflows"

files_to_patch = [
    r"git-deploy\git-branch.md",
    r"git-deploy\git-commit.md",
    r"git-deploy\git-merge.md",
    r"git-deploy\git-pr.md",
    r"git-deploy\git-sync.md",
    r"testing\code-review.md",
    r"testing\gen-tests.md",
    r"testing\integration-test.md",
    r"testing\performance-audit.md",
    r"testing\qa.md",
    r"testing\security-audit.md",
    r"analysis\research.md",
    r"analysis\ui-ux-design.md",
    r"coding\bootstrap.md",
    r"coding\refactor.md",
    r"macro\incident.md",
    r"management\custom-behavior.md"
]

yaml_addition = """context_from: ["/bất_kỳ"]
context_to: ["/bất_kỳ"]
context_artifacts:
  receives: ["task.md"]
  produces: []"""

md_addition = """

---

## Context Protocol

### Nhận Context (Input)
- **Từ `{{args}}`**: Các tham số inline truyền vào từ lệnh gọi.
- **Từ filesystem (`context_artifacts.receives`)**: Đọc file `task.md` hiện hành để nắm bắt state trước khi chạy.

### Truyền Context (Output)  
- **Cho workflow tiếp theo (`context_artifacts.produces`)**: Không bắt buộc sinh file artifact cấp cao trừ khi workflow ghi rõ. Thay đổi chủ yếu ở cấu trúc dự án.

### Fallback
- Nếu input rỗng hoặc không có context: Tự động xin ý kiến User hoặc quét Git Status hiện hành.

---

## Error Recovery

> Tuân thủ `_workflow-protocol.md` — 3 cấp: Self-Heal → Rollback Step → Escalate.

### Recovery Map

| Step lỗi | Cấp 1: Self-Heal | Cấp 2: Rollback | Cấp 3: Escalate |
|:---|:---|:---|:---|
| Lệnh CLI/Test fail hoặc Lỗi phân tích | Xem logs, sửa syntax/params và chạy lại (max 3 lần) | Khôi phục trạng thái Git ẩn hoặc undo file | Báo cáo chi tiết bug để User quyết định |
| Đứt gãy Context | Tự đọc lại log hệ thống | Không áp dụng | Hỏi User cấp lại Context |
"""

for f in files_to_patch:
    path = os.path.join(base_dir, f)
    if not os.path.exists(path):
        print(f"File not found: {path}")
        continue
        
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # Check if already patched
    if "Context Protocol" in content:
        print(f"Already patched: {path}")
        continue
        
    # Inject YAML
    parts = content.split("---")
    if len(parts) >= 3:
        # parts[0] is empty (before first ---)
        # parts[1] is the frontmatter
        # parts[2] is the rest
        frontmatter = parts[1]
        
        # Inject standard frontmatter
        if "context_from" not in frontmatter:
            frontmatter = frontmatter.rstrip() + "\n" + yaml_addition + "\n"
        
        # Reconstruct
        new_content = parts[0] + "---" + frontmatter + "---" + "---".join(parts[2:])
        
        # Append MD
        new_content = new_content.rstrip() + md_addition
        
        with open(path, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Successfully patched: {path}")
    else:
        print(f"Could not parse YAML frontmatter for: {path}")

print("Done patching.")
