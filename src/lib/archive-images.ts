import white from "@/assets/characters/white.jpg";
import red from "@/assets/characters/red.jpg";

const portraits = import.meta.glob<{ url: string }>("@/assets/portraits/*.asset.json", { eager: true, import: "default" });
const uploaded = Object.fromEntries(Object.entries(portraits).map(([path, asset]) => [path.split("/").pop()!.replace(".asset.json", ""), asset.url]));

export const archiveImages: Record<string, string> = { white, red, ...uploaded };
