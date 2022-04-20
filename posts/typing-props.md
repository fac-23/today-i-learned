---
title: "Typing your React Props"
date: "2022-03-02"
label: "typescript"
author: "Oli Jones"
---

The first problem I ran into when converting a React App to typescript was the compiler yelling at me that **TS2607: JSX element class does not support attributes because it does not have a 'props' property**

This is because I was passing down a prop into a child component, but the child parameter was not typed.

The solution: add an interface for the child component props parameter!

```tsx
//index.tsx
<Date date={date}></Date>
```

Rewriting the Date functional component with arrow function syntax was a nice way to make the function parameter type clear

```tsx
//Date.tsx
interface Props {
  date: string;
}
const Date = (props: Props) => {
  const date = parseISO(props.date);
  return <time dateTime={props.date}>{format(date, "LLLL d, yyyy")}</time>;
};

export default Date;
```

Later on I found that this issue is avoided if you rely on destructuring syntax for your props. Typescript is then able to infer that date is a property on the prop object.

```tsx
 const Date = ({date})) => {
  const date = parseISO(date);
  return <time dateTime={date}>{format(date, "LLLL d, yyyy")}</time>;
};

```
