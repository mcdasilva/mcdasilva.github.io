# Matheus Coutinho da Silva Portfolio

A dark, cinematic, editorial portfolio built for an MFA Visualization application with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The site is static-export ready for GitHub Pages or Vercel and uses no database or CMS.

## Run locally

```bash
npm install
npm run dev
```

Build the static site:

```bash
npm run build
```

The static export is written to `out/` by Next.js.

## Add artwork

Place final artwork and process assets in the labeled folders under `public/artwork/`:

- `public/artwork/home/`
- `public/artwork/landscapes/`
- `public/artwork/not-yet/`
- `public/artwork/digital-atelier/`
- `public/artwork/watchers/`
- `public/artwork/mothers-despair/`
- `public/artwork/designed-space/`
- `public/artwork/material-studies/`
- `public/artwork/process/`
- `public/artwork/portrait/`

Use the filenames already referenced in `data/site.ts`, such as `home-hero.jpg`, `landscapes-hero.jpg`, `the-way-ive-grown-final-01.jpg`, `not-yet-video.mp4`, and `portrait.jpg`. If a file is missing, the website displays a dark labeled placeholder with the filename, recommended aspect ratio, and suggested image type.

## Replace project text

All project copy, metadata, image paths, contact details, and selected homepage projects live in `data/site.ts`. Edit that file to update titles, years, mediums, software, dimensions, descriptions, process text, reflections, credits, or artwork paths.

## Add projects

1. Add a new object to the `projects` array in `data/site.ts`.
2. Include a unique `slug`, metadata, `hero`, `gallery`, and `process` assets.
3. Add the slug to `selectedSlugs` if the project should appear on the homepage.
4. Add matching artwork files to the appropriate `public/artwork/` folder.

Project pages are generated automatically at `/work/[slug]/`.

## Update contact information

Edit the `contact` object in `data/site.ts`. The homepage footer, About page, and CV page use this shared contact data.

## Add the CV PDF

Place the file at:

```text
public/Matheus-Coutinho-da-Silva-CV.pdf
```

The CV page download link will point to that file automatically.

## Deployment notes for GitHub Pages

The project uses `output: 'export'`, unoptimized images, and trailing slashes in `next.config.mjs`, making it compatible with static hosting on GitHub Pages.
