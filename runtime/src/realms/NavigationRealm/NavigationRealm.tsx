import Realm from "../../core/Realm";
import { useRealmManager } from "../../core/useRealmManager";

import RealmCard from "./RealmCard";
import "./NavigationRealm.css";

const NAVIGATION_ID = "navigation";

function NavigationRealmView() {
  const manager = useRealmManager();

  const realms = manager
    .getRealmsList()
    .filter((r) => r.id !== NAVIGATION_ID);

  return (
    <div className="navigation-realm">
      <div className="nav-title">Realms</div>

      <div className="nav-grid">
        {realms.map((realm) => (
          <RealmCard key={realm.id} realm={realm} />
        ))}
      </div>
    </div>
  );
}

export default class NavigationRealm extends Realm {
  static readonly id = NAVIGATION_ID;
  static readonly background = "cosmic";
  static readonly label = "Navigation";
  static readonly icon = "\u{1F9ED}";

  readonly id = NavigationRealm.id;
  background = NavigationRealm.background;
  label = NavigationRealm.label;
  icon = NavigationRealm.icon;

  render() {
    if (!this.manager) {
      return null;
    }

    return <NavigationRealmView />;
  }
}
