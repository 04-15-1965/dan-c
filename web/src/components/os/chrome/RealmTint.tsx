export type RealmTintSpec = {
  from: string;
  to: string;
  accent?: string;
};

export default function RealmTint({ tint }: { tint: RealmTintSpec }) {
  const accent = tint.accent ?? "rgba(255,255,255,0.05)";

  return (
    <div className="os-chrome-realm-tint">
      <div
        className="os-chrome-realm-tint__base"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${tint.from}, ${tint.to})`,
          opacity: 0.55,
          transition: "background 0.7s ease, opacity 0.7s ease",
        }}
      />
      <div
        className="os-chrome-realm-tint__accent"
        style={{
          background: `radial-gradient(circle at 80% 80%, ${accent}, transparent 70%)`,
          opacity: 0.35,
        }}
      />
    </div>
  );
}
