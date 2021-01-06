<div align="center">

<img src="/themed-jss.svg" width="192">

<br>

# themed-jss

Themed styles with JSS + Dark Mode

[![tests](https://img.shields.io/github/workflow/status/loreanvictor/themed-jss/Test%20and%20Report%20Coverage?label=tests&logo=mocha&logoColor=green&style=flat-square)](https://github.com/loreanvictor/themed-jss/actions?query=workflow%3A%22Test+and+Report+Coverage%22)
[![coverage](https://img.shields.io/codecov/c/github/loreanvictor/themed-jss?logo=codecov&style=flat-square)](https://codecov.io/gh/loreanvictor/themed-jss)
[![version](https://img.shields.io/npm/v/themed-jss?logo=npm&style=flat-square)](https://www.npmjs.com/package/themed-jss)

</div>

<br>

```bash
npm i themed-jss
```

Features:
- Theme-based styling based on [JSS](https://cssinjs.org)
- Integrates with [`callbag-jsx`](#callbag-jsx) and [react](#react)
- [Can be used](#usage) with other frameworks or without any frameworks
- [Automatic dark mode support](#dark-mode)
- [Type safe](#type-safety)

<br><br>

# Usage

Create your styles based on a _theme_:

```ts
// styles.ts

import { style } from 'themed-jss'

export const btnStyle = style(theme => ({
  background: theme.primaryColor,
  color: theme.backgroundColor,

  borderRadius: 3,
  cursor: 'pointer',
  border: '2px solid transparent',
  padding: 8,
  fontSize: 14,

  '&:hover': {
    background: 'transparent',
    color: theme.primaryColor,
    border: `2px solid ${theme.primaryColor}`
  }
}))
```
Then use a theme object to add your styles to the document:
```ts
import { theme } from 'themed-jss'
import { btnStyle } from './styles'

const btn = document.getElementById('btn')

const myTheme = theme({
  primaryColor: '#00917c',
  backgroundColor: 'white',
  textColor: '#424242',
})

btn.classList.add(myTheme.class(btnStyle))
```
[►Playground](https://stackblitz.com/edit/themed-jss-demo-1?file=my-styles.ts)

<br>

👉 Global styles:
```ts
import { global } from 'themed-jss'

myTheme.add(global(theme => ({
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    background: theme.backgroundColor,
  }
})))
```
[►Playground](https://stackblitz.com/edit/themed-jss-demo-2?file=my-styles.ts)

<br><br>

## Dark Mode
Add some overrides to your theme for dark mode, `themed-jss` takes care of the rest automatically:
```ts
const myTheme = theme(
  {
    primaryColor: '#00917c',
    backgroundColor: '#fde8cd',
    textColor: '#424242',
  },
  // --> overrides for dark mode:
  {
    backgroundColor: '#0f3057',
    textColor: 'white',
  }
)
```
[►Playground](https://stackblitz.com/edit/themed-jss-demo-3?file=my-styles.ts)

<br>

👉 Dark mode by default is read from system settings. You can also assume manual control:

```ts
import { DarkMode } from 'themed-jss/dark-mode'

DarkMode.initialize()

// ...

btn.addEventListener('click', () => DarkMode.toggle())
```
[►Playground](https://stackblitz.com/edit/themed-jss-demo-3?file=my-styles.ts)

<br>

☝️ When you manually override dark mode settings, the preference is automatically stored in local storage and loaded on next page load (thats what `DarkMode.initialize()` does basically).

<br>

👉 `themed-jss` automatically injects additional CSS rules for properties that would change in dark mode. However, sometimes it is necessary
to enforce some CSS properties to appear in these dark-mode rules despite them not changing between dark and light mode, for example as it would
be superceded by some other rule otherwise. You can enforce CSS properties to be repeated in dark-mode rules by adding a `!darkmode` at the end of your
property value:

```ts
const btnStyle = style(theme => ({
  // ...
  '&:hover': {
    background: 'transparent !darkmode',
    color: `${theme.primaryColor} !darkmode`,
    border: `2px solid ${theme.primaryColor}`
  }
}))
```

<br><br>

## Callbag JSX

👉 Use `themePlug()` to plug themes into [`callbag-jsx`](https://loreanvictor.github.io/callbag-jsx/) renderers:

```tsx
import { makeRenderer } from 'callbag-jsx'
import { themePlug } from 'themed-jss/jsx'

const myTheme = theme({ ... })
const renderer = makeRenderer().plug(themePlug(myTheme))
```

Now components can use `this.theme` for accessing the theme:

```tsx
import { style } from 'themed-jss'
import { DarkMode } from 'themed-jss/dark-mode'


const BtnStyle = style(theme => ({ ... }))

export function MyBtn(_, renderer) {
  const cls = this.theme.class(BtnStyle)

  return (
    <button class={cls} onclick={() => DarkMode.toggle()}>
      Toggle Dark Mode
    </button>
  )
}
```
[►Playground](https://stackblitz.com/edit/callbag-jsx-themed-jss-demo?file=my-btn.tsx)

<br>

👉 `themePlug()` returns a [`ComponentProcessor`](https://loreanvictor.github.io/render-jsx/docs/usage/custom-renderers/custom-component-processors#custom-component-processors), so it can be used to plug themes into any [`render-jsx`](https://loreanvictor.github.io/render-jsx/) based renderers.

<br><br>

## React

👉 Use `<Themed/>` component and `useThemedStyle()` hook for utilizing themed styles in your components:
```jsx
// my-btn.jsx
import { useThemedStyle } from 'themed-jss/react'

const BtnStyle = style(theme => ({ ... }))

export function MyBtn() {
  const cls = useThemedStyle(BtnStyle)

  return (
    <button className={cls} onClick={() => DarkMode.toggle()}>
      Switch Dark Mode
    </button>
  )
}
```
```jsx
// app.jsx

import { theme } from 'themed-jss'
import { DarkMode } from 'themed-jss/dark-mode'
import { Themed } from 'themed-jss/react'

DarkMode.initialize()

const myTheme = theme({ ... })

export default function App() {
  return (
    <Themed theme={myTheme}>
      <MyBtn/>
    </Themed>
  )
}
```
[►Playground](https://stackblitz.com/edit/react-themed-jss?file=src%2FApp.js)

<br><br>

## Type Safety

👉 You can specify the theme object type that a `style()` would accept:

```ts
const myStyle = style<MyThemeType>(theme => ({
  // ...
}))
```

👉 You can specify the theme object type that a `theme()` object should produce:

```ts
const myTheme = theme<MyThemeType>({
  ...
})
```

👉 You can specify the `this` argument for `callbag-jsx` (in general `render-jsx`) components:

```tsx
import { ThemedComponentThis } from 'themed-jss/jsx'

// ...

function MyBtn(this: ThemedComponentThis, ...) {
   // ...
}
```

👉 You can even specify the theme type that a particular component will be expecting:

```tsx
import { ThemedComponentThis } from 'themed-jss/jsx'

// ...

function MyBtn(this: ThemedComponentThis<MyThemeType>, ...) {
   // ...
}
```

<br><br>

# Contribution

Be nice to each other. Here are some useful commands for development:

```bash
git clone https://github.com/loreanvictor/themed-jss.git
```
```bash
npm i              # --> installs dependencies
```
```bash
npm start          # --> servers `samples/index.tsx` on `localhost:3000`
```
```bash
npm test           # --> runs tests
```
```bash
npm run cov:view   # --> view coverage
```
