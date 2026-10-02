import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, BookOpenText, Crown, Search, Sparkles, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CharacterCard } from "@/components/archive/archive-ui";
import { characters, timeline } from "@/lib/archive";
import { comicChapters, comicPageCount } from "@/lib/origin-comic";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Ainul Archive — Compendium of the Veil" },
    { name: "description", content: "Explore the Fragments, Fusions, Seven Thrones, and hidden chronology of the Ainul universe." },
    { property: "og:title", content: "Ainul Archive — Compendium of the Veil" },
    { property: "og:description", content: "A searchable dark fantasy encyclopedia of sovereign powers and forbidden histories." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Home,
});

function Home() {
  return <>
    <section className="home-hero relative flex min-h-[68vh] items-end overflow-hidden border-b border-border px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:min-h-[76vh] lg:px-12">
      <div className="absolute inset-0 archive-stars opacity-60" /><div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-6xl"><p className="archive-eyebrow">The sealed record · Cycle 1194 AS</p><h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] text-foreground sm:text-7xl lg:text-8xl">Ainul <span className="text-primary">Archive</span></h1><p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">An account of divided gods, impossible unions, and the seven seats upon which every ending waits.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/characters" search={{ q: "", tag: "" }}><Search />Search the records</Link></Button><Button asChild variant="outline" size="lg"><Link to="/timeline"><Timer />Read the chronology</Link></Button></div></div>
    </section>
    <section className="border-b border-border"><div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-border border-x border-border md:grid-cols-4 md:divide-y-0">{[["04","Named Powers"],["07","Ancient Thrones"],["05","Recorded Events"],["01","Present Cycle"]].map(([value,label]) => <div key={label} className="px-5 py-7 sm:px-7"><strong className="font-display text-3xl text-primary">{value}</strong><span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span></div>)}</div></section>
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="archive-eyebrow">Principal records</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Sovereign Entities</h2></div><Link to="/characters" search={{ q: "", tag: "" }} className="hidden items-center gap-2 text-sm text-primary sm:flex">View all <ArrowRight className="size-4" /></Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{characters.map((character, index) => <CharacterCard key={character.id} character={character} priority={index === 0} />)}</div></section>
    <section className="border-y border-border bg-card/35"><div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20"><div><p className="archive-eyebrow">Open the codex</p><h2 className="mt-3 font-display text-4xl">Begin with a collection</h2><p className="mt-4 max-w-md leading-7 text-muted-foreground">Every record is cross-indexed. Follow a name, event, sigil, or throne to uncover its place in the greater pattern.</p></div><div className="grid gap-px bg-border sm:grid-cols-2">{[
      {to:"/origin-comic",icon:BookOpenText,title:"Origin Comic",copy:`The canonical beginning · ${comicChapters.length} chapters, ${comicPageCount} pages.`},{to:"/fragments",icon:Sparkles,title:"The Fragments",copy:"Sovereign principles given will and form."},{to:"/thrones",icon:Crown,title:"Seven Thrones",copy:"Seats of cosmic obligation and rule."},{to:"/timeline",icon:Timer,title:"The Timeline",copy:"A chronology of fractures and concords."},{to:"/ama",icon:BookOpen,title:"AMA Records",copy:"Curator answers from the sealed archive."}
    ].map(({to,icon:Icon,title,copy}) => <Link key={to} to={to} className="group bg-background p-6 transition-colors hover:bg-accent/40"><Icon className="size-5 text-primary" /><h3 className="mt-5 font-display text-xl group-hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></Link>)}</div></div></section>
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20"><p className="archive-eyebrow">From the chronology</p><div className="mt-7 grid gap-0 border-l border-border">{timeline.slice(-3).reverse().map((event) => <Link key={event.id} to="/timeline" className="group relative border-b border-border py-6 pl-7 transition-colors hover:bg-card/40"><span className="absolute -left-1 top-8 size-2 bg-primary" /><p className="text-xs uppercase tracking-widest text-primary">{event.year} · {event.era}</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">{event.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{event.description}</p></Link>)}</div></section>
  </>;
}
