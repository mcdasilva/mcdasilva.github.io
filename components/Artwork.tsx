import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import type { Artwork as ArtworkItem } from '@/data/site';

type ArtworkProps = {
  art: ArtworkItem;
  className?: string;
  priority?: boolean;
  showCaption?: boolean;
  sizes?: string;
};

const aspectClass = (ratio: string) => {
  if (ratio === '3:4') return 'aspect-[3/4]';
  if (ratio === '4:5') return 'aspect-[4/5]';
  if (ratio === '4:3') return 'aspect-[4/3]';
  return 'aspect-video';
};

const publicPath = (src: string) =>
  path.join(process.cwd(), 'public', src.replace(/^\/+/, ''));

export default function Artwork({
  art,
  className = '',
  priority = false,
  showCaption = true,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: ArtworkProps) {
  const exists = fs.existsSync(publicPath(art.src));
  const isVideo = art.src.endsWith('.mp4');
  const poster =
    art.poster && fs.existsSync(publicPath(art.poster)) ? art.poster : undefined;
  const mediaStyle = art.position ? { objectPosition: art.position } : undefined;

  return (
    <figure
      className={`relative overflow-hidden border border-line bg-coal ${aspectClass(
        art.ratio,
      )} ${className}`}
    >
      {exists && !isVideo ? (
        <Image
          src={art.src}
          alt={art.alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={mediaStyle}
          priority={priority}
        />
      ) : exists && isVideo ? (
        <video
          className="h-full w-full object-cover"
          style={mediaStyle}
          controls
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={art.src} type="video/mp4" />
        </video>
      ) : (
        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
          <p className="font-serif text-2xl text-bone">{art.alt}</p>
          <p className="mt-3 text-xs uppercase tracking-[.18em] text-amber">
            Recommended {art.ratio}
          </p>
          <p className="mt-2 text-sm text-muted">
            Suggested media type: {art.type}
          </p>
        </div>
      )}
      {showCaption && art.caption && (
        <figcaption className="absolute bottom-0 left-0 bg-ink/75 px-3 py-2 text-xs text-muted">
          {art.caption}
        </figcaption>
      )}
    </figure>
  );
}
