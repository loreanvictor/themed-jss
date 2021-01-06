<div align="center">
  <img src="/docs/assets/themed-jss-long.svg" width="256" style="margin-top: -96px">
  <br><br>
  <h1 skip-title>themed-jss</h1>
  <p>Framework agnostic CSS in JS with themes & automatic Dark Mode</p>
</div>


```bash
npm i themed-jss
```

---

Themed JSS is a wrapper around [JSS](https://cssinjs.org) which provides theming support. You define
your styles as functions of a _theme_, and then plug the _theme_ to get scoped CSS classes.

<br>

# Features

- Power of JSS: nested rules, media queries, etc.
- Integration with [React](https://reactjs.org/) & [Callbag JSX](https://loreanvictor.github.io/callbag-jsx/)
- Can be used with other frameworks or without any frameworks
- Automatic Dark Mode support
- Programmatic Dark Mode override
- Type Safe

---

# Overview

👉 Create your theme-based styles (e.g. for each component):

```ts | styles.ts
import { style } from 'themed-jss'

export const BtnStyle = style(theme => ({
  background: theme.primaryColor,
  color: theme.backgroundColor,
  // ...

  '&:hover': {
    background: 'transparent',
    color: `${theme.primaryColor} !darkmode`,
    // ...
  }
}))
```

<br>

👉 Define your theme (application wide):

```ts | theme.ts
import { theme } from 'themed-jss'

export const myTheme = theme(
  // light mode properties:
  {
    primaryColor: '#00917c',
    backgroundColor: '#fde8cd',
    textColor: '#424242',
  },
  // dark mode overrides:
  {
    backgroundColor: '#0f3057',
    textColor: 'white',
  }
)
```

<br>

👉 Apply your themed classes to elements:

```ts | index.ts
import { BtnStyle } from './styles'
import { myTheme } from './theme'

const btn = document.getElementById('btn')
/*!*/btn.classList.add(myTheme.class(BtnStyle))
```

> :Buttons
> > :Button label=Learn More, url=/usage
>
> > :Button label=Playground, url=https://stackblitz.com/edit/themed-jss-demo-3?file=styles.ts

---

# React

👉 Use `useThemedStyle()` hook to consume themed styles in your components:

```jsx
import { useThemedStyle } from 'themed-jss/react'
import { BtnStyle } from './styles'

export default () => {
/*!*/  const buttonClass = useThemedStyle(BtnStyle)
/*!*/  return (
/*!*/    <button className={buttonClass}>Click Me!</button>
/*!*/  )
}
```

<br>

👉 Use `<Themed/>` component for applying a theme in your app:

```jsx
import { Themed } from 'themed-jss/react'
import { myTheme } from './theme'


export function App() {
  return (
    <Themed theme={myTheme}>
      ...
    </Themed>
  )
}
```

> :Buttons
> > :Button label=Learn More, url=/react
>
> > :Button label=Playground, url=https://stackblitz.com/edit/react-themed-jss?file=src%2FApp.js

---

# Callbag JSX

👉 Use `themePlug()` to plug a theme into your renderer:

```tsx
import { makeRenderer } from 'callbag-jsx'
import { themePlug } from 'themed-jss/jsx'

import { myTheme } from './theme'

/*!*/const renderer = makeRenderer().plug(themePlug(myTheme))
```

👉 Now access the theme in your components:

```tsx
import { BtnStyle } from './tyles'

function MyBtn(_, renderer) {
/*!*/  const buttonClass = this.theme.class(BtnStyle)
/*!*/  return <button class={buttonClass}>Click Me!</button>
}
```

> :Buttons
> > :Button label=Learn More, url=/jsx
>
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-themed-jss-demo?file=my-btn.tsx

---

# Dark Mode

Dark mode styles are automatically added when you specify dark mode overrides in your theme. This theme
won't have dark mode support:
```ts
/*~warn~*/export const myTheme = theme(
  {
    primaryColor: '#00917c',
    backgroundColor: '#fde8cd',
    textColor: '#424242',
  }
)/*~warn~*/
```
But this theme will automatically get all additional CSS rules for dark mode support:
```ts
export const myTheme = theme(
  // light mode properties:
  {
    primaryColor: '#00917c',
    backgroundColor: '#fde8cd',
    textColor: '#424242',
  },
  // dark mode overrides:
  {
    backgroundColor: '#0f3057',
    textColor: 'white',
  }
)
```

<br>

👉 Dark mode is by default read from system settings. You can manually override dark mode preferences
using manual dark mode control:

```js
import { DarkMode } from 'themed-jss/dark-mode'

DarkMode.initialize()   // --> run this at the start of your app for manual dark mode control

DarkMode.toggle()       // --> toggles dark mode preference
```

> :Buttons
> > :Button label=Learn More, url=/dark-mode

---

> :ToCPrevNext