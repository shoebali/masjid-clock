const fs = require('fs');
const path = require('path');

// Configuration
const OUT_DIR = path.join(__dirname, 'out');
const OLD_DIR_NAME = '_next';
const NEW_DIR_NAME = 'assets';

// 1. Rename _next folder to assets (Android/WebView often blocks directories starting with underscores)
const oldPath = path.join(OUT_DIR, OLD_DIR_NAME);
const newPath = path.join(OUT_DIR, NEW_DIR_NAME);

if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`✅ Renamed directory: ${OLD_DIR_NAME} -> ${NEW_DIR_NAME}`);
} else {
    console.log(`⚠️  Directory ${OLD_DIR_NAME} not found (maybe already renamed?)`);
}

// 2. Replace all references in HTML files
function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace "/_next/" with "./assets/" or just "assets/" relative to the file
    // We use a regex to capture potentially different path styles
    // Standard Next.js export produces paths like: /_next/static/...

    // Fix CSS/JS paths
    const regex1 = /\/_next\//g;
    const replacement1 = `./${NEW_DIR_NAME}/`;

    // Also handle cases where assetPrefix put a dot but the folder is still named _next
    const regex2 = /\.\/_next\//g;
    const replacement2 = `./${NEW_DIR_NAME}/`;

    if (content.match(regex1) || content.match(regex2)) {
        content = content.replace(regex1, replacement1);
        content = content.replace(regex2, replacement2);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed paths in: ${path.basename(filePath)}`);
    }
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDir(filePath);
        } else if (file.endsWith('.html')) {
            replaceInFile(filePath);
        }
    });
}

// Execute
console.log("🛠️  Fixing paths for APK compatibility...");
if (fs.existsSync(OUT_DIR)) {
    processDir(OUT_DIR);
    console.log("🎉 Done! The 'out' folder is now safer for APK conversion.");
} else {
    console.error("❌ 'out' directory not found. Run 'npm run build' first.");
}
