# Mayra

`sketch.js` contains the supplied p5.js artwork. Only the music URL and its
missing-file callback differ from the supplied source.

`embed.js` connects it to the shared portfolio window, adds touch support,
cleans up audio on exit, and makes Q/Escape toggle sound rather than stop
the sketch. Pattern generation and date selection remain in `sketch.js`.

`index.html` uses the same locally hosted p5.js and p5.sound as Entangled.
Project text and window instructions are configured in `data/site.ts`.
