import { redirect } from "next/navigation";

import Analyzer from "./components/Analyzer";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const blob = searchParams?.blob as string;

  if (!blob) {
    return <div>No blob.</div>
  }

  return (
    <div className="bg-black h-screen w-screen relative flex justify-center items-stretch">
      <Analyzer />
    </div>
  );
}
