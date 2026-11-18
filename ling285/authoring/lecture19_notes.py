"""Source-grounded teaching for Lecture 19, with no Lecture 19 classroom transcript.

Pages 2 to 8 are the Lecture 18 slides unchanged (same slide XML, same rendered
pixels), so they reuse the Lecture 18 teaching in every edition. Pages 9 to 19 are new
and are written from the slide content and the speaker notes only.
"""
TITLE='Neuron, Neural Networks, LLMs and Agents'
REUSE={p:('lecture18',p) for p in range(2,9)}
PAGES={
1:('Neuron, neural networks, LLMs and agents','title',[],[]),
9:('What an LLM learns','concept',[
'**An LLM learns by guessing a hidden word and then adjusting its weights.** In the sentence “The chef cracks the,” the last word is hidden. The model reads the earlier words and has to predict the word that comes next.',
'**Each earlier word gives a clue about the hidden word.** “The,” “chef,” “cracks” and “the” are each linked to the empty slot. These links are **interdependencies**, which are relationships in which one part of a sequence helps predict another part. A chef who cracks something makes a food word likely.',
'**The model does not know the answer, so it spreads its bets.** A bet is the probability the model gives to one possible word. The largest bet is on “egg,” a smaller bet is on “nut,” and the smallest is on “code.” All three could follow, but the earlier words make “egg” the most likely.',
'**Learning is nudging the weights so that these guesses get better.** A nudge is a small change to a weight. After the true word is revealed, the weights change a little, so the right word gets a bigger bet the next time.',
'**The same idea holds when the signal contains more than words.** The signal is the sequence the model reads. It can hold **words, sounds and images** together, and the model still guesses a hidden piece from the other pieces. The content of the signal changes, while the way the model learns stays the same.'],
['hidden next word','interdependencies','spreading bets','nudging the weights','signal with words, sounds and images']),
10:('Text, speech and images in three different forms','concept',[
'**An LLM can only read a row of vectors, and not all information arrives in that form.** Text, speech and images reach the model in three different forms. Speech and images have to be converted before the model can use them.',
'**Text is already a row of pieces.** The sentence “Now crack the egg” separates into the pieces “Now,” “crack,” “the” and “egg.” Each piece can become one vector, so text is easy to give to the model.',
'**Speech is air pressure changing in time.** The pressure goes up and down continuously, and nothing in the sound marks where one word stops and the next one starts. There are no words in the sound itself.',
'**An image is a grid of light.** Each position in the grid has its own brightness and colour. The image of an egg in a pan contains no words either, and its pieces are not arranged in a row.',
'**The first job is a conversion.** All three forms have to become rows of vectors, because a row of vectors is all the LLM can read. Once speech and images are rows too, one model can read them together with text.'],
['row of vectors','text as pieces','speech as air pressure','image as a grid of light','conversion to vectors']),
11:('Speech becomes a row of frame vectors','mechanism',[
'**Speech is converted by slicing time into short frames.** A **frame** is one short slice of the sound. The speech is cut at regular points in time, and each slice is about 20 milliseconds long.',
'**The slices go through a speech encoder.** A **speech encoder** is a neural network that was trained on a large amount of audio. It receives the slices of sound and turns each one into a vector.',
'**One vector comes out for each slice.** Different slices contain different sounds, so their vectors hold different numbers. The different shades in the columns under the encoder stand for those different numbers.',
'**One second of speech becomes 50 vectors.** Each slice lasts about 20 milliseconds, and 50 slices of that length fill one second. The vectors stay in time order, so the earliest slice comes first in the row.',
'**Speech is now a row, just like a sentence.** A sentence is a row of word vectors, and the sliced speech is a row of frame vectors. The LLM reads both the same way, one vector after another.'],
['frames of about 20 milliseconds','speech encoder','one vector per slice','50 vectors per second','time order']),
12:('Images become a row of patch vectors','mechanism',[
'**An image is converted by cutting it into patches.** A **patch** is one small square of the image. The image of an egg in a pan is cut by a grid into 16 patches, 4 across and 4 down.',
'**The patches are laid out in a row, in reading order.** Reading order means left to right along the top, then left to right along the next line down, the way a page is read. The image is now a sequence with a fixed order, like a sentence.',
'**The patches go through a vision encoder.** A **vision encoder** turns each patch into a vector, in the same way the speech encoder turns each slice of sound into a vector.',
'**One vector comes out for each patch.** The 16 patches give 16 vectors, and the vectors keep the order of the patches. The image has become a row that the LLM can read.',
'**Real systems use much smaller patches.** The 4 by 4 grid keeps the example simple. Real systems use patches of 14 to 16 pixels, so one image gives hundreds of vectors.'],
['patches','reading order','vision encoder','one vector per patch','hundreds of vectors in real systems']),
13:('One row with three senses','concept',[
'**Image patches, speech frames and words are placed in one row.** The image patches come first, the speech frames come next, and the words come last. The words are “Now,” “crack” and “the,” and the last word is hidden.',
'**The earlier words still give clues.** “Now,” “crack” and “the” each help the model guess the hidden word. These are the same dependencies between words that a model uses when its row holds only text.',
'**Clues now also come from the other senses.** A patch that contains an egg helps predict the hidden word, and so does the sound of cracking. A link between two different kinds of signal is a **cross-modal dependency**.',
'**The game is exactly the same as before.** The model guesses the hidden piece from the pieces it can read. It then learns from how good the guess was.',
'**The source of the clues is what changes.** With text alone, every clue is a word. In the combined row, a clue can also be an image patch or a speech frame, so the model has more information for the same guess.'],
['one combined row','word clues','cross-modal dependencies','same guessing game','clues from other senses']),
14:('Three cute puppies as an image, speech and words','concept',[
'**One event can be given to the model in three forms.** The example is “three cute puppies.” It appears as an image of three puppies, as the phrase spoken aloud, and as the three written words.',
'**The image is cut into 18 patches.** The grid has 3 rows of 6 patches. As with the egg, each patch is one piece of the image.',
'**The spoken phrase is a spectrogram.** A **spectrogram** displays sound with time running from left to right. A higher position means a higher frequency, and a darker area means more energy.',
'**Each word occupies its own stretch of time.** “Three” comes first, “cute” comes second and “puppies” comes last. Each thin column of the spectrogram is one frame. The speech was made with a speech synthesizer, an MBROLA diphone voice.',
'**The image, the sound and the words are three views of one event.** In training, all three go into one row. The model then plays the same game on that row, in which one piece is hidden and the model guesses it.'],
['three forms of one event','18 patches','spectrogram axes','frames and word positions','one training row']),
15:('Training example 1 predicts the next word','mechanism',[
'**In the first training example, the hidden piece is a word.** The row holds the image first, then the sound, then the words. The words are “three” and “cute,” and the last word is hidden.',
'**With the words alone, many endings fit.** “Kittens,” “puppies” and “babies” can all follow “three cute.” The model’s bets are spread out across the three words, and no word is far ahead.',
'**The image and the sound add clues.** The image contains puppies, and the sound contains the spoken word “puppies.” With these clues the bet piles up on “puppies,” and “kittens” and “babies” get very small bets.',
'**The true word is then revealed, and the model is graded.** The grade depends on how much the model bet on the true word. The true word is “puppies,” and the model bet 0.85 on it.',
'**A large bet on the truth gives a small nudge.** The model bet a lot on the true word, so the error is small. Because the error is small, the weights move only a little.'],
['hidden word','spread-out bets from text alone','clues from image and sound','bet on the truth','small error and small nudge']),
16:('Training example 2 predicts a sound frame','mechanism',[
'**In the second training example, the hidden piece is a frame of sound.** The row is reordered so the image comes first, then the words, then the sound. This is like teaching the model to speak a sentence it was given. The sound is predicted frame by frame from left to right, and the frames to the right have not been heard yet.',
'**The first clue comes from the earlier frames.** The speaker’s voice and the **formants** (frequency regions with strong energy) change smoothly. Because they change smoothly, the last few frames say a lot about the next frame.',
'**The words say which sound should come next.** Here the next sound is the vowel in “pup.” The image contains puppies, so it backs up the words. The image is a weaker clue in this example.',
'**A frame is a column of numbers.** Each number is how much energy there is in one frequency band, and 16 bands are displayed. The model’s guess is close to the true frame but not exact. The error is how far apart each number in the guess is from the matching number in the truth.',
'**That error nudges the weights.** The weights change so that the next guess for a frame is closer. Some systems predict a code for each frame instead of the raw numbers.'],
['hidden sound frame','earlier frames and formants','words and image as clues','frame as energy in 16 bands','error nudges the weights']),
17:('Training example 3 predicts an image patch','mechanism',[
'**In the third training example, the hidden piece is a patch of the image.** The row is reordered again so the words come first, then the sound, then the image. This is like teaching the model to draw what it was told. The patches are predicted in reading order, and the patches that are not drawn yet are faded.',
'**The earlier patches give the first clue.** Above the hidden patch is background. To its left are two puppies, so the model has already seen what a puppy in this image looks like.',
'**The words help in a different way.** “Three” says a third puppy must appear, and only two have been drawn. “Puppies” says to expect dog ears. The sound carries the same words, so it is a backup for the text.',
'**The guess is a blurry puppy ear in the average colour of the first two puppies.** The true patch belongs to a dark puppy. The biggest error is therefore the colour, because nothing in the words, the sound or the earlier patches said the third puppy would be dark.',
'**That error nudges the weights.** Only systems that also produce images are trained this way. Systems that only read images usually skip this step.'],
['hidden image patch','earlier patches','words and sound as clues','colour as the biggest error','training only for systems that produce images']),
18:('Every piece can be the hidden one','comparison',[
'**Any piece of the row can be the hidden one.** The hidden piece can be a word, a sound frame or an image patch. In each case, the words, the sound and the image each give a clue.',
'**For a hidden word, all three senses point to “puppies.”** The words “three cute” call for a plural noun. The sound helps because the word was just spoken. The image helps because it contains puppies.',
'**For a hidden frame, the sound itself says the most about what comes next.** The voice and the formants carry on from the earlier frames. The words say which sound comes next, and the image backs up which word is being said.',
'**For a hidden patch, the image itself says how the patch should continue.** The fur and the background carry on from the earlier patches. The word “three” says one more puppy is coming, and the sound gives the same words in heard form.',
'**Clues from the same sense and clues from other senses do different jobs.** A clue from the same sense mostly says how the signal continues, as with grammar, smooth formants, and fur and background. Clues from the other senses mostly say what the thing is, which here is puppies, three of them. Training on all three senses together helps because each sense fills gaps the others leave.'],
['any piece can be hidden','clues for a hidden word','clues for a hidden frame','clues for a hidden patch','same-sense and other-sense clues']),
19:('Talking back, and what is new','concept',[
'**For the model to speak, sound is compressed into discrete codes.** A code is a number that stands for a short piece of sound, such as 417, 82 or 903. Each code works like a new word added to the model’s vocabulary.',
'**The model predicts the next code exactly as it predicts the next word.** The earlier codes give clues about the hidden code, so producing speech is the same guessing game again.',
'**A decoder turns the codes back into sound.** The **decoder** takes the row of predicted codes and produces a sound wave that can be heard.',
'**Three things are new.** The first is a shared currency, in which everything becomes vectors in one row. The second is data where the senses appear together. The third is a schedule that protects what was already learned.',
'**The learning rule stays the same.** The model still finds the dependencies in the signal. The signal has become wider, because it now holds words, sounds and images.'],
['sound codes as new vocabulary','predicting the next code','decoder','three new requirements','unchanged learning rule']),
}
ORIGINAL={
9:['An LLM learns by guessing a **hidden word**. In “The chef cracks the,” each earlier word gives a clue about the last word, and these links are **interdependencies**. The model spreads its bets over “egg,” “nut” and “code,” with the largest bet on “egg.”',
 '**Learning is nudging the weights** so the right word gets a bigger bet next time. The same idea holds when the signal contains words, sounds and images.'],
10:['Text is **already a row of pieces**, so each piece can become a vector. Speech is **air pressure changing in time**, and an image is **a grid of light**. Neither one contains words.',
 'An LLM can only read a row of vectors. Speech and images therefore have to be **converted into rows of vectors** before the model can read them with text.'],
11:['Speech is cut into short slices called **frames**, each about 20 milliseconds long. A **speech encoder**, a network trained on a large amount of audio, turns each slice into a vector.',
 'One second of speech becomes **50 vectors in time order**. The speech is then a row, just like a sentence.'],
12:['An image is cut into small squares called **patches**. The 16 patches of the egg image are laid out in a row in reading order, so the image becomes a sequence.',
 'A **vision encoder** gives one vector per patch. Real systems use patches of 14 to 16 pixels, so one image gives hundreds of vectors.'],
13:['Image patches, speech frames and words go into **one row**, with the last word hidden. The earlier words still give clues about the hidden word.',
 'A patch containing an egg and the sound of cracking also help. These links between senses are **cross-modal dependencies**. The game is the same, and some clues now come from other senses.'],
14:['“Three cute puppies” is given as an image cut into **18 patches**, as a **spectrogram** of the spoken phrase, and as three written words. In the spectrogram, time runs left to right, higher means higher frequency and darker means more energy.',
 'These are **three views of one event**. Training puts all three into one row and hides one piece for the model to guess.'],
15:['The row holds the image, the sound and the words “three cute,” and the last word is hidden. With the words alone, the bets are spread over “kittens,” “puppies” and “babies.”',
 'With the image and the sound, the bet piles up on **“puppies.”** The model bet 0.85 on the true word, so the error is small and **the nudge to the weights is small**.'],
16:['The hidden piece is a **sound frame**, and the row holds the image, the words and the sound heard so far. The earlier frames help because the voice and the formants change smoothly. The words say the next sound is the vowel in “pup,” and the image backs up the words.',
 'A frame is a column of numbers giving the energy in each frequency band. The guess is close but not exact, and **the error nudges the weights**.'],
17:['The hidden piece is an **image patch**, and the row holds the words, the sound and the patches drawn so far. The earlier patches give background and two puppies. “Three” says one more puppy must appear, and “puppies” says to expect dog ears.',
 'The guess is a blurry ear in the average colour of the first two puppies, while the true puppy is dark. **The biggest error is the colour**, because no clue said the third puppy is dark.'],
18:['A hidden word, a hidden frame or a hidden patch each receives clues from the words, the sound and the image. For a hidden word, “three cute” calls for a plural noun, the word was just spoken, and the image contains puppies.',
 'A clue from **the same sense** says how the signal continues. Clues from **the other senses** say what the thing is. Each sense fills gaps the others leave.'],
19:['To speak, sound is compressed into **discrete codes** that work like new words in the vocabulary. The model predicts the next code like the next word, and a **decoder** turns the codes back into sound.',
 'Three things are new, which are a shared currency of vectors in one row, data where the senses appear together, and a schedule that protects what was already learned. What stays the same is **finding the dependencies in the signal**.'],
}
ISSUES={
11:['The slide draws ten slices and ten vectors as a sample. The 50 vectors per second come from the slide text, not from counting the drawn slices.'],
12:['The slide and speaker notes call the image “the picture.” The teaching uses image and image patch for the model’s visual input, following the course wording rule.'],
14:['The speaker notes state that the speech was made with a speech synthesizer (an MBROLA diphone voice). It is not a recording of a person.'],
15:['The bar lengths are read from the slide. Only the 0.85 bet on “puppies” is printed as a number.'],
19:['The slide lists “a schedule that protects what was already learned” without explaining the schedule. The teaching repeats the item and adds no outside explanation.'],
}
