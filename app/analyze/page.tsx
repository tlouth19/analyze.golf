import { redirect } from "next/navigation";

import Analyzer from "./components/Analyzer";

export default function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const blob = searchParams?.blob as string;

  if (!blob) {
    redirect("/");
  }

  return (
    <div className="bg-black h-screen w-screen flex justify-center items-stretch">
      <div className="h-full relative flex items-stretch justify-center">
        <Analyzer />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
