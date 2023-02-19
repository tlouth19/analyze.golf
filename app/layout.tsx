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
      <body className="antialiased text-gray-800 dark:text-gray-300 dark:bg-black bg-white w-full flex flex-col items-stretch">
        {children}
      </body>
    </html>
  );
}
