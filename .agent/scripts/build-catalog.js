const fs = require('fs');
const path = require('path');

const agentDir = path.join(__dirname, '..');
const catalogPath = path.join(agentDir, '..', 'CATALOG.md');

console.log('--- AUTO-BUILD CATALOG.MD ---');

// Helper to parse YAML frontmatter
function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return {};
    const lines = match[1].split(/\r?\n/);
    const result = {};
    lines.forEach(line => {
        const idx = line.indexOf(':');
        if (idx !== -1) {
            let val = line.slice(idx + 1).trim();
            // Remove surround quotes if any
            if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
            else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
            result[line.slice(0, idx).trim()] = val;
        }
    });
    return result;
}

const workflows = [];
const wDir = path.join(agentDir, 'workflows');

// Recursively find all workflow markdown files
const scanWorkflows = (dir) => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fPath = path.join(dir, file);
        if (fs.statSync(fPath).isDirectory()) {
            scanWorkflows(fPath);
        } else if (fPath.endsWith('.md')) {
            const content = fs.readFileSync(fPath, 'utf8');
            const meta = parseFrontmatter(content);
            const cmd = `/${file.replace('.md', '')}`;
            
            // Format path relative to Antigravity-agent root
            // e.g., Agent/.agent/workflows/debugging/debug.md
            const relPathToCatalog = path.relative(path.join(agentDir, '..'), fPath).replace(/\\/g, '/');
            
            workflows.push({
                cmd,
                path: relPathToCatalog,
                desc: meta.description || 'Không mô tả',
                risk: meta.risk || 'none',
                type: meta.type || 'unknown',
                orderDir: path.dirname(fPath).split(path.sep).pop()
            });
        }
    });
};

scanWorkflows(wDir);

// Read current CATALOG and rebuild Workflow section
if (!fs.existsSync(catalogPath)) {
    console.error('[LỖI] Không tìm thấy tệp CATALOG.md');
    process.exit(1);
}

const catalogContent = fs.readFileSync(catalogPath, 'utf8');
const lines = catalogContent.split(/\r?\n/);
let inWorkflowSection = false;
let newLines = [];
let totalAdded = 0;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## Workflows (')) {
        inWorkflowSection = true;
        newLines.push(`## Workflows (${workflows.length})`);
        newLines.push('');
        
        // Group files by its direct parent directory
        const groups = {};
        workflows.forEach(w => {
            const groupName = w.orderDir === 'workflows' ? 'root' : w.orderDir;
            if(!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(w);
        });

        // Mapping friendly emoji/name
        const dirMeta = {
            'meta': '🔧 Meta',
            'analysis': '💡 Lên Ý Tưởng & Phân Tích',
            'coding': '🛠️ Code & Implement',
            'debugging': '🐛 Debug & Fix',
            'testing': '✅ Quality & Testing',
            'git-deploy': '📦 Git & Deploy',
            'docs': '📝 Documentation',
            'management': '⚙️ Agent Management',
            'macro': '👑 Macro Workflows',
            'root': '📂 Root Workflows'
        };

        for (const [key, name] of Object.entries(dirMeta)) {
            const list = groups[key];
            if (!list || list.length === 0) continue;
            
            newLines.push(`### ${name} (${list.length})`);
            newLines.push('');
            newLines.push(`| Workflow | Tham chiếu (File) | Mô tả | Risk |`);
            newLines.push(`| --- | --- | --- | --- |`);
            
            list.forEach(w => {
                const cmdClean = w.cmd.startsWith('/_') ? w.cmd.replace('/', '') : w.cmd;
                const riskEmoji = w.risk === 'critical' ? '🔴' : (w.risk === 'safe' ? '🟢' : '⚪');
                newLines.push(`| \`${cmdClean}\` | [${path.basename(w.path)}](./${w.path}) | ${w.desc} | ${riskEmoji} ${w.risk} |`);
                totalAdded++;
            });
            newLines.push('');
        }
        
    } else if (inWorkflowSection && lines[i].startsWith('## Thống Kê')) {
        inWorkflowSection = false;
        newLines.push(lines[i]);
    } else if (!inWorkflowSection) {
        newLines.push(lines[i]);
    }
}

// Write back
fs.writeFileSync(catalogPath, newLines.join('\n'), 'utf8');
console.log(`✅ [THÀNH CÔNG] Đã rebuild CATALOG.md với ${totalAdded} workflows và đường dẫn Hierarchy Path chuẩn xác.`);
