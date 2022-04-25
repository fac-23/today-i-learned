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

Let's say we are sending a request to a poorly documented API which has an endpoint https:lazyapi.com/return-a-person-object/data 

From the docs we know there is a property called `occupation` but we also think there is a property called `role` in the person object although we're not sure. In our case we want to assign `roleInfo` to `role` if it exists or to `occupation` if it doesn't. This is a nice use case for using a type guard.

```ts
export function logPerson(person: Person) {
  let roleInfo: string;
  if ("role" in person) {
    roleInfo = person.role;
  } else {
    roleInfo = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${roleInfo}`);
}
```

or

```ts
export function logPerson(person: Person) {
  let roleInfo: string;
  if (person.hasOwnProperty("role")){
    roleInfo = person.role;
  } else {
    roleInfo = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${roleInfo}`);
}
```

Another good way to handle cases of possible non-existance is to use the <b>optional chaining</b> operator `?`

Adding this to the end of an accessed property tells typescript the value might exist but it also might not, this will silence errors saying that your untyped object is definitely <b>missing<b> a property but it forces you to handle the possibility that it might not exist. This enforces a safer and more defensive style of working with external data.
  
e.g.
  
```ts
export function logPersonLocation(person: Person) {
  const street = person.location?.town?.street;
  if(street){
  console.log(street);
  }
  else if (town) {
  const town = person.location?.town
   console.log(town);
  }
  {
  console.log('location unknown');
  }
  
}
```
  

