<div align="center">
  <img src="/docs/assets/themed-jss-long.svg" width="256" style="margin-top: -96px">
  <br><br>
  <h1>Dark Mode</h1>
</div>

<br>

Dark mode requires additional media queries and special classes (for manual dark mode setting).
Themed JSS handles all these automatically, you just need to specify property overrides for your
theme in dark mode:

```ts
import { theme } from 'themed-jss'

const myTheme = theme(
  {
    primary: 'blue',
    background: 'white',
    text: 'black'
  },
/*+*/  // dark mode overrides:
/*+*/  {
/*+*/    background: 'black',
/*+*/    text: 'white'
/*+*/  }
)
```

<br>

👉 With this theme, this style:

```js
style(theme => ({
  background: theme.primary,
  text: theme.background,
  border: `1px solid ${theme.primary}`

  [when(':hover')]: {
    background: 'transparent',
    text: theme.primary
  }
}))
```

Will be (roughly) compiled to this CSS:

```css
.scoped-0-0-1 {
  background: blue;
  text: white;
  border: 1px solid blue;
}

.scoped-0-0-1:hover {
  background: transparent;
  text: blue;
}

@media (prefers-color-scheme: dark) {
  .scoped-0-0-1 {
    text: black;
  }
}
```
<small>
<b>NOTE</b>: The actual generated CSS will also include some additional
classes for handling manual dark mode.
</small>

&nbsp;

☝️ When dark mode overrides are specified, Themed JSS will calculate each style in both dark mode and light mode.
It will then diff the styles, and add necessary media queries and styling rules for CSS properties that
do differ between light and dark mode.

---

# !darkmode

In [our previous example](#code3-l12:l16), the generated media query
will (incorrectly) override `color` style over specified `:hover` rule. Themed JSS did not include the `:hover` rule in the
media query as it did not have any properties that would differ between light and dark mode.

👉 Use`!darkmode` to enforce inclusion of a property in dark mode media queries:

```js
style(theme => ({
  background: theme.primary,
  text: theme.background,
  border: `1px solid ${theme.primary}`

  [when(':hover')]: {
    background: 'transparent',
/*!*/    text: `${theme.primary} !darkmode`
  }
}))
```

Now this (roughly) CSS will be generated:

```css
.scoped-0-0-1 {
  background: blue;
  text: white;
  border: 1px solid blue;
}

.scoped-0-0-1:hover {
  background: transparent;
  text: blue;
}

@media (prefers-color-scheme: dark) {
  .scoped-0-0-1 {
    text: black;
  }

/*+*/  .scoped-0-0-1:hover {
/*+*/    text: blue;
/*+*/  }
}
```

---

# Manual Control

Not all systems support dark mode settings, as a result it is crucial to not only rely on
media queries, but also provide the ability for users to override dark mode preference for your website.

👉 Initialize manual dark mode controls:
```js
import { DarkMode } from 'themed-jss/dark-mode'

DarkMode.initialize()
```
👉 Toggle dark mode settings:
```js
DarkMode.toggle()
```
👉 Set dark mode preference:
```js
import { DarkModeState } from 'themed-jss/dark-mode'

DarkMode.state().set(DarkModeState.Light)
DarkMode.state().set(DarkModeState.Dark)
```
👉 Read dark mode preference:
```js
DarkMode.state().get()
```
👉 Subscribe to dark mode settings:
```js
import { subscribe, pipe } from 'callbag-common'

pipe(
  DarkMode.state(),
  subscribe(state => {
    if (state === DarkModeState.Light) console.log('LIGHT MODE')
    else console.log('DARK MODE')
  })
)
```

> ☝️ `DarkMode` state will by default be set to system settings (i.e. matching media query).
> If it is toggled / set to something different, the state will be stored in local storage automatically.
> On next boot (`DarkMode.initialize()`), the local storage value will also be fetched.
>
> If the dark mode preference is switched back to what the system setting is, the local storage override
> will be deleted. This means if the user reverts back to system settings and then changes their system
> settings, dark mode state will also be updated automatically.

---

# Dark/Light Mode Specific Styles

👉 Use `inDarkMode()` for styles specific to dark mode, and `inLightMode()` for styles specific to light mode:

```js
import { inDarkMode, inLightMode } from 'themed-jss/dark-mode'

export default style(theme => ({
  background: theme.primary,
  text: theme.background,

  ...inDarkMode({
    borderColor: theme.card,
  }),

  ...inLightMode({
    borderColor: theme.text
  }),
}))
```

---

> :ToCPrevNext