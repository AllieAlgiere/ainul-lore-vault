import { createFileRoute } from "@tanstack/react-router";
import { PowerScalingPage } from "@/components/archive/content-pages";
export const Route = createFileRoute("/powerscaling")({ head: () => ({ meta: [{ title: "Power Scaling | Ainul Archive" }, { name: "description", content: "Comparative rankings for documented powers in the archive." }, { property: "og:title", content: "Power Scaling | Ainul Archive" }, { property: "og:description", content: "Comparative rankings for documented powers in the archive." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });
function Page() { return <PowerScalingPage />; }
