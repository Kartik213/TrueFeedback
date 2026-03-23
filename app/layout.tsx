import type { Metadata } from "next";

import { Providers } from "@/components/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "True Feedback",
  description: "Anonymous feedback with server-side auth on Next.js."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="page-shell min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
