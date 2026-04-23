import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: AuthCardProps) {
  return (
    <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Next Blog
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          {title}
        </h1>
        <p className="text-sm leading-6 text-slate-600">{subtitle}</p>
      </div>

      <div className="space-y-5">{children}</div>

      {footer ? (
        <div className="mt-6 border-t border-slate-200 pt-5 text-sm text-slate-600">
          {footer}
        </div>
      ) : null}
    </section>
  );
}
