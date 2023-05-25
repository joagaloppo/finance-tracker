import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useWalletStore } from "@/app/walletStore";

export default function SelectWallet() {
  const wallets = useWalletStore((state) => state.wallets);
  const walletId = useWalletStore((state) => state.walletId);
  const setWalletId = useWalletStore((state) => state.setWalletId);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(wallets[0]?.name.toLowerCase());

  useEffect(() => {
    walletId && setValue(wallets.find((w) => w.id === walletId)?.name.toLowerCase());
  }, [walletId, wallets]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between sm:w-[200px]"
        >
          {value && wallets.find((w) => w.name.toLowerCase() === value)?.name}
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 sm:w-[200px]">
        <Command>
          <CommandInput placeholder="Search wallet..." />
          <CommandEmpty>No wallet found.</CommandEmpty>
          <CommandGroup>
            {wallets.map((wallet) => (
              <CommandItem
                key={wallet.id}
                onSelect={(selected) => {
                  setValue(selected);
                  setWalletId(wallet.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn("mr-2 h-4 w-4", value === wallet.name.toLowerCase() ? "opacity-100" : "opacity-0")}
                />
                {wallet.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
