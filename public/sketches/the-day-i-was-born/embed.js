// Portfolio integration. The animation's drawing and scene transitions remain in sketch.js.
(() => {
  let ready = false;
  const report = () => window.parent.postMessage({
    type: 'the-day-i-was-born-state',
    ready,
    sound: SOUND_ON && getAudioContext().state === 'running' &&
      (music?.isPlaying() === true || click_sound?.isPlaying() === true),
  }, window.location.origin);
  const fail = (message) => window.parent.postMessage({
    type: 'the-day-i-was-born-error', message,
  }, window.location.origin);

  const restart = () => {
    started = false;
    starting = false;
    active_click_sound = null;
    button_fade_in_frame = frameCount;
    music?.stop();
    click_sound?.stop();
    report();
  };

  const toggleSound = async () => {
    SOUND_ON = !SOUND_ON;
    music?.setVolume(SOUND_ON ? 1 : 0);
    click_sound?.setVolume(SOUND_ON ? 1 : 0);
    if (SOUND_ON) {
      try {
        await getAudioContext().resume();
      } catch {
        fail('Sound could not start. Try the sound button again.');
      }
    }
    report();
  };

  const originalSetup = window.setup;
  window.setup = () => {
    originalSetup();
    const canvas = document.querySelector('canvas');
    canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', 'The Day I Was Born: press START ANIMATION; R restarts; Q or Escape toggles sound.');
    canvas.addEventListener('pointerdown', () => canvas.focus({ preventScroll: true }));
    getAudioContext().addEventListener('statechange', report);
    ready = true;
    report();
  };

  const originalMousePressed = window.mousePressed;
  window.mousePressed = (...args) => {
    const result = originalMousePressed(...args);
    report();
    return result;
  };
  const originalBeginAnimation = window.begin_animation;
  window.begin_animation = (...args) => {
    const result = originalBeginAnimation(...args);
    report();
    return result;
  };
  window.keyPressed = (event) => {
    if (event?.repeat) return;
    if (key === 'r' || key === 'R') restart();
    else if (key === 'q' || key === 'Q' || key === 'Escape' || keyCode === ESCAPE) {
      event?.preventDefault();
      void toggleSound();
    }
  };
  window.touchStarted = () => { window.mousePressed(); return false; };
  window.touchMoved = () => false;

  window.controlSketch = async (action) => {
    if (!ready) return;
    if (action === 'clear') restart();
    else if (action === 'sound') await toggleSound();
    report();
  };
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin || event.source !== window.parent) return;
    if (event.data?.type !== 'the-day-i-was-born-control') return;
    void window.controlSketch(event.data.action);
  });
  window.disposeSketch = () => {
    ready = false;
    music?.stop();
    click_sound?.stop();
    noLoop();
    const context = getAudioContext();
    if (context.state !== 'closed') void context.close().catch(() => {});
  };
  window.addEventListener('pagehide', window.disposeSketch);
  window.addEventListener('error', () => fail('The animation could not load. Please reload the page.'));
})();
