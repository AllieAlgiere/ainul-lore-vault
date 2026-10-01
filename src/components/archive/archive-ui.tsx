import { Link } from "@tanstack/react-router";
import { ChevronRight, SearchX } from "lucide-react";
import type { ReactNode } from "react";
import { archiveImages } from "@/lib/archive-images";
import { characterByName, characterHref, type Character } from "@/lib/archive";

export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <header className="archive-header border-b border-border/70"><div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14"><p className="archive-eyebrow">{eyebrow}</p><h1 className="mt-3 font-display text-4xl leading-none text-foreground sm:text-5xl lg:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>{children}</div></header>;
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/" className="transition-colors hover:text-primary">Archive</Link>{items.map((item) => <span key={item.label} className="flex items-center gap-1.5"><ChevronRight className="size-3" />{item.to ? <Link to={item.to} className="transition-colors hover:text-primary">{item.label}</Link> : <span className="text-foreground">{item.label}</span>}</span>)}</nav>;
}

export function CharacterCard({ character, priority = false }: { character: Character; priority?: boolean }) {
  const image = archiveImages[character.image];
  return <Link to="/characters/$id" params={{ id: character.id }} className="group block overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_18px_60px_-30px_var(--shadow-color)]"><div className="relative aspect-[4/5] overflow-hidden bg-muted">{image && <img src={image} alt={`Portrait of ${character.name}`} width={1024} height={1280} loading={priority ? "eager" : "lazy"} className="h-full w-full object-cover grayscale-[18%] transition-transform duration-700 group-hover:scale-[1.035]" />}<div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" /><span className="absolute left-4 top-4 border border-primary/40 bg-background/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur">{character.kind}</span></div><div className="relative -mt-16 p-5"><p className="text-xs uppercase tracking-[0.18em] text-primary">{character.aspect}</p><h2 className="mt-2 font-display text-3xl text-card-foreground">{character.name}</h2><p className="mt-1 text-sm italic text-muted-foreground">{character.title}</p><div className="mt-5 flex flex-wrap gap-1.5">{character.tags.slice(0, 3).map((tag) => <span key={tag} className="border border-border bg-muted/70 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">{tag}</span>)}</div></div></Link>;
}

export function CharacterLink({ name }: { name: string }) {
  const character = characterByName(name);
  if (!character) return <span>{name}</span>;
  return <Link to="/characters/$id" params={{ id: character.id }} className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-foreground">{name}</Link>;
}

export function CharacterMiniCard({ name }: { name: string }) {
  const character = characterByName(name);
  if (!character) return null;
  const image = archiveImages[character.image];
  return <Link to="/characters/$id" params={{ id: character.id }} className="group flex items-center gap-3 border border-border bg-card p-3 transition-colors hover:border-primary/50"><div className="size-14 shrink-0 overflow-hidden bg-muted">{image && <img src={image} alt="" width={1024} height={1280} loading="lazy" className="h-full w-full object-cover" />}</div><div className="min-w-0"><p className="font-display text-lg text-foreground group-hover:text-primary">{character.name}</p><p className="truncate text-xs text-muted-foreground">{character.title}</p></div><ChevronRight className="ml-auto size-4 text-muted-foreground" /></Link>;
}

export function EmptyArchive() { return <div className="border border-dashed border-border px-6 py-16 text-center"><SearchX className="mx-auto size-7 text-muted-foreground" /><h2 className="mt-4 font-display text-2xl">No record answers that name</h2><p className="mt-2 text-sm text-muted-foreground">Try another term or remove the active sigil.</p></div>; }

export function ArticleSection({ title, children }: { title: string; children: ReactNode }) { return <section className="border-t border-border pt-7"><h2 className="font-display text-2xl text-foreground sm:text-3xl">{title}</h2><div className="mt-4 text-[15px] leading-7 text-muted-foreground">{children}</div></section>; }

export function CollectionGrid({ characters }: { characters: Character[] }) { return <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{characters.map((character) => <CharacterCard key={character.id} character={character} />)}</div>; }

export const hrefForCharacterName = characterHref;
