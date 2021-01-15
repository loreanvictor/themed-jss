<div align="center">
  <img src="/docs/assets/themed-jss-long.svg" width="256" style="margin-top: -96px">
  <br><br>
  <h1>Reference Helpers</h1>
</div>

<br>

Reference helpers help with nested styles and referncing other styles:

```js
import { style, when } from 'themed-jss'

const styleA = style((theme, $) => ({
  // ...

/*!*/  [when(':hover')]: {
/*!*/    color: 'red'
/*!*/  }
}))
```
☝️ Color of elements styled with `styleA` is red when they are hovered.

<br>

```js
import { style, parentIs } from 'themed-jss'

const styleA = style((theme, $) => ({
  // ...

/*!*/  [parentIs($(styleB))]: {
/*!*/    marginLeft: 32
/*!*/  }
}))
```
☝️ elements styled with `styleA` will have margin when their parent element is styled with `styleB`.

<br>

```js
import { style, descendant, not, when } from 'themed-jss'

const styleA = style((theme, $) => ({
  // ...

/*!*/  [when(not(':hover'))]: {
/*!*/    [descendant('input', $(styleB), ':disabled')]: {
/*!*/      background: 'gray'
/*!*/    }
/*!*/  }
}))
```
☝️ When element is not hovered, descendants that are inputs, styled with `styleB` and are disabled will
have a gray background.

<br>

> You can also use [JSS's nested rule for self-referencing](https://cssinjs.org/jss-plugin-nested/?v=v10.5.0#use--to-reference-selector-of-the-parent-rule) to reference the parent rule. For example, the last example
> can be written as follows, without use of reference helpers:
> ```js
> const styleA = style((theme, $) => ({
>   // ...
> 
> /*!*/  [`&:not(:hover) input${styleB}:disabled`]: {
> /*!*/    background: 'gray'
> /*!*/  }
> }))
> ```

---

# Self-Matching Helpers

The following helpers match _self_ (the element having the style) when other elements have specified styles / rules.

<br>

## `when()`
👉 Matches self when also has specified styles / rules:
```js
[when($(styleX), not($(styleY)), ':hover')]: { ... }
```
```scss
/* sass equivalent */
&.class-of-styleX:not(.class-of-styleY):hover { ... }
```
<br>

## `ancestorIs()`
👉 Matches self when there is an ancestor with given styles / rules
```js
[ancestorIs($(styleA))]: { ... }
```
```scss
/* sass equivalent */
.class-of-styleA & { ... }
```

<br>

## `parentIs()`
👉 Matches self when parent (immediate ancestor) has given styles / rules
```js
[parentIs('div', $(styleA))]: { ... }
```
```scss
/* sass equivalent */
.class-of-styleA>& { ... }
```

<br>

## `precedingIs()`
👉 Matches self when the some preceding element has given styles / rules
```js
[precedingIs($(styleA), ':focus')]: { ... }
```
```scss
/* sass equivalent */
.class-of-styleA~& { ... }
```

<br>

## `previousIs()`
👉 Matches self when the (immediately) previous element has given styles / rules
```js
[previousIs('input', $(styleA), not('[type="text"]'))]: { ... }
```
```scss
/* sass equivalent */
.class-of-styleA+& { ... }
```

<br>

---

# Other-Matching Helpers

The following helpers match other elements in relation _self_.

<br>

## `descendant()`
👉 Matches a descendant with given styles / rules
```js
[descendant($(styleA))]: { ... }
```
```scss
/* sass equivalent */
& .class-of-styleA { ... }
```

<br>

## `child()`
👉 Matches a child (immediate descendant) with given styles / rules
```js
[child($(styleA), ':last-child')]: { ... }
```
```scss
/* sass equivalent */
&>.class-of-styleA { ... }
```

<br>

## `succeeding()`
👉 Matches an element that comes after _self_ with given styles / rules
```js
[succeeding($(styleA), not(':hover'))]: { ... }
```
```scss
/* sass equivalent */
&~.class-of-styleA { ... }
```

<br>

## `next()`
👉 Matches the element coming immediately after _self_ with given styles / rules
```js
[next($(styleA), not(':disabled'))]: { ... }
```
```scss
/* sass equivalent */
&+.class-of-styleA { ... }
```

<br>

---

# Generic Helpers

## `combined()`

👉 Matches elements with all of given styles / rules:

```js
[combined($(styleA), $(styleB), not(':disabled'), ':hover')]: { ... }
```
```scss
/* sass equivalent */
.class-of-styleA.class-of-styleB:not(:disabled):hover { ... }
```

<br>

## `either()`

👉 Matches elements with any one of given styles / rules:

```js
[either(
  $(styleA),
  combined($(styleB), not(':disabled'))
)]: { ... }
```
```scss
/* sass equivalent */
.class-of-styleA,
.class-of-styleB:not(:disabled) { ... }
```

---

> :ToCPrevNext