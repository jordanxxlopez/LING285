## p9
- **An LLM learns by guessing a hidden word and then nudging its weights.** In "The chef cracks the," each word before the gap gives a clue about the hidden word, and these clue relationships are called **interdependencies**.
  - The model does not know the answer, so it spreads its bets. It bets the most on "egg," less on "nut" and the least on "code."
  - After the true word is revealed, the weights change a little, so the right word gets a bigger bet next time.
- **The same idea holds when the signal contains words, sounds and images.** The model still guesses a hidden piece from the other pieces, so only the content of the signal changes.

## p10
- **An LLM can only read a row of vectors, so speech and images have to be converted first.** Text is the easy case because it is already a row of pieces, such as "Now," "crack," "the" and "egg."
  - **Speech is air pressure changing in time**, and there are no words in the sound itself.
  - **An image is a grid of light**, and it contains no words either.
- **The first job is a conversion.** Once speech and images are rows of vectors, one model can read them together with text.

## p11
- **Speech is turned into a row of vectors by slicing it in time.** Each slice is called a **frame** and is about 20 milliseconds long.
  - The slices go through a **speech encoder**, which is a neural network trained on a large amount of audio. One vector comes out for each slice.
- **One second of speech becomes 50 vectors in time order.** Each slice gives one vector, and 50 slices of about 20 milliseconds fill one second.
  - Speech is now a row, just like a sentence, so the LLM can read it one vector after another.

## p12
- **An image is turned into a row of vectors by cutting it into patches.** A **patch** is one small square of the image, and the egg image is cut into 16 of them.
  - The patches are laid out in a row in reading order, so the image becomes a sequence, like a sentence.
  - A **vision encoder** then gives one vector for each patch.
- **Real systems use much smaller patches.** Their patches are 14 to 16 pixels, so one image gives hundreds of vectors.

## p13
- **Image patches, speech frames and words can all be placed in one row, with the last word hidden.** The words before the gap, "Now," "crack" and "the," still give clues.
  - A patch that contains an egg helps too, and so does the sound of cracking. A link between two different kinds of signal is a **cross-modal dependency**.
- **The game is exactly the same as before.** The model guesses the hidden piece from the pieces it can read, and some of the clues now come from other senses.

## p14
- **"Three cute puppies" is one event given in three forms.** It is an image cut into 18 patches, the phrase spoken aloud, and the three written words.
  - The spoken phrase is displayed as a **spectrogram**. Time runs from left to right, a higher position means a higher frequency, and a darker area means more energy.
  - Each thin column of the spectrogram is one frame, and each word sits in its own stretch of time.
- **These are three views of one event.** In training, all three go into one row, and the model guesses whichever piece is hidden.

## p15
- **In the first training example, the hidden piece is the word after "three cute."** With the words alone, the bets are spread out over "kittens," "puppies" and "babies," because many endings fit.
  - The image contains puppies, and the sound contains the spoken word "puppies." With these clues, the bet piles up on "puppies."
- **The model bet 0.85 on the true word, so the nudge to the weights is small.** A large bet on the truth means a small error, and a small error moves the weights only a little.

## p16
- **In the second training example, the hidden piece is a frame of sound.** The sound is predicted frame by frame from left to right, which is like teaching the model to speak a sentence it was given.
  - The frames already heard help the most, because the voice and the **formants** (frequency regions with strong energy) change smoothly.
  - The words say the next sound is the vowel in "pup," and the image backs up the words.
- **A frame is a column of numbers for the energy in each frequency band.** The guess is close but not exact, and the error between the guess and the truth nudges the weights.

## p17
- **In the third training example, the hidden piece is a patch of the image.** The patches are predicted in reading order, which is like teaching the model to draw what it was told.
  - The patches already drawn give background above and two puppies to the left. "Three" says a third puppy must appear, and "puppies" says to expect dog ears.
  - The sound carries the same words, so it backs up the text.
- **The biggest error is the colour.** The model guesses an ear in the average colour of the first two puppies, but the third puppy is dark, and no clue said so.
  - Only systems that also produce images are trained this way.

## p18
- **Any piece of the row can be the hidden one, and each sense gives a clue for it.** For a hidden word, "three cute" calls for a plural noun, the word was just spoken, and the image contains puppies.
  - For a hidden frame, the words say which sound comes next, the voice and formants carry on, and the image backs up the word.
  - For a hidden patch, "three" says one more puppy is coming, the sound gives the same words, and the fur and background carry on.
- **A clue from the same sense says how the signal continues, and clues from the other senses say what the thing is.** So each sense fills gaps that the others leave, which is why training on all three together helps.

## p19
- **For the model to speak, sound is compressed into discrete codes that work like new words in the vocabulary.** The model predicts the next code exactly as it predicts the next word.
  - A **decoder** then turns the codes back into a sound wave.
- **Three things are new, and the learning rule stays the same.** The new things are a shared currency of vectors in one row, data where the senses appear together, and a schedule that protects what was already learned.
  - What stays the same is finding the dependencies in the signal. The signal has only become wider.
