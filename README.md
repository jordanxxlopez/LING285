# LING285 Study Studio

Open: https://jordanxxlopez.github.io/LING285/ling285/

Each course now has its own repository and website, and the Course dropdown in the sidebar switches between them:

| Course | Site |
|---|---|
| PSYC301 | https://jordanxxlopez.github.io/COGNITIVEPROCESSES/ |
| LING406 | https://jordanxxlopez.github.io/LING406/ling406/ |
| LING285 | https://jordanxxlopez.github.io/LING285/ling285/ |
| BME423 | https://jordanxxlopez.github.io/BME423/bme423/ |

LING285 moved here from jordanxxlopez/COGNITIVEPROCESSES on 2026-11-14, copied unchanged from `ling285/` at commit e6bab14.
The only edits were the links to the other courses, which are now full URLs. Earlier history stays in COGNITIVEPROCESSES.

- `ling285/` holds the course exactly as before. See `ling285/README.md` for how it is built and tested.
- The root files are the shared studio files the course loads, kept at the same paths so nothing inside `ling285/` changed.
- `workspace-modern.css` is the shared modern-workspace stylesheet.
- `course-switcher.js` is the same in all four repositories except for its `HERE` line.
- `AGENTS.md` and `CLAUDE.md` are the same writing rules and advisory board as in COGNITIVEPROCESSES.
- GitHub Pages serves the `main` branch root. `.nojekyll` keeps files as they are.
- The media workflows in `.github/workflows/` came over unchanged and still run only on their preview branches or by hand.

Local preview: serve this folder (for example `python3 -m http.server`) and open `/ling285/`.
