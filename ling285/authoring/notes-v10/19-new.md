## p9
- **An LLM learns by guessing a hidden word.** The sentence is "The chef cracks the." The last word is hidden, and the model has to guess it.
  - **Every word before the gap is a clue.** A chef who cracks something is probably cracking food. So a food word is likely.
  - These clue relationships have a name. They are called **interdependencies** (one part of a sequence helps predict another part).
- **The model spreads its bets because it does not know the answer.** A bet is the probability the model gives to one word.
  - The biggest bet is on "egg." A smaller bet is on "nut." The smallest bet is on "code."
  - All three words could come next. The words before the gap make "egg" the most likely.
- **Learning means nudging the weights.** A nudge is a small change to a weight.
  - First the true word is revealed. Then each weight changes a little. After that, the right word gets a bigger bet next time.
- **The same idea works for words, sounds and images.** The signal is the sequence the model reads, and it can hold all three.
  - The model still guesses a hidden piece. It still nudges its weights. Only the content of the signal is different.

## p10
- **An LLM can only read a row of vectors.** Text, speech and images arrive in three different forms. Two of them have to be converted first.
- **Text is the easy case.** Text is already a row of pieces. "Now crack the egg" has the pieces "Now," "crack," "the" and "egg."
  - Each piece can become one vector. So text is ready for the model almost as it is.
- **Speech is air pressure changing in time.** The pressure goes up and down without a break.
  - Nothing in the sound marks where a word starts or stops. So there are no words in the sound itself.
- **An image is a grid of light.** Each spot in the grid has its own brightness and colour.
  - The image has no words in it. Its parts are not in a row.
- **So the first job is a conversion.** Speech has to become a row of vectors. An image has to become a row of vectors too.
  - After that, one model can read text, speech and images together.

## p11
- **Speech becomes a row of vectors in three steps.**
  - First, the sound is cut into short slices of time. Each slice is called a **frame**, and it is about 20 milliseconds long.
  - Then the slices go through a **speech encoder**. A speech encoder is a neural network that was trained on a large amount of audio.
  - Last, one vector comes out for each slice. Different sounds give vectors with different numbers.
- **One second of speech becomes 50 vectors.** Each slice is about 20 milliseconds long. Fifty slices of that length fill one second. Each slice gives one vector, so one second gives 50 vectors.
- **The vectors stay in time order.** The first slice gives the first vector, and the last slice gives the last vector.
  - So speech is now a row, just like a sentence. The LLM can read it one vector after another.

## p12
- **An image becomes a row of vectors in three steps.**
  - First, a grid cuts the image into small squares. Each square is called a **patch**. The image of an egg in a pan is cut into 16 patches.
  - Then the patches are laid out in a row, in reading order. Reading order means left to right along the top, then left to right along the next line down.
  - Last, the patches go through a **vision encoder**. One vector comes out for each patch.
- **Reading order turns the image into a sequence.** The patches now have a first piece and a last piece, like the words of a sentence.
  - The 16 patches give 16 vectors in the same order. So the LLM can read the image as a row.
- **Real systems use much smaller patches.** The example uses a 4 by 4 grid to stay simple. Real systems use patches of 14 to 16 pixels.
  - Smaller patches mean more patches. So one image gives hundreds of vectors.

## p13
- **All three kinds of piece can go in one row.** The image patches come first. The speech frames come next. The words come last.
  - The words are "Now," "crack" and "the." The word after them is hidden.
- **The words before the gap still give clues.** "Now," "crack" and "the" each help the model guess the hidden word. This is the same as in a row of text.
- **Clues also come from the other senses now.** A patch that contains an egg helps the model guess the word. The sound of cracking helps too.
  - This kind of link has a name. It is a **cross-modal dependency** (a link between two different kinds of signal).
- **The game is exactly the same as before.** The model guesses the hidden piece from the pieces it can read.
  - Only one thing is new. Some of the clues now come from other senses.

## p14
- **"Three cute puppies" is one event in three forms.** There is an image of three puppies. There is the phrase spoken aloud. There are the three written words.
- **The image is cut into 18 patches.** The grid has 3 rows of 6 patches.
  - The three puppies have different colours. The third puppy is dark.
- **The spoken phrase is displayed as a spectrogram.** A **spectrogram** lays out a sound in time.
  - Time runs from left to right. A higher position means a higher frequency. A darker area means more energy.
  - Each thin column is one frame. Each word has its own stretch of time, with "three" first and "puppies" last.
  - The voice is a speech synthesizer (an MBROLA diphone voice). It is not a recording of a person.
- **The three forms are three views of one event.** In training, all three go into one row.
  - Then one piece of the row is hidden, and the model has to guess it.

## p15
- **Training example 1 hides a word.** The row holds the image, then the sound, then the words. The words are "three" and "cute." The word after "cute" is hidden.
- **With the words alone, the bets are spread out.** "Kittens," "puppies" and "babies" all fit after "three cute."
  - The model cannot tell which one is right. So the three words get nearly equal bets.
- **With the image and the sound, the bet piles up on "puppies."** The image contains puppies. The sound contains the spoken word "puppies."
  - So "puppies" gets almost the whole bet. "Kittens" and "babies" get very small bets.
- **Then the true word is revealed, and the model is graded.** The grade depends on how much the model bet on the true word.
  - The true word is "puppies." The model bet 0.85 on it.
  - That is a large bet on the truth, so the error is small. A small error moves the weights only a little.
  - A small bet on the truth would be a larger error. A larger error would move the weights more.

## p16
- **Training example 2 hides a frame of sound.** The row is reordered. The image comes first, then the words, then the sound.
  - This is like teaching the model to speak a sentence it was given.
  - The sound is predicted one frame at a time, from left to right. The frames after the hidden one have not been heard yet.
- **Three clues help the model guess the frame.**
  - The frames already heard are the first clue. The voice and the **formants** (frequency regions with strong energy) change smoothly. So the last few frames say a lot about the next one.
  - The words are the second clue. They say which sound should come next, and here it is the vowel in "pup."
  - The image is the third clue. It contains puppies, so it backs up the words. It is a weaker clue here.
- **A frame is a column of numbers.** Each number is how much energy there is in one frequency band. There are 16 bands on display.
  - The guess is close to the true frame, but it is not exact. The error is how far each guessed number is from the true number.
  - That error nudges the weights.
  - Some systems predict a code for each frame instead of the raw numbers.

## p17
- **Training example 3 hides a patch of the image.** The row is reordered again. The words come first, then the sound, then the image.
  - This is like teaching the model to draw what it was told.
  - The patches are predicted in reading order. The patches after the hidden one are not drawn yet.
- **Three clues help the model guess the patch.**
  - The patches already drawn are the first clue. Above the hidden patch is background. To its left are two puppies. So the model has seen what a puppy in this image looks like.
  - The words are the second clue. "Three" says a third puppy must appear, because only two are drawn. "Puppies" says to expect dog ears.
  - The sound is the third clue. It carries the same words, so it backs up the text.
- **The guess has the right content and the wrong colour.** The model guesses a blurry puppy ear. The ear has the average colour of the first two puppies. The true puppy is dark.
  - So the biggest error is the colour. No clue said the third puppy would be dark.
  - That error nudges the weights.
- **Only some systems are trained this way.** Systems that also produce images are trained to predict patches. Systems that only read images usually skip this step.

## p18
- **Any piece of the row can be the hidden one.** It can be a word, a sound frame or an image patch. Each sense gives a clue every time.
- **For a hidden word, the three clues all point to "puppies."**
  - The words "three cute" call for a plural noun.
  - The sound helps because the word was just spoken.
  - The image helps because it contains puppies.
- **For a hidden frame, the three clues are about the next sound.**
  - The words say which sound comes next.
  - The voice and the formants carry on from the frames already heard.
  - The image backs up which word is being said.
- **For a hidden patch, the three clues are about the next part of the image.**
  - The word "three" says one more puppy is coming.
  - The sound gives the same words in heard form.
  - The fur and the background carry on from the patches already drawn.
- **The same sense says how the signal continues. The other senses say what the thing is.**
  - Grammar, smooth formants, and fur and background are the same-sense clues. Each one carries on from what came before.
  - The other senses say what is being described. Here that is puppies, three of them.
  - So each sense fills gaps that the others leave. That is why training on all three together helps.

## p19
- **The model speaks in three steps.**
  - First, sound is compressed into discrete codes. A code is a number that stands for a short piece of sound, such as 417, 82 or 903. Each code works like a new word in the vocabulary.
  - Then the model predicts the next code. It does this exactly as it predicts the next word.
  - Last, a **decoder** turns the codes back into a sound wave that can be heard.
- **Three things are new when a model learns from words, sounds and images.**
  - The first is a **shared currency**. Everything becomes vectors in one row.
  - The second is **data where the senses appear together**.
  - The third is **a schedule that protects what was already learned**.
- **One thing stays the same.** The learning rule is still to find the dependencies in the signal.
  - The model still guesses a hidden piece and nudges its weights. The signal has only become wider.
