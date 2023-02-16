import { redirect } from "next/navigation";

import Analyzer from "./components/Analyzer";

export default function page({
  searchParams,
  params,
}: {
  params: any,
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const blob = searchParams?.blob as string;

  if (!blob) {
    return (
      <div>No blob

        Blob: {blob}
        sParams: {JSON.stringify(searchParams)}
        p: {JSON.stringify(params)}
      </div>
    )
  }

  return (
    <div className="bg-black h-screen w-screen relative flex justify-center items-stretch">
      <Analyzer blob={blob}/>
    </div>
  );
}


export const dynamic = 'force-dynamic'