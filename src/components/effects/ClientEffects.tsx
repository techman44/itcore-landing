"use client";

import dynamic from "next/dynamic";

const MouseGlow = dynamic(
  () => import("@/components/effects/MouseGlow").then((mod) => mod.MouseGlow),
  { ssr: false }
);

const CircuitGrid = dynamic(
  () => import("@/components/effects/CircuitGrid").then((mod) => mod.CircuitGrid),
  { ssr: false }
);

export function ClientEffects() {
  return (
    <>
      <CircuitGrid />
      <MouseGlow />
    </>
  );
}
