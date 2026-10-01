import { createFileRoute } from "@tanstack/react-router";
import { ThronesPage } from "@/components/archive/content-pages";
export const Route = createFileRoute("/thrones")({ head: () => ({ meta: [{ title: "Seven Thrones | Ainul Archive" }, { name: "description", content: "The seven cosmic seats and their known keepers." }, { property: "og:title", content: "Seven Thrones | Ainul Archive" }, { property: "og:description", content: "The seven cosmic seats and their known keepers." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });
function Page() { return <ThronesPage />; }
