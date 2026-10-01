import { createFileRoute } from "@tanstack/react-router";
import { AmaPage } from "@/components/archive/content-pages";
export const Route = createFileRoute("/ama")({ head: () => ({ meta: [{ title: "AMA Archive | Ainul Archive" }, { name: "description", content: "Curator answers and lore clarifications from the archive." }, { property: "og:title", content: "AMA Archive | Ainul Archive" }, { property: "og:description", content: "Curator answers and lore clarifications from the archive." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });
function Page() { return <AmaPage />; }
