import { useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { allTags, filterCharacters, powerFor, powerscaling } from "@/lib/archive";
import { timeline } from "@/lib/archive";
import { comicChapters } from "@/lib/origin-comic";
import { Breadcrumbs, CharacterCard, EmptyArchive, PageHeader } from "./archive-ui";

export function CharactersIndex({ query, tag, kind = "", tier = "" }: { query: string; tag: string; kind?: string; tier?: string }) {
  const navigate = useNavigate({ from: "/characters/" });
  const tiers = [...new Set(powerscaling.map((p) => p.tier))];
  const results = filterCharacters(query, tag).filter((c) => (!kind || c.kind === kind) && (!tier || (tier === "Unranked" ? !powerFor(c.name) : powerFor(c.name)?.tier === tier))).sort((a, b) => tier ? (powerFor(a.name)?.rank ?? 99) - (powerFor(b.name)?.rank ?? 99) : 0);
  const sel = "h-10 border border-border bg-background px-3 text-sm text-foreground focus:border-primary";
  const needle = query.trim().toLowerCase();
  const comicResults = !tag && needle ? comicChapters.filter((chapter) => [chapter.title, chapter.description].join(" ").toLowerCase().includes(needle)) : [];
  const comicEvents = !tag && needle ? timeline.filter((event) => "comicChapter" in event && [event.title, event.description].join(" ").toLowerCase().includes(needle)) : [];
  const update = (next: { q?: string; tag?: string; kind?: string; tier?: string }) => void navigate({ search: (prev) => ({ ...prev, ...next }), replace: true });
  return <>
    <PageHeader eyebrow="Indexed entities" title="Character Archive" description="Fragments, Fusions, sovereigns, and named powers recorded across the surviving cycles." />
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10"><Breadcrumbs items={[{ label: "Characters" }]} />
      <div className="mb-8 border-y border-border bg-card/40 py-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center"><label className="relative block flex-1"><span className="sr-only">Search characters</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => update({ q: event.target.value })} placeholder="Search names, aspects, abilities…" className="h-11 bg-background pl-10 pr-10" />{query && <Button variant="ghost" size="icon" onClick={() => update({ q: "" })} aria-label="Clear character search" className="absolute right-0 top-1/2 -translate-y-1/2"><X /></Button>}</label><div aria-live="polite" className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><SlidersHorizontal className="size-4" />{results.length} records</div></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><select aria-label="Filter by category" value={kind} onChange={(e) => update({ kind: e.target.value })} className={sel}><option value="">All categories</option><option value="Fragment">Fragments</option><option value="Fusion">Fusions</option></select><select aria-label="Filter by power ranking" value={tier} onChange={(e) => update({ tier: e.target.value })} className={sel}><option value="">All power rankings</option>{tiers.map((t) => <option key={t} value={t}>{t}</option>)}<option value="Unranked">Unranked</option></select></div><div role="group" aria-label="Filter by tag" className="mt-4 flex gap-2 overflow-x-auto pb-1"><Button variant={tag === "" ? "default" : "outline"} size="sm" aria-pressed={tag === ""} onClick={() => update({ tag: "" })}>All</Button>{allTags.map((item) => <Button key={item} variant={tag === item ? "default" : "outline"} size="sm" aria-pressed={tag === item} onClick={() => update({ tag: item })} className="capitalize">{item}</Button>)}</div></div>
      {(comicResults.length > 0 || comicEvents.length > 0) && <section className="mb-10 border-y border-border py-6"><p className="archive-eyebrow">Comic records</p><div className="mt-4 grid gap-px bg-border sm:grid-cols-2">{comicResults.map((chapter) => <a key={chapter.id} href={`/origin-comic/${chapter.id}`} className="bg-background p-4 hover:bg-accent/40"><h2 className="font-display text-xl text-primary">{chapter.title}</h2><p className="mt-1 text-sm text-muted-foreground">{chapter.description}</p></a>)}{comicEvents.map((event) => <a key={event.id} href={`/origin-comic/${"comicChapter" in event ? event.comicChapter : ""}`} className="bg-background p-4 hover:bg-accent/40"><h2 className="font-display text-xl text-primary">{event.title}</h2><p className="mt-1 text-sm text-muted-foreground">{event.description}</p></a>)}</div></section>}
      {results.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map((character) => <CharacterCard key={character.id} character={character} />)}</div> : comicResults.length === 0 && comicEvents.length === 0 ? <EmptyArchive /> : null}
    </div>
  </>;
}
