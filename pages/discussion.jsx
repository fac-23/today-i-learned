import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import utilStyles from "../styles/utils.module.css";
import { getComments } from "../database/model";
import Link from "next/link";
import Image from "next/image";

export async function getServerSideProps(ctx) {
  //get markdown title from url query
  const markdownTitle = ctx.query.markdownTitle;
  //get all comments associated with that post
  const storedComments = await getComments(markdownTitle);

  const comments = storedComments ? storedComments : "";

  return {
    props: {
      comments,
    },
  };
}

export default function Comments({ comments }) {
  const { query } = useRouter();
  const { user } = useUser();

  return (
    <section className={utilStyles.container}>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
      <h1 className={utilStyles.headingXl}>
        Discussion: {query.markdownTitle}
      </h1>

      <ul style={{ listStyleType: "none" }}>
        {comments.map((data) => (
          <li key={data.id} style={{ marginBottom: "1rem" }}>
            <p
              style={{
                margin: "0",
              }}
            >
              {data.comment_time}
            </p>
            <section
              style={{
                padding: "0.5rem",
                border: "black 1px solid",
                borderRadius: "12px",
                boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
                display: "flex",
              }}
            >
              <Image src="/images/TIL.svg" height={50} width={50}></Image>
              <form action="/api/deleteComment" method="POST">
                <p>
                  @<b>{data.comment_author}:</b> {data.comment}
                </p>
                {user && user.name === data.comment_author && (
                  <ThemeProvider theme={theme}>
                    <Button
                      type="submit"
                      target="_blank"
                      size="small"
                      variant="contained"
                      href=""
                      sx={{ textTransform: "none", padding: "0" }}
                    >
                      Delete
                    </Button>
                  </ThemeProvider>
                )}
                <input
                  type="hidden"
                  name="comment"
                  value={data.comment}
                ></input>
                <input
                  type="hidden"
                  name="comment_author"
                  value={data.comment_author}
                ></input>
                <input
                  type="hidden"
                  name="markdown_title"
                  value={query.markdownTitle}
                ></input>
                <input
                  type="hidden"
                  name="comment_time"
                  value={data.comment_time}
                ></input>
              </form>
            </section>
          </li>
        ))}
      </ul>

      <h2>Add a comment!</h2>
      <form action="/api/addComment" method="POST" style={{ display: "flex" }}>
        <textarea
          style={{ flexGrow: "3", marginRight: "1rem" }}
          name="comment"
        ></textarea>
        <input
          type="hidden"
          value={query.markdownTitle}
          name="markdown_title"
        ></input>

        <ThemeProvider theme={theme}>
          <span style={{ maxHeight: "4rem" }}>
            <Button
              target="_blank"
              size="small"
              variant="outlined"
              href=""
              type="submit"
            >
              SHARE
            </Button>
          </span>
        </ThemeProvider>
      </form>
    </section>
  );
}
