import { BsArrowClockwise } from "react-icons/bs";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Toast from "@radix-ui/react-toast";

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

  return (
    <>
      <AlertDialog.Root open={needRefresh}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="alert-overlay" />
          <AlertDialog.Content className="alert-content">
            <AlertDialog.Title className="alert-title">
              App Update
            </AlertDialog.Title>
            <AlertDialog.Description className="alert-description">
              New content available, click on reload button to update.
            </AlertDialog.Description>
            <AlertDialog.Action asChild>
              <button className="alert-action-btn" onClick={handleReload}>
                <BsArrowClockwise />
                Reload App
              </button>
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="toast-root"
          open={offlineReady}
          onOpenChange={handleClose}
        >
          <Toast.Title className="toast-title">App Update</Toast.Title>
          <Toast.Description asChild className="toast-description">
            <span>App is ready to work offline</span>
          </Toast.Description>
          <Toast.Action className="toast-action" asChild altText="Close">
            <button className="toast-btn">Close</button>
          </Toast.Action>
        </Toast.Root>
        {offlineReady && <Toast.Viewport className="toast-overlay" />}
      </Toast.Provider>
    </>
  );
};

export default PWA;
