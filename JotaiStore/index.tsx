import { atom } from "jotai";

export const loginGlobalFlag = atom<any>(false);
export const globalDictionaries = atom<any>({});
export const travellersGlobal = atom<any>([]);
export const selectedOptionsGlobal = atom<any>({});
export const sortFilter = atom<any>("Relevance");
export const selectedFlightGlobal = atom<any>({});
export const passengerDetailsGlobal = atom<any>([]);
export const currentPassengerIndex = atom<any>(0);
