"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetContent,
} from "@/components/ui/sheet";
import { SidebarNav } from "./sidebar-nav";
import { Button } from "@/components/ui/button";

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 z-30 flex items-center h-14 px-4 border-b border-border bg-background">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          }
        />
        <SheetContent side="left">
          <div className="flex items-center justify-between h-14 px-4 border-b border-sidebar-border">
            <SheetTitle className="font-semibold text-base text-sidebar-foreground">
              SaveSlip
            </SheetTitle>
            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close navigation menu"
                >
                  <X className="size-4" />
                </Button>
              }
            />
          </div>
          <div className="py-4">
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <span className="ml-3 font-semibold text-sm">SaveSlip</span>
    </header>
  );
}
