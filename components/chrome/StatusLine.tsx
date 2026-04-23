"use client";

import { usePathname } from "next/navigation";

function getStatus(pathname: string) {
  if (pathname === "/") {
    return {
      file: " ~/blogosphere/feed.tsx ",
      hint: " 42L   [RO] ",
      mode: "NORMAL",
      pos: "1,1",
    };
  }

  if (pathname.startsWith("/archive")) {
    return {
      file: " ~/blogosphere/archive.tsx ",
      hint: " all tags indexed ",
      mode: "NORMAL",
      pos: "1,1",
    };
  }

  if (pathname.startsWith("/profile")) {
    return {
      file: " ~/blogosphere/neo.yml ",
      hint: " authenticated ",
      mode: "NORMAL",
      pos: "1,1",
    };
  }

  if (pathname.startsWith("/create")) {
    return {
      file: " draft/untitled.mdx ",
      hint: " [i=insert · :w save] ",
      mode: "INSERT",
      pos: "18,12",
    };
  }

  if (pathname.startsWith("/blog/")) {
    return {
      file: " posts/post.mdx ",
      hint: " 9 min read · :q to go back ",
      mode: "NORMAL",
      pos: "1,1",
    };
  }

  if (pathname.startsWith("/login")) {
    return {
      file: " ~/blogosphere/login.tsx ",
      hint: " credentials auth ",
      mode: "NORMAL",
      pos: "1,1",
    };
  }

  if (pathname.startsWith("/register")) {
    return {
      file: " ~/blogosphere/register.tsx ",
      hint: " create account ",
      mode: "NORMAL",
      pos: "1,1",
    };
  }

  return {
    file: " ~/blogosphere/app.tsx ",
    hint: " ready ",
    mode: "NORMAL",
    pos: "1,1",
  };
}

export default function StatusLine() {
  const pathname = usePathname();
  const status = getStatus(pathname);
  const modeColor =
    {
      NORMAL: "var(--aqua)",
      INSERT: "var(--green)",
      VISUAL: "var(--purple)",
      COMMAND: "var(--orange)",
    }[status.mode] || "var(--aqua)";

  return (
    <div className="statusline">
      <div className="sl-mode" style={{ background: modeColor }}>
        {status.mode}
      </div>
      <div className="sl-sep" style={{ color: modeColor }}>
        ▶
      </div>
      <div className="sl-file">{status.file}</div>
      <div className="sl-hint">{status.hint}</div>
      <div className="sl-right">
        <span>utf-8</span>
        <span>tsx</span>
        <span>{status.pos}</span>
      </div>
    </div>
  );
}
