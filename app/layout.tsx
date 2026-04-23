import "./globals.css";
import type { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import MatrixRain from "@/components/chrome/MatrixRain";
import TitleBar from "@/components/chrome/TitleBar";
import StatusLine from "@/components/chrome/StatusLine";

export const metadata: Metadata = {
  title: "~/blogosphere",
  description: "Gruvbox terminal-inspired blog UI",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <MatrixRain />
        <div id="app" className="app-root">
          <TitleBar currentUser={currentUser} />
          <main className="main">{children}</main>
          <StatusLine />
        </div>
      </body>
    </html>
  );
}
