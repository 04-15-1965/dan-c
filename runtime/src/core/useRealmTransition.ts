import { useSyncExternalStore } from "react";

import {
  getRealmTransitionSnapshot,
  subscribeRealmTransition,
  type RealmTransitionSnapshot,
} from "./realmTransitionStore";

/** Reads realm transition phase + incoming/outgoing realms (works outside <RealmTransition> tree). */
export function useRealmTransition(): RealmTransitionSnapshot {
  return useSyncExternalStore(
    subscribeRealmTransition,
    getRealmTransitionSnapshot,
    getRealmTransitionSnapshot,
  );
}
