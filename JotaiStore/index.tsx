import { atom } from "jotai";

export const loginGlobalFlag = atom<any>(false);
export const globalDictionaries = atom<any>({});
export const travellersGlobal = atom<any>([]);
export const selectedOptionsGlobal = atom<any>({});
export const sortFilter = atom<any>("Relevance");
