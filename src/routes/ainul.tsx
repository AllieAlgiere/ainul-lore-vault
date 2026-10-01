import { createFileRoute } from "@tanstack/react-router";
import { DoctrinePage } from "@/components/archive/content-pages";
export const Route = createFileRoute("/ainul")({ head: () => ({ meta: [{ title: "The Ainul | Ainul Archive" }, { name: "description", content: "Witnesses beyond the veil and their ancient covenant." }, { property: "og:title", content: "The Ainul | Ainul Archive" }, { property: "og:description", content: "Witnesses beyond the veil and their ancient covenant." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });
function Page() { return <DoctrinePage type="ainul" />; }
