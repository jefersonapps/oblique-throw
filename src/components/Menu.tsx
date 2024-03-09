import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMenu } from "react-icons/io5";
import { Button } from "./ui/button";

export const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size="icon"
          className="bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 text-primary"
        >
          <IoMenu size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sobre</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <a
          href="http://lattes.cnpq.br/8551968050497162"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DropdownMenuItem>Autor</DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
