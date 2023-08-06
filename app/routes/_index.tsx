import { Typography } from "@mui/material";
import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Typography variant="h2">Welcome to Remix</Typography>
      <ul>
        <li>
          <Link to="/about">About </Link>
        </li>
      </ul>
    </div>
  );
}
