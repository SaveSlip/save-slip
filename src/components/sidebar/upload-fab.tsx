"use client";

import Link from "next/link";
import { Upload } from "lucide-react";

export function UploadFAB() {
  return (
    <Link
      href="/receipts/upload"
      aria-label="Upload receipt"
      className="lg:hidden fixed bottom-6 right-4 z-40 flex items-center justify-center size-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Upload className="size-5" aria-hidden />
    </Link>
  );
}
