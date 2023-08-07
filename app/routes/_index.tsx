import { Box, Container, Typography } from "@mui/material";
import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Box style={{ overflowX: "hidden" }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontSize: 100 }} variant="h1">
          devth is Trevor Hartman
        </Typography>
        <Typography variant="h2">
          a software engineer working remotely from Montana
        </Typography>
      </Container>
      <Box
        sx={{
          width: "110%",
          marginLeft: "-5%",
          backgroundColor: "turquoise",
          mt: 10,
          height: 700,
          transformOrigin: "top left",
          transform: "rotate(-3deg)",
        }}
      />
    </Box>
  );
}
