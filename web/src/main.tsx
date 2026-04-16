import React from "react";
import ReactDOM from "react-dom/client";

import { RealmManagerProvider } from "../../runtime/src/core/useRealmManager";
import RealmManager from "../../runtime/src/core/RealmManager";
import AuroraRealm from "../../runtime/src/realms/AuroraRealm";
import NavigationRealm from "../../runtime/src/realms/NavigationRealm";
import WorldMapRealm from "../../runtime/src/realms/WorldMapRealm";
import {
  CosmicRealm,
  ForgeRealm,
  SettingsRealm,
  StormboundRealm,
  VerdantRealm,
} from "../../runtime/src/realms/stubRealms";
import HomeRealm from "../../realms/home/HomeRealm";

import OSChrome from "./components/os/OSChrome";
import App from "./App";
import "./styles.css";

const manager = new RealmManager();
manager.registerRealm(new HomeRealm());
manager.registerRealm(new NavigationRealm());
manager.registerRealm(new WorldMapRealm());
manager.registerRealm(new CosmicRealm());
manager.registerRealm(new StormboundRealm());
manager.registerRealm(new VerdantRealm());
manager.registerRealm(new AuroraRealm());
manager.registerRealm(new ForgeRealm());
manager.registerRealm(new SettingsRealm());
manager.setActiveRealm("home");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RealmManagerProvider manager={manager}>
      <OSChrome>
        <App />
      </OSChrome>
    </RealmManagerProvider>
  </React.StrictMode>
);
