import type { Realm } from "./Realm";

export type RealmTransitionPhase =
  | "idle"
  | "preShift"
  | "outgoing"
  | "bgCrossfade"
  | "incoming"
  | "settle";

export type RealmTransitionSnapshot = {
  phase: RealmTransitionPhase;
  incomingRealm: Realm | null;
  outgoingRealm: Realm | null;
};

const initial: RealmTransitionSnapshot = {
  phase: "idle",
  incomingRealm: null,
  outgoingRealm: null,
};

let snapshot: RealmTransitionSnapshot = initial;

const listeners = new Set<() => void>();

export function subscribeRealmTransition(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getRealmTransitionSnapshot(): RealmTransitionSnapshot {
  return snapshot;
}

export function setRealmTransitionSnapshot(
  next: RealmTransitionSnapshot,
): void {
  if (
    snapshot.phase === next.phase &&
    snapshot.incomingRealm === next.incomingRealm &&
    snapshot.outgoingRealm === next.outgoingRealm
  ) {
    return;
  }
  snapshot = next;
  for (const l of listeners) {
    l();
  }
}
