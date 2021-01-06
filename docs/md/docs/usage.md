<div align="center">
  <img src="/docs/assets/themed-jss-long.svg" width="256" style="margin-top: -96px">
  <br><br>
  <h1>Usage</h1>
</div>

<br>

👉 Define your styles as functions of a theme:

```js
import { style } from 'themed-jss'

const myStyle = style(theme => ({
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
const cssClass = myTheme.class(myStyle)
element.classList.add(cssClass)
```

---

# Nested Styling

---

# Media Queries

---

# Global Styles

---

# Animations

---

# Style References

---

> :ToCPrevNext