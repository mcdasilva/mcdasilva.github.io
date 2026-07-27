import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import ToolLogos from './ToolLogos';
import type { Artwork as ArtworkItem, ToolKey } from '@/data/site';
import type { CSSProperties } from 'react';

type ArtworkProps = {
  art: ArtworkItem;
  className?: string;
  fit?: 'cover' | 'contain';
  priority?: boolean;
  respectRatio?: boolean;
  showCaption?: boolean;
  sizes?: string;
  tools?: ToolKey[];
  maxDisplayHeight?: number;
  align?: 'center' | 'start';
};

const aspectClass = (ratio: string) => {
  if (ratio === '3:4') return 'aspect-[3/4]';
  if (ratio === '4:5') return 'aspect-[4/5]';
  if (ratio === '4:3') return 'aspect-[4/3]';
  return 'aspect-video';
};

const publicPath = (src: string) =>
  path.join(process.cwd(), 'public', src.replace(/^\/+/, ''));

const aspectStyle = (ratio: string) => {
  const [width, height] = ratio.split(':').map(Number);

  if (!width || !height) return undefined;

  return { aspectRatio: `${width} / ${height}` };
};

export default function Artwork({
  art,
  className = '',
  fit = 'cover',
  priority = false,
  respectRatio = true,
  showCaption = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  tools = [],
  maxDisplayHeight = 760,
  align = 'center',
}: ArtworkProps) {
  const exists = fs.existsSync(publicPath(art.src));
  const isVideo = art.src.endsWith('.mp4');
  const poster =
    art.poster && fs.existsSync(publicPath(art.poster)) ? art.poster : undefined;
  const mediaStyle = art.position ? { objectPosition: art.position } : undefined;
  const isNaturalImage =
    exists && !isVideo && fit === 'contain' && art.width && art.height;
  const naturalFrameStyle: CSSProperties | undefined = isNaturalImage
    ? {
        width: `min(100%, ${Math.round(
          maxDisplayHeight * (art.width! / art.height!),
        )}px)`,
      }
    : undefined;
  const frameStyle = respectRatio ? aspectStyle(art.ratio) : undefined;
  const mediaClass =
    fit === 'contain'
      ? 'h-full w-full object-contain'
      : 'h-full w-full object-cover';

  if (isNaturalImage) {
    return (
      <figure
        className={`relative block max-w-full overflow-visible ${
          align === 'start'
            ? 'mr-auto justify-self-start'
            : 'mx-auto justify-self-center'
        } ${className}`}
        style={naturalFrameStyle}
      >
        <Image
          src={art.src}
          alt={art.alt}
          width={art.width}
          height={art.height}
          sizes={sizes}
          className="block h-auto w-full border border-line object-contain"
          style={mediaStyle}
          priority={priority}
        />
        {showCaption && art.caption && (
          <figcaption className="absolute bottom-0 left-0 bg-ink/75 px-3 py-2 text-xs text-muted">
            {art.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure
      className={`relative w-full min-w-0 max-w-full overflow-hidden border border-line bg-coal ${aspectClass(
        art.ratio,
      )} ${className}`}
      style={frameStyle}
    >
      {exists && !isVideo ? (
        <Image
          src={art.src}
          alt={art.alt}
          fill
          sizes={sizes}
          className={mediaClass}
          style={mediaStyle}
          priority={priority}
        />
      ) : exists && isVideo ? (
        <video
          className={mediaClass}
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
      {exists && tools.length > 0 && (
        <ToolLogos
          tools={tools}
          className="absolute bottom-0.5 left-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          iconClassName="h-14 w-14"
          imageSize={48}
        />
      )}
    </figure>
  );
}
