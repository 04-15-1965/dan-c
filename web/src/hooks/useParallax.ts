import { useEffect, useState } from "react";

export type ParallaxOffset = { x: number; y: number };

export function useParallax(strength = 20): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;

    const handler = (e: MouseEvent) => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      raf = requestAnimationFrame(() => {
        raf = 0;
        const x = (e.clientX / window.innerWidth - 0.5) * strength;
        const y = (e.clientY / window.innerHeight - 0.5) * strength;
        setOffset({ x, y });
      });
    };

    window.addEventListener("mousemove", handler);
    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      window.removeEventListener("mousemove", handler);
    };
  }, [strength]);

  return offset;
}
