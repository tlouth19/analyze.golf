import { BsArrowClockwise, BsWifiOff } from "react-icons/bs";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Toast from "@radix-ui/react-toast";

import { useRegisterSW } from "virtual:pwa-register/react";

const ProgressiveWebApp = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const handleClose = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const handleReload = () => {
    void updateServiceWorker(true);
  };

  return (
    <>
      <AlertDialog.Root open={!needRefresh}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="dark:bg-black bg-white !bg-opacity-80 data-[state=open]:animate-overlayShow fixed inset-0" />
          <AlertDialog.Content className="data-[state=open]:animate-contentShow dark:bg-gray-900 bg-gray-100 border dark:border-gray-600 border-gray-300 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded  p-4 shadow focus:outline-none">
            <AlertDialog.Title className="font-bold text-lg uppercase">
              App Update Available
            </AlertDialog.Title>
            <AlertDialog.Description className="text-current mb-4">
              New content available, click on reload button to update.
            </AlertDialog.Description>
            <AlertDialog.Action asChild>
              <button
                type="button"
                className="border-brand-blue border-dashed border-2 px-2 py-1 rounded font-semibold uppercase inline-flex gap-1 items-center"
                onClick={handleReload}
              >
                <BsArrowClockwise className="stroke-1" />
                Reload App
              </button>
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="dark:bg-gray-900 bg-gray-100 border dark:border-gray-600 border-gray-300 rounded shadow p-4 grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-4 items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          open={!offlineReady}
          onOpenChange={handleClose}
        >
          <Toast.Title className="[grid-area:_title] font-bold text-sm uppercase flex items-center gap-2">
            <BsWifiOff /> Offline Available
          </Toast.Title>
          <Toast.Description asChild>
            <span className="text-current text-sm">
              App will now work without a network connection.
            </span>
          </Toast.Description>
          <Toast.Action className="[grid-area:_action]" asChild altText="Close">
            <button className="py-1 px-2 rounded font-semibold uppercase inline-flex gap-1 items-center border-2 border-dashed border-brand-blue text-sm ">
              Close
            </button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-4 w-[520px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </>
  );
};

export default ProgressiveWebApp;
