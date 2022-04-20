import { UserProvider } from "@auth0/nextjs-auth0";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  //userProvider wraps all of app and is needed for Auth0 hooks to work
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
