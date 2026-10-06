import { Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, BookOpenText, Crown, Flame, HelpCircle, Menu, Search, Shield, Sparkles, Swords, Timer, Users, X } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { to: "/fragments", label: "Fragments", icon: Sparkles },
  { to: "/fusions", label: "Fusions", icon: Users },
  { to: "/thrones", label: "Seven Thrones", icon: Crown },
  { to: "/ainul", label: "Ainul", icon: BookOpen },
  { to: "/beast", label: "Beast", icon: Flame },
  { to: "/origin-comic", label: "Origin Comic", icon: BookOpenText },
  { to: "/timeline", label: "Timeline", icon: Timer },
  { to: "/ama", label: "AMA Archive", icon: Search },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/powerscaling", label: "Power Scaling", icon: Swords },
] as const;

function SearchBox({ compact = false, onSubmit }: { compact?: boolean; onSubmit?: () => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const submit = (event: FormEvent) => {
    event.preventDefault();
    void navigate({ to: "/search", search: { q: query, type: "" } });
    onSubmit?.();
  };
  return (
    <form onSubmit={submit} role="search" className="relative">
      <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the archive…" aria-label="Search all lore" className={compact ? "h-10 border-border/70 bg-muted/40 pl-9 pr-10" : "h-11 border-border/70 bg-muted/30 pl-10 pr-10"} />
      {query && <Button type="button" variant="ghost" size="icon" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground"><X /></Button>}
    </form>
  );
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav aria-label="Archive sections" className={mobile ? "grid gap-1" : "grid gap-0.5"}>
      <Link to="/characters" search={{ q: "", tag: "" }} activeProps={{ className: "bg-accent text-accent-foreground border-primary/40" }} className="flex min-h-10 items-center gap-3 border-l-2 border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"><Shield aria-hidden="true" className="size-4" />All Characters</Link>
      {nav.map(({ to, label, icon: Icon }) => <Link key={to} to={to} activeProps={{ className: "bg-accent text-accent-foreground border-primary/40" }} className="flex min-h-10 items-center gap-3 border-l-2 border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"><Icon aria-hidden="true" className="size-4" />{label}</Link>)}
    </nav>
  );
}

export function ArchiveShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground"><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur md:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Ainul Archive home"><span className="archive-sigil">A</span><span className="font-display text-lg text-foreground">Ainul Archive</span></Link>
          <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open archive navigation"><Menu /></Button></SheetTrigger><SheetContent side="right" className="w-[88%] overflow-y-auto border-border bg-background p-5"><SheetHeader className="text-left"><SheetTitle className="font-display text-xl">Ainul Archive</SheetTitle><SheetDescription>Navigate the collected records.</SheetDescription></SheetHeader><div className="mt-6"><SearchBox compact /><div className="my-5 h-px bg-border" /><NavLinks mobile /></div></SheetContent></Sheet>
        </div>
      </header>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-border/70 bg-sidebar md:flex md:flex-col">
        <div className="border-b border-border/70 px-7 py-7"><Link to="/" className="flex items-center gap-4"><span className="archive-sigil archive-sigil-lg">A</span><div><span className="block font-display text-xl text-sidebar-foreground">Ainul Archive</span><span className="mt-0.5 block text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Compendium of the Veil</span></div></Link></div>
        <div className="px-5 py-5"><SearchBox compact /></div><div className="ornament-line mx-5 mb-4" />
        <div className="min-h-0 flex-1 overflow-y-auto px-4"><NavLinks /></div>
        <div className="border-t border-border/70 px-7 py-5 text-xs leading-relaxed text-muted-foreground">Archive cycle <span className="text-foreground">1194 AS</span><br />Four sovereign records indexed</div>
      </aside>
      <main id="main-content" tabIndex={-1} className="md:pl-72 focus:outline-none">{children}</main>
    </div>
  );
}

export function MobileNavClose({ children }: { children: ReactNode }) { return <SheetClose asChild>{children}</SheetClose>; }
