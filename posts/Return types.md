---
title: "Typescript return types"
date: "2022-04-24"
label: "typescript"
author: "Oli Jones"
---

Typescript has the concept of return types for functions, which means that you can explictly tell typescript what type of data will be returned from a function. You can do this by adding a colon and return type just prior to the function body.

Here is a simple example:

```ts
function convertToString(num: number): string {
  return num.toString();
}
```

The interesting thing is that typescript is perfectly happy if we don't define the return type here, it is able to infer that the return type will be a string, so in this case it would be easier and more concise to omit the manual return typing.

```ts
function convertToString(num: number) {
  return num.toString();
}
```

If typescript can infer return types, when <i>should</i> we be writing them ourselves? I had this discussion recently at work and the answer was that in general it is best to rely on inference for return types, however explicit typing is useful when using complex types, external libraries or computer generated types.

If you know for certain that there is already a type defined that your function ought to return it is better to explicitly add this as a return type, it will give richer autocompletion and type checking than an inferred type.

In the example below the function is being explicitly given the return type of `React.CSSProperties` which is a [very comprehensive](#https://github.com/frenic/csstype/blob/master/index.d.ts) type definition for css properties that is kept up to date with data from MDN.

```ts
function getTableWidth(col: Column): React.CSSProperties {
  return {
    width: col.width,
    minWidth: col.variableWidth ? col.minWidth : col.width,
    maxWidth: col.variableWidth ? col.maxWidth : col.width,
  };
}
```

Another use case is when your types are coming from a computer generated source. One of the cool features of GraphQl is that it can automatically generate types for your frontend/backend based on your database schema, these types may change as the schema is updated over time. As such it makes sense to add the generated type name as a return type, if any breaking changes are introduced typescript will warn us! The same prinicple holds true for external library functions and classes.

### Main learnings:

- In most situations typescript should be able to correctly infer the return type and therefore explicitly typing the return type is unneccessary

- However, using a return type can be useful if using an external library or generated types as the type may contain richer information about object properties than what can be inferred by your use case
