"use client";

import { useEffect } from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";

import { errorConfig } from "@/config/errors";
import { Button, buttonVariants } from "@/components/ui/button";
import { postClientTelemetry } from "@/lib/client/telemetry";
import { cn } from "@/lib/utils";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    postClientTelemetry({
      source: "ClientBoundary",
      message: error.message || "Unknown client error",
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="layout-shell page-rhythm flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
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
