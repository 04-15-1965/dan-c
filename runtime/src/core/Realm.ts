import type * as React from "react";

import type RealmManager from "./RealmManager";

/** Structured painterly tint for the OS chrome overlay (`RealmTint`). */
export type RealmTintColors = {
  from: string;
  to: string;
  accent: string;
};

/** How `RealmTransition` animates when this realm becomes active (incoming realm wins). */
export type RealmTransitionVariant =
  | "fade"
  | "slideLeft"
  | "slideRight"
  | "zoomOut";

export abstract class Realm {
  abstract readonly id: string;
  /** Background theme id for the shell (e.g. `"arcane-night"`). */
  background?: string;
  /**
   * OS chrome overlay: full CSS `background`, or structured gradient + accent
   * for `RealmTint`.
   */
  tint?: string | RealmTintColors;
  /** Top/bottom chrome bar background (CSS `background`). */
  chromeBg?: string;
  /** Top/bottom chrome bar border color (CSS color). */
  chromeBorder?: string;
  /** Optional accent glow on the chrome bars (CSS color); radial highlight. */
  chromeGlow?: string;
  /** Realm tile hover glow (CSS color), e.g. `"rgba(255, 180, 120, 0.35)"`. */
  glow?: string;
  label?: string;
  /** Emoji or short glyph for launcher tiles. */
  icon?: string;
  /** Optional group id for world-map layout (defaults to `"default"`). */
  cluster?: string;
  /** World-map edge palette: `core` | `cosmic` | `storm` | `nature`. */
  linkStroke?: "core" | "cosmic" | "storm" | "nature";
  /**
   * Transition preset: when you **leave** this realm, that exit uses this value;
   * when you **enter** it, the entrance uses this value (`RealmTransition`).
   */
  transition?: RealmTransitionVariant;
  manager: RealmManager | null = null;

  abstract render(): React.ReactNode;

  async load(): Promise<void> {}

  async unload(): Promise<void> {}
}

export default Realm;
