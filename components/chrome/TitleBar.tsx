"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { IUser } from "@/types/user";

interface TitleBarProps {
  currentUser: IUser | null;
}

const tabs = [
  { href: ROUTES.HOME, label: "feed.tsx", icon: "▣", match: "/" },
  { href: ROUTES.ARCHIVE, label: "archive.tsx", icon: "▤", match: "/archive" },
  { href: ROUTES.HOME, label: "post.mdx", icon: "▦", match: "/blog/" },
  { href: ROUTES.CREATE, label: "*scratch*", icon: "●", match: "/create" },
  { href: ROUTES.PROFILE, label: "neo.yml", icon: "◈", match: "/profile" },
];

function isActive(pathname: string, match: string) {
  if (match === "/") {
    return pathname === "/";
  }

  return pathname === match || pathname.startsWith(match);
}

export default function TitleBar({ currentUser }: TitleBarProps) {
  const pathname = usePathname();

  return (
    <div className="titlebar">
      <div className="tb-left">
        <span className="tb-dot" style={{ background: "var(--red)" }} />
        <span className="tb-dot" style={{ background: "var(--yellow)" }} />
        <span className="tb-dot" style={{ background: "var(--green)" }} />
        <span className="tb-path">neo@zion: ~/blogosphere</span>
      </div>
      <div className="tb-tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            className={`tb-tab ${isActive(pathname, tab.match) ? "is-active" : ""}`}
            href={tab.href}
          >
            <span className="tb-tab-icon">{tab.icon}</span>
            <span>{tab.label}</span>
          </Link>
        ))}
      </div>
      <div className="tb-right">
        <span className="tb-meta">{currentUser ? "auth: ok" : "guest"}</span>
        <span className="tb-meta">utf-8</span>
        <span className="tb-meta tb-branch">★ main</span>
      </div>
    </div>
  );
}
