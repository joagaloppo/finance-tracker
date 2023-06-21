import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Currency } from "@prisma/client";

export const SelectorCurrency: React.FC<{ value: string; setValue: (v: string) => void }> = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  const currencies = Object.values(Currency);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] justify-between sm:w-[200px]"
        >
          {value && currencies.find((c) => c.toLowerCase() === value.toLowerCase())}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] p-0 sm:w-[200px]">
        <Command>
          <CommandInput placeholder="Search" maxLength={3} />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {currencies.map((c, i) => (
              <CommandItem
                key={i}
                onSelect={(selected) => {
                  setValue(selected);
                  setOpen(false);
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", value === c.toLowerCase() ? "opacity-100" : "opacity-0")} />
                {c}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
