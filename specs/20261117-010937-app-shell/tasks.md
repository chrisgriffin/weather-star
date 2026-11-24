# Tasks

## Setup

- [x] T001 Run the runnable line before any change: `npm run build` has no script, so it fails.
- [x] T002 `package.json`: add `dev` and `build`, and end `verify` with `npm run build`.
- [x] T003 `vite.config.ts`: `base: "./"` and `app/**/*.test.tsx` in the test include list.
- [x] T004 `tsconfig.json` includes `app`; `eslint.config.mjs` gives `app/**` the browser globals; `dist/` in `.gitignore`, `.prettierignore` and `.stylelintignore`.

## The shell

- [x] T005 `app/app.test.tsx`: the screen renders its heading and has no axe violation; run it and see it fail.
- [x] T006 `app/app.tsx` and `app/app.module.css`: the placeholder screen from `Card`, `Badge` and `--ws-*` tokens; T005 passes.
- [x] T007 `index.html`, `app/main.tsx` and `app/global.css`: the entry, the mount and the body styles.

## Deploy

- [x] T008 `.github/workflows/deploy-pages.yml`: build the app into `dist/` and the Storybook into `dist/storybook/`, upload `dist`.

## Surfaces

- [x] T009 `README.md`: what the app is today, `npm run dev` and `npm run build`, and the two published addresses.
- [x] T010 `docs/architecture.md`: an app on its own design system, a section for `app/`, the build and deploy, the extra `verify` step.
- [x] T011 `docs/testing.md`: eight `verify` steps, the Vitest include list, what the app's test covers.
- [x] T012 `docs/releasing.md`: the deploy publishes the app and the Storybook; the "template" sentence.
- [x] T013 `CLAUDE.md`: the opening line, the `dev` and `build` commands, the font couplings row naming `index.html`.
- [x] T014 `package.json` description: describes the app.
- [x] T015 `.storybook/preview-head.html`: the comment names the second copy of the font links in `index.html`.
- [x] T016 `deploy-pages.yml` shakedown: run its build steps locally and paste the output in the pull request body as a dry run.
- [x] T017 Cost: confirm no trigger, cron or job was added.
- [x] T018 Required check names: confirm `build / ci` and `storybook / ci` are unchanged.
- [x] T019 `npm run verify` exits 0 and the runnable line prints `1`.
