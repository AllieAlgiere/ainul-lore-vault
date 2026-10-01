import { createFileRoute } from "@tanstack/react-router";
import { TimelinePage } from "@/components/archive/content-pages";
export const Route = createFileRoute("/timeline")({ head: () => ({ meta: [{ title: "Timeline | Ainul Archive" }, { name: "description", content: "The surviving chronology of the Ainul universe." }, { property: "og:title", content: "Timeline | Ainul Archive" }, { property: "og:description", content: "The surviving chronology of the Ainul universe." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });
function Page() { return <TimelinePage />; }
