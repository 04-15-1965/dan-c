import BackgroundEngine from "@mythic-os/runtime/background/BackgroundEngine";
import { useActiveRealm } from "@mythic-os/runtime/core/useRealmManager";

import RealmHost from "@/components/realms/RealmHost";

export default function App() {
  const realm = useActiveRealm();

  return (
    <div className="mythic-app">
      <BackgroundEngine theme={realm?.background ?? "arcane-night"} />
      <div className="mythic-app-surface">
        <RealmHost />
      </div>
    </div>
  );
}
