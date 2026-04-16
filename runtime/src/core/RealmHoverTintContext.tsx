import { createContext, useContext } from "react";

import type Realm from "./Realm";

export type RealmHoverTintValue = Realm["tint"] | null;

export type RealmHoverTintContextValue = {
  hoverTint: RealmHoverTintValue;
  setHoverTint: (t: RealmHoverTintValue) => void;
};

export const RealmHoverTintContext =
  createContext<RealmHoverTintContextValue | null>(null);

export function useRealmHoverTint(): RealmHoverTintContextValue {
  const ctx = useContext(RealmHoverTintContext);
  if (!ctx) {
    throw new Error(
      "useRealmHoverTint must be used within RealmHoverTintContext.Provider (see OSChrome)",
    );
  }
  return ctx;
}
