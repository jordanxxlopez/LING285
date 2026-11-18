# Module III (Lecture 19 onward)

Module III is everything after Exam 2. It starts with Lecture 19 (`Ling285_F26_L19.pptx`, November 17, 2026).

## Lectures 17 and 18 are in Module III too

On November 10 he said the LLM part is kept for the final. Lectures 17 and 18 therefore stay in Module II, unchanged,
and are also listed by Module III (`lectureIds` and `carriedLectureIds` in `module3/data.json`).

- **Individual collections.** The app treats a lecture as part of the open module when that module lists it, so Lectures 17 and 18 open inside Module III with every teaching version. Notes and read marks are saved per slide and are shared with Module II.
- **Workspace panels and quizzes.** `module3/overlay.js` and `module3/modern/content.js` copy the Lecture 17 and 18 questions, Q&A, cards, contrasts, hard topics, connections and guide entries for Module III when the page loads, under ids ending in `-m3`. The copies use the plain wording where Module II has one. Practice progress is kept separately for each module.
- **Study this first, Notes by topic and the review guide.** `make_module3.py` reuses the seven Module II Simpler v3 topics for Lectures 17 and 18 unchanged, then adds the six Lecture 19 topics. A slide that Lecture 19 repeats is shown once and names every lecture it appears in.

## The v2 versions (Lecture 19 with the class of November 17)

The first Lecture 19 text was written before a class transcript existed. Every version keeps that text. Each version also
has a second version, named with "· v2", that adds what was taught in class on November 17 to the slide it belongs to.

- **Source.** `LING285_2026-11-17_transcript.txt`, read in full and mapped to the slides. Pages 2 to 5, 9, 10 and 13 to 19 have class material. Pages 6, 7 and 8 were skipped in class, and pages 11 and 12 were not gone through separately, so they keep the original text.
- **Writing.** `authoring/lecture19_transcript.py` holds the class material once per writing register (FULL, SHORT, PROF, NOTES, ND). `authoring/lecture19_v2.py` adds the matching register to each version and writes `module3/transcripts-<id>-t2.json` and `module3/modern/transcripts-<id>-t2.json` (14 original-workspace and 21 modern versions). Versions that share a register get the same added blocks on top of their own text.
- **Loading.** `module3/overlay.js` builds a v2 version from its base version plus the v2 Lecture 19 text. `module3/modern/editions-t2.js` lists the modern v2 versions, and `LECTURE19_V2` in `app.js` lists the original-workspace ones. They appear in Module III only, and in the original workspace on Lecture 19 only.
- **Study this first.** A third version, "Study this first · v2", adds the class material and 12 questions marked "From class, Nov 17" to the topics (`class_nov17.json`, written by `make_module3.py`). The first two versions are unchanged.

## Why Module III is a separate layer

The studio files for Lectures 01 to 18 (`data.json`, every `transcripts-*.json`, `modern/content.js` and about
thirty more) are locked by hash in the tests, so that nothing already studied can change. Writing a new lecture
into those files breaks the locks. Module III is therefore published from `ling285/module3/`:

- `module3/data.json` holds the Module III module, the Lecture 19 collection (all 19 pages), its 50 questions and its guide entries.
- `module3/transcripts-*.json` and `module3/modern/transcripts-*.json` hold Lecture 19 for each teaching version (14 original-workspace versions and 22 modern versions).
- `module3/modern/content.js` adds the Lecture 19 concepts, Q&A, quiz questions, cards, contrasts and summaries to the modern content pack.
- `module3/overlay.js` merges the layer into the course data and into each teaching version as the app loads them. Both `index.html` files load it before the app.
- `modern/module3.js` holds Study this first, Notes by topic and the review guide, built by the per-module study template.

Saved notes, read marks and practice keep their keys. `tests/module3.test.cjs` checks the layer and confirms the locked files still end at Lecture 18.

## What Lecture 19 contains

Pages 2 to 8 are the Lecture 18 slides unchanged (same slide XML, same rendered pixels), so every version reuses its own
Lecture 18 teaching for them. Pages 9 to 19 are new: what an LLM learns, text, speech and images as rows of vectors,
one row with three senses, the three cute puppies example, three training examples, the table of clues, and talking back.
Page 1 (title) and page 8 (prompt only) stay empty.

There is no class transcript for November 17. The new pages are written from the slides and their speaker notes only.

## Where each version's Lecture 19 text is written

| Versions | Source |
|---|---|
| Original workspace 1 to 4, 7, 10, 12 | `authoring/lecture19_notes.py` (five paragraphs a page, plus the extras in `lecture19_editions.py`) |
| Original workspace 14, 16, 18, Iskarous A, B, C (20, 21, 22) | `authoring/lecture19_editions.py`, one text per version |
| Version 24 and Version B | Copies of Versions 22 and 21 for the new pages (`module3/extra_editions.py`) |
| Modern Professor, B, C, Version 23, Version 20 | `CONCEPTS` in `authoring/lecture19_modern.py` |
| Modern Original C, D | The Version 22 text, with one added sub-bullet a page for D |
| Modern Original C Version 2, D Version 2, Original C Version 3 | `CV2` and `VIS` in `authoring/lecture19_modern.py` |
| Modern notes 9.1, 9 and 10 | Hand-written in `authoring/notes-v9.1/19-new.md`, `notes-v9/19-new.md`, `notes-v10/19-new.md` |
| Modern notes 9.2, 9.3, 9.4, 10.1 | Derived by the edit lists in `authoring/lecture19_notes_derive.py` |
| Modern notes 8, 8.1, 8.2 | The 9.1 and 9.4 text in the Version 8 section layout |
| Modern Version 7 Version 2 | The Version 16 text with two added sub-bullets a page |
| Modern Version 7 · Your PDF notes | Empty for the new pages. No PDF notes exist for Lecture 19 yet |
| Study this first, Notes by topic, review guide | `authoring/module3/make_module3.py` |
| Practice (25 multiple-choice, 25 written) | `authoring/lecture19_practice.py` |

## Rebuild

```sh
python3 ling285/authoring/module3/build_layer.py
node --test ling285/tests/module3.test.cjs ling285/tests/modern-content.test.cjs
```

`build_layer.py` runs the standard builders on a working copy that temporarily includes Lecture 19, moves the Lecture 19
parts into `module3/`, and restores every locked file. It stops if an earlier lecture would change. It needs LibreOffice
and Tesseract. Add `--stages` to re-render the click states.

To add Lecture 20: add its deck to the upload manifest step in `build_layer.py`, write its `lectureNN_notes.py`,
editions, notes and practice the same way, add its topics to `make_module3.py`, and rebuild.

## Known limits

- The original workspace offers Practice Version 1 for Module III. Practice Version 2 questions for Lecture 19 are written (`authoring/practice-v2-lecture19.json`) but the Version 2 and 3 practice screens are built for Module II only.
- A modern lecture quiz in Module III draws 20 of the 50 questions at a time, as in Module I. Module II uses all 50.
- The studio still opens on Module II by default.
- Board report: `authoring/module3/board.md`.
