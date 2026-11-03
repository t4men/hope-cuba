import { createContext, useContext } from "react";
import type { Lang } from "@/app/routes-map";
import { de, type Dict } from "./de";
import { en } from "./en";
import { es } from "./es";

export const dicts: Record<Lang, Dict> = { de, en, es };
export const getDict = (lang: Lang) => dicts[lang];

export const LangContext = createContext<Lang>("de");
export const useLang = () => useContext(LangContext);
export const useT = () => dicts[useLang()];
export type { Dict };
