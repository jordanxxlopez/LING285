"""Lecture 19 text for the bulleted editions (Versions 7 to 18) and the Iskarous editions (20, 21, 22).

Pages 2 to 8 repeat Lecture 18 unchanged. The bulleted editions alias them to their own
Lecture 18 text. The Iskarous editions write every page out in full, so their Lecture 18
text for those pages is copied. Pages 9 to 19 are written here, once per edition, from the
slides and speaker notes only (no Lecture 19 classroom transcript was supplied).

Run: python3 ling285/authoring/lecture19_editions.py
"""
from pathlib import Path
import lecture19_notes as N
A=Path(__file__).resolve().parent
NEW=range(9,20)

# Extra sub-bullets. X1 goes to Versions 7 and 12 (demonstration values), X2 to Version 12 only.
X1={
9:'The model’s three bets are unequal. The bet on “egg” is the largest, the bet on “nut” is smaller, and the bet on “code” is the smallest.',
10:'The speech example is a wave of air pressure with no gaps that mark words, and the image example is an egg in a pan.',
11:'The vector for a slice is a column of numbers, and a slice with a different sound gets different numbers.',
12:'The first patch in the row is the top left square of the image, and the last patch is the bottom right square.',
13:'The example row has four image patches, four speech frames and the three words, followed by the hidden slot.',
14:'The three puppies have different colours, and the third puppy is dark.',
15:'With the words alone, “kittens” is slightly ahead of “puppies” and “babies.” With the image and the sound, “puppies” takes almost the whole bet.',
16:'The guess and the truth are each a column of 16 values, and the error is largest in the bands where the two columns differ most.',
17:'The hidden patch is the place where the head of the third puppy belongs.',
18:'The three same-sense clues are the plural noun that “three cute” calls for, the voice and formants that carry on, and the fur and background that carry on.',
19:'In the example, the codes 417, 82 and 903 are already in the row, and the fourth code is the one being predicted.',
}
X2={
9:'All four earlier words are linked to the hidden slot, so a clue can come from the start of the sentence as well as from the word right before the slot.',
10:'The task that follows is turning all three forms into rows of vectors.',
11:'Time order matters because the model reads the row from the first vector to the last, the same way it reads the words of a sentence.',
12:'Smaller patches mean more patches for the same image, which is why real systems get hundreds of vectors where the example gets 16.',
13:'A cross-modal dependency works in the same direction as a dependency between words, from a piece the model can read to the piece it has to guess.',
14:'The words are marked along the time direction of the spectrogram, so each word can be matched to the frames that hold its sound.',
15:'A smaller bet on the true word would mean a larger error, and a larger error moves the weights more.',
16:'Predicting from left to right means the model can use only the frames it has already heard, never the frames that come after the hidden one.',
17:'The guess still has the right content, a puppy ear, because the words and the earlier patches gave that. Only the colour had no clue.',
18:'The other six clues come from a different sense than the hidden piece, and each of them says something about what is being described.',
19:'Because the codes are treated as vocabulary items, the model uses no separate method for speech. It predicts the next item for words and for sound in the same way.',
}

def family(page,extra1=False,extra2=False):
    """Versions 7, 10 and 12 share the five teaching paragraphs, grouped as three bullets."""
    p=N.PAGES[page][2]
    b1=[p[0],p[1]];b2=[p[2],p[3]];b3=[p[4]]
    if extra1:b2.append(X1[page])
    if extra2:b3.append(X2[page])
    if len(b3)==1 and not extra1:b2,b3=[p[2]],[p[3],p[4]]  # Version 10 keeps a sub-bullet under its last point
    return [b1,b2,b3]

# Version 16 · Natural teaching notes. Demonstrations told in connected sentences, 300 words at most.
V16={
9:[['**An LLM learns by playing a guessing game with a hidden word.** In “The chef cracks the,” the model has read four words and the fifth is covered. Its task is to say what the fifth word is.',
    'Every earlier word helps. A chef who cracks something is probably cracking food, so the earlier words are clues, and these clue relationships are called **interdependencies**.',
    'The model cannot be sure, so it divides its bet. Most of the bet goes on “egg,” less goes on “nut,” and the least goes on “code.”'],
   ['**The weights are then nudged so the next guess is better.** Once the true word is revealed, each weight changes by a small amount in the direction that gives the right word a bigger bet.',
    'The same game is played when the signal holds **words, sounds and images**. The hidden piece and the clues can then be any of the three.']],
10:[['**Text, speech and images arrive in three different forms.** Text is already a row of pieces, such as “Now,” “crack,” “the” and “egg.” Each piece can become one vector, so text is ready for the model almost as it is.',
    'Speech is **air pressure changing in time**. The pressure rises and falls without a break, and nothing in it is a word.',
    'An image is **a grid of light**. It has no words either, and its parts are spread over a surface instead of standing in a row.'],
   ['**All three have to become rows of vectors.** A row of vectors is the only thing an LLM can read, so speech and images need a conversion before the model can use them.',
    'After the conversion, one model can read text, speech and images together.']],
11:[['**Speech becomes a row by cutting it into short slices of time.** Each slice is called a **frame** and lasts about 20 milliseconds.',
    'The slices are passed through a **speech encoder**, a neural network that was trained on a large amount of audio. For every slice that goes in, one vector comes out.',
    'Slices with different sounds give vectors with different numbers.'],
   ['**One second of speech becomes 50 vectors in time order.** Fifty slices of about 20 milliseconds fill one second, and each slice gives one vector.',
    'The speech is now a row, just like a sentence. The model reads frame vectors one after another, the way it reads word vectors.']],
12:[['**An image becomes a row by cutting it into patches.** A **patch** is a small square of the image. A grid cuts the image of an egg in a pan into 16 patches.',
    'The patches are then laid out in **reading order**, which means left to right along the top and then left to right along each line below. The image has become a sequence, like a sentence.',
    'The patches pass through a **vision encoder**, and one vector comes out for each patch.'],
   ['**Real systems cut the image much more finely.** The example uses a 4 by 4 grid to stay simple. Real systems use patches of 14 to 16 pixels, so one image gives hundreds of vectors.',
    'More patches means a longer row for the model to read.']],
13:[['**The three kinds of piece now sit in one row.** The image patches come first, the speech frames come second and the words come last. The words are “Now,” “crack” and “the,” and then comes a hidden word.',
    'The earlier words help as they always did. “Now crack the” already narrows down what the hidden word can be.',
    'Help now also arrives from the other senses. A patch containing an egg points to the hidden word, and so does the sound of cracking. A clue that crosses from one kind of signal to another is a **cross-modal dependency**.'],
   ['**The game has not changed.** The model still guesses a hidden piece from the pieces it can read.',
    'What has changed is that some of the clues come from other senses, so the model has more to go on.']],
14:[['**“Three cute puppies” is one event given in three forms.** The first form is an image of three puppies, cut into 18 patches arranged as 3 rows of 6.',
    'The second form is the phrase spoken aloud, displayed as a **spectrogram**. Time runs from left to right, a higher position means a higher frequency, and a darker area means more energy.',
    'Each word has its own stretch of time, with “three” first, “cute” second and “puppies” last. Each thin column is one frame. The voice is a speech synthesizer, an MBROLA diphone voice.',
    'The third form is the three written words.'],
   ['**These are three views of one event.** In training, all three are placed in one row.',
    'The model then plays the same game on that row. One piece is hidden, and the model guesses it.']],
15:[['**The first training example hides a word.** The row holds the image, then the sound, then the words “three” and “cute,” and the word after “cute” is hidden.',
    'Suppose the model had only the words. “Three cute” could be followed by “kittens,” “puppies” or “babies,” so its bets would be spread out with no clear winner.',
    'Now the other senses are added. The image contains puppies, and the sound contains the spoken word “puppies.” The bet piles up on “puppies,” and the other two words are left with very little.'],
   ['**The true word is revealed, and the model is graded on its bet.** The true word is “puppies,” and the model had bet 0.85 on it.',
    'A bet that large means the error is small. A small error moves the weights only a little.']],
16:[['**The second training example hides a frame of sound.** The row is reordered to hold the image, then the words, then the sound. This is like teaching the model to speak a sentence it was given.',
    'The sound is predicted one frame at a time from left to right. The frames after the hidden one have not been heard yet.',
    'Three clues help. The earlier frames help most, because the voice and the **formants** (frequency regions with strong energy) change smoothly from frame to frame. The words say the next sound is the vowel in “pup.” The image contains puppies, which backs up the words, although it is a weaker clue here.'],
   ['**The guess is compared with the true frame number by number.** A frame is a column of numbers, one for the energy in each of 16 frequency bands. The guess is close but not exact.',
    'The error is how far each number is from the true one, and that error nudges the weights. Some systems predict a code for each frame instead of the raw numbers.']],
17:[['**The third training example hides a patch of the image.** The row is reordered again to hold the words, then the sound, then the image. This is like teaching the model to draw what it was told.',
    'The patches are predicted in reading order, so the patches after the hidden one are not drawn yet.',
    'The earlier patches give background above and two puppies to the left, so the model knows what a puppy in this image looks like. The word “three” says a third puppy must appear, and “puppies” says to expect dog ears. The sound repeats the same words as a backup.'],
   ['**The guess has the right shape and the wrong colour.** The model produces a blurry puppy ear in the average colour of the first two puppies, but the third puppy is dark.',
    'The colour is the biggest error because no clue said the third puppy would be dark. That error nudges the weights.',
    'Only systems that also produce images are trained this way. Systems that only read images usually skip this step.']],
18:[['**Any piece of the row can be the hidden one, and every sense offers a clue.** When a word is hidden, “three cute” calls for a plural noun, the word was just spoken in the sound, and the image contains puppies.',
    'When a frame is hidden, the words say which sound comes next, the voice and formants carry on from the earlier frames, and the image backs up which word is being said.',
    'When a patch is hidden, “three” says one more puppy is coming, the sound gives the same words in heard form, and the fur and background carry on from the earlier patches.'],
   ['**The clue from the same sense does a different job from the other two.** It says how the signal continues, as grammar, smooth formants, and fur and background do.',
    'The other senses say what the thing is, which here is puppies, three of them.',
    'Training on all three senses together helps because each sense fills gaps the others leave.']],
19:[['**The model speaks by predicting codes for sound.** Sound is first compressed into discrete codes, such as 417, 82 and 903. Each code works like a new word in the vocabulary.',
    'The model predicts the next code exactly as it predicts the next word, using the earlier codes as clues.',
    'A **decoder** then changes the row of codes back into a sound wave.'],
   ['**Three things are new, and one thing is unchanged.** The new things are a shared currency in which everything becomes vectors in one row, data where the senses appear together, and a schedule that protects what was already learned.',
    'The unchanged thing is the learning rule. The model finds the dependencies in the signal, and the signal has simply become wider.']],
}

# Version 14 · Balanced teaching notes. Three short bullets with one sub-bullet each.
V14={
9:[['**An LLM learns from a hidden word.** In “The chef cracks the,” each earlier word gives a clue about the word that comes next.','These clue relationships between parts of a sequence are **interdependencies**.'],
   ['**The model spreads its bets over the possible words.** “Egg” gets the largest bet, “nut” a smaller one and “code” the smallest.','A bet is the probability the model gives to one word.'],
   ['**Learning nudges the weights so the guesses improve.** After the true word is revealed, the right word gets a bigger bet next time.','The same learning applies when the signal holds words, sounds and images.']],
10:[['**Text is already a row of pieces.** “Now crack the egg” separates into four pieces, and each piece can become a vector.','This makes text the easy case for an LLM.'],
   ['**Speech and images arrive in other forms.** Speech is air pressure changing in time, and an image is a grid of light.','Neither one contains words.'],
   ['**Both have to be converted into rows of vectors.** A row of vectors is all the LLM can read.','The conversion comes before any learning from speech or images.']],
11:[['**Speech is sliced into short frames.** Each frame is a slice of sound about 20 milliseconds long.','The slices are cut by time and do not follow the words.'],
   ['**A speech encoder gives one vector per slice.** The encoder is a neural network trained on a large amount of audio.','Different sounds give vectors with different numbers.'],
   ['**One second of speech becomes 50 vectors in time order.** The speech is now a row, just like a sentence.','Fifty slices of about 20 milliseconds fill one second.']],
12:[['**An image is cut into patches.** A patch is one small square, and the egg image is cut into 16 of them.','The grid is 4 across and 4 down.'],
   ['**The patches are laid out in reading order.** The image becomes a sequence, like a sentence.','Reading order means left to right along the top and then along each line below.'],
   ['**A vision encoder gives one vector per patch.** Real systems use patches of 14 to 16 pixels.','One image therefore gives hundreds of vectors in a real system.']],
13:[['**Image patches, speech frames and words share one row.** The last word after “Now crack the” is hidden.','The patches come first, the frames second and the words last.'],
   ['**The earlier words still give clues, and the other senses add more.** A patch containing an egg and the sound of cracking both help.','A clue that links two different senses is a **cross-modal dependency**.'],
   ['**The game is the same as before.** The model guesses the hidden piece from the pieces it can read.','Only the source of some clues has changed.']],
14:[['**“Three cute puppies” is given in three forms.** They are an image, the spoken phrase and the written words.','The image is cut into 18 patches, 3 rows of 6.'],
   ['**The spoken phrase is a spectrogram.** Time runs left to right, higher means higher frequency, and darker means more energy.','Each thin column is one frame, and each word has its own stretch of time.'],
   ['**The three forms are three views of one event.** Training puts all of them in one row.','The model then guesses a hidden piece of that row.']],
15:[['**The hidden piece is the word after “three cute.”** The row holds the image, the sound and the words.','With the words alone, the bets are spread over “kittens,” “puppies” and “babies.”'],
   ['**The image and the sound move the bet onto “puppies.”** The image contains puppies, and the sound contains the spoken word.','The other two words are left with very small bets.'],
   ['**The model bet 0.85 on the true word, so the nudge is small.** A large bet on the truth is a small error.','A small error moves the weights only a little.']],
16:[['**The hidden piece is a frame of sound.** The row holds the image, the words and the sound heard so far.','The sound is predicted frame by frame from left to right.'],
   ['**Three clues point to the next frame.** The earlier frames help because the voice and the formants change smoothly.','The words say the next sound is the vowel in “pup,” and the image backs up the words.'],
   ['**The error nudges the weights.** A frame is a column of numbers for the energy in each frequency band.','The error is how far the guessed numbers are from the true ones.']],
17:[['**The hidden piece is a patch of the image.** The row holds the words, the sound and the patches drawn so far.','The patches are predicted in reading order.'],
   ['**The clues give a puppy ear but not its colour.** The earlier patches give background and two puppies, and “three” says one more puppy must appear.','“Puppies” says to expect dog ears, and the sound backs up the words.'],
   ['**The biggest error is the colour.** The guess uses the average colour of the first two puppies, and the true puppy is dark.','No clue said the third puppy would be dark, so that error nudges the weights.']],
18:[['**Every piece can be the hidden one.** A hidden word, frame or patch each receives a clue from the words, the sound and the image.','For a hidden word, the three clues are a plural noun, the word just spoken, and puppies in the image.'],
   ['**The same sense says how the signal continues.** Grammar, smooth formants, and fur and background all carry on from what came before.','These are the clues for a hidden word, frame and patch from their own sense.'],
   ['**The other senses say what the thing is.** Here they say puppies, three of them.','Each sense fills gaps the others leave, which is why training on all three together helps.']],
19:[['**Sound is compressed into discrete codes so the model can speak.** Each code works like a new word in the vocabulary.','The model predicts the next code like the next word.'],
   ['**A decoder changes the codes back into sound.** The output is a sound wave that can be heard.','Speaking is therefore the same guessing game followed by decoding.'],
   ['**Three things are new, and the learning rule is unchanged.** The new things are a shared currency of vectors in one row, data where the senses appear together, and a schedule that protects what was already learned.','The model still finds the dependencies in the signal.']],
}

# Version 18 · Teaching scripts. Meaning of each figure, only the numbers that carry a result.
V18={
9:[['**Guessing a hidden word is how an LLM learns.** The model reads “The chef cracks the” and has to say what follows.','Every earlier word is a clue, so the hidden word depends on all of them. These relationships are **interdependencies**.'],
   ['**The guess is a set of bets.** The model gives a probability to each possible word and puts the most on “egg.”','“Nut” and “code” get less because the earlier words make them less likely.'],
   ['**Each revealed answer nudges the weights.** The change is small, and it makes the right word a little more likely next time.','The signal can hold sounds and images as well as words, and the learning works the same way.']],
10:[['**Only text arrives ready for the model.** Its words are separate pieces in a row, and each piece can become a vector.','“Now crack the egg” is four pieces.'],
   ['**Speech and images arrive without any pieces.** Speech is one continuous change in air pressure, and an image is a grid of light.','Neither one has words in it.'],
   ['**The model reads only rows of vectors.** Speech and images therefore have to be converted first.','The conversion gives each of them the same form as text.']],
11:[['**Cutting speech into frames gives it pieces.** A frame is a slice of sound about 20 milliseconds long.','The cuts fall at regular times.'],
   ['**The speech encoder changes each slice into a vector.** It is a network trained on a large amount of audio.','One slice goes in and one vector comes out.'],
   ['**A second of speech is 50 vectors in time order.** That row can be read like a sentence.','The earliest sound is first in the row.']],
12:[['**Cutting an image into patches gives it pieces.** A patch is a small square of the image.','The egg image is cut into 16 patches.'],
   ['**Reading order makes the patches a sequence.** They are taken left to right along the top and then along each line below.','A sequence has a first piece and a last piece, as a sentence does.'],
   ['**The vision encoder gives one vector per patch.** Real systems use patches of 14 to 16 pixels and get hundreds of vectors from one image.','The example uses large patches only to stay simple.']],
13:[['**One row can hold all three senses.** Image patches, speech frames and words stand in a single sequence with the last word hidden.','The words are “Now,” “crack” and “the.”'],
   ['**Clues cross from one sense to another.** A patch containing an egg and the sound of cracking both point to the hidden word.','These links are **cross-modal dependencies**.'],
   ['**The model plays the same game.** It guesses the hidden piece from everything else in the row.','The earlier words still help, as they do in a row of text.']],
14:[['**One event can be seen, heard and read.** “Three cute puppies” is an image, a spoken phrase and three written words.','The image is cut into 18 patches.'],
   ['**The spectrogram is the spoken phrase laid out in time.** Higher means higher frequency, and darker means more energy.','Each thin column is a frame, and the words follow one another from left to right.'],
   ['**Training places the three views in one row.** One piece of the row is hidden for the model to guess.','The same example is used for a hidden word, a hidden frame and a hidden patch.']],
15:[['**Words alone leave the model unsure.** After “three cute,” the bets on “kittens,” “puppies” and “babies” are close together.','Many endings fit those two words.'],
   ['**The image and the sound settle the guess.** The image contains puppies and the sound contains the word, so the bet piles up on “puppies.”','These are clues from other senses.'],
   ['**A good bet gives a small nudge.** The model bet 0.85 on the true word, so the error is small.','The weights move only a little.']],
16:[['**The model can also guess the next frame of sound.** It works through the sound from left to right, one frame at a time.','This is like teaching the model to speak a sentence it was given.'],
   ['**The sound itself is the strongest clue.** The voice and the formants change smoothly, so recent frames say a lot about the next one.','The words give the next sound, the vowel in “pup,” and the image backs up the words.'],
   ['**The error is the gap between guess and truth.** A frame is a column of energy values, one per frequency band.','The guess is close but not exact, and the gap nudges the weights.']],
17:[['**The model can also guess the next patch of an image.** It works through the patches in reading order.','This is like teaching the model to draw what it was told.'],
   ['**The clues give the content of the patch.** Two puppies are already drawn, “three” calls for one more, and “puppies” calls for dog ears.','The sound carries the same words as a backup.'],
   ['**No clue gave the colour.** The guess takes the average colour of the first two puppies, but the third puppy is dark.','The colour is the biggest error, and it nudges the weights.']],
18:[['**Each sense gives a clue for each kind of hidden piece.** That makes nine clues for a hidden word, a hidden frame and a hidden patch.','For a hidden word they are a plural noun, the word just spoken, and puppies in the image.'],
   ['**A clue from the same sense says how the signal continues.** Grammar continues a sentence, smooth formants continue a sound, and fur and background continue an image.','These three are the same-sense clues.'],
   ['**Clues from the other senses say what the thing is.** They say puppies, three of them.','Each sense fills gaps the others leave.']],
19:[['**Speech output uses codes.** Sound is compressed into discrete codes that work like new words in the vocabulary.','The model predicts the next code as it predicts the next word.'],
   ['**A decoder makes the codes audible.** It changes the row of codes back into a sound wave.','The model itself only predicts the codes.'],
   ['**Three things are new.** They are a shared currency of vectors in one row, data where the senses appear together, and a schedule that protects what was already learned.','What stays the same is finding the dependencies in the signal.']],
}

# Version 20 · Iskarous professor teaching transcript.
V20={
9:[['**Here is a sentence the model is reading, and its last word is hidden.** The sentence is “The chef cracks the,” and the model has to say what comes after it.','Each earlier word gives a clue about the hidden word. These are the **interdependencies**, the relationships in which one part of a sequence helps predict another part.'],
   ['**The model does not know the answer, so it spreads its bets.** It puts the most on “egg,” less on “nut” and the least on “code.”','A bet is the probability the model gives to a word, and all three words are possible after “The chef cracks the.”'],
   ['**Learning just means nudging the weights.** After the true word is revealed, the weights move a little, so that next time the right word gets a bigger bet.','Nothing about this changes when the signal holds sounds and images too. The game is the same, and only the signal is different.']],
10:[['**Text is the easy case, because it already comes as a row of pieces.** “Now crack the egg” is four pieces, and each piece can become a vector.','That row of vectors is exactly what the LLM reads.'],
   ['**Speech is different, because it is air pressure going up and down in time.** There are no words in it, only a pressure that keeps changing.','An image is a grid of light, and again there are no words in it.'],
   ['**So the first job is a conversion.** Everything has to become a row of vectors, because that is all the LLM can read.','The conversion has to work for all three, for text, for speech and for images.']],
11:[['**We take a small piece of speech and cut it into short slices.** Each slice is about 20 milliseconds long, and a slice like this is called a **frame**.','The cuts are made in time, one after another, and they do not wait for a word to end.'],
   ['**The slices go through a speech encoder.** The speech encoder is a network that was trained on lots of audio, and out comes one vector per slice.','Different slices hold different sounds, so their vectors hold different numbers.'],
   ['**So one second of speech becomes 50 vectors in time order.** That is a row, just like a sentence.','Once speech is a row of vectors, the LLM can read it the same way it reads words.']],
12:[['**We take an image of an egg in a pan and cut it into a grid of small squares.** The squares are called **patches**, and this grid gives 16 of them.','A patch is just one small piece of the image.'],
   ['**We lay the patches out in a row, in reading order.** Now the image is a sequence, like a sentence, with a first patch and a last patch.','The patches then go through a **vision encoder**, and out comes one vector per patch.'],
   ['**Our grid is 4 by 4 only to keep it simple.** Real systems use tiny patches of 14 to 16 pixels, so one image gives hundreds of vectors.','More patches means more vectors in the row for the same image.']],
13:[['**Now we put everything in one row.** First come the image patches, then the speech slices, then the words, with the last word hidden.','The words are “Now,” “crack” and “the,” and the slot after them is empty.'],
   ['**The old clues are still there.** The earlier words help the model guess the hidden word, exactly as before.','The new thing is that a patch containing an egg, and the sound of cracking, also help. These are **cross-modal dependencies**, clues that cross from one sense to another.'],
   ['**The game is exactly the same as before.** The model guesses the hidden piece from the other pieces.','Some of the clues now come from other senses, and that is the only change.']],
14:[['**One example is used for the rest of the training story, and it is three cute puppies.** First there is an image of three puppies, cut into patches as before, 3 rows of 6, so 18 patches.','Each patch is one piece of the image, just as with the egg.'],
   ['**Then there is the same phrase, spoken, displayed as a spectrogram.** Time runs left to right, higher up means higher frequency, and darker means more energy.','Each word sits in its own stretch of time, and each thin column of the spectrogram is a frame. The speech was made with a speech synthesizer, an MBROLA diphone voice.'],
   ['**And there are the words themselves, as text.** These are three views of one event.','In training, all three go into one row, and the model plays the hide-and-guess game on that row.']],
15:[['**This is the same game as before, played on a row with three senses.** First comes the image, then the sound, then the words, and the last word is hidden.','The words the model can read are “three” and “cute.”'],
   ['**Suppose the model only had the words “three cute.”** Many endings fit, such as “kittens,” “puppies” and “babies,” so its bets are spread out.','Now add the clues from the other senses. The image contains puppies, and the sound contains the spoken word “puppies,” so the bet piles up on “puppies.”'],
   ['**Then the true word is revealed, and the model is graded on how much it bet on the truth.** The truth is “puppies,” and the model bet 0.85 on it.','It bet a lot on the truth, so the error is small, and the weights move only a little.']],
16:[['**Now the hidden piece is a piece of sound.** The row is reordered so that the image comes first, then the words, then the sound, which is like teaching the model to speak a sentence it was given.','The sound is predicted frame by frame, left to right, and the frames to the right are not heard yet.'],
   ['**The first clue comes from the earlier frames.** The speaker’s voice and the formants change smoothly, so the last few frames say a lot about the next one.','The words say which sound should come next, and here it is the vowel in “pup.” The image contains puppies, so it backs up the words, but it is a weaker clue here.'],
   ['**A frame is a column of numbers, one for how much energy there is in each frequency band.** The model’s guess is close to the truth but not exact, and the error is how far apart each number is.','That error is what nudges the weights. Some systems predict a code for each frame instead of the raw numbers.']],
17:[['**Last, the hidden piece is a piece of the image.** The row is reordered again so that the words come first, then the sound, then the image, which is like teaching the model to draw what it was told.','The patches are predicted in reading order, and the patches that are not drawn yet are faded.'],
   ['**Earlier patches give the first clue.** Above is background, and to the left are two puppies, so the model has seen what a puppy here looks like.','The words help in a different way. “Three” says a third puppy must appear, because only two have been drawn, and “puppies” says to expect dog ears. The sound carries the same words, so it is a backup for the text.'],
   ['**The guess is a blurry puppy ear in the average colour of the first two puppies, and the truth is a dark puppy.** So the biggest error is the colour, because nothing in the words, the sound or the earlier patches said the third puppy would be dark.','That error nudges the weights. Only systems that also produce images are trained this way, and systems that only read images usually skip this step.']],
18:[['**Every piece can be the hidden one, whether it is a word, a frame or a patch.** For each kind of hidden piece, the words give a clue, the sound gives a clue and the image gives a clue.','For a hidden word, “three cute” wants a plural noun, the word was just spoken, and the image contains puppies.'],
   ['**For a hidden frame, the words say which sound comes next, and the voice and formants carry on.** The image backs up which word is being said.','For a hidden patch, “three” says one more puppy is coming, the sound gives the same words in heard form, and the fur and background carry on.'],
   ['**Clues from the same sense mostly say how the signal continues.** Grammar does that for words, smooth formants do it for sound, and fur and background do it for the image.','Clues from the other senses mostly say what the thing is, which is puppies, three of them. That is why training on all three senses together helps, because each sense fills gaps the others leave.']],
19:[['**So far the model only reads images and sound, and the remaining part is how it speaks.** Sound is compressed into discrete codes, and each code is like a new word added to the vocabulary.','The model predicts the next code exactly as it predicts the next word, so it is the same game again.'],
   ['**A decoder changes the codes back into a sound wave.** The model produces the codes, and the decoder produces the sound that we hear.','Speaking therefore needs two parts, the prediction of codes and the decoding of those codes.'],
   ['**Three things are new in all of this.** They are a shared currency of vectors, data where the senses appear together, and a schedule that protects what was learned.','The learning rule is unchanged, and it is to find the dependencies in the signal. The signal just got wider.']],
}

# Version 21 · Iskarous B, focused. Same teaching without side detail.
V21={
9:[['**An LLM learns by guessing a hidden word from the words before it.** In “The chef cracks the,” each earlier word is a clue about the word that follows.','The relationships between the clue words and the hidden word are **interdependencies**.'],
   ['**The model spreads its bets because it does not know the answer.** It bets most on “egg,” less on “nut” and least on “code.”','Learning nudges the weights so that the right word gets a bigger bet next time.'],
   ['**The same learning applies when the signal holds sounds and images.** The model still guesses a hidden piece from the other pieces.','Only the content of the signal is different.']],
10:[['**Text already comes as a row of pieces, so each piece can become a vector.** That makes text easy for the model to read.','Speech is air pressure changing in time, and an image is a grid of light.'],
   ['**Speech and images contain no words.** They are not rows of pieces when they arrive.','An LLM can read only a row of vectors.'],
   ['**Speech and images therefore have to be converted into rows of vectors.** The conversion is the first job.','After it, all three forms can be read by one model.']],
11:[['**Speech is cut into slices of about 20 milliseconds, and each slice is a frame.** The slices follow one another in time.','A speech encoder, which is a network trained on a large amount of audio, changes each slice into a vector.'],
   ['**One vector comes out for each slice.** Different sounds give different numbers in the vector.','The vectors stay in time order.'],
   ['**One second of speech becomes 50 vectors.** The speech is now a row, just like a sentence.','The LLM can read that row one vector after another.']],
12:[['**An image is cut into small squares called patches.** The egg image is cut into 16 patches.','The patches are laid out in a row in reading order, so the image becomes a sequence.'],
   ['**A vision encoder gives one vector for each patch.** The 16 patches become 16 vectors in the same order.','The image is now a row that the LLM can read.'],
   ['**Real systems use much smaller patches of 14 to 16 pixels.** One image then gives hundreds of vectors.','Smaller patches mean more patches for the same image.']],
13:[['**Image patches, speech frames and words are placed in one row.** The last word after “Now crack the” is hidden.','The earlier words still give clues about the hidden word.'],
   ['**A patch containing an egg and the sound of cracking also give clues.** A clue that crosses from one sense to another is a **cross-modal dependency**.','These clues are added to the clues from the words.'],
   ['**The game is the same as with text alone.** The model guesses the hidden piece from the other pieces.','The difference is that some clues now come from other senses.']],
14:[['**“Three cute puppies” appears as an image, as speech and as written words.** The image is cut into 18 patches.','The speech is a spectrogram, where time runs left to right, higher means higher frequency and darker means more energy.'],
   ['**Each thin column of the spectrogram is one frame.** The three words follow one another in time.','The written words are the third form of the same phrase.'],
   ['**The three forms are three views of one event.** Training places all three in one row.','The model then guesses whichever piece of the row is hidden.']],
15:[['**With the words “three cute” alone, the model’s bets are spread out.** “Kittens,” “puppies” and “babies” all fit.','No single word is far ahead of the others.'],
   ['**With the image and the sound, the bet piles up on “puppies.”** The image contains puppies, and the sound contains the spoken word.','These are clues from the other senses.'],
   ['**The model bet 0.85 on the true word, so the error is small.** A small error gives a small nudge to the weights.','A large bet on the truth leaves little to correct.']],
16:[['**The model can be trained to predict a hidden frame of sound.** The sound is predicted frame by frame from left to right.','The earlier frames help because the voice and the formants change smoothly.'],
   ['**The words say which sound comes next, and here it is the vowel in “pup.”** The image contains puppies, so it backs up the words.','The image is the weaker clue in this case.'],
   ['**A frame is a column of numbers for the energy in each frequency band.** The error is how far the guessed numbers are from the true numbers.','That error nudges the weights.']],
17:[['**The model can be trained to predict a hidden patch of the image.** The patches are predicted in reading order.','The earlier patches give background above and two puppies to the left.'],
   ['**“Three” says a third puppy must appear, and “puppies” says to expect dog ears.** The sound carries the same words as a backup.','These clues give the content of the patch.'],
   ['**The guess is a puppy ear in the average colour of the first two puppies, but the true puppy is dark.** The biggest error is the colour, because no clue gave it.','Only systems that also produce images are trained this way.']],
18:[['**A hidden word, a hidden frame and a hidden patch each get a clue from every sense.** For a hidden word, the clues are a plural noun, the word just spoken, and puppies in the image.','The other two cases work the same way with their own clues.'],
   ['**A clue from the same sense says how the signal continues.** Grammar, smooth formants, and fur and background are the three examples.','Each one carries on from what came before in its own sense.'],
   ['**Clues from the other senses say what the thing is.** Here the thing is puppies, three of them.','Training on all three senses together helps because each sense fills gaps the others leave.']],
19:[['**To speak, the model predicts codes for sound.** Sound is compressed into discrete codes that work like new words in the vocabulary.','The next code is predicted like the next word.'],
   ['**A decoder changes the codes back into sound.** The result is a sound wave that can be heard.','The model predicts the codes, and the decoder makes the sound.'],
   ['**Three things are new, which are a shared currency of vectors in one row, data where the senses appear together, and a schedule that protects what was already learned.** These make training on three senses possible.','What stays the same is finding the dependencies in the signal.']],
}

# Version 22 · Iskarous C, natural teaching notes. Patterns in words, no measurements or calculations.
V22={
9:[['**An LLM learns by trying to guess a word that has been hidden from it.** In the sentence “The chef cracks the,” the model reads every word before the gap and then has to say which word fills the gap.','Each earlier word gives a clue about the hidden word. These clue relationships between the parts of a sequence are called **interdependencies**.'],
   ['**The model does not know the answer, so it spreads its bets across several words.** It gives the largest bet to “egg,” a smaller bet to “nut” and the smallest bet to “code.”','A bet is the probability the model gives to one word. The earlier words are what make “egg” more likely than the other two.'],
   ['**Learning is the nudging of the weights so that these guesses get better.** After the true word is revealed, the weights change a little, so the right word gets a bigger bet the next time.','The same idea holds when the signal contains sounds and images as well as words. The model still guesses a hidden piece from the pieces around it.']],
10:[['**Text is the easy case because it is already a row of separate pieces.** The sentence “Now crack the egg” divides into its words, and each word can become one vector.','A row of vectors is the only form an LLM can read.'],
   ['**Speech and images do not arrive as rows of pieces.** Speech is air pressure that keeps changing in time, and an image is a grid of light.','Neither of them contains any words, so neither can be given to the model as it is.'],
   ['**The first job is therefore to convert speech and images into rows of vectors.** Once that is done, all of the forms look the same to the model.','The model can then read words, sounds and images together in one sequence.']],
11:[['**Speech is converted by slicing it into short pieces of time called frames.** Each frame lasts only about 20 milliseconds, and the frames follow one another in time.','The cuts are made at regular times and do not follow the boundaries between words.'],
   ['**The slices pass through a speech encoder, which gives back one vector for each slice.** A speech encoder is a neural network that was trained on a large amount of audio.','Slices that hold different sounds come out as vectors that hold different numbers.'],
   ['**One second of speech becomes 50 vectors, and the vectors stay in time order.** The speech has become a row, just like a sentence.','The model can now read the sound one vector after another, the way it reads the words of a sentence.']],
12:[['**An image is converted by cutting it into small squares called patches.** In the example, an image of an egg in a pan is cut by a grid into 16 patches.','Each patch is one small piece of the whole image.'],
   ['**The patches are laid out in a row in reading order, from the top left to the bottom right.** This gives the image a fixed order, so it becomes a sequence like a sentence.','The patches then pass through a **vision encoder**, which gives back one vector for each patch.'],
   ['**Real systems cut an image into much smaller patches than the example does.** Their patches are only 14 to 16 pixels wide, so a single image gives hundreds of vectors.','The example uses a few large patches only to keep the idea simple.']],
13:[['**Image patches, speech frames and words can all be placed in one row.** The patches come first, the frames come next and the words come last, with the final word hidden.','The words that the model can read are “Now,” “crack” and “the.”'],
   ['**The earlier words still give clues, and the other senses now give clues as well.** A patch that contains an egg helps the model guess the hidden word, and so does the sound of cracking.','A clue that reaches from one sense to another is called a **cross-modal dependency**.'],
   ['**The game itself has not changed at all.** The model still guesses the hidden piece from the pieces that it can read.','The only difference is that some of the clues now come from other senses.']],
14:[['**The phrase “three cute puppies” can be given to the model in three forms.** It can be an image of three puppies, the phrase spoken aloud, or the three written words.','The image is cut into 18 patches, in the same way as the image of the egg.'],
   ['**The spoken phrase is displayed as a spectrogram, which lays the sound out in time.** Time runs from left to right, a higher position means a higher frequency, and a darker area means more energy.','Each word occupies its own stretch of time, and each thin column of the spectrogram is one frame.'],
   ['**The image, the sound and the words are three views of one event.** In training, all three are placed together in one row.','The model then plays the same game on that row, guessing whichever piece has been hidden.']],
15:[['**In the first training example, the hidden piece is the word that follows “three cute.”** The row holds the image first, then the sound, then the words.','If the model had only the words, many endings would fit, such as “kittens,” “puppies” and “babies.” Its bets would be spread out, with no word far ahead.'],
   ['**The image and the sound add clues that settle the guess.** The image contains puppies, and the sound contains the spoken word “puppies.”','With these clues, the bet piles up on “puppies,” and the other two words are left with very small bets.'],
   ['**When the true word is revealed, the model is graded on how much it bet on that word.** The true word is “puppies,” and the model had placed a large bet on it.','A large bet on the truth means the error is small. A small error moves the weights only a little.']],
16:[['**In the second training example, the hidden piece is one frame of the sound.** The row is reordered so that the image comes first, then the words, then the sound, which is like teaching the model to speak a sentence it was given.','The sound is predicted one frame at a time from left to right, so the frames after the hidden one have not been heard yet.'],
   ['**The strongest clue comes from the frames just before the hidden one.** The speaker’s voice and the **formants** (frequency regions with strong energy) change smoothly, so recent frames say a lot about the next frame.','The words say which sound should come next, which here is the vowel in “pup.” The image contains puppies, so it backs up the words, although it is a weaker clue in this case.'],
   ['**The guess is compared with the true frame one number at a time.** A frame is a column of numbers, and each number is the amount of energy in one frequency band.','The guess is close but not exact, and the error is how far each guessed number is from the true one. That error nudges the weights.']],
17:[['**In the third training example, the hidden piece is one patch of the image.** The row is reordered again so that the words come first, then the sound, then the image, which is like teaching the model to draw what it was told.','The patches are predicted in reading order, so the patches after the hidden one have not been drawn yet.'],
   ['**The clues tell the model that a puppy ear belongs in the hidden patch.** The earlier patches give background above and two puppies to the left, so the model has seen what a puppy in this image looks like.','The word “three” says that one more puppy must appear, and the word “puppies” says to expect dog ears. The sound carries the same words, so it backs up the text.'],
   ['**The model guesses a blurry puppy ear in the average colour of the first two puppies.** The true patch belongs to a dark puppy, so the biggest error is the colour.','No clue in the words, the sound or the earlier patches said that the third puppy would be dark. Only systems that also produce images are trained in this way.']],
18:[['**Any piece of the row can be the hidden one, and each sense gives a clue for it.** For a hidden word, the words “three cute” call for a plural noun, the sound has just spoken the word, and the image contains puppies.','For a hidden frame, the words say which sound comes next, the voice and formants carry on, and the image backs up which word is being said.'],
   ['**For a hidden patch, the clues follow the same pattern.** The word “three” says that one more puppy is coming, the sound gives the same words in heard form, and the fur and background carry on from the earlier patches.','In every case, one of the three clues comes from the same sense as the hidden piece.'],
   ['**A clue from the same sense mostly says how the signal continues.** Grammar, smooth formants, and fur and background all carry on from what came before.','Clues from the other senses mostly say what the thing is, which here is puppies, three of them. Training on all the senses together helps because each sense fills gaps the others leave.']],
19:[['**For the model to speak, sound is first compressed into discrete codes.** Each code is a number that stands for a short piece of sound, and it works like a new word added to the vocabulary.','The model predicts the next code exactly as it predicts the next word, so speaking is the same guessing game again.'],
   ['**A decoder then changes the predicted codes back into a sound wave.** The model supplies the row of codes, and the decoder supplies the sound that can be heard.','Speech output therefore uses the same prediction as text output, followed by one extra decoding stage.'],
   ['**Three things are new when a model is trained on several senses.** The first is a shared currency in which everything becomes vectors in one row, the second is data where the senses appear together, and the third is a schedule that protects what was already learned.','What stays the same is the learning rule, which is to find the dependencies in the signal. The signal has only become wider.']],
}

def fmt(blocks):return ' || '.join(' >> '.join(b) for b in blocks)

def write_bulleted(version,pages):
    rows=['1|']+[f'{p}|=lecture18:{p}' for p in range(2,8)]+['8|']+[f'{p}|{fmt(pages[p])}' for p in NEW]
    (A/f'transcripts-v{version}/lecture19.txt').write_text('\n'.join(rows)+'\n')

def write_iskarous(version,pages):
    old=dict(r.split('|',1) for r in (A/f'transcripts-v{version}/lecture18.txt').read_text().splitlines() if r.strip())
    rows=['1|']+[f'{p}|{old[str(p)]}' for p in range(2,8)]+['8|'+old.get('8','')]+[f'{p}|{fmt(pages[p])}' for p in NEW]
    (A/f'transcripts-v{version}/lecture19.txt').write_text('\n'.join(rows)+'\n')

if __name__=='__main__':
    write_bulleted(7,{p:family(p,extra1=True) for p in NEW})
    write_bulleted(10,{p:family(p) for p in NEW})
    write_bulleted(12,{p:family(p,extra1=True,extra2=True) for p in NEW})
    write_bulleted(14,V14);write_bulleted(16,V16);write_bulleted(18,V18)
    write_iskarous(20,V20);write_iskarous(21,V21);write_iskarous(22,V22)
    print('Lecture 19 edition files written')
