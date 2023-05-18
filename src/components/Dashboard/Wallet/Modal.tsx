import { useWalletStore } from "@/app/walletStore";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { set } from "date-fns";
import { Clock } from "lucide-react";
import { Text } from "lucide-react";
import { DollarSign } from "lucide-react";
import { useState } from "react";

export default function Modal() {
  const walletId = useWalletStore((state) => state.walletId);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const ctx = api.useContext();

  const resetInputs = () => {
    setDescription("");
    setAmount("");
    setDate(undefined);
  };

  const { mutate, isLoading } = api.transaction.create.useMutation({
    onSuccess: () => {
      resetInputs();
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
    <Dialog onOpenChange={(open) => !open && resetInputs()}>

      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          Add transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction</DialogTitle>
          <DialogDescription>
            Add a transaction to your current wallet.
          </DialogDescription>
        </DialogHeader>

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
            <div className="relative w-full">
              <Input
                className="pl-10"
                value={amount}
                min={0}
                onChange={(e) => setAmount(e.target.value)}
              />
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
              <div className="relative flex items-center rounded-lg border divide-x">
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setDate(new Date())}
            >
              Now
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={() =>
              mutate({
                description,
                amount: Number(amount),
                date: date || new Date(),
                walletId,
              })
            }
          >
            {isLoading ? "Loading..." : "Accept"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
