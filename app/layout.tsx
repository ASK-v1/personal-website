import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const thunderSans = localFont({
  src: [
    {
      path: "../public/fonts/thunder.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/thunder-medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Ahmet | Front End Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${thunderSans.className} antialiased`}>{children}</body>
    </html>
  );
}
