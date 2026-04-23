"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { signOut } from "next-auth/react";
import { IUser } from "@/types/user";

interface UserMenuProps {
  currentUser: IUser | null;
}

const Nav = ({ currentUser }: UserMenuProps) => {
  const handleLogOut = async () => {
    await signOut({ callbackUrl: ROUTES.HOME });
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href={ROUTES.HOME} className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
            NB
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Next Blog
            </span>
            <span className="block text-base font-semibold text-slate-950">
              Production refactor
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <Link
                href={ROUTES.CREATE}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                New post
              </Link>
              <span className="hidden text-sm text-slate-500 sm:inline">
                Signed in as <span className="font-medium text-slate-950">{currentUser.name}</span>
              </span>
              <button
                onClick={handleLogOut}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
