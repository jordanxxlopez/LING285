"""Rebuild the whole Module III layer (ling285/module3/ and modern/module3.js) from its sources.

The locked studio files cover Lectures 01 to 18. This script runs the standard builders on a
working copy that temporarily includes Lecture 19, moves the Lecture 19 parts into the Module
III layer, and then restores every locked file to its committed version. It stops if any
earlier lecture would change.

Run from the repository root:  python3 ling285/authoring/module3/build_layer.py
It needs LibreOffice and Tesseract for the deck extraction. Add --stages to re-render the click states.
"""
from pathlib import Path
import json,os,subprocess,sys
HERE=Path(__file__).resolve().parent;A=HERE.parent;ROOT=A.parent;REPO=ROOT.parent
ENTRY={'key':'lecture19','original':'Ling285_F26_L19.pptx','path':str(ROOT/'sources/lecture19.pptx'),'size_bytes':(ROOT/'sources/lecture19.pptx').stat().st_size}

def run(*args,cwd=REPO):
    print('·',' '.join(str(a) for a in args),flush=True)
    subprocess.run([sys.executable,'-W','ignore',*map(str,args)],check=True,cwd=cwd,env={**os.environ,'OMP_THREAD_LIMIT':'1'},stdout=subprocess.DEVNULL)

def main():
    dirty=subprocess.run(['git','ls-files','-m','ling285'],capture_output=True,text=True,cwd=REPO).stdout.split()
    own=('ling285/module3/','ling285/authoring/module3/')
    assert not [f for f in dirty if f.endswith('.json') and f!='ling285/modern/build-manifest.json' and not f.startswith(own)],'commit or restore generated JSON files first'
    try:
        manifest_path=A/'upload-manifest.json';uploads=json.loads(manifest_path.read_text())
        if not any(u['key']=='lecture19' for u in uploads):manifest_path.write_text(json.dumps(uploads+[ENTRY],ensure_ascii=False,indent=2)+'\n')
        run(A/'extract_sources.py','--only','lecture19')
        run(A/'inspect_embedded.py','--only','lecture19')
        run(A/'refresh_inventory.py')
        if '--stages' in sys.argv or not (A/'extracted/lecture19-animation-stages.json').exists():run(A/'render_lecture19_stages.py',cwd=A)
        run(A/'build_weekly_teaching.py','19')
        for script in ('lecture19_practice.py','lecture19_editions.py','lecture19_notes_derive.py'):run(A/script,cwd=A)
        for script in ('build_studio.py','build_transcripts_v2.py','build_transcripts_v3.py'):run(A/script)
        run(HERE/'extra_editions.py','v4');run(A/'build_transcripts_notes.py');run(A/'build_transcripts_iskarous.py')
        run(HERE/'extra_editions.py','copies')   # Versions 24 and B copy the Iskarous text built just above
        run(A/'lecture19_modern.py');run(HERE/'extract_overlay.py')
    finally:
        run(HERE/'extract_overlay.py','--restore')
    run(HERE/'make_module3.py');run(A/'module_template.py',A/'module3')
    left=subprocess.run(['git','ls-files','-m','ling285'],capture_output=True,text=True,cwd=REPO).stdout.split()
    print('Module III layer rebuilt. Locked JSON files still modified:',[f for f in left if f.endswith('.json') and f!='ling285/modern/build-manifest.json' and not f.startswith(('ling285/module3/','ling285/authoring/module3/'))] or 'none')

if __name__=='__main__':main()
