import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ama, characters, timeline, timelineCategories } from "@/lib/archive";
import { archiveImages } from "@/lib/archive-images";
import { Breadcrumbs, CharacterLink, PageHeader } from "./archive-ui";

const chip = (active: boolean) =>
  `border px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] transition-colors ${active ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`;

export function TimelinePage() {
  const [active, setActive] = useState<string[]>([]);
  const sorted = useMemo(() => [...timeline].sort((a, b) => a.year.localeCompare(b.year) || a.id.localeCompare(b.id)), []);
  const counts = Object.fromEntries(timelineCategories.map((c) => [c, timeline.filter((e) => e.category === c).length]));
  const events = active.length ? sorted.filter((e) => active.includes(e.category)) : sorted;
  const toggle = (c: string) => setActive((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  return (
    <>
      <PageHeader eyebrow="Chronology of the veil" title="Timeline" description="Every recorded revelation, in the order it surfaced." />
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <Breadcrumbs items={[{ label: "Timeline" }]} />
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setActive([])} className={chip(active.length === 0)}>All · {timeline.length}</button>
          {timelineCategories.map((c) => (
            <button key={c} type="button" aria-pressed={active.includes(c)} onClick={() => toggle(c)} className={chip(active.includes(c))}>{c} · {counts[c]}</button>
          ))}
        </div>
        {events.length === 0 ? (
          <p className="border border-dashed border-border p-8 text-center italic text-muted-foreground">No surviving events are recorded under this filter.</p>
        ) : (
          <div className="relative border-l border-border pl-6 sm:pl-10">
            {events.map((event) => (
              <article key={event.id} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[1.72rem] top-1 size-3 border-2 border-primary bg-background sm:-left-[2.84rem]" />
                <p className="text-xs uppercase tracking-[0.18em] text-primary">{event.year} · {event.category}</p>
                <h2 className="mt-2 font-display text-3xl">{event.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{event.description}</p>
                {event.characters.length > 0 && <div className="mt-3 flex flex-wrap gap-x-3 text-sm">{event.characters.map((name) => <CharacterLink key={name} name={name} />)}</div>}
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const amaCharacters = [...new Set(ama.flatMap((e) => e.characters as string[]))].sort();
const amaTopics = [...new Set(ama.flatMap((e) => e.tags as string[]))].sort();
const amaDates = [...new Set(ama.map((e) => e.date))].sort();
const avatarFor = (name: string) => {
  const c = characters.find((x) => x.name.toLowerCase() === name.toLowerCase());
  return c ? archiveImages[c.image] : undefined;
};

export function AmaPage() {
  const [q, setQ] = useState("");
  const [character, setCharacter] = useState("");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ama.filter((e) =>
      (!character || (e.characters as string[]).includes(character)) &&
      (!topic || (e.tags as string[]).includes(topic)) &&
      (!date || e.date === date) &&
      (!needle || [e.question, e.answer, e.questioner ?? "", ...(e.tags as string[]), ...(e.characters as string[])].join(" ").toLowerCase().includes(needle)),
    );
  }, [q, character, topic, date]);
  const select = "h-10 border border-border bg-card px-3 text-sm text-foreground focus:border-primary focus:outline-none";
  const filtered = q || character || topic || date;
  return (
    <>
      <PageHeader eyebrow="Curator correspondence" title="AMA Archive" description="Questions submitted to the keepers of the record, preserved with their official answers." />
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <Breadcrumbs items={[{ label: "AMA Archive" }]} />
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="relative sm:col-span-2 lg:col-span-4">
            <span className="sr-only">Search by keyword</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value.slice(0, 100))} placeholder="Search questions and answers…" className="h-11 w-full border border-border bg-card pl-10 pr-3 text-sm focus:border-primary focus:outline-none" />
          </label>
          <select aria-label="Filter by character" value={character} onChange={(e) => setCharacter(e.target.value)} className={select}><option value="">All characters</option>{amaCharacters.map((c) => <option key={c}>{c}</option>)}</select>
          <select aria-label="Filter by topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={select}><option value="">All topics</option>{amaTopics.map((t) => <option key={t}>{t}</option>)}</select>
          <select aria-label="Filter by date" value={date} onChange={(e) => setDate(e.target.value)} className={select}><option value="">All dates</option>{amaDates.map((d) => <option key={d}>{d}</option>)}</select>
          <button type="button" disabled={!filtered} onClick={() => { setQ(""); setCharacter(""); setTopic(""); setDate(""); }} className="inline-flex h-10 items-center justify-center gap-2 border border-border text-xs uppercase tracking-widest text-muted-foreground hover:border-primary/50 hover:text-foreground disabled:opacity-40"><X className="size-3" />Clear</button>
        </div>
        <p className="mb-5 text-xs uppercase tracking-widest text-muted-foreground">{results.length} of {ama.length} entries</p>
        {results.length === 0 ? (
          <p className="border border-dashed border-border p-8 text-center italic text-muted-foreground">No correspondence matches this search.</p>
        ) : (
          <div className="divide-y divide-border border border-border bg-card/60">
            {results.map((e) => {
              const asker = e.questioner || "Anonymous";
              const curatorImg = e.characters[0] ? avatarFor(e.characters[0] as string) : undefined;
              return (
                <article key={e.id} className="px-4 py-5 sm:px-6">
                  <div className="flex gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-display text-lg text-primary">{asker[0]?.toUpperCase()}</div>
                    <div className="min-w-0">
                      <p className="text-sm"><span className="font-semibold text-foreground">{asker}</span> <time className="ml-2 text-xs text-muted-foreground">{e.date}</time></p>
                      <p className="mt-1 leading-7 text-foreground/90">{e.question}</p>
                    </div>
                  </div>
                  <div className="ml-5 mt-3 flex gap-3 border-l-2 border-primary/40 pl-5">
                    {curatorImg ? <img src={curatorImg} alt="" className="size-10 shrink-0 rounded-full object-cover object-top" /> : <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 font-display text-lg text-primary">A</div>}
                    <div className="min-w-0">
                      <p className="text-sm"><span className="font-semibold text-primary">Archive Curator</span> <span className="ml-1 rounded-sm bg-primary/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary">Creator</span></p>
                      <p className="mt-1 leading-7 text-muted-foreground">{e.answer}</p>
                      {(e.tags.length > 0 || e.characters.length > 0) && (
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                          {(e.tags as string[]).map((t) => <button key={t} type="button" onClick={() => setTopic(t)} className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground hover:text-primary">#{t}</button>)}
                          {(e.characters as string[]).map((n) => <CharacterLink key={n} name={n} />)}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
