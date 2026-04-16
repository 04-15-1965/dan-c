import Realm from "../core/Realm";

function stubScreen(title: string) {
  return (
    <div className="stub-realm">
      <p className="stub-realm__title">{title}</p>
      <p className="stub-realm__hint">Placeholder realm</p>
    </div>
  );
}

export class CosmicRealm extends Realm {
  static readonly id = "cosmic";
  static readonly label = "Cosmic";
  static readonly icon = "\u{1F30C}";
  static readonly background = "arcane-night";

  readonly id = CosmicRealm.id;
  label = CosmicRealm.label;
  icon = CosmicRealm.icon;
  background = CosmicRealm.background;
  cluster = "frontier";
  linkStroke: "cosmic" = "cosmic";

  render() {
    return stubScreen("Cosmic");
  }
}

export class StormboundRealm extends Realm {
  static readonly id = "stormbound";
  static readonly label = "Stormbound";
  static readonly icon = "\u{26A1}";
  static readonly background = "arcane-night";

  readonly id = StormboundRealm.id;
  label = StormboundRealm.label;
  icon = StormboundRealm.icon;
  background = StormboundRealm.background;
  cluster = "frontier";
  linkStroke: "storm" = "storm";

  render() {
    return stubScreen("Stormbound");
  }
}

export class VerdantRealm extends Realm {
  static readonly id = "verdant";
  static readonly label = "Verdant";
  static readonly icon = "\u{1F33F}";
  static readonly background = "arcane-night";

  readonly id = VerdantRealm.id;
  label = VerdantRealm.label;
  icon = VerdantRealm.icon;
  background = VerdantRealm.background;
  cluster = "frontier";
  linkStroke: "nature" = "nature";

  render() {
    return stubScreen("Verdant");
  }
}

export class ForgeRealm extends Realm {
  static readonly id = "forge";
  static readonly label = "The Forge";
  static readonly icon = "\u{1F528}";
  static readonly background = "arcane-night";

  readonly id = ForgeRealm.id;
  label = ForgeRealm.label;
  icon = ForgeRealm.icon;
  background = ForgeRealm.background;
  cluster = "hearth";
  linkStroke: "core" = "core";
  tint = {
    from: "#2a0f0f",
    to: "#000000",
    accent: "rgba(255,80,80,0.15)",
  };
  chromeBg = "rgba(255, 80, 80, 0.08)";
  chromeBorder = "rgba(255, 80, 80, 0.25)";
  chromeGlow = "rgba(255, 80, 80, 0.35)";
  glow = "rgba(255, 80, 80, 0.35)";
  transition: "slideLeft" = "slideLeft";

  render() {
    return stubScreen("The Forge");
  }
}

export class SettingsRealm extends Realm {
  static readonly id = "settings";
  static readonly label = "Settings";
  static readonly icon = "\u{2699}";
  static readonly background = "arcane-night";

  readonly id = SettingsRealm.id;
  label = SettingsRealm.label;
  icon = SettingsRealm.icon;
  background = SettingsRealm.background;

  render() {
    return stubScreen("Settings");
  }
}
