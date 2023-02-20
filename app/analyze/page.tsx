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
    <div className="absolute inset-0">
      <div className="h-full relative flex items-stretch justify-center text-white">
        <Analyzer />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
