import comicData from "@/data/origin-comic.json";

const assets = import.meta.glob<{ url: string }>("@/assets/comic/*.asset.json", { eager: true, import: "default" });
const assetUrls = Object.fromEntries(
  Object.entries(assets).map(([path, asset]) => [path.split("/").pop()?.replace(".asset.json", ""), asset.url]),
);

export const originComic = comicData;
export const comicChapters = comicData.chapters.map((chapter) => ({
  ...chapter,
  pages: chapter.pages.map((image, index) => ({
    image,
    pageNumber: comicData.chapters.slice(0, comicData.chapters.indexOf(chapter)).reduce((total, item) => total + item.pages.length, 0) + index + 1,
    url: assetUrls[image] ?? "",
  })),
}));

export type ComicChapter = (typeof comicChapters)[number];
export const comicChapterById = (id: string) => comicChapters.find((chapter) => chapter.id === id);
export const comicPageCount = comicChapters.reduce((total, chapter) => total + chapter.pages.length, 0);