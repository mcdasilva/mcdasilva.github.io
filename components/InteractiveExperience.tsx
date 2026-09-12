'use client';

import { useEffect, useRef, useState } from 'react';

type Mode = 'both' | 'points' | 'scribbles';
type SketchWindow = Window & { disposeSketch?: () => void };

export type ExperienceConfig = {
  title: string;
  instructions: string;
  keyboardHelp: string;
  drawingModes?: boolean;
  clearLabel?: string;
};

export default function InteractiveExperience({ slug, title, config }: { slug: string; title: string; config: ExperienceConfig }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<Mode>('both');
  const [sound, setSound] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const frame = frameRef.current;
    const sketchWindow = frame?.contentWindow as SketchWindow | null;
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame?.contentWindow) return;
      if (event.data?.type === `${slug}-state`) {
        setReady(event.data.ready === true);
        setSound(event.data.sound === true);
        if (['both', 'points', 'scribbles'].includes(event.data.mode)) setMode(event.data.mode);
      } else if (event.data?.type === `${slug}-error`) {
        setError(event.data.message);
      }
    };
    window.addEventListener('message', receive);
    frame?.contentWindow?.postMessage(
      { type: `${slug}-control`, action: 'state' },
      window.location.origin,
    );
    return () => {
      window.removeEventListener('message', receive);
      // Strict Mode repeats effects while the frame is still mounted.
      if (!frame?.isConnected) sketchWindow?.disposeSketch?.();
    };
  }, [slug]);

  const control = (action: 'mode' | 'clear' | 'sound', value?: Mode) => {
    setError('');
    frameRef.current?.contentWindow?.postMessage(
      { type: `${slug}-control`, action, value },
      window.location.origin,
    );
  };

  return (
    <section id="interactive-experience" aria-labelledby="experience-title" className="mx-auto mt-24 max-w-7xl scroll-mt-28">
      <div className="mb-6">
        <div>
          <p className="eyebrow">Interactive experience</p>
          <h2 id="experience-title" className="mt-2 font-serif text-4xl md:text-5xl">{config.title}</h2>
        </div>
        <p id="experience-pointer-help" className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {config.instructions}
        </p>
      </div>
      <div className="border border-line bg-black">
        <iframe
          ref={frameRef}
          src={`/sketches/${slug}/index.html`}
          title={`${title} interactive artwork`}
          aria-describedby="experience-pointer-help experience-keyboard-help"
          className="block aspect-[8/5] w-full border-0"
          allow="autoplay"
        />
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-4 py-3 text-[.68rem] uppercase tracking-[.18em]">
          {config.drawingModes && <div className="flex gap-1" role="group" aria-label="Drawing mode">
            {(['both', 'points', 'scribbles'] as Mode[]).map((item) => (
              <button
                  type="button"
                  key={item}
                  disabled={!ready}
                  aria-pressed={mode === item}
                  onClick={() => control('mode', item)}
                  className={`px-3 py-2 disabled:opacity-50 ${mode === item ? 'bg-bone text-ink' : 'text-muted hover:text-bone'}`}
              >
                {item}
              </button>
            ))}
          </div>}
          <div className="flex items-center gap-5">
            <button type="button" disabled={!ready} onClick={() => control('clear')} className="text-muted hover:text-bone disabled:opacity-50">{config.clearLabel || 'Clear / R'}</button>
            <button type="button" disabled={!ready} onClick={() => control('sound')} aria-pressed={sound} className="text-amber disabled:opacity-50">Sound {sound ? 'on' : 'off'}</button>
          </div>
        </div>
      </div>
      <p id="experience-keyboard-help" className="mt-4 text-sm leading-relaxed text-muted">
        {config.keyboardHelp}
      </p>
      <p role="status" className="mt-2 text-sm text-muted">
        {error || (!ready ? 'Loading interactive artwork...' : '')}
      </p>
    </section>
  );
}
