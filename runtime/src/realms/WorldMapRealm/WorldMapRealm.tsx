import Realm from "../../core/Realm";

import WorldMapRealmView from "./WorldMapRealmView";

export default class WorldMapRealm extends Realm {
  static readonly id = "world-map";
  static readonly label = "World Map";
  static readonly icon = "\u{1F30C}";
  static readonly background = "cosmic";

  readonly id = WorldMapRealm.id;
  label = WorldMapRealm.label;
  icon = WorldMapRealm.icon;
  background = WorldMapRealm.background;

  render() {
    const manager = this.manager;
    if (!manager) {
      return null;
    }

    const realms = manager
      .getRealmsList()
      .filter((r) => r.id !== WorldMapRealm.id);

    return <WorldMapRealmView manager={manager} realms={realms} />;
  }
}
