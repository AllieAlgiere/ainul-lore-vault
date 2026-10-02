import { createFileRoute, notFound } from "@tanstack/react-router";
import { ComicReader } from "@/components/archive/comic-reader";
import { comicChapterById } from "@/lib/origin-comic";
export const Route = createFileRoute("/origin-comic/$chapter")({
  loader: ({ params }) => comicChapterById(params.chapter) ?? notFound(),
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Origin Comic"} | Ainul Archive` }, { name: "description", content: loaderData?.description ?? "Read the canonical origin comic." }, { property: "og:title", content: `${loaderData?.title ?? "Origin Comic"} | Ainul Archive` }, { property: "og:description", content: loaderData?.description ?? "Read the canonical origin comic." }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ChapterRoute,
});
function ChapterRoute() { return <ComicReader chapter={Route.useLoaderData()} />; }