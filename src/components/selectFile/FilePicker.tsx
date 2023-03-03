import { useRef, useState } from "react";

import useAppDispatch from "@hooks/useAppDispatch";
import { setBlob } from "@redux/slices/video";

const FilePicker = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCreatingBlob, setIsCreatingBlob] = useState<boolean>(false);

  const handleOpenFile = () => {
    if (inputRef.current != null) {
      inputRef.current.click();
    }
  };

  const handleSelectFile = (e: React.SyntheticEvent) => {
    setIsCreatingBlob(true);

    try {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files != null && files.length > 0) {
        const blob = URL.createObjectURL(files[0]);
        dispatch(setBlob(blob));
      }
    } catch (err) {
      setIsCreatingBlob(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenFile}
        disabled={isCreatingBlob}
        className="px-4 py-3 bg-transparent rounded uppercase border-2 border-dashed border-brand-blue font-semibold text-xl tracking-wide mb-2 relative hover:bg-brand-blue focus:bg-brand-blue hover:border-current focus:border-current transition-all"
      >
        Select Video
      </button>
      <input
        className="hidden"
        ref={inputRef}
        accept="video/mp4,video/x-m4v,video/*"
        multiple={false}
        onChange={handleSelectFile}
        type="file"
      />
    </>
  );
};

export default FilePicker;
