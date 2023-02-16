import { useRouter, useSearchParams } from "next/navigation";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const label = "Close video";

export default function Close() {
  const router = useRouter();
  // const params = useSearchParams();

  function handleClose() {
    // const blob = params.get("blob");

    // if (blob) {
    //   URL.revokeObjectURL(blob);
    // }

    router.push("/");
  }

  return (
    <button
      type="button"
      className="btn-action"
      onClick={handleClose}
      aria-label={label}
      title={label}
    >
      <BsFillArrowLeftCircleFill />
    </button>
  );
}
