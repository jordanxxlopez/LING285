"""Add Lecture 19 (Module III) to the modern workspace without rebuilding earlier lectures.

The modern editions were assembled once for Lectures 01 to 18 and several are locked by
hash. This script therefore inserts only a `lecture19` collection into each
modern/transcripts-*.json file and appends the Lecture 19 concepts, questions and
summaries to modern/content.js. Every earlier lecture stays byte-for-byte as it was
(check with authoring/check_additive.py).

Pages 2 to 8 are the Lecture 18 slides unchanged, so each edition reuses its own
Lecture 18 teaching for them. Pages 9 to 19 are written here or in the files named below.

Run: python3 ling285/authoring/lecture19_modern.py
"""
from copy import deepcopy
from pathlib import Path
import hashlib,json,re,sys
A=Path(__file__).resolve().parent;ROOT=A.parent;OUT=ROOT/'modern'
sys.path.insert(0,str(A))
import lecture19_editions as E
import lecture19_practice as P
from check_v9 import parse
NEW=list(range(9,20));KEY='lecture19'

# Concept text for the five concept-based editions (Professor, B, C, Version 23, Version 20).
CONCEPTS={
'hidden-word':dict(page=9,
 opening='**An LLM learns by predicting a hidden word from the words before it**, and each of those words supplies a clue. The relationships between the clue words and the hidden word are interdependencies.',
 mechanism='The model gives a probability to each possible next word, with the most on “egg,” less on “nut” and the least on “code.” After the true word is revealed, the weights are nudged so that the right word receives a larger probability next time.',
 consequence='The same procedure applies when the signal contains sounds and images as well as words. The content of the signal changes, while guessing a hidden piece and adjusting the weights stays the same.',
 plain='The model reads “The chef cracks the” and has to guess the next word. It bets most on “egg,” and after the answer is revealed its weights change a little so the next guess is better.',
 natural='**A hidden word turns a sentence into a guessing task**. Every word before the gap is a clue, so the model can bet more on “egg” than on “nut” or “code.”',
 questions=['How does an LLM learn from the sentence “The chef cracks the ?”','Why does the model spread its bets over “egg,” “nut” and “code”?'],
 answers=['It guesses the hidden word from the earlier words and then adjusts its weights. **Each revealed answer nudges the weights so the right word gets a bigger bet**.',
          'The model does not know the hidden word, and several words could follow. **The earlier words make “egg” the most likely, so it receives the largest bet**.']),
'three-forms':dict(page=10,
 opening='**Text, speech and images arrive in three different forms**, and only text is already a row of pieces. Speech is air pressure changing in time, and an image is a grid of light.',
 mechanism='An LLM reads a row of vectors. Each piece of text can become one vector directly, while speech and images contain no words and no separate pieces, so they have to be converted into rows of vectors first.',
 consequence='The conversion comes before any learning from speech or images. Once all three forms are rows of vectors, one model can read them together.',
 plain='Text is easy because “Now crack the egg” is already four pieces in a row. Speech and images have no pieces like that, so they have to be changed into rows of vectors.',
 natural='**Only text comes ready for the model**. Speech is a continuous change in air pressure and an image is a grid of light, so both need a conversion into rows of vectors.',
 questions=['Why is text easier for an LLM to read than speech or an image?','Why do speech and images have to be converted before an LLM can use them?'],
 answers=['Text is already a row of pieces, and each piece can become a vector. **Speech and images do not arrive as rows of pieces**.',
          'An LLM can read only a row of vectors. **Speech is air pressure changing in time and an image is a grid of light, so neither is a row of vectors until it is converted**.']),
'speech-frames':dict(page=11,
 opening='**Speech becomes a row of vectors by slicing time into short frames**, each about 20 milliseconds long. A speech encoder then gives one vector for each slice.',
 mechanism='The speech encoder is a neural network trained on a large amount of audio. Each slice of sound goes in and one vector comes out, and slices with different sounds give vectors with different numbers.',
 consequence='One second of speech becomes 50 vectors in time order. The speech is then a row, just like a sentence, so the model can read it one vector after another.',
 plain='The sound is cut into slices of about 20 milliseconds. A speech encoder changes each slice into a vector, so one second of speech becomes 50 vectors in order.',
 natural='**Cutting speech into frames gives it pieces**. Each frame lasts about 20 milliseconds, and the speech encoder changes each frame into one vector.',
 questions=['How is speech turned into a row of vectors?','Why does one second of speech become 50 vectors?'],
 answers=['The sound is cut into frames of about 20 milliseconds and passed through a speech encoder. **One vector comes out for each slice, in time order**.',
          'Each slice gives one vector. **Fifty slices of about 20 milliseconds fill one second, so one second gives 50 vectors**.']),
'image-patches':dict(page=12,
 opening='**An image becomes a row of vectors by cutting it into patches**, which are small squares of the image. The patches are laid out in reading order, and a vision encoder gives one vector for each patch.',
 mechanism='Reading order gives the patches a first piece and a last piece, so the image becomes a sequence like a sentence. The 16 patches of the egg image become 16 vectors in the same order.',
 consequence='Real systems use much smaller patches of 14 to 16 pixels. Smaller patches mean more patches for the same image, so one image gives hundreds of vectors.',
 plain='The image is cut into small squares called patches. The patches are placed in a row in reading order, and a vision encoder changes each patch into a vector.',
 natural='**Cutting an image into patches gives it pieces**. Reading order arranges the patches as a row, and the vision encoder changes each patch into one vector.',
 questions=['How is an image turned into a row of vectors?','Why does one image give hundreds of vectors in real systems?'],
 answers=['A grid cuts the image into patches, and the patches are laid out in reading order. **A vision encoder then gives one vector for each patch**.',
          'Real systems use patches of only 14 to 16 pixels. **Smaller patches mean many more patches for the same image, so there are hundreds of vectors**.']),
'cross-modal':dict(page=13,
 opening='**Image patches, speech frames and words can be placed in one row**, with the last word hidden. The earlier words still give clues, and the other senses now give clues as well.',
 mechanism='A patch containing an egg and the sound of cracking both help predict the hidden word. A link between two different kinds of signal is a cross-modal dependency.',
 consequence='The game is the same as with text alone. The model guesses the hidden piece from the pieces it can read, and the only change is that some clues come from other senses.',
 plain='The patches, the frames and the words all sit in one row. The model still guesses the hidden word, and now an image patch or a sound can help as well as the earlier words.',
 natural='**Clues can cross from one sense to another**. An image patch containing an egg and the sound of cracking both point to the hidden word after “Now crack the.”',
 questions=['What is a cross-modal dependency?','What stays the same when image patches and speech frames join the words in one row?'],
 answers=['It is a link in which a piece from one sense helps predict a piece from another sense. **A patch containing an egg helping to predict a word is one example**.',
          'The game stays the same. **The model still guesses the hidden piece from the pieces it can read, and the earlier words still give clues**.']),
'three-views':dict(page=14,
 opening='**“Three cute puppies” is one event given in three forms**, an image, the spoken phrase and the written words. Training places all three in one row.',
 mechanism='The image is cut into 18 patches. The spoken phrase is a spectrogram in which time runs from left to right, a higher position means a higher frequency and a darker area means more energy, and each thin column is one frame.',
 consequence='Because the three forms describe the same event, a piece hidden in one form can be guessed with help from the other two. The speech in the example was made with a speech synthesizer.',
 plain='The same phrase is given as an image, as speech and as text. All three are put in one row, and the model has to guess whichever piece is hidden.',
 natural='**One event can be seen, heard and read**. The image, the spectrogram of the spoken phrase and the three written words are three views of “three cute puppies.”',
 questions=['What do the image, the spectrogram and the words of “three cute puppies” have in common?','How is the spectrogram of the spoken phrase read?'],
 answers=['They are three views of one event. **Training puts all three into one row and hides one piece for the model to guess**.',
          'Time runs from left to right and a higher position means a higher frequency. **A darker area means more energy, and each thin column is one frame**.']),
'train-word':dict(page=15,
 opening='**In the first training example the hidden piece is the word after “three cute”**, and the image and the sound settle the guess. The row holds the image, the sound and the words.',
 mechanism='With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” The image contains puppies and the sound contains the spoken word, so with those clues the bet piles up on “puppies.”',
 consequence='The model bet 0.85 on the true word, so the error is small and the weights move only a little. A smaller bet on the true word would be a larger error and would move the weights more.',
 plain='From the words “three cute” alone, the model cannot tell which ending is right. The image and the sound point to “puppies,” so the model bets most on it, and its weights then need only a small change.',
 natural='**Words alone leave the model unsure, and the other senses settle the guess**. After “three cute,” the image and the sound move almost the whole bet onto “puppies.”',
 questions=['How do the model’s bets change when the image and the sound are added to “three cute”?','Why is the nudge to the weights small in the first training example?'],
 answers=['With the words alone the bets are spread over several endings. **With the image and the sound, the bet piles up on “puppies”**.',
          'The model is graded on how much it bet on the true word. **It bet 0.85 on “puppies,” so the error is small and the weights move only a little**.']),
'train-frame':dict(page=16,
 opening='**In the second training example the hidden piece is a frame of sound**, predicted from left to right. This is like teaching the model to speak a sentence it was given.',
 mechanism='The earlier frames help because the voice and the formants change smoothly. The words say the next sound is the vowel in “pup,” and the image backs up the words as a weaker clue.',
 consequence='A frame is a column of numbers for the energy in each frequency band. The guess is close but not exact, and the difference between the guess and the truth is the error that nudges the weights.',
 plain='The model guesses the next slice of sound. The sound so far helps the most, the words say which sound comes next, and the image backs up the words.',
 natural='**The sound heard so far is the strongest clue for the next frame**. The voice and the formants change smoothly, while the words and the image say which sound to expect.',
 questions=['Which clues help the model predict a hidden sound frame?','What is the error when the model guesses a sound frame?'],
 answers=['The earlier frames, the words and the image all help. **The earlier frames help most because the voice and the formants change smoothly**.',
          'A frame is a column of energy values, one for each frequency band. **The error is how far each guessed value is from the true value**.']),
'train-patch':dict(page=17,
 opening='**In the third training example the hidden piece is a patch of the image**, predicted in reading order. This is like teaching the model to draw what it was told.',
 mechanism='The earlier patches give background above and two puppies to the left. “Three” says a third puppy must appear, “puppies” says to expect dog ears, and the sound carries the same words as a backup.',
 consequence='The guess is a puppy ear in the average colour of the first two puppies, but the true puppy is dark. The colour is the biggest error because no clue gave it. Only systems that also produce images are trained this way.',
 plain='The model guesses the next square of the image. The earlier squares and the words tell it a puppy ear belongs there, but nothing tells it the colour.',
 natural='**The clues give the content of the patch but not its colour**. Two puppies are already drawn and “three” calls for one more, yet no clue says the third puppy is dark.',
 questions=['Which clues help the model predict a hidden image patch?','Why is the colour the biggest error in the third training example?'],
 answers=['The earlier patches, the words and the sound all help. **The earlier patches give two puppies, and “three” says one more must appear**.',
          'The model guessed the average colour of the first two puppies. **No clue in the words, the sound or the earlier patches said the third puppy would be dark**.']),
'clue-table':dict(page=18,
 opening='**Any piece of the row can be the hidden one**, and the words, the sound and the image each give a clue for it. The clue from the same sense does a different job from the other two.',
 mechanism='A clue from the same sense says how the signal continues, as grammar does for a hidden word, smooth formants do for a hidden frame, and fur and background do for a hidden patch. Clues from the other senses say what the thing is.',
 consequence='Training on all three senses together helps because each sense fills gaps the others leave. A model with one sense alone would have only the clues about how the signal continues.',
 plain='Whatever piece is hidden, each sense gives a clue. The same sense says how the signal carries on, and the other senses say what is being described.',
 natural='**Clues from the same sense and clues from other senses do different jobs**. The same sense says how the signal continues, and the other senses say what the thing is.',
 questions=['What does a clue from the same sense as the hidden piece mostly say?','Why does training on words, sound and images together help?'],
 answers=['It mostly says how the signal continues. **Clues from the other senses mostly say what the thing is**.',
          'Each sense gives a kind of clue the others do not. **Each sense fills gaps the others leave**.']),
'talking-back':dict(page=19,
 opening='**The model speaks by predicting codes for sound**. Sound is compressed into discrete codes that work like new words in the vocabulary, and a decoder turns the predicted codes back into sound.',
 mechanism='The model predicts the next code exactly as it predicts the next word. The decoder then takes the row of codes and produces a sound wave.',
 consequence='Three things are new, which are a shared currency of vectors in one row, data where the senses appear together, and a schedule that protects what was already learned. What stays the same is finding the dependencies in the signal.',
 plain='Sound is changed into codes, and the model guesses the next code the same way it guesses the next word. A decoder then changes the codes back into sound.',
 natural='**Speaking is the same guessing game played on sound codes**. Each code works like a new word, and a decoder changes the predicted codes back into a sound wave.',
 questions=['How does the model talk back?','What is new and what stays the same when a model is trained on words, sounds and images?'],
 answers=['Sound is compressed into discrete codes that work like new words. **The model predicts the next code like the next word, and a decoder turns the codes back into sound**.',
          'The new things are a shared currency of vectors, data where the senses appear together, and a schedule that protects what was learned. **The learning rule stays the same, which is finding the dependencies in the signal**.']),
}
PAGE_CONCEPT={c['page']:k for k,c in CONCEPTS.items()}
SUMMARY='Explain how speech and images become rows of vectors, how clues cross from one sense to another, and how a hidden word, sound frame or image patch each trains the same model.'

# Original C Version 2: three plain paragraphs per page. D Version 2 adds sub-bullets.
CV2={
9:['A **hidden word** is the training task of an LLM. The model reads “The chef cracks the” and predicts the word that follows, using each earlier word as a clue.',
   'The model answers with **bets**, which are the probabilities it gives to possible words. “Egg” receives the largest bet, “nut” a smaller one and “code” the smallest.',
   '**Learning** is the nudging of the weights after the true word is revealed, so that the right word receives a larger bet next time. The same learning applies to a signal that holds words, sounds and images.'],
10:['**Text** is already a row of pieces, and each piece can become a vector. “Now crack the egg” is four such pieces.',
   '**Speech** is air pressure changing in time, and an **image** is a grid of light. Neither contains words.',
   'An LLM reads only a row of vectors. Speech and images are therefore **converted** into rows of vectors before the model reads them with text.'],
11:['A **frame** is a slice of speech about 20 milliseconds long. Speech is cut into frames at regular times.',
   'A **speech encoder** is a neural network trained on a large amount of audio. It gives one vector for each slice.',
   'One second of speech becomes **50 vectors in time order**. The speech is then a row, just like a sentence.'],
12:['A **patch** is one small square of an image. A grid cuts the image of an egg in a pan into 16 patches.',
   'The patches are laid out in **reading order**, so the image becomes a sequence. A **vision encoder** gives one vector for each patch.',
   'Real systems use patches of 14 to 16 pixels. One image then gives **hundreds of vectors**.'],
13:['Image patches, speech frames and words are placed in **one row**, and the last word is hidden. The words before it are “Now,” “crack” and “the.”',
   'The earlier words give clues, and so do a patch containing an egg and the sound of cracking. A link between two kinds of signal is a **cross-modal dependency**.',
   'The game is unchanged. The model guesses the hidden piece, and some clues now come from other senses.'],
14:['“Three cute puppies” is given as an **image** cut into 18 patches, as the **spoken phrase** and as three **written words**.',
   'The spoken phrase is a **spectrogram**. Time runs from left to right, a higher position means a higher frequency, and a darker area means more energy.',
   'These are **three views of one event**. Training places them in one row and hides one piece.'],
15:['The first training example hides the **word** after “three cute.” The row holds the image, the sound and the words.',
   'With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” With the image and the sound, the bet piles up on **“puppies.”**',
   'The model bet 0.85 on the true word. The error is therefore small, and **the nudge to the weights is small**.'],
16:['The second training example hides a **frame of sound**. The sound is predicted frame by frame from left to right.',
   'The earlier frames help because the voice and the **formants** change smoothly. The words say the next sound is the vowel in “pup,” and the image backs up the words.',
   'A frame is a column of numbers for the energy in each frequency band. The difference between the guess and the truth is the **error that nudges the weights**.'],
17:['The third training example hides a **patch of the image**. The patches are predicted in reading order.',
   'The earlier patches give background and two puppies. “Three” says one more puppy must appear, and “puppies” says to expect dog ears.',
   'The guess has the average colour of the first two puppies, and the true puppy is dark. **The colour is the biggest error** because no clue gave it.'],
18:['A hidden **word**, a hidden **frame** and a hidden **patch** each receive a clue from the words, the sound and the image.',
   'A clue from **the same sense** says how the signal continues. Grammar, smooth formants, and fur and background are the three cases.',
   'Clues from **the other senses** say what the thing is, which here is puppies, three of them. Each sense fills gaps the others leave.'],
19:['To speak, sound is compressed into **discrete codes** that work like new words in the vocabulary. The model predicts the next code like the next word.',
   'A **decoder** turns the predicted codes back into a sound wave.',
   'Three things are new, which are a shared currency of vectors in one row, data where the senses appear together, and a schedule that protects what was already learned. **Finding the dependencies in the signal** stays the same.'],
}
# Original C Version 3 explains what the parts of each figure stand for.
VIS={
9:['The arcs join each of the four words to the empty box, so each arc is one clue.','The three bars are the model’s bets, and a longer bar is a larger probability.'],
10:['The four boxes are the pieces of text, the wave is the air pressure of speech, and the egg in a pan is the image.','The banner states the task, which is turning all three into rows of vectors.'],
11:['The dashed lines on the wave are the cuts between slices.','Each small column under the encoder is one vector, and its shading stands for different numbers.'],
12:['The white lines on the image are the cuts between patches.','The strip above the encoder is the same image rearranged as a row, and each small column under the encoder is one vector.'],
13:['The green squares are image patches, the orange squares are speech frames and the blue boxes are words.','The short arcs are clues from words, and the long arcs marked **Clues from other senses** are the cross-modal clues.'],
14:['The white lines on the image mark the 18 patches.','The dashed lines on the spectrogram separate the three words in time.'],
15:['The purple bars are the bets from text alone, and the blue bars are the bets after the image and the sound are added.','The long arcs run from the image and the sound to the hidden word, and the short arcs run from the two words.'],
16:['The highlighted column on the spectrogram is the frame being guessed, and the faded region to its right is sound not heard yet.','The three small columns are the guess, the truth and the error, each with one cell for each frequency band.'],
17:['The square with the question mark is the patch being guessed, and the faded patches have not been drawn.','The three small squares are the guess, the truth and the error.'],
18:['The three lines of the table are the three kinds of hidden piece, and its three columns are the senses that give clues.','The three outlined cells are the clues that come from the same sense as the hidden piece.'],
19:['The three numbered boxes are sound codes, and the empty box is the next code to predict.','The arrows run from the codes to the decoder and from the decoder to the sound wave.'],
}

# Module III entries for the side panels (What to know by the end, What you can be asked,
# cards, contrasts, hard topics, connections, core review and figures).
K='lecture19'
GUIDES=[
 dict(id='modern-guide-m3-conversion',moduleId='module3',title='Explain how speech and images become rows of vectors.',
  points=[dict(concept='three-forms',collection=K,pages=[10]),dict(concept='speech-frames',collection=K,pages=[11]),dict(concept='image-patches',collection=K,pages=[12])],
  question='What do the conversion of speech and the conversion of an image have in common?',
  answer='Both are cut into small pieces that stay in order, and an encoder gives **one vector for each piece**. Speech is cut in time into frames, and an image is cut in space into patches.'),
 dict(id='modern-guide-m3-cross-modal',moduleId='module3',title='Explain how clues cross from one sense to another.',
  points=[dict(concept='hidden-word',collection=K,pages=[9]),dict(concept='cross-modal',collection=K,pages=[13]),dict(concept='three-views',collection=K,pages=[14])],
  question='What changes when image patches and speech frames are placed in the same row as the words?',
  answer='The game stays the same, because the model still guesses the hidden piece. **Some of the clues now come from other senses**, and these links are cross-modal dependencies.'),
 dict(id='modern-guide-m3-training',moduleId='module3',title='Follow a hidden word, a hidden sound frame and a hidden image patch through training.',
  points=[dict(concept='train-word',collection=K,pages=[15]),dict(concept='train-frame',collection=K,pages=[16]),dict(concept='train-patch',collection=K,pages=[17])],
  question='In all three training examples, what decides how much the weights change?',
  answer='The size of the error decides it. **A guess close to the truth gives a small error and a small nudge**, and a guess far from the truth gives a larger error and a larger nudge.'),
 dict(id='modern-guide-m3-clues',moduleId='module3',title='Separate same-sense clues from other-sense clues, and explain how the model talks back.',
  points=[dict(concept='clue-table',collection=K,pages=[18]),dict(concept='talking-back',collection=K,pages=[19])],
  question='Why does training on words, sound and images together help?',
  answer='A clue from the same sense says how the signal continues, and clues from the other senses say what the thing is. **Each sense fills gaps the others leave**.'),
]
ASKED=[
 dict(concept='speech-frames',collection=K,pages=[10,11,12],title='Explain the conversion of speech and images into rows of vectors.',moduleId='module3',items=[
  dict(question='How many vectors does one second of speech become, and why?',answer='One second of speech becomes 50 vectors. **Each slice of about 20 milliseconds gives one vector**, and 50 slices of that length fill one second.'),
  dict(question='Why are the patches of an image laid out in reading order?',answer='Reading order gives the patches a first piece and a last piece. **The image becomes a sequence**, like a sentence, that the model can read as a row.'),
  dict(question='What happens to the number of vectors when the patches are made smaller?',answer='The number of vectors goes up. **Smaller patches mean more patches for the same image**, and each patch gives one vector.')]),
 dict(concept='train-word',collection=K,pages=[15,16,17],title='Explain what each clue gives and how the error changes the weights.',moduleId='module3',items=[
  dict(question='Why are the bets spread out when the model has only the words “three cute”?',answer='Many endings fit after “three cute,” such as “kittens,” “puppies” and “babies.” **The words alone do not say which ending is right**.'),
  dict(question='The model bet 0.85 on the true word. Is the nudge to the weights large or small?',answer='The nudge is small. **A large bet on the truth is a small error**, and a small error moves the weights only a little.'),
  dict(question='Why did the model get the colour of the third puppy wrong?',answer='It guessed the average colour of the first two puppies. **No clue in the words, the sound or the earlier patches said the third puppy would be dark**.')]),
 dict(concept='clue-table',collection=K,pages=[13,18,19],title='Explain the two kinds of clue and what stays the same.',moduleId='module3',items=[
  dict(question='What does a clue from the same sense tell the model?',answer='It tells the model how the signal continues. **Grammar, smooth formants, and fur and background are the three examples**.'),
  dict(question='What do clues from the other senses tell the model?',answer='They tell the model what the thing is. **Here they say puppies, three of them**.'),
  dict(question='What stays the same when the signal holds words, sounds and images?',answer='The learning rule stays the same. **The model still finds the dependencies in the signal** by guessing a hidden piece and nudging its weights.')]),
]
CARDS=[
 dict(id='modern-card-m3-word',concept='train-word',collection=K,pages=[15],moduleId='module3',title='What happens to the bets when the image and the sound are added?',kind='Source training example',
  explain='The row holds an image of three puppies, the spoken phrase and the words “three cute,” and the next word is hidden. With the words alone, the bets are spread over “kittens,” “puppies” and “babies.”',
  outcome='With the image and the sound, the bet piles up on “puppies.” **The model bet 0.85 on the true word, so the nudge to the weights is small**.',
  interpret='The image and the sound are clues from other senses. The bars are an example of how the bets move, and only the 0.85 is given as a number.'),
 dict(id='modern-card-m3-frame',concept='train-frame',collection=K,pages=[16],moduleId='module3',title='How close is the guess for the next sound frame?',kind='Source training example',
  explain='The sound is predicted frame by frame from left to right. The earlier frames, the words and the image each give a clue about the next frame.',
  outcome='The guess is close to the true frame but not exact. **The error is how far each guessed energy value is from the true value**, and that error nudges the weights.',
  interpret='The earlier frames are the strongest clue because the voice and the formants change smoothly. The image is the weakest clue here.'),
 dict(id='modern-card-m3-patch',concept='train-patch',collection=K,pages=[17],moduleId='module3',title='What does the model get right and wrong about the hidden patch?',kind='Source training example',
  explain='The patches are predicted in reading order. Two puppies are already drawn, “three” calls for one more puppy, and “puppies” calls for dog ears.',
  outcome='The model guesses a blurry puppy ear in the average colour of the first two puppies, and the true puppy is dark. **The biggest error is the colour**.',
  interpret='The clues gave the content of the patch but not its colour. Only systems that also produce images are trained this way.'),
]
CONTRASTS=[
 dict(id='modern-contrast-m3-frame-patch',concept='speech-frames',collection=K,pages=[11,12],moduleId='module3',title='A frame is a piece of time, and a patch is a piece of space.',
  left=dict(term='Frame',text='A **frame** is a slice of speech about 20 milliseconds long. Frames follow one another in time order.'),
  right=dict(term='Patch',text='A **patch** is a small square of an image. Patches are placed in reading order to make a row.'),
  paragraphs=['Both are small pieces that an encoder changes into one vector each. Speech already has an order, which is time, so its frames only have to be kept in that order.','An image has no order of its own, so reading order is used to give its patches a first piece and a last piece.']),
 dict(id='modern-contrast-m3-clues',concept='clue-table',collection=K,pages=[18],moduleId='module3',title='A same-sense clue and an other-sense clue answer different questions.',
  left=dict(term='Same sense',text='A clue from **the same sense** as the hidden piece says how the signal continues, as grammar, smooth formants, and fur and background do.'),
  right=dict(term='Other senses',text='Clues from **the other senses** say what the thing is, which here is puppies, three of them.'),
  paragraphs=['Every hidden piece gets both kinds of clue when all three senses are in the row.','Each sense fills gaps the others leave, which is why training on all three together helps.']),
 dict(id='modern-contrast-m3-word-code',concept='talking-back',collection=K,pages=[9,19],moduleId='module3',title='Predicting the next code is the same game as predicting the next word.',
  left=dict(term='Next word',text='For text, the model predicts the **next word** from the words before it.'),
  right=dict(term='Next code',text='For speech output, the model predicts the **next code** from the codes before it, and each code stands for a short piece of sound.'),
  paragraphs=['Codes work like new words added to the vocabulary, so the model predicts them in the same way.','The difference comes after the prediction. A decoder has to turn the codes back into a sound wave before anything can be heard.']),
]
HARD=[
 dict(id='modern-hard-m3-nudge',concept='train-word',collection=K,pages=[15],moduleId='module3',title='Why does a good guess change the weights only a little?',
  paragraphs=['The model is graded on how much it bet on the true word. A large bet on the true word means the guess was already close to right.',
   'The error measures how far the guess was from the truth. When the bet on the truth is large, the error is small.',
   'The weights are nudged according to the error. **A small error moves the weights only a little**, and a larger error moves them more.',
   'In the example, the model bet 0.85 on “puppies,” and “puppies” was the true word. So there was little to correct.'],
  question='What would happen to the nudge if the model had bet only a little on the true word?',
  answer='The nudge would be larger. **A small bet on the truth is a large error**, and a larger error moves the weights more.'),
 dict(id='modern-hard-m3-colour',concept='train-patch',collection=K,pages=[17],moduleId='module3',title='Why is the colour the biggest error for the hidden patch?',
  paragraphs=['Each clue gives the model part of the answer. The earlier patches give background and two puppies, “three” says one more puppy must appear, and “puppies” says to expect dog ears.',
   'Together these clues say that a puppy ear belongs in the hidden patch. None of them says what colour the third puppy is.',
   'With no clue about colour, the model guesses the average colour of the first two puppies. **The true puppy is dark, so the colour is the biggest error**.',
   'That error nudges the weights.'],
  question='Which part of the hidden patch did the clues predict well, and which part did they miss?',
  answer='The clues predicted the content well, which is a puppy ear. **They missed the colour**, because no clue said the third puppy would be dark.'),
]
CONNECTIONS=[
 dict(id='modern-link-m3-vectors',moduleId='module3',title='The frames and patches here are the same vectors as in “15 vectors. Vectors of what?”',
  sources=[dict(collection=K,page=5),dict(collection=K,page=11),dict(collection=K,page=12)],
  paragraphs=['An LLM is given a sequence of vectors and predicts the next one, and the vectors can stand for words, frames of a spectrogram or patches of an image.',
   '**Slicing speech into frames and cutting an image into patches are how those vectors are made**. A speech encoder gives one vector for each frame, and a vision encoder gives one vector for each patch.',
   'So the machine only ever reads vectors, and the sequence can come from text, sound or an image.'],
  question='Why can one LLM design work for text, speech and images?',
  answer='The model only reads rows of vectors. **Text, speech and images can all be converted into rows of vectors**, so the same next-item prediction applies to each.'),
 dict(id='modern-link-m3-game',moduleId='module3',title='Guessing the next letter, the next word, the next frame, the next patch and the next code are one game.',
  sources=[dict(collection=K,page=7),dict(collection=K,page=9),dict(collection=K,page=15),dict(collection=K,page=19)],
  paragraphs=['In the next-letter quiz, a hidden letter is guessed from the letters before it. In “The chef cracks the,” a hidden word is guessed from the words before it.',
   'The training examples hide a word, a sound frame and an image patch in turn, and the model talks back by predicting the next sound code.',
   '**In every case the model guesses a hidden piece from the other pieces and then nudges its weights**. What changes is only what the pieces are.'],
  question='What stays the same across all of these guessing tasks?',
  answer='The learning rule stays the same. **The model finds the dependencies in the signal** by guessing a hidden piece and nudging its weights.'),
]
FIGURES=[
 dict(id='modern-figure-m3-one-row',concept='cross-modal',collection=K,pages=[13],moduleId='module3',title='Read the row of image patches, speech frames and words.',takeaway='**Clues reach the hidden word from the earlier words and from the other senses**. The long links from an image patch and a speech frame are the cross-modal dependencies.'),
 dict(id='modern-figure-m3-bets',concept='train-word',collection=K,pages=[15],moduleId='module3',title='Compare the bets from text alone with the bets after the image and sound are added.',takeaway='**With text alone the bets are spread out, and with the image and the sound the bet piles up on “puppies.”** The model bet 0.85 on the true word, so the nudge is small.'),
 dict(id='modern-figure-m3-table',concept='clue-table',collection=K,pages=[18],moduleId='module3',title='Read the table of clues for a hidden word, frame and patch.',takeaway='**The outlined clues come from the same sense and say how the signal continues**. The other clues come from the other senses and say what the thing is.'),
]
CORE19=[13,15,18,19]

def blocks(pairs):return [dict(text=b[0],children=list(b[1:])) for b in pairs]
def plain(paragraphs):return [dict(text=t,children=[]) for t in paragraphs]
def md_pages(folder):return parse(A/folder/'19.md')

def new_teaching(edition):
    """Teaching for pages 9 to 19 in one modern edition, as {page: teaching}."""
    c=lambda p:CONCEPTS[PAGE_CONCEPT[p]]
    if edition=='professor':return {p:[c(p)['opening'],c(p)['mechanism'],c(p)['consequence']] for p in NEW}
    if edition=='b':return {p:[c(p)['opening'],c(p)['mechanism']] for p in NEW}
    if edition in('c','follow'):return {p:[c(p)['plain'],c(p)['mechanism'],c(p)['consequence']] for p in NEW}
    if edition=='v20':return {p:[dict(text=c(p)['natural'],children=[c(p)['mechanism']]),dict(text=c(p)['consequence'],children=[])] for p in NEW}
    if edition=='original-c':return {p:blocks(E.V22[p]) for p in NEW}
    if edition=='d':
        out={}
        for p in NEW:
            b=blocks(E.V22[p]);b[-1]['children'].append(E.X2[p]);out[p]=b
        return out
    if edition=='original-c-v2':return {p:plain(CV2[p]) for p in NEW}
    if edition=='d-v2':
        out={}
        for p in NEW:
            b=plain(CV2[p]);b[1]['children'].append(E.X1[p]);b[2]['children'].append(E.X2[p]);out[p]=b
        return out
    if edition=='original-c-v3':
        out={}
        for p in NEW:
            b=plain(CV2[p]);b[0]['children'].append(VIS[p][0]);b[-1]['children'].append(VIS[p][1]);out[p]=b
        return out
    if edition=='notes-v7':return {p:[] for p in NEW}   # no PDF notes were supplied for Lecture 19
    if edition=='notes-v7-v2':
        out={}
        for p in NEW:
            b=blocks(E.V16[p]);b[0]['children'].append(E.X1[p]);b[-1]['children'].append(E.X2[p]);out[p]=b
        return out
    folder={'notes-v8':'notes-v9.1','notes-v8-1':'notes-v9.1','notes-v8-2':'notes-v9.4','notes-v9':'notes-v9','notes-v9-1':'notes-v9.1',
            'notes-v9-2':'notes-v9.2','notes-v9-3':'notes-v9.3','notes-v9-4':'notes-v9.4','notes-v10':'notes-v10','notes-v10-1':'notes-v10.1'}[edition]
    pages=md_pages(folder)
    return {p:pages[p] for p in NEW}

EDITIONS=['professor','b','c','follow','v20','original-c','d','original-c-v2','d-v2','original-c-v3','notes-v7','notes-v7-v2','notes-v8','notes-v8-1','notes-v8-2',
          'notes-v9','notes-v9-1','notes-v9-2','notes-v9-3','notes-v9-4','notes-v10','notes-v10-1']
NOTES_WITH_L19=[e for e in EDITIONS if e.startswith('notes-') and e!='notes-v7']

def dump(path,value):path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')

def add_editions(data):
    source=next(c for c in data['collections'] if c['id']==KEY)
    for edition in EDITIONS:
        path=OUT/f'transcripts-{edition}.json';payload=json.loads(path.read_text())
        old=payload['collections']['lecture18']['sections'];new=new_teaching(edition);sections=[]
        template=old[0]
        for s in source['sections']:
            page=s['page']
            if 2<=page<=8:teaching=deepcopy(old[page-1]['teaching']);assert old[page-1]['page']==page
            else:teaching=deepcopy(new.get(page,[]))
            section={k:deepcopy(v) for k,v in template.items()}
            for k in list(section):
                if k in s and k!='teaching':section[k]=deepcopy(s[k])
            section.update(id=s['id'],page=page,title=s['title'],kind=s.get('kind'),teaching=teaching)
            for k in ('evidence','coverage','additions','sourceIdeas','origin'):section.pop(k,None)
            sections.append(section)
        payload['collections'][KEY]=dict(title=source['title'],sections=sections)
        if 'availableModules' in payload and edition in NOTES_WITH_L19 and 'module3' not in payload['availableModules']:
            payload['availableModules']=payload['availableModules']+['module3']
        dump(path,payload)
    print('Lecture 19 added to',len(EDITIONS),'modern editions')

def stable(text):return hashlib.sha256(text.encode()).hexdigest()[:14]

def add_content(data):
    path=OUT/'content.js';raw=path.read_text();head='window.LING285_MODERN = '
    assert raw.startswith(head);pack=json.loads(raw[len(head):].rstrip().rstrip(';'))
    # Concepts and the page map. Pages 2 to 7 reuse the Lecture 18 concepts for the same slides.
    for k,c in CONCEPTS.items():pack['concepts'][k]={f:c[f] for f in ('opening','mechanism','consequence','plain')}
    page_map={str(p):pack['pageConcepts']['lecture18'][str(p)] for p in range(2,9) if str(p) in pack['pageConcepts']['lecture18']}
    page_map.update({str(p):PAGE_CONCEPT[p] for p in NEW});pack['pageConcepts'][KEY]=page_map
    pack['summaries'][KEY]=SUMMARY
    # Questions with answers for the lecture's reading view.
    pack['qa']=[q for q in pack['qa'] if q['lectureId']!=KEY]
    for q in [q for q in pack['qa'] if q['lectureId']=='lecture18' and q['kind']=='slides']:
        pages=[s['page'] for s in q['sources'] if s['collection']=='lecture18']
        if not all(2<=p<=8 for p in pages):continue
        pack['qa'].append(dict(deepcopy(q),id=q['id'].replace('lecture18',KEY),moduleId='module3',lectureId=KEY,sources=[dict(collection=KEY,page=p) for p in pages]))
    for k,c in CONCEPTS.items():
        for i,(question,answer) in enumerate(zip(c['questions'],c['answers']),1):
            pack['qa'].append(dict(id=f'modern-qa-{KEY}-{k}-{i}',moduleId='module3',lectureId=KEY,concept=k,kind='slides',question=question,
                                   answer=[answer,c['mechanism'],c['consequence']],sources=[dict(collection=KEY,page=c['page'])]))
    # Practice: the Lecture 19 bank in the modern format, 25 multiple-choice and 25 written.
    pack['questions']=[q for q in pack['questions'] if q['lectureId']!=KEY]
    by_page={(s['page']):s for s in next(c for c in data['collections'] if c['id']==KEY)['sections']}
    for page,topic,pattern,p1,p2,correct,wrong in P.M:
        concept=PAGE_CONCEPT[page];h=stable('mcq'+p1)
        options=[dict(id='correct',text=correct,feedback='**'+correct.rstrip('.')+'**. '+CONCEPTS[concept]['mechanism'])]+[dict(id=f'alt-{i}',text=t,feedback=f) for i,(t,f) in enumerate(wrong,1)]
        image='' if any(a['type']=='video' for a in by_page[page].get('assets',[])) else by_page[page].get('image','')
        pack['questions'].append(dict(id=f'modern-{KEY}-mcq-{concept}-{h[:10]}',lectureId=KEY,moduleId='module3',type='mcq',topic=topic.lower(),concept=concept,prompt=p1,
            wordings=dict(original=p1,college=p1,simple=p2),answer='**'+correct.rstrip('.')+'**. '+CONCEPTS[concept]['mechanism'],rubric=[],sources=[dict(collection=KEY,page=page)],
            options=options,correctOption='correct',origin='new slide-linked question',priority=1.0,edition='ling285-modern-1',bankKey=f'mcq-{KEY}-{h}',image=image))
    pack['writing']=[w for w in pack['writing'] if w['lectureId']!=KEY]
    for page,topic,pattern,p1,p2,answer,rubric in P.W:
        concept=PAGE_CONCEPT[page];h=stable('written'+p1)
        pack['questions'].append(dict(id=f'modern-{KEY}-written-{h}',lectureId=KEY,moduleId='module3',type='written',topic=topic.lower(),concept=concept,prompt=p1,
            wordings=dict(original=p1,college=p1,simple=p2),answer=answer,rubric=[],sources=[dict(collection=KEY,page=page)],origin='new slide-linked explanation',priority=1.0,
            edition='ling285-modern-1',bankKey=f'written-{KEY}-{h}'))
        pack['writing'].append(dict(id='modern-writing-'+stable('writing'+p1)+'19',lectureId=KEY,moduleId='module3',concept=concept,prompt=p1,answer=answer,
            sources=[dict(collection=KEY,page=page)],type='written',topic=topic.lower(),kind='Generated practice',image='',wordings=dict(original=p1,college=p1,simple=p2),priority=1.0))
    for name,items in [('guides',GUIDES),('asked',ASKED),('cards',CARDS),('contrasts',CONTRASTS),('hard',HARD),('connections',CONNECTIONS),('figures',FIGURES)]:
        pack[name]=[x for x in pack[name] if x.get('moduleId')!='module3']+deepcopy(items)
    for g in GUIDES:
        pack['qa'].append(dict(id=g['id'].replace('modern-guide-','modern-connection-'),moduleId='module3',lectureId=KEY,concept=g['points'][0]['concept'],kind='connections',
                               question=g['question'],answer=[g['answer']],sources=[dict(collection=p['collection'],page=n) for p in g['points'] for n in p['pages']]))
    pack['core'][KEY]=CORE19
    lecture_pages={m['id']:sum(len(c['sections']) for c in data['collections'] if c['role']=='lecture' and c['moduleId']==m['id']) for m in data['modules']}
    pack['coverage']['modulePages']=lecture_pages;pack['coverage']['sourcePages']=sum(lecture_pages.values())
    assert len({q['id'] for q in pack['questions']})==len(pack['questions'])
    path.write_text(head+json.dumps(pack,ensure_ascii=False,indent=1)+';\n')
    print('content.js: concepts',len(pack['concepts']),'qa',len(pack['qa']),'questions',len(pack['questions']),'writing',len(pack['writing']))

if __name__=='__main__':
    data=json.loads((ROOT/'data.json').read_text())
    add_editions(data);add_content(data)
