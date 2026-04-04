const fs = require('fs');
const path = require('path');

const agentDir = path.join(__dirname, '..');
const catalogPath = path.join(agentDir, '..', 'CATALOG.md');

console.log('--- AUTO-BUILD CATALOG.MD ---');

// Helper to parse YAML frontmatter
function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return null;
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

const items = [];
const scanDir = (dir, category) => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fPath = path.join(dir, file);
        if (fs.statSync(fPath).isDirectory()) {
            // Skips deep nested reference folders to keep catalog clean
            if (['references', 'examples', 'temp', 'logs'].includes(file)) return;
            scanDir(fPath, category);
        } else if (fPath.endsWith('.md')) {
            const content = fs.readFileSync(fPath, 'utf8');
            const meta = parseFrontmatter(content);
            
            // CRITICAL FILTER: Only include files with proper metadata
            // Internal docs/references shouldn't clutter the catalog
            if (!meta || (!meta.type && !meta.description)) return;

            const name = file.replace('.md', '');
            const relPathToCatalog = path.relative(path.join(agentDir, '..'), fPath).replace(/\\/g, '/');
            
            items.push({
                category,
                name: category === 'workflow' ? `/${name}` : name,
                path: relPathToCatalog,
                desc: meta.description || 'Không mô tả',
                risk: meta.risk || 'none',
                type: meta.type || 'unknown',
                orderDir: path.dirname(fPath).split(path.sep).pop()
            });
        }
    });
};

// Scan sectors
scanDir(path.join(agentDir, 'workflows'), 'workflow');
scanDir(path.join(agentDir, 'skills'), 'skill');

// Grouping
const workflows = items.filter(i => i.category === 'workflow');
const skills = items.filter(i => i.category === 'skill');

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
    'root': '📂 Root Workflows',
    'Architecture': '🏗️ Architecture',
    'Development': '💻 Development',
    'Testing_Security': '🛡️ Testing & Security',
    'Workflows_Tools': '🛠️ Tools',
    'agent': '🤖 System Agent',
    'analyze': '🔍 Analysis'
};

function generateSection(title, list) {
    let lines = [`## ${title} (${list.length})`, ''];
    if (list.length === 0) return lines.join('\n');

    const groups = {};
    list.forEach(i => {
        const groupKey = i.orderDir === 'workflows' || i.orderDir === 'skills' ? 'root' : i.orderDir;
        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(i);
    });

    for (const [key, name] of Object.entries(dirMeta)) {
        const groupList = groups[key];
        if (!groupList || groupList.length === 0) continue;
        
        lines.push(`### ${name} (${groupList.length})`);
        lines.push('');
        lines.push(`| Tên | Tham chiếu (File) | Mô tả | Risk |`);
        lines.push(`| --- | --- | --- | --- |`);
        
        groupList.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
            const riskEmoji = item.risk === 'critical' ? '🔴' : (item.risk === 'safe' ? '🟢' : '⚪');
            const cleanName = item.name.startsWith('/_') ? item.name.substring(1) : item.name;
            lines.push(`| \`${cleanName}\` | [${path.basename(item.path)}](./${item.path}) | ${item.desc} | ${riskEmoji} ${item.risk} |`);
        });
        lines.push('');
    }
    return lines.join('\n');
}

const newCatalogContent = [
    '# Workflow & Skill Catalog',
    '',
    'Tài liệu liệt kê tất cả các khả năng (Workflows & Skills) của hệ thống.',
    '',
    generateSection('Workflows', workflows),
    '',
    generateSection('Skills', skills),
    '',
    '## Thống Kê',
    `- Tổng số workflows: ${workflows.length}`,
    `- Tổng số skills: ${skills.length}`,
    `- Cập nhật lần cuối: ${new Date().toISOString().split('T')[0]}`,
    '',
    '---',
    '*Tài liệu này được tạo tự động bởi `build-catalog.js`*'
].join('\n');

fs.writeFileSync(catalogPath, newCatalogContent, 'utf8');
console.log(`✅ [THÀNH CÔNG] Đã rebuild CATALOG.md với ${workflows.length} workflows và ${skills.length} skills.`);
