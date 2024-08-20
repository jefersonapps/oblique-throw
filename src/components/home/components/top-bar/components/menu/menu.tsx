import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMenu } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { HelperDialog } from "./helper-dialog";

export function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 text-primary"
        >
          <IoMenu size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <a
          href="http://lattes.cnpq.br/8551968050497162"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DropdownMenuItem className="flex items-center gap-2 text-primary w-fit">
            <UserCircle /> Autor
          </DropdownMenuItem>
        </a>

        <DropdownMenuSeparator />

        <HelperDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
