// Portfolio controls and lifecycle. Wave rendering stays in the supplied sketch.
(() => {
  let ready = false;
  let soundEnabled = true;
  let starting = null;
  let revision = 0;
  const report = () => window.parent.postMessage({
    type: 'interference-state', ready,
    sound: soundEnabled && audio_started && getAudioContext().state === 'running',
  }, window.location.origin);
  const fail = (message) => window.parent.postMessage({
    type: 'interference-error', message,
  }, window.location.origin);

  window.start_audio = () => {
    if (!soundEnabled || !ready) return Promise.resolve();
    if (starting) return starting;
    if (audio_started && getAudioContext().state === 'running') return Promise.resolve();
    const request = revision;
    starting = (async () => {
      try {
        // Resume immediately from the canvas or parent button gesture.
        await getAudioContext().resume();
        if (request !== revision || !soundEnabled || !ready) return;
        if (music?.isLoaded() && !music.isPlaying()) music.loop();
        audio_started = music?.isLoaded() || click_sound?.isLoaded() || false;
        if (!music?.isLoaded() || !click_sound?.isLoaded()) {
          fail('Some audio is unavailable. You can still interact with the artwork.');
        }
      } catch {
        fail('Sound could not start. Try the sound button again.');
      } finally {
        if (request === revision) starting = null;
        report();
      }
    })();
    return starting;
  };
  window.play_click_sound = async () => {
    const request = revision;
    await window.start_audio();
    if (request === revision && soundEnabled && ready && audio_started && click_sound?.isLoaded()) {
      click_sound.play();
    }
  };
  const mute = () => {
    soundEnabled = false;
    revision++;
    starting = null;
    music?.pause();
    click_sound?.stop();
    audio_started = false;
  };
  const toggleSound = async () => {
    if (soundEnabled && (audio_started || starting)) mute();
    else {
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
    canvas.setAttribute('aria-label', 'Interference: move to disturb waves, click or tap to add color; R clears; Q or Escape toggles sound.');
    canvas.addEventListener('pointerdown', () => canvas.focus({ preventScroll: true }));
    ready = true;
    getAudioContext().addEventListener('statechange', report);
    report();
  };
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

  window.controlSketch = async (action) => {
    if (!ready) return;
    if (action === 'clear') reset();
    else if (action === 'sound') await toggleSound();
    report();
  };
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin || event.source !== window.parent) return;
    if (event.data?.type !== 'interference-control' || !ready) return;
    void window.controlSketch(event.data.action);
  });
  window.disposeSketch = () => {
    mute();
    music?.stop();
    noLoop();
    const context = getAudioContext();
    if (context.state !== 'closed') void context.close().catch(() => {});
    ready = false;
  };
  window.addEventListener('pagehide', window.disposeSketch);
  window.addEventListener('error', () => fail('The interactive artwork could not load. Please reload the page.'));
})();
