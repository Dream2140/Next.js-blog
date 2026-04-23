"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="page-shell">
      <section className="surface-panel mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          Something broke
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          We couldn&apos;t render this page
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The request failed unexpectedly. Try again, and if it keeps happening, inspect the
          server logs and environment configuration.
        </p>
        <button
          className="mt-8 inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          onClick={() => reset()}
        >
          Try again
        </button>
      </section>
    </main>
  );
}
