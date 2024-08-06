import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { Planets } from "@/contexts/global-context";

const frameworks = [
  {
    value: "terra",
    label: "Terra",
  },
  {
    value: "lua",
    label: "Lua",
  },
  {
    value: "marte",
    label: "Marte",
  },
  {
    value: "vacuo",
    label: "Vácuo",
  },
];

interface ListSelectorProps {
  planetName: Planets;
  setPlanetName: Dispatch<SetStateAction<Planets>>;
}
function compararStringsIgnorandoAcentosECaixaAlta(
  string1: string,
  string2: string
) {
  // Remove acentos e caracteres especiais
  const normalizeString = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Converte ambas as strings para minúsculas e remove acentos
  const normalizedString1 = normalizeString(string1.toLowerCase());
  const normalizedString2 = normalizeString(string2.toLowerCase());

  // Realiza a comparação
  return normalizedString1 === normalizedString2;
}

export function ListSelector({ planetName, setPlanetName }: ListSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="outline"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {planetName
            ? frameworks.find((framework) => framework.value === planetName)
                ?.label
            : "Pesquisar..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Pesquisar..." />
          <CommandEmpty>Vazio.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  const currValue = currentValue as Planets;
                  setPlanetName(
                    compararStringsIgnorandoAcentosECaixaAlta(
                      currValue,
                      planetName
                    )
                      ? "terra"
                      : currValue
                  );
                  console.log(currValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    planetName === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
