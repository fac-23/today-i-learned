---
title: "Rest parameters for custom attributes"
date: "2022-04-14"
label: "react"
author: "Oli Jones"
---

In a recent code review it was noted that although my PR did not break anything, there was a new error/warning from React in the console.

### What was I trying to do?

actionButton is an object with multiple properties. I wanted to use one of these properties to set the text content for my tooltip component.

### Code example:

```tsx
function ActionButtonWithToolTip({ actionButton }) {
  const { tooltipContent } = actionButton;
  return (
    <Tooltip content={tooltipContent || ""}>
      <Button {...actionButton} />
    </Tooltip>
  );
}
```

### Error message:

<b>⛔️[Warning] </b> from React "React does not recognize the tooltipContent prop on a DOM element.
<br>
If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase tooltipcontent instead.

<img width="1035" alt="Screenshot 2022-04-14 at 11 05 49" src="https://user-images.githubusercontent.com/78092825/163558234-0f0237dd-4424-4710-b9ac-42fdf8df45bf.png">

### What's the problem here?

I've spread all of the props of actionButton (there are several) onto the Button component, including tooltipContent.
<br> But I only need the tooltipContent prop <b>as content for the tooltip</b>, I don't need it on the child Button component itself!
<br>React complains as it does not recognise tooltipContent as an attribute on the underlying button element.

The react docs specify:

☢️ Composite components should “consume” any prop that is intended for the composite component
and not intended for the child component.

Luckily there is a neat trick for separating out props and using them where needed without passing down unneccesary props. You can 'pluck out' your prop by destructuring your prop.

```
const { propToConsume, ...rest } = props
```

Consume the prop and then pass the rest of the props down to the child component.
Here is how it worked in my example:

```tsx

Changed to:

function ActionButtonWithToolTip({
actionButton
}) {
  const { tooltipContent, ...rest } = actionButton;
  return (
    <Tooltip content={tooltipContent || ""}>
      <Button {...rest} />
    </Tooltip>
  );
}
```

See React Docs for more info:
https://reactjs.org/warnings/unknown-prop.html

### Main learnings:

- Props ought to be separated from the rest of the props at the level at which they are consumed, passing down unneccesary props to children can result in React errors in console (but won't result in typescript compilation errors)
