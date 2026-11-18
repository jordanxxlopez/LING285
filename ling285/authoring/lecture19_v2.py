"""Build the "v2" teaching versions of Lecture 19, which add what was taught in class on November 17.

Every existing version stays as it is. For each one, a second version is written to the Module
III layer as transcripts-<id>-t2.json. It is the version's own Lecture 19 text with the class
material from lecture19_transcript.py added on the slide it belongs to, in the register that
matches the version's style. Pages 6, 7, 8, 11 and 12 were not taught separately in class and
keep the original text. The app lists the v2 versions in the dropdown for Module III only.

Run after the Module III layer is built:  python3 ling285/authoring/lecture19_v2.py
"""
from copy import deepcopy
from pathlib import Path
import json,re,sys
A=Path(__file__).resolve().parent;ROOT=A.parent;OUT=ROOT/'module3';KEY='lecture19'
sys.path.insert(0,str(A))
import lecture19_transcript as T
import build_transcripts_notes as B
import build_transcripts_iskarous as I

# version id -> (register, shape). Shape "text" appends plain paragraphs, "blocks" appends bullets with sub-bullets.
ORIGINAL={'v2':('FULL','text'),'v3':('FULL','text'),'v4':('FULL','text'),'v7':('FULL','blocks'),'v10':('FULL','blocks'),'v12':('FULL','blocks'),
          'v14':('SHORT','blocks'),'v16':('FULL','blocks'),'v18':('SHORT','blocks'),'v20':('PROF','blocks'),'v21':('SHORT','blocks'),'v22':('PROF','blocks')}
MODERN={'professor':('SHORT','text'),'b':('SHORT','text'),'c':('SHORT','text'),'follow':('SHORT','text'),'v20':('SHORT','blocks'),
        'original-c':('PROF','blocks'),'d':('PROF','blocks'),'original-c-v2':('SHORT','blocks'),'d-v2':('SHORT','blocks'),'original-c-v3':('SHORT','blocks'),
        'notes-v7-v2':('FULL','blocks'),'notes-v8':('NOTES','blocks'),'notes-v8-1':('NOTES','blocks'),'notes-v8-2':('NOTES','blocks'),'notes-v9':('SHORT','blocks'),
        'notes-v9-1':('NOTES','blocks'),'notes-v9-2':('NOTES','blocks'),'notes-v9-3':('NOTES','blocks'),'notes-v9-4':('NOTES','blocks'),'notes-v10':('ND','blocks'),'notes-v10-1':('ND','blocks')}
ORIGINAL_LABELS={'v1':'Version 1 · Original','v2':'Version 2 · Conceptual explanations','v3':'Version 3 · Clear explanations','v4':'Version 4 · Teaching notes','v7':'Version 7 · Teaching notes (bulleted)',
 'v10':'Version 10 · Direct teaching notes','v12':'Version 12 · Detailed teaching notes','v14':'Version 14 · Balanced teaching notes','v16':'Version 16 · Natural teaching notes','v18':'Version 18 · Teaching scripts',
 'v20':'Iskarous · Professor teaching transcript','v21':'Iskarous B · Focused professor teaching','v22':'Iskarous C · Natural teaching notes','v23':'Version 23 · Iskarous C with following slides'}

def v2_label(label):
    name,_,rest=label.partition(' · ')
    return f'{name} · v2 · {rest} (with the Nov 17 class)' if rest else f'{name} · v2 (with the Nov 17 class)'

def added(page,register,shape):
    blocks=T.REGISTERS[register].get(page,[])
    if shape=='text':return [' '.join(b) for b in blocks]
    return [dict(text=b[0],children=list(b[1:])) for b in blocks]

def check(register,blocks,where):
    for b in blocks:
        for i,t in enumerate([b['text'],*b['children']] if isinstance(b,dict) else [b]):
            plain=t.replace('**','')
            assert t.count('**')%2==0,(where,'bold')
            assert not B.BANNED.search(t),(where,B.BANNED.search(t).group(),t[:70])
            assert not re.search(r'\bpictur|\bneed not\b|\bin class\b|\bhe said\b|[=—–×]',t,re.I),(where,t[:70])
            if register=='PROF' and isinstance(b,dict):
                ss=I.sentences(t)
                assert not I.BOLD_LABEL.search(t),(where,'bold label',t[:60])
                assert not I.STRICT.search(plain),(where,'strict',I.STRICT.search(plain).group(),t[:60])
                assert all(len(x.split())>=5 for x in ss),(where,'short sentence',t[:60])
                assert len(ss)<=(5 if i==0 else 3),(where,'too many sentences',t[:60])

def build_one(rel,vid,register,shape,label,extra=None):
    layer=json.loads((OUT/rel).read_text());collection=deepcopy(layer['collections'][KEY])
    for section in collection['sections']:
        more=added(section['page'],register,shape)
        if not more:continue
        if section['teaching'] and isinstance(section['teaching'][0],str) and shape=='blocks':more=[' '.join([b['text'],*b['children']]) for b in more]
        check(register,[m for m in more if isinstance(m,dict)],f'{rel} p{section["page"]}')
        section['teaching']=section['teaching']+more
    out=dict(id=vid+'-t2',base=vid,label=v2_label(label),availableModules=['module3'],
             origin='The original Lecture 19 text of this version with the class of November 17, 2026 added on each slide.',collections={KEY:collection})
    if extra:out.update(extra)
    target=OUT/rel.replace('.json','-t2.json');target.write_text(json.dumps(out,ensure_ascii=False,indent=1)+'\n')
    return out['id'],out['label']

if __name__=='__main__':
    original={}
    # Version 1 is the course data's own teaching, so its v2 is built from the Lecture 19 collection itself.
    data=json.loads((OUT/'data.json').read_text());c=deepcopy(data['collections'][0])
    sections=[dict(id=s['id'],page=s['page'],title=s['title'],kind=s.get('kind'),teaching=s['teaching']+added(s['page'],'SHORT','text')) for s in c['sections']]
    (OUT/'transcripts-v1-t2.json').write_text(json.dumps(dict(id='v1-t2',base='v1',label=v2_label(ORIGINAL_LABELS['v1']),availableModules=['module3'],collections={KEY:dict(title=c['title'],sections=sections)}),ensure_ascii=False,indent=1)+'\n')
    original['v1-t2']=v2_label(ORIGINAL_LABELS['v1'])
    for vid,(register,shape) in ORIGINAL.items():
        i,l=build_one(f'transcripts-{vid}.json',vid,register,shape,ORIGINAL_LABELS[vid]);original[i]=l
    original['v23-t2']=v2_label(ORIGINAL_LABELS['v23'])
    raw=(ROOT/'modern/content.js').read_text();editions=json.loads(raw[raw.index('{'):raw.rindex('}')+1])['editions'];modern={}
    for vid,(register,shape) in MODERN.items():
        i,l=build_one(f'modern/transcripts-{vid}.json',vid,register,shape,editions[vid]);modern[i]=l
    (OUT/'editions-t2.json').write_text(json.dumps(dict(original=original,modern=modern),ensure_ascii=False,indent=1)+'\n')
    (OUT/'modern/editions-t2.js').write_text('// Module III "v2" teaching versions (the original text plus the class of November 17), listed after the originals.\n(() => {\n const pack = window.LING285_MODERN;\n if (!pack || pack.module3V2) return;\n pack.editions = {...pack.editions, ...'+json.dumps(modern,ensure_ascii=False,indent=1)+'};\n pack.module3V2 = true;\n})();\n')
    print('v2 versions written:',len(original),'original workspace,',len(modern),'modern workspace')
