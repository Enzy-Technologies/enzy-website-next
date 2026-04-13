import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Analytics />
    </ThemeProvider>
  );
}