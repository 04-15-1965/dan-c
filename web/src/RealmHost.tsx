import { useSyncExternalStore } from "react";

import RealmManager from "@runtime/core/RealmManager";

interface RealmHostProps {
  manager: RealmManager;
}

export default function RealmHost({ manager }: RealmHostProps) {
  const realm = useSyncExternalStore(
    (onChange) => manager.subscribe(onChange),
    () => manager.getActiveRealm(),
    () => manager.getActiveRealm(),
  );

  return (
    <div className="realm-host">
      <div className="realm-host-surface">
        {realm ? realm.render() : <div>No active realm loaded.</div>}
      </div>
    </div>
  );
}
