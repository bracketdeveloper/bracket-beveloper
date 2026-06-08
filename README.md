# Bracket Developer

A clean, responsive developer portfolio built with React and Vite. This repository contains a single-page portfolio application showcasing an engineer's skills, projects, experience, and contact information. The codebase is organized for clarity and easy updates so you can maintain content and extend features quickly.

## Table of Contents

- [Key Highlights](#key-highlights)
- [Contents and Structure](#contents-and-structure)
- [Installation](#installation)
- [Development Notes](#development-notes)
- [Styling](#styling)
- [Accessibility and Performance](#accessibility-and-performance)
- [Building and Deployment](#building-and-deployment)
- [How to Update Content](#how-to-update-content)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)
- [Author](#author)

## Key Highlights

- **Modern tech stack:** Vite, React, JSX, and plain CSS for fast builds and simple styling.
- **Component-driven:** UI split into focused components: `Navbar`, `Hero`, `About`, `Skills`, `Experience`, `Projects`, and `Contact` for easy maintenance and reuse.
- **Data-driven content:** Project, skills, and experience data are separated from components and stored under `src/data` for easy editing without touching presentational code.
- **Responsive design:** Mobile-first layout with attention to accessibility and readable typographic scale.

## Contents and Structure

Top-level files and important folders:

- `index.html` – Vite entry HTML.
- `package.json` – Project metadata and scripts.
- `vite.config.js` – Vite configuration.
- `public/` – Static assets served at build time.
- `src/` – Application source code and styles.
	- `main.jsx` – App bootstrap and root render.
	- `App.jsx` – Main app shell and route/section orchestration.
	- `index.css` – Global CSS variables and responsive rules.
	- `components/` – Reusable React components (About, Contact, Experience, Hero, Navbar, Projects, Skills).
	- `data/` – `projects.js`, `skills.js`, `experience.js` containing structured JSON-like arrays used by components.

## Installation

Prerequisites:

- Node.js (LTS 16+ recommended)
- npm or yarn

Install and run locally:

```bash
npm install
npm run dev
```

Common scripts in `package.json`:

- `dev` — starts the development server.
- `build` — bundles the app for production.
- `preview` — serves the production build locally for verification.

## Development Notes

- Components are intentionally small and focused. To add or edit content, prefer updating the data files in `src/data` rather than changing component markup.
- `Projects`: each entry typically includes `title`, `description`, `tech` (array), `link` (optional) and `image` (optional). Keep objects consistent to avoid rendering issues.
- `Skills`: represented as grouped arrays or objects (category + items). Use descriptive labels for each skill to preserve clarity.
- `Experience`: each item should include `company`, `role`, `range` (dates), and a short list of responsibilities or achievements.

## Styling

- Global variables and layout primitives are in `index.css`. Keep component-level styles small and semantic. The project uses a lightweight, maintainable CSS approach—no framework lock-in—so migrating to CSS Modules or a utility framework is straightforward.

## Accessibility and Performance

- Use semantic HTML elements inside components (headers, nav, main, section, footer) to improve screen-reader experience.
- Keep images optimized and prefer SVGs for icons.

## Building and Deployment

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Deployment recommendations:

- Deploy the production output to a static hosting provider such as Vercel, Netlify, or GitHub Pages.
- For Vercel/Netlify: connect the repository and set the build command to `npm run build` and the publish directory to `dist`.

## How to Update Content

- Projects: open `src/data/projects.js` and add or edit project objects. Components map over this array to render project cards.
- Skills: edit `src/data/skills.js` to update skill groups or individual skill entries.
- Experience: edit `src/data/experience.js` to add new roles or refine descriptions.

When making content updates, run the development server to verify layout and copy across breakpoints.

## Contribution

Contributions that improve documentation, accessibility, or add non-breaking UI enhancements are welcome. For substantial changes, open an issue first to discuss the approach.

Suggested workflow:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Make changes and run the dev server to verify.
4. Open a pull request describing your changes.

## License

This project is provided under the MIT License. Modify and redistribute according to the license terms.

## Contact

If you have questions or requests for customizing the portfolio (new sections, integrations, or deployment support), open an issue or reach out via the contact section in the app.

## Author

Mian Ammar Salar (Bracket Developer) [https://bracketdeveloper.com]

--
This README focuses on clear, maintainable structure and practical instructions for running, editing, and deploying the portfolio. If you want, I can also update `package.json` scripts, add a basic CONTRIBUTING.md`, or prepare a deployment configuration for Vercel or Netlify.
