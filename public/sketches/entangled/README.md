# Entangled browser sketch

The supplied p5.js translation is kept in three files:

- `sketch.js`: setup, drawing loop, mode controls, and sound mixing. The supplied main sketch uses local sound-file URLs and shared sound helpers so Q/Escape and the Sound button toggle both loops consistently.
- `Points.js`: the supplied Points class, unchanged.
- `Scribbles.js`: the supplied Scribbles class, unchanged.

`embed.js` connects the sketch to the portfolio's buttons, supports touch input, and stops sound when leaving the page. It does not replace the artwork's generation, movement, color, curves, or fading algorithms.

`index.html` runs the sketch in its own frame so the original global p5.js code cannot interfere with the rest of the portfolio. p5.js 1.11.11 and its bundled p5.sound addon are served locally from `public/vendor/p5/`.

The two original audio loops are loaded from `public/artwork/creative-coding/interactive-art/entangled/`:

- `entangled_points_sound.wav`
- `entangled_scribbles_sound.wav`

Sound starts with the first drawing gesture. Q/Escape or the Sound button toggles it off and on; drawing while muted keeps it muted. Holding a sound shortcut does not repeatedly toggle it.

P selects points, S selects scribbles, B selects both, and R clears. Drawing uses mouse or touch only; Space, Enter, and arrow keys have no artwork controls.
