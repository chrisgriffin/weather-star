// @vitest-environment node

import { readFileSync } from "node:fs"
import { expect, test } from "vitest"

/**
 * Holds the rule that GitHub requests Chris's review on every pull request:
 * `.github/CODEOWNERS` gives `*` to `@chrisgriffin`, and no narrower rule
 * hands a path to someone else. The last matching rule wins on GitHub, so one
 * later line without him would take those paths out of his inbox.
 */
const OWNER = "@chrisgriffin"

const rules = readFileSync(
  new URL("../.github/CODEOWNERS", import.meta.url),
  "utf8",
)
  .split("\n")
  .map(line => line.replace(/#.*/, "").trim())
  .filter(Boolean)
  .map(line => line.split(/\s+/))

test(`CODEOWNERS gives every path to ${OWNER}`, () => {
  expect(rules.map(([pattern]) => pattern)).toContain("*")
  for (const [pattern, ...owners] of rules) {
    expect(owners, `owners of ${pattern}`).toContain(OWNER)
  }
})
