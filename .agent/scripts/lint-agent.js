const fs = require('fs');
const path = require('path');

const agentDir = path.join(__dirname, '..');
const dirsToCheck = ['rules', 'skills', 'workflows'];

console.log('--- KHỞI ĐỘNG HỆ THỐNG KIỂM TOÁN AGENT (AGENT LINTER) ---');

let errorCount = 0;
let warnCount = 0;
let fileCount = 0;

dirsToCheck.forEach(dir => {
    const fullPath = path.join(agentDir, dir);
    if (!fs.existsSync(fullPath)) {
        console.error(`[LỖI CRITICAL] Thiếu thư mục cốt lõi: ${dir}`);
        errorCount++;
        return;
    }

    const checkFilesRecursive = (currentPath, isWf) => {
        const items = fs.readdirSync(currentPath);
        items.forEach(item => {
            const itemPath = path.join(currentPath, item);
            if (fs.statSync(itemPath).isDirectory()) {
                if (dir === 'workflows' || dir === 'skills') {
                    checkFilesRecursive(itemPath, isWf);
                }
            } else if (itemPath.endsWith('.md')) {
                const isRule = dir === 'rules';
                const isSkill = dir === 'skills' && item === 'SKILL.md';
                const isWorkflow = dir === 'workflows';

                if (isRule || isSkill || isWorkflow) {
                    fileCount++;
                    const content = fs.readFileSync(itemPath, 'utf8');

                    // 1. Check YAML Frontmatter
                    if (!content.trim().startsWith('---')) {
                        console.error(`[LỖI CÚ PHÁP] Tệp ${path.basename(itemPath)} thiếu chunk YAML Frontmatter ở đầu file.`);
                        errorCount++;
                    }

                    // 2. Check XAI Guardrails on High-Risk Workflows
                    if (isWorkflow && ['debug.md', 'hotfix.md', 'deploy.md', 'git-merge.md', 'incident.md'].includes(item)) {
                        if (!content.includes('[XAI]')) {
                            console.warn(`[CẢNH BÁO MỨC CAO] Tệp rủi ro ${item} chưa có cờ [XAI] đính kèm Lộ trình Lập luận/Attribution.`);
                            warnCount++;
                        }
                    }
                }
            }
        });
    }
    checkFilesRecursive(fullPath, dir === 'workflows');
});

// Check CATALOG.md sync
const catalogPath = path.join(agentDir, '..', 'CATALOG.md');
if (fs.existsSync(catalogPath)) {
    const catalog = fs.readFileSync(catalogPath, 'utf8');
    if (!catalog.match(/\]\(\.\/\.agent\/workflows\/.*\)/) && !catalog.match(/\]\(.*workflows\/.*\)/)) {
        console.warn(`[CẢNH BÁO ĐỒNG BỘ] Hình như CATALOG.md chưa được chạy "build-catalog.js". Tệp không thấy chứa liên kết thư mục cụ thể.`);
        warnCount++;
    }
} else {
    console.error(`[LỖI CRITICAL] Không tìm thấy CATALOG.md ở thư mục gốc.`);
    errorCount++;
}

console.log(`\nĐã quét qua ${fileCount} tệp cấu hình.`);
if (errorCount === 0 && warnCount === 0) {
    console.log('✅ [PASSED] HỆ THỐNG AGENT ĐẠT CHUẨN 10/10. Không phát hiện lỗi lầm hay cảnh báo nào.');
} else if (errorCount === 0 && warnCount > 0) {
    console.log(`⚠️ [WARNING] Linter pass nhưng có ${warnCount} Cảnh Báo cần lưu ý xử lý.`);
} else {
    console.log(`❌ [FAILED] Linter Thất Bại. Phát hiện ${errorCount} lỗi sinh tồn cần sửa ngay.`);
    process.exit(1);
}
