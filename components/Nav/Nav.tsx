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
    <nav className="bg-gray-200 flex justify-between px-4 py-6 shadow-xl">
      <Link href={ROUTES.HOME}>Home</Link>

      {currentUser ? (
        <>
          <Link href={ROUTES.CREATE}>Create</Link>
          <button onClick={handleLogOut}>Sign out</button>
          <h2 className="text-yellow-500">{currentUser?.name}</h2>
        </>
      ) : (
        <>
          <Link href={ROUTES.LOGIN}>Login</Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
