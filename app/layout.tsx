import Script from "next/script";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <head>
        <Script id="viewport">
          {`
          function setDocumentHeight() {
            const doc = document.documentElement
            doc.style.setProperty('--doc-height', window.innerHeight + 'px')
           }
           window.addEventListener('resize', setDocumentHeight)
           setDocumentHeight()
        `}
        </Script>
      </head>
      <body className="antialiased text-gray-800 dark:text-gray-300 dark:bg-black bg-white w-full flex flex-col items-stretch">
        {children}
      </body>
    </html>
  );
}
