import { createFileRoute } from "@tanstack/react-router";
import { DoctrinePage } from "@/components/archive/content-pages";

export const Route = createFileRoute("/glitch-hell")({
  head: () => ({
    meta: [
      { title: "Glitch Hell | Ainul Archive" },
      { name: "description", content: "Explore Glitch Hell's endless Blocks, anomaly classes, Fake People, and Terrorbyte and Horrorbyte wardens." },
      { property: "og:title", content: "Glitch Hell | Ainul Archive" },
      { property: "og:description", content: "Explore Glitch Hell's endless Blocks, anomaly classes, Fake People, and Terrorbyte and Horrorbyte wardens." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return <DoctrinePage type="glitch-hell" />;
}
