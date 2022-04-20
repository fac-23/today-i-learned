import fs from "fs";
import path from "path";
import matter from "gray-matter";

const markdown = require("markdown-it");
//library for syntax highlighting
const shiki = require("shiki");

const postsDirectory = path.join(process.cwd(), "posts");

// getSortedPostsData() returns metadata about markdown files
//{
//   id: string;
//   title: string;
//   date: string;
//   label: string;
//   author: string;
// }
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    let title = "unset";
    if (matterResult.data.title) {
      title = matterResult.data.title;
    }

    let date = "unset";
    if (matterResult.data.date) {
      date = matterResult.data.date;
    }

    let label = "unset";
    if (matterResult.data.label) {
      label = matterResult.data.label;
    }

    let author = "unset";
    if (matterResult.data.author) {
      author = matterResult.data.author;
    }

    // Combine the data with the id
    return {
      id,
      title,
      date,
      label,
      author,
    };
  });

  // Sort posts by date
  const sortedByTitle = allPostsData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } else {
      return 0;
    }
  });

  return sortedByTitle;
}

//turns md file names into strings
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

//read the markdown file from the /posts directory
//high
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const contentHtml = await shiki
    .getHighlighter({
      theme: "dracula",
    })
    .then((highlighter) => {
      const md = markdown({
        html: true,
        highlight: (code, lang) => {
          return highlighter.codeToHtml(code, { lang });
        },
      });

      //this is the key line, md.render highlights the markdown file from the filepath
      const pageMarkdown = md.render(fs.readFileSync(fullPath, "utf-8"));
      const metaOpening = pageMarkdown.indexOf("<h2>");
      const metaClosing = pageMarkdown.indexOf("</h2>");
      const metaData = pageMarkdown.slice(metaOpening, metaClosing + 5);

      const parsedMarkdown = pageMarkdown.replace(metaData, "");
      return parsedMarkdown;
    });

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
