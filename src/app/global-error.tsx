"use client";

import { useEffect } from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { DM_Sans, DM_Mono } from "next/font/google";

import "./globals.css";

import { errorConfig } from "@/config/errors";
import { Button, buttonVariants } from "@/components/ui/button";
import { postClientTelemetry } from "@/lib/client/telemetry";
import { cn } from "@/lib/utils";
import { GlobalErrorListener } from "@/components/layout/global-error-listener";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function GlobalErrorContent({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    postClientTelemetry({
      source: "GlobalError",
      message: error.message || "Unknown global error",
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 selection:bg-primary/20 selection:text-primary">
      <div className="max-w-xl space-y-8 text-center">
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-destructive">
            <XCircle className="mr-2 h-4 w-4" />
            Unexpected Error
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {errorConfig.heading}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {errorConfig.description}
        </p>

        {error.digest && (
          <p className="font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="cta" size="lg" onClick={reset}>
            {errorConfig.retryLabel}
          </Button>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {errorConfig.homeLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans text-base antialiased">
        <GlobalErrorContent error={error} reset={reset} />
        <GlobalErrorListener />
      </body>
    </html>
  );
}
