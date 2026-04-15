import Realm from "@mythic-os/runtime/core/Realm";

import HomeScreen from "./HomeScreen";

export default class HomeRealm extends Realm {
  static readonly id = "home";
  static readonly label = "Home";
  static readonly icon = "\u{1F3E0}";
  static readonly background = "arcane-night";

  readonly id = HomeRealm.id;
  label = HomeRealm.label;
  icon = HomeRealm.icon;
  background = HomeRealm.background;
  cluster = "hearth";
  linkStroke: "core" = "core";

  render() {
    return <HomeScreen />;
  }
}
