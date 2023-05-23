"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "@/utils/api";
import { useWalletStore } from "@/app/walletStore";
import { motion, AnimatePresence } from "framer-motion";

import SelectCurrency from "./selectCurrency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text, Hash, Plus, X } from "lucide-react";
import { type Wallet } from "@prisma/client";

export default function AddWallet() {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");

  const addWallet = useWalletStore((state) => state.addWallet);
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

  const resetInputs = () => {
    setTitle("");
    setDescription("");
    setCurrency("usd");
  };

  const { mutate, isLoading } = api.wallet.create.useMutation({
    onSuccess: (data: Wallet) => {
      setOpen(false);
      addWallet(data);
      setWalletId(data.id);
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
        resetInputs();
      }}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" className="sm:after:content-['Create']">
          <Plus className="h-3.5 w-3.5 text-slate-700 sm:mr-2" />
        </Button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 cursor-pointer bg-black/20 backdrop-blur-sm"
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
                className="fixed left-1/2 top-[4vw] z-50 flex w-[96vw] max-w-lg -translate-y-1/2 flex-col gap-4 rounded-lg bg-white p-6 shadow-lg sm:top-1/2"
              >
                <div className="flex flex-col space-y-1.5 text-left">
                  <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">Create</Dialog.Title>
                  <Dialog.Description className="text-sm text-muted-foreground">Add a new wallet.</Dialog.Description>
                </div>

                <div className="grid gap-4 py-4">
                  <div className="flex gap-2">
                    <div className="relative flex w-full items-center">
                      <div className="relative w-full">
                        <Input
                          spellCheck={false}
                          placeholder="Name"
                          className="pl-10"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center pl-1">
                        <Hash className="h-3.5 w-3.5 text-slate-500" />
                      </div>
                    </div>
                    <SelectCurrency value={currency} setValue={setCurrency} />
                  </div>

                  <div className="relative flex w-full items-center">
                    <div className="relative w-full">
                      <Input
                        spellCheck={false}
                        className="pl-10"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center pl-1">
                      <Text className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                  <Button
                    type="submit"
                    onClick={() =>
                      mutate({
                        name: title,
                        description,
                        currency: currency.toUpperCase(),
                      })
                    }
                  >
                    {isLoading ? "Loading..." : "Create"}
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
