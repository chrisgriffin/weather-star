// inlinePrimitives on its own, without running the build: the regexes that
// make only the semantic tier ship.
import assert from "node:assert/strict"
import { test } from "node:test"

import { inlinePrimitives } from "./inline-primitives.mjs"

const css = `:root {
  --ws-primitive-blue-500: rgb(0% 40% 100%);
  --ws-primitive-space-4: 1rem;
  --ws-color-fg-accent: var(--ws-primitive-blue-500);
  --ws-space-md: var(--ws-primitive-space-4);
}
`

test("a primitive reference becomes the primitive's value", () => {
  const out = inlinePrimitives(css)
  assert.match(out, /--ws-color-fg-accent: rgb\(0% 40% 100%\);/)
  assert.match(out, /--ws-space-md: 1rem;/)
  assert.doesNotMatch(out, /var\(/)
})

test("primitive declarations are gone from the output", () => {
  assert.doesNotMatch(inlinePrimitives(css), /--ws-primitive-/)
})

test("an undeclared primitive throws", () => {
  assert.throws(
    () => inlinePrimitives(":root {\n  --ws-x: var(--ws-primitive-nope);\n}\n"),
    /no primitive declares --ws-primitive-nope/,
  )
})

test("#23 a primitive aliasing another inlines to its final value", () => {
  const out = inlinePrimitives(`:root {
  --ws-primitive-a: #fff;
  --ws-primitive-b: var(--ws-primitive-a);
  --ws-primitive-c: var(--ws-primitive-b);
  --ws-x: var(--ws-primitive-b);
  --ws-y: var(--ws-primitive-c);
}
`)
  assert.match(out, /--ws-x: #fff;/)
  assert.match(out, /--ws-y: #fff;/)
  assert.doesNotMatch(out, /primitive/)
})

test("#23 a reference cycle between primitives throws, naming it", () => {
  assert.throws(
    () =>
      inlinePrimitives(`:root {
  --ws-primitive-a: var(--ws-primitive-b);
  --ws-primitive-b: var(--ws-primitive-a);
  --ws-x: var(--ws-primitive-a);
}
`),
    /primitive reference cycle: --ws-primitive-a -> --ws-primitive-b -> --ws-primitive-a/,
  )
})

test("#23 a primitive referencing itself throws", () => {
  assert.throws(
    () =>
      inlinePrimitives(
        ":root {\n  --ws-primitive-a: var(--ws-primitive-a);\n  --ws-x: var(--ws-primitive-a);\n}\n",
      ),
    /primitive reference cycle: --ws-primitive-a -> --ws-primitive-a/,
  )
})

test("#23 a cycle nothing references still throws", () => {
  assert.throws(
    () =>
      inlinePrimitives(`:root {
  --ws-primitive-a: var(--ws-primitive-b);
  --ws-primitive-b: var(--ws-primitive-a);
  --ws-x: #fff;
}
`),
    /primitive reference cycle: --ws-primitive-a -> --ws-primitive-b -> --ws-primitive-a/,
  )
})

test("#23 a reference with whitespace or a fallback is inlined", () => {
  const out = inlinePrimitives(`:root {
  --ws-primitive-a: #fff;
  --ws-primitive-b: var( --ws-primitive-a , red);
  --ws-x: var( --ws-primitive-a );
  --ws-y: var(--ws-primitive-a, red);
  --ws-z: var(--ws-primitive-a, rgb(0 0 0));
  --ws-w: VAR(--ws-primitive-b);
  --ws-v: calc(var(--ws-primitive-a,1px) + var(--ws-primitive-a));
}
`)
  assert.match(out, /--ws-x: #fff;/)
  assert.match(out, /--ws-y: #fff;/)
  assert.match(out, /--ws-z: #fff;/)
  assert.match(out, /--ws-w: #fff;/)
  assert.match(out, /--ws-v: calc\(#fff \+ #fff\);/)
  assert.doesNotMatch(out, /primitive|red|rgb/)
})

test("#23 a semantic name containing -primitive- is not a primitive", () => {
  const out = inlinePrimitives(`:root {
  --ws-button-primitive-look: #fff;
  --ws-x: var(--ws-button-primitive-look);
}
`)
  assert.match(out, /--ws-button-primitive-look: #fff;/)
  assert.match(out, /--ws-x: var\(--ws-button-primitive-look\);/)
})

test("#23 a primitive declared in two blocks throws", () => {
  assert.throws(
    () =>
      inlinePrimitives(`:root {
  --ws-primitive-a: #fff;
  --ws-x: var(--ws-primitive-a);
}

[data-theme="dark"] {
  --ws-primitive-a: #000;
}
`),
    /--ws-primitive-a is declared more than once/,
  )
})

test("#23 a primitive left in the output in any other form throws", () => {
  assert.throws(
    () =>
      inlinePrimitives(
        ':root {\n  --ws-primitive-a: #fff;\n  --ws-x: "--ws-primitive-a";\n}\n',
      ),
    /a primitive is left in the output/,
  )
  assert.throws(
    () => inlinePrimitives(":root { --ws-primitive-a: #fff; }\n"),
    /a primitive is left in the output/,
  )
})
