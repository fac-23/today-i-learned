---
title: "Typing your React Props"
date: "2022-03-02"
label: "typescript"
author: "Oli Jones"
---

The first problem I ran into when converting a React App to typescript was the compiler yelling at me that **TS2607: JSX element class does not support attributes because it does not have a 'props' property**

This is because I was passing down a prop into a child component, but the child parameter was not typed.

```tsx
//index.tsx
<Date date={date}></Date>
```

### The solution

Add an interface for the child component props parameter! Rewriting the Date functional component with arrow function syntax was a nice way to make the function parameter type clear.

```tsx
//Date.tsx
interface Props {
  date: string;
}
const Date = (props: Props) => {
  const date = parseISO(props.date);
  return <Time dateTime={props.date}>{format(date, "LLLL d, yyyy")}<Ttime>;
};

export default Date;
```

### Destructuring props

A common react pattern is to destructure multiple props, so you can immediately use a variable and don't have to write `props.xyz`. Writing a Props interface or type works well for this too, as writing all these types inline would be difficult to read.

```tsx
interface commentProps {
  date: string;
  comment: string;
  likes: number;
  private: boolean;

}

 const  = ({date, comment, likes, private}: commentProps) => {
  const date = parseISO(date);
  if(!private){
  return<Comment dateTime={date}><div>{comment}</div><div>{likes}</div></Comment>;
  }
  return <p>You do not have permission to see this post</p>
  };

```
