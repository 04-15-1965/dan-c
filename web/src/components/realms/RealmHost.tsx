import type Realm from "@mythic-os/runtime/core/Realm";
import RealmTransition from "@mythic-os/runtime/core/RealmTransition";

export default function RealmHost() {
  return (
    <RealmTransition>
      {(realm: Realm | null) => (
        <div className="realm-host-frame">{realm ? realm.render() : null}</div>
      )}
    </RealmTransition>
  );
}
