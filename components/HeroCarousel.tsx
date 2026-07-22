'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export type HeroSlide = {
  src: string;
  alt: string;
  title: string;
  meta: string;
  ratio: string;
  type: string;
  exists: boolean;
};

const slideDuration = 4800;

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = slides[index % slides.length];

  useEffect(() => {
    if (reduceMotion || slides.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, slideDuration);

    return () => window.clearInterval(timer);
  }, [reduceMotion, slides.length]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-coal">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={active.src}
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 1.015 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {active.exists ? (
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-coal px-6 text-center">
              <div className="max-w-md">
                <p className="font-serif text-4xl leading-none text-bone md:text-6xl">
                  {active.title}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[.2em] text-amber">
                  {active.alt}
                </p>
                <p className="mt-3 text-sm text-muted">
                  Recommended {active.ratio} - {active.type}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <div className="pointer-events-none absolute bottom-8 right-5 hidden w-64 text-right md:block">
          <div className="mb-3 h-px w-full bg-bone/20">
            <motion.div
              key={active.src}
              className="h-px bg-amber"
              initial={{ width: reduceMotion ? '100%' : '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: reduceMotion ? 0 : slideDuration / 1000,
                ease: 'linear',
              }}
            />
          </div>
          <p className="text-[10px] uppercase tracking-[.18em] text-amber">
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(slides.length).padStart(2, '0')}
          </p>
          <p className="mt-2 font-serif text-xl leading-tight text-bone">
            {active.title}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[.16em] text-muted">
            {active.meta}
          </p>
        </div>
      )}

      {slides.length > 1 && (
        <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 md:block">
          <div className="h-24 w-[3px] bg-amber" />
        </div>
      )}
    </div>
  );
}
