import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default async function RegisterPage() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect(ROUTES.HOME);
  }

  return (
    <div className="screen auth-screen">
      <section className="auth-shell">
        <pre className="auth-ascii">{`[ auth/register.tsx ]\n\n  ┌──────────────────────┐\n  │ account bootstrap ui │\n  └──────────────────────┘`}</pre>
        <div className="auth-copy">
          <h1 className="auth-title">Registration UI placeholder</h1>
          <p className="auth-subtitle">
            As requested, missing product features stay on UI level for now. This route is styled
            to the exact terminal language of the mock and ready for the next auth pass.
          </p>
        </div>
        <div className="auth-actions">
          <Link className="ea-btn ea-pub auth-link" href={ROUTES.LOGIN}>
            :sign in
          </Link>
          <Link className="ea-btn auth-link" href={ROUTES.HOME}>
            :back to feed
          </Link>
        </div>
      </section>
    </div>
  );
}
