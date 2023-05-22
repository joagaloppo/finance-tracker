import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
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
import { Hash, Settings, Text } from "lucide-react";
import { useState } from "react";
import { useWalletStore } from "@/app/walletStore";
import SelectCurrency from "./selectCurrency";

export default function EditWallet() {
  const [open, setOpen] = useState<boolean>(false);
  const wallets = useWalletStore((state) => state.wallets);
  const walletId = useWalletStore((state) => state.walletId);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const ctx = api.useContext();

  const resetInputs = () => {
    const currentWallet = wallets.find((wallet) => wallet.id === walletId);
    setTitle(currentWallet?.name || "");
    setDescription(currentWallet?.description || "");
    setCurrency(currentWallet?.currency || "USD");
  };

  const { mutate, isLoading } = api.wallet.edit.useMutation({
    onSuccess: async () => {
      setOpen(false);
      await ctx.wallet.getBalance.invalidate();
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
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        resetInputs();
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => resetInputs()} variant="outline" size="sm" className="sm:after:content-['Settings']">
          <Settings className="h-3.5 w-3.5 text-slate-500 sm:mr-2" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Wallet</DialogTitle>
          <DialogDescription>Add a wallet linked to your account.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex gap-2">
            <div className="relative flex w-full items-center">
              <div className="relative w-full">
                <Input
                  spellCheck={false}
                  placeholder="Your wallet name"
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
                placeholder="Your wallet description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center pl-1">
              <Text className="h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={() =>
              mutate({
                id: walletId,
                name: title,
                description,
                currency: currency.toUpperCase(),
              })
            }
          >
            {isLoading ? "Loading..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
