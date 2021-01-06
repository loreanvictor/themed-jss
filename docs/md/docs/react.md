<div align="center">
  <img src="/docs/assets/themed-jss-long.svg" width="256" style="margin-top: -96px">
  <br><br>
  <h1>React</h1>
</div>

<br>

> `React@16.8` upwards is required for Themed JSS integration.

<br><br>

👉 Define your theme and provide it in the context using `<Themed/>` component:

```jsx | app.jsx
import { theme } from 'themed-jss'
import { Themed } from 'themed-jss/react'

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

export function App() {
  return (
/*!*/    <Themed theme={myTheme}>
/*!*/      ...
/*!*/    </Theme>
  )
}
```

<br>

👉 Your components can use themed styles using `useThemedStyle()` hook:

```jsx
import { style } from 'themed-jss'
import { useThemedStyle } from 'themed-jss/react'

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

export function Btn() {
/*!*/  const cls = useThemedStyle(BtnStyle)

  return (
    <button className={cls}>Click Me!</button>
  )
}
```

> ⚠️ If theme is not provided in context using `<Themed/>`, then `useThemedStyle` component will return `undefined`.

---

## Accessing Theme

👉 Use `useTheme()` hook to access the theme directly inside your components:

```jsx
import { useTheme } from 'themed-jss/react'
import { global } from 'themed-jss'

const someGlobalStyle = global(theme => (...))

function MyComponent() {
  const theme = useTheme()
  theme.add(someGlobalStyle)

  return (
    <>
      ...
    </>
  )
}
```

---

> :ToCPrevNext