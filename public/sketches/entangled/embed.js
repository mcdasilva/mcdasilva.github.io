// Portfolio controls and lifecycle only. Drawing stays in the supplied sketch/classes.
(() => {
  let ready = false;

  const report = () => {
    window.parent.postMessage({
      type: 'entangled-state',
      ready,
      mode,
      sound: audioStarted && getAudioContext().state === 'running',
    }, window.location.origin);
  };

  const fail = () => {
    window.parent.postMessage({
      type: 'entangled-error',
      message: 'The interactive artwork could not load. Please reload the page.',
    }, window.location.origin);
  };

  const originalSetup = window.setup;
  window.setup = () => {
    originalSetup();
    const canvas = document.querySelector('canvas');
    canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', 'Entangled: drag to draw; P points, S scribbles, B both, R clear, Q or Escape toggles sound.');
    canvas.addEventListener('pointerdown', (event) => {
      if (event.isPrimary && event.button === 0) {
        canvas.focus({ preventScroll: true });
        canvas.setPointerCapture(event.pointerId);
      }
    });
    canvas.addEventListener('lostpointercapture', () => {
      if (dragging) window.mouseReleased();
    });
    getAudioContext().addEventListener('statechange', report);
    ready = true;
    report();
  };

  for (const name of ['mousePressed', 'mouseReleased', 'keyPressed']) {
    const original = window[name];
    window[name] = (...args) => {
      const result = original(...args);
      report();
      if (result && typeof result.then === 'function') result.then(report);
      return result;
    };
  }

  // p5's mouse coordinates are also used by its touch events.
  window.touchStarted = () => { window.mousePressed(); return false; };
  window.touchMoved = () => false;
  window.touchEnded = () => { window.mouseReleased(); return false; };

  window.addEventListener('message', async (event) => {
    if (event.origin !== window.location.origin || event.source !== window.parent) return;
    if (event.data?.type !== 'entangled-control' || !ready) return;

    const { action, value } = event.data;
    if (action === 'mode' && ['both', 'points', 'scribbles'].includes(value)) {
      mode = value;
    } else if (action === 'clear') {
      points = [];
      scribbles = [];
      dragging = false;
      background(0);
    } else if (action === 'sound') {
      await toggleSounds();
    }
    report();
  });

  window.addEventListener('blur', () => {
    if (ready && dragging) window.mouseReleased();
  });

  window.disposeSketch = () => {
    if (!ready) return;
    closeSounds();
    noLoop();
    const context = getAudioContext();
    if (context.state !== 'closed') void context.close().catch(() => {});
    ready = false;
  };
  window.addEventListener('pagehide', window.disposeSketch);
  window.addEventListener('error', fail);
})();
