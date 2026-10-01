import { useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { allTags, filterCharacters } from "@/lib/archive";
import { Breadcrumbs, CharacterCard, EmptyArchive, PageHeader } from "./archive-ui";

export function CharactersIndex({ query, tag }: { query: string; tag: string }) {
  const navigate = useNavigate({ from: "/characters" });
  const results = filterCharacters(query, tag);
  const update = (next: { q?: string; tag?: string }) => void navigate({ search: (prev) => ({ ...prev, ...next }), replace: true });
  return <>
    <PageHeader eyebrow="Indexed entities" title="Character Archive" description="Fragments, Fusions, sovereigns, and named powers recorded across the surviving cycles." />
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10"><Breadcrumbs items={[{ label: "Characters" }]} />
      <div className="mb-8 border-y border-border bg-card/40 py-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center"><label className="relative block flex-1"><span className="sr-only">Search characters</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => update({ q: event.target.value })} placeholder="Search names, aspects, abilities…" className="h-11 bg-background pl-10 pr-10" />{query && <Button variant="ghost" size="icon" onClick={() => update({ q: "" })} aria-label="Clear character search" className="absolute right-0 top-1/2 -translate-y-1/2"><X /></Button>}</label><div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><SlidersHorizontal className="size-4" />{results.length} records</div></div><div className="mt-4 flex gap-2 overflow-x-auto pb-1"><Button variant={tag === "" ? "default" : "outline"} size="sm" onClick={() => update({ tag: "" })}>All</Button>{allTags.map((item) => <Button key={item} variant={tag === item ? "default" : "outline"} size="sm" onClick={() => update({ tag: item })} className="capitalize">{item}</Button>)}</div></div>
      {results.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map((character) => <CharacterCard key={character.id} character={character} />)}</div> : <EmptyArchive />}
    </div>
  </>;
}
