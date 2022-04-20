---
title: "Missing props"
date: "2022-03-05"
label: "typescript"
author: "Oli Jones"
---

After converting a bunch of jsx files to tsx for this next.js site, I noticed some red squiggly lines appearing in some places where Layout components were being used.

Here is what a simplified Layout component looks like:

```tsx

export default function Layout({children, home}) {
  return (<>{home ? <component1/> : <component2/>} <main>{children}</main>)</>}

```

In essence the Layout component relies on the truthiness of the home prop in order to render component1. However, in some use cases in the codebase I don't pass down a home prop at all, which upsets the compiler as it expects one!

Rather than adding extra render logic in the child component, I found a quick work around which seems an acceptable approach.

Adding a default false value to the home prop restores the expected behaviour, in the absence of the home prop component2 will be rendered, but if home is present it will render component1 😃.

```tsx

export default function Layout({ children, home=false}) {
  return (<>{home ? <component1/> : <component2/>} <main>{children}</main>)</>}

```
