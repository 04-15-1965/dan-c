import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import type Realm from "./Realm";
import type RealmManager from "./RealmManager";

const RealmManagerContext = createContext<RealmManager | null>(null);

export function RealmManagerProvider({
  manager,
  children,
}: {
  manager: RealmManager;
  children: ReactNode;
}) {
  return (
    <RealmManagerContext.Provider value={manager}>
      {children}
    </RealmManagerContext.Provider>
  );
}

export function useRealmManager(): RealmManager {
  const manager = useContext(RealmManagerContext);
  if (!manager) {
    throw new Error(
      "useRealmManager must be used within a RealmManagerProvider",
    );
  }
  return manager;
}

export function useActiveRealm(): Realm | null {
  const manager = useRealmManager();
  return useSyncExternalStore(
    (onStoreChange) => manager.subscribe(onStoreChange),
    () => manager.getActiveRealm(),
    () => manager.getActiveRealm(),
  );
}

/** Active realm + manager (convenience for chrome / screens). */
export function useRealm(): { activeRealm: Realm | null; manager: RealmManager } {
  return {
    activeRealm: useActiveRealm(),
    manager: useRealmManager(),
  };
}
