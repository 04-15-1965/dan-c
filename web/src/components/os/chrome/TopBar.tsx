import { useEffect, useState } from "react";

import { useRealm } from "@mythic-os/runtime/core/useRealmManager";

import type { ParallaxOffset } from "@/hooks/useParallax";

const defaultChromeBg = "rgba(255,255,255,0.05)";
const defaultChromeBorder = "rgba(255,255,255,0.1)";

export default function TopBar({ parallax }: { parallax: ParallaxOffset }) {
  const { activeRealm } = useRealm();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const realmTitle =
    activeRealm?.label ?? activeRealm?.id ?? "Mythic‑OS";

  const bg = activeRealm?.chromeBg ?? defaultChromeBg;
  const border = activeRealm?.chromeBorder ?? defaultChromeBorder;

  return (
    <header
      className="os-chrome-top-bar"
      style={{
        background: bg,
        borderBottom: `1px solid ${border}`,
        transition:
          "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
      }}
    >
      {activeRealm?.chromeGlow ? (
        <div
          className="os-chrome-top-bar__glow"
          aria-hidden
          style={{
            background: `radial-gradient(circle at 50% 0%, ${activeRealm.chromeGlow}, transparent 70%)`,
            opacity: 0.4,
            transform: `translate(${parallax.x * 0.1}px, ${parallax.y * 0.1}px)`,
          }}
        />
      ) : null}
      <div className="os-chrome-top-bar__realm">{realmTitle}</div>
      <div className="os-chrome-top-bar__clock">
        {now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </header>
  );
}
