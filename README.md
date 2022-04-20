# Welcome to Today I learned (TIL)![TIL](https://user-images.githubusercontent.com/78092825/156944380-e899ff7a-9674-4195-9ebe-8b472427bc0c.svg)

## What is TIL?

TIL is a platform for sharing on-the-job developer learnings with FAC alumni. Sharing real life code examples on a personal blog or website is not always appropriate due to the private nature of production code, but sharing some details of actual code is important for learning. TIL is a secure environment to share code with FAC alumni, the site was built using Next.js static site generation, Shiki syntax highlighting and Github as a backend for versioning and storage.

## How do I use TIL?

- Sign in with a single click using your google account or sign up via auth0.
- Once you are signed in you will be able to browse the latest posts or view the archive to see all content
- Each post has a link to a github markdown file stored in /posts. Want to edit or update a page? Simply make your changes online on github and commit to main, in under 3 mins your changes will appear on the live site.
- Have your own learning to share? Great! <b>Simply
  download a [Template.md](https://github.com/duckRabbitPy/TIL/files/8496976/Template.md). Then upload <a href="https://github.com/duckRabbitPy/TIL/upload/main/posts">here</a>.</b>
- If you would prefer to clone the repo and make a pull request with your new markdown files, that's also a good option, especially if you want to share images and videos. Please store any media in /public/post-media

## Publishing guidance

- All markdown files should have a title, date, label and author in the following format to be rendered correctly (no line breaks):

```
---
title: "template-file"
date: "2022-03-05"
label: "react"
author: "bob ross"
---

```

## Improving the site

- Pull requests, issues and contributions welcome! It would be great to build a platform that works for everyone. The foundation for the site was the next.js blog starter so much of the code will be familiar.

- Happy to share environmental variables on request. Although everything can be run locally with auth0 credentials https://auth0.com/docs/quickstart/webapp/nextjs/01-login and a supabase postgres connection string.

AUTH0_SECRET='######' </br>
AUTH0_BASE_URL='http://localhost:3000' </br>
AUTH0_ISSUER_BASE_URL='####' </br>
AUTH0_CLIENT_ID='#####' </br>
AUTH0_CLIENT_SECRET='#####' </br>
DATABASE_URL='postgresql://postgres########.supabase.co:5432/postgres'
