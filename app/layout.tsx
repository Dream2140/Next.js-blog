import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav/Nav";
import getCurrentUser from "@/app/actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog app",
};
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
