import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { api } from "@/utils/api";
import { cn } from "@/lib/utils";
import { useWalletStore } from "@/app/walletStore";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

interface Props {
  id: number;
  disabled?: boolean;
  setOpenParent: (o: boolean) => void;
}

export const DialogDeleteWallet: React.FC<Props> = ({ id, disabled = false, setOpenParent }) => {
  const [open, setOpen] = useState(false);
  const { wallets, setWalletId, deleteWallet } = useWalletStore();

  const { mutate, isLoading } = api.wallet.delete.useMutation({
    onSuccess: (e) => handleSuccess(e.id),
    onError: (e) => handleError(e.data?.zodError?.fieldErrors.content),
    onSettled: () => {
      setOpen(false);
      setOpenParent(false);
    },
  });

  const handleSuccess = (id: number) => {
    setWalletId(wallets[0]?.id || 0);
    deleteWallet(id);
  };

  const handleError = (msg?: Array<string>) => {
    let res = "Failed to edit transaction! Please try again later.";
    if (Array.isArray(msg) && msg[0]) res = msg[0];
    console.error(res);
  };

  const handleOpenChange = () => {
    if (isLoading) return;
    setOpen((x) => !x);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <Button disabled={disabled} variant="outline">
          Delete
        </Button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed left-1/2 top-[2vw] z-50 flex w-[96vw] max-w-lg -translate-x-1/2 flex-col gap-4 rounded-lg bg-white p-6 opacity-20 shadow-lg sm:top-1/2 sm:-translate-y-1/2"
              >
                <div
                  className={cn("flex flex-col space-y-1.5 text-left", isLoading && "pointer-events-none opacity-50")}
                >
                  <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">Delete</Dialog.Title>
                  <Dialog.Description className="text-sm text-muted-foreground">
                    Are you sure you want to delete this wallet?
                  </Dialog.Description>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-end sm:gap-2 sm:space-x-2">
                  <Button type="submit" disabled={isLoading} variant="outline" onClick={() => setOpen(!open)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading} onClick={() => mutate({ id })}>
                    {isLoading ? <Spinner theme="light" className="h-5 px-4" /> : "Delete"}
                  </Button>
                </div>

                <Dialog.Close
                  disabled={isLoading}
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                  <X className={cn("h-4 w-4", isLoading && "opacity-50")} />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
