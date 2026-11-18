"""Move Lecture 19 out of the locked studio files into the Module III layer (ling285/module3/).

The studio files for Lectures 01 to 18 are locked by hash so that nothing already studied
can change. Module III is therefore published as a separate layer that the app merges when
it loads (module3/overlay.js). This script reads the working copy in which the standard
builders were run with Lecture 19 included, writes only the Lecture 19 parts to module3/,
and checks that everything else is identical to the committed files.

Run after the builders (see module3/README.md):  python3 ling285/authoring/module3/extract_overlay.py
Then restore the locked files:                   python3 ling285/authoring/module3/extract_overlay.py --restore
"""
from pathlib import Path
import json,subprocess,sys
ROOT=Path(__file__).resolve().parents[2];REPO=ROOT.parent;OUT=ROOT/'module3';KEY='lecture19';MODULE='module3'

def head(rel):return subprocess.run(['git','show',f'HEAD:ling285/{rel}'],capture_output=True,text=True,check=True,cwd=REPO).stdout
def dump(path,value):path.parent.mkdir(parents=True,exist_ok=True);path.write_text(json.dumps(value,ensure_ascii=False,indent=1)+'\n')
def pack_of(raw):return json.loads(raw[raw.index('{'):raw.rindex('}')+1])

def editions():
    files=sorted(p.name for p in ROOT.glob('transcripts-*.json'))+sorted('modern/'+p.name for p in (ROOT/'modern').glob('transcripts-*.json'))
    for rel in files:
        new=json.loads((ROOT/rel).read_text())
        if KEY not in new.get('collections',{}):continue
        old=json.loads(head(rel))
        for cid,c in old['collections'].items():assert new['collections'][cid]==c,(rel,cid,'an earlier lecture changed')
        layer={'id':new['id'],'collections':{KEY:new['collections'][KEY]}}
        if new.get('availableModules')!=old.get('availableModules'):layer['availableModules']=new['availableModules']
        dump(OUT/rel,layer)
    return files

def data():
    new=json.loads((ROOT/'data.json').read_text());old=json.loads(head('data.json'))
    old_ids={c['id'] for c in old['collections']}
    for c in old['collections']:assert next(x for x in new['collections'] if x['id']==c['id'])==c,(c['id'],'an earlier lecture changed')
    old_q={q['id'] for q in old['questions']}
    layer={'modules':[m for m in new['modules'] if m['id']==MODULE],
           'collections':[c for c in new['collections'] if c['id'] not in old_ids],
           'questions':[q for q in new['questions'] if q['id'] not in old_q],
           'guide':[g for g in new['guide'] if g not in old['guide']]}
    assert all(q['moduleId']==MODULE for q in layer['questions']) and [c['id'] for c in layer['collections']]==[KEY]
    dump(OUT/'data.json',layer)

def content():
    new=pack_of((ROOT/'modern/content.js').read_text());old=pack_of(head('modern/content.js'));layer={}
    for k,v in new.items():
        if v==old.get(k):continue
        if isinstance(v,list):
            assert all(x in v for x in old[k]),(k,'an earlier entry changed');layer[k]=[x for x in v if x not in old[k]]
        elif k=='coverage':layer[k]=v
        else:
            assert all(v.get(a)==b for a,b in old[k].items()),(k,'an earlier entry changed');layer[k]={a:b for a,b in v.items() if a not in old[k]}
    (OUT/'modern').mkdir(parents=True,exist_ok=True)
    (OUT/'modern/content.js').write_text('// Module III additions to the modern content pack. Lists are appended and keyed entries are added.\n(() => {\n const add = '+json.dumps(layer,ensure_ascii=False,indent=1)+';\n const pack = window.LING285_MODERN;\n if (!pack || pack.module3Merged) return;\n for (const [key, value] of Object.entries(add)) {\n  if (Array.isArray(value)) pack[key] = [...(pack[key] || []), ...value];\n  else pack[key] = {...(pack[key] || {}), ...value};\n }\n'+CARRY+' pack.module3Merged = true;\n})();\n')

CARRY=" // Lectures 17 and 18 stay in Module II and are also part of Module III. Their workspace entries are copied for\n // Module III under new ids, in the plain wording where one exists, so each module keeps its own practice record.\n const kept = new Set(['lecture17', 'lecture18']), plain = window.LING285_PLAIN || {};\n const copy = item => ({...JSON.parse(JSON.stringify(item)), id: item.id + '-m3', moduleId: 'module3'});\n const reword = (item, wording, fields) => { if (wording) for (const f of fields) if (wording[f] != null) item[f] = wording[f]; return item; };\n const fromModule2 = item => item.moduleId === 'module2';\n const extra = {qa: [], guides: [], asked: [], cards: [], contrasts: [], hard: [], connections: [], figures: [], questions: [], writing: []};\n for (const q of pack.qa) if (fromModule2(q) && kept.has(q.lectureId)) {\n  const c = copy(q), w = q.kind === 'slides' ? plain.concepts?.[q.concept]?.['q' + q.id.split('-').pop()] : plain.connectionQs?.[q.id];\n  if (w) { c.question = w.question; c.answer = [w.answer]; }\n  extra.qa.push(c);\n }\n for (const g of pack.guides) if (fromModule2(g) && g.points.every(p => kept.has(p.collection))) extra.guides.push(copy(g));\n for (const a of pack.asked) if (fromModule2(a) && kept.has(a.collection)) extra.asked.push(reword({...copy(a), id: undefined}, plain.asked?.[a.concept], ['title', 'items']));\n for (const c of pack.cards) if (fromModule2(c) && kept.has(c.collection)) extra.cards.push(reword(copy(c), plain.cards?.[c.id], ['title', 'explain', 'outcome', 'interpret']));\n for (const h of pack.hard) if (fromModule2(h) && kept.has(h.collection)) extra.hard.push(reword(copy(h), plain.hard?.[h.id], ['title', 'paragraphs', 'question', 'answer']));\n for (const f of pack.figures) if (fromModule2(f) && kept.has(f.collection)) extra.figures.push(reword(copy(f), plain.figures?.[f.id], ['title', 'takeaway']));\n for (const c of pack.connections) if (fromModule2(c) && c.sources.every(s => kept.has(s.collection))) extra.connections.push(reword(copy(c), plain.connections?.[c.id], ['title', 'paragraphs', 'question', 'answer']));\n for (const c of pack.contrasts) if (fromModule2(c) && kept.has(c.collection)) {\n  const k = copy(c), w = plain.contrasts?.[c.id];\n  if (w) { k.title = w.title; k.paragraphs = w.paragraphs; if (w.left) k.left = {...k.left, text: w.left.text}; if (w.right) k.right = {...k.right, text: w.right.text}; }\n  extra.contrasts.push(k);\n }\n for (const q of pack.questions) if (fromModule2(q) && kept.has(q.lectureId)) extra.questions.push({...copy(q), bankKey: q.bankKey + '-m3'});\n for (const w of pack.writing) if (fromModule2(w) && kept.has(w.lectureId)) extra.writing.push(copy(w));\n // Kept lectures come first in each Module III list, then the Lecture 19 entries added above.\n for (const [key, items] of Object.entries(extra)) pack[key] = [...pack[key].filter(x => x.moduleId !== 'module3'), ...items, ...pack[key].filter(x => x.moduleId === 'module3')];\n"
LOCKED=['data.json','coverage-report.json','source-manifest.json','modern/content.js']
if __name__=='__main__':
    if '--restore' in sys.argv:
        tracked=subprocess.run(['git','ls-files','-m','ling285'],capture_output=True,text=True,check=True,cwd=REPO).stdout.split()
        generated=[f for f in tracked if f.endswith('.json') or f=='ling285/modern/content.js']
        # The Module III layer and its authoring inputs are outputs of this build, not locked files.
        keep={'ling285/modern/build-manifest.json'}
        generated=[f for f in generated if f not in keep and not f.startswith(('ling285/module3/','ling285/authoring/module3/'))]
        subprocess.run(['git','checkout','HEAD','--',*generated],check=True,cwd=REPO)
        print('restored',len(generated),'locked or generated files to their committed versions')
    else:
        files=editions();data();content()
        print('Module III layer written to',OUT.relative_to(REPO),'·',len(list(OUT.rglob('transcripts-*.json'))),'edition files')
