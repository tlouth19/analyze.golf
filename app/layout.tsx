/* eslint-disable @next/next/no-before-interactive-script-outside-document */

import Script from "next/script";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="antialiased text-gray-800 dark:text-gray-300 dark:bg-black bg-white">
        {children}
      </body>
    </html>
  );
}
