"""Assemble the Lecture 19 files of the slide-by-slide notes editions (Versions 8 to 10.1).

Hand-written parents for the new pages 9 to 19:
  notes-v9.1/19-new.md   full slide-by-slide notes
  notes-v9/19-new.md     shorter slide-by-slide notes
  notes-v10/19-new.md    neurodivergent-friendly notes
Derived, as explicit edit lists (the script fails if a parent sentence drifts):
  9.2  = 9.1 with plainer everyday wording
  9.3  = 9.2 with answer-first sentences and "This is because" steps
  9.4  = 9.3 with parallel labeled lists and the technical term glossed
  10.1 = 10 with the same labeled lists and glosses
Pages 2 to 8 are the Lecture 18 slides unchanged, so each edition reuses its own
Lecture 18 notes for them. Versions 8 and 8.1 take the 9.1 text and Version 8.2 the
9.4 text, regrouped into numbered sections, as was done for Lectures 01 to 10.

Run: python3 ling285/authoring/lecture19_notes_derive.py
"""
from pathlib import Path
import re
A=Path(__file__).resolve().parent

def apply(text,edits,name):
    for old,new in edits:
        assert text.count(old)>=1,(name,'parent sentence not found',old[:70])
        text=text.replace(old,new)
    return text

E92=[
 ('The sentence "Now crack the egg" separates into the pieces','The sentence "Now crack the egg" splits into the pieces'),
 ('The spoken phrase is displayed as a spectrogram.','The spoken phrase is shown as a spectrogram.'),
 ('A higher position means a higher frequency','Higher up means a higher frequency'),
 ('The row is reordered so that the image comes first','The row is put in a new order so that the image comes first'),
 ('The row is reordered again so that the words come first','The row is put in a new order again so that the words come first'),
 ('and 16 bands are displayed.','and 16 bands are on display.'),
 ('takes the row of predicted codes and produces a sound wave that can be heard.','takes the row of predicted codes and makes a sound wave that can be heard.'),
 ('The model supplies the codes, and the decoder supplies the sound.','The model gives the codes, and the decoder gives the sound.'),
 ('**The first job is a conversion.** Speech and images both have to become rows of vectors','**The first job is a conversion (a change of form).** Speech and images both have to become rows of vectors'),
 ('Its parts are also spread over a surface, so they are not arranged in a row.','Its parts are also spread out side by side and up and down, so they are not in a row.'),
 ('An image has no order of its own, because its parts are spread over a surface.','An image has no order of its own, because its parts are spread out side by side and up and down.'),
 ('"Three" comes first, "cute" comes second and "puppies" comes last.','"Three" is first, "cute" is second and "puppies" is last.'),
]
E93=[
 ('  - After the true word is revealed, each weight changes a little. Because of that change, the right word gets a bigger bet the next time the model reads a sentence like this one.',
  '  - First the true word is revealed. Then each weight changes a little. Because of that change, the right word gets a bigger bet the next time the model reads a sentence like this one.'),
 ('  - Each piece can become one vector. So text is the easy case, because it is already in the order and the form that the model needs.',
  '  - Text is the easy case. This is because each piece can become one vector, and the pieces are already in order.'),
 ('**One second of speech becomes 50 vectors.** Each slice is about 20 milliseconds long, and 50 slices of that length fill one second. Each slice gives one vector, so one second gives 50 vectors.',
  '**One second of speech becomes 50 vectors.** This is because each slice is about 20 milliseconds long, and 50 slices of that length fill one second. Each slice gives one vector, so one second gives 50 vectors.'),
 ('  - Real systems use patches of 14 to 16 pixels. Smaller patches mean more patches for the same image, so the row of vectors is much longer.',
  '  - This is because real systems use patches of 14 to 16 pixels. Smaller patches mean more patches for the same image, so the row of vectors is much longer.'),
 ('  - The model gives the three words nearly equal bets, because the two words before the gap do not say which ending is right.',
  '  - This is because the two words before the gap do not say which ending is right. So the model gives the three words nearly equal bets.'),
 ('  - The model bet a lot on the true word, so the error is small. Because the error is small, the weights move only a little.',
  '  - The nudge to the weights is small. This is because the model bet a lot on the true word, so the error is small, and a small error moves the weights only a little.'),
 ('  - Because they change smoothly, the last few frames say a lot about what the next frame will be.',
  '  - The last few frames say a lot about what the next frame will be. This is because the voice and the formants change smoothly.'),
 ('  - So training on all three senses together helps, because each sense fills gaps that the others leave.',
  '  - Training on all three senses together helps. This is because each sense fills gaps that the others leave.'),
]
# Parallel item lists with labels, approved only for lists whose items answer the same question.
LABELED_18_FROM=('- **For a hidden word, all three senses point to "puppies."** The words "three cute" call for a plural noun. The sound helps because the word was just spoken. The image helps because it contains puppies.\n'
 '- **For a hidden frame, each sense also gives a clue.** The words say which sound comes next. The voice and the formants carry on from the frames already heard. The image backs up which word is being said.\n'
 '- **For a hidden patch, the pattern is the same.** The word "three" says one more puppy is coming. The sound gives the same words in heard form. The fur and the background carry on from the patches already drawn.\n')
LABELED_18_TO=('- **Each kind of hidden piece gets one clue from the words, one from the sound and one from the image.**\n'
 '  - Hidden word: The words "three cute" call for a plural noun, the sound has just spoken the word, and the image contains puppies.\n'
 '  - Hidden frame: The words say which sound comes next, the voice and the formants carry on from the frames already heard, and the image backs up which word is being said.\n'
 '  - Hidden patch: The word "three" says one more puppy is coming, the sound gives the same words in heard form, and the fur and the background carry on from the patches already drawn.\n')
E94=[
 (LABELED_18_FROM,LABELED_18_TO),
 ('  - A link between two different kinds of signal is called a **cross-modal dependency**. Here the image and the sound are helping to predict a word.',
  '  - A link between two different kinds of signal is called a **cross-modal dependency**. A **modality** is one kind of signal, such as text, speech or an image. Here the image and the sound are helping to predict a word.'),
 ('**For the model to speak, sound is first compressed into discrete codes.** A code is a number that stands for a short piece of sound, such as 417, 82 or 903.',
  '**For the model to speak, sound is first compressed into discrete codes (separate numbered units).** A code is a number that stands for a short piece of sound, such as 417, 82 or 903.'),
]
E101=[
 ('- **For a hidden word, the three clues all point to "puppies."**\n  - The words "three cute" call for a plural noun.\n  - The sound helps because the word was just spoken.\n  - The image helps because it contains puppies.\n'
  '- **For a hidden frame, the three clues are about the next sound.**\n  - The words say which sound comes next.\n  - The voice and the formants carry on from the frames already heard.\n  - The image backs up which word is being said.\n'
  '- **For a hidden patch, the three clues are about the next part of the image.**\n  - The word "three" says one more puppy is coming.\n  - The sound gives the same words in heard form.\n  - The fur and the background carry on from the patches already drawn.\n',
  LABELED_18_TO),
 ('  - This kind of link has a name. It is a **cross-modal dependency** (a link between two different kinds of signal).',
  '  - This kind of link has a name. It is a **cross-modal dependency** (a link between two different kinds of signal). A **modality** is one kind of signal, such as text, speech or an image.'),
 ('  - First, sound is compressed into discrete codes. A code is a number',
  '  - First, sound is compressed into discrete codes (separate numbered units). A code is a number'),
]

def old_pages(folder):
    """Pages 2 to 8 of this edition's own Lecture 18 notes."""
    text=(A/folder/'18.md').read_text();parts=re.split(r'(?m)^(?=## p\d+$)',text)
    keep=[p.rstrip()+'\n' for p in parts if re.match(r'## p([2-8])\n',p)]
    assert len(keep)>=6,(folder,len(keep))
    return '\n'.join(keep)

def sectioned(new_text,old_folder,date='Tuesday, November 17'):
    """Version 8 layout: the four header lines, then one numbered section per content slide."""
    old=(A/old_folder/'18.md').read_text()
    body=old.split('\n\n',1)[1] if old.startswith('Course:') else old
    sections=[s for s in re.split(r'(?m)^(?=\*\*Section \d+: )',body) if s.startswith('**Section')]
    out=['Course: LING285: Human Language and Technology','Title of Lecture: Lecture 19',f'Date: {date}','Professor: Khalil Iskarous','']
    n=0
    for s in sections:
        n+=1;out.append(re.sub(r'^\*\*Section \d+: ',f'**Section {n}: ',s.rstrip())+'\n')
    titles={9:'What an LLM Learns',10:'Text, Speech and Images in Three Different Forms',11:'Speech Becomes a Row of Frame Vectors',12:'Images Become a Row of Patch Vectors',
            13:'One Row with Three Senses',14:'Three Cute Puppies as an Image, Speech and Words',15:'Training Example 1 Predicts the Next Word',16:'Training Example 2 Predicts a Sound Frame',
            17:'Training Example 3 Predicts an Image Patch',18:'Every Piece Can Be the Hidden One',19:'Talking Back, and What Is New'}
    for part in re.split(r'(?m)^(?=## p\d+$)',new_text):
        m=re.match(r'## p(\d+)\n',part)
        if not m:continue
        n+=1;out.append(f'**Section {n}: {titles[int(m[1])]}**\n\n'+part.split('\n',1)[1].rstrip()+'\n')
    return '\n'.join(out)

if __name__=='__main__':
    n91=(A/'notes-v9.1/19-new.md').read_text();n9=(A/'notes-v9/19-new.md').read_text();n10=(A/'notes-v10/19-new.md').read_text()
    n92=apply(n91,E92,'9.2');n93=apply(n92,E93,'9.3');n94=apply(n93,E94,'9.4');n101=apply(n10,E101,'10.1')
    new={'notes-v9.1':n91,'notes-v9':n9,'notes-v10':n10,'notes-v9.2':n92,'notes-v9.3':n93,'notes-v9.4':n94,'notes-v10.1':n101}
    for folder,text in new.items():
        (A/folder/'19.md').write_text(old_pages(folder)+'\n'+text)
        print(folder,'19.md',len(text.split()),'words on new pages')
    for folder,parent in [('notes-v8','notes-v9.1'),('notes-v8.1','notes-v9.1'),('notes-v8.2','notes-v9.4')]:
        (A/folder/'19.md').write_text(sectioned(new[parent],folder))
        print(folder,'19.md (sectioned from',parent+')')
