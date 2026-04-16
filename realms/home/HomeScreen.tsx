import { useRealmManager } from "@mythic-os/runtime/core/useRealmManager";

import "./home.css";

export default function HomeScreen() {
  const manager = useRealmManager();

  return (
    <div className="home-screen">
      <div className="home-content">
        <h1 className="home-title">Welcome to Mythic‑OS</h1>
        <p className="home-tagline">Where worlds awaken and realms unfold</p>
        <button
          type="button"
          className="home-realms-btn"
          onClick={() => manager.setActiveRealm("navigation")}
        >
          Realms
        </button>
      </div>
    </div>
  );
}
