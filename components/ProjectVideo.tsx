'use client';

import { useState } from 'react';

type ProjectVideoProps = {
  src: string;
  poster?: string;
  label: string;
  maxDisplayHeight?: number;
};

export default function ProjectVideo({
  src,
  poster,
  label,
  maxDisplayHeight = 760,
}: ProjectVideoProps) {
  const [ratio, setRatio] = useState<number>();

  return (
    <figure
      className="mx-auto min-w-0 max-w-full self-start justify-self-center"
      style={{
        width: ratio ? `min(100%, ${maxDisplayHeight * ratio}px)` : '100%',
      }}
    >
      <video
        className="block h-auto w-full border border-line"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          if (video.videoWidth && video.videoHeight) {
            setRatio(video.videoWidth / video.videoHeight);
          }
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
      <figcaption className="mt-3 text-xs uppercase tracking-[.16em] text-muted">
        {label}
      </figcaption>
    </figure>
  );
}
