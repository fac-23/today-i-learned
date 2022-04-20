import Image from "next/image";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import FadeIn from "react-fade-in";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function Header({ menu, user, theme }) {
  const name = "Today I learned!";
  return (
    <FadeIn>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {menu ? (
          <>
            <ThemeProvider theme={theme}>
              <p>Signed in with {user.email}</p>
              <Button size="small" variant="contained" href="/api/auth/logout">
                Log out
              </Button>
              <span style={{ marginTop: "1rem" }}>
                <Image
                  priority
                  src="/images/TIL.svg"
                  className={utilStyles.borderCircle}
                  height={200}
                  width={200}
                  alt={name}
                />
              </span>
              <h1 className={utilStyles.headingXl}>{name}</h1>
            </ThemeProvider>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/TIL.svg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <Link href="/">
              <a>Home</a>
            </Link>
          </>
        )}
      </header>
    </FadeIn>
  );
}
