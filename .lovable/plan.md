# Ainul Archive

## Goal
Build a complete dark-fantasy encyclopedia at `/` with a shared archive layout, dedicated lore sections, global search, tag filters, linked character relationships, and generated breadcrumbs.

## Experience
- Create a black, gothic visual system with restrained violet accents, parchment-like text contrast, ornamental borders, and elegant fantasy display typography.
- Use an app-like archive layout: persistent desktop navigation, compact mobile navigation, global search, breadcrumbs, and dense readable article pages.
- Add subtle page and interaction motion while respecting reduced-motion settings.
- Generate cohesive original dark-fantasy character artwork for the archive rather than using external stock imagery.

## Pages and content
- Home: archive overview, featured entries, collection counts, and recent lore highlights.
- Collection pages: Fragments, Fusions, Seven Thrones, Ainul, Beast, Timeline, AMA Archive, FAQ, and Power Scaling.
- Character index and detail pages generated from JSON records containing name, title, aspect, description, abilities, combat attributes, relationships, image, and tags.
- Seed the archive with clearly original sample lore so every page is populated and demonstrates the system; future entries can be added through JSON alone.

## Search and navigation
- Search across character names, titles, aspects, descriptions, abilities, tags, timeline entries, FAQ, and AMA content.
- Keep search and tag state in the URL for shareable filtered views.
- Add tag chips, useful empty states, keyboard-friendly controls, and responsive results.
- Resolve relationship names into links to related character pages.
- Generate breadcrumbs from route and entry metadata.

## Technical details
- Keep lore in typed JSON files with a small repository layer for indexing, filtering, related-entry lookup, and collection counts.
- Create a route for every named section plus dynamic character detail routes, each with unique metadata and appropriate not-found states.
- Build reusable archive shell, search, breadcrumb, entry card, lore article, attribute meter, and relationship components.
- Use bundled assets and semantic design tokens; no database or login is needed for this read-only archive.
- Verify the central search-to-character flow and responsive layouts on desktop and mobile.
