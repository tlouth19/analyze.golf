import { BsWifiOff } from "react-icons/bs";
import * as Toast from "@radix-ui/react-toast";

import { useRegisterSW } from "virtual:pwa-register/react";

const OfflineManager = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [, setNeedRefresh],
  } = useRegisterSW();

  const handleClose = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="dark:bg-black bg-white border dark:border-gray-600 border-gray-300 rounded shadow p-2 sm:p-4 items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={offlineReady}
        onOpenChange={handleClose}
      >
        <div className="flex items-center gap-2 justify-between mb-2">
          <Toast.Title className="font-bold uppercase flex items-center gap-2">
            <BsWifiOff /> Offline Available
          </Toast.Title>
          <Toast.Action className="" asChild altText="Close">
            <button
              className="font-semibold uppercase text-brand-blue px-1"
              aria-label="Close"
            >
              Close
            </button>
          </Toast.Action>
        </div>
        <Toast.Description asChild>
          <p className="text-current text-sm w-full">
            If you&apos;re on the golf course with no connection, the app will
            still work!
          </p>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-2 sm:p-4 gap-4 w-[520px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default OfflineManager;
