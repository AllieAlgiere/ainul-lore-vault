import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Breadcrumbs, EmptyArchive, PageHeader } from "@/components/archive/archive-ui";
import { searchArchive, searchTypes } from "@/lib/search";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s["q"] === "string" ? s["q"].slice(0, 100) : "", type: typeof s["type"] === "string" ? s["type"].slice(0, 40) : "" }),
  head: () => ({ meta: [{ title: "Search | Ainul Archive" }, { name: "description", content: "Search characters, relationships, lore, timeline, AMA answers and the Origin Comic." }, { property: "og:title", content: "Search the Ainul Archive" }, { property: "og:description", content: "Find any character, relationship or lore record in the archive." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: SearchPage,
});

const chip = (active: boolean) => `min-h-10 border px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] transition-colors ${active ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`;

function SearchPage() {
  const { q, type } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const all = searchArchive(q);
  const results = type ? all.filter((r) => r.type === type) : all;
  const update = (next: { q?: string; type?: string }) => void navigate({ search: (prev) => ({ ...prev, ...next }), replace: true });
  return <>
    <PageHeader eyebrow="Whole-archive index" title="Search the Archive" description="Characters, relationships, fusions, timeline, AMA answers, FAQ, thrones and the Origin Comic." />
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Search" }]} />
      <label className="relative block"><span className="sr-only">Search all lore</span><Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input type="search" value={q} onChange={(e) => update({ q: e.target.value })} placeholder="Names, aspects, relationships, events…" className="h-12 bg-card pl-10" /></label>
      {q && <div role="group" aria-label="Filter results by type" className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <button type="button" aria-pressed={type === ""} onClick={() => update({ type: "" })} className={chip(type === "")}>All · {all.length}</button>
        {searchTypes.map((t) => { const n = all.filter((r) => r.type === t).length; return n ? <button key={t} type="button" aria-pressed={type === t} onClick={() => update({ type: t })} className={`shrink-0 ${chip(type === t)}`}>{t} · {n}</button> : null; })}
      </div>}
      <p aria-live="polite" className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">{q ? `${results.length} results for “${q}”` : "Type to search every record"}</p>
      {q && (results.length ? <ul className="mt-4 divide-y divide-border border-y border-border">{results.map((r) => <li key={r.id}><a href={r.href} className="block px-2 py-4 hover:bg-accent/40"><span className="text-[10px] uppercase tracking-[0.18em] text-primary">{r.type}</span><span className="mt-1 block font-display text-xl text-foreground">{r.title}</span><span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{r.snippet}</span></a></li>)}</ul> : <div className="mt-4"><EmptyArchive /></div>)}
    </div>
  </>;
}
