import { BsArrowClockwise } from "react-icons/bs";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { useRegisterSW } from "virtual:pwa-register/react";

const ServiceWorker = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const handleReload = () => {
    void updateServiceWorker(true);
  };

  return (
    <AlertDialog.Root open={needRefresh}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="dark:bg-black bg-white !bg-opacity-80 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow dark:bg-black bg-white border dark:border-gray-600 border-gray-300 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded  p-4 shadow focus:outline-none">
          <AlertDialog.Title className="font-bold text-lg uppercase">
            App Update Available
          </AlertDialog.Title>
          <AlertDialog.Description className="text-current mb-4">
            A new version of the app has been released.
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
  );
};

export default ServiceWorker;
