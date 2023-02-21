import "./globals.css";
import MobileVhListener from "./components/MobileVhListener";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className="antialiased text-gray-800 dark:text-gray-300 dark:bg-black bg-white w-full flex flex-col items-stretch">
        {children}
      </body>
      <MobileVhListener />
    </html>
  );
}
