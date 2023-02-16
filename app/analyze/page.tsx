import { redirect } from "next/navigation";

import Analyzer from "./components/Analyzer";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined | null };
}) {
 let blob 

//  if (searchParams){
  
//  }

  // if (!blob) {
  //   return <div>No blob.</div>
  // }

  return (
    <div className="bg-black h-screen w-screen relative flex justify-center items-stretch">
      {blob}
      <Analyzer />
    </div>
  );
}
