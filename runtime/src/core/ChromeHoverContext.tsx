import { createContext, useContext } from "react";

import type { RealmHoverTintValue } from "./RealmHoverTintContext";

/** Debounced chrome tint preview (OS shell); null when unset. */
export type ChromeHoverSchedule = (t: RealmHoverTintValue) => void;

export const ChromeHoverContext = createContext<ChromeHoverSchedule | null>(
  null,
);

export function useChromeHoverSchedule(): ChromeHoverSchedule | null {
  return useContext(ChromeHoverContext);
}
