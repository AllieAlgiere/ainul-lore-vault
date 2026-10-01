import { createFileRoute } from "@tanstack/react-router";
import { CharacterCollectionPage } from "@/components/archive/content-pages";
import { fusionCharacters } from "@/lib/archive";
export const Route = createFileRoute("/fusions")({ head: () => ({ meta: [{ title: "Fusions | Ainul Archive" }, { name: "description", content: "Impossible unions born from sustained contradiction." }, { property: "og:title", content: "Fusions | Ainul Archive" }, { property: "og:description", content: "Impossible unions born from sustained contradiction." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });
function Page() { return <CharacterCollectionPage eyebrow="Concordant beings" title="Fusions" description="Entities formed when sovereign aspects coexist without mutual annihilation." characters={fusionCharacters} />; }
