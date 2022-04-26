import CustomHead from "./Meta";
import { useUser } from "@auth0/nextjs-auth0";
import Header from "./Header";
import utilStyles from "../styles/utils.module.css";
import Image from "next/image";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import Link from "next/link";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#881446",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, menu = false }) {
  const { user } = useUser();

  //useUser() is an auth0 hook that returns a user object for a logged in user
  //if a user object is returned, pass down the user object and render the main content
  //if the useUser() return value is undefined, only show login landing page
  return (
    <div>
      {user ? (
        <>
          <CustomHead siteTitle={siteTitle}></CustomHead>
          <Header theme={theme} menu={menu} user={user}></Header>
          <Container maxWidth="lg">
            {children}

            {!menu && (
              <div style={{ margin: "3rem 3rem 3rem 0rem" }}>
                <Link href="/">
                  <a>← Back to home</a>
                </Link>
              </div>
            )}
          </Container>
        </>
      ) : (
        <div
          style={{
            maxWidth: "36rem",
            padding: "0 1rem",
            margin: "3rem auto 6rem",
          }}
        >
          <Image
            priority
            src="/images/TIL.svg"
            className={utilStyles.borderCircle}
            height={200}
            width={200}
            alt={"Today I learned logo"}
          />

          <ThemeProvider theme={theme}>
            <h1>Welcome to Today I Learned!</h1>
            <p>
              A collaborative secure space to share code snippets and learnings.
            </p>
            <div>
              <Button size="small" variant="contained" href="/api/auth/login">
                Log in
              </Button>
            </div>
          </ThemeProvider>
        </div>
      )}
    </div>
  );
}
