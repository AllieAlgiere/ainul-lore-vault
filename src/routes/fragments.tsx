import { createFileRoute } from "@tanstack/react-router";
import { CharacterCollectionPage } from "@/components/archive/content-pages";
import { fragmentCharacters } from "@/lib/archive";
export const Route = createFileRoute("/fragments")({ head: () => ({ meta: [{ title: "Fragments | Ainul Archive" }, { name: "description", content: "Sovereign principles divided from the first creation." }, { property: "og:title", content: "Fragments | Ainul Archive" }, { property: "og:description", content: "Sovereign principles divided from the first creation." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });
function Page() { return <CharacterCollectionPage eyebrow="Sovereign aspects" title="Fragments" description="Principles of creation given body, purpose, and the terrible freedom of will." characters={fragmentCharacters} />; }
