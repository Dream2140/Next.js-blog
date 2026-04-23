import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav/Nav";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <Nav currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
