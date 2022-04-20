---
title: "Checking properties in Typescript"
date: "2022-04-06"
label: "typescript"
author: "Oli Jones"
---

## Checking properties in Typescript

There are several ways you can 'typeguard' to ensure that a property exists before attempting to access it in typescript, this can be useful when using external APIs that are not well documented. Note that it does not give you any guaruntees about the _value_ of the property, merely an assurance that the property exists.

```ts
const myProp = "prop";
if (myObj.hasOwnProperty(myProp)) {
  alert("yes, i have that property");
}
Or;

const myProp = "prop";
if (myProp in myObj) {
  alert("yes, i have that property");
}
Or;

if ("prop" in myObj) {
  alert("yes, i have that property");
}
```

Example:

```ts
export function logPerson(person: Person) {
  let additionalInformation: string;
  if ("role" in person) {
    additionalInformation = person.role;
  } else {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
```
