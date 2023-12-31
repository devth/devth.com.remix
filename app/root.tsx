import { withEmotionCache } from "@emotion/react";
import {
  Button,
  Container,
  unstable_useEnhancedEffect as useEnhancedEffect,
  useMediaQuery,
} from "@mui/material";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
  useOutlet,
} from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import ClientStyleContext from "./src/ClientStyleContext";
import { createThemeForMode } from "./src/theme";
import { Logo } from "./components/Logo";

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = React.useContext(ClientStyleContext);

    // Only executed on client
    useEnhancedEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = createThemeForMode(prefersDarkMode ? "dark" : "light");

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta
            name="emotion-insertion-point"
            content="emotion-insertion-point"
          />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  const outlet = useOutlet();

  return (
    <Document>
      <Container sx={{ mb: 2 }}>
        <Logo />
        <Button component={Link} to="/" color="primary">
          Home
        </Button>
        <Button component={Link} to="/about" color="primary">
          About
        </Button>
      </Container>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={useLocation().pathname}
          initial={{ x: "-100px", y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: "100px", y: 0, opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 0.2 }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Document>
  );
}
