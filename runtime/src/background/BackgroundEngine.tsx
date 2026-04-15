import { useEffect, useState } from "react";

import "./background.css";

export default function BackgroundEngine({ theme }: { theme: string }) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      setParallax({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="arcane-night-bg"
      data-theme={theme}
      aria-hidden
      style={{
        transform: `translate3d(${parallax.x * 8}px, ${parallax.y * 8}px, 0)`,
      }}
    >
      <div
        className="arcane-night-stars"
        style={{
          transform: `translate3d(${parallax.x * 15}px, ${parallax.y * 15}px, 0)`,
        }}
      />
      <div className="arcane-night-particles">
        <div
          className="arcane-night-particles-inner"
          style={{
            transform: `translate3d(${parallax.x * 25}px, ${parallax.y * 25}px, 0)`,
          }}
        />
      </div>
      <div
        className="arcane-night-shimmer"
        style={{
          transform: `translate3d(${parallax.x * 5}px, ${parallax.y * 5}px, 0)`,
        }}
      />
    </div>
  );
}
