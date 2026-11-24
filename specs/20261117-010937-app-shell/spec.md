# Spec: Add the app shell and publish it beside the Storybook

**Issue**: [#3](https://github.com/chrisgriffin/weather-star/issues/3)

## Overview

weather-star has a design system and no app. This adds the app's shell: a page that Vite serves and builds, a placeholder screen made from the existing tokens and components, and a deploy that publishes the app at the site's root with the Storybook one level down. It also rewrites the passages that still describe the repo as a design system template, since it is now an app with its own design system.

The screens, the weather data and the retro theme are not part of this; each is its own spec.

## User scenarios

- A person clones the repo, runs `npm install` and `npm run dev`, and sees the placeholder screen in a browser.
- A person opens the published site and gets the app; the Storybook is at `storybook/` under the same address.
- A person opens a pull request that breaks the app's build, its types or its test, and the gate fails.

## Functional requirements

- FR-001: `npm run dev` serves the app and `npm run build` writes it to `dist/`.
- FR-002: The app's code lives in `app/`, is type-checked by `npm run typecheck`, linted by `npm run lint` and `npm run lint:styles`, and tested by `npm test`.
- FR-003: The placeholder screen is built from the existing components and `--ws-*` tokens, names the app in a top-level heading, and has no accessibility violation axe can find in jsdom.
- FR-004: `npm run verify` builds the app, so a broken build fails the gate.
- FR-005: The Pages deploy publishes the app at the site root and the Storybook under `storybook/`.
- FR-006: The built app loads from any base path, so it works at the Pages project address without a hard-coded repo name.
- FR-007: `CLAUDE.md`, `docs/architecture.md`, `docs/testing.md`, `docs/releasing.md`, the README and the `package.json` description describe the repo as an app on its own design system, name `app/`, and say where the app and the Storybook are published.

## Success criteria

- [x] **Runnable:** `npm run build:tokens && npm run build && grep -c "<div id=\"root\">" dist/index.html` prints `1` (there is no `build` script today, so it fails).
- [x] `npm run verify` exits 0 and includes the app's build, its type check and its test.
- [x] The app's test renders the placeholder screen, finds its heading and reports no axe violation.
- [x] `deploy-pages.yml` uploads one folder holding the app's `index.html` at its root and the Storybook's `index.html` under `storybook/`.
- [x] `CLAUDE.md`, `docs/architecture.md` and the `package.json` description no longer call the repo a template, and `docs/architecture.md` describes `app/`.

## Out of scope

- The weather screens, the data layer, the retro theme and choosing a location.
- A router: the shell is one page.
- Changing the three example components or their contracts.
