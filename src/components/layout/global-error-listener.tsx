"use client";

import { useState } from "react";

function SegmentErrorThrower(): never {
  throw new Error("Test: segment error boundary triggered");
}

function GlobalErrorThrower(): never {
  throw new Error("Test: global error boundary triggered");
}

export function GlobalErrorListener() {
  if (process.env.NODE_ENV !== "development") return null;

  return <DevErrorTrigger />;
}

function DevErrorTrigger() {
  const [throwSegment, setThrowSegment] = useState(false);
  const [throwGlobal, setThrowGlobal] = useState(false);

  if (throwSegment) return <SegmentErrorThrower />;
  if (throwGlobal) return <GlobalErrorThrower />;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-lg border bg-background p-3 shadow-lg text-xs">
      <p className="font-mono font-semibold text-muted-foreground">
        Error testing
      </p>
      <button
        className="rounded border px-2 py-1 hover:bg-muted"
        onClick={() => setThrowSegment(true)}
      >
        Trigger error.tsx
      </button>
      <button
        className="rounded border px-2 py-1 hover:bg-muted"
        onClick={() => setThrowGlobal(true)}
      >
        Trigger global-error.tsx
      </button>
    </div>
  );
}
