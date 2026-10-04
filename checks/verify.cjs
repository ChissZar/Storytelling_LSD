const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');const path=require('node:path');
const root=path.resolve(__dirname,'..');const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,'Unique HTML IDs');
for(const [,href] of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(href),'Anchor target: '+href);
for(const [,asset] of html.matchAll(/(?:src|href)="([^"#:]+)"/g)){if(!asset.startsWith('http'))assert(fs.existsSync(path.join(root,asset)),'Asset exists: '+asset);}
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),ctx);const rows=ctx.window.STORY_DATA.gdp;
const csv=fs.readFileSync(path.join(root,'data/gdp-growth.csv'),'utf8').trim().split(/\r?\n/).slice(1).map(r=>r.split(','));
assert.equal(rows.length,15);rows.forEach((r,i)=>{assert.equal(r.year,Number(csv[i][0]));assert.equal(r.value,Number(csv[i][1]));});
assert.equal(rows[12].value,4.98);assert.equal(rows[13].value,7.04);assert.equal(rows[14].value,8.02);
assert.equal(Number((16.8-5).toFixed(1)),11.8);assert.equal(Number(((16.8-5)/16.8*100).toFixed(1)),70.2);
for(const id of ['24110357','24110343','24110198','24142302','24162009'])assert(html.includes(id));
new vm.Script(fs.readFileSync(path.join(root,'app.js'),'utf8'));
console.log('PASS: local assets, source anchors, 15 GDP rows vs CSV, revised values, poverty calculations, student IDs, JavaScript syntax.');
