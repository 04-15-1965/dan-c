import { Compass, Home, Map, Settings } from "lucide-react";

import {
  useChromeHoverSchedule,
  type ChromeHoverSchedule,
} from "@mythic-os/runtime/core/ChromeHoverContext";
import type { RealmHoverTintValue } from "@mythic-os/runtime/core/RealmHoverTintContext";
import { useRealm } from "@mythic-os/runtime/core/useRealmManager";

import type { ParallaxOffset } from "@/hooks/useParallax";

const defaultChromeBg = "rgba(255,255,255,0.05)";
const defaultChromeBorder = "rgba(255,255,255,0.1)";

const nav: { icon: typeof Home; realmId: string; label: string }[] = [
  { icon: Home, realmId: "home", label: "Home" },
  { icon: Map, realmId: "world-map", label: "World map" },
  { icon: Compass, realmId: "navigation", label: "Realms" },
  { icon: Settings, realmId: "settings", label: "Settings" },
];

function previewTintHandlers(
  schedule: ChromeHoverSchedule | null,
  tint: RealmHoverTintValue | undefined,
) {
  if (!schedule || tint === undefined) {
    return {
      onMouseEnter: undefined,
      onMouseLeave: undefined,
      onFocus: undefined,
      onBlur: undefined,
    };
  }
  const show = () => schedule(tint ?? null);
  const hide = () => schedule(null);
  return {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  };
}

export default function BottomBar({ parallax }: { parallax: ParallaxOffset }) {
  const { activeRealm, manager } = useRealm();
  const scheduleHoverTint = useChromeHoverSchedule();

  const bg = activeRealm?.chromeBg ?? defaultChromeBg;
  const border = activeRealm?.chromeBorder ?? defaultChromeBorder;

  return (
    <nav
      className="os-chrome-bottom-bar"
      aria-label="Quick navigation"
      style={{
        background: bg,
        borderTop: `1px solid ${border}`,
        transition:
          "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
      }}
    >
      {activeRealm?.chromeGlow ? (
        <div
          className="os-chrome-bottom-bar__glow"
          aria-hidden
          style={{
            background: `radial-gradient(circle at 50% 100%, ${activeRealm.chromeGlow}, transparent 70%)`,
            opacity: 0.4,
            transform: `translate(${parallax.x * 0.1}px, ${parallax.y * 0.1}px)`,
          }}
        />
      ) : null}
      {nav.map(({ icon: Icon, realmId, label }) => {
        const isActive = activeRealm?.id === realmId;
        const target = manager.getRealms().get(realmId);
        const tintPreview = previewTintHandlers(
          scheduleHoverTint,
          target?.tint,
        );
        return (
          <button
            key={realmId}
            type="button"
            className={
              isActive
                ? "os-chrome-bottom-bar__btn os-chrome-bottom-bar__btn--active"
                : "os-chrome-bottom-bar__btn"
            }
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            onClick={() => manager.setActiveRealm(realmId)}
            {...tintPreview}
          >
            <Icon size={18} aria-hidden />
          </button>
        );
      })}
    </nav>
  );
}
