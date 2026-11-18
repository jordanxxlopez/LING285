// Module III additions to the modern content pack. Lists are appended and keyed entries are added.
(() => {
 const add = {
 "concepts": {
  "hidden-word": {
   "opening": "**An LLM learns by predicting a hidden word from the words before it**, and each of those words supplies a clue. The relationships between the clue words and the hidden word are interdependencies.",
   "mechanism": "The model gives a probability to each possible next word, with the most on “egg,” less on “nut” and the least on “code.” After the true word is revealed, the weights are nudged so that the right word receives a larger probability next time.",
   "consequence": "The same procedure applies when the signal contains sounds and images as well as words. The content of the signal changes, while guessing a hidden piece and adjusting the weights stays the same.",
   "plain": "The model reads “The chef cracks the” and has to guess the next word. It bets most on “egg,” and after the answer is revealed its weights change a little so the next guess is better."
  },
  "three-forms": {
   "opening": "**Text, speech and images arrive in three different forms**, and only text is already a row of pieces. Speech is air pressure changing in time, and an image is a grid of light.",
   "mechanism": "An LLM reads a row of vectors. Each piece of text can become one vector directly, while speech and images contain no words and no separate pieces, so they have to be converted into rows of vectors first.",
   "consequence": "The conversion comes before any learning from speech or images. Once all three forms are rows of vectors, one model can read them together.",
   "plain": "Text is easy because “Now crack the egg” is already four pieces in a row. Speech and images have no pieces like that, so they have to be changed into rows of vectors."
  },
  "speech-frames": {
   "opening": "**Speech becomes a row of vectors by slicing time into short frames**, each about 20 milliseconds long. A speech encoder then gives one vector for each slice.",
   "mechanism": "The speech encoder is a neural network trained on a large amount of audio. Each slice of sound goes in and one vector comes out, and slices with different sounds give vectors with different numbers.",
   "consequence": "One second of speech becomes 50 vectors in time order. The speech is then a row, just like a sentence, so the model can read it one vector after another.",
   "plain": "The sound is cut into slices of about 20 milliseconds. A speech encoder changes each slice into a vector, so one second of speech becomes 50 vectors in order."
  },
  "image-patches": {
   "opening": "**An image becomes a row of vectors by cutting it into patches**, which are small squares of the image. The patches are laid out in reading order, and a vision encoder gives one vector for each patch.",
   "mechanism": "Reading order gives the patches a first piece and a last piece, so the image becomes a sequence like a sentence. The 16 patches of the egg image become 16 vectors in the same order.",
   "consequence": "Real systems use much smaller patches of 14 to 16 pixels. Smaller patches mean more patches for the same image, so one image gives hundreds of vectors.",
   "plain": "The image is cut into small squares called patches. The patches are placed in a row in reading order, and a vision encoder changes each patch into a vector."
  },
  "cross-modal": {
   "opening": "**Image patches, speech frames and words can be placed in one row**, with the last word hidden. The earlier words still give clues, and the other senses now give clues as well.",
   "mechanism": "A patch containing an egg and the sound of cracking both help predict the hidden word. A link between two different kinds of signal is a cross-modal dependency.",
   "consequence": "The game is the same as with text alone. The model guesses the hidden piece from the pieces it can read, and the only change is that some clues come from other senses.",
   "plain": "The patches, the frames and the words all sit in one row. The model still guesses the hidden word, and now an image patch or a sound can help as well as the earlier words."
  },
  "three-views": {
   "opening": "**“Three cute puppies” is one event given in three forms**, an image, the spoken phrase and the written words. Training places all three in one row.",
   "mechanism": "The image is cut into 18 patches. The spoken phrase is a spectrogram in which time runs from left to right, a higher position means a higher frequency and a darker area means more energy, and each thin column is one frame.",
   "consequence": "Because the three forms describe the same event, a piece hidden in one form can be guessed with help from the other two. The speech in the example was made with a speech synthesizer.",
   "plain": "The same phrase is given as an image, as speech and as text. All three are put in one row, and the model has to guess whichever piece is hidden."
  },
  "train-word": {
   "opening": "**In the first training example the hidden piece is the word after “three cute”**, and the image and the sound settle the guess. The row holds the image, the sound and the words.",
   "mechanism": "With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” The image contains puppies and the sound contains the spoken word, so with those clues the bet piles up on “puppies.”",
   "consequence": "The model bet 0.85 on the true word, so the error is small and the weights move only a little. A smaller bet on the true word would be a larger error and would move the weights more.",
   "plain": "From the words “three cute” alone, the model cannot tell which ending is right. The image and the sound point to “puppies,” so the model bets most on it, and its weights then need only a small change."
  },
  "train-frame": {
   "opening": "**In the second training example the hidden piece is a frame of sound**, predicted from left to right. This is like teaching the model to speak a sentence it was given.",
   "mechanism": "The earlier frames help because the voice and the formants change smoothly. The words say the next sound is the vowel in “pup,” and the image backs up the words as a weaker clue.",
   "consequence": "A frame is a column of numbers for the energy in each frequency band. The guess is close but not exact, and the difference between the guess and the truth is the error that nudges the weights.",
   "plain": "The model guesses the next slice of sound. The sound so far helps the most, the words say which sound comes next, and the image backs up the words."
  },
  "train-patch": {
   "opening": "**In the third training example the hidden piece is a patch of the image**, predicted in reading order. This is like teaching the model to draw what it was told.",
   "mechanism": "The earlier patches give background above and two puppies to the left. “Three” says a third puppy must appear, “puppies” says to expect dog ears, and the sound carries the same words as a backup.",
   "consequence": "The guess is a puppy ear in the average colour of the first two puppies, but the true puppy is dark. The colour is the biggest error because no clue gave it. Only systems that also produce images are trained this way.",
   "plain": "The model guesses the next square of the image. The earlier squares and the words tell it a puppy ear belongs there, but nothing tells it the colour."
  },
  "clue-table": {
   "opening": "**Any piece of the row can be the hidden one**, and the words, the sound and the image each give a clue for it. The clue from the same sense does a different job from the other two.",
   "mechanism": "A clue from the same sense says how the signal continues, as grammar does for a hidden word, smooth formants do for a hidden frame, and fur and background do for a hidden patch. Clues from the other senses say what the thing is.",
   "consequence": "Training on all three senses together helps because each sense fills gaps the others leave. A model with one sense alone would have only the clues about how the signal continues.",
   "plain": "Whatever piece is hidden, each sense gives a clue. The same sense says how the signal carries on, and the other senses say what is being described."
  },
  "talking-back": {
   "opening": "**The model speaks by predicting codes for sound**. Sound is compressed into discrete codes that work like new words in the vocabulary, and a decoder turns the predicted codes back into sound.",
   "mechanism": "The model predicts the next code exactly as it predicts the next word. The decoder then takes the row of codes and produces a sound wave.",
   "consequence": "Three things are new, which are a shared currency of vectors in one row, data where the senses appear together, and a schedule that protects what was already learned. What stays the same is finding the dependencies in the signal.",
   "plain": "Sound is changed into codes, and the model guesses the next code the same way it guesses the next word. A decoder then changes the codes back into sound."
  }
 },
 "guides": [
  {
   "id": "modern-guide-m3-conversion",
   "moduleId": "module3",
   "title": "Explain how speech and images become rows of vectors.",
   "points": [
    {
     "concept": "three-forms",
     "collection": "lecture19",
     "pages": [
      10
     ]
    },
    {
     "concept": "speech-frames",
     "collection": "lecture19",
     "pages": [
      11
     ]
    },
    {
     "concept": "image-patches",
     "collection": "lecture19",
     "pages": [
      12
     ]
    }
   ],
   "question": "What do the conversion of speech and the conversion of an image have in common?",
   "answer": "Both are cut into small pieces that stay in order, and an encoder gives **one vector for each piece**. Speech is cut in time into frames, and an image is cut in space into patches."
  },
  {
   "id": "modern-guide-m3-cross-modal",
   "moduleId": "module3",
   "title": "Explain how clues cross from one sense to another.",
   "points": [
    {
     "concept": "hidden-word",
     "collection": "lecture19",
     "pages": [
      9
     ]
    },
    {
     "concept": "cross-modal",
     "collection": "lecture19",
     "pages": [
      13
     ]
    },
    {
     "concept": "three-views",
     "collection": "lecture19",
     "pages": [
      14
     ]
    }
   ],
   "question": "What changes when image patches and speech frames are placed in the same row as the words?",
   "answer": "The game stays the same, because the model still guesses the hidden piece. **Some of the clues now come from other senses**, and these links are cross-modal dependencies."
  },
  {
   "id": "modern-guide-m3-training",
   "moduleId": "module3",
   "title": "Follow a hidden word, a hidden sound frame and a hidden image patch through training.",
   "points": [
    {
     "concept": "train-word",
     "collection": "lecture19",
     "pages": [
      15
     ]
    },
    {
     "concept": "train-frame",
     "collection": "lecture19",
     "pages": [
      16
     ]
    },
    {
     "concept": "train-patch",
     "collection": "lecture19",
     "pages": [
      17
     ]
    }
   ],
   "question": "In all three training examples, what decides how much the weights change?",
   "answer": "The size of the error decides it. **A guess close to the truth gives a small error and a small nudge**, and a guess far from the truth gives a larger error and a larger nudge."
  },
  {
   "id": "modern-guide-m3-clues",
   "moduleId": "module3",
   "title": "Separate same-sense clues from other-sense clues, and explain how the model talks back.",
   "points": [
    {
     "concept": "clue-table",
     "collection": "lecture19",
     "pages": [
      18
     ]
    },
    {
     "concept": "talking-back",
     "collection": "lecture19",
     "pages": [
      19
     ]
    }
   ],
   "question": "Why does training on words, sound and images together help?",
   "answer": "A clue from the same sense says how the signal continues, and clues from the other senses say what the thing is. **Each sense fills gaps the others leave**."
  }
 ],
 "asked": [
  {
   "concept": "speech-frames",
   "collection": "lecture19",
   "pages": [
    10,
    11,
    12
   ],
   "title": "Explain the conversion of speech and images into rows of vectors.",
   "moduleId": "module3",
   "items": [
    {
     "question": "How many vectors does one second of speech become, and why?",
     "answer": "One second of speech becomes 50 vectors. **Each slice of about 20 milliseconds gives one vector**, and 50 slices of that length fill one second."
    },
    {
     "question": "Why are the patches of an image laid out in reading order?",
     "answer": "Reading order gives the patches a first piece and a last piece. **The image becomes a sequence**, like a sentence, that the model can read as a row."
    },
    {
     "question": "What happens to the number of vectors when the patches are made smaller?",
     "answer": "The number of vectors goes up. **Smaller patches mean more patches for the same image**, and each patch gives one vector."
    }
   ]
  },
  {
   "concept": "train-word",
   "collection": "lecture19",
   "pages": [
    15,
    16,
    17
   ],
   "title": "Explain what each clue gives and how the error changes the weights.",
   "moduleId": "module3",
   "items": [
    {
     "question": "Why are the bets spread out when the model has only the words “three cute”?",
     "answer": "Many endings fit after “three cute,” such as “kittens,” “puppies” and “babies.” **The words alone do not say which ending is right**."
    },
    {
     "question": "The model bet 0.85 on the true word. Is the nudge to the weights large or small?",
     "answer": "The nudge is small. **A large bet on the truth is a small error**, and a small error moves the weights only a little."
    },
    {
     "question": "Why did the model get the colour of the third puppy wrong?",
     "answer": "It guessed the average colour of the first two puppies. **No clue in the words, the sound or the earlier patches said the third puppy would be dark**."
    }
   ]
  },
  {
   "concept": "clue-table",
   "collection": "lecture19",
   "pages": [
    13,
    18,
    19
   ],
   "title": "Explain the two kinds of clue and what stays the same.",
   "moduleId": "module3",
   "items": [
    {
     "question": "What does a clue from the same sense tell the model?",
     "answer": "It tells the model how the signal continues. **Grammar, smooth formants, and fur and background are the three examples**."
    },
    {
     "question": "What do clues from the other senses tell the model?",
     "answer": "They tell the model what the thing is. **Here they say puppies, three of them**."
    },
    {
     "question": "What stays the same when the signal holds words, sounds and images?",
     "answer": "The learning rule stays the same. **The model still finds the dependencies in the signal** by guessing a hidden piece and nudging its weights."
    }
   ]
  }
 ],
 "qa": [
  {
   "id": "modern-qa-lecture19-levels-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "levels",
   "kind": "slides",
   "question": "How do a neuron, a network and an agentic system describe different levels of organization?",
   "answer": [
    "A neuron combines inputs, a network combines processing stages and an agentic system connects task-performing models. **They describe different levels of organization**.",
    "An agentic system connects models through messages and assigned tasks. Its graph of interactions sits outside the hidden processing layers of an individual model.",
    "Shared numerical operations can remain useful as the organization becomes more complex. Adding a higher level does not make the lower-level operations disappear."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 2
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-levels-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "levels",
   "kind": "slides",
   "question": "Why do lower-level computations remain relevant as a system gains more organization?",
   "answer": [
    "The higher organization is built from the lower computations. **A larger system still relies on the weighted transformations performed inside its models**.",
    "An agentic system connects models through messages and assigned tasks. Its graph of interactions sits outside the hidden processing layers of an individual model.",
    "Shared numerical operations can remain useful as the organization becomes more complex. Adding a higher level does not make the lower-level operations disappear."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 2
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-heads-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "heads",
   "kind": "slides",
   "question": "How do parallel attention heads differ from successive layers?",
   "answer": [
    "Heads contribute alongside one another within a layer, while layers transform representations successively. **Parallel contribution differs from depth**.",
    "A layer combines information from its heads before passing representations onward. The next layer can then operate on information that already incorporates those relationships.",
    "The expert analogy describes specialized computational contributions rather than separate people or guaranteed interpretable skills. Multiple heads in one layer are not the same as multiple complete agents exchanging messages."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 3
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-heads-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "heads",
   "kind": "slides",
   "question": "Why is an attention head different from an agent assigned a checking task?",
   "answer": [
    "A head is part of internal model processing, while an agent is a model assigned a task in a larger system. **The two belong to different levels of organization**.",
    "A layer combines information from its heads before passing representations onward. The next layer can then operate on information that already incorporates those relationships.",
    "The expert analogy describes specialized computational contributions rather than separate people or guaranteed interpretable skills. Multiple heads in one layer are not the same as multiple complete agents exchanging messages."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 3
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-dynamic-depth-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "dynamic-depth",
   "kind": "slides",
   "question": "What relationship connects repeated state updates with transformation through network depth?",
   "answer": [
    "The output state of one transformation becomes the input to another. **Repeated change is the useful common relationship**.",
    "Following one value through the layers makes the changing representation visible. Different layers can have different learned weights, so the analogy concerns repeated transformation rather than identical numerical rules at every layer.",
    "An output can become the input to another processing step in both cases. The comparison links physical change and learned computation without requiring an LLM layer to be a physical spring."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 4
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-dynamic-depth-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "dynamic-depth",
   "kind": "slides",
   "question": "Why does the dynamical-system analogy not require every layer to have identical weights?",
   "answer": [
    "Different layers can apply different learned transformations. **The analogy concerns a sequence of states rather than one identical numerical matrix**.",
    "Following one value through the layers makes the changing representation visible. Different layers can have different learned weights, so the analogy concerns repeated transformation rather than identical numerical rules at every layer.",
    "An output can become the input to another processing step in both cases. The comparison links physical change and learned computation without requiring an LLM layer to be a physical spring."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 4
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-next-token-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "next-token",
   "kind": "slides",
   "question": "What stays the same when next-item prediction is applied to different kinds of vectors?",
   "answer": [
    "The items are represented as ordered vectors and the task predicts a continuation from context. **Their original materials can differ without changing that general organization**.",
    "The model uses the available context to assign probabilities to possible continuations. Learning improves those probabilities when the actual continuation supplies feedback.",
    "A token’s position in the sequence and its context help determine what should come next. The prediction task stays recognizable even when the represented material changes from words to another kind of signal."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 5
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-next-token-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "next-token",
   "kind": "slides",
   "question": "How does the available context shape a distribution over continuations?",
   "answer": [
    "Context changes which continuations fit and how strongly each is supported. **A distribution can express both restriction and appropriate uncertainty**.",
    "The model uses the available context to assign probabilities to possible continuations. Learning improves those probabilities when the actual continuation supplies feedback.",
    "A token’s position in the sequence and its context help determine what should come next. The prediction task stays recognizable even when the represented material changes from words to another kind of signal."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 5
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-phonotactics-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "phonotactics",
   "kind": "slides",
   "question": "How do onset, vowel and coda position constrain a possible English sound sequence?",
   "answer": [
    "The syllable position changes which combinations fit, with onset before the vowel and coda after it. **Allowed sound sequences depend on that structure**.",
    "An onset occurs before a syllable’s vowel, and a coda occurs after it. A cluster that works across a syllable boundary does not necessarily work at the beginning of a syllable.",
    "The spelling examples provide clues to these restrictions, but letters and speech sounds are different units. The beginning of knee, for example, contains written k even though its ordinary pronunciation does not begin with /k/."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 6
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-phonotactics-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "phonotactics",
   "kind": "slides",
   "question": "Why can a cluster allowed across a syllable boundary fail within an onset?",
   "answer": [
    "A boundary can put the consonants into different syllable positions. **A cross-boundary cluster does not have to be a valid single onset**.",
    "An onset occurs before a syllable’s vowel, and a coda occurs after it. A cluster that works across a syllable boundary does not necessarily work at the beginning of a syllable.",
    "The spelling examples provide clues to these restrictions, but letters and speech sounds are different units. The beginning of knee, for example, contains written k even though its ordinary pronunciation does not begin with /k/."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 6
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-letter-guess-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "letter-guess",
   "kind": "slides",
   "question": "How does guessing a next letter expose learned restrictions on word beginnings?",
   "answer": [
    "A beginning limits which completions fit familiar word patterns. **Correct prediction reflects sensitivity to those learned restrictions**.",
    "Some beginnings permit many continuations while others sharply restrict the possibilities. A probability distribution can express that difference by spreading probability broadly or concentrating it on fewer choices.",
    "Learning from many such completions can capture regularities without receiving a separate verbal rule for each one. The spelling exercise probes useful language knowledge while remaining distinct from a complete description of English phonology."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 7
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-letter-guess-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "letter-guess",
   "kind": "slides",
   "question": "Why are some continuation distributions broad while others are concentrated?",
   "answer": [
    "Some contexts permit many plausible continuations and others permit few. **The distribution should reflect that difference in uncertainty**.",
    "Some beginnings permit many continuations while others sharply restrict the possibilities. A probability distribution can express that difference by spreading probability broadly or concentrating it on fewer choices.",
    "Learning from many such completions can capture regularities without receiving a separate verbal rule for each one. The spelling exercise probes useful language knowledge while remaining distinct from a complete description of English phonology."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 7
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-software-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "software",
   "kind": "slides",
   "question": "How do explicit programs, learned weights and communicating agents organize a task differently?",
   "answer": [
    "Explicit procedures state operations, learned parameters encode relationships from examples, and communicating models organize connected tasks. **The categories distinguish how task behavior is supplied**.",
    "An explicitly written program specifies operations in a language such as Python. A trained network instead stores useful input-to-output relationships in its weights, while an agentic arrangement can ask models to draft, check and revise the result.",
    "These forms can work together in one system rather than replacing every earlier operation. Natural-language instructions can organize agents that still rely on trained parameters and executable software."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 8
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-software-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "software",
   "kind": "slides",
   "question": "Why can Software 1.0, 2.0 and 3.0 work together rather than replacing one another?",
   "answer": [
    "An agentic arrangement can use trained models that run through executable programs. **The three forms can therefore contribute to one system together**.",
    "An explicitly written program specifies operations in a language such as Python. A trained network instead stores useful input-to-output relationships in its weights, while an agentic arrangement can ask models to draft, check and revise the result.",
    "These forms can work together in one system rather than replacing every earlier operation. Natural-language instructions can organize agents that still rely on trained parameters and executable software."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 8
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-hidden-word-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "hidden-word",
   "kind": "slides",
   "question": "How does an LLM learn from the sentence “The chef cracks the ?”",
   "answer": [
    "It guesses the hidden word from the earlier words and then adjusts its weights. **Each revealed answer nudges the weights so the right word gets a bigger bet**.",
    "The model gives a probability to each possible next word, with the most on “egg,” less on “nut” and the least on “code.” After the true word is revealed, the weights are nudged so that the right word receives a larger probability next time.",
    "The same procedure applies when the signal contains sounds and images as well as words. The content of the signal changes, while guessing a hidden piece and adjusting the weights stays the same."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 9
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-hidden-word-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "hidden-word",
   "kind": "slides",
   "question": "Why does the model spread its bets over “egg,” “nut” and “code”?",
   "answer": [
    "The model does not know the hidden word, and several words could follow. **The earlier words make “egg” the most likely, so it receives the largest bet**.",
    "The model gives a probability to each possible next word, with the most on “egg,” less on “nut” and the least on “code.” After the true word is revealed, the weights are nudged so that the right word receives a larger probability next time.",
    "The same procedure applies when the signal contains sounds and images as well as words. The content of the signal changes, while guessing a hidden piece and adjusting the weights stays the same."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 9
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-three-forms-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "three-forms",
   "kind": "slides",
   "question": "Why is text easier for an LLM to read than speech or an image?",
   "answer": [
    "Text is already a row of pieces, and each piece can become a vector. **Speech and images do not arrive as rows of pieces**.",
    "An LLM reads a row of vectors. Each piece of text can become one vector directly, while speech and images contain no words and no separate pieces, so they have to be converted into rows of vectors first.",
    "The conversion comes before any learning from speech or images. Once all three forms are rows of vectors, one model can read them together."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 10
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-three-forms-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "three-forms",
   "kind": "slides",
   "question": "Why do speech and images have to be converted before an LLM can use them?",
   "answer": [
    "An LLM can read only a row of vectors. **Speech is air pressure changing in time and an image is a grid of light, so neither is a row of vectors until it is converted**.",
    "An LLM reads a row of vectors. Each piece of text can become one vector directly, while speech and images contain no words and no separate pieces, so they have to be converted into rows of vectors first.",
    "The conversion comes before any learning from speech or images. Once all three forms are rows of vectors, one model can read them together."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 10
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-speech-frames-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "speech-frames",
   "kind": "slides",
   "question": "How is speech turned into a row of vectors?",
   "answer": [
    "The sound is cut into frames of about 20 milliseconds and passed through a speech encoder. **One vector comes out for each slice, in time order**.",
    "The speech encoder is a neural network trained on a large amount of audio. Each slice of sound goes in and one vector comes out, and slices with different sounds give vectors with different numbers.",
    "One second of speech becomes 50 vectors in time order. The speech is then a row, just like a sentence, so the model can read it one vector after another."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 11
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-speech-frames-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "speech-frames",
   "kind": "slides",
   "question": "Why does one second of speech become 50 vectors?",
   "answer": [
    "Each slice gives one vector. **Fifty slices of about 20 milliseconds fill one second, so one second gives 50 vectors**.",
    "The speech encoder is a neural network trained on a large amount of audio. Each slice of sound goes in and one vector comes out, and slices with different sounds give vectors with different numbers.",
    "One second of speech becomes 50 vectors in time order. The speech is then a row, just like a sentence, so the model can read it one vector after another."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 11
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-image-patches-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "image-patches",
   "kind": "slides",
   "question": "How is an image turned into a row of vectors?",
   "answer": [
    "A grid cuts the image into patches, and the patches are laid out in reading order. **A vision encoder then gives one vector for each patch**.",
    "Reading order gives the patches a first piece and a last piece, so the image becomes a sequence like a sentence. The 16 patches of the egg image become 16 vectors in the same order.",
    "Real systems use much smaller patches of 14 to 16 pixels. Smaller patches mean more patches for the same image, so one image gives hundreds of vectors."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 12
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-image-patches-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "image-patches",
   "kind": "slides",
   "question": "Why does one image give hundreds of vectors in real systems?",
   "answer": [
    "Real systems use patches of only 14 to 16 pixels. **Smaller patches mean many more patches for the same image, so there are hundreds of vectors**.",
    "Reading order gives the patches a first piece and a last piece, so the image becomes a sequence like a sentence. The 16 patches of the egg image become 16 vectors in the same order.",
    "Real systems use much smaller patches of 14 to 16 pixels. Smaller patches mean more patches for the same image, so one image gives hundreds of vectors."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 12
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-cross-modal-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "cross-modal",
   "kind": "slides",
   "question": "What is a cross-modal dependency?",
   "answer": [
    "It is a link in which a piece from one sense helps predict a piece from another sense. **A patch containing an egg helping to predict a word is one example**.",
    "A patch containing an egg and the sound of cracking both help predict the hidden word. A link between two different kinds of signal is a cross-modal dependency.",
    "The game is the same as with text alone. The model guesses the hidden piece from the pieces it can read, and the only change is that some clues come from other senses."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 13
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-cross-modal-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "cross-modal",
   "kind": "slides",
   "question": "What stays the same when image patches and speech frames join the words in one row?",
   "answer": [
    "The game stays the same. **The model still guesses the hidden piece from the pieces it can read, and the earlier words still give clues**.",
    "A patch containing an egg and the sound of cracking both help predict the hidden word. A link between two different kinds of signal is a cross-modal dependency.",
    "The game is the same as with text alone. The model guesses the hidden piece from the pieces it can read, and the only change is that some clues come from other senses."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 13
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-three-views-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "three-views",
   "kind": "slides",
   "question": "What do the image, the spectrogram and the words of “three cute puppies” have in common?",
   "answer": [
    "They are three views of one event. **Training puts all three into one row and hides one piece for the model to guess**.",
    "The image is cut into 18 patches. The spoken phrase is a spectrogram in which time runs from left to right, a higher position means a higher frequency and a darker area means more energy, and each thin column is one frame.",
    "Because the three forms describe the same event, a piece hidden in one form can be guessed with help from the other two. The speech in the example was made with a speech synthesizer."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 14
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-three-views-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "three-views",
   "kind": "slides",
   "question": "How is the spectrogram of the spoken phrase read?",
   "answer": [
    "Time runs from left to right and a higher position means a higher frequency. **A darker area means more energy, and each thin column is one frame**.",
    "The image is cut into 18 patches. The spoken phrase is a spectrogram in which time runs from left to right, a higher position means a higher frequency and a darker area means more energy, and each thin column is one frame.",
    "Because the three forms describe the same event, a piece hidden in one form can be guessed with help from the other two. The speech in the example was made with a speech synthesizer."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 14
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-train-word-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "train-word",
   "kind": "slides",
   "question": "How do the model’s bets change when the image and the sound are added to “three cute”?",
   "answer": [
    "With the words alone the bets are spread over several endings. **With the image and the sound, the bet piles up on “puppies”**.",
    "With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” The image contains puppies and the sound contains the spoken word, so with those clues the bet piles up on “puppies.”",
    "The model bet 0.85 on the true word, so the error is small and the weights move only a little. A smaller bet on the true word would be a larger error and would move the weights more."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-train-word-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "train-word",
   "kind": "slides",
   "question": "Why is the nudge to the weights small in the first training example?",
   "answer": [
    "The model is graded on how much it bet on the true word. **It bet 0.85 on “puppies,” so the error is small and the weights move only a little**.",
    "With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” The image contains puppies and the sound contains the spoken word, so with those clues the bet piles up on “puppies.”",
    "The model bet 0.85 on the true word, so the error is small and the weights move only a little. A smaller bet on the true word would be a larger error and would move the weights more."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-train-frame-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "train-frame",
   "kind": "slides",
   "question": "Which clues help the model predict a hidden sound frame?",
   "answer": [
    "The earlier frames, the words and the image all help. **The earlier frames help most because the voice and the formants change smoothly**.",
    "The earlier frames help because the voice and the formants change smoothly. The words say the next sound is the vowel in “pup,” and the image backs up the words as a weaker clue.",
    "A frame is a column of numbers for the energy in each frequency band. The guess is close but not exact, and the difference between the guess and the truth is the error that nudges the weights."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 16
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-train-frame-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "train-frame",
   "kind": "slides",
   "question": "What is the error when the model guesses a sound frame?",
   "answer": [
    "A frame is a column of energy values, one for each frequency band. **The error is how far each guessed value is from the true value**.",
    "The earlier frames help because the voice and the formants change smoothly. The words say the next sound is the vowel in “pup,” and the image backs up the words as a weaker clue.",
    "A frame is a column of numbers for the energy in each frequency band. The guess is close but not exact, and the difference between the guess and the truth is the error that nudges the weights."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 16
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-train-patch-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "train-patch",
   "kind": "slides",
   "question": "Which clues help the model predict a hidden image patch?",
   "answer": [
    "The earlier patches, the words and the sound all help. **The earlier patches give two puppies, and “three” says one more must appear**.",
    "The earlier patches give background above and two puppies to the left. “Three” says a third puppy must appear, “puppies” says to expect dog ears, and the sound carries the same words as a backup.",
    "The guess is a puppy ear in the average colour of the first two puppies, but the true puppy is dark. The colour is the biggest error because no clue gave it. Only systems that also produce images are trained this way."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 17
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-train-patch-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "train-patch",
   "kind": "slides",
   "question": "Why is the colour the biggest error in the third training example?",
   "answer": [
    "The model guessed the average colour of the first two puppies. **No clue in the words, the sound or the earlier patches said the third puppy would be dark**.",
    "The earlier patches give background above and two puppies to the left. “Three” says a third puppy must appear, “puppies” says to expect dog ears, and the sound carries the same words as a backup.",
    "The guess is a puppy ear in the average colour of the first two puppies, but the true puppy is dark. The colour is the biggest error because no clue gave it. Only systems that also produce images are trained this way."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 17
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-clue-table-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "clue-table",
   "kind": "slides",
   "question": "What does a clue from the same sense as the hidden piece mostly say?",
   "answer": [
    "It mostly says how the signal continues. **Clues from the other senses mostly say what the thing is**.",
    "A clue from the same sense says how the signal continues, as grammar does for a hidden word, smooth formants do for a hidden frame, and fur and background do for a hidden patch. Clues from the other senses say what the thing is.",
    "Training on all three senses together helps because each sense fills gaps the others leave. A model with one sense alone would have only the clues about how the signal continues."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 18
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-clue-table-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "clue-table",
   "kind": "slides",
   "question": "Why does training on words, sound and images together help?",
   "answer": [
    "Each sense gives a kind of clue the others do not. **Each sense fills gaps the others leave**.",
    "A clue from the same sense says how the signal continues, as grammar does for a hidden word, smooth formants do for a hidden frame, and fur and background do for a hidden patch. Clues from the other senses say what the thing is.",
    "Training on all three senses together helps because each sense fills gaps the others leave. A model with one sense alone would have only the clues about how the signal continues."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 18
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-talking-back-1",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "talking-back",
   "kind": "slides",
   "question": "How does the model talk back?",
   "answer": [
    "Sound is compressed into discrete codes that work like new words. **The model predicts the next code like the next word, and a decoder turns the codes back into sound**.",
    "The model predicts the next code exactly as it predicts the next word. The decoder then takes the row of codes and produces a sound wave.",
    "Three things are new, which are a shared currency of vectors in one row, data where the senses appear together, and a schedule that protects what was already learned. What stays the same is finding the dependencies in the signal."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 19
    }
   ]
  },
  {
   "id": "modern-qa-lecture19-talking-back-2",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "talking-back",
   "kind": "slides",
   "question": "What is new and what stays the same when a model is trained on words, sounds and images?",
   "answer": [
    "The new things are a shared currency of vectors, data where the senses appear together, and a schedule that protects what was learned. **The learning rule stays the same, which is finding the dependencies in the signal**.",
    "The model predicts the next code exactly as it predicts the next word. The decoder then takes the row of codes and produces a sound wave.",
    "Three things are new, which are a shared currency of vectors in one row, data where the senses appear together, and a schedule that protects what was already learned. What stays the same is finding the dependencies in the signal."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 19
    }
   ]
  },
  {
   "id": "modern-connection-m3-conversion",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "three-forms",
   "kind": "connections",
   "question": "What do the conversion of speech and the conversion of an image have in common?",
   "answer": [
    "Both are cut into small pieces that stay in order, and an encoder gives **one vector for each piece**. Speech is cut in time into frames, and an image is cut in space into patches."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 10
    },
    {
     "collection": "lecture19",
     "page": 11
    },
    {
     "collection": "lecture19",
     "page": 12
    }
   ]
  },
  {
   "id": "modern-connection-m3-cross-modal",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "hidden-word",
   "kind": "connections",
   "question": "What changes when image patches and speech frames are placed in the same row as the words?",
   "answer": [
    "The game stays the same, because the model still guesses the hidden piece. **Some of the clues now come from other senses**, and these links are cross-modal dependencies."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 9
    },
    {
     "collection": "lecture19",
     "page": 13
    },
    {
     "collection": "lecture19",
     "page": 14
    }
   ]
  },
  {
   "id": "modern-connection-m3-training",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "train-word",
   "kind": "connections",
   "question": "In all three training examples, what decides how much the weights change?",
   "answer": [
    "The size of the error decides it. **A guess close to the truth gives a small error and a small nudge**, and a guess far from the truth gives a larger error and a larger nudge."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    },
    {
     "collection": "lecture19",
     "page": 16
    },
    {
     "collection": "lecture19",
     "page": 17
    }
   ]
  },
  {
   "id": "modern-connection-m3-clues",
   "moduleId": "module3",
   "lectureId": "lecture19",
   "concept": "clue-table",
   "kind": "connections",
   "question": "Why does training on words, sound and images together help?",
   "answer": [
    "A clue from the same sense says how the signal continues, and clues from the other senses say what the thing is. **Each sense fills gaps the others leave**."
   ],
   "sources": [
    {
     "collection": "lecture19",
     "page": 18
    },
    {
     "collection": "lecture19",
     "page": 19
    }
   ]
  }
 ],
 "pageConcepts": {
  "lecture19": {
   "2": "levels",
   "3": "heads",
   "4": "dynamic-depth",
   "5": "next-token",
   "6": "phonotactics",
   "7": "letter-guess",
   "8": "software",
   "9": "hidden-word",
   "10": "three-forms",
   "11": "speech-frames",
   "12": "image-patches",
   "13": "cross-modal",
   "14": "three-views",
   "15": "train-word",
   "16": "train-frame",
   "17": "train-patch",
   "18": "clue-table",
   "19": "talking-back"
  }
 },
 "cards": [
  {
   "id": "modern-card-m3-word",
   "concept": "train-word",
   "collection": "lecture19",
   "pages": [
    15
   ],
   "moduleId": "module3",
   "title": "What happens to the bets when the image and the sound are added?",
   "kind": "Source training example",
   "explain": "The row holds an image of three puppies, the spoken phrase and the words “three cute,” and the next word is hidden. With the words alone, the bets are spread over “kittens,” “puppies” and “babies.”",
   "outcome": "With the image and the sound, the bet piles up on “puppies.” **The model bet 0.85 on the true word, so the nudge to the weights is small**.",
   "interpret": "The image and the sound are clues from other senses. The bars are an example of how the bets move, and only the 0.85 is given as a number."
  },
  {
   "id": "modern-card-m3-frame",
   "concept": "train-frame",
   "collection": "lecture19",
   "pages": [
    16
   ],
   "moduleId": "module3",
   "title": "How close is the guess for the next sound frame?",
   "kind": "Source training example",
   "explain": "The sound is predicted frame by frame from left to right. The earlier frames, the words and the image each give a clue about the next frame.",
   "outcome": "The guess is close to the true frame but not exact. **The error is how far each guessed energy value is from the true value**, and that error nudges the weights.",
   "interpret": "The earlier frames are the strongest clue because the voice and the formants change smoothly. The image is the weakest clue here."
  },
  {
   "id": "modern-card-m3-patch",
   "concept": "train-patch",
   "collection": "lecture19",
   "pages": [
    17
   ],
   "moduleId": "module3",
   "title": "What does the model get right and wrong about the hidden patch?",
   "kind": "Source training example",
   "explain": "The patches are predicted in reading order. Two puppies are already drawn, “three” calls for one more puppy, and “puppies” calls for dog ears.",
   "outcome": "The model guesses a blurry puppy ear in the average colour of the first two puppies, and the true puppy is dark. **The biggest error is the colour**.",
   "interpret": "The clues gave the content of the patch but not its colour. Only systems that also produce images are trained this way."
  }
 ],
 "contrasts": [
  {
   "id": "modern-contrast-m3-frame-patch",
   "concept": "speech-frames",
   "collection": "lecture19",
   "pages": [
    11,
    12
   ],
   "moduleId": "module3",
   "title": "A frame is a piece of time, and a patch is a piece of space.",
   "left": {
    "term": "Frame",
    "text": "A **frame** is a slice of speech about 20 milliseconds long. Frames follow one another in time order."
   },
   "right": {
    "term": "Patch",
    "text": "A **patch** is a small square of an image. Patches are placed in reading order to make a row."
   },
   "paragraphs": [
    "Both are small pieces that an encoder changes into one vector each. Speech already has an order, which is time, so its frames only have to be kept in that order.",
    "An image has no order of its own, so reading order is used to give its patches a first piece and a last piece."
   ]
  },
  {
   "id": "modern-contrast-m3-clues",
   "concept": "clue-table",
   "collection": "lecture19",
   "pages": [
    18
   ],
   "moduleId": "module3",
   "title": "A same-sense clue and an other-sense clue answer different questions.",
   "left": {
    "term": "Same sense",
    "text": "A clue from **the same sense** as the hidden piece says how the signal continues, as grammar, smooth formants, and fur and background do."
   },
   "right": {
    "term": "Other senses",
    "text": "Clues from **the other senses** say what the thing is, which here is puppies, three of them."
   },
   "paragraphs": [
    "Every hidden piece gets both kinds of clue when all three senses are in the row.",
    "Each sense fills gaps the others leave, which is why training on all three together helps."
   ]
  },
  {
   "id": "modern-contrast-m3-word-code",
   "concept": "talking-back",
   "collection": "lecture19",
   "pages": [
    9,
    19
   ],
   "moduleId": "module3",
   "title": "Predicting the next code is the same game as predicting the next word.",
   "left": {
    "term": "Next word",
    "text": "For text, the model predicts the **next word** from the words before it."
   },
   "right": {
    "term": "Next code",
    "text": "For speech output, the model predicts the **next code** from the codes before it, and each code stands for a short piece of sound."
   },
   "paragraphs": [
    "Codes work like new words added to the vocabulary, so the model predicts them in the same way.",
    "The difference comes after the prediction. A decoder has to turn the codes back into a sound wave before anything can be heard."
   ]
  }
 ],
 "hard": [
  {
   "id": "modern-hard-m3-nudge",
   "concept": "train-word",
   "collection": "lecture19",
   "pages": [
    15
   ],
   "moduleId": "module3",
   "title": "Why does a good guess change the weights only a little?",
   "paragraphs": [
    "The model is graded on how much it bet on the true word. A large bet on the true word means the guess was already close to right.",
    "The error measures how far the guess was from the truth. When the bet on the truth is large, the error is small.",
    "The weights are nudged according to the error. **A small error moves the weights only a little**, and a larger error moves them more.",
    "In the example, the model bet 0.85 on “puppies,” and “puppies” was the true word. So there was little to correct."
   ],
   "question": "What would happen to the nudge if the model had bet only a little on the true word?",
   "answer": "The nudge would be larger. **A small bet on the truth is a large error**, and a larger error moves the weights more."
  },
  {
   "id": "modern-hard-m3-colour",
   "concept": "train-patch",
   "collection": "lecture19",
   "pages": [
    17
   ],
   "moduleId": "module3",
   "title": "Why is the colour the biggest error for the hidden patch?",
   "paragraphs": [
    "Each clue gives the model part of the answer. The earlier patches give background and two puppies, “three” says one more puppy must appear, and “puppies” says to expect dog ears.",
    "Together these clues say that a puppy ear belongs in the hidden patch. None of them says what colour the third puppy is.",
    "With no clue about colour, the model guesses the average colour of the first two puppies. **The true puppy is dark, so the colour is the biggest error**.",
    "That error nudges the weights."
   ],
   "question": "Which part of the hidden patch did the clues predict well, and which part did they miss?",
   "answer": "The clues predicted the content well, which is a puppy ear. **They missed the colour**, because no clue said the third puppy would be dark."
  }
 ],
 "core": {
  "lecture19": [
   13,
   15,
   18,
   19
  ]
 },
 "connections": [
  {
   "id": "modern-link-m3-vectors",
   "moduleId": "module3",
   "title": "The frames and patches here are the same vectors as in “15 vectors. Vectors of what?”",
   "sources": [
    {
     "collection": "lecture19",
     "page": 5
    },
    {
     "collection": "lecture19",
     "page": 11
    },
    {
     "collection": "lecture19",
     "page": 12
    }
   ],
   "paragraphs": [
    "An LLM is given a sequence of vectors and predicts the next one, and the vectors can stand for words, frames of a spectrogram or patches of an image.",
    "**Slicing speech into frames and cutting an image into patches are how those vectors are made**. A speech encoder gives one vector for each frame, and a vision encoder gives one vector for each patch.",
    "So the machine only ever reads vectors, and the sequence can come from text, sound or an image."
   ],
   "question": "Why can one LLM design work for text, speech and images?",
   "answer": "The model only reads rows of vectors. **Text, speech and images can all be converted into rows of vectors**, so the same next-item prediction applies to each."
  },
  {
   "id": "modern-link-m3-game",
   "moduleId": "module3",
   "title": "Guessing the next letter, the next word, the next frame, the next patch and the next code are one game.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 7
    },
    {
     "collection": "lecture19",
     "page": 9
    },
    {
     "collection": "lecture19",
     "page": 15
    },
    {
     "collection": "lecture19",
     "page": 19
    }
   ],
   "paragraphs": [
    "In the next-letter quiz, a hidden letter is guessed from the letters before it. In “The chef cracks the,” a hidden word is guessed from the words before it.",
    "The training examples hide a word, a sound frame and an image patch in turn, and the model talks back by predicting the next sound code.",
    "**In every case the model guesses a hidden piece from the other pieces and then nudges its weights**. What changes is only what the pieces are."
   ],
   "question": "What stays the same across all of these guessing tasks?",
   "answer": "The learning rule stays the same. **The model finds the dependencies in the signal** by guessing a hidden piece and nudging its weights."
  }
 ],
 "figures": [
  {
   "id": "modern-figure-m3-one-row",
   "concept": "cross-modal",
   "collection": "lecture19",
   "pages": [
    13
   ],
   "moduleId": "module3",
   "title": "Read the row of image patches, speech frames and words.",
   "takeaway": "**Clues reach the hidden word from the earlier words and from the other senses**. The long links from an image patch and a speech frame are the cross-modal dependencies."
  },
  {
   "id": "modern-figure-m3-bets",
   "concept": "train-word",
   "collection": "lecture19",
   "pages": [
    15
   ],
   "moduleId": "module3",
   "title": "Compare the bets from text alone with the bets after the image and sound are added.",
   "takeaway": "**With text alone the bets are spread out, and with the image and the sound the bet piles up on “puppies.”** The model bet 0.85 on the true word, so the nudge is small."
  },
  {
   "id": "modern-figure-m3-table",
   "concept": "clue-table",
   "collection": "lecture19",
   "pages": [
    18
   ],
   "moduleId": "module3",
   "title": "Read the table of clues for a hidden word, frame and patch.",
   "takeaway": "**The outlined clues come from the same sense and say how the signal continues**. The other clues come from the other senses and say what the thing is."
  }
 ],
 "questions": [
  {
   "id": "modern-lecture19-mcq-hidden-word-824ebf6945",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "spreading bets",
   "concept": "hidden-word",
   "prompt": "In “The chef cracks the ?”, what does the model do when it does not know the hidden word?",
   "wordings": {
    "original": "In “The chef cracks the ?”, what does the model do when it does not know the hidden word?",
    "college": "In “The chef cracks the ?”, what does the model do when it does not know the hidden word?",
    "simple": "How does the model respond to the hidden last word in “The chef cracks the ?”"
   },
   "answer": "**It spreads its bets, giving “egg” the largest probability and “nut” and “code” smaller ones**. The model gives a probability to each possible next word, with the most on “egg,” less on “nut” and the least on “code.” After the true word is revealed, the weights are nudged so that the right word receives a larger probability next time.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 9
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "It spreads its bets, giving “egg” the largest probability and “nut” and “code” smaller ones.",
     "feedback": "**It spreads its bets, giving “egg” the largest probability and “nut” and “code” smaller ones**. The model gives a probability to each possible next word, with the most on “egg,” less on “nut” and the least on “code.” After the true word is revealed, the weights are nudged so that the right word receives a larger probability next time."
    },
    {
     "id": "alt-1",
     "text": "It leaves the slot empty until the true word is revealed.",
     "feedback": "The model always makes a guess. It gives each possible word a probability before the truth is revealed."
    },
    {
     "id": "alt-2",
     "text": "It gives “egg,” “nut” and “code” exactly equal probabilities.",
     "feedback": "The bets are unequal. The earlier words make “egg” the most likely, so it gets the largest bet."
    },
    {
     "id": "alt-3",
     "text": "It picks one word and gives every other word a probability of zero.",
     "feedback": "The model spreads its bets over several words. “Nut” and “code” still receive smaller bets."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-824ebf6945befb",
   "image": "assets/slides/lecture19/009.webp"
  },
  {
   "id": "modern-lecture19-mcq-hidden-word-15859c3a3a",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "learning",
   "concept": "hidden-word",
   "prompt": "What does learning change so that the guesses get better?",
   "wordings": {
    "original": "What does learning change so that the guesses get better?",
    "college": "What does learning change so that the guesses get better?",
    "simple": "Which part of the model changes when it learns from a hidden word?"
   },
   "answer": "**The weights are nudged, so the right word gets a bigger bet next time**. The model gives a probability to each possible next word, with the most on “egg,” less on “nut” and the least on “code.” After the true word is revealed, the weights are nudged so that the right word receives a larger probability next time.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 9
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "The weights are nudged, so the right word gets a bigger bet next time.",
     "feedback": "**The weights are nudged, so the right word gets a bigger bet next time**. The model gives a probability to each possible next word, with the most on “egg,” less on “nut” and the least on “code.” After the true word is revealed, the weights are nudged so that the right word receives a larger probability next time."
    },
    {
     "id": "alt-1",
     "text": "The sentence is rewritten so the hidden word is easier.",
     "feedback": "The training sentence stays the same. The weights are what change."
    },
    {
     "id": "alt-2",
     "text": "The hidden word is replaced with the model’s own guess.",
     "feedback": "The true word is revealed and kept. The model changes its weights to bet more on that true word."
    },
    {
     "id": "alt-3",
     "text": "The earlier words are removed one at a time.",
     "feedback": "The earlier words stay because they are the clues. Learning changes the weights."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-15859c3a3a9e3a",
   "image": "assets/slides/lecture19/009.webp"
  },
  {
   "id": "modern-lecture19-mcq-hidden-word-99d628a546",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "interdependencies",
   "concept": "hidden-word",
   "prompt": "What do the links from “The,” “chef,” “cracks” and “the” to the hidden slot stand for?",
   "wordings": {
    "original": "What do the links from “The,” “chef,” “cracks” and “the” to the hidden slot stand for?",
    "college": "What do the links from “The,” “chef,” “cracks” and “the” to the hidden slot stand for?",
    "simple": "Why is every earlier word linked to the hidden word?"
   },
   "answer": "**Each earlier word gives a clue about the hidden word**. The model gives a probability to each possible next word, with the most on “egg,” less on “nut” and the least on “code.” After the true word is revealed, the weights are nudged so that the right word receives a larger probability next time.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 9
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "Each earlier word gives a clue about the hidden word.",
     "feedback": "**Each earlier word gives a clue about the hidden word**. The model gives a probability to each possible next word, with the most on “egg,” less on “nut” and the least on “code.” After the true word is revealed, the weights are nudged so that the right word receives a larger probability next time."
    },
    {
     "id": "alt-1",
     "text": "Each earlier word is copied into the hidden slot.",
     "feedback": "The words are not copied. Each one helps predict which word comes next."
    },
    {
     "id": "alt-2",
     "text": "The hidden word changes the earlier words.",
     "feedback": "The clues run from the earlier words to the hidden word, because the model reads the earlier words first."
    },
    {
     "id": "alt-3",
     "text": "Only the word right before the slot matters.",
     "feedback": "All four earlier words are linked to the slot, so each one gives a clue."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-99d628a546a8e8",
   "image": "assets/slides/lecture19/009.webp"
  },
  {
   "id": "modern-lecture19-mcq-three-forms-23488d507f",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "text",
   "concept": "three-forms",
   "prompt": "Why is text the easy case for an LLM?",
   "wordings": {
    "original": "Why is text the easy case for an LLM?",
    "college": "Why is text the easy case for an LLM?",
    "simple": "Why does text need less conversion than speech or an image?"
   },
   "answer": "**Text already comes as a row of pieces, and each piece can become a vector**. An LLM reads a row of vectors. Each piece of text can become one vector directly, while speech and images contain no words and no separate pieces, so they have to be converted into rows of vectors first.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 10
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "Text already comes as a row of pieces, and each piece can become a vector.",
     "feedback": "**Text already comes as a row of pieces, and each piece can become a vector**. An LLM reads a row of vectors. Each piece of text can become one vector directly, while speech and images contain no words and no separate pieces, so they have to be converted into rows of vectors first."
    },
    {
     "id": "alt-1",
     "text": "Text contains more information than speech or an image.",
     "feedback": "The amount of information is not the reason. Text is easy because it is already a row of pieces."
    },
    {
     "id": "alt-2",
     "text": "Text does not have to become vectors at all.",
     "feedback": "Text still becomes vectors. It is easy because each piece is already separate and in order."
    },
    {
     "id": "alt-3",
     "text": "Text is a grid of light.",
     "feedback": "A grid of light describes an image. Text is a row of pieces."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-23488d507f51dd",
   "image": "assets/slides/lecture19/010.webp"
  },
  {
   "id": "modern-lecture19-mcq-three-forms-663c10e830",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "speech",
   "concept": "three-forms",
   "prompt": "What is speech before it is converted for an LLM?",
   "wordings": {
    "original": "What is speech before it is converted for an LLM?",
    "college": "What is speech before it is converted for an LLM?",
    "simple": "In what form does speech reach the system before conversion?"
   },
   "answer": "**Air pressure changing in time, with no words in it**. An LLM reads a row of vectors. Each piece of text can become one vector directly, while speech and images contain no words and no separate pieces, so they have to be converted into rows of vectors first.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 10
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "Air pressure changing in time, with no words in it.",
     "feedback": "**Air pressure changing in time, with no words in it**. An LLM reads a row of vectors. Each piece of text can become one vector directly, while speech and images contain no words and no separate pieces, so they have to be converted into rows of vectors first."
    },
    {
     "id": "alt-1",
     "text": "A row of separate words with gaps between them.",
     "feedback": "The sound has no marked words. It is air pressure going up and down in time."
    },
    {
     "id": "alt-2",
     "text": "A grid of light.",
     "feedback": "A grid of light describes an image. Speech is air pressure changing in time."
    },
    {
     "id": "alt-3",
     "text": "A row of vectors that the LLM can already read.",
     "feedback": "Speech becomes a row of vectors only after it is sliced and passed through a speech encoder."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-663c10e8301d8f",
   "image": "assets/slides/lecture19/010.webp"
  },
  {
   "id": "modern-lecture19-mcq-speech-frames-e7df05d32f",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "frames",
   "concept": "speech-frames",
   "prompt": "About how long is each slice when speech is cut into frames?",
   "wordings": {
    "original": "About how long is each slice when speech is cut into frames?",
    "college": "About how long is each slice when speech is cut into frames?",
    "simple": "What length of sound does one frame hold?"
   },
   "answer": "**About 20 milliseconds**. The speech encoder is a neural network trained on a large amount of audio. Each slice of sound goes in and one vector comes out, and slices with different sounds give vectors with different numbers.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 11
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "About 20 milliseconds.",
     "feedback": "**About 20 milliseconds**. The speech encoder is a neural network trained on a large amount of audio. Each slice of sound goes in and one vector comes out, and slices with different sounds give vectors with different numbers."
    },
    {
     "id": "alt-1",
     "text": "About one second.",
     "feedback": "One second holds about 50 slices. Each slice is about 20 milliseconds."
    },
    {
     "id": "alt-2",
     "text": "About 50 milliseconds.",
     "feedback": "The number 50 is how many vectors one second gives. Each slice is about 20 milliseconds."
    },
    {
     "id": "alt-3",
     "text": "One whole word.",
     "feedback": "The slices are cut by time, not by words. Each one is about 20 milliseconds."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-e7df05d32f0a9c",
   "image": "assets/slides/lecture19/011.webp"
  },
  {
   "id": "modern-lecture19-mcq-speech-frames-033c30a3b1",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "vectors per second",
   "concept": "speech-frames",
   "prompt": "How many vectors does one second of speech become?",
   "wordings": {
    "original": "How many vectors does one second of speech become?",
    "college": "How many vectors does one second of speech become?",
    "simple": "After the speech encoder, how many vectors stand for one second of speech?"
   },
   "answer": "**50 vectors, in time order**. The speech encoder is a neural network trained on a large amount of audio. Each slice of sound goes in and one vector comes out, and slices with different sounds give vectors with different numbers.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 11
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "50 vectors, in time order.",
     "feedback": "**50 vectors, in time order**. The speech encoder is a neural network trained on a large amount of audio. Each slice of sound goes in and one vector comes out, and slices with different sounds give vectors with different numbers."
    },
    {
     "id": "alt-1",
     "text": "20 vectors.",
     "feedback": "The number 20 is the length of a slice in milliseconds. One second gives 50 vectors."
    },
    {
     "id": "alt-2",
     "text": "16 vectors.",
     "feedback": "The number 16 belongs to the image example, which has 16 patches. One second of speech gives 50 vectors."
    },
    {
     "id": "alt-3",
     "text": "One vector.",
     "feedback": "Each slice gets its own vector, and one second holds about 50 slices."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-033c30a3b169c7",
   "image": "assets/slides/lecture19/011.webp"
  },
  {
   "id": "modern-lecture19-mcq-speech-frames-a44a979475",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "longer slices",
   "concept": "speech-frames",
   "prompt": "If each slice were longer than 20 milliseconds, what would happen to the number of vectors for one second of speech?",
   "wordings": {
    "original": "If each slice were longer than 20 milliseconds, what would happen to the number of vectors for one second of speech?",
    "college": "If each slice were longer than 20 milliseconds, what would happen to the number of vectors for one second of speech?",
    "simple": "Suppose the frames were made longer. How would the number of vectors per second change?"
   },
   "answer": "**It would go down, because fewer slices fit in one second**. The speech encoder is a neural network trained on a large amount of audio. Each slice of sound goes in and one vector comes out, and slices with different sounds give vectors with different numbers.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 11
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "It would go down, because fewer slices fit in one second.",
     "feedback": "**It would go down, because fewer slices fit in one second**. The speech encoder is a neural network trained on a large amount of audio. Each slice of sound goes in and one vector comes out, and slices with different sounds give vectors with different numbers."
    },
    {
     "id": "alt-1",
     "text": "It would go up, because longer slices hold more sound.",
     "feedback": "Each slice still gives one vector. Longer slices mean fewer slices in a second, so fewer vectors."
    },
    {
     "id": "alt-2",
     "text": "It would stay at 50, because the encoder always gives 50.",
     "feedback": "The 50 comes from how many slices of about 20 milliseconds fit in one second. Longer slices change that count."
    },
    {
     "id": "alt-3",
     "text": "It would drop to zero, because the encoder needs 20 milliseconds exactly.",
     "feedback": "Nothing says the encoder stops working. There would be fewer slices, so fewer vectors."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-a44a979475a530",
   "image": "assets/slides/lecture19/011.webp"
  },
  {
   "id": "modern-lecture19-mcq-image-patches-2c452c0f3a",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "patches",
   "concept": "image-patches",
   "prompt": "What is a patch?",
   "wordings": {
    "original": "What is a patch?",
    "college": "What is a patch?",
    "simple": "What does the grid cut the image into?"
   },
   "answer": "**One small square of the image**. Reading order gives the patches a first piece and a last piece, so the image becomes a sequence like a sentence. The 16 patches of the egg image become 16 vectors in the same order.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 12
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "One small square of the image.",
     "feedback": "**One small square of the image**. Reading order gives the patches a first piece and a last piece, so the image becomes a sequence like a sentence. The 16 patches of the egg image become 16 vectors in the same order."
    },
    {
     "id": "alt-1",
     "text": "One slice of sound about 20 milliseconds long.",
     "feedback": "That describes a frame of speech. A patch is a small square of an image."
    },
    {
     "id": "alt-2",
     "text": "One word of a sentence.",
     "feedback": "A word is a piece of text. A patch is a small square of an image."
    },
    {
     "id": "alt-3",
     "text": "The whole image turned into a single vector.",
     "feedback": "The image is cut into many patches, and each patch gets its own vector."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-2c452c0f3afff2",
   "image": "assets/slides/lecture19/012.webp"
  },
  {
   "id": "modern-lecture19-mcq-image-patches-1e18edbccf",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "reading order",
   "concept": "image-patches",
   "prompt": "Why are the patches laid out in reading order?",
   "wordings": {
    "original": "Why are the patches laid out in reading order?",
    "college": "Why are the patches laid out in reading order?",
    "simple": "What does putting the patches in reading order do to the image?"
   },
   "answer": "**It turns the image into a sequence with a fixed order, like a sentence**. Reading order gives the patches a first piece and a last piece, so the image becomes a sequence like a sentence. The 16 patches of the egg image become 16 vectors in the same order.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 12
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "It turns the image into a sequence with a fixed order, like a sentence.",
     "feedback": "**It turns the image into a sequence with a fixed order, like a sentence**. Reading order gives the patches a first piece and a last piece, so the image becomes a sequence like a sentence. The 16 patches of the egg image become 16 vectors in the same order."
    },
    {
     "id": "alt-1",
     "text": "It makes the image smaller.",
     "feedback": "The image keeps all its patches. Reading order arranges them as a row."
    },
    {
     "id": "alt-2",
     "text": "It removes the background patches.",
     "feedback": "No patch is removed. All 16 patches are placed in the row."
    },
    {
     "id": "alt-3",
     "text": "It sorts the patches from darkest to lightest.",
     "feedback": "The order follows position in the image, left to right and then down, not brightness."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-1e18edbccf541d",
   "image": "assets/slides/lecture19/012.webp"
  },
  {
   "id": "modern-lecture19-mcq-image-patches-3de657b2ae",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "real systems",
   "concept": "image-patches",
   "prompt": "Why does one image give hundreds of vectors in real systems?",
   "wordings": {
    "original": "Why does one image give hundreds of vectors in real systems?",
    "college": "Why does one image give hundreds of vectors in real systems?",
    "simple": "The example grid gives 16 vectors. Why do real systems get hundreds from one image?"
   },
   "answer": "**Real systems use small patches of 14 to 16 pixels, so one image is cut into many more patches**. Reading order gives the patches a first piece and a last piece, so the image becomes a sequence like a sentence. The 16 patches of the egg image become 16 vectors in the same order.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 12
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "Real systems use small patches of 14 to 16 pixels, so one image is cut into many more patches.",
     "feedback": "**Real systems use small patches of 14 to 16 pixels, so one image is cut into many more patches**. Reading order gives the patches a first piece and a last piece, so the image becomes a sequence like a sentence. The 16 patches of the egg image become 16 vectors in the same order."
    },
    {
     "id": "alt-1",
     "text": "Real systems give each patch hundreds of vectors.",
     "feedback": "Each patch still gives one vector. There are more vectors because there are more patches."
    },
    {
     "id": "alt-2",
     "text": "Real systems read each image hundreds of times.",
     "feedback": "The image is read once. It is cut into many small patches."
    },
    {
     "id": "alt-3",
     "text": "Real systems use larger patches than the example.",
     "feedback": "Larger patches would give fewer vectors. Real systems use small patches of 14 to 16 pixels."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-3de657b2ae6b47",
   "image": "assets/slides/lecture19/012.webp"
  },
  {
   "id": "modern-lecture19-mcq-cross-modal-0b3e8d2ec2",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "cross-modal dependencies",
   "concept": "cross-modal",
   "prompt": "What is a cross-modal dependency?",
   "wordings": {
    "original": "What is a cross-modal dependency?",
    "college": "What is a cross-modal dependency?",
    "simple": "Which of these is a cross-modal dependency?"
   },
   "answer": "**A link in which a piece from one sense, such as an image patch containing an egg, helps predict a piece from another sense, such as a word**. A patch containing an egg and the sound of cracking both help predict the hidden word. A link between two different kinds of signal is a cross-modal dependency.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 13
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "A link in which a piece from one sense, such as an image patch containing an egg, helps predict a piece from another sense, such as a word.",
     "feedback": "**A link in which a piece from one sense, such as an image patch containing an egg, helps predict a piece from another sense, such as a word**. A patch containing an egg and the sound of cracking both help predict the hidden word. A link between two different kinds of signal is a cross-modal dependency."
    },
    {
     "id": "alt-1",
     "text": "A link between two words in the same sentence.",
     "feedback": "A link between two words stays inside one sense. Cross-modal means the clue comes from a different sense."
    },
    {
     "id": "alt-2",
     "text": "A link between two layers of the model.",
     "feedback": "Layers are parts of the model. A cross-modal dependency is a link between pieces of the signal from different senses."
    },
    {
     "id": "alt-3",
     "text": "A rule that keeps images and words in separate rows.",
     "feedback": "The image patches, speech frames and words are placed in one row, which is what lets one sense help predict another."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-0b3e8d2ec20026",
   "image": "assets/slides/lecture19/013.webp"
  },
  {
   "id": "modern-lecture19-mcq-cross-modal-285a63253f",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "same game",
   "concept": "cross-modal",
   "prompt": "When image patches and speech frames join the words in one row, what stays the same?",
   "wordings": {
    "original": "When image patches and speech frames join the words in one row, what stays the same?",
    "college": "When image patches and speech frames join the words in one row, what stays the same?",
    "simple": "What does not change when the row holds three senses instead of text alone?"
   },
   "answer": "**The game stays the same. The model still guesses the hidden piece from the other pieces**. A patch containing an egg and the sound of cracking both help predict the hidden word. A link between two different kinds of signal is a cross-modal dependency.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 13
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "The game stays the same. The model still guesses the hidden piece from the other pieces.",
     "feedback": "**The game stays the same. The model still guesses the hidden piece from the other pieces**. A patch containing an egg and the sound of cracking both help predict the hidden word. A link between two different kinds of signal is a cross-modal dependency."
    },
    {
     "id": "alt-1",
     "text": "The row holds only words, as before.",
     "feedback": "The row now also holds image patches and speech frames. The guessing game is what stays the same."
    },
    {
     "id": "alt-2",
     "text": "Every clue still comes from a word.",
     "feedback": "Some clues now come from image patches and speech frames."
    },
    {
     "id": "alt-3",
     "text": "The model stops using the earlier words.",
     "feedback": "The earlier words still give clues. The other senses add more clues."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-285a63253fd87f",
   "image": "assets/slides/lecture19/013.webp"
  },
  {
   "id": "modern-lecture19-mcq-three-views-81775d7c38",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "spectrogram",
   "concept": "three-views",
   "prompt": "In the spectrogram of “three cute puppies,” what does a darker area mean?",
   "wordings": {
    "original": "In the spectrogram of “three cute puppies,” what does a darker area mean?",
    "college": "In the spectrogram of “three cute puppies,” what does a darker area mean?",
    "simple": "How is energy displayed in the spectrogram?"
   },
   "answer": "**More energy at that time and frequency**. The image is cut into 18 patches. The spoken phrase is a spectrogram in which time runs from left to right, a higher position means a higher frequency and a darker area means more energy, and each thin column is one frame.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 14
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "More energy at that time and frequency.",
     "feedback": "**More energy at that time and frequency**. The image is cut into 18 patches. The spoken phrase is a spectrogram in which time runs from left to right, a higher position means a higher frequency and a darker area means more energy, and each thin column is one frame."
    },
    {
     "id": "alt-1",
     "text": "A higher frequency.",
     "feedback": "Frequency is given by height. Darkness gives the amount of energy."
    },
    {
     "id": "alt-2",
     "text": "A later time.",
     "feedback": "Time runs from left to right. Darkness gives the amount of energy."
    },
    {
     "id": "alt-3",
     "text": "A silent stretch.",
     "feedback": "A silent stretch has little energy, so it is light, not dark."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-81775d7c383ea3",
   "image": "assets/slides/lecture19/014.webp"
  },
  {
   "id": "modern-lecture19-mcq-three-views-3ec8dcd286",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "patch count",
   "concept": "three-views",
   "prompt": "How many patches is the puppy image cut into?",
   "wordings": {
    "original": "How many patches is the puppy image cut into?",
    "college": "How many patches is the puppy image cut into?",
    "simple": "The puppy image is cut by a grid with 3 rows of 6. How many patches is that?"
   },
   "answer": "**18 patches**. The image is cut into 18 patches. The spoken phrase is a spectrogram in which time runs from left to right, a higher position means a higher frequency and a darker area means more energy, and each thin column is one frame.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 14
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "18 patches.",
     "feedback": "**18 patches**. The image is cut into 18 patches. The spoken phrase is a spectrogram in which time runs from left to right, a higher position means a higher frequency and a darker area means more energy, and each thin column is one frame."
    },
    {
     "id": "alt-1",
     "text": "16 patches.",
     "feedback": "The egg image has 16 patches. The puppy image has 3 rows of 6, which is 18."
    },
    {
     "id": "alt-2",
     "text": "50 patches.",
     "feedback": "The number 50 is the count of speech vectors in one second. The puppy image has 18 patches."
    },
    {
     "id": "alt-3",
     "text": "3 patches, one for each puppy.",
     "feedback": "The grid does not follow the puppies. It cuts the image into 3 rows of 6 squares."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-3ec8dcd286d422",
   "image": "assets/slides/lecture19/014.webp"
  },
  {
   "id": "modern-lecture19-mcq-train-word-eed1535e27",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "text alone",
   "concept": "train-word",
   "prompt": "With only the words “three cute,” how does the model bet on the next word?",
   "wordings": {
    "original": "With only the words “three cute,” how does the model bet on the next word?",
    "college": "With only the words “three cute,” how does the model bet on the next word?",
    "simple": "What do the bets look like when the model has the text alone?"
   },
   "answer": "**The bets are spread out over “kittens,” “puppies” and “babies,” because many endings fit**. With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” The image contains puppies and the sound contains the spoken word, so with those clues the bet piles up on “puppies.”",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "The bets are spread out over “kittens,” “puppies” and “babies,” because many endings fit.",
     "feedback": "**The bets are spread out over “kittens,” “puppies” and “babies,” because many endings fit**. With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” The image contains puppies and the sound contains the spoken word, so with those clues the bet piles up on “puppies.”"
    },
    {
     "id": "alt-1",
     "text": "Almost the whole bet is on “puppies.”",
     "feedback": "That happens only after the image and the sound are added. With text alone the bets are spread out."
    },
    {
     "id": "alt-2",
     "text": "The model cannot bet without the image.",
     "feedback": "The model can bet from the words alone. The bets are just spread over several endings."
    },
    {
     "id": "alt-3",
     "text": "The whole bet is on “kittens.”",
     "feedback": "“Kittens” is only slightly ahead. “Puppies” and “babies” get similar bets."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-eed1535e27cd23",
   "image": "assets/slides/lecture19/015.webp"
  },
  {
   "id": "modern-lecture19-mcq-train-word-3dc0fc8998",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "small nudge",
   "concept": "train-word",
   "prompt": "Why is the nudge to the weights small in the first training example?",
   "wordings": {
    "original": "Why is the nudge to the weights small in the first training example?",
    "college": "Why is the nudge to the weights small in the first training example?",
    "simple": "The true word is “puppies.” Why do the weights move only a little?"
   },
   "answer": "**The model bet 0.85 on the true word, so the error is small**. With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” The image contains puppies and the sound contains the spoken word, so with those clues the bet piles up on “puppies.”",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "The model bet 0.85 on the true word, so the error is small.",
     "feedback": "**The model bet 0.85 on the true word, so the error is small**. With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” The image contains puppies and the sound contains the spoken word, so with those clues the bet piles up on “puppies.”"
    },
    {
     "id": "alt-1",
     "text": "The model bet 0.85 on the wrong word.",
     "feedback": "The 0.85 was on “puppies,” which is the true word. That is why the error is small."
    },
    {
     "id": "alt-2",
     "text": "The weights never change when the hidden piece is a word.",
     "feedback": "The weights do change. They change only a little here because the error is small."
    },
    {
     "id": "alt-3",
     "text": "The image and the sound were ignored.",
     "feedback": "The image and the sound are the reason the bet piled up on “puppies.”"
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-3dc0fc89988cf8",
   "image": "assets/slides/lecture19/015.webp"
  },
  {
   "id": "modern-lecture19-mcq-train-word-524fddc6cc",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "low bet",
   "concept": "train-word",
   "prompt": "If the model had bet only a little on “puppies,” how would the nudge to the weights change?",
   "wordings": {
    "original": "If the model had bet only a little on “puppies,” how would the nudge to the weights change?",
    "college": "If the model had bet only a little on “puppies,” how would the nudge to the weights change?",
    "simple": "Suppose the bet on the true word were small. What would happen to the error and the nudge?"
   },
   "answer": "**The error would be larger, so the nudge to the weights would be larger**. With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” The image contains puppies and the sound contains the spoken word, so with those clues the bet piles up on “puppies.”",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "The error would be larger, so the nudge to the weights would be larger.",
     "feedback": "**The error would be larger, so the nudge to the weights would be larger**. With the words alone, the bets are spread over “kittens,” “puppies” and “babies.” The image contains puppies and the sound contains the spoken word, so with those clues the bet piles up on “puppies.”"
    },
    {
     "id": "alt-1",
     "text": "The nudge would be smaller, because the bet was smaller.",
     "feedback": "A small bet on the truth is a large error. A larger error moves the weights more."
    },
    {
     "id": "alt-2",
     "text": "The nudge would stay the same, because the truth is still “puppies.”",
     "feedback": "The nudge depends on how much the model bet on the truth. A smaller bet gives a larger error."
    },
    {
     "id": "alt-3",
     "text": "There would be no nudge, because the model was wrong.",
     "feedback": "Being wrong is when the weights most need to change. The larger error gives a larger nudge."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-524fddc6ccb7de",
   "image": "assets/slides/lecture19/015.webp"
  },
  {
   "id": "modern-lecture19-mcq-train-frame-3ce3211b6e",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "earlier frames",
   "concept": "train-frame",
   "prompt": "Why do the last few frames say a lot about the next sound frame?",
   "wordings": {
    "original": "Why do the last few frames say a lot about the next sound frame?",
    "college": "Why do the last few frames say a lot about the next sound frame?",
    "simple": "Why are the earlier frames a strong clue for a hidden sound frame?"
   },
   "answer": "**The speaker’s voice and the formants change smoothly from one frame to the next**. The earlier frames help because the voice and the formants change smoothly. The words say the next sound is the vowel in “pup,” and the image backs up the words as a weaker clue.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 16
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "The speaker’s voice and the formants change smoothly from one frame to the next.",
     "feedback": "**The speaker’s voice and the formants change smoothly from one frame to the next**. The earlier frames help because the voice and the formants change smoothly. The words say the next sound is the vowel in “pup,” and the image backs up the words as a weaker clue."
    },
    {
     "id": "alt-1",
     "text": "The earlier frames contain the written words.",
     "feedback": "The written words are a separate clue. The earlier frames help because the sound changes smoothly."
    },
    {
     "id": "alt-2",
     "text": "Every frame of speech is identical.",
     "feedback": "The frames differ. They change smoothly, which is why recent frames predict the next one well."
    },
    {
     "id": "alt-3",
     "text": "The earlier frames come from the image.",
     "feedback": "The earlier frames are sound. The image is a separate and weaker clue here."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-3ce3211b6e0963",
   "image": "assets/slides/lecture19/016.webp"
  },
  {
   "id": "modern-lecture19-mcq-train-frame-584cbe361c",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "frame as numbers",
   "concept": "train-frame",
   "prompt": "What is a sound frame made of when the model predicts it?",
   "wordings": {
    "original": "What is a sound frame made of when the model predicts it?",
    "college": "What is a sound frame made of when the model predicts it?",
    "simple": "What does the model compare when it checks its guess for a frame?"
   },
   "answer": "**A column of numbers giving how much energy is in each frequency band**. The earlier frames help because the voice and the formants change smoothly. The words say the next sound is the vowel in “pup,” and the image backs up the words as a weaker clue.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 16
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "A column of numbers giving how much energy is in each frequency band.",
     "feedback": "**A column of numbers giving how much energy is in each frequency band**. The earlier frames help because the voice and the formants change smoothly. The words say the next sound is the vowel in “pup,” and the image backs up the words as a weaker clue."
    },
    {
     "id": "alt-1",
     "text": "A single word.",
     "feedback": "A frame is a short slice of sound, far shorter than a word. It is a column of energy values."
    },
    {
     "id": "alt-2",
     "text": "A small square of the image.",
     "feedback": "That is a patch. A frame is a column of numbers for the energy in each frequency band."
    },
    {
     "id": "alt-3",
     "text": "One probability for each word in the vocabulary.",
     "feedback": "That describes a guess for a hidden word. A frame is a column of energy values, one per frequency band."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-584cbe361c15dc",
   "image": "assets/slides/lecture19/016.webp"
  },
  {
   "id": "modern-lecture19-mcq-train-patch-1d8fa9dbf5",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "colour error",
   "concept": "train-patch",
   "prompt": "In the third training example, why is the colour the biggest error?",
   "wordings": {
    "original": "In the third training example, why is the colour the biggest error?",
    "college": "In the third training example, why is the colour the biggest error?",
    "simple": "Why does the model get the colour of the third puppy wrong?"
   },
   "answer": "**No clue in the words, the sound or the earlier patches said the third puppy would be dark**. The earlier patches give background above and two puppies to the left. “Three” says a third puppy must appear, “puppies” says to expect dog ears, and the sound carries the same words as a backup.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 17
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "No clue in the words, the sound or the earlier patches said the third puppy would be dark.",
     "feedback": "**No clue in the words, the sound or the earlier patches said the third puppy would be dark**. The earlier patches give background above and two puppies to the left. “Three” says a third puppy must appear, “puppies” says to expect dog ears, and the sound carries the same words as a backup."
    },
    {
     "id": "alt-1",
     "text": "The words said the third puppy is light.",
     "feedback": "The words say “three cute puppies.” They say nothing about colour."
    },
    {
     "id": "alt-2",
     "text": "The model cannot predict colour at all.",
     "feedback": "The model did predict a colour, the average of the first two puppies. It was wrong because no clue gave the true colour."
    },
    {
     "id": "alt-3",
     "text": "The earlier patches were hidden from the model.",
     "feedback": "The earlier patches were available. They gave the colours of the first two puppies, not the third."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-1d8fa9dbf5f7bd",
   "image": "assets/slides/lecture19/017.webp"
  },
  {
   "id": "modern-lecture19-mcq-train-patch-98477c29cb",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "word clue",
   "concept": "train-patch",
   "prompt": "What does the word “three” tell the model about the hidden patch?",
   "wordings": {
    "original": "What does the word “three” tell the model about the hidden patch?",
    "college": "What does the word “three” tell the model about the hidden patch?",
    "simple": "How does “three” help when only two puppies have been drawn?"
   },
   "answer": "**A third puppy must appear, because only two have been drawn so far**. The earlier patches give background above and two puppies to the left. “Three” says a third puppy must appear, “puppies” says to expect dog ears, and the sound carries the same words as a backup.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 17
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "A third puppy must appear, because only two have been drawn so far.",
     "feedback": "**A third puppy must appear, because only two have been drawn so far**. The earlier patches give background above and two puppies to the left. “Three” says a third puppy must appear, “puppies” says to expect dog ears, and the sound carries the same words as a backup."
    },
    {
     "id": "alt-1",
     "text": "The patch should be background.",
     "feedback": "Background comes from the earlier patches above. “Three” says one more puppy is coming."
    },
    {
     "id": "alt-2",
     "text": "The third puppy is dark.",
     "feedback": "No clue gives the colour. “Three” only says that another puppy must appear."
    },
    {
     "id": "alt-3",
     "text": "The image has three patches.",
     "feedback": "The image has 18 patches. “Three” is the number of puppies."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-98477c29cbc5cd",
   "image": "assets/slides/lecture19/017.webp"
  },
  {
   "id": "modern-lecture19-mcq-clue-table-6da0d0a26a",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "same sense",
   "concept": "clue-table",
   "prompt": "What does a clue from the same sense as the hidden piece mostly say?",
   "wordings": {
    "original": "What does a clue from the same sense as the hidden piece mostly say?",
    "college": "What does a clue from the same sense as the hidden piece mostly say?",
    "simple": "Compare a same-sense clue with a clue from another sense. What does the same-sense clue give?"
   },
   "answer": "**How the signal continues, while the other senses say what the thing is**. A clue from the same sense says how the signal continues, as grammar does for a hidden word, smooth formants do for a hidden frame, and fur and background do for a hidden patch. Clues from the other senses say what the thing is.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 18
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "How the signal continues, while the other senses say what the thing is.",
     "feedback": "**How the signal continues, while the other senses say what the thing is**. A clue from the same sense says how the signal continues, as grammar does for a hidden word, smooth formants do for a hidden frame, and fur and background do for a hidden patch. Clues from the other senses say what the thing is."
    },
    {
     "id": "alt-1",
     "text": "What the thing is, while the other senses say how the signal continues.",
     "feedback": "That is reversed. The same sense says how the signal continues, and the other senses say what the thing is."
    },
    {
     "id": "alt-2",
     "text": "Nothing, because only the other senses help.",
     "feedback": "The same sense helps a great deal. Grammar, smooth formants, and fur and background all come from the same sense."
    },
    {
     "id": "alt-3",
     "text": "The colour of the third puppy.",
     "feedback": "No clue gave that colour, which is why it was the biggest error."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-6da0d0a26a8260",
   "image": "assets/slides/lecture19/018.webp"
  },
  {
   "id": "modern-lecture19-mcq-clue-table-82e0f7e75a",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "hidden frame",
   "concept": "clue-table",
   "prompt": "For a hidden sound frame, which clue comes from the same sense?",
   "wordings": {
    "original": "For a hidden sound frame, which clue comes from the same sense?",
    "college": "For a hidden sound frame, which clue comes from the same sense?",
    "simple": "Which clue for a hidden frame comes from the sound itself?"
   },
   "answer": "**The voice and the formants carry on**. A clue from the same sense says how the signal continues, as grammar does for a hidden word, smooth formants do for a hidden frame, and fur and background do for a hidden patch. Clues from the other senses say what the thing is.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 18
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "The voice and the formants carry on.",
     "feedback": "**The voice and the formants carry on**. A clue from the same sense says how the signal continues, as grammar does for a hidden word, smooth formants do for a hidden frame, and fur and background do for a hidden patch. Clues from the other senses say what the thing is."
    },
    {
     "id": "alt-1",
     "text": "“Three cute” calls for a plural noun.",
     "feedback": "That is a clue from the words for a hidden word."
    },
    {
     "id": "alt-2",
     "text": "The image contains puppies.",
     "feedback": "That is a clue from the image, which is a different sense from sound."
    },
    {
     "id": "alt-3",
     "text": "The fur and the background carry on.",
     "feedback": "That is the same-sense clue for a hidden image patch."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-82e0f7e75a6d68",
   "image": "assets/slides/lecture19/018.webp"
  },
  {
   "id": "modern-lecture19-mcq-talking-back-e55afea560",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "mcq",
   "topic": "talking back",
   "concept": "talking-back",
   "prompt": "How does the model produce speech?",
   "wordings": {
    "original": "How does the model produce speech?",
    "college": "How does the model produce speech?",
    "simple": "Which sequence describes how the model talks back?"
   },
   "answer": "**Sound is compressed into codes, the model predicts the next code like the next word, and a decoder turns the codes back into sound**. The model predicts the next code exactly as it predicts the next word. The decoder then takes the row of codes and produces a sound wave.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 19
    }
   ],
   "options": [
    {
     "id": "correct",
     "text": "Sound is compressed into codes, the model predicts the next code like the next word, and a decoder turns the codes back into sound.",
     "feedback": "**Sound is compressed into codes, the model predicts the next code like the next word, and a decoder turns the codes back into sound**. The model predicts the next code exactly as it predicts the next word. The decoder then takes the row of codes and produces a sound wave."
    },
    {
     "id": "alt-1",
     "text": "The model predicts air pressure directly, with no codes.",
     "feedback": "Sound is first compressed into discrete codes, and the model predicts those codes."
    },
    {
     "id": "alt-2",
     "text": "A decoder turns the image patches into sound.",
     "feedback": "The decoder turns sound codes back into a sound wave. It does not use image patches."
    },
    {
     "id": "alt-3",
     "text": "The model replays the speech it heard during training.",
     "feedback": "The model predicts new codes one at a time, in the same way it predicts the next word."
    }
   ],
   "correctOption": "correct",
   "origin": "new slide-linked question",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "mcq-lecture19-e55afea560ebe9",
   "image": "assets/slides/lecture19/019.webp"
  },
  {
   "id": "modern-lecture19-written-a841d9a999f2a9",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "learning from a hidden word",
   "concept": "hidden-word",
   "prompt": "Explain how an LLM learns from the sentence “The chef cracks the ?”.",
   "wordings": {
    "original": "Explain how an LLM learns from the sentence “The chef cracks the ?”.",
    "college": "Explain how an LLM learns from the sentence “The chef cracks the ?”.",
    "simple": "Describe what happens, step by step, when an LLM trains on “The chef cracks the ?”."
   },
   "answer": "The LLM learns by guessing the hidden last word and then changing its weights. Each earlier word gives a clue about the hidden word, so the model bets most on “egg” and less on “nut” and “code.” When the true word is revealed, the weights are nudged so the right word gets a bigger bet next time.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 9
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-a841d9a999f2a9"
  },
  {
   "id": "modern-lecture19-written-b7e40ae24e9e8d",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "bets",
   "concept": "hidden-word",
   "prompt": "Why does the model bet on “egg,” “nut” and “code” instead of giving one answer?",
   "wordings": {
    "original": "Why does the model bet on “egg,” “nut” and “code” instead of giving one answer?",
    "college": "Why does the model bet on “egg,” “nut” and “code” instead of giving one answer?",
    "simple": "The model gives three words different bets. Explain why."
   },
   "answer": "The model spreads its bets because it does not know the hidden word. All three words could follow “The chef cracks the.” The earlier words make “egg” the most likely, so “egg” gets the largest bet, “nut” gets a smaller one and “code” gets the smallest.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 9
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-b7e40ae24e9e8d"
  },
  {
   "id": "modern-lecture19-written-f5aa3987bd87c1",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "three forms",
   "concept": "three-forms",
   "prompt": "Compare the forms in which text, speech and an image arrive before conversion.",
   "wordings": {
    "original": "Compare the forms in which text, speech and an image arrive before conversion.",
    "college": "Compare the forms in which text, speech and an image arrive before conversion.",
    "simple": "How do text, speech and an image differ before they are turned into vectors?"
   },
   "answer": "Text is already a row of pieces, such as “Now,” “crack,” “the” and “egg.” Speech is air pressure changing in time, and an image is a grid of light. Speech and images contain no words, so they are not yet in a form the LLM can read.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 10
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-f5aa3987bd87c1"
  },
  {
   "id": "modern-lecture19-written-90ab6261c1dd14",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "conversion",
   "concept": "three-forms",
   "prompt": "Why do speech and images have to be converted before an LLM can use them?",
   "wordings": {
    "original": "Why do speech and images have to be converted before an LLM can use them?",
    "college": "Why do speech and images have to be converted before an LLM can use them?",
    "simple": "Explain why the first job with speech and images is a conversion."
   },
   "answer": "Speech and images have to be converted because a row of vectors is all the LLM can read. Speech is air pressure changing in time, and an image is a grid of light, so neither one is a row of vectors. Once they are converted, the model can read them in one row together with text.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 10
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-90ab6261c1dd14"
  },
  {
   "id": "modern-lecture19-written-49ee520d8ea56a",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "speech to vectors",
   "concept": "speech-frames",
   "prompt": "Describe how speech is turned into a row of vectors.",
   "wordings": {
    "original": "Describe how speech is turned into a row of vectors.",
    "college": "Describe how speech is turned into a row of vectors.",
    "simple": "Explain the steps that turn a stretch of speech into vectors an LLM can read."
   },
   "answer": "Speech is turned into vectors by slicing it in time. First the sound is cut into short slices called frames, each about 20 milliseconds long. Then the slices go through a speech encoder, which is a network trained on a large amount of audio. One vector comes out for each slice, and the vectors stay in time order.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 11
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-49ee520d8ea56a"
  },
  {
   "id": "modern-lecture19-written-d863a9077afc3e",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "fifty vectors",
   "concept": "speech-frames",
   "prompt": "Why does one second of speech become 50 vectors?",
   "wordings": {
    "original": "Why does one second of speech become 50 vectors?",
    "college": "Why does one second of speech become 50 vectors?",
    "simple": "Explain where the 50 vectors for one second of speech come from."
   },
   "answer": "One second of speech becomes 50 vectors because each slice gets one vector. Each slice is about 20 milliseconds long, and 50 slices of that length fill one second. The speech encoder gives one vector per slice, so one second gives 50 vectors.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 11
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-d863a9077afc3e"
  },
  {
   "id": "modern-lecture19-written-381aeab55c3fab",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "image to vectors",
   "concept": "image-patches",
   "prompt": "Describe how an image is turned into a row of vectors.",
   "wordings": {
    "original": "Describe how an image is turned into a row of vectors.",
    "college": "Describe how an image is turned into a row of vectors.",
    "simple": "Explain the steps that turn the image of an egg in a pan into vectors."
   },
   "answer": "An image is turned into vectors by cutting it into patches. First a grid cuts the image into small squares called patches, 16 of them in the egg example. Then the patches are laid out in a row in reading order, so the image becomes a sequence. A vision encoder then gives one vector for each patch.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 12
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-381aeab55c3fab"
  },
  {
   "id": "modern-lecture19-written-a009aa035d8366",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "speech and image conversion",
   "concept": "image-patches",
   "prompt": "Give one similarity and one difference between converting speech and converting an image.",
   "wordings": {
    "original": "Give one similarity and one difference between converting speech and converting an image.",
    "college": "Give one similarity and one difference between converting speech and converting an image.",
    "simple": "How is turning speech into vectors like turning an image into vectors, and how is it different?"
   },
   "answer": "The similarity is that both are cut into small pieces, and an encoder gives one vector for each piece, in order. The difference is what is cut. Speech is cut in time into frames of about 20 milliseconds. An image is cut in space into square patches, which are then placed in reading order.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 12
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-a009aa035d8366"
  },
  {
   "id": "modern-lecture19-written-0278704830c147",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "cross-modal dependency",
   "concept": "cross-modal",
   "prompt": "What is a cross-modal dependency? Give an example from “Now crack the ?”.",
   "wordings": {
    "original": "What is a cross-modal dependency? Give an example from “Now crack the ?”.",
    "college": "What is a cross-modal dependency? Give an example from “Now crack the ?”.",
    "simple": "Explain cross-modal dependencies using the row with image patches, speech frames and words."
   },
   "answer": "A cross-modal dependency is a link in which a piece from one sense helps predict a piece from another sense. In “Now crack the ?”, an image patch containing an egg helps predict the hidden word. The sound of cracking helps too. These clues come from the image and the sound, not from the earlier words.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 13
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-0278704830c147"
  },
  {
   "id": "modern-lecture19-written-6c16eccf06bc69",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "same and different",
   "concept": "cross-modal",
   "prompt": "When the row holds three senses, what is the same as with text alone, and what is different?",
   "wordings": {
    "original": "When the row holds three senses, what is the same as with text alone, and what is different?",
    "college": "When the row holds three senses, what is the same as with text alone, and what is different?",
    "simple": "Compare guessing a hidden word in a text-only row with guessing it in a row that also holds image patches and speech frames."
   },
   "answer": "The game is the same. The model still guesses the hidden piece from the pieces it can read, and the earlier words still give clues. The difference is where the clues come from. With three senses in the row, some clues come from image patches and speech frames.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 13
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-6c16eccf06bc69"
  },
  {
   "id": "modern-lecture19-written-6981a64b4a9720",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "reading a spectrogram",
   "concept": "three-views",
   "prompt": "Explain how to read the spectrogram of “three cute puppies.”",
   "wordings": {
    "original": "Explain how to read the spectrogram of “three cute puppies.”",
    "college": "Explain how to read the spectrogram of “three cute puppies.”",
    "simple": "What do left to right, height and darkness mean in the spectrogram?"
   },
   "answer": "In the spectrogram, time runs from left to right, so “three” comes first and “puppies” comes last. A higher position means a higher frequency. A darker area means more energy. Each thin column is one frame.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 14
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-6981a64b4a9720"
  },
  {
   "id": "modern-lecture19-written-dcf07b00f896e6",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "three views",
   "concept": "three-views",
   "prompt": "What does “three views of one event” mean for “three cute puppies”?",
   "wordings": {
    "original": "What does “three views of one event” mean for “three cute puppies”?",
    "college": "What does “three views of one event” mean for “three cute puppies”?",
    "simple": "Explain why the image, the spectrogram and the words are called three views of one event."
   },
   "answer": "The image, the spoken phrase and the written words all describe the same thing, which is three cute puppies. The image gives it as patches, the speech gives it as frames, and the text gives it as words. In training, all three go into one row, and the model guesses a hidden piece of that row.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 14
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-dcf07b00f896e6"
  },
  {
   "id": "modern-lecture19-written-fc2123a0004508",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "adding the other senses",
   "concept": "train-word",
   "prompt": "Compare the model’s bets with text alone and with the image and sound added.",
   "wordings": {
    "original": "Compare the model’s bets with text alone and with the image and sound added.",
    "college": "Compare the model’s bets with text alone and with the image and sound added.",
    "simple": "How do the bets on the next word change when the image and the sound are added to “three cute”?"
   },
   "answer": "With text alone, the bets are spread out over “kittens,” “puppies” and “babies,” because many endings fit “three cute.” With the image and the sound, the bet piles up on “puppies.” This is because the image contains puppies and the sound contains the spoken word “puppies.”",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-fc2123a0004508"
  },
  {
   "id": "modern-lecture19-written-a44488ff524be6",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "small nudge",
   "concept": "train-word",
   "prompt": "The model bet 0.85 on “puppies.” Why is the nudge to the weights small?",
   "wordings": {
    "original": "The model bet 0.85 on “puppies.” Why is the nudge to the weights small?",
    "college": "The model bet 0.85 on “puppies.” Why is the nudge to the weights small?",
    "simple": "Explain why the weights move only a little after the first training example."
   },
   "answer": "The nudge is small because the error is small. The model is graded on how much it bet on the true word. It bet 0.85 on “puppies,” which is a lot, so there is little to correct and the weights move only a little.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-a44488ff524be6"
  },
  {
   "id": "modern-lecture19-written-d3c27ecb648cb4",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "low bet",
   "concept": "train-word",
   "prompt": "What would happen to the nudge if the model had bet only a little on “puppies”?",
   "wordings": {
    "original": "What would happen to the nudge if the model had bet only a little on “puppies”?",
    "college": "What would happen to the nudge if the model had bet only a little on “puppies”?",
    "simple": "Predict how the error and the nudge would change if the bet on the true word were small."
   },
   "answer": "The nudge would be larger. A small bet on the true word means a large error. A larger error moves the weights more, so that next time the true word gets a bigger bet.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-d3c27ecb648cb4"
  },
  {
   "id": "modern-lecture19-written-ab54c818fc789a",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "clues for a frame",
   "concept": "train-frame",
   "prompt": "Name the three clues the model uses to predict a hidden sound frame, and say what each one gives.",
   "wordings": {
    "original": "Name the three clues the model uses to predict a hidden sound frame, and say what each one gives.",
    "college": "Name the three clues the model uses to predict a hidden sound frame, and say what each one gives.",
    "simple": "Explain how the earlier frames, the words and the image each help predict the next sound frame."
   },
   "answer": "The earlier frames help because the voice and the formants change smoothly, so the last few frames say a lot about the next one. The words say which sound should come next, which here is the vowel in “pup.” The image contains puppies, so it backs up the words, but it is a weaker clue here.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 16
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-ab54c818fc789a"
  },
  {
   "id": "modern-lecture19-written-600bcb2ac4ff3e",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "frame error",
   "concept": "train-frame",
   "prompt": "What is the error when the model guesses a sound frame?",
   "wordings": {
    "original": "What is the error when the model guesses a sound frame?",
    "college": "What is the error when the model guesses a sound frame?",
    "simple": "Explain how the model’s guess for a frame is compared with the truth."
   },
   "answer": "A frame is a column of numbers, and each number is how much energy there is in one frequency band. The model’s guess is another column of numbers. The error is how far apart each number in the guess is from the matching number in the true frame. That error nudges the weights.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 16
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-600bcb2ac4ff3e"
  },
  {
   "id": "modern-lecture19-written-8a99ab919d2117",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "clues for a patch",
   "concept": "train-patch",
   "prompt": "Explain what each clue gives the model when it predicts the hidden image patch.",
   "wordings": {
    "original": "Explain what each clue gives the model when it predicts the hidden image patch.",
    "college": "Explain what each clue gives the model when it predicts the hidden image patch.",
    "simple": "How do the earlier patches, the words and the sound help predict the hidden patch?"
   },
   "answer": "The earlier patches give background above and two puppies to the left, so the model has seen what a puppy in this image looks like. The word “three” says a third puppy must appear, and “puppies” says to expect dog ears. The sound carries the same words, so it backs up the text.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 17
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-8a99ab919d2117"
  },
  {
   "id": "modern-lecture19-written-f09c1e7f05f7da",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "colour error",
   "concept": "train-patch",
   "prompt": "Why is the colour the biggest error when the model guesses the hidden patch?",
   "wordings": {
    "original": "Why is the colour the biggest error when the model guesses the hidden patch?",
    "college": "Why is the colour the biggest error when the model guesses the hidden patch?",
    "simple": "The model guesses a light brown ear, but the true patch is dark. Explain why."
   },
   "answer": "The colour is the biggest error because no clue gave the colour of the third puppy. The model guessed a puppy ear in the average colour of the first two puppies. The true puppy is dark, and nothing in the words, the sound or the earlier patches said so.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 17
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-f09c1e7f05f7da"
  },
  {
   "id": "modern-lecture19-written-eba34a3d35eae0",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "which systems",
   "concept": "train-patch",
   "prompt": "Which systems are trained to predict image patches, and which usually are not?",
   "wordings": {
    "original": "Which systems are trained to predict image patches, and which usually are not?",
    "college": "Which systems are trained to predict image patches, and which usually are not?",
    "simple": "Is every system trained to predict a hidden image patch? Explain."
   },
   "answer": "Only systems that also produce images are trained to predict image patches. Systems that only read images usually skip this step. Predicting a patch is like teaching the model to draw what it was told, so it matters only when the system has to draw.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 17
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-eba34a3d35eae0"
  },
  {
   "id": "modern-lecture19-written-e83cbc0427df86",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "two kinds of clue",
   "concept": "clue-table",
   "prompt": "What is the difference between a clue from the same sense and a clue from another sense?",
   "wordings": {
    "original": "What is the difference between a clue from the same sense and a clue from another sense?",
    "college": "What is the difference between a clue from the same sense and a clue from another sense?",
    "simple": "Compare what same-sense clues and other-sense clues tell the model about a hidden piece."
   },
   "answer": "A clue from the same sense mostly says how the signal continues. Grammar does this for a hidden word, smooth formants do it for a hidden frame, and fur and background do it for a hidden patch. Clues from the other senses mostly say what the thing is, which here is puppies, three of them.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 18
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-e83cbc0427df86"
  },
  {
   "id": "modern-lecture19-written-c232c4340a6aa3",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "all three senses",
   "concept": "clue-table",
   "prompt": "Why does training on words, sound and images together help?",
   "wordings": {
    "original": "Why does training on words, sound and images together help?",
    "college": "Why does training on words, sound and images together help?",
    "simple": "Explain why the model learns better from all three senses in one row."
   },
   "answer": "Training on all three senses together helps because each sense fills gaps the others leave. A clue from the same sense says how the signal continues. Clues from the other senses say what the thing is. With all three, the model has both kinds of clue for every hidden piece.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 18
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-c232c4340a6aa3"
  },
  {
   "id": "modern-lecture19-written-ef667bffd61e6c",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "talking back",
   "concept": "talking-back",
   "prompt": "Explain how the model talks back.",
   "wordings": {
    "original": "Explain how the model talks back.",
    "college": "Explain how the model talks back.",
    "simple": "Describe the steps that let the model produce speech."
   },
   "answer": "The model talks back by predicting sound codes. First, sound is compressed into discrete codes, and each code works like a new word in the vocabulary. Then the model predicts the next code exactly as it predicts the next word. Last, a decoder turns the codes back into a sound wave.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 19
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-ef667bffd61e6c"
  },
  {
   "id": "modern-lecture19-written-f7665126311595",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "what is new",
   "concept": "talking-back",
   "prompt": "What three things are new when an LLM is trained on words, sounds and images?",
   "wordings": {
    "original": "What three things are new when an LLM is trained on words, sounds and images?",
    "college": "What three things are new when an LLM is trained on words, sounds and images?",
    "simple": "List the three new requirements for training on three senses."
   },
   "answer": "The first new thing is a shared currency, in which everything becomes vectors in one row. The second is data where the senses appear together. The third is a schedule that protects what was already learned.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 19
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-f7665126311595"
  },
  {
   "id": "modern-lecture19-written-9dcd4ddf2c3f38",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "type": "written",
   "topic": "what stays the same",
   "concept": "talking-back",
   "prompt": "What stays the same when the signal holds words, sounds and images?",
   "wordings": {
    "original": "What stays the same when the signal holds words, sounds and images?",
    "college": "What stays the same when the signal holds words, sounds and images?",
    "simple": "When sounds and images are added to the signal, what does not change?"
   },
   "answer": "The learning rule stays the same. The model still finds the dependencies in the signal by guessing a hidden piece and nudging its weights. The signal has become wider, because it now holds words, sounds and images.",
   "rubric": [],
   "sources": [
    {
     "collection": "lecture19",
     "page": 19
    }
   ],
   "origin": "new slide-linked explanation",
   "priority": 1.0,
   "edition": "ling285-modern-1",
   "bankKey": "written-lecture19-9dcd4ddf2c3f38"
  }
 ],
 "writing": [
  {
   "id": "modern-writing-66bbf02ee1678d19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "hidden-word",
   "prompt": "Explain how an LLM learns from the sentence “The chef cracks the ?”.",
   "answer": "The LLM learns by guessing the hidden last word and then changing its weights. Each earlier word gives a clue about the hidden word, so the model bets most on “egg” and less on “nut” and “code.” When the true word is revealed, the weights are nudged so the right word gets a bigger bet next time.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 9
    }
   ],
   "type": "written",
   "topic": "learning from a hidden word",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Explain how an LLM learns from the sentence “The chef cracks the ?”.",
    "college": "Explain how an LLM learns from the sentence “The chef cracks the ?”.",
    "simple": "Describe what happens, step by step, when an LLM trains on “The chef cracks the ?”."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-f59e78e897c46819",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "hidden-word",
   "prompt": "Why does the model bet on “egg,” “nut” and “code” instead of giving one answer?",
   "answer": "The model spreads its bets because it does not know the hidden word. All three words could follow “The chef cracks the.” The earlier words make “egg” the most likely, so “egg” gets the largest bet, “nut” gets a smaller one and “code” gets the smallest.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 9
    }
   ],
   "type": "written",
   "topic": "bets",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Why does the model bet on “egg,” “nut” and “code” instead of giving one answer?",
    "college": "Why does the model bet on “egg,” “nut” and “code” instead of giving one answer?",
    "simple": "The model gives three words different bets. Explain why."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-51bf2f8394226f19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "three-forms",
   "prompt": "Compare the forms in which text, speech and an image arrive before conversion.",
   "answer": "Text is already a row of pieces, such as “Now,” “crack,” “the” and “egg.” Speech is air pressure changing in time, and an image is a grid of light. Speech and images contain no words, so they are not yet in a form the LLM can read.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 10
    }
   ],
   "type": "written",
   "topic": "three forms",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Compare the forms in which text, speech and an image arrive before conversion.",
    "college": "Compare the forms in which text, speech and an image arrive before conversion.",
    "simple": "How do text, speech and an image differ before they are turned into vectors?"
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-7a974d45f3dd6f19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "three-forms",
   "prompt": "Why do speech and images have to be converted before an LLM can use them?",
   "answer": "Speech and images have to be converted because a row of vectors is all the LLM can read. Speech is air pressure changing in time, and an image is a grid of light, so neither one is a row of vectors. Once they are converted, the model can read them in one row together with text.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 10
    }
   ],
   "type": "written",
   "topic": "conversion",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Why do speech and images have to be converted before an LLM can use them?",
    "college": "Why do speech and images have to be converted before an LLM can use them?",
    "simple": "Explain why the first job with speech and images is a conversion."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-7d986f48e8253419",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "speech-frames",
   "prompt": "Describe how speech is turned into a row of vectors.",
   "answer": "Speech is turned into vectors by slicing it in time. First the sound is cut into short slices called frames, each about 20 milliseconds long. Then the slices go through a speech encoder, which is a network trained on a large amount of audio. One vector comes out for each slice, and the vectors stay in time order.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 11
    }
   ],
   "type": "written",
   "topic": "speech to vectors",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Describe how speech is turned into a row of vectors.",
    "college": "Describe how speech is turned into a row of vectors.",
    "simple": "Explain the steps that turn a stretch of speech into vectors an LLM can read."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-fa96bf6d3e850c19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "speech-frames",
   "prompt": "Why does one second of speech become 50 vectors?",
   "answer": "One second of speech becomes 50 vectors because each slice gets one vector. Each slice is about 20 milliseconds long, and 50 slices of that length fill one second. The speech encoder gives one vector per slice, so one second gives 50 vectors.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 11
    }
   ],
   "type": "written",
   "topic": "fifty vectors",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Why does one second of speech become 50 vectors?",
    "college": "Why does one second of speech become 50 vectors?",
    "simple": "Explain where the 50 vectors for one second of speech come from."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-2459accaaa873819",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "image-patches",
   "prompt": "Describe how an image is turned into a row of vectors.",
   "answer": "An image is turned into vectors by cutting it into patches. First a grid cuts the image into small squares called patches, 16 of them in the egg example. Then the patches are laid out in a row in reading order, so the image becomes a sequence. A vision encoder then gives one vector for each patch.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 12
    }
   ],
   "type": "written",
   "topic": "image to vectors",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Describe how an image is turned into a row of vectors.",
    "college": "Describe how an image is turned into a row of vectors.",
    "simple": "Explain the steps that turn the image of an egg in a pan into vectors."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-6861027e5a6a6e19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "image-patches",
   "prompt": "Give one similarity and one difference between converting speech and converting an image.",
   "answer": "The similarity is that both are cut into small pieces, and an encoder gives one vector for each piece, in order. The difference is what is cut. Speech is cut in time into frames of about 20 milliseconds. An image is cut in space into square patches, which are then placed in reading order.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 12
    }
   ],
   "type": "written",
   "topic": "speech and image conversion",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Give one similarity and one difference between converting speech and converting an image.",
    "college": "Give one similarity and one difference between converting speech and converting an image.",
    "simple": "How is turning speech into vectors like turning an image into vectors, and how is it different?"
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-13abac5e550ed419",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "cross-modal",
   "prompt": "What is a cross-modal dependency? Give an example from “Now crack the ?”.",
   "answer": "A cross-modal dependency is a link in which a piece from one sense helps predict a piece from another sense. In “Now crack the ?”, an image patch containing an egg helps predict the hidden word. The sound of cracking helps too. These clues come from the image and the sound, not from the earlier words.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 13
    }
   ],
   "type": "written",
   "topic": "cross-modal dependency",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "What is a cross-modal dependency? Give an example from “Now crack the ?”.",
    "college": "What is a cross-modal dependency? Give an example from “Now crack the ?”.",
    "simple": "Explain cross-modal dependencies using the row with image patches, speech frames and words."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-b799f597c4ad9b19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "cross-modal",
   "prompt": "When the row holds three senses, what is the same as with text alone, and what is different?",
   "answer": "The game is the same. The model still guesses the hidden piece from the pieces it can read, and the earlier words still give clues. The difference is where the clues come from. With three senses in the row, some clues come from image patches and speech frames.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 13
    }
   ],
   "type": "written",
   "topic": "same and different",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "When the row holds three senses, what is the same as with text alone, and what is different?",
    "college": "When the row holds three senses, what is the same as with text alone, and what is different?",
    "simple": "Compare guessing a hidden word in a text-only row with guessing it in a row that also holds image patches and speech frames."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-096b9a4b54df0e19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "three-views",
   "prompt": "Explain how to read the spectrogram of “three cute puppies.”",
   "answer": "In the spectrogram, time runs from left to right, so “three” comes first and “puppies” comes last. A higher position means a higher frequency. A darker area means more energy. Each thin column is one frame.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 14
    }
   ],
   "type": "written",
   "topic": "reading a spectrogram",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Explain how to read the spectrogram of “three cute puppies.”",
    "college": "Explain how to read the spectrogram of “three cute puppies.”",
    "simple": "What do left to right, height and darkness mean in the spectrogram?"
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-cee98704a908de19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "three-views",
   "prompt": "What does “three views of one event” mean for “three cute puppies”?",
   "answer": "The image, the spoken phrase and the written words all describe the same thing, which is three cute puppies. The image gives it as patches, the speech gives it as frames, and the text gives it as words. In training, all three go into one row, and the model guesses a hidden piece of that row.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 14
    }
   ],
   "type": "written",
   "topic": "three views",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "What does “three views of one event” mean for “three cute puppies”?",
    "college": "What does “three views of one event” mean for “three cute puppies”?",
    "simple": "Explain why the image, the spectrogram and the words are called three views of one event."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-b3f2d6082a45e419",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "train-word",
   "prompt": "Compare the model’s bets with text alone and with the image and sound added.",
   "answer": "With text alone, the bets are spread out over “kittens,” “puppies” and “babies,” because many endings fit “three cute.” With the image and the sound, the bet piles up on “puppies.” This is because the image contains puppies and the sound contains the spoken word “puppies.”",
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ],
   "type": "written",
   "topic": "adding the other senses",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Compare the model’s bets with text alone and with the image and sound added.",
    "college": "Compare the model’s bets with text alone and with the image and sound added.",
    "simple": "How do the bets on the next word change when the image and the sound are added to “three cute”?"
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-0db6643a80b3b119",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "train-word",
   "prompt": "The model bet 0.85 on “puppies.” Why is the nudge to the weights small?",
   "answer": "The nudge is small because the error is small. The model is graded on how much it bet on the true word. It bet 0.85 on “puppies,” which is a lot, so there is little to correct and the weights move only a little.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ],
   "type": "written",
   "topic": "small nudge",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "The model bet 0.85 on “puppies.” Why is the nudge to the weights small?",
    "college": "The model bet 0.85 on “puppies.” Why is the nudge to the weights small?",
    "simple": "Explain why the weights move only a little after the first training example."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-6e6d5d41960b4719",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "train-word",
   "prompt": "What would happen to the nudge if the model had bet only a little on “puppies”?",
   "answer": "The nudge would be larger. A small bet on the true word means a large error. A larger error moves the weights more, so that next time the true word gets a bigger bet.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 15
    }
   ],
   "type": "written",
   "topic": "low bet",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "What would happen to the nudge if the model had bet only a little on “puppies”?",
    "college": "What would happen to the nudge if the model had bet only a little on “puppies”?",
    "simple": "Predict how the error and the nudge would change if the bet on the true word were small."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-02d982de5e9c5619",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "train-frame",
   "prompt": "Name the three clues the model uses to predict a hidden sound frame, and say what each one gives.",
   "answer": "The earlier frames help because the voice and the formants change smoothly, so the last few frames say a lot about the next one. The words say which sound should come next, which here is the vowel in “pup.” The image contains puppies, so it backs up the words, but it is a weaker clue here.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 16
    }
   ],
   "type": "written",
   "topic": "clues for a frame",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Name the three clues the model uses to predict a hidden sound frame, and say what each one gives.",
    "college": "Name the three clues the model uses to predict a hidden sound frame, and say what each one gives.",
    "simple": "Explain how the earlier frames, the words and the image each help predict the next sound frame."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-371b271192497219",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "train-frame",
   "prompt": "What is the error when the model guesses a sound frame?",
   "answer": "A frame is a column of numbers, and each number is how much energy there is in one frequency band. The model’s guess is another column of numbers. The error is how far apart each number in the guess is from the matching number in the true frame. That error nudges the weights.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 16
    }
   ],
   "type": "written",
   "topic": "frame error",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "What is the error when the model guesses a sound frame?",
    "college": "What is the error when the model guesses a sound frame?",
    "simple": "Explain how the model’s guess for a frame is compared with the truth."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-7c2a64a143bb8e19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "train-patch",
   "prompt": "Explain what each clue gives the model when it predicts the hidden image patch.",
   "answer": "The earlier patches give background above and two puppies to the left, so the model has seen what a puppy in this image looks like. The word “three” says a third puppy must appear, and “puppies” says to expect dog ears. The sound carries the same words, so it backs up the text.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 17
    }
   ],
   "type": "written",
   "topic": "clues for a patch",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Explain what each clue gives the model when it predicts the hidden image patch.",
    "college": "Explain what each clue gives the model when it predicts the hidden image patch.",
    "simple": "How do the earlier patches, the words and the sound help predict the hidden patch?"
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-138d442605a7f419",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "train-patch",
   "prompt": "Why is the colour the biggest error when the model guesses the hidden patch?",
   "answer": "The colour is the biggest error because no clue gave the colour of the third puppy. The model guessed a puppy ear in the average colour of the first two puppies. The true puppy is dark, and nothing in the words, the sound or the earlier patches said so.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 17
    }
   ],
   "type": "written",
   "topic": "colour error",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Why is the colour the biggest error when the model guesses the hidden patch?",
    "college": "Why is the colour the biggest error when the model guesses the hidden patch?",
    "simple": "The model guesses a light brown ear, but the true patch is dark. Explain why."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-00280e9bfd6c0419",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "train-patch",
   "prompt": "Which systems are trained to predict image patches, and which usually are not?",
   "answer": "Only systems that also produce images are trained to predict image patches. Systems that only read images usually skip this step. Predicting a patch is like teaching the model to draw what it was told, so it matters only when the system has to draw.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 17
    }
   ],
   "type": "written",
   "topic": "which systems",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Which systems are trained to predict image patches, and which usually are not?",
    "college": "Which systems are trained to predict image patches, and which usually are not?",
    "simple": "Is every system trained to predict a hidden image patch? Explain."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-8913f380d9159019",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "clue-table",
   "prompt": "What is the difference between a clue from the same sense and a clue from another sense?",
   "answer": "A clue from the same sense mostly says how the signal continues. Grammar does this for a hidden word, smooth formants do it for a hidden frame, and fur and background do it for a hidden patch. Clues from the other senses mostly say what the thing is, which here is puppies, three of them.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 18
    }
   ],
   "type": "written",
   "topic": "two kinds of clue",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "What is the difference between a clue from the same sense and a clue from another sense?",
    "college": "What is the difference between a clue from the same sense and a clue from another sense?",
    "simple": "Compare what same-sense clues and other-sense clues tell the model about a hidden piece."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-1fdcdff146cf9d19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "clue-table",
   "prompt": "Why does training on words, sound and images together help?",
   "answer": "Training on all three senses together helps because each sense fills gaps the others leave. A clue from the same sense says how the signal continues. Clues from the other senses say what the thing is. With all three, the model has both kinds of clue for every hidden piece.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 18
    }
   ],
   "type": "written",
   "topic": "all three senses",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Why does training on words, sound and images together help?",
    "college": "Why does training on words, sound and images together help?",
    "simple": "Explain why the model learns better from all three senses in one row."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-4fbb1235d37cca19",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "talking-back",
   "prompt": "Explain how the model talks back.",
   "answer": "The model talks back by predicting sound codes. First, sound is compressed into discrete codes, and each code works like a new word in the vocabulary. Then the model predicts the next code exactly as it predicts the next word. Last, a decoder turns the codes back into a sound wave.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 19
    }
   ],
   "type": "written",
   "topic": "talking back",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "Explain how the model talks back.",
    "college": "Explain how the model talks back.",
    "simple": "Describe the steps that let the model produce speech."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-ca3638659a27b019",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "talking-back",
   "prompt": "What three things are new when an LLM is trained on words, sounds and images?",
   "answer": "The first new thing is a shared currency, in which everything becomes vectors in one row. The second is data where the senses appear together. The third is a schedule that protects what was already learned.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 19
    }
   ],
   "type": "written",
   "topic": "what is new",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "What three things are new when an LLM is trained on words, sounds and images?",
    "college": "What three things are new when an LLM is trained on words, sounds and images?",
    "simple": "List the three new requirements for training on three senses."
   },
   "priority": 1.0
  },
  {
   "id": "modern-writing-e75917ca2fac9419",
   "lectureId": "lecture19",
   "moduleId": "module3",
   "concept": "talking-back",
   "prompt": "What stays the same when the signal holds words, sounds and images?",
   "answer": "The learning rule stays the same. The model still finds the dependencies in the signal by guessing a hidden piece and nudging its weights. The signal has become wider, because it now holds words, sounds and images.",
   "sources": [
    {
     "collection": "lecture19",
     "page": 19
    }
   ],
   "type": "written",
   "topic": "what stays the same",
   "kind": "Generated practice",
   "image": "",
   "wordings": {
    "original": "What stays the same when the signal holds words, sounds and images?",
    "college": "What stays the same when the signal holds words, sounds and images?",
    "simple": "When sounds and images are added to the signal, what does not change?"
   },
   "priority": 1.0
  }
 ],
 "summaries": {
  "lecture19": "Explain how speech and images become rows of vectors, how clues cross from one sense to another, and how a hidden word, sound frame or image patch each trains the same model."
 },
 "coverage": {
  "sourcePages": 305,
  "teachingPages": 236,
  "modulePages": {
   "module1": 155,
   "module2": 131,
   "module3": 19
  },
  "currentQuestions": 400,
  "distinctWritingPrompts": 244,
  "sourceReview": "Existing full-page extraction and media inventories are retained. New exam-review pages and critical diagrams were inspected for this rewrite. Original animations remain available rather than being inferred solely from static previews."
 }
};
 const pack = window.LING285_MODERN;
 if (!pack || pack.module3Merged) return;
 for (const [key, value] of Object.entries(add)) {
  if (Array.isArray(value)) pack[key] = [...(pack[key] || []), ...value];
  else pack[key] = {...(pack[key] || {}), ...value};
 }
 // Lectures 17 and 18 stay in Module II and are also part of Module III. Their workspace entries are copied for
 // Module III under new ids, in the plain wording where one exists, so each module keeps its own practice record.
 const kept = new Set(['lecture17', 'lecture18']), plain = window.LING285_PLAIN || {};
 const copy = item => ({...JSON.parse(JSON.stringify(item)), id: item.id + '-m3', moduleId: 'module3'});
 const reword = (item, wording, fields) => { if (wording) for (const f of fields) if (wording[f] != null) item[f] = wording[f]; return item; };
 const fromModule2 = item => item.moduleId === 'module2';
 const extra = {qa: [], guides: [], asked: [], cards: [], contrasts: [], hard: [], connections: [], figures: [], questions: [], writing: []};
 for (const q of pack.qa) if (fromModule2(q) && kept.has(q.lectureId)) {
  const c = copy(q), w = q.kind === 'slides' ? plain.concepts?.[q.concept]?.['q' + q.id.split('-').pop()] : plain.connectionQs?.[q.id];
  if (w) { c.question = w.question; c.answer = [w.answer]; }
  extra.qa.push(c);
 }
 for (const g of pack.guides) if (fromModule2(g) && g.points.every(p => kept.has(p.collection))) extra.guides.push(copy(g));
 for (const a of pack.asked) if (fromModule2(a) && kept.has(a.collection)) extra.asked.push(reword({...copy(a), id: undefined}, plain.asked?.[a.concept], ['title', 'items']));
 for (const c of pack.cards) if (fromModule2(c) && kept.has(c.collection)) extra.cards.push(reword(copy(c), plain.cards?.[c.id], ['title', 'explain', 'outcome', 'interpret']));
 for (const h of pack.hard) if (fromModule2(h) && kept.has(h.collection)) extra.hard.push(reword(copy(h), plain.hard?.[h.id], ['title', 'paragraphs', 'question', 'answer']));
 for (const f of pack.figures) if (fromModule2(f) && kept.has(f.collection)) extra.figures.push(reword(copy(f), plain.figures?.[f.id], ['title', 'takeaway']));
 for (const c of pack.connections) if (fromModule2(c) && c.sources.every(s => kept.has(s.collection))) extra.connections.push(reword(copy(c), plain.connections?.[c.id], ['title', 'paragraphs', 'question', 'answer']));
 for (const c of pack.contrasts) if (fromModule2(c) && kept.has(c.collection)) {
  const k = copy(c), w = plain.contrasts?.[c.id];
  if (w) { k.title = w.title; k.paragraphs = w.paragraphs; if (w.left) k.left = {...k.left, text: w.left.text}; if (w.right) k.right = {...k.right, text: w.right.text}; }
  extra.contrasts.push(k);
 }
 for (const q of pack.questions) if (fromModule2(q) && kept.has(q.lectureId)) extra.questions.push({...copy(q), bankKey: q.bankKey + '-m3'});
 for (const w of pack.writing) if (fromModule2(w) && kept.has(w.lectureId)) extra.writing.push(copy(w));
 // Kept lectures come first in each Module III list, then the Lecture 19 entries added above.
 for (const [key, items] of Object.entries(extra)) pack[key] = [...pack[key].filter(x => x.moduleId !== 'module3'), ...items, ...pack[key].filter(x => x.moduleId === 'module3')];
 pack.module3Merged = true;
})();
