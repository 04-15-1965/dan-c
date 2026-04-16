import { useState, type CSSProperties, type MouseEvent } from "react";

import type Realm from "../../core/Realm";
import type RealmManager from "../../core/RealmManager";

import "./WorldMapRealm.css";

type MapNode = { realm: Realm; cluster: string; x: number; y: number };

function groupRealmsByCluster(realms: Realm[]): Map<string, Realm[]> {
  const clusters = new Map<string, Realm[]>();
  for (const realm of realms) {
    const key = realm.cluster ?? "default";
    if (!clusters.has(key)) clusters.set(key, []);
    clusters.get(key)!.push(realm);
  }
  return clusters;
}

function wmOrbitClass(cluster: string): string {
  const safe = cluster.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/^-+|-+$/g, "");
  return safe || "default";
}

function ringParallaxStyle(ringIndex: number): CSSProperties {
  return {
    "--px": `calc(var(--parallax-x) * ${4 + ringIndex}px)`,
    "--py": `calc(var(--parallax-y) * ${4 + ringIndex}px)`,
  } as CSSProperties;
}

export default function WorldMapRealmView({
  manager,
  realms,
}: {
  manager: RealmManager;
  realms: Realm[];
}) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const w = r.width || 1;
    const h = r.height || 1;
    const x = ((e.clientX - r.left) / w - 0.5) * 2;
    const y = ((e.clientY - r.top) / h - 0.5) * 2;
    setParallax({ x, y });
  };

  const handleLayerLeave = () => {
    setParallax({ x: 0, y: 0 });
    setHoveredCluster(null);
  };

  const clusters = groupRealmsByCluster(realms);
  const nodes: MapNode[] = Array.from(clusters.entries()).flatMap(
    ([cluster, list], ringIndex) => {
      if (list.length === 0) return [];
      return list.map((realm, index) => {
        const angle = index * ((2 * Math.PI) / list.length);
        const rx = 140 + ringIndex * 80;
        const ry = 90 + ringIndex * 50;

        return {
          realm,
          cluster,
          x: Math.cos(angle) * rx,
          y: Math.sin(angle) * ry,
        };
      });
    },
  );

  const layerStyle = {
    "--parallax-x": parallax.x,
    "--parallax-y": parallax.y,
  } as CSSProperties;

  return (
    <div
      className={`worldmap-realm${hoveredCluster != null ? " cluster-hovering" : ""}`}
    >
      <div className="wm-title">Mythic‑OS World Map</div>

      <div
        className="wm-node-layer"
        style={layerStyle}
        onMouseMove={handleMove}
        onMouseLeave={handleLayerLeave}
      >
        {nodes.map((node, index) => (
          <button
            key={node.realm.id}
            type="button"
            className="wm-node"
            style={
              {
                "--x": `${node.x}px`,
                "--y": `${node.y}px`,
                "--i": index,
              } as CSSProperties
            }
            onMouseEnter={() => setHoveredCluster(node.cluster)}
            onClick={() => manager.setActiveRealm(node.realm.id)}
          >
            <div className="wm-node-icon" aria-hidden>
              {node.realm.icon ?? "\u{2B24}"}
            </div>
            <div className="wm-node-label">{node.realm.label ?? node.realm.id}</div>
          </button>
        ))}
        <svg
          className="wm-links"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          aria-hidden
        >
          {Array.from(clusters.entries()).map(([cluster], ringIndex) => (
            <g
              key={cluster}
              className="wm-ring-parallax"
              style={ringParallaxStyle(ringIndex)}
            >
              <ellipse
                className={`wm-orbit wm-orbit-${wmOrbitClass(cluster)}${
                  hoveredCluster === cluster ? " wm-orbit-active" : ""
                }`}
                cx="50%"
                cy="50%"
                rx={140 + ringIndex * 80}
                ry={90 + ringIndex * 50}
              />
            </g>
          ))}
          {Array.from(clusters.entries()).map(([cluster, list], ringIndex) => {
            if (list.length < 2) return null;

            const clusterNodes = nodes.filter((n) => n.cluster === cluster);

            return (
              <g
                key={`intra-${cluster}`}
                className="wm-ring-parallax"
                style={ringParallaxStyle(ringIndex)}
              >
                {clusterNodes.map((a, i) => {
                  if (clusterNodes.length === 2 && i >= 1) return null;
                  const b = clusterNodes[(i + 1) % clusterNodes.length];

                  return (
                    <line
                      key={`intra-${a.realm.id}-${b.realm.id}`}
                      className={`wm-link wm-link-intra wm-link-${wmOrbitClass(cluster)}${
                        hoveredCluster === cluster ? " wm-link-active-cluster" : ""
                      }`}
                      x1={`calc(50% + ${a.x}px)`}
                      y1={`calc(50% + ${a.y}px)`}
                      x2={`calc(50% + ${b.x}px)`}
                      y2={`calc(50% + ${b.y}px)`}
                    />
                  );
                })}
              </g>
            );
          })}
          {Array.from(clusters.entries()).flatMap(([clusterA], i) =>
            Array.from(clusters.entries()).flatMap(([clusterB], j) => {
              if (j <= i) return [];

              const a = nodes.find((n) => n.cluster === clusterA);
              const b = nodes.find((n) => n.cluster === clusterB);
              if (!a || !b) return [];

              return (
                <line
                  key={`bridge-${clusterA}-${clusterB}`}
                  className="wm-link wm-link-bridge"
                  x1={`calc(50% + ${a.x}px)`}
                  y1={`calc(50% + ${a.y}px)`}
                  x2={`calc(50% + ${b.x}px)`}
                  y2={`calc(50% + ${b.y}px)`}
                />
              );
            }),
          )}
        </svg>
      </div>
    </div>
  );
}
