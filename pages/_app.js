import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import BackgroundFX from "../components/BackgroundFX";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    localStorage.setItem('theme', 'dark');
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </Head>
      <BackgroundFX />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
