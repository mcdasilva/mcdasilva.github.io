import fs from 'fs';
import path from 'path';
import Artwork from './Artwork';
import ProjectVideo from './ProjectVideo';
import type { Project } from '@/data/site';

const mediaExists = (src: string) =>
  fs.existsSync(path.join(process.cwd(), 'public', src.replace(/^\/+/, '')));

export default function ProjectMedia({ project }: { project: Project }) {
  if (!project.video || !mediaExists(project.video.src)) {
    return <Artwork art={project.hero} priority fit="contain" />;
  }

  const poster = mediaExists(project.video.poster)
    ? project.video.poster
    : undefined;

  return (
    <ProjectVideo
      src={project.video.src}
      poster={poster}
      label={project.video.label}
    />
  );
}
