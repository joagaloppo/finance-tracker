import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, X, ArrowRight, ArrowLeft } from "lucide-react";
import { set } from "date-fns";
import * as Dialog from "@radix-ui/react-dialog";
import { type Transaction } from "@prisma/client";

import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { useTransactionStore } from "@/app/transactionStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datepicker";
import Spinner from "@/components/ui/spinner";
import Delete from "./DialogDeleteTransaction";
import { useWalletStore } from "@/app/walletStore";

interface Form {
  type: boolean;
  description: string;
  amount: number;
  date: Date | undefined;
  hours: number;
  minutes: number;
}

const schema = z.object({
  type: z.boolean(),
  description: z.string().max(100),
  amount: z
    .union([z.string(), z.number()])
    .transform(Number)
    .refine((v) => !isNaN(v) && v >= 0.01),
  date: z.union([z.date(), z.undefined()]),
  hours: z
    .union([z.string(), z.number()])
    .transform(Number)
    .refine((v) => !isNaN(v) && v >= 0 && v < 24),
  minutes: z
    .union([z.string(), z.number()])
    .transform(Number)
    .refine((v) => !isNaN(v) && v >= 0 && v < 60),
});

const TransactionDialog: React.FC<{ transaction?: Transaction }> = ({ transaction }) => {
  const [open, setOpen] = useState(false);
  const ctx = api.useContext();
  const { walletId } = useWalletStore();
  const { upsertTransaction } = useTransactionStore();
  const defaultValues = transaction
    ? {
        description: transaction.description || "",
        amount: Math.abs(transaction.amount),
        type: transaction.amount > 0,
        date: transaction.date,
        hours: transaction.date.getHours(),
        minutes: transaction.date.getMinutes(),
      }
    : {
        type: true,
        date: new Date(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    control,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const { mutate, isLoading } = api.transaction.upsert.useMutation({
    onSuccess: (e) => handleSuccess(e),
    onError: (e) => handleError(e.data?.zodError?.fieldErrors.content),
    onSettled: () => setOpen(false),
  });

  const onSubmit = (data: Form): void => {
    const { description, type, hours, minutes } = data;
    const amount = type ? data.amount : -data.amount;
    const date = set(data.date || new Date(), { hours, minutes });
    mutate({ description, amount, date, id: transaction?.id, walletId });
  };

  const handleSuccess = (transaction: Transaction) => {
    upsertTransaction(transaction);
    void ctx.transaction.getTen.invalidate();
    void ctx.wallet.getInfo.invalidate();
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
        {transaction ? (
          <div className="flex w-full cursor-pointer gap-3 bg-white px-3 py-5 hover:bg-gray-100">
            <div className="whitespace-nowrap text-sm text-gray-800">
              <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-gray-300">
                {transaction.amount >= 0 ? (
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                ) : (
                  <ArrowLeft className="h-4 w-4 text-slate-400" />
                )}
              </span>
            </div>
            <div className="flex w-full flex-col justify-center overflow-hidden whitespace-nowrap text-sm text-gray-800">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-md">{transaction.amount >= 0 ? "Received money" : "Paid money"}</span>
                <span className="max-w-[30%] text-ellipsis text-xs font-light text-gray-400">
                  {transaction.description || "No description"}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap text-sm">
              <div className="flex flex-col gap-1 text-right">
                <span
                  className={cn(
                    "font-semibold tracking-tight text-slate-600",
                    transaction.amount >= 0 ? "text-green-700" : "text-red-700"
                  )}
                >
                  {transaction.amount >= 0 ? "+" : "-"}${Math.abs(transaction.amount).toLocaleString("en-US")}
                </span>
                <span className="text-xs font-light tracking-tight text-gray-400">
                  {transaction.date.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <Button variant="outline" size="sm" className="w-full">
            Add transaction
          </Button>
        )}
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
              />
            </Dialog.Overlay>

            <Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed left-1/2 top-[2vw] z-20 flex w-[96vw] max-w-lg -translate-x-1/2 rounded-xl bg-white p-6 shadow-lg sm:top-1/2 sm:-translate-y-1/2"
              >
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                  <div
                    className={cn("flex flex-col space-y-1.5 text-left", isLoading && "pointer-events-none opacity-50")}
                  >
                    <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                      Transaction
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-muted-foreground">
                      {transaction ? "Edit transaction details." : "Add a new transaction."}
                    </Dialog.Description>
                  </div>

                  <div className="grid gap-4 py-4">
                    <div>
                      <Input
                        className={cn(errors.description && "border-red-700/50 text-red-700")}
                        placeholder="Describe your transaction"
                        disabled={isLoading}
                        spellCheck={false}
                        {...register("description")}
                      />
                    </div>
                    <div>
                      <div className="relative flex w-full items-center gap-2">
                        <Input
                          className={cn("pl-10", errors.amount && "border-red-700/50 text-red-700")}
                          placeholder="Amount"
                          disabled={isLoading}
                          {...register("amount")}
                        />
                        <div className="flex w-[100px]">
                          <Button
                            disabled={isLoading}
                            type="button"
                            variant="outline"
                            onClick={() => setValue("type", true)}
                            className={cn(
                              "w-1/2 rounded-r-none border-r-0",
                              watch("type") && "bg-gray-100 shadow-[inset_0_0px_2px_rgba(0,0,0,0.1)] hover:bg-gray-100"
                            )}
                          >
                            In
                          </Button>
                          <Button
                            disabled={isLoading}
                            type="button"
                            variant="outline"
                            onClick={() => setValue("type", false)}
                            className={cn(
                              "w-1/2 rounded-l-none border-l-0",
                              !watch("type") && "bg-gray-100 shadow-[inset_0_0px_2px_rgba(0,0,0,0.1)] hover:bg-gray-100"
                            )}
                          >
                            Out
                          </Button>
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center pl-1">
                          <DollarSign
                            className={cn(
                              "h-3.5 w-3.5 text-slate-500",
                              isLoading && "opacity-50",
                              errors.amount && "text-red-700"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                          <DatePicker disabled={isLoading} date={field.value} setDate={field.onChange} />
                        )}
                      />
                      <div className="relative flex w-fit items-center">
                        <div
                          className={cn(
                            "relative flex w-[100px] items-center divide-x rounded-lg border shadow-sm",
                            (errors.minutes || errors.hours) && "border-red-700/50 text-red-700",
                            isLoading && "opacity-50"
                          )}
                        >
                          <Input
                            disabled={isLoading}
                            className={cn(
                              "w-full rounded-none border-0 px-0 text-center disabled:opacity-100",
                              (errors.minutes || errors.hours) && "border-red-700/50 text-red-700"
                            )}
                            placeholder="00"
                            maxLength={2}
                            {...register("hours")}
                          />
                          <Input
                            disabled={isLoading}
                            className={cn(
                              "w-full rounded-none border-0 px-0 text-center disabled:opacity-100",
                              (errors.minutes || errors.hours) && "border-red-700/50 text-red-700"
                            )}
                            placeholder="00"
                            maxLength={2}
                            {...register("minutes")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-end sm:gap-2 sm:space-x-2">
                    {transaction && <Delete id={transaction.id} setOpenParent={setOpen} disabled={isLoading} />}
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

export default TransactionDialog;
