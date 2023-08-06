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

export default function App() {
  const outlet = useOutlet();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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
      </body>
    </html>
  );
}
