# Spec: Start the repo from a design system made by the create command

**Issue**: [#1](https://github.com/chrisgriffin/weather-star/issues/1)

## Overview

weather-star is a browser weather app in the style of 1990s local cable forecasts. Before any screen exists, the repo needs its design system. This starts the repo from a system made by a design system template's `create` command, named `weather-star` with the `ws` prefix, so every later screen is built from tokens and contracted components.

## User scenarios

- A person clones the repo, runs `npm install` and `npm run verify`, and the gate passes.
- A person opens a pull request and CI runs the same gate.

## Functional requirements

- FR-001: The tree is what `create weather-star --prefix ws --owner chrisgriffin` wrote, with one change: the template's own `specs/` are left out.
- FR-002: The README opens by saying what weather-star is and that its screens are not built yet.

## Success criteria

- [x] The repo holds a design system made by the `create` command: DTCG tokens built to `--ws-*` custom properties, the three example components with contracts, Storybook and the design-delta gate.
- [x] `npm run verify` exits 0.
- [x] No file outside `node_modules` still carries the template's `--ads-` prefix or its name.
- [x] CI runs the gate on every pull request.
- [x] **Runnable:** `grep -c -- "--ws-" tokens/css/tokens.css` prints a number above 40 after `npm run build:tokens` (the repo holds only a README today).

## Out of scope

- The weather app's screens, its data and the retro theme: each is its own spec.
- Deploying the app.
