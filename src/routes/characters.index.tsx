import { createFileRoute } from "@tanstack/react-router";
import { CharactersIndex } from "@/components/archive/characters-index";

const str = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : "");
export const Route = createFileRoute("/characters/")({
  validateSearch: (search: Record<string, unknown>) => ({ q: str(search["q"], 100), tag: str(search["tag"], 40), kind: str(search["kind"], 20), tier: str(search["tier"], 40) }),
  head: () => ({ meta: [{ title: "Characters | Ainul Archive" }, { name: "description", content: "Search every Fragment, Fusion, sovereign, and named power in the Ainul Archive." }, { property: "og:title", content: "Characters | Ainul Archive" }, { property: "og:description", content: "The complete character index of the Ainul universe." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: CharactersRoute,
});
function CharactersRoute() { const { q, tag, kind, tier } = Route.useSearch(); return <CharactersIndex query={q} tag={tag} kind={kind} tier={tier} />; }
