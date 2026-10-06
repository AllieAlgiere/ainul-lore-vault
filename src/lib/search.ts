import ainul from "@/data/ainul.json";
import beast from "@/data/beast.json";
import { ama, characters, faq, thrones, timeline } from "@/lib/archive";
import { comicChapters } from "@/lib/origin-comic";

export type SearchResult = { id: string; type: string; title: string; snippet: string; href: string; text: string };

const lower = (parts: (string | undefined)[]) => parts.filter(Boolean).join(" ").toLowerCase();

// Built from the JSON data so new entries become searchable automatically.
export const searchIndex: SearchResult[] = [
  ...characters.map((c) => ({ id: `c-${c.id}`, type: "Character", title: c.name, snippet: `${c.title} · ${c.aspect}`, href: `/characters/${c.id}`, text: lower([c.name, c.title, c.aspect, c.kind, c.description, ...c.abilities, c.combatAttributes, ...c.tags, ...c.relationships]) })),
  ...characters.flatMap((c) => c.relationships.map((r) => ({ id: `r-${c.id}-${r}`, type: "Relationship", title: `${c.name} ↔ ${r}`, snippet: `Relationship recorded on ${c.name}'s page`, href: `/characters/${c.id}`, text: lower([c.name, r, "relationship"]) }))),
  ...characters.filter((c) => c.fusionOf?.length).map((c) => ({ id: `f-${c.id}`, type: "Fusion link", title: `${c.name} = ${c.fusionOf!.join(" + ")}`, snippet: "Fusion components", href: `/characters/${c.id}`, text: lower([c.name, ...c.fusionOf!, "fusion"]) })),
  ...timeline.map((e) => ({ id: `t-${e.id}`, type: "Timeline", title: e.title, snippet: e.description, href: "/timeline", text: lower([e.title, e.description, e.year, e.category, ...(e.characters as string[])]) })),
  ...ama.map((e) => ({ id: `a-${e.id}`, type: "AMA", title: e.question, snippet: [e.answer].flat().join(" "), href: "/ama", text: lower([e.question, ...[e.answer].flat(), ...(e.tags as string[]), ...(e.characters as string[])]) })),
  ...faq.map((e) => ({ id: `q-${e.id}`, type: "FAQ", title: e.question, snippet: e.answer, href: "/faq", text: lower([e.question, e.answer]) })),
  ...thrones.map((t) => ({ id: `th-${t.id}`, type: "Throne", title: t.name, snippet: t.description, href: "/thrones", text: lower([t.name, t.domain, t.description, t.keeper ?? ""]) })),
  ...comicChapters.map((ch) => ({ id: `oc-${ch.id}`, type: "Origin Comic", title: ch.title, snippet: ch.description, href: `/origin-comic/${ch.id}`, text: lower([ch.title, ch.description]) })),
  ...[{ d: ainul, href: "/ainul" }, { d: beast, href: "/beast" }].flatMap(({ d, href }) => [
    { id: `d-${href}`, type: "Lore", title: d.title, snippet: d.description, href, text: lower([d.title, d.description, d.subtitle, ...d.list]) },
    ...d.sections.map((s) => ({ id: `d-${href}-${s.title}`, type: "Lore", title: `${d.title}: ${s.title}`, snippet: s.body, href, text: lower([s.title, s.body]) })),
  ]),
];

export const searchTypes = [...new Set(searchIndex.map((r) => r.type))];

export function searchArchive(query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return searchIndex
    .filter((r) => words.every((w) => r.text.includes(w)))
    .map((r) => ({ r, score: (r.title.toLowerCase().includes(words.join(" ")) ? 10 : 0) + (r.type === "Character" ? 5 : 0) }))
    .sort((a, b) => b.score - a.score)
    .map(({ r }) => r);
}
