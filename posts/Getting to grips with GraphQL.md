---
title: "Getting to grips with GraphQL"
date: "2022-06-19"
label: "GraphQL"
author: "Oli Jones"
---

GraphQL has been gaining popularity over the last few years and it's securing itself as one of the top technology choices for web developers. This post is meant to be top level overview rather than a tutorial.

So what is GraphQL?

Despite reading some introductory blogs and podcasts it took me a while to understand what GraphQL actually is, this is because when people talk about GraphQL they are often referring to the GraphQL ecosystem which includes a range of technologies and tools that help support the use of GraphQL such as `Apollo, GraphiQL and PostGraphile`.

GraphQL is query langauge. The langauge provides a structured, typed and agreed upon way to ask for data or mutate data on a server. GraphQL has an open specification which means that you can send a GraphQL query, or create a GraphQL server in many languages such as Python, Go or JavaScript.

Queries are used to collect data, Mutations are used to update, delete or add data.

A GraphQL API server is configured such that it has a single HTTP endpoint `/grapql` that receives a request with a query string as a payload in the request body. All GraphQL requests are `POST` requests, even if purely fetching data.

Here is an example of a request asking for data from four fields `id, habit, complete, label`.

# Client side

```ts

export async function getDayProgress() {
  const results = fetch(`${URL}/api/GraphQL`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: `query GetTodayProgress {
        getTodayProgress {
          id
          habit
          complete
          label
        }
      }`,
    }),
  });
  const jsonResponse = await results;
  return await jsonResponse.json().then((res) => res.data.getTodayProgress);

```

Many tutorials focus purely on the frontend when talking about GraphQL, but in my opinion that made it difficult to appreciate what is going on behind the scenes before the data is served up.

Let's have a look at some of the backend code. The goal for the GraphQL API is to receive the query/mutation name as well as any variables, and return the correct data.

`Schema` information outlines the types of data that must be returned, in this case an array of Habits which are defined in a `.gql` file. Both the frontend and the backend typically have access to the schema information. The API developer provides the operationNames of the queries (or mutations) that will be available to the consumer of the data. The schema enables the use of `virtual playgrounds` to assist in writing queries as people can explore what data will be available.

```

 type Habit {
    id: ID
    habit: String
    complete: Boolean
    label: String
  }

  type Query {
    getTodayProgress: [Habit]
  }


```

# Backend

It is the job of the backend/API developer to write functions in a way to correctly serve up the data that is requested. These are called `resolver` functions that must return data that is described in the schema. Resolvers typically interact with the database to actually retrieve the data and this could be with SQL, Postgres, Mongo and a whole range of database query languages, GraphQL does not _directly_ interact with the database and does not replace these (yet).

```tsx
//resolvers.ts
export const resolvers = {
  Query: {
    getTodayProgress: async () => {
      const res = await getCompletedState();
      return res;
    },
  },
};

// model.ts
export async function getCompletedState() {
  const GET_COMPLETED_STATE = `SELECT * from habitDayProgress`;
  return db
    .query(GET_COMPLETED_STATE)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => console.log(error));
}
```

### Ok but why?

New devs are probably familar with REST APIs, REST is a comparative and effective method for collecting data. In this instance I could set up a route called /TodayProgress and set up my server such that hitting this route will return a JSON object with all the data I want.

So if I can achieve the same thing with good old fashioned REST as I can wih GraphQL, what is the benefit of GraphQL?

Well lets imagine there is a great amount of variation in the number of fields we want, sometimes it's just the `id` other times it's `id, name, occupation, complete` and oftentimes it is dozens of fields. For REST this introduces the problem of overfetching. You have a route that always returns the same JSON. If you are are the producer and consumer of the data this can be remedied by creating some more routes or adding URL parameters for filtering. But what if you are just a consumer i.e. you don't own or have any influence on the API? Often you will be getting back large blobs of predefined JSON and then having to pick out the bits that you need on the client side.

This could lead to all sorts of mapping, filtering, sorting, and Object.keys() fun happening in the client code, just to get the data in the right shape.

GraphQL helps tackle that problem, and it is very nice for people writing frontend clientside code. They can simply define the fields that they want, send the request to a single endpoint, and the data should come back exactly as they want it.

### Variables

In addition GraphQL allows for the use of variables in your query, combining several variables together proves to be an extremely powerful way to filter data and only return what is needed.

```tsx
export async function updateDayProgress(habit: string, complete: boolean) {
  const results = fetch(`${URL}/api/graphql`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: `mutation UpdateTodayProgress($habit: String, $complete: Boolean) {
        updateTodayProgress(habit: $habit, complete: $complete) {
          id
          habit
          complete
        }
      }
      `,
      variables: {
        habit: habit,
        complete: complete,
      },
    }),
  });
  const jsonResponse = await results;
  return await jsonResponse.json().then((res) => res.data.updateDayProgress);
}
```

### Stitching APIs

GraphQL is also great for stitching together disperate data sources into a single easy to query API. Rather than having to make 6 or 7 API calls to various endpoints on the client, you could have a single GraphQL server that makes those calls and gathers all the data together in the resolver functions presenting it at a single endpoint.

### Backend tooling

So far so good, it sounds nice for the frontend, but seems like a lot of work for the backend, surely REST is easier to get started with? In some cases REST will be a better choice for sure, but there is also a ton of tooling that has developed that makes creating a GraphQL API and writing resolvers much easier.

`Postgraphile` is a CLI tool that analyses your postgres schema and then automatically generates GraphQL queries and mutations that you can use along with their typescript type information and customReact hooks! It is tools like these that really make GraphQL shine ⭐️.

### Main learnings:

- GraphQL is a query langauge used to specify what data you want to query or mutate
- Querying involves sending a request to a single /graphql endpoint
- Serverside code must be written to handle the request and return specified fields using resolver functions
- Tooling exists to autogenerate type information about response objects and expected arguments
- Postgraphile autogenerate React custom hooks that can have loading and error states.
