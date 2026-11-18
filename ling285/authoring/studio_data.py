"""Course data with the Module III layer merged in, for authoring tools.

data.json is locked to Lectures 01 to 18. Module III (Lecture 19 onward) is published from
ling285/module3/ and merged by the app at load time (module3/overlay.js). Authoring tools that
need to see every lecture, such as the module template and the notes checker, read the data
through load() so they see the same merged course the app shows.
"""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]

def load(merged=True):
    data=json.loads((ROOT/'data.json').read_text());layer_path=ROOT/'module3/data.json'
    if merged and layer_path.exists():
        layer=json.loads(layer_path.read_text());ids={c['id'] for c in data['collections']}
        data['modules']+=[m for m in layer.get('modules',[]) if m['id'] not in {x['id'] for x in data['modules']}]
        data['collections']+=[c for c in layer.get('collections',[]) if c['id'] not in ids]
        known={q['id'] for q in data['questions']}
        data['questions']+=[q for q in layer.get('questions',[]) if q['id'] not in known]
        data['guide']+=layer.get('guide',[])
    return data

def locked_lectures():
    """Lecture ids present in the locked data.json itself."""
    return {c['id'] for c in json.loads((ROOT/'data.json').read_text())['collections'] if c.get('role')=='lecture'}
