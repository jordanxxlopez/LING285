"""Write the Module III inputs for the per-module study template (see ../module_template.py).

Module III starts with Lecture 19 (Nov 17, 2026), the first lecture after Exam 2.
  topics_1.json  the new material, Lecture 19 pages 9 to 19, written here
  topics_2.json  the Lecture 18 slides that Lecture 19 repeats (pages 2 to 8). Their notes and
                 questions are the Module II "Study this first" Simpler v3 text, reused unchanged,
                 with each block pointed at its Lecture 19 slide
  exam.json      every question with its answer, for the review guide
  meta.json      titles, scope and flags

Run: python3 ling285/authoring/module3/make_module3.py
     python3 ling285/authoring/module_template.py ling285/authoring/module3
"""
from pathlib import Path
import json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]

NEW='New on November 17';OLD='Repeated from Lecture 18'
P='Predicted'
def q(question,answer):return dict(source=P,q=question,a=answer)

TOPICS=[
dict(id='m3-hidden-word',tier=NEW,lectures='Lecture 19',title='What an LLM learns: guessing a hidden word',
 blocks=[
  dict(ref='Lecture 19 · p9',
   main='**An LLM (large language model) learns by guessing a hidden word and then changing its weights a little.** In the sentence "The chef cracks the," the last word is hidden. The model reads the four words before the gap. Then it has to predict the word that fills the gap.',
   sub=['Each word before the gap gives a clue about the hidden word. These clue relationships are called **interdependencies** (one part of a sequence helps predict another part).',
        'The model does not know the answer, so it spreads its bets. A bet is the probability the model gives to one word. It bets the most on "egg," less on "nut" and the least on "code."',
        '**Learning means nudging the weights (changing each weight a little) so that these guesses get better.** After the true word is revealed, the weights change a little. Because of that change, the right word gets a bigger bet next time.'],
   end='The same idea holds when the signal (the sequence the model reads) contains words, sounds and images. The model still guesses a hidden piece and nudges its weights, so the way it learns stays the same.'),
 ],
 questions=[
  q('How does an LLM learn from the sentence "The chef cracks the ?"','An LLM learns from this sentence by guessing the hidden last word and then changing its weights a little.\n\nThis is because each word before the gap gives a clue about the hidden word. So the model bets the most on "egg," less on "nut" and the least on "code." When the true word is revealed, the weights are nudged. So the right word gets a bigger bet next time.'),
  q('Why does the model give "egg," "nut" and "code" different bets instead of one answer?','The model gives three different bets because it does not know the hidden word. All three words could follow "The chef cracks the." The words before the gap make "egg" the most likely. So "egg" gets the largest bet, "nut" gets a smaller bet and "code" gets the smallest bet.'),
  q('What does learning change in an LLM, and in which direction?','Learning changes the weights. Each weight is nudged, which means it changes a little. The weights change in the direction that gives the right word a bigger bet the next time.'),
 ]),
dict(id='m3-conversion',tier=NEW,lectures='Lecture 19',title='Turning speech and images into rows of vectors',
 blocks=[
  dict(ref='Lecture 19 · p10',
   main='**An LLM can only read a row of vectors (lists of numbers), so speech and images have to be converted first.** Text, speech and images arrive in three different forms.',
   sub=['**Text** is already a row of pieces, such as "Now," "crack," "the" and "egg," and each piece can become one vector.',
        '**Speech** is air pressure changing in time, and there are no words in the sound itself.',
        'An **image** is a grid of light, and it contains no words either.'],
   end='So the first job is a conversion. Speech and images both have to become rows of vectors, because that is all the LLM can read.'),
  dict(ref='Lecture 19 · p11',
   main='**Speech is turned into a row of vectors by slicing it in time.** The sound is cut into short slices, and each slice is called a **frame**. Each slice is about 20 milliseconds long.',
   sub=['The slices go through a **speech encoder** (a neural network that was trained on a large amount of audio). One vector comes out for each slice.',
        '**One second of speech becomes 50 vectors.** This is because each slice is about 20 milliseconds long, and 50 slices of that length fill one second. Each slice gives one vector.',
        'The vectors stay in time order. The first slice gives the first vector, and the last slice gives the last vector.'],
   end='So speech is now a row, just like a sentence, and the LLM can read it one vector after another.'),
  dict(ref='Lecture 19 · p12',
   main='**An image is turned into a row of vectors by cutting it into patches.** A **patch** is one small square of the image. A grid cuts the image of an egg in a pan into 16 patches.',
   sub=['The patches are laid out in a row in **reading order** (left to right along the top, then left to right along the next line down). This turns the image into a sequence, like a sentence.',
        'The patches go through a **vision encoder**. One vector comes out for each patch, so 16 patches give 16 vectors.',
        'Real systems use much smaller patches of 14 to 16 pixels. Smaller patches mean more patches for the same image, so one image gives hundreds of vectors.'],
   end='So both conversions follow the same steps. The signal is cut into small pieces, the pieces are kept in order, and an encoder gives one vector for each piece.'),
 ],
 questions=[
  q('Why is text easier for an LLM to read than speech or an image?','Text is easier because it is already a row of pieces. Each piece, such as "Now," "crack," "the" or "egg," can become one vector.\n\nSpeech is air pressure changing in time, and an image is a grid of light. Neither one contains words or separate pieces. So both have to be converted into rows of vectors first.'),
  q('How is speech turned into a row of vectors?','Speech is turned into a row of vectors by slicing it in time. First, the sound is cut into short slices called frames, each about 20 milliseconds long. Then the slices go through a speech encoder, which is a neural network trained on a large amount of audio. One vector comes out for each slice, and the vectors stay in time order.'),
  q('Why does one second of speech become 50 vectors?','One second of speech becomes 50 vectors because each slice gives one vector. Each slice is about 20 milliseconds long, and 50 slices of that length fill one second. So one second gives 50 vectors.'),
  q('How is an image turned into a row of vectors?','An image is turned into a row of vectors by cutting it into patches. First, a grid cuts the image into small squares called patches. Then the patches are laid out in a row in reading order, so the image becomes a sequence. Last, a vision encoder gives one vector for each patch.'),
  q('The egg example gives 16 vectors. Why does one image give hundreds of vectors in real systems?','One image gives hundreds of vectors in real systems because real systems use much smaller patches. Their patches are only 14 to 16 pixels. Smaller patches mean more patches for the same image. Each patch gives one vector, so there are hundreds of vectors.'),
  q('What is the similarity between converting speech and converting an image, and what is the difference?','The similarity is that both are cut into small pieces, the pieces are kept in order, and an encoder gives one vector for each piece.\n\nThe difference is what is cut. Speech is cut in time into frames of about 20 milliseconds. An image is cut in space into square patches, which are then placed in reading order.'),
 ]),
dict(id='m3-one-row',tier=NEW,lectures='Lecture 19',title='One row, three senses: cross-modal dependencies',
 blocks=[
  dict(ref='Lecture 19 · p13',
   main='**Image patches, speech frames and words can all be placed in one row, and the model guesses the hidden piece.** The image patches come first, the speech frames come next, and the words come last. The words are "Now," "crack" and "the," and the word after them is hidden.',
   sub=['The words before the gap still give clues, the same as in a row that holds only text.',
        'Clues now also come from the other senses. A patch that contains an egg helps the model guess the hidden word. The sound of cracking helps too.',
        'A link between two different kinds of signal is called a **cross-modal dependency**.'],
   end='So the game is exactly the same as before. The only new thing is that some of the clues come from other senses.'),
  dict(ref='Lecture 19 · p14',
   main='**"Three cute puppies" is one event given in three forms, and training puts all three in one row.** The first form is an image of three puppies, cut into 18 patches. The second form is the phrase spoken aloud. The third form is the three written words.',
   sub=['The spoken phrase is shown as a **spectrogram** (a display of a sound laid out in time). Time runs from left to right. Higher up means a higher frequency. A darker area means more energy.',
        'Each thin column of the spectrogram is one frame. Each word has its own stretch of time, with "three" first and "puppies" last.',
        'The voice is a speech synthesizer (an MBROLA diphone voice). It is not a recording of a person.'],
   end='So the image, the sound and the words are three views of one event. In training, one piece of the row is hidden, and the model has to guess it.'),
 ],
 questions=[
  q('What is a cross-modal dependency? Give an example.','A cross-modal dependency is a link between two different kinds of signal, in which a piece from one sense helps predict a piece from another sense.\n\nFor example, in "Now crack the ?", an image patch that contains an egg helps the model guess the hidden word. The sound of cracking helps too.'),
  q('When image patches and speech frames are added to the row, what stays the same and what changes?','The game stays the same. The model still guesses the hidden piece from the pieces it can read, and the words before the gap still give clues.\n\nWhat changes is where some of the clues come from. Some clues now come from image patches and speech frames.'),
  q('In the spectrogram of "three cute puppies," what do left to right, height and darkness mean?','Left to right is time, so "three" comes first and "puppies" comes last. Height is frequency, so higher up means a higher frequency. Darkness is energy, so a darker area means more energy. Each thin column is one frame.'),
  q('Why are the image, the spectrogram and the words called three views of one event?','They are called three views of one event because all three describe the same thing, which is three cute puppies. The image gives it as patches, the speech gives it as frames, and the text gives it as words. In training, all three go into one row.'),
 ]),
dict(id='m3-training',tier=NEW,lectures='Lecture 19',title='The three training examples: hidden word, hidden sound frame, hidden image patch',
 blocks=[
  dict(ref='Lecture 19 · p15',
   main='**In training example 1, the hidden piece is a word, and the image and the sound settle the guess.** The row holds the image, then the sound, then the words "three" and "cute." The word after "cute" is hidden.',
   sub=['With the words alone, the bets are spread out. This is because many endings fit after "three cute," such as "kittens," "puppies" and "babies."',
        'With the image and the sound, the bet piles up on "puppies." This is because the image contains puppies, and the sound contains the spoken word "puppies."',
        'The true word is then revealed, and the model is graded on how much it bet on that word. The model bet 0.85 on "puppies."'],
   end='So the nudge to the weights is small. This is because the model bet a lot on the true word, so the error is small, and a small error moves the weights only a little.'),
  dict(ref='Lecture 19 · p16',
   main='**In training example 2, the hidden piece is a frame of sound, and three clues help the model guess it.** The row is put in a new order, with the image first, then the words, then the sound. This is like teaching the model to speak a sentence it was given. The sound is predicted frame by frame, from left to right.',
   sub=['The frames already heard are the first clue. The voice and the **formants** (frequency regions with strong energy) change smoothly, so the last few frames say a lot about the next one.',
        'The words are the second clue. They say which sound should come next, and here it is the vowel in "pup."',
        'The image is the third clue. It contains puppies, so it backs up the words. It is a weaker clue here.',
        'A frame is a column of numbers. Each number is how much energy there is in one frequency band. The guess is close to the true frame, but it is not exact.'],
   end='So the error is how far each guessed number is from the true number, and that error nudges the weights.'),
  dict(ref='Lecture 19 · p17',
   main='**In training example 3, the hidden piece is a patch of the image, and the biggest error is the colour.** The row is put in a new order again, with the words first, then the sound, then the image. This is like teaching the model to draw what it was told. The patches are predicted in reading order.',
   sub=['The patches already drawn are the first clue. Above the hidden patch is background. To its left are two puppies, so the model has seen what a puppy in this image looks like.',
        'The words are the second clue. "Three" says a third puppy must appear, because only two are drawn. "Puppies" says to expect dog ears.',
        'The sound is the third clue. It carries the same words, so it backs up the text.',
        'The model guesses a blurry puppy ear in the average colour of the first two puppies. The true puppy is dark.'],
   end='So the biggest error is the colour. This is because no clue in the words, the sound or the patches already drawn said the third puppy would be dark. Only systems that also produce images are trained this way.'),
 ],
 questions=[
  q('How do the model\'s bets on the next word change when the image and the sound are added to "three cute"?','With the words alone, the bets are spread out over "kittens," "puppies" and "babies." This is because many endings fit after "three cute."\n\nWith the image and the sound, the bet piles up on "puppies." This is because the image contains puppies, and the sound contains the spoken word "puppies."'),
  q('The model bet 0.85 on "puppies," and the true word is "puppies." Is the nudge to the weights large or small? Why?','The nudge to the weights is small. This is because the model is graded on how much it bet on the true word. It bet 0.85, which is a lot, so the error is small. A small error moves the weights only a little.'),
  q('What would happen to the nudge if the model had bet only a little on "puppies"?','The nudge would be larger. This is because a small bet on the true word is a large error. A larger error moves the weights more, so that the true word gets a bigger bet next time.'),
  q('Name the three clues that help the model predict a hidden sound frame, and say what each one gives.','The first clue is the frames already heard. The voice and the formants change smoothly, so the last few frames say a lot about the next one.\n\nThe second clue is the words. They say which sound should come next, which here is the vowel in "pup."\n\nThe third clue is the image. It contains puppies, so it backs up the words, but it is a weaker clue here.'),
  q('What is the error when the model guesses a sound frame?','The error is how far the guess is from the true frame. A frame is a column of numbers, and each number is how much energy there is in one frequency band. The error is how far apart each guessed number is from the matching true number. That error nudges the weights.'),
  q('In training example 3, why is the colour the biggest error?','The colour is the biggest error because no clue gave the colour of the third puppy. The model guessed a puppy ear in the average colour of the first two puppies. The true puppy is dark. Nothing in the words, the sound or the patches already drawn said the third puppy would be dark.'),
  q('What do the words "three" and "puppies" tell the model about the hidden image patch?','"Three" tells the model that a third puppy must appear, because only two puppies have been drawn so far. "Puppies" tells the model to expect dog ears. So the model guesses a puppy ear for the hidden patch.'),
  q('Are all systems trained to predict image patches?','No. Only systems that also produce images are trained to predict image patches. Systems that only read images usually skip this step. This is because predicting a patch is like teaching the model to draw what it was told.'),
 ]),
dict(id='m3-clues',tier=NEW,lectures='Lecture 19',title='Every piece can be the hidden one: two kinds of clue',
 blocks=[
  dict(ref='Lecture 19 · p18',
   main='**Any piece of the row can be the hidden one, and each sense gives a clue for it.** The hidden piece can be a word, a sound frame or an image patch.',
   sub=['For a **hidden word**, the words "three cute" call for a plural noun, the sound has just spoken the word, and the image contains puppies.',
        'For a **hidden frame**, the words say which sound comes next, the voice and the formants carry on, and the image backs up which word is being said.',
        'For a **hidden patch**, the word "three" says one more puppy is coming, the sound gives the same words in heard form, and the fur and the background carry on.'],
   end='So a clue from the same sense says how the signal continues, and clues from the other senses say what the thing is. Training on all three senses together helps, because each sense fills gaps that the others leave.'),
 ],
 questions=[
  q('What is the difference between a clue from the same sense as the hidden piece and a clue from another sense?','A clue from the same sense mostly says how the signal continues. Grammar does this for a hidden word, smooth formants do it for a hidden frame, and fur and background do it for a hidden patch.\n\nClues from the other senses mostly say what the thing is. Here they say puppies, three of them.'),
  q('For a hidden sound frame, which clue comes from the same sense, and what does it tell the model?','The clue from the same sense is that the voice and the formants carry on from the frames already heard. It tells the model how the sound continues. The words and the image are the other senses, and they say which word is being said.'),
  q('Why does training on words, sound and images together help?','Training on all three senses together helps because each sense fills gaps that the others leave. A clue from the same sense says how the signal continues. Clues from the other senses say what the thing is. So with all three senses, the model has both kinds of clue for every hidden piece.'),
 ]),
dict(id='m3-talking-back',tier=NEW,lectures='Lecture 19',title='Talking back, what is new and what stays the same',
 blocks=[
  dict(ref='Lecture 19 · p19',
   main='**The model speaks by predicting codes for sound, and a decoder turns the codes back into sound.** First, sound is compressed into discrete codes (separate numbered units), such as 417, 82 and 903. Each code works like a new word added to the vocabulary.',
   sub=['The model predicts the next code exactly as it predicts the next word. So speaking is the same guessing game again.',
        'A **decoder** then turns the row of predicted codes back into a sound wave that can be heard.'],
   end='So the model gives the codes, and the decoder gives the sound.'),
  dict(ref='Lecture 19 · p19',
   main='**Three things are new when a model is trained on words, sounds and images, and one thing stays the same.** The first new thing is a **shared currency**, in which everything becomes vectors in one row. The second is **data where the senses appear together**. The third is **a schedule that protects what was already learned**.',
   sub=['What stays the same is the learning rule, which is to find the dependencies in the signal.'],
   end='So the model still guesses a hidden piece and nudges its weights. The signal has only become wider, because it now holds words, sounds and images.'),
 ],
 questions=[
  q('How does the model talk back?','The model talks back by predicting codes for sound. First, sound is compressed into discrete codes, and each code works like a new word in the vocabulary. Then the model predicts the next code exactly as it predicts the next word. Last, a decoder turns the codes back into a sound wave.'),
  q('What three things are new when an LLM is trained on words, sounds and images?','The first new thing is a shared currency, in which everything becomes vectors in one row. The second is data where the senses appear together. The third is a schedule that protects what was already learned.'),
  q('What stays the same when the signal holds words, sounds and images?','The learning rule stays the same. The model still finds the dependencies in the signal by guessing a hidden piece and nudging its weights. The signal has only become wider.'),
 ]),
]

# The Module II topics whose slides Lecture 19 repeats, and the Lecture 19 page for each "Also know" block.
CARRIED=[('llm-sequences',2),('heads-layers',3),('recurrent-dynamical',4),('phonotactics',6),('agentic',2)]
REF_MAP={'Lecture 18 · p3':'Lecture 19 · p3','Lecture 17 · p5 · Lecture 18 · p5':'Lecture 19 · p5','Lecture 17 · p4 · Lecture 18 · p2':'Lecture 19 · p2',
         'Lecture 18 · p4':'Lecture 19 · p4','Lecture 18 · p8':'Lecture 19 · p8','Lecture 17 · p6 · Lecture 18 · p6':'Lecture 19 · p6','Lecture 17 · p7 · Lecture 18 · p7':'Lecture 19 · p7'}
ALSO={('phonotactics','**After pl'):7}

def carried_topics():
    raw=(ROOT/'modern/essentials.js').read_text();data=json.loads(raw[raw.index('{'):raw.rindex('}')+1])
    old={t['id']:t for t in data['versions']['exam2-v12']['topics']};out=[]
    for tid,default in CARRIED:
        t=old[tid];blocks=[]
        for b in t['blocks']:
            nb={k:v for k,v in b.items() if k not in('media','ref')}
            if b['ref'] in REF_MAP:nb['ref']=REF_MAP[b['ref']]
            else:
                assert b['ref'].startswith('Also know'),b['ref']
                page=next((p for (i,start),p in ALSO.items() if i==tid and b.get('main','').startswith(start)),default)
                nb['ref']=f'Lecture 19 · p{page}'
            blocks.append({k:v for k,v in nb.items() if v not in('',[],None) or k=='ref'})
        questions=[dict(source=x['source'],q=x['q'],a=x['a'],**({'img':x['img'],'alt':x.get('alt','')} if x.get('img') else {})) for x in t['questions']]
        out.append(dict(id='m3-'+tid,tier=OLD,lectures='Lecture 19 (same slides as Lecture 18)',title=t['title'],blocks=blocks,questions=questions))
    return out

META={
 'moduleId':'module3','title':'Module III','range':'Lecture 19',
 'study':{'title':'Study this first · Module III',
  'lead':'If you study only one page of Module III, study this one. Lecture 19 is the first lecture after Exam 2. The new material comes first, then the Lecture 18 slides that Lecture 19 repeats, each with what to know, the slide beside the notes, and questions with their answers.',
  'askLead':'Questions on Lecture 19 in the way he asks them, with answers. The questions marked Predicted are written from the slides. They are predictions, not confirmed exam questions.',
  'focusLabel':'Module III focus (predicted questions, with answers)'},
 'scope':{'label':'On the final',
  'covers':'Module III is everything after Exam 2. So far that is Lecture 19, from November 17. The final exam is cumulative, so Modules I and II come back too.',
  'final':'',
  'evidence':'Lecture 19 repeats seven Lecture 18 slides and then adds eleven new slides on training an LLM with words, sounds and images. On November 10 he said the LLM part is kept for the final, so the repeated slides matter again. No review sheet for the final has been handed out yet, and there is no class transcript for November 17. Every question on the new slides is marked Predicted. They are predictions, not confirmed exam questions.'},
 'flags':[
  'The notes for the new slides come from the slides and their speaker notes only. There is no class transcript for November 17, so anything he added out loud is not here.',
  'The speech in the three cute puppies example was made with a speech synthesizer (an MBROLA diphone voice). It is not a recording of a person.',
  'The slides call the visual input the picture. These notes say image and image patch.',
  'The last slide lists a schedule that protects what was already learned, and it does not explain the schedule. These notes repeat the item and add nothing from outside the slides.'],
 'versions':[
  {'key':'module3-v1','label':'Module III · Study this first (Lecture 19, notes with the slides beside them)','overlay':False,'notes':True},
  {'key':'module3-v2','label':'Module III · Study this first (Lecture 19, with a My notes box under each block)','overlay':True,'notes':True}],
 'bytopic':{'title':'Notes by topic · Lecture 19','lead':'Each topic brings together every slide that teaches it, said once. Read the notes with their slide beside them, then answer the questions.'},
}

if __name__=='__main__':
    carried=carried_topics()
    new_items=[];his_items=[];old_items=[]
    for topics in (TOPICS,carried):
        for t in topics:
            ids=[]
            for x in t['questions']:
                # His own questions (Lab 9 and the Lecture 18 exam cue) are kept apart from predictions.
                bucket,prefix=(new_items,'new') if topics is TOPICS else (old_items,'kept') if x['source']=='Predicted' else (his_items,'his')
                bucket.append(dict(number=len(bucket)+1,question=x['q'],answer=x['a'],**({'img':x['img'],'alt':x.get('alt','')} if x.get('img') else {})));ids.append(f'{prefix}-{len(bucket)}')
            t['questions']=ids
    exam={'review':{'title':'Final exam review guide · Module III',
      'lead':'Every question on Lecture 19 with its answer, written in plain steps, the answer first and then the reason. The new slides come first, then the slides kept from Lecture 18.',
      'note':'No review sheet for the final has been handed out yet. The questions on the new slides are predictions written from the slides. The questions on the repeated slides are the ones from the Module II study page, including his Lab 9 questions.',
      'sets':[
       {'id':'new','title':f'Lecture 19 · new slides · {len(new_items)} predicted questions','about':'Written from Lecture 19 pages 9 to 19 in the way he asks questions. These are predictions, not confirmed exam questions.','prefix':'Predicted (new slide)','items':new_items},
       {'id':'his','title':f'Slides repeated from Lecture 18 · {len(his_items)} of his questions','about':'His Lab 9 questions and the heads question he said is on the exam. The same slides are in Lecture 19, and on November 10 he said the LLM part is kept for the final.','prefix':'His question','items':his_items},
       {'id':'kept','title':f'Slides repeated from Lecture 18 · {len(old_items)} predicted questions','about':'Predicted questions from the Module II study page for the slides that Lecture 19 repeats.','prefix':'Predicted (repeated slide)','items':old_items}]}}
    dump=lambda name,value:(HERE/name).write_text(json.dumps(value,ensure_ascii=False,indent=1)+'\n')
    dump('topics_1.json',TOPICS);dump('topics_2.json',carried);dump('exam.json',exam);dump('meta.json',META)
    print('Module III inputs written:',len(TOPICS),'new topics,',len(carried),'repeated topics,',len(new_items),'+',len(his_items),'+',len(old_items),'questions')
