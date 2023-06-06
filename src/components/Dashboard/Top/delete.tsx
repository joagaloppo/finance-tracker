"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "@/utils/api";
import { useWalletStore } from "@/app/walletStore";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { type Wallet } from "@prisma/client";
import Spinner from "@/components/ui/spinner";

export default function DeleteWallet(props: { setOpenParent: (o: boolean) => void }) {
  const [open, setOpen] = useState<boolean>(false);

  const wallets = useWalletStore((state) => state.wallets);
  const walletId = useWalletStore((state) => state.walletId);
  const setWallets = useWalletStore((state) => state.setWallets);
  const setWalletId = useWalletStore((state) => state.setWalletId);

  let variants = {
    initial: { opacity: 0, scale: 0.8, x: "-50%", y: "-50%" },
    animate: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
    exit: { opacity: 0, scale: 0.8, x: "-50%", y: "-50%" },
  };
  const isMobile = window.innerWidth <= 640;
  if (isMobile) {
    variants = {
      initial: { opacity: 0, scale: 0.8, x: "-50%", y: "0" },
      animate: { opacity: 1, scale: 1, x: "-50%", y: "0" },
      exit: { opacity: 0, scale: 0.8, x: "-50%", y: "0" },
    };
  }

  const { mutate, isLoading } = api.wallet.delete.useMutation({
    onSuccess: (data: Wallet) => {
      setOpen(false);
      props.setOpenParent(false);
      setWallets(wallets.filter((wallet) => wallet.id !== data.id));
      setWalletId(wallets[0]?.id || 0);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        console.error(errorMessage[0]);
      } else {
        console.error("Failed to post! Please try again later.");
      }
    },
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline">Delete wallet</Button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, type: "just" }}
              ></motion.div>
            </Dialog.Overlay>
            <Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} asChild forceMount>
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.15, type: "just" }}
                variants={variants}
                className="fixed left-1/2 top-[2vw] z-50 flex w-[96vw] max-w-lg -translate-y-1/2 flex-col gap-4 rounded-lg bg-white p-6 shadow-lg sm:top-1/2"
              >
                <div className="flex flex-col space-y-1.5 text-left">
                  <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">Delete</Dialog.Title>
                  <Dialog.Description className="text-sm text-muted-foreground">
                    Are you sure you want to delete this wallet?
                  </Dialog.Description>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-end sm:gap-2 sm:space-x-2">
                  <Button type="submit" variant="outline" onClick={() => setOpen(!open)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={() =>
                      mutate({
                        id: walletId,
                      })
                    }
                  >
                    {isLoading ? <Spinner theme="light" className="h-5 px-4" /> : "Delete"}
                  </Button>
                </div>

                <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
