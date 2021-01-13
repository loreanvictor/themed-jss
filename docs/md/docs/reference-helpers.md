<div align="center">
  <img src="/docs/assets/themed-jss-long.svg" width="256" style="margin-top: -96px">
  <br><br>
  <h1>Reference Helpers</h1>
</div>

<br>

Sometimes styles need to reference each other. For example an element styled with `styleA` might
need to look a bit different when it is appended to an element styled with `styleB`:

```js
const styleA = style((theme, $) => ({
  // ...

/*!*/  [$(styleB) + ' &']: {
/*!*/    // --> additional styles here
/*!*/    // ...
/*!*/  }
}))
```

This syntax can get pretty complicated quickly:

```js
const styleA = style((theme, $) => ({
  // ...

  [`${$(styleB)}.some-other-class:not(${$(styleC)}) &`]: {
    // --> additional styles here
    // ...
  }
}))
```

<br>

👉 Use reference helpers to increase readability of these style references:

```js
/*!*/import { ancestorIs, not } from 'themed-jss'

const styleA = style((theme, $) => ({
  // ...

  [ancestorIs(
    $(styleB),
    '.some-other-class',
    not($(styleC))
  )]: {
    // --> additional styles here
    // ...
  }
}))
```

---

# Self-Matching Helpers

The following helpers match _self_ (the element having the style) when other elements have specified styles / rules.

<br>

## `also()`
👉 Matches self when also has specified styles / rules:
```js
also($(styleX), not($(styleY)), ':hover')
```
<br>

## `ancestorIs()`
👉 Matches self when there is an ancestor with given styles / rules
```js
ancestorIs($(styleA))
```
<br>

## `parentIs()`
👉 Matches self when parent (immediate ancestor) has given styles / rules
```js
parentIs('div', $(styleA))
```

<br>

## `precedingIs()`
👉 Matches self when the some preceding element has given styles / rules
```js
precedingIs($(styleA), ':focus')
```
<br>

## `previousIs()`
👉 Matches self when the (immediately) previous element has given styles / rules
```js
previousIs('input', $(styleA), not('[type="text"]'))
```
<br>

---

# Other-Matching Helpers

The following helpers match other elements in relation _self_.

<br>

## `descendant()`
👉 Matches a descendant with given styles / rules
```js
descendant($(styleA))
```
<br>

## `child()`
👉 Matches a child (immediate descendant) with given styles / rules
```js
child($(styleA), ':last-child')
```
<br>

## `succeeding()`
👉 Matches an element that comes after _self_ with given styles / rules
```js
succeeding($(styleA), not(':hover'))
```
<br>

## `next()`
👉 Matches the element coming immediately after _self_ with given styles / rules
```js
next($(styleA), not(':disabled'))
```
<br>


<br><br>

> :ToCPrevNext