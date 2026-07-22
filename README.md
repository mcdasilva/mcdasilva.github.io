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
- contact information
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

Each project has its own folder inside one of those category folders. Add as many `.png` images as the project needs. The site automatically reads every `.png` file in that folder, sorted by filename.

The first sorted image is used as:

- the project hero
- the Work page project panel
- one slide in the homepage carousel

Every `.png` in the folder appears in the project page's `Final Work` section. If a project folder has no PNGs yet, the site shows one dark placeholder for that project instead of several fake missing image slots.

## Project Image Table

| Category | Project | Project folder | Suggested PNG naming |
|---|---|---|---|
| Horror | The Watchers | `public/artwork/horror/the-watchers/` | `the-watchers-01.png`, `the-watchers-02.png`, etc. |
| Horror | Masquerade | `public/artwork/horror/masquerade/` | `masquerade-01.png`, `masquerade-02.png`, etc. |
| Horror | A Mother's Despair | `public/artwork/horror/a-mothers-despair/` | `a-mothers-despair-01.png`, `a-mothers-despair-02.png`, etc. |
| Concept Art | It's Time to Go | `public/artwork/concept-art/its-time-to-go/` | `its-time-to-go-01.png`, `its-time-to-go-02.png`, etc. |
| Concept Art | Vigil | `public/artwork/concept-art/vigil/` | `vigil-01.png`, `vigil-02.png`, etc. |
| Concept Art | Not Yet | `public/artwork/concept-art/not-yet/` | `not-yet-01.png`, `not-yet-02.png`, etc. |
| Concept Art | Unbound | `public/artwork/concept-art/unbound/` | `unbound-01.png`, `unbound-02.png`, etc. |
| Environment Design | The Way I've Grown | `public/artwork/environment-design/the-way-ive-grown/` | `the-way-ive-grown-01.png`, `the-way-ive-grown-02.png`, etc. |
| Environment Design | Na Casa de Titia (At Auntie's House) | `public/artwork/environment-design/na-casa-de-titia/` | `na-casa-de-titia-01.png`, `na-casa-de-titia-02.png`, etc. |
| Environment Design | Depois da Chuva (After the Rain) | `public/artwork/environment-design/depois-da-chuva/` | `depois-da-chuva-01.png`, `depois-da-chuva-02.png`, etc. |

Recommended ratio for the current project images:

```text
16:9
```

The site uses `object-fit: cover`, so images may crop differently on desktop and mobile.

## How To Add Images To A Project

1. Export each artwork image as `.png`.
2. Put the files inside that project's folder.
3. Use filenames that sort in the order you want them displayed.
4. Refresh the site preview.

Example for `The Watchers`:

```text
public/artwork/horror/the-watchers/the-watchers-01.png
public/artwork/horror/the-watchers/the-watchers-02.png
public/artwork/horror/the-watchers/the-watchers-03.png
public/artwork/horror/the-watchers/the-watchers-04.png
```

If a project only has two final images, add only two PNG files. If it has twelve, add twelve. The website will match the folder contents.

## Missing Image Placeholders

If an image is missing, the site displays a dark placeholder with:

- missing filename
- recommended aspect ratio
- suggested media type

To fix a placeholder, add one or more `.png` files to that project's folder.

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

To change the project slides, add, remove, or reorder PNG files inside the project folders.

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
3. Create a new project folder under the matching category folder.
4. Use the `projectImages()` helper with that folder path.
5. Add the project slug to `selectedSlugs` if it should appear on the homepage.
6. Add the project URL to `public/sitemap.xml`.

Pattern:

```ts
const newProjectImages = projectImages(
  'horror/new-project-slug',
  'new-project-slug',
  'horror final image',
);
```

Then add files:

```text
public/artwork/horror/new-project-slug/new-project-slug-01.png
public/artwork/horror/new-project-slug/new-project-slug-02.png
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

## Update Contact Information

Edit:

```text
data/site.ts -> contact
```

The homepage footer, About page, and CV page use this shared contact data. Instagram and other social handles are not displayed by default.

## Replace The CV PDF

Add the PDF here:

```text
public/Matheus-Coutinho-da-Silva-CV.pdf
```

The CV page shows a placeholder label until that file exists.

## Troubleshooting

- Run `npm run dev` and open `http://localhost:3000`.
- Make sure each image is `.png`.
- Make sure the image is inside the correct project folder.
- Use `01`, `02`, `03`, etc. in filenames if you want precise display order.
- Run `npm run build` before deploying.
- If GitHub Pages shows the README instead of the site, confirm Pages is set to `GitHub Actions`.
