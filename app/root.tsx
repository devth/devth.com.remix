import { Button, Container } from "@mui/material";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
  useOutlet,
} from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { withEmotionCache } from "@emotion/react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material";
import * as React from "react";
import ClientStyleContext from "./src/ClientStyleContext";
import theme from "./src/theme";

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
      <Container>
        <Button variant="contained" color="primary">
          Hello
        </Button>
      </Container>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={useLocation().pathname}
          initial={{ y: "+20%", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          exit={{ opacity: 0, y: "-20%" }}
          transition={{ duration: 0.1 }}
        >
          <Container>{outlet}</Container>
        </motion.main>
      </AnimatePresence>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Document>
  );
}
