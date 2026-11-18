"""Static source-state exports for the Lecture 19 click animations.

Pages 9 to 19 are rendered from the original shapes and timing, exactly as for
Lecture 18 (see render_lecture18_stages.py). Pages 2 to 8 are the Lecture 18 slides
unchanged, so their Lecture 18 exports are copied under the Lecture 19 folder.
Nothing new is drawn.
"""
from pathlib import Path
import json,shutil
import render_lecture18_stages as base
ROOT=base.ROOT
if __name__=='__main__':
 records=[]
 old=json.loads((ROOT/'authoring/extracted/lecture18-animation-stages.json').read_text())
 out=ROOT/'assets/slides/lecture19/stages';out.mkdir(parents=True,exist_ok=True)
 for r in old:
  src=ROOT/r['file'];dst=out/src.name;shutil.copy2(src,dst)
  records.append(dict(r,file=str(dst.relative_to(ROOT)),method=r['method']+' Copied from the identical Lecture 18 slide.'))
 for n in range(9,20):records+=base.stages('lecture19',n)
 (ROOT/'authoring/extracted/lecture19-animation-stages.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
 print('stages',len(records))
