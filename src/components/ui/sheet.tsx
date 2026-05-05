"use client";

import { Drawer } from "@base-ui/react/drawer";
import { cn } from "@/lib/utils";

interface SheetContentProps {
  side?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

function SheetContent({
  side = "left",
  children,
  className,
}: SheetContentProps) {
  return (
    <Drawer.Portal>
      <Drawer.Backdrop className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 data-[closed]:opacity-0" />
      <Drawer.Popup
        className={cn(
          "fixed inset-y-0 z-50 flex h-full w-72 flex-col",
          "bg-sidebar-background shadow-xl",
          "transition-transform duration-200 ease-in-out",
          side === "left"
            ? "left-0 data-[closed]:-translate-x-full"
            : "right-0 data-[closed]:translate-x-full",
          className,
        )}
      >
        {children}
      </Drawer.Popup>
    </Drawer.Portal>
  );
}

const Sheet = Drawer.Root;
const SheetTrigger = Drawer.Trigger;
const SheetClose = Drawer.Close;
const SheetTitle = Drawer.Title;

export { Sheet, SheetTrigger, SheetClose, SheetTitle, SheetContent };
