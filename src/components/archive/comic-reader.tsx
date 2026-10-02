import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, List, Minus, Plus, Rows3 } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { Button } from "@/components/ui/button";
import { comicChapters, type ComicChapter } from "@/lib/origin-comic";
import { Breadcrumbs, CharacterLink, PageHeader } from "./archive-ui";

const loreRoutes: Record<string, string> = {
  Ainul: "/ainul", Beast: "/beast", Fragments: "/fragments", Fusions: "/fusions",
  "Seven Thrones": "/thrones", Timeline: "/timeline", FAQ: "/faq", "AMA Archive": "/ama",
};

function ComicPage({ page, eager = false, zoom = 100 }: { page: ComicChapter["pages"][number]; eager?: boolean; zoom?: number }) {
  return <figure id={`page-${page.pageNumber}`} className="mx-auto w-full scroll-mt-24 text-center" style={{ maxWidth: `${zoom}%` }}><img src={page.url} alt={`Origin Comic page ${page.pageNumber}`} width={768} height={1187} loading={eager ? "eager" : "lazy"} className="mx-auto h-auto w-full border border-border bg-foreground shadow-2xl" /><figcaption className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Page {page.pageNumber} of 20</figcaption></figure>;
}

function ChapterNavigation({ chapter }: { chapter: ComicChapter }) {
  const index = comicChapters.findIndex((item) => item.id === chapter.id);
  const previous = comicChapters[index - 1];
  const next = comicChapters[index + 1];
  return <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 border-y border-border py-4"><div>{previous && <Button asChild variant="ghost" className="max-w-full"><Link to="/origin-comic/$chapter" params={{ chapter: previous.id }}><ChevronLeft /> <span className="truncate">{previous.title}</span></Link></Button>}</div><span className="shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground">Chapter {index + 1} of {comicChapters.length}</span><div className="justify-self-end">{next && <Button asChild variant="ghost" className="max-w-full"><Link to="/origin-comic/$chapter" params={{ chapter: next.id }}><span className="truncate">{next.title}</span> <ChevronRight /></Link></Button>}</div></div>;
}

function RelatedLore({ chapter }: { chapter: ComicChapter }) {
  return <section className="border-t border-border pt-8"><p className="archive-eyebrow">Cross-indexed records</p><div className="mt-4 flex flex-wrap gap-2">{chapter.relatedLore.map((name) => loreRoutes[name] ? <Button key={name} asChild variant="outline" size="sm"><Link to={loreRoutes[name]}>{name}</Link></Button> : <Button key={name} asChild variant="outline" size="sm"><Link to="/characters/$id" params={{ id: name.toLowerCase() }} search={{ q: "", tag: "" }}>{name}</Link></Button>)}</div><div className="mt-6"><Button asChild variant="link" className="px-0"><Link to="/timeline">View {chapter.timelineEvents.length} related timeline {chapter.timelineEvents.length === 1 ? "event" : "events"} <ChevronRight /></Link></Button></div></section>;
}

export function ComicReader({ chapter }: { chapter: ComicChapter }) {
  const [mode, setMode] = useState<"single" | "continuous">("single");
  const [pageIndex, setPageIndex] = useState(0);
  const [zoom, setZoom] = useState(100);
  const touchStart = useRef<number | null>(null);
  const current = chapter.pages[pageIndex] ?? chapter.pages[0];
  const chapterIndex = comicChapters.findIndex((item) => item.id === chapter.id);
  const go = (direction: number) => setPageIndex((value) => Math.min(chapter.pages.length - 1, Math.max(0, value + direction)));

  useEffect(() => { setPageIndex(0); setZoom(100); }, [chapter.id]);
  useEffect(() => {
    if (mode !== "single") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, chapter.pages.length]);

  const chapterLabel = useMemo(() => `Chapter ${chapterIndex + 1}`, [chapterIndex]);
  const onTouchEnd = (event: TouchEvent) => {
    if (mode !== "single" || touchStart.current === null) return;
    const distance = event.changedTouches[0]?.clientX ?? touchStart.current;
    const delta = distance - touchStart.current;
    if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
    touchStart.current = null;
  };

  return <>
    <PageHeader eyebrow={`${chapterLabel} · Canon record`} title={chapter.title} description={chapter.description} />
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Origin Comic", to: "/origin-comic" }, { label: chapter.title }]} />
      <div className="mb-8 grid gap-3 border-y border-border bg-card/40 p-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <label className="min-w-0"><span className="sr-only">Select chapter</span><select value={chapter.id} onChange={(event) => { window.location.href = `/origin-comic/${event.target.value}`; }} className="h-9 w-full border border-border bg-background px-3 text-sm text-foreground sm:w-auto">{comicChapters.map((item, index) => <option key={item.id} value={item.id}>Chapter {index + 1}: {item.title}</option>)}</select></label>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:flex">
          <div className="flex min-w-0"><Button type="button" variant={mode === "single" ? "default" : "outline"} size="sm" onClick={() => setMode("single")}><List />Single</Button><Button type="button" variant={mode === "continuous" ? "default" : "outline"} size="sm" onClick={() => setMode("continuous")}><Rows3 />Scroll</Button></div>
          <div className="flex shrink-0"><Button type="button" variant="outline" size="icon" aria-label="Zoom out" disabled={zoom <= 70} onClick={() => setZoom((value) => value - 10)}><Minus /></Button><span className="grid w-12 place-items-center text-xs text-muted-foreground">{zoom}%</span><Button type="button" variant="outline" size="icon" aria-label="Zoom in" disabled={zoom >= 140} onClick={() => setZoom((value) => value + 10)}><Plus /></Button></div>
        </div>
      </div>

      {mode === "single" ? <div onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={onTouchEnd} className="touch-pan-y overflow-x-auto"><ComicPage page={current} eager zoom={zoom} /><div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2"><Button type="button" variant="outline" disabled={pageIndex === 0} onClick={() => go(-1)} className="justify-self-start"><ChevronLeft />Previous</Button><span className="text-xs text-muted-foreground">{pageIndex + 1} / {chapter.pages.length}</span><Button type="button" variant="outline" disabled={pageIndex === chapter.pages.length - 1} onClick={() => go(1)} className="justify-self-end">Next<ChevronRight /></Button></div></div> : <div className="space-y-10 overflow-x-auto">{chapter.pages.map((page, index) => <ComicPage key={page.image} page={page} eager={index === 0} zoom={zoom} />)}</div>}

      <div className="mt-10"><ChapterNavigation chapter={chapter} /></div>
      <RelatedLore chapter={chapter} />
    </div>
  </>;
}

export function OriginComicIndex() {
  return <><PageHeader eyebrow="Primary lore source" title="Origin Comic" description="Begin with the illustrated canon: twenty pages across three chapters, from Ainul's first awakening to the Fragments' shared life." /><div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12"><Breadcrumbs items={[{ label: "Origin Comic" }]} /><div className="grid gap-px bg-border md:grid-cols-3">{comicChapters.map((chapter, index) => <Link key={chapter.id} to="/origin-comic/$chapter" params={{ chapter: chapter.id }} className="group bg-background p-6 transition-colors hover:bg-accent/40"><p className="archive-eyebrow">Chapter {index + 1} · {chapter.pages.length} pages</p><h2 className="mt-3 font-display text-2xl group-hover:text-primary">{chapter.title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{chapter.description}</p><span className="mt-6 inline-flex items-center gap-2 text-sm text-primary">Begin chapter <ChevronRight className="size-4" /></span></Link>)}</div></div></>;
}