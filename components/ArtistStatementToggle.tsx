'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { type ReactNode, useState } from 'react';

type ArtistStatementToggleProps = {
  summary: string;
  fullStatement: ReactNode[];
};

export default function ArtistStatementToggle({
  summary,
  fullStatement,
}: ArtistStatementToggleProps) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const statementId = 'artist-statement-copy';

  return (
    <div className="max-w-3xl">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={expanded ? 'full' : 'summary'}
          id={statementId}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={
            expanded
              ? 'space-y-5 text-lg leading-relaxed text-muted sm:text-xl'
              : 'text-xl leading-relaxed text-muted'
          }
        >
          {expanded ? (
            fullStatement.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>{summary}</p>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={statementId}
        onClick={() => setExpanded((current) => !current)}
        className="mt-8 inline-flex items-center border border-amber px-5 py-4 text-xs uppercase tracking-[.18em] text-amber transition-colors duration-300 ease-out hover:border-bone hover:text-bone"
      >
        {expanded ? 'View Short Statement' : 'View Full Statement'}
        <span aria-hidden="true" className="ml-2">
          {expanded ? <>&uarr;</> : <>&rarr;</>}
        </span>
      </button>
    </div>
  );
}
