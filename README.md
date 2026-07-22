# Matheus Coutinho da Silva Portfolio

A dark, cinematic, editorial portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The site uses static project data only. There is no database or CMS.

## Run Locally

```bash
npm install
npm run dev
```

Preview locally:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

The static export is generated in:

```text
out/
```

## Deploy To GitHub Pages

GitHub Pages deployment is handled by:

```text
.github/workflows/deploy-pages.yml
```

In GitHub, set:

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

Then push to `main`. The workflow builds the static site and deploys the generated `out/` folder.

## Main Editing File

All project data is stored in:

```text
data/site.ts
```

Edit this file to change:

- project category
- project title
- date
- medium
- software
- dimensions or duration
- short description
- image filenames
- credits
- collaborators
- homepage selected projects
- contact links
- About page introduction

## Artwork Categories

Projects are currently divided into three categories:

1. Horror
2. Concept Art
3. Environment Design

The category folders are:

```text
public/artwork/horror/
public/artwork/concept-art/
public/artwork/environment-design/
```

Each project has exactly three final PNG image slots. Image `01` is also used as the project hero image.

## Project Image Table

| Category | Project | Folder | Required PNG filenames |
|---|---|---|---|
| Horror | Not Yet | `public/artwork/horror/` | `not-yet-01.png`, `not-yet-02.png`, `not-yet-03.png` |
| Horror | The Watchers | `public/artwork/horror/` | `the-watchers-01.png`, `the-watchers-02.png`, `the-watchers-03.png` |
| Horror | A Mother's Despair | `public/artwork/horror/` | `a-mothers-despair-01.png`, `a-mothers-despair-02.png`, `a-mothers-despair-03.png` |
| Concept Art | Digital Atelier | `public/artwork/concept-art/` | `digital-atelier-01.png`, `digital-atelier-02.png`, `digital-atelier-03.png` |
| Concept Art | Material & Traditional Studies | `public/artwork/concept-art/` | `material-traditional-studies-01.png`, `material-traditional-studies-02.png`, `material-traditional-studies-03.png` |
| Environment Design | Landscapes That Raised Me | `public/artwork/environment-design/` | `landscapes-that-raised-me-01.png`, `landscapes-that-raised-me-02.png`, `landscapes-that-raised-me-03.png` |
| Environment Design | The Way I've Grown | `public/artwork/environment-design/` | `the-way-ive-grown-01.png`, `the-way-ive-grown-02.png`, `the-way-ive-grown-03.png` |
| Environment Design | Designed Space | `public/artwork/environment-design/` | `designed-space-01.png`, `designed-space-02.png`, `designed-space-03.png` |

Recommended ratio for the current project images:

```text
16:9
```

The site uses `object-fit: cover`, so images may crop differently on desktop and mobile.

## How To Add Images To A Project

1. Export each artwork image as `.png`.
2. Create three files for the project using the exact filenames in the table.
3. Put the files in the correct category folder.
4. Refresh the site preview.

Example for `The Watchers`:

```text
public/artwork/horror/the-watchers-01.png
public/artwork/horror/the-watchers-02.png
public/artwork/horror/the-watchers-03.png
```

The first image appears as:

- the project hero
- the Work page project panel
- one slide in the homepage carousel

All three images appear in the project page's `Final Work` section and in the homepage carousel.

## Missing Image Placeholders

If an image is missing, the site displays a dark placeholder with:

- missing filename
- recommended aspect ratio
- suggested media type

To fix a placeholder, add the exact file shown in the placeholder to the correct folder.

GitHub Pages is case-sensitive, so this matters:

```text
the-watchers-01.png
```

is not the same as:

```text
The-Watchers-01.png
```

## Homepage Hero Carousel

The homepage hero starts with:

```text
public/artwork/home/home-hero.png
```

Then it rotates through every project image referenced in `data/site.ts`.

To change the first hero image, replace:

```text
public/artwork/home/home-hero.png
```

To change the project slides, replace the three PNGs for each project in the category folders.

## Change A Project Category

Open `data/site.ts` and edit the `category` field:

```ts
category: 'Horror',
```

Allowed values:

```ts
'Horror'
'Concept Art'
'Environment Design'
```

The Work page groups projects automatically by this value.

## Add A New Project

1. Add a new object to the `projects` array in `data/site.ts`.
2. Choose one of the three category values.
3. Create three PNG paths with the `projectImages()` helper.
4. Use image `01` as the hero.
5. Add the project slug to `selectedSlugs` if it should appear on the homepage.
6. Add the project URL to `public/sitemap.xml`.

Pattern:

```ts
const newProjectImages = projectImages(
  'horror',
  'new-project-slug',
  'horror final image',
);
```

Then add files:

```text
public/artwork/horror/new-project-slug-01.png
public/artwork/horror/new-project-slug-02.png
public/artwork/horror/new-project-slug-03.png
```

## Remove Or Reorder Projects

To remove a project:

1. Remove its object from `projects`.
2. Remove its slug from `selectedSlugs`.
3. Remove its URL from `public/sitemap.xml`.

To reorder projects, reorder the objects in the `projects` array. Previous/next navigation follows this order.

## Update About

The About introduction is:

```text
data/site.ts -> aboutIntro
```

The About page layout is:

```text
app/about/page.tsx
```

The portrait image path is:

```text
public/artwork/portrait/portrait.png
```

## Update Contact And Social Links

Edit:

```text
data/site.ts -> contact
```

The homepage footer, About page, and CV page use this shared contact data.

## Replace The CV PDF

Add the PDF here:

```text
public/Matheus-Coutinho-da-Silva-CV.pdf
```

The CV page shows a placeholder label until that file exists.

## Troubleshooting

- Run `npm run dev` and open `http://localhost:3000`.
- Make sure each image is `.png`.
- Make sure the filename exactly matches `data/site.ts`.
- Make sure the file is in the correct category folder.
- Run `npm run build` before deploying.
- If GitHub Pages shows the README instead of the site, confirm Pages is set to `GitHub Actions`.
