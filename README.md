# Portfolio

An editorial portfolio built around a single idea: **time**. A 3D clock (React Three Fiber) sits beside the page and its hands advance as you scroll — 12:00 at the top, a full turn by the contact section. Sections are marked as hours on the dial: About (03:00), Work (06:00), Experience (09:00), Contact (12:00).

## Run it

```bash
npm install
npm run dev
```

## Make it yours

All copy lives in [`src/content.js`](src/content.js): your name, intro, about text, projects, experience, toolkit and contact links. Anything labelled *Placeholder* is meant to be replaced.

- **Project images**: drop files in `public/work/` and set `image: '/work/your-file.jpg'` on a project. Without an image, a generated cover in the project's `color` is used.
- **Project links**: set `link` to show a "Visit project" button in the case study.
- **Clock time zone**: `site.timezone` (defaults to the visitor's own zone).

## Structure

```
src/
  content.js            all site copy
  components3d/         Scene (canvas, lights) and Clock (the 3D object)
  ui/                   Nav, Hero, About, Work, CaseStudy, Experience, Contact
  hooks/                scroll → clock progress, live time
  utils/audio.js        optional tick sound (off by default)
```
