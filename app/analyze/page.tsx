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
    <div className="bg-black h-screen w-screen relative flex justify-center items-stretch">
      <Analyzer />
    </div>
  );
}

export const dynamic = "force-dynamic";
