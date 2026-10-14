# Fireflies browser animation

`sketch.js` contains the supplied p5.js animation. The canvas uses the shared
portfolio window, and `background_music.wav` is loaded from the matching artwork
folder. `embed.js` handles the shared Restart and Sound controls, keyboard
shortcuts, and cleanup when the project page closes.

The soundtrack continues at zero volume when Sound is off, so toggling it does
not shift the heartbeat timing.
