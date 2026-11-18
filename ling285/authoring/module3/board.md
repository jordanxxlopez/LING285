# Advisory board report · Lecture 19 and Module III (2026-11-17)

**Goal (Margaret, Chair).** Add Lecture 19 to the Study Studio as the first lecture of Module III, in every teaching
version, with practice and the Module III study pages, without changing anything for Lectures 01 to 18.
**Rules in force.** The 25-section teaching notes prompt, the LING285 teaching notes rules, the writing style guide and
its simpler-explanations section, plain everyday wording, the picture rule, source-only content, and the studio rule
that existing versions and saved study state are never changed.

## Issues logged and what was done

| Member | Where | Problem | Fix |
|---|---|---|---|
| Gideon | Slides and speaker notes say "the picture" throughout | "Picture" as a noun breaks the picture rule | Every version says image and image patch. A test rejects the word on the new pages |
| Gideon | Study this first, pages 10 and 18 | Lines shaped "Text: …" and "Hidden word: …" are label lines | Rewritten as full sentences. The labeled list is kept only in Versions 9.4 and 10.1, which are the labeled editions |
| Gideon | Version 20, page 14 | "We now use…" is banned wording | Reworded |
| Gideon | Notes 9.x | "Earlier words, earlier frames" trips the checker's ban on "earlier" | Reworded as "the words before the gap", "the frames already heard", "the patches already drawn" |
| Vera | Versions 16 and 22, page 11 | "Many frames fit inside one spoken word" is true but is not on the slide | Removed |
| Vera | Notes 9.1, page 11 | "If the slices were longer there would be fewer vectors" is my own inference | Removed from the notes. It stays only as a practice question, where questions are marked as predictions |
| Vera | Versions 24 and B | Pages 2 to 8 were copied from Versions 22 and 21 instead of each version's own Lecture 18 text | Fixed, and a test now checks it for all 36 versions |
| Sage | Page 16 | Formants needed the same gloss as in Module II | "Formants (frequency regions with strong energy)" used throughout |
| Rook | Whole lecture | There is no class transcript, so nothing shows what he stressed or said he would test | Stated in the scope box, the flags and the README. Every question on the new slides is marked Predicted |
| Rook | Version list | Some versions are copies or edits of others (24, B, 23, Original C, 8, 8.1, 8.2, 9.2 to 9.4, 10.1) | This matches how those versions are defined for other lectures. Listed in the README table so it is not hidden |
| Flint | Locked files | Writing Lecture 19 into the locked files broke 11 more tests | Lecture 19 moved to a separate Module III layer. All older test results are unchanged |
| Ada | Study order | The new slides matter more than the repeated ones for the final | Study this first puts the six new topics first and the five repeated topics after them |
| Cato | Process | One writer played every role, so no member was independent | Flagged to Jordan here. Automated checks back the review: the builders' banned-wording rules, `check_v9.py`, and `tests/module3.test.cjs` |

## For Jordan (kept out of the notes)

1. **Things in the notes that go one step past the slide.** "A smaller bet on the true word would be a larger error and a larger nudge" is the reverse of what the slide says, and "an image has no order of its own" explains why reading order is used. Both follow directly from the slides, but he did not write them.
2. **"A schedule that protects what was already learned"** is listed on the last slide with no explanation. Outside the slides, this usually means training in stages, with parts of the model kept fixed at first so new training does not erase earlier learning. That explanation is not in the notes because it is not in the source.
3. **Numbers checked against outside sources.** About 20 milliseconds a frame and 50 vectors a second, patches of 14 to 16 pixels giving hundreds of vectors, and sound codes with a decoder all match how current systems work. Nothing needed correcting.
4. **The speech in the puppies example is synthesized** (an MBROLA diphone voice, per the speaker notes). The notes say so.
5. **Carried over from Lecture 18.** The speaker notes date Jordan's network to 1986, and Lecture 17 said 1985. The reused text keeps the note already in the studio.

## Unresolved

- No class transcript for November 17. When there is one, the 9.x and 10.x notes should be revised with what he said.
- Version 7 · Your PDF notes is empty for the new slides until Jordan's own PDF notes exist.
- The notes PDFs and the outputs folder (`LING285 Notes vN`) have not been updated for Lecture 19.
- Nothing is committed or pushed. The work is on the local branch `lecture19-module3`.

**Sign-off (Margaret).** The content follows the source order, every instructional page is taught in every version, and
the rules above hold on the new pages. Signed off with the unresolved items listed.
