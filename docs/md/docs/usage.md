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
import { style } from 'themed-jss'

const buttonStyle = style(theme => ({
  background: theme.bg,
  color: theme.text,
  fontSize: 16,

/*!*/  '&:hover': {
/*!*/    background: theme.text,
/*!*/    color: theme.bg
/*!*/  }
}))
```

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

const myAnimation = 

---

# Style References

---

> :ToCPrevNext