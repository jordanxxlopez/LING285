"""Check that a rebuilt edition only added Lecture 19 and left every earlier lecture unchanged.

Usage: python3 ling285/authoring/check_additive.py transcripts-v2.json modern/transcripts-b.json ...
Each file is compared with its committed version (git HEAD).
"""
import json,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def check(rel):
    try:old=json.loads(subprocess.run(['git','show',f'HEAD:ling285/{rel}'],capture_output=True,text=True,check=True,cwd=ROOT).stdout)
    except subprocess.CalledProcessError:return f'{rel}: new file'
    new=json.loads((ROOT/rel).read_text());oc,nc=old.get('collections',{}),new.get('collections',{})
    changed=[k for k in oc if oc[k]!=nc.get(k)];added=sorted(set(nc)-set(oc))
    other=[k for k in old if k!='collections' and old[k]!=new.get(k)]
    status='OK' if not changed else 'CHANGED OLD LECTURES'
    return f'{rel}: {status}; added {added}; changed old {changed}; other fields changed {other}'
if __name__=='__main__':
    bad=False
    for rel in sys.argv[1:]:
        line=check(rel);print(line);bad|='CHANGED OLD' in line
    sys.exit(1 if bad else 0)
