# Talk slides

Add slide PDFs here. Each entry in `talks.jemdoc` has a comment with a reserved filename.
Replace `/Title to be added/` with `[slides/2025-icsds.pdf Your talk title]`, using that entry's filename, then regenerate the HTML.
Placeholders remain plain text until a slide file is available, avoiding broken links.
Dates and venues reproduce the CV; entries with only a year retain that precision.

Rebuild from the website folder:

```sh
python2 jemdoc.py index.jemdoc research.jemdoc publications.jemdoc talks.jemdoc service.jemdoc
```
