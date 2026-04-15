import type Realm from "../../core/Realm";
import { useChromeHoverSchedule } from "../../core/ChromeHoverContext";
import { useRealmManager } from "../../core/useRealmManager";

export type RealmCardProps = {
  realm: Realm;
  onHover?: () => void;
  onLeave?: () => void;
};

export default function RealmCard({
  realm,
  onHover,
  onLeave,
}: RealmCardProps) {
  const manager = useRealmManager();
  const scheduleChromeHover = useChromeHoverSchedule();

  const handleEnter = () => {
    onHover?.();
    scheduleChromeHover?.(realm.tint ?? null);
  };

  const handleLeave = () => {
    onLeave?.();
    scheduleChromeHover?.(null);
  };

  return (
    <div
      className="realm-card"
      role="button"
      tabIndex={0}
      onClick={() => manager.setActiveRealm(realm)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          manager.setActiveRealm(realm);
        }
      }}
    >
      <div
        className="realm-card-glow"
        aria-hidden
        style={
          realm.glow
            ? {
                background: `radial-gradient(circle at 50% 50%, ${realm.glow}, transparent 70%)`,
              }
            : undefined
        }
      />

      <div className="realm-card-icon" aria-hidden>
        {realm.icon ?? "\u{2B24}"}
      </div>

      <div className="realm-card-label">{realm.label ?? realm.id}</div>
    </div>
  );
}
