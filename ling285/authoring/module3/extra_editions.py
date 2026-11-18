"""Lecture 19 for the three original-workspace editions that have no standing builder.

Version 4 takes authoring/teaching-v4-lecture19.json. Version 24 takes the Version 22 text
and Version B takes the Version 21 text for the new pages 9 to 19, and each reuses its own
Lecture 18 text for the repeated pages 2 to 8. Run during Module III generation, after the
standard builders and before extract_overlay.py (see module3/README.md).
"""
from copy import deepcopy
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[2];KEY='lecture19'
def read(rel):return json.loads((ROOT/rel).read_text())
def write(rel,value):(ROOT/rel).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')

def build(part='all'):
    data=read('data.json');original=next(c for c in data['collections'] if c['id']==KEY)
    if part in('all','v4'):version4(original)
    if part in('all','copies'):copies()

def version4(original):
    v4=read('transcripts-v4.json');authored=read('authoring/teaching-v4-lecture19.json')[KEY];sections=[]
    for old,current in zip(original['sections'],authored['sections']):
        assert all(old[f]==current[f] for f in ['page','title','kind']),old['page']
        sections.append({**{f:old[f] for f in ['id','page','title','kind']},'teaching':current['teaching']})
    v4['collections'][KEY]={'title':original['title'],'sections':sections};write('transcripts-v4.json',v4)

def copies():
    for target,source in [('transcripts-v24.json','transcripts-v22.json'),('transcripts-vB.json','transcripts-v21.json')]:
        payload=read(target);collection=deepcopy(read(source)['collections'][KEY]);own=payload['collections']['lecture18']['sections']
        for section in collection['sections']:
            if 2<=section['page']<=8:section['teaching']=deepcopy(own[section['page']-1]['teaching'])
        payload['collections'][KEY]=collection;write(target,payload)

if __name__=='__main__':
    import sys
    build(sys.argv[1] if len(sys.argv)>1 else 'all')
