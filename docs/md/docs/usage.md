<div align="center">
  <img src="/docs/assets/themed-jss-long.svg" width="256" style="margin-top: -96px">
  <br><br>
  <h1>Usage</h1>
</div>

<br>

👉 Define your styles as functions of a theme:

```js
import { style } from 'themed-jss'

const buttonStyle = style(theme => ({
  background: theme.bg,
  color: theme.text,
  fontSize: 16,
  // ...
}))
```

👉 Create themes:

```js
import { theme } from 'themed-jss'

const myTheme = theme({
  bg: 'white',
  text: 'black'
})
```

👉 Use themes to get CSS classes:

```js
const cssClass = myTheme.class(buttonStyle)
element.classList.add(cssClass)
```

---

# Nested Styling

```js
import { style, when } from 'themed-jss'

const buttonStyle = style(theme => ({
  background: theme.bg,
  color: theme.text,
  fontSize: 16,

/*!*/  [when(':hover')]: {
/*!*/    background: theme.text,
/*!*/    color: theme.bg
/*!*/  }
}))
```

> :Buttons
> > :Button url=/docs/reference-helpers, label=Learn More


---

# Media Queries

```js
import { style } from 'themed-jss'

const buttonStyle = style(theme => ({
  background: theme.bg,
  color: theme.text,
  fontSize: 16,

/*!*/  '@media (min-width: 1024px)': {
/*!*/    width: '100%'
/*!*/  }
}))
```


---

# Global Styles

👉 Use `global()` to create global styles:

```ts
import { global } from 'themed-jss'

const myGlobalStyle = global(theme => ({
  body: {
    background: theme.bg,
    color: theme.text
  },

  a: {
    color: theme.primary
  }
}))
```

<br>

👉 Use `.add()` method on themes to add these styles:

```ts
myTheme.add(myGlobalStyle)
```

---

# Animation Keyframes

👉 Use `keyframes()` to create animation keyframes:

```js
import { keyframes } from 'themed-jss'

const myAnimation = keyframes(theme => ({
  from: {
    background: theme.text
  },
  to: {
    background: 'transparent'
  }
}))
```
<br>
👉 Use animations in other styles like this:

```js
const myStyle = style((theme, $) => ({
  color: theme.background,
  animation: $(myAnimation) + ' 1s infinite'
}))
```

---

# Style References

👉 Use [reference helpers](/docs/reference-helpers) in combination with `$` callback passed to your style function
to reference other styles:

```js
/*!*/import { parentIs } from 'themed-jss'

const styleA = style(() => ({ color: 'red' }))
const styleB = style((theme, $) => ({
  color: theme.error,
/*!*/  [parentIs($(styleA))]: {
/*!*/    color: theme.bg
/*!*/  }
}))
```
☝️ This means elements styled with `styleB` should have a color of `theme.bg` when their parent is styled with `styleA`.

> :Buttons
> > :Button label=Learn More, url=/docs/reference-helpers

---

> :ToCPrevNext