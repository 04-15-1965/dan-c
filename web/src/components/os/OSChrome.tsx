import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { RealmTintColors } from "@mythic-os/runtime/core/Realm";
import { ChromeHoverContext } from "@mythic-os/runtime/core/ChromeHoverContext";
import type { RealmHoverTintValue } from "@mythic-os/runtime/core/RealmHoverTintContext";
import { useRealmTransition } from "@mythic-os/runtime/core/useRealmTransition";
import { useActiveRealm } from "@mythic-os/runtime/core/useRealmManager";

import { useParallax } from "@/hooks/useParallax";

import BottomBar from "./chrome/BottomBar";
import ModalLayer from "./chrome/ModalLayer";
import RealmTint, { type RealmTintSpec } from "./chrome/RealmTint";
import TopBar from "./chrome/TopBar";

const defaultChromeTint: RealmTintColors = {
  from: "#0f1720",
  to: "#000000",
  accent: "rgba(255,255,255,0.04)",
};

function tintAsSpec(
  tint: string | RealmTintColors,
): RealmTintSpec {
  if (typeof tint === "string") {
    return {
      from: tint,
      to: "#000000",
      accent: "rgba(255,255,255,0.05)",
    };
  }
  return {
    from: tint.from,
    to: tint.to,
    accent: tint.accent,
  };
}

export default function OSChrome({ children }: { children: ReactNode }) {
  const activeRealm = useActiveRealm();
  const { phase, incomingRealm } = useRealmTransition();
  const [hoverTint, setHoverTint] = useState<RealmHoverTintValue>(null);
  const parallax = useParallax(12);
  const hoverTimerRef = useRef<number | null>(null);

  const setHover = useCallback((t: RealmHoverTintValue) => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = window.setTimeout(() => {
      hoverTimerRef.current = null;
      setHoverTint(t);
    }, 60);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const preShiftTint =
    phase === "preShift" && incomingRealm?.tint
      ? incomingRealm.tint
      : null;

  const tintToUse =
    preShiftTint ??
    hoverTint ??
    activeRealm?.tint ??
    defaultChromeTint;

  const realmTint = tintAsSpec(tintToUse);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--tint-from", realmTint.from);
    root.style.setProperty("--tint-to", realmTint.to);
  }, [realmTint.from, realmTint.to]);

  return (
    <ChromeHoverContext.Provider value={setHover}>
      <div className="os-chrome">
        <div
          className="os-chrome-parallax-tint"
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
            transition: "transform 0.12s linear",
          }}
        >
          <RealmTint tint={realmTint} />
        </div>

        <TopBar parallax={parallax} />

        <div className="os-chrome-main">{children}</div>

        <BottomBar parallax={parallax} />

        <ModalLayer />
      </div>
    </ChromeHoverContext.Provider>
  );
}
