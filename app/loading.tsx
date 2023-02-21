import { BiLoaderCircle } from "react-icons/bi";

export default function Loading() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      role="alert"
      aria-busy="true"
    >
      <BiLoaderCircle className="animate-spin" />
    </div>
  );
}
