## p9
- **An LLM learns by guessing a hidden word and then changing its weights a little.** In the sentence "The chef cracks the," the last word is hidden. The model reads the four words before the gap, and then it has to predict the word that fills the gap.
  - **Each word before the gap gives a clue about the hidden word.** A chef who cracks something is probably cracking food, so a food word is likely. These clue relationships are called **interdependencies** (one part of a sequence helps predict another part).
  - All four words are linked to the gap, so a clue can come from the start of the sentence as well as from the word right before the gap.
- **The model does not know the answer, so it spreads its bets.** A bet is the probability that the model gives to one possible word.
  - The model bets the most on "egg," less on "nut" and the least on "code." All three words could follow "The chef cracks the," but the words before the gap make "egg" the most likely.
- **Learning means nudging the weights so that these guesses get better.** A nudge is a small change to a weight.
  - After the true word is revealed, each weight changes a little. Because of that change, the right word gets a bigger bet the next time the model reads a sentence like this one.
- **The same idea holds when the signal contains words, sounds and images.** The signal is the sequence that the model reads.
  - The model still guesses a hidden piece from the other pieces, and it still nudges its weights after the answer is revealed. So the way the model learns stays the same, and only the content of the signal changes.

## p10
- **An LLM can only read a row of vectors, and speech and images do not arrive as rows of vectors.** Text, speech and images reach the model in three different forms, so two of them have to be converted first.
- **Text is already a row of pieces.** The sentence "Now crack the egg" separates into the pieces "Now," "crack," "the" and "egg."
  - Each piece can become one vector. So text is the easy case, because it is already in the order and the form that the model needs.
- **Speech is air pressure changing in time.** The pressure goes up and down without a break.
  - Nothing in the sound marks where one word stops and the next word starts. So there are no words in the sound itself, and there are no separate pieces either.
- **An image is a grid of light.** Each position in the grid has its own brightness and colour.
  - The image of an egg in a pan contains no words. Its parts are also spread over a surface, so they are not arranged in a row.
- **The first job is a conversion.** Speech and images both have to become rows of vectors, because a row of vectors is all the LLM can read.
  - Once speech and images are rows of vectors, one model can read them together with text.

## p11
- **Speech is turned into a row of vectors by slicing it in time.** The sound is cut into short slices, and each slice is called a **frame**.
  - Each slice is about 20 milliseconds long. The cuts are made at regular times, so they do not wait for a word to end.
- **The slices go through a speech encoder.** A **speech encoder** is a neural network that was trained on a large amount of audio.
  - The encoder takes in the slices of sound and gives back one vector for each slice.
  - Slices that contain different sounds give vectors that hold different numbers.
- **One second of speech becomes 50 vectors.** Each slice is about 20 milliseconds long, and 50 slices of that length fill one second. Each slice gives one vector, so one second gives 50 vectors.
- **The vectors stay in time order, so speech is now a row, just like a sentence.** The vector for the first slice comes first, and the vector for the last slice comes last.
  - A sentence is a row of word vectors, and sliced speech is a row of frame vectors. So the LLM can read speech the same way it reads text, one vector after another.

## p12
- **An image is turned into a row of vectors by cutting it into patches.** A **patch** is one small square of the image.
  - In the example, a grid cuts the image of an egg in a pan into 16 patches, 4 across and 4 down.
- **The patches are laid out in a row, in reading order.** Reading order means left to right along the top, then left to right along the next line down, the way a page is read.
  - An image has no order of its own, because its parts are spread over a surface. Reading order gives the patches a first piece and a last piece, so the image becomes a sequence, like a sentence.
- **The patches go through a vision encoder, and one vector comes out for each patch.** A **vision encoder** turns each patch into a vector, the way the speech encoder turns each slice of sound into a vector.
  - The 16 patches give 16 vectors, and the vectors keep the order of the patches. So the image is now a row that the LLM can read.
- **Real systems use much smaller patches, so one image gives hundreds of vectors.** The 4 by 4 grid is only there to keep the example simple.
  - Real systems use patches of 14 to 16 pixels. Smaller patches mean more patches for the same image, so the row of vectors is much longer.

## p13
- **Image patches, speech frames and words can all be placed in one row.** The image patches come first, the speech frames come next, and the words come last.
  - The words are "Now," "crack" and "the," and the word after them is hidden.
- **The words before the gap still give clues.** "Now," "crack" and "the" each help the model guess the hidden word. These are the same dependencies between words that the model uses when the row holds only text.
- **Clues now also come from the other senses.** A patch that contains an egg helps the model guess the hidden word. The sound of cracking helps too.
  - A link between two different kinds of signal is called a **cross-modal dependency**. Here the image and the sound are helping to predict a word.
- **The game is exactly the same as before, and only the source of some clues is new.** The model still guesses the hidden piece from the pieces it can read.
  - With text alone, every clue is a word. In the combined row, a clue can also be an image patch or a speech frame, so the model has more information for the same guess.

## p14
- **One event can be given to the model in three forms.** The example is "three cute puppies." It appears as an image of three puppies, as the phrase spoken aloud, and as the three written words.
- **The image is cut into 18 patches.** The grid has 3 rows of 6 patches, and each patch is one piece of the image, as with the egg.
  - The three puppies have different colours, and the third puppy is dark.
- **The spoken phrase is displayed as a spectrogram.** A **spectrogram** lays out a sound so that time runs from left to right.
  - A higher position means a higher frequency, and a darker area means more energy at that time and frequency.
  - Each word sits in its own stretch of time. "Three" comes first, "cute" comes second and "puppies" comes last. Each thin column of the spectrogram is one frame.
  - The speech was made with a speech synthesizer, an MBROLA diphone voice. It is not a recording of a person.
- **The image, the sound and the words are three views of one event.** They all describe the same thing, which is three cute puppies.
  - In training, all three go into one row. The model then plays the same game on that row, in which one piece is hidden and the model has to guess it.

## p15
- **In the first training example, the hidden piece is a word.** The row holds the image first, then the sound, then the words. The words are "three" and "cute," and the word after "cute" is hidden.
- **With the words alone, the model's bets are spread out.** Many endings fit after "three cute," such as "kittens," "puppies" and "babies."
  - The model gives the three words nearly equal bets, because the two words before the gap do not say which ending is right.
- **With the image and the sound, the bet piles up on "puppies."** The image contains puppies, and the sound contains the spoken word "puppies."
  - These are clues from the other senses. Because of them, "puppies" gets almost the whole bet, and "kittens" and "babies" get very small bets.
- **The true word is then revealed, and the model is graded on how much it bet on that word.** The true word is "puppies," and the model bet 0.85 on it.
  - The model bet a lot on the true word, so the error is small. Because the error is small, the weights move only a little.
  - If the model had bet only a little on "puppies," the error would be larger, so the weights would move more.

## p16
- **In the second training example, the hidden piece is a frame of sound.** The row is reordered so that the image comes first, then the words, then the sound.
  - This is like teaching the model to speak a sentence it was given.
  - The sound is predicted frame by frame, from left to right. The frames to the right of the hidden frame have not been heard yet, so the model cannot use them.
- **The first clue comes from the frames already heard.** The speaker's voice and the **formants** (frequency regions with strong energy) change smoothly from one frame to the next.
  - Because they change smoothly, the last few frames say a lot about what the next frame will be.
- **The words say which sound should come next.** Here the next sound is the vowel in "pup."
  - The image contains puppies, so it backs up the words. The image is a weaker clue in this example.
- **A frame is a column of numbers, and the error is how far the guess is from the truth.** Each number is how much energy there is in one frequency band, and 16 bands are displayed.
  - The model's guess is close to the true frame, but it is not exact. The error is how far apart each number in the guess is from the matching number in the true frame.
  - That error nudges the weights, so the next guess for a frame is closer.
  - Some systems predict a code for each frame instead of the raw numbers.

## p17
- **In the third training example, the hidden piece is a patch of the image.** The row is reordered again so that the words come first, then the sound, then the image.
  - This is like teaching the model to draw what it was told.
  - The patches are predicted in reading order. The patches that come after the hidden patch are not drawn yet, so the model cannot use them.
- **The patches already drawn give the first clue.** Above the hidden patch is background. To its left are two puppies, so the model has already seen what a puppy in this image looks like.
- **The words help in a different way.** "Three" says that a third puppy must appear, because only two have been drawn so far. "Puppies" says to expect dog ears.
  - The sound carries the same words, so it is a backup for the text.
- **The guess has the right content but the wrong colour.** The model guesses a blurry puppy ear in the average colour of the first two puppies. The true patch belongs to a dark puppy.
  - The biggest error is the colour. This is because nothing in the words, the sound or the patches already drawn said that the third puppy would be dark.
  - That error nudges the weights.
- **Only systems that also produce images are trained this way.** Systems that only read images usually skip this step.

## p18
- **Any piece of the row can be the hidden one, and each sense gives a clue for it.** The hidden piece can be a word, a sound frame or an image patch.
- **For a hidden word, all three senses point to "puppies."** The words "three cute" call for a plural noun. The sound helps because the word was just spoken. The image helps because it contains puppies.
- **For a hidden frame, each sense also gives a clue.** The words say which sound comes next. The voice and the formants carry on from the frames already heard. The image backs up which word is being said.
- **For a hidden patch, the pattern is the same.** The word "three" says one more puppy is coming. The sound gives the same words in heard form. The fur and the background carry on from the patches already drawn.
- **A clue from the same sense says how the signal continues, and clues from the other senses say what the thing is.** In each case, one of the three clues comes from the same sense as the hidden piece.
  - The same-sense clues are grammar for a hidden word, smooth formants for a hidden frame, and fur and background for a hidden patch. Each one carries on from what came before in its own sense.
  - The clues from the other senses say what is being described, which here is puppies, three of them.
  - So training on all three senses together helps, because each sense fills gaps that the others leave.

## p19
- **For the model to speak, sound is first compressed into discrete codes.** A code is a number that stands for a short piece of sound, such as 417, 82 or 903.
  - Each code works like a new word added to the model's vocabulary.
- **The model predicts the next code exactly as it predicts the next word.** The codes already in the row give clues about the hidden code.
  - So producing speech is the same guessing game again, played on codes instead of words.
- **A decoder turns the codes back into sound.** The **decoder** takes the row of predicted codes and produces a sound wave that can be heard.
  - The model supplies the codes, and the decoder supplies the sound.
- **Three things are new when a model is trained on words, sounds and images.**
  - The first is a **shared currency**, in which everything becomes vectors in one row.
  - The second is **data where the senses appear together**, such as an image, its spoken description and its written words.
  - The third is **a schedule that protects what was already learned**.
- **What stays the same is the learning rule, which is to find the dependencies in the signal.** The model still guesses a hidden piece and nudges its weights.
  - The signal has become wider, because it now holds words, sounds and images.
