import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import BackgroundFX from "../components/BackgroundFX";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <BackgroundFX />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
