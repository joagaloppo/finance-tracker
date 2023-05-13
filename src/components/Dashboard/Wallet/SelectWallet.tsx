import { useEffect, useState } from "react";
import { type Wallet } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useWalletStore } from "@/app/walletStore";

export default function SelectWallet(props: { wallets: Wallet[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.wallets[0]?.name.toLowerCase());
  const setWalletId = useWalletStore((state) => state.setWalletId);

  useEffect(() => {
    setWalletId(props.wallets[0]!.id);
  }, [props.wallets, setWalletId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value &&
            props.wallets &&
            props.wallets.find((wallet) => wallet.name.toLowerCase() === value)
              ?.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search wallet..." />
          <CommandEmpty>No wallet found.</CommandEmpty>
          <CommandGroup>
            {props.wallets &&
              props.wallets.map((wallet) => (
                <CommandItem
                  key={wallet.id}
                  onSelect={(selected) => {
                    setValue(selected);
                    setWalletId(
                      props.wallets.find(
                        (wallet) => wallet.name.toLowerCase() === selected
                      )!.id
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === wallet.name.toLowerCase()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
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
