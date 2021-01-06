<div align="center">
  <img src="/docs/assets/themed-jss-long.svg" width="256" style="margin-top: -96px">
  <br><br>
  <h1>Callbag JSX</h1>
</div>

<br>

👉 Use `themePlug()` to plug your theme into your renderer:

```tsx
import { makeRenderer } from 'callbag-jsx'
import { themePlug } from 'themed-jss/jsx'
import { theme } from 'themed-jss'

const myTheme = theme(
  {
    background: 'white',
    text: 'black',
    primary: 'blue',
  },
  {
    background: 'black',
    text: 'white',
  }
)

/*!*/const renderer = makeRenderer().plug(themePlug(myTheme))
renderer.render(
  <>
    ...
  </>
).on(document.body)
```

<br>

👉 Now use `this.theme` in components to access theme:

```tsx
import { style } from 'themed-style'

const BtnStyle = style(theme => ({
  background: theme.primary,
  color: theme.background,
  borderRadius: 3,
  border: `2px solid ${theme.primary}`,
  cursor: 'pointer',

  '&:hover': {
    background: 'transparent',
    color: `${theme.primary} !darkmode`,
  }
}))

export function Btn(_, renderer) {
/*!*/  const cls = this.theme.class(BtnStyle)

  return (
    <button class={cls}>Click Me!</button>
  )
}
```

---

# Render JSX

The `themePlug()` function returns a generic [Component Processor](https://loreanvictor.github.io/render-jsx/docs/usage/custom-renderers/custom-component-processors#custom-component-processors). This means it can be used to plug in themes into any
[renderer](https://loreanvictor.github.io/render-jsx/docs/usage/custom-renderers/core-concepts#core-concepts)
from [Render JSX](https://loreanvictor.github.io/render-jsx/):

```tsx
import { CommonDOMRenderer } from 'render-jsx/dom'
import { themePlug } from 'themed-jss/jsx'

const myTheme = theme(...)

const renderer = new CommonDOMRenderer().plug(themePlug(myTheme))
```

---

> :ToCPrevNext