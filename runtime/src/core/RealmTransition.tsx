import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { Realm, RealmTransitionVariant } from "./Realm";
import {
  setRealmTransitionSnapshot,
  type RealmTransitionPhase,
} from "./realmTransitionStore";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useRealm } from "./useRealmManager";

import "./transitions.css";

type RealmTransitionProps = {
  children: (realm: Realm | null) => ReactNode;
};

const DUR = {
  preShift: 120,
  outgoing: 500,
  bgCrossfade: 520,
  incoming: 550,
  settle: 200,
} as const;

const outgoingLeavingClass: Record<RealmTransitionVariant, string> = {
  fade: "realm-leave--fade",
  slideLeft: "realm-leave--slideLeft",
  slideRight: "realm-leave--slideRight",
  zoomOut: "realm-leave--zoomOut",
};

const incomingClass: Record<RealmTransitionVariant, string> = {
  fade: "realm-in--fade",
  slideLeft: "realm-in--slideLeft",
  slideRight: "realm-in--slideRight",
  zoomOut: "realm-in--zoomOut",
};

export default function RealmTransition({ children }: RealmTransitionProps) {
  const { activeRealm } = useRealm();
  const prefersReduced = usePrefersReducedMotion();
  const [prevRealm, setPrevRealm] = useState<Realm | null>(
    activeRealm ?? null,
  );
  const [phase, setPhase] = useState<RealmTransitionPhase>("idle");
  const timersRef = useRef<number[]>([]);

  useLayoutEffect(() => {
    setRealmTransitionSnapshot({
      phase,
      incomingRealm: activeRealm ?? null,
      outgoingRealm: prevRealm,
    });
  }, [phase, activeRealm, prevRealm]);

  useEffect(() => {
    if (!activeRealm || activeRealm.id === prevRealm?.id) {
      return;
    }

    if (prefersReduced) {
      setPrevRealm(activeRealm);
      setPhase("idle");
      return;
    }

    for (const t of timersRef.current) {
      window.clearTimeout(t);
    }
    timersRef.current = [];

    const pending: number[] = [];
    timersRef.current = pending;

    setPhase("preShift");
    pending.push(
      window.setTimeout(() => {
        setPhase("outgoing");
        pending.push(
          window.setTimeout(() => {
            setPhase("bgCrossfade");
            pending.push(
              window.setTimeout(() => {
                setPhase("incoming");
                pending.push(
                  window.setTimeout(() => {
                    setPrevRealm(activeRealm);
                    setPhase("settle");
                    pending.push(
                      window.setTimeout(() => setPhase("idle"), DUR.settle),
                    );
                  }, DUR.incoming),
                );
              }, DUR.bgCrossfade),
            );
          }, DUR.outgoing),
        );
      }, DUR.preShift),
    );

    return () => {
      for (const t of pending) {
        window.clearTimeout(t);
      }
      timersRef.current = [];
    };
  }, [activeRealm?.id, prefersReduced]);

  const outgoingVariant: RealmTransitionVariant =
    prevRealm?.transition ?? "fade";
  const incomingVariant: RealmTransitionVariant =
    activeRealm?.transition ?? "fade";

  const outgoingLeaving =
    phase === "outgoing" ||
    phase === "bgCrossfade" ||
    phase === "incoming";

  const bgCrossfadeVisible =
    phase === "bgCrossfade" || phase === "incoming";

  const incomingVisible = phase === "incoming";

  return (
    <div
      className={`realm-transition-shell${prefersReduced ? " realm-transition-shell--reduced-motion" : ""}`}
    >
      <div
        aria-hidden
        className={`bg-crossfade${bgCrossfadeVisible ? " show" : ""}`}
      >
        {children(activeRealm)}
      </div>

      <div
        aria-hidden
        className={
          outgoingLeaving
            ? `realm-transition-outgoing realm-transition-outgoing--inert will-change-transform ${outgoingLeavingClass[outgoingVariant]}`
            : "realm-transition-outgoing"
        }
      >
        {children(prevRealm)}
      </div>

      <div
        className={
          incomingVisible
            ? `realm-transition-incoming-layer ${incomingClass[incomingVariant]}`
            : "realm-transition-incoming-layer realm-transition-incoming--hidden"
        }
        aria-hidden={!incomingVisible}
      >
        {children(activeRealm)}
      </div>
    </div>
  );
}
