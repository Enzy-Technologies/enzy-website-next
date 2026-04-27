import React from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/app/lib/seo";
import { Playground } from "./playground";

export const metadata: Metadata = buildMetadata({
  title: "Playground",
  description: "Answer a few questions and preview a tailored Enzy AI experience.",
  path: "/playground",
});

export default function Page() {
  return <Playground />;
}

