import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default async function LoginPage() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect(ROUTES.HOME);
  }

  return (
    <div className="screen auth-screen">
      <section className="auth-shell">
        <pre className="auth-ascii">{`[ auth/login.tsx ]\n\n  ┌──────────────────────┐\n  │ credentials required │\n  └──────────────────────┘`}</pre>
        <div className="auth-copy">
          <h1 className="auth-title">Authentication lives here</h1>
          <p className="auth-subtitle">
            The visual shell now matches the Blogosphere design. The interactive login form from
            the previous refactor can be wired back in here next if you want the full auth flow in
            the same look.
          </p>
        </div>
        <div className="auth-actions">
          <Link className="ea-btn ea-pub auth-link" href={ROUTES.REGISTER}>
            :create account
          </Link>
          <Link className="ea-btn auth-link" href={ROUTES.HOME}>
            :back to feed
          </Link>
        </div>
      </section>
    </div>
  );
}
