import * as Dialog from "@radix-ui/react-dialog";
import { api } from "@/utils/api";
import { useState } from "react";
import { useWalletStore } from "@/app/walletStore";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datepicker";
import { set } from "date-fns";
import { DollarSign, Text, Clock, X, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Transaction } from "@prisma/client";
import DeleteTransaction from "./delete";

export default function EditTransaction(props: { transaction: Transaction }) {
  const { transaction } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [income, setIncome] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();

  const transactions = useWalletStore((state) => state.transactions);
  const setTransactions = useWalletStore((state) => state.setTransactions);
  const ctx = api.useContext();

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
    setIncome(transaction.amount > 0);
    setDescription(transaction.description || "");
    setAmount(Math.abs(transaction.amount).toString() || "");
    setDate(transaction.date || new Date());
  };

  const { mutate, isLoading } = api.transaction.update.useMutation({
    onSuccess: () => {
      resetInputs();
      setOpen(false);
      setTransactions &&
        setTransactions(
          transactions.map((t) => {
            if (t.id === transaction.id) {
              return {
                ...t,
                description,
                amount: Number(income ? amount : -amount),
                date: date || new Date(),
              };
            }
            return t;
          })
        );
      void ctx.transaction.getTen.invalidate();
      void ctx.wallet.getBalance.invalidate();
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
                {transaction.amount >= 0 ? "+" : "-"} $ {Math.abs(transaction.amount)}
              </span>
              <span className="text-xs font-light tracking-tight text-gray-400">
                {transaction.date.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
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
                  <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">Transaction</Dialog.Title>
                  <Dialog.Description className="text-sm text-muted-foreground">
                    Add a transaction to your wallet.
                  </Dialog.Description>
                </div>

                <div className="grid gap-4 py-4">
                  <div className="relative flex w-full items-center">
                    <div className="relative w-full">
                      <Input
                        spellCheck={false}
                        className="pl-10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center pl-1">
                      <Text className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                  </div>
                  <div className="relative flex w-full items-center">
                    <div className="flex w-full gap-2">
                      <Input
                        className="pl-10"
                        value={amount}
                        min={0}
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <Button variant="outline" onClick={() => setIncome(true)} className={cn(income && "bg-gray-100")}>
                        In
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIncome(false)}
                        className={cn(!income && "bg-gray-100")}
                      >
                        Out
                      </Button>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center pl-1">
                      <DollarSign className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <DatePicker date={date} setDate={setDate} />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="relative flex w-fit items-center">
                      <div className="relative flex items-center divide-x rounded-lg border">
                        <Input
                          className="w-[70px] rounded-none border-0 pl-8 pr-3 text-right"
                          maxLength={2}
                          value={date?.getHours() || ""}
                          onChange={(e) =>
                            setDate(
                              set(date || new Date(), {
                                hours: Number(e.target.value),
                              })
                            )
                          }
                        />
                        <Input
                          className="w-[40px] rounded-none border-0 px-0 text-center"
                          maxLength={2}
                          value={date?.getMinutes() || ""}
                          onChange={(e) =>
                            setDate(
                              set(date || new Date(), {
                                minutes: Number(e.target.value),
                              })
                            )
                          }
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center pl-1">
                        <Clock className="h-3.5 w-3.5 text-slate-500" />
                      </div>
                    </div>
                    <Button type="button" variant="outline" onClick={() => setDate(new Date())}>
                      Now
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-end sm:space-x-2">
                  <DeleteTransaction id={transaction.id} setOpenParent={setOpen} />
                  <Button
                    type="submit"
                    onClick={() =>
                      mutate({
                        description,
                        amount: Number(income ? amount : -amount),
                        date: date || new Date(),
                        id: transaction.id,
                      })
                    }
                  >
                    {isLoading ? "Loading..." : "Save"}
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
