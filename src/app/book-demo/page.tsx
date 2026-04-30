import type { Metadata } from "next";
import { buildMetadata } from "@/app/lib/seo";
import { BookDemoPage } from "@/app/components/BookDemo/BookDemoPage";

export const metadata: Metadata = buildMetadata({
  title: "Book a demo",
  description: "Book an Enzy demo and pick a time that works.",
  path: "/book-demo",
});

export default function Page() {
  return <BookDemoPage />;
}

