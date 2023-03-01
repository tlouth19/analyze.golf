import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { BsArrowClockwise } from "react-icons/bs";

import { useRegisterSW } from "virtual:pwa-register/react";

const PWA = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW registerd", r);
    },
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

  const isOpen = offlineReady || needRefresh;

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="dark:bg-black bg-white !bg-opacity-90 fixed inset-0" />
        <AlertDialog.Content className="dark:bg-black bg-white border dark:border-gray-800 rounded shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] p-4 max-h-[85vh] focus:outline-none">
          <AlertDialog.Title className="mb-1 font-bold text-lg uppercase">
            App Update
          </AlertDialog.Title>
          <AlertDialog.Description className="text-current mb-4">
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>
                New content available, click on reload button to update.
              </span>
            )}
          </AlertDialog.Description>
          <div className="flex items-center justify-end">
            <AlertDialog.Cancel asChild>
              <button
                className="bg-gray-900 p-2 rounded font-bold uppercase text-white"
                onClick={handleClose}
              >
                Close
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              {needRefresh && (
                <button
                  className="ml-2 bg-brand-blue p-2 rounded font-bold uppercase inline-flex gap-1 items-center text-white"
                  onClick={handleReload}
                >
                  <BsArrowClockwise />
                  Reload App
                </button>
              )}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default PWA;
