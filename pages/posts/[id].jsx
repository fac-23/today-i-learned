import Layout from "../../components/Layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Date from "../../components/Date";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import Link from "next/link";

import { getAllPostIds, getPostData } from "../../lib/posts";

//this function extracts information from markdown files in the repo at buildtime
export async function getStaticProps({ params }) {
  //params contains the route parameters for pages using dynamic routes.
  //For example, as the page name is [id].js , the params object will look like { id: 'filename' } for each page
  const postData = await getPostData(params.id);
  const githubEndpoint = params.id + ".md";
  const markdownTitle = params.id;
  return {
    props: {
      postData,
      githubEndpoint,
      markdownTitle,
    },
  };
}

//gets dynamic routes from filenames, next.js uses uses this at build time to build dynamic routes
export async function getStaticPaths() {
  //return a list of filenames
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

//display individual post
export default function Post({ postData, githubEndpoint, markdownTitle }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date={postData.date} />
        </div>
        {postData.label && postData.label !== "unset" ? (
          <span className={utilStyles.labelFlush}>{postData.label}</span>
        ) : (
          ""
        )}
        {postData.author && postData.author !== "unset" ? (
          <span className={utilStyles.author}>{postData.author}</span>
        ) : (
          ""
        )}
        <div
          style={{ minWidth: "350px", display: "block" }}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
        <ThemeProvider theme={theme}>
          <Button
            target="_blank"
            size="small"
            variant="contained"
            href={`https://github.com/fac-23/today-i-learned/blob/main/posts/${githubEndpoint}`}
            sx={{ marginRight: "1rem", marginBottom: "0.5rem" }}
          >
            Update post on github
          </Button>

          <Link
            href={{
              pathname: "/discussion",
              query: { markdownTitle: markdownTitle },
            }}
          >
            <Button
              target="_blank"
              size="small"
              variant="outlined"
              sx={{ marginRight: "1rem", marginBottom: "0.5rem" }}
            >
              Go to discussion
            </Button>
          </Link>
        </ThemeProvider>
      </article>
    </Layout>
  );
}
