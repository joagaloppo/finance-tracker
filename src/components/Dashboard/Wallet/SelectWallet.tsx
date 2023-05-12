import { useState } from "react";
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

export default function SelectWallet(props: { wallets: Wallet[] | undefined}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? props.wallets && props.wallets.find((wallet) => wallet.name.toLowerCase() === value)?.name :
            "Select wallet"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search wallet..." />
          <CommandEmpty>No wallet found.</CommandEmpty>
          <CommandGroup>
            {props.wallets && props.wallets.map((wallet) => (
              <CommandItem
                key={wallet.id}
                onSelect={(selected) => {
                  setValue(selected === value ? "" : selected);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === wallet.name.toLowerCase() ? "opacity-100" : "opacity-0"
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
