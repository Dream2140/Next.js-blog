import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="surface-panel mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          This page is no longer here
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The article may have been removed, renamed, or never existed in the first place.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
