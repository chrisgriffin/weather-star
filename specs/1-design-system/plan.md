# Plan: Start the repo from a design system made by the create command

## Technical context

- The system was made by running the template's `cli/create.mjs` from its pull request branch, with no token and SSH disabled; its own gate and Storybook build passed in the created folder before anything was copied here.
- The created folder is a fresh git repository, and this repo already has a first commit, so the files were copied onto a branch cut from `develop`.

## Surfaces touched

- Every file in the repo but the README's first lines is the created system, unchanged.
- `.github/workflows/`: the created system's own stubs. `release-pr.yml` needs a `RELEASE_PR_TOKEN` secret this repo does not have; whether it fails or skips without one is not known until the first push to `develop`.
- No Routine, cron or Mac-installed file.
