import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "@/utils/api";
import { useWalletStore } from "@/app/walletStore";
import { motion, AnimatePresence } from "framer-motion";

import { SelectorCurrency } from "./SelectorCurrency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text, Hash, Plus, X, Settings } from "lucide-react";
import { type Wallet } from "@prisma/client";
import Spinner from "@/components/ui/spinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { DialogDeleteWallet } from "./DialogDeleteWallet";

interface Form {
  name: string;
  description: string;
  currency: string;
}

const schema = z.object({
  name: z.string().min(1).max(20),
  description: z.string().min(1).max(100),
  currency: z.string().min(1),
});

export const DialogUpsertWallet: React.FC<{ wallet?: Wallet }> = ({ wallet }) => {
  const [open, setOpen] = useState(false);
  const { upsertWallet, walletId, setWalletId } = useWalletStore();
  const defaultValues = wallet
    ? { name: wallet.name, description: wallet.description || "", currency: wallet.currency }
    : { name: "", description: "", currency: "usd" };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const { mutate, isLoading } = api.wallet.upsert.useMutation({
    onSuccess: (e) => handleSuccess(e),
    onError: (e) => handleError(e.data?.zodError?.fieldErrors.content),
    onSettled: () => setOpen(false),
  });

  const onSubmit = (data: Form): void => {
    const { name, description } = data;
    const currency = data.currency.toUpperCase();
    mutate({ walletId, name, description, currency });
  };

  const handleSuccess = (data: Wallet): void => {
    upsertWallet(data);
    setWalletId(data.id);
  };

  const handleError = (msg?: Array<string>) => {
    let res = "There was an error, please try again later.";
    if (Array.isArray(msg) && msg[0]) res = msg[0];
    console.error(res);
  };

  const handleOpenChange = () => {
    if (isLoading) return;
    if (!open) {
      reset(defaultValues);
    }
    setOpen((x) => !x);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(wallet ? "sm:after:content-['Settings']" : "sm:after:content-['Create']")}
        >
          {wallet ? (
            <Settings className="h-4 w-auto text-gray-600 sm:mr-2" />
          ) : (
            <Plus className="h-4 w-auto text-gray-600 sm:mr-2" />
          )}
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
                className="fixed inset-0 z-10 bg-black/20 backdrop-blur-[2px]"
              ></motion.div>
            </Dialog.Overlay>

            <Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed left-1/2 top-[2vw] z-20 flex w-[96vw] max-w-lg -translate-x-1/2 rounded-lg bg-white p-6 shadow-lg sm:top-1/2 sm:-translate-y-1/2"
              >
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                  <div
                    className={cn("flex flex-col space-y-1.5 text-left", isLoading && "pointer-events-none opacity-50")}
                  >
                    <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">Wallet</Dialog.Title>
                    <Dialog.Description className="text-sm text-muted-foreground">
                      {wallet ? "Edit wallet details." : "Add a new wallet."}
                    </Dialog.Description>
                  </div>

                  <div className="grid gap-4 py-4">
                    <div className="flex gap-2">
                      <div className="relative flex w-full items-center">
                        <div className="relative w-full">
                          <Input
                            className={cn(
                              "pl-10",
                              errors.name && "border-red-700/50 text-red-700 placeholder:text-red-700/70"
                            )}
                            disabled={isLoading}
                            placeholder="Name of your wallet"
                            spellCheck={false}
                            {...register("name")}
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center pl-1">
                          <Hash
                            className={cn(
                              "h-3.5 w-3.5 text-slate-500",
                              isLoading && "opacity-50",
                              errors.name && "text-red-700"
                            )}
                          />
                        </div>
                      </div>
                      <Controller
                        control={control}
                        name="currency"
                        render={({ field }) => (
                          // todo: add disabled state
                          <SelectorCurrency value={field.value} setValue={field.onChange} />
                        )}
                      />
                    </div>

                    <div className="relative flex w-full items-center">
                      <div className="relative w-full">
                        <Input
                          className={cn(
                            "pl-10",
                            errors.name && "border-red-700/50 text-red-700 placeholder:text-red-700/70"
                          )}
                          disabled={isLoading}
                          placeholder="Describe your wallet"
                          spellCheck={false}
                          {...register("description")}
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center pl-1">
                        <Text
                          className={cn(
                            "h-3.5 w-3.5 text-slate-500",
                            isLoading && "opacity-50",
                            errors.description && "text-red-700"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                    {wallet && <DialogDeleteWallet id={wallet.id} setOpenParent={setOpen} disabled={isLoading} />}
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? <Spinner theme="light" className="h-5 px-4" /> : "Save"}
                    </Button>
                  </div>

                  <Dialog.Close
                    disabled={isLoading}
                    className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                  >
                    <X className={cn("h-4 w-4", isLoading && "opacity-50")} />
                    <span className="sr-only">Close</span>
                  </Dialog.Close>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
