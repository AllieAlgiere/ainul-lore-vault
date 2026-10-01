import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "@/components/archive/content-pages";
export const Route = createFileRoute("/faq")({ head: () => ({ meta: [{ title: "FAQ | Ainul Archive" }, { name: "description", content: "Essential questions about Fragments, Fusions, and Thrones." }, { property: "og:title", content: "FAQ | Ainul Archive" }, { property: "og:description", content: "Essential questions about Fragments, Fusions, and Thrones." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });
function Page() { return <FaqPage />; }
