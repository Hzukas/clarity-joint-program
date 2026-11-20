// Makes a saved version the look every visitor of the live site sees.
//
//   node publish.js             uses the newest clarity-joint-*.json in your Downloads folder
//   node publish.js <file>      uses that version file
//
// Steps: copy the version to published.json, commit, and push. GitHub Pages serves it within a minute.
// On the page: Unlock, open the gear, click "Save version", then run this. Visitors get the new look
// on their next load; a browser that has made its own edits (yours) keeps them.
// Publish to client in the gear menu does the same thing from the page, using a GitHub token.
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = __dirname;
let src = process.argv[2];
if (!src) {
  const dl = path.join(os.homedir(), 'Downloads');
  const files = fs.existsSync(dl) ? fs.readdirSync(dl).filter(f => /^clarity-joint-.*\.json$/i.test(f)) : [];
  files.sort((a, b) => fs.statSync(path.join(dl, b)).mtimeMs - fs.statSync(path.join(dl, a)).mtimeMs);
  if (!files.length) { console.error('No clarity-joint-*.json in Downloads. Unlock the page and click "Save version" in the gear menu first.'); process.exit(1); }
  src = path.join(dl, files[0]);
}
let v;
try { v = JSON.parse(fs.readFileSync(src, 'utf8')); } catch (e) { console.error('Could not read ' + src + ': ' + e.message); process.exit(1); }
if (!v || v.cg !== 'version') { console.error('Not a version file for this sell sheet: ' + src); process.exit(1); }
if (!v.saved) v.saved = new Date().toISOString();

fs.writeFileSync(path.join(root, 'published.json'), JSON.stringify(v, null, 2) + '\n');
console.log('Publishing "' + (v.name || 'unnamed') + '" (saved ' + v.saved + ')\n  from ' + src);

const sh = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });
sh('git pull -q --rebase origin master');
sh('git add published.json');
const dirty = execSync('git status --porcelain published.json', { cwd: root }).toString().trim();
if (dirty) {
  sh('git -c core.autocrlf=false commit -q -m "Publish version: ' + String(v.name || 'unnamed').replace(/"/g, "'") + '"');
  sh('git push -q origin master');
} else {
  console.log('published.json unchanged, nothing to commit');
}
console.log('\nLive at https://hzukas.github.io/clarity-joint-program/  (GitHub Pages can take a minute to refresh)');
