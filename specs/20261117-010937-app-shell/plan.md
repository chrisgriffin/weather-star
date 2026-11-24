# Plan: Add the app shell and publish it beside the Storybook

## Technical context

- Vite, React and the React plugin are already installed for Storybook and Vitest, and `vite.config.ts` already loads the plugin. The app needs no new dependency.
- This branch is cut from `develop` with the design system branch (pull request #2) merged in, because `develop` holds only a README until that pull request merges.

## Design

- `index.html` at the repo root is Vite's entry. It carries the same two font links as `.storybook/preview-head.html` and loads `app/main.tsx`.
- `app/` holds the app: `main.tsx` (mounts React, imports `tokens/css/tokens.css` and `global.css`), `global.css` (the body's background, color and font, each a `--ws-*` token), `app.tsx` and `app.module.css` (the placeholder screen: a heading and a `Card` with a `Badge`), and `app.test.tsx`.
- `vite.config.ts` gains `base: "./"`, so the built page finds its files at any address, and `app/**/*.test.tsx` in the test include list. The build writes to Vite's default `dist/`.
- `package.json` gains `dev` (`vite`) and `build` (`vite build`), and `verify` ends with `npm run build`.
- `tsconfig.json` includes `app`; `eslint.config.mjs` gives `app/**` the browser globals; `dist/` joins `.gitignore`, `.prettierignore` and `.stylelintignore`.
- `deploy-pages.yml` builds the tokens, the app into `dist/` and the Storybook into `dist/storybook/`, and uploads `dist`.
- `app/` is not under `components/`, so design-delta does not ask it for a contract; Stylelint still holds its stylesheets to the tokens.

## Surfaces touched

- `README.md` — what the app is today, `npm run dev` and `npm run build`, and the two published addresses.
- `docs/architecture.md` — the "what it is" section describes an app on its own design system; a section for `app/`; the build and deploy; `verify` gains a step.
- `docs/testing.md` — `verify` is eight steps; Vitest collects `app/**/*.test.tsx`; what the app's test covers.
- `docs/releasing.md` — the deploy publishes the app and the Storybook; the "template" sentence.
- `CLAUDE.md` — the opening line, the `dev` and `build` commands, and a row in the couplings table: a font family in the tokens also changes the links in `index.html`.
- `package.json` description — describes the app.
- `.storybook/preview-head.html` comment — the font links now have a second copy in `index.html`; the comment names it.
- `.github/workflows/deploy-pages.yml` — a changed workflow; it runs only on a push to `main`, so its record is a dry run of its build steps, pasted in the pull request body.
- cost — none: no trigger, cron or job is added, and the deploy gains one `vite build` of a few seconds per release.
- required check names — none change: `build / ci` and `storybook / ci` keep their names.
