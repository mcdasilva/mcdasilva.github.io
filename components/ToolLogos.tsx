import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { toolLogos, type ToolKey } from '@/data/site';

type ToolLogosProps = {
  tools: ToolKey[];
  className?: string;
  iconClassName?: string;
};

const publicPath = (src: string) =>
  path.join(process.cwd(), 'public', src.replace(/^\/+/, ''));

export default function ToolLogos({
  tools,
  className = '',
  iconClassName = '',
}: ToolLogosProps) {
  const resolvedTools = tools.map((tool) => toolLogos[tool]).filter(Boolean);

  if (resolvedTools.length === 0) return null;

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-label={`Created with ${resolvedTools
        .map((tool) => tool.name)
        .join(', ')}`}
    >
      {resolvedTools.map((tool) => {
        const exists = fs.existsSync(publicPath(tool.logo));

        return (
          <span
            key={tool.id}
            title={tool.name}
            className={`inline-flex h-8 w-8 items-center justify-center border border-line bg-coal/70 text-[10px] font-semibold uppercase tracking-[.12em] text-bone ${iconClassName}`}
          >
            {exists ? (
              <Image src={tool.logo} alt={tool.name} width={20} height={20} />
            ) : (
              <span aria-hidden="true">{tool.fallback}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
