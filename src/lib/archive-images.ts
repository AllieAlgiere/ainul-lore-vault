
const portraits = import.meta.glob<{ url: string }>("@/assets/portraits/*.asset.json", { eager: true, import: "default" });
const locations = import.meta.glob<{ url: string }>("@/assets/glitch-hell/*.asset.json", { eager: true, import: "default" });
const byFilename = (assets: Record<string, { url: string }>) => Object.fromEntries(Object.entries(assets).map(([path, asset]) => [path.split("/").pop()!.replace(".asset.json", ""), asset.url]));

export const archiveImages: Record<string, string> = { ...byFilename(portraits), ...byFilename(locations) };
