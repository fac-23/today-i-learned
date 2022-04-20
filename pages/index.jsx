import Layout from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/Date";
import { theme } from "../styles/theme";
import { Button, ThemeProvider } from "@mui/material";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const homePagePosts = allPostsData.slice(0, 3);
  return {
    props: {
      homePagePosts,
    },
  };
}

export default function Home({ homePagePosts }) {
  return (
    <Layout menu>
      <section className={utilStyles.tagline}>
        <p>
          A collaborative secure space for FAC alumni to share code snippets and
          learnings!
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Latest TIL entries</h2>
        <ul className={utilStyles.list}>
          {homePagePosts.map(({ id, date, title, label, author }) => (
            <li className={utilStyles.listItem} key={id}>
              <>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                {label !== "unset" ? (
                  <span className={utilStyles.label}>{label}</span>
                ) : (
                  ""
                )}
                {author !== "unset" ? (
                  <span className={utilStyles.author}>{author}</span>
                ) : (
                  ""
                )}
              </>
              <br />
              <small className={utilStyles.lightText}>
                <Date date={date}></Date>
              </small>
            </li>
          ))}

          <Link href="/posts/archive">
            <a>
              <b>+ view all posts</b>
            </a>
          </Link>
        </ul>

        <section style={{ marginTop: "2rem", marginBottom: "3rem" }}>
          <h2 className={utilStyles.headingLg}>Add your own post!</h2>
          <a href="/Template.md" download>
            <ThemeProvider theme={theme}>
              <span style={{ marginRight: "1rem" }}>
                <Button
                  target="_blank"
                  size="small"
                  variant="contained"
                  href=""
                >
                  Download .md template
                </Button>
              </span>
            </ThemeProvider>
          </a>

          <ThemeProvider theme={theme}>
            <span style={{ marginRight: "1rem" }}>
              <Button
                target="_blank"
                size="small"
                variant="outlined"
                href="https://github.com/fac-23/today-i-learned/upload/main/posts"
              >
                Upload .md file
              </Button>
            </span>
          </ThemeProvider>
        </section>
      </section>
    </Layout>
  );
}
