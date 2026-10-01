import fragments from "@/data/fragments.json";
import fusions from "@/data/fusions.json";
import thrones from "@/data/thrones.json";
import timeline from "@/data/timeline.json";
import ama from "@/data/ama-archive.json";
import faq from "@/data/faq.json";
import powerscaling from "@/data/powerscaling.json";

export type CombatAttributes = string;
export type Character = {
  id: string; name: string; title: string; kind: "Fragment" | "Fusion"; aspect: string;
  description: string; abilities: string[]; combatAttributes: CombatAttributes;
  relationships: string[]; fusionOf?: string[]; image: string; tags: string[];
  disposition?: string; favoriteFood?: string; quotes?: string[];
};
export type TimelineEntry = (typeof timeline)[number];
export type LinkedEntry = (typeof ama)[number] | (typeof faq)[number];

export const characters = [...fragments, ...fusions] as Character[];
export const fragmentCharacters = fragments as Character[];
export const fusionCharacters = fusions as Character[];
export { thrones, timeline, ama, faq, powerscaling };

export const characterById = (id: string) => characters.find((character) => character.id === id.toLowerCase());
export const characterByName = (name: string) => characters.find((character) => character.name.toLowerCase() === name.toLowerCase());
export const characterHref = (name: string) => `/characters/${characterByName(name)?.id ?? name.toLowerCase()}`;
export const fusionsFor = (name: string) => fusionCharacters.filter((character) => character.fusionOf?.includes(name));
export const timelineFor = (name: string) => timeline.filter((entry) => (entry.characters as string[]).includes(name));
export const amaFor = (name: string) => ama.filter((entry) => (entry.characters as string[]).includes(name));
export const faqFor = (name: string) => faq.filter((entry) => (entry.characters as string[]).includes(name));
export const powerFor = (name: string) => powerscaling.find((entry) => entry.character === name);
export const allTags = [...new Set(characters.flatMap((character) => character.tags))].sort();
export const filterCharacters = (query: string, tag: string) => {
  const needle = query.trim().toLowerCase();
  return characters.filter((character) => {
    const haystack = [character.name, character.title, character.kind, character.aspect, character.description, ...character.abilities, character.combatAttributes, character.disposition ?? "", ...character.tags].join(" ").toLowerCase();
    return (!needle || haystack.includes(needle)) && (!tag || character.tags.includes(tag));
  });
};

export const thronesFor = (character: Character) => thrones.filter((throne) => throne.keeper === character.name || (character.fusionOf ?? []).includes(throne.keeper ?? ""));
export const parentCategory = (character: Character) => character.kind === "Fusion" ? { label: "Fusions", to: "/fusions" } : { label: "Fragments", to: "/fragments" };
export const timelineCategories = ["Fragment Lore", "Fusion Lore", "Thrones", "Ainul", "Beast"] as const;
