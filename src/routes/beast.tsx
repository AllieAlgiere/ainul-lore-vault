import { createFileRoute } from "@tanstack/react-router";
import { DoctrinePage } from "@/components/archive/content-pages";
export const Route = createFileRoute("/beast")({ head: () => ({ meta: [{ title: "The Beast | Ainul Archive" }, { name: "description", content: "The hunger beneath creation, recorded under seal." }, { property: "og:title", content: "The Beast | Ainul Archive" }, { property: "og:description", content: "The hunger beneath creation, recorded under seal." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });
function Page() { return <DoctrinePage type="beast" />; }
