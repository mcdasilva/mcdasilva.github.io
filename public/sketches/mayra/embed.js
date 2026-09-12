// Portfolio integration; the supplied sketch owns the pattern and date selection.
(() => {
  let ready = false;
  let soundEnabled = true;
  let soundRequest = 0;
  const report = () => window.parent.postMessage({
    type: 'mayra-state', ready,
    sound: audioStarted && music?.isPlaying() === true && getAudioContext().state === 'running',
  }, window.location.origin);
  const fail = (message) => window.parent.postMessage({
    type: 'mayra-error', message,
  }, window.location.origin);

  // Await browser audio permission and keep mute persistent across selections.
  window.start_audio = async () => {
    if (!soundEnabled || audioStarted) return;
    if (!music?.isLoaded()) {
      fail('The music is unavailable. You can still interact with the artwork.');
      return;
    }
    const request = ++soundRequest;
    try {
      await userStartAudio();
      if (request !== soundRequest || !soundEnabled || !ready) return;
      if (!music.isPlaying()) music.loop();
      audioStarted = true;
    } catch {
      fail('Sound could not start. Try the sound button again.');
    }
    report();
  };
  const toggleSound = async () => {
    if (soundEnabled && (audioStarted || music?.isPlaying())) {
      soundEnabled = false;
      soundRequest++;
      music.pause();
      audioStarted = false;
    } else {
      soundEnabled = true;
      await window.start_audio();
    }
    report();
  };

  const originalSetup = window.setup;
  window.setup = () => {
    originalSetup();
    const canvas = document.querySelector('canvas');
    canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', 'Mayra: choose your birth month and day; R restarts; Q or Escape toggles sound.');
    canvas.addEventListener('pointerdown', () => canvas.focus({ preventScroll: true }));
    ready = true;
    getAudioContext().addEventListener('statechange', report);
    report();
  };
  // Q/Escape control sound without stopping the drawing loop.
  window.keyPressed = (event) => {
    if (event?.repeat) return;
    if (key === 'r' || key === 'R') reset();
    else if (key === 'q' || key === 'Q' || key === 'Escape' || keyCode === ESCAPE) {
      event?.preventDefault();
      void toggleSound();
    }
  };
  window.touchStarted = () => { window.mousePressed(); return false; };
  window.touchMoved = () => false;

  window.addEventListener('message', async (event) => {
    if (event.origin !== window.location.origin || event.source !== window.parent) return;
    if (event.data?.type !== 'mayra-control' || !ready) return;
    if (event.data.action === 'clear') reset();
    else if (event.data.action === 'sound') await toggleSound();
    report();
  });
  window.disposeSketch = () => {
    soundRequest++;
    soundEnabled = false;
    music?.stop();
    audioStarted = false;
    noLoop();
    const context = getAudioContext();
    if (context.state !== 'closed') void context.close().catch(() => {});
    ready = false;
  };
  window.addEventListener('pagehide', window.disposeSketch);
  window.addEventListener('error', () => fail('The interactive artwork could not load. Please reload the page.'));
})();
