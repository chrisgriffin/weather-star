import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import { expectNoViolations } from "../test-utils/axe"
import { App } from "./app"

test("the placeholder screen names the app in a top-level heading", () => {
  render(<App />)
  expect(
    screen.getByRole("heading", { level: 1, name: "weather-star" }),
  ).toBeInTheDocument()
  expect(screen.getByRole("main")).toHaveClass("screen")
})

test("the placeholder screen has no accessibility violations", async () => {
  const { container } = render(<App />)
  await expectNoViolations(container)
})
