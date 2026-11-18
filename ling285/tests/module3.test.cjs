// Module III (Lecture 19 onward) is published from ling285/module3/ and merged at load time.
// These checks cover the layer itself and confirm the locked Lecture 01 to 18 files do not hold it.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8')),text=f=>fs.readFileSync(path.join(root,f),'utf8');
const layer=read('module3/data.json'),locked=read('data.json'),c=layer.collections[0];
const flat=t=>t.flatMap(b=>typeof b==='string'?[b]:[b.text,...b.children]);
const ORIGINAL=['v2','v3','v4','v7','v10','v12','v14','v16','v18','v20','v21','v22','v24','vB'];
const MODERN=['professor','b','c','follow','v20','original-c','d','original-c-v2','d-v2','original-c-v3','notes-v7','notes-v7-v2','notes-v8','notes-v8-1','notes-v8-2','notes-v9','notes-v9-1','notes-v9-2','notes-v9-3','notes-v9-4','notes-v10','notes-v10-1'];

test('Lecture 19 keeps all nineteen original pages, in order, with its source file and images',()=>{
 const s=read('module3/source-manifest.json').lecture19;
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,s.file))).digest('hex'),s.sha256);
 assert.equal(c.id,'lecture19');assert.equal(c.moduleId,'module3');assert.equal(c.sections.length,19);
 const native=read('authoring/extracted/lecture19-native.json');
 for(const [i,p] of c.sections.entries()){
  assert.equal(p.page,i+1);assert.equal(p.id,`lecture19-p${String(i+1).padStart(3,'0')}`);assert.equal(p.speakerNotes,native[i].speakerNotes);
  assert(fs.existsSync(path.join(root,p.image)),p.image);for(const a of p.assets)assert(fs.existsSync(path.join(root,a.file)),a.file);
 }
 assert.equal(c.sections[0].teaching.length,0,'title page stays empty');assert.equal(c.sections[7].teaching.length,0,'prompt-only page stays empty');
 for(const n of [9,10,11,12,13,14,15,16,17,18,19])assert(c.sections[n-1].assets.some(a=>a.sourceDerived),'click states for page '+n);
});

test('the locked course files still end at Lecture 18, and the layer adds Module III beside them',()=>{
 assert(!locked.collections.some(x=>x.id==='lecture19'));assert.deepEqual(locked.modules.map(m=>m.id),['module1','module2']);
 assert.deepEqual(layer.modules.map(m=>m.id),['module3']);assert.deepEqual(layer.modules[0].lectureIds,['lecture19']);
 for(const v of ORIGINAL)assert(!read(`transcripts-${v}.json`).collections.lecture19,v);
 for(const v of MODERN)assert(!read(`modern/transcripts-${v}.json`).collections.lecture19,v);
});

test('pages 2 to 8 reuse the Lecture 18 teaching, because the slides are identical',()=>{
 const l18=locked.collections.find(x=>x.id==='lecture18');
 for(let p=2;p<=8;p++)assert.deepEqual(c.sections[p-1].teaching,l18.sections[p-1].teaching,'data page '+p);
 for(const [dir,ids] of [['',ORIGINAL],['modern/',MODERN]])for(const v of ids){
  const own=read(`${dir}transcripts-${v}.json`).collections.lecture18.sections,added=read(`module3/${dir}transcripts-${v}.json`).collections.lecture19.sections;
  for(let p=2;p<=8;p++)assert.deepEqual(added[p-1].teaching,own[p-1].teaching,`${dir}${v} page ${p}`);
 }
});

test('every teaching version covers Lecture 19 in source order with its own text for the new pages',()=>{
 const seen=new Map();
 for(const [dir,ids] of [['',ORIGINAL],['modern/',MODERN]])for(const v of ids){
  const s=read(`module3/${dir}transcripts-${v}.json`).collections.lecture19.sections;
  assert.deepEqual(s.map(x=>[x.id,Number(x.page)]),c.sections.map(x=>[x.id,x.page]),dir+v);assert.equal(s[0].teaching.length,0,dir+v);
  if(v==='notes-v7'){for(let p=9;p<=19;p++)assert.equal(s[p-1].teaching.length,0,'no PDF notes were supplied for Lecture 19');continue;}
  for(let p=9;p<=19;p++){
   const t=flat(s[p-1].teaching);assert(t.length>0,`${dir}${v} page ${p}`);
   for(const line of t){
    assert.equal((line.match(/\*\*/g)||[]).length%2,0,`${dir}${v} p${p} unbalanced bold`);
    assert(!/\bneed not\b|\blawful\b|\b(?:slides?|the lecture|this lecture|the professor|the class|he said|this shows|shows that|illustrat\w*|demonstrat\w*|let.s|remember that|the key (?:point|finding|takeaway))\b|[;→=]/i.test(line),`${dir}${v} p${p}: ${line.slice(0,70)}`);
    assert(!/\bpictur/i.test(line),`${dir}${v} p${p} uses picture: ${line.slice(0,70)}`);
    const body=/^(?:Hidden (?:word|frame|patch)): /.test(line)?line.replace(/^[^:]+: /,''):line;
    assert(!body.includes(':'),`${dir}${v} p${p} colon: ${line.slice(0,70)}`);
   }
  }
  seen.set(dir+v,JSON.stringify(s.slice(8).map(x=>x.teaching)));
 }
 // Versions that are defined as copies of another version are the only ones allowed to match.
 const copies=new Set(['v24','vB','modern/follow','modern/original-c','modern/notes-v8','modern/notes-v8-1','modern/notes-v8-2']);
 const texts=[...seen].filter(([k])=>!copies.has(k)&&k!=='modern/notes-v7');
 assert.equal(new Set(texts.map(([,t])=>t)).size,texts.length,'each version has its own wording');
});

test('Lecture 19 has a complete quiz of 25 multiple-choice and 25 written questions on the new pages',()=>{
 const qs=layer.questions;assert.equal(qs.length,50);assert.equal(qs.filter(q=>q.type==='mcq').length,25);assert.equal(new Set(qs.map(q=>q.id)).size,50);
 const old=new Set(locked.questions.map(q=>q.id));
 for(const q of qs){
  assert(!old.has(q.id));assert.equal(q.moduleId,'module3');assert.equal(q.lectureId,'lecture19');
  assert(q.sources.every(s=>s.collection==='lecture19'&&s.page>=9&&s.page<=19));
  if(q.type==='mcq'){assert.equal(q.options.length,4);assert(q.options.every(o=>o.text&&o.feedback));assert(q.options.some(o=>o.id===q.correctOption));}
  else assert(q.answer&&q.rubric.length>=2);
 }
});

test('the modern workspace gets Module III study pages and loads the layer before the app',()=>{
 const ctx={window:{}};require('node:vm').runInNewContext(text('modern/module3.js'),ctx);const m=ctx.window.LING285_MODULE3;
 assert.equal(m.moduleId,'module3');const v=Object.values(m.versions)[0];
 assert.equal(v.topics.length,11);assert(v.topics.every(t=>t.blocks.length&&t.questions.length));
 assert(v.topics.every(t=>t.blocks.every(b=>/Lecture 19 · p\d+/.test(b.ref)&&b.media&&fs.existsSync(path.join(root,b.media.image)))));
 assert.equal(m.review.sets.reduce((n,s)=>n+s.items.length,0),57);
 for(const [file,app] of [['index.html','app.js'],['modern/index.html','modern/app.js']]){
  const html=text(file);assert(html.indexOf('module3/overlay.js')>0&&html.indexOf('module3/overlay.js')<html.indexOf(`src="${app}`),file);
 }
 const html=text('modern/index.html');assert(html.indexOf('modern/content.js')<html.indexOf('module3/modern/content.js')&&html.indexOf('module3/modern/content.js')<html.indexOf('src="modern/app.js'));
 assert(text('app.js').includes("'lecture18','lecture19']"));assert(text('modern/app.js').includes('module3:window.LING285_MODULE3'));
});
