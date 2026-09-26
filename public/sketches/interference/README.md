# Interference

`sketch.js` is the supplied p5.js artwork, with local audio URLs and
missing-file callbacks. For the embedded window, stroke weight is 2,
wave heights (50, 55, 45) scale by canvas height / 1440 to match the video.
Pointer distortion uses the supplied amplitude multiplier (3) and blend (2),
with a smooth falloff to zero at the mouse radius. Wave speed is 0.02 (the middle
layer moves in the opposite direction). Background music plays at its original
recorded level (volume 1).

`embed.js` connects to the shared `InteractiveExperience` component, supports
touch, resumes audio directly from a user gesture, and cleans up on navigation.
R clears color; Q/Escape toggle both sounds without stopping the animation.
Muted sound stays muted when clicking. Space, Enter, and arrow keys have no
sketch actions.

`index.html` loads the same local p5.js and p5.sound libraries as the other works.
Metadata, media paths, and instructions live in the project record in `data/site.ts`.
Media belongs in `public/artwork/creative-coding/interactive-art/interference/`.
