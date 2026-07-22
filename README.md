# Matheus Coutinho da Silva Portfolio

A dark, cinematic, editorial portfolio for MFA Visualization applications. The site is built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. It uses static project data only, with no database and no CMS.

## Install And Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build For Production

```bash
npm run build
```

The static export is written to:

```text
out/
```

## Deploy To GitHub Pages

This repository includes:

```text
.github/workflows/deploy-pages.yml
```

In GitHub, open:

```text
Settings -> Pages -> Build and deployment -> Source
```

Set the source to:

```text
GitHub Actions
```

Push to `main`. GitHub Actions will install dependencies, build the site, and publish the generated `out/` folder. The site is configured for GitHub Pages through `next.config.mjs` with `output: 'export'`, `images.unoptimized`, `trailingSlash`, and `public/.nojekyll`.

## Where To Edit Text And Project Data

Most editable portfolio content lives in:

```text
data/site.ts
```

Use this file to edit:

- project titles
- dates
- media
- software
- dimensions or duration
- short descriptions
- image and video paths
- credits
- collaborators
- selected homepage projects
- contact and social links
- the About introduction

The About page layout is in:

```text
app/about/page.tsx
```

The CV page layout is in:

```text
app/cv/page.tsx
```

## Artwork And Media Folders

Place final images and videos inside `public/artwork/`. All images should be `.png`.

The site intentionally shows a dark labeled placeholder when a referenced image or video is missing. The placeholder displays the missing filename, the recommended aspect ratio, and the suggested media type.

## Placeholder Reference Table

| Filename | Folder | Where It Appears | Recommended Aspect Ratio |
|---|---|---|---|
| `home-hero.png` | `public/artwork/home/` | Homepage hero background | `16:9` |
| `landscapes-hero.png` | `public/artwork/landscapes/` | Landscapes That Raised Me hero and project panels | `16:9` |
| `the-way-ive-grown-final-01.png` | `public/artwork/landscapes/` | The Way I've Grown page, Landscapes series, homepage/work panels | `16:9` |
| `depois-da-chuva-final-01.png` | `public/artwork/landscapes/` | Landscapes series | `16:9` |
| `na-casa-de-titia-final-01.png` | `public/artwork/landscapes/` | Landscapes series | `16:9` |
| `not-yet-poster.png` | `public/artwork/not-yet/` | Not Yet hero, video poster, final gallery | `16:9` |
| `not-yet-video.mp4` | `public/artwork/not-yet/` | Not Yet final video | `16:9` |
| `digital-atelier-interface.png` | `public/artwork/digital-atelier/` | Digital Atelier hero, final gallery, homepage/work panels | `16:9` |
| `digital-atelier-particles.png` | `public/artwork/digital-atelier/` | Digital Atelier final gallery | `16:9` |
| `digital-atelier-generative.png` | `public/artwork/digital-atelier/` | Digital Atelier final gallery | `16:9` |
| `watchers-final.png` | `public/artwork/watchers/` | The Watchers hero, final gallery, homepage/work panels | `4:5` |
| `mothers-despair-final.png` | `public/artwork/mothers-despair/` | A Mother's Despair hero, final gallery, homepage/work panels | `16:9` |
| `designed-space-exterior.png` | `public/artwork/designed-space/` | Designed Space hero, final gallery, homepage/work panels, walkthrough poster | `16:9` |
| `designed-space-interior.png` | `public/artwork/designed-space/` | Designed Space final gallery | `16:9` |
| `designed-space-plan.png` | `public/artwork/designed-space/` | Designed Space final gallery | `16:9` |
| `designed-space-walkthrough.mp4` | `public/artwork/designed-space/` | Designed Space final video | `16:9` |
| `material-studies-hero.png` | `public/artwork/material-studies/` | Material & Traditional Studies hero and project panels | `16:9` |
| `figure-drawing.png` | `public/artwork/material-studies/` | Material & Traditional Studies final gallery | `3:4` |
| `tree-study.png` | `public/artwork/material-studies/` | Material & Traditional Studies final gallery | `3:4` |
| `ceramic-object.png` | `public/artwork/material-studies/` | Material & Traditional Studies final gallery | `4:5` |
| `portrait.png` | `public/artwork/portrait/` | About page portrait | `4:5` |

## Replace Images

1. Export the artwork as `.png`.
2. Use the exact filename from the table unless you also update `data/site.ts`.
3. Place the file in the matching folder under `public/artwork/`.
4. Refresh the site. The placeholder will disappear when the file exists at the referenced path.

Example:

```text
public/artwork/home/home-hero.png
```

## Add Or Replace Videos

Videos should be `.mp4` files placed in the relevant `public/artwork/...` folder.

Video entries are defined in `data/site.ts` with the `video()` helper:

```ts
video(
  '/artwork/not-yet/not-yet-video.mp4',
  'not-yet-video.mp4',
  '/artwork/not-yet/not-yet-poster.png',
)
```

The third value is the poster image shown before playback. Use a `.png` poster with the same aspect ratio as the video.

## Edit A Project

Open `data/site.ts` and edit the matching object inside the `projects` array.

Common fields:

```ts
title: 'Not Yet',
year: '2026',
medium: 'Single-channel looping animation, sound',
software: 'Blender, FL Studio, Audition',
dimensions: '00:45',
summary: 'Short text used on project panels.',
description: 'Short project page description.',
credits: 'Animation, sound, and direction by Matheus Coutinho da Silva.',
collaborators: 'No additional collaborators listed.',
```

Use `hero` for the main project image and `gallery` for final images or videos.

## Add, Remove, Or Reorder Projects

To add a project:

1. Add a new object to the `projects` array in `data/site.ts`.
2. Give it a unique `slug`.
3. Add `hero`, `gallery`, credits, and collaborators.
4. Add matching media files to `public/artwork/`.
5. Add the slug to `selectedSlugs` if it should appear on the homepage.
6. Add the route to `public/sitemap.xml`.

To remove a project:

1. Remove its object from `projects`.
2. Remove its slug from `selectedSlugs`.
3. Remove its URL from `public/sitemap.xml`.

To reorder projects, reorder the objects in the `projects` array. This also changes previous/next navigation on project pages.

## Update The About Page

The main About introduction is `aboutIntro` in:

```text
data/site.ts
```

The visible About sections are in:

```text
app/about/page.tsx
```

The portrait file should be:

```text
public/artwork/portrait/portrait.png
```

## Update Contact And Social Links

Edit the `contact` object in:

```text
data/site.ts
```

The homepage footer, About page, and CV page use this shared contact data.

## Replace The CV PDF

Place the PDF here:

```text
public/Matheus-Coutinho-da-Silva-CV.pdf
```

The CV page download link already points to that filename.

## Change The Homepage Hero Slideshow

Replace:

```text
public/artwork/home/home-hero.png
```

Keep a cinematic horizontal crop. The recommended ratio is `16:9`, but the page uses `object-fit: cover`, so images will crop differently on desktop and mobile.

The homepage hero is a restrained slideshow. It starts with `home-hero.png`, then automatically adds every existing final `.png` image referenced in `data/site.ts`. Missing placeholder files are skipped in the slideshow so the homepage stays polished while you are still replacing artwork.

The hero text is edited in:

```text
app/page.tsx
data/site.ts
```

To control which artwork appears in the slideshow, edit project `hero`, `gallery`, and `series.images` entries in `data/site.ts`, then add the matching `.png` files under `public/artwork/`.

## Troubleshoot Missing Media

- Confirm the file is inside `public/artwork/`.
- Confirm the filename and extension match `data/site.ts` exactly.
- Use `.png` for images.
- Use `.mp4` for videos.
- Check capitalization. GitHub Pages is case-sensitive.
- Run `npm run build` before deploying.
- If a placeholder remains visible, copy the filename shown in the placeholder and make sure that exact file exists in the listed folder.
