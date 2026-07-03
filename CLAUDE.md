# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — dev server at http://localhost:3000 (uses `--openssl-legacy-provider`)
- `npm run build` — production build to `build/`
- `npm test` — Jest in watch mode (react-scripts); run a single file with `npm test -- App.test.js`

Note: the serverless function in `api/` does not run under `npm start` — `/api/chat` only works when deployed to Vercel (or via `vercel dev`).

## Architecture

Create React App (not ejected) + Tailwind CSS, deployed on Vercel. `vercel.json` rewrites all non-`/api/` routes to `index.html` and disables the ESLint plugin during builds.

The app (`src/App.js`) composes three pieces:

- **`src/components/MainPortfolio.js`** — the entire portfolio page as one file. All content (roles, skills, experience, projects, education) lives in const arrays at the top of the file; edit those to change page content. Section components (Hero, About, Skills, etc.) follow below.
- **`src/components/ChatWidget.js`** — floating "Chat with my Resume" widget. It does client-side keyword retrieval over resume chunks (`retrieveContext` in `src/data/resumeKnowledge.js`), then POSTs `{ question, context }` to `/api/chat`.
- **`src/components/TerminalInterface.js`** — easter egg: a simulated terminal opened by the Konami code (↑↑↓↓←→←→BA), listener in `App.js`.

**`api/chat.js`** is a Vercel serverless function that calls Google Gemini (`gemini-1.5-flash`) with the retrieved resume context. Requires the `GEMINI_API_KEY` environment variable (set in Vercel, not in the repo). The RAG split is deliberate: retrieval happens in the browser, only generation happens server-side.

### Legacy files

`src/components/Portfolio.js`, `CyberSecurityPortfolio.js`, `ModelViewer.js`, and `src/ThemeContext.js` are from an earlier version and are not imported by `App.js`. Don't extend them; `MainPortfolio.js` is the live page.

## Content updates

Resume/portfolio content is duplicated in two places that should be kept in sync: the display arrays in `MainPortfolio.js` and the chat knowledge chunks in `src/data/resumeKnowledge.js` (each chunk has `keywords` used for retrieval scoring — update keywords when adding chunks).
