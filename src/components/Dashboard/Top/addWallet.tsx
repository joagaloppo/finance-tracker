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
import { api } from "@/utils/api";
import { Hash, Plus } from "lucide-react";
import { Text } from "lucide-react";
import { DollarSign } from "lucide-react";
import { useState } from "react";
import { type Wallet, type Currency } from "@prisma/client";
import { useWalletStore } from "@/app/walletStore";

export default function AddWallet() {
  const addWallet = useWalletStore((state) => state.addWallet);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const ctx = api.useContext();

  const resetInputs = () => {
    setTitle("");
    setDescription("");
    setCurrency("USD");
  };

  const { mutate, isLoading } = api.wallet.create.useMutation({
    onSuccess: (data: Wallet) => {
      resetInputs();
      void ctx.wallet.getAll.invalidate();
      addWallet(data);
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
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-3.5 w-3.5 text-slate-500" />
          Add wallet
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Wallet</DialogTitle>
          <DialogDescription>
            Add a wallet linked to your account.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          
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

          <div className="relative flex w-full items-center">
            <div className="relative w-full">
              <Input
                className="pl-10"
                min={0}
                placeholder="Your wallet currency"
              />
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center pl-1">
              <DollarSign className="h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>
          
        </div>

        <DialogFooter>
          
          <Button
            type="submit"
            onClick={() =>
              mutate({
                name: title,
                description,
                currency,
              })
            }
          >
            {isLoading ? "Loading..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
