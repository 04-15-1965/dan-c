import Realm from "../../core/Realm";

import "./AuroraRealm.css";

export default class AuroraRealm extends Realm {
  static readonly id = "aurora";
  static readonly label = "Aurora";
  static readonly icon = "\u{1F387}";
  static readonly background = "arcane-night";

  readonly id = AuroraRealm.id;
  label = AuroraRealm.label;
  icon = AuroraRealm.icon;
  background = AuroraRealm.background;
  cluster = "hearth";
  linkStroke: "cosmic" = "cosmic";

  render() {
    return (
      <div className="aurora-realm">
        <h1 className="aurora-realm__title">Aurora</h1>
        <p className="aurora-realm__tagline">Boreal light over the shell</p>
      </div>
    );
  }
}
