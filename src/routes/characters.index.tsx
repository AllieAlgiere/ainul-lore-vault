import { createFileRoute } from "@tanstack/react-router";
import { CharactersIndex } from "@/components/archive/characters-index";

export const Route = createFileRoute("/characters/")({
  validateSearch: (search: Record<string, unknown>) => ({ q: typeof search["q"] === "string" ? search["q"].slice(0, 100) : "", tag: typeof search["tag"] === "string" ? search["tag"].slice(0, 40) : "" }),
  head: () => ({ meta: [{ title: "Characters | Ainul Archive" }, { name: "description", content: "Search every Fragment, Fusion, sovereign, and named power in the Ainul Archive." }, { property: "og:title", content: "Characters | Ainul Archive" }, { property: "og:description", content: "The complete character index of the Ainul universe." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: CharactersRoute,
});
function CharactersRoute() { const { q, tag } = Route.useSearch(); return <CharactersIndex query={q} tag={tag} />; }
