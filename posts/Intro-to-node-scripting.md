---
title: "Intro to node scripting"
date: "2022-03-06"
label: "node"
author: "Oli Jones"
---

In my attempt to address a developer tooling issue, I learned quite a lot about using node js as a scripting tool to interact with the underlying processes of the operating system.

FAC used to run workshops on this and Reuben usefully pointed me towards some good resources to get started [here](https://github.com/foundersandcoders/Node-Shell-Workshop).

See below for some fully commented code that walks through a function that can execute a terminal command in a new shell, read the output and respond on the basis of the output.

```ts import { exec } from "child_process";
import util from "util";

// general purpose function to run commands in new shell, returning stdout

async function runShellCommand(cmd: string): Promise<string> {
  // child_process.exec spawns a new shell and runs a command inside a child process
  // Creating a promise from child_process.exec allows use of await for async scripts

  const execPromise = util.promisify(exec);
  const processPromise = execPromise(cmd);

  // await completion of child_process.exec and return final stdout string
  const { stdout } = await processPromise;

  return stdout;
}

// spawn new shell and run command
runShellCommand("yarn knex migrate:list").then((result) => {
  // if stdout fails to return sucess message, output warning
  if (!result.includes("No Pending Migration files Found")) {
    // !! process.stdout.write does not output in terminal but console.log() does
    process.stdout.write(
      "\n \x1b[33m Warning: There are migrations pending. Run 'yarn db:migration:latest' to update "
    );
  }
});
```

### Walkthrough

Your computer completes tasks and runs scripts on a process. `stdout` is the standard output of a process, it is the text we see when we run scripts in the terminal and it is very similar to the console.log function.

My goal was to write a general purpose utility function that I could call to run shell commands in node and capture the logged result.

To start with I imported `exec` and `util` from node:

`exec` is a powerful function that when called spawns a new shell and runs a command inside a child process. A child process is a process created by another (parent process).

```ts
import { exec } from "child_process";
import util from "util";
```

`util` has a method called `promisify` which is really nice way to make functions asynchronous. I needed this so that I would have a way to make the `exec` call asynchronous, ensuring the child process running the command has finished all tasks before returning the `stdout` result.

```ts
const execPromise = util.promisify(exec);
const processPromise = execPromise(cmd);
```

So, now we have executed a command in a new shell and we have the promise of the result of this call in `processPromise`. Finally we have what we want!`processPromise.stdout` is the captured `stdout` from running our command 😊.

```ts
const { stdout } = await processPromise;
```

In our usecase we call this function every time we run the dev server, it runs `"yarn knex migrate:list"`, this function is returns a massive wall of text so having this show up every time we run the server is a pain, so instead we call `runShellCommand("yarn knex migrate:list")` to check if there have been database migrations and only show a warning message with `process.stdout.write` if the success message is not returned!

### Main learnings:

- Your computer completes tasks and runs scripts on a process. A child process is a process created by another (parent process).
- We have access to the process object globally in nodeland. It has many methods including .stdout which is a stream of standard output (the stuff you see logged in your terminal when it is logged).
- You need to be wary of asynchronous tasks when executing code on child processes, using promises can get round some of these issues.
