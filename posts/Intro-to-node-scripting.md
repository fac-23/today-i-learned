---
title: "Intro to node scripting"
date: "2022-03-06"
label: "node"
author: "Oli Jones"
---

In my attempt to address a developer tooling issue, I learned quite a lot about using node js as a scripting tool to interact with the underlying processes of the operating system.

FAC used to run workshops on this and Reuben usefully pointed me towards some good resources to get started [here](https://github.com/foundersandcoders/Node-Shell-Workshop).

See below for some fully commented code that walks through a function that can execute a terminal command in a new shell, read the output and respond on the basis of the output.

```ts
import { exec } from "child_process";
import util from "util";

// general purpose function to run commands in new shell, returning stdout

async function runShellCommand(cmd: string): Promise<string> {
  // child_process.exec spawns a new shell and runs a command inside a child process
  // Creating a promise from child_process.exec allows use of await for async scripts

  const execPromise = util.promisify(exec);
  const processPromise = execPromise(cmd);

  // the child property of processPromise is an instance of the ChildProcess module
  const { child } = processPromise;

  // log all stdout, stderr, error messages and exit code from child process
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.on("error", (Error) => process.stdout.write(`Error: ${Error.message}`));
  child.on("exit", (code) => process.stdout.write(`exit code: ${code}`));

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

### Main learnings:

- Your computer completes tasks and runs scripts on a process. A child process is a process created by another (parent process).
- We have access to the process object globally in nodeland. It has many methods including .stdout which is a stream of standard output (the stuff you see logged in your terminal when it is logged).
- You need to be wary of asynchronous tasks when executing code on child processes, using promises can get round some of these issues.
